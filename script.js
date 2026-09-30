(() => {
  'use strict';

  const SAVE_KEY = 'rock-go-crunch-v2';
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

  const SPARKLE_KEYS = new Set(['quartz','amethyst','garnet','topaz','citrine','calcite','fluorite','aquamarine','sapphire','roseQuartz','malachite','ruby','emerald','willemite','hackmanite','apatite','opal']);
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

  const WINGS = [
    {id:'minerals',name:'Mineral Hall'},
    {id:'ores',name:'Ores & Metals'},
    {id:'fossils',name:'Fossil Wing'},
    {id:'history',name:'History Wing'}
  ];

  const DEPTHS = {
    1:{
      name:'Upper Seam',
      materials:{quartz:42,amethyst:22,hematite:20,chalcopyrite:16},
      sideFinds:[{key:'miningTag',weight:72},{key:'trilobite',weight:28}]
    },
    2:{
      name:'Lower Works',
      materials:{quartz:18,amethyst:13,hematite:13,chalcopyrite:13,garnet:15,topaz:12,pyrite:16},
      sideFinds:[{key:'trilobite',weight:54},{key:'crinoidStem',weight:28},{key:'miningTag',weight:18}]
    },
    3:{
      name:'Deep Gallery',
      materials:{quartz:8,amethyst:7,hematite:5,chalcopyrite:5,garnet:8,topaz:7,pyrite:6,citrine:12,calcite:10,fluorite:10,aquamarine:7,sapphire:4,cassiterite:5},
      sideFinds:[{key:'ammonite',weight:42},{key:'crinoidStem',weight:20},{key:'trilobite',weight:13},{key:'surveyMarker',weight:12},{key:'miningLamp',weight:8},{key:'miningTag',weight:5}]
    },
    4:{
      name:'Crystal Veins',
      materials:{quartz:4,amethyst:4,hematite:3,chalcopyrite:3,garnet:5,topaz:5,pyrite:4,citrine:6,calcite:5,fluorite:6,aquamarine:7,sapphire:6,cassiterite:4,roseQuartz:9,malachite:8,ruby:5,emerald:4,galena:6,sphalerite:6},
      sideFinds:[{key:'brachiopod',weight:33},{key:'ammonite',weight:20},{key:'crinoidStem',weight:10},{key:'drillBit',weight:18},{key:'surveyMarker',weight:11},{key:'miningLamp',weight:8}]
    },
    5:{
      name:'Luminous Zone',
      materials:{quartz:3,amethyst:2,calcite:5,fluorite:6,aquamarine:3,sapphire:3,roseQuartz:3,ruby:3,sphalerite:4,scheelite:11,willemite:10,hackmanite:8,apatite:10,opal:7},
      sideFinds:[{key:'belemnite',weight:42},{key:'railSpike',weight:28},{key:'brachiopod',weight:10},{key:'drillBit',weight:9},{key:'surveyMarker',weight:6},{key:'miningLamp',weight:5}]
    }
  };

const DURABILITY_LEVELS = [
    {swings:28,cost:60,label:'Basic pick'},
    {swings:34,cost:140,label:'Reinforced handle'},
    {swings:40,cost:320,label:'Steel pick'},
    {swings:48,cost:780,label:'Geologist’s pick'},
    {swings:56,cost:null,label:'Deep-work pick'}
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
    {name:'Specialist Lapidary',cost:null,next:null,description:'Processes the current deepest-zone materials. Processing remains free.'}
  ];

  const DEPTH_UPGRADES = {
    2:{cost:225,description:'Unlock Depth 2: the Lower Works, adding new gemstones, metallic minerals, and more fossil hunting.'},
    3:{cost:850,description:'Unlock Depth 3: the Deep Gallery, adding new crystal families, colourful minerals, another metal-bearing ore, and deeper historical finds.'},
    4:{cost:1800,description:'Unlock Depth 4: the Crystal Veins, adding high-grade gemstones, new metal-bearing ores, fossils, and artifacts.'},
    5:{cost:3600,description:'Unlock Depth 5: the Luminous Zone, adding fluorescent minerals, an unusual heavy-metal ore, a mineraloid, belemnites, and deeper mining history.'}
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
    {id:'rockGoCrunch',icon:'🪨',name:'Rock Go Crunch',description:'You remembered the old name.',hidden:true,condition:s=>s.meta.taglineTaps>=13}
  ];

  const emptyInventory = () => Object.fromEntries(Object.entries(MATERIALS).map(([k,m]) => [k,Object.fromEntries(m.stages.map(s => [s,0]))]));
  const emptyCollection = () => Object.fromEntries(Object.entries(MATERIALS).map(([k,m]) => [k,Object.fromEntries(m.stages.map(s => [s,false]))]));
  const emptyStats = () => Object.fromEntries(Object.keys(MATERIALS).map(k => [k,{found:0,sold:0,donated:0,processed:0,earned:0}]));
  const emptyDiscovery = () => Object.fromEntries(Object.keys(MATERIALS).map(k => [k,{discovered:false,depths:[]}]));

  const defaultState = () => ({
    credits:0,
    sound:true,
    unlockedDepth:1,
    currentDepth:1,
    upgrades:{durability:0,surveying:0,workshop:0,scannerUses:0,metalDetector:false,uvLamp:false},
    settings:{autoProcessByMaterial:{},museumUv:false},
    inventory:emptyInventory(),
    collection:emptyCollection(),
    stats:emptyStats(),
    discovery:emptyDiscovery(),
    achievements:{},
    meta:{
      tilesMined:0,scansUsed:0,doubleScans:0,anomalyFinds:0,metalSweeps:0,metalSignalFinds:0,
      facesFinished:0,lastSwingFinds:0,sellAllUses:0,fullSurveyFaces:0,taglineTaps:0,uvViews:0
    },
    face:null
  });

  let state = loadState();
  let openWorkbenchKey = null;
  let toastTimer = null;
  let audioContext = null;
  let scanMode = false;
  let activePanel = 'mine';

  const $ = id => document.getElementById(id);
  const els = {
    depthName:$('depthName'), depthNumber:$('depthNumber'), durability:$('durability'), maxDurability:$('maxDurability'), durabilityMeter:$('durabilityMeter'),
    surveyLevel:$('surveyLevel'), scanUseSummary:$('scanUseSummary'), mineBalance:$('mineBalance'), depthSelector:$('depthSelector'), scanButton:$('scanButton'), scanButtonStatus:$('scanButtonStatus'),
    metalDetectorButton:$('metalDetectorButton'), detectorButtonStatus:$('detectorButtonStatus'),
    mineBoard:$('mineBoard'), faceFinds:$('faceFinds'), newFaceButton:$('newFaceButton'), surfaceButton:$('surfaceButton'), mineMessage:$('mineMessage'),
    workbenchList:$('workbenchList'), masteredSellValue:$('masteredSellValue'), sellAllMasteredButton:$('sellAllMasteredButton'), museumWings:$('museumWings'), museumCount:$('museumCount'), museumMeter:$('museumMeter'),
    museumLighting:$('museumLighting'), normalLightButton:$('normalLightButton'), uvLightButton:$('uvLightButton'),
    achievementGrid:$('achievementGrid'), achievementCount:$('achievementCount'), achievementMeter:$('achievementMeter'),
    shopBalance:$('shopBalance'), upgradeList:$('upgradeList'), soundToggle:$('soundToggle'), resetButton:$('resetButton'), toast:$('toast'),
    mobileMineHud:$('mobileMineHud'), mobileDurability:$('mobileDurability'), mobileScans:$('mobileScans'),
    gameTitle:$('gameTitle'), gameTagline:$('gameTagline')
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
    els.normalLightButton.addEventListener('click',()=>setMuseumLighting(false));
    els.uvLightButton.addEventListener('click',()=>setMuseumLighting(true));
    els.sellAllMasteredButton.addEventListener('click',sellAllMastered);
    els.soundToggle.addEventListener('click',() => {state.sound=!state.sound;saveState();renderSoundButton();if(state.sound)playTone('soft');});
    els.resetButton.addEventListener('click',resetGame);
    if(els.gameTagline)els.gameTagline.addEventListener('click',()=>{state.meta.taglineTaps++;checkAchievements();saveState();});

    renderAll();
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
        meta:{...fresh.meta,...(parsed.meta||{})}
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
          else depths=spawnDepthsFor(k).filter(d=>d<=Math.max(1,Math.min(5,merged.unlockedDepth||1)));
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

      merged.unlockedDepth = Math.max(1,Math.min(5,merged.unlockedDepth||1));
      merged.currentDepth = Math.max(1,Math.min(merged.unlockedDepth,merged.currentDepth||1));
      merged.upgrades.workshop = Math.max(0,Math.min(WORKSHOP_LEVELS.length-1,merged.upgrades.workshop||0));
      merged.upgrades.scannerUses = Math.max(0,Math.min(SCAN_CHARGE_LEVELS.length-1,merged.upgrades.scannerUses||0));
      merged.upgrades.surveying = Math.max(0,Math.min(SURVEY_LEVELS.length-1,merged.upgrades.surveying||0));
      merged.upgrades.durability = Math.max(0,Math.min(DURABILITY_LEVELS.length-1,merged.upgrades.durability||0));
      merged.upgrades.metalDetector = !!merged.upgrades.metalDetector;
      merged.upgrades.uvLamp = !!merged.upgrades.uvLamp;
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

  function totalFound(){ return Object.values(state.stats).reduce((sum,x)=>sum+(x.found||0),0); }
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

  function normalizeFace(face){
    if(!Array.isArray(face.hints)) face.hints = generateProspectHints(face);
    if(!face.finds) face.finds = {};
    if(!Array.isArray(face.scanHistory)) face.scanHistory = [];
    if(face.lastScan === undefined) face.lastScan = null;
    if(face.metalDetectorUsed === undefined) face.metalDetectorUsed = false;
    if(!Array.isArray(face.metalSignalTiles)) face.metalSignalTiles = [];
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
    const count=randInt(1,3),chosen=new Set();
    const geological=face.tiles.filter(t=>t.material && !['fossil','artifact'].includes(MATERIALS[t.material].family));
    for(let i=0;i<count;i++){
      let candidate;
      if(geological.length && Math.random()<.82){
        const target=geological[randInt(0,geological.length-1)].index;
        const nearby=[target,...neighbors(target)];
        candidate=nearby[randInt(0,nearby.length-1)];
      }else{
        candidate=randInt(0,face.tiles.length-1);
      }
      let guard=0;
      while(chosen.has(candidate)&&guard<30){candidate=randInt(0,face.tiles.length-1);guard++;}
      chosen.add(candidate);
    }
    return [...chosen];
  }

  function generateFace(depth){
    const tiles=Array.from({length:GRID_SIZE*GRID_SIZE},(_,i)=>({index:i,revealed:false,material:null,depositId:null,depositType:null}));
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

    const face={
      depth,size:GRID_SIZE,
      durability:DURABILITY_LEVELS[state.upgrades.durability].swings,
      finds:{},tiles,deposits,hints:[],
      scanUsesRemaining:state.upgrades.surveying>0?currentMaxScans():0,
      scanHistory:[],scanCounts:Array(GRID_SIZE*GRID_SIZE).fill(0),lastScan:null,
      metalDetectorUsed:false,metalSignalTiles:[],fullCoverageAwarded:false
    };
    face.hints=generateProspectHints(face);
    return face;
  }

  function switchPanel(btn){
    const target=btn.dataset.target;
    activePanel=target;
    scanMode=false;
    document.querySelectorAll('.nav-button').forEach(b=>b.classList.toggle('active',b===btn));
    document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===target));
    if(target==='workbench')renderWorkbench();
    if(target==='museum')renderMuseum();
    if(target==='achievements')renderAchievements();
    if(target==='upgrades')renderUpgrades();
    renderMobileHud();
  }

  function startNewFace(){
    scanMode=false;
    state.face=generateFace(state.currentDepth);
    saveState();
    setMineMessage('⛏️','Fresh rock face.','Read the faint geological tells, survey where it seems worthwhile, then start crunching.');
    playTone('soft');
    renderMine();
    showToast('Fresh rock face.');
  }

  function setDepth(d){
    if(d>state.unlockedDepth||d===state.currentDepth)return;
    scanMode=false;
    state.currentDepth=d;
    state.face=generateFace(d);
    saveState();
    renderMine();
    showToast(`${DEPTHS[d].name} selected.`);
  }

  function toggleScanMode(){
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
    playTone('soft');
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
    playTone('soft');
    if(selected.length){
      setMineMessage('🧲','Metal sweep complete.',`${selected.length} broad signal zone${selected.length===1?'':'s'} detected. The highlighted areas are intentionally imprecise.`);
      showToast(`${selected.length} metal signal zone${selected.length===1?'':'s'} detected.`);
    }else{
      setMineMessage('🧲','Metal sweep complete.','No strong metallic targets detected on this face.');
      showToast('No strong metal signals detected.');
    }
    renderMine();
  }


  function signalStrength(count){ if(count>=4)return 'Strong';if(count>=2)return 'Moderate';return 'Trace'; }
  function depositPattern(types){
    if(types.has('large'))return 'large connected deposit pattern';
    if(types.has('small'))return 'small connected deposit pattern';
    if(types.has('isolated'))return 'isolated signature';
    return 'localized signature';
  }

  function analyzeScan(indices,level){
    const occupied=indices.map(i=>state.face.tiles[i]).filter(t=>t&&t.material);
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
    tile.revealed=true;
    face.durability--;
    state.meta.tilesMined++;

    const hadDoubleScan=(face.scanCounts?.[index]||0)>=2;
    const inMetalZone=(face.metalSignalTiles||[]).includes(index);

    if(tile.material){
      collectFind(tile.material);
      face.finds[tile.material]=(face.finds[tile.material]||0)+1;
      if(hadDoubleScan)state.meta.anomalyFinds++;
      if(inMetalZone&&isMetalTarget(tile.material))state.meta.metalSignalFinds++;
      if(face.durability===0)state.meta.lastSwingFinds++;
      const m=MATERIALS[tile.material];
      playTone('gem',tile.material);
      setMineMessage('✦',`${m.name}!`,findMessage(tile.material));
      showToast(`Found ${m.name}!`);
      maybeAnnounceDeposit(tile.depositId);
    }else{
      playTone('crunch');
      setMineMessage('🪨','Crunch.','Nothing in that tile. Pick another spot.');
    }

    if(face.durability<=0){
      state.meta.facesFinished++;
      setMineMessage('⛏️','Pick worn out.','That face is finished. Return to the surface for a fresh one; there is no recharge timer.');
      showToast('Face finished. No waiting required.');
    }

    checkAchievements();
    saveState();
    renderMine();
    renderWorkbench();
  }

  function collectFind(k){
    const m=MATERIALS[k],stage=m.stages[0];
    state.inventory[k][stage]++;
    state.stats[k].found++;
    if(!state.discovery)state.discovery=emptyDiscovery();
    if(!state.discovery[k])state.discovery[k]={discovered:false,depths:[]};
    state.discovery[k].discovered=true;
    if(!state.discovery[k].depths.includes(state.currentDepth))state.discovery[k].depths.push(state.currentDepth);
    state.discovery[k].depths.sort((a,b)=>a-b);
    if(canAutoProcess(k) && state.settings.autoProcessByMaterial[k])autoProcessOne(k);
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
    renderMine();renderWorkbench();renderMuseum();renderAchievements();renderUpgrades();renderSoundButton();renderMobileHud();
  }

  function renderMine(){
    const f=state.face,max=DURABILITY_LEVELS[state.upgrades.durability].swings;
    els.depthName.textContent=DEPTHS[state.currentDepth].name;
    els.depthNumber.textContent=`Depth ${state.currentDepth}`;
    els.durability.textContent=f.durability;
    els.maxDurability.textContent=max;
    els.durabilityMeter.style.width=`${Math.max(0,f.durability/max*100)}%`;
    els.surveyLevel.textContent=SURVEY_LEVELS[state.upgrades.surveying].name;
    els.mineBalance.textContent=formatMoney(state.credits);
    els.scanUseSummary.textContent=state.upgrades.surveying>0?`${f.scanUsesRemaining}/${currentMaxScans()} scans left`:'locked';
    renderDepthSelector();renderSurvey();renderMetalDetector();renderBoard();renderFaceFinds();renderMobileHud();
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

  function buildIcon(key,forTile=false,stage=null){
    const m=MATERIALS[key],span=document.createElement('span');
    if(!forTile)span.classList.add('material-icon');
    m.iconClass.split(' ').forEach(c=>span.classList.add(c));
    if(!forTile&&stage==='refined'&&key==='hematite'){span.classList.remove('hematite');span.classList.add('iron');}
    if(!forTile&&stage==='refined'&&key==='chalcopyrite'){span.classList.remove('chalcopyrite');span.classList.add('copper');}
    if(!forTile&&stage==='refined'&&key==='cassiterite'){span.classList.remove('cassiterite');span.classList.add('tin');}
    if(!forTile&&stage==='refined'&&key==='galena'){span.classList.remove('galena');span.classList.add('lead');}
    if(!forTile&&stage==='refined'&&key==='sphalerite'){span.classList.remove('sphalerite');span.classList.add('zinc');}
    if(!forTile&&stage==='refined'&&key==='scheelite'){span.classList.remove('scheelite');span.classList.add('tungsten');}
    if(forTile&&m.family==='mineral')span.classList.add('gem');
    if(forTile&&m.family==='ore')span.classList.add('ore');
    if(SPARKLE_KEYS.has(key)){
      span.classList.add('sparkle-gem');
      const seed=[...`${key}-${stage||'raw'}-${forTile?'tile':'ui'}`].reduce((n,ch)=>n+ch.charCodeAt(0),0)%7;
      span.style.setProperty('--sparkle-delay',`${-seed}.2s`);
    }
    if(UV_CLASSES[key])span.classList.add('uv-reactive',UV_CLASSES[key]);
    if(m.iconText)span.textContent=m.iconText;
    return span;
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
      if(scanMode)b.classList.add('scan-selectable');

      if(t.revealed){
        b.classList.add('revealed');
        if(t.material){
          b.classList.add('find');
          const i=buildIcon(t.material,true);i.classList.remove('material-icon');i.classList.add('tile-find');b.appendChild(i);
          b.setAttribute('aria-label',`Revealed ${MATERIALS[t.material].name}`);
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
    const max=DURABILITY_LEVELS[state.upgrades.durability].swings;
    els.mobileDurability.textContent=`⛏️ ${state.face.durability} / ${max}`;
    els.mobileScans.textContent=state.upgrades.surveying>0?`⌁ ${state.face.scanUsesRemaining} / ${currentMaxScans()}`:'⌁ locked';
  }

  function renderWorkbench(){
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
      const stock=totalInventory(k),mastered=isMastered(k);
      const card=document.createElement('article');
      card.className=`workbench-card ${openWorkbenchKey===k?'open':''} ${stock>0?'has-stock':''} ${mastered?'mastered':''}`;

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
      return `<div class="stage-row"><div class="stage-copy"><strong>${m.stageLabels[stage]} · ${count} owned</strong><span>${formatMoney(m.prices[stage])} each</span>${next&&!can?`<span class="process-lock">Needs ${WORKSHOP_LEVELS[m.workshopRequired||0].name}</span>`:''}</div><div class="stage-actions">${next?`<button class="mini-button accent" data-action="process" data-material="${k}" data-stage="${stage}" ${count<1||!can?'disabled':''}>${m.processLabels[stage]}</button>`:''}<button class="mini-button donate" data-action="donate" data-material="${k}" data-stage="${stage}" ${count<1||donated?'disabled':''}>${donated?'In museum':'Donate'}</button><button class="mini-button" data-action="sell" data-material="${k}" data-stage="${stage}" ${count<1?'disabled':''}>Sell ${formatMoney(m.prices[stage])}</button></div></div>`;
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
    checkAchievements();saveState();playTone('process');renderWorkbench();renderAchievements();showToast(`${m.name}: ${m.stageLabels[stage]} → ${m.stageLabels[next]}`);
  }

  function donateOne(k,stage){
    if(state.collection[k][stage]||state.inventory[k][stage]<1)return;
    const wasMastered=isMastered(k);
    state.inventory[k][stage]--;state.collection[k][stage]=true;state.stats[k].donated++;
    const nowMastered=isMastered(k);
    if(!wasMastered&&nowMastered&&hasProcessing(k))state.settings.autoProcessByMaterial[k]=true;
    checkAchievements();saveState();playTone('collection',k);renderAll();
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
    checkAchievements();saveState();playTone('coin');renderAll();showToast(`Sold for ${formatMoney(value)}.`);
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
    saveState();playTone('coin');renderAll();
    showToast(`Sold ${sold} bulk-sell item${sold===1?'':'s'} for ${formatMoney(value)}.`);
  }

  function toggleAutoProcess(k){
    if(!canAutoProcess(k))return;
    state.settings.autoProcessByMaterial[k]=!state.settings.autoProcessByMaterial[k];
    saveState();renderWorkbench();showToast(`${MATERIALS[k].name} auto-process ${state.settings.autoProcessByMaterial[k]?'on':'off'}.`);
  }

  function isMastered(k){
    const m=MATERIALS[k];
    return !!m.mastery && m.stages.every(stage=>state.collection[k][stage]);
  }

  function setMuseumLighting(useUv){
    if(useUv&&!state.upgrades.uvLamp)return;
    const switchingOn=!!useUv&&!state.settings.museumUv;
    state.settings.museumUv=!!useUv;
    if(switchingOn)state.meta.uvViews=(state.meta.uvViews||0)+1;
    checkAchievements();
    saveState();
    renderMuseum();
    if(useUv)playTone('soft');
  }

  function renderMuseum(){
    els.museumWings.innerHTML='';
    const uvAvailable=!!state.upgrades.uvLamp;
    els.museumLighting.classList.toggle('hidden',!uvAvailable);
    if(!uvAvailable)state.settings.museumUv=false;
    els.museumWings.classList.toggle('uv-mode',uvAvailable&&state.settings.museumUv);
    els.normalLightButton.classList.toggle('active',!state.settings.museumUv);
    els.uvLightButton.classList.toggle('active',!!state.settings.museumUv);
    let filledTotal=0;
    const total=Object.values(MATERIALS).reduce((a,m)=>a+m.stages.length,0);

    WINGS.forEach(w=>{
      const pairs=Object.entries(MATERIALS).filter(([,m])=>m.wing===w.id);
      let wf=0,wt=0;
      pairs.forEach(([k,m])=>{wt+=m.stages.length;wf+=m.stages.filter(s=>state.collection[k][s]).length;});
      filledTotal+=wf;

      const wing=document.createElement('section');wing.className='museum-wing';
      wing.innerHTML=`<div class="wing-heading"><h3>${w.name}</h3><span>${wf} / ${wt} filled</span></div>`;

      pairs.forEach(([k,m])=>{
        const group=document.createElement('div');
        const gf=m.stages.filter(s=>state.collection[k][s]).length,mastered=isMastered(k),obscured=shouldObscureIdentity(k);
        group.className=`museum-group ${mastered?'mastered':''} ${obscured?'undiscovered':''}`;
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
          }else visual.appendChild(buildIcon(k,false,stage));
          specimen.appendChild(visual);
          specimen.insertAdjacentHTML('beforeend',obscured?'<strong class="slot-stage">Unknown specimen</strong><span class="slot-state">Not identified</span>':`<strong class="slot-stage">${m.stageLabels[stage]}</strong>${filled?'':'<span class="slot-state">Not collected</span>'}`);
          const fact=document.createElement('div');fact.className='specimen-fact-card';
          fact.innerHTML=obscured?'<p class="locked-fact">Find this specimen in the mine to identify it.</p>':filled?`<p>${m.facts[stage]}</p>`:'<p class="locked-fact">Donate this form to unlock its fact.</p>';
          column.appendChild(specimen);column.appendChild(fact);grid.appendChild(column);
        });

        group.appendChild(grid);

        if(mastered&&m.mastery){
          const mastery=document.createElement('div');mastery.className='mastery-panel';
          const unlock=hasProcessing(k)?`<span class="mastery-unlock">⚙ Auto-process unlocked</span>`:'';
          mastery.innerHTML=`<strong>✦ Bonus discovery</strong><p>${m.mastery.fact}</p>${unlock}`;
          group.appendChild(mastery);
        }

        wing.appendChild(group);
      });

      els.museumWings.appendChild(wing);
    });

    els.museumCount.textContent=`${filledTotal} / ${total}`;
    els.museumMeter.style.width=`${filledTotal/total*100}%`;
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
      playTone('collection');
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

    const featured=new Set(['sio2Enjoyer','familyResemblance','berylBuddies','metalhead','lastSwingLuck','fourFloorsDown','allThatGlitters','glowShow']);
    const special=new Set(['rockGoCrunch']);

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
    els.shopBalance.textContent=formatMoney(state.credits);els.upgradeList.innerHTML='';
    [depthCard(),durabilityCard(),surveyCard(),scannerUsesCard(),metalDetectorCard(),uvLampCard(),workshopCard()].forEach(c=>els.upgradeList.appendChild(c));
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
    if(nextDepth>5)return upgradeCard({icon:'🪜',eyebrow:'Mine depth',title:'Luminous Zone unlocked',description:'All five current depths are available.',current:'Depths 1–5 available',maxText:'MAX (more coming soon... 👀)'});
    const up=DEPTH_UPGRADES[nextDepth];
    return upgradeCard({icon:'🪜',eyebrow:'Mine depth',title:`Unlock Depth ${nextDepth}`,description:up.description,current:`Current: Depths 1–${state.unlockedDepth}`,cost:up.cost,label:'Go deeper',disabled:state.credits<up.cost,onClick:buyDepth});
  }

  function durabilityCard(){
    const i=state.upgrades.durability,cur=DURABILITY_LEVELS[i],max=cur.cost===null,next=max?null:DURABILITY_LEVELS[i+1];
    if(max)return upgradeCard({icon:'⛏️',eyebrow:'Pick durability',title:cur.label,description:'The strongest regular pick currently needed for these rock faces.',current:`Current: ${cur.label} · ${cur.swings} swings`,maxText:'MAX (more coming soon... 👀)'});
    return upgradeCard({icon:'⛏️',eyebrow:'Pick durability',title:`${cur.swings} → ${next.swings} swings`,description:'More swings per rock face. No energy or recharge timer.',current:`Current: ${cur.label} · ${cur.swings} swings`,cost:cur.cost,label:'Upgrade pick',disabled:state.credits<cur.cost,onClick:buyDurability});
  }

  function surveyCard(){
    const cur=SURVEY_LEVELS[state.upgrades.surveying],max=cur.cost===null;
    const mechanics='The scanner targets a 3×3 area. Surveyed tiles stay marked for the face, and scanning the same area twice can reveal a faint generic density shadow over occupied tiles.';
    if(max)return upgradeCard({icon:'⌁',eyebrow:'Scanner analysis',title:cur.name,description:`${mechanics} ${cur.description}`,current:`Current: ${cur.name}`,maxText:'MAX'});
    return upgradeCard({icon:'⌁',eyebrow:'Scanner analysis',title:`Unlock ${cur.next}`,description:`${mechanics} ${cur.description}`,current:`Current: ${cur.name}`,cost:cur.cost,label:'Upgrade scanner',disabled:state.credits<cur.cost,onClick:buySurvey});
  }

  function scannerUsesCard(){
    const cur=SCAN_CHARGE_LEVELS[state.upgrades.scannerUses],max=cur.cost===null,next=max?null:SCAN_CHARGE_LEVELS[state.upgrades.scannerUses+1],locked=state.upgrades.surveying===0;
    if(max)return upgradeCard({icon:'📡',eyebrow:'Scanner charges',title:cur.label,description:'Each charge scans one selected 3×3 area. Charges reset immediately on every fresh rock face.',current:`Current: ${cur.uses} scans per face`,maxText:'MAX'});
    return upgradeCard({icon:'📡',eyebrow:'Scanner charges',title:`${cur.uses} → ${next.uses} scans per face`,description:locked?'Unlock the Field Scanner first.':'Add another 3×3 scan per rock face. Charges reset on a fresh face; there is no real-time recharge.',current:`Current: ${cur.uses} scan${cur.uses===1?'':'s'} per face`,cost:cur.cost,label:locked?'Scanner locked':'Add scan',disabled:locked||state.credits<cur.cost,onClick:buyScannerUse});
  }

  function metalDetectorCard(){
    const owned=!!state.upgrades.metalDetector,depthReady=state.unlockedDepth>=2,cost=275;
    const description='The detector sweeps the whole rock face once. It marks deliberately broad, vague signal zones for metallic or conductive targets, including some historical artifacts; it never identifies an exact tile.';
    if(owned)return upgradeCard({icon:'🧲',eyebrow:'Prospecting tool',title:'Metal Detector',description,current:'Current: Metal Detector equipped',maxText:'MAX'});
    return upgradeCard({icon:'🧲',eyebrow:'Prospecting tool',title:'Unlock Metal Detector',description,current:depthReady?'Available after reaching the Lower Works':'Reach Depth 2 first',cost,label:depthReady?'Buy detector':'Depth 2 required',disabled:!depthReady||state.credits<cost,onClick:buyMetalDetector});
  }

  function uvLampCard(){
    const owned=!!state.upgrades.uvLamp,depthReady=state.unlockedDepth>=5,cost=950;
    const description='Adds a museum-wide Normal / UV lighting toggle. Fluorescent specimens reveal their glow under UV while most of the collection stays dark.';
    if(owned)return upgradeCard({icon:'🔦',eyebrow:'Museum equipment',title:'UV Fluorescence Lamp',description,current:'Current: UV museum lighting installed',maxText:'MAX'});
    return upgradeCard({icon:'🔦',eyebrow:'Museum equipment',title:'Unlock UV Fluorescence Lamp',description,current:depthReady?'Available after reaching the Luminous Zone':'Reach Depth 5 first',cost,label:depthReady?'Install UV lamp':'Depth 5 required',disabled:!depthReady||state.credits<cost,onClick:buyUvLamp});
  }

  function workshopCard(){
    const i=state.upgrades.workshop,cur=WORKSHOP_LEVELS[i],max=cur.cost===null;
    if(max)return upgradeCard({icon:'🛠️',eyebrow:'Workshop equipment',title:cur.name,description:cur.description,current:`Current: ${cur.name}`,maxText:'MAX (more coming soon... 👀)'});
    return upgradeCard({icon:'🛠️',eyebrow:'Workshop equipment',title:`Unlock ${cur.next}`,description:cur.description,current:`Current: ${cur.name}`,cost:cur.cost,label:'Upgrade workshop',disabled:state.credits<cur.cost,onClick:buyWorkshop});
  }

  function buyDepth(){
    const nextDepth=state.unlockedDepth+1,up=DEPTH_UPGRADES[nextDepth];
    if(!up||state.credits<up.cost)return;
    state.credits-=up.cost;state.unlockedDepth=nextDepth;state.currentDepth=nextDepth;state.face=generateFace(nextDepth);
    checkAchievements();saveState();playTone('upgrade');renderAll();showToast(`Depth ${nextDepth} unlocked: ${DEPTHS[nextDepth].name}.`);
  }

  function buyDurability(){
    const i=state.upgrades.durability,cur=DURABILITY_LEVELS[i];
    if(cur.cost===null||state.credits<cur.cost)return;
    state.credits-=cur.cost;const old=cur.swings;state.upgrades.durability++;
    const newer=DURABILITY_LEVELS[state.upgrades.durability].swings;state.face.durability=Math.min(newer,state.face.durability+(newer-old));
    checkAchievements();saveState();playTone('upgrade');renderAll();showToast(`Pick durability increased to ${newer} swings.`);
  }

  function buySurvey(){
    const cur=SURVEY_LEVELS[state.upgrades.surveying];
    if(cur.cost===null||state.credits<cur.cost)return;
    state.credits-=cur.cost;state.upgrades.surveying++;
    if(state.upgrades.surveying===1&&state.face.scanUsesRemaining===0)state.face.scanUsesRemaining=currentMaxScans();
    checkAchievements();saveState();playTone('upgrade');renderAll();showToast(`${SURVEY_LEVELS[state.upgrades.surveying].name} unlocked.`);
  }

  function buyScannerUse(){
    const i=state.upgrades.scannerUses,cur=SCAN_CHARGE_LEVELS[i];
    if(state.upgrades.surveying===0||cur.cost===null||state.credits<cur.cost)return;
    state.credits-=cur.cost;const oldUses=cur.uses;state.upgrades.scannerUses++;
    const newUses=SCAN_CHARGE_LEVELS[state.upgrades.scannerUses].uses;state.face.scanUsesRemaining+=newUses-oldUses;
    checkAchievements();saveState();playTone('upgrade');renderAll();showToast(`${newUses} scans per rock face unlocked.`);
  }


  function buyMetalDetector(){
    const cost=275;
    if(state.upgrades.metalDetector||state.unlockedDepth<2||state.credits<cost)return;
    state.credits-=cost;
    state.upgrades.metalDetector=true;
    checkAchievements();
    saveState();playTone('upgrade');renderAll();showToast('Metal Detector unlocked.');
  }

  function buyUvLamp(){
    const cost=950;
    if(state.upgrades.uvLamp||state.unlockedDepth<5||state.credits<cost)return;
    state.credits-=cost;state.upgrades.uvLamp=true;
    saveState();playTone('upgrade');renderAll();showToast('UV Fluorescence Lamp installed in the museum.');
  }

  function buyWorkshop(){
    const cur=WORKSHOP_LEVELS[state.upgrades.workshop];
    if(cur.cost===null||state.credits<cur.cost)return;
    state.credits-=cur.cost;state.upgrades.workshop++;
    checkAchievements();saveState();playTone('upgrade');renderAll();showToast(`${WORKSHOP_LEVELS[state.upgrades.workshop].name} unlocked.`);
  }

  function resetGame(){
    if(!window.confirm('Reset all Rockhound Beta 1.2.2 progress?'))return;
    localStorage.removeItem(SAVE_KEY);state=defaultState();state.face=generateFace(1);openWorkbenchKey=null;scanMode=false;
    saveState();renderAll();showToast('Beta 1.2.2 save reset.');
  }

  function renderSoundButton(){
    els.soundToggle.textContent=state.sound?'🔊':'🔇';els.soundToggle.setAttribute('aria-label',state.sound?'Mute sound':'Enable sound');
  }

  function showToast(msg){
    clearTimeout(toastTimer);els.toast.textContent=msg;els.toast.classList.add('show');toastTimer=setTimeout(()=>els.toast.classList.remove('show'),1900);
  }

  function getAudioContext(){
    if(!state.sound)return null;const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return null;
    if(!audioContext)audioContext=new Ctx();if(audioContext.state==='suspended')audioContext.resume();return audioContext;
  }

  function playTone(type,key='quartz'){
    const ctx=getAudioContext();if(!ctx)return;const now=ctx.currentTime;
    if(type==='crunch'){
      const len=Math.floor(ctx.sampleRate*.05),buffer=ctx.createBuffer(1,len,ctx.sampleRate),data=buffer.getChannelData(0);
      for(let i=0;i<len;i++)data[i]=(Math.random()*2-1)*(1-i/len);
      const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
      src.buffer=buffer;filter.type='lowpass';filter.frequency.value=520;gain.gain.setValueAtTime(.13,now);gain.gain.exponentialRampToValueAtTime(.001,now+.055);
      src.connect(filter).connect(gain).connect(ctx.destination);src.start(now);src.stop(now+.06);return;
    }
    const base={quartz:440,amethyst:392,garnet:349,topaz:494,pyrite:554,citrine:466,calcite:415,fluorite:523,aquamarine:587,sapphire:622,roseQuartz:430,malachite:360,ruby:680,emerald:560,willemite:610,hackmanite:575,apatite:640,opal:720,hematite:294,chalcopyrite:330,cassiterite:370,galena:250,sphalerite:315,scheelite:405,trilobite:262,ammonite:277,crinoidStem:286,brachiopod:240,belemnite:255,miningTag:247,miningLamp:220,surveyMarker:232,drillBit:205,railSpike:198}[key]||440;
    const sets={gem:[base,base*1.25,base*1.5],process:[260,330],collection:[523,659,784],coin:[660,880],upgrade:[330,440,554,659],soft:[300]},freqs=sets[type]||sets.soft;
    freqs.forEach((freq,i)=>{
      const osc=ctx.createOscillator(),gain=ctx.createGain(),start=now+i*.05,duration=['upgrade','collection'].includes(type)?.17:.105;
      osc.type=type==='soft'?'sine':'triangle';osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.05,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
      osc.connect(gain).connect(ctx.destination);osc.start(start);osc.stop(start+duration+.02);
    });
  }
})();
