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

# Respond to an incident

## Purpose

Procedure for responding to a production incident from alert through to postmortem.

## When to use

When a monitoring alert fires that indicates user-visible degradation, or when an incident is manually declared by a team member.

## Prerequisites

* Monitoring and alerting are configured (project-specific).
* On-call rotation is defined (project-specific).
* A pre-agreed communication channel exists (project-specific).
* Incident severity levels are defined (project-specific — the project supplies a severity classification in a project-specific cascading runbook or standard).

## Safety

High stakes.
Production is affected.
Key principles:

* Mitigate first, root-cause later.
  Stop the bleeding.
* Communicate early and often.
* Never depend on the affected service for incident communication; have a backup channel defined in advance.
* Any team member can declare an incident.
  "Declare early and often."

## Procedure

1. Acknowledge the alert.

   The on-call responder acknowledges within the project's response-time expectation.
   If unable to respond, escalate to the secondary on-call.

1. Triage.

   * Assess severity using the project's severity classification.
   * If high-severity: declare an incident.
     Announce in the pre-agreed communication channel.
   * If lower-severity: assess whether to declare.
     When in doubt, declare.
   * The person who declares is the default Incident Commander.

1. Set up the incident response.

   * For high-severity incidents: create a war room (physical or virtual).
     Open a shared working document.
   * For lower-severity incidents: handle in the normal communication channel with a thread.
   * Start a timeline in the working document.
     Record every significant event with timestamp.

1. Assign roles (high-severity only).

   * Incident Commander commands the response and delegates.
   * Communications Lead updates stakeholders.
   * Operations Lead works on mitigation.
   * For long-running incidents, plan role handoffs.

1. Mitigate.

   * Operations Lead works on stopping the impact.
     Do NOT focus on root cause yet.
   * Preferred mitigations (in order): disable feature flag, roll back recent deploy, drain traffic from affected instances, scale up resources.
   * Generic mitigations are better than bespoke ones — they're faster and less risky.
   * Test the mitigation before applying broadly when safe to do so.

1. Investigate.

   * Once mitigated, Operations Lead investigates root cause.
   * Use dashboards, logs, traces, and recent changes (deploys, configuration changes, dependency updates).
   * Document findings in the working document.

1. Resolve.

   * Confirm the mitigation has restored the service to its baseline.
   * Incident Commander declares the incident over.
     Announce in the communication channel.
   * If a temporary mitigation is in place (feature flag off, traffic drained), create work items for the permanent fix.
   * Clean up: close the war room, archive the working document.

1. Postmortem.

   * Within the project's expectation, write a blameless postmortem.
   * Create a `postmortem` discovery work item per `work-tracking.md` and use that as the substrate for the postmortem.
   * The postmortem MUST include: summary of impact (duration, users affected); timeline; root cause(s); resolution; action items (assigned, with work-item references); lessons learned (what went well, what went poorly, where we got lucky).
   * Postmortems are reviewed before publication.
   * Action items become `bug-fix` or `tech-debt` implementation work items in the substrate.

## Verification

* Service restored to baseline.
* Postmortem (a `postmortem` discovery work item) is integrated into the corpus.
* Action items tracked as implementation work items.

## Rollback

Not applicable — the incident procedure is itself the response.
Mitigation actions may themselves be rolled back (e.g., re-enable a feature flag after the fix is deployed).

## Troubleshooting

### Alert is a false positive

Silence or tune the alert after confirming.
Do not ignore — false positives cause alert fatigue.
Record the false positive in the monitoring system.

### Can't identify root cause

Document what was investigated and what remains unknown.
Schedule a deeper investigation as a `spike` work item if the incident is likely to recur.

### Mitigation makes things worse

Roll back the mitigation.
Try a different approach.
Communicate the change to the team.

### Communication channel is also down

Switch to the pre-agreed backup channel.
Verify that the backup channel is recorded in the project's incident-response conventions; if it is missing or stale, escalate to the Incident Commander and record a follow-up work item to refresh the conventions after the incident is resolved.

## Escalation

If the incident exceeds the team's ability to resolve (requires a vendor, a different team's system, or an executive decision):

* The Incident Commander escalates per project convention.
* For long-running high-severity incidents, notify engineering leadership per project convention.
* For security incidents, follow the project's security disclosure process.

## Related

* [`work-tracking.md`](../standards/work-tracking.md) — defines `incident` as a response artefact and `postmortem` as a discovery work-item type.
* [`fix-a-bug.md`](fix-a-bug.md) — for follow-up implementation work items.
* [`land-a-release.md`](land-a-release.md) — for rollback during release-related incidents.
* [`execute-a-spike.md`](execute-a-spike.md) — for postmortem and root-cause investigation work.
