---
status: draft
last-reviewed: 2026-05-03
review-cycle: annually
derives_from:
  - "0008"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md)
<!-- END-DERIVATION -->

# Acceptance attestation

This standard governs the acceptance event: the moment when an adopting project formally accepts the foundational set (or a subsequent superseding set) as binding.
It applies to the foundational-set acceptance ceremony only.
Other transition attestations (commit signing, integration approval, work-item completion) are governed by their own cascading standards.

## Mechanism adoption

Acceptance is recorded as a **signed Git tag**.
A signed tag carries a cryptographic attestation from the accepting party that the tagged commit represents the accepted state.

Signed tags satisfy the attestation property of ADR-0008:

* They are explicit (the tag exists or it doesn't).
* They are recorded in the historical record (as Git tags).
* They are attributable (the signing key identifies the attester).
* They are immutable in substance (a tag can be moved, but the original signed tag's attestation does not transfer to a new commit).

## Rules

| # | Rule | Notes |
| - | ---- | ----- |
| AA1 | Acceptance of the foundational set MUST be recorded as a signed Git tag on the commit that represents the accepted state. | Unsigned tags do not satisfy the attestation requirement. |
| AA2 | The signing key MUST be associated with a verifiable identity (a verified email on the forge, an organisation-issued key, or an equivalent identity registry). | Otherwise the signature attests to a key, not a person or organisation. |
| AA3 | The tag name MUST follow the pattern `accept-<set-name>-v<N>`, where `<set-name>` identifies the set being accepted (`foundational-set` for the template's own foundational set; project-chosen names for subsequent supersession sets) and `<N>` is a positive integer. | Examples: `accept-foundational-set-v1`, `accept-platform-charter-v2`. |
| AA4 | The tag message MUST identify the set being accepted, the date of acceptance, the accepting party, and the rationale for acceptance (or supersession of a prior set). | The tag message is the human-readable record. |
| AA5 | Once an acceptance tag is created, it MUST NOT be deleted. Errors in acceptance are corrected by issuing a corrective acceptance tag (with a new `<N>` and a tag message that explains the correction). | Tag deletion would silently rewrite the historical record. |
| AA6 | A new acceptance tag (a higher `<N>` for the same `<set-name>`) supersedes prior acceptance tags for that set. The supersession is implicit in the version number; the tag message MAY explain the supersession. | Adopting projects can re-accept after substantive supersession of artefacts in the set. |

## Acceptance ceremony

The procedure for executing the acceptance ceremony is operationalised in a runbook (`adopt-this-template.md`).
At a high level:

1. The accepting party reads each artefact in the set being accepted.
1. For each artefact the party either accepts it as-is or supersedes it (introducing a project-specific replacement that supersedes the template's version).
1. The party flips the `status` of each accepted artefact (`proposed` → `accepted` for decisions; `draft` → `active` for standards).
1. The party signs the acceptance tag on the commit that includes those status flips.

## Rationale

Derives from ADR-0008.
Signed Git tags are the attestation mechanism chosen for the acceptance transition because they are native to the substrate (per `versioning-substrate.md`), cryptographically attributable (per the signing-key requirement), and immutable in substance (tags cannot be silently rewritten without leaving evidence).

## Enforcement

* AA1, AA2 — verified mechanically by the integration gate during the acceptance ceremony.
  A pre-receive hook or forge-native protection MAY reject unsigned tags or tags signed by unknown keys.
* AA3 — verified by the runbook procedure and by review.
* AA4 — verified by review of the tag message during the acceptance ceremony.
* AA5 — enforced by the substrate (Git tag-deletion on `main` requires force-push or admin override; both are visible in the historical record).
* AA6 — implicit in the tag-naming convention.

## Examples

### A correctly-formed acceptance tag

```text
git tag -s accept-foundational-set-v1 -m "$(cat <<'EOF'
Accept foundational set v1.

Accepted by: Acme Engineering, 2026-08-15.

This project adopts ADRs 0001-0009 and the cascading standards as
shipped in the template. No supersessions in this acceptance.
EOF
)"
git push origin accept-foundational-set-v1
```

### A correctly-formed corrective acceptance

```text
git tag -s accept-foundational-set-v2 -m "$(cat <<'EOF'
Accept foundational set v2 (corrects v1).

Accepted by: Acme Engineering, 2026-08-22.

v1 missed the project-specific supersession of ADR-0009 (we use
AsciiDoc, not Markdown). v2 includes the supersession ADR and the
project's `unified-formatting.md` standard adopting AsciiDoc.
EOF
)"
git push origin accept-foundational-set-v2
```

### A violation: deleting an old acceptance tag (AA5)

A project decides to "clean up" by deleting `accept-foundational-set-v1` after publishing v2.
This is a violation: the historical record loses evidence that v1 was ever accepted.
The correct path is to leave v1 in place; v2's existence implicitly supersedes it.

## Related decisions

* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md) — establishes the attestation property this standard operationalises for the acceptance transition.
* [ADR-0007](../decisions/0007-adopt-historical-integrity.md) — the integrity properties (verifiable, identified) that signed tags strengthen.
