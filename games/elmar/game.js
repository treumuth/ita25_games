// ─── ICONS ─────────────────────────────────────────────────────────────────

const ICONS = {
  shovel: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- wooden handle -->
    <rect x="14.5" y="2" width="3" height="16" rx="1.5" fill="#a0622a" stroke="#7a4418" stroke-width="0.7"/>
    <!-- handle grain -->
    <line x1="15.2" y1="4" x2="15.2" y2="17" stroke="#8a5220" stroke-width="0.5" opacity="0.6"/>
    <!-- metal blade -->
    <path d="M10,17 Q10,28 16,30 Q22,28 22,17 Z" fill="#8fa8b8" stroke="#5a7888" stroke-width="1"/>
    <!-- blade highlight -->
    <path d="M13,18 Q13,25 16,27 Q15,20 13,18Z" fill="rgba(255,255,255,0.25)"/>
    <!-- blade-handle join -->
    <rect x="11" y="15.5" width="10" height="3" rx="1.2" fill="#6a8898" stroke="#4a6878" stroke-width="0.8"/>
  </svg>`,

  farm: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- barn wall -->
    <rect x="5" y="16" width="22" height="13" rx="1" fill="#cc3820" stroke="#992a15" stroke-width="0.8"/>
    <!-- roof -->
    <polygon points="3,17 16,4 29,17" fill="#aa2e15" stroke="#882210" stroke-width="0.8"/>
    <!-- roof ridge cap -->
    <line x1="16" y1="4" x2="16" y2="17" stroke="#771c0c" stroke-width="1.2"/>
    <!-- door -->
    <rect x="12" y="21" width="8" height="8" rx="1" fill="#7a3e10" stroke="#5a2c08" stroke-width="0.7"/>
    <!-- door split -->
    <line x1="16" y1="21" x2="16" y2="29" stroke="#5a2c08" stroke-width="0.6"/>
    <!-- left window -->
    <rect x="6.5" y="18.5" width="4" height="4" rx="0.6" fill="#c8e8f8" stroke="#5a2c08" stroke-width="0.6"/>
    <line x1="8.5" y1="18.5" x2="8.5" y2="22.5" stroke="#5a2c08" stroke-width="0.5"/>
    <!-- right window -->
    <rect x="21.5" y="18.5" width="4" height="4" rx="0.6" fill="#c8e8f8" stroke="#5a2c08" stroke-width="0.6"/>
    <line x1="23.5" y1="18.5" x2="23.5" y2="22.5" stroke="#5a2c08" stroke-width="0.5"/>
    <!-- hay loft window -->
    <rect x="13" y="9" width="6" height="5" rx="1" fill="#c8e8f8" stroke="#882210" stroke-width="0.7"/>
  </svg>`,

  tractor: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- body -->
    <rect x="8" y="15" width="18" height="8" rx="2" fill="#3a8830" stroke="#286020" stroke-width="0.8"/>
    <!-- cab -->
    <rect x="14" y="9" width="10" height="8" rx="1.5" fill="#2e7025" stroke="#1e5018" stroke-width="0.8"/>
    <!-- cab window -->
    <rect x="15.5" y="10.5" width="7" height="4.5" rx="1" fill="#a8d8f0" stroke="#286020" stroke-width="0.6"/>
    <!-- exhaust pipe -->
    <rect x="12" y="7" width="2.2" height="5" rx="1" fill="#555" stroke="#333" stroke-width="0.5"/>
    <!-- smoke puff -->
    <circle cx="13.1" cy="6.2" r="1.8" fill="#aaa" opacity="0.7"/>
    <!-- big rear wheel -->
    <circle cx="13" cy="24" r="6.5" fill="#222" stroke="#444" stroke-width="1"/>
    <circle cx="13" cy="24" r="4.5" fill="#333"/>
    <circle cx="13" cy="24" r="2.2" fill="#555"/>
    <!-- rear wheel tread lines -->
    <line x1="13" y1="17.5" x2="13" y2="30.5" stroke="#555" stroke-width="0.8"/>
    <line x1="6.5" y1="24" x2="19.5" y2="24" stroke="#555" stroke-width="0.8"/>
    <!-- small front wheel -->
    <circle cx="25" cy="25" r="3.5" fill="#222" stroke="#444" stroke-width="0.8"/>
    <circle cx="25" cy="25" r="2" fill="#333"/>
    <!-- axle -->
    <line x1="19" y1="23" x2="22" y2="23" stroke="#286020" stroke-width="1.5"/>
  </svg>`,

  factory: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- main building -->
    <rect x="4" y="16" width="24" height="13" rx="1" fill="#7a7e88" stroke="#5a5e68" stroke-width="0.8"/>
    <!-- building front section -->
    <rect x="4" y="20" width="14" height="9" fill="#888c98" stroke="#5a5e68" stroke-width="0.6"/>
    <!-- left smokestack -->
    <rect x="7" y="8" width="4" height="12" rx="1.2" fill="#6a6e78" stroke="#4a4e58" stroke-width="0.7"/>
    <!-- right smokestack -->
    <rect x="15" y="11" width="4" height="9" rx="1.2" fill="#6a6e78" stroke="#4a4e58" stroke-width="0.7"/>
    <!-- smoke left -->
    <circle cx="9" cy="6.5" r="2.2" fill="#bbb" opacity="0.75"/>
    <circle cx="8" cy="4.5" r="1.6" fill="#ccc" opacity="0.55"/>
    <!-- smoke right -->
    <circle cx="17" cy="9.5" r="2" fill="#bbb" opacity="0.75"/>
    <circle cx="16.5" cy="7.8" r="1.4" fill="#ccc" opacity="0.5"/>
    <!-- yellow windows -->
    <rect x="6" y="21.5" width="3" height="3" rx="0.5" fill="#f0c840"/>
    <rect x="11" y="21.5" width="3" height="3" rx="0.5" fill="#f0c840"/>
    <rect x="21" y="18" width="4" height="3" rx="0.5" fill="#f0c840"/>
    <rect x="21" y="23" width="4" height="3" rx="0.5" fill="#f0c840"/>
    <!-- door -->
    <rect x="13.5" y="24" width="4.5" height="5" rx="0.7" fill="#5a5e68" stroke="#3a3e48" stroke-width="0.6"/>
  </svg>`,

  lab: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- flask body -->
    <path d="M11,5 L11,15 L5,27 Q5,30 8,30 L24,30 Q27,30 27,27 L21,15 L21,5 Z" fill="#3870c8" stroke="#2050a0" stroke-width="0.9" opacity="0.9"/>
    <!-- flask interior lighter -->
    <path d="M12,6 L12,15.5 L6.5,26.5 Q7,28.5 9,28.5 L23,28.5 Q25,28.5 25.5,26.5 L20,15.5 L20,6 Z" fill="#4888e8" opacity="0.6"/>
    <!-- liquid level -->
    <path d="M8,23 L7,27 Q7,29 9.5,29 L22.5,29 Q25,29 25,27 L24,23 Z" fill="#60d0a8" opacity="0.85"/>
    <!-- liquid highlight -->
    <path d="M9,23 L9,27 Q10,28.5 12,28.5 Q10,26 9.5,23Z" fill="rgba(255,255,255,0.35)"/>
    <!-- flask neck -->
    <rect x="11" y="3" width="10" height="4" rx="2" fill="#5080d0" stroke="#2050a0" stroke-width="0.7"/>
    <!-- stopper -->
    <rect x="12.5" y="1.5" width="7" height="2.5" rx="1.2" fill="#e85030" stroke="#c03020" stroke-width="0.6"/>
    <!-- bubbles -->
    <circle cx="14" cy="24.5" r="1.4" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.3)" stroke-width="0.4"/>
    <circle cx="18" cy="22" r="1" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
    <circle cx="16" cy="26" r="0.8" fill="rgba(255,255,255,0.5)"/>
    <!-- flask glint -->
    <path d="M13,7 Q12,10 12,14" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </svg>`,

  rocket: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- rocket body -->
    <path d="M16,2 Q22,6 23,16 L23,24 L16,24 L9,24 L9,16 Q10,6 16,2Z" fill="#d83020" stroke="#a02010" stroke-width="0.8"/>
    <!-- body highlight -->
    <path d="M16,3 Q13,7 12,16 L12,23 L14,23 L14,16 Q14.5,7 16,3Z" fill="rgba(255,255,255,0.2)"/>
    <!-- porthole window -->
    <circle cx="16" cy="13" r="3.5" fill="#a8d8f8" stroke="#6090c0" stroke-width="0.8"/>
    <circle cx="16" cy="13" r="2" fill="#c8e8ff" opacity="0.6"/>
    <circle cx="15" cy="12" r="0.8" fill="rgba(255,255,255,0.7)"/>
    <!-- nose cone -->
    <path d="M12,7 Q16,1 20,7Z" fill="#c02818" stroke="#902010" stroke-width="0.7"/>
    <!-- left fin -->
    <path d="M9,20 L5,28 L9,26 Z" fill="#b82410" stroke="#902010" stroke-width="0.6"/>
    <!-- right fin -->
    <path d="M23,20 L27,28 L23,26 Z" fill="#b82410" stroke="#902010" stroke-width="0.6"/>
    <!-- bottom nozzle -->
    <rect x="13" y="23.5" width="6" height="2.5" rx="1" fill="#888" stroke="#666" stroke-width="0.5"/>
    <!-- orange flame -->
    <path d="M14,26 Q13,30 16,32 Q19,30 18,26Z" fill="#ff8c00"/>
    <!-- yellow inner flame -->
    <path d="M15,26.5 Q14.5,29 16,31 Q17.5,29 16.5,26.5Z" fill="#ffd700"/>
  </svg>`,

  hand: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- palm -->
    <path d="M6,18 Q5,28 8,30 L22,30 Q26,28 26,20 L26,13 Q26,11 24.5,11 Q23,11 23,13 L23,11 Q23,9 21.5,9 Q20,9 20,11 L20,10 Q20,8 18.5,8 Q17,8 17,10 L17,7 Q17,5 15.5,5 Q14,5 14,7 L14,18 L11,15 Q9.5,12 8,13 Q6,14 8,17 Z" fill="#d4956a" stroke="#b07050" stroke-width="0.8"/>
    <!-- palm crease lines -->
    <path d="M9,22 Q14,20 22,22" stroke="#b87050" stroke-width="0.7" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M8,25 Q14,23.5 23,25.5" stroke="#b87050" stroke-width="0.6" fill="none" stroke-linecap="round" opacity="0.5"/>
    <!-- highlight on palm -->
    <path d="M15,10 Q14.5,15 15,20" stroke="rgba(255,220,180,0.4)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </svg>`,

  glove: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- cuff -->
    <rect x="6" y="22" width="20" height="8" rx="2" fill="#4060c8" stroke="#2844a8" stroke-width="0.8"/>
    <!-- cuff stripe -->
    <rect x="6" y="24" width="20" height="2" fill="#3050b0" opacity="0.7"/>
    <rect x="6" y="27" width="20" height="1.5" fill="#3050b0" opacity="0.5"/>
    <!-- glove palm -->
    <path d="M7,22 Q6,14 9,12 L23,12 Q26,14 25,22 Z" fill="#4868d0" stroke="#2844a8" stroke-width="0.8"/>
    <!-- fingers top -->
    <path d="M9,12 Q9,6 11.5,6 Q14,6 14,12" fill="#4868d0" stroke="#2844a8" stroke-width="0.8"/>
    <path d="M13,12 Q13,5 15.5,5 Q18,5 18,12" fill="#5070d8" stroke="#2844a8" stroke-width="0.8"/>
    <path d="M17,12 Q17,6 19.5,6 Q22,6 22,12" fill="#4868d0" stroke="#2844a8" stroke-width="0.8"/>
    <!-- thumb -->
    <path d="M7,18 Q3,16 3,13 Q3,10 6,10 Q8,10 9,14Z" fill="#4868d0" stroke="#2844a8" stroke-width="0.8"/>
    <!-- glove highlight -->
    <path d="M10,8 Q9,12 9.5,17" stroke="rgba(180,210,255,0.35)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </svg>`,

  fork: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- wooden handle -->
    <rect x="14" y="16" width="4" height="14" rx="2" fill="#a0622a" stroke="#7a4418" stroke-width="0.7"/>
    <!-- handle grain -->
    <line x1="15" y1="18" x2="15" y2="29" stroke="#8a5220" stroke-width="0.5" opacity="0.6"/>
    <!-- crossbar -->
    <rect x="9" y="13.5" width="14" height="3" rx="1.5" fill="#8a9898" stroke="#6a7878" stroke-width="0.7"/>
    <!-- left tine -->
    <rect x="9.5" y="4" width="3" height="12" rx="1.5" fill="#9aacac" stroke="#6a7878" stroke-width="0.7"/>
    <!-- center tine -->
    <rect x="14.5" y="2" width="3" height="14" rx="1.5" fill="#9aacac" stroke="#6a7878" stroke-width="0.7"/>
    <!-- right tine -->
    <rect x="19.5" y="4" width="3" height="12" rx="1.5" fill="#9aacac" stroke="#6a7878" stroke-width="0.7"/>
    <!-- tine highlights -->
    <line x1="11" y1="5" x2="11" y2="13" stroke="rgba(255,255,255,0.25)" stroke-width="0.6"/>
    <line x1="16" y1="3" x2="16" y2="14" stroke="rgba(255,255,255,0.25)" stroke-width="0.6"/>
    <line x1="21" y1="5" x2="21" y2="13" stroke="rgba(255,255,255,0.25)" stroke-width="0.6"/>
  </svg>`,

  lightning: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- outer glow shape -->
    <path d="M19,2 L9,18 L15,18 L11,30 L24,13 L18,13 Z" fill="rgba(255,220,0,0.25)"/>
    <!-- bolt -->
    <path d="M18,2 L8,18 L14,18 L10,30 L23,13 L17,13 Z" fill="#ffd700" stroke="#e0a000" stroke-width="0.8"/>
    <!-- inner bright core -->
    <path d="M17,5 L11,17 L16,17 L13,27 L21,14 L16.5,14 Z" fill="#fff8a0" opacity="0.7"/>
  </svg>`,

  gear: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- gear body -->
    <circle cx="16" cy="16" r="8.5" fill="#9098a8" stroke="#606878" stroke-width="0.8"/>
    <!-- gear teeth — 8 teeth via rectangle rotation -->
    <rect x="14.5" y="4" width="3" height="5" rx="1" fill="#9098a8" stroke="#606878" stroke-width="0.7" transform="rotate(0,16,16)"/>
    <rect x="14.5" y="4" width="3" height="5" rx="1" fill="#9098a8" stroke="#606878" stroke-width="0.7" transform="rotate(45,16,16)"/>
    <rect x="14.5" y="4" width="3" height="5" rx="1" fill="#9098a8" stroke="#606878" stroke-width="0.7" transform="rotate(90,16,16)"/>
    <rect x="14.5" y="4" width="3" height="5" rx="1" fill="#9098a8" stroke="#606878" stroke-width="0.7" transform="rotate(135,16,16)"/>
    <rect x="14.5" y="4" width="3" height="5" rx="1" fill="#9098a8" stroke="#606878" stroke-width="0.7" transform="rotate(180,16,16)"/>
    <rect x="14.5" y="4" width="3" height="5" rx="1" fill="#9098a8" stroke="#606878" stroke-width="0.7" transform="rotate(225,16,16)"/>
    <rect x="14.5" y="4" width="3" height="5" rx="1" fill="#9098a8" stroke="#606878" stroke-width="0.7" transform="rotate(270,16,16)"/>
    <rect x="14.5" y="4" width="3" height="5" rx="1" fill="#9098a8" stroke="#606878" stroke-width="0.7" transform="rotate(315,16,16)"/>
    <!-- center hole -->
    <circle cx="16" cy="16" r="3.5" fill="#3a3e48" stroke="#606878" stroke-width="0.7"/>
    <!-- highlight -->
    <path d="M10,11 Q9,13 9,16" stroke="rgba(255,255,255,0.25)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </svg>`,

  coin: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <!-- coin shadow -->
    <ellipse cx="16" cy="17" rx="11" ry="11" fill="rgba(0,0,0,0.2)"/>
    <!-- coin body -->
    <circle cx="16" cy="15" r="11" fill="#f0a800" stroke="#c88000" stroke-width="0.8"/>
    <!-- coin rim -->
    <circle cx="16" cy="15" r="9.5" fill="none" stroke="#e09000" stroke-width="1"/>
    <!-- inner face -->
    <circle cx="16" cy="15" r="8" fill="#f8c020"/>
    <!-- dollar sign -->
    <text x="16" y="19.5" text-anchor="middle" font-size="11" font-family="serif" font-weight="bold" fill="#c88000">$</text>
    <!-- sparkle top-right -->
    <line x1="24" y1="5" x2="24" y2="9" stroke="#ffd700" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="22" y1="7" x2="26" y2="7" stroke="#ffd700" stroke-width="1.2" stroke-linecap="round"/>
    <!-- sparkle bottom-left -->
    <line x1="6" y1="22" x2="6" y2="25" stroke="#ffd700" stroke-width="1" stroke-linecap="round"/>
    <line x1="4.5" y1="23.5" x2="7.5" y2="23.5" stroke="#ffd700" stroke-width="1" stroke-linecap="round"/>
    <!-- coin highlight -->
    <ellipse cx="12" cy="10" rx="3" ry="2" fill="rgba(255,255,220,0.45)" transform="rotate(-20,12,10)"/>
  </svg>`,

  goldenPotato: `<svg viewBox="0 0 80 75" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="68" rx="22" ry="5" fill="rgba(180,120,0,0.4)"/>
  <path d="M 18,50 C 10,40 10,25 16,16 C 23,7 32,4 40,4 C 49,4 60,8 66,18 C 72,28 70,44 62,53 C 54,62 28,62 18,50 Z" fill="#c8900a"/>
  <path d="M 20,47 C 13,38 13,25 19,17 C 26,9 34,7 41,7 C 50,7 60,11 65,20 C 70,29 68,43 61,51 C 54,59 30,59 20,47 Z" fill="#e8b020"/>
  <ellipse cx="32" cy="22" rx="11" ry="7" fill="rgba(255,240,150,0.45)" transform="rotate(-20 32 22)"/>
  <circle cx="34" cy="34" r="4.5" fill="#a06808"/>
  <circle cx="34" cy="34" r="2" fill="#603a04"/>
  <circle cx="50" cy="28" r="3.5" fill="#a06808"/>
  <circle cx="50" cy="28" r="1.5" fill="#603a04"/>
  <circle cx="47" cy="47" r="4" fill="#a06808"/>
  <circle cx="47" cy="47" r="1.8" fill="#603a04"/>
  <path d="M 39,5 C 38,0 35,-3 33,1" stroke="#6ab835" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 39,5 C 40,-1 44,-3 46,1" stroke="#6ab835" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 33,1 C 29,-3 26,0 28,4 C 30,6 33,4 33,1Z" fill="#7cc840"/>
  <path d="M 46,1 C 50,-3 53,0 51,4 C 49,6 46,4 46,1Z" fill="#7cc840"/>
  <line x1="57" y1="8" x2="63" y2="2" stroke="#ffd700" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="60" y1="10" x2="67" y2="7" stroke="#ffd700" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="14" y1="12" x2="8" y2="6" stroke="#ffd700" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="12" y1="15" x2="5" y2="13" stroke="#ffd700" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="62" y1="38" x2="69" y2="36" stroke="#ffd700" stroke-width="1.2" stroke-linecap="round"/>
