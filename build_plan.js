// Lafayette CA 15-year food forest plan generator
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  TabStopType, TabStopPosition,
  TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak,
} = require("docx");

// ---------- Style helpers ----------
const ACCENT = "2F5233";       // deep leaf green
const ACCENT_LIGHT = "E6EFE3"; // very light green
const ACCENT_WARM = "C2845B";  // earthy clay
const GREY = "707070";

const border = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
const borders = { top: border, bottom: border, left: border, right: border };

const CONTENT_WIDTH = 9360;

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...opts,
    children: Array.isArray(text) ? text : [new TextRun(text)],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [new TextRun({ text })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text })],
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 60 },
    children: Array.isArray(text) ? text : [new TextRun(text)],
  });
}

function num(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "numbers", level },
    spacing: { after: 60 },
    children: Array.isArray(text) ? text : [new TextRun(text)],
  });
}

function bold(text) { return new TextRun({ text, bold: true }); }
function tr(text) { return new TextRun({ text }); }
function italic(text) { return new TextRun({ text, italics: true }); }

function callout(title, body) {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [CONTENT_WIDTH],
    rows: [new TableRow({
      children: [new TableCell({
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: ACCENT },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: ACCENT },
          left: { style: BorderStyle.SINGLE, size: 24, color: ACCENT },
          right: { style: BorderStyle.SINGLE, size: 4, color: ACCENT },
        },
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        shading: { fill: ACCENT_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 200, right: 200 },
        children: [
          new Paragraph({
            spacing: { after: 80 },
            children: [new TextRun({ text: title, bold: true, color: ACCENT })],
          }),
          ...body.map(line => new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun(line)],
          })),
        ],
      })],
    })],
  });
}

function table(headers, rows, colWidths) {
  const totalWidth = colWidths.reduce((a,b) => a+b, 0);
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: ACCENT, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({
        children: [new TextRun({ text: h, bold: true, color: "FFFFFF" })],
      })],
    })),
  });
  const bodyRows = rows.map((row, ri) => new TableRow({
    children: row.map((cell, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: ri % 2 === 1 ? { fill: "F4F1EC", type: ShadingType.CLEAR } : undefined,
      margins: { top: 80, bottom: 80, left: 140, right: 140 },
      children: (Array.isArray(cell) ? cell : [cell]).map(line =>
        new Paragraph({ children: [new TextRun({ text: line })] })),
    })),
  }));
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...bodyRows],
  });
}

function spacer() { return new Paragraph({ children: [new TextRun("")] }); }

// ---------- Content ----------
const children = [];

// Title block
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 80 },
  children: [new TextRun({
    text: "From Compacted Clay to Food Forest",
    bold: true, size: 44, color: ACCENT,
  })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 80 },
  children: [new TextRun({
    text: "A 15-Year Plan for a 40 × 60 ft Lot in Lafayette, CA",
    size: 28, color: GREY,
  })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 360 },
  children: [new TextRun({
    text: "Phase 1: kids' lawn + perimeter orchard  →  Phase 2: kitchen garden  →  Phase 3: full food forest",
    italics: true, color: GREY, size: 22,
  })],
}));

// Executive summary
children.push(h1("Executive Summary"));
children.push(p([
  bold("The short answer: "),
  tr("A retaining wall + fill is a workable approach for your lot, but a "),
  bold("smarter, cheaper, more productive variant"),
  tr(" is to "),
  bold("fully level only the central play zone "),
  tr("(a ~25 × 45 ft kid-friendly lawn) and "),
  bold("terrace the perimeter "),
  tr("into productive planting tiers. You get a flat lawn for the kids, half the imported fill, lower walls (some likely under the permit threshold), and the slope itself becomes a productive feature instead of a problem to flatten."),
]));
children.push(p([
  bold("Why not just level everything: "),
  tr("To bring your whole 40 × 60 plot to grade you'd import roughly "),
  bold("178 cubic yards of fill"),
  tr(" (about 13 dump-truck loads) and build ~100 ft of perimeter wall, at least one section of which will need an engineered design and a city permit. Placed on compacted clay without proper base prep, that fill creates a perched water table that drowns tree roots. Doable, but expensive and you fight your soil for years."),
]));
children.push(p([
  bold("Why the hybrid wins: "),
  tr("Your lot already wants to be terraced — there's a usable 2 ft cross-fall over 60 ft. A single mid-height wall around just the lawn footprint (~80 linear ft, mostly under 3 ft tall) gives the kids a perfectly flat play surface while letting the perimeter \"step down\" naturally into raised beds and food-forest tiers. Trees and shrubs grow on undisturbed (but heavily amended) native ground, which is what they actually want."),
]));

