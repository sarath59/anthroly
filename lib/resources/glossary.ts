/**
 * Glossary of post-training data terms. Each definition is written as a
 * direct 40-60 word answer. References point to verified primary sources.
 */

export const RH = '/blog/reward-hacking-rubric-based-rl';
export const ENV = '/blog/what-makes-a-training-grade-rl-environment';

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  related?: string[]; // internal links (blog, compare, tools)
  source?: { label: string; url: string };
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'reinforcement-learning-environment',
    term: 'RL environment',
    definition:
      'A reinforcement learning environment is a packaged task setting that gives a model observations, accepts its actions, and returns a reward. For language models it usually bundles a prompt or task, tools or a sandbox the model can act in, and a grader that scores the final state or answer so training can update the policy.',
    related: [ENV, '/blog/how-tool-use-rl-environments-are-built', '/blog/how-many-rl-environments-do-you-need-to-train-an-agent', '/blog/how-are-web-and-computer-use-rl-environments-built'],
  },
  {
    slug: 'training-grade-environment',
    term: 'Training-grade environment',
    definition:
      'A training-grade environment is an RL environment fit to produce useful gradient signal, not just a score. It has tasks in a learnable difficulty band for the target model, graders with low false-positive and false-negative rates, reproducible execution, and no overlap with the evaluation sets used to report results.',
    related: [ENV, '/blog/how-many-rl-environments-do-you-need-to-train-an-agent'],
  },
  {
    slug: 'rlvr',
    term: 'RLVR (reinforcement learning with verifiable rewards)',
    definition:
      'RLVR trains a language model with rewards computed by a programmatic check instead of a learned reward model, for example exact-match math answers, unit tests passing, or constraint satisfaction. The term was popularized by the Tülu 3 report. It reduces reward-model exploitation but only works where correctness can be checked automatically.',
    related: [RH, '/research/compare/rlvr-vs-rlhf', '/blog/how-reliable-are-rlvr-verifiers', '/blog/how-to-choose-prompts-for-rlvr-training', '/blog/how-are-theorem-proving-rl-environments-built'],
    source: { label: 'Lambert et al., Tülu 3 (arXiv:2411.15124)', url: 'https://arxiv.org/abs/2411.15124' },
  },
  {
    slug: 'rlhf',
    term: 'RLHF (reinforcement learning from human feedback)',
    definition:
      'RLHF fine-tunes a model with reinforcement learning against a reward model trained on human preference comparisons. Annotators rank or compare model outputs, a reward model learns to predict those preferences, and the policy is optimized to score highly, usually with a KL penalty that keeps it close to the starting model.',
    related: ['/research/compare/rlvr-vs-rlhf', '/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough'],
    source: { label: 'Ouyang et al. (arXiv:2203.02155)', url: 'https://arxiv.org/abs/2203.02155' },
  },
  {
    slug: 'rlaif',
    term: 'RLAIF (RL from AI feedback)',
    definition:
      'RLAIF replaces some or all human preference labels with judgments from another language model, which are then used to train a reward model or provide rewards directly. It cuts labeling cost and latency, but inherits the judging model’s biases, so teams typically audit a sample of AI labels against human or expert judgments.',
    related: ['/research/compare/synthetic-vs-human-preference-data', '/blog/generative-reward-models-vs-scalar-reward-models', '/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels'],
    source: { label: 'Lee et al. (arXiv:2309.00267)', url: 'https://arxiv.org/abs/2309.00267' },
  },
  {
    slug: 'reward-model',
    term: 'Reward model',
    definition:
      'A reward model is a neural network, usually initialized from a language model, trained to output a scalar score predicting which response humans would prefer. It stands in for human judgment during RL. Because it is an imperfect proxy, optimizing hard against it can raise reward model scores while true quality falls.',
    related: ['/research/compare/rubric-rewards-vs-reward-models', '/blog/how-to-evaluate-a-reward-model', '/blog/generative-reward-models-vs-scalar-reward-models', '/blog/how-to-prevent-reward-model-overoptimization'],
    source: { label: 'Gao et al. (arXiv:2210.10760)', url: 'https://arxiv.org/abs/2210.10760' },
  },
  {
    slug: 'reward-hacking',
    term: 'Reward hacking',
    definition:
      'Reward hacking is when a policy finds behavior that scores highly under the specified reward without doing the intended task, such as editing tests so they pass or padding answers to satisfy a judge. It is a symptom of a gap between the measurable reward and the designer’s actual objective, and worsens with optimization pressure.',
    related: [RH, '/blog/how-reliable-are-rlvr-verifiers', '/blog/why-does-rlhf-make-models-verbose-length-bias', '/blog/how-to-prevent-reward-model-overoptimization', '/blog/how-are-theorem-proving-rl-environments-built'],
    source: { label: 'Skalse et al. (arXiv:2209.13085)', url: 'https://arxiv.org/abs/2209.13085' },
  },
  {
    slug: 'reward-overoptimization',
    term: 'Reward overoptimization',
    definition:
      'Reward overoptimization is the measured pattern where optimizing a policy against a proxy reward model first improves true quality and then degrades it as optimization continues. Gao et al. characterized how this gap scales with reward model size and with how far the policy drifts from its initialization, measured by KL divergence.',
    related: [RH, '/research/compare/rubric-rewards-vs-reward-models', '/blog/how-to-evaluate-a-reward-model', '/blog/why-does-rlhf-make-models-verbose-length-bias', '/blog/how-to-prevent-reward-model-overoptimization'],
    source: { label: 'Gao et al. (arXiv:2210.10760)', url: 'https://arxiv.org/abs/2210.10760' },
  },
  {
    slug: 'goodharts-law',
    term: "Goodhart's law",
    definition:
      "Goodhart's law is the observation that when a measure becomes a target, it stops being a good measure. In post-training it explains why rewards, benchmarks, and rubric scores drift away from the qualities they were meant to track once a model is optimized directly against them, and why held-out evaluation remains necessary.",
    related: [RH, '/blog/how-to-prevent-reward-model-overoptimization'],
    source: { label: "Wikipedia: Goodhart's law", url: 'https://en.wikipedia.org/wiki/Goodhart%27s_law' },
  },
  {
    slug: 'rubric-based-reward',
    term: 'Rubric-based reward',
    definition:
      'A rubric-based reward scores a response against an explicit checklist of criteria, often written per prompt by domain experts, with a language model judge deciding whether each criterion is met. It extends RL beyond verifiable domains such as math into medicine or science, but rewards only what the rubric actually specifies.',
    related: [RH, '/research/compare/rubric-rewards-vs-reward-models'],
    source: { label: 'Gunjal et al., Rubrics as Rewards (arXiv:2507.17746)', url: 'https://arxiv.org/abs/2507.17746' },
  },
  {
    slug: 'verifier',
    term: 'Verifier',
    definition:
      'A verifier is the component that decides whether a model’s output or final environment state is correct, for example a unit-test harness, a symbolic math checker, a regex, or a model-based judge. Its false-positive rate bounds how much a policy can exploit it, so verifiers need their own adversarial testing.',
    related: [ENV, RH, '/blog/how-reliable-are-rlvr-verifiers', '/blog/how-tool-use-rl-environments-are-built', '/blog/how-are-theorem-proving-rl-environments-built', '/blog/can-reinforcement-learning-reduce-llm-hallucinations', '/blog/how-are-text-to-sql-rl-environments-built'],
  },
  {
    slug: 'grader',
    term: 'Grader',
    definition:
      'A grader converts an episode into a reward value. It may be a deterministic program, a rubric scored by a model judge, or a human. Graders differ from verifiers mainly in scope: a grader can award partial credit or weight several criteria, whereas a verifier usually returns a binary correct or incorrect decision.',
    related: [ENV, '/blog/how-to-evaluate-deep-research-agents'],
  },
  {
    slug: 'llm-as-a-judge',
    term: 'LLM-as-a-judge',
    definition:
      'LLM-as-a-judge uses a strong language model to grade or compare other models’ outputs in place of human raters. Zheng et al. found GPT-4 judgments agreed with human preferences at rates comparable to human-human agreement, but also documented position, verbosity, and self-enhancement biases that must be controlled.',
    related: [RH, '/blog/how-reliable-are-rlvr-verifiers', '/blog/how-to-evaluate-deep-research-agents', '/blog/generative-reward-models-vs-scalar-reward-models', '/blog/how-to-benchmark-ai-agents-on-ml-research', '/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels'],
    source: { label: 'Zheng et al. (arXiv:2306.05685)', url: 'https://arxiv.org/abs/2306.05685' },
  },
  {
    slug: 'outcome-reward',
    term: 'Outcome reward (ORM)',
    definition:
      'An outcome reward scores only the final answer or end state of an episode, ignoring the intermediate steps. Outcome reward models are cheap to label and hard to argue with, but a correct final answer can follow flawed reasoning, and sparse outcome signals make credit assignment harder on long, multi-step tasks.',
    related: ['/research/compare/process-vs-outcome-rewards', '/blog/why-is-multi-turn-rl-for-llm-agents-unstable'],
    source: { label: 'Uesato et al. (arXiv:2211.14275)', url: 'https://arxiv.org/abs/2211.14275' },
  },
  {
    slug: 'process-reward',
    term: 'Process reward (PRM)',
    definition:
      'A process reward scores each intermediate step of a solution rather than only the final answer. Lightman et al. trained process reward models on PRM800K, roughly 800,000 human step-level labels, and found process supervision outperformed outcome supervision for selecting correct solutions on the MATH benchmark.',
    related: ['/research/compare/process-vs-outcome-rewards', '/blog/why-is-multi-turn-rl-for-llm-agents-unstable'],
    source: { label: "Lightman et al., Let's Verify Step by Step (arXiv:2305.20050)", url: 'https://arxiv.org/abs/2305.20050' },
  },
  {
    slug: 'grpo',
    term: 'GRPO (group relative policy optimization)',
    definition:
      'GRPO is a policy-gradient method that samples a group of responses per prompt and uses each response’s reward relative to the group mean as its advantage, removing the separate value network PPO requires. Introduced in DeepSeekMath, it became a common choice for RLVR training of reasoning models.',
    related: [ENV, '/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl', '/blog/how-to-choose-prompts-for-rlvr-training', '/blog/why-does-entropy-collapse-in-rl-for-reasoning-models', '/blog/why-does-rlhf-make-models-verbose-length-bias', '/blog/why-is-multi-turn-rl-for-llm-agents-unstable'],
    source: { label: 'Shao et al., DeepSeekMath (arXiv:2402.03300)', url: 'https://arxiv.org/abs/2402.03300' },
  },
  {
    slug: 'dpo',
    term: 'DPO (direct preference optimization)',
    definition:
      'DPO trains a language model directly on preference pairs with a classification-style loss, skipping the separate reward model and RL loop used in RLHF. Rafailov et al. showed the optimal RLHF policy can be expressed in closed form, so preferences can be fit directly while keeping an implicit KL constraint.',
    related: ['/research/compare/rlvr-vs-rlhf', '/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough', '/blog/why-does-rlhf-make-models-verbose-length-bias', '/blog/how-to-prevent-reward-model-overoptimization'],
    source: { label: 'Rafailov et al. (arXiv:2305.18290)', url: 'https://arxiv.org/abs/2305.18290' },
  },
  {
    slug: 'kl-penalty',
    term: 'KL penalty',
    definition:
      'A KL penalty adds the Kullback-Leibler divergence between the trained policy and a reference model to the RL objective, discouraging the policy from drifting far from its starting behavior. It limits reward hacking and preserves fluency, at the cost of slowing how much the policy can change per unit of reward.',
    related: [RH, '/blog/grpo-vs-ppo-vs-dapo-for-reasoning-rl', '/blog/why-does-entropy-collapse-in-rl-for-reasoning-models', '/blog/how-to-prevent-reward-model-overoptimization'],
  },
  {
    slug: 'pass-at-k',
    term: 'pass@k',
    definition:
      'pass@k is the probability that at least one of k sampled attempts solves a task, typically estimated from n ≥ k samples with an unbiased combinatorial estimator. In RL environment design, per-task pass rates identify tasks that are always or never solved, which give no learning signal under group-relative methods.',
    related: [ENV, '/research/eval-sample-size-calculator', '/blog/how-to-choose-prompts-for-rlvr-training', '/blog/why-does-entropy-collapse-in-rl-for-reasoning-models'],
  },
  {
    slug: 'pass-rate-calibration',
    term: 'Pass-rate calibration',
    definition:
      'Pass-rate calibration filters or reweights training tasks by how often the current model solves them, keeping tasks inside a learnable band rather than those solved every time or never. With group-relative advantages, tasks at 0% or 100% pass rate produce zero advantage and therefore no gradient.',
    related: [ENV, '/blog/how-to-choose-prompts-for-rlvr-training'],
  },
  {
    slug: 'contamination',
    term: 'Data contamination',
    definition:
      'Data contamination occurs when evaluation items, or close paraphrases of them, appear in a model’s pretraining or post-training data, inflating benchmark scores without real capability gains. Environment builders mitigate it by deduplicating training tasks against public benchmarks and holding out freshly written evaluation tasks.',
    related: [ENV, '/blog/how-expert-written-benchmarks-are-built', '/blog/how-to-benchmark-ai-agents-on-ml-research', '/blog/how-are-theorem-proving-rl-environments-built'],
  },
  {
    slug: 'agent-trajectory',
    term: 'Agent trajectory',
    definition:
      'An agent trajectory is the full recorded sequence of an agent’s observations, reasoning, tool calls, and environment responses while completing a task. Expert trajectories are used for supervised fine-tuning and as demonstrations, while model-generated trajectories with rewards are the raw material of RL updates.',
    related: ['/learn/agent-trajectory-data', ENV, '/blog/how-to-evaluate-deep-research-agents', '/blog/how-tool-use-rl-environments-are-built', '/blog/why-is-multi-turn-rl-for-llm-agents-unstable', '/blog/which-agent-trajectories-should-you-fine-tune-on'],
  },
  {
    slug: 'preference-data',
    term: 'Preference data',
    definition:
      'Preference data consists of a prompt with two or more candidate responses and a label saying which is better, sometimes with a strength or rationale. It trains reward models for RLHF and is consumed directly by methods such as DPO. Label quality depends heavily on annotator expertise and guidelines.',
    related: ['/learn/rlhf-preference-data', '/research/compare/synthetic-vs-human-preference-data', '/blog/annotator-disagreement-in-preference-data', '/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough'],
  },
  {
    slug: 'synthetic-data',
    term: 'Synthetic data',
    definition:
      'Synthetic data for post-training is text generated by models rather than written by people, such as instructions bootstrapped by Self-Instruct or preference labels from AI judges. It scales cheaply but can reproduce the generator’s errors and blind spots, so it is usually filtered and spot-checked against human-written references.',
    related: ['/research/compare/synthetic-vs-human-preference-data', '/blog/how-do-ai-labs-audit-training-data-licensing-and-provenance'],
    source: { label: 'Wang et al., Self-Instruct (arXiv:2212.10560)', url: 'https://arxiv.org/abs/2212.10560' },
  },
  {
    slug: 'expert-annotation',
    term: 'Expert annotation',
    definition:
      'Expert annotation is labeling performed by people with verified domain credentials, such as physicians, lawyers, or PhD scientists, rather than general crowd workers. It costs more per label but is required where correctness depends on specialist knowledge, such as rubric writing for medical answers or grading graduate-level science.',
    related: ['/expert-data', '/research/compare/expert-vs-crowd-annotation', '/blog/how-expert-written-benchmarks-are-built', '/blog/how-to-quality-control-expert-data-labeling', '/blog/how-do-ai-labs-audit-training-data-licensing-and-provenance'],
  },
  {
    slug: 'crowdsourced-annotation',
    term: 'Crowdsourced annotation',
    definition:
      'Crowdsourced annotation distributes labeling tasks to many non-specialist workers through a marketplace and aggregates their answers. Snow et al. showed that for several simple NLP tasks, a few aggregated non-expert labels could match expert quality, but the advantage shrinks when tasks require specialist knowledge.',
    related: ['/research/compare/expert-vs-crowd-annotation'],
    source: { label: 'Snow et al., EMNLP 2008', url: 'https://aclanthology.org/D08-1027/' },
  },
  {
    slug: 'inter-annotator-agreement',
    term: 'Inter-annotator agreement (IAA)',
    definition:
      'Inter-annotator agreement measures how consistently independent annotators assign the same labels to the same items. Raw percent agreement overstates reliability because some agreement happens by chance, so chance-corrected statistics such as Cohen’s kappa, Fleiss’ kappa, or Krippendorff’s alpha are standard for reporting label quality.',
    related: ['/research/compare/expert-vs-crowd-annotation', '/research/eval-sample-size-calculator', '/blog/annotator-disagreement-in-preference-data', '/blog/how-to-quality-control-expert-data-labeling'],
  },
  {
    slug: 'cohens-kappa',
    term: "Cohen's kappa",
    definition:
      "Cohen's kappa measures agreement between two raters on categorical labels, corrected for chance: κ = (pₒ − pₑ) / (1 − pₑ), where pₒ is observed agreement and pₑ is agreement expected by chance from each rater’s label frequencies. A value of 1 is perfect agreement and 0 is chance level.",
    related: ['/research/compare/expert-vs-crowd-annotation', '/blog/annotator-disagreement-in-preference-data'],
    source: { label: "Wikipedia: Cohen's kappa", url: 'https://en.wikipedia.org/wiki/Cohen%27s_kappa' },
  },
  {
    slug: 'krippendorffs-alpha',
    term: "Krippendorff's alpha",
    definition:
      "Krippendorff's alpha is a chance-corrected reliability coefficient that works for any number of annotators, tolerates missing labels, and supports nominal, ordinal, interval, and ratio data. That flexibility makes it a common choice for annotation projects where not every item is labeled by every annotator.",
    related: ['/research/compare/expert-vs-crowd-annotation', '/blog/annotator-disagreement-in-preference-data'],
    source: { label: "Wikipedia: Krippendorff's alpha", url: 'https://en.wikipedia.org/wiki/Krippendorff%27s_alpha' },
  },
  {
    slug: 'gold-set',
    term: 'Gold set',
    definition:
      'A gold set is a collection of items with trusted reference labels, typically adjudicated by senior experts, used to measure annotator accuracy, calibrate model judges, and catch drift in labeling quality. Gold items are often mixed blindly into live annotation queues so performance is measured under normal working conditions.',
    related: ['/research/compare/expert-vs-crowd-annotation', '/blog/how-expert-written-benchmarks-are-built', '/blog/how-to-quality-control-expert-data-labeling'],
  },
  {
    slug: 'evaluation-set',
    term: 'Evaluation set',
    definition:
      'An evaluation set is a held-out collection of tasks with reference answers or graders, used to measure model capability rather than to train it. Its size determines statistical precision: reported accuracy should carry a confidence interval, and small differences between models are often not significant on a few hundred items.',
    related: ['/learn/evaluation-datasets-contamination', '/research/eval-sample-size-calculator', '/blog/how-expert-written-benchmarks-are-built', '/blog/how-to-benchmark-ai-agents-on-ml-research', '/blog/how-to-evaluate-ai-on-real-professional-work'],
    source: { label: 'Miller, Adding Error Bars to Evals (arXiv:2411.00640)', url: 'https://arxiv.org/abs/2411.00640' },
  },
  {
    slug: 'confidence-interval-for-accuracy',
    term: 'Confidence interval for eval accuracy',
    definition:
      'A confidence interval for eval accuracy gives a range likely to contain a model’s true success rate. With n independent items and observed accuracy p, the normal approximation is p ± z·√(p(1−p)/n); the Wilson score interval behaves better near 0% or 100% or with small n.',
    related: ['/research/eval-sample-size-calculator', '/blog/how-to-quality-control-expert-data-labeling'],
    source: { label: 'Wikipedia: Binomial proportion confidence interval', url: 'https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval' },
  },
  {
    slug: 'constitutional-ai',
    term: 'Constitutional AI',
    definition:
      'Constitutional AI is Anthropic’s method for training a harmless assistant using a written list of principles. The model critiques and revises its own outputs against the principles for supervised learning, then an AI model labels preferences according to them for RL, reducing the need for human harmlessness labels.',
    related: ['/research/compare/synthetic-vs-human-preference-data', '/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels'],
    source: { label: 'Bai et al. (arXiv:2212.08073)', url: 'https://arxiv.org/abs/2212.08073' },
  },
];
