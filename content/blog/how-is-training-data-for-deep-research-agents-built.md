---
title: "How Is Training Data for Deep Research Agents Built? From Search-R1 and BrowseComp to Synthetic Hard Questions and Citation-Aware Rewards"
description: "A practitioner's guide to how training data for search and deep research agents is built: why Search-R1-style multi-hop QA stopped being enough, how BrowseComp's human trainers wrote hard-to-find but easy-to-verify questions, how WebSailor, DeepDive, WebShaper, REDSearcher and SearchArt synthesize hard questions from graphs, how ZeroSearch and fixed corpora cut rollout cost, why outcome-only rewards invite shortcuts, and where expert verification still pays."
tags:
  - deep-research-agents
  - agent-rl
  - search-agents
  - synthetic-data
  - expert-data
  - rewards
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-11-01T12:45:00.000Z'
updatedAt: '2026-11-01T12:45:00.000Z'
faq:
  - question: "How is training data for deep research agents built?"
    answer: "Most open deep research agents are trained on question-answer pairs whose answers are short and checkable but hard to find: multi-hop questions synthesized by walking a knowledge graph or a set of linked web pages, then obfuscating the entities and attributes so the agent must search and cross-check. Teams filter the candidates by difficulty with a strong model, verify that the answer is supported by collected evidence, sample trajectories for a supervised cold start, and then run multi-turn reinforcement learning with an outcome reward, increasingly combined with rubric or citation rewards."
  - question: "Why isn't HotpotQA or Natural Questions enough to train a search agent?"
    answer: "Those datasets mostly need one to a few predictable retrieval steps, so a model can learn a short search routine and stop. Search-R1 trained on the merged NQ and HotpotQA training sets and improved over RAG baselines on seven QA benchmarks, but on BrowseComp-Plus Search-R1 with a BM25 retriever reached only 3.86% accuracy, while GPT-5 reached 55.9%. Benchmarks like BrowseComp need long, persistent search over entangled clues, which requires much harder training questions."
  - question: "How was BrowseComp built?"
    answer: "OpenAI's BrowseComp has 1,266 questions written by human trainers. Trainers started from a seed fact and wrote an inverted question whose answer is hard to find but easy to verify, checked that GPT-4o with and without browsing, o1 and an early Deep Research model could not solve it, ran five Google searches to confirm the answer was not on the first results pages, and revised questions solved by another trainer more than 40% of the time. Human trainers later solved only 29.2% of problems, giving up after about two hours on the rest."
  - question: "How do researchers synthesize hard questions for search agents?"
    answer: "The common recipe is to sample a multi-hop structure and then hide it. WebSailor samples subgraphs from knowledge structures built by random walks over real websites and obfuscates entities and time references. DeepDive runs random walks over open knowledge graphs, blurs entity attributes and filters out questions a frontier model with search can answer. WebShaper formalizes tasks with set-theoretic knowledge projections, and REDSearcher controls difficulty through graph topology and evidence dispersion."
  - question: "What reward is used to train deep research agents with RL?"
    answer: "Early work used a simple exact-match outcome reward on the final answer, which Search-R1 paired with masking retrieved tokens from the loss. Outcome-only rewards can reward shortcuts and lucky guesses, so newer methods add process signals: Citation-aware Rubric Rewards decompose a question into single-hop rubrics that the agent must satisfy with cited evidence, and DeepRubric builds evidence trees to synthesize aligned query-rubric pairs for report-style tasks."
  - question: "Do you need a live search engine to train a search agent?"
    answer: "Not always. ZeroSearch fine-tunes an LLM to act as a simulated search engine and reports that a 7B simulator performs comparably to Google Search during training and a 14B simulator surpasses it, with no search API cost. BrowseComp-Plus provides a fixed 100,195-document corpus with human-verified evidence, and REDSearcher builds a local simulated environment for fast RL iteration. Live web training, as in DeepResearcher, captures real noise but costs more and is harder to reproduce."
  - question: "How does Anthroly help build deep research training data?"
    answer: "Anthroly works with PhD experts across science, medicine, law, finance and engineering to write hard, verifiable research questions in their own fields, verify synthetic questions for unique answers and supporting evidence, label cited evidence chains and rubric items, and audit agent trajectories for shortcuts. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit."
draft: false
---

