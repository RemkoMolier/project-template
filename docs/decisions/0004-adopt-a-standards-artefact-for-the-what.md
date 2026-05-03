---
status: proposed
date: 2026-05-03
---

# Adopt a standards artefact for the what

## Context and problem statement

ADR-0003 establishes the three-layer decomposition of the corpus: rationale (why), current rules (what), procedures (how).
ADR-0001 establishes decisions as the artefact type for the why layer.
The artefact types for the what and how layers are not yet established.

The *what* layer captures the rules currently in force.
A rule is a declarative obligation: "commits MUST follow this format," "ADRs SHOULD use these sections," "every standard MUST cite the ADR(s) that justify it."
Rules differ from decisions in shape (declarative, not narrative) and in lifecycle (living, not immutable).
Rules differ from procedures in shape (declarative, not sequential) and in audience (those applying a rule to their own work, not those executing a specific operation).

Without a dedicated artefact type for rules, they end up scattered: in code review feedback that nobody captures, in tribal agreements newcomers cannot discover, in section-of-an-ADR formats that conflate them with rationale, or in section-of-a-runbook formats that conflate them with procedure.

What artefact type captures the rules currently in force?

## Decision drivers

* Rules need a stable home that contributors and agents can find consistently.
* Rules must be editable as they evolve, with edits reviewable like any other change to the corpus.
* Rules must cite the decisions that justify them, so a reader who questions a rule can find its rationale.
* Rules must be cite-able from other artefacts (other rules, runbooks, integration-request reviews) using stable references.
* The artefact type must be parallel in shape to the decisions artefact (frontmatter, identifier, lifecycle), so the contributor's mental model stays consistent across layers.

## Considered options

* **Rules as sections inside decisions** — every decision carries its own rule section.
  Rules are not separable from rationale; lifecycle conflicts.
* **Rules as sections inside runbooks** — runbooks carry the rules they enforce.
  Rules are not discoverable independently of the procedure that uses them.
* **External wiki for rules** — rules live outside the corpus.
  Lifecycle and access model diverge from the rest of the corpus.
* **Standards as a dedicated artefact type within the corpus** — first-class artefacts, parallel in shape to decisions.

## Decision outcome

Adopt **standards** as the artefact type for the what layer.

A standard is a first-class artefact within the corpus that captures rules currently in force.
Standards are living documents: they are edited as the rules they capture evolve.
Each standard cites the decision(s) that justify it.

Standards have a `draft` → `active` → `deprecated` lifecycle.
A `draft` standard has been authored but is not yet in force.
An `active` standard is in force.
A `deprecated` standard is no longer in force; if a replacement exists, the deprecation note identifies it.

The format conventions, content rules, frontmatter schema, filename pattern, and folder placement for standards are operationalised in a cascading content standard.

## Consequences

* The corpus has an explicit place for rules.
  Rules that are not captured in a standard are not part of the system; relying on them is a discipline violation.
* A standard that drifts from the decision that justifies it is a defect to be caught by review or by the next contributor who applies it.
* Standards are edited as the rules evolve, but a fundamentally different rule requires deprecation of the old standard and introduction of a new one — the change in approach itself is a decision and is captured as an ADR.
* The contributor's mental model stays consistent: standards have the same shape as decisions and runbooks (frontmatter, identifier, lifecycle, content rules captured in a cascading content standard).
* The corpus is small enough to read end-to-end: a mature project typically has tens of standards, not hundreds.

## More information

* Format conventions, content rules, frontmatter schema, filename pattern, and folder placement for standards are operationalised in a cascading content standard.
* The artefact type for the how layer is established in a separate decision.
