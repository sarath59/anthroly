---
title: "How Do AI Labs Audit Training Data Licensing and Provenance? License Laundering, Permissive-Washing, and What a Provenance Record Needs"
description: "License metadata on dataset hubs is wrong or missing most of the time. Here is what the Data Provenance Initiative, Consent in Crisis, the permissive-washing audit, Common Pile, Common Corpus and KL3M show about where training-data rights break down, the five layers a provenance audit has to check, how to sample-audit a corpus, what the EU AI Act training-content summary and recent US litigation changed, and what it means for post-training and expert data."
tags:
  - data-licensing
  - data-provenance
  - training-data
  - expert-data
  - data-governance
  - post-training
author:
  name: Sarath Kavuru
  credentials: 'Anthroly'
publishedAt: '2026-10-28T04:35:00.000Z'
updatedAt: '2026-10-28T04:35:00.000Z'
faq:
  - question: "Can you trust the license listed on a Hugging Face or GitHub dataset?"
    answer: "Not on its own. The Data Provenance Initiative (Longpre et al., 2023) re-annotated 1,800+ fine-tuning datasets and found that GitHub, Hugging Face and Papers with Code left licenses unspecified 69-72% of the time and labeled licenses more permissively than the original authors intended in 29%, 27% and 16% of cases respectively. A 2026 audit of 3,338 datasets (Jewitt et al.) found 96.5% lacked the full license text that permissive licenses require. Treat the license field as a lead to verify, not as evidence of rights."
  - question: "What is license laundering?"
    answer: "License laundering is when someone who does not hold the rights to a work redistributes it under a license, often an open one, so the license attached to the copy does not reflect the actual rights. The Common Pile team (Kandpal et al., 2025) called it a common pitfall and excluded whole sources, including OpenAlex, YouTube Commons and a Hacker News dataset on Kaggle, because they could not be confident the license came from the copyright holder."
  - question: "What is permissive-washing in AI datasets?"
    answer: "Permissive-washing, a term from Jewitt et al. (2026), is labeling a dataset or model with a permissive license such as MIT or Apache-2.0 while omitting the license text, copyright notice and upstream attribution those licenses require. In their audit of 124,278 dataset-to-model-to-application supply chains, only 2.3% of datasets and 3.2% of models met both the license-text and copyright-notice requirements, and only 27.59% of models preserved compliant dataset notices."
  - question: "Does a corpus-level license like ODC-By cover the documents inside it?"
    answer: "No. As the Common Pile paper points out, ODC-By, used for large web corpora such as Dolma and FineWeb, applies to the compilation, not to the individual documents. The copyright in each document is still held by its author, so a permissive collection license does not make the text itself openly licensed."
  - question: "Can you train competitive models on only openly licensed data?"
    answer: "At small scale, yes, with caveats. Common Pile v0.1 (8TB from 30 sources) trained two 7B models, Comma v0.1-1T and -2T, that the authors report as competitive with Llama 1 and Llama 2 7B at similar compute. Common Corpus (about 2 trillion tokens) and KL3M (over 132 million documents) take similar approaches. The Data Provenance Initiative also found that commercially restricted fine-tuning datasets were more diverse in tasks, topics and sources, so restricting to open data has a coverage cost, especially for post-training."
  - question: "What does the EU AI Act require about training data?"
    answer: "Article 53 requires providers of general-purpose AI models to have a policy for complying with EU copyright law, including honoring text-and-data-mining opt-outs, and to publish a sufficiently detailed public summary of training content using the Commission's template, published on 24 July 2025. The obligation applies from 2 August 2025; models already on the market had until 2 August 2027, and AI Office enforcement began on 2 August 2026. This is a summary, not legal advice."
  - question: "How does Anthroly handle licensing and provenance for expert data?"
    answer: "Anthroly delivers expert-built datasets, RL environments and evaluations with documented provenance: who created each item, under what agreement, which sources and tools were used, and what the licensee may do with it. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit, under written contracts. Anthroly also helps organizations license their own data to AI labs."
