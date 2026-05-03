# Overview

A single-page view of the template's design.
For details, read the individual ADRs in `docs/decisions/` in numerical order.

## What this template is

A minimal foundation for managing durable normative knowledge in any software project.
It is opinionated about *structure* (three artefact types, MADR conventions, Markdown with diff-friendly rules, Git plus reviewed integration plus a single work-tracking substrate, signed-tag acceptance) and unopinionated about *content* (every project's decisions, standards, runbooks, choice of work-tracking tool, and choice of integration mechanism are its own).

The template ships its foundation at the bottom of the lifecycle — every decision is `proposed`, every standard is `draft`, every runbook is `draft` — so adopting projects can read, decide, and accept (or supersede) deliberately.

## Scope of the inventories below

The tables in this document describe the **foundational set as shipped by the template**.
They are intentionally a fixed snapshot.

For the **current state** of the corpus in your project — including any project-specific decisions, standards, and runbooks added after acceptance — refer to the auto-generated indexes in each folder's README:

* `docs/decisions/README.md` — current ADRs.
* `docs/standards/README.md` — current standards.
* `docs/runbooks/README.md` — current runbooks.

The folder READMEs are regenerated from frontmatter by `npm run docs:index` and are the single source of truth for *what exists now*.
This document is the source of truth for *what the foundational set establishes*.

## Decisions in the template

| ID | Title | What it establishes |
| -- | ----- | ------------------- |
| 0001 | Adopt decisions as the founding artefact type | The recording practice; self-referential founding ADR. |
| 0002 | Adopt a durable normative knowledge corpus | The corpus's five properties: durable, normative, versioned, queryable, composable. |
| 0003 | Decompose knowledge into why / what / how | The three-layer model. |
| 0004 | Adopt a standards artefact for the what | First-class standards artefact type. |
| 0005 | Adopt a runbooks artefact for the how | First-class runbooks artefact type, with the `draft → active` execution gate. |
| 0006 | Co-locate auxiliary documentation | Auxiliary content lives next to what it describes. |
| 0007 | Adopt historical integrity | Three static properties of the record: verifiable, provenanced, identified. |
| 0008 | Adopt explicit transition discipline | Two dynamic properties of state changes: explicit criteria, attestation. |
| 0009 | Adopt unified formatting across the corpus | Four properties any candidate format must satisfy: diff-friendly, source-readable, machine-parseable, universally renderable. |

These nine decisions form a coherent foundation.
Reading them top to bottom is the derivation: *we record decisions → in a corpus → with three layers → standards exist → runbooks exist → auxiliary content co-locates → the record has integrity → transitions have discipline → the corpus is uniformly formatted.*

## Standards in the template

| Standard | Derives from | What it covers |
| -------- | ------------- | -------------- |
| `decision-content` | 0001 | Adopts MADR; ADR frontmatter, filename, folder; AC1-AC15 authoring rules including the editorial/substantive edit exception. |
| `standard-content` | 0004 | Standard frontmatter (incl. `derives_from`); FC1-FC4 format rules (incl. role-based naming); SC1-SC15 authoring rules. |
| `runbook-content` | 0005 | Runbook frontmatter (incl. `last-tested`); FR1-FR4 format rules; RC1-RC13 authoring rules. |
| `unified-formatting` | 0009 | Adopts CommonMark Markdown; H1-H5, list, emphasis, code, link, table, line-wrapping, frontmatter, and marker rules. |
| `versioning-substrate` | 0007 | Adopts Git as the substrate satisfying the historical-integrity properties; VS1-VS6 substrate rules; BM1-BM3 branch model. |
| `commit-discipline` | 0007 | Adopts Conventional Commits; CM1-CM11 commit messages; CH1-CH4 hygiene; CS1-CS3 commit-signing attestation. |
| `integration-discipline` | 0008 | BR1-BR3 branch naming; IR1-IR7 integration requests; IE1-IE4 enforcement; IA1-IA4 integration attestation. |
| `work-tracking` | 0007, 0008 | WT1-WT19 covering substrate discipline, work-item types (discovery / implementation / coordination), lifecycle (`triage → backlog → ready → doing → in-review → done` + `cancelled`), abstract per-type flows, parent/child rules, project-fill-in placeholders. |
| `acceptance-attestation` | 0008 | Adopts signed Git tags; AA1-AA6 covering signature, naming, message, immutability, supersession. |
| `definition-of-done` | 0008 | DO1-DO8 work-item completion criteria; DA1-DA2 completion attestation. |

Each standard is named for its **role**, not the contents it lists or the specific instance it adopts (per FC4 in `standard-content.md`).

## Runbooks in the template

| Runbook | Derives from | What it covers |
| ------- | ------------- | -------------- |
| `contributing` | 0001, 0007, 0008 | Adding or changing artefacts; initial setup. |
| `adopt-this-template` | 0008, `acceptance-attestation` | The acceptance ceremony for adopting projects. |
| `spike-cascade-handling` | 0001, `decision-content` | Classifying findings that surface during a spike. |
| `develop-a-feature` | `work-tracking` | The feature implementation flow. |
| `fix-a-bug` | `work-tracking` | The bug-fix flow. |
| `execute-a-spike` | `work-tracking` | The discovery flow. |
| `review-an-integration-request` | `integration-discipline` | The reviewer's procedure and attestation. |
| `land-a-release` | `work-tracking` | The release cut-and-deploy flow. |
| `respond-to-an-incident` | `work-tracking` | The incident response flow including postmortem creation. |

All runbooks ship as `draft` with no `last-tested`.
Adopting projects execute them and update `last-tested` per RC6.

## Numbering and supersession

ADRs in the template use numbers `0001`–`0009`.
A project starting from this template numbers its own ADRs from `0010` onwards.

If a project supersedes a template ADR, the new ADR carries a number in the project's range (`0010+`) and the superseded template ADR is marked accordingly via the `superseded_by` frontmatter field (per AC10 in `decision-content.md`).

## Implementation cascade

The template ships:

* `markdownlint-cli2` with `.markdownlint-cli2.jsonc` enforces `unified-formatting.md` rules.
* Two custom rules (`markdownlint-rule-title-case-style`, `markdownlint-rule-max-one-sentence-per-line`) implement sentence-case headings and one-sentence-per-line wrapping.
* `tools/generate-indexes.mjs` regenerates per-folder indexes and per-artefact cascade blockquotes from frontmatter.
* Husky activates a `pre-commit` hook (`npx lint-staged` and `npm run docs:check`) and a `commit-msg` hook (`commitlint`).
* `commitlint.config.cjs` implements `commit-discipline.md` with the Conventional Commits base, project type catalogue, and project-specific subject-case and AI-co-author rules.

Adopting projects run the same validation locally and at their chosen integration gate.

## Acceptance ceremony

The template's foundational set is `proposed`/`draft` until the adopting project signs an acceptance tag.
The procedure is in `docs/runbooks/adopt-this-template.md`; the standard is `docs/standards/acceptance-attestation.md`.

The template author's own first acceptance of this template (signing `accept-foundational-set-v1` against the template's own commit) is the template's first end-to-end execution of the acceptance ceremony.

## What is not in the template

Things deliberately omitted because they are project-specific:

* The choice of work-tracking tool and its templates, label taxonomies, and lifecycle conventions beyond the abstract minimum.
* Forge- or CI-specific integration-gate implementation.
* Severity classifications, response-time SLAs, on-call rotations, deploy mechanisms.
* Project-specific frontmatter fields beyond the universal ones.

These are layered on by individual projects as they need them.