</svg>`,
};

const MINI_POTATO = `<svg width="14" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-left:2px"><ellipse cx="16" cy="17" rx="12" ry="13" fill="#c07830"/><ellipse cx="14" cy="15" rx="9" ry="10" fill="#cc8840"/><ellipse cx="10" cy="10" rx="4" ry="3" fill="rgba(255,210,130,0.3)" transform="rotate(-15,10,10)"/><ellipse cx="14" cy="13" rx="2" ry="1.8" fill="#6b3a10"/><ellipse cx="14" cy="12.8" rx="1" ry="0.9" fill="#3d1e08"/><path d="M16,5 Q15,1 16,0" stroke="#5a9e30" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M16,3 Q13,1 11,2 Q13,4 16,3Z" fill="#6ab835"/><path d="M16,2 Q19,0 21,1 Q19,3 16,2Z" fill="#7cc840"/></svg>`;

// ─── DATA ──────────────────────────────────────────────────────────────────

const BUILDINGS = [
  { id: 'shovel',  icon: 'shovel',  name: 'Shovel',      baseCost: 15,     basePps: 0.1,  owned: 0, multiplier: 1, desc: 'Digs up potatoes by hand' },
  { id: 'farm',    icon: 'farm',    name: 'Farm',         baseCost: 100,    basePps: 0.5,  owned: 0, multiplier: 1, desc: 'Grows potatoes in the ground' },
  { id: 'tractor', icon: 'tractor', name: 'Tractor',      baseCost: 500,    basePps: 3,    owned: 0, multiplier: 1, desc: 'Faster harvesting' },
  { id: 'factory', icon: 'factory', name: 'Factory',      baseCost: 2000,   basePps: 15,   owned: 0, multiplier: 1, desc: 'Mass potato production' },
  { id: 'lab',     icon: 'lab',     name: 'Laboratory',   baseCost: 8000,   basePps: 60,   owned: 0, multiplier: 1, desc: 'Scientific potato engineering' },
  { id: 'rocket',  icon: 'rocket',  name: 'Rocket',       baseCost: 30000,  basePps: 250,  owned: 0, multiplier: 1, desc: 'Harvest potatoes from space' },
];

