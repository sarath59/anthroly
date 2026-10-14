import { CONTACT_EMAIL } from './site';

export const PILOT_BOOKING_URL = 'https://cal.com/sarath-kavuru-0uizws/15min';

export const EXPERT_APPLY_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'Join as an expert — [Your field]'
)}&body=${encodeURIComponent(
  'Name:\nField (software, math, science, medicine, law, Indian languages...):\nHighest degree and institution:\nYears of professional experience:\nLanguages you write fluently:\nLinkedIn or CV link:\nHours per week available:\n'
)}`;

export const EXPERT_HEADLINE = 'Expert human data for frontier AI.';
export const EXPERT_SUBHEAD =
  'Verified engineers, scientists, doctors and Indic-language specialists, ready in days.';

export const EXPERT_STATS = [
  { value: '500', label: 'verified experts on the bench' },
  { value: '100', label: 'hold a PhD' },
  { value: '10 days', label: 'to a staffed pilot team' },
  { value: '100', label: 'experts deployed within a week of scale-up' },
] as const;

export interface ExpertService {
  code: string;
  slug: string;
  name: string;
  short: string;
  body: string;
  deliverables: string[];
}

export const EXPERT_SERVICES: ExpertService[] = [
  {
    code: 'RL',
    slug: 'rl-environments',
    name: 'RL environments and tasks',
    short: 'Coding repos with tests and enterprise workflows, each with an automatic grader.',
    body: 'Engineers build tasks an agent has to actually complete: a bug to fix in a real repository, a ticket to close in a simulated enterprise system. Every task ships with an automatic grader, so the reward is computed, not guessed. Experts then attack the grader to find the shortcuts a model could take to score without doing the work.',
    deliverables: [
      'Repository tasks with fail-to-pass and pass-to-pass tests',
      'Enterprise workflows with tools, state and a checkable end result',
      'An automatic grader per task, plus a reward-hacking review',
      'Held-out task splits kept separate from training sets',
    ],
  },
  {
    code: 'EV',
    slug: 'evals',
    name: 'Expert evals and benchmarks',
    short: 'Hard prompts, grading rubrics and proof that today’s models actually fail them.',
    body: 'A benchmark is only useful if it is hard. Specialists write prompts from their own field, write a rubric of small, checkable criteria for each one, and run them against current frontier models. Prompts the models already pass are cut. What remains measures the gap you care about.',
    deliverables: [
      'Prompts written from first-hand professional experience',
      'Atomic rubrics: each criterion checkable on its own',
      'Model-failure verification before a prompt is accepted',
      'Private, never-published sets to avoid contamination',
    ],
  },
  {
    code: 'SFT',
    slug: 'sft',
    name: 'SFT data',
    short: 'Expert-written ideal answers and multi-turn conversations.',
    body: 'Demonstrations of what a great answer looks like, written by the people who give those answers for a living. Single-turn responses, multi-turn conversations with follow-ups and corrections, and step-by-step reasoning where the path matters as much as the result.',
    deliverables: [
      'Ideal responses written from scratch, never model drafts',
      'Multi-turn conversations with realistic follow-ups',
      'Worked reasoning for math, science and code',
      'Style and policy guides applied consistently',
    ],
  },
  {
    code: 'PF',
    slug: 'rlhf',
    name: 'RLHF',
    short: 'Preference ranking and grading of model outputs.',
    body: 'Experts compare model outputs side by side, pick the better one and explain why. Where a single preference is too blunt, they grade outputs against a rubric so your reward model learns which parts of an answer were right, not just which answer won.',
    deliverables: [
      'Pairwise and ranked preferences with written rationales',
      'Rubric-based grading of individual outputs',
      'Error tagging: factual, reasoning, safety, instruction-following',
      'Calibration rounds so raters judge the same way',
    ],
  },
  {
    code: 'IN',
    slug: 'indic',
    name: 'Indic expert data',
    short: 'Medicine, law and STEM in Indian languages.',
    body: 'Most expert data is written in English. We build it natively in Indian languages: clinical questions written by doctors who practise in those languages, legal reasoning from lawyers who argue in them, and STEM problems from teachers and researchers who think in them. Written in the language, not translated into it.',
    deliverables: [
      'Medical, legal and STEM tasks authored natively',
      'Evals and rubrics in Indian languages, including code-mixed text',
      'SFT and preference data reviewed by native-speaking specialists',
      'Cultural and regional context checks, not just grammar',
    ],
  },
];

export const EXPERT_DOMAINS = [
  {
    name: 'Software and coding',
    people: 'Software engineers, SREs, data and ML engineers',
    work: 'Repository tasks, code review, debugging, terminal and tool use',
  },
  {
    name: 'Math and science',
    people: 'Mathematicians, physicists, chemists, biologists, many at PhD level',
    work: 'Proof-style problems, research-grade questions, worked solutions',
  },
  {
    name: 'Medicine',
    people: 'Licensed doctors and clinical specialists',
    work: 'Clinical reasoning, diagnosis cases, guideline-grounded answers',
  },
  {
    name: 'Indian languages',
    people: 'Native-speaking doctors, lawyers, engineers and teachers',
    work: 'Medicine, law and STEM written natively in Indian languages',
  },
] as const;

export const VETTING_STEPS = [
  {
    name: 'Identity check',
    body: 'Government ID verified for every expert before they see a single task.',
  },
  {
    name: 'Credential check',
    body: 'Degrees, licences and work history confirmed against the claims made in the application.',
  },
  {
    name: 'Paid skills test',
    body: 'A real task in their field, scored by a senior reviewer. We pay for the test, so strong people take it seriously.',
  },
  {
    name: 'Project calibration',
    body: 'Before live work, experts complete gold-answer tasks for your project and only move on once they match the standard.',
  },
] as const;

export const QUALITY_CONTROLS = [
  {
    name: 'Gold-answer checks',
    body: 'Tasks with known correct answers are mixed into live work. Experts never know which ones they are.',
  },
  {
    name: 'Two layers of review',
    body: 'Every item is checked by a second expert, then sampled by a senior reviewer before delivery.',
  },
  {
    name: 'Agreement scores',
    body: 'We measure how often experts agree with each other and with the gold answers, and act on the gaps.',
  },
  {
    name: 'No AI tools, strictly',
    body: 'Experts may not use AI tools to produce or edit their work. Breaking the rule ends the engagement.',
  },
  {
    name: 'Weekly quality reports',
    body: 'Every week you get the numbers: accuracy, agreement, rework and what we changed because of them.',
  },
] as const;

export const SECURITY_CONTROLS = [
  {
    name: 'NDA and IP assignment',
    body: 'Every expert signs both before starting. Everything they produce belongs to you.',
  },
  {
    name: 'Managed accounts',
    body: 'Work happens in accounts we issue and control, never in personal ones.',
  },
  {
    name: 'Two-factor login',
    body: 'Required on every account that can touch your project.',
  },
  {
    name: 'Least-access permissions',
    body: 'Experts see only the tasks assigned to them, and access is removed when the work ends.',
  },
  {
    name: 'No public file sharing',
    body: 'No public links, no personal drives, no attachments outside the project workspace.',
  },
] as const;

export const ENGAGEMENT_STEPS = [
  {
    step: '01',
    name: 'Pilot',
    time: '1–2 weeks · free or low cost',
    body: 'A small expert team works on a slice of your real task. You see the data, the review notes and the quality numbers before committing to anything.',
  },
  {
    step: '02',
    name: 'Scoped team',
    time: 'Agreed volume and quality bar',
    body: 'We agree the guidelines, the acceptance criteria and the weekly volume, then staff a dedicated team matched to the domain.',
  },
  {
    step: '03',
    name: 'Scale-up',
    time: 'Up to 100 experts in a week',
    body: 'Once quality holds, we add vetted experts from the bench. Same calibration, same review layers, same weekly report.',
  },
] as const;

export const EXPERT_TRENDS = [
  {
    name: 'Rubrics as rewards',
    body: 'Labs increasingly train on expert-written rubrics, not just evaluate with them. Each criterion has to be small and checkable on its own, so a grader can score it reliably and a model cannot game it.',
  },
  {
    name: 'Grader calibration',
    body: 'Automated graders drift. Experts grade the same model outputs as the grader, and every disagreement is a place where the grader is missing what the task really asked for.',
  },
  {
    name: 'Reward-hacking audits',
    body: 'As models get stronger they find shortcuts: editing the test, hard-coding the answer, gaming the format. Experts deliberately try to break each grader before it is used for training.',
  },
  {
    name: 'Long-horizon agent tasks',
    body: 'Agents are judged on finishing multi-step work across tools and files. Tasks now need realistic state, real tools and an end result that can be checked, not just a good-sounding reply.',
  },
  {
    name: 'Contamination-free evals',
    body: 'Public benchmarks leak into training data. Private sets written from scratch by experts, and never published, are becoming the only scores labs fully trust.',
  },
  {
    name: 'Beyond English',
    body: 'Models still fall behind in Indian languages, most of all in medicine and law. Native-language expert data is one of the clearest gaps left in post-training.',
  },
] as const;

export const EXPERT_FAQ = [
  {
    question: 'What does a pilot cost?',
    answer:
      'Pilots run for one to two weeks and are free or low cost, depending on the size of the task. The point is for you to judge the data before you commit to a scoped team.',
  },
  {
    question: 'How fast can you staff a project?',
    answer:
      'We can put a vetted pilot team in place within 10 days. Once a project scales, we can deploy up to 100 experts from our bench of 500 within a week.',
  },
  {
    question: 'How do you vet experts?',
    answer:
      'Every expert passes an identity check, a credential check and a paid skills test scored by a senior reviewer. Before live work on your project, they also complete gold-answer calibration tasks.',
  },
  {
    question: 'How do you stop experts using AI tools?',
    answer:
      'It is a strict rule in every expert agreement, and breaking it ends the engagement. We combine it with gold-answer checks and two layers of review, which catch work that does not match an expert’s own standard.',
  },
  {
    question: 'Who owns the data?',
    answer:
      'You do. Every expert signs an NDA and an IP assignment before they start, so everything produced on your project belongs to you.',
  },
  {
    question: 'Which Indian languages do you cover?',
    answer:
      'Tell us the languages and domains you need. We match native-speaking specialists in medicine, law and STEM and confirm coverage before the pilot begins.',
  },
  {
    question: 'How do I join as an expert?',
    answer: `Email ${CONTACT_EMAIL} with your field, highest degree, languages and a link to your CV or LinkedIn. If there is a fit, we send a paid skills test.`,
  },
] as const;
