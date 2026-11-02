export type ProductSlug =
  | "carbn-engine"
  | "carbn-benchmarks"
  | "carbn-chat"
  | "carbn-workflows"
  | "carbn-connect";

export type Item = { title: string; body: string };

export type ProductSection =
  | {
      kind: "steps";
      eyebrow: string;
      title: string;
      intro?: string;
      items: Item[];
    }
  | {
      kind: "cells";
      eyebrow: string;
      title: string;
      intro?: string;
      items: Item[];
      highlight?: number;
    }
  | {
      kind: "table" | "components" | "measures" | "rendering";
      eyebrow: string;
      title: string;
      intro?: string;
      columns: [string, string];
      rows: [string, string][];
    };

export type Product = {
  slug: ProductSlug;
  name: string;
  kind: "Engine" | "Module";
  stage: string;
  summary: string;
  lede: string;
  what: string[];
  featuresTitle: string;
  featuresIntro: string;
  features: Item[];
  /** Index of the feature that gets the Volt focal cell. */
  featureHighlight?: number;
  sections: ProductSection[];
};

const engine: Product = {
  slug: "carbn-engine",
  featureHighlight: 0,
  name: "CarbnEngine",
  kind: "Engine",
  stage: "In design · built first",
  summary:
    "The inference engine. It runs open models on the hardware you own and serves every module through one API.",
  lede: "The core inference engine behind every Carbn module. It runs open models on whatever hardware your organisation already owns.",
  what: [
    "CarbnEngine is the core project and the foundation everything else in Carbn depends on. It runs local, open models on the hardware your organisation already has, and it is the default engine behind every Carbn module and plugin.",
    "Hardware flexibility is the design goal: the same models should run efficiently across different server setups, whatever mix of accelerators, CPUs and memory you own. CarbnEngine uses Modular MAX and Mojo as its primary backend, and vLLM as a secondary backend for models or hardware that MAX does not yet support.",
    "Carbn's own code is open source. MAX, which CarbnEngine wraps as released, is source-available under the MAX licence.",
  ],
  featuresTitle: "What CarbnEngine gives every module",
  featuresIntro: "One engine, one interface, whatever hardware is in the rack.",
  features: [
    {
      title: "Hardware flexibility",
      body: "The same models run across varying accelerators, CPUs and memory configurations, without a separate code path for each vendor.",
    },
    {
      title: "Modular foundation",
      body: "Every Carbn module and plugin runs on CarbnEngine by default, through the same inference API.",
    },
    {
      title: "Swappable engine",
      body: "External parties can run the open-source modules on their own inference engine instead.",
    },
    {
      title: "MAX and Mojo first",
      body: "Built on Modular MAX and Mojo. Carbn's optimisations live in Carbn's own layer, not in a modified copy of MAX.",
    },
    {
      title: "Fully self-hosted",
      body: "Runs entirely on your own infrastructure. Nothing leaves your servers.",
    },
    {
      title: "Open source",
      body: "Carbn's engine code will be free to self-host, inspect and contribute to.",
    },
  ],
  sections: [
    {
      kind: "components",
      eyebrow: "Components",
      title: "What is inside the engine",
      intro:
        "Six parts, one contract. Modules never need to know which backend served a request.",
      columns: ["Component", "What it does"],
      rows: [
        [
          "Backend adapter interface",
          "A single internal contract that every backend implements, so MAX, vLLM or a third-party engine can be plugged in.",
        ],
        [
          "Backend router",
          "Selects the backend for each model on each piece of hardware: MAX by default, vLLM when MAX does not support the combination, with a manual override for operators.",
        ],
        [
          "Unified inference API",
          "One OpenAI-compatible API that every module calls, whichever backend serves the request.",
        ],
        [
          "Hardware discovery",
          "Detects the accelerators, CPUs and memory available on each server and reports what they can run.",
        ],
        [
          "Model registry",
          "Records which models are available, which backends can run them and on which hardware.",
        ],
        [
          "Model provisioning",
          "Downloads and prepares models in connected environments, and loads pre-packaged models on air-gapped systems.",
        ],
      ],
    },
    {
      kind: "cells",
      highlight: 0,
      eyebrow: "Backends",
      title: "One default, one fallback",
      intro:
        "MAX remains the default wherever it supports the model and the hardware. vLLM is a fallback, not a co-equal backend.",
      items: [
        {
          title: "Primary: Modular MAX and Mojo",
          body: "A model compiler, runtime and serving layer designed to run AI workloads across different processors from one codebase. This is what makes hardware-agnostic inference practical.",
        },
        {
          title: "Secondary: vLLM, for coverage",
          body: "Serves models or hardware that MAX does not yet support, behind the same adapter interface.",
        },
        {
          title: "Secondary: vLLM, for comparison",
          body: "Lets CarbnBenchmarks measure MAX and vLLM side by side on your own hardware.",
        },
      ],
    },
  ],
};