**Search agents went from a research curiosity to a product category in under two years, and almost every open result in that period was a data result. The algorithms are mostly GRPO variants with a few tweaks. What separates an agent that does three searches and guesses from one that runs dozens of searches and checks its work is the training questions: how hard they are, whether the answer is unique and supported, and whether the reward can tell a researched answer from a lucky one. This post walks through how training data for search and deep research agents is built today, what each design choice changed, and where synthetic pipelines still need people who know the domain.**

## The short answer

A deep research training set today has five parts. **Hard, verifiable questions**: short answers that are easy to check but hard to find, usually multi-hop questions with obfuscated entities. **A difficulty filter**: candidates that a strong model with search already solves are discarded. **Evidence**: the documents that support each hop, so the answer can be verified and, increasingly, so the reward can check citations. **Trajectories** for a supervised cold start, sampled from a stronger agent and filtered. And **an environment and reward** for multi-turn RL: a live or simulated search tool, plus an outcome reward that newer work combines with rubric or citation rewards. Search-R1, BrowseComp, WebSailor, DeepDive, ZeroSearch, BrowseComp-Plus, CaRR and DeepRubric each contribute one of these pieces.

## Why did the first search RL datasets stop being enough?

The first wave of search RL reused existing open-domain QA. **Search-R1** (Jin et al., 2025) trained on the merged training sets of Natural Questions and HotpotQA, used exact match against the gold answer as the outcome reward, and masked retrieved tokens from the policy loss so the model was not trained to reproduce search results. It improved over RAG baselines by 41% with Qwen2.5-7B and 20% with Qwen2.5-3B across seven QA benchmarks. R1-Searcher and ReSearch followed the same pattern: outcome-based RL on multi-hop QA, with no supervised reasoning traces.

The problem is that these datasets were built for a different job. HotpotQA's 113k Wikipedia questions were designed so that a reader needs a couple of supporting documents, and the supporting facts are labeled. That makes them good for teaching an agent *when* to search, but the search path is short and predictable. Once an agent learns to issue two queries and read the top results, the reward stops pushing it further.

The gap became obvious on harder benchmarks. On **BrowseComp-Plus** (Chen et al., 2025), Search-R1 paired with a BM25 retriever reached 3.86% accuracy, while GPT-5 reached 55.9%, and 70.1% with a stronger embedding retriever. The model had not learned to persist, because its training questions never required it.

## How was BrowseComp built, and why does it matter for training data?

**BrowseComp** (Wei et al., 2025) is an evaluation set, but its construction protocol became the template for training data. Its 1,266 questions were written entirely by human trainers under explicit rules:

| Rule | What trainers did |
|---|---|
| Inverted questions | Start from a seed fact (a person, event or artifact), pick several characteristics with a large search space, and ask for the entity that satisfies all of them |
| Model check | Verify that GPT-4o with and without browsing, OpenAI o1 and an early Deep Research model could not solve it |
| Search check | Run five simple Google searches and confirm the answer is not on the first pages of results |
| Human check | Aim for questions another person could not solve in ten minutes; revise any question solved more than 40% of the time |
| Uniqueness | Add criteria until confident there is no other valid answer; revise if a second trainer finds a different valid answer |

The result was a set that is hard for people too. When trainers tried to answer questions written by others, they solved 29.2%, and their answer matched the reference 86.4% of the time on the ones they solved. They were allowed to give up only after about two hours of searching. On the models, GPT-4o scored 0.6%, GPT-4o with browsing 1.9%, and Deep Research 51.5%; the paper notes that Deep Research was trained on data that specifically teaches BrowseComp-style tasks.

Two properties of this protocol are what every later training set tries to reproduce at scale: **asymmetry** (hard to find, easy to verify, so the reward is cheap and exact) and **adversarial filtering** (a question only counts if current models fail). Note also what the 86.4% agreement implies: even careful human-written questions sometimes admit a second defensible answer. That is the uniqueness problem, and it gets worse when questions are synthesized.

## How are hard search questions synthesized at scale?

Human-written BrowseComp-style questions are expensive, so open teams built generators. Nearly all of them follow the same idea: sample a multi-hop structure, then hide it.

