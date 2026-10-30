---
title: "How Do You Build Multilingual Preference Data for RLHF? Translation, Cross-Lingual Transfer, and Native-Speaker Labels"
description: "Most preference data and reward models are English-first. Here is what the evidence says about aligning models in many languages: how far English-only preference data and reward models transfer, why translated preference pairs carry translationese and Western-centric content, how much reward models drop outside English on M-RewardBench, why local harms need native annotators, and a practical recipe for multilingual preference data."
tags:
  - preference-data
  - multilingual
  - rlhf
  - reward-models
  - data-quality
  - expert-data
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-29T12:42:00.000Z'
updatedAt: '2026-10-29T12:42:00.000Z'
faq:
  - question: "Does English-only preference data improve a model in other languages?"
    answer: "Somewhat, but multilingual data does better. Dang et al. (2024) found that preference optimization on English-only data improved Aya 23 8B in other languages, but adding just five languages raised win-rates on unseen languages from 46.3% to 54.9%, and including all 23 languages raised overall win-rates from 46.4% to 53.4% at a fixed 50K-prompt budget. Online RLOO also transferred better than offline DPO."
  - question: "Can an English reward model align a model in another language?"
    answer: "Often, yes. Wu et al. (2024) trained a reward model in one language and used it to align models in others on summarization and dialog; humans preferred the cross-lingually aligned models over unaligned ones in up to more than 70% of cases, and a different-language reward model sometimes beat a same-language one. Hong et al. (2024) found English reward models built on multilingual base models outperformed target-language reward models by 3 to 4% on average on Multilingual RewardBench."
  - question: "How much worse are reward models outside English?"
    answer: "M-RewardBench (Gureja et al., 2024), with 2.87k preference instances in 23 languages, found a significant gap between English RewardBench and multilingual scores, up to a 13% drop. Generative reward models dropped about 3% on average, while classifier and DPO-implicit reward models dropped more than 8%. Scores were highest for Portuguese (68.7% averaged over models) and lowest for Arabic (62.8%), and higher-resource languages and Latin or Cyrillic scripts scored better."
  - question: "What is wrong with translating English preference data?"
    answer: "Three things. Translation introduces translationese artifacts that a reward model can learn to penalize or prefer for the wrong reason; repeatedly translating the same pairs reduces diversity; and the content stays Western-centric. Global-MMLU found 28% of MMLU questions require culturally sensitive knowledge and 84.9% of geography questions focus on North America or Europe. Translation quality also matters: a better machine translator raised M-RewardBench scores by 1 to 3%."
  - question: "Why do safety preferences need native-speaker annotators?"
    answer: "Because many harms are local. The Aya Red-teaming dataset collected about 900 human-written harmful prompts per language in eight languages, labeled as global or local harm. Training on local-harm examples reduced global harms by a relative 77.8%, more than training on global harms alone. Translated English red-team prompts cannot supply local harms, which depend on cultural and historical context."
  - question: "How do you check multilingual preference labels for quality?"
    answer: "Stratify everything by language. Measure inter-annotator agreement per language, have native speakers re-label a sample of any translated pairs, and track the reward model's accuracy on held-out pairs per language and script. M-RewardBench's native-speaker check found most disagreements came from annotators choosing a helpful-but-harmful answer over a refusal, which shows that guidelines need localization as much as text does."
  - question: "How does Anthroly help with multilingual preference data?"
    answer: "Anthroly sources native-speaker domain experts to write prompts in-language, rank and rewrite responses, label local harms, audit translated pairs for translationese and cultural mismatch, and build per-language reward-model evaluation sets. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Preference optimization is the standard final stage of post-training, and almost all of its public data, reward models and evaluations are in English. Yet a large share of users are not English speakers. The tempting shortcut is to train in English and trust transfer, or to machine-translate English preference pairs. The evidence says both shortcuts partly work and partly fail in predictable ways. This post reviews what the main multilingual alignment studies found, where translation goes wrong, how reward models degrade outside English, and how to build a multilingual preference dataset that is worth its cost.**

## The short answer

