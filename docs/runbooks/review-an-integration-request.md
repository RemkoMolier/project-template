---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "integration-discipline"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [integration-discipline](../standards/integration-discipline.md)
<!-- END-DERIVATION -->

# Review an integration request

## Purpose

Procedure for reviewing an integration request thoroughly and constructively, and for recording the attestation that integration discipline requires.

## When to use

When you are assigned (or claim) a review on an integration request.

## Prerequisites

* You have read access to the substrate and to the branch the integration request targets `main` from.
* You understand the relevant standards and the context of the change.
* The integration gate has passed (per IR3 in `integration-discipline.md`), or its failures are understood and acceptable.

## Safety

Low risk.
The review happens before merge; no production impact.

## Procedure

1. Understand the change.

   * Read the integration-request description.
   * Confirm it references a work item (per IR1).
   * Read the linked work item for context (acceptance criteria, discussion).

1. Review the code or content.
  Check for:

   * **Correctness:** does the change do what it claims to do?
  Are edge cases handled?
   * **Architecture:** does it fit with the existing design?
  Does it introduce coupling, duplication, or patterns that conflict with existing code?
   * **Testing:** are there tests?
  Do they cover the change and edge cases?
  Would a regression be caught?
   * **Standards compliance:** does the change follow the relevant standards (formatting per `unified-formatting.md`, commit format per `commit-discipline.md`, integration request rules per `integration-discipline.md`, etc.)?
   * **Documentation:** are documentation updates included if the change affects behaviour or APIs (per IR6)?
   * **Security:** are inputs validated?
  Are secrets exposed?
  Are dependencies safe?
   * **Performance:** any obvious performance issues?
  N+1 queries?
  Unnecessary allocations?

1. Provide feedback.

   * Be specific: point to the line or section, explain the issue, suggest a fix if possible.
   * Use severity labels so the author can prioritise:
     * **Must fix:** a bug, security issue, or standards violation that must be addressed before merge.
     * **Should fix:** a design concern or improvement that would make the change better.
     * **Consider:** a suggestion or alternative approach — author's discretion.
     * **Question:** something you don't understand — the author should clarify.
   * Approve when all "must fix" items are resolved.
     Do not hold the review open for "consider" items.

1. Respond within the project's review-time expectation.

   * Communicate if you need more time.
   * If you cannot complete the review, reassign or ask for help.

1. Handle pushback.

   * If the author disagrees with your feedback, discuss.
     The goal is the best outcome, not "winning."
   * If agreement cannot be reached, escalate per project convention.

1. Record the attestation.

   * Approve via the substrate's mechanism (forge approval, signed `Reviewed-by` trailer, signed acknowledgment in the integration mechanism).
   * The approval is the attestation per IA1-IA3 in `integration-discipline.md`; it is not just a comment.

1. Re-review on substantive change.

   * If the author pushes substantive changes after your approval, re-acquire approval per IA4.

## Verification

* The author has addressed all "must fix" items.
* The integration gate passes.
* Your approval is recorded in the substrate.

## Rollback

Not applicable — review happens before merge.

## Troubleshooting

### Integration request is too large to review effectively

Ask the author to split it into smaller, focused integration requests.

### Author is unresponsive to feedback

Communicate via the substrate; if no response within the project's expectation, flag to the work item's stakeholders.

### Integration gate is failing for unrelated reasons

Flag to the person or team responsible for the integration gate.
Do not approve until the gate passes (per IE3).

## Escalation

For disagreements that cannot be resolved between author and reviewer, escalate per project convention.
For security-sensitive changes, involve the security point of contact (per project convention).

## Related

* [`integration-discipline.md`](../standards/integration-discipline.md) — the integration-request and attestation rules this runbook operationalises.
* [`commit-discipline.md`](../standards/commit-discipline.md) — commit-message rules to check.
* [`unified-formatting.md`](../standards/unified-formatting.md) — formatting rules to check.
* [`definition-of-done.md`](../standards/definition-of-done.md) — the criteria the reviewer attests to.
* [`develop-a-feature.md`](develop-a-feature.md) — the author's side of this procedure.