| Pipeline | How it generates questions | How it controls difficulty |
|---|---|---|
| WebSailor (Li et al., 2025) | Samples subgraphs from knowledge structures built by random walks over real websites | Obfuscates entities, relationships and time references ("around the mid-5th century") to raise initial uncertainty |
| DeepDive (Lu et al., 2025) | Random walks over open knowledge graphs, with entity attributes deliberately blurred, then LLM obfuscation | Filters out questions a frontier model with basic search can answer |
| WebShaper (Tao et al., 2025) | Formalizes information-seeking tasks with set-theoretic knowledge projections, then expands seed tasks step by step with an agentic expander | Composes projection operations to control reasoning structure |
| ASearcher (Gao et al., 2025) | A prompt-based LLM agent that synthesizes challenging QA pairs | Large-scale synthesis plus long-horizon RL with more than 100 tool calls per trajectory |
| REDSearcher (Chu et al., 2026) | Task synthesis framed as a dual-constrained optimization | Graph topology and evidence dispersion |
| SearchArt (Mei et al., 2026) | QA pairs and trajectories from web documents and generated evidence graphs | A verification pipeline that checks QA consistency, trajectory quality and evidence relevance |

The obfuscation step is the important one. A plain random-walk question ("Which university did the founder of company X attend?") is answered by chaining lookups. An obfuscated one ("A firm founded in the early 2000s by a former physicist from a South American capital...") forces the agent to generate hypotheses, search for candidates and eliminate them, which is the behavior BrowseComp rewards. WebSailor describes this as moving from tasks with low uncertainty to tasks with high uncertainty that is hard to reduce.

The numbers show how much data quality matters relative to scale. DeepDive-32B reached 15.3% on BrowseComp at a time when most open models scored under 10%. Eight months later, **OpenSeeker-v2** (Du et al., 2026) trained a 30B-class agent with SFT alone on 10.6k trajectories and reported 46.0% on BrowseComp, above Tongyi DeepResearch's 43.4% with a full continual pre-training, SFT and RL pipeline. Its three changes were all about data: larger knowledge graphs, more tools, and strict filtering that removes trajectories solved in too few steps. **QUEST** (Xie et al., 2026) reports approaching frontier closed agents with only 8K synthesized tasks, and **DR-Venus** (2026) trained a 4B agent on roughly 10K open data points.

## How do you check that a synthesized question has one right answer?

Synthesis creates two failure modes that human writers mostly avoid. The obfuscated question may match more than one entity, and the answer may not actually be supported by anything an agent can find. Both corrupt the reward: the policy is penalized for a correct alternative answer, or rewarded for reproducing a generator's mistake.

Current pipelines handle this with verification passes:

- **Answerability with evidence.** Search Self-play (Lu et al., 2025) has the same model propose and solve questions; to keep ground truth accurate, it collects all search results from the proposer's trajectory and checks with retrieval-augmented generation whether the question can be answered from those documents.
- **Human evidence verification.** BrowseComp-Plus started from 1,005 BrowseComp question-answer pairs, had an o3 pipeline propose evidence for each clue, then had annotators label the exact text spans that justify each clue, searching for at least 20 more minutes when evidence was missing. 830 pairs passed. The work took 14 university student annotators more than 400 hours, and produced a fixed corpus of 100,195 documents with gold and hard-negative documents.
- **Trajectory and consistency checks.** SearchArt verifies QA consistency, trajectory quality and evidence relevance before trajectories enter training.

A minimal filter combining the first two ideas looks like this. It is an illustration of the pattern, not any paper's code:

```python
def keep_question(q, gold, evidence_docs, solver, judge, k=8):
    """Keep a synthesized question only if it is answerable from its
    evidence, has no competing answer, and is hard for the current agent."""
    # 1. Answerable: a reader given only the evidence recovers the gold answer.
    if not judge.same_answer(solver.answer_from_docs(q, evidence_docs), gold):
        return False
    # 2. Unique: a second, independent search should not find a different
    #    valid answer (sample a few attempts and check disagreements).
    alts = [solver.search_and_answer(q) for _ in range(k)]
    if any(judge.valid_alternative(q, a, gold, evidence_docs) for a in alts
           if not judge.same_answer(a, gold)):
        return False
    # 3. Hard but learnable: drop questions that are always or never solved.
    p = sum(judge.same_answer(a, gold) for a in alts) / k
    return 0.0 < p < 0.5
```

