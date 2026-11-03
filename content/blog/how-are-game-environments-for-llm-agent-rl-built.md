---
title: "How Are Game Environments for LLM Agent RL Built? From TextWorld and BALROG to TextArena, Self-Play and Hack-Verifiable Games"
description: "A practitioner's guide to how game and text-game environments for LLM agent reinforcement learning are built: what TextWorld, Jericho, BALROG, TextArena, lmgame-Bench, TextQuests and GlyphBench got right, how SPIRAL, MARSHAL and RAGEN train on games, why game scores mislead (illegal moves, prior knowledge, error-survival, pass@k vs pass^k), and what a training-grade game environment needs."
tags:
  - rl-environments
  - games
  - multi-turn-rl
  - self-play
  - evals
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-03T05:00:00.000Z'
updatedAt: '2026-11-03T05:00:00.000Z'
faq:
  - question: "Why do AI labs train and evaluate LLM agents on games?"
    answer: "Games give multi-turn interaction, a rule engine that decides what is legal, an outcome that is checkable without a judge, and, in competitive games, an opponent that keeps the task hard. They are cheap to run in parallel and easy to procedurally vary. Recent work also reports transfer: SPIRAL's self-play on TicTacToe, Kuhn Poker and Simple Negotiation improved performance by up to 10% across 8 reasoning benchmarks, and RL on 100 GlyphBench game tasks improved Qwen3.5-4B on held-out Reasoning Gym problems more than math- or code-trained baselines."
  - question: "What are the main game benchmarks for LLM agents?"
    answer: "TextWorld and Jericho (text adventures), BALROG (six RL environments from BabyAI to NetHack), TextArena (57+ competitive text games with TrueSkill ratings), lmgame-Bench (platformer, puzzle and narrative video games behind a Gym-style API), TextQuests (Infocom interactive fiction that can take humans over 30 hours), VideoGameBench (10 1990s video games from raw pixels) and 2026 suites such as SpireBench (Slay the Spire), XiangqiBench, SpeedrunBench and Learn2Play Bench."
  - question: "How do you turn a game into an RL environment for an LLM?"
    answer: "Wrap it in a reset/step interface that renders state as text (or glyphs or images), parses the model's action, enforces legality, and returns a reward. The hard design choices are what happens on an illegal move, whether rewards are terminal or per turn, how opponents are chosen, and how many seeds and rule variants exist so the policy cannot memorize. GEM, RAGEN and TextArena all provide this interface; GEM adds asynchronous vectorized execution and dense per-turn rewards."
  - question: "Why can game benchmark scores be misleading?"
    answer: "Because several things other than strategic skill move the score. In Kaggle's Game Arena chess competition 78% of Gemini-2.5-Flash losses were attributed to illegal moves. SpireBench's renaming of every game term shows part of model performance rests on prior knowledge of the game. Mindgames found that in failure-heavy environments like Secret Mafia, robustness to opponent errors can be rewarded as much as strategic ability. XiangqiBench found the leading model reaches 38.7% pass@3 but only 5.9% pass^3."
  - question: "Does RL on games transfer to math, code and general reasoning?"
    answer: "Some evidence says yes, with caveats. SPIRAL, MARSHAL (up to 10.0% on AIME and 7.6% on GPQA-Diamond when integrated into multi-agent systems), GlyphBench, ViGaL and lmgame-Bench all report transfer from games. But chess RL with dense engine rewards plateaued far below expert level in Hwang et al. (2025), and RAGEN found that without fine-grained, reasoning-aware rewards agents learn shallow strategies or hallucinated thoughts. Transfer depends on game choice, reward design and evaluation hygiene."
  - question: "What makes a game environment training-grade?"
    answer: "Rules that are novel or renamed so pretraining knowledge does not substitute for play, many seeds and procedurally varied instances, explicit illegal-move handling, outcome rewards that reflect real progress, an opponent pool rather than a single fixed opponent, reliability metrics like pass^k alongside pass@k, error attribution in multi-agent games, embedded reward-hacking probes, and human baselines from strong players."
  - question: "How does Anthroly help build game and interactive RL environments?"
    answer: "Anthroly's PhD experts and domain specialists design novel rule sets and renamed variants, write progress metrics that track real skill, build expert reference play and human baselines, author multi-agent negotiation and social-deduction scenarios, and audit trajectories for illegal-move exploits and reward hacks. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Games are the oldest RL environments and the newest fashion in LLM post-training. They give you what most agent tasks lack: a rule engine that decides what is legal, an outcome nobody has to judge, an opponent that gets stronger as you do, and infinite seeds. That makes them look like free training signal. The 2025-2026 literature shows the catch. Game scores move with illegal-move rates, memorized game knowledge, harness quality and opponent mistakes, not only with strategic skill, and a policy trained against a leaky game learns the leak. This post walks through how the main game environments were built, how labs train on them, why their scores mislead, and what a training-grade game environment needs.**

