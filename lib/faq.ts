import type { FAQItem } from './schema';

export const HOME_FAQ: FAQItem[] = [
  {
    question: 'Does Datary Labs buy data, or broker it?',
    answer:
      'Both. Most of the time we are the buyer: we license the data directly from the company that produced it, pay for it ourselves and supply the AI labs. For some lab requests we broker a direct license between a US company and a lab, and we stay in the middle to run diligence, anonymization and delivery. Either way, you deal with one team.',
  },
  {
    question: 'Who do you sell to?',
    answer:
      'Frontier AI labs and the model teams inside large technology companies. We sell to every major lab. We do not disclose which lab receives which record, the same way we never disclose one seller to another.',
  },
  {
    question: 'Why only US companies?',
    answer:
      'One legal framework gives every record a clean, auditable chain of title, and US operating data is what the labs ask us for most. We do not buy from companies headquartered outside the United States.',
  },
  {
    question: 'What does it cost my company?',
    answer:
      'Nothing. There is no listing fee, no commission charged to you and no auction. Money moves one way, from us to you.',
  },
  {
    question: 'How much is our data worth?',
    answer:
      'Every record is priced individually, after we have read a de-identified sample. Depth of operating history, how much visible reasoning the record contains and how scarce the domain is move the number far more than raw volume does.',
  },
  {
    question: 'Is the data anonymized before anyone sees it?',
    answer:
      'Yes. Names, emails, phone numbers, account numbers, addresses and other identifiers are removed or replaced before anything moves. Roles, timestamps and the work itself are kept, because that is where the value is.',
  },
  {
    question: 'Do we lose ownership of our data?',
    answer:
      'No. A license is not a sale. You keep the business, the data and the systems, and keep using all of it exactly as before. The license covers defined material, for a defined term and a defined use.',
  },
  {
    question: 'What kinds of data do you buy?',
    answer:
      'The working record of the business: team chat, email, support tickets, CRM history, call recordings, code review and incident history, documents and wikis, ERP and accounting exports, and field records. The messier and more reasoning-rich, the better.',
  },
  {
    question: 'We are an AI lab. What formats can you deliver?',
    answer:
      'De-identified raw corpora, RL environments with tools and verifiable rewards, long-horizon agent trajectories, SFT and preference data, and private held-out evaluation sets. Everything ships with provenance and a clean license.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Email us. Tell us your company, which systems you use and roughly how far back they go. Counts and dates are enough, so please do not send files. We read every message and reply personally.',
  },
];
