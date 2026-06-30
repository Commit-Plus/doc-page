# Mintlify Docs Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the Commit+ Mintlify docs into sectioned, marketing-forward, accuracy-preserving documentation with a dedicated Local Development menu.

**Architecture:** Keep `docs.json` as the primary Mintlify config and mirror the same page grouping in `mint.json` for compatibility. Update MDX content in place, keeping page count modest and using explicit "available now" and "planned" sections where product vision exceeds current behavior.

**Tech Stack:** Mintlify, MDX, JSON, SwiftUI/macOS project documentation.

---

### Task 1: Navigation And Tooling

**Files:**
- Modify: `docs.json`
- Modify: `mint.json`
- Modify: `package.json`

- [x] Update `docs.json` so navigation has one Documentation tab with Getting Started, Git Management, Tools, and Local Development groups, plus one Features tab.
- [x] Update `mint.json` to mirror the same group order for older Mintlify compatibility.
- [x] Change `package.json` script `lint` from `mint lint` to `mint validate`.
- [x] Run `npm run lint`; expected command is `mint validate`.

### Task 2: Landing And Introduction

**Files:**
- Modify: `index.mdx`
- Modify: `introduction.mdx`

- [x] Rewrite the landing page as a sectioned product overview with clear cards for available core workflows and roadmap direction.
- [x] Rewrite introduction to explain why Commit+ exists, what is available now, what is planned, and what "zero dependencies" means in this project.
- [x] Keep links aligned to the navigation pages.

### Task 3: Git Workflow Docs

**Files:**
- Modify: `docs/keyboard-shortcuts.mdx`
- Modify: `docs/commit.mdx`
- Modify: `docs/push-pull-fetch.mdx`
- Modify: `docs/branch-merge-rebase.mdx`
- Modify: `docs/cherry-pick-revert.mdx`
- Modify: `docs/stash.mdx`
- Modify: `docs/conflict-resolution.mdx`

- [x] Remove drag-and-drop claims that are not currently implemented.
- [x] Keep regular toolbar/menu/shortcut workflows documented where available.
- [x] Add planned notes for broader drag-and-drop workflows instead of presenting them as shipped.

### Task 4: Tools And Features

**Files:**
- Modify: `docs/undo-redo.mdx`
- Modify: `docs/worktrees.mdx`
- Modify: `docs/search.mdx`
- Modify: `features/drag-and-drop.mdx`
- Modify: `features/undo-any-action.mdx`
- Modify: `features/conflict-resolution.mdx`
- Modify: `features/worktrees.mdx`
- Modify: `features/ai-features.mdx`

- [x] Keep feature pages marketing-forward, but separate "Available now" from "Roadmap".
- [x] Make worktree docs mention list/open/create/remove/lock/prune/move/checkout where relevant.
- [x] Keep undo docs scoped to runtime stacks and mention that undo history is not persisted across launches.

### Task 5: Local Development

**Files:**
- Create: `docs/local-development.mdx`
- Modify: `docs/architecture.mdx`
- Modify: `docs/contributing.mdx`

- [x] Add a Local Development page with clone, prerequisites, build, run, test, project structure, Mintlify docs commands, and release/update notes.
- [x] Update architecture to preserve "zero dependencies" for core Git operations and describe Sparkle separately.
- [x] Update contributing with open-source setup expectations and verification commands.

### Task 6: Verification

**Files:**
- All modified docs files.

- [x] Run `npm run lint`.
- [x] Run `npm run broken-links`.
- [x] Inspect `git diff --check`.
- [x] Review the resulting diff for sectioning, navigation consistency, and shipped-vs-planned wording.
