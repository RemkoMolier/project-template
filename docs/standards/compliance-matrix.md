---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0007"
  - "0008"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0007](../decisions/0007-adopt-historical-integrity.md)
* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md)
<!-- END-DERIVATION -->

# Compliance matrix

This standard is a navigational aid: a single table that maps each rule family in the corpus to its canonical source, its enforcement mode, and the location of the evidence that proves compliance.
It is **not** a source of truth for rule text.
The canonical sources listed below remain authoritative; this matrix exists so a reader (or auditor, or agent) can answer "where do I look for X?" without scanning every standard.

## Matrix

| Rule family | Canonical source | Enforcement mode | Evidence location | Notes |
| ----------- | ---------------- | ---------------- | ----------------- | ----- |
| Decision content | [`decision-content.md`](decision-content.md) | hybrid | Indexer (filename, frontmatter, cascade markers); integration-request review | AC11 forward-reference check is mechanical; AC14 cascade-existence test mechanical; AC1, AC4, AC5, AC12 are review judgment |
| Standard content | [`standard-content.md`](standard-content.md) | hybrid | Indexer (frontmatter incl. `derives_from`, marker presence, ADR-existence); integration-request review | FC4 role-based naming and SC15 per-type-content-with-its-type are review judgment |
| Runbook content | [`runbook-content.md`](runbook-content.md) | hybrid | Indexer (RC6 `last-tested` gate, RC7 staleness comparison); integration-request review | RC1, RC3, RC5 are review or LLM judgment |
| Unified formatting | [`unified-formatting.md`](unified-formatting.md) | mechanical | `markdownlint-cli2` via `.markdownlint-cli2.jsonc`; Husky `pre-commit` hook; integration gate | Custom rules: sentence-case headings, one-sentence-per-line wrapping |
| Versioning substrate | [`versioning-substrate.md`](versioning-substrate.md) | hybrid | Substrate configuration (forge branch protection, server-side hooks, or equivalent); integration-request review | VS3 (corpus completeness) is review judgment |
| Commit discipline | [`commit-discipline.md`](commit-discipline.md) | hybrid | `commitlint` via Husky `commit-msg` hook and integration gate; integration-request review | CH1-CH4 hygiene and CS1-CS3 commit signing are review or substrate-level |
| Integration discipline | [`integration-discipline.md`](integration-discipline.md) | hybrid | Substrate (forge branch protection, pre-receive hooks, or equivalent) for IE1-IE4 and IA1-IA2; integration-request review for IR2, IR6, IA3-IA4 | Project-specific configuration required |
| Work tracking | [`work-tracking.md`](work-tracking.md) | review | Substrate workflow + integration-request review; the *Substrate* and *Reference format* sections ship as project-fill-in | WT4 enforcement via `commitlint` and integration-gate checks activates only after the project fills in *Reference format* |
| Acceptance attestation | [`acceptance-attestation.md`](acceptance-attestation.md) | hybrid | Substrate (signed-tag verification for AA1-AA2); integration-request and tag-message review for AA3-AA4, AA6 | AA5 (no tag deletion) enforced by the substrate's tag protection |
| Definition of done | [`definition-of-done.md`](definition-of-done.md) | hybrid | Integration gate for DO3 (validation), DO4 (approval), DO7 (integrated to `main`); integration-request review for DO1, DO5, DO6, DO8 | DA1-DA2 attestation is recorded by the substrate via the integration request |

## Enforcement-mode legend

* **Mechanical** — a tool or check determines yes/no compliance without human interpretation.
* **Review** — a reviewer determines compliance by reading the change against the canonical source.
* **Hybrid** — some rules in the family are mechanical; others are review.

## Rationale

Derives from ADR-0007 (historical integrity, which depends on auditable enforcement) and ADR-0008 (explicit transition discipline, which surfaces enforcement modes as part of every state transition).
The matrix supports both: an auditor can verify that each rule family has an explicit enforcement path; a reviewer can locate the evidence for any compliance claim without reading every standard.

## Enforcement

This standard is itself enforced by review.
A reviewer of the matrix verifies that each row's *Canonical source* link is valid and that the *Enforcement mode* and *Evidence location* match the cited standard.

When a row drifts from its canonical source (a standard adds a new rule family, or changes an enforcement mode), the matrix is updated in the same integration request as the source change.
This standard's `last-reviewed` date is bumped at every such change.

## Examples

### Locating evidence for a rule

A reviewer wants to know how RC6 (the `last-tested` gate) is enforced.
The matrix's *Runbook content* row points to the indexer as the mechanical evidence; the runbook author and reviewer can rely on the indexer's frontmatter validation to catch RC6 violations.

### Identifying review-only families

The *Work tracking* row marks the family as `review` overall, with a note that `commitlint` enforcement of WT4 only activates after the *Reference format* placeholder is filled.
A new contributor reading this row immediately understands that work-tracking compliance depends on project configuration, not just template defaults.

## Related decisions

* [ADR-0007](../decisions/0007-adopt-historical-integrity.md) — historical integrity, which the matrix supports by surfacing enforcement evidence.
* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md) — transition discipline, which the matrix surfaces per rule family.
