---
status: draft
last-reviewed: 2026-05-03
review-cycle: semi-annually
derives_from:
  - "0007"
  - "0008"
---

<!-- BEGIN-DERIVATION -->
**Derives from:**

* [ADR-0007](../decisions/0007-adopt-historical-integrity.md)
* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md)
<!-- END-DERIVATION -->

# Work tracking

This standard governs how work is tracked: the substrate that holds work items, the types of work, the lifecycle states they pass through, the per-type flows, and the parent/child relationships between work items.
It applies to every unit of work the project performs.

This standard ships as a `draft` template.
The adopting project fills in the *Substrate*, *Reference format*, and project-specific lifecycle refinements, then changes `status` to `active`.
The discipline rules, work-item types, abstract lifecycle, and abstract per-type flows are template-author commitments and are inherited by adopting projects.

## Discipline rules

| # | Rule | Notes |
| - | ---- | ----- |
| WT1 | The project MUST use exactly one work-tracking substrate for every unit of work. | No splits across tools; the substrate is the single source of truth for work in progress. |
| WT2 | The substrate MUST provide stable, unambiguous identifiers for each work item. | Identifiers persist for the life of the project. |
| WT3 | Every work item MUST be reachable by URL or unambiguous reference from a commit message or integration-request description. | Required for the provenance property of historical integrity (ADR-0007). |
| WT4 | The reference format used in commits, branches, and integration-request descriptions MUST match the project's *Reference format* section below. | Enforced via review and, where possible, by `commitlint` and integration-gate checks. |
| WT5 | Work-item state changes MUST be recorded in the substrate, not in chat or email. | The substrate is the source of truth. |
| WT6 | Changing the single-substrate discipline requires a new ADR superseding the relevant decision; changing the concrete substrate requires updating or superseding this standard. | The discipline is foundational; the tool choice is project-specific. |

## Work-item types

The project's work-item taxonomy has three categories.
Every work item belongs to exactly one category.

This standard uses three terms with deliberately distinct scope:

* **Standard work item** — a work item of type `spike`, `investigation`, `postmortem`, `feature`, `bug-fix`, or `tech-debt`.
  Follows the standard lifecycle defined in the next section.
* **Coordination artefact** — a work item of type `release` or `incident`.
  Has its own state machine, defined in project-specific cascading runbooks.
  Does not follow the standard lifecycle.
* **Work item** (unqualified) — covers both standard work items and coordination artefacts unless context limits it.

Rules below state explicitly which term they apply to where the distinction matters.

### Discovery work items

Discovery work items reduce uncertainty.
Their output is *knowledge* — a document, a recommendation, an answer — not integrated production code.
Their branches are disposable.

| Type | Description | Example |
| ---- | ----------- | ------- |
| `spike` | A time-boxed investigation to answer a specific question. | "Can we use a new framework for authentication?" |
| `investigation` | A broader exploration without a single specific question. | "What are the trade-offs between event sourcing and CRUD for this domain?" |
| `postmortem` | A retrospective on an incident or a delivered feature. | "What went wrong in the 2026-04-12 outage?" |

### Implementation work items

Implementation work items change the system.
Their output is *integrated code* — commits on `main`.
Their branches culminate in integration requests.

| Type | Description | Example |
| ---- | ----------- | ------- |
| `feature` | A new capability or user-visible change. | "Add session rotation on privilege change." |
| `bug-fix` | A defect correction. | "Refresh tokens past TTL must be rejected." |
| `tech-debt` | A non-user-facing improvement to code or architecture. | "Replace the in-memory cache with Redis." |

### Coordination and response artefacts

Coordination and response artefacts are work items but they have *different state machines* than the standard work-item lifecycle.
They hook into the work-tracking model but are not standard work items.

| Type | Description | Example |
| ---- | ----------- | ------- |
| `release` | A coordination artefact that groups other work items for deployment. | "Release v1.2.0 covering features X, Y, Z." |
| `incident` | A response to a production degradation or outage. | "Investigate elevated 500 rate on the billing API." |

`release` and `incident` are introduced here for completeness; their state machines are not the standard lifecycle below.
Project-specific cascading standards or runbooks define their flows.

## Standard lifecycle

The standard lifecycle applies to discovery and implementation work items:

```text
triage → backlog → ready → doing → in-review → done
                                              ↘ cancelled
```

| # | Rule | Notes |
| - | ---- | ----- |
| WT7 | A standard work item MUST have a `status` field in the substrate matching one of these states. | Project-specific substates within these are permitted. |
| WT8 | `triage` means the work item exists but has not yet been assessed for whether the project will work on it. | Items reported by users, raised in discussion, or surfaced by tooling enter here. |
| WT9 | `backlog` means the work item is acknowledged as worth working on but not yet refined enough to start. | Has a clear title and a one-sentence description; lacks acceptance criteria or sized estimate. |
| WT10 | `ready` means the work item meets the *Definition of ready* below and can be picked up. | A work item that is `ready` should be actionable by anyone with the relevant access. |
| WT11 | `doing` means implementation is in progress. A branch SHOULD be associated at this point. | The work item identifier appears in the branch name (per BR2 in integration-discipline). |
| WT12 | `in-review` means an integration request is open and awaiting review. | For discovery work items, `in-review` may also mean the findings are being reviewed before publication. |
| WT13 | `done` means the work item satisfies the project's definition of done (per `definition-of-done.md`) and has been closed in the substrate. | Done is a non-reversible state in normal flow. |
| WT14 | `cancelled` means the work item is no longer needed. The reason MUST be recorded as a comment on the work item. | Cancellation is a closure path that doesn't satisfy the definition of done. |

### Definition of ready

A work item is `ready` when:

