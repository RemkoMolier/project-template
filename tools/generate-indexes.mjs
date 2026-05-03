#!/usr/bin/env node

// Index and cascade generator.
//
// Derives from: docs/standards/decision-content.md (DC2),
//                docs/standards/standard-content.md (FC2, FC3),
//                docs/standards/runbook-content.md (FR2, FR3).
//
// Two responsibilities:
// 1. Regenerate the per-folder README index between BEGIN-INDEX / END-INDEX
//    markers.
// 2. Regenerate the per-artefact upstream-reference block between
//    BEGIN-DERIVATION / END-DERIVATION markers (standards and runbooks).

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

const types = {
  decisions: {
    dir: "docs/decisions",
    files: /^\d{4}-.+\.md$/,
    required: ["status", "date"],
    dates: ["date"],
    statuses: ["proposed", "accepted", "superseded", "deprecated", "rejected"],
    columns: ["ID", "Title", "Status", "Date"],
    intro: "*This index is auto-generated from each decision's frontmatter.\nDo not edit by hand.*"
  },
  standards: {
    dir: "docs/standards",
    files: /^(?!(?:README|template)\.md$).+\.md$/,
    required: ["status", "last-reviewed", "review-cycle", "derives_from"],
    dates: ["last-reviewed"],
    statuses: ["draft", "active", "deprecated"],
    reviewCycles: ["quarterly", "semi-annually", "annually"],
    columns: ["ID", "Title", "Status", "Derives from", "Last reviewed", "Review cycle"],
    intro: "*This index is auto-generated from each standard's frontmatter.\nDo not edit by hand.*"
  },
  runbooks: {
    dir: "docs/runbooks",
    files: /^(?!(?:README|template)\.md$).+\.md$/,
    required: ["status", "last-reviewed", "review-cycle", "derives_from"],
    dates: ["last-reviewed", "last-tested"],
    statuses: ["draft", "active", "deprecated"],
    reviewCycles: ["quarterly", "semi-annually", "annually"],
    columns: ["ID", "Title", "Status", "Derives from", "Last reviewed", "Last tested"],
    intro: "*This index is auto-generated from each runbook's frontmatter.\nDo not edit by hand.*"
  }
};

function readDocument(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^---\n(?<frontmatter>.*?)\n---\n/s);

  if (!match?.groups?.frontmatter) {
    throw new Error(`${path.relative(root, filePath)}: missing YAML frontmatter`);
  }

  const title = content.match(/^#\s+(?<title>.+)$/m)?.groups?.title;

  if (!title) {
    throw new Error(`${path.relative(root, filePath)}: missing H1 title`);
  }

  return {
    content,
    frontmatter: yaml.parse(match.groups.frontmatter) ?? {},
    title
  };
}

function normalise(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (Array.isArray(value)) {
    return value.map(String);
  }

  return String(value ?? "");
}

