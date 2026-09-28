import { Fragment } from "react";
import { CopyCode } from "@/components/copy-code";
import { EXAMPLE } from "@/lib/example";

function highlight(line: string) {
  if (line.trimStart().startsWith("//")) return <span className="token-comment">{line}</span>;
  return line.split(/('[^']*'|\b(?:const|async|await|if|return|try|catch|function)\b|\b(?:navigator|models|requestAccess|generate|embed|info|data|vectors)\b)/g).map((token, index) => {
    const className = token.startsWith("'") ? "token-string" : /^(const|async|await|if|return|try|catch|function)$/.test(token) ? "token-keyword" : /^(navigator|models|requestAccess|generate|embed|info|data|vectors)$/.test(token) ? "token-api" : undefined;
    return <span key={index} className={className}>{token}</span>;
  });
}

export function CodeExample({
  code = EXAMPLE,
  filename = "YOUR-APP.JS",
  label = "Illustrative JavaScript example",
  caption = "Your page requests it. The user approves it. The browser runs it.",
}: { code?: string; filename?: string; label?: string; caption?: string }) {
  const lines = code.split("\n");
  return (
    <div className="code-card">
      <div className="code-toolbar"><span>{filename}</span><CopyCode code={code} label={`Copy ${filename} example`} /></div>
      <pre tabIndex={0} aria-label={label}><code>{lines.map((line, index) => <Fragment key={index}><span className="code-line"><span className="line-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{highlight(line)}</span></span>{index < lines.length - 1 ? "\n" : null}</Fragment>)}</code></pre>
      <div className="code-caption"><span className="code-caption-mark" aria-hidden="true">[ ]</span><span>{caption}</span></div>
    </div>
  );
}