children.push(callout(
  "The 5 decisions this plan locks in",
  [
    "1. Earthworks strategy: hybrid — level the central play zone, terrace the perimeter.",
    "2. Soil strategy: do NOT till the clay. Build soil on top with sheet mulching, cover crops, and biological subsoiling (daikon, comfrey, deep-rooted natives).",
    "3. Water strategy: drip backbone + laundry-to-landscape greywater + winter rainwater capture. Mulch hard.",
    "4. Plant strategy: low-chill varieties only (you have ~200–400 chill hours). Heat-lovers on the east wall (hot west-facing microclimate). Tall trees on the back/uphill edge.",
    "5. Maintenance strategy: deer fence the whole perimeter on day one; gopher-basket every fruit tree. Both are non-negotiable in Lafayette.",
  ]
));

// Site assessment
children.push(h1("Site Assessment"));
children.push(p([
  bold("Location & climate. "),
  tr("Lafayette, CA. USDA Zone 9b, Sunset Zone 14. Mediterranean: hot dry summers (highs in the 85–100°F range), mild winters (rare hard frosts), ~22–25 in of rain almost entirely between November and April. Critical for fruit selection: only ~200–400 winter chill hours (hours below 45°F), so high-chill varieties of apple, pear, peach, and cherry will set poorly. Low-chill cultivars only."),
]));
children.push(p([
  bold("Soil. "),
  tr("Heavy, compacted clay (typical of East Bay hills — likely Diablo or Altamont series, both expansive). Drains slowly, dries to brick. Root penetration is the constraint, not nutrients."),
]));
children.push(p([
  bold("Topography. "),
  tr("40 × 60 ft, ~2,400 sq ft. Near edge sits 1 ft below your driveway/structure datum; far edge sits 3 ft below. Net cross-fall ~2 ft over 60 ft (~3.3% slope) — gentle enough that you have real choices."),
]));
children.push(p([
  bold("Sun & microclimate. "),
  tr("Masonry wall and driveway on the east side. Sun crosses the lot from east in the morning to west in the afternoon. The wall's inward face is "),
  bold("west-facing"),
  tr(" — it absorbs all-afternoon sun and re-radiates heat into the evening. That's a "),
  bold("Mediterranean hot microclimate"),
  tr(" against the wall: prime real estate for figs, pomegranates, espaliered apples/pears, table grapes, and (with frost cover in cold snaps) the most cold-tender citrus."),
]));
children.push(p([
  bold("Pressures unique to Lafayette. "),
  tr("Deer (heavy — they will obliterate an unfenced orchard), gophers (will girdle every fruit tree within reach), wildfire/WUI considerations (defensible-space rules apply within 100 ft of structures), and expansive clay that swells and shrinks seasonally (matters for wall footings)."),
]));

// Leveling decision
children.push(h1("The Big Decision: How to Handle the Slope"));
children.push(p("Three real options. Cost, fill volume, and walls all scale together."));

children.push(table(
  ["Option", "What you do", "Approx. fill", "Wall (linear ft)", "Permit/engineering"],
  [
    [bold("A. Full level"), "Engineered retaining walls around the open edges, import fill, compact in lifts to bring entire lot to driveway grade.", "~178 cu yd", "~80–100 ft, up to 3 ft tall + surcharge", "Engineered design + Lafayette permit very likely (surcharge crosses 4 ft trigger)"],
    [bold("B. Hybrid (recommended)"), "Level only the central play zone with ONE mid-height wall around its footprint. Terrace the perimeter with two short walls or graded berms.", "~70–90 cu yd", "~80–100 ft, but mostly 18–30 in tall", "Often achievable under the 4 ft trigger; still verify with Lafayette Building"],
    [bold("C. Work with the slope"), "Cut a flat lawn pad on contour, build swales and on-contour planting berms downhill, accept a tiered yard with no formal walls.", "~20–40 cu yd (cut/fill balance)", "0–40 ft of low garden walls (decorative)", "Usually no permit"],
  ],
  [1750, 3000, 1200, 1700, 1710]
));

children.push(h2("Why Hybrid (Option B) is the right call for you"));
children.push(bullet("Your kids get a fully flat, contiguous play lawn of ~25 × 45 ft (1,125 sq ft) — enough for goals, a small trampoline, sprinklers, soccer-ish."));
children.push(bullet("The wall ringing the lawn is mostly 18–30 in tall. Two key benefits: (a) below California's 4-ft engineered-wall trigger in most cases, and (b) it doubles as a seat-wall and a heat-storing mass for the planting beds just behind it."));
children.push(bullet("You import ~half the fill, which means half the truck traffic, half the compaction equipment, half the disturbance to existing soil biology, and faster timeline."));
children.push(bullet("Trees go in the perimeter zone, which keeps undisturbed native soil contact (just heavily amended on top). Filling 2–3 ft over compacted clay and then planting trees into it is a recipe for root rot."));
children.push(bullet("The perimeter naturally steps down toward the lower edge — turn that drop into 1–2 short \"garden tiers\" (12–18 in retaining), which gives you raised-bed style planting without building raised beds."));

