---
status: draft
last-reviewed: YYYY-MM-DD
review-cycle: semi-annually
derives_from:
  - "NNNN"
---

<!-- BEGIN-DERIVATION -->
<!-- END-DERIVATION -->

# Verb-phrase title

## Purpose

One sentence: what situation this runbook addresses.

## When to use

Specific triggers: alert names, error messages, symptoms, scenarios, lifecycle events.
This is the discovery hook — someone searching for help should find this section.

## Prerequisites

* Access, tools, permissions needed before starting.
* Anything the runbook assumes is already in place.

## Safety

Blast radius, destructive effects, required permissions, and whether this procedure is safe to rehearse.
Delete this section for low-risk authoring or corpus-process runbooks if it does not apply.

## Procedure

1. First step: action.

   Expected output:

   ```text
   what you should see
   ```

1. Second step: action.

   If this fails, see [Troubleshooting](#troubleshooting).

1. Third step: action.

## Verification

How to confirm the procedure succeeded or the issue is resolved.
What "done" looks like.
When moving a runbook to `active`, record whether `last-tested` came from a drill, production execution, or partial validation in the integration request.

## Rollback

How to undo what the procedure did if it makes things worse.
If rollback is not possible, say so explicitly.

## Troubleshooting

### Symptom or error message

Cause and fix.

### Another symptom

Cause and fix.

## Escalation

Who to contact if this runbook does not resolve the issue.
Include team names and communication channels (project-specific; the template ships without invented owners).

## Related

* [Standard name](../standards/standard-name.md) — related conventions.
* [ADR-NNNN](../decisions/NNNN-title.md) — decision context.