// type:'click'    → adds flat bonus to every click
// type:'building' → doubles a specific building's pps output
// type:'global'   → multiplies ALL buildings' combined output
const UPGRADES = [
  // ── Click boosts ──────────────────────────────────────────────────────────
  { id: 'better_grip',    icon: 'hand',      name: 'Better Grip',     cost: 75,        type: 'click',    amount: 1,    desc: '+1 per click',        req: () => totalClicks >= 10 },
  { id: 'work_gloves',    icon: 'glove',     name: 'Work Gloves',     cost: 400,       type: 'click',    amount: 4,    desc: '+4 per click',        req: () => totalClicks >= 50 },
  { id: 'potato_fork',    icon: 'fork',      name: 'Potato Fork',     cost: 1500,      type: 'click',    amount: 10,   desc: '+10 per click',       req: () => totalClicks >= 200 },
  { id: 'power_shovel',   icon: 'lightning', name: 'Power Shovel',    cost: 8000,      type: 'click',    amount: 30,   desc: '+30 per click',       req: () => totalClicks >= 1000 },
  { id: 'cyborg_hand',    icon: 'gear',      name: 'Cyborg Hand',     cost: 40000,     type: 'click',    amount: 100,  desc: '+100 per click',      req: () => totalClicks >= 5000 },
  { id: 'golden_thumb',   icon: 'coin',      name: 'Golden Thumb',    cost: 150000,    type: 'click',    amount: 500,  desc: '+500 per click',      req: () => totalClicks >= 20000 },
  { id: 'mech_arm',       icon: 'gear',      name: 'Mechanical Arm',  cost: 200000,    type: 'click',    amount: 50,   desc: '+50 per click',       req: () => totalClicks >= 2000 },
  { id: 'diamond_hands',  icon: 'coin',      name: 'Diamond Hands',   cost: 2000000,   type: 'click',    amount: 200,  desc: '+200 per click',      req: () => totalClicks >= 10000 },
  { id: 'quantum_grip',   icon: 'lightning', name: 'Quantum Grip',    cost: 20000000,  type: 'click',    amount: 1000, desc: '+1000 per click',     req: () => totalClicks >= 50000 },
  // ── Building multipliers tier 1 ───────────────────────────────────────────
  { id: 'sharp_shovel',   icon: 'shovel',    name: 'Sharp Shovel',    cost: 200,       type: 'building', target: 'shovel',  factor: 2, desc: 'Shovels x2',      req: () => getOwned('shovel')   >= 10 },
  { id: 'crop_rotation',  icon: 'farm',      name: 'Crop Rotation',   cost: 1000,      type: 'building', target: 'farm',    factor: 2, desc: 'Farms x2',        req: () => getOwned('farm')     >= 10 },
  { id: 'turbo_engine',   icon: 'tractor',   name: 'Turbo Engine',    cost: 5000,      type: 'building', target: 'tractor', factor: 2, desc: 'Tractors x2',     req: () => getOwned('tractor')  >= 10 },
  { id: 'assembly_line',  icon: 'factory',   name: 'Assembly Line',   cost: 25000,     type: 'building', target: 'factory', factor: 2, desc: 'Factories x2',    req: () => getOwned('factory')  >= 10 },
  { id: 'gmo_potato',     icon: 'lab',       name: 'GMO Potato',      cost: 90000,     type: 'building', target: 'lab',     factor: 2, desc: 'Labs x2',          req: () => getOwned('lab')      >= 10 },
  { id: 'warp_drive',     icon: 'rocket',    name: 'Warp Drive',      cost: 350000,    type: 'building', target: 'rocket',  factor: 2, desc: 'Rockets x2',      req: () => getOwned('rocket')   >= 10 },
  // ── Building multipliers tier 2 ───────────────────────────────────────────
  { id: 'shovel_t2',      icon: 'shovel',    name: 'Diamond Tip',     cost: 3000,      type: 'building', target: 'shovel',  factor: 2, desc: 'Shovels x2',      req: () => getOwned('shovel')   >= 25 },
  { id: 'farm_t2',        icon: 'farm',      name: 'Crop Science',    cost: 18000,     type: 'building', target: 'farm',    factor: 2, desc: 'Farms x2',        req: () => getOwned('farm')     >= 25 },
  { id: 'tractor_t2',     icon: 'tractor',   name: 'Turbo Boost',     cost: 80000,     type: 'building', target: 'tractor', factor: 2, desc: 'Tractors x2',     req: () => getOwned('tractor')  >= 25 },
  { id: 'factory_t2',     icon: 'factory',   name: 'Automation 2.0',  cost: 350000,    type: 'building', target: 'factory', factor: 2, desc: 'Factories x2',    req: () => getOwned('factory')  >= 25 },
  { id: 'lab_t2',         icon: 'lab',       name: 'Quantum Biology', cost: 1500000,   type: 'building', target: 'lab',     factor: 2, desc: 'Labs x2',          req: () => getOwned('lab')      >= 25 },
  { id: 'rocket_t2',      icon: 'rocket',    name: 'Ion Drive',       cost: 6000000,   type: 'building', target: 'rocket',  factor: 2, desc: 'Rockets x2',      req: () => getOwned('rocket')   >= 25 },
  // ── Building multipliers tier 3 ───────────────────────────────────────────
  { id: 'shovel_t3',      icon: 'shovel',    name: 'Nanobot Shovel',  cost: 40000,     type: 'building', target: 'shovel',  factor: 2, desc: 'Shovels x2',      req: () => getOwned('shovel')   >= 50 },
  { id: 'farm_t3',        icon: 'farm',      name: 'Vertical Farm',   cost: 250000,    type: 'building', target: 'farm',    factor: 2, desc: 'Farms x2',        req: () => getOwned('farm')     >= 50 },
  { id: 'tractor_t3',     icon: 'tractor',   name: 'Graviton Engine', cost: 1200000,   type: 'building', target: 'tractor', factor: 2, desc: 'Tractors x2',     req: () => getOwned('tractor')  >= 50 },
  { id: 'factory_t3',     icon: 'factory',   name: 'Singularity Plant',cost: 5000000,  type: 'building', target: 'factory', factor: 2, desc: 'Factories x2',    req: () => getOwned('factory')  >= 50 },
  { id: 'lab_t3',         icon: 'lab',       name: 'Transcendent Lab',cost: 20000000,  type: 'building', target: 'lab',     factor: 2, desc: 'Labs x2',          req: () => getOwned('lab')      >= 50 },
  { id: 'rocket_t3',      icon: 'rocket',    name: 'Wormhole Drive',  cost: 80000000,  type: 'building', target: 'rocket',  factor: 2, desc: 'Rockets x2',      req: () => getOwned('rocket')   >= 50 },
  // ── Global production multipliers ────────────────────────────────────────
  { id: 'watering_can',   icon: 'farm',      name: 'Watering Can',    cost: 30000,     type: 'global',   factor: 1.15, desc: 'All buildings +15%',  req: () => totalPotatoes >= 10000 },
  { id: 'super_compost',  icon: 'shovel',    name: 'Super Compost',   cost: 600000,    type: 'global',   factor: 1.25, desc: 'All buildings +25%',  req: () => totalPotatoes >= 200000 },
  { id: 'hydroponics',    icon: 'lab',       name: 'Hydroponics',     cost: 8000000,   type: 'global',   factor: 1.50, desc: 'All buildings +50%',  req: () => totalPotatoes >= 3000000 },
  { id: 'quantum_soil',   icon: 'lab',       name: 'Quantum Soil',    cost: 100000000, type: 'global',   factor: 2.0,  desc: 'All buildings x2',    req: () => totalPotatoes >= 50000000 },
].map(u => ({ ...u, bought: false }));

