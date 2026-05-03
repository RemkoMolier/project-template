# Standards

Standards capture the *what* layer of the corpus — the rules currently in force.
Each standard derives from one or more decisions and operationalises those decisions as checkable rules.

## Adding a new standard

1. Confirm a related decision exists, or that the standard is small enough to introduce inline (a clarification of an existing rule).
1. Copy `template.md` to `short-title-with-hyphens.md`.
   The filename stem is the standard's identifier — pick it carefully; renaming costs cross-references.
   The name MUST describe the standard's role, not the contents it lists or the specific instance it adopts.
1. Fill in the frontmatter (`status: draft`, `last-reviewed`, `review-cycle`, `derives_from`) and sections.
1. Open an integration request linked to the related decision or work item.
1. On adoption by the project, change `status` from `draft` to `active`.

## Standards in this folder

<!-- BEGIN-INDEX -->
*This index is auto-generated from each standard's frontmatter.
Do not edit by hand.*

| ID | Title | Status | Derives from | Last reviewed | Review cycle |
| --- | --- | --- | --- | --- | --- |
| [acceptance-attestation](acceptance-attestation.md) | Acceptance attestation | draft | 0008 | 2026-05-03 | annually |
| [commit-discipline](commit-discipline.md) | Commit discipline | draft | 0007 | 2026-05-03 | semi-annually |
| [compliance-matrix](compliance-matrix.md) | Compliance matrix | draft | 0007, 0008 | 2026-05-03 | semi-annually |
| [decision-content](decision-content.md) | Decision content | draft | 0001 | 2026-05-03 | semi-annually |
| [definition-of-done](definition-of-done.md) | Definition of done | draft | 0008 | 2026-05-03 | semi-annually |
| [integration-discipline](integration-discipline.md) | Integration discipline | draft | 0008 | 2026-05-03 | semi-annually |
| [runbook-content](runbook-content.md) | Runbook content | draft | 0005 | 2026-05-03 | semi-annually |
| [standard-content](standard-content.md) | Standard content | draft | 0004 | 2026-05-03 | semi-annually |
| [unified-formatting](unified-formatting.md) | Unified formatting | draft | 0009 | 2026-05-03 | semi-annually |
| [versioning-substrate](versioning-substrate.md) | Versioning substrate | draft | 0007 | 2026-05-03 | semi-annually |
| [work-tracking](work-tracking.md) | Work tracking | draft | 0007, 0008 | 2026-05-03 | semi-annually |
<!-- END-INDEX -->