The third check matters for RL specifically. With group-based methods like GRPO, a question that every rollout solves, or none does, produces zero advantage and no gradient. Filtering to a band of partial success is the search-agent version of the prompt-difficulty selection we described in our post on [choosing prompts for RLVR](/blog/how-to-choose-prompts-for-rlvr-training).

The second check is where automated pipelines are weakest. Deciding whether "a respected arts institution in a South American capital" admits a second answer is a domain judgment. A model judge will usually accept the generator's framing.

## Live web, simulated search, or a fixed corpus?

Where the agent searches during training is a cost and reproducibility decision as much as a modeling one.

| Environment | Example | Strength | Cost |
|---|---|---|---|
| Live web search | DeepResearcher (Zheng et al., 2025) | Real noise, real page structure, behaviors like cross-validation emerge | API cost per rollout, results drift over time, hard to reproduce |
| Simulated search engine | ZeroSearch (Sun et al., 2025) | No API cost; document quality can be controlled and degraded as a curriculum | Simulator GPU cost; the simulator's knowledge bounds the task |
| Fixed curated corpus | BrowseComp-Plus; REDSearcher's local environment | Reproducible, retriever and agent can be studied separately | Building and verifying the corpus |

ZeroSearch is the clearest data point on cost. RL needs repeated rollouts, potentially hundreds of thousands of search requests, so the authors fine-tune an LLM to generate both useful and noisy documents and degrade quality over training. They report that a 7B simulator performs comparably to Google Search and a 14B simulator surpasses it on their benchmarks. DeepResearcher argues the opposite case: its agents trained on the real web improved by up to 28.9 points over prompt-engineered baselines and up to 7.2 points over RAG-based RL agents, and showed behaviors such as planning, cross-checking sources and admitting when no definitive answer exists.

The practical answer for most teams is a mix: a fixed or simulated environment for fast iteration and ablations, and a smaller live-web stage for robustness. Whatever the mix, freeze a held-out set against a fixed snapshot, or your evaluation numbers will move when the web does. We discuss this in [how to evaluate deep research agents](/blog/how-to-evaluate-deep-research-agents).

## Why do outcome-only rewards produce bad research habits?

An exact-match reward on the final answer is cheap and hard to game in one sense: the agent cannot argue its way to credit. But it says nothing about how the answer was reached. **Chaining the Evidence** (Zhang et al., 2026) documents agents reaching correct answers through shortcuts and hallucinated intermediate steps that a binary outcome reward cannot see. Their Citation-aware Rubric Rewards (CaRR) decompose each multi-hop question into single-hop statements; a rubric item is satisfied only if the agent names the hidden entities, supports the statement with correct citations, and links it into a chain that reaches the final answer. Combining these rubric rewards with the outcome reward (C-GRPO) outperformed outcome-only GRPO on four deep search benchmarks and discouraged shortcut exploitation.

A simplified version of this kind of mixed reward, for intuition rather than as CaRR's exact formula, is

$$
r(\tau) = \alpha \cdot \mathbb{1}[\hat{a} = a^*] + (1 - \alpha) \cdot \frac{1}{|R|} \sum_{k \in R} \mathbb{1}[\text{rubric } k \text{ is met with a correct citation}]
$$

where $R$ is the set of single-hop rubric items for the question and $\alpha$ sets how much weight the final answer gets. The rubric term only works if the rubric items are right, which moves the data problem one level down.

For report-style tasks, where there is no single short answer, **DeepRubric** (Zhu et al., 2026) reverses the usual order. Instead of asking an LLM to invent rubrics for a given query, it builds an evidence tree from a seed topic by recursively expanding evidence-backed sub-questions, treats the leaves as atomic evaluation targets, and then writes the query and rubric from that tree. With 9K query-rubric examples it trained an 8B agent to performance comparable to prior open models while using roughly 13 times fewer RL GPU-hours. QUEST similarly builds training tasks from unified rubric trees. The lesson is that rubric quality, not just reward shape, determines how efficient RL is. We cover the general version of this in [how to stop reward hacking in rubric-based RL](/blog/reward-hacking-rubric-based-rl).

Other process signals target behavior rather than evidence. DeepDive adds a redundancy penalty based on Jaccard similarity between queries, which reduced tool calls during training. MMSearch-R1 adds a search penalty and deliberately mixes search-required and search-free examples, which it found essential for teaching on-demand search; it matched a larger RAG-based model while making over 30% fewer search calls.

## Where does expert data still matter?

