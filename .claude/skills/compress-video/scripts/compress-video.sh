#!/usr/bin/env bash
# Compress a demo video for the web in place: H.264, at most 1920 px wide, no audio, fast start.
# The original is kept in a backup directory and is restored if the result is not smaller.
set -euo pipefail

usage() {
  echo "usage: $0 [--max-width N] [--crf N] [--backup-dir DIR] VIDEO..." >&2
  exit 2
}

max_width=1920
crf=26
backup_dir="${TMPDIR:-/tmp}/compress-video-backups"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --max-width) max_width="$2"; shift 2 ;;
    --crf) crf="$2"; shift 2 ;;
    --backup-dir) backup_dir="$2"; shift 2 ;;
    -h|--help) usage ;;
    --) shift; break ;;
    -*) usage ;;
    *) break ;;
  esac
done
[[ $# -gt 0 ]] || usage

if ! command -v ffmpeg >/dev/null || ! command -v ffprobe >/dev/null; then
  echo "ffmpeg is not installed. Install it with: brew install ffmpeg" >&2
  exit 1
fi

mkdir -p "$backup_dir"

for input in "$@"; do
  if [[ ! -f "$input" ]]; then
    echo "skip: $input is not a file" >&2
    continue
  fi

  name="$(basename "$input")"
  stem="${name%.*}"
  output_dir="$(dirname "$input")"
  output="$output_dir/$stem.mp4"
  backup="$backup_dir/$(date +%Y%m%d%H%M%S)-$name"
  work="$(mktemp -d)"
  # Paths that differ only in case are the same file on the default macOS file system.
  same=0
  [[ "$(tr '[:upper:]' '[:lower:]' <<<"$output")" == "$(tr '[:upper:]' '[:lower:]' <<<"$input")" ]] && same=1

  cp "$input" "$backup"
  before=$(stat -f%z "$input")
  width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$input")

  scale="scale='min($max_width,iw)':-2:flags=lanczos"
  ffmpeg -v error -y -i "$input" -vf "$scale" \
    -c:v libx264 -preset veryslow -crf "$crf" -profile:v high -pix_fmt yuv420p -an \
    "$work/encoded.mp4"
  # Tag BT.709 so browsers do not guess the color space, and move the index up front for streaming.
  ffmpeg -v error -y -i "$work/encoded.mp4" -c copy \
    -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1 \
    -movflags +faststart "$work/final.mp4"

  after=$(stat -f%z "$work/final.mp4")
  if [[ "$after" -ge "$before" ]]; then
    echo "keep: $input is already smaller than the re-encode ($before vs $after bytes)"
    rm -rf "$work"
    continue
  fi

  [[ "$same" == 1 ]] || rm "$input"
  mv "$work/final.mp4" "$output"
  rm -rf "$work"
  new_width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$output")
  echo "done: $output ${width}px -> ${new_width}px, $before -> $after bytes (backup: $backup)"
done