Preference learning transfers across languages, but not for free. English-only preference data improves other languages; a handful of additional languages improves them much more; and online RL transfers better than offline DPO. English reward models built on multilingual base models transfer surprisingly well and sometimes beat same-language reward models, but every multilingual reward-model benchmark shows a drop outside English, largest for lower-resource languages and non-Latin scripts. Translation is a useful tool for prompts and evaluation coverage and a poor source of chosen responses, because translationese and Western-centric content leak into the reward. The pieces that cannot be translated are local knowledge, local norms and local harms, and those need native-speaker annotators. A good recipe spends human budget on in-language prompts, native rankings of in-language responses, local safety data and per-language evaluation sets, and lets cross-lingual transfer do the rest.

## How far does English preference data transfer?

The cleanest controlled study is Dang et al. (2024), "RLHF Can Speak Many Languages." Starting from Aya 23 8B, they built preference mixtures with a fixed budget of 50K prompts and varied language coverage:

| Mixture | Languages in preference data | Finding |
|---|---|---|
| EN-1 | English only | Improves other languages; 46.3% win-rate on unseen languages |
| ML-5 | 5 languages, 10K prompts each | 54.9% win-rate on unseen languages |
| ML-23 | All 23 languages | Overall win-rate rises from 46.4% (English-only) to 53.4% |

Two further results matter for practice. Online optimization (RLOO) beat offline DPO by up to 10.6 points in average win-rate (54.4% versus 43.8%) and transferred better to languages not seen in training, by up to 8.3 points. And the final preference-trained model reached a 54.4% win-rate against the base Aya 23 8B and 69.5% to 77.5% against Gemma-1.1-7B-it, Llama-3-8B-Instruct and Mistral-7B-Instruct-v0.3, averaged over 23 languages.

The practical reading: a small amount of genuinely multilingual preference data buys more than its share, because it improves languages that are not in the mix at all. The marginal value of the second, third and fifth language is high; the marginal value of the twentieth is lower but still positive.

## Can you reuse an English reward model?

Two studies say yes, with caveats.

**Wu et al. (2024)** trained a reward model on preference data in one source language and used it, without any target-language preference data, to align policies in other languages on summarization (Seahorse, six languages) and open-ended dialog (OpenAssistant). Humans preferred the cross-lingually aligned models over unaligned ones in up to more than 70% of instances. Strikingly, a different-language reward model sometimes produced a better policy than a same-language one. The authors suggest a regularization effect: a target-language reward model may carry language-specific spurious artifacts that the target-language policy overfits.

**Hong et al. (2024)** found that English reward models built on multilingual pretrained models outperformed target-language reward models by 3 to 4% on average on Multilingual RewardBench, and that alignment with the English reward model raised win-rates by an average of 9.5% across four non-English languages. Their explanation is that training on English preserves the multilingual representations of the base model, which already understand the other languages.

The caveat in both cases is the same: transfer relies on the base model already understanding the target language well. Transfer is a property of the representation, so it is weakest exactly where the base model is weakest, in lower-resource languages and scripts.

## How much do reward models degrade outside English?

M-RewardBench (Gureja et al., 2024) translated RewardBench into 23 typologically diverse languages, filtered the translations, added a translation-preference task, and evaluated 24 reward models on 2.87k preference instances. The headline results:

- **A consistent gap.** Reward models scored lower on M-RewardBench than on English RewardBench, with a maximum drop of 13%.
- **Model type matters.** Generative reward models dropped about 3% on average (worst case 6%); classifier reward models and DPO-implicit reward models each dropped more than 8% on average (worst cases above 13%).
- **Category matters.** The largest average degradation was on Chat-Hard (5.96%), the subtle-quality distinctions where reward models are most useful.
- **Language and script matter.** Averaged over models, Portuguese scored highest (68.7%) and Arabic lowest (62.8%). Higher-resource languages scored better, and Latin and Cyrillic scripts were closest to 67.5%.
- **Translation quality matters.** Evaluating on a Google Translate version instead of NLLB 3.3B raised scores by 1 to 3%. Some of the measured "multilingual gap" is noise from translation itself.

A useful way to think about this for RL: a reward model with pairwise accuracy $a_\ell$ in language $\ell$ gives the policy a correctly signed preference signal only $a_\ell$ of the time. If the policy update is proportional to the reward margin, the expected useful signal per pair scales roughly with $2a_\ell - 1$, the excess over chance. As an illustration, going from 0.75 to 0.65 accuracy cuts that from 0.5 to 0.3: a 10-point accuracy gap becomes a 40% reduction in useful signal. Small accuracy gaps become large training-signal gaps, and the policy will overoptimize faster in the languages where the reward model is weakest.

