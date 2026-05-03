---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0008"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md)
<!-- END-DERIVATION -->

# Integration discipline

This standard governs the discipline by which changes are integrated into the canonical record.
It applies to every integration request the project produces.

An *integration request* is the abstract concept the project uses for the unit of reviewed change that brings commits to `main`.
In forge-based projects it is a merge request or pull request; in non-forge projects it may be an emailed patch series, a Gerrit change, a mailing-list review, a signed commit-queue submission, or another documented review mechanism.
The rules below apply to whichever form the project uses.

## Branch naming

| # | Rule | Notes |
| - | ---- | ----- |
| BR1 | Use a topical, kebab-case branch name. | `add-session-rotation`, `fix-cache-hit-rate-logging`. |
| BR2 | Prefix the branch name with the work-item identifier when one exists. The reference format is defined in the work-tracking standard. | Example: `42-add-session-rotation` or `PROJ-123-add-session-rotation`. |
| BR3 | Avoid generic names. | `feature`, `wip`, `temp`, `dev`. |

## Integration requests

| # | Rule | Notes |
| - | ---- | ----- |
| IR1 | Every integration request MUST link to at least one work item using the reference format defined in the work-tracking standard, via `Closes <ref>` or `Related-to <ref>` in the description, cover letter, or commit trailer. | The work item carries the *why*. |
| IR2 | The integration-request description (or cover letter) MUST explain *what changed and why*, not just *what changed*. | The diff shows what. |
| IR3 | All required validation checks MUST pass at the integration gate before integration. | Required gate. |
| IR4 | At least one human approval is required before integration. | Required attestation; see IA1 below. |
| IR5 | Hotfixes follow the same integration discipline, expedited if necessary. | The integration request exists; only the timeline differs. |
| IR6 | Documentation affected by a change MUST be updated in the same integration request as the change. | Applies to decisions, standards, runbooks, API documentation, and READMEs. |
| IR7 | An integration request introduced by an agent MUST identify the agent in the description. | Identified property of the historical record (per ADR-0007); agent involvement is recorded in the IR description, not in commit `Co-Authored-By` trailers (per CM11 in commit-discipline). |

## Integration enforcement

The integration gate is the technical mechanism that enforces the discipline.
The `main` branch is protected: direct pushes are rejected; integration occurs only through the project's chosen reviewed-integration mechanism.

| # | Rule | Notes |
| - | ---- | ----- |
| IE1 | The project MUST configure technical enforcement of "no direct push to `main`, no integration without review and a passing integration gate". | Social agreement is insufficient; the substrate must reject violations. |
| IE2 | Implementation varies by mechanism — forge-native branch protection, server-side pre-receive hooks, Gerrit gating, maintainer-curated patch queues, or equivalent. The project MUST document which mechanism is in use in `versioning-substrate.md` or in a project-specific cascading standard. | Forge-based projects typically use forge-native branch protection. |
| IE3 | The integration-enforcement mechanism MUST require a passing integration gate before merge. | Validation cannot be bypassed by approval alone. |
| IE4 | The integration-enforcement mechanism MUST require at least one approving review before merge. | Approval cannot be bypassed by validation alone. |

## Integration attestation

Reviewer approval is the attestation mechanism for the integration transition (per ADR-0008).

| # | Rule | Notes |
| - | ---- | ----- |
| IA1 | An approving review MUST come from a contributor other than the integration request's author. | Self-approval defeats the attestation. |
| IA2 | An approving review MUST be recorded in the substrate (forge approval, signed `Reviewed-by` trailer, signed acknowledgment in the integration mechanism). | The attestation must survive in the historical record. |
| IA3 | An approving review attests that the reviewer has examined the change against the project's standards and considers it acceptable for integration. | Approvals carry weight; reviewers are accountable for them. |
| IA4 | A change to an approved integration request that is non-trivial in substance MUST re-acquire approval. | An approval attests to a specific state, not to a moving target. |

## Rationale

Derives from ADR-0008.
The rules above operationalise the *explicit criteria* and *attestation* properties of transition discipline at the integration boundary: criteria via IR3-IR6 and IE3, attestation via IR4 and IA1-IA4.

The branch-naming rules (BR1-BR3) sit here because branches culminate in integration requests; they could plausibly live in the commit-discipline standard but the integration boundary is where the work-item reference enforced by BR2 most matters.

## Enforcement

Mechanical:

* Branch naming patterns can be checked by a pre-receive hook or forge automation.
* IR1 (work-item linkage) is checkable by inspecting the integration request's description and trailers.
* IR3 (integration gate) is the substrate-level gate.
* IE1-IE4 are configured at the substrate or forge.
* IA1, IA2 are typically substrate-level gates.

Review-only:

* IR2 (description quality), IR6 (documentation updates), IA3 (approval substance), IA4 (re-approval after substantive change).

## Examples

A forge-based example: a contributor opens a merge request titled `feat(auth): add session rotation`, with a description explaining the rotation policy, what it changes for clients, and how to verify the change in staging.
The MR description references work item `#42` via `Closes #42`.
The integration gate runs the project's validation; a colleague reviews and approves; the MR merges.

An incorrect example: a contributor opens an integration request with a one-line description "small fix", no work-item reference, and self-approves by tagging themselves as the reviewer.
This violates IR2, IR1, and IA1.

## Related decisions

* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md) — establishes the explicit-criteria and attestation properties this standard operationalises at the integration boundary.
* [ADR-0007](../decisions/0007-adopt-historical-integrity.md) — establishes the integrity properties that integration discipline contributes to (provenance via IR1, identity via IR7).
