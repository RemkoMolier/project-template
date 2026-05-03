// commitlint configuration
//
// Derives from: docs/standards/commit-discipline.md
// Decision:     docs/decisions/0007-adopt-historical-integrity.md

const allowedUppercaseSubjectStarts = [
  "ADR",
  "CI",
  "CD",
  "CommonMark",
  "Conventional",
  "Git",
  "GitHub",
  "GitLab",
  "Forgejo",
  "Husky",
  "JSON",
  "JSONC",
  "MADR",
  "Markdown",
  "Node.js",
  "VS",
  "YAML"
];

const aiCoAuthorIndicators = [
  "@anthropic.com",
  "@openai.com",
  "anthropic",
  "chatgpt",
  "claude",
  "codex",
  "copilot",
  "cursor",
  "devin",
  "openai"
];

function subjectStartsWithAllowedUppercaseToken(subject, allowedStarts) {
  const [firstToken = ""] = subject.trim().split(/\s+/);

  if (!/^\p{Lu}/u.test(firstToken)) {
    return true;
  }

  if (allowedStarts.includes(firstToken)) {
    return true;
  }

  if (/[`._/-]/.test(firstToken)) {
    return true;
  }

  const uppercaseLetters = firstToken.match(/\p{Lu}/gu) ?? [];

  return uppercaseLetters.length > 1;
}

function hasAiCoAuthorTrailer(raw, indicators) {
  return raw
    .split(/\r?\n/)
    .some((line) => {
      const match = line.match(/^Co-Authored-By:\s*(?<value>.+)$/i);

      return Boolean(
        match?.groups?.value &&
          indicators.some((indicator) => match.groups.value.toLowerCase().includes(indicator))
      );
    });
}

module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "project-subject-case": (parsed, _when, allowedStarts = []) => [
          subjectStartsWithAllowedUppercaseToken(parsed.subject ?? "", allowedStarts),
          "subject must start with lowercase sentence text unless it starts with an allowed proper noun, acronym, symbol, or code identifier"
        ],
        "project-no-ai-coauthor": (parsed, _when, indicators = []) => [
          !hasAiCoAuthorTrailer(parsed.raw ?? "", indicators),
          "commit message must not include Co-Authored-By trailers attributing AI agents (per CM11 in commit-discipline.md)"
        ]
      }
    }
  ],
  rules: {
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
    "header-max-length": [2, "always", 72],
    "project-no-ai-coauthor": [2, "always", aiCoAuthorIndicators],
    "project-subject-case": [2, "always", allowedUppercaseSubjectStarts],
    "subject-case": [0],
    "subject-full-stop": [2, "never", "."],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "refactor", "test", "chore", "build", "ci", "perf", "style", "revert"]
    ]
  }
};
