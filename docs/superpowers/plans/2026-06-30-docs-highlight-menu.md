# Docs Highlight Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor Mintlify navigation and feature copy so Commit+ leads with polished features instead of ordinary Git operation categories.

**Architecture:** Update `docs.json` and `mint.json` to use a single Documentation navigation with Polished Features and Reference groups. Reuse existing feature page paths, retitling copy where needed so links remain stable.

**Tech Stack:** Mintlify, MDX, JSON.

---

### Task 1: Navigation

**Files:**
- Modify: `docs.json`
- Modify: `mint.json`

- [x] Replace Git Management and Tools with Polished Features and Reference.
- [x] Remove duplicated feature tab navigation.
- [x] Keep basic Git operation docs under Reference.

### Task 2: Feature Copy

**Files:**
- Modify: `index.mdx`
- Modify: `introduction.mdx`
- Modify: `features/ai-features.mdx`
- Modify: `features/worktrees.mdx`
- Modify: `features/conflict-resolution.mdx`
- Modify: `features/undo-any-action.mdx`
- Modify: `features/drag-and-drop.mdx`

- [x] Update homepage cards to lead with Highlight Features.
- [x] Focus AI page on commit-message generation and merge-conflict suggestions.
- [x] Retitle worktree page as Worktree Workflow and mark it coming soon.
- [x] Retitle conflict page as Resolve Conflict Tool.

### Task 3: Verification

**Files:**
- All modified docs and config files.

- [x] Run `npm run lint`.
- [x] Run `npm run broken-links`.
- [x] Run `git diff --check`.
