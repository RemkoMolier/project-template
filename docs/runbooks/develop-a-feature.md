---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "work-tracking"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [work-tracking](../standards/work-tracking.md)
<!-- END-DERIVATION -->

# Develop a feature

## Purpose

The procedure to take a `feature` work item from `ready` through to `done`.

## When to use

When a `feature` work item (per `work-tracking.md`) is in state `ready` and you are assigned to implement it.

## Prerequisites

* Work item exists in the substrate with state `ready` and acceptance criteria (per the *Definition of ready* in `work-tracking.md`).
* Development environment set up per `contributing.md`.
* The substrate, integration-enforcement mechanism, and integration gate are configured (project-specific — see `versioning-substrate.md` and `integration-discipline.md`).

## Safety

Low risk.
Code changes are isolated to a branch.
The integration gate blocks defective code from reaching `main`.
The integration-request review provides a second pair of eyes.

## Procedure

1. Claim the work item.

   * Transition the work item from `ready` to `doing` in the substrate.
   * Assign yourself.

1. Create a branch from the latest `main`.

   * Branch naming follows BR1-BR3 in `integration-discipline.md`: kebab-case, prefixed with the work-item identifier when one exists.

1. Implement the feature.

   * Write tests where applicable.
   * Make small, focused commits following `commit-discipline.md`.
   * Push the branch regularly.

   Expected output: all tests pass locally; the integration gate passes when run on the branch.

1. Open an integration request per `integration-discipline.md`.

   * The integration request MUST reference the work item (per IR1).
   * The description MUST explain *what changed and why*, including how to verify (per IR2).
   * The integration gate runs automatically and MUST pass before review (per IR3).

1. Request review.

   * Transition the work item to `in-review`.
   * Assign reviewer(s) per project convention.
   * See `review-an-integration-request.md` for reviewer expectations.

1. Address review feedback.

   * Push additional commits to the same branch.
   * Re-request review after substantive changes (per IA4 in `integration-discipline.md`).
   * Resolve review threads when addressed.

1. Merge.

   * Once approved and the integration gate passes, merge the integration request.
   * The integration-enforcement mechanism ensures the merge rules are followed.

1. Close the work item.

   * Transition the work item to `done` in the substrate.
   * Confirm all definition-of-done criteria (per `definition-of-done.md`) are met.

## Verification

* Work item is `done`.
* The integration request is integrated into `main`.
* The definition-of-done criteria (DO1-DO8) are satisfied.

## Rollback

If the feature causes issues after merge, follow `respond-to-an-incident.md`.
A revert is itself an integration request and follows the same discipline.

## Troubleshooting

### Integration gate fails

Read the gate output.
Fix the issue locally, push again.
Common causes: linting failures, test failures, missing documentation updates required by IR6.

### Review is stalled

Communicate with the reviewer; if the project's review-time expectation is exceeded, escalate per project convention.

### Merge conflict

Rebase the branch onto the latest `main`, resolve conflicts, force-push the topic branch (force-push to `main` is forbidden by VS4; force-push on a topic branch is permitted before integration).

## Escalation

Escalate per project convention if the integration gate is broken for reasons unrelated to your change, or if the review is blocked beyond the project's expectation.

## Related

* [`work-tracking.md`](../standards/work-tracking.md) — work-item types, lifecycle, and the implementation flow this runbook operationalises.
* [`definition-of-done.md`](../standards/definition-of-done.md) — the criteria for done.
* [`integration-discipline.md`](../standards/integration-discipline.md) — the integration-request rules.
* [`commit-discipline.md`](../standards/commit-discipline.md) — commit-message rules.
* [`review-an-integration-request.md`](review-an-integration-request.md) — the reviewer's side.
