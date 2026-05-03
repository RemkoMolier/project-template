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

# Land a release

## Purpose

Procedure to cut a release from `main`, deploy it, and verify it.

## When to use

When the project has decided to release.
The project's release cadence is project-specific:

* On every merge to `main` (continuous delivery).
* On a schedule.
* When a specific set of work items is `done` (coordinated release).
* When a critical fix or security patch must go out (hotfix release).

This runbook covers the mechanical steps that are universal.
Project-specific cadence, deploy mechanism, and rollout strategy are deferred to project-specific cascading runbooks.

## Prerequisites

* The integration gate passes on `main` (per IR3 in `integration-discipline.md`).
* All work items intended for the release are `done` (per `definition-of-done.md`).
* Version-numbering convention is decided (project-specific — semantic versioning recommended).
* Deploy mechanism is configured (project-specific).

## Safety

Medium risk.
A release deploys to production.
Mitigations vary by deploy mechanism: progressive rollout, automated rollback on signal breach, feature flags for risky changes, rehearsal in staging.
The procedure SHOULD be rehearsed in a non-production environment first.

## Procedure

1. Verify readiness.

   * Confirm the integration gate passes on the commit you intend to release.
   * Confirm all intended work items are `done`.
   * Confirm any release-blocking issues are resolved.
   * Confirm the staging deployment matches what will go to production (where applicable).

1. Determine the version.

   * Follow the project's versioning scheme.
   * For semantic versioning: MAJOR for breaking changes, MINOR for new features, PATCH for fixes.

1. Update the changelog.

   * Add a section for the new version.
   * Group entries by impact (added, changed, deprecated, removed, fixed, security).
   * Reference work items.
   * The changelog SHOULD be a separate commit and integration request, not bundled with feature work.

1. Tag the release.

   * Create an annotated, signed tag: `v<version>` (e.g., `v1.2.0`).
   * Tag message: brief summary of the release.
   * Push the tag.

   Expected output: the tag appears in the substrate and verifies its signature.

1. Deploy.

   * Deploy to the staging or canary environment first (if your pipeline has one).
   * Run smoke tests; verify key signals against baseline.
   * If healthy: proceed to production rollout.
   * If degraded: stop, roll back the canary or staging deployment, investigate.

1. Production rollout (project-specific).

   * Follow the project's rollout strategy (immediate replace, progressive percentage rollout, feature-flag flip, etc.).
   * Monitor key signals against baseline.
   * If error budget burn rate exceeds the project's threshold: roll back per the project's rollback procedure.

1. Verify.

   * Confirm the new version is serving production traffic.
   * Confirm critical user journeys work.
   * Confirm any release work item transitions to `done`.

1. Announce.

   * Notify the team and stakeholders that the release is complete.
   * Share the changelog.

## Verification

* New version serving traffic.
* No signal violations beyond baseline.
* Changelog published.
* Release work item is `done`.

## Rollback

If the release causes issues:

* For progressive rollouts: the deploy mechanism SHOULD auto-rollback on signal breach.
* For full deployments: deploy the previous version's artefact via the project's documented rollback procedure.
* For database migrations: ensure migrations are backward-compatible (additive only within a release).
  Rollback of code + migration requires a separate rollback migration.

The project's rollback procedure is documented in a project-specific cascading runbook.

## Troubleshooting

### Canary or staging shows degraded signals

Stop the rollout.
Investigate via dashboards and logs.
Roll back the canary deployment.
Do NOT proceed to production.

### Rollout triggers auto-rollback

Investigate the signals that triggered it.
This is a real issue — do not override the auto-rollback without understanding the cause.

### Tag already exists

Re-releasing a version is not normal flow.
If needed (e.g., a failed deploy), the project's procedure for tag correction applies; do not silently delete or move the tag (per VS4).

## Escalation

If a release causes a production incident, follow `respond-to-an-incident.md`.
The release is paused until the incident is resolved.

## Related

* [`work-tracking.md`](../standards/work-tracking.md) — defines `release` as a coordination artefact with its own state machine.
* [`integration-discipline.md`](../standards/integration-discipline.md) — the discipline this release builds on.
* [`respond-to-an-incident.md`](respond-to-an-incident.md) — for rollback during release-related incidents.
* [`fix-a-bug.md`](fix-a-bug.md) — for hotfix flows that follow the standard implementation discipline with expedited timing.
