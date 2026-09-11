# Agent Instructions

## CodeGraph — Mandatory

Before any code-navigation or code-understanding task:

1. Determine the target repository root.
2. If `<repo>/.codegraph/` exists, run `codegraph explore "<question or symbol>"` first.
3. Do not use `rg`, `grep`, `find`, `git grep`, recursive directory scans, or open source files until CodeGraph is insufficient.
4. If a fallback is necessary, state why before using it.
5. Never decide that a repository is unindexed by checking a parent workspace; check the target repository root.
