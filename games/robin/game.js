/* ═══════════════════════════════════════════
   WANDERER'S FOLLY — game.js
   ═══════════════════════════════════════════ */

/* ──────────────────────────────────────────
   DATA
────────────────────────────────────────── */

var GRID_W = 15;
var GRID_H = 11;

var SKIN_COLORS   = ["#FDDBB4","#E8B88A","#C68642","#8D5524","#4A2912"];
var HAIR_COLORS   = ["#2C1810","#8B4513","#DAA520","#C0C0C0","#CC0000"];
var OUTFIT_COLORS = ["#2E4A7A","#7A2E2E","#2E7A4A","#6B2E7A","#4A4A2E"];

var CLASSES = {
  knight: { hp:120, atk:15, def:20, spd:8  },
  rogue:  { hp:80,  atk:22, def:10, spd:18 },
  mage:   { hp:70,  atk:28, def:8,  spd:12 }
};

var SHOP_DATA = {
  weapons: [
    { id:"w1", name:"Rusty Dagger",       icon:"🗡️", type:"Light Weapon", desc:"Better than nothing. Barely.",      slot:"weapon", price:30,  stats:{atk:5} },
    { id:"w2", name:"Iron Sword",         icon:"⚔️", type:"Sword",        desc:"Reliable. Heavy. Honest.",          slot:"weapon", price:80,  stats:{atk:12} },
    { id:"w3", name:"Shadow Blade",       icon:"🌑", type:"Cursed Blade", desc:"Whispers sweet nothings at night.", slot:"weapon", price:200, stats:{atk:22, spd:5} },
    { id:"w4", name:"Gilded Broadsword",  icon:"🏅", type:"Greatsword",   desc:"Flashy. Very expensive. Worth it.", slot:"weapon", price:350, stats:{atk:30, def:5} },
    { id:"w5", name:"Staff of Confusion", icon:"🔮", type:"Magic Staff",  desc:"Confuses enemies. And you.",        slot:"weapon", price:160, stats:{atk:18, spd:-2} },
    { id:"w6", name:"Shortbow",           icon:"🏹", type:"Ranged",       desc:"For cowards. Efficient cowards.",   slot:"weapon", price:120, stats:{atk:14, spd:4} }
  ],
  armor: [
    { id:"a1", name:"Leather Vest",       icon:"🧥", type:"Light Armor",  desc:"Smells of adventure. Or goat.",    slot:"chest",  price:50,  stats:{def:8} },
    { id:"a2", name:"Chain Mail",         icon:"🛡️", type:"Medium Armor", desc:"Jingles when you walk. Tactical?", slot:"chest",  price:140, stats:{def:16, spd:-2} },
    { id:"a3", name:"Plate Armor",        icon:"🦾", type:"Heavy Armor",  desc:"A steel embrace. Very tight.",     slot:"chest",  price:300, stats:{def:26, hp:20, spd:-5} },
    { id:"a4", name:"Robe of Vagueness",  icon:"👘", type:"Magic Robe",   desc:"What is it? Nobody knows.",        slot:"chest",  price:180, stats:{def:10, atk:8} },
    { id:"h1", name:"Iron Helm",          icon:"⛑️", type:"Helmet",       desc:"Slightly dents your ego.",         slot:"helmet", price:70,  stats:{def:8, hp:10} },
    { id:"h2", name:"Wizard Hat",         icon:"🧙", type:"Magic Hat",    desc:"It's pointy. That matters.",       slot:"helmet", price:120, stats:{atk:10, def:4} },
    { id:"b1", name:"Worn Boots",         icon:"👢", type:"Boots",        desc:"One hole. Character building.",    slot:"boots",  price:40,  stats:{spd:4} },
    { id:"b2", name:"Swift Treads",       icon:"👟", type:"Light Boots",  desc:"Go fast. Trip gracefully.",        slot:"boots",  price:130, stats:{spd:10} }
  ],
  items: [
    { id:"i1", name:"Health Potion",      icon:"🧪", type:"Consumable",   desc:"Tastes of regret. Heals 40 HP.",   slot:"item",   price:25,  stats:{hp:40}, consumable:true },
    { id:"i2", name:"Big Health Potion",  icon:"🫙", type:"Consumable",   desc:"For bigger regrets. Heals 80 HP.", slot:"item",   price:55,  stats:{hp:80}, consumable:true },
    { id:"i3", name:"Lucky Charm",        icon:"🍀", type:"Passive",      desc:"Nothing happens. Feel better.",    slot:"item",   price:90,  stats:{spd:3, atk:3} },
    { id:"i4", name:"Ancient Map",        icon:"🗺️", type:"Key Item",     desc:"Shows where you are. Useless.",    slot:"item",   price:15,  stats:{} }
  ]
};

var ALL_ITEMS = SHOP_DATA.weapons.concat(SHOP_DATA.armor).concat(SHOP_DATA.items);

var NPCS = {
  elder: {
    icon:"🧙", name:"Elder Morthis",
    lines:[
      "Ah, another wanderer. How refreshing. By refreshing I mean exhausting.",
      "The Dark Forest to the east is spiritually challenging. Bring a weapon. Or a therapist.",
      "The desert to the south is hot, sandy, and full of philosophical crises. You'll fit right in.",
      "I've lived here 400 years. Nothing changes. Nothing. Ever. Changes."
    ]
  },
  merchant: {
    icon:"🏪", name:"Merda the Merchant",
    lines:[
      "Buy something or stop breathing on my inventory.",
      "Fine goods! Mostly. A few are cursed, but that's priced in.",
      "Gold only. I tried bartering once. Never again."
    ],
    opensShop: true
  },
  guard: {
    icon:"💂", name:"Guard Borvald",
    lines:[
      "Halt! I mean... you can pass. I just like saying halt.",
      "This village has three rules: No running, no philosophy, no running while philosophising.",
      "The path east leads to the Dark Forest. Three went in. They came back different."
    ]
  },
  hermit: {
    icon:"🧝", name:"Hermit Zel",
    lines:[
      "You found me! Hiding from what? Good question.",
      "The desert teaches you things. Mostly: don't go to the desert.",
      "If you hear singing in the Dark Forest, don't sing back. Don't."
    ]
  },
  innkeeper: {
    icon:"🍺", name:"Innkeeper Greta",
    lines:[
      "Room for the night? The beds are clean. Dreams not guaranteed.",
      "We serve stew. What kind? The kind that exists. That's all I know.",
      "You look tired. Rest. The world will still be broken tomorrow."
    ]
  }
};

