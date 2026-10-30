---
title: "How Do You Evaluate Long-Context LLMs Beyond Needle-in-a-Haystack? Effective Length, Literal Matching, and Expert-Written Long-Document Tasks"
description: "Almost every long-context model passes needle-in-a-haystack, and that is the problem. Here is what RULER, NoLiMa, Lost in the Middle, BABILong, NoCha, LongBench v2 and HELMET show about claimed versus effective context length, why literal matching inflates scores, why synthetic tests do not predict downstream performance, and how to build a long-context evaluation set that does."
tags:
  - evals
  - long-context
  - benchmarks
  - expert-data
  - data-quality
  - llm-evaluation
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-30T04:45:00.000Z'
updatedAt: '2026-10-30T04:45:00.000Z'
faq:
  - question: "Is needle-in-a-haystack a good test of long-context ability?"
    answer: "No, not on its own. It tests surface retrieval, and most current models score near-perfectly on it. RULER (Hsieh et al., 2024) found that models with near-perfect vanilla needle-in-a-haystack accuracy still dropped sharply on harder retrieval, multi-hop tracing and aggregation tasks as length grew, and HELMET (Yen et al., 2024), studying 59 long-context models, found that synthetic tasks like needle-in-a-haystack do not reliably predict downstream performance."
  - question: "What is the effective context length of a model?"
    answer: "It is the longest input length at which a model still clears a fixed quality bar, as opposed to the claimed length it accepts. RULER sets the bar at Llama2-7B's 4K score (85.6% averaged over 13 tasks); NoLiMa uses 85% of each model's own short-context score. On RULER, GPT-4 claimed 128K but had an effective length of 64K, and only about half of the 17 models tested held satisfactory performance at 32K."
  - question: "Why do models fail long-context tests when there is no word overlap?"
    answer: "Because many benchmarks let models find the answer by literal matching between question and context. NoLiMa (Modarressi et al., 2025) removed most lexical overlap so models had to infer a latent association. At 32K tokens, 11 of 13 models fell below 50% of their short-context scores, and GPT-4o dropped from 99.3% to 69.7%."
  - question: "Does the position of information in a long prompt matter?"
    answer: "Yes. Lost in the Middle (Liu et al., 2023) found a U-shaped curve: accuracy is highest when the relevant document is at the start or end of the context and drops when it is in the middle. With the answer in the middle of 20 documents, GPT-3.5-Turbo did worse on multi-document QA than with no documents at all (56.1% closed-book)."
  - question: "What makes a realistic long-context benchmark?"
    answer: "Questions written by people who actually read the material, that require synthesis rather than lookup, with a format that can be scored reliably. NoCha used readers of recently published novels to write 1,001 true and false claim pairs for 3,330 US dollars; GPT-4o reached only 55.8%. LongBench v2 collected 503 multiple-choice questions from nearly 100 highly educated contributors; human experts scored 53.7% under a 15-minute limit and the best direct-answer model 50.1%."
  - question: "How should long-context evaluation results be reported?"
    answer: "As curves, not single numbers. Report accuracy at several lengths, the effective length against a stated threshold, accuracy by position of the evidence, and scores split by whether a task needs lookup or synthesis. Use paired or multiple-choice formats or model-based scoring validated against humans instead of ROUGE, which HELMET found unreliable."
  - question: "How does Anthroly help with long-context evaluation?"
    answer: "Anthroly's PhD experts read full long documents in their own fields, such as contracts, filings, papers, codebases and case records, and write questions that require synthesis across the document, with minimal-pair claims, evidence locations and adjudicated answers. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Context windows grew from a few thousand tokens to hundreds of thousands and then millions, and the standard way to check them became the needle-in-a-haystack test: hide a sentence in a long filler document and ask the model to repeat it. Nearly every model now passes. That tells you the window works, not that the model can use it. This post reviews what the main long-context benchmarks found about the gap between claimed and effective context, why lexical overlap inflates scores, why synthetic results do not predict real use, and how to build a long-context evaluation set that measures what you actually deploy for.**

## The short answer

