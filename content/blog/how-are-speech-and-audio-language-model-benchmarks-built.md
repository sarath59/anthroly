---
title: "How Are Speech and Audio Language Model Benchmarks and RL Datasets Built? From SUPERB and MMAU to Audio-Dependent QA and Spoken Dialogue Rewards"
description: "A practitioner's guide to how benchmarks and RL datasets for audio language models are built: how SUPERB, Dynamic-SUPERB, AIR-Bench, MMAU, MMAU-Pro, MMAR and MMSU were constructed, why many audio questions can be answered without listening, how DCASE 2026's audio-dependency filtering fixes that, how R1-AQA, SARI, Omni-R1 and Audio-R1 train with RL, and how spoken dialogue rewards are built."
tags:
  - audio
  - speech
  - evals
  - rlvr
  - reward-models
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-03T05:10:00.000Z'
updatedAt: '2026-11-03T05:10:00.000Z'
faq:
  - question: "How are audio language model benchmarks built?"
    answer: "Most pair audio clips with questions and reference answers, usually multiple choice so scoring is automatic. MMAU has 10k clips with human-annotated questions spanning speech, environmental sounds and music across 27 skills. MMAU-Pro has 5,305 instances with human expert-generated question-answer pairs across 49 skills, with audio sourced from the wild. MMAR has 1,000 items from real-world internet videos, each annotated with a chain-of-thought rationale. Earlier suites like SUPERB and Dynamic-SUPERB assembled existing speech datasets into task collections."
  - question: "Can audio models answer benchmark questions without listening to the audio?"
    answer: "Often, yes. Omni-R1 found much of its GRPO improvement came from better text-based reasoning, and fine-tuning on a text-only dataset improved audio benchmark performance. DCASE 2026 Task 5 built its 3,000-item ADQA-Bench specifically to remove questions solvable from text alone, using silent-audio probing, per-option perplexity, an LLM commonsense check and human review. Under conflict between transcript and paralinguistic cues, six audio LLMs followed the text in 78% of mismatched items on average."
  - question: "How is RL used to train audio language models?"
    answer: "Mostly with GRPO on multiple-choice audio question answering, where the reward is answer correctness. R1-AQA applied GRPO to Qwen2-Audio-7B-Instruct with 38k samples and reached 64.5% on MMAU Test-mini, outperforming SFT. SARI used a 32k-sample corpus with curriculum-guided GRPO. Audio-R1 (2026) derives verifiable rewards from self-supervised audio tasks whose answers are known by construction. For ASR, error rate itself can be the reward; GRPO on Whisper-large-v3 improved recognition across 51 African languages."
  - question: "How do you build rewards for spoken dialogue models?"
    answer: "With learned audio reward models and multi-reward schemes, because semantic correctness, prosody, emotion and turn-taking are not checkable by rule. WavReward is trained on ChatReward-30K preference data and raised objective accuracy from 53.4% (Qwen2.5-Omni) to 91.5%. SDiaReward scores full multi-turn speech episodes for modality and colloquialness. Arora et al. (2026) found single-reward RLAIF improves only its targeted metric, while joint semantic, audio-quality and emotion rewards give consistent gains."
  - question: "Are audio LLM judges reliable?"
    answer: "Partly. AudioJudge reached up to 0.91 Spearman correlation with human preferences on system ranking using a multi-aspect ensemble of judges for lexical content, speech quality and paralinguistics, but showed significant verbosity and positional biases. Cross-modal shortcut work found judge-based RL can further amplify reliance on irrelevant visual information in omni-modal models. Judges need human calibration sets, especially for paralinguistic attributes."
  - question: "What should a training-grade audio RL dataset include?"
    answer: "Items that require the audio, verified by silent-audio and shuffled-audio probes; audio from the wild rather than recycled public datasets; free-form as well as multiple-choice formats; conflict items where speech content contradicts acoustic evidence; perception-level checks such as VocalGrad's; balanced labels so constant predictors do not score well; native-speaker and expert annotation for speech, music and paralinguistics; and held-out benchmarks disjoint from training sources."
  - question: "How does Anthroly help build audio and speech evaluations?"
    answer: "Anthroly's PhD experts and specialists, including linguists, phoneticians, musicians and native speakers across languages, write audio-dependent questions, annotate prosody, emotion and paralinguistic cues, build conflict and perception probes, label spoken dialogue preferences, and audit RL outputs that cite acoustic evidence the audio does not contain. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Audio is the modality where a benchmark can be passed without using the modality. A question about a recording usually names the scene, the speaker or the instrument in its own text; a multiple-choice list narrows the rest; and a strong language model fills the gap from priors. The 2025-2026 evidence is blunt: RL gains on audio benchmarks often come from better text reasoning, text-only fine-tuning can raise "audio" scores, and audio LLMs follow the transcript over the acoustics most of the time when the two disagree. This post walks through how the main speech and audio benchmarks were built, how labs turn them into RL datasets and rewards, and what it takes to build data that forces a model to listen.**