const benchmarks: Product = {
  slug: "carbn-benchmarks",
  featureHighlight: 3,
  name: "CarbnBenchmarks",
  kind: "Module",
  stage: "In design · flagship module",
  summary:
    "Measures which open models run well on your hardware, so you can choose with evidence before you commit.",
  lede: "A hardware benchmarking tool that measures how well models run on your setup, before you commit.",
  what: [
    "CarbnBenchmarks measures how well open models perform on a given hardware setup, helping teams pick the right models for their servers before committing to a deployment.",
    "It answers the first question every organisation has: which models should we run on the hardware we own? It runs different models on different hardware at the same time, so results are comparable under the same conditions.",
    "The models a team validates in CarbnBenchmarks are the models it then serves through CarbnChat, CarbnWorkflows and Carbn Connect.",
  ],
  featuresTitle: "Know how a model will perform before you deploy it",
  featuresIntro: "Evidence a platform lead can take to leadership.",
  features: [
    {
      title: "Benchmark runs",
      body: "Measure throughput and latency for a model on your actual hardware.",
    },
    {
      title: "Model comparisons",
      body: "Compare the same model on different hardware, and different models on the same hardware.",
    },
    {
      title: "Backend comparisons",
      body: "Compare MAX and vLLM on the same hardware, under the same conditions.",
    },
    {
      title: "Ranked recommendations",
      body: "See which models fit your available accelerators, CPUs and memory, and for which kind of workload.",
    },
    {
      title: "Fully self-hosted",
      body: "Benchmarks run locally, with no data or results sent externally.",
    },
    {
      title: "Open source",
      body: "Will be free to self-host, inspect and contribute to.",
    },
  ],
  sections: [
    {
      kind: "steps",
      eyebrow: "How a benchmark runs",
      title: "Six steps from hardware to decision",
      items: [
        {
          title: "Discover",
          body: "CarbnEngine reports the hardware available on each connected server.",
        },
        {
          title: "Select",
          body: "Choose the models, the backends and the servers to test.",
        },
        {
          title: "Define",
          body: "Set the test conditions: prompt sets, input and output lengths, and concurrency levels.",
        },
        {
          title: "Run",
          body: "Every combination runs at the same time across the selected servers.",
        },
        {
          title: "Compare",
          body: "Results appear side by side, by model, by hardware and by backend.",
        },
        {
          title: "Export",
          body: "Save the results as a report for capacity planning and procurement decisions.",
        },
      ],
    },
    {
      kind: "measures",
      eyebrow: "What it measures",
      title: "More than the average",
      columns: ["Measure", "What it tells the team"],
      rows: [
        [
          "Throughput (tokens per second)",
          "How much work the hardware can do with a given model.",
        ],
        ["Time to first token", "How quickly a user sees the response begin."],
        [
          "Latency distribution",
          "How consistent response times are, not only the average.",
        ],
        [
          "Concurrency limit",
          "How many simultaneous users or requests the setup sustains before quality of service drops.",
        ],
        [
          "Memory and accelerator memory use",
          "Whether a model fits, and how much headroom remains.",
        ],
        [
          "Hardware utilisation",
          "How fully the accelerators and CPUs are used.",
        ],
        [
          "Power draw, where the hardware reports it",
          "What each model draws on each setup.",
        ],
      ],
    },
  ],
};