Needle-in-a-haystack measures whether a model can find a string it is told to look for. Real long-context work is different: the question and the evidence rarely share words, the evidence is spread across the document, and the answer requires combining it. When benchmarks remove those shortcuts, scores fall fast with length. RULER found that only about half of 17 models claiming 32K or more held satisfactory performance at 32K. NoLiMa found that 11 of 13 models fell below half their short-context score at 32K once literal matches were removed. NoCha found that no open-weight model beat chance on true and false claims about recent novels, while human readers had little difficulty. And HELMET, across 59 models, found that synthetic tasks do not reliably predict downstream performance. The practical conclusion is to report effective length rather than claimed length, to test without lexical shortcuts, to vary evidence position, and to anchor the suite in tasks written by people who read the whole document.

## Why does needle-in-a-haystack saturate?

The vanilla test has two properties that make it easy. The needle is lexically similar to the question, so attention can find it by matching. And it needs one fact from one place, so there is nothing to combine.

**RULER** (Hsieh et al., 2024) kept the synthetic setup but added variety and difficulty: multiple needles and needle types, a multi-hop variable-tracking task (a proxy for coreference chains), and aggregation tasks (common and frequent word extraction, a proxy for summarization). Across 13 tasks it evaluated 17 models. Despite near-perfect vanilla needle accuracy, almost all models dropped substantially as length grew. The paper's key move was to define an **effective length**: the longest tested length at which the model still beats a fixed bar, Llama2-7B's average score at 4K (85.6%).

| Model (RULER, 2024) | Claimed length | Effective length | Score at 4K | Score at 128K |
|---|---|---|---|---|
| Gemini-1.5-Pro | 1M | >128K | 96.7 | 94.4 |
| GPT-4 | 128K | 64K | 96.6 | 81.2 |
| Llama3.1 (70B) | 128K | 64K | 96.5 | 66.6 |
| Qwen2 (72B) | 128K | 32K | 96.9 | 53.7 |
| Mixtral-8x22B | 64K | 32K | 95.6 | 31.7 |
| LWM (7B) | 1M | <4K | 82.3 | 65.0 |

Two things stand out. Claimed and effective length differ by a factor of two or more for most models. And short-context strength does not predict long-context strength: Qwen2 had the highest 4K score in this subset and one of the steepest declines.

**NoLiMa** (Modarressi et al., 2025) attacked the second shortcut directly. Its needles and questions have minimal lexical overlap, so the model must infer a latent association (in its own example, the needle says "Yuki lives next to the Semper Opera House" and the question asks which character has been to Dresden) to locate the needle. Thirteen models claiming at least 128K performed well under 1K tokens, but at 32K, 11 of 13 fell below 50% of their short-length baselines. GPT-4o, one of the strongest, went from 99.3% to 69.7%. Reasoning models and chain-of-thought prompting did not close the gap. NoLiMa also used a model-relative threshold: effective length is the longest length scoring at least 85% of the model's own base score.

Formally, if $s_m(L)$ is model $m$'s score at length $L$ and $\tau$ is the threshold, the effective length is

$$
L_{\text{eff}}(m) = \max \{ L \in \mathcal{L} : s_m(L) \geq \tau \}
$$

where $\mathcal{L}$ is the grid of tested lengths. RULER uses a fixed $\tau = 85.6$; NoLiMa uses $\tau = 0.85 \, s_m(L_{\text{base}})$. The fixed threshold compares models on an absolute bar; the relative one measures degradation and is fairer to weaker models. Report which one you used, because they rank models differently.

## Does it matter where the evidence is?

Yes, and enough to change conclusions. **Lost in the Middle** (Liu et al., 2023) varied the position of the relevant document among 20 retrieved documents in multi-document QA, and of the relevant key in a key-value retrieval task. Performance followed a U-shaped curve: highest when the evidence was at the beginning or end, and significantly lower in the middle. In the worst case, with the answer document in the middle, GPT-3.5-Turbo did worse than in the closed-book setting with no documents at all (56.1%). Extended-context versions of models were often no better than their shorter-context counterparts when the input fit both.

The evaluation lesson is simple: an average over random needle positions hides a position effect, and a test that always puts the evidence near the end of the prompt measures recency, not long-context use. Sweep position explicitly and report the minimum as well as the mean.

## Synthetic versus realistic: what predicts real use?

Synthetic tasks are cheap, controllable and extendable to any length. **BABILong** (Kuratov et al., 2024) embeds 20 bAbI reasoning tasks (fact chaining, induction, deduction, counting, lists and sets) in long natural text and provides splits up to 10 million tokens. Its finding was that popular models effectively use only 10-20% of their context, and performance falls sharply as reasoning complexity rises. Retrieval-augmented generation reached about 60% on single-fact questions regardless of length.

