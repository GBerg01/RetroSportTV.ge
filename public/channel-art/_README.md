# Channel Art Assets

Place generated channel art in this directory using one folder per channel slug.

Required naming:

```text
public/channel-art/{slug}/row-bg.png
public/channel-art/{slug}/profile-bg.png
public/channel-art/{slug}/logo.png
```

Example:

```text
public/channel-art/kobe-tv/row-bg.png
public/channel-art/kobe-tv/profile-bg.png
public/channel-art/kobe-tv/logo.png
```

Recommended formats:

- `row-bg.png`: wide horizontal guide rectangle background, `4:1` or `5:1`.
- `profile-bg.png`: vertical profile card background, `3:4`.
- `logo.png`: square transparent or icon-ready logo, `1:1`.

Generation rules:

- Do not include real team logos.
- Do not include real athlete faces.
- Do not include readable text, letters, numbers, watermarks, or trademarks.
- Treat all images as art layers. React renders channel names, CH numbers, badges, metadata, and CTAs.
- Keep row backgrounds readable in the left and center safe zones.
- Keep profile backgrounds low-detail behind text areas.

Usage:

1. Copy a prompt from `CHANNEL_ART_PROMPTS.md`.
2. Generate or refine the asset with OpenAI image generation for production consistency.
3. Use Midjourney only as optional concept exploration if you want extra vibe references.
4. Download the selected production result.
5. Save it using the exact path above.
6. Add the matching paths to `data/channels.ts` through the reviewed channel data workflow:

```ts
logoUrl: "/channel-art/{slug}/logo.png",
rowBackgroundUrl: "/channel-art/{slug}/row-bg.png",
profileBackgroundUrl: "/channel-art/{slug}/profile-bg.png",
```

7. Run `npm run build`.
