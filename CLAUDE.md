# Lafayette Food Forest — Handoff Context

This folder is a multi-session-built food forest design for a 30 × 60 ft lot in Lafayette, CA. The owner is a homeowner with young kids (under 6) who wants a kid lawn now, fruit-tree perimeter over the next decade, and a mature food forest in 15 years. Read this before editing anything.

## Owner profile
- Location: Lafayette, CA — USDA Zone 9b, Sunset Zone 14
- Has young kids (8–10 year lawn horizon)
- Already owns: stockpiled clay (from on-site digging) and wood chips
- Cares about: sustainability, environmental friendliness, low maintenance, productivity
- Cooks but isn't deeply into preserving — preferred fresh-eating + jam-able fruit (chose Cornelian cherry over quince + aronia)
- Doesn't like hazelnuts (replaced with Cornelian cherry pair at T15/T16)
- Doesn't want patio containers (removed kumquat)

## Lot specifics
- Shape: **Pentagon** — 30 ft wide (E–W) × 60 ft long (N–S) with a 45° cut at the NW corner (from mid-north to mid-west)
- Net area: ~1,687 sq ft
- Surrounded by pavement on all four sides:
  - **East**: driveway (no parked cars)
  - **West**: 2-lane driveway (no parked cars) with 100-year coast live oaks beyond
  - **North**: concrete walkway
  - **South**: patio + house. House occupies the **east 2/3** of the south boundary. Patio wraps around the **west 1/3** of the south, between lot and house edge
- Topography: 1 ft below datum at south, 3 ft below at back/north → ~2 ft cross-fall, being filled to level (with 1% drainage crown south → north)
- Soil: heavy expansive clay (East Bay Diablo/Altamont series)
- Walls: **west wall exists**; **north + 45° diagonal + east walls are NEW** (engineered for clay)
- Diagram orientation note: lot back-edge is ~26° east of true north — compass on diagram shows this

## Sun & shade pattern
- ~6–8 hrs direct sun/day on the lot
- **3 coast live oaks (50–80 ft tall) across the west driveway** cast late-afternoon shade (3–6 PM) on the entire lot
- House (14 ft tall, east 2/3 of south boundary) casts winter-noon shade ~16 ft into the *east* portion of the lot only — west third stays sunny in winter afternoons because of the patio wrap
- Net: morning + midday sun on full lot; west cools down first (oaks); east keeps sun a bit longer; far south (under house) is winter-shaded

## File inventory

