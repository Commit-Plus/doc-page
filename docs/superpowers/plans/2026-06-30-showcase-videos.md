# Showcase Videos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add autoplaying, looping, no-control showcase videos to feature pages.

**Architecture:** Use static files from `/showcase/*.mp4` and embed them directly in MDX with native `<video>` elements.

**Tech Stack:** Mintlify, MDX, HTML video.

---

### Task 1: Drag and Drop Showcase

**Files:**

- Modify: `features/drag-and-drop.mdx`

- [x] Add `drag-commit-cherry-pick.mp4` as a no-control autoplaying loop.
- [x] Add `drag-to-create-new-branch.mp4` as a no-control autoplaying loop.

### Task 2: Undo Action Showcase

**Files:**

- Modify: `features/undo-any-action.mdx`

- [x] Add `undo-checkout-branch.mp4` as a no-control autoplaying loop.

### Task 3: Verification

**Files:**

- All modified docs and showcase assets.

- [x] Run `npm run lint`.
- [x] Run `npm run broken-links`.
- [x] Run `git diff --check`.
