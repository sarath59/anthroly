---
title: "How Do You Collect Training Data for Computer-Use Agents? Human Demonstrations vs. Synthetic Trajectories"
description: "A practitioner's breakdown of how computer-use and web agent trajectory data is actually collected in 2025–2026: human demonstration tooling (OpenCUA's AgentNet), tutorial-guided and reverse-synthesized trajectories (AgentTrek, OS-Genesis, AgentSynth), human-seeded augmentation (PC Agent-E), and why trajectory verification—not generation—is the real bottleneck."
tags:
  - agents
  - computer-use
  - trajectory-data
  - data-labeling
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-22T04:30:00.000Z'
updatedAt: '2026-10-22T04:30:00.000Z'
faq:
  - question: "What is trajectory data for computer-use agents?"
    answer: "A trajectory is a recorded sequence of observations (screenshots, accessibility trees, or HTML) and actions (clicks, typing, scrolling, hotkeys) that an agent or human took to complete a task on a computer, usually paired with a natural-language task description and often with per-step reasoning. It is the core supervised fine-tuning and RL data for GUI and web agents."
  - question: "How much does it cost to collect human computer-use demonstrations?"
    answer: "Costs vary widely with task complexity and annotator profile. OpenCUA reports that annotating about 22K computer-use tasks took six months with part-time annotators, at about USD 20,000 in annotation cost and roughly ten tasks per hour, plus about USD 0.6 per task for chain-of-thought synthesis, for a total of about USD 32,000. Professional or expert workflows cost far more per task."
  - question: "Is synthetic trajectory data cheaper than human demonstrations?"
    answer: "Per trajectory, sometimes. AgentTrek reports about USD 0.55 per high-quality web trajectory synthesized from web tutorials, and AgentSynth about USD 0.60 per trajectory. But the cost of a synthetic trajectory depends heavily on how many attempts fail verification, and on how reliable the verifier is. Synthetic pipelines are strongest for common consumer tasks and weakest for long-horizon professional workflows."
  - question: "Can LLM judges reliably filter agent trajectories?"
    answer: "Not yet on their own. AgentRewardBench, which has 1,302 web agent trajectories reviewed by experts, found that no LLM judge it tested exceeded 70% precision at predicting success, meaning roughly 30% of trajectories judged successful were actually failures. It also found that rule-based benchmark checks tend to under-report true success."
  - question: "Should human demonstrations be perfect 'gold' trajectories?"
    answer: "Not necessarily. OpenCUA deliberately relaxed the requirement that annotators demonstrate all-correct steps, arguing that annotation errors are useful if identified, because they teach the model to detect and recover from mistakes via reflective reasoning. The key is labeling errors, not hiding them."
  - question: "How does Anthroly help with agent trajectory data?"
    answer: "Anthroly has about 100-150 contracted PhDs, with about 400 more PhDs and graduates ready, who record domain-expert demonstrations for professional software workflows, write task specifications and execution-based checks, and audit synthetic or judge-filtered trajectories so teams know their real error rate."
draft: false
---

**Every serious computer-use agent—OpenCUA, UI-TARS, ScaleCUA, PC Agent-E—is built on trajectory data: recorded sequences of screenshots, actions, and reasoning for real tasks on real software. The open literature from 2024–2026 now gives a surprisingly detailed picture of what each collection method costs and where it breaks. Our read: human demonstrations are cheaper than their reputation for everyday tasks, synthetic pipelines are cheaper still but their quality is bounded by the verifier, and the scarce resource is no longer trajectories—it's trustworthy judgments about whether a trajectory actually succeeded.**

## What is a computer-use trajectory, concretely?

A trajectory is a task instruction plus a sequence of state–action pairs $\langle s_t, a_t \rangle$, optionally with the agent's reasoning $r_t$ at each step:

$$
\tau = \big(g,\; (s_1, r_1, a_1),\; (s_2, r_2, a_2),\; \dots,\; (s_T, r_T, a_T)\big)
$$

where $g$ is the natural-language goal, $s_t$ is an observation (a screenshot, an accessibility tree, HTML, or several of these), and $a_t$ is an action in some action space: click at coordinates, type a string, scroll, press a hotkey, or terminate.

A practical schema looks something like this:

