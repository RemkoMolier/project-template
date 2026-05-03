---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0008"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md)
<!-- END-DERIVATION -->

# Definition of done

This standard governs the criteria a work item must satisfy before it can be considered *done*.
A *done* work item is one path to the `done` state in `work-tracking.md`; abandoned and rejected closures (`cancelled`) are governed by WT14 alone.
It applies to every standard work item (discovery and implementation types) regardless of category.

A work item is *done* when it is **integrated, verified, and documented** — not when the code is merely written.
The rules below are the minimum bar; a project MAY raise it by amending this standard.

## Rules

A work item reaches the `done` state via:

* **Closed as done** — the work was completed.
  DO1 through DO8 MUST be satisfied.
* **Closed as cancelled** — the work was terminated without being delivered (duplicate, out of scope, no longer relevant, superseded by a different approach).
  Governed by WT14 in `work-tracking.md`, not by the rules below.

| # | Rule | Notes |
| - | ---- | ----- |
| DO1 | The work item MUST carry or link to explicit acceptance criteria before it can be declared done. | Format is per the project's work-item template; "works on my machine" does not satisfy this rule. |
| DO2 | All implementation work MUST be committed and made available through the project's chosen integration-request mechanism. | Per IR1 in `integration-discipline.md`. |
| DO3 | All required validation checks MUST pass at the integration gate. | Per IR3 in `integration-discipline.md`. |
| DO4 | At least one human reviewer MUST have approved the integration request. | Per IR4 and IA1 in `integration-discipline.md`. |
| DO5 | All review threads MUST be resolved. | Open review comments signal unresolved concerns. |
| DO6 | The integration request MUST link to the work item. | Per IR1 in `integration-discipline.md`; the audit trail must be intact. |
| DO7 | The integration request MUST have been integrated into `main`. | The merge (or equivalent) must have succeeded; the work is in the canonical record. |
| DO8 | Any documentation affected by the change MUST have been updated in the same integration request. | Per IR6 in `integration-discipline.md`; applies to decisions, standards, runbooks, API documentation, and READMEs. |

## Completion attestation

Work-item completion is attested by the integration-request approver (per IA1-IA4 in `integration-discipline.md`).
A work item closing as `done` carries an implicit attestation through the integration request that delivered the work.

| # | Rule | Notes |
| - | ---- | ----- |
| DA1 | The substrate's `done` transition MUST be recorded with the date and the contributor performing the transition. | The substrate's audit log carries this; per WT5 in `work-tracking.md`, the transition lives in the substrate. |
| DA2 | The integration request linked from the work item (per DO6) is the attestation of completion. | The reviewer who approved the IR (per IA1) attests that the work meets the project's bar. |

## What "done" does NOT require

This standard defines the minimum gate for closing work *as done*, not for every terminal closure.
It does not require:

* Deployment to production — unless the project's amended version of this standard adds that requirement.
* Stakeholder sign-off — unless the work-item template or project conventions require it.
* Post-deployment monitoring period — unless the project's delivery discipline layers that on.

These are valid additions for specific projects and SHOULD be added by amending the rules table above (per SC9 in `standard-content.md`: edit in place if refining the same intent; deprecate-and-replace if fundamentally different).

## Discovery work items

Discovery work items satisfy the rules above with one accommodation:

* DO2 (committed work) means the *findings* are committed — as an artefact in the corpus (an ADR, a standard, an updated document) or as a comment with the findings on the work item itself.
  The discovery branch is disposable and is not integrated.
* DO7 (integrated to `main`) refers to the findings artefact, not to the discovery branch.

## Rationale

Derives from ADR-0008.
The rules above operationalise the explicit-criteria property of transition discipline at the work-item-completion boundary.
The attestation rules (DA1-DA2) operationalise the attestation property by anchoring completion to the integration-request approval that delivered the work.

## Enforcement

* DO1 — enforced at integration-request review.
* DO2 through DO7 — enforced by the integration-mechanism gates and review per `integration-discipline.md`.
* DO8 — enforced at integration-request review.
* DA1 — recorded by the substrate; reviewers verify the transition came from a known contributor.
* DA2 — implicit in the integration-request linkage.

## Examples

A `feature` work item is done when:
the integration request has passing validation, a reviewer has approved, all threads are resolved, the merge to `main` succeeded, and any API documentation or standards affected by the change were updated in the same integration request.
The work item is then closed as done with a reference to the merged integration request.

A `spike` (discovery) work item is done when:
the findings are recorded as an artefact in the corpus (an ADR, a standard, or a comment on the work item), the artefact is integrated into `main`, and the work item is closed as done with the reference captured.

A `bug-fix` work item is done when the same criteria as `feature` apply.
The fix is verifiable in production once the release that contains it is deployed; deployment is not a done criterion unless the project amends this standard.

## Related decisions

* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md) — establishes the explicit-criteria and attestation properties this standard operationalises for the work-item-completion transition.
* [ADR-0007](../decisions/0007-adopt-historical-integrity.md) — establishes provenance, the property that DO6 (work-item linkage) operationalises.
