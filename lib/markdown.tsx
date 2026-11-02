import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// Prism theme in Carbn colours: Graphite 900 field, Graphite 50 text,
// Volt for keywords, Graphite 400 for comments.
const carbnPrism: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color: "#f4f5f7",
    background: "none",
    fontFamily: "var(--font-azeret), ui-monospace, monospace",
    fontSize: "13px",
    lineHeight: 1.6,
    whiteSpace: "pre",
    tabSize: 2,
  },
  'pre[class*="language-"]': {
    color: "#f4f5f7",
    background: "#181b1e",
    padding: "20px",
    margin: 0,
    overflow: "auto",
  },
  comment: { color: "#8b9095" },
  prolog: { color: "#8b9095" },
  doctype: { color: "#8b9095" },
  cdata: { color: "#8b9095" },
  punctuation: { color: "#aaaeb3" },
  keyword: { color: "#d0fe00" },
  "control-flow": { color: "#d0fe00" },
  boolean: { color: "#d0fe00" },
  important: { color: "#d0fe00" },
  atrule: { color: "#d0fe00" },
  string: { color: "#cbced1" },
  char: { color: "#cbced1" },
  "attr-value": { color: "#cbced1" },
  number: { color: "#f4f5f7" },
  function: { color: "#f4f5f7", fontWeight: 600 },
  "class-name": { color: "#f4f5f7", fontWeight: 600 },
  operator: { color: "#aaaeb3" },
  property: { color: "#e6e8ea" },
  tag: { color: "#d0fe00" },
  selector: { color: "#e6e8ea" },
  variable: { color: "#e6e8ea" },
  builtin: { color: "#e6e8ea" },
};

/** Renders **bold**, `code` and [links](url) within one line of text. */
function inline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = nodes.length;
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-graphite-50">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="type-mono border border-graphite-700 bg-graphite-900 px-1.5 py-0.5 text-graphite-50"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      nodes.push(
        <a
          key={key}
          href={href}
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = elements.length;

    if (line.startsWith("```")) {
      const language = line.replace("```", "").trim() || "text";
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```"))
        code.push(lines[i++]);
      i++;
      elements.push(
        <figure key={key} className="my-10 border-[1.5px] border-graphite-500">
          <figcaption className="type-label border-b px-4 py-2 text-graphite-400">
            {language}
          </figcaption>
          <SyntaxHighlighter
            language={language}
            style={carbnPrism}
            showLineNumbers
            lineNumberStyle={{ color: "#8b9095", minWidth: "2.5em" }}
          >
            {code.join("\n")}
          </SyntaxHighlighter>
        </figure>,
      );
      continue;
    }

    if (/^[-*] /.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\.\s/.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        (ordered ? /^\d+\.\s/.test(lines[i]) : /^[-*] /.test(lines[i]))
      ) {
        items.push(lines[i].replace(ordered ? /^\d+\.\s/ : /^[-*] /, ""));
        i++;
      }
      const List = ordered ? "ol" : "ul";
      elements.push(
        <List
          key={key}
          className={`my-6 space-y-2 pl-6 text-body-lg text-graphite-300 ${ordered ? "list-decimal" : "list-[square]"} marker:text-graphite-400`}
        >
          {items.map((item, n) => (
            <li key={n} className="pl-1">
              {inline(item)}
            </li>
          ))}
        </List>,
      );
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key}
          className="type-heading mt-12 mb-4 text-h3 text-graphite-50"
        >
          {inline(line.slice(4))}
        </h3>,
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key}
          className="type-heading mt-16 mb-5 border-t pt-8 text-h2 text-graphite-50"
        >
          {inline(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h2
          key={key}
          className="type-heading mt-16 mb-6 text-h1 text-graphite-50"
        >
          {inline(line.slice(2))}
        </h2>,
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={key}
          className="my-8 border-l-[3px] border-graphite-500 pl-6 text-body-lg text-graphite-50"
        >
          {inline(line.slice(2))}
        </blockquote>,
      );
    } else if (line.trim()) {
      elements.push(
        <p key={key} className="my-5 text-body-lg text-graphite-300">
          {inline(line)}
        </p>,
      );
    }
    i++;
  }

  return <div className="measure">{elements}</div>;
}
