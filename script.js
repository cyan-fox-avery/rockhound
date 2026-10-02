(() => {
  'use strict';


  const SAVE_KEY = 'rockhound-lab-1.3';
  const GRID_SIZE = 10;


  const MATERIALS = {
    quartz: {
      name:'Quartz', subtitle:'Silicon dioxide · SiO₂', family:'mineral', wing:'minerals', iconClass:'gem quartz',
      signature:{id:'silicon-dioxide',label:'Silicon dioxide',formula:'SiO₂'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:4,tumbled:7,cut:12},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'},
      facts:{
        raw:'Quartz commonly forms six-sided crystals and is one of Earth’s most abundant minerals.',
        tumbled:'Tumbling rounds rough edges through repeated abrasion with grit and water.',
        cut:'Clear quartz can be faceted even though it is much softer than diamond.'
      },
      mastery:{fact:'Quartz is piezoelectric: squeezing or vibrating it can create an electrical charge, which is why quartz is useful in clocks, watches, and electronics.'}
    },
    amethyst: {
      name:'Amethyst', subtitle:'Purple quartz · SiO₂', family:'mineral', wing:'minerals', iconClass:'gem amethyst',
      signature:{id:'silicon-dioxide',label:'Silicon dioxide',formula:'SiO₂'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:8,tumbled:14,cut:24},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'},
      facts:{
        raw:'Amethyst is a purple variety of quartz. Its colour is linked to trace iron and natural irradiation.',
        tumbled:'Polishing can make amethyst’s colour zoning and internal patterns easier to see.',
        cut:'Amethyst is commonly faceted to emphasize colour and brilliance.'
      },
      mastery:{fact:'Heating can change amethyst’s colour. Some commercial citrine is produced by carefully heat-treating amethyst.'}
    },
    garnet: {
      name:'Garnet', subtitle:'A family of silicate minerals', family:'mineral', wing:'minerals', iconClass:'gem garnet',
      signature:{id:'garnet-silicate',label:'Silicate-group chemistry',formula:'variable'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:14,tumbled:26,cut:46},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:1,
      facts:{
        raw:'Garnet is not one single mineral but a group of related minerals with similar crystal structures.',
        tumbled:'Garnets occur in several colours; deep red is familiar, but green, orange, and other varieties exist.',
        cut:'Gem-quality garnet can be faceted, while more opaque material is often polished instead.'
      },
      mastery:{fact:'Garnet is useful outside jewellery too. Its hardness makes crushed garnet a practical industrial abrasive, including in some waterjet-cutting systems.'}
    },
    topaz: {
      name:'Topaz', subtitle:'Aluminium fluorosilicate', family:'mineral', wing:'minerals', iconClass:'gem topaz',
      signature:{id:'topaz-chemistry',label:'Aluminium fluorosilicate',formula:'Al₂SiO₄(F,OH)₂'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:18,tumbled:34,cut:60},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:1,
      facts:{
        raw:'Topaz can occur in several colours. Natural crystals are often colourless, pale, or lightly coloured.',
        tumbled:'Topaz is hard but has perfect cleavage, so careless blows can split a crystal along flat planes.',
        cut:'Cutters orient topaz carefully because its cleavage affects how safely a stone can be shaped.'
      },
      mastery:{fact:'Much of the bright blue topaz sold in jewellery starts as pale or colourless topaz and is treated with irradiation and heat to create stable blue colour.'}
    },
    pyrite: {
      name:'Pyrite', subtitle:'Iron sulfide · FeS₂', family:'mineral', wing:'minerals', iconClass:'gem pyrite',
      signature:{id:'iron-sulfide',label:'Iron sulfide',formula:'FeS₂'},
      stages:['raw'], stageLabels:{raw:'Natural specimen'}, prices:{raw:11}, process:{},
      facts:{raw:'Pyrite is an iron sulfide mineral famous for its metallic lustre and nickname: fool’s gold.'},
      mastery:{fact:'Pyrite commonly forms cubes, pyritohedra, and other sharply geometric crystals. Its metallic shine can be spectacular even when no gold is present.'}
    },
    citrine: {
      name:'Citrine', subtitle:'Yellow to orange quartz · SiO₂', family:'mineral', wing:'minerals', iconClass:'gem citrine',
      signature:{id:'silicon-dioxide',label:'Silicon dioxide',formula:'SiO₂'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:20,tumbled:36,cut:64},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:1,
      facts:{
        raw:'Citrine is a yellow to orange variety of quartz. Natural citrine is much less common than amethyst.',
        tumbled:'Polishing reveals citrine’s warm colour while keeping the quartz hardness that makes it practical for jewellery.',
        cut:'Faceting can make transparent citrine bright and lively, especially in larger stones.'
      },
      mastery:{fact:'Citrine, amethyst, and colourless quartz are all the same mineral species: quartz. Their different colours come from impurities, defects, and treatment histories.'}
    },
    calcite: {
      name:'Calcite', subtitle:'Calcium carbonate · CaCO₃', family:'mineral', wing:'minerals', iconClass:'gem calcite',
      signature:{id:'calcium-carbonate',label:'Calcium carbonate',formula:'CaCO₃'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:10,tumbled:18,cut:30},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:1,
      facts:{
        raw:'Calcite is a major mineral in limestone and marble and is one of the most common carbonate minerals.',
        tumbled:'Calcite is quite soft, so polished pieces can scratch more easily than quartz.',
        cut:'Transparent calcite can be cut, but its perfect cleavage makes it much trickier to facet than tougher gemstones.'
      },
      mastery:{fact:'Some clear calcite shows strong double refraction: viewed through the crystal, a single line can appear doubled.'}
    },
    fluorite: {
      name:'Fluorite', subtitle:'Calcium fluoride · CaF₂', family:'mineral', wing:'minerals', iconClass:'gem fluorite',
      signature:{id:'calcium-fluoride',label:'Calcium fluoride',formula:'CaF₂'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:16,tumbled:30,cut:54},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:1,
      facts:{
        raw:'Fluorite often forms cubic crystals and occurs in a remarkable range of colours.',
        tumbled:'Fluorite can take a beautiful polish, but it is softer than quartz and needs gentler handling.',
        cut:'Gem fluorite can be faceted, though its softness and cleavage make it better suited to careful use than everyday rings.'
      },
      mastery:{fact:'The word fluorescence comes from fluorite. Some specimens glow vividly under ultraviolet light, although not every fluorite specimen fluoresces.'}
    },
    aquamarine: {
      name:'Aquamarine', subtitle:'Blue-green beryl · Be₃Al₂Si₆O₁₈', family:'mineral', wing:'minerals', iconClass:'gem aquamarine',
      signature:{id:'beryl',label:'Beryllium aluminium silicate',formula:'Be₃Al₂Si₆O₁₈'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:28,tumbled:52,cut:94},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:2,
      facts:{
        raw:'Aquamarine is the blue to blue-green variety of beryl, the same mineral family that includes emerald.',
        tumbled:'Aquamarine is hard enough for durable jewellery, though inclusions and fractures still affect how a piece should be handled.',
        cut:'Aquamarine is often cut to emphasize transparency and cool blue colour rather than maximum rainbow fire.'
      },
      mastery:{fact:'Aquamarine and emerald are both beryl. Small amounts of different trace elements are responsible for their very different colours.'}
    },
    sapphire: {
      name:'Sapphire', subtitle:'Corundum · Al₂O₃', family:'mineral', wing:'minerals', iconClass:'gem sapphire',
      signature:{id:'corundum',label:'Aluminium oxide',formula:'Al₂O₃'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:38,tumbled:72,cut:135},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:2,
      facts:{
        raw:'Sapphire is gem-quality corundum. Blue is famous, but sapphires can occur in many colours.',
        tumbled:'Corundum is very hard, ranking 9 on the Mohs scale, second only to diamond among common reference minerals.',
        cut:'Cut orientation matters because sapphire colour can look different along different crystal directions.'
      },
      mastery:{fact:'Ruby and sapphire are the same mineral species: corundum. Red gem corundum is called ruby; most other gem colours are called sapphire.'}
    },


    roseQuartz: {
      name:'Rose Quartz', subtitle:'Pink quartz · SiO₂', family:'mineral', wing:'minerals', iconClass:'gem rose-quartz',
      signature:{id:'silicon-dioxide',label:'Silicon dioxide',formula:'SiO₂'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:22,tumbled:40,cut:72},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:2,
      facts:{
        raw:'Rose quartz is a pink variety of quartz. Its colour is linked to microscopic inclusions and structural features rather than one simple impurity.',
        tumbled:'Rose quartz is commonly polished into smooth stones and carvings because much of it is translucent rather than fully transparent.',
        cut:'Transparent rose quartz is uncommon, but suitable material can be faceted into soft pink gems.'
      },
      mastery:{fact:'Quartz, amethyst, citrine, and rose quartz all share the same basic chemistry: SiO₂. Their different colours come from very different microscopic causes.'}
    },
    malachite: {
      name:'Malachite', subtitle:'Copper carbonate hydroxide', family:'mineral', wing:'minerals', iconClass:'gem malachite',
      signature:{id:'copper-carbonate',label:'Copper carbonate hydroxide',formula:'Cu₂CO₃(OH)₂'},
      stages:['raw','tumbled','polished'], stageLabels:{raw:'Raw',tumbled:'Tumbled',polished:'Polished'}, prices:{raw:24,tumbled:44,polished:78},
      process:{raw:'tumbled',tumbled:'polished'}, processLabels:{raw:'Tumble 1',tumbled:'Polish 1'}, workshopRequired:2,
      facts:{
        raw:'Malachite is a vivid green copper mineral that commonly forms in the weathered zones of copper deposits.',
        tumbled:'Its banding can become especially striking when malachite is polished into rounded stones.',
        polished:'Malachite is relatively soft, so it is more often polished or carved than faceted like a hard transparent gemstone.'
      },
      mastery:{fact:'Malachite has been used as a pigment as well as an ornamental stone. Finely ground malachite once supplied a brilliant green colour for paint.'}
    },
    ruby: {
      name:'Ruby', subtitle:'Red corundum · Al₂O₃', family:'mineral', wing:'minerals', iconClass:'gem ruby',
      signature:{id:'corundum',label:'Aluminium oxide',formula:'Al₂O₃'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:70,tumbled:130,cut:250},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:3,
      facts:{
        raw:'Ruby is red gem-quality corundum. Chromium is the main element responsible for its red colour.',
        tumbled:'Corundum is extremely hard, so ruby takes a durable polish and resists scratching better than most gemstones.',
        cut:'Fine ruby is cut to balance colour, brightness, and weight, especially because richly coloured material can be valuable even in small sizes.'
      },
      mastery:{fact:'Ruby and sapphire are the same mineral species: corundum. The name ruby is reserved for red gem corundum; other gem colours are generally called sapphire.'}
    },
    emerald: {
      name:'Emerald', subtitle:'Green beryl · Be₃Al₂Si₆O₁₈', family:'mineral', wing:'minerals', iconClass:'gem emerald',
      signature:{id:'beryl',label:'Beryllium aluminium silicate',formula:'Be₃Al₂Si₆O₁₈'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:80,tumbled:145,cut:280},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:3,
      facts:{
        raw:'Emerald is the green variety of beryl. Chromium and sometimes vanadium are responsible for its colour.',
        tumbled:'Emeralds often contain visible inclusions and fractures, so even polished material must be handled with more care than its hardness alone suggests.',
        cut:'The classic emerald cut was developed in part to protect vulnerable corners while showing off colour and clarity.'
      },
      mastery:{fact:'Emerald and aquamarine are both beryl. Their dramatically different colours come from different trace elements inside the same crystal structure.'}
    },


    hematite: {
      name:'Hematite', subtitle:'Iron ore → Iron', family:'ore', wing:'ores', iconClass:'ore hematite', metalDetectable:true,
      signature:{id:'iron-oxide',label:'Iron oxide',formula:'Fe₂O₃'},
      stages:['ore','refined'], stageLabels:{ore:'Hematite ore',refined:'Iron'}, prices:{ore:6,refined:12},
      process:{ore:'refined'}, processLabels:{ore:'Refine to iron'},
      facts:{
        ore:'Hematite is iron oxide and one of the world’s most important ores of iron.',
        refined:'Iron extracted from ore became one of the most important metals in tools, structures, and machines.'
      },
      mastery:{fact:'Hematite can look metallic grey, earthy red, or almost black, but its powdered streak is characteristically reddish brown.'}
    },
    chalcopyrite: {
      name:'Chalcopyrite', subtitle:'Copper ore → Copper', family:'ore', wing:'ores', iconClass:'ore chalcopyrite', metalDetectable:true,
      signature:{id:'copper-iron-sulfide',label:'Copper iron sulfide',formula:'CuFeS₂'},
      stages:['ore','refined'], stageLabels:{ore:'Chalcopyrite ore',refined:'Copper'}, prices:{ore:7,refined:15},
      process:{ore:'refined'}, processLabels:{ore:'Refine to copper'},
      facts:{
        ore:'Chalcopyrite is a copper iron sulfide and one of the most widespread copper-bearing minerals.',
        refined:'Copper is valued for conductivity, corrosion resistance, and its ability to be worked into useful shapes.'
      },
      mastery:{fact:'Fresh chalcopyrite is brassy yellow, but weathering can produce colourful iridescent tarnish that is sometimes mistaken for bornite.'}
    },
    cassiterite: {
      name:'Cassiterite', subtitle:'Tin ore → Tin', family:'ore', wing:'ores', iconClass:'ore cassiterite', metalDetectable:true,
      signature:{id:'tin-oxide',label:'Tin oxide',formula:'SnO₂'},
      stages:['ore','refined'], stageLabels:{ore:'Cassiterite ore',refined:'Tin'}, prices:{ore:22,refined:50},
      process:{ore:'refined'}, processLabels:{ore:'Refine to tin'}, workshopRequired:1,
      facts:{
        ore:'Cassiterite is tin oxide and the principal ore from which most tin is obtained.',
        refined:'Tin is a soft, corrosion-resistant metal used in solder, coatings, and alloys such as bronze.'
      },
      mastery:{fact:'Tin helped transform metallurgy because copper alloyed with tin produces bronze, a material that played a major role in many ancient technologies.'}
    },


    galena: {
      name:'Galena', subtitle:'Lead ore → Lead', family:'ore', wing:'ores', iconClass:'ore galena', metalDetectable:true,
      signature:{id:'lead-sulfide',label:'Lead sulfide',formula:'PbS'},
      stages:['ore','refined'], stageLabels:{ore:'Galena ore',refined:'Lead'}, prices:{ore:32,refined:70},
      process:{ore:'refined'}, processLabels:{ore:'Refine to lead'}, workshopRequired:2,
      facts:{
        ore:'Galena is lead sulfide and the most important ore of lead. It often forms bright metallic cubic crystals.',
        refined:'Lead is dense, soft, and easy to shape, but it is also toxic and must be handled carefully in real life.'
      },
      mastery:{fact:'Galena can contain small amounts of silver, so some lead deposits have also been important sources of silver.'}
    },
    sphalerite: {
      name:'Sphalerite', subtitle:'Zinc ore → Zinc', family:'ore', wing:'ores', iconClass:'ore sphalerite', metalDetectable:true,
      signature:{id:'zinc-sulfide',label:'Zinc sulfide',formula:'ZnS'},
      stages:['ore','refined'], stageLabels:{ore:'Sphalerite ore',refined:'Zinc'}, prices:{ore:36,refined:80},
      process:{ore:'refined'}, processLabels:{ore:'Refine to zinc'}, workshopRequired:2,
      facts:{
        ore:'Sphalerite is zinc sulfide and the most important ore of zinc. Its colour ranges from pale yellow-brown to nearly black.',
        refined:'Zinc is widely used to protect steel from corrosion through galvanizing and is also an ingredient in brass.'
      },
      mastery:{fact:'Some sphalerite can glow under ultraviolet light, and certain specimens show especially bright fluorescence.'}
    },


    scheelite: {
      name:'Scheelite', subtitle:'Tungsten ore → Tungsten', family:'ore', wing:'ores', iconClass:'ore scheelite',
      signature:{id:'calcium-tungstate',label:'Calcium tungstate',formula:'CaWO₄'},
      stages:['ore','refined'], stageLabels:{ore:'Scheelite ore',refined:'Tungsten'}, prices:{ore:58,refined:128},
      process:{ore:'refined'}, processLabels:{ore:'Refine to tungsten'}, workshopRequired:4,
      facts:{
        ore:'Scheelite is calcium tungstate and an important ore of tungsten. Many specimens fluoresce blue-white under shortwave ultraviolet light.',
        refined:'Tungsten has the highest melting point of any pure metal and is valued where heat resistance and hardness matter.'
      },
      mastery:{fact:'Scheelite fluorescence comes from its tungstate groups. Small chemical substitutions can shift the colour and brightness of the glow.'}
    },
    willemite: {
      name:'Willemite', subtitle:'Zinc silicate · Zn₂SiO₄', family:'mineral', wing:'minerals', iconClass:'gem willemite',
      signature:{id:'zinc-silicate',label:'Zinc silicate',formula:'Zn₂SiO₄'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:54,tumbled:100,cut:188},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:4,
      facts:{
        raw:'Willemite is a zinc silicate mineral. Manganese-bearing specimens can produce an intensely bright green fluorescence under ultraviolet light.',
        tumbled:'Polishing can reveal willemite’s glassy lustre while preserving the chemistry responsible for fluorescence.',
        cut:'Transparent willemite is uncommon, but suitable crystals can be faceted into distinctive collector stones.'
      },
      mastery:{fact:'Willemite became famous among fluorescent-mineral collectors because some specimens glow a striking neon green under shortwave UV.'}
    },
    hackmanite: {
      name:'Hackmanite', subtitle:'Tenebrescent sodalite variety', family:'mineral', wing:'minerals', iconClass:'gem hackmanite',
      signature:{id:'sodalite-group',label:'Sodalite-group aluminosilicate',formula:'variable'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:62,tumbled:116,cut:220},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:4,
      facts:{
        raw:'Hackmanite is a sulfur-bearing variety of sodalite famous for tenebrescence: ultraviolet light can temporarily deepen or change its colour.',
        tumbled:'A polished surface makes hackmanite’s reversible colour change easier to see, though the strength varies from specimen to specimen.',
        cut:'Transparent hackmanite can be faceted, but collectors often prize its light-sensitive colour behaviour as much as its appearance.'
      },
      mastery:{fact:'Tenebrescence is reversible photochromism. A hackmanite specimen can change colour after UV exposure and gradually fade back in ordinary light.'}
    },
    apatite: {
      name:'Apatite', subtitle:'Calcium phosphate mineral group', family:'mineral', wing:'minerals', iconClass:'gem apatite',
      signature:{id:'apatite-group',label:'Calcium phosphate',formula:'Ca₅(PO₄)₃(F,Cl,OH)'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:48,tumbled:88,cut:168},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:4,
      facts:{
        raw:'Apatite is a group of phosphate minerals that can occur in many colours. It defines hardness 5 on the Mohs scale.',
        tumbled:'Apatite can take a bright polish, but its moderate hardness means polished pieces can scratch more easily than quartz.',
        cut:'Transparent apatite can be faceted into vivid gems, though it is usually better suited to careful wear than everyday rings.'
      },
      mastery:{fact:'The name apatite comes from a Greek word meaning “to deceive,” because its crystals can resemble several other minerals.'}
    },
    opal: {
      name:'Opal', subtitle:'Hydrated silica mineraloid', family:'mineral', wing:'minerals', iconClass:'gem opal',
      signature:{id:'hydrated-silica',label:'Hydrated amorphous silica',formula:'SiO₂·nH₂O'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:68,tumbled:126,cut:242},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:4,
      facts:{
        raw:'Opal is a mineraloid rather than a true mineral because it lacks a regular crystal structure. It contains variable amounts of water.',
        tumbled:'Some opal shows play-of-colour caused by light interacting with an orderly arrangement of microscopic silica spheres.',
        cut:'Opal is usually cut as a cabochon rather than faceted so its colour effects can be viewed across a broad curved surface.'
      },
      mastery:{fact:'Not every opal shows play-of-colour. Common opal can still be beautiful even when it lacks the shifting spectral flashes associated with precious opal.'}
    },




    diamond: {
      name:'Diamond', subtitle:'Carbon · C', family:'mineral', wing:'minerals', iconClass:'gem diamond',
      signature:{id:'native-carbon',label:'Native carbon',formula:'C'},
      stages:['rough','cleaved','cut'], stageLabels:{rough:'Rough',cleaved:'Cleaved',cut:'Cut'}, prices:{rough:125,cleaved:235,cut:440},
      process:{rough:'cleaved',cleaved:'cut'}, processLabels:{rough:'Cleave 1',cleaved:'Cut 1'}, workshopRequired:5,
      facts:{
        rough:'Diamond is crystalline carbon formed under very high pressures deep in Earth. It reaches the surface only through unusual geologic transport.',
        cleaved:'Diamond is extremely hard, but hardness is not the same as toughness. Its perfect cleavage means a well-placed blow can split it.',
        cut:'A diamond\'s cut controls how light travels through the stone. Brilliant faceting is an optical design, not a natural crystal shape.'
      },
      mastery:{fact:'Diamonds form far deeper than an epithermal system. In this fictional composite mine, ancient volcanic material has carried mantle-derived crystals upward into rocks later overprinted by hydrothermal activity.'}
    },
    obsidian: {
      name:'Obsidian', subtitle:'Volcanic glass', family:'mineral', wing:'minerals', iconClass:'gem obsidian',
      signature:{id:'volcanic-glass',label:'Silica-rich volcanic glass',formula:'variable'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:44,tumbled:82,cut:150},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:4,
      facts:{
        raw:'Obsidian is volcanic glass, not a true mineral. It forms when silica-rich lava cools too quickly for an ordered crystal structure to grow.',
        tumbled:'Fresh obsidian breaks with conchoidal fracture, producing smooth curved surfaces and exceptionally sharp edges.',
        cut:'Obsidian is usually polished or shaped as a decorative stone rather than faceted for brilliance.'
      },
      mastery:{fact:'Because obsidian lacks a regular crystal lattice, geologists classify it as a natural glass rather than a mineral species.'}
    },
    olivine: {
      name:'Olivine / Peridot', subtitle:'Magnesium-iron silicate', family:'mineral', wing:'minerals', iconClass:'gem olivine',
      signature:{id:'olivine-group',label:'Magnesium-iron silicate',formula:'(Mg,Fe)₂SiO₄'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw Olivine',tumbled:'Tumbled Olivine',cut:'Cut Peridot'}, prices:{raw:72,tumbled:132,cut:248},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut as peridot'}, workshopRequired:5,
      facts:{
        raw:'Olivine is a group of green magnesium-iron silicate minerals common in Earth\'s mantle and in many mafic volcanic rocks.',
        tumbled:'Olivine-rich rocks can weather quickly at Earth\'s surface, but fresh grains may keep a vivid yellow-green colour.',
        cut:'Gem-quality olivine is called peridot. The gemstone and the common rock-forming mineral are the same mineral family.'
      },
      mastery:{fact:'Peridot is one of the few gemstones whose characteristic colour comes from an element essential to its chemistry: iron, rather than a trace impurity.'}
    },
    nativeSulfur: {
      name:'Native Sulfur', subtitle:'Elemental sulfur · S', family:'mineral', wing:'minerals', iconClass:'gem native-sulfur',
      signature:{id:'native-sulfur',label:'Elemental sulfur',formula:'S'},
      stages:['raw'], stageLabels:{raw:'Natural specimen'}, prices:{raw:76}, process:{},
      facts:{raw:'Native sulfur can form around volcanic fumaroles, hot springs, and other settings where sulfur-bearing gases or fluids react near the surface.'},
      mastery:{fact:'Sulfur is an element, not a silicate or metal ore. Its vivid yellow colour can occur naturally without pigment or polishing.'}
    },
    rhodochrosite: {
      name:'Rhodochrosite', subtitle:'Manganese carbonate · MnCO₃', family:'mineral', wing:'minerals', iconClass:'gem rhodochrosite',
      signature:{id:'manganese-carbonate',label:'Manganese carbonate',formula:'MnCO₃'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:82,tumbled:150,cut:286},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:5,
      facts:{
        raw:'Rhodochrosite is a manganese carbonate mineral known for pink to red colour and, in some deposits, striking bands.',
        tumbled:'Banded rhodochrosite can show layers produced as mineral-rich fluids changed through time.',
        cut:'Transparent crystals can be faceted, but much rhodochrosite is cut as cabochons or polished slabs to show its colour patterns.'
      },
      mastery:{fact:'Rhodochrosite commonly occurs in hydrothermal veins alongside sulfide minerals, making it an excellent fit for epithermal-style mineralization.'}
    },
    adularia: {
      name:'Adularia', subtitle:'Low-temperature potassium feldspar', family:'mineral', wing:'minerals', iconClass:'gem adularia',
      signature:{id:'potassium-feldspar',label:'Potassium feldspar',formula:'KAlSi₃O₈'},
      stages:['raw','tumbled','cut'], stageLabels:{raw:'Raw',tumbled:'Tumbled',cut:'Cut'}, prices:{raw:74,tumbled:138,cut:260},
      process:{raw:'tumbled',tumbled:'cut'}, processLabels:{raw:'Tumble 1',tumbled:'Cut 1'}, workshopRequired:5,
      facts:{
        raw:'Adularia is a low-temperature variety and growth habit of potassium feldspar that commonly forms in hydrothermal veins.',
        tumbled:'Feldspars are among the most abundant mineral groups in Earth\'s crust, but hydrothermal adularia records a very specific fluid environment.',
        cut:'Some adularia-related feldspar material can show attractive optical effects, although collector crystals are often valued in their natural form.'
      },
      mastery:{fact:'Adularia is so characteristic of some low-sulfidation epithermal systems that geologists use it as an important clue to the conditions under which a vein formed.'}
    },
    acanthite: {
      name:'Acanthite', subtitle:'Silver ore → Silver', family:'ore', wing:'ores', iconClass:'ore acanthite', metalDetectable:true,
      signature:{id:'silver-sulfide',label:'Silver sulfide',formula:'Ag₂S'},
      stages:['ore','refined'], stageLabels:{ore:'Acanthite ore',refined:'Silver'}, prices:{ore:108,refined:248},
      process:{ore:'refined'}, processLabels:{ore:'Refine to silver'}, workshopRequired:5,
      facts:{
        ore:'Acanthite is silver sulfide and an important silver mineral in many hydrothermal ore deposits.',
        refined:'Silver is an excellent electrical conductor and is used in electronics, jewellery, mirrors, and many specialized technologies.'
      },
      mastery:{fact:'Acanthite is stable at lower temperatures; at higher temperatures the same Ag₂S composition adopts a different crystal structure called argentite.'}
    },
    nativeGold: {
      name:'Native Gold', subtitle:'Elemental gold · Au', family:'ore', wing:'ores', iconClass:'ore native-gold', metalDetectable:true,
      signature:{id:'native-gold',label:'Elemental gold',formula:'Au'},
      stages:['found'], stageLabels:{found:'Native gold'}, prices:{found:315}, process:{},
      facts:{found:'Gold commonly occurs as the native metal rather than as a simple “gold ore.” Hydrothermal fluids can concentrate it in veins and fractures.'},
      mastery:{fact:'Gold is dense, very malleable, and chemically resistant. Those traits make it useful, but also make solid gold a terrible choice for a working pickaxe.'}
    },
    trilobite: {
      name:'Trilobite', subtitle:'Fossil arthropod', family:'fossil', wing:'fossils', iconClass:'round trilobite', iconText:'≋',
      signature:{id:'fossil',label:'Fossilized biological material',formula:''},
      stages:['found'], stageLabels:{found:'Fossil specimen'}, prices:{found:40}, process:{},
      facts:{found:'Trilobites were marine arthropods that lived for hundreds of millions of years and disappeared in the end-Permian mass extinction.'}
    },
    ammonite: {
      name:'Ammonite', subtitle:'Fossil marine cephalopod', family:'fossil', wing:'fossils', iconClass:'round ammonite', iconText:'◉',
      signature:{id:'fossil',label:'Fossilized biological material',formula:''},
      stages:['found'], stageLabels:{found:'Fossil specimen'}, prices:{found:85}, process:{},
      facts:{found:'Ammonites were shelled marine cephalopods related to modern squid and octopuses. Their rapidly changing forms make many species useful index fossils.'}
    },


    crinoidStem: {
      name:'Crinoid Stem', subtitle:'Fossil marine animal fragment', family:'fossil', wing:'fossils', iconClass:'round crinoid-stem', iconText:'✣',
      signature:{id:'fossil',label:'Fossilized biological material',formula:''},
      stages:['found'], stageLabels:{found:'Fossil specimen'}, prices:{found:70}, process:{},
      facts:{found:'Crinoids are marine animals related to starfish. Their stems often break into small disk-shaped pieces that fossilize readily.'}
    },
    brachiopod: {
      name:'Brachiopod', subtitle:'Fossil marine animal', family:'fossil', wing:'fossils', iconClass:'round brachiopod', iconText:'◒',
      signature:{id:'fossil',label:'Fossilized biological material',formula:''},
      stages:['found'], stageLabels:{found:'Fossil specimen'}, prices:{found:140}, process:{},
      facts:{found:'Brachiopods are marine animals with two shells. They can resemble clams, but their anatomy and evolutionary history are very different.'}
    },
belemnite: {
      name:'Belemnite', subtitle:'Fossil squid-like cephalopod', family:'fossil', wing:'fossils', iconClass:'round belemnite', iconText:'▸',
      signature:{id:'fossil',label:'Fossilized biological material',formula:''},
      stages:['found'], stageLabels:{found:'Fossil specimen'}, prices:{found:210}, process:{},
      facts:{found:'Belemnites were extinct squid-like cephalopods. Their hard internal guards often fossilize as distinctive bullet-shaped objects.'}
    },


    fernImpression: {
      name:'Fern Impression', subtitle:'Fossil plant impression', family:'fossil', wing:'fossils', iconClass:'round fern-impression', iconText:'❧',
      signature:{id:'fossil',label:'Fossilized biological material',formula:''},
      stages:['found'], stageLabels:{found:'Fossil specimen'}, prices:{found:96}, process:{},
      facts:{found:'Plant impressions can preserve the shape and venation of leaves even when little original plant material remains.'}
    },
    surveyMarker: {
      name:'Worn Survey Marker', subtitle:'Historical mine survey marker', family:'artifact', wing:'history', iconClass:'tag survey-marker', iconText:'△', metalDetectable:true,
      signature:{id:'artifact',label:'Historical object',formula:''},
      stages:['found'], stageLabels:{found:'Historical artifact'}, prices:{found:120}, process:{},
      facts:{found:'Survey markers help record measured positions underground so workings can be mapped accurately and tied back to a larger mine plan.'}
    },
    drillBit: {
      name:'Old Drill Bit', subtitle:'Historical drilling equipment', family:'artifact', wing:'history', iconClass:'tag drill-bit', iconText:'⇣', metalDetectable:true,
      signature:{id:'artifact',label:'Historical object',formula:''},
      stages:['found'], stageLabels:{found:'Historical artifact'}, prices:{found:180}, process:{},
      facts:{found:'Drilling tools transformed hard-rock mining by making it faster to bore holes for blasting and excavation.'}
    },


    railSpike: {
      name:'Old Rail Spike', subtitle:'Historical mine-haulage hardware', family:'artifact', wing:'history', iconClass:'tag rail-spike', iconText:'⌟', metalDetectable:true,
      signature:{id:'artifact',label:'Historical object',formula:''},
      stages:['found'], stageLabels:{found:'Historical artifact'}, prices:{found:235}, process:{},
      facts:{found:'Underground rail systems carried ore, waste rock, people, and supplies. Hardware such as spikes and fasteners helped keep those haulage tracks in place.'}
    },


    surveyCompass: {
      name:'Brass Survey Compass', subtitle:'Historical underground surveying instrument', family:'artifact', wing:'history', iconClass:'tag survey-compass', iconText:'✥', metalDetectable:true,
      signature:{id:'artifact',label:'Historical object',formula:''},
      stages:['found'], stageLabels:{found:'Historical artifact'}, prices:{found:310}, process:{},
      facts:{found:'Mine surveyors used compasses, levels, chains, and later more precise instruments to map underground workings and keep new excavations tied to known reference points.'}
    },
    miningTag: {
      name:'Mining Tag', subtitle:'Historical mine check', family:'artifact', wing:'history', iconClass:'tag mining-tag', metalDetectable:true, iconText:'#',
      signature:{id:'artifact',label:'Historical object',formula:''},
      stages:['found'], stageLabels:{found:'Historical artifact'}, prices:{found:50}, process:{},
      facts:{found:'Some mines used numbered tags or checks to help track who was underground. Systems varied from one operation to another.'}
    },
    miningLamp: {
      name:'Old Mining Lamp', subtitle:'Historical underground equipment', family:'artifact', wing:'history', iconClass:'tag mining-lamp', metalDetectable:true, iconText:'◒',
      signature:{id:'artifact',label:'Historical object',formula:''},
      stages:['found'], stageLabels:{found:'Historical artifact'}, prices:{found:100}, process:{},
      facts:{found:'Underground lamps changed dramatically over time, from open flames to safety lamps and eventually electric lighting. Safer designs were especially important where flammable gases could accumulate.'}
    }
  };


  const SPARKLE_KEYS = new Set(['quartz','amethyst','garnet','topaz','citrine','calcite','fluorite','aquamarine','sapphire','roseQuartz','malachite','ruby','emerald','willemite','hackmanite','apatite','opal','diamond','obsidian','olivine','nativeSulfur','rhodochrosite','adularia']);
  const UV_CLASSES = {
    fluorite:'uv-fluorite',
    calcite:'uv-calcite',
    ruby:'uv-ruby',
    sphalerite:'uv-sphalerite',
    scheelite:'uv-scheelite',
    willemite:'uv-willemite',
    hackmanite:'uv-hackmanite',
    apatite:'uv-apatite'
  };




  const EXCEPTIONAL_BASE_CHANCE = 0.05;
  const EXCEPTIONAL_KIT_CHANCE = 0.30;
  const COLLECTOR_FOCUS_WEIGHT = 0.60;
  const PROSPECTING_SUPPLIES = {
    prospectorKit:{label:"Prospector's Kit",icon:'🎒',cost:4000,description:'Arm it for a fresh face. When you commit that face by mining the first tile, its exceptional-specimen chance rises from 5% to 30%.'},
    surveyChalk:{label:'Survey Chalk',icon:'▧',cost:2000,description:'Arm it for a fresh face. On the first mined tile, it reports whether an exceptional specimen is present and marks a vague 3×3 zone if so.'},
    collectorsFocus:{label:"Collector's Focus",icon:'◎',cost:4000,description:'Arm it with a target for a fresh face. If an exceptional specimen spawns and that material is present, the target receives a 60% weighting.'}
  };


  const EXCEPTIONAL_VARIANTS = {
    quartz:[
      {id:'waterClearPoint',label:'Water-clear Quartz Point',sellValue:2800,detail:'An unusually transparent quartz crystal with clean faces and very little internal cloudiness.'},
      {id:'phantomQuartz',label:'Phantom Quartz',sellValue:3600,detail:'Earlier stages of crystal growth remain visible inside the quartz as ghost-like internal outlines.'},
      {id:'quartzCluster',label:'Quartz Crystal Cluster',sellValue:4200,detail:'Several quartz crystals grew together on the same piece of matrix, each competing for space.'}
    ],
    amethyst:[
      {id:'amethystSceptre',label:'Amethyst Sceptre',sellValue:4400,detail:'A later crystal generation widened near the tip, producing the distinctive sceptre-shaped habit.'},
      {id:'deepPurpleCluster',label:'Deep-purple Amethyst Cluster',sellValue:3800,detail:'Strong colour developed across a tightly packed group of quartz crystals.'}
    ],
    calcite:[
      {id:'dogtoothCalcite',label:'Dogtooth Calcite Cluster',sellValue:3200,detail:'Sharp scalenohedral calcite crystals form the classic pointed habit often nicknamed dogtooth spar.'},
      {id:'opticalCalcite',label:'Optical Calcite Crystal',sellValue:3600,detail:'An unusually clear calcite crystal shows strong double refraction through its rhombohedral structure.'}
    ],
    fluorite:[
      {id:'zonedFluorite',label:'Colour-zoned Fluorite',sellValue:4800,detail:'Changes in chemistry during growth produced visible bands of colour inside the same crystal.'},
      {id:'fluoriteCubes',label:'Fluorite Cube Cluster',sellValue:4200,detail:'A group of sharply formed cubic fluorite crystals grew together along a vein surface.'}
    ],
    pyrite:[
      {id:'pyriteCubeCluster',label:'Pyrite Cube Cluster',sellValue:4600,detail:'Intergrown brassy cubes show the crisp geometry that makes pyrite crystals so distinctive.'}
    ],
    malachite:[
      {id:'botryoidalMalachite',label:'Botryoidal Malachite',sellValue:5200,detail:'Rounded grape-like surfaces formed as malachite grew outward in many tiny radiating fibres.'},
      {id:'fibrousMalachite',label:'Fibrous Malachite',sellValue:4600,detail:'Fine radiating fibres give this specimen a silky texture very different from polished banded material.'}
    ],
    obsidian:[
      {id:'snowflakeObsidian',label:'Snowflake Obsidian',sellValue:3000,detail:'Pale spherulites crystallized inside volcanic glass, producing the familiar snowflake pattern.'},
      {id:'rainbowSheenObsidian',label:'Rainbow-sheen Obsidian',sellValue:4200,detail:'Microscopic structures inside the volcanic glass reflect light as subtle bands of iridescent colour.'}
    ],
    olivine:[
      {id:'gemmyOlivine',label:'Gemmy Olivine Crystal',sellValue:5800,detail:'An unusually transparent olivine crystal is good enough to show why gem-quality olivine is called peridot.'}
    ],
    rhodochrosite:[
      {id:'bandedRhodochrosite',label:'Banded Rhodochrosite',sellValue:5000,detail:'Repeated mineral deposition produced distinct pink and pale bands through the specimen.'}
    ],
    nativeSulfur:[
      {id:'sulfurCluster',label:'Native Sulfur Crystal Cluster',sellValue:3500,detail:'Bright yellow sulfur crystals formed together in a geothermal environment.'}
    ],
    ruby:[
      {id:'rubyMatrix',label:'Ruby in Matrix',sellValue:6500,detail:'Red corundum remains attached to the host rock it crystallized within instead of being separated as a loose gem.'}
    ],
    emerald:[
      {id:'emeraldMatrix',label:'Emerald in Matrix',sellValue:6800,detail:'Green beryl crystals remain embedded in contrasting host rock, preserving more of their geological context.'}
    ],
    hematite:[
      {id:'specularHematite',label:'Specular Hematite',sellValue:3600,detail:'Tiny platy hematite crystals create a glittering metallic surface known as specularite.'}
    ],
    nativeGold:[
      {id:'dendriticGold',label:'Dendritic Native Gold',sellValue:7500,detail:'Native gold grew in branching, tree-like forms along tiny fractures rather than as a rounded nugget.'}
    ]
  };

  const SPRITE_SLUGS = {
    roseQuartz:'rose-quartz', nativeSulfur:'native-sulfur', nativeGold:'native-gold'
  };
  const EXCEPTIONAL_SPRITES = {
    waterClearPoint:'water-clear-quartz-point',
    phantomQuartz:'phantom-quartz',
    quartzCluster:'quartz-crystal-cluster',
    amethystSceptre:'amethyst-sceptre',
    deepPurpleCluster:'deep-purple-amethyst-cluster',
    dogtoothCalcite:'dogtooth-calcite-cluster',
    opticalCalcite:'optical-calcite-crystal',
    zonedFluorite:'colour-zoned-fluorite',
    fluoriteCubes:'fluorite-cube-cluster',
    pyriteCubeCluster:'pyrite-cube-cluster',
    botryoidalMalachite:'botryoidal-malachite',
    fibrousMalachite:'fibrous-malachite',
    snowflakeObsidian:'snowflake-obsidian',
    rainbowSheenObsidian:'rainbow-sheen-obsidian',
    gemmyOlivine:'gemmy-olivine-crystal',
    bandedRhodochrosite:'banded-rhodochrosite',
    sulfurCluster:'native-sulfur-crystal-cluster',
    rubyMatrix:'ruby-in-matrix',
    emeraldMatrix:'emerald-in-matrix',
    specularHematite:'specular-hematite',
    dendriticGold:'dendritic-native-gold'
  };

  function spriteSlug(key){ return SPRITE_SLUGS[key]||key; }
  function miniSpriteSrc(key){
    const m=MATERIALS[key];
    if(m?.family==='fossil')return 'images/sprites/mini/fossil.png';
    if(m?.family==='artifact')return 'images/sprites/mini/artifact.png';
    return `images/sprites/mini/${spriteSlug(key)}.png`;
  }
  function detailSpriteSrc(key,stage){ return `images/sprites/detail/${spriteSlug(key)}-${stage}.webp`; }
  function exceptionalSpriteSrc(item){
    const slug=EXCEPTIONAL_SPRITES[item?.variantId];
    return slug?`images/sprites/exceptional/${slug}.webp`:detailSpriteSrc(item?.key,MATERIALS[item?.key]?.stages?.[0]||'raw');
  }


  const WINGS = [
    {id:'minerals',name:'Mineral Hall'},
    {id:'ores',name:'Ores & Metals'},
    {id:'fossils',name:'Fossil Wing'},
    {id:'history',name:'History Wing'}
  ];


  const DEPTHS = {
    1:{
      name:'Upper Seam',
      note:'Near-surface workings where common minerals and oxidized ores are easiest to reach. Weathering and groundwater can alter minerals considerably this close to the surface.',
      materials:{quartz:42,amethyst:22,hematite:20,chalcopyrite:16},
      sideFinds:[{key:'miningTag',weight:72},{key:'trilobite',weight:28}]
    },
    2:{
      name:'Lower Works',
      note:'Older, deeper workings cut through several mineral-bearing layers. Changes in pressure, temperature, and host rock create different mineral assemblages.',
      materials:{quartz:18,amethyst:13,hematite:13,chalcopyrite:13,garnet:15,topaz:12,pyrite:16},
      sideFinds:[{key:'trilobite',weight:40},{key:'crinoidStem',weight:24},{key:'fernImpression',weight:18},{key:'miningTag',weight:18}]
    },
    3:{
      name:'Deep Gallery',
      note:'Deeper fractures provided pathways for mineral-rich fluids, leaving crystals and metal-bearing ores behind as conditions changed.',
      materials:{quartz:8,amethyst:7,hematite:5,chalcopyrite:5,garnet:8,topaz:7,pyrite:6,citrine:12,calcite:10,fluorite:10,aquamarine:7,sapphire:4,cassiterite:5},
      sideFinds:[{key:'ammonite',weight:36},{key:'crinoidStem',weight:16},{key:'fernImpression',weight:12},{key:'trilobite',weight:10},{key:'surveyMarker',weight:12},{key:'miningLamp',weight:8},{key:'miningTag',weight:6}]
    },
    4:{
      name:'Crystal Veins',
      note:'Fractures filled by mineral-bearing fluids can produce veins rich in crystals. Different elements and growth conditions give related minerals dramatically different colours.',
      materials:{quartz:4,amethyst:4,hematite:3,chalcopyrite:3,garnet:5,topaz:5,pyrite:4,citrine:6,calcite:5,fluorite:6,aquamarine:7,sapphire:6,cassiterite:4,roseQuartz:9,malachite:8,ruby:5,emerald:4,galena:6,sphalerite:6},
      sideFinds:[{key:'brachiopod',weight:33},{key:'ammonite',weight:20},{key:'crinoidStem',weight:10},{key:'drillBit',weight:18},{key:'surveyMarker',weight:11},{key:'miningLamp',weight:8}]
    },
    5:{
      name:'Luminous Zone',
      note:'Some minerals absorb ultraviolet radiation and release part of that energy as visible light: fluorescence. The effect depends on mineral chemistry and trace impurities.',
      materials:{quartz:3,amethyst:2,calcite:5,fluorite:6,aquamarine:3,sapphire:3,roseQuartz:3,ruby:3,sphalerite:4,scheelite:11,willemite:10,hackmanite:8,apatite:10,opal:7},
      sideFinds:[{key:'belemnite',weight:42},{key:'railSpike',weight:28},{key:'brachiopod',weight:10},{key:'drillBit',weight:9},{key:'surveyMarker',weight:6},{key:'miningLamp',weight:5}]
    },
    6:{
      name:'Epithermal Zone',
      note:'Epithermal deposits form when hot, mineral-rich hydrothermal fluids circulate through shallow volcanic rocks. As those fluids cool, boil, or react with surrounding rock, they can leave spectacular veins of minerals and metal ores.',
      materials:{calcite:4,fluorite:4,pyrite:4,galena:3,sphalerite:3,scheelite:4,obsidian:10,olivine:9,nativeSulfur:8,rhodochrosite:10,adularia:10,diamond:3,acanthite:7,nativeGold:3},
      sideFinds:[{key:'surveyCompass',weight:52},{key:'drillBit',weight:18},{key:'railSpike',weight:18},{key:'surveyMarker',weight:12}]
    }
  };


const DURABILITY_LEVELS = [
    {swings:28,cost:60,label:'Basic pick'},
    {swings:34,cost:140,label:'Reinforced handle'},
    {swings:40,cost:320,label:'Steel pick'},
    {swings:48,cost:780,label:'Geologist’s pick'},
    {swings:56,cost:3600,label:'Deep-work pick'},
    {swings:68,cost:null,label:'Carbide rock pick'}
  ];


  const SURVEY_LEVELS = [
    {name:'None',cost:75,next:'Field Scanner',description:'Unlocks the 3×3 area scanner. Early scans report chemical signatures rather than exact gem names.'},
    {name:'Field Scanner',cost:160,next:'Spectral Scanner',description:'Reports chemistry and signal strength inside the selected 3×3 area. Scanned tiles stay marked.'},
    {name:'Spectral Scanner',cost:360,next:'Mineral Analyzer',description:'Adds deposit-pattern information and notices unusual non-mineral signatures.'},
    {name:'Mineral Analyzer',cost:null,next:null,description:'Identifies exact minerals and distinguishes fossil signatures from historical objects.'}
  ];


  const SCAN_CHARGE_LEVELS = [
    {uses:1,cost:80,label:'1 scan per face'},
    {uses:2,cost:170,label:'2 scans per face'},
    {uses:3,cost:340,label:'3 scans per face'},
    {uses:4,cost:560,label:'4 scans per face'},
    {uses:5,cost:850,label:'5 scans per face'},
    {uses:6,cost:null,label:'6 scans per face'}
  ];


  const WORKSHOP_LEVELS = [
    {name:'Basic Workshop',cost:180,next:'Precision Workshop',description:'Handles your earliest processable minerals and ores.'},
    {name:'Precision Workshop',cost:650,next:'Advanced Lapidary',description:'Adds support for a broader range of mid-game minerals and ores.'},
    {name:'Advanced Lapidary',cost:1250,next:'Master Lapidary',description:'Handles tougher gemstones and deeper metal-bearing ores.'},
    {name:'Master Lapidary',cost:2400,next:'Specialist Lapidary',description:'Handles demanding deep-zone gemstones and prepares the workshop for unusual material.'},
    {name:'Specialist Lapidary',cost:4200,next:'Master Cutter’s Bench',description:'Adds the precision and abrasives needed for the final-zone gemstones, mineraloids, and metal-bearing ores.'},
    {name:'Master Cutter’s Bench',cost:null,next:null,description:'A precision bench built to handle every processable specimen in the mine.'}
  ];


  const DEPTH_UPGRADES = {
    2:{cost:225,description:'Unlock Depth 2: the Lower Works, adding new gemstones, metallic minerals, and more fossil hunting.'},
    3:{cost:850,description:'Unlock Depth 3: the Deep Gallery, adding new crystal families, colourful minerals, another metal-bearing ore, and deeper historical finds.'},
    4:{cost:1800,description:'Unlock Depth 4: the Crystal Veins, adding high-grade gemstones, new metal-bearing ores, fossils, and artifacts.'},
    5:{cost:3600,description:'Unlock Depth 5: the Luminous Zone, adding fluorescent minerals, an unusual heavy-metal ore, a mineraloid, belemnites, and deeper mining history.'},
    6:{cost:5200,description:'Open the final route into Depth 6: the Epithermal Zone, a hot volcanic-hydrothermal environment where boiling fluids deposited unusual minerals and metals.'}
  };




  const ACHIEVEMENTS = [
    {id:'firstCrunch',icon:'⛏️',name:'First Crunch',description:'Mine your first tile.',condition:s=>s.meta.tilesMined>=1},
    {id:'shiny',icon:'✦',name:'Shiny!',description:'Find your first mineral or ore.',condition:s=>Object.entries(MATERIALS).some(([k,m])=>['mineral','ore'].includes(m.family)&&(s.stats[k]?.found||0)>0)},
    {id:'museumPiece',icon:'🏛️',name:'Museum Piece',description:'Donate your first specimen.',condition:s=>Object.values(s.stats).some(x=>(x.donated||0)>0)},
    {id:'shelfRespect',icon:'✨',name:'Shelf Respect',description:'Complete your first material set.',condition:s=>Object.keys(MATERIALS).some(k=>isMastered(k))},
    {id:'fossilFever',icon:'🦴',name:'Fossil Fever',description:'Donate three different fossils.',condition:s=>countCollectedFamily('fossil')>=3},
    {id:'oldStuff',icon:'🏺',name:'Old Stuff',description:'Donate three different historical artifacts.',condition:s=>countCollectedFamily('artifact')>=3},
    {id:'foolMeOnce',icon:'🟨',name:'Fool Me Once',description:'Find pyrite. It is still not gold.',condition:s=>(s.stats.pyrite?.found||0)>0},
    {id:'sio2Enjoyer',icon:'◇',name:'SiO₂ Enjoyer',description:'Find quartz, amethyst, citrine, and rose quartz.',condition:s=>['quartz','amethyst','citrine','roseQuartz'].every(k=>(s.stats[k]?.found||0)>0)},
    {id:'familyResemblance',icon:'🔴',name:'Family Resemblance',description:'Master both sapphire and ruby.',condition:s=>isMastered('sapphire')&&isMastered('ruby')},
    {id:'berylBuddies',icon:'🟢',name:'Beryl Buddies',description:'Master both aquamarine and emerald.',condition:s=>isMastered('aquamarine')&&isMastered('emerald')},
    {id:'metalhead',icon:'⚙️',name:'Metalhead',description:'Refine iron, copper, tin, lead, and zinc at least once.',condition:s=>['hematite','chalcopyrite','cassiterite','galena','sphalerite'].every(k=>(s.stats[k]?.processed||0)>0)},
    {id:'prospector',icon:'⌁',name:'Prospector',description:'Use the area scanner 25 times.',condition:s=>s.meta.scansUsed>=25},
    {id:'dejaVu',icon:'👁️',name:'Déjà Vu',description:'Scan ten tiles at least twice.',condition:s=>s.meta.doubleScans>=10},
    {id:'xrayish',icon:'◌',name:'X-Ray-ish',description:'Dig up something after its tile has been scanned twice.',condition:s=>s.meta.anomalyFinds>=1},
    {id:'beepBeep',icon:'🧲',name:'Beep Beep',description:'Use the metal detector for the first time.',condition:s=>s.meta.metalSweeps>=1},
    {id:'detectorist',icon:'📍',name:'Detectorist',description:'Dig up a metallic target from a detector signal zone.',condition:s=>s.meta.metalSignalFinds>=1},
    {id:'barelyThere',icon:'🪫',name:'Barely There',description:'Use every last swing on a rock face.',condition:s=>s.meta.facesFinished>=1},
    {id:'lastSwingLuck',icon:'🍀',name:'Last Swing Luck',description:'Find something with the final point of pick durability.',condition:s=>s.meta.lastSwingFinds>=1},
    {id:'sellout',icon:'💰',name:'Sellout',description:'Use Sell All ten times.',condition:s=>s.meta.sellAllUses>=10},
    {id:'fourFloorsDown',icon:'🪜',name:'Four Floors Down',description:'Unlock Depth 4.',condition:s=>s.unlockedDepth>=4},
    {id:'shinyGoblin',icon:'💎',name:'Shiny Goblin',description:'Find 100 total specimens.',condition:s=>totalFound()>=100},
    {id:'fullCoverage',icon:'▦',name:'Broad Coverage',description:'Survey at least half of one rock face.',condition:s=>s.meta.fullSurveyFaces>=1},
    {id:'allThatGlitters',icon:'🌟',name:'All That Glitters',description:'Master citrine, topaz, and pyrite.',condition:s=>['citrine','topaz','pyrite'].every(k=>isMastered(k))},
    {id:'glowUp',icon:'🔦',name:'Glow Up',description:'View a fluorescent museum specimen under UV.',condition:s=>s.meta.uvViews>=1&&countCollectedUvMaterials()>=1},
    {id:'glowShow',icon:'✨',name:'The Glow Show',description:'Have five different fluorescent materials represented in the museum.',condition:s=>s.meta.uvViews>=1&&countCollectedUvMaterials()>=5},
    {id:'fiveFloorsDown',icon:'🔦',name:'Lights Below',description:'Unlock Depth 5: the Luminous Zone.',condition:s=>s.unlockedDepth>=5},
    {id:'heatRated',icon:'🥵',name:'Dress for the Job',description:'Equip geothermal protective gear.',condition:s=>!!s.upgrades.geothermalGear},
    {id:'epithermal',icon:'🌋',name:'The Mine Ends Here',description:'Unlock Depth 6: the Epithermal Zone.',condition:s=>s.unlockedDepth>=6},
    {id:'diamondRough',icon:'💎',name:'Not Invincible',description:'Find your first diamond.',condition:s=>(s.stats.diamond?.found||0)>0},
    {id:'actualGold',icon:'🟡',name:'Okay, This One Is Gold',description:'Find native gold.',condition:s=>(s.stats.nativeGold?.found||0)>0},
    {id:'yellowRock',icon:'🟨',name:'Aggressively Yellow',description:'Find native sulfur.',condition:s=>(s.stats.nativeSulfur?.found||0)>0},
    {id:'silverLining',icon:'🥈',name:'Silver Lining',description:'Refine acanthite into silver.',condition:s=>(s.stats.acanthite?.processed||0)>0},
    {id:'peridotProper',icon:'💚',name:'Same Rock, Fancy Name',description:'Cut olivine into peridot.',condition:s=>(s.inventory.olivine?.cut||0)>0||!!s.collection.olivine?.cut},
    {id:'adulariaClue',icon:'🌙',name:'Low Temperature, High Drama',description:'Find adularia in the Epithermal Zone.',condition:s=>(s.stats.adularia?.found||0)>0},
    {id:'pinkVein',icon:'🩷',name:'Pink Vein',description:'Find rhodochrosite.',condition:s=>(s.stats.rhodochrosite?.found||0)>0},
    {id:'fossilRecord',icon:'🦴',name:'The Whole Fossil Record',description:'Complete every fossil display in the museum.',condition:s=>Object.entries(MATERIALS).filter(([,m])=>m.family==='fossil').every(([k,m])=>m.stages.every(st=>!!s.collection[k]?.[st]))},
    {id:'historyBuff',icon:'🧭',name:'Mine Historian',description:'Complete every historical-artifact display.',condition:s=>Object.entries(MATERIALS).filter(([,m])=>m.family==='artifact').every(([k,m])=>m.stages.every(st=>!!s.collection[k]?.[st]))},
    {id:'mineralHall',icon:'🔷',name:'Mineral Hall Complete',description:'Complete every mineral and gem display.',condition:s=>Object.entries(MATERIALS).filter(([,m])=>m.family==='mineral').every(([k,m])=>m.stages.every(st=>!!s.collection[k]?.[st]))},
    {id:'oreHall',icon:'⚙️',name:'Ores & Metals Complete',description:'Complete every ore and metal display.',condition:s=>Object.entries(MATERIALS).filter(([,m])=>m.family==='ore').every(([k,m])=>m.stages.every(st=>!!s.collection[k]?.[st]))},
    {id:'sixDeep',icon:'⬇️',name:'Six Deep',description:'Mine at least one rock tile on every depth.',condition:s=>allDepthsMined()},
    {id:'exceptionalTaste',icon:'✨',name:'Now THAT Is a Specimen',description:'Find your first exceptional specimen.',condition:s=>(s.postgame?.exceptionalFound||0)>=1},
    {id:'curator',icon:'🖼️',name:'Your Turn, Curator',description:'Place your first exceptional specimen in the Personal Collection display case.',condition:s=>(s.postgame?.personalSlots||[]).some(Boolean)},
    {id:'preparedProspector',icon:'🎒',name:'Going Prepared',description:'Use all three prospecting supplies on the same rock face.',condition:s=>(s.meta?.fullProspectingStacks||0)>=1},
    {id:'focusedFind',icon:'◎',name:'Exactly What I Was Looking For',description:"Find an exceptional specimen that matches your Collector's Focus.",condition:s=>(s.meta?.focusedExceptionalFinds||0)>=1},
    {id:'specimenSeller',icon:'💵',name:'I Can Let This One Go',description:'Sell an exceptional specimen from Specimen Storage.',condition:s=>(s.postgame?.exceptionalSold||0)>=1},
    {id:'tenExceptional',icon:'✦',name:'Dragon Instinct',description:'Find ten exceptional specimens after museum completion.',condition:s=>(s.postgame?.exceptionalFound||0)>=10},
    {id:'allMetals',icon:'🔩',name:'Heavy Metal',description:'Refine iron, copper, tin, lead, zinc, tungsten, and silver.',condition:s=>['hematite','chalcopyrite','cassiterite','galena','sphalerite','scheelite','acanthite'].every(k=>(s.stats[k]?.processed||0)>0)},
    {id:'finalVein',icon:'🌋',name:'Epithermal Set',description:'Complete every new core specimen introduced by the Epithermal Zone.',condition:s=>['diamond','obsidian','olivine','nativeSulfur','rhodochrosite','adularia','acanthite','nativeGold'].every(k=>isMastered(k))},
    {id:'trueRockhound',icon:'🏆',name:'TRUE ROCKHOUND',description:'Complete the entire museum. No reset. No prestige. You finished the game.',condition:s=>!!s.postgame?.completed},
    {id:'rockaholic',icon:'💎',name:'ROCKAHOLIC',description:'Complete the museum, max every permanent upgrade, discover every core subject, and earn every other achievement.',hidden:true,condition:s=>{
      const upgradesMaxed =
        s.unlockedDepth>=6 &&
        s.upgrades.durability>=DURABILITY_LEVELS.length-1 &&
        s.upgrades.surveying>=SURVEY_LEVELS.length-1 &&
        s.upgrades.scannerUses>=SCAN_CHARGE_LEVELS.length-1 &&
        s.upgrades.workshop>=WORKSHOP_LEVELS.length-1 &&
        !!s.upgrades.metalDetector &&
        !!s.upgrades.uvLamp &&
        !!s.upgrades.geothermalGear &&
        !!s.upgrades.scannerHeatShield &&
        !!s.upgrades.detectorHeatShield;
      const everythingDiscovered=Object.keys(MATERIALS).every(k=>!!s.discovery[k]?.discovered);
      const everyOtherAchievement=ACHIEVEMENTS.filter(a=>a.id!=='rockaholic').every(a=>!!s.achievements[a.id]);
      return !!s.postgame?.completed&&upgradesMaxed&&everythingDiscovered&&everyOtherAchievement;
    }}
  ];


  const emptyInventory = () => Object.fromEntries(Object.entries(MATERIALS).map(([k,m]) => [k,Object.fromEntries(m.stages.map(s => [s,0]))]));
  const emptyCollection = () => Object.fromEntries(Object.entries(MATERIALS).map(([k,m]) => [k,Object.fromEntries(m.stages.map(s => [s,false]))]));
  const emptyStats = () => Object.fromEntries(Object.keys(MATERIALS).map(k => [k,{found:0,sold:0,donated:0,processed:0,earned:0}]));
  const emptyDiscovery = () => Object.fromEntries(Object.keys(MATERIALS).map(k => [k,{discovered:false,depths:[]}]));


  const defaultState = () => ({
    credits:0,
    unlockedDepth:1,
    currentDepth:1,
    upgrades:{durability:0,surveying:0,workshop:0,scannerUses:0,metalDetector:false,uvLamp:false,geothermalGear:false,scannerHeatShield:false,detectorHeatShield:false},
    settings:{autoProcessByMaterial:{},museumUv:false},
    inventory:emptyInventory(),
    collection:emptyCollection(),
    stats:emptyStats(),
    discovery:emptyDiscovery(),
    achievements:{},
    postgame:{
      completed:false,completedAt:null,completionSeen:false,exceptionalFound:0,exceptionalSold:0,nextCollectibleId:1,
      specimenStorage:[],personalSlots:Array(21).fill(null),
      supplies:{prospectorKit:0,surveyChalk:0,collectorsFocus:0},
      armedSupplies:{prospectorKit:false,surveyChalk:false,collectorsFocus:false,focusTarget:null},
      geodeRetiredMigration:false
    },
    meta:{
      tilesMined:0,scansUsed:0,doubleScans:0,anomalyFinds:0,metalSweeps:0,metalSignalFinds:0,
      facesFinished:0,lastSwingFinds:0,sellAllUses:0,fullSurveyFaces:0,taglineTaps:0,uvViews:0,fullProspectingStacks:0,focusedExceptionalFinds:0,depthsMined:{}
    },
    face:null
  });


  let state = loadState();
  let openWorkbenchKey = null;
  let toastTimer = null;
  let scanMode = false;
  let activePanel = 'mine';
  let heatWarningVisible = false;
  let focusPickerOpen = false;
  const openStorageKeys = new Set();


  const $ = id => document.getElementById(id);
  const els = {
    depthName:$('depthName'), depthNumber:$('depthNumber'), durability:$('durability'), maxDurability:$('maxDurability'), durabilityMeter:$('durabilityMeter'),
    surveyLevel:$('surveyLevel'), scanUseSummary:$('scanUseSummary'), mineBalance:$('mineBalance'), depthSelector:$('depthSelector'), depthFieldNote:$('depthFieldNote'), scanButton:$('scanButton'), scanButtonStatus:$('scanButtonStatus'),
    metalDetectorButton:$('metalDetectorButton'), detectorButtonStatus:$('detectorButtonStatus'),
    postgameProspectingTools:$('postgameProspectingTools'), prospectorKitButton:$('prospectorKitButton'), prospectorKitStatus:$('prospectorKitStatus'), surveyChalkButton:$('surveyChalkButton'), surveyChalkStatus:$('surveyChalkStatus'), collectorsFocusButton:$('collectorsFocusButton'), collectorsFocusStatus:$('collectorsFocusStatus'), collectorFocusPicker:$('collectorFocusPicker'), collectorFocusMineSelect:$('collectorFocusMineSelect'), applyCollectorFocusButton:$('applyCollectorFocusButton'),
    mineBoard:$('mineBoard'), faceFinds:$('faceFinds'), newFaceButton:$('newFaceButton'), surfaceButton:$('surfaceButton'), mineMessage:$('mineMessage'),
    workbenchList:$('workbenchList'), workbenchDiscoveryCount:$('workbenchDiscoveryCount'), masteredSellValue:$('masteredSellValue'), sellAllMasteredButton:$('sellAllMasteredButton'), postgameWorkbench:$('postgameWorkbench'), museumWings:$('museumWings'), museumCount:$('museumCount'), museumMeter:$('museumMeter'), completionPlaque:$('completionPlaque'), personalCollectionPanel:$('personalCollectionPanel'), personalCollectionSection:$('personalCollectionSection'), personalCollectionGrid:$('personalCollectionGrid'), specimenStorageSection:$('specimenStorageSection'), collectionNavButton:$('collectionNavButton'), bottomNav:document.querySelector('.bottom-nav'),
    museumLighting:$('museumLighting'), normalLightButton:$('normalLightButton'), uvLightButton:$('uvLightButton'),
    achievementGrid:$('achievementGrid'), achievementCount:$('achievementCount'), achievementMeter:$('achievementMeter'),
    shopBalance:$('shopBalance'), upgradeList:$('upgradeList'), prospectingShop:$('prospectingShop'), resetButton:$('resetButton'), toast:$('toast'),
    mobileMineHud:$('mobileMineHud'), mobileDurability:$('mobileDurability'), mobileScans:$('mobileScans'),
    gameTitle:$('gameTitle'), gameTagline:$('gameTagline'), completionModal:$('completionModal'), completionBody:$('completionBody'), keepMiningButton:$('keepMiningButton')
  };


  init();


  function init(){
    if(!state.face || state.face.depth !== state.currentDepth){
      state.face = generateFace(state.currentDepth);
    }else{
      normalizeFace(state.face);
    }


    checkAchievements(true);
    saveState();


    document.querySelectorAll('.nav-button').forEach(btn => btn.addEventListener('click',() => switchPanel(btn)));
    els.newFaceButton.addEventListener('click',startNewFace);
    els.surfaceButton.addEventListener('click',startNewFace);
    els.scanButton.addEventListener('click',toggleScanMode);
    els.metalDetectorButton.addEventListener('click',useMetalDetector);
    els.prospectorKitButton?.addEventListener('click',useProspectorKit);
    els.surveyChalkButton?.addEventListener('click',useSurveyChalk);
    els.collectorsFocusButton?.addEventListener('click',toggleCollectorFocusPicker);
    els.applyCollectorFocusButton?.addEventListener('click',()=>useCollectorsFocus(els.collectorFocusMineSelect?.value));
    els.normalLightButton.addEventListener('click',()=>setMuseumLighting(false));
    els.uvLightButton.addEventListener('click',()=>setMuseumLighting(true));
    els.sellAllMasteredButton.addEventListener('click',sellAllMastered);
    els.resetButton.addEventListener('click',resetGame);
    if(els.keepMiningButton)els.keepMiningButton.addEventListener('click',closeCompletionModal);


    renderAll();
    if(state.postgame?.completed&&!state.postgame.completionSeen)setTimeout(openCompletionModal,120);
  }


  function loadState(){
    try{
      const raw = localStorage.getItem(SAVE_KEY);
      if(!raw) return defaultState();


      const parsed = JSON.parse(raw);
      const fresh = defaultState();
      const merged = {
        ...fresh,
        ...parsed,
        upgrades:{...fresh.upgrades,...(parsed.upgrades||{})},
        settings:{...fresh.settings,...(parsed.settings||{}),autoProcessByMaterial:{...(parsed.settings?.autoProcessByMaterial||{})}},
        inventory:fresh.inventory,
        collection:fresh.collection,
        stats:fresh.stats,
        discovery:fresh.discovery,
        achievements:{...(parsed.achievements||{})},
        meta:{...fresh.meta,...(parsed.meta||{}),depthsMined:{...(fresh.meta.depthsMined||{}),...(parsed.meta?.depthsMined||{})}},
        postgame:{...fresh.postgame,...(parsed.postgame||{}),specimenStorage:Array.isArray(parsed.postgame?.specimenStorage)?[...parsed.postgame.specimenStorage]:Array.isArray(parsed.postgame?.vault)?[...parsed.postgame.vault]:[],personalSlots:Array.isArray(parsed.postgame?.personalSlots)?parsed.postgame.personalSlots.slice(0,21):Array(21).fill(null),supplies:{...fresh.postgame.supplies,...(parsed.postgame?.supplies||{})},armedSupplies:{...fresh.postgame.armedSupplies,...(parsed.postgame?.armedSupplies||{})}}
      };


      Object.entries(MATERIALS).forEach(([k,m]) => {
        m.stages.forEach(stage => {
          merged.inventory[k][stage] = parsed.inventory?.[k]?.[stage] ?? 0;
          merged.collection[k][stage] = parsed.collection?.[k]?.[stage] ?? false;
        });
        merged.stats[k] = {...fresh.stats[k],...(parsed.stats?.[k]||{})};


        const priorDiscovery=parsed.discovery?.[k];
        const hasHistoricalEvidence=(merged.stats[k].found||0)>0 || (merged.stats[k].sold||0)>0 || (merged.stats[k].donated||0)>0 || (merged.stats[k].processed||0)>0 || m.stages.some(stage=>(merged.inventory[k][stage]||0)>0 || !!merged.collection[k][stage]);
const discovered=!!priorDiscovery?.discovered || hasHistoricalEvidence;
        let depths=Array.isArray(priorDiscovery?.depths)?priorDiscovery.depths.map(Number).filter(d=>DEPTHS[d]&&d<=merged.unlockedDepth):[];


        // Beta 1.2.2 begins tracking where each discovery was actually encountered.
        // Older saves did not store that history, so seed useful known locations for
        // already-discovered items from the depths the old save had unlocked.
        if(discovered && !depths.length){
          const currentFaceSawIt=parsed.face?.finds?.[k]>0 ? Number(parsed.face?.depth||parsed.currentDepth||1) : null;
          if(currentFaceSawIt && DEPTHS[currentFaceSawIt])depths=[currentFaceSawIt];
          else depths=spawnDepthsFor(k).filter(d=>d<=Math.max(1,Math.min(6,merged.unlockedDepth||1)));
        }
        merged.discovery[k]={discovered,depths:[...new Set(depths)].sort((a,b)=>a-b)};
      });


      // v2.1 migration: if global automation was on, keep it on for materials
      // that are already mastered in the migrated save.
      if(parsed.settings?.autoProcess === true){
        Object.keys(MATERIALS).forEach(k => {
          if(hasProcessing(k) && MATERIALS[k].stages.every(stage => merged.collection[k][stage])){
            merged.settings.autoProcessByMaterial[k] = true;
          }
        });
      }


      merged.unlockedDepth = Math.max(1,Math.min(6,merged.unlockedDepth||1));
      merged.currentDepth = Math.max(1,Math.min(merged.unlockedDepth,merged.currentDepth||1));
      merged.upgrades.workshop = Math.max(0,Math.min(WORKSHOP_LEVELS.length-1,merged.upgrades.workshop||0));
      merged.upgrades.scannerUses = Math.max(0,Math.min(SCAN_CHARGE_LEVELS.length-1,merged.upgrades.scannerUses||0));
      merged.upgrades.surveying = Math.max(0,Math.min(SURVEY_LEVELS.length-1,merged.upgrades.surveying||0));
      merged.upgrades.durability = Math.max(0,Math.min(DURABILITY_LEVELS.length-1,merged.upgrades.durability||0));
      merged.upgrades.metalDetector = !!merged.upgrades.metalDetector;
      merged.upgrades.uvLamp = !!merged.upgrades.uvLamp;
      merged.upgrades.geothermalGear = !!merged.upgrades.geothermalGear;
      merged.upgrades.scannerHeatShield = !!merged.upgrades.scannerHeatShield;
      merged.upgrades.detectorHeatShield = !!merged.upgrades.detectorHeatShield;
      merged.postgame.completed = !!merged.postgame.completed;
      merged.postgame.completionSeen = !!merged.postgame.completionSeen;
      merged.postgame.exceptionalFound = Math.max(0,merged.postgame.exceptionalFound||0);
      merged.postgame.exceptionalSold = Math.max(0,merged.postgame.exceptionalSold||0);
      merged.postgame.nextCollectibleId = Math.max(1,merged.postgame.nextCollectibleId||1);
      merged.postgame.supplies = {...fresh.postgame.supplies,...(merged.postgame.supplies||{})};
      Object.keys(merged.postgame.supplies).forEach(k=>merged.postgame.supplies[k]=Math.max(0,Math.floor(Number(merged.postgame.supplies[k])||0)));
      // Beta 1.4.4 restores next-face arming, but supplies are only consumed when
      // the player commits a prepared face by mining its first tile.
      merged.postgame.armedSupplies = {...fresh.postgame.armedSupplies,...(parsed.postgame?.armedSupplies||{})};
      ['prospectorKit','surveyChalk','collectorsFocus'].forEach(k=>merged.postgame.armedSupplies[k]=!!merged.postgame.armedSupplies[k]&&(merged.postgame.supplies[k]||0)>0);
      if(!merged.postgame.armedSupplies.collectorsFocus)merged.postgame.armedSupplies.focusTarget=null;
      // Beta 1.5.1 trims the display case from 30 to 21 spaces. Anything that
      // occupied retired slots is preserved instead of disappearing.
      if(Array.isArray(parsed.postgame?.personalSlots) && parsed.postgame.personalSlots.length>21){
        parsed.postgame.personalSlots.slice(21).filter(Boolean).forEach(item=>{
          if(item?.kind==='exceptional')merged.postgame.specimenStorage.push(item);
          else if(item?.kind==='regular'&&item.key&&item.stage&&merged.inventory[item.key]?.[item.stage]!==undefined)merged.inventory[item.key][item.stage]++;
          else if(item?.kind==='geode')merged.credits+=Math.max(0,Number(item.sellValue)||1000);
        });
      }
      while(merged.postgame.personalSlots.length<21)merged.postgame.personalSlots.push(null);
      if(merged.postgame.personalSlots.length>21)merged.postgame.personalSlots=merged.postgame.personalSlots.slice(0,21);


      // Beta 1.4.2 retires the geode experiment. Preserve exceptional specimens,
      // return ordinary display specimens to inventory, and convert retired geode
      // items / remaining cartridges to ordinary money once so old beta saves are safe.
      if(!parsed.postgame?.geodeRetiredMigration){
        let refund=0;
        refund+=Math.max(0,Number(parsed.postgame?.geodeCartridges)||0)*2000;
        refund+=Math.max(0,Number(parsed.postgame?.uncrackedGeodes)||0)*600;
        const oldStored=Array.isArray(parsed.postgame?.specimenStorage)?parsed.postgame.specimenStorage:Array.isArray(parsed.postgame?.vault)?parsed.postgame.vault:[];
        oldStored.forEach(item=>{if(item?.kind==='geode')refund+=Math.max(0,Number(item.sellValue)||1000);});
        merged.postgame.personalSlots.forEach((item,i)=>{
          if(!item)return;
          if(item.kind==='regular'&&item.key&&item.stage&&merged.inventory[item.key]?.[item.stage]!==undefined){
            merged.inventory[item.key][item.stage]++;
            merged.postgame.personalSlots[i]=null;
          }else if(item.kind==='geode'){
            refund+=Math.max(0,Number(item.sellValue)||1000);
            merged.postgame.personalSlots[i]=null;
          }
        });
        merged.credits+=refund;
        merged.postgame.geodeRetiredMigration=true;
        delete merged.achievements.rockaholic;
      }
      merged.postgame.specimenStorage=(merged.postgame.specimenStorage||[]).filter(item=>item?.kind==='exceptional');
      merged.postgame.personalSlots=merged.postgame.personalSlots.map(item=>item?.kind==='exceptional'?item:null);
      delete merged.postgame.vault;
      delete merged.postgame.uncrackedGeodes;
      delete merged.postgame.geodesCracked;
      delete merged.postgame.geodeCartridges;
      delete merged.postgame.lastGeode;
      delete merged.achievements.geodeFound;
      delete merged.achievements.crackAttack;
      delete merged.achievements.tenGeodes;
      delete merged.achievements.fullHouse;
      merged.settings.museumUv = !!merged.settings.museumUv && merged.upgrades.uvLamp;


      return merged;
    }catch{
      return defaultState();
    }
  }


  function saveState(){ localStorage.setItem(SAVE_KEY,JSON.stringify(state)); }
  function formatMoney(cents){ const v=Math.max(0,Math.round(cents||0)); return v<100?`${v}¢`:`$${(v/100).toFixed(2)}`; }
  function randInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
  function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
  function totalInventory(k){ return Object.values(state.inventory[k]||{}).reduce((a,n)=>a+n,0); }
  function spawnDepthsFor(k){
    return Object.entries(DEPTHS).filter(([,cfg])=>Object.prototype.hasOwnProperty.call(cfg.materials||{},k) || (cfg.sideFinds||[]).some(x=>x.key===k)).map(([d])=>Number(d));
  }
  function isDiscovered(k){ return !!state.discovery?.[k]?.discovered || (state.stats?.[k]?.found||0)>0; }
  function shouldObscureIdentity(k){
    const family=MATERIALS[k]?.family;
    return !isDiscovered(k) && ['mineral','ore','artifact'].includes(family);
  }
  function discoveredDepths(k){ return [...new Set((state.discovery?.[k]?.depths||[]).map(Number).filter(d=>DEPTHS[d]))].sort((a,b)=>a-b); }
  function depthKnowledgeText(k){
    const depths=discoveredDepths(k);
    if(!depths.length)return 'Depth not recorded yet';
    const prefix=depths.length===1?'Depth':'Depths';
    return `${prefix} ${depths.join(', ')}`;
  }
  function museumSearchHint(k){
    const material=MATERIALS[k];
    if(!material || !['fossil','artifact'].includes(material.family))return '';
    const eligible=spawnDepthsFor(k);
    const available=eligible.filter(d=>d<=state.unlockedDepth);
    if(!available.length)return '<span class="museum-search-hint">Search deeper…</span>';
    const labels=available.map(d=>`Depth ${d} · ${DEPTHS[d].name}`);
    return `<span class="museum-search-hint">Search in: ${labels.join(', ')}</span>`;
  }
  function maskUndiscoveredNames(text){
    let out=String(text||'');
    Object.entries(MATERIALS).forEach(([k,m])=>{
      if(!shouldObscureIdentity(k))return;
      const names=[m.name];
      Object.values(m.stageLabels||{}).forEach(label=>{
        if(/^[A-Z][A-Za-z -]+$/.test(label) && !['Raw','Tumbled','Cut','Polished','Natural specimen'].includes(label))names.push(label);
      });
      names.sort((a,b)=>b.length-a.length).forEach(name=>{
        if(!name)return;
        out=out.replace(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),'???');
      });
    });
    return out;
  }
  function isBulkSellEligible(k){
    const m=MATERIALS[k];
    if(m.family==='fossil'||m.family==='artifact')return m.stages.every(stage=>!!state.collection[k]?.[stage]);
    return (m.family==='mineral'||m.family==='ore') && isMastered(k);
  }
  function masteredSellSummary(){
    let items=0,value=0;
    Object.entries(MATERIALS).forEach(([k,m])=>{
      if(!isBulkSellEligible(k))return;
      m.stages.forEach(stage=>{
        const count=state.inventory[k][stage]||0;
        items+=count;
        value+=count*(m.prices[stage]||0);
      });
    });
    return {items,value};
  }
  function hasProcessing(k){ return Object.keys(MATERIALS[k].process||{}).length>0; }
  function currentMaxScans(){ return SCAN_CHARGE_LEVELS[state.upgrades.scannerUses].uses; }
  function currentPickSwings(){ return state.postgame?.completed?GRID_SIZE*GRID_SIZE:DURABILITY_LEVELS[state.upgrades.durability].swings; }
  function currentPickLabel(){ return state.postgame?.completed?'Gilded Steel Pickaxe':DURABILITY_LEVELS[state.upgrades.durability].label; }
  function isMuseumComplete(){ return Object.entries(MATERIALS).every(([k,m])=>m.stages.every(stage=>!!state.collection[k]?.[stage])); }
  function firstEmptyPersonalSlot(){ return state.postgame.personalSlots.findIndex(x=>!x); }
  function postgameItemId(){ const id=`pg${state.postgame.nextCollectibleId++}`; return id; }
  function exceptionalEligible(k){ return !!EXCEPTIONAL_VARIANTS[k] && ['mineral','ore'].includes(MATERIALS[k]?.family); }
  function exceptionalVariantsFor(k){ return EXCEPTIONAL_VARIANTS[k]||[]; }
  function exceptionalKeysForDepth(depth){
    return Object.keys(DEPTHS[depth]?.materials||{}).filter(k=>exceptionalEligible(k)&&isDiscovered(k));
  }
  function variantById(k,id){ return exceptionalVariantsFor(k).find(v=>v.id===id)||null; }
  function makeExceptional(k,variantId=null){
    const choices=exceptionalVariantsFor(k);
    if(!choices.length)return null;
    const variant=variantById(k,variantId)||choices[randInt(0,choices.length-1)];
    return {id:postgameItemId(),kind:'exceptional',key:k,variantId:variant.id,label:variant.label,icon:'✦',detail:variant.detail,sellValue:variant.sellValue,foundDepth:state.currentDepth,foundAt:new Date().toISOString()};
  }
  function specialItemSellValue(item){ return item?.kind==='exceptional'?Math.max(0,Number(item.sellValue)||2500):0; }
  function placeExceptionalOnFace(tiles,depth,effects,chanceOverride=null){
    const eligibleTiles=tiles.filter(t=>!t.revealed&&t.material&&exceptionalEligible(t.material)&&isDiscovered(t.material));
    if(!eligibleTiles.length)return null;
    const chance=chanceOverride??(effects.prospectorKit?EXCEPTIONAL_KIT_CHANCE:EXCEPTIONAL_BASE_CHANCE);
    if(Math.random()>=chance)return null;
    let pool=eligibleTiles;
    if(effects.collectorsFocus&&effects.focusTarget){
      const focused=eligibleTiles.filter(t=>t.material===effects.focusTarget);
      if(focused.length&&Math.random()<COLLECTOR_FOCUS_WEIGHT)pool=focused;
    }
    const tile=pool[randInt(0,pool.length-1)];
    const variants=exceptionalVariantsFor(tile.material);
    if(!variants.length)return null;
    const variant=variants[randInt(0,variants.length-1)];
    tile.exceptionalVariantId=variant.id;
    return {index:tile.index,key:tile.material,variantId:variant.id};
  }
  function currentExceptionalTile(){
    const i=state.face?.exceptionalTileIndex;
    return Number.isInteger(i)?state.face.tiles?.[i]||null:null;
  }
  function exceptionalAlreadyFound(){
    const tile=currentExceptionalTile();
    return !!tile?.revealed;
  }
  function emptyProspectingEffects(){
    return {prospectorKit:false,surveyChalk:false,collectorsFocus:false,focusTarget:null};
  }
  function faceHasMinedTile(face=state.face){
    return !!face?.tiles?.some(t=>t.revealed);
  }
  function preparedSuppliesForDepth(depth){
    const armed=state.postgame?.armedSupplies||emptyProspectingEffects();
    const stock=state.postgame?.supplies||{};
    const focusValid=!!armed.collectorsFocus&&!!armed.focusTarget&&exceptionalKeysForDepth(depth).includes(armed.focusTarget)&&(stock.collectorsFocus||0)>0;
    return {
      prospectorKit:!!armed.prospectorKit&&(stock.prospectorKit||0)>0,
      surveyChalk:!!armed.surveyChalk&&(stock.surveyChalk||0)>0,
      collectorsFocus:focusValid,
      focusTarget:focusValid?armed.focusTarget:null
    };
  }
  function updateExceptionalChalkHint(){
    if(!state.face?.prospectingEffects?.surveyChalk)return;
    const tile=currentExceptionalTile();
    state.face.exceptionalHintTiles=tile&&!tile.revealed?exceptionalHintArea(tile.index):[];
  }
  function markFullProspectingStack(){
    const fx=state.face?.prospectingEffects||{};
    if(fx.prospectorKit&&fx.surveyChalk&&fx.collectorsFocus&&!state.face.fullProspectingStackCounted){
      state.face.fullProspectingStackCounted=true;
      state.meta.fullProspectingStacks=(state.meta.fullProspectingStacks||0)+1;
    }
  }
  function removePreparedSupplyFromCurrentFace(key){
    const face=state.face;
    if(!face||face.prospectingCommitted||faceHasMinedTile(face)||!face.preparedSupplies)return;
    face.preparedSupplies[key]=false;
    if(key==='collectorsFocus')face.preparedSupplies.focusTarget=null;
  }
  function toggleProspectingSupply(key){
    if(!state.postgame?.completed)return;
    const armed=state.postgame.armedSupplies;
    const stock=state.postgame.supplies||{};
    if(armed[key]){
      armed[key]=false;
      if(key==='collectorsFocus')armed.focusTarget=null;
      removePreparedSupplyFromCurrentFace(key);
      focusPickerOpen=false;
      saveState();renderProspectingTools();
      setMineMessage('⛏️','Supply disarmed.','Nothing was spent. Any supply still armed will wait for the next fresh face.');
      showToast(`${PROSPECTING_SUPPLIES[key].label} disarmed.`);
      return;
    }
    if((stock[key]||0)<1){showToast(`No ${PROSPECTING_SUPPLIES[key].label} in the Shop inventory.`);return;}
    armed[key]=true;
    saveState();renderProspectingTools();
    setMineMessage(PROSPECTING_SUPPLIES[key].icon,`${PROSPECTING_SUPPLIES[key].label} armed.`,'It will apply to the next fresh face and will not be spent until you mine the first tile.');
    showToast(`${PROSPECTING_SUPPLIES[key].label} armed for the next face.`);
  }
  function useProspectorKit(){ toggleProspectingSupply('prospectorKit'); }
  function useSurveyChalk(){ toggleProspectingSupply('surveyChalk'); }
  function toggleCollectorFocusPicker(){
    if(!state.postgame?.completed)return;
    const armed=state.postgame.armedSupplies;
    if(armed.collectorsFocus){
      toggleProspectingSupply('collectorsFocus');
      return;
    }
    if((state.postgame.supplies.collectorsFocus||0)<1){showToast("No Collector's Focus in the Shop inventory.");return;}
    const eligible=exceptionalKeysForDepth(state.currentDepth);
    if(!eligible.length){showToast('No eligible exceptional materials at this depth.');return;}
    focusPickerOpen=!focusPickerOpen;
    renderProspectingTools();
  }
  function useCollectorsFocus(target){
    if(!state.postgame?.completed||!target)return;
    if((state.postgame.supplies.collectorsFocus||0)<1)return;
    const eligible=exceptionalKeysForDepth(state.currentDepth);
    if(!eligible.includes(target)){showToast('Choose an eligible material for this depth.');return;}
    state.postgame.armedSupplies.collectorsFocus=true;
    state.postgame.armedSupplies.focusTarget=target;
    focusPickerOpen=false;
    saveState();renderProspectingTools();
    setMineMessage('◎',"Collector's Focus armed.",`${MATERIALS[target].name} will be favoured on the next fresh face if an exceptional specimen spawns and that material is present.`);
    showToast(`Focus armed for ${MATERIALS[target].name}.`);
  }
  function commitProspectingFace(){
    const face=state.face;
    if(!state.postgame?.completed||!face||face.prospectingCommitted)return null;
    const prepared={...emptyProspectingEffects(),...(face.preparedSupplies||{})};
    const effects={...emptyProspectingEffects(),...prepared};
    const chance=effects.prospectorKit?EXCEPTIONAL_KIT_CHANCE:EXCEPTIONAL_BASE_CHANCE;
    if(!face.exceptionalResolved){
      const exceptional=placeExceptionalOnFace(face.tiles,state.currentDepth,effects,chance);
      face.exceptionalTileIndex=exceptional?.index??null;
      face.exceptionalResolved=true;
    }
    face.prospectingEffects=effects;
    face.prospectingCommitted=true;
    const stock=state.postgame.supplies||{};
    const armed=state.postgame.armedSupplies||emptyProspectingEffects();
    ['prospectorKit','surveyChalk','collectorsFocus'].forEach(key=>{
      if(!effects[key])return;
      stock[key]=Math.max(0,(stock[key]||0)-1);
      armed[key]=false;
      if(key==='collectorsFocus')armed.focusTarget=null;
    });
    updateExceptionalChalkHint();
    markFullProspectingStack();
    checkAchievements();
    if(effects.surveyChalk){
      return Number.isInteger(face.exceptionalTileIndex)
        ? 'Survey Chalk: promising 3×3 zone marked.'
        : 'Survey Chalk: no promising signs on this face.';
    }
    return null;
  }
  function freshFaceMessage(face){
    if(state.postgame?.completed){
      const p=face?.preparedSupplies||{};
      const prepared=[p.prospectorKit&&'Kit',p.surveyChalk&&'Chalk',p.collectorsFocus&&`Focus: ${MATERIALS[p.focusTarget]?.name||'target'}`].filter(Boolean);
      if(prepared.length){
        setMineMessage('🎒','Prospecting supplies prepared.',`${prepared.join(' · ')}. Nothing is spent until you mine the first tile, so you can still change depths without losing them.`);
        return;
      }
      const a=state.postgame?.armedSupplies||{};
      if(a.prospectorKit||a.surveyChalk||a.collectorsFocus){
        setMineMessage('🎒','Supplies still armed.','They are waiting for the next fresh face.');
        return;
      }
    }
    setMineMessage('⛏️','Fresh rock face.','Read the faint geological tells, survey where it seems worthwhile, then start crunching.');
  }


  function totalFound(){ return Object.values(state.stats).reduce((sum,x)=>sum+(x.found||0),0); }
  function allDepthsMined(){ return Object.keys(DEPTHS).every(d=>(state.meta.depthsMined?.[d]||0)>0); }
  function countCollectedFamily(family){
    return Object.entries(MATERIALS).filter(([,m])=>m.family===family).reduce((sum,[k,m])=>sum+m.stages.filter(stage=>state.collection[k]?.[stage]).length,0);
  }
  function countCollectedUvMaterials(){
    return Object.keys(UV_CLASSES).filter(k=>MATERIALS[k]?.stages.some(stage=>state.collection[k]?.[stage])).length;
  }
  function isMetalTarget(k){ return !!MATERIALS[k]?.metalDetectable; }


  function weightedChoice(source){
    const entries=Array.isArray(source)?source.map(x=>[x.key,x.weight]):Object.entries(source);
    let total=entries.reduce((a,[,w])=>a+w,0),r=Math.random()*total;
    for(const [k,w] of entries){r-=w;if(r<=0)return k;}
    return entries[entries.length-1][0];
  }


  function neighbors(index){
    const r=Math.floor(index/GRID_SIZE),c=index%GRID_SIZE,out=[];
    [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].forEach(([rr,cc])=>{if(rr>=0&&rr<GRID_SIZE&&cc>=0&&cc<GRID_SIZE)out.push(rr*GRID_SIZE+cc);});
    return out;
  }


  function scanAreaIndices(index){
    const r=Math.floor(index/GRID_SIZE),c=index%GRID_SIZE,out=[];
    for(let rr=r-1;rr<=r+1;rr++){
      for(let cc=c-1;cc<=c+1;cc++){
        if(rr>=0&&rr<GRID_SIZE&&cc>=0&&cc<GRID_SIZE)out.push(rr*GRID_SIZE+cc);
      }
    }
    return out;
  }




  function exceptionalHintArea(index){
    const targetRow=Math.floor(index/GRID_SIZE),targetCol=index%GRID_SIZE;
    const centerRow=Math.max(1,Math.min(GRID_SIZE-2,targetRow));
    const centerCol=Math.max(1,Math.min(GRID_SIZE-2,targetCol));
    const out=[];
    for(let r=centerRow-1;r<=centerRow+1;r++)for(let c=centerCol-1;c<=centerCol+1;c++)out.push(r*GRID_SIZE+c);
    return out;
  }


  function normalizeFace(face){
    if(Array.isArray(face.tiles))face.tiles.forEach(t=>{if(t?.special==='geode')t.special=null;});
    if(!Array.isArray(face.hints)) face.hints = generateProspectHints(face);
    if(!face.finds) face.finds = {};
    if(!Array.isArray(face.scanHistory)) face.scanHistory = [];
    if(face.lastScan === undefined) face.lastScan = null;
    if(face.metalDetectorUsed === undefined) face.metalDetectorUsed = false;
    if(!Array.isArray(face.metalSignalTiles)) face.metalSignalTiles = [];
    if(!Array.isArray(face.exceptionalHintTiles)) face.exceptionalHintTiles = [];
    if(face.exceptionalTileIndex === undefined) face.exceptionalTileIndex = null;
    if(!face.prospectingEffects) face.prospectingEffects = emptyProspectingEffects();
    if(!face.preparedSupplies) face.preparedSupplies = emptyProspectingEffects();
    if(face.prospectingCommitted === undefined){
      // Faces saved before 1.4.4 already resolved their exceptional roll at generation
      // or when a 1.4.3 supply was used. Preserve that result without charging twice.
      face.prospectingCommitted = !!(face.prospectingEffects.prospectorKit||face.prospectingEffects.surveyChalk||face.prospectingEffects.collectorsFocus||faceHasMinedTile(face));
    }
    if(face.exceptionalResolved === undefined) face.exceptionalResolved = true;
    if(face.fullProspectingStackCounted === undefined) face.fullProspectingStackCounted = !!(face.prospectingEffects.prospectorKit&&face.prospectingEffects.surveyChalk&&face.prospectingEffects.collectorsFocus);
    if(face.fullCoverageAwarded === undefined) face.fullCoverageAwarded = false;


    if(!Array.isArray(face.scanCounts) || face.scanCounts.length!==GRID_SIZE*GRID_SIZE){
      face.scanCounts = Array(GRID_SIZE*GRID_SIZE).fill(0);
      const oldHistory = Array.isArray(face.scanHistory)?face.scanHistory:[];
      oldHistory.forEach(entry => {
        const center = typeof entry==='number'?entry:entry?.center;
        if(Number.isInteger(center)) scanAreaIndices(center).forEach(i => face.scanCounts[i]++);
      });
      if(!oldHistory.length && face.lastScan?.indices){
        face.lastScan.indices.forEach(i => {if(face.scanCounts[i]!==undefined)face.scanCounts[i]++;});
      }
    }


    if(face.scanUsesRemaining === undefined || face.scanUsesRemaining === null){
      face.scanUsesRemaining = state.upgrades.surveying>0 ? currentMaxScans() : 0;
    }else{
      face.scanUsesRemaining = Math.min(face.scanUsesRemaining,currentMaxScans());
    }
  }


  function generateProspectHints(face){
    const occupied=face.tiles.filter(t=>t.material);
    if(!occupied.length)return [];
    const count=Math.min(randInt(1,3),occupied.length);
    const pool=[...occupied];
    for(let i=pool.length-1;i>0;i--){
      const j=randInt(0,i);
      [pool[i],pool[j]]=[pool[j],pool[i]];
    }
    return pool.slice(0,count).map(t=>t.index);
  }


  function generateFace(depth){
    const tiles=Array.from({length:GRID_SIZE*GRID_SIZE},(_,i)=>({index:i,revealed:false,material:null,special:null,depositId:null,depositType:null}));
    const deposits=[];
    let nextId=0;


    function placeDeposit(material,size,type){
      for(let attempt=0;attempt<100;attempt++){
        const empty=tiles.filter(t=>!t.material);
        if(!empty.length)return false;
        const chosen=[empty[randInt(0,empty.length-1)].index],set=new Set();
        set.add(chosen[0]);
        while(chosen.length<size){
          const frontier=[];
          chosen.forEach(i=>neighbors(i).forEach(n=>{if(!set.has(n)&&!tiles[n].material&&!frontier.includes(n))frontier.push(n);}));
          if(!frontier.length)break;
          const n=frontier[randInt(0,frontier.length-1)];
          chosen.push(n);set.add(n);
        }
        if(chosen.length!==size)continue;
        const id=`d${nextId++}`;
        chosen.forEach(i=>Object.assign(tiles[i],{material,depositId:id,depositType:type}));
        deposits.push({id,material,type,size,announced:false});
        return true;
      }
      return false;
    }


    const cfg=DEPTHS[depth];
    placeDeposit(weightedChoice(cfg.materials),randInt(5,8),'large');
    for(let i=0;i<randInt(depth>=3?4:3,depth>=3?5:4);i++)placeDeposit(weightedChoice(cfg.materials),randInt(2,4),'small');
    for(let i=0;i<randInt(3,5);i++)placeDeposit(weightedChoice(cfg.materials),1,'isolated');
    if(Math.random()<(depth>=3?.32:depth===2?.27:.24))placeDeposit(weightedChoice(cfg.sideFinds),1,'side');
    if(Math.random()<(depth>=3?.085:depth===2?.055:.045))placeDeposit(weightedChoice(cfg.sideFinds),1,'side');


    const prospectingEffects=emptyProspectingEffects();
    const preparedSupplies=state.postgame?.completed?preparedSuppliesForDepth(depth):emptyProspectingEffects();


    const face={
      depth,size:GRID_SIZE,
      durability:currentPickSwings(),
      finds:{},tiles,deposits,hints:[],
      scanUsesRemaining:state.upgrades.surveying>0?currentMaxScans():0,
      scanHistory:[],scanCounts:Array(GRID_SIZE*GRID_SIZE).fill(0),lastScan:null,
      metalDetectorUsed:false,metalSignalTiles:[],fullCoverageAwarded:false,
      prospectingEffects,preparedSupplies,prospectingCommitted:false,exceptionalResolved:!state.postgame?.completed,
      exceptionalTileIndex:null,exceptionalHintTiles:[],fullProspectingStackCounted:false
    };
    face.hints=generateProspectHints(face);
    return face;
  }


  function syncMuseumUvPage(){
    document.body.classList.toggle('museum-uv-active',activePanel==='museum'&&!!state.upgrades.uvLamp&&!!state.settings.museumUv);
  }


  function switchPanel(btn){
    const target=btn.dataset.target;
    if(target==='collection'&&!state.postgame?.completed)return;
    activePanel=target;
    scanMode=false;
    document.querySelectorAll('.nav-button').forEach(b=>b.classList.toggle('active',b===btn));
    document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===target));
    if(target==='workbench')renderWorkbench();
    if(target==='museum')renderMuseum();
    if(target==='collection'){renderPostgameWorkbench();renderPersonalCollection();renderSpecimenStorage();}
    if(target==='achievements')renderAchievements();
    if(target==='upgrades')renderUpgrades();
    syncMuseumUvPage();
    renderMobileHud();
  }


  function renderPostgameAccess(){
    const unlocked=!!state.postgame?.completed;
    els.collectionNavButton?.classList.toggle('hidden',!unlocked);
    els.personalCollectionPanel?.classList.toggle('hidden',!unlocked);
    els.bottomNav?.classList.toggle('postgame-nav',unlocked);
  }


  function startNewFace(){
    scanMode=false;
    focusPickerOpen=false;
    heatWarningVisible=false;
    state.face=generateFace(state.currentDepth);
    saveState();
    freshFaceMessage(state.face);
    checkAchievements();
    renderMine();
    showToast('Fresh rock face.');
  }


  function setDepth(d){
    if(d>state.unlockedDepth||d===state.currentDepth)return;
    scanMode=false;
    focusPickerOpen=false;
    heatWarningVisible=false;
    state.currentDepth=d;
    state.face=generateFace(d);
    saveState();
    freshFaceMessage(state.face);
    checkAchievements();
    renderMine();
    showToast(`${DEPTHS[d].name} selected.`);
}


  function toggleScanMode(){
    if(state.currentDepth===6&&!state.upgrades.scannerHeatShield){showToast('The scanner needs heat-shielded housing in the Epithermal Zone.');return;}
    if(state.upgrades.surveying===0){showToast('Unlock the Field Scanner first.');return;}
    if(state.face.scanUsesRemaining<=0){showToast('No scans left on this rock face.');return;}
    scanMode=!scanMode;
    if(scanMode){
      setMineMessage('⌁','Scanner ready.','Tap any tile to scan the 3×3 area around it. Overlap a scan twice and hidden occupied tiles may show a faint density shadow.');
    }else{
      setMineMessage('⛏️','Scanner cancelled.','Back to mining.');
    }
    renderMine();
  }


  function handleTile(index){ if(scanMode)scanAt(index);else mineTile(index); }


  function scanAt(index){
    if(state.upgrades.surveying===0||state.face.scanUsesRemaining<=0)return;
    const indices=scanAreaIndices(index);
    const results=analyzeScan(indices,state.upgrades.surveying);
    const newlyDoubled=indices.filter(i=>(state.face.scanCounts[i]||0)===1).length;
    indices.forEach(i=>state.face.scanCounts[i]=(state.face.scanCounts[i]||0)+1);
    state.meta.scansUsed++;
    state.meta.doubleScans+=newlyDoubled;
    state.face.scanUsesRemaining--;
    state.face.scanHistory.push({center:index,indices});
    state.face.lastScan={center:index,indices,results};
    if(!state.face.fullCoverageAwarded && state.face.scanCounts.filter(n=>n>0).length>=50){
      state.face.fullCoverageAwarded=true;
      state.meta.fullSurveyFaces++;
    }
    scanMode=false;
    checkAchievements();
    saveState();
    setMineMessage('⌁','Scan complete.',results.length?results.map(r=>r.plain).join(' · '):'No significant signature detected.');
    renderMine();
  }




  function metalSignalZone(targetIndex){
    const targetRow=Math.floor(targetIndex/GRID_SIZE),targetCol=targetIndex%GRID_SIZE;
    const centerRow=Math.max(0,Math.min(GRID_SIZE-1,targetRow+randInt(-1,1)));
    const centerCol=Math.max(0,Math.min(GRID_SIZE-1,targetCol+randInt(-1,1)));
    const zone=[];
    for(let rr=centerRow-1;rr<=centerRow+1;rr++){
      for(let cc=centerCol-1;cc<=centerCol+1;cc++){
        if(rr>=0&&rr<GRID_SIZE&&cc>=0&&cc<GRID_SIZE)zone.push(rr*GRID_SIZE+cc);
      }
    }
    if(!zone.includes(targetIndex))zone.push(targetIndex);
    return zone;
  }


  function useMetalDetector(){
    if(state.currentDepth===6&&!state.upgrades.detectorHeatShield){showToast('The metal detector needs heat-shielded housing in the Epithermal Zone.');return;}
    if(!state.upgrades.metalDetector){showToast('Unlock the Metal Detector first.');return;}
    if(state.face.metalDetectorUsed){showToast('The metal detector has already swept this face.');return;}


    const targets=state.face.tiles.filter(t=>!t.revealed&&t.material&&isMetalTarget(t.material));
    state.face.metalDetectorUsed=true;
    state.meta.metalSweeps++;


    const selected=[];
    const shuffled=[...targets].sort(()=>Math.random()-.5);
    shuffled.forEach(tile=>{
      if(selected.length>=3)return;
      const farEnough=selected.every(other=>{
        const r1=Math.floor(tile.index/GRID_SIZE),c1=tile.index%GRID_SIZE;
        const r2=Math.floor(other.index/GRID_SIZE),c2=other.index%GRID_SIZE;
        return Math.abs(r1-r2)+Math.abs(c1-c2)>=3;
      });
      if(farEnough)selected.push(tile);
    });
    if(!selected.length && targets.length)selected.push(targets[0]);


    const marked=new Set();
    selected.forEach(tile=>metalSignalZone(tile.index).forEach(i=>marked.add(i)));
    state.face.metalSignalTiles=[...marked];


    checkAchievements();
    saveState();
    if(selected.length){
      setMineMessage('🧲','Metal sweep complete.',`${selected.length} broad signal zone${selected.length===1?'':'s'} detected. The highlighted areas are intentionally imprecise.`);
      showToast(`${selected.length} metal signal zone${selected.length===1?'':'s'} detected.`);
    }else{
      setMineMessage('🧲','Metal sweep complete.','No strong metallic targets detected on this face.');
      showToast('No strong metal signals detected.');
    }
    renderMine();
  }






  function analyzeScan(indices,level){
    const scannedTiles=indices.map(i=>state.face.tiles[i]).filter(Boolean);
    const occupied=scannedTiles.filter(t=>t.material);
    if(!occupied.length)return [{html:'No significant mineral signature detected.',plain:'No significant mineral signature detected.'}];


    const results=[];
    const side=occupied.filter(t=>['fossil','artifact'].includes(MATERIALS[t.material].family));
    const geo=occupied.filter(t=>!['fossil','artifact'].includes(MATERIALS[t.material].family));


    if(level<3){
      const groups=new Map();
      geo.forEach(tile=>{
        const sig=MATERIALS[tile.material].signature;
        if(!groups.has(sig.id))groups.set(sig.id,{sig,count:0,types:new Set()});
        const g=groups.get(sig.id);g.count++;g.types.add(tile.depositType);
      });
      [...groups.values()].sort((a,b)=>b.count-a.count).forEach(g=>{
        const strength=signalStrength(g.count);
        const chemistry=`${g.sig.label}${g.sig.formula&&g.sig.formula!=='variable'?` · ${g.sig.formula}`:''}`;
        const extra=level>=2?` · ${depositPattern(g.types)}`:'';
        results.push({html:`<strong>${strength}</strong> ${chemistry} signature${extra}`,plain:`${strength} ${chemistry} signature${extra}`});
      });
      if(side.length){
        const msg=level===1?'Unclassified anomaly detected.':'Unusual non-mineral signature detected.';
        results.push({html:`<strong>${msg}</strong>`,plain:msg});
      }
    }else{
      const groups=new Map();
      geo.forEach(tile=>{
        if(!groups.has(tile.material))groups.set(tile.material,{count:0,types:new Set()});
        const g=groups.get(tile.material);g.count++;g.types.add(tile.depositType);
      });
      [...groups.entries()].sort((a,b)=>b[1].count-a[1].count).forEach(([key,g])=>{
        const strength=signalStrength(g.count);
        const identified=isDiscovered(key)?MATERIALS[key].name:'Unknown mineral';
        results.push({html:`<strong>${strength} ${identified}</strong> signal · ${depositPattern(g.types)}`,plain:`${strength} ${identified} signal · ${depositPattern(g.types)}`});
      });
      const fossilCount=side.filter(t=>MATERIALS[t.material].family==='fossil').length;
      const artifactCount=side.filter(t=>MATERIALS[t.material].family==='artifact').length;
      if(fossilCount)results.push({html:'<strong>Fossil signature detected.</strong>',plain:'Fossil signature detected.'});
      if(artifactCount)results.push({html:'<strong>Historical-object signature detected.</strong>',plain:'Historical-object signature detected.'});
    }


    return results.length?results:[{html:'No significant mineral signature detected.',plain:'No significant mineral signature detected.'}];
  }


  function mineTile(index){
    const face=state.face,tile=face.tiles[index];
    if(!tile||tile.revealed||face.durability<=0)return;
    if(state.currentDepth===6&&!state.upgrades.geothermalGear){
      heatWarningVisible=true;
      setMineMessage('🌡️','Too hot to work safely.','You’ll need Geothermal Protective Gear before you can mine in the Epithermal Zone.');
      renderMine();
      return;
    }
    const prospectingReport=!face.prospectingCommitted?commitProspectingFace():null;
    tile.revealed=true;
    if(!state.postgame?.completed)face.durability--;
    state.meta.tilesMined++;
    state.meta.depthsMined=state.meta.depthsMined||{};
    state.meta.depthsMined[state.currentDepth]=(state.meta.depthsMined[state.currentDepth]||0)+1;


    const hadDoubleScan=(face.scanCounts?.[index]||0)>=2;
    const inMetalZone=(face.metalSignalTiles||[]).includes(index);


    if(tile.material){
      const exceptional=collectFind(tile.material,tile.exceptionalVariantId||null);
      face.finds[tile.material]=(face.finds[tile.material]||0)+1;
      if(hadDoubleScan)state.meta.anomalyFinds++;
      if(inMetalZone&&isMetalTarget(tile.material))state.meta.metalSignalFinds++;
      if(face.durability===0)state.meta.lastSwingFinds++;
      const m=MATERIALS[tile.material];
      if(exceptional){
        setMineMessage('✨','Exceptional specimen!',exceptional.label);
        showToast(`Exceptional specimen: ${exceptional.label} ✨`);
      }else{
        setMineMessage('✦',`${m.name}!`,findMessage(tile.material));
        showToast(`Found ${m.name}!`);
      }
      maybeAnnounceDeposit(tile.depositId);
    }else{
      setMineMessage('🪨','Crunch.','Nothing in that tile. Pick another spot.');
    }
    if(prospectingReport&&!tile.exceptionalVariantId)showToast(prospectingReport);


    if(face.durability<=0){
      state.meta.facesFinished++;
      setMineMessage('⛏️','Pick worn out.','That face is finished. Return to the surface for a fresh one.');
      showToast('Face finished.');
    }


    checkAchievements();
    saveState();
    renderMine();
    renderWorkbench();
  }


  function collectFind(k,exceptionalVariantId=null){
    const m=MATERIALS[k],stage=m.stages[0];
    state.stats[k].found++;
    if(!state.discovery)state.discovery=emptyDiscovery();
    if(!state.discovery[k])state.discovery[k]={discovered:false,depths:[]};
    state.discovery[k].discovered=true;
    if(!state.discovery[k].depths.includes(state.currentDepth))state.discovery[k].depths.push(state.currentDepth);
    state.discovery[k].depths.sort((a,b)=>a-b);


    if(state.postgame?.completed&&exceptionalVariantId&&exceptionalEligible(k)){
      const item=makeExceptional(k,exceptionalVariantId);
      if(item){
        state.postgame.specimenStorage.push(item);
        state.postgame.exceptionalFound++;
        if(state.face?.prospectingEffects?.collectorsFocus&&state.face.prospectingEffects.focusTarget===k){
          state.meta.focusedExceptionalFinds=(state.meta.focusedExceptionalFinds||0)+1;
        }
        return item;
      }
    }


    state.inventory[k][stage]++;
    if(canAutoProcess(k) && state.settings.autoProcessByMaterial[k])autoProcessOne(k);
    return null;
  }


  function canProcessMaterial(k){ return state.upgrades.workshop >= (MATERIALS[k].workshopRequired||0); }
  function canAutoProcess(k){ return hasProcessing(k) && isMastered(k) && canProcessMaterial(k); }


  function autoProcessOne(k){
    if(!canAutoProcess(k))return;
    const m=MATERIALS[k];
    let current=m.stages[0],guard=0;
    while(m.process?.[current] && state.inventory[k][current]>0 && guard<6){
      const next=m.process[current];
      state.inventory[k][current]--;
      state.inventory[k][next]++;
      state.stats[k].processed++;
      current=next;
      guard++;
    }
  }


  function maybeAnnounceDeposit(id){
    const d=state.face.deposits.find(x=>x.id===id);
    if(!d||d.announced||['isolated','side'].includes(d.type))return;
    const count=state.face.tiles.filter(t=>t.depositId===id&&t.revealed).length;
    const threshold=d.type==='large'?3:2;
    if(count>=threshold){
      d.announced=true;
      showToast(`${d.type==='large'?'Rich vein':'Vein'} discovered: ${MATERIALS[d.material].name}`);
    }
  }


  function findMessage(k){
    return ({
      quartz:'A quartz specimen. Common does not mean useless.',
      amethyst:'Purple quartz. There may be more nearby.',
      hematite:'Hematite: an iron ore. Refine it or keep the natural specimen.',
      chalcopyrite:'Chalcopyrite: a copper-bearing ore.',
      garnet:'A garnet specimen from the Lower Works.',
      topaz:'Topaz. Hard, bright, and worth handling carefully.',
      pyrite:'Pyrite. Metallic, brassy, and absolutely not failed gold.',
      citrine:'Citrine: warm-coloured quartz from the Deep Gallery.',
      calcite:'Calcite. Common, important, and much softer than quartz.',
      fluorite:'Fluorite. Cubic crystals, wild colours, and an excellent UV-lamp favourite.',
      aquamarine:'Aquamarine: blue-green beryl. Your cutter will need serious equipment for this one.',
      sapphire:'Sapphire: gem corundum, and one of the hardest common gemstones.',
      roseQuartz:'Rose quartz: another member of the quartz family, this time in pink.',
      malachite:'Malachite: vivid green copper mineral with unmistakable banding.',
      ruby:'Ruby: red corundum. Same mineral family as sapphire, very different colour.',
      emerald:'Emerald: green beryl, the same mineral family as aquamarine.',
      cassiterite:'Cassiterite: the principal ore of tin.',
      galena:'Galena: dense, metallic lead ore with a habit of forming cubes.',
      sphalerite:'Sphalerite: the principal ore of zinc.',
      scheelite:'Scheelite: tungsten ore with a famous blue-white UV surprise.',
      willemite:'Willemite. Under UV, some specimens glow an absurd green; fluorescence does not mean radioactivity.',
      hackmanite:'Hackmanite: a sodalite relative that can temporarily change colour after UV exposure.',
      apatite:'Apatite. Mohs hardness 5, and extremely good at impersonating other minerals.',
      opal:'Opal: hydrated silica, technically a mineraloid rather than a true mineral.',
      diamond:'Diamond: crystalline carbon from far deeper conditions, carried upward by ancient volcanic activity.',
      obsidian:'Obsidian: volcanic glass, frozen before crystals had time to grow.',
      olivine:'Olivine. If this material is gem-quality, the cut stone gets another name: peridot.',
      nativeSulfur:'Native sulfur: unmistakably yellow elemental sulfur from a geothermal environment.',
      rhodochrosite:'Rhodochrosite: pink manganese carbonate from a hydrothermal vein.',
      adularia:'Adularia: low-temperature potassium feldspar and a classic clue to some epithermal systems.',
      acanthite:'Acanthite: silver sulfide. There is actual silver hiding in that dark ore.',
      nativeGold:'Native gold. No cartoon gold ore required; sometimes the metal occurs as itself.',
      fernImpression:'A fern impression: plant life preserved as a delicate pattern in stone.',
      surveyCompass:'A brass survey compass. Someone was mapping these workings long before you.',
      trilobite:'A fossil! The Fossil Wing would like a word.',
      ammonite:'An ammonite! A coiled fossil from an ancient sea.',
      crinoidStem:'A crinoid stem fossil: a little piece of an ancient marine animal.',
      brachiopod:'A brachiopod fossil. Clam-shaped, but definitely not a clam.',
      belemnite:'A belemnite guard: the bullet-shaped fossil of an extinct squid-like animal.',
      miningTag:'A historical mining tag. Someone worked this ground before you.',
      miningLamp:'An old mining lamp. A piece of the mine’s human history survived down here.',
      surveyMarker:'A worn survey marker. Somebody mapped this place long before you.',
      drillBit:'An old drill bit. Hard-rock mining leaves hardware behind.',
      railSpike:'An old rail spike from the mine’s haulage system. The detector earned that beep.'
    })[k]||'Something interesting came out of the rock.';
  }


  function setMineMessage(icon,title,body){
    els.mineMessage.innerHTML=`<span class="message-icon">${icon}</span><div><strong>${title}</strong><p>${body}</p></div>`;
  }


  function renderAll(){
    renderPostgameAccess();renderMine();renderWorkbench();renderMuseum();renderPostgameWorkbench();renderPersonalCollection();renderSpecimenStorage();renderAchievements();renderUpgrades();renderMobileHud();
  }


  function renderMine(){
    const f=state.face,max=currentPickSwings();
    els.depthName.textContent=DEPTHS[state.currentDepth].name;
    els.depthNumber.textContent=`Depth ${state.currentDepth}`;
    els.durability.textContent=state.postgame?.completed?'∞':f.durability;
    els.maxDurability.textContent=state.postgame?.completed?'∞':max;
    els.durabilityMeter.style.width=state.postgame?.completed?'100%':`${Math.max(0,f.durability/max*100)}%`;
    if(els.depthFieldNote)els.depthFieldNote.innerHTML=`<span class="status-label">Field note</span><p>${DEPTHS[state.currentDepth].note}</p>`;
    els.mineBoard.classList.toggle('epithermal-board',state.currentDepth===6);
    els.surveyLevel.textContent=SURVEY_LEVELS[state.upgrades.surveying].name;
    els.mineBalance.textContent=formatMoney(state.credits);
    els.scanUseSummary.textContent=state.currentDepth===6&&!state.upgrades.scannerHeatShield?'heat shield required':state.upgrades.surveying>0?`${f.scanUsesRemaining}/${currentMaxScans()} scans left`:'locked';
    renderDepthSelector();renderSurvey();renderMetalDetector();renderProspectingTools();renderBoard();renderFaceFinds();renderMobileHud();
  }


  function renderDepthSelector(){
    els.depthSelector.innerHTML='';
    Object.keys(DEPTHS).forEach(x=>{
      const d=Number(x),b=document.createElement('button');
      b.type='button';b.className=`depth-chip ${d===state.currentDepth?'active':''}`;b.disabled=d>state.unlockedDepth;
      b.textContent=d<=state.unlockedDepth?`Depth ${d} · ${DEPTHS[d].name}`:`Depth ${d} · Locked`;
      b.addEventListener('click',()=>setDepth(d));els.depthSelector.appendChild(b);
    });
  }


  function renderSurvey(){
    const level=state.upgrades.surveying,f=state.face;
    els.scanButton.classList.toggle('active',scanMode);


    if(state.currentDepth===6&&!state.upgrades.scannerHeatShield){
      els.scanButton.disabled=true;
      els.scanButton.querySelector('strong').textContent='Scan area';
      els.scanButtonStatus.textContent='Needs heat shield';
      return;
    }


    if(level===0){
      els.scanButton.disabled=true;
      els.scanButton.querySelector('strong').textContent='Scan area';
      els.scanButtonStatus.textContent='Locked';
      return;
    }


    els.scanButton.disabled=f.scanUsesRemaining<=0;
    els.scanButton.querySelector('strong').textContent=scanMode?'Cancel scan':'Scan area';
    els.scanButtonStatus.textContent=scanMode?`Tap a tile · ${f.scanUsesRemaining} left`:`${f.scanUsesRemaining}/${currentMaxScans()} scans`;
  }


  function renderMetalDetector(){
    if(state.currentDepth===6&&!state.upgrades.detectorHeatShield){
      els.metalDetectorButton.disabled=true;
      els.metalDetectorButton.querySelector('strong').textContent='Sweep face';
      els.detectorButtonStatus.textContent='Needs heat shield';
      return;
    }
    if(!state.upgrades.metalDetector){
      els.metalDetectorButton.disabled=true;
      els.metalDetectorButton.querySelector('strong').textContent='Sweep face';
      els.detectorButtonStatus.textContent='Locked';
      return;
    }


    const used=!!state.face.metalDetectorUsed;
    els.metalDetectorButton.disabled=used;
    els.metalDetectorButton.querySelector('strong').textContent='Sweep face';
    els.detectorButtonStatus.textContent=used?'Used this face':'1/1 sweep';
  }


  function renderProspectingTools(){
    if(!els.postgameProspectingTools)return;
    const unlocked=!!state.postgame?.completed;
    els.postgameProspectingTools.classList.toggle('hidden',!unlocked);
    els.collectorFocusPicker?.classList.toggle('hidden',!unlocked||!focusPickerOpen);
    if(!unlocked)return;
    const stock=state.postgame.supplies||{};
    const armed=state.postgame.armedSupplies||emptyProspectingEffects();
    const prepared=(!state.face?.prospectingCommitted&&state.face?.preparedSupplies)||emptyProspectingEffects();
    const setButton=(button,status,key,extra='')=>{
      const count=stock[key]||0,isArmed=!!armed[key],isPrepared=!!prepared[key];
      button.classList.toggle('armed',isArmed);
      button.classList.toggle('prepared',isPrepared);
      button.classList.remove('used');
      button.disabled=!isArmed&&count<1;
      if(isPrepared)status.textContent=key==='prospectorKit'?'Ready · 30%':key==='surveyChalk'?'Ready · on first dig':`Ready · ${MATERIALS[prepared.focusTarget]?.name||'target'}`;
      else if(isArmed)status.textContent=key==='collectorsFocus'?`Armed · ${MATERIALS[armed.focusTarget]?.name||'target'}`:'Armed · next face';
      else status.textContent=`${count} owned${extra}`;
    };
    setButton(els.prospectorKitButton,els.prospectorKitStatus,'prospectorKit',' · 30%');
    setButton(els.surveyChalkButton,els.surveyChalkStatus,'surveyChalk');
    setButton(els.collectorsFocusButton,els.collectorsFocusStatus,'collectorsFocus');
    if(els.collectorFocusMineSelect){
      const eligible=exceptionalKeysForDepth(state.currentDepth);
      const prior=els.collectorFocusMineSelect.value;
      els.collectorFocusMineSelect.innerHTML=eligible.map(k=>`<option value="${k}">${MATERIALS[k].name}</option>`).join('');
      const preferred=armed.focusTarget&&eligible.includes(armed.focusTarget)?armed.focusTarget:prior;
      if(eligible.includes(preferred))els.collectorFocusMineSelect.value=preferred;
      els.applyCollectorFocusButton.disabled=!eligible.length||(stock.collectorsFocus||0)<1;
      els.applyCollectorFocusButton.textContent='Arm Focus';
    }
  }




  function buildIcon(key,forTile=false,stage=null){
    const m=MATERIALS[key],wrap=document.createElement('span');
    wrap.className=forTile?'tile-sprite sprite-wrap':'material-icon sprite-wrap';
    const img=document.createElement('img');
    img.className='sprite-image';img.src=miniSpriteSrc(key);img.alt='';img.loading='lazy';img.decoding='async';
    wrap.appendChild(img);
    return wrap;
  }

  function buildDetailSprite(key,stage){
    const img=document.createElement('img');
    img.className='detail-sprite';img.src=detailSpriteSrc(key,stage);img.alt='';img.loading='lazy';img.decoding='async';
    if(UV_CLASSES[key])img.classList.add('uv-reactive',UV_CLASSES[key]);
    return img;
  }

  function buildExceptionalSprite(item,compact=false){
    const img=document.createElement('img');
    img.className=`exceptional-sprite${compact?' compact':''}`;img.src=exceptionalSpriteSrc(item);img.alt='';img.loading='lazy';img.decoding='async';
    return img;
  }


  function renderBoard(){
    els.mineBoard.innerHTML='';
    const hints=new Set(state.face.hints||[]);


    state.face.tiles.forEach(t=>{
      const b=document.createElement('button');
      b.type='button';b.className='rock';b.setAttribute('aria-label',`Mine tile ${t.index+1}`);
      const scans=state.face.scanCounts?.[t.index]||0;
if(scans>=1)b.classList.add('scan-area');
      if(scans>=2)b.classList.add('scan-overlap');
      if((state.face.metalSignalTiles||[]).includes(t.index)&&!t.revealed)b.classList.add('metal-signal');
      if((state.face.exceptionalHintTiles||[]).includes(t.index)&&!t.revealed)b.classList.add('exceptional-zone-hint');
      if(scanMode)b.classList.add('scan-selectable');


      if(t.revealed){
        b.classList.add('revealed');
        if(t.material){
          b.classList.add('find');
          if(t.exceptionalVariantId)b.classList.add('exceptional-find-tile');
          const i=buildIcon(t.material,true);i.classList.remove('material-icon');i.classList.add('tile-find');b.appendChild(i);
          if(t.exceptionalVariantId){const mark=document.createElement('span');mark.className='exceptional-find-mark';mark.textContent='✦';mark.setAttribute('aria-hidden','true');b.appendChild(mark);}
          b.setAttribute('aria-label',`Revealed ${t.exceptionalVariantId?'exceptional ':''}${MATERIALS[t.material].name}`);
        }else{
          b.classList.add('empty');b.setAttribute('aria-label','Revealed empty rock');
        }
        if(!scanMode)b.disabled=true;
      }else{
        if(hints.has(t.index)){
          const mark=document.createElement('span');mark.className='prospect-mark';mark.setAttribute('aria-hidden','true');b.appendChild(mark);
        }
        if(scans>=2&&t.material){
          const shadow=document.createElement('span');shadow.className='scan-anomaly-shadow';shadow.setAttribute('aria-hidden','true');b.appendChild(shadow);
        }
        b.disabled=!scanMode&&state.face.durability<=0;
      }


      if(!b.disabled)b.addEventListener('click',()=>handleTile(t.index));
      els.mineBoard.appendChild(b);
    });


    if(heatWarningVisible&&state.currentDepth===6&&!state.upgrades.geothermalGear){
      const warning=document.createElement('div');
      warning.className='mine-heat-warning';
      warning.setAttribute('role','status');
      warning.innerHTML='<strong>🌡️ Too hot to mine safely</strong><span>Geothermal Protective Gear required.</span>';
      els.mineBoard.appendChild(warning);
    }
  }


  function renderFaceFinds(){
    const list=Object.entries(state.face.finds).filter(([,n])=>n>0);
    els.faceFinds.innerHTML='';
    if(!list.length){
      const empty=document.createElement('span');empty.className='face-find-empty';empty.textContent='Nothing yet';els.faceFinds.appendChild(empty);return;
    }
    list.forEach(([k,n])=>{
      const pill=document.createElement('span');pill.className='face-find-pill';pill.textContent=`${MATERIALS[k].name} ×${n}`;els.faceFinds.appendChild(pill);
    });
  }


  function renderMobileHud(){
    if(!els.mobileMineHud)return;
    els.mobileMineHud.classList.toggle('hidden',activePanel!=='mine');
    const max=currentPickSwings();
    els.mobileDurability.textContent=state.postgame?.completed?'⛏️ ∞ · gilded steel':`⛏️ ${state.face.durability} / ${max}`;
    els.mobileScans.textContent=state.upgrades.surveying>0?`⌁ ${state.face.scanUsesRemaining} / ${currentMaxScans()}`:'⌁ locked';
  }


  function renderWorkbench(){
    const discoveredCount=Object.keys(MATERIALS).filter(k=>isDiscovered(k)).length;
    const totalSubjects=Object.keys(MATERIALS).length;
    if(els.workbenchDiscoveryCount){
      els.workbenchDiscoveryCount.textContent=`${discoveredCount} / ${totalSubjects} specimens discovered${discoveredCount===totalSubjects?' ✦':''}`;
      els.workbenchDiscoveryCount.closest('.workbench-discovery-card')?.classList.toggle('complete',discoveredCount===totalSubjects);
    }
    const bulk=masteredSellSummary();
    if(els.masteredSellValue)els.masteredSellValue.textContent=`${formatMoney(bulk.value)} · ${bulk.items} item${bulk.items===1?'':'s'}`;
    if(els.sellAllMasteredButton){
      els.sellAllMasteredButton.disabled=bulk.items<1;
      els.sellAllMasteredButton.textContent=bulk.items>0?`Sell All · ${formatMoney(bulk.value)}`:'Sell All';
    }


    els.workbenchList.innerHTML='';
    const discoveredEntries=Object.entries(MATERIALS).filter(([k])=>isDiscovered(k));
    if(!discoveredEntries.length){
      els.workbenchList.innerHTML='<div class="workbench-empty"><strong>Your field notebook is empty.</strong><p>Find your first specimen in the mine and its Workbench entry will appear here.</p></div>';
      return;
    }
    discoveredEntries.forEach(([k,m])=>{
      const stock=totalInventory(k),mastered=isMastered(k),silverMastered=mastered&&['fossil','artifact'].includes(m.family);
      const card=document.createElement('article');
      card.className=`workbench-card ${openWorkbenchKey===k?'open':''} ${stock>0?'has-stock':''} ${mastered?(silverMastered?'silver-mastered':'mastered'):''}`;


      const toggle=document.createElement('button');
      toggle.type='button';toggle.className='accordion-toggle';toggle.setAttribute('aria-expanded',openWorkbenchKey===k?'true':'false');


      const alert=document.createElement('span');
      alert.className=`inventory-alert ${stock>0?'visible':''}`;
      alert.textContent=stock>0?`✦ ${stock}`:'';
      alert.setAttribute('aria-hidden',stock>0?'false':'true');
      toggle.appendChild(alert);


      toggle.appendChild(buildIcon(k));


      const main=document.createElement('div');main.className='accordion-main';
      main.innerHTML=`<h3>${m.name}</h3><div class="material-depths"><span>⌖</span> Found at: <strong>${depthKnowledgeText(k)}</strong></div><div class="summary-chips">${m.stages.map(s=>`<span class="summary-chip">${m.stageLabels[s]} ${state.inventory[k][s]} · ${formatMoney(m.prices[s])}</span>`).join('')}</div>`;
      toggle.appendChild(main);


      const chev=document.createElement('span');chev.className='chevron';chev.textContent='⌄';toggle.appendChild(chev);
      toggle.addEventListener('click',()=>{openWorkbenchKey=openWorkbenchKey===k?null:k;renderWorkbench();});
      card.appendChild(toggle);


      const details=document.createElement('div');details.className='workbench-details';details.innerHTML=workbenchDetails(k);card.appendChild(details);
      els.workbenchList.appendChild(card);
    });


    els.workbenchList.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',workbenchAction));
  }


  function renderPostgameWorkbench(){
    if(!els.postgameWorkbench)return;
    if(!state.postgame?.completed){els.postgameWorkbench.classList.add('hidden');els.postgameWorkbench.innerHTML='';return;}
    els.postgameWorkbench.classList.remove('hidden');
    const storage=state.postgame.specimenStorage||[];
    const displayed=(state.postgame.personalSlots||[]).filter(Boolean).length;
    els.postgameWorkbench.innerHTML=`
      <div class="collection-overview">
        <div class="collection-mini-stat"><span class="status-label">Specimen Storage</span><strong>${storage.length}</strong></div>
        <div class="collection-mini-stat"><span class="status-label">On display</span><strong>${displayed} / 21</strong></div>
        <div class="collection-mini-stat"><span class="status-label">Exceptional finds</span><strong>${state.postgame.exceptionalFound||0}</strong></div>
      </div>`;
  }

  function renderSpecimenStorage(){
    if(!els.specimenStorageSection)return;
    if(!state.postgame?.completed){els.specimenStorageSection.classList.add('hidden');els.specimenStorageSection.innerHTML='';return;}
    els.specimenStorageSection.classList.remove('hidden');
    const storage=state.postgame.specimenStorage||[];
    const groups=new Map();
    storage.forEach(item=>{
      const key=item.key||'unknown';
      if(!groups.has(key))groups.set(key,[]);
      groups.get(key).push(item);
    });
    const sorted=[...groups.entries()].sort((a,b)=>(MATERIALS[a[0]]?.name||a[0]).localeCompare(MATERIALS[b[0]]?.name||b[0]));
    els.specimenStorageSection.innerHTML=`<div class="postgame-vault-heading"><div><span class="status-label">Keep as many as you like</span><strong>Specimen Storage</strong></div><span>${storage.length} kept</span></div><p class="vault-help">Open a material drawer when you want to inspect, display, or sell one of its exceptional specimens. There is no completion percentage.</p>`;
    const host=document.createElement('div');host.className='storage-drawers';els.specimenStorageSection.appendChild(host);
    if(!storage.length){host.innerHTML='<div class="vault-empty">Nothing stored yet. The mine is still full of rocks with opinions.</div>';return;}
    sorted.forEach(([key,items])=>{
      const drawer=document.createElement('details');drawer.className='storage-drawer';drawer.open=openStorageKeys.has(key);
      drawer.addEventListener('toggle',()=>{if(drawer.open)openStorageKeys.add(key);else openStorageKeys.delete(key);});
      const summary=document.createElement('summary');
      const icon=document.createElement('span');icon.className='storage-drawer-icon';if(MATERIALS[key])icon.appendChild(buildIcon(key));else icon.textContent='✦';
      const title=document.createElement('span');title.className='storage-drawer-title';title.innerHTML=`<strong>${MATERIALS[key]?.name||'Exceptional specimens'}</strong><small>${items.length} specimen${items.length===1?'':'s'}</small>`;
      const chev=document.createElement('span');chev.className='storage-drawer-chevron';chev.textContent='⌄';
      summary.append(icon,title,chev);drawer.appendChild(summary);
      const rows=document.createElement('div');rows.className='storage-drawer-rows';
      items.forEach(item=>{
        const value=specialItemSellValue(item),row=document.createElement('div');row.className='storage-specimen-row';
        const rowIcon=document.createElement('div');rowIcon.className='storage-specimen-icon';rowIcon.appendChild(buildExceptionalSprite(item,true));
        const copy=document.createElement('div');copy.className='storage-specimen-copy';
        const foundDepth=item.foundDepth&&DEPTHS[item.foundDepth]?`Depth ${item.foundDepth} · ${DEPTHS[item.foundDepth].name}`:'Postgame find';
        let foundDate='';
        try{if(item.foundAt)foundDate=new Date(item.foundAt).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});}catch{foundDate='';}
        copy.innerHTML=`<strong>${item.label}</strong><span>${foundDepth} · ${formatMoney(value)}</span><div class="storage-inspect-detail hidden"><img class="storage-inspect-image" src="${exceptionalSpriteSrc(item)}" alt="" loading="lazy">${foundDate?`<span>Found ${foundDate}</span>`:''}<p>${item.detail||'An unusually fine example worth keeping because rocks are cool.'}</p></div>`;
        const actions=document.createElement('div');actions.className='storage-specimen-actions';
        const inspect=document.createElement('button');inspect.type='button';inspect.className='mini-button';inspect.textContent='Inspect';inspect.addEventListener('click',()=>{const detail=copy.querySelector('.storage-inspect-detail');detail.classList.toggle('hidden');inspect.textContent=detail.classList.contains('hidden')?'Inspect':'Close';});
        const display=document.createElement('button');display.type='button';display.className='mini-button personal-display';display.textContent='Display';display.disabled=firstEmptyPersonalSlot()<0;display.addEventListener('click',()=>displayStoredSpecimen(item.id));
        const sell=document.createElement('button');sell.type='button';sell.className='mini-button vault-sell';sell.textContent='Sell';sell.addEventListener('click',()=>sellStoredSpecimen(item.id));
        actions.append(inspect,display,sell);row.append(rowIcon,copy,actions);rows.appendChild(row);
      });
      drawer.appendChild(rows);host.appendChild(drawer);
    });
  }

  function buyProspectingSupply(key){
    const cfg=PROSPECTING_SUPPLIES[key];
    if(!state.postgame?.completed||!cfg||state.credits<cfg.cost)return;
    state.credits-=cfg.cost;
    state.postgame.supplies[key]=(state.postgame.supplies[key]||0)+1;
    saveState();renderAll();showToast(`${cfg.label} added to your supplies.`);
  }


  function sellStoredSpecimen(id){
    const i=(state.postgame.specimenStorage||[]).findIndex(x=>x.id===id);if(i<0)return;
    const item=state.postgame.specimenStorage[i],value=specialItemSellValue(item);if(value<1)return;
    state.postgame.specimenStorage.splice(i,1);
    state.postgame.exceptionalSold=(state.postgame.exceptionalSold||0)+1;
state.credits+=value;
    checkAchievements();saveState();renderAll();showToast(`${item.label} sold for ${formatMoney(value)}.`);
  }


  function displayStoredSpecimen(id){
    const slot=firstEmptyPersonalSlot();if(slot<0){showToast('Personal Collection is full. Remove something first.');return;}
    const i=state.postgame.specimenStorage.findIndex(x=>x.id===id);if(i<0)return;
    state.postgame.personalSlots[slot]=state.postgame.specimenStorage.splice(i,1)[0];
    checkAchievements();saveState();renderAll();showToast('Added to the display case.');
  }


  function removePersonalSlot(index){
    const item=state.postgame.personalSlots[index];if(!item)return;
    state.postgame.personalSlots[index]=null;
    if(item.kind==='exceptional')state.postgame.specimenStorage.push(item);
    saveState();renderAll();showToast('Returned to Specimen Storage.');
  }


  function renderPersonalCollection(){
    if(!els.personalCollectionSection||!els.personalCollectionGrid)return;
    if(!state.postgame?.completed){els.personalCollectionSection.classList.add('hidden');return;}
    els.personalCollectionSection.classList.remove('hidden');
    els.personalCollectionGrid.innerHTML='';
    state.postgame.personalSlots.forEach((item,index)=>{
      const slot=document.createElement('div');slot.className=`personal-slot ${item?'filled':''}`;
      if(!item){slot.innerHTML=`<span class="personal-slot-number">${String(index+1).padStart(2,'0')}</span><span class="personal-empty">Empty display</span>`;}
      else{
        const visual=document.createElement('div');visual.className='personal-slot-visual';
        visual.appendChild(buildExceptionalSprite(item));
        const copy=document.createElement('div');copy.className='personal-slot-copy';copy.innerHTML=`<strong>${item.label}</strong><span>Exceptional ${MATERIALS[item.key]?.name||'specimen'}</span>`;
        const remove=document.createElement('button');remove.type='button';remove.className='mini-button';remove.textContent='Store';remove.addEventListener('click',()=>removePersonalSlot(index));
        slot.append(visual,copy,remove);
      }
      els.personalCollectionGrid.appendChild(slot);
    });
  }


  function checkGameCompletion(){
    if(state.postgame?.completed||!isMuseumComplete())return false;
    state.postgame.completed=true;
    state.postgame.completedAt=new Date().toISOString();
    state.postgame.completionSeen=false;
    state.upgrades.scannerHeatShield=true;
    state.upgrades.detectorHeatShield=true;
    state.face=generateFace(state.currentDepth);
    checkAchievements();
    saveState();
    return true;
  }


  function completionDate(){
    if(!state.postgame?.completedAt)return 'Completed';
    try{return new Date(state.postgame.completedAt).toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});}catch{return 'Completed';}
  }


  function renderCompletionPlaque(){
    if(!els.completionPlaque)return;
    if(!state.postgame?.completed){els.completionPlaque.classList.add('hidden');els.completionPlaque.innerHTML='';return;}
    els.completionPlaque.classList.remove('hidden');
    els.completionPlaque.innerHTML=`<div><span class="status-label">Permanent museum plaque</span><strong>🏆 True Rockhound</strong><p>Collection completed ${completionDate()} · ${state.meta.tilesMined.toLocaleString()} rock tiles mined · ${totalFound().toLocaleString()} specimens found</p></div><button id="reopenCompletionButton" class="secondary-button" type="button">View rewards</button>`;
    els.completionPlaque.querySelector('#reopenCompletionButton')?.addEventListener('click',openCompletionModal);
  }


  function openCompletionModal(){
    if(!state.postgame?.completed||!els.completionModal)return;
    els.completionBody.innerHTML=`
      <p>Every required museum specimen has been collected. Every depth has been opened.</p>
      <p><strong>You are officially a true Rockhound.</strong></p>
      <p><strong>You earned every bit of this. Nothing resets. Nothing gets taken away.</strong></p>
      <div class="completion-rewards">
        <div>🏆 <strong>Museum Completion Plaque</strong><span>A permanent record that you actually finished.</span></div>
        <div>⛏️ <strong>Gilded Steel Pickaxe</strong><span>Effectively unbreakable. We considered solid gold. Gold is soft, heavy, and a terrible pickaxe material.</span></div>
        <div>🖼️ <strong>Personal Collection</strong><span>A new postgame tab with unlimited Specimen Storage plus thirty display spaces. No checklist. No percentage. Your rocks, your rules.</span></div>
        <div>✨ <strong>Exceptional Specimens</strong><span>Curated, unusually beautiful versions of familiar minerals can now appear throughout every depth.</span></div>
        <div>🎒 <strong>Prospecting Supplies</strong><span>Optional consumables let you improve the odds, mark a vague promising zone, or focus your hunt toward a favourite mineral. They stack, and exceptional specimens can still appear without them.</span></div>
        <div>🌋 <strong>Postgame Prospecting</strong><span>Every depth stays open. There is nothing left you have to find.</span></div>
      </div>
      <p class="completion-line"><strong>There's nothing left you have to find.</strong><br>But there's always another rock.</p>
      <div class="avery-thanks"><span class="status-label">One more thing</span><p>Thanks for sticking with Rockhound all the way to the bottom. I made this game because rocks are cool, learning things is fun, and I wanted an incremental game that actually lets you finish.</p><p><strong>I'm really glad you played. 🩵</strong></p><span>— Avery</span></div>`;
    els.completionModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }


  function closeCompletionModal(){
    if(!els.completionModal)return;
    els.completionModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    state.postgame.completionSeen=true;
    saveState();renderAll();showToast('Postgame unlocked. Rock still go crunch. ✦');
  }


  function workbenchDetails(k){
    const m=MATERIALS[k],s=state.stats[k],mastered=isMastered(k);
    let automation='';
    if(hasProcessing(k)){
      if(mastered){
        const on=!!state.settings.autoProcessByMaterial[k];
        const equipmentReady=canProcessMaterial(k);
        automation=`<div class="material-auto-footer ${equipmentReady?'':'locked'}"><div><strong>Auto-process</strong><span>${equipmentReady?'New finds → highest available stage.':`Needs ${WORKSHOP_LEVELS[m.workshopRequired||0].name}.`}</span></div><button class="toggle-switch ${on&&equipmentReady?'on':''}" data-action="toggle-auto" data-material="${k}" type="button" aria-label="Toggle ${m.name} auto-process" aria-pressed="${on&&equipmentReady?'true':'false'}" ${equipmentReady?'':'disabled'}></button></div>`;
      }else{
        automation=`<div class="material-auto-footer locked"><div><strong>Auto-process</strong><span>Unlocks when this museum set is complete.</span></div></div>`;
      }
    }


    const rows=m.stages.map(stage=>{
      const count=state.inventory[k][stage],next=m.process?.[stage],can=canProcessMaterial(k),donated=state.collection[k][stage];
      return `<div class="stage-row"><div class="stage-art"><img src="${detailSpriteSrc(k,stage)}" alt="" loading="lazy" decoding="async"></div><div class="stage-copy"><strong>${m.stageLabels[stage]} · ${count} owned</strong><span>${formatMoney(m.prices[stage])} each</span>${next&&!can?`<span class="process-lock">Needs ${WORKSHOP_LEVELS[m.workshopRequired||0].name}</span>`:''}</div><div class="stage-actions">${next?`<button class="mini-button accent" data-action="process" data-material="${k}" data-stage="${stage}" ${count<1||!can?'disabled':''}>${m.processLabels[stage]}</button>`:''}<button class="mini-button donate" data-action="donate" data-material="${k}" data-stage="${stage}" ${count<1||donated?'disabled':''}>${donated?'In museum':'Donate'}</button><button class="mini-button" data-action="sell" data-material="${k}" data-stage="${stage}" ${count<1?'disabled':''}>Sell ${formatMoney(m.prices[stage])}</button></div></div>`;
    }).join('');


    return `<p class="material-subtitle">${m.subtitle}</p><div class="stats-grid"><div class="stat-box"><span>Found</span><strong>${s.found}</strong></div><div class="stat-box"><span>Sold</span><strong>${s.sold}</strong></div><div class="stat-box"><span>Donated</span><strong>${s.donated}</strong></div><div class="stat-box"><span>Processed</span><strong>${s.processed}</strong></div><div class="stat-box"><span>Earned</span><strong>${formatMoney(s.earned)}</strong></div></div>${rows}${automation}`;
  }


  function workbenchAction(e){
    const b=e.currentTarget,k=b.dataset.material,stage=b.dataset.stage;
    if(b.dataset.action==='process')processOne(k,stage);
    if(b.dataset.action==='donate')donateOne(k,stage);
    if(b.dataset.action==='sell')sellOne(k,stage);
    if(b.dataset.action==='toggle-auto')toggleAutoProcess(k);
  }


  function processOne(k,stage){
    const m=MATERIALS[k],next=m.process?.[stage];
    if(!next||!canProcessMaterial(k)||state.inventory[k][stage]<1)return;
    state.inventory[k][stage]--;state.inventory[k][next]++;state.stats[k].processed++;
    checkAchievements();saveState();renderWorkbench();renderAchievements();showToast(`${m.name}: ${m.stageLabels[stage]} → ${m.stageLabels[next]}`);
  }


  function donateOne(k,stage){
    if(state.collection[k][stage]||state.inventory[k][stage]<1)return;
    const wasMastered=isMastered(k);
    state.inventory[k][stage]--;state.collection[k][stage]=true;state.stats[k].donated++;
    const nowMastered=isMastered(k);
    if(!wasMastered&&nowMastered&&hasProcessing(k))state.settings.autoProcessByMaterial[k]=true;
    checkAchievements();
    const justCompleted=checkGameCompletion();
    saveState();renderAll();
    if(justCompleted){openCompletionModal();return;}
    if(!wasMastered&&nowMastered){
      showToast(hasProcessing(k)?`${MATERIALS[k].name} collection complete — auto-process unlocked ✦`:`${MATERIALS[k].name} collection complete ✦`);
    }else{
      showToast(`${MATERIALS[k].name} added to the museum ✦`);
    }
  }


  function sellOne(k,stage){
    if(state.inventory[k][stage]<1)return;
    const value=MATERIALS[k].prices[stage];
    state.inventory[k][stage]--;state.credits+=value;state.stats[k].sold++;state.stats[k].earned+=value;
    checkAchievements();saveState();renderAll();showToast(`Sold for ${formatMoney(value)}.`);
  }


  function sellAllMastered(){
    const bulk=masteredSellSummary();
    if(bulk.items<1)return;


    let sold=0,value=0;
    Object.entries(MATERIALS).forEach(([k,m])=>{
      if(!isBulkSellEligible(k))return;
      m.stages.forEach(stage=>{
        const qty=state.inventory[k][stage]||0;
        if(qty<1)return;
        const stageValue=qty*(m.prices[stage]||0);
        state.inventory[k][stage]=0;
        state.stats[k].sold+=qty;
        state.stats[k].earned+=stageValue;
        sold+=qty;
        value+=stageValue;
      });
    });


    state.credits+=value;
    state.meta.sellAllUses++;
    checkAchievements();
    saveState();renderAll();
    showToast(`Sold ${sold} bulk-sell item${sold===1?'':'s'} for ${formatMoney(value)}.`);
  }


  function toggleAutoProcess(k){
    if(!canAutoProcess(k))return;
    state.settings.autoProcessByMaterial[k]=!state.settings.autoProcessByMaterial[k];
    saveState();renderWorkbench();showToast(`${MATERIALS[k].name} auto-process ${state.settings.autoProcessByMaterial[k]?'on':'off'}.`);
  }


  function isMastered(k){
    const m=MATERIALS[k];
    const complete=m.stages.every(stage=>!!state.collection[k][stage]);
    return complete && (!!m.mastery || m.family==='fossil' || m.family==='artifact');
  }


  function setMuseumLighting(useUv){
    if(useUv&&!state.upgrades.uvLamp)return;
    const switchingOn=!!useUv&&!state.settings.museumUv;
    state.settings.museumUv=!!useUv;
    if(switchingOn)state.meta.uvViews=(state.meta.uvViews||0)+1;
    checkAchievements();
    saveState();
    renderMuseum();
  }


  function renderMuseum(){
    els.museumWings.innerHTML='';
const uvAvailable=!!state.upgrades.uvLamp;
    els.museumLighting.classList.toggle('hidden',!uvAvailable);
    if(!uvAvailable)state.settings.museumUv=false;
    els.museumWings.classList.toggle('uv-mode',uvAvailable&&state.settings.museumUv);
    els.normalLightButton.classList.toggle('active',!state.settings.museumUv);
    els.uvLightButton.classList.toggle('active',!!state.settings.museumUv);
    syncMuseumUvPage();
    let filledTotal=0;
    const total=Object.values(MATERIALS).reduce((a,m)=>a+m.stages.length,0);


    WINGS.forEach(w=>{
      const pairs=Object.entries(MATERIALS).filter(([,m])=>m.wing===w.id);
      let wf=0,wt=0;
      pairs.forEach(([k,m])=>{wt+=m.stages.length;wf+=m.stages.filter(s=>state.collection[k][s]).length;});
      filledTotal+=wf;


      const wing=document.createElement('section');
      const compactWing=w.id==='fossils'||w.id==='history';
      wing.className=`museum-wing ${compactWing?'compact-wing':''}`;
      wing.innerHTML=`<div class="wing-heading"><h3>${w.name}</h3><span>${wf} / ${wt} filled</span></div>`;
      const groupHost=document.createElement('div');
      groupHost.className=compactWing?'museum-groups-grid':'';
      wing.appendChild(groupHost);


      pairs.forEach(([k,m])=>{
        const group=document.createElement('div');
        const gf=m.stages.filter(s=>state.collection[k][s]).length,mastered=isMastered(k),silverMastered=mastered&&['fossil','artifact'].includes(m.family),obscured=shouldObscureIdentity(k);
        group.className=`museum-group ${mastered?(silverMastered?'silver-mastered':'mastered'):''} ${obscured?'undiscovered':''}`;
        group.innerHTML=`<div class="museum-group-title"><strong>${obscured?'???':m.name}</strong><span>${obscured?'Unidentified':`${gf} / ${m.stages.length}`}</span></div>`;


        const grid=document.createElement('div');
        grid.className=`museum-specimen-grid ${m.stages.length>=3?'three':m.stages.length===2?'two':'one'}`;


        m.stages.forEach(stage=>{
          const filled=state.collection[k][stage];
          const column=document.createElement('div');column.className=`museum-specimen-column ${filled?'filled':''} ${obscured?'unknown-specimen':''}`;
          const specimen=document.createElement('div');specimen.className='museum-specimen';
          const visual=document.createElement('div');visual.className='slot-visual';
          if(obscured){
            const mystery=document.createElement('span');mystery.className='unknown-material-icon';mystery.textContent='?';visual.appendChild(mystery);
          }else visual.appendChild(buildDetailSprite(k,stage));
          specimen.appendChild(visual);
          specimen.insertAdjacentHTML('beforeend',obscured?'<strong class="slot-stage">Unknown specimen</strong><span class="slot-state">Not identified</span>':`<strong class="slot-stage">${m.stageLabels[stage]}</strong>${filled?'':'<span class="slot-state">Not collected</span>'}`);
          const fact=document.createElement('div');fact.className='specimen-fact-card';
          const searchHint=!filled?museumSearchHint(k):'';
          fact.innerHTML=obscured?`<p class="locked-fact">Find this specimen in the mine to identify it.${searchHint}</p>`:filled?`<p>${m.facts[stage]}</p>`:`<p class="locked-fact">Donate this form to unlock its fact.${searchHint}</p>`;
          column.appendChild(specimen);column.appendChild(fact);grid.appendChild(column);
        });


        group.appendChild(grid);


        if(mastered&&m.mastery){
          const mastery=document.createElement('div');mastery.className='mastery-panel';
          const unlock=hasProcessing(k)?`<span class="mastery-unlock">⚙ Auto-process unlocked</span>`:'';
          mastery.innerHTML=`<strong>✦ Bonus discovery</strong><p>${m.mastery.fact}</p>${unlock}`;
          group.appendChild(mastery);
        }


        groupHost.appendChild(group);
      });


      els.museumWings.appendChild(wing);
    });


    els.museumCount.textContent=`${filledTotal} / ${total}`;
    els.museumMeter.style.width=`${filledTotal/total*100}%`;
    renderCompletionPlaque();
  }




  function checkAchievements(silent=false){
    let newlyUnlocked=[];
    ACHIEVEMENTS.forEach(a=>{
      if(state.achievements[a.id])return;
      let unlocked=false;
      try{unlocked=!!a.condition(state);}catch{unlocked=false;}
      if(unlocked){
        state.achievements[a.id]={unlockedAt:new Date().toISOString()};
        newlyUnlocked.push(a);
      }
    });
    if(newlyUnlocked.length&&!silent){
      const a=newlyUnlocked[newlyUnlocked.length-1];
      showToast(`Achievement unlocked: ${a.name} 🏆`);
    }
    if(newlyUnlocked.length)saveState();
    return newlyUnlocked;
  }


  function renderAchievements(){
    if(!els.achievementGrid)return;
    checkAchievements(true);
    const unlocked=ACHIEVEMENTS.filter(a=>state.achievements[a.id]).length;
    els.achievementCount.textContent=`${unlocked} / ${ACHIEVEMENTS.length}`;
    els.achievementMeter.style.width=`${unlocked/ACHIEVEMENTS.length*100}%`;
    els.achievementGrid.innerHTML='';


    const featured=new Set(['sio2Enjoyer','familyResemblance','berylBuddies','metalhead','lastSwingLuck','fourFloorsDown','allThatGlitters','glowShow','epithermal','diamondRough','actualGold','fossilRecord','historyBuff','mineralHall','oreHall','finalVein','tenExceptional','preparedProspector']);
    const special=new Set(['rockaholic','trueRockhound']);


    ACHIEVEMENTS.forEach(a=>{
      const earned=!!state.achievements[a.id];
      const tier=special.has(a.id)?'tier-special':featured.has(a.id)?'tier-featured':'tier-small';
      const card=document.createElement('article');
      card.className=`achievement-card ${tier} ${earned?'unlocked':'locked'} ${a.hidden&&!earned?'hidden-achievement':''}`;
      const name=a.hidden&&!earned?'???':a.name;
      const desc=a.hidden&&!earned?'A hidden achievement.':maskUndiscoveredNames(a.description);
      card.innerHTML=`<div class="achievement-icon">${earned?a.icon:'?'}</div><div><strong>${name}</strong><p>${desc}</p></div>`;
      els.achievementGrid.appendChild(card);
    });
  }


  function renderUpgrades(){
    els.shopBalance.textContent=formatMoney(state.credits);
    els.upgradeList.innerHTML='';


    const addCard=(builder,label)=>{
      try{
        const card=builder();
        if(card)els.upgradeList.appendChild(card);
      }catch(err){
        console.error(`Upgrade card failed: ${label}`,err);
      }
    };


    addCard(depthCard,'mine depth');
    if(state.unlockedDepth>=6)addCard(geothermalGearCard,'geothermal gear');
    addCard(durabilityCard,'pick durability');
    addCard(surveyCard,'scanner analysis');
    addCard(scannerUsesCard,'scanner charges');
    addCard(metalDetectorCard,'metal detector');
    if(state.unlockedDepth>=6){
      addCard(scannerHeatShieldCard,'scanner heat shielding');
      addCard(detectorHeatShieldCard,'detector heat shielding');
    }
    if(state.unlockedDepth>=5)addCard(uvLampCard,'UV lamp');
    addCard(workshopCard,'workshop');
    renderProspectingShop();
  }


  function renderProspectingShop(){
    if(!els.prospectingShop)return;
    const unlocked=!!state.postgame?.completed;
    els.prospectingShop.classList.toggle('hidden',!unlocked);
    if(!unlocked){els.prospectingShop.innerHTML='';return;}
    const stock=state.postgame.supplies||{};
    els.prospectingShop.innerHTML=`<div class="shop-section-heading"><div><span class="status-label">Postgame prospecting</span><h3>Prospecting Supplies</h3></div><span>Optional · stackable</span></div><p class="vault-help">Buy supplies here, then arm them in the Mine. They prepare the next fresh face and are only consumed when you mine its first tile, so browsing between depths cannot waste them.</p><div class="shop-supply-list"></div>`;
    const host=els.prospectingShop.querySelector('.shop-supply-list');
    Object.entries(PROSPECTING_SUPPLIES).forEach(([key,cfg])=>{
      const card=document.createElement('article');card.className='shop-supply-card';
      card.innerHTML=`<div class="supply-icon">${cfg.icon}</div><div class="supply-copy"><span class="status-label">Postgame consumable</span><strong>${cfg.label}</strong><p>${cfg.description}</p><span class="supply-stock">${stock[key]||0} owned</span></div><div class="shop-supply-action"><span class="price-tag">${formatMoney(cfg.cost)}</span><button class="primary-button" type="button" ${state.credits<cfg.cost?'disabled':''}>Buy</button></div>`;
      card.querySelector('button')?.addEventListener('click',()=>buyProspectingSupply(key));host.appendChild(card);
    });
  }

  function upgradeCard({icon,eyebrow,title,description,current,cost,label,disabled,onClick,maxText=null}){
    const card=document.createElement('article');card.className='upgrade-card';
    const action=maxText
      ?`<div class="upgrade-action"><span class="max-state">${maxText}</span></div>`
      :`<div class="upgrade-action"><span class="price-tag">${formatMoney(cost)}</span><button class="primary-button" type="button" ${disabled?'disabled':''}>${label}</button></div>`;
    card.innerHTML=`<div class="upgrade-icon">${icon}</div><div class="upgrade-copy"><span class="status-label">${eyebrow}</span><h3>${title}</h3><p>${description}</p><span class="upgrade-current">${current}</span></div>${action}`;
    const b=card.querySelector('button');if(b&&!disabled&&onClick)b.addEventListener('click',onClick);return card;
  }


  function depthCard(){
    const nextDepth=state.unlockedDepth+1;
    if(nextDepth>6)return upgradeCard({icon:'🪜',eyebrow:'Mine depth',title:'All depths unlocked',description:'The Upper Seam through the Epithermal Zone are all available.',current:'Depths 1–6 available',maxText:'MAX'});
const up=DEPTH_UPGRADES[nextDepth];
    return upgradeCard({icon:'🪜',eyebrow:'Mine depth',title:`Unlock Depth ${nextDepth}`,description:up.description,current:`Current: Depths 1–${state.unlockedDepth}`,cost:up.cost,label:'Go deeper',disabled:state.credits<up.cost,onClick:buyDepth});
  }


  function geothermalGearCard(){
    const owned=!!state.upgrades.geothermalGear,cost=2400;
    const description='Heat-resistant protective clothing and equipment for working safely in the Epithermal Zone.';
    if(owned)return upgradeCard({icon:'🥽',eyebrow:'Depth 6 access',title:'Geothermal Protective Gear',description,current:'Current: rated for Epithermal Zone work',maxText:'MAX'});
    return upgradeCard({icon:'🥽',eyebrow:'Depth 6 access',title:'Geothermal Protective Gear',description,current:'Required to mine in the Epithermal Zone',cost,label:'Equip gear',disabled:state.unlockedDepth<6||state.credits<cost,onClick:buyGeothermalGear});
  }


  function durabilityCard(){
    if(state.postgame?.completed)return upgradeCard({icon:'⛏️',eyebrow:'Completion reward',title:'Gilded Steel Pickaxe',description:'Effectively unbreakable. Solid gold would have been soft, heavy, and an objectively terrible material for a working pickaxe.',current:'Current: Gilded Steel Pickaxe · ∞ durability',maxText:'YOURS'});
    const i=state.upgrades.durability,cur=DURABILITY_LEVELS[i],max=cur.cost===null,next=max?null:DURABILITY_LEVELS[i+1];
    if(max)return upgradeCard({icon:'⛏️',eyebrow:'Pick durability',title:cur.label,description:'Built for the toughest rock in the deepest workings.',current:`Current: ${cur.label} · ${cur.swings} swings`,maxText:'MAX'});
    return upgradeCard({icon:'⛏️',eyebrow:'Pick durability',title:`${cur.swings} → ${next.swings} swings`,description:'More swings per rock face.',current:`Current: ${cur.label} · ${cur.swings} swings`,cost:cur.cost,label:'Upgrade pick',disabled:state.credits<cur.cost,onClick:buyDurability});
  }


  function surveyCard(){
    const cur=SURVEY_LEVELS[state.upgrades.surveying],max=cur.cost===null;
    const mechanics='The scanner targets a 3×3 area. Surveyed tiles stay marked for the face, and scanning the same area twice can reveal a faint generic density shadow over occupied tiles.';
    if(max)return upgradeCard({icon:'⌁',eyebrow:'Scanner analysis',title:cur.name,description:`${mechanics} ${cur.description}`,current:`Current: ${cur.name}`,maxText:'MAX'});
    return upgradeCard({icon:'⌁',eyebrow:'Scanner analysis',title:`Unlock ${cur.next}`,description:`${mechanics} ${cur.description}`,current:`Current: ${cur.name}`,cost:cur.cost,label:'Upgrade scanner',disabled:state.credits<cur.cost,onClick:buySurvey});
  }


  function scannerUsesCard(){
    const cur=SCAN_CHARGE_LEVELS[state.upgrades.scannerUses],max=cur.cost===null,next=max?null:SCAN_CHARGE_LEVELS[state.upgrades.scannerUses+1],locked=state.upgrades.surveying===0;
    if(max)return upgradeCard({icon:'📡',eyebrow:'Scanner charges',title:cur.label,description:'Each charge scans one selected 3×3 area.',current:`Current: ${cur.uses} scans per face`,maxText:'MAX'});
    return upgradeCard({icon:'📡',eyebrow:'Scanner charges',title:`${cur.uses} → ${next.uses} scans per face`,description:locked?'Unlock the Field Scanner first.':'Add another 3×3 scan per rock face.',current:`Current: ${cur.uses} scan${cur.uses===1?'':'s'} per face`,cost:cur.cost,label:locked?'Scanner locked':'Add scan',disabled:locked||state.credits<cur.cost,onClick:buyScannerUse});
  }


  function metalDetectorCard(){
    const owned=!!state.upgrades.metalDetector,depthReady=state.unlockedDepth>=2,cost=275;
    const description='The detector sweeps the whole rock face once. It marks deliberately broad, vague signal zones for metallic or conductive targets, including some historical artifacts; it never identifies an exact tile.';
    if(owned)return upgradeCard({icon:'🧲',eyebrow:'Prospecting tool',title:'Metal Detector',description,current:'Current: Metal Detector equipped',maxText:'MAX'});
    return upgradeCard({icon:'🧲',eyebrow:'Prospecting tool',title:'Unlock Metal Detector',description,current:depthReady?'Available after reaching the Lower Works':'Reach Depth 2 first',cost,label:depthReady?'Buy detector':'Depth 2 required',disabled:!depthReady||state.credits<cost,onClick:buyMetalDetector});
  }


  function scannerHeatShieldCard(){
    const owned=!!state.upgrades.scannerHeatShield,gear=!!state.upgrades.geothermalGear,scanner=state.upgrades.surveying>0,cost=800;
    const ready=gear&&scanner;
    const description='Insulates the scanner electronics for the temperatures and geothermal conditions of the Epithermal Zone. It does not change scanner power anywhere else.';
    if(owned)return upgradeCard({icon:'📡',eyebrow:'Environmental adaptation',title:'Heat-Shielded Scanner Housing',description,current:'Current: scanner rated for Depth 6',maxText:'MAX'});
    return upgradeCard({icon:'📡',eyebrow:'Environmental adaptation',title:'Heat-Shielded Scanner Housing',description,current:ready?'Ready to install':!gear?'Needs Geothermal Protective Gear':'Needs Field Scanner',cost,label:ready?'Install housing':'Locked',disabled:!ready||state.credits<cost,onClick:buyScannerHeatShield});
  }


  function detectorHeatShieldCard(){
    const owned=!!state.upgrades.detectorHeatShield,gear=!!state.upgrades.geothermalGear,detector=!!state.upgrades.metalDetector,cost=650;
    const ready=gear&&detector;
    const description='Heat-shields the detector coil and electronics for the Epithermal Zone. The detector still gives one deliberately vague whole-face sweep.';
    if(owned)return upgradeCard({icon:'🧲',eyebrow:'Environmental adaptation',title:'Heat-Shielded Detector Housing',description,current:'Current: detector rated for Depth 6',maxText:'MAX'});
    return upgradeCard({icon:'🧲',eyebrow:'Environmental adaptation',title:'Heat-Shielded Detector Housing',description,current:ready?'Ready to install':!gear?'Needs Geothermal Protective Gear':'Needs Metal Detector',cost,label:ready?'Install housing':'Locked',disabled:!ready||state.credits<cost,onClick:buyDetectorHeatShield});
  }


  function uvLampCard(){
    const owned=!!state.upgrades.uvLamp,depthReady=state.unlockedDepth>=5,cost=950;
    const description='Adds a museum-wide Normal / UV lighting toggle. Fluorescent specimens reveal their glow under UV while most of the collection stays dark.';
    if(owned)return upgradeCard({icon:'🔦',eyebrow:'Museum equipment',title:'UV Fluorescence Lamp',description,current:'Current: UV museum lighting installed',maxText:'MAX'});
    return upgradeCard({icon:'🔦',eyebrow:'Museum equipment',title:'Unlock UV Fluorescence Lamp',description,current:depthReady?'Available after reaching the Luminous Zone':'Reach Depth 5 first',cost,label:depthReady?'Install UV lamp':'Depth 5 required',disabled:!depthReady||state.credits<cost,onClick:buyUvLamp});
  }


  function workshopCard(){
    const i=state.upgrades.workshop,cur=WORKSHOP_LEVELS[i],max=cur.cost===null;
    if(max)return upgradeCard({icon:'🛠️',eyebrow:'Workshop equipment',title:cur.name,description:cur.description,current:`Current: ${cur.name}`,maxText:'MAX'});
    return upgradeCard({icon:'🛠️',eyebrow:'Workshop equipment',title:`Unlock ${cur.next}`,description:cur.description,current:`Current: ${cur.name}`,cost:cur.cost,label:'Upgrade workshop',disabled:state.credits<cur.cost,onClick:buyWorkshop});
  }




  function buyDepth(){
    const nextDepth=state.unlockedDepth+1,up=DEPTH_UPGRADES[nextDepth];
    if(!up||state.credits<up.cost)return;
    state.credits-=up.cost;state.unlockedDepth=nextDepth;state.currentDepth=nextDepth;heatWarningVisible=false;state.face=generateFace(nextDepth);
    checkAchievements();saveState();renderAll();showToast(`Depth ${nextDepth} unlocked: ${DEPTHS[nextDepth].name}.`);
  }
  function buyGeothermalGear(){
    const cost=2400;if(state.upgrades.geothermalGear||state.unlockedDepth<6||state.credits<cost)return;
    state.credits-=cost;state.upgrades.geothermalGear=true;heatWarningVisible=false;checkAchievements();saveState();renderAll();showToast('Geothermal Protective Gear equipped.');
  }

  function buyScannerHeatShield(){
    const cost=800;if(state.upgrades.scannerHeatShield||!state.upgrades.geothermalGear||state.upgrades.surveying===0||state.credits<cost)return;
    state.credits-=cost;state.upgrades.scannerHeatShield=true;saveState();renderAll();showToast('Scanner heat shielding installed.');
  }

  function buyDetectorHeatShield(){
    const cost=650;if(state.upgrades.detectorHeatShield||!state.upgrades.geothermalGear||!state.upgrades.metalDetector||state.credits<cost)return;
    state.credits-=cost;state.upgrades.detectorHeatShield=true;saveState();renderAll();showToast('Detector heat shielding installed.');
  }

  function buyDurability(){
    const i=state.upgrades.durability,cur=DURABILITY_LEVELS[i];
    if(cur.cost===null||state.credits<cur.cost)return;
    state.credits-=cur.cost;const old=cur.swings;state.upgrades.durability++;
    const newer=DURABILITY_LEVELS[state.upgrades.durability].swings;state.face.durability=Math.min(newer,state.face.durability+(newer-old));
    checkAchievements();saveState();renderAll();showToast(`Pick durability increased to ${newer} swings.`);
  }

  function buySurvey(){
    const cur=SURVEY_LEVELS[state.upgrades.surveying];
    if(cur.cost===null||state.credits<cur.cost)return;
    state.credits-=cur.cost;state.upgrades.surveying++;
    if(state.upgrades.surveying===1&&state.face.scanUsesRemaining===0)state.face.scanUsesRemaining=currentMaxScans();
    checkAchievements();saveState();renderAll();showToast(`${SURVEY_LEVELS[state.upgrades.surveying].name} unlocked.`);
  }

  function buyScannerUse(){
    const i=state.upgrades.scannerUses,cur=SCAN_CHARGE_LEVELS[i];
    if(state.upgrades.surveying===0||cur.cost===null||state.credits<cur.cost)return;
    state.credits-=cur.cost;const oldUses=cur.uses;state.upgrades.scannerUses++;
    const newUses=SCAN_CHARGE_LEVELS[state.upgrades.scannerUses].uses;state.face.scanUsesRemaining+=newUses-oldUses;
    checkAchievements();saveState();renderAll();showToast(`${newUses} scans per rock face unlocked.`);
  }


  function buyMetalDetector(){
    const cost=275;
    if(state.upgrades.metalDetector||state.unlockedDepth<2||state.credits<cost)return;
    state.credits-=cost;
    state.upgrades.metalDetector=true;
    checkAchievements();
    saveState();renderAll();showToast('Metal Detector unlocked.');
  }

  function buyUvLamp(){
    const cost=950;
    if(state.upgrades.uvLamp||state.unlockedDepth<5||state.credits<cost)return;
    state.credits-=cost;state.upgrades.uvLamp=true;
    saveState();renderAll();showToast('UV Fluorescence Lamp installed in the museum.');
  }

  function buyWorkshop(){
    const cur=WORKSHOP_LEVELS[state.upgrades.workshop];
    if(cur.cost===null||state.credits<cur.cost)return;
    state.credits-=cur.cost;state.upgrades.workshop++;
    checkAchievements();saveState();renderAll();showToast(`${WORKSHOP_LEVELS[state.upgrades.workshop].name} unlocked.`);
  }


  function resetGame(){
    if(!window.confirm('Reset all Rockhound Beta 1.5.1 progress?'))return;
    localStorage.removeItem(SAVE_KEY);state=defaultState();state.face=generateFace(1);openWorkbenchKey=null;scanMode=false;
    saveState();renderAll();showToast('Beta 1.5.1 save reset.');
  }

  function showToast(msg){
    clearTimeout(toastTimer);els.toast.textContent=msg;els.toast.classList.add('show');toastTimer=setTimeout(()=>els.toast.classList.remove('show'),1900);
  }

})();
