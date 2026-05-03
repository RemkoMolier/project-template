---
status: proposed
date: 2026-05-03
---

# Decompose knowledge into why / what / how

## Context and problem statement

ADR-0002 establishes a corpus of normative knowledge.
Without further structure, the corpus is an undifferentiated heap of artefacts and a contributor cannot tell what kind of artefact they are reading or authoring.

Three kinds of normative knowledge recur in any project that survives across team changes:

* **Why** — the rationale for choices that shape the system.
  Records what was decided, what alternatives were considered, what consequences follow.
  Stable in substance; revisited only through supersession.
* **What** — the rules currently in force.
  Captures the conventions, formats, schemas, and constraints contributors must follow.
  Living: edited as the rules evolve.
* **How** — the procedures to perform specific operations.
  Step-by-step sequences a contributor follows to accomplish a task.
  Living: updated as the systems and tools they describe change.

These three layers have **different lifecycles** (immutable vs living vs operational), **different shapes** (rationale narrative vs declarative rules vs sequential steps), and **different audiences** (those questioning a choice vs those applying a rule vs those executing a procedure).
Mixing them in a single artefact produces documents that satisfy none of those audiences well: the rule reader has to wade through rationale, the procedure executor has to skip past rules, and the rationale reader gets lost in operational detail.

How should the corpus be decomposed?

## Decision drivers

* Each layer has a distinct lifecycle and the corpus must support that — immutable rationale, edited rules, executed procedures.
* A reader landing on any artefact should know immediately what kind of artefact it is and what to expect.
* Authors should know which layer their content belongs to before they start writing.
* The decomposition must be small enough to remember (single-digit number of layers).

## Considered options

* **Undifferentiated documents** — all normative content in one folder, no type distinction.
* **Two-layer model** — rules + procedures (why folds into rules as background).
* **Three-layer why / what / how** — rationale, rules, procedures as distinct artefact types.
* **Four-layer model** — add a separate reference / glossary layer alongside the three.

## Decision outcome

Decompose the corpus into three layers: **why**, **what**, and **how**.

* The **why** layer captures rationale — the choices that shape the system, why they were made, what alternatives were considered.
  Implemented by the decisions artefact type established in ADR-0001.
* The **what** layer captures the rules currently in force.
  The artefact type for this layer is established in a separate decision.
* The **how** layer captures procedures.
  The artefact type for this layer is established in a separate decision.

The three layers are mutually exclusive and collectively cover the normative knowledge the project needs.
Reference material, examples, and discussion that fall outside this decomposition are auxiliary content (handled by a separate decision on co-location).

## Consequences

* Every artefact in the corpus belongs to exactly one of the three layers.
  An artefact that mixes rationale, rules, and procedures is a defect to be split.
* The author of a new artefact must first decide which layer it belongs to.
  The decision is checkable: rationale (does it record a choice with alternatives?), rules (does it state declarative MUST/SHOULD content?), procedures (does it describe sequential steps?).
* The three layers have different lifecycles.
  Decisions are immutable in substance once accepted; rules are edited as they evolve; procedures are updated as the systems they describe change.
  The disciplines for each lifecycle are operationalised in cascading content standards for each artefact type.
* The decomposition forecloses some alternatives.
  A single document covering "everything about feature X" is not possible: feature X's rationale is one or more decisions, its rules are in standards, its procedures are in runbooks.
  The reader navigates between them.
* Contributors and agents grounding on the corpus can rely on the layer of an artefact to know what kind of content to expect.

## More information

* The artefact type for the *what* layer is established in a separate decision.
* The artefact type for the *how* layer is established in a separate decision.
* Auxiliary content (READMEs, templates, code comments, work-item content) is governed by a separate decision on co-location.