function isDateOnly(value) {
  if (value instanceof Date) {
    return !Number.isNaN(value.valueOf()) && value.toISOString().endsWith("T00:00:00.000Z");
  }

  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function discoverDecisionIdentifiers() {
  const dir = path.join(root, "docs/decisions");
  const ids = new Set();

  for (const name of fs.readdirSync(dir)) {
    if (/^\d{4}-.+\.md$/.test(name)) {
      ids.add(name.slice(0, 4));
    }
  }

  return ids;
}

function discoverStandardIdentifiers() {
  const dir = path.join(root, "docs/standards");
  const ids = new Set();

  for (const name of fs.readdirSync(dir)) {
    if (/^(?!(?:README|template)\.md$).+\.md$/.test(name)) {
      ids.add(name.slice(0, -3));
    }
  }

  return ids;
}

function discoverDecisionTitles() {
  const dir = path.join(root, "docs/decisions");
  const titles = new Map();

  for (const name of fs.readdirSync(dir)) {
    if (/^\d{4}-.+\.md$/.test(name)) {
      try {
        const { title } = readDocument(path.join(dir, name));

        titles.set(name.slice(0, 4), { filename: name, title });
      } catch {
        // Skip on parse errors; validation reports them elsewhere.
      }
    }
  }

  return titles;
}

function discoverStandardTitles() {
  const dir = path.join(root, "docs/standards");
  const titles = new Map();

  for (const name of fs.readdirSync(dir)) {
    if (/^(?!(?:README|template)\.md$).+\.md$/.test(name)) {
      try {
        const { title } = readDocument(path.join(dir, name));

        titles.set(name.slice(0, -3), { filename: name, title });
      } catch {
        // Skip on parse errors; validation reports them elsewhere.
      }
    }
  }

  return titles;
}

function validateFrontmatter(relativePath, frontmatter, config, knownDecisions, knownStandards) {
  const errors = [];

  for (const field of config.required) {
    const value = frontmatter[field];

    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
      errors.push(`${relativePath}: missing required frontmatter field ${field}`);
    }
  }

  if (!config.statuses.includes(String(frontmatter.status))) {
    errors.push(`${relativePath}: invalid status ${JSON.stringify(frontmatter.status)}`);
  }

  for (const field of config.dates ?? []) {
    if (
      frontmatter[field] !== undefined &&
      frontmatter[field] !== null &&
      frontmatter[field] !== "" &&
      !isDateOnly(frontmatter[field])
    ) {
      errors.push(`${relativePath}: invalid ${field} ${JSON.stringify(frontmatter[field])}; expected YYYY-MM-DD`);
    }
  }

  if (config.reviewCycles && !config.reviewCycles.includes(String(frontmatter["review-cycle"]))) {
    errors.push(`${relativePath}: invalid review-cycle ${JSON.stringify(frontmatter["review-cycle"])}`);
  }

  if (relativePath.startsWith("docs/runbooks/") && frontmatter.status === "active" && !frontmatter["last-tested"]) {
    errors.push(`${relativePath}: active runbooks require last-tested (per RC6)`);
  }

  if (relativePath.startsWith("docs/runbooks/") && frontmatter.status === "draft" && frontmatter["last-tested"]) {
    errors.push(`${relativePath}: draft runbooks must not carry last-tested (per RC6)`);
  }

  if (config.required.includes("derives_from") && Array.isArray(frontmatter.derives_from)) {
    for (const ref of frontmatter.derives_from) {
      const refStr = String(ref);

      if (/^\d{4}$/.test(refStr)) {
        if (!knownDecisions.has(refStr)) {
          errors.push(`${relativePath}: derives_from references unknown decision ${refStr}`);
        }
      } else if (relativePath.startsWith("docs/runbooks/")) {
        if (!knownStandards.has(refStr) && !knownDecisions.has(refStr)) {
          errors.push(`${relativePath}: derives_from references unknown decision or standard ${JSON.stringify(refStr)}`);
        }
      } else {
        errors.push(`${relativePath}: derives_from must be four-digit decision identifiers (got ${JSON.stringify(refStr)})`);
      }
    }
  }

  return errors;
}

function identifierFor(type, relativePath) {
  const basename = path.basename(relativePath, ".md");

  if (type === "decisions") {
    return basename.match(/^\d{4}/)?.[0];
  }

  return basename;
}

function derivationColumn(refs) {
  if (!Array.isArray(refs) || refs.length === 0) {
    return "";
  }

  return refs.map(String).join(", ");
}

function rowFor(type, relativePath, title, frontmatter) {
  const filename = path.basename(relativePath);
  const id = identifierFor(type, relativePath);

  if (type === "decisions") {
    return `| [${id}](${filename}) | ${title} | ${frontmatter.status} | ${normalise(frontmatter.date)} |`;
  }

  if (type === "standards") {
    return `| [${id}](${filename}) | ${title} | ${frontmatter.status} | ${derivationColumn(frontmatter.derives_from)} | ${normalise(frontmatter["last-reviewed"])} | ${frontmatter["review-cycle"]} |`;
  }

  return `| [${id}](${filename}) | ${title} | ${frontmatter.status} | ${derivationColumn(frontmatter.derives_from)} | ${normalise(frontmatter["last-reviewed"])} | ${normalise(frontmatter["last-tested"])} |`;
}

