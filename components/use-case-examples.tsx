import { CodeExample } from "@/components/code-example";
import { USE_CASES } from "@/lib/use-case-examples";

export function UseCaseExamples() {
  return (
    <section className="possibilities" aria-labelledby="use-cases-title">
      <h3 className="mono-label" id="use-cases-title">THE RIGHT MODEL FOR THE TASK</h3>
      <p className="use-cases-intro">Open an example to see the code. The model IDs are placeholders; replace them with the specific model IDs your app uses.</p>
      {USE_CASES.map((example, index) => (
        <details className="use-case" key={example.id}>
          <summary className="use-case-summary" aria-labelledby={`${example.id}-title`}>
            <span className="use-case-number" aria-hidden="true">0{index + 1}</span>
            <span className="use-case-title" id={`${example.id}-title`}>{example.title}</span>
            <span className="use-case-description">{example.description}</span>
            <code>{example.method}</code>
            <span className="use-case-toggle" aria-hidden="true" />
          </summary>
          <div className="use-case-content">
            <CodeExample code={example.code} filename={example.filename} label={`${example.title} JavaScript example`} caption={example.caption} />
            <p className="example-note">{example.note} <code>button</code>, <code>output</code>, and <code>showFallback()</code> are supplied by your app. These examples are illustrative and do not execute on this page.</p>
          </div>
        </details>
      ))}
    </section>
  );
}
