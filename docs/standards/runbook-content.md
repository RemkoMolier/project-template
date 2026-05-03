---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0005"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0005](../decisions/0005-adopt-a-runbooks-artefact-for-the-how.md)
<!-- END-DERIVATION -->

# Runbook content

This standard governs the *content* of runbooks — the format conventions, where runbooks live, the rules for what belongs inside one, and the discipline for the `draft` → `active` lifecycle.
It applies to every runbook in `docs/runbooks/`.

## Format

| # | Rule | Notes |
| - | ---- | ----- |
| FR1 | Runbooks MUST contain executable procedures (sequential *how*), not declarative rules or decision rationale. | Rules belong in standards per ADR-0004; rationale belongs in decisions per ADR-0001. |
| FR2 | Runbooks MUST live in `docs/runbooks/`. | The folder layout is auxiliary content per ADR-0006. |
| FR3 | Runbook filenames MUST follow the pattern `verb-phrase-with-hyphens.md` (kebab-case, no numeric prefix). | The filename stem is the runbook's identifier and SHOULD start with a verb describing the procedure. |
| FR4 | A runbook's filename stem SHOULD name the procedure performed, not the system involved. | `respond-to-an-incident.md` (procedure) over `incident-response.md` (system). |

## Frontmatter

| Field | Required | Values | Purpose |
| ----- | -------- | ------ | ------- |
| `status` | Yes | `draft`, `active`, `deprecated` | Lifecycle state |
| `last-reviewed` | Yes | `YYYY-MM-DD` | When the content was last verified as current |
| `last-tested` | When `active` | `YYYY-MM-DD` | When the procedure was last executed end-to-end |
| `review-cycle` | Yes | `quarterly`, `semi-annually`, `annually` | How often the runbook should be reviewed |
| `derives_from` | Yes | List of four-digit decision identifiers OR standard identifiers | The decision(s) and/or standard(s) this runbook operationalises |

The `derives_from` field MAY mix decision identifiers (four-digit strings) and standard identifiers (filename stems as strings).
Use a list even when there is only one entry.

The runbook's title is the H1.
The runbook's identifier is the filename stem (without `.md`).

## Folder layout

The `docs/runbooks/` folder contains:

* `README.md` — describes the type, the procedure for adding a runbook, and the auto-generated index between `<!-- BEGIN-INDEX -->` and `<!-- END-INDEX -->` markers.
  Content between the markers MUST NOT be edited by hand.
* `template.md` — the starting point for a new runbook.
* The runbooks themselves.

Each runbook's body contains a `<!-- BEGIN-DERIVATION -->` ... `<!-- END-DERIVATION -->` marker pair immediately above the H1.
Content between the markers MUST NOT be edited by hand; it is regenerated from the `derives_from` frontmatter as a `**Derives from:**` caption followed by a bullet list of references.

## Authoring rules

