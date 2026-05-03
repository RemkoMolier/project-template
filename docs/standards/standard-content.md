---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0004"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0004](../decisions/0004-adopt-a-standards-artefact-for-the-what.md)
<!-- END-DERIVATION -->

# Standard content

This standard governs the *content* of standards — the format conventions, where standards live, the rules for what belongs inside one, the discipline for the `draft` → `active` lifecycle, and the discipline for naming.
It applies to every standard in `docs/standards/`, including this one.

## Format

| # | Rule | Notes |
| - | ---- | ----- |
| FC1 | Standards MUST use the section structure: scope paragraph, normative rule content, Rationale, Enforcement, optional Examples, Related decisions. | Normative rule content MAY live in `## Rules`, in domain-specific rules sections, or in domain-specific sections that contain rule tables. |
| FC2 | Standards MUST live in `docs/standards/`. | The folder layout is auxiliary content per ADR-0006. |
| FC3 | Standard filenames MUST follow the pattern `short-title-with-hyphens.md` (kebab-case, no numeric prefix). | The filename stem is the standard's identifier. |
| FC4 | A standard's filename stem MUST name the *role* the standard plays, not the contents it lists or the specific instance it adopts. | `unified-formatting.md` (role) over `markdown-formatting.md` (contents-list); `versioning-substrate.md` (role) over `git-substrate.md` (instance). |

## Frontmatter

| Field | Required | Values | Purpose |
| ----- | -------- | ------ | ------- |
| `status` | Yes | `draft`, `active`, `deprecated` | Lifecycle state |
| `last-reviewed` | Yes | `YYYY-MM-DD` | When the content was last verified as current |
| `review-cycle` | Yes | `quarterly`, `semi-annually`, `annually` | How often the standard should be reviewed |
| `derives_from` | Yes | List of four-digit decision identifiers as strings | The decision(s) this standard operationalises |

The `derives_from` field MAY contain more than one identifier when the standard operationalises multiple decisions.
Use four-digit identifiers as strings; use a list even when there is only one.

The standard's title is the H1.
The standard's identifier is the filename stem (without `.md`).

## Folder layout

The `docs/standards/` folder contains:

* `README.md` — describes the type, the procedure for adding a standard, and the auto-generated index between `<!-- BEGIN-INDEX -->` and `<!-- END-INDEX -->` markers.
  Content between the markers MUST NOT be edited by hand; it is regenerated from artefact frontmatter and H1 headings.
* `template.md` — the starting point for a new standard.
* The standards themselves.

Each standard's body contains a `<!-- BEGIN-DERIVATION -->` ... `<!-- END-DERIVATION -->` marker pair immediately above the H1.
Content between the markers MUST NOT be edited by hand; it is regenerated from the `derives_from` frontmatter as a `**Derives from:**` caption followed by a bullet list of references.

## Authoring rules