* It has a clear, specific title.
* It has acceptance criteria or a clear desired outcome.
* It is sized appropriately (fits within a single work-item scope; child items are created if not).
* Dependencies are resolved or documented.

## Per-type abstract flows

### Discovery flow

```text
work item (triage) → backlog → ready → doing
                          → branch → investigate → findings
                          → draft document or ADR
                          → in-review (findings reviewed)
                          → done (knowledge delivered, branch deleted)
```

The branch is disposable; no integration request is opened for the spike code itself.
The output is captured as an artefact in the corpus (an ADR, a standard, a document) or as an updated work item with the findings.

### Implementation flow

```text
work item (triage) → backlog → ready → doing
                          → branch → commits → integration request
                          → in-review (IR awaiting review)
                          → review → merge
                          → done (verified after merge)
```

The branch culminates in an integration request that satisfies the integration-discipline standard.

### Release and incident flows

`release` and `incident` artefacts have their own state machines.
Project-specific cascading standards or runbooks define them.
The standard lifecycle does not apply.

## Parent/child rules

| # | Rule | Notes |
| - | ---- | ----- |
| WT15 | A work item of any type MAY have child work items. | The hierarchy mechanism is project-specific and is captured in the substrate's linking model. |
| WT16 | A parent work item MUST NOT reach `done` until all its children are `done` or `cancelled`. | The parent is implicitly blocked on its children. |
| WT17 | When a parent moves to `doing`, its children MAY remain in `triage`, `backlog`, or `ready` — they do not automatically transition. | Children advance independently. |
| WT18 | The parent-child hierarchy is tracked in the substrate. The mechanism is project-specific (forge issue links, Jira parent-child, file-based references, etc.). | Documented in the *Substrate* section below. |
| WT19 | Discovery work items commonly produce child work items (findings that need implementation). | The discovery item's `done` state can be reached when the children are filed; the children do not need to be done themselves before the discovery is done. |

## Substrate

> Replace this section with the project's choice.
> Include enough detail that a new contributor can find and use the substrate without asking.

* **Tool:** *e.g.,* forge-native issues on `<org>/<repo>`, Jira project `PROJ` at `<url>`, or `backlog.md` storing tasks under `<path>`.
* **Access:** *how contributors get accounts and permissions.*
* **Where each kind of work lives:** *labels, types, projects, columns, or folders covering at least the work-item types defined above.*
* **Parent/child mechanism:** *forge issue links, Jira parent-child, file-based references, etc.*

## Reference format

> Replace this section with the project's chosen reference syntax.
> The format must round-trip: a reader of the commit history must be able to find the work item, and a reader of the work item must be able to find the commits.

| Context | Format | Example |
| ------- | ------ | ------- |
| Commit footer | *e.g.,* `Closes #N` | *`Closes #42`* |
| Branch prefix | *e.g.,* `<id>-<slug>` | *`42-add-session-rotation`* |
| Integration-request description | *e.g.,* `Closes #N` or `Related-to #N` | *`Closes #42`* |

For commit-message rules that consume this format, see `commit-discipline.md`.
For integration-request rules, see `integration-discipline.md`.

## Examples by tool

These are illustrative starting points, not prescriptions.
Pick one and replace the *Substrate* and *Reference format* sections above accordingly.

### Forge-native issues

Suitable for projects already using a forge with native issue tracking.

* **Substrate:** the forge's built-in issue tracker on the project repository.
* **Reference format:** `Closes #N`, `Related-to #N`; branch prefix `N-<slug>`.
* **Strengths:** native integration-request auto-linking; no additional service; one access model.
* **Weaknesses:** stakeholders without forge access cannot read or comment.

### External issue tracker

Suitable for projects in organisations standardised on external tools.

* **Substrate:** project `PROJ` at `<url>`.
* **Reference format:** `Closes PROJ-N`, `Related-to PROJ-N`; branch prefix `PROJ-N-<slug>`.
* **Strengths:** broader stakeholder access; richer planning features.
* **Weaknesses:** weakens the "work items plus Git as complete record" property — external systems can lose data, change schemas, and are not versioned alongside the corpus; plan for periodic export or archival.

### File-based tracker

Suitable for small projects that want zero external dependencies.

* **Substrate:** *e.g.,* a `tasks/` folder, one Markdown file per task with frontmatter `id: T-NNN`.
* **Reference format:** `Closes T-NNN`, `Related-to T-NNN`; branch prefix `T-NNN-<slug>`.
* **Strengths:** versioned alongside code; portable; reviewable as part of an integration request.
* **Weaknesses:** no native auto-linking; contributors must edit files; weaker for non-developer stakeholders.

## Rationale

Derives from ADR-0007 (provenance via the work-tracking substrate) and ADR-0008 (the lifecycle and per-type flows are state-transition disciplines).
The work-item types and abstract flows operationalise how work moves through the project; the project fills in the substrate and reference format.

## Enforcement

* WT1, WT5, and WT6 are enforced socially at integration-request review.
* WT2 and WT3 are intrinsic to most substrates; review confirms unsuitable substrates are not chosen.
* WT4 — reference format — is enforced via `commitlint` footer rules and integration-request description checks once the project has fixed its format.
* WT7-WT14 — lifecycle states — are enforced by the substrate's workflow configuration (where supported) and by review.
* WT15-WT19 — parent/child rules — are enforced socially and via the substrate's parent-child mechanism.

## Related decisions

* [ADR-0007](../decisions/0007-adopt-historical-integrity.md) — establishes provenance, the property the work-tracking substrate operationalises.
* [ADR-0008](../decisions/0008-adopt-explicit-transition-discipline.md) — establishes the transition discipline; the lifecycle states above are its operationalisation for work items.