const ACHIEVEMENTS = [
  { label: 'First Potato',       req: () => totalPotatoes >= 1 },
  { label: '100 Potatoes',       req: () => totalPotatoes >= 100 },
  { label: '1,000 Potatoes',     req: () => totalPotatoes >= 1000 },
  { label: '10,000 Potatoes',    req: () => totalPotatoes >= 10000 },
  { label: '100,000 Potatoes',   req: () => totalPotatoes >= 100000 },
  { label: '1,000,000 Potatoes', req: () => totalPotatoes >= 1000000 },
  { label: '100 Clicks',         req: () => totalClicks   >= 100 },
  { label: '1,000 Clicks',       req: () => totalClicks   >= 1000 },
  { label: 'First Upgrade',      req: () => UPGRADES.some(u => u.bought) },
  { label: 'All Buildings',      req: () => BUILDINGS.every(b => b.owned >= 1) },
];

const NEWS_LINES = [
  'Potato market reaches record highs!',
  'Scientists unveil new drought-resistant potato variety.',
  'Global potato shortage averted — thanks to you.',
  'International Potato Congress convenes in Dublin.',
  'Experts declare potato "the superfood of the century".',
  'Potatoes discovered in Martian soil samples!',
  'Local farmer strikes gold with rare blue potato.',
  'Potato futures surge 400% overnight.',
  'World Potato Day declared a global holiday.',
  'Archaeologists unearth 10,000-year-old potato chip.',
];