children.push(h2("What the wall actually does"));
children.push(p([
  bold("Primary function: "),
  tr("hold the leveled play-zone soil. "),
  bold("Secondary functions you should design in from the start: "),
  tr("(1) thermal mass for the planting bed immediately behind it on the sunny side, (2) seat-wall for the lawn side, (3) integrated drip-line and conduit chase before backfill, (4) gravel-and-fabric French drain along its uphill face."),
]));
children.push(p([
  bold("Materials, from best long-term to most utilitarian: "),
  tr("(1) Dry-stacked Sonoma fieldstone or basalt — most beautiful, ages well, permits often unnecessary under 3 ft, hand-built. (2) Segmental Retaining Wall block (Allan Block, Keystone, Belgard) — fastest, modular, predictable, engineered systems available. (3) Poured concrete with stone veneer — strongest, smallest footprint, highest cost. "),
  bold("Avoid: "),
  tr("railroad ties (creosote leaches into edible soil), untreated softwood (rots in 5–10 yrs)."),
]));

children.push(callout(
  "Lafayette permit check (verify before contracting)",
  [
    "California Building Code generally requires permits for retaining walls over 4 ft (bottom of footing to top of wall) OR ANY wall supporting a surcharge (slope, structure, driveway).",
    "Lafayette Building Department: confirm thresholds, setbacks, and whether your lot is in a hillside-overlay district before signing a wall contract.",
    "Walls within 5 ft of a property line or supporting a driveway often trigger engineering regardless of height.",
    "Have a civil/geotech-aware contractor design footings for expansive clay (typically wider base, gravel/sand transition layer, drainage tile).",
  ]
));

// Soil
children.push(h1("Soil: Build It, Don't Fight It"));
children.push(p("The single biggest mistake on a compacted-clay lot is rototilling deep. It pulverizes structure, creates a smeared hardpan at till depth, and starts you over from zero. Build soil from the top down using biology."));

children.push(h2("Year-1 soil reset (do this BEFORE planting trees)"));
children.push(num("Soil test. Send composite samples from your perimeter planting band to UMass or A&L Western Agricultural Labs (~$30–60). You want pH, NPK, CEC, organic matter %, and a soluble salts read."));
children.push(num("Mechanical relief, gently. One pass with a tractor-mounted ripper or broadfork to 10–12 in across the planting band only. Goal is fracture, not pulverize. Skip this entirely under the lawn pad (it'll get compacted again by fill)."));
children.push(num("Sheet mulch the perimeter planting band. Layer in order: (a) compost 1–2 in directly on soil, (b) overlapping cardboard (no tape, no glossy ink), (c) compost 2–3 in, (d) wood chips/arborist chips 4–6 in. Total depth ~6–10 in. Let it cook over winter."));
children.push(num("Sow cover crops in any beds you're not sheet-mulching yet. Late fall: daikon radish (the \"biological subsoiler\" — punches roots through clay), fava beans (N-fixer + biomass), winter rye (deep roots + carbon)."));
children.push(num("Inoculate at planting. Every fruit tree, shrub, and vine gets a teaspoon of granular endo/ecto mycorrhizal inoculant in the planting hole. Cheap, transformational on clay."));

children.push(h2("Ongoing soil-building (every year, forever)"));
children.push(bullet([
  bold("Chop and drop. "),
  tr("Comfrey (use sterile 'Bocking 14'), borage, yarrow, and your prunings all get chopped and laid down as mulch in place. This is the food forest's nutrient engine."),
]));
children.push(bullet([
  bold("Two mulch refreshes a year. "),
  tr("Spring (after first soak) and fall. 2–3 in arborist chips, pulled back 4 in from every trunk to prevent collar rot."),
]));
children.push(bullet([
  bold("Compost top-dress. "),
  tr("½–1 in compost across the planting bands every fall. Don't dig it in — worms and weather will."),
]));
children.push(bullet([
  bold("Skip synthetic fertilizer. "),
  tr("Once year-3 mulch and cover crops are running, you should never need it. If a tree looks deficient, address pH and biology first."),
]));

// Water
children.push(h1("Water: The Year-Round Plan"));
children.push(p([
  tr("Lafayette gets ~22–25 in of rain November–April and effectively zero May–October. Every plant in your yard needs to handle that or be irrigated through summer. Three coordinated systems:"),
]));

children.push(h3("1. Drip irrigation backbone (install Year 1 before planting)"));
children.push(bullet("PVC mainline (¾” or 1”) buried below frost — not a real concern here but bury to protect from sun and shovels."));
children.push(bullet("Hunter or Rain Bird ET-based smart controller with multiple zones. Lafayette's MWELO (Model Water Efficient Landscape Ordinance) compliance is easiest with a smart controller."));
children.push(bullet("Zones: lawn (subsurface drip or efficient rotors), perimeter trees (one zone), beds/berries (one or two zones), pots/specialty (one zone)."));
children.push(bullet("Each tree gets a drip ring: 4–6 pressure-compensating emitters (1–2 gph) at the drip line. Expand the ring outward as the tree grows; emitters at the trunk are pointless."));

