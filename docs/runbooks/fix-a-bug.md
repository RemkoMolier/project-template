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

# Fix a bug

## Purpose

The procedure to take a `bug-fix` work item from triage through to `done`.

## When to use

When a defect is reported and a `bug-fix` work item has been created in the substrate (or you are creating one as part of triage).

## Prerequisites

* `bug-fix` work item exists with: steps to reproduce, expected vs actual behaviour, environment/version information, severity assessed.
* Development environment set up per `contributing.md`.

## Safety

Low risk for the fix branch.
For hotfixes (critical bugs requiring immediate deployment), the project's release strategy MAY require branching from a release tag rather than `main`.
The project documents its hotfix branching strategy separately; this runbook covers the standard fix flow.

## Procedure

1. Triage the bug.

   * Reproduce the bug locally using the steps in the work item.
   * If not reproducible, request more information from the reporter.
   * If reproducible, proceed.

1. Claim and set up.

   * Transition to `doing`.
   * Create a branch from `main` (or from a release tag for hotfixes, per project convention).
   * Branch naming follows BR1-BR3 in `integration-discipline.md`.

1. Write a failing test that reproduces the bug.

   * This confirms the bug and prevents regression.

   Expected output: the test fails with the bug's behaviour.

1. Implement the fix.

   * Make the minimal change needed to correct the behaviour.

   Expected output: the reproduction test now passes; existing tests still pass.

1. Open an integration request per `integration-discipline.md`.

   * Reference the bug-fix work item (per IR1).
   * Include: what the bug was, how the fix works, how to verify (per IR2).
   * The integration gate must pass (per IR3).

1. Review, address feedback, merge — same as the feature flow (see `develop-a-feature.md`).

1. Verify the fix.

   * Confirm the original reproduction steps no longer trigger the bug.

1. Backport if needed (project-specific).

   * If the bug affects a supported release, the project's hotfix policy MAY require a backport via a separate integration request.
   * Reference the original work item in the backport.

1. Close the work item as `done`.

## Verification

* Bug no longer reproducible.
* No regressions introduced.
* Backport complete if applicable.
* Definition-of-done criteria (per `definition-of-done.md`) are satisfied.

## Rollback

For hotfixes deployed as a patch release, roll forward with another patch if the fix introduces a new issue.
A simple revert is itself an integration request and follows the same discipline.

## Troubleshooting

### Can't reproduce

Document what was tried.
Request more information from the reporter (exact steps, version, environment).
Set the work item back to `triage` with a note.

### Fix breaks other tests

The fix is too broad.
Narrow it to the specific bug; the failing test from step 3 is the guide.

### Backport has conflicts

The release branch has diverged.
Manually apply the fix to the release branch's current state, with an integration request that explains the divergence.

## Escalation

For security-sensitive bugs, follow the project's security disclosure process.
For bugs blocking a release, escalate to the person coordinating the release (per the project's release runbook).

## Related

* [`work-tracking.md`](../standards/work-tracking.md) — the implementation flow this runbook operationalises.
* [`definition-of-done.md`](../standards/definition-of-done.md) — the criteria for done.
* [`integration-discipline.md`](../standards/integration-discipline.md) — the integration-request rules.
* [`develop-a-feature.md`](develop-a-feature.md) — the shared review/merge mechanics.
* [`land-a-release.md`](land-a-release.md) — for backport context.
* [`respond-to-an-incident.md`](respond-to-an-incident.md) — if the bug is causing a production incident.
