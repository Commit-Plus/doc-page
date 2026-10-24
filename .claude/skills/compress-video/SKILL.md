---
name: compress-video
description: Compress demo videos for the web before they are committed. Use whenever a video file (.mp4, .mov, .m4v, .webm) is added or replaced in this repository, or when the user asks to shrink, optimize, or compress a video.
---

# Compress videos

Demo videos recorded on a Retina display are often 10–20 MB. Compress every new or replaced video before it is referenced from a page or committed.

## Steps

1. Find the videos to process: the files the user named, or new and modified videos from `git status --short` (for example `git status --short | grep -Ei '\.(mp4|mov|m4v|webm)$'`). Do not re-compress videos that are already committed unless asked.
2. Make sure `ffmpeg` is installed (`command -v ffmpeg`). If it is missing, install it with `brew install ffmpeg`.
3. Run the bundled script on each file, keeping backups outside the repository (use the session scratchpad when one exists):

   ```bash
   bash .claude/skills/compress-video/scripts/compress-video.sh --backup-dir <scratchpad>/video-backups path/to/video.mp4
   ```

   The script re-encodes to H.264 MP4, scales down to at most 1920 px wide (never up), removes the audio track, tags BT.709 color, and enables fast start. It keeps the original if the re-encode is not smaller. A `.mov` or `.m4v` input is replaced by an `.mp4` with the same name, so update any references to the old file name.
4. Check the result: grab a frame (`ffmpeg -ss 2 -i video.mp4 -frames:v 1 frame.png`) and look at it to confirm that UI text is still sharp. If text is blurry, rerun with `--crf 22`. Use `--max-width` only when a page needs a different size.
5. Look through a few frames for private data, such as company names, internal URLs, email addresses, or customer data. Report anything you find instead of publishing it silently. Ask before editing the video's content.

## Report

List each video with its size and resolution before and after, where the backups are, and any references that were updated. Do not commit, push, or deploy unless asked.