draft: false
---

**Every frontier lab now has a version of the same question from its lawyers, its enterprise customers and, in the EU, its regulator: where did this training data come from, and did you have the right to use it? The honest answer for most corpora assembled before 2024 is "we know the source and the license someone attached to it, and not much more." Research audits since then show how little that is worth. License fields on dataset hubs are missing most of the time and wrong much of the rest. Permissive labels arrive without the notices that make them valid. Open-licensed corpora contain text that was never openly licensed. And web consent signals changed so fast that a crawl from 2023 reflects preferences many sites have since withdrawn. This post walks through what those audits found, the layers a real provenance audit has to cover, how to sample-audit a corpus you cannot read in full, and what changes for post-training and expert data, where the rights questions are different and usually easier to get right.**

*This post summarizes research and public legal documents for ML practitioners. It is not legal advice; licensing decisions should involve counsel in the relevant jurisdictions.*

## The short answer

Labs that audit provenance well treat every dataset as a chain of rights, not a file with a license tag. A credible audit checks five layers: **(1)** the rights in the underlying content, which a collection license usually does not cover; **(2)** the license the redistributor attached, including whether its conditions (license text, notices, attribution, share-alike) are actually met; **(3)** contracts and terms of service attached to the source, which can restrict use even where copyright does not; **(4)** for model-generated data, the terms of the model that generated it; and **(5)** consent and opt-out signals, which differ between robots.txt and terms of service and have changed over time. Because no team can read a trillion tokens, audits combine source-level due diligence with statistical sampling of documents. For post-training and expert data, the strongest position is data created under contract for the purpose, with assignment or license terms, contributor records and tool-use rules written down before the work starts.

## How wrong is dataset license metadata?

Wrong enough that it cannot be the basis of a decision. Four audits measured it from different angles.

| Audit | Scope | Key finding |
|---|---|---|
| Data Provenance Initiative (Longpre et al., 2023) | 1,800+ text fine-tuning datasets in 44 collections | Aggregators left licenses "unspecified" 69-72% of the time (GitHub 72%, Hugging Face 69%, Papers with Code 70%); 66% of analyzed Hugging Face licenses were in a different use category than the original, often more permissive; aggregators were too permissive in 29%, 27% and 16% of cases |
| Multimodal provenance audit (Longpre et al., 2024) | Nearly 4,000 text, speech and video datasets, 1990-2024 | Under 33% of datasets are restrictively licensed, but over 80% of their source content carries non-commercial restrictions |
| Permissive-washing audit (Jewitt et al., 2026) | 124,278 dataset → model → application chains: 3,338 datasets, 6,664 models, 28,516 applications | 96.5% of datasets and 95.8% of models lack the required license text; only 2.3% of datasets and 3.2% of models satisfy both license-text and copyright-notice requirements; 27.59% of models preserve compliant dataset notices; 5.75% of applications preserve compliant model notices |
| Common Pile web filtering (Kandpal et al., 2025) | Top 1,000 Common Crawl domains by volume with CC license markers | Only 537 domains had a Creative Commons license applying to all their text rather than to embedded media or part of the site |

The multimodal result is the one that should worry practitioners most. Most datasets *look* permissive at the dataset level, while most of the content they were derived from is not. Licenses do not propagate up a derivation chain; restrictions do. A dataset built by transcribing non-commercially licensed video does not become commercial because the transcription was released under CC BY.

The Common Pile number is a useful calibration for any regex- or marker-based license detection. A page carrying a CC BY badge was, in the top domains, close to a coin flip as evidence that its text was CC BY.

## What are the five layers a provenance audit has to check?

### 1. Rights in the underlying content

Start from what the documents themselves are. Public-domain material (expired copyright, many government works, explicit CC0 dedications) needs no license. KL3M (Bommarito et al., 2025) formalized this as a sequence of tests: is the content free from copyright at creation, has it entered the public domain, and only if neither, does its license grant sufficiently unencumbered rights. Content passing the first two tests "can typically be included in the dataset without further contract analysis."

