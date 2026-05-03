# project-template

A minimal, reusable foundation for managing durable normative knowledge in any software project.

This repository is a **template**.
It ships a foundational set of decisions, standards, and runbooks as `proposed` and `draft` artefacts, ready for an adopting project to read, accept (or supersede), and seal with a signed Git tag.

## What this template provides

* **Three artefact types**, each with its own folder, content standard, template, and auto-generated index:
  * `docs/decisions/` — the *why* layer (ADRs).
  * `docs/standards/` — the *what* layer (rules currently in force).
  * `docs/runbooks/` — the *how* layer (procedures).
* **Nine foundational decisions** (ADRs 0001–0009 as `proposed`) establishing the corpus, its decomposition, the artefact types, the principle for auxiliary content, the integrity properties of the historical record, the discipline for state transitions, and unified formatting.
* **Ten cascading standards** (`draft`) operationalising the decisions: per-type content rules (decision/standard/runbook), the formatting standard adopting Markdown, the substrate standard adopting Git, the commit and integration disciplines, work-tracking with abstract work-item types and lifecycle, the acceptance attestation mechanism (signed Git tags), and the definition of done.
* **Nine runbooks** (`draft`, no `last-tested`): the contributing flow, the spike-cascade-handling procedure, the per-work-item-type flows (develop a feature, fix a bug, execute a spike, review an integration request, land a release, respond to an incident), and the acceptance ceremony for adopting projects.
* **Implementation cascade**: `markdownlint-cli2` with custom sentence-case and one-sentence-per-line rules, an index and cascade-blockquote generator, Husky pre-commit hooks, and `commitlint` with project-specific rules.

## How to adopt

1. Fork or clone this repository as your project starting point.
1. Edit the project-specific bits at the repository root: `README.md`, `OVERVIEW.md`, the project name, the LICENSE author.
1. Read each artefact in `docs/decisions/`, `docs/standards/`, and `docs/runbooks/`.
   For each, decide: **accept as-is** or **supersede** with a project-specific replacement.
1. Fill in `docs/standards/work-tracking.md` with your project's chosen substrate, reference format, and any project-specific lifecycle refinements.
1. Run `npm install`, then `npm run validate` to confirm the validation passes locally.

   `npm run validate` confirms formatting and index consistency only.
   Project governance is not fully operational until `docs/standards/work-tracking.md` *Substrate* and *Reference format* sections are filled in and the integration-enforcement mechanism on `main` is configured.
   See **Adoption readiness** below for the full checklist.

1. Configure your chosen integration gate to run `npm run validate`.
1. Configure the integration-enforcement mechanism on `main` (forge branch protection, server-side hooks, or equivalent) per `docs/standards/integration-discipline.md`.
1. Execute the acceptance ceremony per `docs/runbooks/adopt-this-template.md`: flip `proposed` decisions to `accepted`, flip `draft` standards to `active`, and sign the acceptance tag (`accept-foundational-set-v1`).

## Adoption readiness

`npm run validate` confirms that the corpus is internally consistent (formatting, frontmatter, indexes, cascade references).
**It does not confirm that an adopting project's governance is operationally complete.**
Several standards ship with placeholders and references whose downstream enforcement only activates once the project fills them in.

A project is *ready* — meaning its governance chain is fully operational — when, in addition to a passing `npm run validate`, all of the following are true:

* `docs/standards/work-tracking.md` has its **Substrate** section filled in (the project's chosen tool, access model, and where each work-item type lives).
* `docs/standards/work-tracking.md` has its **Reference format** section filled in (the format used in commits, branches, and integration-request descriptions).
  Until this is done, WT4 enforcement via `commitlint` and integration-gate checks cannot be operationalised.
* The integration-enforcement mechanism on `main` is configured per `docs/standards/integration-discipline.md` (forge branch protection, server-side hooks, or equivalent).
  A passing `validate` does not check that direct pushes are actually rejected.
* The project's severity classification, response-time expectations, deploy mechanism, on-call rotation, and rollback procedure are defined where the runbooks reference them as project-specific (incident, release, hotfix flows).
* `docs/runbooks/adopt-this-template.md` has been executed end-to-end and the acceptance tag (`accept-foundational-set-v1` or your chosen name) has been signed and pushed.

Treat this list as the **adoption readiness checklist**.
A green CI build before this list is complete is a signal of *artefact integrity*, not of *governance completeness*.

## Status of artefacts in this template

The template ships every artefact at the bottom of its lifecycle:

* All ADRs are `proposed` — the template author has authored them; no project has accepted them yet.
* All standards are `draft` — same reason.
* All runbooks are `draft` with no `last-tested` — none has been executed end-to-end against an adopting project.

Acceptance is a deliberate event the adopting project performs (per `acceptance-attestation.md` and `adopt-this-template.md`).
The template does not pre-accept its own artefacts on an adopting project's behalf.

## What's not in the template

Project-specific content is intentionally omitted:

* The chosen work-tracking substrate (the standard ships placeholders for the project to fill in).
* Forge-specific or CI-specific automation and branch-protection setup (covered conceptually in standards; configured per project).
* Severity classifications, response-time SLAs, on-call rotations, deploy mechanisms (referenced in runbooks; defined per project).
* Project-specific frontmatter fields beyond the universal ones.

If your project needs any of these, layer them on with your own decisions and standards.

## Reading order

If you are new to a project that uses this template, read in this order:

1. The project's repository-root `README.md` and `OVERVIEW.md`.
1. ADRs in `docs/decisions/` in numerical order — the first nine establish the system itself; subsequent ADRs are project-specific.
1. Standards in `docs/standards/` as relevant to what you are doing.
1. `docs/runbooks/contributing.md` if you intend to contribute.
1. `docs/runbooks/adopt-this-template.md` if you are setting up a new project from this template.

## License

Released under the [MIT License](LICENSE).
Forks and downstream projects may re-license under any compatible terms.
