import Image from "next/image";
import { WebModelsMark, WebModelsMarkCompact } from "@/components/web-models-mark";
import { ShareButton } from "@/components/share-button";
import { TrackedLink } from "@/components/tracked-link";
import { CodeExample } from "@/components/code-example";
import { UseCaseExamples } from "@/components/use-case-examples";
import { API_REFERENCE_URL, DISCUSSION_URL, EXPLAINER_URL } from "@/lib/site";
import heroArtwork from "@/public/images/models-layer.png";

const benefits = [
  { number: "01", title: "The model you\ntested against.", body: "The best model for scanning a receipt, transcribing audio, and searching documents may differ. A model ID lets a developer ask for the same model and release in any browser." },
  { number: "02", title: "Shared weights,\nseparate permissions.", body: "Some models take gigabytes to download and plenty of memory to run. The browser can share their weights across sites, so every site does not need to download and store another copy." },
  { number: "03", title: "Access you\ncontrol.", body: "An app asks for a model, and the browser asks the user. They can see and revoke access for each site and model. The browser also keeps an eye on setup, execution, and resource limits." },
];

const methods = [
  { name: "generate", description: "Send a prompt and get a complete response." },
  { name: "stream", description: "Receive the response as it is generated." },
  { name: "embed", description: "Turn text into vectors for search and similarity." },
];

