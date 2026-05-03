---
status: proposed
date: 2026-05-03
---

# Adopt unified formatting across the corpus

## Context and problem statement

ADRs 0001–0008 establish the corpus, its decomposition, its artefact types, the principle for auxiliary content, and the integrity and discipline properties governing it.
The corpus needs a *medium*: a single text format used for every artefact, so the rest of the system can rely on consistent properties.

A reader, a reviewer, an indexer, an agent grounding on the corpus, and a tool checking for compliance all consume the same artefacts.
If different artefact types use different formats, every consumer has to handle several — multiplying parsers, validators, renderers, and review workflows.
A single unified format collapses this to one.

The properties the format must support cascade from the rest of the system:

* The corpus is reviewed and inspected through diffs (per ADR-0007's verifiable property and ADR-0008's transition criteria).
  A format whose changes do not produce meaningful line-level diffs makes review and historical inspection opaque.
* The corpus is read by humans in the same form it is reviewed and stored (no separate "rendered" canonical version that diverges from the source).
* The corpus is parsed by tooling and by agents grounding on it.
* The corpus is rendered for browsing across many environments without per-environment configuration.

These properties are checkable against any candidate format.
The choice of format is then operationalised in a cascading standard.

What format does the corpus use?

## Decision drivers

* **Diff-friendliness is load-bearing.**
  The reviewed-integration discipline (cascading from ADR-0008) and the verifiability of the historical record (ADR-0007) both depend on changes being inspectable as line-level diffs.
  A format that diffs poorly makes the rest of the system fail to deliver its promised properties.
* The raw form of an artefact must be human-readable, so reviewers and agents work on the same artefact rather than on a rendered projection of it.
* The format must be parseable by tooling and agents without bespoke per-format adapters.
* The format must render in the environments where the corpus is read (forge UIs, editors, command-line tools) without per-environment configuration.
* The format must support structured metadata (frontmatter), so the per-type frontmatter schemas defined by the content standards work.

## Considered options

* **Per-type formats** — each artefact type uses whatever format suits it best; multiplies tooling and review workflows.
* **Plain text** without structure — diff-friendly and parseable but lacks frontmatter and rendering.
* **Markdown** with project-specific conventions — diff-friendly, source-readable, parseable, universally renderable, frontmatter-capable.
* **reStructuredText** — similar properties to Markdown; smaller ecosystem outside Python.
* **AsciiDoc** — similar properties to Markdown; smaller ecosystem; richer feature set.
* **Custom DSL** — fully tailored to the project; requires bespoke tooling.

## Decision outcome

Adopt a **unified text format** across the entire corpus.
Every artefact (decisions, standards, runbooks, and the auxiliary content the co-location principle places alongside them) uses the same format.

The format must satisfy four properties:

* **Diff-friendly** — changes are visible at the line level, so reviewers and historical inspection produce meaningful diffs.
  This is the load-bearing property: the reviewed-integration discipline and the verifiability of the record both depend on it.
* **Source-readable** — the raw form is human-readable without rendering, so the artefact under review is the artefact under discussion.
* **Machine-parseable** — structure (headings, frontmatter, links, lists) is extractable by tooling without custom parsers, so indexing, cross-reference checking, and agent grounding work without per-format adapters.
* **Universally renderable** — the format renders in forge UIs, editors, and command-line tools without special configuration, so the corpus is discoverable wherever readers encounter it.

The specific format chosen, and the project-specific conventions on top of it (heading style, line wrapping, list and link conventions), are operationalised in a cascading standard.

## Consequences

* Every artefact in the corpus uses the same format.
  An artefact in a different format is a discipline violation.
* The diff-friendly property has consequences for the project-specific conventions: the cascading standard adopts conventions (sentence-case headings, one-sentence-per-line wrapping) that operationalise diff-friendliness explicitly.
  These conventions exist *because* of this ADR; they are not aesthetic preferences.
* The medium choice is the most superseding-friendly decision in the foundation.
  A future project that re-renders the corpus in a different format supersedes this ADR alone; the rest of the foundation (artefact types, integrity, discipline) is unaffected.
* The corpus is one of the cheaper systems to maintain: one format, one set of tools, one review workflow.
* Per-environment rendering quirks (e.g., differences between forge UIs) are bounded because the format is universal; project-specific conventions add another level of consistency.

## More information

* The specific format adoption (Markdown) and project-specific conventions are operationalised in a cascading formatting standard.
* The frontmatter conventions, while supported by the format, are owned per-type by each artefact-type's content standard (per ADR-0006's co-location principle).