| # | Rule | Notes |
| - | ---- | ----- |
| SC1 | A standard MUST contain normative rules (declarative *what*), not decision rationale or step-by-step procedures. | Rationale belongs in decisions per AC1; procedures belong in runbooks per the runbook-content standard. |
| SC2 | Each rule MUST have a stable, unique identifier (e.g., `SC1`, `IR2`, `DO3`) that persists across edits. | The identifier is the rule's public name for cross-referencing. |
| SC3 | Each rule statement MUST use RFC 2119 keywords (MUST, SHOULD, MAY) as the operative verb. | The keyword encodes the severity of the obligation. |
| SC4 | Each rule SHOULD be specific enough to be checkable mechanically, by review, or by an LLM. Rules that are checkable only by review MUST be identified as such in the Enforcement section. | A rule is checkable if a tool or reviewer can determine yes/no compliance without interpretation. |
| SC5 | A standard MUST NOT duplicate rules from another standard. It MUST reference them instead. | Prevents rule fragmentation. The lens: rules apply where their subject lives. |
| SC6 | A standard MUST cite the decision(s) that justify it via `derives_from` frontmatter and via the auto-generated `Derives from` derivation block. A reference to the same decision MAY also appear in a `Related decisions` section at the end. | The frontmatter is the source of truth; the derivation block is the human-readable reflection. |
| SC7 | A standard MUST declare its scope in the opening paragraph — what falls inside and outside it, and what artefacts it applies to. | The scoping paragraph is the reader's first signal for whether they need this standard. |
| SC8 | A standard MUST contain normative rule content, a Rationale section, and an Enforcement section. It SHOULD contain Examples when examples would clarify application. | The Enforcement section MUST name the mechanism (linter, integration gate, review) and, where automated, the tool and config location. |
| SC9 | A standard MAY be edited in place when the rule it captures evolves within the same intent. When the approach is fundamentally different, the old standard MUST be set to `status: deprecated` and a new standard introduced; the rationale for the change MUST be captured in a decision. | An edit refines the same rule; deprecate-and-replace signals that the old rule is wrong or no longer applies. |
| SC10 | A standard's filename stem is its identifier and MUST NOT change without updating all cross-references in the same integration request. | The filename stem is the standard's public name throughout the corpus. |
| SC11 | A standard that contains `SHOULD` rules MUST make the exception path clear. | The default exception path is integration-request review. A standard MAY define a stricter exception record when exceptions affect production safety, compliance, compatibility, or long-lived corpus policy. |
| SC12 | A deprecated standard MUST identify its replacement or state explicitly that there is no replacement. | A reader should never have to infer whether the deprecated rule still has a successor. |
| SC13 | A standard SHOULD make the maintenance path clear when the project has designated owners, teams, or review groups for the subject area. It MUST NOT invent owner names or channels that do not exist in the project's work-tracking or review substrate. | If no ownership registry exists, `last-reviewed` plus `review-cycle` remains the maintenance signal. |
| SC14 | A standard with judgment-heavy rules SHOULD include examples for common compliant and non-compliant cases. | Examples are most valuable where automated checks cannot capture intent. |
| SC15 | A standard MUST distinguish content that applies to one artefact type from content that is genuinely cross-cutting. Per-type content MUST live in that type's content standard, not in a centralised catalog. | Per ADR-0006: rules apply where their subject lives. Centralised catalogs of per-type rules are co-location violations. |

## Rationale

Derives from ADR-0004.
The rules above operationalise the discipline that makes the corpus's *what* layer trustworthy and revisable.

## Enforcement

This standard is enforced by review.

| Rule | Mode |
| ---- | ---- |
| FC1, FC2, FC3, FC4 | Mechanical for filename and folder; review for section structure and naming |
| SC1, SC9, SC15 | Review judgment |
| SC2 | Mechanical: regex for identifier presence and uniqueness in normative rule tables |
| SC3 | Mechanical: regex for MUST/SHOULD/MAY in normative rule columns |
| SC4 | LLM judgment for checkability; review for identification of review-only rules |
| SC5, SC7 | LLM judgment |
| SC6 | Mechanical: `derives_from` frontmatter presence and ADR-existence check; mechanical for `Derives from` derivation block presence |
| SC8 | Mechanical: section heading presence; review for normative rule content placement |
| SC10 | Mechanical: cross-reference grep when a filename changes |
| SC11, SC13, SC14 | Review judgment |
| SC12 | Mechanical for deprecated standards; review for replacement clarity |

## Examples

### A standard that violates SC4 (rule that is not checkable)

A rule that says "code should be readable" is not checkable — neither mechanically nor by an LLM with confidence.
The standard either drops the rule, sharpens it ("functions SHOULD have descriptive names"), or identifies it explicitly as review-only in the Enforcement section.

### A standard that correctly follows SC15 (per-type content lives with the type)

The frontmatter schema for runbooks lives in `runbook-content.md` (the runbook's own content standard), not in a centralised catalog of all frontmatter schemas.
A reader looking for runbook frontmatter rules finds them where the runbook rules live.

### A standard that correctly follows FC4 (role-based name)

`unified-formatting.md` names the role (formatting the corpus uniformly), not the chosen instance (Markdown).
A future supersession that adopts a different format renames the cascading standard *only if the role changes*; switching from Markdown to AsciiDoc inside `unified-formatting.md` does not require renaming.

### A standard that violates FC4 (instance-named)

`markdown-formatting.md` names the chosen instance (Markdown).
A future project that adopts a different format would need to rename the standard or accept a misleading name.
The role-based equivalent is `unified-formatting.md`.

## Related decisions

* [ADR-0004](../decisions/0004-adopt-a-standards-artefact-for-the-what.md) — adopts standards as the artefact type for the what layer.
* [ADR-0001](../decisions/0001-adopt-decisions-as-the-founding-artefact-type.md) — defines the decisions that standards cascade from.
* [ADR-0006](../decisions/0006-co-locate-auxiliary-documentation.md) — the co-location principle that places per-type content with its type.
