---
title: "How Are Web and Computer-Use RL Environments Built? Sandboxed Sites, VM Snapshots, State Checkers, and VLM Judges"
description: "Web and computer-use agents are now trained with RL, not just evaluated. Here is how environments like WebArena, OSWorld, Windows Agent Arena, AndroidWorld and BrowserGym are engineered, how WebRL, DigiRL, ZeroGUI and UI-TARS-2 turn them into training signals, what AgentRewardBench and Online-Mind2Web show about reward errors, and a checklist for building a training-grade GUI environment."
tags:
  - rl-environments
  - computer-use-agents
  - web-agents
  - verifiers
  - reward-design
  - agent-evals
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-28T12:45:00.000Z'
updatedAt: '2026-10-28T12:45:00.000Z'
faq:
  - question: "What is a computer-use RL environment?"
    answer: "It is a reproducible computer, usually a virtual machine, container or emulator, that an agent controls through screenshots, accessibility trees, mouse and keyboard actions or ADB, together with a task setup script, a reset mechanism and a checker that decides whether the task was done. OSWorld, for example, pairs each of its 369 tasks with an initial-state configuration and a custom execution-based evaluation script; AndroidWorld gives each of its 116 tasks initialization, success-checking and tear-down logic."
  - question: "How do you reward a web agent during RL?"
    answer: "Three ways. Programmatic checkers inspect the final state, such as a database row, a file or a URL, and are precise but brittle. Outcome reward models or VLM judges read the trajectory and screenshots, which scales to synthetic tasks but adds false positives. Hybrids use checkers where a ground truth exists and judges elsewhere. WebRL trained an outcome reward model on WebArena-Lite; ZeroGUI used majority or unanimous voting across several VLM queries to cut false positives."
  - question: "Are LLM judges reliable enough to reward web agents?"
    answer: "Only partially. AgentRewardBench (Lù et al., 2025) had experts review 1,302 trajectories and found no LLM judge above 70% precision, meaning roughly 30% of trajectories judged successful were not. The same study found WebArena's rule-based checkers had only 55.9% recall, rejecting many real successes. UI-TARS-2 reported an F1 of 83.8 for its generative outcome reward model on 300 human-annotated GUI traces. Judges need expert-labeled calibration sets before they are used as rewards."
  - question: "Why do web agent benchmark scores differ so much?"
    answer: "Task difficulty, live-site drift and grading. Xue et al. (2025) found that agents reporting close to 90% on WebVoyager scored far lower on Online-Mind2Web, 300 real-user tasks on 136 live websites, where OpenAI's Operator reached 61% and many recent agents did not beat the early-2024 SeeAct baseline. OSWorld's maintainers fixed more than 300 issues, including changed web pages, ambiguous instructions and fragile evaluators, when they released OSWorld-Verified in July 2025."
  - question: "Does RL actually help computer-use agents?"
    answer: "The reported gains are large. WebRL raised Llama-3.1-8B from 4.8% to 42.4% on WebArena-Lite. DigiRL took a 1.3B VLM from 17.7% to 67.2% on Android-in-the-Wild tasks over supervised fine-tuning on static demonstrations. ZeroGUI reported 14% and 63% relative improvements on OSWorld for UI-TARS-7B and Aguvis-7B. UI-TARS-2, trained with multi-turn RL on several thousand cloud VMs, reported 47.5 on OSWorld and 50.6 on Windows Agent Arena."
  - question: "How many tasks does a computer-use RL environment need?"
    answer: "Far more than benchmarks contain, which is why most RL systems generate tasks. WebArena has 812 tasks and OSWorld 369, enough for evaluation but small for RL. WebRL generates new tasks from the agent's failures, ZeroGUI has a VLM propose tasks from the current screen, AndroidWorld parameterizes 116 task templates with random seeds to produce millions of goals, and UI-TARS-2 synthesizes verifiable browsing questions from Wikipedia by obfuscating entity attributes."
  - question: "How does Anthroly help build computer-use environments?"
    answer: "Anthroly designs task suites, state-based checkers and expert-labeled judge calibration sets for web, desktop and mobile agents, and audits environments for infeasible tasks, drift and grader errors. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Two years ago, web and computer-use environments were benchmarks: a few hundred tasks, a success script, a leaderboard. Today they are training infrastructure. WebRL, DigiRL, ZeroGUI and ByteDance's UI-TARS-2 all train agents with reinforcement learning inside sandboxed browsers, desktops and phones, and the gains they report are large. That shift changes what the environment has to do. A benchmark can tolerate a fragile checker that runs once per release; an RL environment runs the checker millions of times and the policy will find every way it is wrong. This post walks through how the main environments are engineered, how they become reward signals, what the measurement studies say about reward errors, and what a training-grade GUI environment needs.**

