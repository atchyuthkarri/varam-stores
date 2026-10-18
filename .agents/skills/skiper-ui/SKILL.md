---
name: skiper-ui
description: Comprehensive guide for adding, configuring, and leveraging Skiper UI animated micro-interaction components (such as skiper40 CssLink, cursor hover animations, dynamic underlines, and curtain transitions) in React, Tailwind CSS, and shadcn/ui.
---

# Skiper UI Integration Skill

This skill documents how to integrate and optimize web applications with **Skiper UI** components (`skiper-ui.com`), focusing on high-performance CSS and Framer Motion micro-interactions.

## Component: `@skiper-ui/skiper40` (CssLink)

`skiper40` provides lightweight, 60fps CSS-only animated link components inspired by Cursor.com's modern interaction design.

### Available Link Variants

1. **`Link000`** (Underline Left-to-Right):
   - Exit: scales out towards the right.
   - Hover: scales in from the left with a smooth cubic-bezier curve.
   - Best for: Minimalist inline links, breadcrumbs, navigation bars.

2. **`Link001`** (Underline + Subtle Diagonal Arrow Reveal):
   - Hover: scales underline in from left and transitions a 45° arrow upwards into view.
   - Best for: External links, "Read More", "Learn More", section hero CTAs.

3. **`Link002`** (Underline Right-to-Left):
   - Hover: underline transitions in reverse direction (right to left) with arrow reveal.
   - Best for: Back buttons, secondary actions, alternate directions.

4. **`Link003`** (Underline Center Expand):
   - Hover: underline originates from the center and expands outwards horizontally.
   - Best for: Centered headers, tabs, navigation dropdown items, brand pills.

5. **`Link004`** (Vertical Height Curtain Fill):
   - Hover: vertical background wash expands upward from bottom to full height, with arrow rotate.
   - Best for: Pill tags, department quick links, footer action buttons.

6. **`Link005`** (Horizontal Width Pill Reveal):
   - Hover: horizontal pill background wash sweeps from left to right.
   - Best for: Category pills, filter badges, interactive callouts.

### Usage in Code

```tsx
import { Link000, Link001, Link003, Link004, Link005 } from "@/components/ui/skiper40";

// Nav Link
<Link003 onClick={() => goToStory()} className="text-sm font-semibold text-stone-800">
  Our Story
</Link003>

// Call to action with arrow
<Link001 onClick={() => goToShop()} className="text-xs font-bold text-[#B45309]">
  Explore Organic Aisles
</Link001>

// Pill badge
<Link004 onClick={() => filterDeals()} className="text-xs font-bold bg-amber-50 text-amber-900">
  Special 20% Off Deals
</Link004>
```

### Registry Installation Command
```bash
npx shadcn add @skiper-ui/skiper40
```
Registry endpoint: `https://skiper-ui.com/r/skiper40.json`