children.push(h3("2. Rainwater capture (start small, expand)"));
children.push(bullet("Your roof is your reservoir. A 1,000 sq ft roof captures ~620 gal per inch of rain — ~14,000+ gal/yr in Lafayette."));
children.push(bullet("Start Year 1 with a single 500–1,000 gal slim-line cistern on the side of the house, gravity-fed to a hose bib used for hand-watering newly-planted trees through their first summer."));
children.push(bullet("Year 3–5: optionally expand to 2,500–5,000 gal capacity (above-ground steel or below-ground if budget allows). Plumb into a dedicated outdoor manifold."));

children.push(h3("3. Greywater (Year 2 or 3, once trees are in)"));
children.push(bullet("California's Laundry-to-Landscape (L2L) system is permit-free and the highest-leverage greywater install for a homeowner."));
children.push(bullet("One washing machine → ~10,000–15,000 gal/yr of warm, lightly-soapy water distributed to fruit trees via 1” HDPE lines and mulch basins. It runs the whole irrigation system for established trees in summer."));
children.push(bullet("Greywater rules: subsurface or under mulch only, no spray, no contact with edible parts you eat raw (so: yes for tree fruit, no for lettuce-style beds), no greywater near vegetable beds without a switch valve."));

// Plant palette
children.push(h1("Plant Palette: Built for Zone 9b Lafayette"));
children.push(p("Every plant below is chosen for low chill, drought tolerance once established, productivity, and integration into a 7-layer food-forest guild. Quantities suggested for your 40 × 60 lot."));

children.push(h2("Layer 1: Canopy / large fruit trees"));
children.push(p([italic("Place along the back (north/uphill) edge and corners so they don't shade the lawn. Plant on semi-dwarf rootstocks, 12–15 ft spacing, mature height 15–20 ft. Total: 4–6 trees.")]));
children.push(table(
  ["Tree", "Best low-chill variety", "Notes for your lot"],
  [
    ["Apple", "Anna, Dorsett Golden, Pink Lady, Fuji (low-chill strain)", "Plant two for cross-pollination. Pink Lady is best eating apple."],
    ["European pear", "Warren, Bartlett (low-chill), Comice", "Self-fertile pairings exist; Warren is exceptional."],
    ["Asian pear", "Hosui, Shinseiki, 20th Century", "More reliable than European pears in mild winters. Crisp, productive."],
    ["Persimmon", "Fuyu (non-astringent), Hachiya (astringent, for drying)", "Nearly disease-free, no chill needed, spectacular fall color. Plant one of each."],
    ["Mulberry", "Pakistan (long fruit), Persian Black", "Vigorous, prolific. Plant where stained sidewalks don't matter."],
  ],
  [1700, 3500, 4160]
));

children.push(h2("Layer 2: Sub-canopy / heat-loving trees (along east wall)"));
children.push(p([italic("This is your hot west-facing microclimate. 8–12 ft spacing.")]));
children.push(table(
  ["Tree", "Variety", "Why here"],
  [
    ["Fig", "Black Mission, Brown Turkey, Violette de Bordeaux", "Loves heat reflected off the wall. Two crops per year in Lafayette."],
    ["Pomegranate", "Wonderful, Eversweet", "Drought + heat tolerant; striking orange blooms; long lived."],
    ["Olive", "Arbequina (small) or Mission (table)", "Mediterranean-perfect for Lafayette. Drought-proof once established."],
    ["Espaliered apple/pear", "Any of the apples/pears above, on EMLA-9 or similar", "Wall-trained, ~6 ft tall, ribbon of fruit. Stunning and productive."],
    ["Citrus (against wall for warmth)", "Improved Meyer lemon, Owari Satsuma mandarin, Washington Navel", "Wall radiates heat overnight in cold snaps; protect with frost cloth in hard winters."],
  ],
  [2100, 3300, 3960]
));

children.push(h2("Layer 3: Smaller fruit trees (west and front/south edges)"));
children.push(p([italic("Open-sun, gentler placement. 10–12 ft spacing.")]));
children.push(table(
  ["Tree", "Variety", "Notes"],
  [
    ["Plum (Japanese)", "Santa Rosa, Beauty, Elephant Heart", "Self-fertile; Santa Rosa pollinates the others."],
    ["Peach", "Frost (PLC resistant), Babcock (white)", "Peach Leaf Curl is the local enemy — buy PLC-resistant or commit to copper sprays."],
    ["Apricot", "Royal Blenheim, Katy", "Classic California fruit; spring rain risk — plant on the highest spot for best ripening."],
    ["Pineapple guava (Feijoa)", "Coolidge, Nazemetz", "Evergreen, drought tolerant, edible flowers + fruit. Doubles as a hedge."],
    ["Jujube", "Li, Lang", "Truly drought-proof, crunchy apple-like fruit, no pests, no disease."],
    ["Loquat", "Champagne, Big Jim", "Winter blooming, spring fruit; evergreen, structural."],
  ],
  [2100, 3300, 3960]
));