The trap at this layer is the **collection license**. Large web corpora such as Dolma and FineWeb are released under ODC-By, which, as the Common Pile authors note, "by definition, does not extend to individual documents within the corpus." The compilation is licensed; the text inside it is still owned by whoever wrote it.

### 2. The redistributor's license and whether its conditions are met

If content is licensed, check two things: is the license genuine (did the rights holder grant it?) and are its conditions satisfied?

The first question is **license laundering**: "a copyrighted work is redistributed (typically by a non-rights holder) with an incorrect license," in the Common Pile paper's words. Their response was conservative. They included data only from sources where they were confident the license came from the copyright holder, and dropped OpenAlex, YouTube Commons and a Hacker News dataset on Kaggle on that basis. For YouTube, they hand-curated over 2,000 channels instead of trusting per-video CC labels.

The second question is **permissive-washing**. MIT, Apache-2.0 and BSD-3-Clause are permissive, but not unconditional: they require the license text, the copyright notice and upstream attribution to travel with the work. Jewitt et al. argue that failing those conditions can place reuse outside the license, "effectively leaving AI artifacts under default copyright for those uses," and conclude that "license files and notices, not metadata, are the source of legal truth."

Share-alike licenses add a further obligation. KL3M declined to include Wikipedia, citing the Wikimedia Foundation's position that a general notice to customers would not satisfy CC BY-SA attribution. Common Pile, applying the Open Definition, did include CC BY-SA Wikipedia text. Two careful teams, two different calls on the same source: that is what risk tolerance looks like in practice, and why the decision should be explicit and recorded rather than inherited from a dataset card.

### 3. Contracts and terms of service

Copyright is not the only constraint. Websites, APIs and data vendors attach terms of service, and KL3M argues that ignoring contractual prohibitions on machine-learning use "arguably constitutes a breach of contract" regardless of any fair-use defense. Their protocol checks explicitly whether terms prohibit scraping, machine learning or AI training, and notes jurisdiction-specific traps: UK Open Government and Open Justice licenses impose computational-analysis restrictions that would complicate LLM training, while the EU Commission's reuse decision requires only source acknowledgment.

### 4. Model-generated data and the generator's terms

Synthetic data inherits questions from the model that produced it. The Data Provenance Initiative found that 45% of non-commercial or academic-only fine-tuning datasets were synthetic, compared with under 14% in more permissive categories, much of it generated with OpenAI APIs whose terms said users may not "use output from the Services to develop models that compete with OpenAI." The paper treats those terms as a contract binding the API user, which leaves open whether they bind someone who later downloads the dataset. Common Pile sidestepped the question by excluding LLM-generated text entirely, noting that "it has not yet been established whether it is permissible to apply arbitrary licenses to the generations of an LLM that was trained on unlicensed data."

For an audit, the practical requirement is simple: every synthetic item needs a record of which model generated it, under which terms, and when.

### 5. Consent and opt-out signals

For web data, consent is expressed through robots.txt and terms of service, and the two often disagree. Consent in Crisis (Longpre et al., 2024) audited 14,000 web domains underlying C4, RefinedWeb and Dolma. Between 2023 and 2024, restrictions rose quickly enough that about 5%+ of all C4 tokens, and 28%+ of tokens from the most actively maintained, critical sources, became fully restricted by robots.txt; counting terms-of-service restrictions, 45% of C4 was restricted. Among the sites studied, 35.1% had anti-crawling terms but no robots.txt, and 20.3% had a restrictive robots.txt but no terms. OpenAI's crawlers were significantly more restricted than other developers'.

Two implications follow. Opt-out status is time-stamped: you need to know when a document was collected and what the signals said then and now. And the EU AI Act makes one version of this a legal requirement, discussed below.

## What changed legally in 2025-2026?

Two developments matter for how labs document provenance. Neither settles the broader questions.