/* MAP: T=forest tree, #=dark tree, .=grass walkable,
   P=path, V=village tile, S=sand,
   NE/NG/NM/NI/NH = NPC spawn positions           */
var MAP_DEF = [
  ["T","T","T","T","T","T","T","T","T","T","T","T","T","T","T"],
  ["T",".",".",".",".",".",".",".",".",".",".",".",".","T","T"],
  ["T",".",".","NE",".",".","V","V","V","V",".",".",".","T","T"],
  ["T",".",".",".",".","P","V","NG","V","V","P","P","P","#","#"],
  ["T",".",".","NI",".",".","V","NM","V","V",".","#","#","#","#"],
  ["T",".",".",".",".","P","P","P","P","P","P","#","#","#","#"],
  ["T",".",".",".",".",".",".",".",".","T",".",".",".",".","T"],
  ["T",".",".",".","S","S","S","S","S","T",".",".",".",".","T"],
  ["T","S","S","S","S","NH","S","S","S","T",".",".",".",".","T"],
  ["T","S","S","S","S","S","S","S","S","T","T","T","T","T","T"],
  ["T","T","T","T","T","T","T","T","T","T","T","T","T","T","T"]
];

var NPC_CODES = { NE:"elder", NG:"guard", NM:"merchant", NI:"innkeeper", NH:"hermit" };