## The short answer

A web or computer-use RL environment has five parts: **(1)** a reproducible machine (self-hosted websites, a VM snapshot, a container or an Android emulator) that can be reset to a known state quickly and in parallel; **(2)** an observation and action interface (screenshots, accessibility trees or DOM, and mouse, keyboard, ADB or code actions); **(3)** a task generator, because benchmark-sized task sets are too small for RL; **(4)** a reward, either a programmatic checker that reads the final state or a learned judge that reads the trajectory; and **(5)** monitoring for drift, infeasible tasks and reward errors. The hardest part is the reward. Expert review in AgentRewardBench found that no LLM judge exceeded 70% precision on web trajectories, while WebArena-style rule checkers missed almost half of real successes. Teams that get good results treat the checker and judge as models to be calibrated against expert labels, not as ground truth.

## What do the major environments look like?

| Environment | Platform | Tasks | How success is checked | Reported gap at release |
|---|---|---|---|---|
| WebArena (Zhou et al., 2023) | Self-hosted sites: e-commerce, forum, GitLab-style dev, CMS, plus a map | 812 | Functional correctness: programmatic checks on site state and answers | Best GPT-4 agent 14.41% vs. humans 78.24% |
| VisualWebArena (Koh et al., 2024) | Self-hosted Classifieds, Reddit and Shopping sites | 910 visually grounded | Execution-based checks, including visual ones | Best VLM agent 16.4% vs. humans 88.7% |
| OSWorld (Xie et al., 2024) | Ubuntu, Windows and macOS VMs with real apps | 369, including 30 infeasible | Per-task setup config plus one of 134 evaluation functions | Best model 12.24% vs. humans 72.36% |
| Windows Agent Arena (Bonatti et al., 2024) | Real Windows OS, adapted from OSWorld | 150+ | OSWorld-style evaluators; full run parallelized on Azure in about 20 minutes | Navi 19.5% vs. unassisted humans 74.5% |
| AndroidWorld (Rawles et al., 2024) | Android emulator, 20 real apps | 116 parameterized templates | Per-task init, success check and tear-down on device state | Best agent 30.6% |
| BrowserGym (de Chezelles et al., 2024) | Gym-style wrapper unifying web benchmarks | Six benchmarks in its main study | Inherits each benchmark's evaluator | Standardizes observation and action spaces |
| Online-Mind2Web (Xue et al., 2025) | Live public websites | 300 real-user tasks on 136 sites | Human evaluation plus WebJudge, an LLM judge with about 85% agreement with humans | Operator 61%; many agents below SeeAct |

## How does a task become checkable?

OSWorld's task format is the clearest template. Each task is a JSON record with three parts: the natural-language instruction; a `config` list that sets up the initial state, for example downloading a spreadsheet and receipts to the desktop and opening the file; and an `evaluator` that runs post-configuration steps, pulls the result out of the VM with a getter, fetches the expected result, and compares them with a named function and options. A bookkeeping task, abridged from the paper:

```json
{
  "instruction": "Please update my bookkeeping sheet with the recent transactions ...",
  "config": [
    {"type": "download", "parameters": {"files": [{"path": "/home/user/Desktop/my_bookkeeping.xlsx", "url": "..."}]}},
    {"type": "open", "parameters": {"path": "/home/user/Desktop/my_bookkeeping.xlsx"}}
  ],
  "evaluator": {
    "postconfig": [{"type": "activate_window", "parameters": {"window_name": "my_bookkeeping.xlsx LibreOffice Calc"}}],
    "result": {"type": "vm_file", "path": "/home/user/Desktop/my_bookkeeping.xlsx"},
    "expected": {"type": "cloud_file", "path": "..."},
    "func": "compare_table",
    "options": {"rules": [{"type": "sheet_fuzzy", "rules": [{"range": ["A1:A8"]}]}]}
  }
}
```

Three design choices in OSWorld carry over to any RL environment. **Checkers read state, not transcripts:** they compare files, settings, cookies or URLs rather than trusting what the agent says it did. **Time-sensitive tasks get live getters:** where the right answer changes, such as a paper's citation count, the getter fetches the value at evaluation time. **Infeasible tasks are first-class:** 30 OSWorld tasks cannot be done, and the agent scores only by declaring them infeasible, which tests whether it will fabricate completion.

AndroidWorld adds a fourth: **parameterization.** Each of its 116 tasks is a template whose parameters are drawn from a random seed at initialization, giving millions of distinct goals. This turns a benchmark into a training distribution and makes memorization harder. It also exposes variance: the paper's M3A agent scored 27.6%, 26.3% and 33.2% across three seeds, so a single-seed number can move by several points for reasons unrelated to the agent.

## How do RL systems turn environments into rewards?

| System | Environment | Task source | Reward | Reported result |
|---|---|---|---|---|
| WebRL (Qi et al., 2024) | WebArena-Lite | Self-evolving curriculum: new tasks generated from the agent's failed attempts | Trained outcome reward model (ORM) | Llama-3.1-8B 4.8% → 42.4%; GLM-4-9B 6.1% → 43%; GPT-4-Turbo 17.6% for comparison |
| DigiRL (Bai et al., 2024) | Parallel Android emulators | Android-in-the-Wild tasks with automatic curriculum | VLM-based evaluator | 1.3B VLM 17.7% → 67.2% over SFT on static demonstrations |
| ZeroGUI (Yang et al., 2025) | OSWorld and AndroidLab | VLM proposes tasks from the current environment state | VLM judge over all screenshots, agent's own claims excluded, majority or unanimous vote | 14% relative gain for UI-TARS-7B and 63% for Aguvis-7B on OSWorld |
| UI-TARS-2 (Wang et al., 2025) | VM cluster of several thousand instances (Windows, Ubuntu, Android), plus browser games | Synthesized verifiable tasks, e.g. obfuscated multi-condition browsing questions from Wikipedia | Verifiable rewards where available; generative ORM or GPT-4o-as-judge for web and browsing tasks | 47.5 OSWorld, 50.6 Windows Agent Arena, 73.3 AndroidWorld, 88.2 Online-Mind2Web |

Two patterns stand out. First, every system generates its own training tasks. Benchmarks with a few hundred hand-written tasks are evaluation sets; RL needs a distribution, and the generator becomes part of the environment. Second, as soon as tasks are generated, hand-written checkers stop scaling, and the reward becomes a model. ZeroGUI states the trade-off directly: writing a verifier for every generated task requires manual implementation and debugging, so it uses a VLM to assign binary rewards instead.

## Which reward errors matter most?

False positives. ZeroGUI's ablations found that rewarding failed trajectories hurt more than failing to reward successful ones, because positive rewards carry most of the learning signal. Its estimator is built around precision: it shows the judge all screenshots, since some successes are visible only as a change between states; it hides the agent's own messages, which can claim success on a failed task; and it requires majority or unanimous agreement across repeated judge queries.

The measurement studies show how much room there is to get this wrong.