**US litigation turned on acquisition, not just training.** In *Bartz v. Anthropic*, Judge Alsup's June 23, 2025 order held that using lawfully acquired books to train Claude was fair use, but that Anthropic "had no entitlement to use pirated copies for its central library." The parties then settled for $1.5 billion, about $3,000 per covered work; the court granted preliminary approval in September 2025, and Judge Araceli Martínez-Olguín granted final approval on July 20, 2026. Other cases have gone differently on other facts, and fair use remains fact-specific. But the lesson for provenance is concrete: *how* a copy was obtained can matter independently of what the model does with it. An audit trail that records acquisition source and method is now evidence, not paperwork.

**The EU now requires a public training-content summary.** Article 53(1) of the AI Act requires general-purpose AI model providers to put in place a policy to comply with EU copyright law, including identifying and honoring text-and-data-mining rights reservations, and to publish "a sufficiently detailed summary about the content used for training" using the AI Office's template. The Commission published the mandatory template on 24 July 2025. It asks for general information on modalities and data sizes, a list of data sources (public datasets, private datasets, scraped data, user data, synthetic data), and relevant processing aspects, including copyright. The obligation applies from 2 August 2025; models placed on the market earlier must publish by 2 August 2027, and AI Office enforcement began 2 August 2026. It applies to open-weight models too. A lab that cannot reconstruct where its data came from cannot fill in the template.

## Does restricting to licensed data cost model quality?

Less than people assumed in 2023, at least at 7B scale, but it is not free.

- **Common Pile v0.1** (Kandpal et al., 2025): 8TB of public-domain and openly licensed text from 30 sources. Two 7B models, Comma v0.1-1T and -2T, trained on 1T and 2T tokens, which the authors report as competitive with Llama 1 and Llama 2 7B at similar compute.
- **Common Corpus** (Langlais et al., 2025): about 2 trillion tokens of uncopyrighted or openly licensed data across six collections, with license, language and collection metadata on each data object. Small models trained on it performed comparably to others of their size.
- **KL3M** (Bommarito et al., 2025): over 132 million documents from 16 sources verified against its copyright and contract protocol, released with original formats and provenance metadata under CC-BY.

The cost shows up in coverage. The Data Provenance Initiative found that non-commercial and academic-only fine-tuning datasets had statistically greater diversity of tasks, topics, sources and target lengths, and described closed datasets as "monopolizing important categories: lower resource languages, more creative tasks, richer topic variety, newer and more synthetic training data." For pretraining, openly licensed corpora are now a credible option. For post-training, where the most useful data is long-form, expert, creative or domain-specific, the open pool is thinner, which is exactly why labs commission data instead.

## How do you audit a corpus you cannot read?

You audit sources fully and documents by sample. Source-level due diligence covers the five layers above for every source; document-level sampling estimates how much of what passed the source checks is actually clean.

Sampling gives you a bound, not a guarantee. If you sample $n$ documents uniformly from a source and find $k$ with a rights problem (wrong license, missing attribution, opted-out domain, restricted content), the estimated problem rate is $\hat{p} = k/n$. When $k = 0$, the one-sided 95% upper bound on the true rate is

$$
p_{\text{upper}} = 1 - 0.05^{1/n} \approx \frac{3}{n}
$$

the "rule of three." Finding nothing in 300 sampled documents supports a problem rate below about 1%, not zero. For a source with a billion documents, a 1% rate is ten million documents. Stratify the sample by domain or sub-source, because problems cluster: Common Pile's 46% failure among top CC-marked domains would be invisible in an average over the long tail.

A provenance record for each source should be machine-readable and versioned. A minimal schema:

```yaml
source_id: cccc-domain-0412
description: Creative Commons pages from a single verified domain
acquisition:
  method: common-crawl-snapshot   # crawl | api | purchase | contract | generated
  snapshots: [CC-MAIN-2024-10]
  collected_at: 2024-11-02
rights:
  content_status: licensed        # public-domain | licensed | contract | owned
  license: CC-BY-4.0
  license_granted_by: rights-holder   # rights-holder | redistributor | unknown
  license_text_retained: true
  attribution_method: per-document-url
  share_alike: false
contract_terms:
  tos_url: https://example.org/terms
  tos_checked_at: 2026-10-01
  ml_use_prohibited: false
consent:
  robots_txt_at_collection: allow
  robots_txt_current: allow
  tdm_reservation: none
generated_by: null                # model name, version, terms URL if synthetic
audit:
  sampled_docs: 400
  problems_found: 0
  reviewer: legal-ops-2
  decision: include
  decision_rationale: license on every page, granted by site owner
```

The schema matters less than three properties: it records who granted the license rather than just which license appears, it timestamps consent signals at collection and now, and it records a decision with a rationale, so a later reviewer can see why a borderline source was included.

## What is different about post-training and expert data?

Post-training data, such as SFT demonstrations, preference labels, rubrics, RL environments and evaluation sets, has a different rights profile from pretraining data, and in one way an easier one. Most of it is *created* rather than collected, so the chain of title can be established at creation instead of reconstructed afterward. That only works if the process is designed for it:

| Risk | What goes wrong | What good practice looks like |
|---|---|---|
| Contributor rights | Annotators or experts retain rights in their work, or the agreement is silent | Written agreements that assign or license work product to the commissioning party, signed before work starts |
| Embedded third-party content | Experts paste copyrighted passages, proprietary code or paywalled material into tasks | Source rules in the guidelines, citation of public sources, review for copied text |
| Model-generated content | Contributors draft with AI tools whose terms restrict training competing models | Explicit tool-use policy per project; disclosure and logging of any model assistance |
| Confidential or personal data | Real client data, patient records or personal information end up in examples | De-identification rules, synthetic or consented data only, review before delivery |
| Reuse across clients | The same item is sold to several labs under conflicting exclusivity terms | Per-item records of license scope, exclusivity and delivery history |
| Benchmark contamination | Tasks are adapted from public benchmarks or textbooks | Originality checks against public benchmarks and the web before delivery |

The model-generated row is the one most teams underestimate. If an expert drafts a solution with a frontier model and the dataset is later used to train a competing model, the dataset can carry the generator's terms, the same issue the Data Provenance Initiative found in public synthetic datasets. A per-project tool policy, recorded per item, keeps that question answerable.

For organizations selling or licensing data to labs, the same logic runs in reverse: buyers increasingly ask for chain of title, so data that comes with clear rights, documented consent and a defined license scope is worth more. We cover the commercial side in [licensing data vs. selling it](/learn/data-licensing-vs-selling) and [how data is anonymized before it is used to train AI](/learn/anonymizing-data-for-ai-training).

## What do teams get wrong?

- **Trusting the dataset card.** The license field is a starting point. Read the actual license file and the source's terms.
- **Treating a collection license as a content license.** ODC-By on the corpus says nothing about the documents.
- **Assuming permissive means unconditional.** MIT and Apache-2.0 have conditions. If notices did not travel with the data, the license may not cover your use.
- **Ignoring derivation chains.** A permissive dataset derived from restricted sources inherits the restrictions, as the multimodal audit found for over 80% of source content.
- **Snapshotting consent once.** Robots.txt and terms change. Record what they said at collection and check again before reuse.
- **Not recording synthetic origins.** Without a generator and terms record, you cannot answer the question later.
- **Auditing averages.** Problems cluster by source and domain. Stratify samples.
- **No decision log.** When risk tolerance drives a call, as with CC BY-SA content, write down the call and the reason.

## How Anthroly can help

Anthroly builds expert data for frontier AI labs, including SFT demonstrations, preference and rubric data, RL environments, verifiers and evaluation sets, with provenance documented per item: who created it, under what agreement, which sources and tools were used, and what the licensee may do with it. The work is done by a bench of roughly 100-150 contracted PhDs, with about 400 more PhDs and graduates across domains ready to commit, all working under written contracts. We also help companies license their own operational data to AI labs with clear scope and chain of title, as described in [what an AI data broker actually does](/learn/ai-data-broker-explained).

