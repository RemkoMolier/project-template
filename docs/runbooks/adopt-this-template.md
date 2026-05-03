---
status: draft
last-reviewed: 2026-05-03
review-cycle: annually
derives_from:
  - "0008"
  - "acceptance-attestation"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md)
* [acceptance-attestation](../standards/acceptance-attestation.md)
<!-- END-DERIVATION -->

# Adopt this template

## Purpose

The procedure an adopting project follows to formally accept the foundational set of this template (decisions, standards, runbooks) as binding for its own project, and to record that acceptance with a signed Git tag.

## When to use

* You have just cloned (or forked) this template and are setting up a new project on top of it.
* You are re-accepting the foundational set after a substantive supersession (a new ADR, a new or refactored standard) — issuing a higher-version acceptance tag.

## Prerequisites

* A clone of the template repository on a working branch (or a fork of it).
* A signing key (GPG, SSH, or S/MIME) configured for `git tag -s`.
  The signing key MUST be associated with a verifiable identity (per AA2 in `acceptance-attestation.md`).
* Familiarity with the foundational set: at minimum, you have skimmed each ADR and each standard.
* The project's substrate is configured (per `versioning-substrate.md`) with branch protection on `main`.

## Safety

This procedure does not change `main` directly; it produces a tag.
The tag once published MUST NOT be deleted (per AA5 in `acceptance-attestation.md`).
If you make a mistake, the corrective path is to issue a new acceptance tag with a higher version, not to remove the old one.

## Procedure

### Read each artefact

1. Read each decision in `docs/decisions/` in numerical order.
   For each decision, decide: **accept as-is** or **supersede**.
1. Read each standard in `docs/standards/`.
   For each standard, decide: **accept as-is**, **fill in placeholders** (for `work-tracking.md`), or **supersede**.
1. Read each runbook in `docs/runbooks/`.
   For each runbook, decide: **accept as-is** or **supersede**.

   For runbooks, "accept as-is" still requires execution before the runbook moves to `active` (per RC6).
   Acceptance and execution are different gates.

### Author project-specific supersessions

1. For each artefact you supersede, author a project-specific replacement following the relevant content standard.
   Decisions: per `decision-content.md`.
   Standards: per `standard-content.md`.
   Runbooks: per `runbook-content.md`.
1. Project-specific decisions MUST use numbers in the project's range (`0010` onwards if the template ships ADRs `0001`-`0009`).
1. The superseded template ADR's frontmatter MUST set `status: superseded` and reference the project-specific superseder via `superseded_by`.

### Flip statuses

1. For each accepted decision, change frontmatter `status` from `proposed` to `accepted`.
1. For each accepted standard, change frontmatter `status` from `draft` to `active`.
   For `work-tracking.md`, also fill in the *Substrate*, *Reference format*, and project-specific lifecycle refinements.

   Runbooks remain `draft` until they have been executed end-to-end (per RC6); status flips for runbooks are not part of the acceptance ceremony.

1. Open an integration request containing the status flips and any project-specific authoring.

   Expected output: the integration gate passes; one or more reviewers approve per `integration-discipline.md`.

### Sign the acceptance tag

1. After the integration request is integrated into `main`, identify the merge commit.
1. Sign and push the acceptance tag (per AA1, AA3, AA4 in `acceptance-attestation.md`):

   ```bash
   git tag -s accept-foundational-set-v1 -m "$(cat <<'EOF'
   Accept foundational set v1.

   Accepted by: <Project name>, <YYYY-MM-DD>.

   This project adopts the template's foundational set as shipped, with
   the following supersessions: <list, or "none">.
   EOF
   )"
   git push origin accept-foundational-set-v1
   ```

   Expected output: the tag appears in the substrate's tag list; the signed tag passes signature verification.

1. Announce the acceptance.
   The project is now bound by the accepted foundational set.

## Verification

* The acceptance tag exists on the substrate and verifies its signature.
* All decisions accepted are `status: accepted`.
* All standards accepted are `status: active` (with placeholders filled where applicable).
* Runbooks remain `draft` (or `active` if executed and dated separately).
* Project-specific supersession ADRs (if any) are merged.

### Beyond `npm run validate`

Tag-signing is the *attestation* of acceptance, not the verification of governance completeness.
`npm run validate` confirms artefact integrity (formatting, frontmatter, indexes, cascade references); it does not confirm that placeholders have been replaced with real content, that the integration-enforcement mechanism is actually configured, or that the project's chosen substrate behaves as the standards claim.

Before signing the acceptance tag, walk the **Adoption readiness checklist** in the project's README and confirm each item by inspection:

* `work-tracking.md` *Substrate* and *Reference format* sections contain real content, not placeholders.
* The integration-enforcement mechanism on `main` actually rejects direct pushes (try one against a test branch as a sanity check before tagging).
* Project-specific cascading runbooks exist for severity classifications, deploy mechanism, on-call rotation, and rollback procedures referenced as project-specific.

Signing the tag against an incomplete readiness state is itself a governance defect.
Correct it via a higher-numbered acceptance tag (per AA6 in `acceptance-attestation.md`) once readiness is reached.

## Rollback

There is no rollback once the acceptance tag is published.
Errors in acceptance are corrected by issuing a new acceptance tag at a higher version (`accept-foundational-set-v2`, etc.) with a tag message that explains the correction.
The old tag remains in place.

## Troubleshooting

### My signing key isn't recognised

Confirm the key is registered with the substrate (forge profile, organisation key registry).
A locally-valid signing key that is unknown to the substrate fails AA2.

### A standard's `work-tracking.md` placeholders aren't filled

`work-tracking.md` ships as `draft` precisely because its *Substrate* and *Reference format* sections require project-specific content.
Fill them in as part of the acceptance ceremony before flipping `status: active`.

### I want to accept some artefacts but not others

That is supported.
Supersede the artefacts you want to replace; accept the rest as-is.
The acceptance tag covers the whole set as it stands at the tagged commit, including your supersessions.

## Escalation

If the acceptance ceremony reveals a defect in the template that needs upstream attention, open an integration request against the template's repository describing the defect.
The template improves through these contributions.

## Related

* [`acceptance-attestation.md`](../standards/acceptance-attestation.md) — the standard this runbook executes.
* [`decision-content.md`](../standards/decision-content.md) — rules for project-specific supersession ADRs.
* [`standard-content.md`](../standards/standard-content.md) — rules for project-specific superseding standards.
* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md) — the transition discipline that requires explicit acceptance.