```json
{
  "task_id": "calc-pivot-0193",
  "goal": "Create a pivot table summarizing Q3 revenue by region on a new sheet",
  "platform": "ubuntu",
  "app": "libreoffice-calc",
  "initial_state": {"snapshot": "vm://calc-pivot-0193/init", "files": ["sales_q3.xlsx"]},
  "steps": [
    {
      "t": 1,
      "observation": {"screenshot": "s3://.../t1.png", "a11y_tree": "s3://.../t1.json"},
      "reasoning": "The data is on Sheet1. I need the Data menu to insert a pivot table.",
      "action": {"type": "click", "x": 412, "y": 38},
      "annotator_flag": null
    }
  ],
  "outcome": {"checker": "pivot_exists_and_sums_match", "passed": true},
  "review": {"reviewer": "expert-17", "verdict": "success", "side_effects": false}
}
```

Three fields in that schema do most of the work and are the most often skimped on: `initial_state` (can the episode be reset and replayed?), `outcome.checker` (is success verified by execution, a judge, or a human?), and `review` (did anyone independent confirm it?). We'll return to each.

Benchmarks have pushed hard toward execution-based checking. [OSWorld (Xie et al., 2024)](https://arxiv.org/abs/2404.07972) built 369 real computer tasks across web and desktop apps, each with an initial-state configuration and a custom execution-based evaluation script. At release, humans completed over 72.36% of tasks while the best model reached 12.24%. That gap is what all the data work since then has been trying to close.

## Option 1: How do teams collect human demonstrations?

The most complete public account is [OpenCUA (Wang et al., 2025)](https://arxiv.org/abs/2508.09123), from XLANG Lab and collaborators. Their AgentNet Tool runs in the background on annotators' own machines, capturing screen video, mouse and keyboard events, and accessibility trees without disrupting the user's workflow. The resulting AgentNet dataset contains 22,625 human-annotated computer-use tasks spanning more than 100 applications and 200 websites across Windows, macOS, and Ubuntu. OpenCUA-72B reached 45.0% average success on OSWorld-Verified, state-of-the-art among open-source models at the time.

The paper's appendix is unusually candid about cost and process, which makes it the best public reference point:

| Item | OpenCUA / AgentNet (reported) |
|---|---|
| Tasks collected (before verification) | 24,095 accepted uploads |
| Tasks in final dataset | 22,625 |
| Annotators | 634, from internal students, external students, Prolific, and four annotation companies |
| Duration | ~6 months, all part-time |
| Annotation speed | ~10 tasks per hour |
| Annotation cost | ~USD 20,000 |
| Chain-of-thought synthesis | ~USD 0.6 per task |
| Total dataset cost | ~USD 32,000 |

That works out to under a dollar of annotation per task. The contrarian point: **for everyday consumer and office tasks, human demonstration is not the expensive part.** A trained annotator can record ten tasks an hour.

Several OpenCUA design choices are worth copying:

- **Annotators chose their own apps and tasks.** Tasks were not pre-assigned because familiarity varies, especially with professional tools. Annotators could brainstorm new tasks from relevant tutorials. This improves naturalness and coverage—but it also means the distribution reflects what annotators know, not what your users need.
- **Raw signals were compressed into semantic actions.** A typical task produces thousands of low-level events. Mouse moves become preconditions for clicks; scrolls merge into directional actions; key presses merge into text strings; modifier combinations become hotkeys.
- **Imperfect demonstrations were kept, deliberately.** Rather than requiring "gold" all-correct trajectories, they relaxed that requirement on the grounds that errors are useful if identified—their reflective chain-of-thought synthesis teaches the model to notice and recover from mistakes.
- **Every task was manually graded** as rejected, ok, good, or excellent for goal clarity, diversity, and complexity, and the data split was built to ensure no overlap with OSWorld tasks, to prevent leakage.
- **Privacy was a pipeline stage.** An LLM classified privacy sensitivity, followed by human verification. The authors note the LLM over-flagged cases based on keywords (e.g., merely viewing a password field)—a reminder that automated filters need human review.

Earlier human-collected datasets made the same trade at smaller scale. [Mind2Web (Deng et al., 2023)](https://arxiv.org/abs/2306.06070) crowdsourced action sequences for over 2,000 open-ended tasks across 137 real websites and 31 domains.

### Where human demonstrations break

The $1-per-task figure holds for tasks a generalist can do. It does not hold for:

- **Professional software.** CAD, EDA, statistical packages, EHR systems, trading terminals, legal research tools. The annotator has to be someone who uses the software for a living.
- **Long-horizon workflows.** OpenCUA's error study notes OSWorld tasks requiring more than 30–50 gold actions, and names long-horizon failures, termination misjudgment, and weak error recovery as persistent failure modes.
- **Tasks where "done" is ambiguous.** Was the report formatted *correctly*? Is the reconciliation *right*? Without domain expertise, an annotator can't tell, and neither can a generic judge.

This is where per-task costs jump by an order of magnitude or more—and where most of the remaining capability gap lives.

## Option 2: How does synthetic trajectory generation work?

Synthetic pipelines replace the human demonstrator with a strong model executing tasks in a live environment. They differ mainly in **where the task comes from**.

**Tutorial-guided replay.** [AgentTrek (Xu et al., 2024)](https://arxiv.org/abs/2412.09605) harvests tutorial-like text from the web (filtering 23,430 tutorials from RedPajama), converts them into structured step-by-step task specifications, has a VLM agent execute them in real browsers, and uses a VLM evaluator to verify trajectories. The result: 10,398 successful trajectories across 127 websites and 11 task categories, at a reported **USD 0.551 per trajectory**. Of the ~USD 219 per 1,000 trajectories, about USD 215 is the replay itself (GPT-4o), with tutorial processing and evaluation under USD 4 combined. The authors validated their evaluator against a 558-sample human-annotated gold set and note it tends to apply stricter criteria than human reviewers.

**Reverse task synthesis.** [OS-Genesis (Sun et al., 2024)](https://arxiv.org/abs/2412.19723) flips the order: the agent first explores the environment and performs step-wise interactions, then *retrospectively derives* the task that the interactions accomplish. A trajectory reward model then filters for quality. The insight is that it's easier to label what happened than to make a specified thing happen.

**Composed subtasks.** [AgentSynth (Xie et al., 2025)](https://arxiv.org/abs/2506.14205) exploits information asymmetry: subtasks are easy to generate individually but hard when composed into long-horizon tasks. It produced over 6,000 tasks at about **USD 0.60 per trajectory**, and difficulty is tunable—state-of-the-art agents fell from 18% success at difficulty level 1 to 4% at level 6.

**Online self-collection.** [UI-TARS (Qin et al., 2025)](https://arxiv.org/abs/2501.12326) iteratively collects, filters, and reflectively refines new interaction traces from the agent itself on hundreds of virtual machines, so the model learns from its own mistakes with minimal human intervention.

### The hidden cost in synthetic pipelines

The headline per-trajectory cost is usually the cost per *kept* trajectory. The cost per *actually correct* kept trajectory depends on two numbers that are rarely reported together. If each attempt costs $c$, the filter accepts a fraction $a$ of attempts, and a fraction $P$ (the filter's precision) of accepted trajectories are truly successful:

$$
\text{cost per correct trajectory} = \frac{c}{a \cdot P}
$$

and the fraction of your training set that is silently wrong is $1 - P$.

Precision is the term people skip. Which brings us to the real bottleneck.

## Why is trajectory verification the real bottleneck?

[AgentRewardBench (Lù et al., 2025)](https://arxiv.org/abs/2504.08942) is the most direct measurement we have. It contains 1,302 web-agent trajectories across 5 benchmarks and 4 agent LLMs; each trajectory was reviewed by expert annotators (a team of six with research experience on web agents) for success, side effects, and repetitiveness. The authors evaluated 12 LLM judges against those expert labels. Two findings matter for anyone building a data pipeline:

1. **No judge exceeded 70% precision.** In the authors' words, that means about 30% of trajectories the judges marked successful were actually failures. They note this "severely limits" judges for downstream uses like filtering trajectories for fine-tuning, because the agent will learn to generate incorrect trajectories for a substantial portion of tasks. No single judge was best across all benchmarks.
2. **Rule-based checks under-report success.** The official rule-based evaluation in common benchmarks tended to miss successful trajectories. The paper's motivating example shows why: a rule written for one specific listing can't credit an agent that finds a different but equally valid one.

So the two cheap verification options fail in opposite directions: LLM judges let failures in, and hand-written rules keep valid successes out. Both bias the training signal.

This connects to a broader point we've made about [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders): judges are useful when they are calibrated against an expert-labeled gold set for *your* task distribution, and dangerous when that calibration is assumed rather than measured.

How many expert reviews do you need to know your filter's precision? Treating precision as a binomial proportion, the sample needed for a 95% interval of half-width $h$ is:

$$
n \approx \frac{1.96^2 \; P(1-P)}{h^2}
$$

At $P \approx 0.7$ and $h = 0.05$, that's about 323 expert-reviewed accepted trajectories per task family. That's a modest, bounded expense compared with training on a dataset that is 30% wrong. (For small audits, use a Wilson interval rather than the normal approximation—see our post on [how many eval items you need](/blog/how-many-eval-items-do-you-need).)

## Option 3: Should you combine human seeds with synthetic augmentation?

The most interesting 2025 result for budget-constrained teams is [PC Agent-E (He et al., 2025)](https://arxiv.org/abs/2505.13909). Starting from just **312 human-annotated** computer-use trajectories, they used Claude 3.7 Sonnet to synthesize diverse *alternative* action decisions at each step ("Trajectory Boost"), with nine synthesized actions and one original human action per step.

On their WindowsAgentArena-V2 benchmark, training on the human trajectories alone improved the model from 14.9 to 17.2. With Trajectory Boost, it reached 36.0—a 141% relative improvement—and surpassed Claude 3.7 Sonnet itself by about 10% relative. It also outperformed direct distillation from Claude 3.7 Sonnet.

The lesson is about what each source contributes. Human demonstrations supply grounded, realistic task structure and environment states; the strong model supplies diverse reasoning and alternative actions at each of those states. Neither alone was as good as the combination.

[ScaleCUA (Liu et al., 2025)](https://arxiv.org/abs/2509.15221) reaches a similar conclusion at a much larger scale, building cross-platform data across six operating systems via a closed-loop pipeline that unites automated agents with human experts.

## Which method should you use?

Here's how we'd summarize the trade-offs, based on the papers above:

| Method | Reported cost signal | Strengths | Failure modes |
|---|---|---|---|
| Human demonstrations (generalist annotators) | ~USD 0.9 annotation/task (OpenCUA) | Realistic states, natural behavior, real-world app coverage | Skews to tasks annotators know; weak on professional tools; ambiguous success |
| Human demonstrations (domain experts) | Much higher per task (not publicly benchmarked) | Only source for professional, high-stakes workflows | Expensive; needs careful task design and review |
| Tutorial-guided synthesis | ~USD 0.55/trajectory (AgentTrek) | Scales cheaply; leverages existing how-to content | Bounded by tutorial coverage; evaluator-dependent |
| Reverse task synthesis | Not directly comparable | Avoids task-specification failures | Tasks reflect what's easy to explore, not what users need |
| Composed subtask synthesis | ~USD 0.60/trajectory (AgentSynth) | Tunable difficulty; long-horizon tasks | Compositional tasks can feel artificial |
| Human seeds + synthetic augmentation | 312 human trajectories + model calls (PC Agent-E) | Strong gains from small human budgets | Inherits teacher model biases |
| Online self-collection | Compute-heavy (hundreds of VMs, UI-TARS) | Learns from own mistakes | Needs a reliable success signal to avoid reinforcing errors |

Our practitioner's recipe for a new domain:

1. **Write the task distribution first.** Decide which workflows matter, and at what horizon length. Don't let annotator familiarity or tutorial availability define your distribution by accident.
2. **Make every task resettable and checkable.** Snapshot the initial state. Write execution-based checks where possible, as OSWorld does—but accept that rules will under-report valid alternative solutions.
3. **Seed with expert demonstrations** for the hard, professional slice, and label errors rather than discarding them.
4. **Augment synthetically** around those seeds—alternative actions, reverse-derived tasks, composed subtasks.
5. **Calibrate your filter against expert review** on a few hundred trajectories per task family, and report precision with an interval.
6. **Keep a held-out, expert-verified eval split** that never touches the synthetic pipeline, and test for leakage against public benchmarks as OpenCUA did.

For step-level credit assignment on top of these trajectories—turning a long successful or failed trajectory into per-step reward—see [where step-level rewards for AI agents should come from](/blog/step-level-rewards-for-ai-agents). For a primer on the data type itself, see [agent trajectory data, explained](/learn/agent-trajectory-data).

## What do teams get wrong?

- **Optimizing cost per trajectory instead of cost per correct trajectory.** A 30% silent error rate makes a cheap pipeline expensive.
- **Treating "temperature 0" runs as reproducible.** OpenCUA reports a >18-point gap between Pass@1 and Pass@16 on OSWorld from near-identical initial states at temperature 0. Environment perturbations—system date, network latency—change outcomes. Re-run and report variance.
- **Discarding every imperfect demonstration.** Error-and-recovery sequences are among the most valuable training signal for agents, if labeled.
- **Using the same judge for filtering and for evaluation.** You'll measure the judge's preferences, not the agent's capability.
- **Ignoring side effects.** AgentRewardBench asked experts about side effects and repetition, not just success. An agent that completes the task but deletes an unrelated file should not be a positive example.
- **Letting public benchmark tasks leak into training data.** See our notes on [contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks).

## How Anthroly can help

The open literature has made generalist computer-use data cheap. What remains scarce is the expert slice: demonstrations of professional workflows that only practitioners can perform, task specifications and execution checks written by people who know what "correct" looks like, and independent review that tells you your pipeline's real error rate.

Anthroly builds this kind of data for AI labs. We have about 100–150 PhDs on contract and roughly 400 more PhDs and graduates ready across domains, including software engineering, the sciences, medicine, and finance. We record expert demonstrations with labeled errors and recoveries, design resettable tasks with execution-based checks, and run calibrated expert audits of synthetic and judge-filtered trajectories.

If you're building a computer-use or tool-use agent and want to know how much of your training data is actually correct, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

---

## Related reading

- [Agent trajectory data, explained](/learn/agent-trajectory-data)
- [Where should step-level rewards for AI agents come from?](/blog/step-level-rewards-for-ai-agents)
- [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How many eval items do you need?](/blog/how-many-eval-items-do-you-need)
- [How do you build an agent benchmark that won't be contaminated or saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [How do you evaluate deep research and browsing agents?](/blog/how-to-evaluate-deep-research-agents)

---

## References

1. Xie, T., Zhang, D., Chen, J., Li, X., Zhao, S., Cao, R., Hua, T. J., Cheng, Z., Shin, D., Lei, F., Liu, Y., Xu, Y., Zhou, S., Savarese, S., Xiong, C., Zhong, V., & Yu, T. (2024). [OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments](https://arxiv.org/abs/2404.07972). arXiv:2404.07972.

2. Wang, X., Wang, B., Lu, D., Yang, J., Xie, T., et al. (2025). [OpenCUA: Open Foundations for Computer-Use Agents](https://arxiv.org/abs/2508.09123). arXiv:2508.09123.

3. Deng, X., Gu, Y., Zheng, B., Chen, S., Stevens, S., Wang, B., Sun, H., & Su, Y. (2023). [Mind2Web: Towards a Generalist Agent for the Web](https://arxiv.org/abs/2306.06070). arXiv:2306.06070.

4. Xu, Y., Lu, D., Shen, Z., Wang, J., Wang, Z., Mao, Y., Xiong, C., & Yu, T. (2024). [AgentTrek: Agent Trajectory Synthesis via Guiding Replay with Web Tutorials](https://arxiv.org/abs/2412.09605). arXiv:2412.09605.

5. Sun, Q., Cheng, K., Ding, Z., Jin, C., Wang, Y., Xu, F., Wu, Z., Jia, C., Chen, L., Liu, Z., Kao, B., Li, G., He, J., Qiao, Y., & Wu, Z. (2024). [OS-Genesis: Automating GUI Agent Trajectory Construction via Reverse Task Synthesis](https://arxiv.org/abs/2412.19723). arXiv:2412.19723.

6. Xie, J., Xu, D., Zhao, X., & Song, D. (2025). [AgentSynth: Scalable Task Generation for Generalist Computer-Use Agents](https://arxiv.org/abs/2506.14205). arXiv:2506.14205.

7. Qin, Y., Ye, Y., Fang, J., Wang, H., Liang, S., et al. (2025). [UI-TARS: Pioneering Automated GUI Interaction with Native Agents](https://arxiv.org/abs/2501.12326). arXiv:2501.12326.

8. Lù, X. H., Kazemnejad, A., Meade, N., Patel, A., Shin, D., Zambrano, A., Stańczak, K., Shaw, P., Pal, C. J., & Reddy, S. (2025). [AgentRewardBench: Evaluating Automatic Evaluations of Web Agent Trajectories](https://arxiv.org/abs/2504.08942). arXiv:2504.08942.

9. He, Y., Jin, J., & Liu, P. (2025). [Efficient Agent Training for Computer Use](https://arxiv.org/abs/2505.13909). arXiv:2505.13909.

10. Liu, Z., Xie, J., Ding, Z., Li, Z., Yang, B., et al. (2025). [ScaleCUA: Scaling Open-Source Computer Use Agents with Cross-Platform Data](https://arxiv.org/abs/2509.15221). arXiv:2509.15221.
