---
status: proposed
date: 2026-05-03
---

# Co-locate auxiliary documentation

## Context and problem statement

ADRs 0001–0005 establish the corpus and its three first-class artefact types (decisions, standards, runbooks).
The corpus also contains a category of *auxiliary* content that does not belong to any of the three layers but is necessary for the corpus to function:

* READMEs that describe each artefact-type folder and its conventions.
* Templates that seed new artefacts of each type.
* Code comments alongside the code they explain.
* Commit messages alongside the commits they describe.
* Integration-request descriptions alongside the integration requests they explain.
* Work-item templates within whatever substrate hosts work items.

Without an explicit principle for where auxiliary content lives, projects end up centralising it (a single "documentation" folder distant from the artefacts it describes) or scattering it inconsistently.
Both extremes go stale: distant content gets edited rarely; scattered content is hard to discover.

A pattern across these examples: each piece of auxiliary content has a natural home *next to* the thing it describes.
A README about decisions belongs in the decisions folder; a template for standards belongs in the standards folder; a code comment belongs next to the code; a work-item template belongs in the substrate that hosts work items.

Where does auxiliary content live?

## Decision drivers

* Auxiliary content far from what it describes goes stale because nobody touches both at the same time.
* Discovery is easier when conventions are encountered alongside the artefacts they govern.
* Readability is improved when auxiliary content explains itself at the point of use rather than requiring reference to a distant index.
* Agents grounding on the corpus benefit from co-location: reading a folder's README immediately reveals the conventions for that folder without a global lookup.

## Considered options

* **Central documentation folder** — all auxiliary content in one place, far from the artefacts it describes.
* **Co-location** — each piece of auxiliary content lives next to what it describes.
* **Hybrid** — some content centralised, some co-located, with no clear principle distinguishing them.

## Decision outcome

Adopt **co-location** as the principle for auxiliary content: documentation lives next to the thing it describes.

Concrete applications within the corpus:

* Each artefact-type folder contains its own README, describing that artefact type and its conventions.
* Each artefact-type folder contains its own template, used as the starting point for new artefacts of that type.
* Each artefact's frontmatter, filename pattern, and folder path are governed by that type's own content standard, not by a centralised catalog.
* Code comments live next to the code they explain.
* Commit messages live with their commits; integration-request descriptions live with their integration requests.
* Work-item templates live in the substrate that hosts work items, not in a separate documentation folder.

The principle applies recursively: when a new artefact type or convention is introduced later, its auxiliary content lives alongside it by default.

## Consequences

* The corpus has no central index of conventions.
  Each artefact-type folder is self-describing through its own README and template.
* A reader or agent landing on any folder can become productive there without reference to other folders.
* Centralised catalogs of per-type rules are co-location violations.
  Frontmatter schemas, filename patterns, and folder paths each live with the type they govern.
* The `docs/` directory has no central index file; per-folder READMEs serve that role for their respective types.
  An overview document at the repository root provides cross-cutting orientation but is not the source of truth for any specific convention.
* Forward references in the bootstrap set (where ADR-0001 is in a corpus before ADR-0002 declares the corpus exists) are an accepted artefact of bootstrapping; once the foundational set is in place, new artefacts have the full system to reference.

## More information

* The artefact-type content standards (cascading from ADRs 0001, 0004, and 0005) each absorb the per-type rules — frontmatter, filename, location, marker convention — that this principle places with the type.