const chat: Product = {
  slug: "carbn-chat",
  featureHighlight: 5,
  name: "CarbnChat",
  kind: "Module",
  stage: "In design",
  summary:
    "A chat interface built to the standard of the leading AI assistants, with every conversation stored on your servers.",
  lede: "A chat interface with feature parity to major AI vendors, running entirely on your own servers.",
  what: [
    "CarbnChat is an open-source chat interface built on CarbnEngine, giving your team the chat experience they already expect: multi-turn conversations, saved history and file uploads, all without data leaving your infrastructure.",
    "Rendering and document generation are a primary focus of the whole product. A user moving from a hosted assistant to CarbnChat should find nothing missing and nothing rougher.",
    "CarbnChat is built on assistant-ui, an MIT-licensed React library for AI chat, so Carbn owns every component. All conversation history is stored on your servers, never in a hosted service.",
  ],
  featuresTitle: "The chat experience your team expects, kept on your servers",
  featuresIntro:
    "Everything a hosted assistant does, with nothing leaving the network.",
  features: [
    {
      title: "Familiar chat UX",
      body: "Feature parity with major hosted AI chat vendors.",
    },
    {
      title: "Saved history",
      body: "Conversations persist and are searchable across sessions.",
    },
    {
      title: "File uploads",
      body: "Attach files and documents to a conversation. They are processed on your servers.",
    },
    {
      title: "Model selection",
      body: "Choose from the models available on CarbnEngine.",
    },
    {
      title: "Reasoning and tools",
      body: "See the model's reasoning where it produces it, and approve tool calls before sensitive actions run.",
    },
    {
      title: "Private by default",
      body: "No conversation data ever leaves your infrastructure.",
    },
  ],
  sections: [
    {
      kind: "rendering",
      eyebrow: "Rendering standard",
      title:
        "Every output renders correctly, while it streams and when it is done",
      columns: ["Content", "Rendering requirement"],
      rows: [
        [
          "Text and markdown",
          "Headings, lists, emphasis and links rendered cleanly while streaming, with no broken formatting mid-response.",
        ],
        ["Code", "Syntax highlighting, language labels and one-click copy."],
        ["Tables", "Clean, readable tables that handle wide content."],
        ["Mathematics", "Correctly typeset formulas."],
        ["Diagrams", "Diagrams described in text rendered as visuals."],
        ["Reasoning", "Shown separately from the answer, and collapsible."],
        ["Tool activity", "Which tool ran, its input and its result."],
        [
          "Generated documents",
          "Inline preview, with download in the file's native format.",
        ],
      ],
    },
    {
      kind: "cells",
      eyebrow: "Document generation",
      title: "Finished deliverables, not text describing them",
      intro:
        "Each generated file can be previewed in the chat and downloaded in its native format. Generation runs entirely on your servers.",
      items: [
        {
          title: "Reports and documents",
          body: "Structured, formatted documents ready to share.",
        },
        {
          title: "Presentations",
          body: "Slide decks generated from the conversation.",
        },
        {
          title: "Spreadsheets",
          body: "Tables and data in a native spreadsheet format.",
        },
        {
          title: "PDF files",
          body: "Fixed-layout documents for distribution and records.",
        },
      ],
    },
  ],
};

