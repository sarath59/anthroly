---
title: "How Are Verilog and RTL Hardware Design Benchmarks and RL Environments Built? From VerilogEval and CVDP to Testbench Rewards and Formal Equivalence"
description: "A practitioner's guide to how LLM benchmarks and RL environments for hardware design are built: how VerilogEval, RTLLM, CVDP, RTL-BenchLS and ChipVerilog get checkable tasks out of Verilog, why simulation testbenches make leaky rewards and formal equivalence makes stronger ones, how CodeV-R1, VeriReason, QiMeng-SALV and EARL train with them, and what security, debugging and specification benchmarks add."
tags:
  - hardware-design
  - verilog
  - rl-environments
  - verifiers
  - evals
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-02T12:50:00.000Z'
updatedAt: '2026-11-02T12:50:00.000Z'
faq:
  - question: "How are Verilog benchmarks for LLMs built?"
    answer: "Most pair a natural-language specification (or a module header to complete) with a golden reference design and an automatic check. VerilogEval has 156 problems from the HDLBits instructional site and compares the simulation outputs of generated code with a golden solution. RTLLM scores three progressive goals: syntax, functionality and design quality. Newer suites scale up: CVDP has 783 problems across 13 task categories authored by experienced hardware engineers, and RTL-BenchLS has over 10,000 formally verified designs checked by formal equivalence rather than hand-written testbenches."
  - question: "How do you reward an LLM for writing correct Verilog?"
    answer: "With a ladder of checks: it compiles, it simulates, its outputs match a golden reference under a testbench, and ideally it is formally equivalent to the reference. CodeV-R1 uses a rule-based testbench generator that performs equivalence checking against golden references; VeriReason combines testbench evaluations with structural heuristics; QiMeng-SALV gives credit per output signal so partially correct modules still produce signal. Formal equivalence is the strongest check when a reference exists, because a testbench only exercises the inputs it drives."
  - question: "Why are testbench rewards for hardware RL unreliable?"
    answer: "Because a testbench only detects bugs its stimulus exposes. When VeriBugBench injected realistic faults into 45 open-source projects, LLM-enhanced testbenches raised mean project-level fault observability only from 36.01% to 39.54%; on that measure most injected faults were not exposed. A policy trained against such a testbench is rewarded for any design the testbench cannot distinguish from the reference. Execution-Anchored Hallucination Calibration also found execution-based reranking transfers poorly because generated testbenches are low quality."
  - question: "How do teams get enough Verilog training data?"
    answer: "Public Verilog is scarce compared with software code, so most pipelines synthesize. CodeV-R1 pairs open-source Verilog with LLM-written descriptions and keeps only pairs whose code-description-code round trip passes its equivalence testbench. CraftRTL generates correct-by-construction data for Karnaugh maps, state diagrams and waveforms plus targeted repair data. VERIRL curated Veribench-53K from over 700K problems. MCTS-SFT uses tree search with functional feedback to curate reasoning traces."
  - question: "Are Verilog benchmarks saturated?"
    answer: "The small module-level ones are close. RTL-BenchLS's authors note frontier models already saturate existing benchmarks, and the HORIZON agent framework reports 100% completion on ChipBench, RTLLM, VerilogEval and nine CVDP categories while cautioning that these are controlled proxies. Harder suites remain open: on RTL-BenchLS the best model reaches 23% on round-trip reasoning, 28% on masked-content reasoning and 12% on repository-issue fixing, and CVDP's code generation tops out at no more than 34% pass@1."
  - question: "Do functionally correct LLM-generated designs have security flaws?"
    answer: "Often. SECRTL-GEN has 392 tasks across five CWE families and four HDLs, with specifications that omit security obligations as real functional docs often do. Five frontier LLMs passed functional tests in about 73-79% of cases but security tests in only 14-35%, and stronger functional models were not safer. For hardware this matters more than for software, because insecure RTL cannot be patched after tape-out."
  - question: "How does Anthroly help build hardware design evaluations and environments?"
    answer: "Anthroly provides PhD experts and experienced hardware engineers who write specifications, build golden references, testbenches and assertions, set up formal equivalence checks, write security obligations and debugging tasks, and audit RL outputs that pass weak testbenches. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Hardware design looks like an ideal RLVR domain. Verilog compiles or it does not, simulators are free, and a golden reference turns "is this design correct?" into a mechanical comparison. But hardware has two properties software does not. Public training data is scarce, so almost every pipeline synthesizes its own. And a simulation testbench only checks the inputs it drives, so the default reward quietly accepts any design the testbench cannot tell apart from the reference. This post walks through how the main RTL benchmarks were built, how they became RL environments, and which checks you need before a hardware reward means "correct".**