/* ──────────────────────────────────────────
   AUDIO ENGINE
────────────────────────────────────────── */
var Audio = (function() {
  var ctx = null;
  var masterGain = null;
  var musicGain  = null;
  var sfxGain    = null;
  var currentMusic = null;
  var musicEnabled = true;
  var sfxEnabled   = true;
  var stepPhase    = 0;

  function init() {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain(); masterGain.gain.value = 0.7;
      musicGain  = ctx.createGain(); musicGain.gain.value  = 0.28;
      sfxGain    = ctx.createGain(); sfxGain.gain.value    = 0.55;
      musicGain.connect(masterGain);
      sfxGain.connect(masterGain);
      masterGain.connect(ctx.destination);
    } catch(e) { ctx = null; }
  }

  function resume() {
    if (ctx && ctx.state === "suspended") ctx.resume();
  }

  function osc(type, freq, gain, start, dur, dest) {
    if (!ctx) return;
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(gain, start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g); g.connect(dest || sfxGain);
    o.start(start); o.stop(start + dur + 0.01);
  }

  function sweep(type, f0, f1, gain, start, dur, dest) {
    if (!ctx) return;
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, start);
    o.frequency.exponentialRampToValueAtTime(f1, start + dur);
    g.gain.setValueAtTime(gain, start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g); g.connect(dest || sfxGain);
    o.start(start); o.stop(start + dur + 0.01);
  }

  function noise(gain, start, dur, lpFreq, dest) {
    if (!ctx) return;
    var len = Math.ceil(ctx.sampleRate * Math.min(dur + 0.05, 1));
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource(); src.buffer = buf;
    var lp  = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = lpFreq || 800;
    var g   = ctx.createGain();
    g.gain.setValueAtTime(gain, start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    src.connect(lp); lp.connect(g); g.connect(dest || sfxGain);
    src.start(start); src.stop(start + dur + 0.05);
  }

  /* ── SFX ── */
  function sfxStep(biome) {
    if (!ctx || !sfxEnabled) return;
    resume();
    var t = ctx.currentTime;
    stepPhase = 1 - stepPhase;
    var pm = stepPhase ? 1.0 : 0.92;
    if (biome === "desert") {
      noise(0.18, t, 0.08, 400 * pm);
      noise(0.08, t + 0.04, 0.06, 200);
    } else if (biome === "dark_forest") {
      noise(0.22, t, 0.10, 300 * pm);
      sweep("sine", 120 * pm, 60, 0.12, t, 0.12);
    } else if (biome === "village") {
      sweep("triangle", 260 * pm, 140, 0.14, t, 0.10);
      noise(0.07, t, 0.06, 1200);
    } else {
      noise(0.14, t, 0.09, 600 * pm);
      sweep("sine", 100 * pm, 55, 0.10, t, 0.10);
    }
  }

  function sfxDialogOpen() {
    if (!ctx || !sfxEnabled) return; resume();
    var t = ctx.currentTime;
    osc("sine", 880,  0.18, t,        0.40);
    osc("sine", 1320, 0.09, t + 0.02, 0.35);
    osc("sine", 1760, 0.05, t + 0.05, 0.30);
  }

  function sfxDialogNext() {
    if (!ctx || !sfxEnabled) return; resume();
    sweep("sine", 420, 380, 0.10, ctx.currentTime, 0.06);
  }

  function sfxDialogClose() {
    if (!ctx || !sfxEnabled) return; resume();
    var t = ctx.currentTime;
    sweep("sine", 660, 440, 0.12, t, 0.18);
    sweep("sine", 440, 330, 0.06, t + 0.08, 0.15);
  }

  function sfxShopOpen() {
    if (!ctx || !sfxEnabled) return; resume();
    var t = ctx.currentTime;
    [523,659,784,1047].forEach(function(f,i){ osc("triangle",f,0.14,t+i*0.07,0.25); });
  }

  function sfxBuy() {
    if (!ctx || !sfxEnabled) return; resume();
    var t = ctx.currentTime;
    [523,659,784,1047,1319].forEach(function(f,i){ osc("triangle",f,0.16-i*0.02,t+i*0.06,0.3-i*0.03); });
    osc("sine", 2093, 0.06, t + 0.20, 0.40);
  }

  function sfxBuyFail() {
    if (!ctx || !sfxEnabled) return; resume();
    var t = ctx.currentTime;
    sweep("square", 220, 130, 0.10, t,        0.12);
    sweep("square", 180, 110, 0.08, t + 0.10, 0.12);
  }

  function sfxBiomeChange(biome) {
    if (!ctx || !sfxEnabled) return; resume();
    var t = ctx.currentTime;
    var len = Math.ceil(ctx.sampleRate * 0.6);
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource(); src.buffer = buf;
    var lp  = ctx.createBiquadFilter(); lp.type = "lowpass";
    lp.frequency.setValueAtTime(200, t);
    lp.frequency.exponentialRampToValueAtTime(2000, t + 0.5);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.18, t + 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    src.connect(lp); lp.connect(g); g.connect(sfxGain);
    src.start(t); src.stop(t + 0.6);
    var tones = { forest:[330,495], dark_forest:[220,277], desert:[440,330], village:[523,659] };
    var pair  = tones[biome] || [330,495];
    osc("sine", pair[0], 0.10, t + 0.15, 0.50);
    osc("sine", pair[1], 0.06, t + 0.25, 0.40);
  }

  function sfxGameStart() {
    if (!ctx || !sfxEnabled) return; resume();
    var t = ctx.currentTime;
    [262,330,392,523,659,784].forEach(function(f,i){
      osc("triangle",f,0.18,t+i*0.08,0.45);
      if (i===5) osc("sine",f*2,0.07,t+i*0.08,0.6);
    });
  }

  function sfxMenuHover() {
    if (!ctx || !sfxEnabled) return; resume();
    sweep("sine", 600, 700, 0.05, ctx.currentTime, 0.06);
  }

  function sfxMenuClick() {
    if (!ctx || !sfxEnabled) return; resume();
    var t = ctx.currentTime;
    osc("triangle", 880,  0.12, t,        0.10);
    osc("sine",     1320, 0.06, t + 0.05, 0.10);
  }

  /* ── Music tracks ── */
  function stopMusic(fadeDur) {
    if (!currentMusic) return;
    var cm = currentMusic;
    currentMusic = null;
    var ft = fadeDur || 1.2;
    if (ctx && cm.gainNode) {
      cm.gainNode.gain.setValueAtTime(cm.gainNode.gain.value, ctx.currentTime);
      cm.gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ft);
    }
    setTimeout(function(){ try{ cm.stop(); }catch(e){} }, (ft + 0.2) * 1000);
  }

  function makeDroneLayers(g, defs) {
    var nodes = [];
    defs.forEach(function(d) {
      var o = ctx.createOscillator(); var og = ctx.createGain();
      o.type = d.type; o.frequency.value = d.freq; og.gain.value = d.gain;
      var lfo = ctx.createOscillator(); var lfog = ctx.createGain();
      lfo.frequency.value = 0.04 + Math.random() * 0.06; lfog.gain.value = 0.08;
      lfo.connect(lfog); lfog.connect(og.gain); lfo.start();
      o.connect(og); og.connect(g); o.start();
      nodes.push(o); nodes.push(lfo);
    });
    return nodes;
  }

  function musicMenu() {
    var g = ctx.createGain(); g.gain.value = 0.0001; g.connect(musicGain);
    var nodes = makeDroneLayers(g, [
      {type:"sine",freq:82.4,gain:0.35},{type:"sine",freq:110,gain:0.22},{type:"triangle",freq:164.8,gain:0.15}
    ]);
    var arpNotes = [220,262,196,165,220,330,262,196,196,247,330,196,165,220,247,330];
    var arpIdx = 0;
    var arpIv = setInterval(function(){
      if (!ctx||!musicEnabled) return;
      osc("triangle", arpNotes[arpIdx % arpNotes.length], 0.07, ctx.currentTime, 0.55);
      arpIdx++;
    }, 700);
    g.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 2.0);
    return { gainNode:g, _name:"menu", stop:function(){ clearInterval(arpIv); nodes.forEach(function(n){try{n.stop();}catch(e){}}); } };
  }

  function musicForest() {
    var g = ctx.createGain(); g.gain.value = 0.0001; g.connect(musicGain);
    var nodes = makeDroneLayers(g, [
      {type:"sine",freq:110,gain:0.50},{type:"sine",freq:165,gain:0.30},
      {type:"triangle",freq:220,gain:0.18},{type:"sine",freq:55,gain:0.40}
    ]);
    var birdIv = setInterval(function(){
      if (!ctx||!musicEnabled) return;
      var t = ctx.currentTime;
      var bf = [1200,1400,1600,1800][Math.floor(Math.random()*4)];
      sweep("sine", bf, bf*1.3, 0.06, t, 0.07);
      sweep("sine", bf*1.3, bf, 0.04, t+0.10, 0.06);
      if (Math.random()>0.5) sweep("sine", bf*0.8, bf*1.1, 0.03, t+0.22, 0.08);
    }, 2800 + Math.random()*2000);
    g.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 2.0);
    return { gainNode:g, _name:"forest", stop:function(){ clearInterval(birdIv); nodes.forEach(function(n){try{n.stop();}catch(e){}}); } };
  }

  function musicDarkForest() {
    var g = ctx.createGain(); g.gain.value = 0.0001; g.connect(musicGain);
    var nodes = [];
    [{type:"sawtooth",freq:55,gain:0.22},{type:"square",freq:58.3,gain:0.10},
     {type:"sine",freq:110,gain:0.28},{type:"sine",freq:27.5,gain:0.18}].forEach(function(d){
      var o=ctx.createOscillator(); var og=ctx.createGain(); var lp=ctx.createBiquadFilter();
      o.type=d.type; o.frequency.value=d.freq; lp.type="lowpass"; lp.frequency.value=400; og.gain.value=d.gain;
      var lfo=ctx.createOscillator(); var lfog=ctx.createGain();
      lfo.frequency.value=0.03+Math.random()*0.04; lfog.gain.value=0.12;
      lfo.connect(lfog); lfog.connect(og.gain); lfo.start();
      o.connect(lp); lp.connect(og); og.connect(g); o.start();
      nodes.push(o); nodes.push(lfo);
    });
    var eerieIv = setInterval(function(){
      if (!ctx||!musicEnabled) return;
      var t = ctx.currentTime;
      sweep("sine",180,140,0.07,t,0.8);
      sweep("sine",200,170,0.04,t+0.4,0.8);
    }, 5000 + Math.random()*3000);
    g.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 2.5);
    return { gainNode:g, _name:"dark_forest", stop:function(){ clearInterval(eerieIv); nodes.forEach(function(n){try{n.stop();}catch(e){}}); } };
  }

  function musicDesert() {
    var g = ctx.createGain(); g.gain.value = 0.0001; g.connect(musicGain);
    var nodes = makeDroneLayers(g, [
      {type:"sine",freq:138.6,gain:0.35},{type:"sine",freq:185,gain:0.22},
      {type:"triangle",freq:277.2,gain:0.14},{type:"sine",freq:69.3,gain:0.38}
    ]);
    var wBuf = ctx.createBuffer(1, ctx.sampleRate*4, ctx.sampleRate);
    var wd = wBuf.getChannelData(0);
    for (var i=0;i<wd.length;i++) wd[i]=Math.random()*2-1;
    var wSrc=ctx.createBufferSource(); wSrc.buffer=wBuf; wSrc.loop=true;
    var wLp=ctx.createBiquadFilter(); wLp.type="bandpass"; wLp.frequency.value=300; wLp.Q.value=0.5;
    var wg=ctx.createGain(); wg.gain.value=0.04;
    var wlfo=ctx.createOscillator(); wlfo.frequency.value=0.04;
    var wlfog=ctx.createGain(); wlfog.gain.value=0.03;
    wlfo.connect(wlfog); wlfog.connect(wg.gain); wlfo.start();
    wSrc.connect(wLp); wLp.connect(wg); wg.connect(g); wSrc.start();
    nodes.push(wlfo);
    g.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 3.0);
    return { gainNode:g, _name:"desert", stop:function(){ nodes.forEach(function(n){try{n.stop();}catch(e){}}); try{wSrc.stop();}catch(e){} } };
  }

  function musicVillage() {
    var g = ctx.createGain(); g.gain.value = 0.0001; g.connect(musicGain);
    var nodes = makeDroneLayers(g, [
      {type:"triangle",freq:196,gain:0.25},{type:"sine",freq:294,gain:0.16},{type:"sine",freq:98,gain:0.30}
    ]);
    var melody = [392,440,494,587,659,587,494,440,392,440,587,659,587,440,392,494];
    var mIdx = 0;
    var melIv = setInterval(function(){
      if (!ctx||!musicEnabled) return;
      var t=ctx.currentTime; var f=melody[mIdx%melody.length];
      osc("triangle",f,0.12,t,0.22); osc("triangle",f*2,0.04,t,0.18); mIdx++;
    }, 320);
    var kickIv = setInterval(function(){
      if (!ctx||!musicEnabled) return;
      sweep("sine",150,55,0.22,ctx.currentTime,0.18);
    }, 640);
    var hatIv = setInterval(function(){
      if (!ctx||!musicEnabled) return;
      noise(0.05,ctx.currentTime,0.04,6000);
    }, 320);
    g.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 1.5);
    return { gainNode:g, _name:"village", stop:function(){ clearInterval(melIv); clearInterval(kickIv); clearInterval(hatIv); nodes.forEach(function(n){try{n.stop();}catch(e){}}); } };
  }

  function playMusic(name) {
    if (!ctx || !musicEnabled) return;
    if (currentMusic && currentMusic._name === name) return;
    stopMusic(1.2);
    var t;
    if      (name==="menu")        t=musicMenu();
    else if (name==="forest")      t=musicForest();
    else if (name==="dark_forest") t=musicDarkForest();
    else if (name==="desert")      t=musicDesert();
    else if (name==="village")     t=musicVillage();
    if (t) currentMusic = t;
  }

  return {
    init:init, resume:resume,
    sfxStep:sfxStep, sfxDialogOpen:sfxDialogOpen, sfxDialogNext:sfxDialogNext,
    sfxDialogClose:sfxDialogClose, sfxShopOpen:sfxShopOpen,
    sfxBuy:sfxBuy, sfxBuyFail:sfxBuyFail, sfxBiomeChange:sfxBiomeChange,
    sfxGameStart:sfxGameStart, sfxMenuHover:sfxMenuHover, sfxMenuClick:sfxMenuClick,
    playMusic:playMusic, stopMusic:stopMusic,
    setMusicVol: function(v){ if(musicGain) musicGain.gain.value=v*0.28; },
    setSfxVol:   function(v){ if(sfxGain)   sfxGain.gain.value  =v*0.55; },
    getMusicEnabled: function(){ return musicEnabled; },
    getSfxEnabled:   function(){ return sfxEnabled;   },
    toggleMusic: function(){
      musicEnabled=!musicEnabled;
      if (!musicEnabled) stopMusic(0.4); else playMusic(lastBiome||"forest");
      return musicEnabled;
    },
    toggleSfx: function(){ sfxEnabled=!sfxEnabled; return sfxEnabled; }
  };
})();

