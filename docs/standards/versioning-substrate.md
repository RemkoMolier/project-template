---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0007"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0007](../decisions/0007-adopt-historical-integrity.md)
<!-- END-DERIVATION -->

# Versioning substrate

This standard adopts the substrate that holds the corpus and the discipline that integrates changes into it.
It applies to the entire corpus.

## Substrate adoption

The substrate is **Git**.
Git satisfies the three properties named in ADR-0007:

* **Verifiable** — Git's SHA-1 (and SHA-256, where supported) hash chains make history tamper-evident.
  An altered commit produces a different hash; the divergence is detectable.
* **Provenanced** — Git supports references in commit messages and integration-request descriptions that link forward to work items and other artefacts; the work-tracking standard operationalises the work-item linkage.
* **Identified** — every commit carries an author identity; signed commits and signed tags carry cryptographic attribution.

## Rules

| # | Rule | Notes |
| - | ---- | ----- |
| VS1 | The corpus MUST be stored in a Git repository. | Substrate adoption per ADR-0007. |
| VS2 | The default branch MUST be `main`. | The canonical line; what readers see by default. |
| VS3 | The Git repository MUST track every artefact in the corpus and any auxiliary content the co-location principle places alongside them (READMEs, templates, configuration). | Per ADR-0006: auxiliary content lives where it describes. |
| VS4 | History MUST be append-only in substance. Substantive rewrites of `main` (force-push, history rewriting, commit removal) MUST NOT occur. | Verifiability: a substrate that allows silent rewrites cannot be cited. |
| VS5 | Every commit on `main` MUST be reachable from the current `main` HEAD. | Detached commits are not part of the canonical record. |
| VS6 | The Git repository MUST be hosted in a substrate that supports the integration-request mechanism described in the integration-discipline standard. | Forge-based projects use the forge's pull or merge requests; non-forge projects use an equivalent reviewed-integration mechanism. |

## Branch model

| # | Rule | Notes |
| - | ---- | ----- |
| BM1 | `main` is the canonical branch and the only branch the rest of the system depends on. | Other branches are work-in-progress. |
| BM2 | All work happens on branches other than `main`. Direct commits to `main` MUST NOT occur. | Reviewed-integration discipline. |
| BM3 | Branches that have been integrated SHOULD be deleted. | Reduces noise; the integrated commits remain reachable from `main`. |

## Rationale

Derives from ADR-0007.
Git is the substrate chosen to satisfy the historical-integrity properties named in that decision.
A future project that adopts a different substrate (Sapling, Pijul, Mercurial, hypothetical successor) supersedes this standard, not ADR-0007: the integrity properties are substrate-independent.

## Enforcement

The substrate is enforced by the project's hosting choice.
Forge-native branch protection (or equivalent: pre-receive hooks, Gerrit gating) implements VS4 and BM2.
The integration-discipline standard operationalises the discipline; this standard operationalises the substrate.

## Examples

### Verifiable history (VS4)

A contributor force-pushes a rewrite of `main` to remove a controversial commit.
This is a violation of VS4 because the rewrite is silent and the historical record diverges from what was previously published.
The correct path for removing problematic content is a revert commit, which is itself part of the record.

### A non-git substrate (hypothetical supersession)

A project chooses Pijul as its substrate.
Pijul satisfies the three integrity properties (verifiable via patch identifiers, provenanced via patch metadata, identified via authorship).
The project supersedes this standard with a `versioning-substrate.md` that adopts Pijul; ADR-0007 is unchanged.

## Related decisions

* [ADR-0007](../decisions/0007-adopt-historical-integrity.md) — establishes the historical-integrity properties this standard's substrate choice satisfies.
* [ADR-0006](../decisions/0006-co-locate-auxiliary-documentation.md) — places auxiliary content (configuration, templates) inside the same substrate.
