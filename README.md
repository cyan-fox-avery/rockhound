# Rockhound

**Beta 1.5.2 — scanner touch fix**

> rock go crunch.

Rockhound is a finite, collection-focused incremental mining game for the browser. Mine a fixed 10×10 rock face, follow geological hints, use prospecting tools, process finds at the Workbench, fill a museum, improve your equipment, and work through six distinct mine depths.

## Core game

The main loop is **dig → discover → process, donate, or sell → improve the museum and equipment → go deeper → find stranger rocks**. Common specimens stay useful, deeper does not automatically mean better, and the collection is built around real mineral relationships instead of generic rarity tiers.

The full game contains **44 core subjects** across six depths and four museum wings: 24 minerals/gems/mineraloids, 8 ore/metal subjects, 6 fossils, and 6 historical artifacts. Completing the museum is the real ending. Nothing resets and nothing is taken away.

## Postgame: Personal Collection

Museum completion unlocks the **Personal Collection** tab and expands the existing mining loop rather than replacing it.

- **Exceptional Specimens** can begin appearing on postgame rock faces. They are curated named variants of familiar materials, chosen to show that every mineral can be interesting for different geological reasons.
- **Specimen Storage** is effectively unlimited. Exceptional finds can be kept indefinitely even when they are not on display.
- The **Display Case** has 21 freeform spaces, shown three across on mobile. Displayed specimens are protected from selling.
- Exceptional specimens may also be sold individually for ordinary game money. There is no variant checklist or completion percentage.

## Postgame prospecting supplies

Three optional consumables give completed players something meaningful to spend money on. They are bought in the **Shop** and armed from the **Mine** for the next fresh rock face. The player can switch depths or generate another fresh face without spending them. Armed supplies are only consumed when the first rock tile on a prepared face is mined.

- **Prospector's Kit — $40.00:** raises that prepared face's exceptional chance from 5% to 30%.
- **Survey Chalk — $20.00:** once the face is committed by the first dig, reports whether an exceptional specimen is present and marks a vague 3×3 promising zone if one exists.
- **Collector's Focus — $40.00:** choose an eligible material before preparing the face; if an exceptional specimen spawns and that material is present, the target receives a 60% weighting.

All three can be armed together. Exceptional specimens can still appear naturally without any supplies, and at most one exceptional specimen appears on a face.

## Ending and achievements

The museum ending still grants the permanent Completion Plaque and effectively unbreakable Gilded Steel Pickaxe. Continued mining is optional: the game is finished when the museum is finished.

Rockhound contains **50 achievements**. **TRUE ROCKHOUND** marks museum completion. The hidden **ROCKAHOLIC** achievement is the full completionist challenge and requires every other achievement plus all permanent upgrades and core discoveries. The Personal Collection itself has no completion checklist.


## Beta 1.5.2 changes

- Fixes scanner targeting so tapping a mine tile reliably performs the selected 3×3 scan, including on touch devices.
- Moves mine-tile input to a single board-level click handler instead of attaching fresh listeners to every tile after each redraw. Mining behavior is otherwise unchanged.
- Preserves the existing `rockhound-lab-1.3` save key and all prior progress.

## Beta 1.5.1 changes

- Keeps Museum specimen image windows compact and square-ish across one-, two-, and three-stage displays so the finished art is not awkwardly cropped.
- Reduces the Personal Collection Display Case from 30 spaces to 21 while keeping Specimen Storage unlimited. Older saves safely return any exceptional specimens from retired display slots to storage.
- Strengthens UV-reactive specimen glow and slightly darkens the surrounding museum presentation so fluorescent specimens stand out more clearly.
- Preserves the existing `rockhound-lab-1.3` save key and all prior progress.

## Beta 1.5.0 changes

- Replaces the placeholder specimen shapes with the finished Rockhound art pass.
- Adds dedicated **mini mine sprites** for every raw mineral/ore, plus shared fossil and historical-artifact mine icons.
- Adds **95 stage-specific detail sprites** across the Museum and Workbench, including special pipelines such as Rough → Cleaved → Cut Diamond, Raw Olivine → Tumbled Olivine → Cut Peridot, and Raw → Tumbled → Polished Malachite.
- Adds full-detail art for all curated **Exceptional Specimens** in Specimen Storage and the Personal Collection.
- Exceptional mine finds keep the clean mini sprite and gain a small sparkle treatment; the detailed specimen is revealed in the collection.
- Preserves the museum UV-lamp interaction with reactive glow treatments on the finished specimen art.
- Keeps the Beta 1.4.4 prospecting commitment rules unchanged: armed supplies are only spent on the first mined tile of a prepared face.
- Preserves the existing `rockhound-lab-1.3` save key and prior beta progress.

The game remains in final-polish/playtest territory. The sprite pass changes presentation, not the core progression or ending.