But controllability is not validity. **HELMET** (Yen et al., 2024) built an application-centric suite of seven categories with controllable lengths up to 128K, model-based scoring instead of ROUGE, and few-shot prompting so base models can be evaluated. Across 59 long-context models it found that synthetic tasks like needle-in-a-haystack do not reliably predict downstream performance, that its categories have low correlations with each other, and that open-source models lag closed ones on full-context reasoning and complex instruction following even when both score perfectly on needle tests, with the gap widening as length grows. It recommends its RAG tasks for fast development iteration because they are easy to run and correlate better with other downstream tasks.

The realistic end of the spectrum is human-written:

| Benchmark | How it was built | Size | Human result | Model result |
|---|---|---|---|---|
| NoCha (Karpinska et al., 2024) | Readers of recently published novels wrote true and false claim pairs | 1,001 pairs, 67 books, 3,330 US dollars total cost | Readers easily perform the task | GPT-4o 55.8%; no open-weight model above chance |
| LongBench v2 (Bai et al., 2024) | Nearly 100 highly educated contributors wrote multiple-choice questions over real documents, 8k to 2M words | 503 questions, 6 categories, 20 subtasks | Experts 53.7% with a 15-minute limit | Best direct answer 50.1%; o1-preview 57.7% |

These two designs carry most of what is worth copying.

**NoCha uses recent fiction and minimal pairs.** Books published recently cannot be answered from parametric memory, so the model has to read. Each false claim differs from its true partner only in one piece of false information about the same event or entity, and a model gets credit only if it labels both members of the pair correctly. That makes "correct for the wrong reason" much less likely and makes quality control easy, because a reviewer can check the false claim against its true twin. Models also did better on pairs needing sentence-level retrieval than on pairs needing global reasoning over the book (59.8% versus 41.6%), which is exactly the distinction a needle test cannot see.

**LongBench v2 uses difficulty filtering against humans and models.** Questions were reviewed automatically and manually so that experts with search tools could not answer them quickly, and multiple-choice format keeps scoring reliable. The fact that a reasoning model beat the time-limited human baseline while direct answering did not is itself informative: long-context difficulty is partly a reasoning problem, not only a retrieval problem.

## Why pairs beat single labels

The pairing trick matters statistically. With binary true-or-false claims, a guessing model gets 50% of single claims right but only 25% of pairs. If a model's accuracy on individual claims is $p$ and its errors were independent across the two claims, pair accuracy would be about $p^2$. A model that can only detect surface cues tends to answer both claims of a pair the same way, which makes pair accuracy fall below $p^2$, toward chance. So pair accuracy separates models that actually read from models that pattern-match, at the cost of writing two claims per item. NoCha's 25% random baseline is the reason its result that open-weight models failed to beat chance is so sharp.

## What do teams get wrong?

1. **Reporting claimed length.** Report effective length against a stated threshold, and show the curve.
2. **Testing with lexical shortcuts.** If the question repeats words from the evidence, the test measures matching. Paraphrase questions away from the source, as NoLiMa does.
3. **Ignoring position.** Sweep evidence position; a test with evidence always near the end measures recency.
4. **Using ROUGE or F1 on free text.** HELMET found these metrics noisy; use multiple choice, minimal pairs, or a model-based judge validated against human labels.
5. **Using documents the model has memorized.** Public-domain books and famous filings leak through pretraining. Use recent or private documents, or entity replacement, and run a closed-book control.
6. **Collapsing lookup and synthesis.** Tag each item by what it requires (single span, multiple spans, whole-document reasoning) and report scores separately.
7. **Only testing your own domain's surface.** A legal team testing contracts with questions answerable from the definitions section learns little about clause interactions 80 pages apart.

## A minimal evaluation harness

The core of a useful long-context report is a grid over length and position, with a closed-book control and pair scoring:

```python
import itertools
from statistics import mean

def evaluate(model, items, lengths, positions, threshold):
    """items: dicts with 'pair_id', 'question', 'evidence', 'label', 'needs' ('lookup' or 'synthesis').
    build_context(item, L, pos) pads the evidence with distractor text to length L,
    placing it at relative position pos (0.0 = start, 1.0 = end)."""
    grid = {}
    for L, pos in itertools.product(lengths, positions):
        preds = {}
        for it in items:
            ctx = build_context(it, L, pos)
            preds[it["id"]] = model.answer(ctx, it["question"]) == it["label"]
        pairs = {}
        for it in items:
            pairs.setdefault(it["pair_id"], []).append(preds[it["id"]])
        grid[(L, pos)] = mean(all(v) for v in pairs.values())  # pair accuracy
    closed_book = mean(model.answer("", it["question"]) == it["label"] for it in items)
    by_length = {L: min(grid[(L, p)] for p in positions) for L in lengths}  # worst position
    effective = max((L for L in lengths if by_length[L] >= threshold), default=None)
    return {"grid": grid, "worst_position_by_length": by_length,
            "effective_length": effective, "closed_book": closed_book}
```

Using the worst position rather than the mean is a deliberate choice: production prompts do not let you choose where the important clause lands. The closed-book control tells you how much of the score comes from memory rather than the context.

## A recipe for a long-context evaluation set

1. **Pick documents your users actually send.** Contracts, filings, papers, case records, codebases, transcripts. Prefer recent or private ones so the model cannot answer from memory.
2. **Have domain experts read the whole document.** The questions that matter in a 200-page credit agreement or a clinical trial protocol require knowing the field, not just reading.
3. **Write questions that need synthesis.** Combine evidence from distant sections, count or aggregate, resolve references, detect contradictions. Record every evidence location.
4. **Remove lexical overlap.** Paraphrase so that the question does not quote the evidence.
5. **Use minimal pairs or multiple choice.** Write a true claim and a minimally different false one, or several plausible distractor options, so scoring is reliable and guessing is expensive.
6. **Filter for difficulty against both humans and models.** Drop items that a model answers closed-book or that an expert answers in seconds with search.
7. **Adjudicate.** A second expert verifies each answer and evidence span; disagreements go back to the writer.
8. **Report curves.** Effective length, position sweep, lookup versus synthesis, and a closed-book control.

The same items work as training signal for long-context RL if the answers are verifiable, which is one reason minimal pairs and multiple choice are worth the extra writing effort.

## How Anthroly can help

Long-context evaluation is bottlenecked by people who can read a long technical document properly and write questions that need the whole thing. Anthroly's PhD experts read full contracts, filings, papers, codebases and case records in their own fields and write synthesis questions with minimal-pair claims, evidence locations and adjudicated answers, and they can audit an existing suite for lexical shortcuts and memorized documents. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are measuring how well a model really uses its context window and want an expert-written set in your domain, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can scope a pilot together.

## Related reading

- [How expert-written benchmarks are built](/blog/how-expert-written-benchmarks-are-built)
- [How many eval items do you need?](/blog/how-many-eval-items-do-you-need)
- [Building contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks)
- [How to evaluate deep research agents](/blog/how-to-evaluate-deep-research-agents)
- [LLM-as-a-judge vs expert graders](/blog/llm-as-a-judge-vs-expert-graders)
- [How to evaluate AI on real professional work](/blog/how-to-evaluate-ai-on-real-professional-work)

---

## References

1. Hsieh, C.-P., Sun, S., et al. (2024). [RULER: What's the Real Context Size of Your Long-Context Language Models?](https://arxiv.org/abs/2404.06654). COLM 2024. arXiv:2404.06654.
2. Modarressi, A., et al. (2025). [NoLiMa: Long-Context Evaluation Beyond Literal Matching](https://arxiv.org/abs/2502.05167). arXiv:2502.05167.
3. Liu, N. F., et al. (2023). [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172). arXiv:2307.03172.
4. Kuratov, Y., et al. (2024). [BABILong: Testing the Limits of LLMs with Long Context Reasoning-in-a-Haystack](https://arxiv.org/abs/2406.10149). arXiv:2406.10149.
5. Yen, H., et al. (2024). [HELMET: How to Evaluate Long-Context Language Models Effectively and Thoroughly](https://arxiv.org/abs/2410.02694). ICLR 2025. arXiv:2410.02694.
6. Karpinska, M., et al. (2024). [One Thousand and One Pairs: A "novel" challenge for long-context language models](https://arxiv.org/abs/2406.16264). arXiv:2406.16264.
7. Bai, Y., et al. (2024). [LongBench v2: Towards Deeper Understanding and Reasoning on Realistic Long-context Multitasks](https://arxiv.org/abs/2412.15204). arXiv:2412.15204.
