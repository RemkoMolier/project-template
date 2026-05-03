---
status: proposed
date: 2026-05-03
---

# Adopt a durable normative knowledge corpus

## Context and problem statement

ADR-0001 establishes that significant choices are recorded as decisions.
Decisions on their own do not constitute a system: they are individual artefacts.
The system needs a *corpus* — a coherent body of normative artefacts (decisions and the artefact types established by subsequent decisions) that collectively answers questions about how the project operates and why.

A corpus is more than a folder of files.
It is a deliberate commitment to:

* **Capture**: significant rules, decisions, and procedures that govern the project are written down.
* **Curate**: artefacts have lifecycles, are reviewed, and are kept current.
* **Compose**: artefacts cross-reference each other so a reader can navigate from any starting point to related context.

Without an explicit commitment to a corpus, a project ends up with scattered artefacts: some in code comments, some in chat scrollback, some in wikis, some in tribal memory.
The artefacts may individually be useful but they do not compose into a system that a new contributor or agent can rely on.

What kind of body holds the artefacts the project needs?

## Decision drivers

* The body of artefacts must be **durable**: outlive individual contributors, tools, and tooling generations.
* The body must be **normative**: its content asserts how the project operates, not casual notes or status updates.
* The body must be **versioned**: every change to it is reviewable and reconstructable.
* The body must be **queryable** by humans and by agents: structure and metadata enable search, indexing, and grounding.
* The body must be **composable**: artefacts cross-reference each other; the corpus reads as an interconnected system, not a heap.

## Considered options

* **No corpus** — significant content lives wherever; no commitment to a coherent body.
* **A corpus of one artefact type** (decisions only) — only the *why* layer is captured; rules and procedures live elsewhere or in tribal memory.
* **A corpus of multiple artefact types**, structured to capture the kinds of normative knowledge the project needs.

## Decision outcome

Adopt a **durable normative knowledge corpus** as the home for the project's significant rules, decisions, and procedures.

The corpus has these properties:

* **Durable** — every artefact is recorded in a form that outlives individual contributors and tooling generations.
* **Normative** — every artefact in the corpus asserts something about how the project operates; casual notes and status updates do not belong.
* **Versioned** — every change is reviewable, reconstructable, and attributable.
* **Queryable** — structure and metadata enable search, indexing, and agent grounding without bespoke parsers.
* **Composable** — artefacts cross-reference each other; the corpus is read as an interconnected system.

The specific decomposition of the corpus into artefact types, the medium in which artefacts are written, the substrate that holds them, and the disciplines that govern their evolution are decided in subsequent ADRs.

## Consequences

* The corpus becomes the source of truth for normative knowledge.
  Rules, decisions, and procedures that are not captured in the corpus are not part of the system; relying on them is a discipline violation.
* The corpus must be small enough to read, navigate, and maintain.
  Growth is bounded by what is genuinely normative; reference material, examples, and discussion live elsewhere.
* The corpus is ownerless within the project: every contributor reads it, edits it through review, and is responsible for its currency.
  No "documentation team" maintains it on others' behalf.
* The commitment to durability constrains tool choice: ephemeral or vendor-locked substrates are unsuitable.
* The commitment to queryability constrains medium choice: opaque binary formats are unsuitable.

## More information

* The decomposition of the corpus into layers (rationale, current rules, procedures) is established in a separate decision.
* The medium in which the corpus is written is established in a separate decision.
* The substrate that holds the corpus and provides its versioning, identity, and integrity properties is established in a separate decision.
