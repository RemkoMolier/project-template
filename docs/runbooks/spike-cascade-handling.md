---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0001"
  - "decision-content"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0001](../decisions/0001-adopt-decisions-as-the-founding-artefact-type.md)
* [decision-content](../standards/decision-content.md)
<!-- END-DERIVATION -->

# Handle cascade findings during a spike

## Purpose

What to do when, during a spike for authoring a decision, you encounter a documentation gap, contradiction, or inconsistency that does not belong inside the decision itself.

## When to use

You are mid-spike, drafting a decision, and you surface a finding that:

* Points to a rough edge, omission, or contradiction in `docs/standards/*`.
* Shows an apparent conflict with an already-accepted decision.
* Cannot be cleanly absorbed into the decision you are drafting.

This runbook does **not** apply to findings that *are* part of the decision — those belong in the decision per AC1 and AC2 in `decision-content.md`.

## Prerequisites

* A spike work item exists per `work-tracking.md`.
* You understand the scope of the decision you are authoring and have read `decision-content.md`.

## Procedure

### Identify the cascade type

Classify the finding into one of three types:

**Type 1 — in-scope.**
The finding fits cleanly into the decision being authored.
For example: you are drafting a decision about integration-gate conventions and discover that the project has no explicit policy for when to run integration tests — a gap that your decision resolves.

**Action:** absorb the finding into the decision.

**Type 2 — standards drift.**
The finding is a rough edge, omission, or contradiction in `docs/standards/*` that is unrelated to the decision's scope.
For example: you notice a standard uses a deprecated linter rule, or a standard is silent on a frontmatter field it should cover.

**Action:** file a separate work item describing the gap, record the link on the spike work item, and leave the refinement to a separate integration request.
Do **not** silently fix the standard in the same integration request as the decision.

**Type 3 — decision conflict.**
The finding shows that an already-accepted decision is wrong, incomplete, or requires substantive change beyond a consequence addition.
For example: your decision proposes a different historical-integrity model than ADR-0007, and the two cannot coexist.

**Action:** stop the decision drafting path, surface the finding on the spike work item, and do **not** continue.
File a supersession prompt before any decision changes continue; any superseding decision follows AC9, AC10, and the supersession discipline in `decision-content.md`.

### File the follow-up work item

For Type 2 findings, the follow-up work item must include:

* The source spike work item.
* The decision being drafted when the finding surfaced.
* The affected standard or documentation path.
* The finding and why it is outside the decision's scope.
* Acceptance criteria for resolving the gap.

For Type 3 findings, the supersession prompt is a work item asking whether an accepted decision should be superseded.
It must include:

* The source spike work item.
* The accepted decision that appears wrong, incomplete, or conflicting.
* The conflicting finding.
* The proposed direction or question to resolve.
* The impact if the accepted decision is left unchanged.
* Acceptance criteria for deciding whether to draft a superseding decision.

Keep the original spike blocked until the supersession prompt has a recorded disposition.
Valid dispositions: the conflict is rejected as a non-conflict; the original spike is closed as cancelled with a recorded reason; or a new supersession decision work item is opened.

### Apply the silent-absorption rule

Silently absorbing a Type 2 or Type 3 finding into the decision — making a standards tweak or de-facto superseding a decision without an explicit work item — is a scope-discipline violation.
Absorption of Type 2 findings hides the gap from the rest of the project.
Absorption of Type 3 findings creates an untracked supersession.

### Handle ambiguous findings

If you cannot determine whether a finding is Type 2 or Type 3 with confidence, treat it as blocking.
Record the ambiguity on the spike work item and ask for review before continuing.
If the reviewer confirms standards drift, follow the Type 2 path.
If the reviewer confirms a decision conflict, follow the Type 3 path.

## Verification

* For Type 1: the finding is addressed in the decision's content.
* For Type 2: the standards work item is filed with the required payload and linked from the spike work item.
* For Type 3: the decision drafting path is stopped, the finding is recorded on the spike work item, and a supersession prompt is filed.
* For ambiguous findings: the spike does not continue until the classification is recorded.

## Rollback

This runbook does not change code or documentation directly.
If a finding is misclassified, correct the historical record in the substrate: add a comment explaining the corrected classification, link the replacement work item if one is needed, and close the incorrect follow-up as cancelled with the reason captured.
Do not rewrite Git history (per VS4 in `versioning-substrate.md`).

## Troubleshooting

### The line between type 2 and type 3 is blurry

When in doubt, ask on the spike work item.
A second reader can often tell whether the finding is a contradiction (Type 3) or merely an omission (Type 2).

### You're unsure whether the finding is in-scope (type 1)

Apply the reversibility test from AC1 in `decision-content.md`: if you could address the finding independently of the decision, it is not Type 1.

## Escalation

If the finding raises a conflict you cannot resolve alone, flag it on the spike work item and ask the author or reviewer of the conflicting decision for input.

## Related

* [`decision-content.md`](../standards/decision-content.md) — authoring rules that cascade handling enforces.
* [`work-tracking.md`](../standards/work-tracking.md) — defines spikes as a discovery work-item type.
* [`definition-of-done.md`](../standards/definition-of-done.md) — spike work-item done criteria.
* [ADR-0001](../decisions/0001-adopt-decisions-as-the-founding-artefact-type.md) — establishes the recording discipline the cascade preserves.
* [`contributing.md`](contributing.md) — how to file a follow-up triggered by an integrated decision.