const principles = [
  { title: "Consent before discovery", body: "A site can detect the API, but it cannot list the models on a device. It gets details about a model only after access is granted." },
  { title: "Access has boundaries", body: "A grant applies to one top-level site, one requesting frame origin, and one model ID. Revoking it ends related work and destroys its sessions." },
  { title: "Your device has limits", body: "The browser sets quotas and resource policies. Access to a model is useful, but it is not an unlimited claim on compute." },
  { title: "Shared models, separate data", body: "Shared model weights do not mean shared conversations. Each site keeps its data private, and model execution stays isolated." },
];

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span className="label-rule" aria-hidden="true" /><span>{children}</span></div>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand-lockup" href="#" aria-label="Web Models API home"><WebModelsMarkCompact size={30} /><span>Web Models API</span></a>
          <nav aria-label="Main navigation"><a href="#why">The case</a><TrackedLink href="#proposal" eventName="read_proposal_click" location="header">The proposal</TrackedLink><a href="#principles">The principles</a></nav>
          <TrackedLink className="header-cta" href={DISCUSSION_URL} eventName="comment_link_click" location="header" aria-label="Comment on the proposal on GitHub">Comment <span aria-hidden="true">↗</span></TrackedLink>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> A PROPOSAL FOR THE WEB</p>
            <h1 id="hero-title"><span>Models belong</span><span>in every</span><span className="signal-text">browser.</span></h1>
            <p className="hero-description">The model your app was built for.<br />With user permission. In the browser.</p>
            <p className="hero-detail"><code>navigator.models</code> is a proposed browser API for web apps that need a particular open-weight model on-device.</p>
            <div className="hero-actions"><ShareButton location="hero" /><TrackedLink className="text-link" href="#proposal" eventName="read_proposal_click" location="hero">Read the proposal <span aria-hidden="true">↓</span></TrackedLink></div>
          </div>
          <figure className="hero-figure">
            <div className="hero-image-wrap"><Image src={heroArtwork} alt="Translucent blue model layers supported by a shared navy platform, connected by fine lines." preload sizes="(max-width: 760px) 100vw, 55vw" className="hero-art" /></div>
            <figcaption><span>OPEN MODELS.</span><span>AT HOME IN THE BROWSER.</span></figcaption>
          </figure>
        </section>

        <div className="thesis-strip container" aria-label="Proposal principles"><span>APPS REQUEST THE MODEL</span><span>USERS CONTROL ACCESS</span><span>BROWSERS MANAGE EXECUTION</span></div>

        <section id="why" className="section container" aria-labelledby="why-title">
          <SectionLabel number="01">THE CASE FOR A SHARED CAPABILITY</SectionLabel>
          <div className="section-intro"><h2 id="why-title">Your app depends<br />on its model.</h2><div className="intro-copy"><p>A workflow built around one model may not work with another. Apps should be able to ask for the model they built and tested against, regardless of which browser someone uses.</p><p>Web Models makes that request explicit. The page names a model ID. The browser runs that model or tells the page it can’t. There is no quiet fallback.</p></div></div>
          <div className="benefits-grid">{benefits.map((benefit) => <article className="benefit" key={benefit.number}><span className="benefit-number">[ {benefit.number} ]</span><h3>{benefit.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3><p>{benefit.body}</p></article>)}</div>
          <aside className="local-note"><span className="mono-label">WHY ON-DEVICE?</span><p>When someone searches their notes or documents, they should not have to send them to a model provider. Local inference can keep that data on-device and work offline when the model and content are already there.</p></aside>
        </section>

        <section id="proposal" className="proposal-section" aria-labelledby="proposal-title">
          <div className="container section">
            <SectionLabel number="02">THE PROPOSAL</SectionLabel>
            <div className="section-intro proposal-intro"><h2 id="proposal-title">Choose a model.<br />Ask to use it.</h2><div className="intro-copy"><p>Every top-level inference call on <code>navigator.models</code> names one model ID.</p><p>Your app picks the model and calls the API. The user grants access. The browser runs it.</p></div></div>
            <CodeExample />
            <p className="example-note">This is just illustrative JavaScript. <code>&lt;model-id&gt;</code> is a placeholder. Your app provides <code>button</code>, <code>output</code>, and <code>showFallback()</code>. The first access request has to start with a user gesture. This page does not run a model.</p>
            <nav className="proposal-resources" aria-label="Proposal resources"><a href={EXPLAINER_URL}>Read the full explainer <span aria-hidden="true">↗</span></a><a href={API_REFERENCE_URL}>API reference <span aria-hidden="true">↗</span></a></nav>
            <div className="methods-grid">{methods.map((method) => <div className="method" key={method.name}><code><span className="method-prefix">models.</span>{method.name}<span className="method-parens">()</span></code><p>{method.description}</p></div>)}</div>
            <div className="api-notes">
              <div className="api-note"><h3>Start with a direct call. Use a session when it helps.</h3><p>For a one-off task, make a direct call. If you will use the model again, keep it in a session. Your app still owns the conversation history.</p></div>
              <div className="api-note"><h3>Clearly labeled capabilities.</h3><p>Once access is granted, the browser tells you what that model supports. Vision, audio, tools, structured output, reasoning, and embeddings all depend on the model you chose.</p></div>
              <div className="api-note"><h3>A model ID points to a release.</h3><p>Each ID is tied to fixed weights, a tokenizer, and default input and generation settings. A changed release gets a new ID, so developers decide when to move to it. Shared catalogs, model retirement, and cross-browser compatibility tests are still open questions.</p></div>
            </div>
            <UseCaseExamples />
          </div>
        </section>

        <section id="principles" className="principles-section" aria-labelledby="principles-title">
          <div className="container section">
            <SectionLabel number="03">DESIGNED FOR THE WEB</SectionLabel>
            <div className="section-intro"><h2 id="principles-title">A capable web.<br />A clear boundary.</h2><div className="intro-copy"><p>An API like this needs more than a way to generate text. It needs permissions, privacy boundaries, and a sense of the device it runs on.</p><p>Those are platform concerns.</p></div></div>
            <figure className="consent-diagram" aria-labelledby="diagram-caption">
              <ol className="flow"><li><span className="flow-index">01 / REQUEST</span><strong>Your page</strong><code>requestAccess(model)</code></li><li className="consent-step"><span className="flow-index">02 / PERMISSION</span><strong>Browser consent</strong><span>The user approves access</span></li><li><span className="flow-index">03 / INFERENCE</span><strong>The model</strong><span>The browser runs the request</span></li><li><span className="flow-index">04 / RESPONSE</span><strong>Your result</strong><span>Your app decides what happens next</span></li></ol>
              <figcaption id="diagram-caption">The page asks. The browser gets permission. The model sends back a result.</figcaption>
            </figure>
            <div className="principles-grid">{principles.map((principle, index) => <article className="principle" key={principle.title}><span className="principle-index">0{index + 1}</span><h3>{principle.title}</h3><p>{principle.body}</p></article>)}</div>
            <div className="status-note"><span className="mono-label">DRAFT FOR DISCUSSION</span><p>The proposal is still moving. Model ID governance, compatibility, and whether these capabilities should extend the Prompt API are open questions. <TrackedLink href={DISCUSSION_URL} eventName="comment_link_click" location="principles">The WICG proposal is open for comments.</TrackedLink></p></div>
          </div>
        </section>

        <section id="share" className="share-section container" aria-labelledby="share-title">
          <div className="closing-mark"><WebModelsMark size={72} strokeWidth={2.8} /></div>
          <p className="eyebrow">A BETTER WEB IS A SHARED PROJECT</p>
          <h2 id="share-title">Help make this<br />a web capability.</h2>
          <p>What would you build? What would need to change?<br className="desktop-break" /> Bring a use case, implementation concern, or question<br className="desktop-break" /> to the WICG discussion.</p>
          <div className="closing-actions"><TrackedLink className="button button-primary" href={DISCUSSION_URL} eventName="comment_link_click" location="closing">Comment on the proposal <span aria-hidden="true">↗</span></TrackedLink><ShareButton variant="secondary" location="closing" /></div>
          <p className="discussion-note">Discussion on GitHub · WICG proposals #306</p>
          <a href={EXPLAINER_URL} className="closing-link">Read the full explainer <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="site-footer container"><a className="brand-lockup" href="#"><WebModelsMarkCompact size={24} /><span>Web Models API</span></a><span className="footer-note">Adapted from the <a href={EXPLAINER_URL}>Web Models API explainer</a> · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></span><TrackedLink className="footer-domain" href={DISCUSSION_URL} eventName="comment_link_click" location="footer">Comment on the proposal <span aria-hidden="true">↗</span></TrackedLink></footer>
    </>
  );
}