children.push(h2("Layer 4: Shrubs, berries, and nitrogen fixers"));
children.push(bullet([
  bold("Blueberries (in raised beds or containers): "),
  tr("'Sunshine Blue', 'Misty', 'Sharpblue'. They need pH 4.5–5.5 — your clay is wrong, so build a dedicated acid bed or use 25 gal pots with peat/pine bark."),
]));
children.push(bullet([
  bold("Thornless blackberries: "),
  tr("'Triple Crown', 'Black Satin'. Train on a single wire along the west edge."),
]));
children.push(bullet([
  bold("Currants and gooseberries: "),
  tr("'Red Lake' currant, 'Pixwell' gooseberry. Tuck into part-shade under fruit trees."),
]));
children.push(bullet([
  bold("Goji berry, sea buckthorn: "),
  tr("Drought-tolerant superfoods. Sea buckthorn is also a nitrogen fixer."),
]));
children.push(bullet([
  bold("Nitrogen fixers (plant 1 N-fixer per 3 fruit trees): "),
  tr("Goumi (Elaeagnus multiflora) — N-fixer + edible berries; California lilac (Ceanothus 'Concha') — native N-fixer, pollinator magnet; perennial lupine."),
]));
children.push(bullet([
  bold("California native edibles: "),
  tr("Toyon (winter berries, hedge), Mexican elderberry (Sambucus mexicana — cooked berries and flowers), Ribes sanguineum (native currant, hummingbird favorite)."),
]));

children.push(h2("Layer 5: Herbaceous — herbs, pollinators, dynamic accumulators"));
children.push(bullet("Mediterranean herbs (drought-perfect for Lafayette): rosemary (upright + trailing), lavender ('Munstead', 'Hidcote', 'Provence'), sage, thyme, oregano, marjoram."));
children.push(bullet("Comfrey 'Bocking 14' (sterile cultivar — critical, the seed-bearing one is invasive): your chop-and-drop workhorse. One plant per fruit tree."));
children.push(bullet("Borage: heaviest pollinator plant in your yard, edible flowers, dynamic accumulator. Reseeds gently."));
children.push(bullet("Yarrow (Achillea), echinacea, California poppy: pollinators + cut flowers."));
children.push(bullet("Cardoon and artichoke: dramatic perennial vegetables; perfect for Mediterranean climates."));
children.push(bullet("Strictly contain: mint (pots only — it will eat your yard), running bamboo (don't even start)."));

children.push(h2("Layer 6: Ground cover (replaces weeds, holds soil)"));
children.push(bullet("Microclover or a microclover + dwarf fescue blend (e.g., Pearl's Premium) for the lawn area — lower water, lower mowing, self-fertilizing."));
children.push(bullet("Creeping thyme, woolly thyme: walkable, fragrant ground cover in sunny paths."));
children.push(bullet("Alpine strawberry ('Mignonette'): productive ground cover under trees."));
children.push(bullet("Native yarrow, native sedges (Carex pansa is a great low-water lawn alternative)."));

children.push(h2("Layer 7: Vines"));
children.push(bullet("Table grapes ('Flame Seedless', 'Thompson Seedless', 'Princess'): train along the top of the east wall or on a pergola."));
children.push(bullet("Hardy kiwi (Actinidia arguta or fuzzy A. deliciosa 'Vincent' × 'Tomuri'): needs male + female, but very productive once mature."));
children.push(bullet("Hops (if you brew): vigorous, comes back every spring."));
children.push(bullet("Passion fruit (Passiflora edulis): cold-tender, plant against the warm wall."));

// Zone layout
children.push(h1("Site Layout: Where Things Go"));
children.push(p("Read this with your photo in front of you. “East” = the masonry wall side; “West” = the opposite edge; “Far” = the back (uphill, 3 ft lower than datum); “Near” = the front (downhill in your perception, 1 ft below datum)."));

children.push(table(
  ["Zone", "Footprint", "What goes here"],
  [
    [bold("Central lawn"), "~25 × 45 ft (1,125 sq ft), leveled to datum", "Microclover/fescue blend, subsurface drip. Surrounded by a continuous 18–30 in seat wall."],
    [bold("East wall band"), "5–6 ft wide × 60 ft long", "Hot microclimate. Espaliered fruit on the wall + figs, pomegranates, olive in front. Grape vines along the top of the wall."],
    [bold("West perimeter band"), "6–8 ft wide × 60 ft long", "Plums, peaches, apricots, feijoa, jujube. Berry hedge along the outer edge."],
    [bold("Back (far/north) band"), "8–10 ft wide × 40 ft long", "Tallest canopy: apples, pears, persimmon, mulberry. Step-down terrace integrates the 3 ft drop."],
    [bold("Front (near/south) band"), "5–6 ft wide × 40 ft long", "Citrus + loquat (warmer microclimate, closer to house), herb spiral, blueberry pots, and the chicken coop site for later."],
    [bold("Garden conversion zone"), "Inside the lawn perimeter, Years 7–10", "Eventually carve raised beds, herb spiral, and annual vegetable rotations out of the lawn footprint."],
  ],
  [2400, 2400, 4560]
));

