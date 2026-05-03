---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0001"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0001](../decisions/0001-adopt-decisions-as-the-founding-artefact-type.md)
<!-- END-DERIVATION -->

# Decision content

This standard governs the *content* of decisions — the format conventions, where decisions live, the rules for what belongs inside one, the lifecycle gates between statuses, and the discipline for edits and supersession.
It applies to every decision in `docs/decisions/`.

## Format

Decisions follow the [MADR (Markdown Architectural Decision Records)][madr] conventions, with the project-specific elaborations below.

| # | Rule | Notes |
| - | ---- | ----- |
| DC1 | Decisions MUST use the MADR section structure: Context and problem statement, Decision drivers, Considered options, Decision outcome, Consequences, More information. | Subsections are permitted within these. |
| DC2 | Decisions MUST live in `docs/decisions/`. | The folder layout is auxiliary content per ADR-0006. |
| DC3 | Decision filenames MUST follow the pattern `NNNN-short-title-with-hyphens.md`, with `NNNN` a sequential four-digit number reflecting logical dependency. | Numbering is reorderable while authoring the foundational set; once cascading artefacts depend on a number, renumbering is a cross-reference migration. |

## Frontmatter

| Field | Required | Values | Purpose |
| ----- | -------- | ------ | ------- |
| `status` | Yes | `proposed`, `accepted`, `superseded`, `deprecated`, `rejected` | Lifecycle state |
| `date` | Yes | `YYYY-MM-DD` | When the decision was reached or last substantively revised |
| `supersedes` | When superseding | List of four-digit identifiers as strings | Decisions replaced by this one |
| `superseded_by` | When superseded | List of four-digit identifiers as strings | Decisions that replace this one |

The decision's title is the H1.
The decision's identifier is the four-digit prefix of the filename.

## Folder layout

The `docs/decisions/` folder contains:

* `README.md` — describes the type, the procedure for adding a decision, and the auto-generated index between `<!-- BEGIN-INDEX -->` and `<!-- END-INDEX -->` markers.
  Content between the markers MUST NOT be edited by hand; it is regenerated from artefact frontmatter and H1 headings.
* `template.md` — the starting point for a new decision.
* The decisions themselves.

## Authoring rules

| # | Rule | Notes |
| - | ---- | ----- |
| AC1 | A decision MUST record one coherent decision. A decision is "one" if it cannot be cleanly split into parts that could be made independently. | The reversibility test: if you could change one part without affecting the others, they are separate decisions. |
| AC2 | A consequence of an existing decision MUST go in that decision's Consequences section, not in a new decision. | A consequence is implied by the decision; an independent decision is not. |
| AC3 | The rationale for an existing decision MUST go in that decision's Context or Decision drivers section, not in a new decision. | Rationale lives with what it justifies. |
| AC4 | A decision MUST contain real, specific content — substance, not ceremony. | "We use Git" is not enough; substance is in the conventions and discipline that make Git load-bearing. |
| AC5 | A *concept* the rest of the system depends on SHOULD have its own decision. Specific *instances* satisfying a concept are operationalised in cascading standards. | Reviewed-integration discipline is a concept (decision); Conventional Commits is an instance (standard). |
| AC6 | Decision numbering MUST reflect logical dependency, not chronology. | Each decision's dependencies have lower numbers; reorder freely while authoring the foundational set. |
| AC7 | Every decision MUST list Considered options, even if obvious. | The section forces the author to confront alternatives. |
| AC8 | When "build it ourselves" is among the considered options, the Considered options section MUST name existing solutions that were investigated and why they do not fit. | A check against not-invented-here. |
| AC9 | A superseding decision MUST reference every decision it supersedes via `supersedes`. | Supersession is bidirectional; the new decision points backward. |
| AC10 | A superseded decision MUST set `status: superseded` and reference every superseding decision via `superseded_by`. | The old decision points forward; its content remains historical record. |
| AC11 | A decision MUST NOT name specific cascading standards by filename or path. References from a decision to its cascade describe the cascade's *role*, not its current location. | The cascade direction is upstream-pointing: standards reference their justifying decisions in `derives_from`; decisions do not reference the specific standards that operationalise them. |
| AC12 | A decision MUST distinguish *concept* from *instance*. The concept (the property the system requires) belongs in the decision; the specific instance (which tool, format, or substrate satisfies the property) belongs in a cascading standard. | Composite decisions are allowed only when the parts are genuinely inseparable, not merely co-authored. |