## What goes wrong with translated preference data?

Translation solves coverage and creates three problems.

**Translationese becomes a feature.** Dang et al. avoided translating English preference pairs wholesale. They translated about 50K ShareGPT prompts into 22 languages with NLLB 3.3B, then generated one completion by translating an English response from Command and another directly in-language from Command R+. The translated completions were ranked as the worse response 91% of the time. That design deliberately teaches the model to steer away from translation artifacts. The flip side is a warning: if your chosen and rejected responses differ systematically in whether they were translated, the reward model will learn "sounds translated" as a proxy for quality, and that is a shortcut rather than a preference.

**Diversity collapses.** Repeatedly translating the same English pairs gives many languages the same content, the same topics and the same preference judgments. Dang et al. note that this can hurt preference diversity, and the trade-off between more multilingual data and higher-quality multilingual data is hard to manage.

**Culture does not translate.** Global-MMLU (Singh et al., 2024) annotated MMLU and found that 28% of questions require culturally sensitive knowledge and that 84.9% of questions requiring geographic knowledge focus on North America or Europe. Model rankings changed depending on whether models were evaluated on the culturally sensitive or culturally agnostic subset. On the instruction-data side, the Aya Dataset (Singh et al., 2024) shows what the alternative costs and yields: 204,114 human-curated annotations in 65 languages, written by fluent speakers rather than translated. INCLUDE (Romanou et al., 2024) took the same route for evaluation and built 197,243 questions from local exams in 44 written languages, precisely to capture regional knowledge that translation cannot. Preference prompts have the same problem as MMLU: translated prompts ask about someone else's tax rules, holidays, institutions and idioms.

## Why does multilingual safety need native annotators?

The Multilingual Alignment Prism (Aakanksha et al., 2024) is the clearest case. Compensated native speakers wrote about 900 harmful prompts per language in eight languages (English, Hindi, French, Spanish, Russian, Arabic, Serbian and Filipino), provided English translations, tagged harm categories, and labeled each prompt as a **global** harm (recognized as harmful everywhere) or a **local** harm (requiring cultural or historical context). The resulting Aya Red-teaming dataset has 7,419 prompts.

Using these for DPO reduced the relative rate of harmful generations by 54.7% while reaching a 71% win-rate over the base model on general open-ended generation, and harm fell by at least 37% across languages. The surprising result was the direction of transfer: training only on local harms reduced global harms by a relative 77.8%, more than training on global harms alone (by a margin of 11.6%), while global-harm training helped local harms to a lesser extent. Local harms are the data you cannot get by translation, and they turned out to be the more valuable data.

## How should you label multilingual preferences?

Agreement statistics should be computed per language, not pooled. Pooled agreement can look healthy while one language has a guideline problem. M-RewardBench's native-speaker check is instructive: native annotators in Hindi, Indonesian and Spanish agreed with the original preference labels 84.1%, 86.7% and 80.0% of the time before the authors' filtering and refinement, and 94.2%, 95.3% and 98.0% after. Most disagreements came from annotators choosing a helpful-but-harmful answer over a refusal on safety items. That is a guideline localization issue, not a language issue, and it was fixed by conferring with annotators about what the subset was testing.

A simple audit loop that catches most problems:

```python
from collections import defaultdict

def per_language_report(pairs, rm_score, relabels):
    """pairs: dicts with lang, script, source ('native' or 'translated'), chosen, rejected.
    relabels: {pair_id: label from a second native-speaker annotator}."""
    stats = defaultdict(lambda: {"n": 0, "rm_correct": 0, "agree": 0, "relabeled": 0})
    for p in pairs:
        key = (p["lang"], p["source"])
        s = stats[key]
        s["n"] += 1
        s["rm_correct"] += rm_score(p["chosen"]) > rm_score(p["rejected"])
        if p["id"] in relabels:
            s["relabeled"] += 1
            s["agree"] += relabels[p["id"]] == "chosen"
    for (lang, source), s in sorted(stats.items()):
        rm_acc = s["rm_correct"] / s["n"]
        agree = s["agree"] / s["relabeled"] if s["relabeled"] else float("nan")
        print(f"{lang:>5} {source:>10} n={s['n']:5d} rm_acc={rm_acc:.3f} human_agree={agree:.3f}")
```