children.push(h2("Tree count summary"));
children.push(p([
  bold("Total fruit trees, target: "),
  tr("~16–20, distributed: 4–6 canopy on the back band, 4–5 heat-lovers on east, 4–5 stone fruit / feijoa on west, 3–4 small (citrus, loquat) on front. Plus 3–5 espalier on the wall and a half-dozen nitrogen-fixing shrubs woven throughout."),
]));

// Timeline
children.push(h1("15-Year Phased Timeline"));

children.push(h2("Year 0 (now – fall): Plan & Permit"));
children.push(bullet("Soil test (composite samples). UMass or A&L Western, $30–60."));
children.push(bullet("Hire a landscape architect or experienced design-build firm familiar with East Bay clay + walls. Get 2–3 bids."));
children.push(bullet("Confirm Lafayette permit requirements with the city Building Department. Apply if needed."));
children.push(bullet("Map sun. Use an app (SunCalc, Sun Surveyor) over a few weeks to record actual shadow patterns at the equinoxes/solstices."));
children.push(bullet("Order bare-root fruit trees in October for January–February delivery (best selection at California Rare Fruit Growers exchanges, Dave Wilson Nursery via local retailers, or specialty nurseries)."));

children.push(h2("Year 1: Earthworks, Bones, Water"));
children.push(bullet([bold("Winter: "), tr("permits in hand. Order materials. Bare-root trees heeled in temporary trench.")]));
children.push(bullet([bold("Spring: "), tr("install 8 ft deer perimeter fence (non-negotiable). Demo / scrape and set wall footings. Run irrigation conduit and main lines before backfill.")]));
children.push(bullet([bold("Late spring/summer: "), tr("build walls, French drain behind them, import structural fill in 6–8 in lifts, compact with a plate compactor. Final 6–8 in is topsoil/compost blend.")]));
children.push(bullet([bold("Summer: "), tr("install drip + smart controller, rainwater cistern (500–1,000 gal), and outdoor hose bib network.")]));
children.push(bullet([bold("Fall: "), tr("sheet-mulch entire perimeter planting band. Sow cover crops (daikon, fava, rye) in bare spots. Plant nitrogen-fixing shrubs (Ceanothus, goumi).")]));
children.push(bullet([bold("Late winter (year boundary): "), tr("PLANT bare-root fruit trees. Gopher basket every single one (¾” wire mesh, 24 in deep cylinder). Mulch deep, water in.")]));

children.push(h2("Year 2: Lawn In, Berries In"));
children.push(bullet("Seed the lawn (microclover blend) in spring after soil warms. Establish before peak summer."));
children.push(bullet("Plant remaining berries (bare-root in winter), perennial herbs, comfrey at every tree."));
children.push(bullet("First structural pruning of fruit trees — establish scaffold. Watch a Dave Wilson Nursery pruning video before doing this; it's where 80% of long-term tree health is set."));
children.push(bullet("Water deeply but infrequently to drive roots down. Twice a week, deep soak, not daily sprinkles."));
children.push(bullet("Start a chop-and-drop cadence on comfrey (4–6x per year)."));

children.push(h2("Year 3: Fill In"));
children.push(bullet("Year 3 is the first “the yard looks right” year. Trees are 6–8 ft, beds are layered."));
children.push(bullet("Plant vines on east wall. Add herb spiral near kitchen door. Install bird and bat boxes."));
children.push(bullet("First fruit harvests — figs, jujube, possibly peach, some berries."));
children.push(bullet("Install Laundry-to-Landscape greywater. Plumb to the fruit-tree band."));

children.push(h2("Years 4–6: Productive Plateau, Lawn in Its Prime"));
children.push(bullet("Trees producing meaningfully. Annual rhythm: prune in dormancy (Dec–Jan), mulch in spring, harvest peach→plum→apricot→apple→pear→persimmon→citrus through the season."));
children.push(bullet("Kids are 8–11. The lawn is fully grown in and used daily."));
children.push(bullet("Add small specialty plants: dwarf blueberry collection, espalier trained second year, ornamental edibles."));
children.push(bullet("Optional: 4–6 backyard hens (Lafayette permits hens — no roosters — with setback rules; confirm)."));

children.push(h2("Years 7–10: Garden Phase Begins (Lawn Shrinks)"));
children.push(bullet("Kids are 11–14. They're playing more elsewhere; reclaim 30–50% of the lawn footprint for raised vegetable beds and a kitchen garden."));
children.push(bullet("Annual rotation: brassicas → nightshades → legumes → alliums + cover crops between. Cardoon, artichoke, and rhubarb as the perennial vegetable bones."));
children.push(bullet("Trees are 12–18 ft and starting to canopy. Add shade-tolerant understory: alpine strawberry, sweet woodruff, currants moved into part-shade if not already there."));
children.push(bullet("Optional: small beehive (a single Langstroth or top-bar in a back corner). Lafayette is bee-friendly. Yields ~30–60 lb honey/yr + transforms pollination."));