function buildIndex(config, rows) {
  return [
    "<!-- BEGIN-INDEX -->",
    config.intro,
    "",
    `| ${config.columns.join(" | ")} |`,
    `| ${Array(config.columns.length).fill("---").join(" | ")} |`,
    ...rows,
    "<!-- END-INDEX -->"
  ].join("\n");
}

function buildDerivationBlock(type, frontmatter, decisionTitles, standardTitles) {
  const refs = Array.isArray(frontmatter.derives_from) ? frontmatter.derives_from.map(String) : [];

  if (refs.length === 0) {
    return "<!-- BEGIN-DERIVATION -->\n<!-- END-DERIVATION -->";
  }

  const links = refs.map((ref) => {
    if (/^\d{4}$/.test(ref)) {
      const info = decisionTitles.get(ref);
      const filename = info?.filename ?? `${ref}.md`;

      return `[ADR-${ref}](../decisions/${filename})`;
    }

    const info = standardTitles.get(ref);
    const filename = info?.filename ?? `${ref}.md`;

    return `[${ref}](../standards/${filename})`;
  });

  return [
    "<!-- BEGIN-DERIVATION -->",
    "**Derives from:**",
    "",
    ...links.map((link) => `* ${link}`),
    "<!-- END-DERIVATION -->"
  ].join("\n");
}

function updateDerivationBlock(absolutePath, content, generated, errors, relativePath) {
  const derivationPattern = /<!-- BEGIN-DERIVATION -->[\s\S]*?<!-- END-DERIVATION -->/;

  if (!derivationPattern.test(content)) {
    errors.push(`${relativePath}: missing BEGIN-DERIVATION / END-DERIVATION markers`);
    return null;
  }

  const updated = content.replace(derivationPattern, generated);

  if (content === updated) {
    return null;
  }

  if (checkOnly) {
    errors.push(`${relativePath}: cascade blockquote is out of date`);
    return null;
  }

  fs.writeFileSync(absolutePath, updated);
  return relativePath;
}

const errors = [];
const changed = [];
const knownDecisions = discoverDecisionIdentifiers();
const knownStandards = discoverStandardIdentifiers();
const decisionTitles = discoverDecisionTitles();
const standardTitles = discoverStandardTitles();

for (const [type, config] of Object.entries(types)) {
  const dir = path.join(root, config.dir);
  const relativePaths = fs.readdirSync(dir)
    .filter((name) => config.files.test(name))
    .sort()
    .map((name) => path.join(config.dir, name));

  const rows = [];

  for (const relativePath of relativePaths) {
    try {
      const absolutePath = path.join(root, relativePath);
      const { content, frontmatter, title } = readDocument(absolutePath);

      errors.push(...validateFrontmatter(relativePath, frontmatter, config, knownDecisions, knownStandards));
      rows.push(rowFor(type, relativePath, title, frontmatter));

      if (type === "standards" || type === "runbooks") {
        const generated = buildDerivationBlock(type, frontmatter, decisionTitles, standardTitles);
        const result = updateDerivationBlock(absolutePath, content, generated, errors, relativePath);

        if (result) {
          changed.push(result);
        }
      }
    } catch (error) {
      errors.push(error.message);
    }
  }

  const readmePath = path.join(root, config.dir, "README.md");
  const current = fs.readFileSync(readmePath, "utf8");
  const generated = buildIndex(config, rows);
  const indexPattern = /<!-- BEGIN-INDEX -->[\s\S]*?<!-- END-INDEX -->/;

  if (!indexPattern.test(current)) {
    errors.push(`${config.dir}/README.md: missing index markers`);
    continue;
  }

  const updated = current.replace(indexPattern, generated);

  if (current === updated) {
    continue;
  }

  if (checkOnly) {
    errors.push(`${config.dir}/README.md: index is out of date`);
  } else {
    fs.writeFileSync(readmePath, updated);
    changed.push(path.join(config.dir, "README.md"));
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

if (changed.length > 0) {
  console.log(`Updated ${changed.join(", ")}`);
}
