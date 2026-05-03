---
status: proposed
date: 2026-05-03
---

# Adopt historical integrity

## Context and problem statement

ADR-0002 establishes the corpus.
ADR-0003 decomposes it into three layers.
ADRs 0001, 0004, and 0005 establish the artefact types for each layer.

The corpus's value depends on its **historical record** being trustworthy.
A reader who consults the corpus to understand why the system has its current shape, or what rules apply, or how to perform a procedure, is implicitly relying on the record to be:

* Genuine — what the record says happened, actually happened.
* Traceable — every artefact can be connected back to the rationale that motivated it.
* Attributable — every change is the work of a known author, not an anonymous mutation.

If any of these properties fails, the corpus stops being a reliable source of truth.
A record that can be silently rewritten cannot be cited; lineage that cannot be reconstructed cannot ground reasoning; changes whose authorship cannot be established cannot be reviewed for accountability.

These properties are *substrate-independent*: they are required of any system that holds the corpus, regardless of which versioning tool, which review mechanism, or which forge the project chooses.
The substrate satisfies them or the corpus is not trustworthy.

What properties must the historical record have?

## Decision drivers

* The record must be cite-able by other artefacts and by external readers; citations must remain valid as the corpus evolves.
* The record must be reviewable: every change must be inspectable in terms of what was added, removed, or modified.
* The record must support the project's audit needs (compliance, security review, root-cause analysis).
* Agents reasoning over the corpus must be able to follow lineage from any artefact to the rationale that justifies it.
* The properties must be checkable against any candidate substrate, so substrate choice is evaluable rather than dogmatic.

## Considered options

* **No record-integrity commitment** — substrate is chosen on convenience; integrity is whatever the substrate happens to provide.
* **Implicit integrity** — assume the substrate is trustworthy without naming what that means.
* **Explicit integrity properties** — name the properties any substrate must satisfy; evaluate substrate choices against them.

## Decision outcome

Adopt **historical integrity** as a property of the corpus.
The historical record has these three properties:

* **Verifiable** — the record is tamper-evident.
  Once recorded, alteration is detectable.
  A reader can confirm that the record they are reading is what was recorded, not a silent rewrite.
* **Provenanced** — every artefact in the corpus has unambiguous lineage to the rationale that motivated it.
  A reader can trace from any artefact to the work item or discussion that produced it, and from there to the decision that justified it.
* **Identified** — every change to the corpus is attributable to a named author (human or agent).
  A reader can determine who made each change, even if they cannot determine *why* without following the provenance trail.

The substrate that holds the corpus must satisfy these three properties.
The choice of substrate, the discipline by which changes are integrated, the conventions for commits and integration requests, and the work-tracking model that captures provenance are operationalised in cascading standards.

## Consequences

* A substrate that lacks any of the three properties is unsuitable for the corpus.
  Substrate choice is evaluable: compare the candidate against verifiable / provenanced / identified.
* Provenance imposes a discipline beyond the substrate itself: every change must link to a work item that captures motivation, and every work item must be reachable from the changes it produced.
  The discipline is operationalised in the work-tracking and integration cascades.
* Identity imposes a discipline on attribution: contributors author under known identities; agent contributions are recorded as such.
  The mechanism is operationalised in the commit-discipline cascade.
* Verifiability imposes a discipline on the substrate: history is append-only in substance; rewrites are visible.
  The mechanism is a property of the substrate cascade.
* The integrity properties are *static* properties of the record (what is true of the corpus at any moment), not *dynamic* properties of how it changes.
  Dynamic properties — what gates each change, who attests to each transition — are the subject of a separate decision.

## More information

* The substrate that satisfies these properties for this project is operationalised in a cascading substrate standard.
* The discipline by which changes become part of the record is operationalised in the commit-discipline and integration-discipline cascades.
* The work-tracking model that captures provenance is operationalised in a cascading work-tracking standard.
* Dynamic properties of state changes (gating, attestation) are the subject of a separate decision.
