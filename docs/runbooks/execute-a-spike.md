---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "work-tracking"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [work-tracking](../standards/work-tracking.md)
<!-- END-DERIVATION -->

# Execute a spike

## Purpose

The procedure to conduct a time-boxed investigation that reduces uncertainty about a technical decision.

## When to use

When the team needs to answer a question before committing to an implementation approach.
A spike is appropriate when:

* Multiple viable approaches exist and the trade-offs are unclear.
* A new technology or pattern is being evaluated.
* The scope or effort of an implementation is uncertain.
* A decision (ADR) requires concrete data to choose between options.

Do NOT use a spike when:

* The question can be answered by reading documentation or asking a colleague.
* The implementation approach is already clear and just needs doing.

## Prerequisites

* Spike work item exists with: a clear question or set of questions; a time-box; success criteria.
* Spike work item is of type `spike` (per `work-tracking.md`); the project's substrate distinguishes spikes from implementation work.

## Safety

Low risk.
Spike code is never integrated into `main`.
The branch is disposable.
All work happens in isolation.

## Procedure

1. Claim and set up.

   * Transition to `doing`.
   * Create a branch named `spike/<short-description>` (or per the project's branch convention).

1. Note the time-box boundary.

   * When the time runs out, stop and produce findings with what you have.
   * Partial answers are better than no answers.

1. Investigate.

   * Experiment with the approach(es) on the branch.
   * Write enough code to answer the questions — no more.
   * Do NOT aim for production quality; throwaway code is expected and correct.
   * Document findings as you go (in the work item, in notes, in a draft ADR).

1. Handle cascade findings.

   * As you investigate, you may discover unrelated issues, standards drift, or conflicts with accepted decisions.
   * Follow `spike-cascade-handling.md` to classify and handle these (Type 1 in-scope, Type 2 standards drift, Type 3 decision conflict).

1. Produce the output.

   * If the spike answers a decision question: draft a decision following `decision-content.md`.
   * If the spike demonstrates a pattern or approach: write a brief document or update an existing standard.
   * If the spike reveals that the work needs child work items: create them.
   * The spike branch itself is NOT integrated.
     Delete it after findings are captured.

1. Close the spike.

   * Transition to `done` (per the discovery-flow accommodation in `definition-of-done.md`).
   * Delete the spike branch.
   * Create any follow-up work items identified during the spike.
   * Link the findings artefact (decision, document, or comment) to the spike work item.

## Verification

* The original question(s) are answered, or partial answers are documented with the next step identified.
* A decision is drafted (or existing one updated) with the findings, OR the findings are captured in another corpus artefact, OR the findings are recorded as a comment on the work item.
* Follow-up work items are created if the spike recommends further action.
* The spike branch is deleted.

## Rollback

Not applicable — no code was integrated.

## Troubleshooting

### Time-box expired with no answer

Document what was tried, what blocked progress, and what the next step should be.
This is still a valid spike outcome (the answer is "more time or different approach needed").
Close the spike and create a follow-up work item if warranted.

### Spike revealed the question is wrong

Document the reframed question.
Close the spike and create a new one with the corrected question.

### Spike unearthed a much larger problem

File a separate work item (per `spike-cascade-handling.md`).
Do not expand the spike scope — time-box discipline matters.

## Escalation

If the spike findings reveal a fundamental architectural issue or conflict with an accepted decision, follow `spike-cascade-handling.md` Type 3 procedure and escalate to the person or group responsible for the affected decision.

## Related

* [`work-tracking.md`](../standards/work-tracking.md) — defines `spike` as a discovery work-item type.
* [`spike-cascade-handling.md`](spike-cascade-handling.md) — handle cascade findings during a spike.
* [`decision-content.md`](../standards/decision-content.md) — rules for the ADR a spike may produce.
* [`definition-of-done.md`](../standards/definition-of-done.md) — the discovery-flow accommodation for spike completion.