// ─── PRESTIGE DATA ─────────────────────────────────────────────────────────

const PRESTIGE_UPGRADES = [
  { id: 'p_head_start',   name: 'Head Start',        seedCost: 1,    icon: 'coin',      desc: 'Begin each run with 100 free potatoes.',   effect: 'start_bonus',  value: 100  },
  { id: 'p_rough_hands',  name: 'Rough Hands',        seedCost: 3,    icon: 'hand',      desc: 'Permanent +5 to click power.',             effect: 'click_add',    value: 5    },
  { id: 'p_fertile_soil', name: 'Fertile Soil',       seedCost: 8,    icon: 'farm',      desc: 'All buildings produce 10% more.',          effect: 'prod_pct',     value: 0.10 },
  { id: 'p_lucky_sprout', name: 'Lucky Sprout',       seedCost: 20,   icon: 'lightning', desc: 'Golden potatoes appear twice as often.',   effect: 'golden_freq',  value: 2    },
  { id: 'p_rich_earth',   name: 'Rich Earth',         seedCost: 50,   icon: 'shovel',    desc: 'All buildings produce 25% more.',          effect: 'prod_pct',     value: 0.25 },
  { id: 'p_ancient_grip', name: 'Ancient Grip',       seedCost: 100,  icon: 'glove',     desc: 'Click power x2 permanently.',             effect: 'click_mult',   value: 2    },
  { id: 'p_deep_roots',   name: 'Deep Roots',         seedCost: 200,  icon: 'gear',      desc: 'All buildings produce 50% more.',          effect: 'prod_pct',     value: 0.50 },
  { id: 'p_tuber_prime',  name: 'Primordial Tuber',   seedCost: 500,  icon: 'lab',       desc: 'All production x2.',                       effect: 'prod_x',       value: 2    },
  { id: 'p_cosmic',       name: 'Cosmic Harvest',     seedCost: 2000, icon: 'rocket',    desc: 'All production x5.',                       effect: 'prod_x',       value: 5    },
].map(u => ({ ...u, bought: false }));