Every pipeline above runs with little or no human annotation, and several claim that as a feature. Read closely, they still depend on human judgment in three places.

**Hard questions in specialized domains.** Graph walks over Wikipedia-like knowledge produce trivia-style chains. Real research questions in pharmacology, case law, materials science or tax look different: the hard part is knowing which source is authoritative, which version of a number applies, and when two sources disagree. **KARL** (Chang et al., 2026) found that training across heterogeneous search behaviors, from constraint-driven entity search to tabular reasoning and procedural reasoning over technical documentation, generalized better than optimizing for any single benchmark. Those behaviors come from task design, and domain experts design better tasks in their domain.

**Uniqueness and evidence verification.** BrowseComp-Plus needed more than 400 annotator hours to verify evidence for 830 questions. Synthetic pipelines cut that cost by trusting a judge model, which is exactly where ambiguous or unsupported questions slip through. A small expert-verified slice, used to calibrate the automated filter and to score it, is the cheapest insurance.

**Rubrics and evaluation.** CaRR and DeepRubric show that rubric rewards beat outcome rewards when the rubric is right. For open-ended reports, "right" means a domain expert would agree that the rubric covers what a good answer needs, as we discuss in [LLM-as-a-judge vs. expert graders](/blog/llm-as-a-judge-vs-expert-graders).

## What do teams get wrong?

- **Training on easy multi-hop QA and expecting persistence.** If no training question needs more than three searches, the agent will not learn to do thirty.
- **Skipping the uniqueness check.** An obfuscated question with two valid answers punishes the policy for being right.
- **Outcome reward only.** It rewards lucky guesses and shortcuts; add citation or rubric checks once the basic loop works.
- **No difficulty band.** Questions always or never solved waste rollouts under GRPO.
- **Evaluating against the live web without a snapshot.** Scores drift, and leaked answers inflate them; see [contamination-resistant agent benchmarks](/blog/building-contamination-resistant-agent-benchmarks).
- **Ignoring multi-turn instability.** Long-horizon search RL is fragile for reasons beyond data, which we cover in [why multi-turn RL for LLM agents is unstable](/blog/why-is-multi-turn-rl-for-llm-agents-unstable).

## How Anthroly can help

The bottleneck in every pipeline above is the same: questions that are genuinely hard in a real domain, with one defensible answer and evidence that supports it, plus rubrics an expert would sign off on. Anthroly works with PhD experts across science, medicine, law, finance and engineering who write BrowseComp-style research questions in their own fields, verify synthetic questions for uniqueness and supporting evidence, label cited evidence chains and rubric items for citation-aware rewards, and audit agent trajectories for shortcuts and unsupported claims. The bench is roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit.

If you are building a search or deep research agent and want to pressure-test your training questions or rubrics, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min) and we can review a sample together.

## Related reading

- [How to evaluate deep research agents](/blog/how-to-evaluate-deep-research-agents)
- [Why is multi-turn RL for LLM agents unstable?](/blog/why-is-multi-turn-rl-for-llm-agents-unstable)
- [How are web and computer-use RL environments built?](/blog/how-are-web-and-computer-use-rl-environments-built)
- [How do you stop reward hacking in rubric-based RL?](/blog/reward-hacking-rubric-based-rl)
- [How should you choose prompts for RLVR training?](/blog/how-to-choose-prompts-for-rlvr-training)
- [Can LLMs improve without human data? Self-play RL](/blog/can-llms-improve-without-human-data-self-play-rl)

---

## References

