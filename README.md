# Rockhound

**Beta 1.5.7 — final UI polish**

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

Three optional consumables give completed players meaningful ways to spend money on exceptional-specimen hunts. They are bought in the **Shop** and armed from the **Mine** for the next fresh rock face. The player can switch depths or generate another fresh face without spending them. Armed supplies are only consumed when the first rock tile on a prepared face is mined.

- **Prospector's Kit — $40.00:** raises that prepared face's exceptional chance from 5% to 50%.
- **Master Prospector's Kit — $100.00:** raises that prepared face's exceptional chance from 5% to 80%.
- **Collector's Focus — $40.00:** choose an eligible material before preparing the face; if an exceptional specimen spawns and that material is present, the target receives a 60% weighting.

Only one kit tier can be armed at a time. Either kit can stack with Collector's Focus. Exceptional specimens can still appear naturally without supplies, and at most one exceptional specimen appears on a face. Survey Chalk was retired in Beta 1.5.6; unused Chalk from older saves is automatically refunded at full price.

## Ending and achievements

The museum ending still grants the permanent Completion Plaque and effectively unbreakable Gilded Steel Pickaxe. Continued mining is optional: the game is finished when the museum is finished.

Rockhound contains **50 achievements**. Unobtained achievements remain secret until they are earned. **TRUE ROCKHOUND** marks museum completion, while **ROCKAHOLIC** is the full completionist challenge and requires every other achievement plus all permanent upgrades and core discoveries. The Personal Collection itself has no completion checklist.



## Beta 1.5.7 changes

- Remembers each tab's scroll position during play, so returning to a long Museum or other panel restores the place you left.
- Adds direct **Inspect** access to exceptional specimens already placed in the Display Case; specimens no longer need to be returned to Storage first.
- Reworks the Achievements shelf into a denser two-column badge layout with no oversized routine cards or awkward gaps.
- Makes every unobtained achievement secret by showing only **???** for its name and description until it is earned.
- Reserves the full-width treatment for **TRUE ROCKHOUND** and **ROCKAHOLIC** only.
- Gives achievement icons a compact medal-style badge treatment while keeping the existing simple emoji symbols readable.
- Preserves the existing `rockhound-lab-1.3` save key and prior beta progress.

## Beta 1.5.6 changes

- Corrects the completion reward copy to say the Personal Collection has **21 display spaces**.
- Rewrites Native Gold's bonus fact so it no longer clashes with the Gilded Steel Pickaxe reward.
- Makes undiscovered fossils and historical artifacts genuine mystery entries: names and artwork stay hidden until first discovery, while compact depth-number search hints remain visible.
- Removes the redundant single-stage "Fossil specimen" and "Historical artifact" labels from museum cards.
- Replaces the generic "Exceptional [material]" subtitle in the Display Case with a short geology/mineralogy explanation of what makes each specimen unusual.
- Retires **Survey Chalk** and automatically refunds unused Chalk from older saves at full purchase price.
- Raises the regular **Prospector's Kit** exceptional chance from 30% to **50%**.
- Adds the **Master Prospector's Kit** for $100.00 with an **80%** exceptional chance. Only one kit tier can be armed at a time; either can stack with Collector's Focus.
- Updates the **Going Prepared** achievement to require a kit plus Collector's Focus on the same face.
- Preserves the existing `rockhound-lab-1.3` save key and prior beta progress.


## Beta 1.5.5 changes

- Fixes the Field Scanner failing after a target tile is tapped.
- Restores the simple delegated click/tap targeting path; the earlier touch-specific workarounds were not the root cause.
- Adds the missing scanner-analysis helpers for signal strength and deposit-pattern descriptions, which were causing the scan to throw before it could finish.
- Keeps the existing `rockhound-lab-1.3` save key and all Beta 1.5.1 museum, UV, display-case, and sprite changes.


## Beta 1.5.4 changes

- Fixes scanner targeting on iPhone/iPad and WebKit-based in-app browsers by committing a scan on the initial touch/pointer press rather than waiting for a later pointer-up or synthesized click.
- Adds a `touchstart` fallback for WebKit environments where Pointer Events are incomplete.
- Suppresses the follow-up synthetic click so scanning cannot accidentally mine the selected tile.
- Keeps mouse and keyboard scanner targeting unchanged.
- Prevents scan-target tiles from shrinking under the finger while the scanner is armed.

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