// ─── STATE ─────────────────────────────────────────────────────────────────

let potatoes            = 0;
let totalPotatoes       = 0;
let totalClicks         = 0;
let clickPower          = 1;
let clickBoostTotal     = 0;
let passivePerSec       = 0;
let lastUpgradeSnapshot = '';
let globalBuildingMult  = 1;

// Prestige state
let potatoSeeds         = 0;
let spentSeeds          = 0;
let prestigeRun         = 0;
let prestigeProdMult    = 1;
let prestigeClickBonus  = 0;
let prestigeClickMult   = 1;
let prestigeStartBonus  = 0;

// Golden potato / frenzy state
let activeFrenzy        = null;
let goldenFreqMult      = 1;
let goldenPotatoTimer   = null;
let frenzyInterval      = null;

// ─── HELPERS ───────────────────────────────────────────────────────────────

function getOwned(id) {
  return BUILDINGS.find(b => b.id === id)?.owned ?? 0;
}

function buildingCost(b) {
  return Math.floor(b.baseCost * Math.pow(1.15, b.owned));
}

function fmt(n) {
  n = Math.floor(n);
  if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9)  return (n / 1e9).toFixed(2)  + 'B';
  if (n >= 1e6)  return (n / 1e6).toFixed(2)  + 'M';
  if (n >= 1e3)  return (n / 1e3).toFixed(2)  + 'K';
  return n.toString();
}

function recalc() {
  let basePps = BUILDINGS.reduce((s, b) => s + b.basePps * b.owned * b.multiplier, 0) * globalBuildingMult * prestigeProdMult;

  const now = Date.now();
  if (activeFrenzy && activeFrenzy.type === 'production' && now < activeFrenzy.endTime) {
    passivePerSec = basePps * activeFrenzy.mult;
  } else {
    passivePerSec = basePps;
  }

  let baseClick = (1 + clickBoostTotal + prestigeClickBonus) * prestigeClickMult;
  if (activeFrenzy && activeFrenzy.type === 'click' && now < activeFrenzy.endTime) {
    clickPower = baseClick * activeFrenzy.mult;
  } else {
    clickPower = baseClick;
  }
}

// ─── PRESTIGE HELPERS ──────────────────────────────────────────────────────

function availableSeeds() {
  return potatoSeeds - spentSeeds;
}

function calcNewSeeds() {
  const earned = Math.floor(Math.sqrt(totalPotatoes / 1e6));
  return Math.max(0, earned);
}

function applyPrestigeEffects() {
  let prodPct = 0;
  let prodX = 1;
  prestigeClickBonus = 0;
  prestigeClickMult = 1;
  prestigeStartBonus = 0;
  let goldenFreq = 1;

  PRESTIGE_UPGRADES.filter(u => u.bought).forEach(u => {
    if (u.effect === 'start_bonus')  prestigeStartBonus += u.value;
    if (u.effect === 'click_add')    prestigeClickBonus += u.value;
    if (u.effect === 'click_mult')   prestigeClickMult  *= u.value;
    if (u.effect === 'prod_pct')     prodPct            += u.value;
    if (u.effect === 'prod_x')       prodX              *= u.value;
    if (u.effect === 'golden_freq')  goldenFreq         *= u.value;
  });

  // 0.5% per total seed as passive bonus
  const seedBonus = 1 + potatoSeeds * 0.005;
  prestigeProdMult = seedBonus * (1 + prodPct) * prodX;
  goldenFreqMult = goldenFreq;
}

// ─── BUY LOGIC ─────────────────────────────────────────────────────────────

function buyBuilding(b) {
  const cost = buildingCost(b);
  if (potatoes < cost) return;
  potatoes -= cost;
  b.owned++;
  recalc();
  renderAll();
}

function buyUpgrade(u) {
  if (u.bought || potatoes < u.cost) return;
  potatoes -= u.cost;
  u.bought = true;

  if (u.type === 'click') {
    clickBoostTotal += u.amount;
  } else if (u.type === 'building') {
    const b = BUILDINGS.find(b => b.id === u.target);
    if (b) b.multiplier *= u.factor;
  } else if (u.type === 'global') {
    globalBuildingMult *= u.factor;
  }

  recalc();
  renderAll();
}

// ─── ASCENSION ─────────────────────────────────────────────────────────────

function doAscend() {
  const newSeeds = calcNewSeeds();
  if (newSeeds <= 0) return;

  potatoSeeds += newSeeds;
  prestigeRun++;

  // Reset run state
  potatoes = 0;
  totalPotatoes = 0;
  totalClicks = 0;
  clickBoostTotal = 0;
  globalBuildingMult = 1;
  lastUpgradeSnapshot = '';
  activeFrenzy = null;

  BUILDINGS.forEach(b => { b.owned = 0; b.multiplier = 1; });
  UPGRADES.forEach(u => { u.bought = false; });

  applyPrestigeEffects();

  // Apply start bonus
  potatoes = prestigeStartBonus;
  totalPotatoes = prestigeStartBonus;

  recalc();
  closeAscensionScreen();
  renderAll();
  renderPrestigePanel();
  scheduleGoldenPotato();
}

