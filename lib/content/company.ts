import type { Item } from "./products";

export const mission =
  "Carbn gives every organisation a complete AI capability on the hardware it already owns, so its data never has to leave the building and its team never has to assemble AI from parts.";

export const positioning =
  "Inference clouds rent out someone else's hardware and open-source runtimes hand over parts. Carbn is the whole machine.";

export type Layer = {
  id: string;
  name: string;
  role: string;
  distribution: string;
  href?: string;
};

/** The Carbn architecture, from the customer's hardware up. */
export const layers: Layer[] = [
  {
    id: "hardware",
    name: "Your hardware",
    role: "The servers, accelerators, CPUs and memory your organisation already owns.",
    distribution: "Owned by you",
  },
  {
    id: "engine",
    name: "CarbnEngine",
    role: "Runs models on that hardware through MAX (primary) or vLLM (secondary), and serves every module through one interface.",
    distribution: "Open source",
    href: "/products/carbn-engine",
  },
  {
    id: "modules",
    name: "Modules",
    role: "CarbnBenchmarks, CarbnChat, CarbnWorkflows and Carbn Connect, with more planned. Each in its own repository, released on its own.",
    distribution: "Open source",
    href: "/products#modules",
  },
  {
    id: "addons",
    name: "Add-ons",
    role: "Optional native extensions, such as the agent control surface. Built and shipped separately so they never dilute the core.",
    distribution: "Planned",
    href: "/products#add-ons",
  },
  {
    id: "platform",
    name: "CarbnPlatform",
    role: "Every module combined into one managed product, with SSO and teams, integrations, dashboards and model management.",
    distribution: "Paid",
    href: "/platform",
  },
];

export const options = [
  {
    name: "Hosted AI vendors",
    provides: "A complete, polished experience: chat, files, integrations.",
    gap: "Data leaves the network, and cost scales with every token.",
  },
  {
    name: "Inference clouds",
    provides: "Access to open models on rented hardware.",
    gap: "The hardware and the data path still belong to someone else.",
  },
  {
    name: "Open-source runtimes and tools",
    provides:
      "The individual parts: an engine, a chat interface, a workflow tool.",
    gap: "The organisation must assemble, integrate, secure and maintain the parts itself.",
  },
];

export const whyOnPrem: Item[] = [
  {
    title: "Full data privacy",
    body: "Your data never leaves your servers. No third-party APIs, no external cloud dependency.",
  },
  {
    title: "Hardware control",
    body: "Run local, open models on the hardware you already have: accelerators, CPUs or memory-constrained setups.",
  },
  {
    title: "No per-token cost",
    body: "Deploy on infrastructure you already own and skip the recurring per-token bill.",
  },
  {
    title: "One complete system",
    body: "From a single engine to a full enterprise platform: what you expect from a hosted AI vendor, self-hosted.",
  },
];

export const scope: { does: string; doesNot: string }[] = [
  { does: "Run inference on open models", doesNot: "Train models" },
  {
    does: "Run on hardware you already own",
    doesNot: "Supply or rent hardware",
  },
  {
    does: "Run on your network, including air-gapped sites",
    doesNot: "Operate as a hosted inference service",
  },
  {
    does: "Build on MAX as released by Modular",
    doesNot: "Modify or redistribute MAX source code",
  },
];

export const principles: Item[] = [
  {
    title: "Data stays on your network",
    body: "No part of Carbn requires sending prompts, files or outputs to an external service.",
  },
  {
    title: "Hardware-agnostic by design",
    body: "The same models should run efficiently across different server setups, whatever mix of accelerators, CPUs and memory you own.",
  },
  {
    title: "Works fully offline",
    body: "Air-gapped sites with no internet access are a supported deployment, not an exception.",
  },
  {
    title: "One system, not parts",
    body: "Every module works on its own, and together they form one integrated product.",
  },
  {
    title: "Open where it builds trust",
    body: "The engine and the modules are open source so teams can inspect, self-host and adopt them freely.",
  },
  {
    title: "Clear about limits",
    body: "Carbn states plainly what it does and does not do. It runs inference. It does not train models.",
  },
];

export const priorities: Item[] = [
  {
    title: "CarbnEngine comes first",
    body: "If inference is not stable, efficient and portable across hardware, nothing built on top of it matters.",
  },
  {
    title: "Experience quality comes second",
    body: "Chat rendering and document generation must match the standard users already know from the leading AI vendors.",
  },
  {
    title: "Modules extend the core",
    body: "Each module solves a distinct problem and runs on CarbnEngine by default.",
  },
  {
    title: "Add-ons never dilute the core",
    body: "Plugins and add-ons are built and shipped separately, so they cannot lower the quality of the engine or the core experience.",
  },
];

export const buildSequence: Item[] = [
  {
    title: "CarbnEngine core",
    body: "Backend adapter interface, unified inference API, hardware discovery, model registry and provisioning, with MAX as the first backend.",
  },
  {
    title: "CarbnBenchmarks",
    body: "The flagship module, and the tool used to validate every later stage.",
  },
  {
    title: "vLLM backend and routing",
    body: "vLLM behind the same adapter interface, with the backend router. MAX and vLLM can then be compared on the same hardware.",
  },
  {
    title: "CarbnChat",
    body: "The chat interface, with the full rendering standard and document generation.",
  },
  {
    title: "CarbnWorkflows",
    body: "The visual workflow builder, on the same engine and models.",
  },
  {
    title: "Carbn Connect",
    body: "AI teammates, using models validated for agentic work in CarbnBenchmarks.",
  },
  {
    title: "CarbnPlatform",
    body: "The modules combined into one product, with SSO and teams, integrations, dashboards, setup interface and model picker.",
  },
  {
    title: "Add-ons",
    body: "The agent control surface and later add-ons, built separately from the core.",
  },
];