| File | Purpose |
|---|---|
| `index.html` | **Index page** — overview, project nav cards (main lot + 4 other project areas), main-lot design summary, site characteristics. (Formerly `Lafayette_Food_Forest_Plan.html`, renamed for GitHub Pages root URL.) |
| `Hardscape_LotPrep.html` | **Main lot Phase 1** — site assessment, walls + fill + drainage, layering & compaction, French drain (cross-section + top view), planting band layout, topsoil sourcing, other prep |
| `Planting.html` | **Main lot Phase 2** — main top-down SVG diagram, zoomed-in tree guild view, color key, plant palette with hover tooltips, plant counts table |
| `Irrigation_Well.html` | **Main lot Phase 3** — well + new pump, pressure tank, filter, backflow, mainline, 5 zones, build order |
| `Plant_Reference.html` | **Encyclopedia** — 36 plant entries with tags, descriptions, mature size, count, Lafayette growing notes, Wikimedia Commons images |
| `Between_Justins_Anas.html` | Project — evergreen privacy screen between Justin's & Ana's house |
| `Between_Sohrabs_Anas.html` | Project — evergreen privacy screen between Sohrab's & Ana's house |
| `Perimeters.html` | Project — shaded perimeter beds (pollinator/pest-deterrent/aromatic/culinary/medicinal) |
| `Playground.html` | Project — shaded kid-safe play area planting |
| `agents/` | **Compressed Markdown extracts** of all the HTML pages, structured for agent/LLM ingestion. Mirror the page contents at ~7× lower file size. Has its own `agents/README.md` as an index. Update these when you change a live HTML page. |
| `CNAME` | GitHub Pages custom domain: `landscaping.quinnbaetz.com` |
| `.gitignore` | .DS_Store, node_modules, *.log |
| `build_plan.js` | **LEGACY** — original Node.js docx generator from session 1 (built a 40 × 60 lot Word document with hybrid leveling that's since been superseded). Owner asked to keep it for Claude reference. Not part of the live plan. |

## Current plan summary

**17 freestanding fruit trees** + **15 bridge shrubs** + **3 wall trellis fruits** + **2 gooseberries** + **8 guild species (~190 plants)** + **3 cascading wall species (~22 plants)** = **~36 species, ~228 total plants**, plus the lawn.

### Freestanding trees (numbered T1–T17 in SVG)
| # | Plant | Position |
|---|---|---|
| T1 | Apple 'Pink Lady' | North band |
| T2 | European pear 'Warren' | North band |
| T3 | Persimmon 'Fuyu' (non-astringent) | SW diagonal pocket |
| T4 | Mulberry 'Pakistan' | West band |
| T5 | Plum 'Santa Rosa' | West band |
| T6 | Peach 'Frost' (PLC-resistant) | West band |
| T7 | Apricot 'Royal Blenheim' | West band |
| T8 | Jujube 'Li' | West band |
| T9 | Fig 'Black Mission' | East band |
| T10 | Pomegranate 'Wonderful' (tree form) | East band |
| T11 | Olive 'Arbequina' | East band |
| T12 | Lemon 'Improved Meyer' | East band |
| T13 | Mandarin 'Owari Satsuma' | East band |
| T14 | Loquat 'Champagne' | NE corner |
| T15 | **Cornelian cherry 'Yellow'** | SW south end |
| T16 | **Cornelian cherry 'Red Star'** (cross-pollinator) | SE south end |
| T17 | Persimmon 'Hachiya' (astringent) | NE diagonal pocket |

All trees on 7 ft Backyard Orchard Culture (BOC) spacing, kept ~10 ft tall by summer pruning.

### Wall trellis (east wall, 3 crops)
- **Thornless blackberry 'Triple Crown'** — north 10 ft of east wall
- **Table grape 'Flame Seedless'** — middle 12 ft
- **Fan-trained fig 'Violette de Bordeaux'** — south 14 ft

### Wall cascading (primary / secondary / tertiary tiers)
- **Primary on all walls**: trailing rosemary 'Huntington Carpet' / 'Prostratus' (evergreen, especially important on north wall — first thing visible from the driveway)
- **Secondary on west wall**: California fuchsia (Epilobium canum) — magenta, hummingbird magnet
- **Secondary on east wall**: alpine strawberry runners — between rosemary clumps
- **Tertiary** (mentioned in reference, not separately mapped in SVG): nasturtium, creeping thyme

### Bridge shrubs (B1–B19 in SVG, ~15 remaining after diagonal-corner removal)
Pineapple guava 'Coolidge/Nazemetz/Apollo' (~6), pomegranate shrub form (~4), upright rosemary (~2), toyon (~1), **plus 2 gooseberries** ('Pixwell' thornless + 'Hinnonmaki Red') replacing 2 of the west-side pineapple guavas.

### Guild plants (around every tree)
Comfrey 'Bocking 14' (×16), Ceanothus 'Concha' or goumi (alternating, ~8 each), borage or yarrow (~10 + 6), chives + garlic chives (~48 + 12), alpine strawberry 'Mignonette' (~80 starts).

## Major design decisions (in chronological order, latest is current)

1. **Earthworks**: full perimeter retaining wall + fill (not hybrid terracing — owner preference). Existing west wall + new north/diagonal/east walls.
2. **Soil**: on-site clay = bottom 12–18 in structural fill (compacted in 6–8 in lifts). Cap with imported sandy-loam/compost. Wood chips = sheet mulch + paths + annual top-dress.
3. **Lot is FULLY leveled** with ~1% drainage crown south → north. The tree-guild zoom view used to label "uphill/downhill" — replaced with "access path side / lawn side" since the lot is level.
4. **NW corner is cut at 45°** (pentagon shape). The diagonal pocket holds T3 Fuyu (SW half) and T17 Hachiya (NE half) — the two persimmons paired for fresh-eating + drying (hoshigaki).
5. **East mirrors west**: new east retaining wall added; freestanding trees on east band (T9–T13) mirror west trees (T4–T8) at same y positions. No more espalier line (was dropped in favor of freestanding heat-lovers + east wall trellis).
6. **South side stays clear** — house shadow makes it unproductive. Patio + table sits between lawn and house.
7. **No continuous "hedge"** — perimeter ball-catching function is served by trees + their guild bushes + bridge shrubs in the gaps between mulched circles.
8. **Pavement surrounds the whole lot** — driveway east, 2-lane driveway west, walkway north, patio south. Root zones are confined to the lot.
9. **House extends east 2/3 of south boundary; patio wraps west 1/3**. Winter shade only affects east portion of lot.
10. **East wall is now a trellis line** for 3 wall-trained fruits (blackberry + grape + fig). Blackberry moved here from the west wall because the west wall's trellis was buried under west-band tree mulch circles, getting poor sun.

## Color code in SVG (Planting.html main diagram)

| Color | Plant category |
|---|---|
| `#3F6B36` dark green | Pome canopy (apple, pear, persimmon, mulberry, loquat) |
| `#C97B82` pink | Stone fruit Prunus (plum, peach, apricot) |
| `#8B9558` olive | Drought-loving (jujube, olive) |
| `#6E4E3F` brown | Fig |
| `#B5462C` red-orange | Pomegranate tree form |
| `#E5A93B` gold | Citrus (lemon, mandarin) |
| `#D9A237` yellow | Cornelian cherry |
| `#A03060` magenta | Thornless blackberry on wall |
| `#5C3B6E` deep purple | Table grape |
| `#5C8A4A` perimeter green | Bridge shrubs (PG, pom shrub, rosemary, toyon) |
| `#B07570` dusky red | Gooseberry |
| `#7E9678` silver-green | Trailing rosemary (wall cascading primary) |
| `#C73A7A` magenta | California fuchsia (wall cascading secondary, west wall) |
| `#C97B5C` red-pink | Alpine strawberry (guild + east wall cascading) |
| `#B7C45A` yellow-green | Comfrey (guild) |
| `#9AB7D4` blue-gray | Nitrogen-fixer (Ceanothus, goumi) |
| `#7DB6D9` sky blue | Borage (guild pollinator) |
| `#E29A6E` orange | Yarrow (guild pollinator alt) |
| `#D67BAE` pink | Alliums (chives, garlic chives) |

## SVG tooltip conventions

Every plant marker in the SVG has these attributes:
- `data-name`: full name + cultivar (e.g., `"3. Persimmon — 'Fuyu' (non-astringent)"`)
- `data-cat`: category label (e.g., `"Pome & persimmon canopy"`)
- `data-alts`: alternative varieties or substitutes (text)
- `data-ref`: anchor in `Plant_Reference.html` (e.g., `"persimmon-fuyu"`)
- `data-img`: image URL (currently empty for all — see "Open items" below)

Tooltip JS reads these attributes and renders an instant tooltip on hover (no native browser delay). Clicking a marker navigates to the reference anchor.

## SVG layout / coordinates

- **Scale**: 1 ft = 12 px
- **ViewBox**: `-140 0 920 1180` (extended left to include oak trees beyond west driveway)
- **Lot origin**: SVG (180, 40) = lot (0, 0)
- **Lot extent**: SVG (180–540, 40–760) = 30 × 60 ft
- **Compass**: rotated 26° clockwise to show true north (lot back-edge is ~26° east of true N)
- **Cascading marker positions**: along the very top of each wall, with letter labels R / f / s

## CSS structure

Each page has its own `<style>` block with shared variables (--green, --clay, etc.) and:
- Hero with eyebrow + h1 + subtitle
- TOC navigation
- Section headers with green border-bottom
- Tables with green header
- Plant cards (`.plants` grid + `.plant-card`)
- Color-key grid
- Plant-tooltip styles (in Planting.html — fixed position, opacity transition for instant show)
- Plant-entry image infrastructure (Plant_Reference.html — `.thumb-frame` and `.gallery` with `.gframe` placeholders)

## Open items / known limitations

1. **Plant reference images are placeholders.** Every plant entry has a 220×160 `.thumb-frame` and a 3-cell `.gallery` showing gradient placeholders. The tooltip in Planting.html already wires up `data-img` for image rendering on hover. Network restriction: `en.wikipedia.org` and `upload.wikimedia.org` are not on the workspace allowlist, so the prior session couldn't auto-fetch images. **Options to populate**:
   - Owner adds `en.wikipedia.org` and `upload.wikimedia.org` to Settings → Capabilities → Network, then Claude fetches Wikipedia API in a few batched calls
   - Owner provides image files in the workspace folder
   - Owner pastes specific image URLs to wire in
2. **15-year timeline section was removed** per owner request; the file structure is index → Phase 1 hardscape → Phase 2 planting → reference.
3. **No vegetable beds in the lawn yet** — owner asked about feasibility, was told tomatoes/peppers/squash/beans + cool-season greens/brassicas/roots all work at ~6 hr lawn-middle sun; melons + corn won't (need 8+ hr).

## Conventions for editing

- **Don't reintroduce removed sections** (timeline, kumquat container, hazelnuts).
- **Maintain east/west symmetry** for the side band trees (same y positions on both sides).
- **Keep BOC 7 ft spacing** for fruit trees (Backyard Orchard Culture).
- **Tooltip script is in Planting.html only** (the SVG-bearing page). Plant_Reference.html doesn't need it.
- **Plant counts in 3 places** must stay in sync if you add/remove a plant: index counts table, Planting.html counts section, Plant_Reference.html summary table. Plus the reference entry's "Count in plan" line.
- **CSS is duplicated across the 4 HTML files** (each is standalone). When updating shared styles, update all four.

## About `build_plan.js`

This is the original Node.js docx generator from session 1 (April 2026). It generated a `.docx` Word document for a 40 × 60 ft lot with hybrid leveling (kept-lawn + terraced perimeter) — a design that has since been superseded by everything in the HTML files. **Don't run it against the current data** — it doesn't know about the pentagon shape, the 30 ft width, the symmetric east mirror, or any of the current plant selections.

Owner asked to keep this file as a reference for what a Word-doc deliverable looked like, in case they ever want a printed/PDF version of the plan. If they request a new Word doc, you'd start from the HTML content and write a fresh `docx-js` script — not modify this one.

## How to rebuild any file

All four HTML files are hand-written (Edit/Write directly). To make changes, edit the relevant HTML and update the corresponding entry in `Plant_Reference.html` if the change involves a plant. Plant counts appear in 3 places and must stay in sync (see "Conventions for editing" above).
