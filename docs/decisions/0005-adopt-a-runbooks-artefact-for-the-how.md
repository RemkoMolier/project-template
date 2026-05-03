---
status: proposed
date: 2026-05-03
---

# Adopt a runbooks artefact for the how

## Context and problem statement

ADR-0003 establishes the three-layer decomposition.
ADR-0001 covers the why layer (decisions).
ADR-0004 covers the what layer (standards).
The how layer remains.

The *how* layer captures procedures: step-by-step sequences a contributor follows to accomplish a specific task.
Procedures differ from rules in shape (sequential, not declarative) and in audience (those executing a task, often under stress, not those applying a rule to their own work).
Procedures differ from decisions in shape (operational, not narrative) and in lifecycle (updated as the systems they describe change, not immutable in substance).

Without a dedicated artefact type for procedures, they end up in someone's head, in chat scrollback, in stale wikis, or are reconstructed from first principles every time they are needed.
Procedures executed under stress (incidents, deployments, onboarding) are exactly the ones that benefit most from being written down in advance.

What artefact type captures procedures?

## Decision drivers

* Procedures must be discoverable when they are needed, often under stress.
* Procedures must be editable as the underlying systems change, with edits reviewable like any other change to the corpus.
* The audience matters: a runbook for incident responders looks different from one for new joiners; the format must support both.
* Procedures must distinguish "written but never executed" from "executed and verified" — the difference matters when relying on a procedure under stress.
* The artefact type must be parallel in shape to decisions and standards (frontmatter, identifier, lifecycle), so the contributor's mental model stays consistent.

## Considered options

* **Procedures as sections inside standards** — every standard carries the procedures that operationalise its rules.
  Conflates declarative and sequential content; procedures are not discoverable independently.
* **Procedures in an external wiki** — procedures live outside the corpus.
  Lifecycle and access model diverge.
* **Procedures as a dedicated artefact type within the corpus** — first-class artefacts, parallel in shape to decisions and standards.

## Decision outcome

Adopt **runbooks** as the artefact type for the how layer.

A runbook is a first-class artefact within the corpus that captures a procedure: a sequence of steps to accomplish a specific task.
Runbooks are living documents: they are edited as the systems they describe change.

Runbooks have a `draft` → `active` → `deprecated` lifecycle.
A `draft` runbook has been authored but never executed end-to-end.
An `active` runbook has been executed end-to-end at least once and the execution date recorded.
A `deprecated` runbook is no longer in use; if a replacement exists, the deprecation note identifies it.

The transition from `draft` to `active` is gated: the procedure must have been executed end-to-end, and the execution date recorded as `last-tested`.
This guards against runbooks that look authoritative but have never actually been tried.

The format conventions, content rules, frontmatter schema, filename pattern, and folder placement for runbooks are operationalised in a cascading content standard.

## Consequences

* The corpus has an explicit place for procedures.
  Procedures that are not captured in a runbook are not part of the system; reconstruction from memory under stress is unreliable.
* A runbook authored under stress (during an incident) can be improved with the benefit of hindsight through a normal integration request after the incident.
* The `draft` → `active` gate prevents runbooks from being relied upon before they have been verified.
  A reader landing on a `draft` runbook knows the procedure has not been executed.
* A runbook with a stale `last-tested` date (older than the project's threshold) is a defect to be re-tested or deprecated.
* New joiners have a procedure to follow rather than depending on shoulder-tapping.

## More information

* Format conventions, content rules, frontmatter schema, filename pattern, and folder placement for runbooks are operationalised in a cascading content standard.
