# AI Professional Headshot Generator

Generate polished, photorealistic professional headshots from a text description using AI. Powered by the Neta talesofai API — get a direct image URL back in seconds.

---

## Install

**Via npx skills:**
```bash
npx skills add blammectrappora/ai-headshot-skill
```

**Via ClawHub:**
```bash
clawhub install ai-headshot-skill
```

---

## Usage

```bash
# Default prompt (studio headshot)
node aiheadshot.js

# Custom prompt
node aiheadshot.js "executive headshot, woman in blazer, blurred office background"

# With size option
node aiheadshot.js "confident professional headshot" --size landscape

# With a reference image UUID
node aiheadshot.js "same person, different background" --ref <picture_uuid>
```

The script prints a single image URL to stdout on success.

---

## Options

| Flag | Values | Default | Description |
|------|--------|---------|-------------|
| `--size` | `portrait`, `landscape`, `square`, `tall` | `portrait` | Output image dimensions |
| `--token` | string | — | Neta API token (overrides env/file) |
| `--ref` | picture_uuid | — | Reference image UUID for style inheritance |

### Size dimensions

| Name | Width × Height |
|------|---------------|
| `square` | 1024 × 1024 |
| `portrait` | 832 × 1216 |
| `landscape` | 1216 × 832 |
| `tall` | 704 × 1408 |

---

## Token setup

The script resolves your `NETA_TOKEN` in this order:

1. `--token <value>` CLI flag
2. `NETA_TOKEN` environment variable
3. `~/.openclaw/workspace/.env` — line matching `NETA_TOKEN=...`
4. `~/developer/clawhouse/.env` — line matching `NETA_TOKEN=...`

**Recommended:** add to your shell profile or `.env` file:
```bash
export NETA_TOKEN=your_token_here
```

---

## Examples

```bash
# Portrait headshot (default)
node aiheadshot.js "professional studio headshot, man in suit, neutral grey background"

# Square crop for profile pictures
node aiheadshot.js "friendly professional headshot, warm smile" --size square

# Landscape for LinkedIn banner
node aiheadshot.js "executive portrait, woman, modern office background" --size landscape
```

## About Neta

[Neta](https://www.neta.art/) (by TalesofAI) is an AI image and video generation platform with a powerful open API. It uses a **credit-based system (AP — Action Points)** where each image generation costs a small number of credits. Subscriptions are available for heavier usage.

### Register

| Region | Sign up | Get token |
|--------|---------|-----------|
| Global | [neta.art](https://www.neta.art/) | [Open Portal → API Token](https://www.neta.art/open/) |
| China  | [nieta.art](https://app.nieta.art/) | [Security Settings](https://app.nieta.art/security) |

New accounts receive free credits to get started.

### Pricing

Neta uses a pay-per-generation credit model. View current plans and credit packages on the [pricing page](https://www.neta.art/pricing).

- Free tier: limited credits on signup
- Subscription: monthly AP allowance via Stripe
- One-time packs: top up credits as needed

### Get your API token

1. Sign in at [neta.art/open](https://www.neta.art/open/) (global) or [nieta.art/security](https://app.nieta.art/security) (China)
2. Generate a new API token
3. Set it as `NETA_TOKEN` in your environment or pass via `--token`

```bash
export NETA_TOKEN=your_token_here
node aiheadshot.js "your prompt"

# or inline
node aiheadshot.js "your prompt" --token your_token_here
```

---

Built with [Claude Code](https://claude.ai/claude-code) · Powered by [Neta](https://www.neta.art/) · [API Docs](https://www.neta.art/open/)