/* ──────────────────────────────────────────
   GAME STATE
────────────────────────────────────────── */
var player = {
  name:"Wanderer", cls:"knight",
  skinIdx:0, hairIdx:0, outfitIdx:0,
  x:7, y:5,
  dir:"down", moving:false,
  hp:120, maxHp:120,
  atk:15, def:20, spd:8,
  gold:50,
  equipment:{ weapon:null, chest:null, helmet:null, boots:null, item:null },
  owned:[]
};

var gameMap    = [];
var npcPos     = {};
var shopTab    = "weapons";
var gameActive = false;
var lastBiome  = "";
var playerCanvas = null;
var moveTimer    = null;

var dialogState = { npc:null, lines:[], idx:0 };

/* ──────────────────────────────────────────
   UTILS
────────────────────────────────────────── */
function G(id) { return document.getElementById(id); }

function showScreen(name) {
  ["menu","avatar","game"].forEach(function(s) {
    var el = G("screen-" + s);
    var active = (s === name);
    el.style.display = active ? "flex" : "none";
    el.style.opacity = active ? "1"    : "0";
  });
}

function showToast(msg) {
  var old = document.querySelector(".toast");
  if (old) old.remove();
  var t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function() { if (t.parentNode) t.remove(); }, 2700);
}

/* ──────────────────────────────────────────
   BUILD MAP
────────────────────────────────────────── */
function buildMap() {
  gameMap = [];
  npcPos  = {};
  for (var r = 0; r < GRID_H; r++) {
    gameMap[r] = [];
    for (var c = 0; c < GRID_W; c++) {
      var cell = MAP_DEF[r][c];
      var t = { type:"grass", blocked:false, biome:"forest", npc:null };

      if      (cell === "T")        { t.type="tree";    t.blocked=true;  t.biome="forest"; }
      else if (cell === "#")        { t.type="tree";    t.blocked=true;  t.biome="dark_forest"; }
      else if (cell === "V")        { t.type="village"; t.biome="village"; }
      else if (cell === "P")        { t.type="path";    t.biome=(c>=11)?"dark_forest":"village"; }
      else if (cell === "S")        { t.type="sand";    t.biome="desert"; }
      else if (cell === ".")        { t.biome=(c>=11)?"dark_forest":(r>=7)?"desert":"forest"; }
      else if (NPC_CODES[cell]) {
        t.npc     = NPC_CODES[cell];
        t.blocked = true;   // player walks INTO NPC → dialog, not past them
        t.biome   = (r>=7)?"desert":(c>=6)?"village":"forest";
        npcPos[c+","+r] = t.npc;
      }
      gameMap[r][c] = t;
    }
  }
}