Splitting by source (native versus translated) is the important part. If the reward model is much more accurate on translated pairs than native ones, it has probably learned translation artifacts. If human agreement on translated pairs is low, the translation has changed which answer is better.

## A recipe for multilingual preference data

1. **Write prompts in-language where it matters.** Translate prompts for broad coverage, but have native speakers write a core set that reflects local institutions, norms and everyday tasks.
2. **Generate responses in-language.** Do not build chosen responses by translating English chosen responses. Use multiple policies, including strong in-language generators, so pairs differ in quality, not in translation status.
3. **Rank with native speakers who know the domain.** Fluency is not enough for medical, legal or financial prompts. Localize guidelines, especially safety and refusal guidance.
4. **Spend early budget on breadth of languages.** The Dang et al. results suggest a few languages with real data improve unseen languages substantially. Choose them to cover families and scripts.
5. **Collect local safety data separately.** Native-written red-team prompts labeled global versus local, as in the Aya Red-teaming dataset.
6. **Prefer online RL and generative reward models where you can.** Online RLOO transferred better than DPO, and generative reward models lost less accuracy outside English.
7. **Evaluate per language with native or human-edited sets.** Report reward-model accuracy and policy win-rates by language and script, use culturally sensitive and agnostic splits, and have native speakers verify any translated evaluation data.
8. **Audit translation status as a confound.** Check that the reward model is not separating chosen from rejected by translation artifacts.

## How Anthroly can help

Multilingual alignment is a data problem with a long tail: the languages, domains and local norms where a reward model is weakest are exactly the ones a general vendor cannot staff. Anthroly sources native-speaker domain experts to write in-language prompts, rank and rewrite responses, label local harms, audit translated pairs for translationese and cultural mismatch, and build per-language reward-model evaluation sets. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are extending preference data or reward models beyond English and want to know where your reward signal is weakest, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can look at a per-language sample together.

## Related reading

- [Annotator disagreement in preference data](/blog/annotator-disagreement-in-preference-data)
- [How do you evaluate a reward model?](/blog/how-to-evaluate-a-reward-model)
- [RLAIF vs RLHF: can AI feedback replace human preference labels?](/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels)
- [How many expert labels fix noisy preference data?](/blog/how-many-expert-labels-fix-noisy-preference-data)
- [DPO vs PPO vs GRPO: when is offline preference optimization enough?](/blog/dpo-vs-ppo-vs-grpo-when-is-offline-preference-optimization-enough)
- [Generative vs scalar reward models](/blog/generative-reward-models-vs-scalar-reward-models)
- [How are AI red-teaming datasets built?](/blog/how-are-ai-red-teaming-datasets-built)

---

## References

1. Dang, J., et al. (2024). [RLHF Can Speak Many Languages: Unlocking Multilingual Preference Optimization for LLMs](https://arxiv.org/abs/2407.02552). arXiv:2407.02552.
2. Wu, Z., et al. (2024). [Reuse Your Rewards: Reward Model Transfer for Zero-Shot Cross-Lingual Alignment](https://arxiv.org/abs/2404.12318). arXiv:2404.12318.
3. Hong, J., et al. (2024). [Cross-lingual Transfer of Reward Models in Multilingual Alignment](https://arxiv.org/abs/2410.18027). arXiv:2410.18027.
4. Gureja, S., et al. (2024). [M-RewardBench: Evaluating Reward Models in Multilingual Settings](https://arxiv.org/abs/2410.15522). arXiv:2410.15522.
5. Singh, S., et al. (2024). [Global MMLU: Understanding and Addressing Cultural and Linguistic Biases in Multilingual Evaluation](https://arxiv.org/abs/2412.03304). arXiv:2412.03304.
6. Romanou, A., et al. (2024). [INCLUDE: Evaluating Multilingual Language Understanding with Regional Knowledge](https://arxiv.org/abs/2411.19799). arXiv:2411.19799.
7. Aakanksha, et al. (2024). [The Multilingual Alignment Prism: Aligning Global and Local Preferences to Reduce Harm](https://arxiv.org/abs/2406.18682). arXiv:2406.18682.
8. Singh, S., et al. (2024). [Aya Dataset: An Open-Access Collection for Multilingual Instruction Tuning](https://arxiv.org/abs/2402.06619). arXiv:2402.06619.
