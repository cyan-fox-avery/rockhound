# Rockhound

**Beta 1.2.1 — Luminous Zone hotfix**

> rock go crunch.

Rockhound is a finite, collection-focused incremental mining game for the browser. Mine a 10×10 rock face, follow geological hints, use prospecting tools, process finds at the workbench, fill a museum, and gradually automate materials you have fully mastered.

The game is designed around active discovery rather than timers or monetized friction. There is one in-game currency, processing is free, tool charges reset on a fresh rock face, and there is no premium currency, energy timer, pay-to-skip system, or real-money progression.

## Core loop

**Dig → discover → process, donate, or sell → improve the museum and equipment → go deeper → find stranger rocks.**

A common specimen can remain useful throughout the game. Deeper does not automatically mean “better,” and minerals are not arranged in a generic rarity ladder.

## Mining

Each rock face is a fixed **10×10 grid** containing isolated finds, small connected veins, occasional large veins, fossils, and historical artifacts. Subtle geological marks can suggest promising places without revealing exact targets.

Prospecting tools add information without solving the board:

- **Area Scanner:** choose a tile to survey its 3×3 neighbourhood. Scanned tiles remain marked for that face. Early scanner levels report chemistry; stronger equipment adds pattern information and eventually exact identification. Scanning an occupied tile area twice can reveal a faint generic density shadow without showing what the find is.
- **Metal Detector:** one whole-face sweep per rock face. It marks broad, intentionally vague zones that may contain metallic or conductive targets, including some historical artifacts.

Both tools use per-face charges rather than real-time recharge timers.

## Workbench

Minerals can move through forms such as **Raw → Tumbled → Cut**. Ores can be refined into their associated metals. Processing itself costs nothing, although later materials require better workshop equipment.

Completing every museum form of a processable material unlocks **auto-process for that specific material**. The global Sell All control is also mastery-gated and only sells stock from completed mineral and ore sets.

## Museum

The museum shows its empty slots in advance and gives each collected form its own geology or gemology fact. Completing a material set adds a bonus discovery and unlocks that material’s automation where applicable.

Beta 1.2 adds a **UV Fluorescence Lamp**. Once installed, the museum gains a **Normal / UV** lighting control. Most specimens remain dark under UV, while selected fluorescent materials reveal distinctive glow colours.

Current museum wings:

- Mineral Hall
- Ores & Metals
- Fossil Wing
- History Wing

## Current mine depths

### Depth 1 — Upper Seam
Quartz, amethyst, hematite, chalcopyrite, and early side finds.

### Depth 2 — Lower Works
Adds garnet, topaz, pyrite, trilobites, crinoid fragments, and broader prospecting options.

### Depth 3 — Deep Gallery
Adds citrine, calcite, fluorite, aquamarine, sapphire, cassiterite, ammonites, and deeper historical finds.

### Depth 4 — Crystal Veins
Adds rose quartz, malachite, ruby, emerald, galena, sphalerite, brachiopods, and additional mining artifacts.

### Depth 5 — Luminous Zone
Adds scheelite and tungsten, willemite, hackmanite, apatite, opal, belemnites, and old mine-rail hardware. This depth introduces the game’s first dedicated mineral-property system: UV fluorescence.

## Beta 1.2.1 hotfix

- Fixed a visual regression that could hide revealed mineral and gemstone sprites on the mine grid after the subtle sparkle effect was added.
- No economy, content, progression, or save-format changes. Existing Beta 1.2 saves remain compatible.

## Beta 1.2 changes

- Added **Depth 5: Luminous Zone**.
- Added **Scheelite → Tungsten**, **Willemite**, **Hackmanite**, **Apatite**, and **Opal**.
- Added the **Belemnite** fossil and **Old Rail Spike** historical artifact.
- Added a new **Specialist Lapidary** workshop tier for Depth 5 materials.
- Added the **UV Fluorescence Lamp** and a museum-wide Normal / UV lighting mode.
- Added UV behaviour to selected older specimens, including fluorite, calcite, ruby, and sphalerite.
- Reworked the mine layout: every depth is visible in a dedicated selector, the complete “Found this face” list stays visible, and the scanner and metal detector are compact side-by-side controls under the rock face.
- Moved scanner and detector explanations into the Upgrades screen.
- Simplified completed upgrade states to **MAX** or **MAX (more coming soon... 👀)**.
- Added occasional subtle glints to gemstone/mineral art.
- Retained the compact trophy-shelf achievement layout and added **Glow Up** and **The Glow Show** for the new UV system.

## Status

Rockhound is still in beta. The mine, museum, workbench, upgrades, prospecting systems, achievements, and save migration are functional, while later depths, final-game completion, the Personal Collection, exceptional specimens, geodes, and the Gilded Steel Pickaxe remain future content.