## The short answer

A credible game environment for LLM agent RL has six parts. **A rule engine with a text (or glyph, or pixel) rendering** behind a `reset()`/`step()` interface, as in TextWorld, BALROG, TextArena and GEM. **An action parser and an explicit illegal-move policy**, because illegal moves dominate failures in practice. **A reward that tracks real progress**: terminal win/loss for competitive games, achievement or progression metrics for open-ended ones (BALROG had to replace NetHack's in-game score). **Opponents and variation**: self-play or an opponent pool, many seeds, and procedurally generated or renamed rules so pretraining knowledge cannot stand in for play. **Reliability and attribution metrics**: pass^k alongside pass@k, error attribution in multi-agent games, and human baselines. And **probes for exploits**, such as Hack-Verifiable TextArena's embedded reward-hacking opportunities. Games are a strong source of multi-turn RL signal. Without those checks you end up measuring the harness.

## Why do labs train LLM agents on games at all?

Three reasons, in rising order of ambition.

**Evaluation of agentic skills that static benchmarks miss.** Long-horizon planning, exploration, memory, opponent modeling and recovery from mistakes are hard to test with single-turn questions. A game provides all of them with an objective outcome.

**Cheap, verifiable multi-turn RL.** A game engine is a free verifier. It is fast, parallel and deterministic given a seed. Frameworks such as [RAGEN](https://arxiv.org/abs/2504.20073) (Wang et al., 2025) and [GEM](https://arxiv.org/abs/2510.01051) (Liu et al., 2025) use stylized games to study multi-turn agent RL precisely because the environment is cheap and the reward is unambiguous.

**Transfer to general reasoning.** The newest claim is that games teach reasoning that carries over to math, code and science:

| Work | Games trained on | Reported transfer |
|---|---|---|
| [SPIRAL](https://arxiv.org/abs/2506.24119) (Liu et al., 2025) | TicTacToe, Kuhn Poker, Simple Negotiation via self-play | Up to 10% across 8 reasoning benchmarks on 4 models; outperforms SFT on 25,000 expert game trajectories |
| [MARSHAL](https://arxiv.org/abs/2510.15414) (Yuan et al., 2025) | Cooperative and competitive games via self-play, Qwen3-4B | Up to 28.7% on held-out games; up to 10.0% on AIME and 7.6% on GPQA-Diamond inside multi-agent systems |
| [GlyphBench](https://arxiv.org/abs/2609.34214) (Castanyer et al., 2026) | 100 of 360+ Unicode-grid game tasks | Qwen3.5-4B reaches 63.48% on held-out Reasoning Gym, beating base, math-trained and code-trained baselines |
| [lmgame-Bench](https://arxiv.org/abs/2505.15146) (Hu et al., 2025) | A single game from the suite | Transfers to unseen games and external planning tasks |
| [ViGaL](https://arxiv.org/abs/2506.08011) (Xie et al., 2025) | Arcade-like games such as Snake, 7B multimodal model | Gains on MathVista, MMMU and VSI-Bench without seeing worked solutions during RL |
| [Stratagem](https://arxiv.org/abs/2604.17696) (Feng et al., 2026) | Game self-play with a Reasoning Transferability Coefficient | Strongest gains on competition-level mathematics |

The pattern is real enough that games now sit next to math and code in some RL data mixes. The caveat comes later: transfer depends heavily on reward design and on which games you choose.

## How were text-game environments built?

The lineage starts with interactive fiction and grows toward full commercial games.

**TextWorld** ([Côté et al., 2018](https://arxiv.org/abs/1806.11532)) is a Python sandbox that handles play-through, state tracking and reward assignment, and, crucially, can *generate* new games with precise control over difficulty, scope and language. Generating sets of similar but varied games is what lets you study generalization rather than memorization. **Jericho** ([Hausknecht et al., 2019](https://arxiv.org/abs/1909.05398)) took the opposite route: man-made interactive fiction games, with combinatorial action spaces and commonsense demands that generators do not reproduce. Those two choices, procedural versus human-authored, still define the design space.

**LMRL Gym** ([Abdulhai et al., 2023](https://arxiv.org/abs/2311.18232)) recast the problem for language models specifically: 8 multi-turn tasks across open-ended dialogue and text games, plus a toolkit for offline value-based and policy-based RL. **SmartPlay** ([Wu et al., 2023](https://arxiv.org/abs/2310.01557)) used 6 games (including Rock-Paper-Scissors, Tower of Hanoi and Minecraft) and mapped each to a subset of 9 agent capabilities, so a score could be decomposed.

**BALROG** ([Paglieri et al., 2024](https://arxiv.org/abs/2411.13543)) bundled six existing RL environments, BabyAI, Crafter, TextWorld, Baba Is AI, MiniHack and the NetHack Learning Environment, ranging from tasks a non-expert solves in seconds to one that takes years to master. Two of its design choices are worth copying. First, it scores each environment from 0 to 100, binary for task-completion environments and the proportion of achievements for TextWorld, Crafter and NetHack. Second, because NetHack's in-game score does not reflect actual progression, the authors built a data-informed progression metric instead. The default reward of a game is often not the right reward. BALROG also documented a **knowing-doing gap**: models exit the NetHack dungeon early, ending the game, even though in a separate query they correctly say that doing so is an instant death.

**TextQuests** ([Phan et al., 2025](https://arxiv.org/abs/2507.23701)) went back to the Infocom suite, adventures that can take human players over 30 hours and hundreds of precise actions, and forbade external tools so the test isolates long-context, trial-and-error reasoning in one session.

| Environment | Source of games | Interface | What it measures well |
|---|---|---|---|
| TextWorld (2018) | Procedurally generated text adventures | Python, RL formalism | Generalization across controlled variants |
| Jericho (2019) | Human-authored interactive fiction | Learning environment | Combinatorial actions, commonsense |
| BALROG (2024) | BabyAI, Crafter, TextWorld, Baba Is AI, MiniHack, NetHack | Language and vision observations | Long-horizon planning; knowing-doing gap |
| TextArena (2025) | 57+ competitive text games | Online play, TrueSkill | Negotiation, theory of mind, deception |
| lmgame-Bench (2025) | Platformer, puzzle and narrative video games | Gym-style API with perception and memory scaffolds | Separating models while controlling prompt variance and contamination |
| TextQuests (2025) | Infocom interactive fiction | No external tools | Long-context exploration over hundreds of actions |
| VideoGameBench (2025) | 10 1990s video games, 3 kept secret | Raw pixels, real time or paused | Perception and real-time control |
| GlyphBench (2026) | 360+ tasks across games | 2D Unicode grids | RL post-training and transfer |

## How do competitive and multi-agent game environments work?

Single-player games run out of difficulty. Competitive games do not, because the opponent improves.

**TextArena** ([Guertler et al., 2025](https://arxiv.org/abs/2504.11442)) is the hub of this branch: 57+ single-, two- and multi-player text games, an online play system against humans and other submitted models, and real-time TrueSkill ratings. It targets skills that static benchmarks rarely touch: negotiation, theory of mind and deception. **GTBench** ([Duan et al., 2024](https://arxiv.org/abs/2402.12348)) took a game-theoretic view with 10 tasks spanning complete versus incomplete information, dynamic versus static and probabilistic versus deterministic settings. It found LLMs fail in complete-information deterministic games yet are competitive in probabilistic ones, and that chain-of-thought and tree-of-thought do not always help.

**Self-play RL on these games** needs two things single-agent RL does not. SPIRAL runs a fully online, multi-turn, multi-agent system in which one shared policy plays both sides, and it introduces **role-conditioned advantage estimation** to stabilize training. MARSHAL adds a turn-level advantage estimator and agent-specific advantage normalization. The common idea: in a zero-sum game the two roles face different base rates (first-mover advantage, asymmetric information), so a single baseline gives biased advantages. With per-game, per-role baselines,

$$
A_{t}^{(g,\rho)} = R^{(\rho)} - b_{g,\rho}, \qquad R^{(1)} = -R^{(2)} \in \{-1, 0, 1\}
$$

where $g$ is the game, $\rho$ the role and $b_{g,\rho}$ a running mean of that role's return in that game. Without it, the policy learns "role 1 is good" instead of "this move was good".

The [Mindgames](https://arxiv.org/abs/2605.29512) arena (Wang et al., 2026), built on TextArena, ran a 2025 competition at a major AI conference with 944 submitted agents from 76 teams across Colonel Blotto, Iterated Prisoner's Dilemma, Codenames and Secret Mafia, and released 29,571 games with turn-level observations, actions and rewards. The winning approach in the generalization track ([Korshuk et al., 2026](https://arxiv.org/abs/2606.00017)) computed rewards only at episode end, propagated them back to the originating steps by task-specific rules, and excluded steps lacking valid dependent information from training. With curriculum-based opponent sampling, a single 8B open model matched or beat much larger proprietary systems, including GPT-5, in head-to-head play.

## What does the environment code actually look like?

Most of the engineering is not in the game. It is in the wrapper: rendering, parsing, legality, reward and opponent choice. A minimal version:

```python
import random

class TextGameEnv:
    """Gym-style wrapper for a two-player text game with an opponent pool."""

    def __init__(self, engine, opponents, illegal="lose", max_turns=60, rename=None):
        self.engine, self.opponents = engine, opponents
        self.illegal, self.max_turns = illegal, max_turns
        self.rename = rename or {}          # term -> novel name, defeats memorized lore

    def render(self, state):
        text = self.engine.describe(state)
        for k, v in self.rename.items():
            text = text.replace(k, v)
        return text

    def reset(self, seed):
        random.seed(seed)
        self.state = self.engine.new_game(seed)
        self.opp = random.choice(self.opponents)   # pool, not one fixed opponent
        self.role = random.choice([0, 1])           # train both roles
        self.turns, self.log = 0, []
        return self.render(self.state), {"role": self.role}

    def step(self, model_text):
        action = self.engine.parse(model_text)
        legal = action is not None and self.engine.is_legal(self.state, action)
        self.log.append({"turn": self.turns, "raw": model_text, "legal": legal})
        if not legal:
            if self.illegal == "lose":
                return self.render(self.state), -1.0, True, {"cause": "illegal"}
            return self.render(self.state), 0.0, False, {"cause": "retry"}
        self.state = self.engine.apply(self.state, action)
        if not self.engine.done(self.state):
            self.state = self.engine.apply(self.state, self.opp.act(self.state))
        self.turns += 1
        done = self.engine.done(self.state) or self.turns >= self.max_turns
        reward = self.engine.outcome(self.state, self.role) if done else 0.0
        return self.render(self.state), reward, done, {"cause": "end" if done else None}
```

Every line encodes a decision that moves results. Losing on an illegal move makes the reward honest but sparse; allowing retries makes training easier but lets a policy probe the parser. Recording the cause of every terminal state is what lets you later separate "lost on strategy" from "lost on formatting", which turns out to matter a lot.

## Why do game benchmark scores mislead?

This is where most teams get burned. Eight failure modes are now documented.

1. **Illegal moves dominate.** [AutoHarness](https://arxiv.org/abs/2603.03329) (Lou et al., 2026) reports that in Kaggle's Game Arena chess competition, 78% of Gemini-2.5-Flash losses were attributed to illegal moves. A synthesized code harness that prevented illegal moves in 145 TextArena games let the smaller model outperform Gemini-2.5-Pro. Without a fixed, reported harness, you are ranking formatting discipline.
2. **Prior knowledge stands in for play.** [SpireBench](https://arxiv.org/abs/2610.12596) (Lowe and Keemink, 2026) gives models the complete commercial Slay the Spire. Frontier models match the average human player but stay far behind experts, and a self-consistent renaming of every game term shows part of their performance rests on prior knowledge of the game. lmgame-Bench names data contamination as one of three reasons that dropping LLMs into popular games does not make an effective evaluation, and [Learn2Play Bench](https://arxiv.org/abs/2610.08215) (Li et al., 2026) builds new games with novel or counterintuitive rules for exactly this reason.
3. **The default score is not progress.** BALROG had to replace NetHack's game score with a progression metric. Any game with points for incidental actions will be farmed by RL.
4. **Coverage is not reliability.** [XiangqiBench](https://arxiv.org/abs/2610.02425) (Chai et al., 2026) asks agents to convert 119 forced-mate endgames against an engine defender. Models play the reference first move in 26.1% of sighted trials, yet only 13.9% of those trials end in a win. The leading model reaches 38.7% pass@3 but only 5.9% pass^3. The two metrics answer different questions: with per-trial win probability $p$, pass@k is $1-(1-p)^k$ while pass^k is $p^k$. An agent that wins a position one time in three looks fine on pass@3 (about 0.70) and useless on pass^3 (about 0.04). Deployment needs the second.
5. **Opponent errors masquerade as skill.** Mindgames found that failure-heavy environments can reward robustness to opponent errors as much as strategic ability, with a pronounced error-survival confound in Secret Mafia. Their response, a frozen reference pool of top-ranked, low-error agents (MG-Ref), is the right default for any multi-agent leaderboard.
6. **Simulation is not anticipation.** In XiangqiBench, 32.3% of accepted simulation calls stopped on an illegal move, and in 49.3% of comparable cases the real defender replied differently from the line the agent simulated. Self-authored rollouts check legality but cannot anticipate the opponent.
7. **Memory does not help by default.** SpireBench found models do not improve from the memories they write across runs, which are often wrong and overly cautious. Learn2Play found that retaining complete records of actions and feedback supported better learning than summarizing experience into rules.
8. **Games get hacked like everything else.** [Hack-Verifiable TextArena](https://arxiv.org/abs/2605.20744) (Roth et al., 2026) embeds detectable reward-hacking opportunities directly into environments so exploitation is verifiable by design. If your game wrapper has a parser, a log or a scoring script, assume a policy will find its loopholes.

Saturation arrives quickly too. The ARC-AGI-3 think-aloud study ([Liu et al., 2026](https://arxiv.org/abs/2610.34523)) notes that LLMs with well-designed harnesses reach saturated performance on the public ARC-AGI-3 games, and its 144 human trajectories show successful humans use qualitative representations far more often than successful LLM agents (50.0% versus 14.3%).

## When does game RL fail to transfer?

The transfer table above is the optimistic half. The other half:

- **Plateaus that RL cannot break.** Training on chess with dense rewards from a chess-pretrained action-value network, [Hwang et al. (2025)](https://arxiv.org/abs/2507.00726) found distillation-style dense rewards often beat sparse binary ones, but all models plateaued far below expert level. They trace this to a deficit in the pretrained model's internal understanding of chess that RL alone may not overcome.
- **Shallow strategies without reasoning-aware rewards.** RAGEN reports a recurring **Echo Trap** (reward variance cliffs and gradient spikes) in multi-turn agent RL, and finds that without fine-grained, reasoning-aware reward signals, agent reasoning hardly emerges; agents show shallow strategies or hallucinated thoughts.
- **Multi-game instability.** [Divide-Fuse-Conquer](https://arxiv.org/abs/2505.16401) (Zhang et al., 2025) found that simply combining scenarios across 18 TextArena games introduces training instability and poor performance, and resorted to training per-group specialists and fusing their parameters.
- **Algorithm mismatch.** GEM argues that GRPO is not compatible with the full RL setting of dense per-turn rewards, and its baselines across 24 environments use REINFORCE with Return Batch Normalization for better credit assignment. [Odysseus](https://arxiv.org/abs/2605.00347) (Shi et al., 2026) found a PPO variant with a lightweight turn-level critic substantially more stable than critic-free GRPO and Reinforce++ for 100+ turn Super Mario Land play.

The practical lesson: pick games whose skills you want (hidden information for belief tracking, negotiation for language strategy, long-horizon roguelikes for planning), measure transfer on held-out non-game tasks every run, and treat "games improved AIME" as a hypothesis to re-test on your model, not a law.

## Where do new game environments come from now?

Hand-building games does not scale, so the frontier is synthesis.

- **Procedural reasoning generators.** [Reasoning Gym](https://arxiv.org/abs/2505.24760) (Stojanovski et al., 2025) provides over 100 data generators and verifiers across algebra, logic, graph theory and common games with adjustable complexity. [Enigmata](https://arxiv.org/abs/2505.19914) (Chen et al., 2025) has 36 puzzle tasks in seven categories, each with a generator and rule-based verifier. [SynLogic](https://arxiv.org/abs/2505.19641) (Liu et al., 2025) synthesizes 35 logical reasoning tasks. [KORGym](https://arxiv.org/abs/2505.14552) (Shi et al., 2025) offers over fifty textual or visual games for multi-turn evaluation.
- **LLM-written games.** [PlayTrain](https://arxiv.org/abs/2609.09059) (Truong et al., 2026) has LLMs generate JavaScript games from a minimal prompt and runs any JS game as a Gym environment, at over 1M agent decisions per second on a single GPU node for pixel-based agents.
- **Self-designed environments.** [SPADE](https://arxiv.org/abs/2608.19197) (Liu et al., 2026) has one LLM act as an Environment Designer, writing complete Gym-style environments with state transitions, rewards and verification code, and as a Reasoning Agent that learns in them, with the designer optimizing the agent's regret. Grounding the designer on pretraining documents and giving it an environment memory were critical; at 30B parameters SPADE improved over the strongest fixed-environment baseline by +5.3 on average across eight held-out benchmarks.

Synthesis removes the cost of writing games. It does not remove the need to check that a generated game is winnable, that its reward means what it says, and that it is not a renamed copy of something in pretraining.

## What does a training-grade game environment need?

1. **Novel or renamed rules** for every evaluation split, so memorized game lore cannot substitute for play (SpireBench's renaming, Learn2Play's counterintuitive rules).
2. **Many seeds and procedural variants**, with held-out variants that differ in mechanics, not just layout.
3. **An explicit, reported illegal-move policy** and a fixed harness, with illegal-move rate reported separately from win rate.
4. **Progress-tracking rewards** that experts agree reflect skill, not the game's incidental point system.
5. **An opponent pool** with frozen, low-error reference agents, plus self-play for training.
6. **Reliability metrics**: pass^k beside pass@k, and per-position consistency.
7. **Error attribution** in multi-agent games so wins from opponent mistakes are visible.
8. **Embedded exploit probes**, in the style of Hack-Verifiable TextArena, and human audit of the highest-reward trajectories each round.
9. **Human baselines** from strong players, not only average ones, because the gap to experts (SpireBench) is the gap that matters.
10. **Held-out transfer evals** on non-game tasks, run every checkpoint.

## Where does expert human data matter in game environments?

SPIRAL's result that self-play beat SFT on 25,000 expert game trajectories is sometimes read as "games do not need humans". The opposite is closer to true: humans move from producing trajectories to designing and auditing the environment. Someone has to invent rules that are novel but coherent, write a progression metric that a strong player would accept (BALROG's NetHack metric), decide which mechanics a renamed variant must preserve, and tell a clever strategy from an exploit. Expert baselines define where the ceiling is: SpireBench compared models against expert players, Learn2Play found top human players reached higher peak scores and explored more varied strategies, and the ARC-AGI-3 dataset pairs time-synchronized actions with think-aloud audio from 64 participants to show how humans form and revise world models. Multi-agent negotiation and social-deduction scenarios need people who understand persuasion, bargaining and deception well enough to make the incentives real. Expert gameplay data still has uses as well. [Orak](https://arxiv.org/abs/2506.03610) (Park et al., 2025) releases a fine-tuning dataset of expert LLM gameplay trajectories across 12 video games to turn general LLMs into game agents.

## How Anthroly can help

Anthroly works with PhD experts and domain specialists who design novel and renamed game rule sets, write progression metrics that track real skill, build expert reference play and strong-human baselines, author negotiation, planning and social-deduction scenarios for multi-agent RL, and audit trajectories for illegal-move exploits, parser abuse and reward hacks. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building game or interactive environments for agent RL and want an expert audit of what your scores actually measure, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [Can LLMs improve without human data? What self-play and label-free RL actually show](/blog/can-llms-improve-without-human-data-self-play-rl)
- [Why is multi-turn RL for LLM agents unstable?](/blog/why-is-multi-turn-rl-for-llm-agents-unstable)
- [How many RL environments do you need to train an agent?](/blog/how-many-rl-environments-do-you-need-to-train-an-agent)
- [What makes a training-grade RL environment?](/blog/what-makes-a-training-grade-rl-environment)
- [Building contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks)
- [Step-level rewards for AI agents](/blog/step-level-rewards-for-ai-agents)
- [How are web and computer-use RL environments built?](/blog/how-are-web-and-computer-use-rl-environments-built)

---

## References

1. Côté, M.-A., Kádár, Á., Yuan, X., et al. (2018). [TextWorld: A Learning Environment for Text-based Games](https://arxiv.org/abs/1806.11532). arXiv:1806.11532.
2. Hausknecht, M., Ammanabrolu, P., Côté, M.-A., & Yuan, X. (2019). [Interactive Fiction Games: A Colossal Adventure](https://arxiv.org/abs/1909.05398). arXiv:1909.05398.
3. Abdulhai, M., White, I., Snell, C., et al. (2023). [LMRL Gym: Benchmarks for Multi-Turn Reinforcement Learning with Language Models](https://arxiv.org/abs/2311.18232). arXiv:2311.18232.
4. Wu, Y., Tang, X., Mitchell, T. M., & Li, Y. (2023). [SmartPlay: A Benchmark for LLMs as Intelligent Agents](https://arxiv.org/abs/2310.01557). arXiv:2310.01557.
5. Duan, J., Zhang, R., Diffenderfer, J., et al. (2024). [GTBench: Uncovering the Strategic Reasoning Limitations of LLMs via Game-Theoretic Evaluations](https://arxiv.org/abs/2402.12348). arXiv:2402.12348.
6. Paglieri, D., Cupiał, B., Coward, S., et al. (2024). [BALROG: Benchmarking Agentic LLM and VLM Reasoning On Games](https://arxiv.org/abs/2411.13543). arXiv:2411.13543.
7. Guertler, L., Cheng, B., Yu, S., et al. (2025). [TextArena](https://arxiv.org/abs/2504.11442). arXiv:2504.11442.
8. Wang, Z., Wang, K., Wang, Q., et al. (2025). [RAGEN: Understanding Self-Evolution in LLM Agents via Multi-Turn Reinforcement Learning](https://arxiv.org/abs/2504.20073). arXiv:2504.20073.
9. Hu, L., Huo, M., Zhang, Y., et al. (2025). [lmgame-Bench: How Good are LLMs at Playing Games?](https://arxiv.org/abs/2505.15146). arXiv:2505.15146.
10. Zhang, A. L., Griffiths, T. L., Narasimhan, K. R., & Press, O. (2025). [VideoGameBench: Can Vision-Language Models complete popular video games?](https://arxiv.org/abs/2505.18134). arXiv:2505.18134.
11. Phan, L., Mazeika, M., Zou, A., & Hendrycks, D. (2025). [TextQuests: How Good are LLMs at Text-Based Video Games?](https://arxiv.org/abs/2507.23701). arXiv:2507.23701.
12. Park, D., Kim, M., Choi, B., et al. (2025). [Orak: A Foundational Benchmark for Training and Evaluating LLM Agents on Diverse Video Games](https://arxiv.org/abs/2506.03610). arXiv:2506.03610.
13. Liu, B., Guertler, L., Yu, S., et al. (2025). [SPIRAL: Self-Play on Zero-Sum Games Incentivizes Reasoning via Multi-Agent Multi-Turn Reinforcement Learning](https://arxiv.org/abs/2506.24119). arXiv:2506.24119.
14. Yuan, H., Xu, Z., Tan, Z., et al. (2025). [MARSHAL: Incentivizing Multi-Agent Reasoning via Self-Play with Strategic LLMs](https://arxiv.org/abs/2510.15414). arXiv:2510.15414.
15. Xie, Y., Ma, Y., Lan, S., et al. (2025). [Play to Generalize: Learning to Reason Through Game Play](https://arxiv.org/abs/2506.08011). arXiv:2506.08011.
16. Hwang, D., Lee, H., Choo, J., et al. (2025). [Can Large Language Models Develop Strategic Reasoning? Post-training Insights from Learning Chess](https://arxiv.org/abs/2507.00726). arXiv:2507.00726.
17. Zhang, X., Zheng, H., Lv, A., et al. (2025). [Divide-Fuse-Conquer: Eliciting "Aha Moments" in Multi-Scenario Games](https://arxiv.org/abs/2505.16401). arXiv:2505.16401.
18. Liu, Z., Sims, A., Duan, K., et al. (2025). [GEM: A Gym for Agentic LLMs](https://arxiv.org/abs/2510.01051). arXiv:2510.01051.
19. Stojanovski, Z., Stanley, O., Sharratt, J., et al. (2025). [REASONING GYM: Reasoning Environments for Reinforcement Learning with Verifiable Rewards](https://arxiv.org/abs/2505.24760). arXiv:2505.24760.
20. Chen, J., He, Q., Yuan, S., et al. (2025). [Enigmata: Scaling Logical Reasoning in Large Language Models with Synthetic Verifiable Puzzles](https://arxiv.org/abs/2505.19914). arXiv:2505.19914.
21. Liu, J., Fan, Y., Jiang, Z., et al. (2025). [SynLogic: Synthesizing Verifiable Reasoning Data at Scale for Learning Logical Reasoning and Beyond](https://arxiv.org/abs/2505.19641). arXiv:2505.19641.
22. Shi, J., Yang, J., Liu, J., et al. (2025). [KORGym: A Dynamic Game Platform for LLM Reasoning Evaluation](https://arxiv.org/abs/2505.14552). arXiv:2505.14552.
23. Lou, X., Lázaro-Gredilla, M., Dedieu, A., et al. (2026). [AutoHarness: improving LLM agents by automatically synthesizing a code harness](https://arxiv.org/abs/2603.03329). arXiv:2603.03329.
24. Feng, X., Yin, D., Feng, X., et al. (2026). [Stratagem: Learning Transferable Reasoning via Trajectory-Modulated Game Self-Play](https://arxiv.org/abs/2604.17696). arXiv:2604.17696.
25. Shi, C., Li, W., Liang, X., et al. (2026). [Odysseus: Scaling VLMs to 100+ Turn Decision-Making in Games via Reinforcement Learning](https://arxiv.org/abs/2605.00347). arXiv:2605.00347.
26. Roth, A., Samanta, A., Halevy, M., Levine, Y., & Efroni, Y. (2026). [Hack-Verifiable Environments: Towards Evaluating Reward Hacking at Scale](https://arxiv.org/abs/2605.20744). arXiv:2605.20744.
27. Wang, K., Thöni, A., Kempinski, B., et al. (2026). [MINDGAMES: A Live Arena for Evaluating Social and Strategic Reasoning in Multi-Agent LLMs](https://arxiv.org/abs/2605.29512). arXiv:2605.29512.
28. Korshuk, A., Buyantuev, A., & Makarov, I. (2026). [MindGames Arena Generalization Track: In2AI Solution with Delayed Per-Step Reward Attribution](https://arxiv.org/abs/2606.00017). arXiv:2606.00017.
29. Liu, B., Yu, S., Jiang, Y., et al. (2026). [SPADE: Self-Play in Adaptive Synthetic Executable Environments](https://arxiv.org/abs/2608.19197). arXiv:2608.19197.
30. Truong, R., Ying, L., Gershman, S. J., & Irie, K. (2026). [PlayTrain: An Efficient Reinforcement Learning Framework for LLM-Generated Adaptable JavaScript Games](https://arxiv.org/abs/2609.09059). arXiv:2609.09059.
31. Castanyer, R. C., Côté, M.-A., Sargent, M. J., et al. (2026). [GlyphBench: A Playground for Language-Model Reinforcement Learning](https://arxiv.org/abs/2609.34214). arXiv:2609.34214.
32. Chai, Y., Peng, Q., & Xiong, H. (2026). [Finding the Move Is Not Winning the Game: XiangqiBench for Closed-Loop Evaluation of LLM Agents](https://arxiv.org/abs/2610.02425). arXiv:2610.02425.
33. Li, Y., Qiu, J., Zheng, Z., et al. (2026). [Learn2Play Bench: How Well Do LLM Agents Learn from Experience in Unfamiliar Environments?](https://arxiv.org/abs/2610.08215). arXiv:2610.08215.
34. Lowe, S. C., & Keemink, S. W. (2026). [SpireBench: Evaluating Long-Horizon Strategic Play of Agentic Models with Slay the Spire](https://arxiv.org/abs/2610.12596). arXiv:2610.12596.
35. Liu, S., Warrier, A., Nguyen, D., et al. (2026). [How Humans Learn Unfamiliar Worlds: A Think-Aloud Dataset on ARC-AGI-3](https://arxiv.org/abs/2610.34523). arXiv:2610.34523.