children.push(h2("Years 11–15: Food Forest Maturity"));
children.push(bullet("Canopy 18–25 ft. Most of the yard is in dappled shade in the morning and afternoon."));
children.push(bullet("Lawn footprint reduced to a small “rest” area or eliminated entirely — replaced with native sedges or ground-cover food."));
children.push(bullet("Mushroom logs in the shaded back corner (shiitake on oak rounds; takes ~12–18 months to fruit)."));
children.push(bullet("Inputs are nearly zero: chop-and-drop covers fertility, drip + greywater + cistern cover water, deer fence and gopher baskets handle pests, mulch suppresses weeds."));
children.push(bullet("Output: realistically 200–400 lb of fruit/yr plus eggs, honey, herbs, vegetables, and cut flowers from a 2,400 sq ft yard."));

children.push(callout(
  "What \"low maintenance\" actually looks like (yr 5+)",
  [
    "Winter (Dec–Feb): 6–8 hours total of dormant pruning across all fruit trees. Order any replacement plants.",
    "Spring (Mar–May): mulch refresh (one weekend), set up irrigation controller for the season, sow annual veg.",
    "Summer (Jun–Sep): pick fruit. Check drip emitters once a month. Pull the small handful of weeds that punch through mulch.",
    "Fall (Oct–Nov): final harvests, compost top-dress, sow cover crops in any open beds, drain rainwater cistern lines before first freeze night.",
    "Year-round: chop-and-drop comfrey on a 6–8 week cycle; that's it.",
  ]
));

// Budget
children.push(h1("Budget Bands (Year 1)"));
children.push(p("Indicative for a hybrid-leveling approach in Lafayette, 2026 prices. Get real bids; sites vary."));

children.push(table(
  ["Line item", "Low", "Likely", "High"],
  [
    ["Design (LA or design-build firm)", "$2,000", "$5,000", "$12,000"],
    ["City permits + engineering", "$1,500", "$3,500", "$7,500"],
    ["Demo, site prep, hauling", "$2,000", "$4,500", "$8,000"],
    ["Retaining walls (~80–100 ft, hybrid heights)", "$8,000", "$15,000", "$25,000"],
    ["Imported fill + structural base (~80 cu yd)", "$2,500", "$4,500", "$7,500"],
    ["Topsoil + compost cap", "$1,500", "$3,000", "$5,500"],
    ["Drainage (French drain, downspout tie-ins)", "$1,500", "$3,000", "$5,500"],
    ["Drip irrigation + smart controller", "$1,500", "$3,500", "$6,500"],
    ["Rainwater cistern (500–1,000 gal)", "$800", "$1,800", "$3,500"],
    ["8 ft deer fence (180+ linear ft)", "$2,500", "$5,000", "$9,000"],
    ["Plants (year-1 trees, shrubs, cover crops)", "$1,500", "$3,500", "$6,000"],
    ["Mulch + sheet-mulch materials", "$500", "$1,200", "$2,500"],
    ["Lawn establishment (year 2 line item, included)", "$500", "$1,500", "$3,000"],
    [bold("Year-1 total"), bold("$26,000"), bold("$55,000"), bold("$101,500")],
  ],
  [3600, 1920, 1920, 1920]
));

children.push(p([
  italic("Notes: "),
  italic("The \"high\" column reflects fully outsourced premium build (natural stone walls, large cistern, design-build firm). The \"low\" column reflects significant homeowner labor and SRW block walls. Most well-built hybrid projects land in the \"likely\" column.")
]));

children.push(h2("Years 2–15 ongoing"));
children.push(bullet("$500–1,500/yr on plants, replacements, mulch, soil amendments."));
children.push(bullet("$200–500/yr on irrigation parts, tools, organic sprays (peach leaf curl copper) until you go fully organic."));
children.push(bullet("Greywater install Year 2–3: ~$300–600 DIY, $1,500–3,000 contractor."));
children.push(bullet("Optional Year 5+ chicken setup: $800–2,500 for coop + fencing + hens."));

// Sustainability
children.push(h1("Sustainability and Low-Maintenance Principles Baked In"));
children.push(bullet([bold("Right plant, right place: "), tr("low-chill varieties for our climate; heat-lovers on the hot wall; drought-tolerant Mediterranean species throughout. No fighting the climate.")]));
children.push(bullet([bold("Build soil, don't buy fertility: "), tr("nitrogen-fixers, comfrey chop-and-drop, mycorrhizae, cover crops, mulch. Inputs trend toward zero.")]));
children.push(bullet([bold("Capture water on site: "), tr("rainwater cisterns + greywater + heavy mulch. Drip not spray. Smart controller, not timer.")]));
children.push(bullet([bold("Stack functions: "), tr("the seat wall is also a French-drain manifold and a thermal-mass heater for espalier. The lawn is also a kid play space and the future garden. Every element does ≥3 jobs.")]));
children.push(bullet([bold("Native and habitat first: "), tr("Ceanothus, toyon, elderberry, native salvias. Pollinator plants on continuous bloom (something flowering every month). Birds and beneficials run pest control for free.")]));
children.push(bullet([bold("Fire-aware: "), tr("Lafayette is in WUI. Mulch is well-watered (low fire risk); fruit trees are high-moisture (good); avoid rosemary/juniper masses against the house; keep 5 ft \"ember zone\" of irrigated low groundcover or hardscape around the structure.")]));
children.push(bullet([bold("Designed for the kids' arc: "), tr("lawn dominant Years 1–7, garden expansion Years 7–10, food forest maturity Years 10–15. The yard grows up with them.")]));

