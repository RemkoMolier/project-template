# Runbooks

Runbooks capture the *how* layer of the corpus — procedures executed step by step.
Each runbook derives from one or more decisions or standards and operationalises a specific procedure.

## Adding a new runbook

1. Confirm the procedure is concrete enough to write down step by step.
   If it is mostly judgment, it may be a standard rather than a runbook.
1. Copy `template.md` to `verb-phrase-with-hyphens.md` (kebab-case, starts with a verb describing the procedure).
1. Fill in the frontmatter (`status: draft`, `last-reviewed`, `review-cycle`, `derives_from`) and sections.
1. Open an integration request.
1. Activation is governed by RC6 in `runbook-content.md`: set `status: active` and record `last-tested` in a follow-up integration request only after the procedure has been executed end-to-end *and* the runbook satisfies all applicable content rules (RC2 sections, RC3 expected output, RC4 rollback, RC5 triggers, RC11 safety where risk-bearing).
   A single clean execution is necessary but not sufficient.
1. Re-test cadence is governed by RC7 in `runbook-content.md`: a runbook with `last-tested` older than the project's freshness window (six months by default) is stale and SHOULD be re-tested or deprecated.

## Runbooks in this folder

<!-- BEGIN-INDEX -->
<!-- END-INDEX -->