function buyPrestigeUpgrade(u) {
  if (u.bought || availableSeeds() < u.seedCost) return;
  u.bought = true;
  spentSeeds += u.seedCost;
  applyPrestigeEffects();
  recalc();
  renderPrestigePanel();
  renderAll();
}

function openAscensionScreen() {
  buildPrestigeUpgradesList();
  updateAscensionInfo();
  document.getElementById('ascension-overlay').classList.remove('hidden');
}

function closeAscensionScreen() {
  document.getElementById('ascension-overlay').classList.add('hidden');
}

function updateAscensionInfo() {
  const newSeeds = calcNewSeeds();
  document.getElementById('asc-new-seeds').textContent = newSeeds;
  document.getElementById('asc-total-seeds').textContent = potatoSeeds + newSeeds;
  const bonusPct = ((1 + (potatoSeeds + newSeeds) * 0.005) * 100 - 100).toFixed(1);
  document.getElementById('asc-bonus-pct').textContent = bonusPct;
  document.getElementById('asc-avail-seeds').textContent = availableSeeds() + newSeeds;

  // Disable confirm if 0 new seeds
  document.getElementById('asc-confirm').disabled = newSeeds <= 0;
  // Hide ascend button if 0
  const ascBtn = document.getElementById('ascend-btn');
  ascBtn.style.display = newSeeds > 0 ? 'block' : 'none';
}

function buildPrestigeUpgradesList() {
  const container = document.getElementById('prestige-upgrades-list');
  container.innerHTML = '';
  PRESTIGE_UPGRADES.forEach(u => {
    const card = document.createElement('button');
    card.className = 'prestige-upgrade-card' + (u.bought ? ' bought' : '');
    const avail = availableSeeds() + calcNewSeeds();
    card.disabled = u.bought || avail < u.seedCost;
    card.innerHTML = `
      <span class="pu-icon">${ICONS[u.icon] || ''}</span>
      <span class="pu-name">${u.name}</span>
      <span class="pu-desc">${u.desc}</span>
      <span class="pu-cost">${u.bought ? 'Owned' : u.seedCost + ' seeds'}</span>
    `;
    if (!u.bought) {
      card.addEventListener('click', () => {
        buyPrestigeUpgrade(u);
        buildPrestigeUpgradesList();
        updateAscensionInfo();
      });
    }
    container.appendChild(card);
  });
}

function renderPrestigePanel() {
  document.getElementById('stat-ascensions').textContent = prestigeRun;
  document.getElementById('stat-seeds').textContent = potatoSeeds;
  document.getElementById('stat-prestige-mult').textContent = 'x' + prestigeProdMult.toFixed(2);
}

// ─── GOLDEN POTATO ─────────────────────────────────────────────────────────

function scheduleGoldenPotato() {
  clearTimeout(goldenPotatoTimer);
  const baseDelay = (90 + Math.random() * 150) * 1000; // 1.5–4 min
  goldenPotatoTimer = setTimeout(spawnGoldenPotato, baseDelay / goldenFreqMult);
}

function spawnGoldenPotato() {
  const existing = document.getElementById('golden-potato');
  if (existing) existing.remove();

  const panel = document.getElementById('center-panel');
  const panelRect = panel.getBoundingClientRect();

  const el = document.createElement('div');
  el.id = 'golden-potato';
  el.innerHTML = ICONS.goldenPotato;

  // random position within center panel, avoiding edges and news bar
  const left = 80 + Math.random() * (panelRect.width - 200);
  const top  = 80 + Math.random() * (panelRect.height - 220);
  el.style.left = left + 'px';
  el.style.top  = top  + 'px';

  el.addEventListener('click', collectGoldenPotato);
  panel.appendChild(el);

  // Auto-remove after 13 seconds
  el._timeout = setTimeout(() => {
    el.classList.add('fading');
    setTimeout(() => { el.remove(); scheduleGoldenPotato(); }, 800);
  }, 12200);
}

function collectGoldenPotato() {
  const el = document.getElementById('golden-potato');
  if (!el) return;
  clearTimeout(el._timeout);
  el.remove();

  // Random effect
  const roll = Math.random();
  if (roll < 0.35) {
    // Frenzy: x7 production for 77s
    activeFrenzy = { type: 'production', mult: 7, endTime: Date.now() + 77000, label: 'FRENZY  x7 production' };
    showFrenzy();
  } else if (roll < 0.65) {
    // Lucky: gain CPS * 300 potatoes
    const bonus = Math.max(13, passivePerSec * 300);
    potatoes += bonus;
    totalPotatoes += bonus;
    showNewsLine('Golden Potato! You found ' + fmt(bonus) + ' potatoes!');
  } else if (roll < 0.85) {
    // Click Frenzy: x77 clicks for 13s
    activeFrenzy = { type: 'click', mult: 77, endTime: Date.now() + 13000, label: 'CLICK FRENZY  x77 clicks' };
    showFrenzy();
  } else {
    // Elder Frenzy: x666 production for 6s
    activeFrenzy = { type: 'production', mult: 666, endTime: Date.now() + 6000, label: 'ELDER FRENZY  x666 production' };
    showFrenzy();
  }

  recalc();
  renderAll();
  scheduleGoldenPotato();
}

function showFrenzy() {
  clearInterval(frenzyInterval);
  const banner = document.getElementById('frenzy-banner');
  banner.classList.remove('hidden');
  frenzyInterval = setInterval(() => {
    if (!activeFrenzy || Date.now() >= activeFrenzy.endTime) {
      activeFrenzy = null;
      banner.classList.add('hidden');
      clearInterval(frenzyInterval);
      recalc();
      renderAll();
      return;
    }
    const remaining = Math.ceil((activeFrenzy.endTime - Date.now()) / 1000);
    banner.textContent = activeFrenzy.label + '  —  ' + remaining + 's';
  }, 250);
}

