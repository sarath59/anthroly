/**
 * Comparison pages. Every citation is a verified primary source.
 */

export interface Citation { label: string; url: string }
export interface Comparison {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  a: string;
  b: string;
  answer: string;
  rows: { dimension: string; a: string; b: string }[];
  whenA: string;
  whenB: string;
  faq: { question: string; answer: string }[];
  citations: Citation[];
  related: string[];
}

const C = {
  instruct: { label: 'Ouyang et al., 2022. Training language models to follow instructions with human feedback (arXiv:2203.02155)', url: 'https://arxiv.org/abs/2203.02155' },
  christiano: { label: 'Christiano et al., 2017. Deep reinforcement learning from human preferences (arXiv:1706.03741)', url: 'https://arxiv.org/abs/1706.03741' },
  tulu: { label: 'Lambert et al., 2024. Tülu 3: Pushing Frontiers in Open Language Model Post-Training (arXiv:2411.15124)', url: 'https://arxiv.org/abs/2411.15124' },
  r1: { label: 'DeepSeek-AI, 2025. DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (arXiv:2501.12948)', url: 'https://arxiv.org/abs/2501.12948' },
  gao: { label: 'Gao, Schulman & Hilton, 2022. Scaling Laws for Reward Model Overoptimization (arXiv:2210.10760)', url: 'https://arxiv.org/abs/2210.10760' },
  rar: { label: 'Gunjal et al., 2025. Rubrics as Rewards: Reinforcement Learning Beyond Verifiable Domains (arXiv:2507.17746)', url: 'https://arxiv.org/abs/2507.17746' },
  health: { label: 'Arora et al., 2025. HealthBench: Evaluating Large Language Models Towards Improved Human Health (arXiv:2505.08775)', url: 'https://arxiv.org/abs/2505.08775' },
  judge: { label: 'Zheng et al., 2023. Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (arXiv:2306.05685)', url: 'https://arxiv.org/abs/2306.05685' },
  snow: { label: 'Snow et al., 2008. Cheap and Fast — But is it Good? Evaluating Non-Expert Annotations for Natural Language Tasks (EMNLP)', url: 'https://aclanthology.org/D08-1027/' },
  kappa: { label: "Cohen's kappa (reference overview)", url: 'https://en.wikipedia.org/wiki/Cohen%27s_kappa' },
  kripp: { label: "Krippendorff's alpha (reference overview)", url: 'https://en.wikipedia.org/wiki/Krippendorff%27s_alpha' },
  rlaif: { label: 'Lee et al., 2023. RLAIF vs. RLHF: Scaling Reinforcement Learning from Human Feedback with AI Feedback (arXiv:2309.00267)', url: 'https://arxiv.org/abs/2309.00267' },
  cai: { label: 'Bai et al., 2022. Constitutional AI: Harmlessness from AI Feedback (arXiv:2212.08073)', url: 'https://arxiv.org/abs/2212.08073' },
  ultra: { label: 'Cui et al., 2023. UltraFeedback: Boosting Language Models with Scaled AI Feedback (arXiv:2310.01377)', url: 'https://arxiv.org/abs/2310.01377' },
  selfinstruct: { label: 'Wang et al., 2022. Self-Instruct: Aligning Language Models with Self-Generated Instructions (arXiv:2212.10560)', url: 'https://arxiv.org/abs/2212.10560' },
  lightman: { label: "Lightman et al., 2023. Let's Verify Step by Step (arXiv:2305.20050)", url: 'https://arxiv.org/abs/2305.20050' },
  uesato: { label: 'Uesato et al., 2022. Solving math word problems with process- and outcome-based feedback (arXiv:2211.14275)', url: 'https://arxiv.org/abs/2211.14275' },
  grpo: { label: 'Shao et al., 2024. DeepSeekMath (introduces GRPO) (arXiv:2402.03300)', url: 'https://arxiv.org/abs/2402.03300' },
  skalse: { label: 'Skalse et al., 2022. Defining and Characterizing Reward Hacking (arXiv:2209.13085)', url: 'https://arxiv.org/abs/2209.13085' },
};

const RH = '/blog/reward-hacking-rubric-based-rl';
const ENV = '/blog/what-makes-a-training-grade-rl-environment';