/* ──────────────────────────────────────────
   AVATAR DRAWING
────────────────────────────────────────── */
function drawAvatar(canvas) {
  if (!canvas) return;
  var ctx  = canvas.getContext("2d");
  var W = canvas.width, H = canvas.height;
  var skin   = SKIN_COLORS[player.skinIdx]    || SKIN_COLORS[0];
  var hair   = HAIR_COLORS[player.hairIdx]    || HAIR_COLORS[0];
  var outfit = OUTFIT_COLORS[player.outfitIdx]|| OUTFIT_COLORS[0];

  ctx.clearRect(0, 0, W, H);

  if (W >= 100) {
    // Full 120x160 preview
    ctx.fillStyle = hair;
    ctx.fillRect(38,12,44,16); ctx.fillRect(36,18,10,22); ctx.fillRect(74,18,10,22);
    ctx.fillStyle = skin;
    ctx.fillRect(40,20,40,36);
    ctx.fillStyle = "#333";
    ctx.fillRect(48,31,6,6); ctx.fillRect(66,31,6,6);
    ctx.fillStyle = "#9a5a5a";
    ctx.fillRect(52,46,16,4);
    ctx.fillStyle = skin;
    ctx.fillRect(52,56,16,10);
    ctx.fillStyle = outfit;
    ctx.fillRect(30,66,60,44); ctx.fillRect(16,66,18,36); ctx.fillRect(86,66,18,36);
    ctx.fillStyle = skin;
    ctx.fillRect(16,100,18,14); ctx.fillRect(86,100,18,14);
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(34,110,22,42); ctx.fillRect(62,110,22,42);
    ctx.fillStyle = "#3a2a1a";
    ctx.fillRect(30,148,28,10); ctx.fillRect(60,148,28,10);
    if (player.cls==="knight") { ctx.fillStyle="#aaa"; ctx.fillRect(30,66,60,7); }
    else if (player.cls==="mage")   { ctx.fillStyle="#5030a0"; ctx.fillRect(38,12,44,8); ctx.fillRect(52,0,16,16); }
    else if (player.cls==="rogue")  { ctx.fillStyle="#111";    ctx.fillRect(36,18,8,42); ctx.fillRect(76,18,8,42); }
  } else {
    // Small sprite
    var s  = Math.min(W,H);
    var hY = Math.floor(s*.04), hH = Math.floor(s*.30);
    var bY = Math.floor(s*.38), bH = Math.floor(s*.34);
    var lH = Math.floor(s*.24);
    ctx.fillStyle = hair;
    ctx.fillRect(Math.floor(s*.28), hY, Math.floor(s*.44), Math.floor(hH*.4));
    ctx.fillStyle = skin;
    ctx.fillRect(Math.floor(s*.30), hY+Math.floor(hH*.1), Math.floor(s*.40), hH);
    ctx.fillStyle = outfit;
    ctx.fillRect(Math.floor(s*.18), bY, Math.floor(s*.64), bH);
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(Math.floor(s*.22), bY+bH, Math.floor(s*.24), lH);
    ctx.fillRect(Math.floor(s*.54), bY+bH, Math.floor(s*.24), lH);
    ctx.fillStyle = "#3a2a1a";
    ctx.fillRect(Math.floor(s*.20), bY+bH+lH, Math.floor(s*.27), Math.floor(lH*.3));
    ctx.fillRect(Math.floor(s*.53), bY+bH+lH, Math.floor(s*.27), Math.floor(lH*.3));
  }
}

/* ──────────────────────────────────────────
   AVATAR EDITOR (wired once at DOMContentLoaded)
────────────────────────────────────────── */
function initAvatarEditor() {
  G("classPicker").addEventListener("click", function(e) {
    var card = e.target.closest(".class-card");
    if (!card) return;
    document.querySelectorAll(".class-card").forEach(function(c){ c.classList.remove("active"); });
    card.classList.add("active");
    player.cls = card.dataset.cls;
    updateStatBars();
    drawAvatar(G("avatarCanvas"));
  });

  G("skinPicker").addEventListener("click", function(e) {
    var dot = e.target.closest("[data-skin]");
    if (!dot) return;
    G("skinPicker").querySelectorAll(".color-dot").forEach(function(d){ d.classList.remove("active"); });
    dot.classList.add("active");
    player.skinIdx = parseInt(dot.dataset.skin, 10);
    drawAvatar(G("avatarCanvas"));
  });

  G("hairPicker").addEventListener("click", function(e) {
    var dot = e.target.closest("[data-hair]");
    if (!dot) return;
    G("hairPicker").querySelectorAll(".color-dot").forEach(function(d){ d.classList.remove("active"); });
    dot.classList.add("active");
    player.hairIdx = parseInt(dot.dataset.hair, 10);
    drawAvatar(G("avatarCanvas"));
  });

  G("outfitPicker").addEventListener("click", function(e) {
    var dot = e.target.closest("[data-outfit]");
    if (!dot) return;
    G("outfitPicker").querySelectorAll(".color-dot").forEach(function(d){ d.classList.remove("active"); });
    dot.classList.add("active");
    player.outfitIdx = parseInt(dot.dataset.outfit, 10);
    drawAvatar(G("avatarCanvas"));
  });

  G("charName").addEventListener("input", function() {
    G("previewName").textContent = G("charName").value.trim() || "Wanderer";
  });

  updateStatBars();
  drawAvatar(G("avatarCanvas"));
}

function updateStatBars() {
  var cls = CLASSES[player.cls];
  G("previewClass").textContent = player.cls.charAt(0).toUpperCase() + player.cls.slice(1);
  G("statHp").style.width  = (cls.hp  / 120 * 100) + "%";
  G("statAtk").style.width = (cls.atk / 35  * 100) + "%";
  G("statDef").style.width = (cls.def / 30  * 100) + "%";
  G("statSpd").style.width = (cls.spd / 20  * 100) + "%";
  G("statHpVal").textContent  = cls.hp;
  G("statAtkVal").textContent = cls.atk;
  G("statDefVal").textContent = cls.def;
  G("statSpdVal").textContent = cls.spd;
}