function showNewsLine(text) {
  const el = document.getElementById('news-text');
  el.style.animation = 'none';
  el.textContent = text;
  void el.offsetWidth;
  el.style.animation = '';
}

// ─── TOOLTIP ───────────────────────────────────────────────────────────────

const tooltip = document.getElementById('global-tooltip');

function showTooltip(u, rect) {
  tooltip.innerHTML = `<strong>${u.name}</strong>${u.desc}<br><span style="color:var(--text-gold)">${fmt(u.cost)} ${MINI_POTATO}</span>`;
  tooltip.style.display = 'block';

  let left = rect.right + 10;
  let top  = rect.top;

  if (left + 180 > window.innerWidth) left = rect.left - 180 - 10;
  if (top + tooltip.offsetHeight > window.innerHeight) top = window.innerHeight - tooltip.offsetHeight - 4;

  tooltip.style.left = left + 'px';
  tooltip.style.top  = top  + 'px';
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

// ─── DOM BUILD (runs once) ─────────────────────────────────────────────────

function buildBuildingsList() {
  const container = document.getElementById('buildings-list');
  BUILDINGS.forEach(b => {
    const card = document.createElement('button');
    card.className = 'building-card';
    card.id = 'building-' + b.id;
    card.innerHTML = `
      <span class="b-icon">${ICONS[b.icon] || ''}</span>
      <span class="b-name">${b.name}</span>
      <span class="b-owned" id="owned-${b.id}">0</span>
      <span class="b-desc">${b.desc}</span>
      <span class="b-cost" id="cost-${b.id}">${fmt(b.baseCost)} ${MINI_POTATO}</span>
    `;
    card.addEventListener('click', () => buyBuilding(b));
    container.appendChild(card);
  });
}

function buildAchievementsList() {
  const container = document.getElementById('achievements-list');
  ACHIEVEMENTS.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'achievement';
    div.id = 'ach-' + i;
    div.textContent = a.label;
    container.appendChild(div);
  });
}

// ─── RENDER (runs every tick) ───────────────────────────────────────────────

function renderUpgrades() {
  const available = UPGRADES.filter(u => !u.bought && u.req());
  const snapshot  = available.map(u => u.id).join(',');

  const container = document.getElementById('upgrades-list');

  // Rebuild DOM only when the set of available upgrades changes
  if (snapshot !== lastUpgradeSnapshot) {
    lastUpgradeSnapshot = snapshot;
    container.innerHTML = '';
    available.forEach(u => {
      const btn = document.createElement('button');
      btn.className = 'upgrade-card' + (u.type === 'building' ? ' building-type' : '') + (u.type === 'global' ? ' global-type' : '');
      btn.innerHTML = ICONS[u.icon] || u.icon;
      btn.dataset.upgradeId = u.id;
      btn.addEventListener('click', () => buyUpgrade(u));
      btn.addEventListener('mouseenter', () => showTooltip(u, btn.getBoundingClientRect()));
      btn.addEventListener('mouseleave', hideTooltip);
      container.appendChild(btn);
    });
  }

  // Always refresh disabled state
  container.querySelectorAll('.upgrade-card').forEach(btn => {
    const u = UPGRADES.find(x => x.id === btn.dataset.upgradeId);
    if (u) btn.disabled = potatoes < u.cost;
  });
}

function renderAll() {
  document.getElementById('potato-count').textContent      = fmt(potatoes) + ' potatoes';
  document.getElementById('potato-per-sec').textContent    = passivePerSec.toFixed(1) + ' per second';
  document.getElementById('click-power-display').textContent = '+' + Math.floor(clickPower) + ' per click';

  document.getElementById('stat-total').textContent   = fmt(totalPotatoes);
  document.getElementById('stat-clicks').textContent  = fmt(totalClicks);
  document.getElementById('stat-click').textContent   = Math.floor(clickPower);
  document.getElementById('stat-passive').textContent = passivePerSec.toFixed(1);

  BUILDINGS.forEach(b => {
    const cost = buildingCost(b);
    const card = document.getElementById('building-' + b.id);
    document.getElementById('owned-' + b.id).textContent = b.owned;
    const costEl = document.getElementById('cost-' + b.id);
    if (costEl) costEl.innerHTML = fmt(cost) + ' ' + MINI_POTATO;
    if (card) card.disabled = potatoes < cost;
  });

  renderUpgrades();

  ACHIEVEMENTS.forEach((a, i) => {
    if (a.req()) document.getElementById('ach-' + i).classList.add('unlocked');
  });

  renderPrestigePanel();
  updateAscensionInfo();
}

// ─── POTATO CLICK ──────────────────────────────────────────────────────────

const potatoEl  = document.getElementById('potato');
const wrapperEl = document.getElementById('potato-wrapper');

potatoEl.addEventListener('click', e => {
  potatoes      += clickPower;
  totalPotatoes += clickPower;
  totalClicks++;

  const particle = document.createElement('div');
  particle.className = 'click-particle';
  particle.textContent = '+' + Math.floor(clickPower);
  const rect = wrapperEl.getBoundingClientRect();
  particle.style.left = (e.clientX - rect.left - 14) + 'px';
  particle.style.top  = (e.clientY - rect.top  - 14) + 'px';
  wrapperEl.appendChild(particle);
  setTimeout(() => particle.remove(), 850);

  renderAll();
});

// ─── PASSIVE INCOME ────────────────────────────────────────────────────────

setInterval(() => {
  if (passivePerSec > 0) {
    const gain = passivePerSec / 20;
    potatoes      += gain;
    totalPotatoes += gain;
    renderAll();
  }
}, 50);

// ─── NEWS TICKER ───────────────────────────────────────────────────────────

let newsIdx = 0;
setInterval(() => {
  newsIdx = (newsIdx + 1) % NEWS_LINES.length;
  const el = document.getElementById('news-text');
  el.style.animation = 'none';
  el.textContent = NEWS_LINES[newsIdx];
  void el.offsetWidth;
  el.style.animation = '';
}, 22000);

// ─── INIT ──────────────────────────────────────────────────────────────────

buildBuildingsList();
buildAchievementsList();
applyPrestigeEffects();
recalc();
renderAll();
scheduleGoldenPotato();

document.getElementById('ascend-btn').addEventListener('click', openAscensionScreen);
document.getElementById('asc-confirm').addEventListener('click', doAscend);
document.getElementById('asc-cancel').addEventListener('click', closeAscensionScreen);