export const COMPARISONS: Comparison[] = [
  {
    slug: 'rlvr-vs-rlhf',
    title: 'RLVR vs RLHF: Verifiable Rewards or Human Preference Rewards?',
    shortTitle: 'RLVR vs RLHF',
    description: 'How reinforcement learning with verifiable rewards differs from RLHF in reward source, cost, failure modes, and the tasks each suits, with primary sources.',
    a: 'RLVR', b: 'RLHF',
    answer:
      'RLVR rewards a model with a programmatic check of correctness, such as a matching math answer or passing unit tests, while RLHF rewards it with a learned reward model trained on human preference comparisons. RLVR is cheaper per update and harder to game where answers are checkable; RLHF covers open-ended qualities like helpfulness and tone that no program can verify.',
    rows: [
      { dimension: 'Reward source', a: 'Deterministic verifier: answer match, tests, constraints', b: 'Reward model trained on human pairwise preferences' },
      { dimension: 'Typical domains', a: 'Math, code, formatting and instruction constraints', b: 'Open-ended chat, helpfulness, harmlessness, style' },
      { dimension: 'Human data needed', a: 'Tasks with reference answers or tests', b: 'Large sets of preference comparisons' },
      { dimension: 'Main failure mode', a: 'Exploiting weak verifiers (e.g., tests that can be bypassed)', b: 'Reward model overoptimization (Gao et al., 2022)' },
      { dimension: 'Representative work', a: 'Tülu 3 (named RLVR); DeepSeek-R1', b: 'Christiano et al., 2017; InstructGPT, 2022' },
    ],
    whenA: 'Use RLVR when correctness can be checked automatically and cheaply at scale, and invest in adversarially testing the verifier.',
    whenB: 'Use RLHF (or preference optimization) when the target quality is subjective or multi-dimensional and cannot be reduced to a check.',
    faq: [
      { question: 'Who coined the term RLVR?', answer: 'The Tülu 3 report from the Allen Institute for AI (Lambert et al., 2024) introduced the name reinforcement learning with verifiable rewards for training against programmatic correctness checks.' },
      { question: 'Can RLVR and RLHF be combined?', answer: 'Yes. Post-training pipelines such as Tülu 3 apply preference tuning and RLVR as separate stages, so verifiable skills and open-ended preferences are both optimized.' },
      { question: 'Is RLVR immune to reward hacking?', answer: 'No. RLVR removes reward-model exploitation but a policy can still exploit verifier gaps, for example by satisfying weak tests without solving the task. Verifier quality bounds RLVR quality.' },
    ],
    citations: [C.tulu, C.r1, C.christiano, C.instruct, C.gao],
    related: [RH, ENV, '/research/glossary#rlvr', '/research/glossary#rlhf', '/blog/how-reliable-are-rlvr-verifiers', '/blog/how-to-choose-prompts-for-rlvr-training', '/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl', '/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough', '/blog/how-many-rl-environments-do-you-need-to-train-an-agent'],
  },
  {
    slug: 'rubric-rewards-vs-reward-models',
    title: 'Rubric Rewards vs Reward Models: Which Should Score Your RL Policy?',
    shortTitle: 'Rubric rewards vs reward models',
    description: 'Explicit, per-prompt rubrics graded by an LLM judge versus a learned scalar reward model: interpretability, cost, hacking risk, and when to use each.',
    a: 'Rubric-based rewards', b: 'Learned reward models',
    answer:
      'Rubric-based rewards score each response against explicit, often expert-written criteria checked by a language model judge, while a learned reward model outputs a single scalar trained to predict human preferences. Rubrics are more interpretable and auditable per criterion; reward models generalize across prompts without per-prompt authoring but are opaque and prone to overoptimization.',
    rows: [
      { dimension: 'Signal form', a: 'Weighted checklist of satisfied criteria', b: 'Single scalar score' },
      { dimension: 'Authoring cost', a: 'Rubric per prompt or task family, often by domain experts', b: 'Preference dataset once, then reused' },
      { dimension: 'Interpretability', a: 'High: each criterion can be inspected', b: 'Low: score is not decomposable' },
      { dimension: 'Hacking risk', a: 'Judge leniency and failure modes the rubric does not specify', b: 'Overoptimization of the proxy (Gao et al., 2022)' },
      { dimension: 'Representative work', a: 'Rubrics as Rewards (2025); HealthBench rubrics (2025)', b: 'InstructGPT reward model (2022)' },
    ],
    whenA: 'Use rubrics in expert domains like medicine or science where correctness is partly checkable and experts can state what a good answer contains.',
    whenB: 'Use a reward model for broad, general-purpose preference signals where writing per-prompt criteria does not scale.',
    faq: [
      { question: 'Do rubric rewards eliminate reward hacking?', answer: 'No. A policy can satisfy listed criteria while degrading on dimensions the rubric does not mention, and LLM judges can be lenient. Rubrics make hacking easier to diagnose, not impossible.' },
      { question: 'Who writes the rubrics?', answer: 'In HealthBench, 262 physicians wrote conversation-specific rubric criteria. In practice, domain experts write or review rubrics for high-stakes domains.' },
    ],
    citations: [C.rar, C.health, C.instruct, C.gao, C.judge],
    related: [RH, '/research/glossary#rubric-based-reward', '/research/glossary#reward-model', '/blog/how-to-evaluate-a-reward-model', '/blog/how-to-evaluate-deep-research-agents', '/blog/generative-reward-models-vs-scalar-reward-models', '/blog/why-does-rlhf-make-models-verbose-length-bias', '/blog/how-to-prevent-reward-model-overoptimization'],
  },
  {
    slug: 'expert-vs-crowd-annotation',
    title: 'Expert vs Crowd Annotation for AI Training Data',
    shortTitle: 'Expert vs crowd annotation',
    description: 'When credentialed domain experts are worth the cost over crowdsourced annotators, and how to measure label quality with agreement statistics.',
    a: 'Expert annotation', b: 'Crowd annotation',
    answer:
      'Expert annotation uses credentialed domain specialists; crowd annotation aggregates many non-specialist workers. For simple perceptual or linguistic labels, aggregated crowd labels can match experts at much lower cost, as Snow et al. showed in 2008. When correctness depends on specialist knowledge, such as clinical or graduate-level science judgments, experts are needed and agreement should be measured, not assumed.',
    rows: [
      { dimension: 'Cost per label', a: 'High', b: 'Low' },
      { dimension: 'Throughput', a: 'Limited by expert availability', b: 'High, parallel' },
      { dimension: 'Best for', a: 'Rubric writing, specialist grading, reasoning traces', b: 'Simple classification, sentiment, surface-level preferences' },
      { dimension: 'Quality control', a: 'Adjudication, gold sets, agreement statistics', b: 'Redundant labels, aggregation, gold checks' },
      { dimension: 'Quality metric', a: "Cohen's kappa / Krippendorff's alpha", b: 'Same, plus per-worker accuracy on gold items' },
    ],
    whenA: 'Use experts when an untrained annotator cannot reliably tell a right answer from a plausible wrong one.',
    whenB: 'Use crowds when the task is simple enough that aggregated non-expert labels agree with experts on a pilot gold set.',
    faq: [
      { question: 'How do I know if crowd labels are good enough?', answer: 'Label a pilot gold set with experts, collect crowd labels on the same items, and compare accuracy and chance-corrected agreement. If aggregated crowd labels match the gold set, crowds are adequate for that task.' },
      { question: 'Which agreement statistic should I report?', answer: "Cohen's kappa for two annotators on categorical labels; Krippendorff's alpha for more annotators, missing labels, or ordinal and interval data." },
    ],
    citations: [C.snow, C.kappa, C.kripp, C.health],
    related: ['/expert-data', '/research/glossary#inter-annotator-agreement', '/research/eval-sample-size-calculator', '/blog/annotator-disagreement-in-preference-data', '/blog/how-much-data-to-fine-tune-a-reasoning-model', '/blog/how-expert-written-benchmarks-are-built', '/blog/how-to-quality-control-expert-data-labeling'],
  },
  {
    slug: 'synthetic-vs-human-preference-data',
    title: 'Synthetic vs Human Preference Data (RLAIF vs RLHF Labels)',
    shortTitle: 'Synthetic vs human preference data',
    description: 'AI-generated preference labels versus human labels: cost, quality evidence, bias risks, and how labs combine them.',
    a: 'Synthetic (AI) preference data', b: 'Human preference data',
    answer:
      'Synthetic preference data uses a language model to judge which response is better, while human preference data comes from people. Lee et al. (2023) reported RLAIF achieving results comparable to RLHF on summarization and dialogue tasks, and datasets like UltraFeedback scaled AI labels cheaply. Human labels remain the reference for auditing AI judges and for domains where judge models are unreliable.',
    rows: [
      { dimension: 'Cost and speed', a: 'Low cost, fast to regenerate', b: 'Higher cost, slower' },
      { dimension: 'Known biases', a: 'Position, verbosity, self-preference of the judge (Zheng et al., 2023)', b: 'Annotator fatigue, guideline ambiguity, expertise gaps' },
      { dimension: 'Evidence', a: 'RLAIF ≈ RLHF on tested tasks (Lee et al., 2023)', b: 'InstructGPT and most early RLHF systems' },
      { dimension: 'Example datasets/methods', a: 'UltraFeedback; Constitutional AI', b: 'InstructGPT comparisons' },
      { dimension: 'Role in practice', a: 'Bulk labeling', b: 'Gold sets, audits, specialist domains' },
    ],
    whenA: 'Use AI labels for scale where a judge model has been validated against human labels on your task.',
    whenB: 'Use human, and where needed expert, labels to build the validation set and for domains beyond the judge model’s competence.',
    faq: [
      { question: 'Is synthetic preference data as good as human data?', answer: 'On the tasks Lee et al. (2023) tested, RLAIF matched RLHF. That result does not automatically transfer to specialist domains, so validate an AI judge against human labels before relying on it.' },
      { question: 'What is Constitutional AI?', answer: 'An Anthropic method where a model critiques and revises its outputs against written principles, and AI-generated preference labels based on those principles are used for RL.' },
    ],
    citations: [C.rlaif, C.ultra, C.cai, C.judge, C.selfinstruct, C.instruct],
    related: ['/learn/rlhf-preference-data', '/research/glossary#rlaif', '/research/glossary#synthetic-data', '/blog/annotator-disagreement-in-preference-data', '/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels'],
  },
  {
    slug: 'process-vs-outcome-rewards',
    title: 'Process vs Outcome Rewards (PRM vs ORM)',
    shortTitle: 'Process vs outcome rewards',
    description: 'Step-level process reward models versus final-answer outcome rewards: labeling cost, credit assignment, and evidence from math reasoning.',
    a: 'Process rewards (PRM)', b: 'Outcome rewards (ORM)',
    answer:
      'Process rewards score each intermediate reasoning step, while outcome rewards score only the final answer. Lightman et al. (2023) found process supervision outperformed outcome supervision for selecting correct MATH solutions, but step labels are far costlier to collect. Outcome rewards are cheap and verifiable, and underpin RLVR systems such as DeepSeek-R1.',
    rows: [
      { dimension: 'Granularity', a: 'Per step', b: 'Per episode' },
      { dimension: 'Labeling cost', a: 'High: step-level human labels (PRM800K)', b: 'Low: reference answer or test' },
      { dimension: 'Credit assignment', a: 'Dense, localizes errors', b: 'Sparse, harder on long tasks' },
      { dimension: 'Risk', a: 'PRM itself can be exploited', b: 'Correct answers from flawed reasoning get rewarded' },
      { dimension: 'Evidence', a: 'Lightman et al., 2023', b: 'Uesato et al., 2022; DeepSeek-R1, 2025' },
    ],
    whenA: 'Use process rewards when you need to catch reasoning errors that still reach correct answers, and can afford step labels.',
    whenB: 'Use outcome rewards when final answers are verifiable and scale matters more than step-level fidelity.',
    faq: [
      { question: 'What is PRM800K?', answer: 'A dataset of about 800,000 step-level human feedback labels on model-generated solutions to MATH problems, released with Let’s Verify Step by Step.' },
      { question: 'Did DeepSeek-R1 use a process reward model?', answer: 'The DeepSeek-R1 report describes rule-based accuracy and format rewards for reasoning RL and reports that it did not adopt a neural process reward model, citing reward hacking and annotation cost.' },
    ],
    citations: [C.lightman, C.uesato, C.r1, C.grpo, C.skalse],
    related: [ENV, '/research/glossary#process-reward', '/research/glossary#outcome-reward'],
  },
];