## The short answer

A credible audio evaluation or RL dataset has six parts. **Audio that carries the answer**: every item is probed with silent, shuffled or text-only inputs and dropped if it can be solved without listening, as in DCASE 2026's Audio-Dependency Filtering. **Coverage across speech, sound and music, and their mixtures**, with perception-level items (VocalGrad), reasoning items (MMAU, MMAR) and long-form, multi-audio and spatial items (MMAU-Pro). **Formats beyond multiple choice**, because some failures appear only in free-form generation. **Conflict items** where spoken content contradicts acoustic evidence (SAC-Bench) or paralinguistic cues (text-dominance studies). **Rewards matched to what is checkable**: answer correctness for QA, error rate for ASR, self-supervised targets known by construction (Audio-R1), and learned reward models for dialogue quality (WavReward, SDiaReward). And **expert and native-speaker annotation** wherever the label depends on hearing prosody, emotion, pronunciation or music theory.

## How did speech and audio benchmarks evolve?

The field went from frozen-representation leaderboards to instruction-following suites to expert reasoning benchmarks in about four years.

**SUPERB** ([Yang et al., 2021](https://arxiv.org/abs/2105.01051)) set the first standard: a shared self-supervised model, frozen, with lightweight task-specific prediction heads across a wide range of speech tasks. It measured representations, not instruction following.

**Dynamic-SUPERB** ([Huang et al., 2023](https://arxiv.org/abs/2309.09510)) reframed evaluation for instruction-tuned speech models and opened it to community contributions: 55 evaluation instances combining 33 tasks and 22 datasets at launch. **Phase-2** ([Huang et al., 2024](https://arxiv.org/abs/2411.05361)) added 125 community-contributed tasks for a total of 180, extending from classification to regression and sequence generation across speech, music and environmental audio. No model performed well universally.

**AIR-Bench** ([Yang et al., 2024](https://arxiv.org/abs/2402.07729)) introduced the two-tier design most suites now follow: a *foundation* benchmark of 19 tasks with about 19k single-choice questions, and a *chat* benchmark of 2k open-ended questions scored by a strong LLM judge given the audio's meta-information. **AudioBench** ([Wang et al., 2024](https://arxiv.org/abs/2406.16020)) covered 8 tasks and 26 datasets (7 newly proposed) across speech understanding, audio scene understanding and paralinguistic voice understanding.

Note the AIR-Bench judging design: the judge never hears the audio, it reads a text description of it. That is cheap and consistent, and it means the judge can only reward what the metadata already says.

## How were the audio reasoning benchmarks built?

From late 2024 the target moved to expert-level reasoning over audio.

| Benchmark | Size and sources | Annotation | Headline result |
|---|---|---|---|
| [MMAU](https://arxiv.org/abs/2410.19168) (Sakshi et al., 2024) | 10k clips; speech, sounds, music; 27 skills | Human-annotated questions and answers | Gemini Pro v1.5 52.97%, Qwen2-Audio 52.50% |
| [MMAR](https://arxiv.org/abs/2505.13032) (Ma et al., 2025) | 1,000 items from real-world internet videos, including mixed sound, music and speech | Iterative error correction; CoT rationale per item; four layers (Signal, Perception, Semantic, Cultural) | Part of the set requires graduate-level perceptual and domain knowledge |
| [MMSU](https://arxiv.org/abs/2506.04779) (Wang et al., 2025) | 5,000 items, 47 tasks | Grounded in linguistics: phonetics, prosody, rhetoric, syntax, semantics, paralinguistics | Substantial room for improvement across 14 SpeechLLMs |
| [MMAU-Pro](https://arxiv.org/abs/2508.13992) (Kumar et al., 2025) | 5,305 instances, 49 skills; audio from the wild; long-form, spatial, multi-audio | Human expert-generated QA; multiple-choice and open-ended | Gemini 2.5 Flash 59.2%, Audio Flamingo 3 51.7%; near random in several categories |
| [ADQA-Bench](https://arxiv.org/abs/2607.18718) (He et al., 2026) | 3,000 items across music, speech, environmental audio | Audio-Dependency Filtering plus human review | Top system 58.33%; every system misses the same 233 items |

Two construction choices separate the stronger suites. MMAU-Pro sources audio "from the wild" rather than from existing datasets with known distributions, which limits the chance that training sets already contain the clips and labels. MMAR attaches a rationale to every item and classifies it by reasoning layer, which turns a single accuracy number into a diagnosis.

Speech interaction gets its own suites. [VoiceBench](https://arxiv.org/abs/2410.17196) (Chen et al., 2024) tests LLM-based voice assistants on real and synthetic spoken instructions that vary speaker characteristics, environment and content. [Speech-IFEval](https://arxiv.org/abs/2505.19037) (Lu et al., 2025) separates instruction following from speech perception and finds most speech-aware models struggle with even basic instructions, performing far worse than text LLMs. [Full-Duplex-Bench](https://arxiv.org/abs/2503.04721) (Lin et al., 2025) scores pause handling, backchanneling, turn-taking and interruption management with automatic metrics.

## Do audio language models actually listen?

This is the question every audio dataset builder has to answer first, and the evidence is uncomfortable.

- **RL gains can be text gains.** [Omni-R1](https://arxiv.org/abs/2505.09439) (Rouditchenko et al., 2025) fine-tuned Qwen2.5-Omni with GRPO and set state of the art on MMAU and MMAR. Testing with and without audio, the authors found much of the improvement could be attributed to better text-based reasoning, and fine-tuning on a text-only dataset improved audio-based performance.
- **Text-only training is a cheaper route to the same scores.** [Text-Centric Post-Training](https://arxiv.org/abs/2610.02819) (Cheng et al., 2026) raised Qwen2.5-Omni-7B's geometric mean of nine reasoning scores by 25.83% with text-only SFT plus RL, beating the full native audio-visual route with 56.6% fewer GPU-hours. But text-only training degraded perception, which a smaller native audio-visual RL stage then had to restore.
- **Models follow the transcript.** Across six audio LLMs under conflict between transcript content and paralinguistic cues (emotion, speaker identity, sarcasm), [Banerjee et al. (2026)](https://arxiv.org/abs/2610.25599) measured a mean text-dominance rate of 0.78 on mismatched items (0.86 excluding sarcasm). In the most text-dominant model, speaker identity was still linearly decodable at the language model's input, so the failure is not perceptual. The effect they trace appeared only in free-form generation, not in closed-set multiple choice, which the authors read as a sign that benchmarks relying on multiple choice may be systematically blind to it.
- **Spoken claims override acoustic evidence.** [SAC-Bench](https://arxiv.org/abs/2611.00325) (Wang et al., 2026) pairs environmental recordings with compatible or contradictory synthesized speech: 616,031 clips from 188 sound-event classes. Event Identity accuracy was 24.8-46.5 percentage points lower under conflict than under compatible claims.
- **Low-level perception is near chance.** [VocalGrad](https://arxiv.org/abs/2610.23745) (Ryu and Yanaka, 2026) reduces acoustic perception to a binary judgment of the direction of temporal change. Human annotators achieve high accuracy; state-of-the-art audio LLMs perform near chance.
- **Other modalities leak too.** In omni-modal models, [Ma and Lin (2026)](https://arxiv.org/abs/2609.36798) found that for audio questions the models rely on the image as much as on the audio, sometimes more, that the shortcut persists through SFT and RL, and that judge-based RL may amplify it.

The cleanest response is DCASE 2026 Task 5, **Audio-Dependent Question Answering** ([He et al., 2026](https://arxiv.org/abs/2607.18718)). Its Audio-Dependency Filtering pipeline combines silent-audio probing, per-option perplexity, an LLM commonsense check and human review to remove items solvable from text alone; 3,000 items survive. Across 30 submissions with a comparable development score, accuracy fell by 11.91 percentage points on average on the hidden evaluation split, which was designed to be harder.

## How do you measure audio dependency?

Define, for a model $f$ and item $i$ with audio $a_i$, question $q_i$ and answer $y_i$, the per-item audio dependency

$$
\Delta_i = \mathbb{1}[f(a_i, q_i) = y_i] - \max_{\tilde a \in \{\varnothing,\ a_{\pi(i)}\}} \mathbb{1}[f(\tilde a, q_i) = y_i]
$$

where $\varnothing$ is silence and $a_{\pi(i)}$ is audio from a different item. An item where $\Delta_i \le 0$ for every probe model is not testing listening. For an $m$-option multiple-choice question the blind baseline is not zero but at least $1/m$, so a benchmark-level audio gain should always be reported against it.

A minimal filter, in the spirit of ADQA:

```python
import random

def silent_like(audio):
    return [0.0] * len(audio)

def audio_dependent(item, probe_models, pool, n_samples=4, chance=None):
    """Keep an item only if no probe model can answer it without the right audio."""
    m = len(item["options"])
    chance = chance if chance is not None else 1.0 / m
    other = random.choice([x for x in pool if x["id"] != item["id"]])["audio"]
    for model in probe_models:
        for probe in (silent_like(item["audio"]), other, None):   # silence, wrong clip, text only
            hits = sum(
                model.answer(probe, item["question"], item["options"]) == item["answer"]
                for _ in range(n_samples)
            )
            if hits / n_samples > chance + 0.25:   # clearly above chance without the audio
                return False
    return True

def filter_items(items, probe_models):
    kept = [x for x in items if audio_dependent(x, probe_models, items)]
    return kept   # then send kept items to human review, as ADQA does
```

The threshold and probe set are judgment calls; ADQA adds per-option perplexity and a commonsense LLM check. The important part is running the probes *before* an item enters a training or evaluation set, with several model families, because each family's priors differ.

## How are RL datasets for audio language models built?

Audio RL followed the vision playbook: take multiple-choice audio QA, reward correct answers, run GRPO.

| Work | Data | Reward | Reported result |
|---|---|---|---|
| [R1-AQA](https://arxiv.org/abs/2503.11197) (Li et al., 2025) | 38k post-training samples | MCQ correctness, GRPO on Qwen2-Audio-7B-Instruct | 64.5% MMAU Test-mini; RL beats SFT; explicit reasoning showed no significant benefit |
| [Audio-Reasoner](https://arxiv.org/abs/2503.02318) (Xie et al., 2025) | CoTA, 1.2M samples with closed-model secondary labeling and structured CoT | SFT on reasoning traces | +25.42% on MMAU-mini |
| [SARI](https://arxiv.org/abs/2504.15900) (Wen et al., 2025) | 32k MCQ corpus; SFT warm-up then curriculum GRPO | MCQ correctness | +16.35% over Qwen2-Audio-7B-Instruct; 67.08% MMAU test-mini on Qwen2.5-Omni |
| [Audio Flamingo 3](https://arxiv.org/abs/2507.08128) (Goel et al., 2025) | AudioSkills-XL, LongAudio-XL, AF-Think, AF-Chat; open audio only | Five-stage curriculum | SOTA on 20+ audio benchmarks |
| [Audio-Thinker](https://arxiv.org/abs/2508.08039) (Wu et al., 2025) | Audio QA | Adaptive think-accuracy reward plus external reward model for reasoning consistency | Beats prior reasoning-oriented audio models |
| [Audio-R1](https://arxiv.org/abs/2610.34609) (Jeong et al., 2026) | Self-supervised audio tasks | Answers determined during task construction | Improves downstream tasks distinct from the training tasks, beyond SFT |
| [AudioRSI](https://arxiv.org/abs/2610.36578) (Fan et al., 2026) | AVQA training set; four disjoint OOD benchmarks | The policy as pairwise critic, refreshed recursively | Frozen external judge plateaus OOD; refreshed critic keeps rising |

Three design lessons stand out.

**Self-supervised targets are the audio equivalent of procedural generation.** Audio-R1 builds tasks whose answers are known because the data pipeline created them, which gives verifiable rewards without human labels and without text priors that leak the answer.

**Guard against modality collapse during RL.** [MAPO](https://arxiv.org/abs/2605.27741) (Xiao et al., 2026) describes late-stage modality collapse: during long chains of thought, models abandon the audio for textual priors and hallucinate confidently. Its fix weights policy gradients toward modality-critical tokens identified by comparing an audio-ablated reference with the multimodal policy. [PG-TTRL](https://arxiv.org/abs/2609.23589) (Dong et al., 2026) finds stronger layer-wise acoustic reliance is associated with higher accuracy and builds that into test-time RL. AudioRSI's critic hears the same recording, so it can reject reasoning that cites acoustic evidence the audio does not contain.

**Use the task's own metric where one exists.** For speech recognition the error rate is the verifier, and a reward such as $r = 1 - \min(1, \text{WER}(\hat y, y))$ is the natural choice. [Hu et al. (2026)](https://arxiv.org/abs/2610.30663) applied GRPO to Whisper-large-v3 across 51 African languages, with the largest benefits when data was scarce or audio noisy; their SunflowerASR reports macro-averaged WER of 0.227 on AfriVox-v2 and 0.372 on SimbaBench. For TTS, [FlowTTS-GRPO](https://arxiv.org/abs/2606.23190) (Wang et al., 2026) found a weighted combination of rewards converged faster than a probabilistic scheme. The caveat for both: WER and speaker similarity are only as good as the reference transcripts and the scoring model, which for low-resource languages needs native-speaker checking.

## How are rewards built for spoken dialogue?

Dialogue quality in speech is not a rule. It includes semantic quality, naturalness, emotion, speaker consistency and timing, and the text transcript misses most of it.

- **Learned audio reward models.** [WavReward](https://arxiv.org/abs/2505.09558) (Ji et al., 2025) trains an audio-language reward model on ChatReward-30K, a preference dataset covering text-based chats, nine acoustic attributes of instruction chats and implicit chats; it raised objective accuracy from 53.4% (Qwen2.5-Omni) to 91.5%. [SDiaReward](https://arxiv.org/abs/2603.14889) (Lu et al., 2026) scores full multi-turn speech episodes with pairwise preferences targeting the modality gap (prosody, emotion) and the colloquialness gap (written scripts versus natural speech), and releases ESDR-Bench.
- **Multiple rewards, not one.** [Arora et al. (2026)](https://arxiv.org/abs/2601.19063) combine semantic, audio-quality and emotion-consistency rewards in RLAIF for spoken dialogue, including blockwise duplex models. Single-reward RLAIF selectively improved its targeted metric; joint multi-reward training gave consistent gains across semantic quality and audio naturalness.
- **Audio judges with known biases.** [AudioJudge](https://arxiv.org/abs/2507.12705) (Manakul et al., 2025) found a multi-aspect ensemble of specialized judges for lexical content, speech quality and paralinguistics reached up to 0.91 Spearman correlation with human preferences on system ranking, but also significant verbosity and positional biases. [AnyAudio-Judge](https://arxiv.org/abs/2606.03116) (Li et al., 2026) decomposes audio-generation instructions into binary rubric items, with a 7,920-sample benchmark built with deliberate hard negatives.

## What do teams get wrong with audio data?

1. **Reporting accuracy without a blind baseline.** If you do not report silent-audio and text-only accuracy beside the real score, nobody can tell how much the model listened.
2. **Recycling public clips.** Benchmarks assembled from well-known datasets share distributions, and often clips, with training sets. MMAU-Pro's audio from the wild is the better default.
3. **Multiple choice only.** It is cheap to score but hides free-form failures and makes elimination by priors easy.
4. **Label imbalance that a constant predictor exploits.** The MUB music benchmark ([Liu and Tao, 2026](https://arxiv.org/abs/2610.22989)) reports 98.4% time-signature accuracy for a constant 4/4 predictor, and its authors list unverified independent annotation agreement among its own limitations. Always score trivial baselines.
5. **Judges that read metadata instead of audio.** A judge given a caption can only reward what the caption says.
6. **One reward for a multi-dimensional skill.** Arora et al. show single rewards move single metrics.
7. **Assuming the hard tail is noise.** Every ADQA system missed the same 233 items. Before dropping them, check with experts whether they are mislabeled or genuinely hard; both answers are valuable.

## What does a training-grade audio dataset need?

1. **Audio-dependency filtering** with silent, shuffled and text-only probes across several model families, then human review.
2. **Fresh audio** recorded or sourced outside common public datasets, with rights cleared.
3. **Balanced labels** and trivial-baseline scores for every task.
4. **Free-form and multiple-choice versions** of the same items.
5. **Conflict and perception probes**: speech-versus-acoustics and transcript-versus-paralinguistics conflicts, plus low-level perception items.
6. **Self-supervised and metric-based rewards** where possible; learned reward models only where necessary, calibrated against human preference sets.
7. **Native-speaker and expert annotation** for pronunciation, prosody, emotion, code-switching and music.
8. **Disjoint held-out benchmarks** (AudioRSI evaluated on four benchmarks disjoint from its training distribution), and a per-run check that audio-ablated accuracy is not rising faster than real accuracy.

## Where does expert human data matter in audio?

Nearly every strong audio benchmark leans on human expertise at the step automation cannot do. MMAU's questions are human-annotated; MMAU-Pro's are written by human experts; MMAR includes items requiring graduate-level perceptual and domain knowledge and was refined through iterative error correction; MMSU grounds its 47 tasks in phonetics, prosody and rhetoric; ADQA's final filter is human review. Hearing whether a speaker is sarcastic, whether a cadence is deceptive, whether a pronunciation is native or whether a chord progression modulates is a trained skill, and for low-resource languages it requires native speakers. Spoken dialogue rewards need human preference labels that weigh naturalness and timing, not just content. Synthetic speech scales conflict probes cheaply, as SAC-Bench shows; experts decide which conflicts and which labels are real.

## How Anthroly can help

Anthroly works with PhD experts and specialists, including linguists, phoneticians, musicians and native speakers across many languages, who write audio-dependent questions, annotate prosody, emotion and paralinguistic cues, build conflict and perception probes, label spoken dialogue preferences, review ASR references for low-resource languages, and audit RL outputs that cite acoustic evidence the audio does not contain. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building audio or speech evaluations or RL datasets and want an expert check on how much of your benchmark can be solved without listening, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [How are vision-language RL datasets built? Verifiable visual rewards and shortcut filtering](/blog/how-are-vision-language-rl-datasets-built)
- [How reliable are RLVR verifiers?](/blog/how-reliable-are-rlvr-verifiers)
- [LLM-as-a-judge vs expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [Generative reward models vs scalar reward models](/blog/generative-reward-models-vs-scalar-reward-models)
- [How to build multilingual preference data for RLHF](/blog/how-to-build-multilingual-preference-data-for-rlhf)
- [Building contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks)
- [How are instruction-following benchmarks and rewards built?](/blog/how-are-instruction-following-benchmarks-and-rewards-built)

---

## References

1. Yang, S., Chi, P.-H., Chuang, Y.-S., et al. (2021). [SUPERB: Speech processing Universal PERformance Benchmark](https://arxiv.org/abs/2105.01051). arXiv:2105.01051.
2. Huang, C., Lu, K.-H., Wang, S.-H., et al. (2023). [Dynamic-SUPERB: Towards A Dynamic, Collaborative, and Comprehensive Instruction-Tuning Benchmark for Speech](https://arxiv.org/abs/2309.09510). arXiv:2309.09510.
3. Huang, C., Chen, W.-C., Yang, S., et al. (2024). [Dynamic-SUPERB Phase-2: A Collaboratively Expanding Benchmark for Measuring the Capabilities of Spoken Language Models with 180 Tasks](https://arxiv.org/abs/2411.05361). arXiv:2411.05361.
4. Yang, Q., Xu, J., Liu, W., et al. (2024). [AIR-Bench: Benchmarking Large Audio-Language Models via Generative Comprehension](https://arxiv.org/abs/2402.07729). arXiv:2402.07729.
5. Wang, B., Zou, X., Lin, G., et al. (2024). [AudioBench: A Universal Benchmark for Audio Large Language Models](https://arxiv.org/abs/2406.16020). arXiv:2406.16020.
6. Sakshi, S., Tyagi, U., Kumar, S., et al. (2024). [MMAU: A Massive Multi-Task Audio Understanding and Reasoning Benchmark](https://arxiv.org/abs/2410.19168). arXiv:2410.19168.
7. Chen, Y., Yue, X., Zhang, C., et al. (2024). [VoiceBench: Benchmarking LLM-Based Voice Assistants](https://arxiv.org/abs/2410.17196). arXiv:2410.17196.
8. Ma, Z., Ma, Y., Zhu, Y., et al. (2025). [MMAR: A Challenging Benchmark for Deep Reasoning in Speech, Audio, Music, and Their Mix](https://arxiv.org/abs/2505.13032). arXiv:2505.13032.
9. Wang, D., Li, J., Wu, J., et al. (2025). [MMSU: A Massive Multi-task Spoken Language Understanding and Reasoning Benchmark](https://arxiv.org/abs/2506.04779). arXiv:2506.04779.
10. Kumar, S., Sedláček, Š., Lokegaonkar, V., et al. (2025). [MMAU-Pro: A Challenging and Comprehensive Benchmark for Holistic Evaluation of Audio General Intelligence](https://arxiv.org/abs/2508.13992). arXiv:2508.13992.
11. Lu, K.-H., Kuan, C.-Y., & Lee, H. (2025). [Speech-IFEval: Evaluating Instruction-Following and Quantifying Catastrophic Forgetting in Speech-Aware Language Models](https://arxiv.org/abs/2505.19037). arXiv:2505.19037.
12. Lin, G.-T., Lian, J., Li, T., et al. (2025). [Full-Duplex-Bench: A Benchmark to Evaluate Full-duplex Spoken Dialogue Models on Turn-taking Capabilities](https://arxiv.org/abs/2503.04721). arXiv:2503.04721.
13. Li, G., Liu, J., Dinkel, H., et al. (2025). [Reinforcement Learning Outperforms Supervised Fine-Tuning: A Case Study on Audio Question Answering](https://arxiv.org/abs/2503.11197). arXiv:2503.11197.
14. Xie, Z., Lin, M., Liu, Z., et al. (2025). [Audio-Reasoner: Improving Reasoning Capability in Large Audio Language Models](https://arxiv.org/abs/2503.02318). arXiv:2503.02318.
15. Wen, C., Guo, T., Zhao, S., Zou, W., & Li, X. (2025). [SARI: Structured Audio Reasoning via Curriculum-Guided Reinforcement Learning](https://arxiv.org/abs/2504.15900). arXiv:2504.15900.
16. Rouditchenko, A., Bhati, S., Araujo, E., et al. (2025). [Omni-R1: Do You Really Need Audio to Fine-Tune Your Audio LLM?](https://arxiv.org/abs/2505.09439). arXiv:2505.09439.
17. Goel, A., Ghosh, S., Kim, J., et al. (2025). [Audio Flamingo 3: Advancing Audio Intelligence with Fully Open Large Audio Language Models](https://arxiv.org/abs/2507.08128). arXiv:2507.08128.
18. Wu, S., Li, C., Wang, W., et al. (2025). [Audio-Thinker: Guiding Audio Language Model When and How to Think via Reinforcement Learning](https://arxiv.org/abs/2508.08039). arXiv:2508.08039.
19. Ji, S., Liang, T., Li, Y., et al. (2025). [WavReward: Spoken Dialogue Models With Generalist Reward Evaluators](https://arxiv.org/abs/2505.09558). arXiv:2505.09558.
20. Manakul, P., Gan, W. H., Ryan, M. J., et al. (2025). [AudioJudge: Understanding What Works in Large Audio Model Based Speech Evaluation](https://arxiv.org/abs/2507.12705). arXiv:2507.12705.
21. Arora, S., Tian, J., Shi, J., et al. (2026). [Optimizing Conversational Quality in Spoken Dialogue Systems with Reinforcement Learning from AI Feedback](https://arxiv.org/abs/2601.19063). arXiv:2601.19063.
22. Lu, J., Wang, Y., Zhuo, F., et al. (2026). [SDiaReward: Modeling and Benchmarking Spoken Dialogue Rewards with Modality and Colloquialness](https://arxiv.org/abs/2603.14889). arXiv:2603.14889.
23. Xiao, C., Shao, Y., Li, C., et al. (2026). [Escape the Language Prior: Mitigating Late-Stage Modality Collapse in Audio Reasoning via Modality-Aware Policy Optimization](https://arxiv.org/abs/2605.27741). arXiv:2605.27741.
24. Li, H., Tan, T., Yang, Y., Yang, S., & Chen, X. (2026). [AnyAudio-Judge: A Dynamic Rubric-Based Benchmark and Evaluator for Audio Instruction Following](https://arxiv.org/abs/2606.03116). arXiv:2606.03116.
25. Wang, H., Tian, B., Li, W., et al. (2026). [FlowTTS-GRPO: Online Reinforcement Learning with Multi-Objective Reward Optimization for Flow-Matching Based Text-to-Speech](https://arxiv.org/abs/2606.23190). arXiv:2606.23190.
26. He, H., Sun, R., Dai, Z., et al. (2026). [Summary of DCASE 2026 Task 5: Audio-Dependent Question Answering](https://arxiv.org/abs/2607.18718). arXiv:2607.18718.
27. Dong, J., Yu, X., Honorio, J., et al. (2026). [Listen Then Reason: Perception-Grounded Test-Time Reinforcement Learning for Large Audio-Language Models](https://arxiv.org/abs/2609.23589). arXiv:2609.23589.
28. Ma, Y., & Lin, R. (2026). [Seeing What Should Be Heard: Diagnosing and Repairing Cross-Modal Shortcuts in Omni-Modal LLMs](https://arxiv.org/abs/2609.36798). arXiv:2609.36798.
29. Cheng, Z., Wang, Y., Liu, H., et al. (2026). [Text-Centric Post-Training for Omni-Modal Reasoning](https://arxiv.org/abs/2610.02819). arXiv:2610.02819.
30. Liu, K., & Tao, L. (2026). [MUB: An Identity-Masked Benchmark for Music Understanding in Multimodal Language Models](https://arxiv.org/abs/2610.22989). arXiv:2610.22989.
31. Ryu, K., & Yanaka, H. (2026). [VocalGrad: Evaluating Acoustic Perception in Audio Language Models](https://arxiv.org/abs/2610.23745). arXiv:2610.23745.
32. Banerjee, A., Guntakala, V., Pike, D., et al. (2026). [Text Dominance in Paralinguistic Conflict: Tracing Suppression Through Audio LLM Circuits](https://arxiv.org/abs/2610.25599). arXiv:2610.25599.
33. Hu, T. W., Ouma, E. N., Akera, B., & Quinn, J. A. (2026). [Group Relative Policy Optimisation Improves Multilingual Speech Recognition in Low-Resource Languages](https://arxiv.org/abs/2610.30663). arXiv:2610.30663.
34. Jeong, J., Ravanelli, M., Wang, Z., & Subakan, C. (2026). [Audio-R1: Audio Reasoning through Reinforcement Learning on Self-Supervised Tasks](https://arxiv.org/abs/2610.34609). arXiv:2610.34609.
35. Fan, J., Ren, R., Li, J., et al. (2026). [AudioRSI: Recursively Self-Improving Audio Reasoners](https://arxiv.org/abs/2610.36578). arXiv:2610.36578.
36. Wang, W., Li, Y., & Yoshino, K. (2026). [One Waveform, Two Stories: Benchmarking Speech-Acoustic Conflict in Audio-Language Models](https://arxiv.org/abs/2611.00325). arXiv:2611.00325.
