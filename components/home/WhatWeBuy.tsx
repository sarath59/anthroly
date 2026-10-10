import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

const CATEGORIES = [
  {
    name: 'Team chat',
    systems: 'Slack, Microsoft Teams, Google Chat',
    why: 'Where decisions get argued out in real time, with the tradeoffs still visible.',
  },
  {
    name: 'Email',
    systems: 'Gmail, Outlook, shared inboxes',
    why: 'Long-running negotiations, approvals and handoffs between people and companies.',
  },
  {
    name: 'Support and service tickets',
    systems: 'Zendesk, Intercom, Freshdesk, ServiceNow',
    why: 'Problem, diagnosis, resolution. The most naturally structured reasoning a business produces.',
  },
  {
    name: 'CRM history',
    systems: 'Salesforce, HubSpot, Pipedrive',
    why: 'Multi-month deal cycles with notes on why things moved, stalled or died.',
  },
  {
    name: 'Calls and meetings',
    systems: 'Gong, Zoom, Fireflies, call recordings',
    why: 'Spoken reasoning, objection handling and real conversational turn-taking.',
  },
  {
    name: 'Code and engineering',
    systems: 'GitHub, GitLab, Jira, Linear',
    why: 'Pull request reviews, incident threads and the history of why code changed.',
  },
  {
    name: 'Documents and wikis',
    systems: 'Google Drive, SharePoint, Notion, Confluence',
    why: 'Drafts and revisions that show how a finished document was argued into shape.',
  },
  {
    name: 'Finance and operations',
    systems: 'NetSuite, QuickBooks, SAP, ERP exports',
    why: 'Structured records that ground the conversations in what actually happened.',
  },
  {
    name: 'Field and frontline records',
    systems: 'Work orders, inspection notes, dispatch logs',
    why: 'Physical-world work that almost never makes it onto the internet.',
  },
  {
    name: 'Design and creative files',
    systems: 'Figma, Adobe, version histories',
    why: 'Iteration with feedback attached, which is rare and very hard to fake.',
  },
];

export function WhatWeBuy() {
  return (
    <section id="sell" className="border-t border-rule">
      <div className="page-x py-24 lg:py-36">
        <SectionHead
          index="01"
          label="What we buy"
          title={
            <>
              Your operating history is an asset. <em className="text-ink-muted">Most companies have never priced it.</em>
            </>
          }
          intro="We license the working record a business produces just by running. Not the polished output, but the back-and-forth that produced it. The more reasoning a record shows, the more it is worth."
        />

        <div className="mt-20 grid lg:grid-cols-12">
          <div className="lg:col-span-9 lg:col-start-4">
            <div className="grid border-t border-ink sm:grid-cols-2 sm:gap-x-12">
              {CATEGORIES.map((c, i) => (
                <Reveal key={c.name} delay={(i % 2) * 0.05}>
                  <div className="group grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-rule py-7">
                    <span className="pt-1.5 font-mono text-[11px] text-signal">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif text-[1.75rem] leading-tight transition-transform duration-500 group-hover:translate-x-1">
                        {c.name}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                        {c.systems}
                      </p>
                      <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">{c.why}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-10 max-w-xl text-[15px] leading-[1.6] text-ink-muted">
                We only buy from companies headquartered and operating in the United States. Data you
                hold on behalf of your own clients stays out of scope unless you have the right to
                license it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
