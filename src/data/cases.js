// Sample report content per case. Illustrative only; every report is labelled SAMPLE on the page.
export const CASES = [
  {
    id: "pipeline",
    label: "Pipeline",
    angle: -60,
    title: "Sample: build pipeline and SBOM assessment",
    scope: "Sealed copy of CI/CD, runners, registries and secrets",
    findings: [
      ["Deploy token readable by pull-request jobs", "Critical"],
      ["Third-party CI actions not pinned", "High"],
      ["No provenance check at deploy", "High"],
      ["SBOM missing for two of five services", "Medium"],
    ],
    mapsTo: "Your customer's security questionnaire · SBOM and AI BOM · SLSA build levels",
  },
  {
    id: "ai",
    label: "AI & KYC",
    angle: 0,
    title: "Sample: KYC onboarding agent, AI red team",
    scope: "Sealed copy of the model, agent tools and video KYC flow",
    findings: [
      ["Deepfake video passed liveness check", "Critical"],
      ["Hindi-English prompt bypassed refusal policy", "High"],
      ["Customer data returned through retrieval", "High"],
      ["Agent called a payment tool without approval", "Medium"],
    ],
    mapsTo: "RBI FREE-AI framework · SEBI CSCRF · DPDP Act · OWASP LLM and Agentic Top 10",
  },
  {
    id: "grid",
    label: "Grid",
    angle: 60,
    title: "Sample: BESS controller firmware, isolated bench",
    scope: "Controller and firmware on an isolated bench, never a live plant",
    findings: [
      ["Undocumented remote-maintenance service enabled", "Critical"],
      ["Firmware update accepted without a signature check", "High"],
      ["Default credentials on the local HMI", "High"],
      ["No bill of materials for third-party firmware", "Medium"],
    ],
    mapsTo: "CEA Cyber Security in Power Sector Regulations, 2026 · CERT-In BOM format",
  },
];
