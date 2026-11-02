import { Check, FileText, Paperclip, Wrench } from "lucide-react";
import { Tag } from "@/components/ui/eyebrow";
import type { ProductSlug } from "@/lib/content/products";
import { cn } from "@/lib/utils";
import { RouterDiagram } from "./router-diagram";

function Frame({
  path,
  children,
  className,
}: {
  path: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "border-[1.5px] border-graphite-500 bg-graphite-900",
        className,
      )}
    >
      <figcaption className="flex items-center justify-between border-b px-4 py-3">
        <span className="type-mono truncate text-graphite-300">{path}</span>
        <Tag>Illustrative</Tag>
      </figcaption>
      {children}
    </figure>
  );
}

/** Model × hardware matrix. Shape only: no figures, by design. */
function BenchmarksVisual() {
  const servers = ["Server A", "Server B", "Server C"];
  const models = ["Model 1", "Model 2", "Model 3", "Model 4"];
  // Relative fit, rendered as filled segments out of 5.
  const fit = [
    [5, 3, 2],
    [4, 4, 2],
    [2, 5, 3],
    [1, 3, 4],
  ];
  return (
    <Frame path="carbn-benchmarks / compare">
      <div className="overflow-x-auto p-4 md:p-6">
        <table className="w-full min-w-[320px] border-collapse">
          <caption className="sr-only">
            Illustrative model-to-hardware fit
          </caption>
          <thead>
            <tr>
              <th
                className="type-label pb-3 text-left text-graphite-400"
                scope="col"
              >
                Model
              </th>
              {servers.map((s) => (
                <th
                  key={s}
                  className="type-label pb-3 text-left text-graphite-400"
                  scope="col"
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {models.map((m, r) => (
              <tr key={m} className="border-t">
                <th
                  scope="row"
                  className="type-mono py-3 pr-4 text-left font-normal text-graphite-50"
                >
                  {m}
                </th>
                {fit[r].map((v, c) => {
                  const best = v === Math.max(...fit.map((row) => row[c]));
                  return (
                    <td key={c} className="py-3 pr-4">
                      <span
                        className="flex gap-[3px]"
                        aria-label={`${v} of 5${best ? ", best fit" : ""}`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              "h-3 w-2.5",
                              i < v
                                ? best
                                  ? "bg-volt"
                                  : "bg-graphite-300"
                                : "border border-graphite-500",
                            )}
                          />
                        ))}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-3 border-t">
        {["Backend: MAX vs vLLM", "Same conditions", "Export report"].map(
          (t, i) => (
            <p
              key={t}
              className={cn(
                "type-mono px-4 py-3 text-graphite-300",
                i > 0 && "border-l",
              )}
            >
              {t}
            </p>
          ),
        )}
      </div>
    </Frame>
  );
}

function ChatVisual() {
  return (
    <Frame path="carbn-chat / conversation">
      <div className="space-y-4 p-4 md:p-6">
        <div className="ml-auto w-fit max-w-[85%] border-[1.5px] border-graphite-500 bg-graphite-950 px-4 py-3">
          <p className="text-body-sm text-graphite-50">
            Summarise the attached audit and draft a one-page brief.
          </p>
          <p className="type-mono mt-2 inline-flex items-center gap-2 text-graphite-400">
            <Paperclip className="size-3.5 stroke-[1.5]" aria-hidden />{" "}
            audit-q3.pdf
          </p>
        </div>
        <div className="border-l-[3px] border-graphite-500 pl-4">
          <p className="type-label text-graphite-400">Reasoning · collapsed</p>
        </div>
        <div className="border-[1.5px] border-graphite-500 px-4 py-3">
          <p className="type-mono inline-flex items-center gap-2 text-graphite-300">
            <Wrench className="size-3.5 stroke-[1.5]" aria-hidden /> tool:
            read_file
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-body-sm text-graphite-300">Approval required</p>
            <span className="type-label inline-flex items-center gap-2 border-[1.5px] border-volt bg-volt px-2 py-1 text-graphite-950">
              <Check className="size-3 stroke-2" aria-hidden /> Approved
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 border-[1.5px] border-graphite-500 bg-graphite-950 px-4 py-3">
          <FileText className="size-5 stroke-[1.5] text-volt" aria-hidden />
          <div className="min-w-0">
            <p className="text-body-sm font-semibold text-graphite-50">
              brief.docx
            </p>
            <p className="type-mono text-graphite-400">Preview · Download</p>
          </div>
        </div>
      </div>
      <p className="type-mono border-t px-4 py-3 text-graphite-300">
        History stored on your servers
      </p>
    </Frame>
  );
}

function WorkflowsVisual() {
  const nodes = [
    { x: 24, y: 40, label: "Trigger", kind: "Logic" },
    { x: 24, y: 150, label: "Read file", kind: "Tool" },
    { x: 196, y: 150, label: "Classify", kind: "Model" },
    { x: 196, y: 260, label: "Route", kind: "Logic" },
    { x: 24, y: 260, label: "Summarise", kind: "Model" },
  ];
  return (
    <Frame path="carbn-workflows / canvas">
      <div className="p-4 md:p-6">
        <svg
          viewBox="0 0 360 330"
          className="w-full"
          role="img"
          aria-label="Illustrative workflow graph"
        >
          <defs>
            <pattern
              id="dots"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#3f4347" />
            </pattern>
          </defs>
          <rect width="360" height="330" fill="url(#dots)" />
          <path
            d="M84 76 V150 M144 168 H196 M256 186 V260 M196 278 H144"
            fill="none"
            stroke="#6e7277"
            strokeWidth="1.5"
          />
          <path
            className="wf-travel"
            d="M84 76 V150 M144 168 H196 M256 186 V260 M196 278 H144"
            fill="none"
            stroke="#d0fe00"
            strokeWidth="1.5"
            pathLength={100}
          />
          {nodes.map((n) => (
            <g key={n.label} transform={`translate(${n.x} ${n.y})`}>
              <rect
                width="120"
                height="36"
                fill="#08090b"
                stroke={n.kind === "Model" ? "#d0fe00" : "#6e7277"}
                strokeWidth="1.5"
              />
              <text
                x="10"
                y="15"
                fill="#8b9095"
                fontSize="8"
                letterSpacing="0.8"
                fontFamily="var(--font-archivo)"
              >
                {n.kind.toUpperCase()}
              </text>
              <text
                x="10"
                y="28"
                fill="#f4f5f7"
                fontSize="11"
                fontFamily="var(--font-azeret)"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="type-mono border-t px-4 py-3 text-graphite-300">
        Every model call served by CarbnEngine
      </p>
    </Frame>
  );
}

function ConnectVisual() {
  const bots = [
    { name: "Research", task: "Collecting sources", state: "Working" },
    { name: "Drafting", task: "Writing the summary", state: "Handed off" },
    { name: "Inbox triage", task: "Reply drafted", state: "Awaiting approval" },
  ];
  return (
    <Frame path="carbn-connect / teammates">
      <ul className="divide-y">
        {bots.map((b, i) => (
          <li
            key={b.name}
            className="flex items-center justify-between gap-4 px-4 py-4 md:px-6"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="type-mono text-graphite-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="type-heading text-h5 text-graphite-50">
                  {b.name}
                </p>
                <p className="type-mono truncate text-graphite-400">{b.task}</p>
              </div>
            </div>
            <span
              className={cn(
                "type-label shrink-0 border-[1.5px] px-2 py-1",
                b.state === "Awaiting approval"
                  ? "border-volt bg-volt text-graphite-950"
                  : "border-graphite-500 text-graphite-300",
              )}
            >
              {b.state}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="text-body-sm text-graphite-300">
          Nothing consequential is sent without a person.
        </p>
        <div className="flex gap-2">
          <span className="type-label border-[1.5px] border-graphite-50 px-3 py-2 text-graphite-50">
            Review
          </span>
          <span className="type-label border-[1.5px] border-volt bg-volt px-3 py-2 text-graphite-950">
            Approve
          </span>
        </div>
      </div>
    </Frame>
  );
}

export function ProductVisual({ slug }: { slug: ProductSlug }) {
  switch (slug) {
    case "carbn-engine":
      return <RouterDiagram />;
    case "carbn-benchmarks":
      return <BenchmarksVisual />;
    case "carbn-chat":
      return <ChatVisual />;
    case "carbn-workflows":
      return <WorkflowsVisual />;
    case "carbn-connect":
      return <ConnectVisual />;
  }
}