If you need post-training or evaluation data that will stand up to a provenance review, or you are deciding how to license your own data, [book 15 minutes with us](https://cal.com/sarath-kavuru-0uizws/15min).

## Related reading

- [Licensing data vs. selling it: what you actually give up](/learn/data-licensing-vs-selling)
- [What an AI data broker actually does](/learn/ai-data-broker-explained)
- [Synthetic data vs expert human data for post-training](/blog/synthetic-data-vs-expert-human-data)
- [RLAIF vs RLHF: can AI feedback replace human preference labels?](/blog/rlaif-vs-rlhf-can-ai-feedback-replace-human-preference-labels)
- [How do you quality-control expert data labeling?](/blog/how-to-quality-control-expert-data-labeling)
- [How do you build an agent benchmark that won't be contaminated or saturated?](/blog/building-contamination-resistant-agent-benchmarks)
- [Synthetic vs. human preference data](/research/compare/synthetic-vs-human-preference-data)
- [Glossary: Synthetic data](/research/glossary#synthetic-data)

---

## References

1. Longpre, S., Mahari, R., Chen, A., et al. (2023). [The Data Provenance Initiative: A Large Scale Audit of Dataset Licensing & Attribution in AI](https://arxiv.org/abs/2310.16787). arXiv:2310.16787.
2. Longpre, S., Mahari, R., Lee, A., et al. (2024). [Consent in Crisis: The Rapid Decline of the AI Data Commons](https://arxiv.org/abs/2407.14933). arXiv:2407.14933.
3. Longpre, S., Singh, N., Cherep, M., et al. (2024). [Bridging the Data Provenance Gap Across Text, Speech and Video](https://arxiv.org/abs/2412.17847). arXiv:2412.17847.
4. Jewitt, J., Rajbahadur, G. K., Li, H., Adams, B., Hassan, A. E. (2026). [Permissive-Washing in the Open AI Supply Chain: A Large-Scale Audit of License Integrity](https://arxiv.org/abs/2602.08816). arXiv:2602.08816.
5. Kandpal, N., Lester, B., Raffel, C., et al. (2025). [The Common Pile v0.1: An 8TB Dataset of Public Domain and Openly Licensed Text](https://arxiv.org/abs/2506.05209). arXiv:2506.05209.
6. Langlais, P.-C., Chizhov, P., Arnett, C., et al. (2025). [Common Corpus: The Largest Collection of Ethical Data for LLM Pre-Training](https://arxiv.org/abs/2506.01732). arXiv:2506.01732.
7. Bommarito, M. J., II, Bommarito, J., Katz, D. M. (2025). [The KL3M Data Project: Copyright-Clean Training Resources for Large Language Models](https://arxiv.org/abs/2504.07854). arXiv:2504.07854.
8. Bartz v. Anthropic PBC, No. 3:24-cv-05417 (N.D. Cal.). [Order on Fair Use, Dkt. 231, June 23, 2025](https://docs.justia.com/cases/federal/district-courts/california/candce/3:2024cv05417/434709/231).
9. Brittain, B. (2026, July 20). [US judge approves Anthropic's $1.5 billion settlement of copyright lawsuit](https://www.reuters.com/world/us-judge-approves-anthropics-15-billion-settlement-copyright-lawsuit-2026-07-20/). Reuters.
10. Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.). [Order Granting Final Approval of Class Action Settlement, Dkt. 680, July 20, 2026](https://law.justia.com/cases/federal/district-courts/california/candce/4:2024cv05417/434709/680/).
11. Regulation (EU) 2024/1689 (AI Act). [Article 53: Obligations for providers of general-purpose AI models](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-53).
12. European Commission (2025). [Template for general-purpose AI model providers to summarise their training content](https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content).