## Edit discipline

| # | Rule | Notes |
| - | ---- | ----- |
| AC13 | Editorial edits (typos, broken links, formatting, clarifying wording without changing the decision, decision drivers, considered options, or consequences) MAY be made in place at any status. | The integration request MUST identify the change as editorial. |
| AC14 | Substantive edits to an `accepted` decision are permitted only when no artefact in the corpus references it (no cascading standard, runbook, or other decision). Once a referencing artefact exists, substantive change MUST be made via supersession. | The reference test is mechanical: search for the decision's four-digit identifier in the corpus. |
| AC15 | Substantive edits to a `proposed` decision are permitted at any time. | Proposed decisions are pre-cascade by definition. |

## Self-challenge before drafting

Before drafting a decision, ask:

1. Is this genuinely a separable decision, or am I splitting hairs from an existing one?
1. Is each element of this decision justified by an actual reason, or am I applying convention reflexively?
1. Am I deciding the *concept*, or committing to an *instance* of it?
  If the latter, the concept is the decision; the instance is the cascade.
1. If this decision recommends building something, have existing solutions been considered in the Considered options section?

If the answer to the first question is "no", fold the content into the existing decision.

## Composite decisions

Composite decisions are allowed when their parts are inseparable: you cannot have one without the other.
The reversibility test in AC1 applies: if you could change one part without affecting the others, they are separate decisions and belong in separate ADRs.

## Supersession

Supersession is the mechanism for substantively changing an accepted decision once cascading artefacts depend on it.
Do not edit the accepted decision's substance.
Create a new decision for the changed substance, and update the superseded decision's frontmatter in the same integration request.

The new decision points backward via `supersedes`; the old decision points forward via `superseded_by`.
Use four-digit identifiers as strings; use a list even when there is only one referenced decision (this keeps the shape stable if a decision is later split or consolidated).
The old decision's body remains unchanged except for the frontmatter needed to record supersession.
Any explanation of why the decision changed belongs in the new decision.

## Rationale

Derives from ADR-0001.
The rules above operationalise the discipline that makes the corpus's *why* layer trustworthy and supersedable.

## Enforcement

This standard is enforced by review.

| Rule | Mode |
| ---- | ---- |
| DC1, DC2, DC3 | Mechanical for filename and folder; review for section structure |
| AC1, AC4, AC5, AC12 | Review judgment |
| AC2, AC3 | Review judgment for boundary cases |
| AC6 | Mechanical for sequential numbering; review for dependency ordering |
| AC7, AC8 | Mechanical for section presence; review for substance |
| AC9, AC10 | Mechanical for frontmatter consistency |
| AC11 | Mechanical: grep on standards' filenames inside decision bodies |
| AC13, AC14, AC15 | Review judgment for editorial-vs-substantive classification; mechanical for the cascade-existence check in AC14 |

## Examples

### A decision that violates AC1 (two decisions in one)

A document that says "Adopt MADR for decisions *and* use signed Git tags for acceptance" is two decisions.
The format choice and the acceptance mechanism are independently composable.
Split into two.

### A decision that correctly follows AC11 (no forward reference to a specific standard)

A decision says "the format conventions for decisions are operationalised in a cascading content standard" without naming the file.
A reader follows the cascade by querying standards whose frontmatter `derives_from` includes this decision's identifier.

### A decision that violates AC14 (substantive edit to a cascaded accepted decision)

A decision is `accepted` and a standard derives from it.
A contributor edits the decision's Decision outcome to change the chosen option.
This is a violation: the change is substantive and the decision has cascading artefacts.
The correct path is supersession.

### A decision that correctly follows AC15 (substantive edit to a proposed decision)

A decision is `proposed` and no cascading artefact exists.
A contributor revises the Decision drivers to sharpen the concerns.
This is permitted; the decision has not been cascaded from.

## Related decisions

* [ADR-0001](../decisions/0001-adopt-decisions-as-the-founding-artefact-type.md) — adopts decisions as the founding artefact type that this standard governs.

[madr]: https://adr.github.io/madr/