const workflows: Product = {
  slug: "carbn-workflows",
  featureHighlight: 4,
  name: "CarbnWorkflows",
  kind: "Module",
  stage: "In design",
  summary:
    "A visual builder that chains models, tools and logic into automated flows that run on your servers.",
  lede: "A visual workflow builder that chains models, tools and logic into automated flows, never leaving your infrastructure.",
  what: [
    "CarbnWorkflows is a visual workflow builder, in the spirit of n8n, that lets you chain models, tools and logic into automated flows. It runs entirely on your own servers, so workflows, and the data that passes through them, never leave your infrastructure.",
    "Built on CarbnEngine, it will be free to self-host on its own, or as part of the integrated CarbnPlatform.",
  ],
  featuresTitle:
    "Automate multi-step AI work without leaving your infrastructure",
  featuresIntro:
    "Build and change flows on a canvas instead of writing and maintaining scripts.",
  features: [
    {
      title: "Visual builder",
      body: "Drag-and-drop nodes to design automated flows, no code required.",
    },
    {
      title: "Model and tool chaining",
      body: "Combine multiple models and tools into a single automated pipeline.",
    },
    {
      title: "Fully self-hosted",
      body: "Every workflow run stays on your own servers.",
    },
    {
      title: "Runs on CarbnEngine",
      body: "Powered by the same inference engine as every other Carbn module.",
    },
    {
      title: "Data stays private",
      body: "No workflow data is ever sent to an external service.",
    },
    {
      title: "Open source",
      body: "Will be free to self-host, inspect and contribute to.",
    },
  ],
  sections: [
    {
      kind: "cells",
      highlight: 0,
      eyebrow: "Building blocks",
      title: "What a workflow is made of",
      items: [
        {
          title: "Models",
          body: "Steps that call a model served by CarbnEngine, such as classifying, summarising, extracting or drafting.",
        },
        {
          title: "Tools",
          body: "Steps that act on data or systems, such as reading a file or calling an internal service.",
        },
        {
          title: "Logic",
          body: "Conditions, branches and loops that decide what happens next based on earlier results.",
        },
      ],
    },
    {
      kind: "cells",
      highlight: 0,
      eyebrow: "Why it matters",
      title: "Automation without exposure",
      items: [
        {
          title: "No external AI calls",
          body: "Every model call in a workflow is served by CarbnEngine inside the network, so automated flows never send data to an external AI service.",
        },
        {
          title: "Visual and accessible",
          body: "Teams build and change flows on a canvas rather than writing and maintaining scripts.",
        },
        {
          title: "Shared foundation",
          body: "Workflows use the same models and engine as CarbnChat and Carbn Connect, so a model validated once in CarbnBenchmarks serves every part of the product.",
        },
      ],
    },
  ],
};

const connect: Product = {
  slug: "carbn-connect",
  featureHighlight: 6,
  name: "Carbn Connect",
  kind: "Module",
  stage: "In design",
  summary:
    "AI teammates: bots that are given a job, work in real applications and come back with finished work.",
  lede: "AI teammates that work in your applications and return finished work, on open models inside your network.",
  what: [
    "Carbn Connect gives an organisation AI teammates: bots that are given a job, work in real applications and come back with finished work.",
    "Its bots run on open models served by CarbnEngine inside your network. The teammates, the work they do and everything they see stay on infrastructure you own.",
    "How well a bot completes multi-step work depends on the agentic ability of the available open models. Model choice for Carbn Connect is validated in CarbnBenchmarks against real tasks, not only against speed.",
  ],
  featuresTitle: "Teammates you can read, teach and approve",
  featuresIntro: "Eight capabilities, all running on infrastructure you own.",
  features: [
    {
      title: "Bots with a job",
      body: "Each bot has a defined role, such as handling invoices, research or inbox triage.",
    },
    {
      title: "Work in real applications",
      body: "A bot uses applications the way a person does, including tools that are hard to automate through an API.",
    },
    {
      title: "Parallel work and handoffs",
      body: "Several bots work at once and pass work to each other.",
    },
    {
      title: "Teach mode",
      body: "Perform a task once while Carbn Connect records it, and the bot turns it into a reusable skill.",
    },
    {
      title: "Readable memory",
      body: "Each bot keeps context in a memory you can read and edit.",
    },
    { title: "Routines", body: "Bots run recurring work on a schedule." },
    {
      title: "Approval before action",
      body: "A bot drafts, then waits for a person to approve anything consequential before it is sent or committed.",
    },
    {
      title: "Messaging access",
      body: "Assign and follow work by messaging your bots, not only through the Carbn interface.",
    },
  ],
  sections: [],
};

export const engineProduct = engine;
export const modules: Product[] = [benchmarks, chat, workflows, connect];
export const products: Product[] = [engine, ...modules];

export function getProduct(slug: ProductSlug): Product {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
}

export function productHref(slug: ProductSlug) {
  return `/products/${slug}`;
}
