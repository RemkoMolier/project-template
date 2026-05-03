---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0009"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0009](../decisions/0009-adopt-unified-formatting-across-the-corpus.md)
<!-- END-DERIVATION -->

# Unified formatting

This standard adopts the format used across the entire corpus and the project-specific conventions on top of it.
It applies to every Markdown file in the corpus (decisions, standards, runbooks, and auxiliary content).

## Format adoption

The corpus uses [Markdown](https://commonmark.org/) ([CommonMark](https://commonmark.org/) flavour).
Markdown satisfies the four properties named in ADR-0009: diff-friendly (line-based source), source-readable (the raw form is human-readable), machine-parseable (extractable structure), and universally renderable (renders in every common environment without configuration).

The project-specific conventions below operationalise diff-friendliness explicitly.
They exist *because* of ADR-0009; they are not aesthetic preferences.

## Headings

| # | Rule | Notes |
| - | ---- | ----- |
| H1 | Use ATX-style headings (`#`, `##`, ...) — never setext (underlines). | Diff-friendly: a heading change is one line, not two. |
| H2 | Documents have exactly one H1 — the document title. | Standards' identifiers are derived from filenames; the H1 is the human title. |
| H3 | Heading hierarchy MUST NOT skip levels (no `###` directly under `#`). | Skipping levels breaks rendered structure and outline tools. |
| H4 | Add one blank line above and below each heading. | Diff-friendly: changes around a heading do not mix with the heading itself. |
| H5 | Use sentence case for headings ("Add a runbook", not "Add A Runbook"). | Reads as prose; reduces capitalisation arguments. |

## Lists

| # | Rule | Notes |
| - | ---- | ----- |
| L1 | Use `-` for unordered lists. Use `1.` for ordered lists (auto-numbered). | Consistency reduces diff noise from punctuation churn. |
| L2 | Indent nested list items with two spaces. | CommonMark-portable; renders consistently in every environment. |
| L3 | Add one blank line before and after the list. | Diff-friendly. |

## Emphasis

| # | Rule | Notes |
| - | ---- | ----- |
| E1 | Use `*emphasis*` for italics and `**strong emphasis**` for bold. | Single style across the corpus. |
| E2 | Do not use emphasis as a substitute for headings. | If it would be a heading, use one. |

## Code

| # | Rule | Notes |
| - | ---- | ----- |
| C1 | Use fenced code blocks (```` ``` ````) with a language tag where applicable. | Enables syntax highlighting and parsing. |
| C2 | Use backticks for inline code, command names, file paths, and identifiers. | Distinguishes prose from code. |
| C3 | Tab-indent or space-indent code blocks consistently within a file. | Reviewable as a single change rather than mixed indentation noise. |

## Links

| # | Rule | Notes |
| - | ---- | ----- |
| LK1 | Use inline links `[text](url)` for references that appear once. | Easier to follow inline. |
| LK2 | Use reference-style links `[text][id]` with collected references at the bottom for URLs that appear multiple times. | Reduces duplication; one URL update in one place. |
| LK3 | Cross-references within the corpus MUST use relative paths (`../decisions/0001-....md`, not absolute or hostname-prefixed URLs). | Survives forge moves and local rendering. |

## Tables

| # | Rule | Notes |
| - | ---- | ----- |
| T1 | Tables MUST have a header row and an alignment row. | Required by most renderers. |
| T2 | Cells SHOULD be padded for source-readability when narrow tables don't span lines. | Diff-friendly: column changes don't reflow neighbours. |

## Line wrapping

| # | Rule | Notes |
| - | ---- | ----- |
| LW1 | One sentence per line ("ventilated prose"). | The load-bearing rule for diff-friendliness. A sentence change is one line; reordering sentences is line-level moves. |
| LW2 | Do not wrap lines at a fixed character width. | Wrapping mid-sentence creates noisy diffs when sentences are edited. |

## Frontmatter

| # | Rule | Notes |
| - | ---- | ----- |
| FM1 | Frontmatter MUST be YAML enclosed in `---` lines at the top of the file. | The format the per-type frontmatter schemas presume. |
| FM2 | Field values that are lists MUST use the YAML list syntax (`- value`). Single-element lists are still lists. | Stable shape across edits. |
| FM3 | The specific fields permitted per artefact type are defined in that type's content standard. | Per ADR-0006: per-type rules live with the type. |

## Auto-generated content markers

| # | Rule | Notes |
| - | ---- | ----- |
| MK1 | Auto-generated content within a Markdown file MUST be enclosed between `<!-- BEGIN-X -->` and `<!-- END-X -->` HTML-comment markers, where `X` names the section (e.g., `INDEX`, `CASCADE`). | The marker convention the indexer reads and writes. |
| MK2 | Content between such markers MUST NOT be edited by hand. | The indexer regenerates it. |

## Rationale

Derives from ADR-0009.
The conventions above operationalise the diff-friendly, source-readable, machine-parseable, and universally renderable properties stated in that decision.

## Enforcement

The project's integration gate runs [`markdownlint-cli2`](https://github.com/DavidAnson/markdownlint-cli2) against `.markdownlint-cli2.jsonc` at the project root.
The configuration enforces the rules above, including two custom rules for sentence-case headings (`markdownlint-rule-title-case-style`) and one-sentence-per-line wrapping (`markdownlint-rule-max-one-sentence-per-line`).

The Husky `pre-commit` hook runs the same checks on staged files locally via `npx lint-staged`.

## Examples

### A heading that violates H5 (title case)

```markdown
## Adding A New Standard
```

The correct form is sentence case:

```markdown
## Adding a new standard
```

### Prose that follows LW1 (one sentence per line)

```markdown
Each artefact type's content standard owns its frontmatter schema.
The schema defines which fields are required, which are optional, and what their values may be.
Centralised catalogs of frontmatter schemas violate the co-location principle.
```

A reorder is three line moves; a single-sentence rewrite is a one-line diff.

### Prose that violates LW2 (fixed-width wrapping)

```markdown
Each artefact type's content standard owns its frontmatter schema. The schema defines
which fields are required, which are optional, and what their values may be.
Centralised catalogs of frontmatter schemas violate the co-location principle.
```

A single-word change in the first sentence reflows the next line, producing a multi-line diff.

## References

* CommonMark specification: <https://commonmark.org/>
* markdownlint rules reference: <https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md>
* markdownlint-cli2: <https://github.com/DavidAnson/markdownlint-cli2>

## Related decisions

* [ADR-0009](../decisions/0009-adopt-unified-formatting-across-the-corpus.md) — adopts unified formatting and names the four properties this standard operationalises.