- **AgentRewardBench** (Lù et al., 2025) collected 1,302 trajectories from four LLM agents on five benchmarks and had experts label success, side effects and repetition. Across 12 LLM judges, none exceeded 70% precision: about 30% of trajectories marked successful were not. Used as an SFT filter or RL reward, that teaches the agent to produce wrong trajectories for a large share of tasks.
- **The same study found rule-based checkers had 55.9% recall.** Its WebArena example: asked for the closest national park to the largest city in Maine, an agent answered "The closest national park to Portland [...] is Acadia National Park" and was marked wrong because the checker required an exact match to "Acadia National Park." In RL, a false negative like this teaches the agent to answer in the checker's format rather than to be right.
- **UI-TARS-2** measured its generative ORM on an in-house set of 300 human-annotated GUI traces and reported an F1 of 83.8. The team also reported that manual inspection found no substantial reward hacking, and suggested agent task completion is more concrete to judge than open-ended text.

These numbers are compatible. Judges are good enough to train with when they are tuned for precision and checked against human labels on the same task distribution; they are not good enough to trust without that check.

One consequence is easy to miss. As a policy masters easy tasks and keeps failing hard ones, most of the remaining failures, and so most of the false positives, sit on exactly the tasks it cannot yet do, which is where a lenient judge does the most damage.

## Why do scores drift between environments and over time?

Live websites change. Xue et al. (2025) showed that WebVoyager, the benchmark behind several close-to-90% claims, skews toward easier tasks; on their Online-Mind2Web set of 300 real-user tasks across 136 sites, a search agent solved only 22% (about 50% of easy, 18% of medium and 3% of hard tasks), Operator reached 61%, and many recent agents did not beat SeeAct from early 2024.

Even self-hosted and VM environments decay. When the OSWorld team released OSWorld-Verified in July 2025, they described collecting and fixing more than 300 pieces of feedback, about two months of work by a roughly ten-person team, covering changed web page structure, ambiguous instructions and evaluation robustness, and moving to AWS for about 50x parallelization. For an RL environment, every one of those issues is a reward bug: an ambiguous instruction with one accepted answer punishes valid alternatives, and a changed page makes a task unsolvable while still expecting success.

## A checklist for a training-grade GUI environment

1. **Reset in seconds, run in parallel.** Snapshots or containers, not reinstalls. Windows Agent Arena's 20-minute full runs on Azure and UI-TARS-2's several-thousand-VM cluster show the scale RL needs.
2. **Freeze what you can.** Self-host sites and pin app versions for training tasks. Reserve live-web tasks for evaluation and re-validate them on a schedule.
3. **Write checkers against state.** Read the database, file, setting or URL; do not grade the agent's description of what it did.
4. **Include infeasible and ambiguous tasks on purpose.** Reward correct refusal and clarification so the agent does not learn that every task can be marked complete.
5. **Parameterize templates.** Randomize names, values and initial states per episode, as AndroidWorld does, and report results across seeds.
6. **Calibrate judges before you train.** Build an expert-labeled set of trajectories from your own task distribution, including side effects and partial completions, and measure precision and recall of every checker and judge on it. Tune for precision.
7. **Hide the agent's claims from the judge.** Grade screenshots and state, not self-reports.
8. **Audit high-reward trajectories during training.** Sample the trajectories the reward liked most, especially on tasks whose success rate jumped, and check them by hand.
9. **Track side effects.** AgentRewardBench labels side effects for a reason: an agent that completes the task and also deletes a file should not get full credit.
10. **Version the environment.** Treat task fixes as releases with changelogs, so training runs and eval numbers can be compared.

## Where do experts fit?

Generated tasks and VLM judges are what make these environments scale, which is exactly why the human work moves upstream. Someone has to write the task templates that represent real professional work in a spreadsheet, ERP, EHR, CAD tool or trading terminal; decide what a correct end state is when several are acceptable; label the calibration set that tells you whether the judge's 80% is the right 80%; and review the trajectories the reward liked best. The AgentRewardBench labels were expert reviews of every trajectory. That is the layer that decides whether an RL run learns the task or learns the grader.

