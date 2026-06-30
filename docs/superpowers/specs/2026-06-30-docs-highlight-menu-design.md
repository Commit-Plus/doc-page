# Docs Highlight Menu Design

## Goal

Refactor the Mintlify navigation so ordinary Git operation pages stop competing with the product's stronger differentiators. The docs should lead with polished Commit+ features, while still keeping basic Git operation pages available as reference material.

## Navigation

Use one primary Documentation tab with four groups:

- Getting Started: introduction, installation, keyboard shortcuts.
- Polished Features: Undo Action, Drag and Drop, AI Features, Worktree Workflow, Resolve Conflict Tool.
- Reference: commit, sync, branch, stash, cherry-pick/revert, quick search.
- Local Development: local development, architecture, contributing.

Remove the old prominent Git Management and Tools groups. Keep the basic Git pages, but present them as reference instead of product highlights.

## Feature Positioning

- Undo Action: shipped, polished feature.
- Drag and Drop: shipped for commit/branch workflows, broader direction remains roadmap.
- AI Features: coming soon, focused on commit-message generation and merge-conflict suggestions.
- Worktree Workflow: coming soon, inspired by Tower Workflows concepts such as branch parents, start/finish task flows, sync prompts, merge strategy, cleanup, and conflict warnings.
- Resolve Conflict Tool: shipped conflict-resolution feature.

## Verification

Run Mintlify validation, broken-link checks, and git diff whitespace checks after the navigation and copy changes.