// First steps
children.push(h1("Your First 60 Days"));
children.push(num("Walk the lot with a 100 ft tape. Re-measure the actual drop from datum at the corners. The 1–3 ft estimate is fine for planning; you want ±3 in for design."));
children.push(num("Get the soil test in the mail this week."));
children.push(num("Call Lafayette Building Department: ask about retaining wall permit thresholds, hillside overlay, and setback rules for your address."));
children.push(num("Get 3 landscape architect or design-build bids. Ask each one explicitly: “How do you design wall footings for expansive clay?” Their answer tells you who actually knows the East Bay."));
children.push(num("Order bare-root fruit trees from Dave Wilson Nursery's January catalog (via Devil Mountain, Orchard Nursery, or other Bay Area retailers). Reserve your varieties — popular low-chill cultivars sell out by November."));
children.push(num("Join the California Rare Fruit Growers, Diablo Valley chapter — the local knowledge there is irreplaceable and the variety swaps are gold."));

// Appendix
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h1("Appendix"));

children.push(h2("Key references and resources"));
children.push(bullet("UC Master Gardeners of Contra Costa County — free help line and clinics, climate-specific."));
children.push(bullet("Dave Wilson Nursery — backyard orchard culture guides; their pruning videos are the standard."));
children.push(bullet("California Rare Fruit Growers (CRFG) — variety-level expertise; Diablo Valley chapter is local."));
children.push(bullet("Lafayette Building Department — permits, hillside overlay, defensible space."));
children.push(bullet("EBMUD (East Bay Municipal Utility District) — plant lists, rebates on rainwater + greywater + smart controllers."));
children.push(bullet("StopWaste.org — sheet mulch how-to, free mulch programs in Alameda/Contra Costa Counties."));

children.push(h2("A short list of things to actively avoid"));
children.push(bullet("Rototilling the clay deep — destroys structure, creates hardpan."));
children.push(bullet("Planting fruit trees in deep imported fill on top of compacted clay — perched water table kills roots."));
children.push(bullet("Lawn-only watering schedule applied to trees — trees need deep, infrequent soak, not daily."));
children.push(bullet("High-chill apple, cherry, and peach varieties — they'll set poorly and frustrate you."));
children.push(bullet("Wisteria, English ivy, periwinkle, fennel, broom, mint without containment, running bamboo — invasive in this climate."));
children.push(bullet("Railroad ties or pressure-treated lumber within 5 ft of edible plantings."));
children.push(bullet("Skipping the deer fence “to see if it's needed.” It is."));
children.push(bullet("Skipping gopher baskets on fruit trees. They are needed."));

children.push(h2("Open questions worth asking your designer"));
children.push(bullet("Where exactly does roof and surface water exit the site today? The plan should capture and direct, not just retain."));
children.push(bullet("Are there existing sewer or utility easements through the lot that constrain wall placement or deep digging?"));
children.push(bullet("What's the seismic design category for your specific address? It affects wall reinforcement."));
children.push(bullet("Is there a hillside ordinance or tree-protection ordinance affecting any existing trees on or adjacent to the site?"));

// ---------- Build document ----------
const doc = new Document({
  creator: "Claude (Cowork)",
  title: "From Compacted Clay to Food Forest — 15-Year Plan",
  description: "A 15-year plan for transforming a 40x60 ft Lafayette CA lot from compacted clay into a productive food forest, starting with a kids' lawn surrounded by fruit trees.",
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22 } },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Calibri", color: ACCENT },
        paragraph: {
          spacing: { before: 360, after: 180 },
          outlineLevel: 0,
          border: { bottom: { color: ACCENT, space: 4, style: BorderStyle.SINGLE, size: 12 } },
        },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Calibri", color: ACCENT_WARM },
        paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Calibri", color: "333333" },
        paragraph: { spacing: { before: 160, after: 60 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
        ],
      },
      {
        reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        ],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({
            text: "Lafayette Food Forest — 15-Year Plan",
            size: 18, color: GREY, italics: true,
          })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 18, color: GREY }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GREY }),
            new TextRun({ text: " of ", size: 18, color: GREY }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GREY }),
          ],
        })],
      }),
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(process.argv[2], buf);
  console.log("Wrote " + process.argv[2] + " (" + buf.length + " bytes)");
});
