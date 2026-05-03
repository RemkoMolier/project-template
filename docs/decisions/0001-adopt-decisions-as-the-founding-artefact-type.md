---
status: proposed
date: 2026-05-03
---

# Adopt decisions as the founding artefact type

## Context and problem statement

A project that survives across team changes, restructurings, and contributor turnover needs a durable record of the choices that shaped it.
Without such a record, decisions get re-litigated as readers question them; new contributors have no path to understand why the system has its current shape; reasoning evaporates as the people who held it leave; agents working on the corpus have no grounded basis for action.

The first question any system of durable normative knowledge must answer is whether the choices it captures will themselves be recorded as artefacts — and if so, in what shape.
A choice that is acted on but never written down is not durable; it lives in tribal memory.
A choice that is written down but lacks structure is harder to revisit, supersede, or cite.
The recording practice itself is a choice, and the most foundational one in the system: every other artefact in the corpus exists because some choice was recorded to establish it.

This ADR is itself the first instance of the practice it establishes.
The bootstrapping is intrinsic and is acknowledged here rather than concealed: any artefact that establishes "we record significant decisions as artefacts" is itself a recorded decision.

How are significant decisions recorded?

## Decision drivers

* Decisions must be durable — recorded as artefacts, not held as tribal knowledge.
* Decisions must live alongside the rest of the corpus, not in a separate system.
* Decisions must be reviewable like any other change to the corpus.
* Decisions must be cite-able, with stable identifiers, so other artefacts can reference them.
* Decisions must be supersedable when they no longer hold; the supersession trail must be reconstructable.
* Agents working on the corpus must be able to consume decisions as structured data.

## Considered options

* **Tribal knowledge** — significant choices live in shared memory; nothing is recorded.
* **Chat logs or mailing lists** — choices recorded as discussion artefacts; not curated, not stable, not cite-able.
* **External wiki** — choices recorded but separated from the artefacts they govern; access model and lifecycle diverge.
* **Decisions as first-class artefacts within the corpus** — choices recorded with stable identifiers and structured content, versioned with the rest of the corpus.

## Decision outcome

Adopt **decisions** as the founding artefact type.
Significant choices are recorded as durable artefacts with stable identifiers and structured content, versioned alongside the rest of the corpus, with an explicit lifecycle (`proposed` → `accepted`; or `proposed` → `rejected`; or `accepted` → `superseded` or `deprecated`).

This decision is the meta-discipline on which the rest of the foundational set rests.
Every subsequent artefact in the corpus — including standards, runbooks, and other decisions — exists because a decision was recorded to establish it.

The format conventions, content rules, frontmatter schema, filename pattern, and folder placement for decisions are operationalised in a cascading content standard.

## Consequences

* Every choice that the rest of the corpus depends on must be written down before it can be relied upon.
  Choices held informally are not part of the system.
* This ADR is itself a decision, recorded as the first instance of the practice it establishes.
  Forward references to artefact types not yet established (standards, runbooks, the corpus, the medium, the substrate) are an accepted artefact of bootstrapping; once the foundational set is in place, new artefacts have the full system to reference.
* The corpus grows monotonically: superseded decisions are retained as historical record, not deleted.
  The supersession chain is reconstructable from the recorded artefacts alone.
* Decisions are immutable in substance once accepted.
  Editorial corrections are permitted at any status.
  Substantive changes to an accepted decision require supersession; bounded exceptions for pre-cascade revision are captured in the cascading content standard.
* Decisions cannot author themselves: the practice depends on contributors agreeing to record significant choices.
  The discipline is enforced socially through review, with tooling support where feasible.

## More information

* Format conventions, content rules, frontmatter schema, filename pattern, and folder placement for decisions are operationalised in a cascading content standard.
* The corpus that holds decisions and other artefact types is established in a separate decision.
* The decomposition that places decisions in the *why* layer of a three-layer model (rationale, current rules, procedures) is established in a separate decision.
