---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0001"
  - "0007"
  - "0008"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0001](../decisions/0001-adopt-decisions-as-the-founding-artefact-type.md)
* [ADR-0007](../decisions/0007-adopt-historical-integrity.md)
* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md)
<!-- END-DERIVATION -->

# Contribute to this corpus

## Purpose

How to add or change decisions, standards, and runbooks, and how to set up the project for first contribution.

## When to use

You want to:

* Add a new decision, standard, or runbook.
* Edit an existing standard or runbook (decisions are not edited; they are superseded — see `decision-content.md` for the editorial-vs-substantive exception during pre-cascade authoring).
* Implement a follow-up work item triggered by a merged decision.
* Set up the project for the first time after cloning.

## Prerequisites

* Read access to the project's substrate; write access to a feature branch.
* Node.js installed (for `npm install` and the validation tooling).
* A work item describing the work, in the project's substrate (per `work-tracking.md`).

## Procedure

### Initial setup

1. Clone the project.

   Expected output:

   ```text
   Cloning into '<project>'...
   ```

1. Run `npm install`.

   This installs `markdownlint-cli2` with custom rules, the index-generator dependencies, Husky, and `commitlint`.
   Husky activates the local Git hooks under `.husky/`.

1. Run `npm run validate` to confirm local validation works.

   If this fails, see [Troubleshooting](#troubleshooting).

1. Confirm the integration-enforcement mechanism for `main` is configured per `integration-discipline.md`.

### Add a new decision

1. Confirm a work item exists describing the decision.
   If not, file one and discuss before drafting.
1. Confirm this is genuinely a separable decision and not a rule (which would be a standard) or a procedure (which would be a runbook).
   See `decision-content.md`'s self-challenge questions.
1. Copy `docs/decisions/template.md` to `docs/decisions/NNNN-short-title-with-hyphens.md`, where `NNNN` is the next available four-digit number.
1. Fill in the frontmatter (`status: proposed`, `date`) and the sections.
1. Run `npm run docs:index` to update `docs/decisions/README.md`.
1. Open an integration request linked to the work item.
1. Before merging, the decision is reviewed.
   Acceptance (status flip from `proposed` to `accepted`) is part of the foundational-set acceptance ceremony or a subsequent supersession ceremony, not a routine integration request — see `acceptance-attestation.md`.

### Add a new standard

1. Confirm a related decision exists, or that the standard is small enough to introduce inline (a clarification of an existing rule).
1. Copy `docs/standards/template.md` to `docs/standards/short-title-with-hyphens.md`.
   The filename stem is the standard's identifier; per FC4 in `standard-content.md`, the name MUST describe the standard's role.
1. Fill in the frontmatter (`status: draft`, `last-reviewed`, `review-cycle`, `derives_from`) and the sections.
1. Run `npm run docs:index` to update `docs/standards/README.md`.
1. Open an integration request linked to the related decision or work item.

### Edit an existing standard

1. Confirm the change is consistent with the decision(s) the standard derives from.
   If the change is fundamentally different (per SC9 in `standard-content.md`), supersede the standard rather than editing it: mark the old standard `deprecated` and introduce a new one.
1. Make the edit.
1. Update `last-reviewed` in the frontmatter.
1. Open an integration request explaining what changed and why.

### Add a new runbook

1. Confirm the procedure is concrete enough to write down step by step.
   If it is mostly judgment, it may be a standard rather than a runbook.
1. Copy `docs/runbooks/template.md` to `docs/runbooks/verb-phrase-with-hyphens.md`.
1. Fill in the frontmatter (`status: draft`, `last-reviewed`, `review-cycle`, `derives_from`) and the sections.

   Per RC6 in `runbook-content.md`, do not add `last-tested` to a draft runbook — it is added when the runbook transitions to `active` after end-to-end execution.

1. Run `npm run docs:index` to update `docs/runbooks/README.md`.
1. Open an integration request.
1. Once the procedure has been executed end to end, set `status: active` and add `last-tested` in a follow-up integration request.

### Implement a follow-up from a merged decision

1. Read the source decision (or the work item's description) to understand the *why*.
1. Make the code or documentation change.
1. Open an integration request linked to the follow-up work item and to the source decision.
1. The integration-request description explains what changed in this integration request specifically; the *why* is in the source decision — do not re-litigate the decision in the integration request.

## Verification

* The integration request is integrated into `main`.
* The auto-generated indexes match the artefacts (`npm run docs:check` passes).
* `npm run validate` passes locally and at the integration gate.

### What validation checks — and what it does not

`npm run validate` checks **artefact integrity**:

* Markdown formatting per `unified-formatting.md` (heading style, list rules, line wrapping, etc.).
* Frontmatter schema per each type's content standard (required fields, valid statuses, valid dates, valid review cycles).
* `derives_from` references resolve to existing decisions or standards.
* The `last-tested` lifecycle gate (RC6: draft runbooks must not carry it; active runbooks must).
* Auto-generated indexes and cascade blockquotes match the frontmatter.

`npm run validate` does **not** check **policy completeness or semantic validity**:

* It cannot tell whether a placeholder section in a project-fill-in standard (such as `work-tracking.md`'s *Substrate* and *Reference format*) has been replaced with real content.
* It cannot tell whether a rule is *correctly implemented*, only whether the rule's text is well-formed.
* It cannot tell whether the integration-enforcement mechanism on `main` is actually configured to reject direct pushes — only that the standard describing it exists.
* It cannot tell whether the cascading runbooks have been concretised with project-specific severity classifications, response-time expectations, deploy mechanisms, or on-call rotations.
* It cannot tell whether the project's chosen substrate satisfies the integrity properties it claims to satisfy.

A passing `validate` is necessary for governance to operate but not sufficient.
The gaps are explicitly enumerated in the README's **Adoption readiness** section; treat that section as the second checklist after `validate`.

## Troubleshooting

### Integration gate fails on index drift

Run `npm run docs:index` locally and commit the regenerated index.

### Integration gate fails on `markdownlint-cli2`

Fix the formatting per `unified-formatting.md`.
Many violations are auto-fixable: `npm run lint:md:fix`.

### Integration gate fails on commit-message validation

Amend the commit message per `commit-discipline.md`.

### Husky hook is not running locally

Husky installs the local hooks during `npm install`'s `prepare` script.
If hooks are not running, run `npm install` again to re-prepare them.

## Rollback

If an integration introduces a defect (broken index, invalid frontmatter that slipped through, missing cross-reference), open a follow-up integration request fixing the defect.
Do not force-push to `main`; do not edit history (per VS4 in `versioning-substrate.md`).
The fix is itself a normal integration request.

## Related

* [`decision-content.md`](../standards/decision-content.md) — rules for decision content.
* [`standard-content.md`](../standards/standard-content.md) — rules for standard content.
* [`runbook-content.md`](../standards/runbook-content.md) — rules for runbook content.
* [`commit-discipline.md`](../standards/commit-discipline.md) — commit-message rules.
* [`integration-discipline.md`](../standards/integration-discipline.md) — integration-request rules.
* [ADR-0001](../decisions/0001-adopt-decisions-as-the-founding-artefact-type.md) — establishes the recording discipline this runbook implements.
* [ADR-0007](../decisions/0007-adopt-historical-integrity.md) — establishes the integrity properties this contribution discipline preserves.
* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md) — establishes the transition discipline this runbook operationalises.
