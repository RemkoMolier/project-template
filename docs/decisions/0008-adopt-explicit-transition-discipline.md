---
status: proposed
date: 2026-05-03
---

# Adopt explicit transition discipline

## Context and problem statement

ADR-0007 establishes the static properties of the corpus's historical record: what must be true at any moment.
This ADR addresses the dynamic side: how state changes happen.

The corpus has many state transitions:

* A decision moves from `proposed` to `accepted`.
* A standard moves from `draft` to `active`.
* A runbook moves from `draft` to `active` after end-to-end execution.
* A work item moves through its lifecycle to `done`.
* An integration request becomes part of the canonical record.
* The foundational set itself is accepted by an adopting project.

Without explicit discipline around these transitions, they happen ad hoc: a decision is treated as accepted when someone says it is; a runbook is relied upon without ever being executed; a work item is marked done before the work is integrated; the foundational set is implicitly inherited rather than explicitly adopted.
The result is a record whose state changes cannot be defended: a reader cannot tell whether a transition happened legitimately, who authorised it, or what criteria were satisfied.

The two failure modes are different:

* **Ungated transitions** — the transition happened without satisfying the criteria that should govern it.
  A `done` work item with no review, an `active` runbook never executed, an `accepted` decision with no integration request.
* **Unattested transitions** — the transition happened without explicit authorisation from someone with the authority to attest.
  A merge with no recorded approver, an acceptance with no signed authorisation, a release with no sign-off.

Both fail the corpus's promise that its record is trustworthy.

How are state transitions disciplined?

## Decision drivers

* Every state transition that the rest of the system depends on must have explicit, checkable criteria.
* Significant transitions must carry an explicit attestation from someone with the authority to authorise them.
* The criteria must be checkable mechanically where possible, by review where not.
* Attestations must be visible in the historical record, so a reader can identify who authorised each transition.
* The discipline must apply uniformly across artefact types — work items, decisions, standards, runbooks, integration requests, releases, acceptance.

## Considered options

* **No transition discipline** — state changes happen by social convention; no criteria, no attestation.
* **Implicit discipline** — assume contributors apply criteria and attest correctly without making either explicit.
* **Explicit transition discipline** — name the criteria; record the attestations.

## Decision outcome

Adopt **explicit transition discipline** for the corpus's state changes.

The discipline has two properties:

* **Explicit criteria** — every state transition is governed by criteria that are stated in advance and are checkable (mechanically, by review, or both).
  A transition that happens without satisfying its criteria is a discipline violation.
* **Attestation** — significant transitions carry an explicit, recorded authorisation from a party with the authority to grant it.
  An attestation is more than a comment: it is a record that survives in the corpus and identifies the attester.

The specific criteria for each kind of transition (work-item completion, integration approval, runbook activation, standard deprecation, decision acceptance, foundational-set acceptance) are operationalised in the cascading standard for that transition's domain.
The attestation mechanism for each kind of transition is operationalised in the same cascading standard, co-located with the transition it gates.

## Consequences

* Every standard that governs a transition states the criteria for that transition explicitly.
  A standard whose transition is implicit is a discipline gap.
* Every standard that governs a transition states the attestation mechanism for that transition.
  Attestations live with the transitions they authorise; there is no centralised attestation registry.
* Transitions that fail their criteria are visible: the artefact reaches the post-transition state without satisfying what was required.
  Such artefacts are defects to be corrected.
* The discipline imposes a cost: every significant transition requires a check and an attestation.
  This is the price of a trustworthy record.
* Transitions that lack a downstream consumer (e.g., transitions internal to a project's tooling that nobody else relies on) need not be explicitly disciplined.
  The discipline applies to transitions the *corpus* depends on.
* The discipline composes with historical integrity (ADR-0007): criteria and attestations enter the record, which the integrity properties keep verifiable, provenanced, and identified.

## More information

* The criteria and attestation mechanism for work-item completion are operationalised in a cascading standard.
* The criteria and attestation mechanism for integration approval are operationalised in a cascading standard.
* The criteria and attestation mechanism for foundational-set acceptance are operationalised in a cascading standard.
* The lifecycle gates for runbook activation, standard deprecation, and decision acceptance are operationalised in the cascading content standard for each type.