| # | Rule | Notes |
| - | ---- | ----- |
| RC1 | A runbook MUST contain executable procedures (sequential *how*), not declarative rules or decision rationale. | If a document requires more judgment than step-following, it is not a runbook. |
| RC2 | A runbook MUST contain the following sections: Purpose, When to use, Prerequisites, Procedure, Verification, Rollback, Troubleshooting, Related. It SHOULD contain Escalation when the procedure can block production, releases, access, or incident response. | Authoring and corpus-process runbooks MAY omit Escalation when Troubleshooting and Related provide the appropriate support path. Additional sections such as Safety or Notes MAY be added. |
| RC3 | Each step in the Procedure section MUST be concrete enough to follow without judgment — imperative action, not advisory. Steps SHOULD include expected output (text, status code, or observable outcome) or a reference to the Troubleshooting section when they invoke tooling, change external state, or have a non-obvious failure path. | Expected output grounds the executor for operational steps. |
| RC4 | The Rollback section MUST contain either a step-by-step rollback procedure or an explicit "no rollback possible" statement. | An absent or empty Rollback section is a violation. |
| RC5 | The When-to-use section MUST list specific triggers (alert names, error messages, symptoms, scenarios, lifecycle events). When present, the Escalation section MUST name concrete teams, channels, or individuals — not generic "contact your administrator" language. | These are the discovery and escalation hooks. |
| RC6 | A runbook with `status: draft` MUST NOT carry `last-tested`. The transition from `draft` to `active` MUST NOT occur until the procedure has been executed end to end at least once, and the execution date recorded in `last-tested`. On every subsequent execution (drill or production), `last-tested` MUST be updated. | Codifies the draft→active execution gate from ADR-0005. "End to end" means the full procedure, not a partial test. |
| RC7 | A runbook with `last-tested` older than six months is stale and SHOULD be re-tested. A re-test that finds the procedure no longer works MUST result in an update to the runbook or its deprecation. | The six-month window is the default; projects MAY tighten it for high-risk runbooks. |
| RC8 | A runbook MUST cite the decision(s) and/or standard(s) it derives from via `derives_from` frontmatter and the auto-generated derivation block. A `Related` section at the end MAY also list related artefacts. | The frontmatter is the source of truth. |
| RC9 | A runbook MUST include a Related section referencing artefacts the procedure depends on (other runbooks, standards, decisions). | Unlike standards (which use a `Derives from` derivation block and `Related decisions` section), runbooks use a `Related` section because they typically relate to a mix of artefact types. |
| RC10 | A runbook SHOULD make the support or maintenance path clear when the project has designated owners, teams, channels, or review groups for the procedure. It MUST NOT invent owner names or channels that do not exist in the project's work-tracking or review substrate. | If no ownership registry exists, `last-reviewed`, `review-cycle`, Troubleshooting, and Related remain the maintenance signal. |
| RC11 | A runbook that can affect production, releases, credentials, access control, external services, irreversible data, or user-visible state MUST state the blast radius, required permissions, and whether the procedure is safe to rehearse. | This information MAY live in Prerequisites, a Safety section, Procedure notes, or Rollback. A low-risk authoring or corpus-process runbook need not add a Safety section just to say it has none. |
| RC12 | When `last-tested` is added or updated, the integration request SHOULD state what kind of execution produced it: drill, production execution, or partial validation. | Frontmatter stores the date; review context stores the evidence. |
| RC13 | A deprecated runbook MUST identify its replacement or state explicitly that there is no replacement. | A deprecated procedure without a successor note is dangerous because readers may not know whether to stop, use another runbook, or improvise. |

## Rationale

Derives from ADR-0005.
The rules above operationalise the discipline that makes the corpus's *how* layer trustworthy under stress.

## Enforcement

This standard is enforced by review.

| Rule | Mode |
| ---- | ---- |
| FR1, FR2, FR3, FR4 | Mechanical for filename and folder; review for naming and content shape |
| RC1, RC3 | LLM judgment |
| RC2 | Mechanical for required heading presence; review for whether Escalation is required |
| RC4, RC8, RC9 | Mechanical: heading presence and `derives_from` presence checks |
| RC5 | LLM judgment for specificity |
| RC6 | Mechanical: presence of `last-tested` on draft runbooks is a violation |
| RC7 | Mechanical: date comparison for staleness |
| RC10, RC11, RC12 | Review judgment |
| RC13 | Mechanical for deprecated runbooks; review for replacement clarity |

## Examples

### A runbook that violates RC6 (draft with fabricated last-tested)

A `draft` runbook with `last-tested: 2026-01-01` is a violation.
A draft runbook has never been executed end to end; `last-tested` must not appear until the first successful execution.

### A runbook that correctly follows RC4 (explicit no-rollback)

A Rollback section that says "no rollback is possible — the deployment mutates the database schema irreversibly" satisfies RC4; the executor knows the stakes before executing.

### A runbook that correctly follows RC11 (safe rehearsal stated)

A deployment-rollback runbook says the procedure restarts the API deployment in production, requires deployment-admin access, and can be rehearsed only in staging because production execution interrupts in-flight requests.
That satisfies RC11 because the executor knows the blast radius, permissions, and rehearsal boundary before starting.

### A runbook that correctly follows RC13 (deprecated with replacement)

> Deprecated.
> Use [`restore-service-from-backup.md`](restore-service-from-backup.md) instead.

This is valid because readers have an explicit next procedure.

## Related decisions

* [ADR-0005](../decisions/0005-adopt-a-runbooks-artefact-for-the-how.md) — adopts runbooks as the artefact type for the how layer.
* [ADR-0001](../decisions/0001-adopt-decisions-as-the-founding-artefact-type.md) — defines the decisions that runbooks may cascade from.
* [ADR-0004](../decisions/0004-adopt-a-standards-artefact-for-the-what.md) — defines the standards that runbooks operationalise.
* [ADR-0006](../decisions/0006-co-locate-auxiliary-documentation.md) — the co-location principle that places per-type content with its type.