## The short answer

A credible hardware design environment has five parts. **A specification** a hardware engineer would accept as unambiguous, in text and often in non-textual forms (waveforms, state diagrams, tables). **A golden reference** design. **A ladder of automatic checks**: compile and lint, simulate against a testbench, and where possible prove **formal equivalence** to the reference, because simulation only covers driven stimulus. **Quality and safety checks** beyond function: area, timing and power (RTLLM's "design quality" goal), and security obligations the specification never states (SECRTL-GEN). And **task variety beyond spec-to-RTL**: debugging, verification, specification comprehension and repository-level changes (CVDP, VeriBugBench, SpecRead, RTL-BenchLS). VerilogEval and RTLLM established the first three; CVDP, RTL-BenchLS and ChipVerilog extended scale and realism; CodeV-R1, VeriReason and their successors turned the checks into rewards.

## How were the first Verilog benchmarks built?

Two 2023 benchmarks defined the format everyone still uses.

**VerilogEval** (Liu et al., 2023) took 156 problems from HDLBits, an instructional site for learning Verilog, ranging from simple combinational circuits to complex finite state machines. Generated code is checked by comparing its transient simulation outputs with those of a golden solution. The same paper showed that fine-tuning on LLM-generated synthetic problem-code pairs improves Verilog generation, an early sign that synthesis would be central to the domain. A year later, **VerilogEval v2** (Pinckney et al., 2024) added specification-to-RTL tasks, in-context learning support and automatic failure classification; GPT-4o reached 63% on specification-to-RTL, Llama 3.1 405B 58% and the domain-specific RTL-Coder 6.7B 34%.

**RTLLM** (Lu et al., 2023) addressed two complaints about earlier work: target designs were small and written by the authors themselves, and evaluation stopped at correctness. RTLLM scores three progressive goals, **syntax**, **functionality** and **design quality**, so a design that works but synthesizes to something wasteful is distinguishable from a good one. **RTLCoder** (Liu et al., 2023) then showed a 7B open model with an open RTL dataset could outperform GPT-3.5 on these benchmarks.

## How have hardware benchmarks scaled since?

The module-level suites are now close to saturation, and newer benchmarks push on size, realism and task type.

| Benchmark | Source of tasks | Size | How correctness is checked |
|---|---|---|---|
| VerilogEval (Liu et al., 2023) | HDLBits exercises | 156 problems | Simulation outputs vs golden solution |
| RTLLM (Lu et al., 2023) | Curated design tasks | Multi-goal suite | Syntax, functionality, design quality |
| CVDP (Pinckney et al., 2025) | Problems authored by experienced hardware engineers | 783 problems, 13 categories, agentic and non-agentic | Open-source tool flows; BLEU and LLM judging for comprehension |
| RTL-BenchLS (Wang et al., 2026) | Real designs, self-supervised tasks | Over 10,000 formally verified designs | Formal equivalence, no manual testbenches |
| ChipVerilog (Tan et al., 2026) | OpenCores IP and cores (OR1200, FPU, MIPS-16, I2C, CORDIC) | 64 targets, some over 1,000 lines | Equivalence for local modules, simulation for integrated cores |
| VHDL-RepoBench (Vijayaraghavan et al., 2026) | ~100 open-source VHDL repositories | ~2.5k files, ~500 testbenches | Self-verifying testbenches, cross-file tasks |

**CVDP** (Pinckney et al., 2025) is the closest analogue to an expert-written benchmark in this domain. Its 783 problems span RTL generation, verification, debugging, specification alignment and technical Q&A, all written by experienced hardware engineers, and come in both non-agentic and agentic formats. State-of-the-art models achieved no more than 34% pass@1 on code generation, and agentic tasks involving RTL reuse and verification were particularly hard.

**RTL-BenchLS** (Wang et al., 2026) attacks the scaling bottleneck directly. Real-world designs rarely come with aligned specifications and testbenches, so the authors designed tasks that need neither: **round-trip reasoning** (describe a design, regenerate it, check equivalence), **masked-content reasoning** (fill in removed RTL) and **repository-issue reasoning**, all verified by formal equivalence. The best of eight evaluated models reached only 23%, 28% and 12% on those three tasks.

**ChipVerilog** (Tan et al., 2026) goes the other way: fewer, larger, hand-reviewed targets from real IP, including cross-module targets that instantiate other modules. Each instance pairs specification documents with reference RTL, and a person writes and reviews the natural-language description. It is a reminder that the expensive part of a hardware benchmark is the specification, not the code.

## What should a hardware reward actually check?

Every hardware RL recipe uses some subset of the same ladder. Each rung catches errors the one below misses, and costs more.

1. **Compiles and lints.** Necessary, nearly free, and rewarding it alone teaches syntax and nothing else.
2. **Simulates against a testbench and matches the reference.** The VerilogEval-style check. Strength depends entirely on stimulus coverage.
3. **Signal-level agreement.** Credit for each output signal that matches the reference, so partially correct modules still produce gradient (QiMeng-SALV).
4. **Formal equivalence to a reference.** Proves the designs agree on all inputs and states within the checked bounds, not just the tested ones (RTL-BenchLS, ChipVerilog for local modules, the SECDED study below).
5. **Design quality.** Area, timing and power after synthesis (RTLLM's third goal; RTLSeek folds EDA feedback and expert knowledge into a multi-objective reward).
6. **Security and specification obligations.** Separate security testbenches for behavior the spec never mentions (SECRTL-GEN).

The gap between rungs 2 and 4 is the core reliability problem. Suppose a testbench detects a fraction $q$ of the plausible faults a policy might introduce. Then for a policy that produces a faulty design with probability $f$, the expected rate at which the reward pays for a wrong design is

$$
P(\text{reward} = 1, \text{design wrong}) = f\,(1 - q)
$$

and the share of rewarded designs that are wrong is

$$
\frac{f\,(1-q)}{(1 - f) + f\,(1-q)}
$$

The second quantity is what RL actually optimizes against. With $f = 0.5$ and $q = 0.9$, about 9% of rewarded designs are wrong. With $q = 0.4$ it is about 38%. VeriBugBench (Meng et al., 2026) suggests the low end is realistic for real projects: across 45 open-source projects, its LLM-enhanced testbenches raised mean project-level fault observability only from 36.01% to 39.54%. Most injected faults never reach the outputs the testbench watches. And because RL concentrates probability on whatever the reward accepts, a leaky testbench does not just add noise; it actively selects for the faults it cannot see.

The same weakness appears at selection time. In an empirical study across nine models and two benchmarks, Yang et al. (2026) found execution-based reranking transfers poorly between domains because generated testbenches are low quality, while LLM-as-a-judge gives inconsistent scores to execution-equivalent code. Their EAHC framework acquires execution and reasoning signals independently and fuses them only at the decision stage.

A minimal reward that climbs the ladder, using Icarus Verilog for simulation, looks like this:

```python
import subprocess, pathlib, tempfile

def run(cmd, cwd, timeout=60):
    p = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, timeout=timeout)
    return p.returncode, p.stdout + p.stderr

def rtl_reward(candidate_v: str, ref_v: str, tb_v: str, equiv_check=None) -> float:
    """Staged reward: compile < simulate-and-match < formal equivalence."""
    with tempfile.TemporaryDirectory() as d:
        pathlib.Path(d, "dut.v").write_text(candidate_v)
        pathlib.Path(d, "ref.v").write_text(ref_v)
        pathlib.Path(d, "tb.v").write_text(tb_v)  # drives both, compares outputs
        rc, _ = run(["iverilog", "-g2012", "-o", "sim", "tb.v", "dut.v", "ref.v"], d)
        if rc != 0:
            return 0.0                      # does not compile
        rc, out = run(["vvp", "sim"], d)
        if rc != 0 or "MISMATCH" in out or "PASS" not in out:
            return 0.1                      # compiles, fails the testbench
        if equiv_check is None:
            return 0.7                      # passes simulation only: capped
        return 1.0 if equiv_check(d) else 0.3   # proven equivalent, or a testbench escape
```

The important line is the cap. If you cannot prove equivalence, do not pay full reward for passing simulation, and log the cases where simulation passes and equivalence fails. Those are the designs your testbench would have taught the policy to produce.

## How are hardware RL environments trained against these checks?

The 2025-2026 recipes differ mostly in where they get data and how they densify a sparse reward.

| Method | Data | Reward signal | Notable result (as reported) |
|---|---|---|---|
| VeriSeek (Wang et al., 2024) | Limited high-quality data | Code-structure (AST) feedback | Outperforms prior methods on multiple benchmarks |
| VeriPrefer (Wang et al., 2025) | Automatic testbench generation refined with VCS feedback | DPO pairs from testbench outcomes | Gains on VerilogEval and RTLLM variants |
| CodeV-R1 (Zhu et al., 2025) | Round-trip synthesis: code to description to code, filtered by equivalence | Rule-based testbench generator, equivalence vs golden reference; distill then adaptive DAPO | 7B: 68.6% VerilogEval v2, 72.9% RTLLM v1.1 pass@1 |
| VeriReason (Wang et al., 2025) | Curated examples | Testbench evaluation plus structural heuristics, GRPO | 83.1% on VerilogEval Machine |
| VERIRL (Teng et al., 2025) | Veribench-53K from over 700K problems | Trace-back rescoring; co-evolved reward model | Gains in pass rate and compilation robustness |
| QiMeng-SALV (Zhang et al., 2025) | Same data as CodeV | Signal-level correctness from partially wrong modules; signal-aware DPO | 7B matches DeepSeek v3 671B on its evaluations |
| EARL (Shi et al., 2025) | RLVR setup | Policy gradient gated to high-entropy tokens | Up to 14.7% better functional pass rates |
| RTLSeek (Zhang et al., 2026) | Limited data, three stages | Diversity-oriented multi-objective reward with EDA feedback | Gains on RTLLM |

Three ideas generalize beyond hardware.

**Round-trip filtering as a data verifier.** CodeV-R1 pairs open-source Verilog snippets with LLM-generated descriptions, regenerates code from the description, and keeps the pair only if the regenerated code passes the equivalence testbench against the original. The description is then known to contain enough information to rebuild the design. This is the same trick RTL-BenchLS uses for evaluation.

**Partial credit from structure.** Verilog modules drive independent output signals, so a module can be right on three signals and wrong on one. QiMeng-SALV verifies each signal against the reference and uses the AST to isolate the code responsible for correct signals, turning a failed module into useful preference data. EARL finds only a small fraction of tokens (such as `always`, `if`, `assign`, `posedge`) carry high uncertainty and shape control flow, and concentrates gradient there.

**Search for reasoning traces.** MCTS-SFT (DeLorenzo et al., 2026) uses tree search over compact hardware-design plans, propagating functional feedback from complete rollouts back to earlier design decisions. Plan-MCTS yields 84.2% correct traces, and keeping the explicit plan in the SFT target raises pass@10 from 52.56% to 57.7% for identical trajectories, while MCTS-curated supervision roughly halves generation length on VerilogEval-v2 compared with full chain-of-thought distillation. StepPRM-RTL (Vijayaraghavan et al., 2026) similarly uses a process reward model with tree search.

## Is the model even writing the right thing?

A 2026 result is worth sitting with. On a formally specifiable task, generating SECDED error-correcting memory wrappers, Patel et al. (2026) held task, data and correctness oracle fixed and varied training regime and output representation independently. Correctness was decided by formal equivalence over a design space of about ten million points. Representation dominated: every representation close to raw RTL reached a pass rate of at most 0.17, while having the model emit an eight-field configuration expanded by a deterministic generator reached 0.83 with no training at all, and 0.89-1.00 under every training regime. Raw RTL also hit a hard length wall: a 512-bit design needs 44,237 tokens of flat Verilog versus 69 tokens of configuration.

The lesson for environment builders is that the action space is a design choice. When a verified generator exists, an environment that rewards the model for driving it can be far more learnable, and far cheaper, than one that rewards emitting every gate by hand. Benchmarks should say which they measure.

## What do debugging, specification and security benchmarks add?

Writing RTL from a clean specification is a small part of hardware work. Newer benchmarks test the rest.

- **Debugging.** VeriBugBench (Meng et al., 2026) maps recurring repair patterns from real RTL bug-fix histories to 19 executable inverse operators, injects faults into 45 projects, and keeps only faults whose effects are observable at design outputs: 2,608 single-fault instances with ground-truth locations, testbenches and execution artifacts.
- **Specification comprehension.** SpecRead (Huang, 2026) separates misreading a specification from failing to write code. Its 385 questions over 10 OpenTitan IP blocks include contradiction detection in mutated specifications and spec-RTL consistency checking, and mutations are retained only if Icarus Verilog simulation shows they change observable behavior. VClare (Zhao et al., 2026) studies specifications with injected vagueness, contradictions and gaps, and repairing them raises pass rates by 12.7% on single-module and 13.7% on multi-module tasks.
- **Security.** SECRTL-GEN (Yang et al., 2026) has 392 tasks over five CWE families and four HDLs, each with black-box functional and security testbenches, and deliberately omits security obligations from the functional spec. Five frontier models pass functional tests in about 73-79% of cases but security tests in only 14-35%.
- **Agentic repository work.** CVDP's agentic tasks and RTL-BenchLS's repository-issue reasoning put the model in a codebase rather than a single module. HORIZON (Yu et al., 2026), a self-evolving agent framework, reports 100% completion on ChipBench, RTLLM, VerilogEval and nine CVDP categories, while explicitly cautioning that these benchmarks are controlled proxies for a much broader engineering problem.

That last result is the clearest saturation signal in the field. The next generation of hardware environments has to be built from real IP, judged by formal methods and security checks, and specified by people who have taped out chips.

## What does a training-grade hardware design environment need?

1. **Specifications reviewed by hardware engineers**, including non-textual forms (CraftRTL shows models struggle with Karnaugh maps, state-transition diagrams and waveforms) and explicit statements of interface, timing and reset behavior.
2. **Golden references and formal equivalence** wherever possible; simulation-only tasks get a capped reward and a coverage report.
3. **Testbenches measured, not assumed.** Run mutation analysis on each testbench and record the share of injected faults it detects; drop or strengthen tasks whose testbenches miss most of them.
4. **Partial credit that is still correct**, at signal level against the reference, rather than heuristic structure scores that can be gamed.
5. **Quality and security rungs**: synthesis results for area and timing, and security testbenches for obligations the spec leaves implicit.
6. **Contamination controls.** HDLBits and OpenCores are public and old; prefer modified or newly written designs, round-trip tasks, and held-out IP.
7. **Task mix beyond generation**: debugging, specification QA, verification and repository changes, in agentic formats with real tool flows.
8. **Human audit of rewarded designs** that pass simulation but fail equivalence, every training round.

## Where does expert human data matter in hardware?

Simulators and equivalence checkers are free; knowing what to check is not. CVDP's problems were authored by experienced hardware engineers. ChipVerilog's descriptions were written and manually reviewed against reference RTL. Strong testbenches, assertions and coverage plans are verification engineering, a profession in its own right. Security obligations need someone who knows which CWE a resource-access bug falls under. Deciding whether a specification is ambiguous, whether a synthesized design is acceptable, or whether a debugging task's injected fault is realistic all require people who have done the job. Synthetic pipelines like round-trip filtering and mutation injection reduce the cost per task, but experts still set the contracts those pipelines enforce.

## How Anthroly can help

Anthroly works with PhD experts and experienced hardware engineers who write and review RTL specifications, build golden references, testbenches and assertions, set up formal equivalence and synthesis checks, author debugging and security tasks, and audit RL outputs that pass weak testbenches. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building hardware design evaluations or RL environments and want an expert review of how much your testbenches actually catch, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How are software engineering RL environments built?](/blog/how-software-engineering-rl-environments-are-built)
- [How reliable are RLVR verifiers?](/blog/how-reliable-are-rlvr-verifiers)
- [How are theorem-proving RL environments built?](/blog/how-are-theorem-proving-rl-environments-built)
- [What makes a training-grade RL environment?](/blog/what-makes-a-training-grade-rl-environment)
- [How are cybersecurity RL environments and CTF benchmarks built?](/blog/how-are-cybersecurity-rl-environments-and-ctf-benchmarks-built)
- [Step-level rewards for AI agents](/blog/step-level-rewards-for-ai-agents)

---

## References

1. Liu, M., Pinckney, N., Khailany, B., & Ren, H. (2023). [VerilogEval: Evaluating Large Language Models for Verilog Code Generation](https://arxiv.org/abs/2309.07544). arXiv:2309.07544.
2. Pinckney, N., Batten, C., Liu, M., Ren, H., & Khailany, B. (2024). [Revisiting VerilogEval: A Year of Improvements in Large-Language Models for Hardware Code Generation](https://arxiv.org/abs/2408.11053). arXiv:2408.11053.
3. Lu, Y., Liu, S., Zhang, Q., & Xie, Z. (2023). [RTLLM: An Open-Source Benchmark for Design RTL Generation with Large Language Model](https://arxiv.org/abs/2308.05345). arXiv:2308.05345.
4. Liu, S., Fang, W., Lu, Y., et al. (2023). [RTLCoder: Outperforming GPT-3.5 in Design RTL Generation with Our Open-Source Dataset and Lightweight Solution](https://arxiv.org/abs/2312.08617). arXiv:2312.08617.
5. Pinckney, N., Deng, C., Ho, C.-T., et al. (2025). [Comprehensive Verilog Design Problems: A Next-Generation Benchmark Dataset for Evaluating Large Language Models and Agents on RTL Design and Verification](https://arxiv.org/abs/2506.14074). arXiv:2506.14074.
6. Wang, J., Liu, S., Fang, W., et al. (2026). [RTL-BenchLS: A Large-Scale Benchmark for RTL Reasoning and Generation with Large Language Models](https://arxiv.org/abs/2606.08976). arXiv:2606.08976.
7. Tan, Y., Du, J., Meng, X., & Lyu, Y. (2026). [ChipVerilog: A Large-Scale OpenCores-Derived Benchmark for LLM-Based Verilog RTL Generation](https://arxiv.org/abs/2607.13079). arXiv:2607.13079.
8. Vijayaraghavan, P., Malhotra, A., Jadhav, A., et al. (2026). [VHDL-REPOBENCH: A Repository-Level Benchmark for Evaluating Large Language Models on VHDL Design Generation](https://arxiv.org/abs/2610.05380). arXiv:2610.05380.
9. Meng, X., Feng, K., Zhao, X., et al. (2026). [VeriBugBench: An Empirically Grounded Framework for Constructing Verilog RTL Debugging Benchmarks](https://arxiv.org/abs/2609.18022). arXiv:2609.18022.
10. Yang, G., Hu, X., Chen, X., Zhuo, T. Y., & Xia, X. (2026). [Execution-Anchored Hallucination Calibration Reranking for Verilog Code Generation](https://arxiv.org/abs/2608.22938). arXiv:2608.22938.
11. Wang, N., Yao, B., Zhou, J., et al. (2024). [Large Language Model for Verilog Generation with Code-Structure-Guided Reinforcement Learning](https://arxiv.org/abs/2407.18271). arXiv:2407.18271.
12. Wang, N., Yao, B., Zhou, J., et al. (2025). [Insights from Verification: Training a Verilog Generation LLM with Reinforcement Learning with Testbench Feedback](https://arxiv.org/abs/2504.15804). arXiv:2504.15804.
13. Zhu, Y., Huang, D., Lyu, H., et al. (2025). [QiMeng-CodeV-R1: Reasoning-Enhanced Verilog Generation](https://arxiv.org/abs/2505.24183). arXiv:2505.24183.
14. Wang, Y., Sun, G., Ye, W., Qu, G., & Li, A. (2025). [VeriReason: Reinforcement Learning with Testbench Feedback for Reasoning-Enhanced Verilog Generation](https://arxiv.org/abs/2505.11849). arXiv:2505.11849.
15. Teng, F., Pan, M., Zhang, X., et al. (2025). [VERIRL: Boosting the LLM-based Verilog Code Generation via Reinforcement Learning](https://arxiv.org/abs/2508.18462). arXiv:2508.18462.
16. Zhang, Y., Zhang, R., Guo, J., et al. (2025). [QiMeng-SALV: Signal-Aware Learning for Verilog Code Generation](https://arxiv.org/abs/2510.19296). arXiv:2510.19296.
17. Shi, J., Gao, Z., Ko, C.-Y., & Boning, D. (2025). [EARL: Entropy-Aware RL Alignment of LLMs for Reliable RTL Code Generation](https://arxiv.org/abs/2511.12033). arXiv:2511.12033.
18. Zhang, X., Chao, Z., Wang, Y., et al. (2026). [RTLSeek: Boosting the LLM-Based RTL Generation with Multi-Stage Diversity-Oriented Reinforcement Learning](https://arxiv.org/abs/2603.27630). arXiv:2603.27630.
19. DeLorenzo, M., Tieu, K., Jana, P., et al. (2026). [Search-Guided Reasoning Trace Curation for Verilog Generation](https://arxiv.org/abs/2610.37706). arXiv:2610.37706.
20. Vijayaraghavan, P., Nitsure, A., Shi, L., et al. (2026). [StepPRM-RTL: Stepwise Process-Reward Guided LLM Fine-Tuning for Enhanced RTL Synthesis](https://arxiv.org/abs/2606.04246). arXiv:2606.04246.
21. Liu, M., Tsai, Y.-D., Zhou, W., & Ren, H. (2024). [CraftRTL: High-quality Synthetic Data Generation for Verilog Code Models with Correct-by-Construction Non-Textual Representations and Targeted Code Repair](https://arxiv.org/abs/2409.12993). arXiv:2409.12993.
22. Patel, S., Singh, V., Malu, S. S., & Singh, R. (2026). [Learn the Interface, Not the Implementation: Output Representation Dominates Training Regime in LLM-Based RTL Generation](https://arxiv.org/abs/2610.25881). arXiv:2610.25881.
23. Huang, F. (2026). [SpecRead: A Benchmark for Measuring Whether Language Models Understand Hardware Specifications](https://arxiv.org/abs/2609.33699). arXiv:2609.33699.
24. Zhao, Z., Li, B., Li, Y., Yan, Z., & Schlichtmann, U. (2026). [VClare: Resolving Imperfect Specifications in LLM-Based Verilog Generation](https://arxiv.org/abs/2607.24854). arXiv:2607.24854.
25. Yang, G., Hu, X., Chen, X., & Xia, X. (2026). [Unsaid, Unsafe? Implicit Security Obligations in LLM-Based RTL Code Generation](https://arxiv.org/abs/2608.26588). arXiv:2608.26588.
26. Yu, C., Deng, C., Pinckney, N., & Khailany, B. (2026). [Agentic Hardware Design as Repository-Level Code Evolution](https://arxiv.org/abs/2606.28279). arXiv:2606.28279.