/* ──────────────────────────────────────────
   BUILD WORLD GRID
────────────────────────────────────────── */
function buildGrid() {
  var grid = G("worldGrid");
  grid.innerHTML = "";

  for (var r = 0; r < GRID_H; r++) {
    for (var c = 0; c < GRID_W; c++) {
      var tile = gameMap[r][c];
      var el = document.createElement("div");
      el.className = "tile tile-" + tile.biome.replace("_","-");
      if (!tile.blocked) el.classList.add("tile-walkable");
      el.textContent = tileIcon(tile, c, r);
      if (tile.npc) {
        el.classList.add("tile-npc");
        el.setAttribute("data-npc-icon", NPCS[tile.npc].icon);
      }
      grid.appendChild(el);
    }
  }

  // Player sprite canvas
  playerCanvas = document.createElement("canvas");
  playerCanvas.width  = 40;
  playerCanvas.height = 48;
  playerCanvas.className = "player-sprite idle";
  playerCanvas.style.position = "absolute";
  grid.appendChild(playerCanvas);

  positionPlayer(false);
  drawAvatar(playerCanvas);
}

function tileIcon(tile, c, r) {
  if (tile.npc)                  return "";   // NPC icon rendered via ::after CSS
  if (tile.blocked)              return "🌲";
  if (tile.type === "sand")      return "🏜️";
  if (tile.type === "village")   { var v=["🏠","🏚️","⛩️","🏛️"]; return v[(c*3+r*7)%v.length]; }
  if (tile.type === "path")      return "";
  if (tile.biome === "dark_forest") return "🍄";
  if (tile.biome === "desert")      return "🌵";
  return "🌿";
}

function positionPlayer(animate) {
  var left = player.x * 48 + 4;
  var top  = player.y * 48;
  playerCanvas.style.transition = animate ? "left .12s linear, top .12s linear" : "none";
  playerCanvas.style.left = left + "px";
  playerCanvas.style.top  = top  + "px";
}

/* ──────────────────────────────────────────
   HUD
────────────────────────────────────────── */
function updateHUD() {
  G("hudName").textContent = player.name;
  G("hudHpFill").style.width = Math.max(0, player.hp / player.maxHp * 100) + "%";
  G("hudHpText").textContent = player.hp + "/" + player.maxHp;
  G("hudGold").textContent   = player.gold;

  var tile = gameMap[player.y][player.x];
  var names = { forest:"Forest", dark_forest:"Dark Forest", desert:"Desert", village:"Village" };
  G("hudBiome").textContent = names[tile.biome] || tile.biome;
  G("hudPos").textContent   = player.x + ", " + player.y;

  // HUD mini canvas
  var wrap = G("hudAvatarMini");
  var mc = wrap.querySelector("canvas");
  if (!mc) { mc = document.createElement("canvas"); mc.width=36; mc.height=36; wrap.appendChild(mc); }
  drawAvatar(mc);

  // Biome change notification
  if (tile.biome !== lastBiome) {
    lastBiome = tile.biome;
    var msgs = {
      forest:      "You enter the Forest. Pine and poor decisions.",
      dark_forest: "The Dark Forest swallows the light. Something hums.",
      desert:      "The Desert. Endless sand. Endless existential dread.",
      village:     "The Village. Civilisation! Sort of."
    };
    if (msgs[tile.biome]) showToast(msgs[tile.biome]);
    Audio.sfxBiomeChange(tile.biome);
    Audio.playMusic(tile.biome);
  }
}

/* ──────────────────────────────────────────
   MOVEMENT
────────────────────────────────────────── */
var MOVE_KEYS = {
  ArrowUp:{dx:0,dy:-1,dir:"up"},    w:{dx:0,dy:-1,dir:"up"},
  ArrowDown:{dx:0,dy:1,dir:"down"}, s:{dx:0,dy:1,dir:"down"},
  ArrowLeft:{dx:-1,dy:0,dir:"left"},a:{dx:-1,dy:0,dir:"left"},
  ArrowRight:{dx:1,dy:0,dir:"right"},d:{dx:1,dy:0,dir:"right"}
};

function handleKeyDown(e) {
  if (!gameActive) return;

  // Dialog open
  if (G("dialogOverlay").style.display !== "none") {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); Audio.sfxDialogNext(); advanceDialog(); }
    return;
  }
  // Overlays
  if (G("shopOverlay").style.display !== "none") return;
  if (G("invOverlay").style.display  !== "none") return;

  var mv = MOVE_KEYS[e.key];
  if (!mv) return;
  e.preventDefault();  // always prevent scroll/shortcuts for movement keys
  if (player.moving) return;

  player.dir = mv.dir;
  var nx = player.x + mv.dx;
  var ny = player.y + mv.dy;

  if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) return;

  var target = gameMap[ny][nx];
  if (target.npc)     { startDialog(target.npc); return; }
  if (target.blocked) return;

  player.moving = true;
  player.x = nx;
  player.y = ny;
  positionPlayer(true);
  drawAvatar(playerCanvas);

  Audio.sfxStep(gameMap[ny][nx].biome);

  playerCanvas.className = "player-sprite walk-" + mv.dir;
  playerCanvas.style.transform = (mv.dir === "left") ? "scaleX(-1)" : "scaleX(1)";

  clearTimeout(moveTimer);
  moveTimer = setTimeout(function() {
    player.moving = false;
    playerCanvas.className = "player-sprite idle";
    updateHUD();
  }, 150);
}

/* ──────────────────────────────────────────
   DIALOG
────────────────────────────────────────── */
function startDialog(npcKey) {
  var npc = NPCS[npcKey];
  if (!npc) return;
  dialogState.npc   = npc;
  dialogState.lines = npc.lines.slice();
  dialogState.idx   = 0;
  G("dialogPortrait").textContent = npc.icon;
  G("dialogSpeaker").textContent  = npc.name;
  G("dialogOverlay").style.display = "flex";
  Audio.sfxDialogOpen();
  renderDialogLine();
}

