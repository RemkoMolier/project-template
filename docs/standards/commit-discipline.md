---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0007"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0007](../decisions/0007-adopt-historical-integrity.md)
<!-- END-DERIVATION -->

# Commit discipline

This standard adopts the commit-message format and the discipline by which commits are authored.
It applies to every commit on every branch in the corpus.

## Format adoption

Commit messages follow [Conventional Commits 1.0.0][conventional-commits].
Conventional Commits satisfies the parsing requirements of the project's tooling and the human-readability requirements of historical inspection.

The format:

```text
<type>(<optional scope>)!: <short imperative summary>

<optional body>

<optional footer>
```

The scope, breaking-change marker, body, and footer are optional.

## Commit messages

| # | Rule | Notes |
| - | ---- | ----- |
| CM1 | The subject line MUST use `<type>: <summary>` or `<type>(<scope>): <summary>`. | Example: `docs: add commit conventions`. |
| CM2 | The type MUST be one of the project type catalogue entries below. | New types require updating this standard. |
| CM3 | The scope SHOULD be lowercase kebab-case or a short package or area name. | `docs(adr)`, `fix(auth)`, `build(ci)`. |
| CM4 | The summary MUST be lowercase sentence text after the prefix unless it starts with a proper noun, acronym, symbol, or code identifier. | `docs(adr): record commit conventions`. |
| CM5 | The summary SHOULD be imperative and concise ("add", not "added"). | Prefer `add parser guard` over `added parser guard`. |
| CM6 | The subject line SHOULD stay at or below 72 characters. | Longer symbol or specification names may exceed this. |
| CM7 | The summary MUST NOT end with a period. | Example: `feat: add session rotation`. |
| CM8 | Use `!` before the colon for breaking public-contract changes. | Example: `feat(api)!: rename Token field`. |
| CM9 | A commit body SHOULD explain *why*, not *what* — the diff shows what. | Design tradeoffs, migration notes, reviewer context. |
| CM10 | Footers MAY carry work-item references, signed-off-by lines, or `BREAKING CHANGE:` details. Reference format is defined in the work-tracking standard. | Follow Git trailer syntax when using trailers. |
| CM11 | Commits MUST NOT include `Co-Authored-By` trailers attributing AI agents. | Agent involvement belongs in the integration-request description, not in commit trailers. |

## Type catalogue

| Type | Use for |
| ---- | ------- |
| `feat` | User-visible API, behaviour, or capability additions. |
| `fix` | Bug fixes and behaviour corrections. |
| `docs` | Documentation-only changes, including decisions, standards, and runbooks. |
| `test` | Tests, fixtures, and benchmarks without production behaviour changes. |
| `refactor` | Internal restructuring with no intended behaviour change. |
| `perf` | Performance improvements. |
| `build` | Build system, dependency, packaging, or generated-artefact changes. |
| `ci` | Integration-gate or automation changes. |
| `style` | Whitespace and formatting only — no code or content changes. |
| `chore` | Repository maintenance that does not fit another type. |
| `revert` | Reverts of earlier commits. |

When more than one type fits, choose the type that describes the primary externally relevant effect.
A change that updates documentation in service of a bug fix is still `fix` if the behaviour fix is the reason for the commit.

## Commit hygiene

| # | Rule | Notes |
| - | ---- | ----- |
| CH1 | A commit SHOULD contain one coherent change. | Three unrelated areas means three commits. |
| CH2 | Do not mix generated or vendored output with source changes unless the generator input is in the same commit and the output is expected. | Reviewers need to see the source of generated churn. |
| CH3 | Do not commit local-only files (editor state, credentials, tool caches). | See `.gitignore`. |
| CH4 | Before committing, inspect staged and unstaged changes separately. | Avoid committing scratch work. |

## Commit attestation

Commit signing is the attestation mechanism for commit-level authorship.

| # | Rule | Notes |
| - | ---- | ----- |
| CS1 | Commits SHOULD be cryptographically signed (GPG, SSH, or S/MIME) when the contributor has a signing key configured. | Identity (per ADR-0007) is strengthened by cryptographic signing beyond the unsigned commit author field. |
| CS2 | The project MAY require signed commits on `main` via the integration-enforcement mechanism described in the integration-discipline standard. | When enabled, unsigned commits are rejected at integration. |
| CS3 | A signing key MUST be associated with a verifiable identity (a verified email address on the forge or an equivalent identity registry). | Otherwise the signature attests to a key, not a person. |

## Rationale

Derives from ADR-0007.
Conventional Commits is the format chosen to satisfy the parsing and inspection requirements of a verifiable, identified historical record.
Commit signing strengthens the identified property when contributors have signing keys.

## Enforcement

The project's `commitlint.config.cjs` (read by the Husky `commit-msg` hook locally and by the integration gate server-side) validates the subject-line format, type catalogue, and trailer syntax.

The pre-commit hook runs `npx lint-staged` over staged content; the integration gate re-runs validation server-side.

For non-mechanical rules (atomic commits, body quality), enforcement is at integration-request review.

## Examples

A forge-based example using `Closes #N` (the reference format defined in the work-tracking standard):

```text
feat(auth): add session rotation

Rotates authenticated user sessions after privilege changes so stale
permissions cannot persist after an administrator updates a role.

Closes #42
```

```text
docs(adr): adopt MADR for documenting decisions
```

```text
feat(api)!: rename Token QName accessors

BREAKING CHANGE: Token.QName accessors were renamed to match the
field-validity table.
```

A patch-series example carrying the work-item reference and sign-off in trailers:

```text
fix(auth): reject expired refresh tokens

Refresh tokens older than the configured TTL were still accepted because
the comparison used issued-at instead of not-before.

Closes T-118
Reviewed-by: Alex Maintainer <alex@example.org>
Signed-off-by: Pat Submitter <pat@example.org>
```

## References

* Conventional Commits 1.0.0: <https://www.conventionalcommits.org/en/v1.0.0/>
* Git `commit`: <https://git-scm.com/docs/git-commit>
* Git `commit -S` (signing): <https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--Skeyid>

## Related decisions

* [ADR-0007](../decisions/0007-adopt-historical-integrity.md) — establishes the historical-integrity properties (verifiable, provenanced, identified) that commit discipline operationalises.

[conventional-commits]: https://www.conventionalcommits.org/