## How Anthroly can help

Anthroly builds environments and the expert layer around them for web, desktop and mobile agents: task suites and parameterized templates drawn from real professional workflows, state-based checkers, expert-labeled trajectory sets for calibrating judges and outcome reward models, and audits of existing environments for infeasible tasks, drift, side effects and grader errors. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are scaling RL for a computer-use agent and want to know how much of your reward signal you can trust, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can go through your environment together.

## Related reading

- [RL environments, explained](/learn/rl-environments-explained)
- [How do you collect training data for computer-use agents?](/blog/how-to-collect-computer-use-agent-trajectory-data)
- [How are tool-use RL environments built?](/blog/how-tool-use-rl-environments-are-built)
- [What makes an RL environment training-grade?](/blog/what-makes-a-training-grade-rl-environment)
- [How many RL environments do you need to train an agent?](/blog/how-many-rl-environments-do-you-need-to-train-an-agent)
- [Why is multi-turn RL for LLM agents unstable?](/blog/why-is-multi-turn-rl-for-llm-agents-unstable)
- [How do you evaluate deep research and browsing agents?](/blog/how-to-evaluate-deep-research-agents)
- [Glossary: Reinforcement learning environment](/research/glossary#reinforcement-learning-environment)

---

## References

1. Zhou, S., Xu, F. F., Zhu, H., et al. (2023). [WebArena: A Realistic Web Environment for Building Autonomous Agents](https://arxiv.org/abs/2307.13854). arXiv:2307.13854.
2. Koh, J. Y., et al. (2024). [VisualWebArena: Evaluating Multimodal Agents on Realistic Visual Web Tasks](https://arxiv.org/abs/2401.13649). arXiv:2401.13649.
3. Xie, T., et al. (2024). [OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments](https://arxiv.org/abs/2404.07972). arXiv:2404.07972.
4. XLANG Lab (2025). [Introducing OSWorld-Verified](https://xlang.ai/blog/osworld-verified). Blog post, July 28, 2025.
5. Bonatti, R., et al. (2024). [Windows Agent Arena: Evaluating Multi-Modal OS Agents at Scale](https://arxiv.org/abs/2409.08264). arXiv:2409.08264.
6. Rawles, C., et al. (2024). [AndroidWorld: A Dynamic Benchmarking Environment for Autonomous Agents](https://arxiv.org/abs/2405.14573). arXiv:2405.14573.
7. de Chezelles, T. L. S., et al. (2024). [The BrowserGym Ecosystem for Web Agent Research](https://arxiv.org/abs/2412.05467). arXiv:2412.05467.
8. Deng, X., et al. (2023). [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/abs/2306.06070). arXiv:2306.06070.
9. Xue, T., et al. (2025). [An Illusion of Progress? Assessing the Current State of Web Agents](https://arxiv.org/abs/2504.01382). arXiv:2504.01382.
10. Lù, X. H., et al. (2025). [AgentRewardBench: Evaluating Automatic Evaluations of Web Agent Trajectories](https://arxiv.org/abs/2504.08942). arXiv:2504.08942.
11. Qi, Z., et al. (2024). [WebRL: Training LLM Web Agents via Self-Evolving Online Curriculum Reinforcement Learning](https://arxiv.org/abs/2411.02337). arXiv:2411.02337.
12. Bai, H., et al. (2024). [DigiRL: Training In-The-Wild Device-Control Agents with Autonomous Reinforcement Learning](https://arxiv.org/abs/2406.11896). arXiv:2406.11896.
13. Yang, C., et al. (2025). [ZeroGUI: Automating Online GUI Learning at Zero Human Cost](https://arxiv.org/abs/2505.23762). arXiv:2505.23762.
14. Wang, H., et al. (2025). [UI-TARS-2 Technical Report: Advancing GUI Agent with Multi-Turn Reinforcement Learning](https://arxiv.org/abs/2509.02544). arXiv:2509.02544.