function renderDialogLine() {
  G("dialogText").textContent  = dialogState.lines[dialogState.idx];
  G("dialogChoices").innerHTML = "";
  var isLast = (dialogState.idx >= dialogState.lines.length - 1);
  G("dialogNext").textContent  = isLast ? "Farewell ▶" : "Continue ▶";
  if (isLast && dialogState.npc && dialogState.npc.opensShop) {
    var btn = document.createElement("button");
    btn.className   = "dialog-choice-btn";
    btn.textContent = "🏪 Browse your wares";
    btn.addEventListener("click", function() { closeDialog(); openShop(); });
    G("dialogChoices").appendChild(btn);
  }
}

function advanceDialog() {
  dialogState.idx++;
  if (dialogState.idx >= dialogState.lines.length) closeDialog();
  else renderDialogLine();
}

function closeDialog() {
  G("dialogOverlay").style.display = "none";
  Audio.sfxDialogClose();
  dialogState.npc = null;
}

/* ──────────────────────────────────────────
   SHOP
────────────────────────────────────────── */
function openShop() {
  G("shopGoldDisplay").textContent = player.gold;
  G("shopOverlay").style.display = "flex";
  renderShop(shopTab);
}

function renderShop(tab) {
  shopTab = tab;
  document.querySelectorAll(".shop-tab").forEach(function(t) {
    t.classList.toggle("active", t.dataset.tab === tab);
  });

  var container = G("shopItems");
  container.innerHTML = "";
  var items = SHOP_DATA[tab];
  if (!items) return;

  items.forEach(function(item) {
    var owned  = player.owned.indexOf(item.id) !== -1;
    var canBuy = player.gold >= item.price;

    var badges = "";
    Object.keys(item.stats).forEach(function(k) {
      var v = item.stats[k];
      if (!v) return;
      var cls = (k==="atk")?"atk":(k==="def")?"def":(k==="hp")?"hp":"spd";
      badges += '<span class="stat-badge '+cls+'">'+k.toUpperCase()+" "+(v>0?"+":"")+v+"</span>";
    });

    var action = owned
      ? '<div class="owned-badge">✓ Owned</div>'
      : '<button class="buy-btn"'+(canBuy?'':' disabled')+' data-id="'+item.id+'">Buy</button>';

    var el = document.createElement("div");
    el.className = "shop-item"+(owned?" owned":"");
    el.innerHTML =
      '<div class="shop-item-top">'+
        '<div class="shop-item-icon">'+item.icon+'</div>'+
        '<div class="shop-item-info">'+
          '<div class="shop-item-name">'+item.name+'</div>'+
          '<div class="shop-item-type">'+item.type+'</div>'+
        '</div>'+
      '</div>'+
      '<div class="shop-item-desc">'+item.desc+'</div>'+
      '<div class="shop-item-stats">'+badges+'</div>'+
      '<div class="shop-item-footer">'+
        '<div class="shop-item-price">💰 '+item.price+'</div>'+
        action+
      '</div>';
    container.appendChild(el);
  });

  container.querySelectorAll(".buy-btn:not([disabled])").forEach(function(btn) {
    btn.addEventListener("click", function() { buyItem(btn.dataset.id); });
  });
}

function buyItem(id) {
  var item = null;
  for (var i=0; i<ALL_ITEMS.length; i++) { if (ALL_ITEMS[i].id===id) { item=ALL_ITEMS[i]; break; } }
  if (!item || player.gold < item.price) return;

  player.gold -= item.price;

  if (item.consumable) {
    player.hp = Math.min(player.maxHp, player.hp + (item.stats.hp||0));
    Audio.sfxBuy();
    showToast("Used "+item.name+"! HP restored.");
  } else {
    if (player.owned.indexOf(item.id) === -1) player.owned.push(item.id);
    player.equipment[item.slot] = item;
    recalcStats();
    Audio.sfxBuy();
    showToast("Equipped: "+item.name);
  }

  updateHUD();
  G("shopGoldDisplay").textContent = player.gold;
  renderShop(shopTab);
}

function recalcStats() {
  var base = CLASSES[player.cls];
  player.atk = base.atk; player.def = base.def; player.spd = base.spd;
  var hpBonus = 0;
  var slots = ["weapon","chest","helmet","boots","item"];
  for (var i=0; i<slots.length; i++) {
    var eq = player.equipment[slots[i]];
    if (!eq) continue;
    player.atk += (eq.stats.atk||0);
    player.def += (eq.stats.def||0);
    player.spd += (eq.stats.spd||0);
    hpBonus    += (eq.stats.hp ||0);
  }
  player.maxHp = base.hp + hpBonus;
  if (player.hp > player.maxHp) player.hp = player.maxHp;
}

/* ──────────────────────────────────────────
   INVENTORY
────────────────────────────────────────── */
function openInventory() {
  var container = G("invSlots");
  container.innerHTML = "";
  var slotDefs = [
    {key:"weapon",label:"Weapon"},{key:"chest",label:"Chest"},
    {key:"helmet",label:"Helmet"},{key:"boots",label:"Boots"},{key:"item",label:"Item"}
  ];
  slotDefs.forEach(function(s) {
    var eq = player.equipment[s.key];
    var el = document.createElement("div");
    el.className = "inv-slot";
    el.innerHTML =
      '<div class="inv-slot-label">'+s.label+'</div>'+
      '<div class="inv-slot-item">'+
        (eq
          ? '<div class="inv-slot-icon">'+eq.icon+'</div><div class="inv-slot-name">'+eq.name+'</div>'
          : '<div class="inv-slot-empty">— Empty —</div>')+
      '</div>';
    container.appendChild(el);
  });
  var stats = document.createElement("div");
  stats.className = "inv-slot";
  stats.style.gridColumn = "span 2";
  stats.innerHTML =
    '<div class="inv-slot-label">Stats</div>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;">'+
      '<span class="stat-badge hp">HP '+player.hp+'/'+player.maxHp+'</span>'+
      '<span class="stat-badge atk">ATK '+player.atk+'</span>'+
      '<span class="stat-badge def">DEF '+player.def+'</span>'+
      '<span class="stat-badge spd">SPD '+player.spd+'</span>'+
      '<span style="color:var(--gold);font-family:var(--font-title);font-size:.8rem;">💰 '+player.gold+'</span>'+
    '</div>';
  container.appendChild(stats);
  G("invOverlay").style.display = "flex";
}