1. Jin, B., Zeng, H., Yue, Z., et al. (2025). [Search-R1: Training LLMs to Reason and Leverage Search Engines with Reinforcement Learning](https://arxiv.org/abs/2503.09516). arXiv:2503.09516.
2. Song, H., Jiang, J., Min, Y., et al. (2025). [R1-Searcher: Incentivizing the Search Capability in LLMs via Reinforcement Learning](https://arxiv.org/abs/2503.05592). arXiv:2503.05592.
3. Chen, M., Sun, L., Li, T., et al. (2025). [ReSearch: Learning to Reason with Search for LLMs via Reinforcement Learning](https://arxiv.org/abs/2503.19470). arXiv:2503.19470.
4. Yang, Z., Qi, P., Zhang, S., et al. (2018). [HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering](https://arxiv.org/abs/1809.09600). arXiv:1809.09600.
5. Wei, J., Sun, Z., Papay, S., et al. (2025). [BrowseComp: A Simple Yet Challenging Benchmark for Browsing Agents](https://arxiv.org/abs/2504.12516). arXiv:2504.12516.
6. Chen, Z., Ma, X., Zhuang, S., et al. (2025). [BrowseComp-Plus: A More Fair and Transparent Evaluation Benchmark of Deep-Research Agent](https://arxiv.org/abs/2508.06600). arXiv:2508.06600.
7. Li, K., Zhang, Z., Yin, H., et al. (2025). [WebSailor: Navigating Super-human Reasoning for Web Agent](https://arxiv.org/abs/2507.02592). arXiv:2507.02592.
8. Lu, R., Hou, Z., Wang, Z., et al. (2025). [DeepDive: Advancing Deep Search Agents with Knowledge Graphs and Multi-Turn RL](https://arxiv.org/abs/2509.10446). arXiv:2509.10446.
9. Tao, Z., Wu, J., Yin, W., et al. (2025). [WebShaper: Agentically Data Synthesizing via Information-Seeking Formalization](https://arxiv.org/abs/2507.15061). arXiv:2507.15061.
10. Gao, J., Fu, W., Xie, M., et al. (2025). [Beyond Ten Turns: Unlocking Long-Horizon Agentic Search with Large-Scale Asynchronous RL](https://arxiv.org/abs/2508.07976). arXiv:2508.07976.
11. Chu, Z., Wang, X., Hong, J., et al. (2026). [REDSearcher: A Scalable and Cost-Efficient Framework for Long-Horizon Search Agents](https://arxiv.org/abs/2602.14234). arXiv:2602.14234.
12. Mei, L., Yu, X., Chen, C., et al. (2026). [SearchArt: Training Long-Horizon Search Agent with Scalable Synthetic and Verified Task](https://arxiv.org/abs/2607.24850). arXiv:2607.24850.
13. Du, Y., Ye, R., Tang, S., et al. (2026). [OpenSeeker-v2: Pushing the Limits of Search Agents with Informative and High-Difficulty Trajectories](https://arxiv.org/abs/2605.04036). arXiv:2605.04036.
14. Xie, J., Lin, T., Wang, Z., et al. (2026). [QUEST: Training Frontier Deep Research Agents with Fully Synthetic Tasks](https://arxiv.org/abs/2605.24218). arXiv:2605.24218.
15. Venus Team, Dai, S., Deng, Y., et al. (2026). [DR-Venus: Towards Frontier Edge-Scale Deep Research Agents with Only 10K Open Data](https://arxiv.org/abs/2604.19859). arXiv:2604.19859.
16. Lu, H., Wen, Y., Cheng, P., et al. (2025). [Search Self-play: Pushing the Frontier of Agent Capability without Supervision](https://arxiv.org/abs/2510.18821). arXiv:2510.18821.
17. Zheng, Y., Fu, D., Hu, X., et al. (2025). [DeepResearcher: Scaling Deep Research via Reinforcement Learning in Real-world Environments](https://arxiv.org/abs/2504.03160). arXiv:2504.03160.
18. Sun, H., Qiao, Z., Guo, J., et al. (2025). [ZeroSearch: Incentivize the Search Capability of LLMs without Searching](https://arxiv.org/abs/2505.04588). arXiv:2505.04588.
19. Zhang, J., Lv, X., Feng, L., Hou, L., & Li, J. (2026). [Chaining the Evidence: Robust Reinforcement Learning for Deep Search Agents with Citation-Aware Rubric Rewards](https://arxiv.org/abs/2601.06021). arXiv:2601.06021.
20. Zhu, M., Wei, C., Xu, J., et al. (2026). [DEEPRUBRIC: Evidence-Tree Rubric Supervision for Efficient Reinforcement Learning of Deep Research Agents](https://arxiv.org/abs/2606.17029). arXiv:2606.17029.
21. Chang, J. D., Drozdov, A., Toshniwal, S., et al. (2026). [KARL: Knowledge Agents via Reinforcement Learning](https://arxiv.org/abs/2603.05218). arXiv:2603.05218.
22. Wu, J., Deng, Z., Li, W., et al. (2025). [MMSearch-R1: Incentivizing LMMs to Search](https://arxiv.org/abs/2506.20670). arXiv:2506.20670.
