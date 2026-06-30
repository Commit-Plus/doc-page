# Mintlify Docs Refactor Design

## Goal

Refactor the Commit+ Mintlify docs so they keep the broad README-style product vision while making shipped, planned, and development-only behavior easy to distinguish.

## Product Voice

The site should present Commit+ as a fast, native, open-source macOS Git client. Marketing pages can describe the intended product direction, but they must avoid wording that implies every roadmap item has shipped. The phrase "zero dependencies" remains part of the positioning for the Git client core: Git workflows run through the system Git binary and native SwiftUI code, while Sparkle is described separately as a small app-update helper with no telemetry or repository-data collection.

## Information Architecture

Navigation should be split into clear sections:

- Getting Started: introduction, installation, and keyboard shortcuts.
- Git Management: commit, sync, branch, stash, cherry-pick, and conflict workflows.
- Tools: undo/redo, worktrees, and quick search.
- Features: marketing-forward feature summaries with current vs planned wording.
- Local Development: setup, project structure, testing, release/update notes, and contributing guidance for open-source contributors.

The docs should use a single coherent Mintlify navigation model. `docs.json` is the primary modern config, and `mint.json` should remain consistent for compatibility with older Mintlify tooling.

## Content Rules

- Use "available now" language for behavior confirmed by the app source and tests.
- Use "vision", "roadmap", "planned", or "designed for" language for broader README-style claims.
- Keep pages sectioned with short headings so readers can scan.
- Explain Sparkle as update infrastructure only, not a runtime dependency for Git operations.
- Fix obvious broken or placeholder copy in existing pages.

## Verification

Run Mintlify validation using the current CLI command. Because the previous `mint lint` command is no longer accepted by the local CLI, update the package script to use `mint validate`. Also run broken-link checks if the CLI can execute them locally.