/* ──────────────────────────────────────────
   SAVE / LOAD
────────────────────────────────────────── */
function saveGame() {
  try {
    var equipIds = {};
    ["weapon","chest","helmet","boots","item"].forEach(function(s) {
      equipIds[s] = player.equipment[s] ? player.equipment[s].id : null;
    });
    localStorage.setItem("wf_save", JSON.stringify({
      name:player.name, cls:player.cls,
      skinIdx:player.skinIdx, hairIdx:player.hairIdx, outfitIdx:player.outfitIdx,
      x:player.x, y:player.y,
      hp:player.hp, maxHp:player.maxHp,
      atk:player.atk, def:player.def, spd:player.spd,
      gold:player.gold, owned:player.owned.slice(), equipIds:equipIds
    }));
  } catch(e) {}
}

function loadGame() {
  try {
    var raw = localStorage.getItem("wf_save");
    if (!raw) return false;
    var d = JSON.parse(raw);
    player.name=d.name||"Wanderer"; player.cls=d.cls||"knight";
    player.skinIdx=d.skinIdx||0; player.hairIdx=d.hairIdx||0; player.outfitIdx=d.outfitIdx||0;
    player.x=typeof d.x==="number"?d.x:7; player.y=typeof d.y==="number"?d.y:5;
    player.hp=d.hp||100; player.maxHp=d.maxHp||100;
    player.atk=d.atk||15; player.def=d.def||10; player.spd=d.spd||8;
    player.gold=d.gold||50; player.owned=d.owned||[];
    player.equipment={weapon:null,chest:null,helmet:null,boots:null,item:null};
    if (d.equipIds) {
      Object.keys(d.equipIds).forEach(function(slot) {
        var eid = d.equipIds[slot];
        if (!eid) return;
        for (var i=0;i<ALL_ITEMS.length;i++) {
          if (ALL_ITEMS[i].id===eid) { player.equipment[slot]=ALL_ITEMS[i]; break; }
        }
      });
    }
    return true;
  } catch(e) { return false; }
}

/* ──────────────────────────────────────────
   PARTICLES
────────────────────────────────────────── */
function spawnParticles() {
  var c = G("menuParticles");
  for (var i=0; i<30; i++) {
    var p = document.createElement("div");
    p.className = "particle";
    p.style.left   = (Math.random()*100)+"%";
    p.style.bottom = (Math.random()*20)+"%";
    p.style.setProperty("--dur",   (4+Math.random()*6)+"s");
    p.style.setProperty("--delay", (Math.random()*6)+"s");
    c.appendChild(p);
  }
}

/* ──────────────────────────────────────────
   START GAME
────────────────────────────────────────── */
function startGame() {
  gameActive = true;
  lastBiome  = "";
  buildMap();
  buildGrid();
  showScreen("game");
  updateHUD();
  Audio.sfxGameStart();
  Audio.playMusic("forest");
  setTimeout(function() {
    showToast("Welcome, "+player.name+". Try not to die.");
  }, 300);
  setInterval(saveGame, 30000);
}

/* ──────────────────────────────────────────
   INIT — single DOMContentLoaded
────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function() {

  spawnParticles();
  Audio.init();
  showScreen("menu");
  Audio.playMusic("menu");
  initAvatarEditor();  // wire listeners once

  /* New Game */
  G("btnNewGame").addEventListener("click", function() {
    Audio.sfxMenuClick();
    showScreen("avatar");
  });

  /* Continue */
  G("btnContinue").addEventListener("click", function() {
    Audio.sfxMenuClick();
    if (loadGame()) {
      startGame();
    } else {
      showToast("No save found — start a New Game!");
    }
  });

  /* Enter World */
  G("btnEnterWorld").addEventListener("click", function() {
    Audio.sfxMenuClick();
    var cls = CLASSES[player.cls];
    player.name      = G("charName").value.trim() || "Wanderer";
    player.hp        = cls.hp;
    player.maxHp     = cls.hp;
    player.atk       = cls.atk;
    player.def       = cls.def;
    player.spd       = cls.spd;
    player.gold      = 50;
    player.x         = 7;
    player.y         = 5;
    player.owned     = [];
    player.equipment = {weapon:null,chest:null,helmet:null,boots:null,item:null};
    startGame();
  });

  /* Back to Menu */
  G("btnBackMenu").addEventListener("click", function() {
    Audio.sfxMenuClick();
    Audio.playMusic("menu");
    showScreen("menu");
  });

  /* Dialog next */
  G("dialogNext").addEventListener("click", function() {
    Audio.sfxDialogNext();
    advanceDialog();
  });

  /* Shop */
  G("btnOpenShop").addEventListener("click", function() { Audio.sfxShopOpen(); openShop(); });
  G("btnCloseShop").addEventListener("click", function() {
    G("shopOverlay").style.display = "none";
  });
  document.querySelectorAll(".shop-tab").forEach(function(tabEl) {
    tabEl.addEventListener("click", function() { renderShop(tabEl.dataset.tab); });
  });

  /* Inventory */
  G("btnOpenInventory").addEventListener("click", openInventory);
  G("btnCloseInv").addEventListener("click", function() {
    G("invOverlay").style.display = "none";
  });

  /* Audio toggles */
  G("btnToggleMusic").addEventListener("click", function() {
    var on = Audio.toggleMusic();
    G("btnToggleMusic").textContent = on ? "🎵" : "🔇";
    showToast(on ? "Music: On" : "Music: Off");
  });
  G("btnToggleSfx").addEventListener("click", function() {
    var on = Audio.toggleSfx();
    G("btnToggleSfx").textContent = on ? "🔊" : "🔈";
    showToast(on ? "SFX: On" : "SFX: Off");
  });

  /* Menu button hover sfx */
  document.querySelectorAll(".menu-btn").forEach(function(btn) {
    btn.addEventListener("mouseenter", function() { Audio.sfxMenuHover(); });
  });

  /* Keyboard */
  document.addEventListener("keydown", handleKeyDown);

  /* Escape closes overlays */
  document.addEventListener("keydown", function(e) {
    if (e.key !== "Escape") return;
    if (G("dialogOverlay").style.display !== "none") { closeDialog(); return; }
    if (G("shopOverlay").style.display   !== "none") { G("shopOverlay").style.display="none"; return; }
    if (G("invOverlay").style.display    !== "none") { G("invOverlay").style.display ="none"; return; }
  });

});
