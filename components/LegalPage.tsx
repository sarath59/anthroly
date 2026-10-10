import { ArticleBody } from './learn/ArticleBody';

export function LegalPage({ title, updated, body }: { title: string; updated: string; body: string }) {
  return (
    <section className="pt-[68px]">
      <div className="page-x">
        <div className="flex items-center justify-between border-b border-rule py-4">
          <p className="eyebrow">Legal</p>
          <p className="eyebrow">Last updated {updated}</p>
        </div>
        <div className="mx-auto max-w-prose py-16 lg:py-24">
          <h1 className="font-serif text-display-lg">{title}</h1>
          <div className="mt-12">
            <ArticleBody body={body} />
          </div>
        </div>
      </div>
    </section>
  );
}
