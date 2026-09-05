(function () {
  "use strict";

  // Next.js: expose per-canvas initializer
  window.__straditAnimSingle = function(canvas) {
    const key = canvas.getAttribute('data-hero-anim');
    const theme = THEMES[key] || THEMES.home;
    switch (theme.kind) {
      case 'neural': neural(canvas, theme, { pulse: theme.pulse }); break;
      case 'neuralPulse': neural(canvas, theme, { pulse: true }); break;
      case 'orbits': orbits(canvas, theme); break;
      case 'dataflow': dataflow(canvas, theme); break;
      case 'shieldGrid': shieldGrid(canvas, theme); break;
      case 'lockMatrix': lockMatrix(canvas, theme); break;
      case 'field': field(canvas, theme); break;
      case 'dag': dag(canvas, theme); break;
      case 'globe': globe(canvas, theme); break;
      case 'learning': learning(canvas, theme); break;
      case 'vortex': vortex(canvas, theme); break;
      case 'beacon': beacon(canvas, theme); break;
      case 'careers': careers(canvas, theme); break;
      case 'blockchain': blockchain(canvas, theme); break;
      default: neural(canvas, theme, { pulse: true });
    }
  };

// ---------------------------------------------------------
  // Theme presets — each page hero uses one of these
  // ---------------------------------------------------------
  const THEMES = {
    // Home — generative neural network: flowing nodes + dynamic connections
    home: {
      kind: "neural",
      bg: "#060912",
      particleCount: 140,
      connectDist: 180,
      colorA: [255, 122, 61],   // orange
      colorB: [76, 200, 255],   // cyan
      speed: 0.25,
      pulse: true,
      orbField: true,
    },
    // About — orbital rings: institutional, calm, structured
    about: {
      kind: "orbits",
      bg: "#060912",
      rings: 6,
      particlesPerRing: 60,
      colorA: [255, 122, 61],
      colorB: [255, 183, 107],
      speed: 0.15,
    },
    // Center of Excellence index — radial constellation
    coe: {
      kind: "neural",
      bg: "#060912",
      particleCount: 180,
      connectDist: 160,
      colorA: [255, 122, 61],
      colorB: [197, 125, 255],
      speed: 0.2,
      pulse: true,
      orbField: true,
    },
    // Applied AI — neural net with signal pulses traveling along edges
    ai: {
      kind: "neuralPulse",
      bg: "#060912",
      particleCount: 110,
      connectDist: 200,
      colorA: [255, 122, 61],
      colorB: [76, 200, 255],
      speed: 0.18,
      pulseRate: 0.014,
    },
    // Data Analytics — flowing data streams (3D-ish bars/columns)
    data: {
      kind: "dataflow",
      bg: "#060912",
      colorA: [76, 200, 255],
      colorB: [255, 122, 61],
      density: 70,
      speed: 0.55,
    },
    // Cyber Security — encrypted lock matrix with threat deflections
    cyber: {
      kind: "lockMatrix",
      bg: "#060912",
      colorA: [255, 122, 61],
      colorB: [76, 200, 255],
      colorThreat: [255, 90, 90],
    },
    // Cloud — flowing field of horizontal streams + nodes
    cloud: {
      kind: "field",
      bg: "#060912",
      colorA: [76, 200, 255],
      colorB: [255, 122, 61],
      lines: 24,
      speed: 0.4,
    },
    // Testing — branching tree / DAG that grows and resets
    testing: {
      kind: "dag",
      bg: "#060912",
      colorA: [255, 122, 61],
      colorB: [79, 209, 197],
      cycleSec: 7,
    },
    // GCC — globe + arcs between locations
    gcc: {
      kind: "globe",
      bg: "#060912",
      colorA: [255, 122, 61],
      colorB: [76, 200, 255],
      points: 220,
    },
    // StartIT — learning progress tracks: 5 paths, skill radar, grad bursts
    startit: {
      kind: "learning",
      bg: "#060912",
      colorA: [255, 122, 61],
      colorB: [76, 200, 255],
    },
    // Careers — global talent network
    careers: {
      kind: 'careers',
      bg: '#060912',
    },
    // Contact — minimal beacon: pulsing rings outward from a point
    contact: {
      kind: "beacon",
      bg: "#060912",
      colorA: [255, 122, 61],
      colorB: [76, 200, 255],
    },
    // Digital Assets & Blockchain — on-chain settlement ledger
    digitalassets: {
      kind: "blockchain",
      bg: "#060912",
      colorA: [79, 209, 197],
      colorB: [76, 200, 255],
      colorC: [245, 183, 107],
    },
  };

  // ---------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------
  function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function rand(a, b) { return a + Math.random() * (b - a); }

  function setupHiDPI(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d");
    function resize() {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    return { ctx, resize, dpr };
  }

  // ---------------------------------------------------------
  // RENDERERS
  // ---------------------------------------------------------

  // 1) Neural net — concrete layered network with forward-pass signals, activations, loss curve
  function neural(canvas, theme, opts = {}) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W = 0, H = 0, t = 0;

    // Network architecture: Input(4) → Hidden1(6) → Hidden2(6) → Output(3)
    const ARCH = [4, 6, 6, 3];
    const LAYER_LABELS = ["INPUT", "HIDDEN 1", "HIDDEN 2", "OUTPUT"];
    const LAYER_TAGS   = [["price","volume","spread","momentum"],
                          ["","","","","",""],
                          ["","","","","",""],
                          ["buy","hold","sell"]];

    let nodes = [];   // [{x,y,layer,idx,activation,bias}]
    let edges = [];   // [{from,to,weight}]
    let pulses = [];  // [{from,to,progress,strength}]
    let lossHist = [];
    let lastPulse = 0;
    let forwardPhase = 0; // which layer is currently firing

    function rgb(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

    function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

    function buildNet() {
      nodes = [];
      edges = [];
      const netW = W * 0.58;
      const netX = W * 0.06;
      const netH = H * 0.72;
      const netY = H * 0.12;

      for (let l = 0; l < ARCH.length; l++) {
        const n = ARCH[l];
        const lx = netX + (l / (ARCH.length - 1)) * netW;
        for (let i = 0; i < n; i++) {
          const ly = netY + ((i + 0.5) / n) * netH;
          nodes.push({
            x: lx, y: ly, layer: l, idx: i,
            activation: Math.random(),
            bias: (Math.random() - 0.5) * 0.5,
          });
        }
      }
      // edges between consecutive layers
      for (let l = 0; l < ARCH.length - 1; l++) {
        const fromNodes = nodes.filter(n => n.layer === l);
        const toNodes   = nodes.filter(n => n.layer === l + 1);
        for (const f of fromNodes) {
          for (const t2 of toNodes) {
            edges.push({ from: f, to: t2, weight: (Math.random() - 0.5) * 2 });
          }
        }
      }
      // seed loss history
      lossHist = [];
      for (let i = 0; i < 60; i++) {
        const x = i / 60;
        lossHist.push(0.9 * Math.exp(-x * 2.5) + 0.05 + Math.random() * 0.04);
      }
    }

    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      buildNet();
    }
    init();
    window.addEventListener("resize", () => { resize(); init(); });

    function triggerForwardPass() {
      // fire pulses from layer forwardPhase to forwardPhase+1
      const layer = forwardPhase % (ARCH.length - 1);
      const fromNodes = nodes.filter(n => n.layer === layer);
      const toNodes   = nodes.filter(n => n.layer === layer + 1);
      for (const f of fromNodes) {
        for (const t2 of toNodes) {
          const e = edges.find(e => e.from === f && e.to === t2);
          pulses.push({
            from: f, to: t2,
            progress: 0,
            strength: e ? Math.abs(e.weight) : 0.5,
            positive: e ? e.weight > 0 : true,
          });
        }
      }
      forwardPhase++;
    }

    function frame(ts) {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // bg grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      // spawn forward pass every ~1.4s
      if (ts - lastPulse > 1400) {
        // update activations
        for (const n of nodes) {
          n.activation = Math.max(0, Math.min(1, n.activation + (Math.random() - 0.5) * 0.3));
        }
        // drift weights slightly
        for (const e of edges) e.weight = Math.max(-2, Math.min(2, e.weight + (Math.random()-0.5)*0.1));
        // shift loss curve down (learning)
        lossHist.shift();
        const last = lossHist[lossHist.length - 1];
        lossHist.push(Math.max(0.04, last - rand(0, 0.012) + rand(0, 0.006)));
        triggerForwardPass();
        lastPulse = ts;
      }

      // ---- DRAW EDGES ----
      for (const e of edges) {
        const w = Math.abs(e.weight);
        const pos = e.weight > 0;
        const col = pos ? theme.colorA : theme.colorB;
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.06 + w * 0.12})`;
        ctx.lineWidth = 0.5 + w * 0.8;
        ctx.beginPath();
        ctx.moveTo(e.from.x, e.from.y);
        ctx.lineTo(e.to.x, e.to.y);
        ctx.stroke();
      }

      // ---- DRAW PULSES ----
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += 0.022;
        if (p.progress >= 1) {
          // activate target node
          p.to.activation = sigmoid(p.to.activation + p.strength * (p.positive ? 1 : -1));
          pulses.splice(i, 1);
          continue;
        }
        const x = p.from.x + (p.to.x - p.from.x) * p.progress;
        const y = p.from.y + (p.to.y - p.from.y) * p.progress;
        const col = p.positive ? theme.colorA : theme.colorB;
        // glow
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},0.15)`;
        ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
        // core
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},0.95)`;
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      // ---- DRAW NODES ----
      for (const n of nodes) {
        const act = n.activation;
        const col = theme.colorA;
        const r = 10 + act * 4;
        // glow halo
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${act * 0.18})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2); ctx.fill();
        // fill
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.08 + act * 0.15})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();
        // ring
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.4 + act * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.stroke();
        // activation arc
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},0.95)`;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, -Math.PI/2, -Math.PI/2 + act * Math.PI * 2); ctx.stroke();
        // activation value
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},0.9)`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(act.toFixed(2), n.x, n.y);
        ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";

        // input/output labels
        if (n.layer === 0 && LAYER_TAGS[0][n.idx]) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(255,255,255,0.45)";
          ctx.textAlign = "right";
          ctx.fillText(LAYER_TAGS[0][n.idx], n.x - r - 6, n.y + 3);
          ctx.textAlign = "left";
        }
        if (n.layer === ARCH.length - 1 && LAYER_TAGS[3][n.idx]) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          const oc = n.idx === 0 ? [79,209,197] : n.idx === 2 ? [255,90,90] : [255,255,255];
          ctx.fillStyle = `rgba(${oc[0]},${oc[1]},${oc[2]},0.8)`;
          ctx.fillText(LAYER_TAGS[3][n.idx], n.x + r + 8, n.y + 3);
        }
      }

      // ---- LAYER LABELS ----
      const netW = W * 0.58, netX = W * 0.06;
      for (let l = 0; l < ARCH.length; l++) {
        const lx = netX + (l / (ARCH.length - 1)) * netW;
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.textAlign = "center";
        ctx.fillText(LAYER_LABELS[l], lx, H * 0.9);
        ctx.fillText(`(${ARCH[l]})`, lx, H * 0.9 + 12);
        ctx.textAlign = "left";
      }

      // ---- LOSS CURVE (right panel) ----
      const lossX = W * 0.7, lossY = H * 0.1;
      const lossW = W * 0.26, lossH = H * 0.38;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(lossX + 0.5, lossY + 0.5, lossW, lossH);
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fillRect(lossX, lossY, lossW, 18);
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText("LOSS", lossX + 6, lossY + 12);
      ctx.fillStyle = `rgba(${theme.colorA[0]},${theme.colorA[1]},${theme.colorA[2]},0.9)`;
      ctx.fillText(lossHist[lossHist.length-1].toFixed(4), lossX + lossW - 50, lossY + 12);

      const lp = lossX + 8, lph = lossY + 22, lpW = lossW - 16, lpH = lossH - 30;
      // area
      ctx.beginPath();
      for (let i = 0; i < lossHist.length; i++) {
        const x = lp + (i / (lossHist.length - 1)) * lpW;
        const y = lph + lpH - lossHist[i] * lpH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.lineTo(lp + lpW, lph + lpH); ctx.lineTo(lp, lph + lpH); ctx.closePath();
      ctx.fillStyle = `rgba(${theme.colorA[0]},${theme.colorA[1]},${theme.colorA[2]},0.08)`;
      ctx.fill();
      // line
      ctx.beginPath();
      for (let i = 0; i < lossHist.length; i++) {
        const x = lp + (i / (lossHist.length - 1)) * lpW;
        const y = lph + lpH - lossHist[i] * lpH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${theme.colorA[0]},${theme.colorA[1]},${theme.colorA[2]},0.9)`;
      ctx.lineWidth = 2; ctx.stroke();
      // axes
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(lp, lph); ctx.lineTo(lp, lph+lpH); ctx.lineTo(lp+lpW, lph+lpH); ctx.stroke();
      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillText("EPOCH", lp + lpW/2 - 14, lph + lpH + 11);

      // ---- EPOCH / LR STATS (right, below loss) ----
      const statsY = lossY + lossH + 12;
      const statsH = H * 0.18;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(lossX + 0.5, statsY + 0.5, lossW, statsH);
      const epoch = (t * 4) | 0;
      const lr = (0.001 * Math.exp(-epoch * 0.002)).toFixed(6);
      const items = [
        ["EPOCH", epoch],
        ["LR", lr],
        ["LOSS", lossHist[lossHist.length-1].toFixed(4)],
        ["ACC", (0.96 - lossHist[lossHist.length-1] * 0.4).toFixed(3)],
      ];
      for (let i = 0; i < items.length; i++) {
        const ix = lossX + 8 + (i % 2) * (lossW / 2);
        const iy = statsY + 18 + Math.floor(i / 2) * 22;
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillText(items[i][0], ix, iy);
        ctx.fillStyle = `rgba(${theme.colorA[0]},${theme.colorA[1]},${theme.colorA[2]},0.95)`;
        ctx.fillText(items[i][1], ix, iy + 12);
      }

      requestAnimationFrame(frame);
    }
    frame();
  }

  // 2) Orbits — rings of particles around a center
  function orbits(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    const rings = [];
    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      rings.length = 0;
      for (let i = 0; i < theme.rings; i++) {
        rings.push({
          radius: 80 + i * 70,
          tilt: Math.PI * 0.18 + i * 0.04,
          rot: Math.random() * Math.PI * 2,
          speed: theme.speed * (1 - i * 0.08),
          mix: i / theme.rings,
        });
      }
    }
    init();
    window.addEventListener("resize", () => { resize(); init(); });

    function frame() {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      const cx = W * 0.62, cy = H * 0.5;

      // central glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280);
      g.addColorStop(0, rgba(theme.colorA, 0.18));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      for (const ring of rings) {
        const c = [
          lerp(theme.colorA[0], theme.colorB[0], ring.mix),
          lerp(theme.colorA[1], theme.colorB[1], ring.mix),
          lerp(theme.colorA[2], theme.colorB[2], ring.mix),
        ];
        ctx.strokeStyle = `rgba(${c[0]|0},${c[1]|0},${c[2]|0},0.15)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, ring.radius, ring.radius * Math.cos(ring.tilt), 0, 0, Math.PI * 2);
        ctx.stroke();

        for (let i = 0; i < theme.particlesPerRing; i++) {
          const a = ring.rot + (i / theme.particlesPerRing) * Math.PI * 2;
          const x = cx + Math.cos(a) * ring.radius;
          const y = cy + Math.sin(a) * ring.radius * Math.cos(ring.tilt);
          const sz = 1.2 + Math.sin(t * 2 + i + ring.mix * 4) * 0.6;
          ctx.fillStyle = `rgba(${c[0]|0},${c[1]|0},${c[2]|0},0.85)`;
          ctx.beginPath();
          ctx.arc(x, y, sz, 0, Math.PI * 2);
          ctx.fill();
        }
        ring.rot += ring.speed * 0.01;
      }

      requestAnimationFrame(frame);
    }
    frame();
  }

  // 3) Dataflow — full data analytics dashboard: bar chart + line graph + KPIs + streaming numbers
  function dataflow(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    let bars = [];        // animated bar chart
    let lineHist = [];    // streaming line graph history
    let lineHist2 = [];
    let dataStream = [];  // falling number columns
    let kpiVals = [];     // animated KPI numbers
    let pieAngle = 0;
    let scatter = [];

    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      // 12 bars
      bars = [];
      for (let i = 0; i < 12; i++) {
        bars.push({
          target: rand(0.2, 0.95),
          value: rand(0.2, 0.5),
          mix: i / 12,
          phase: Math.random() * Math.PI * 2,
        });
      }
      // line history seed
      lineHist = []; lineHist2 = [];
      for (let i = 0; i < 60; i++) {
        lineHist.push(0.5 + Math.sin(i * 0.2) * 0.2);
        lineHist2.push(0.4 + Math.cos(i * 0.15) * 0.15);
      }
      // streaming columns of digits
      dataStream = [];
      const cols = Math.floor(W / 26);
      for (let i = 0; i < cols; i++) {
        dataStream.push({
          x: i * 26 + 8,
          y: Math.random() * H,
          speed: rand(40, 90),
          chars: [],
        });
        for (let k = 0; k < 18; k++) dataStream[i].chars.push((Math.random() * 10) | 0);
      }
      // KPI numbers
      kpiVals = [
        { label: "VOL", v: 24813, t: 24813, range: 200 },
        { label: "Δ%",  v: 2.47,  t: 2.47,  range: 0.4, dec: 2, suffix: "%" },
        { label: "AUM", v: 8.42,  t: 8.42,  range: 0.05, dec: 2, suffix: "B" },
        { label: "p50", v: 142,   t: 142,   range: 8, suffix: "ms" },
      ];
      // scatter dots
      scatter = [];
      for (let i = 0; i < 40; i++) {
        scatter.push({ x: Math.random(), y: Math.random(), s: rand(1, 3), mix: Math.random() });
      }
    }
    init();
    window.addEventListener("resize", () => { resize(); init(); });

    let lastBarTick = 0, lastStreamTick = 0, lastKpiTick = 0;

    function rgb(mix, a) {
      const c = [
        lerp(theme.colorA[0], theme.colorB[0], mix) | 0,
        lerp(theme.colorA[1], theme.colorB[1], mix) | 0,
        lerp(theme.colorA[2], theme.colorB[2], mix) | 0,
      ];
      return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    }

    function frame(ts) {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // background grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // ---- streaming digits in background ----
      ctx.font = "11px 'JetBrains Mono', monospace";
      if (ts - lastStreamTick > 90) {
        for (const s of dataStream) s.chars.unshift((Math.random() * 10) | 0);
        for (const s of dataStream) if (s.chars.length > 22) s.chars.pop();
        lastStreamTick = ts;
      }
      for (const s of dataStream) {
        s.y += s.speed * 0.016;
        if (s.y > H + 40) s.y = -40;
        for (let k = 0; k < s.chars.length; k++) {
          const a = (1 - k / s.chars.length) * 0.18;
          ctx.fillStyle = rgb(0.5, a);
          ctx.fillText(s.chars[k], s.x, s.y - k * 14);
        }
      }

      // panel layout
      const pad = 18;
      const cols = W < 380 ? 1 : 2;
      const cellW = (W - pad * 3) / cols;
      const cellH = (H - pad * (cols === 1 ? 5 : 3)) / (cols === 1 ? 4 : 2);

      // ---- COMPACT MODE: canvas too short for full dashboard (mobile cards) ----
      if (cellH < 40) {
        if (ts - lastBarTick > 1100) { for (const b of bars) b.target = rand(0.15, 0.95); lastBarTick = ts; }
        const bx = pad, bw = W - pad * 2;
        const by = pad + 20, bh = H - by - pad;
        if (bh > 4) {
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(255,255,255,0.45)";
          ctx.fillText("VOLUME · 12M", bx, pad + 13);
          const bgap = 3;
          const barW = (bw - bgap * (bars.length - 1)) / bars.length;
          for (let i = 0; i < bars.length; i++) {
            const b = bars[i];
            b.value += (b.target - b.value) * 0.08;
            const h = b.value * bh;
            const x = bx + i * (barW + bgap);
            const y = by + bh - h;
            if (h > 0) {
              const grd = ctx.createLinearGradient(0, y, 0, y + h);
              grd.addColorStop(0, rgb(b.mix, 0.9));
              grd.addColorStop(1, rgb(b.mix, 0.2));
              ctx.fillStyle = grd;
              ctx.fillRect(x, y, Math.max(1, barW), h);
              ctx.fillStyle = rgb(b.mix, 1);
              ctx.fillRect(x, y, Math.max(1, barW), 2);
            }
          }
          ctx.strokeStyle = "rgba(255,255,255,0.15)";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(bx, by + bh + 0.5); ctx.lineTo(bx + bw, by + bh + 0.5); ctx.stroke();
        }
        requestAnimationFrame(frame);
        return;
      }

      // ---- BAR CHART (top-left) ----
      drawPanel(pad, pad, cellW, cellH, "VOLUME · 12M");
      if (ts - lastBarTick > 1100) {
        for (const b of bars) b.target = rand(0.15, 0.95);
        lastBarTick = ts;
      }
      const bx = pad + 12, by = pad + 28;
      const bw = cellW - 24, bh = cellH - 40;
      const bgap = 4;
      const barW = (bw - bgap * (bars.length - 1)) / bars.length;
      for (let i = 0; i < bars.length; i++) {
        const b = bars[i];
        b.value += (b.target - b.value) * 0.08;
        const h = b.value * bh;
        const x = bx + i * (barW + bgap);
        const y = by + bh - h;
        const grd = ctx.createLinearGradient(0, y, 0, y + h);
        grd.addColorStop(0, rgb(b.mix, 0.9));
        grd.addColorStop(1, rgb(b.mix, 0.2));
        ctx.fillStyle = grd;
        ctx.fillRect(x, y, barW, h);
        // tip
        ctx.fillStyle = rgb(b.mix, 1);
        ctx.fillRect(x, y, barW, 2);
      }
      // axis
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.beginPath(); ctx.moveTo(bx, by + bh + 0.5); ctx.lineTo(bx + bw, by + bh + 0.5); ctx.stroke();

      // ---- LINE GRAPH (top-right or below) ----
      const lx = cols === 2 ? pad * 2 + cellW : pad;
      const ly = cols === 2 ? pad : pad * 2 + cellH;
      drawPanel(lx, ly, cellW, cellH, "ALPHA · LIVE");
      // shift history
      lineHist.shift();
      lineHist.push(Math.max(0.05, Math.min(0.95, lineHist[lineHist.length - 1] + rand(-0.06, 0.06))));
      lineHist2.shift();
      lineHist2.push(Math.max(0.05, Math.min(0.95, lineHist2[lineHist2.length - 1] + rand(-0.04, 0.04))));
      const lpx = lx + 12, lpy = ly + 28;
      const lpw = cellW - 24, lph = cellH - 40;
      // area fill
      function drawSeries(hist, mix, fill) {
        ctx.beginPath();
        for (let i = 0; i < hist.length; i++) {
          const x = lpx + (i / (hist.length - 1)) * lpw;
          const y = lpy + lph - hist[i] * lph;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        if (fill) {
          ctx.lineTo(lpx + lpw, lpy + lph);
          ctx.lineTo(lpx, lpy + lph);
          ctx.closePath();
          const g = ctx.createLinearGradient(0, lpy, 0, lpy + lph);
          g.addColorStop(0, rgb(mix, 0.35));
          g.addColorStop(1, rgb(mix, 0));
          ctx.fillStyle = g;
          ctx.fill();
        } else {
          ctx.strokeStyle = rgb(mix, 0.95);
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      drawSeries(lineHist, 0.2, true);
      drawSeries(lineHist2, 0.85, true);
      drawSeries(lineHist, 0.2, false);
      drawSeries(lineHist2, 0.85, false);
      // live tip dot
      const tipY = lpy + lph - lineHist[lineHist.length - 1] * lph;
      ctx.fillStyle = rgb(0.2, 1);
      ctx.beginPath(); ctx.arc(lpx + lpw, tipY, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = rgb(0.2, 0.3);
      ctx.beginPath(); ctx.arc(lpx + lpw, tipY, 8 + Math.sin(t * 4) * 2, 0, Math.PI * 2); ctx.fill();

      // ---- KPI ROW (bottom-left) ----
      const kx = pad, ky = cols === 2 ? pad * 2 + cellH : pad * 3 + cellH * 2;
      drawPanel(kx, ky, cellW, cellH, "KPIs · REAL-TIME");
      if (ts - lastKpiTick > 800) {
        for (const k of kpiVals) k.t = k.v + rand(-k.range, k.range);
        lastKpiTick = ts;
      }
      const kpw = (cellW - 24) / kpiVals.length;
      for (let i = 0; i < kpiVals.length; i++) {
        const k = kpiVals[i];
        k.v += (k.t - k.v) * 0.06;
        const cx = kx + 12 + i * kpw;
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText(k.label, cx + 4, ky + 44);
        ctx.font = "bold 18px 'Inter Tight', sans-serif";
        ctx.fillStyle = rgb(i / kpiVals.length, 1);
        let txt;
        if (k.dec) txt = k.v.toFixed(k.dec);
        else txt = (k.v | 0).toLocaleString();
        if (k.suffix) txt += k.suffix;
        ctx.fillText(txt, cx + 4, ky + 68);
        // mini sparkline
        ctx.strokeStyle = rgb(i / kpiVals.length, 0.4);
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let j = 0; j < 16; j++) {
          const sx = cx + 4 + j * 4;
          const sy = ky + 88 + Math.sin(t * 3 + i + j * 0.4) * 4;
          if (j === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // ---- SCATTER + DONUT (bottom-right) ----
      const sx2 = cols === 2 ? pad * 2 + cellW : pad;
      const sy2 = cols === 2 ? pad * 2 + cellH : pad * 4 + cellH * 3;
      drawPanel(sx2, sy2, cellW, cellH, "CLUSTER · K-MEANS");
      const spx = sx2 + 12, spy = sy2 + 28;
      const spw = cellW - 24, sph = cellH - 40;
      // donut on right
      const dr = Math.min(sph * 0.4, 36);
      const dcx = spx + spw - dr - 6;
      const dcy = spy + sph / 2;
      pieAngle += 0.01;
      const segments = [0.42, 0.28, 0.18, 0.12];
      let ang = -Math.PI / 2 + pieAngle;
      for (let i = 0; i < segments.length; i++) {
        ctx.beginPath();
        ctx.arc(dcx, dcy, dr, ang, ang + segments[i] * Math.PI * 2);
        ctx.arc(dcx, dcy, dr - 8, ang + segments[i] * Math.PI * 2, ang, true);
        ctx.closePath();
        ctx.fillStyle = rgb(i / segments.length, 0.85);
        ctx.fill();
        ang += segments[i] * Math.PI * 2;
      }
      // scatter on left
      const scaW = spw - dr * 2 - 16;
      for (const p of scatter) {
        // gentle drift
        p.x += Math.sin(t + p.mix * 6) * 0.0008;
        p.y += Math.cos(t * 1.3 + p.mix * 6) * 0.0008;
        p.x = Math.max(0, Math.min(1, p.x));
        p.y = Math.max(0, Math.min(1, p.y));
        const px = spx + p.x * scaW;
        const py = spy + p.y * sph;
        ctx.fillStyle = rgb(p.mix, 0.7);
        ctx.beginPath(); ctx.arc(px, py, p.s, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgb(p.mix, 0.15);
        ctx.beginPath(); ctx.arc(px, py, p.s * 3, 0, Math.PI * 2); ctx.fill();
      }
      // axes
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.beginPath(); ctx.moveTo(spx, spy + sph); ctx.lineTo(spx + scaW, spy + sph); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(spx, spy); ctx.lineTo(spx, spy + sph); ctx.stroke();

      requestAnimationFrame(frame);
    }

    function drawPanel(x, y, w, h, title) {
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, w, h);
      // title bar
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.fillRect(x, y, w, 20);
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText(title, x + 8, y + 13);
      // live dot
      ctx.fillStyle = rgb(0.2, 1);
      ctx.beginPath(); ctx.arc(x + w - 10, y + 10, 2.5, 0, Math.PI * 2); ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  // 4) Shield grid — defensive lattice + occasional threat pings
  function shieldGrid(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    const pings = [];
    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
    }
    init();
    window.addEventListener("resize", () => { resize(); init(); });

    function frame() {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      const cs = theme.cellSize;
      const cx = W * 0.5, cy = H * 0.5;

      // hex-like dot grid
      for (let y = 0; y < H + cs; y += cs) {
        for (let x = 0; x < W + cs; x += cs) {
          const dx = x - cx, dy = y - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(d * 0.018 - t * 1.6) * 0.5 + 0.5;
          const a = 0.04 + wave * 0.18;
          ctx.fillStyle = rgba(theme.colorA, a);
          ctx.beginPath();
          ctx.arc(x, y, 1 + wave * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // pings
      if (Math.random() < theme.pingRate) {
        pings.push({
          x: rand(W * 0.1, W * 0.9),
          y: rand(H * 0.1, H * 0.9),
          r: 0,
          a: 1,
          col: Math.random() < 0.7 ? theme.colorA : theme.colorB,
        });
      }
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = pings[i];
        p.r += 1.6;
        p.a *= 0.985;
        if (p.a < 0.02) { pings.splice(i, 1); continue; }
        ctx.strokeStyle = rgba(p.col, p.a * 0.7);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = rgba(p.col, p.a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  // 4b) Lock matrix — encrypted scrolling characters + central shield + intrusion deflections
  function lockMatrix(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    let columns = [];
    const threats = [];
    const chars = "01░▒▓█◆◇▲△●○■□#$%&*+-=<>{}[]|/\\";
    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      columns = [];
      const colW = 14;
      const n = Math.ceil(W / colW);
      for (let i = 0; i < n; i++) {
        columns.push({
          x: i * colW + colW / 2,
          y: Math.random() * H,
          speed: rand(0.6, 2.2),
          length: ((Math.random() * 12) | 0) + 6,
          chars: Array.from({length: 24}, () => chars[(Math.random() * chars.length) | 0]),
          mix: Math.random(),
        });
      }
    }
    init();
    window.addEventListener("resize", () => { resize(); init(); });

    function frame() {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = "rgba(6,9,18,0.25)";
      ctx.fillRect(0, 0, W, H);

      const cx = W * 0.55, cy = H * 0.5;

      // raining glyph columns
      ctx.font = "12px JetBrains Mono, monospace";
      ctx.textBaseline = "middle";
      for (const c of columns) {
        c.y += c.speed;
        if (c.y - c.length * 14 > H) { c.y = -10; c.chars = Array.from({length: 24}, () => chars[(Math.random()*chars.length)|0]); }
        if (Math.random() < 0.04) c.chars[(Math.random() * c.chars.length) | 0] = chars[(Math.random()*chars.length)|0];
        // distance-from-center fade so center stays clean for the shield
        const dx = c.x - cx, dy = c.y - cy;
        const dCenter = Math.sqrt(dx*dx + dy*dy);
        const centerFade = Math.min(1, Math.max(0, (dCenter - 90) / 80));
        for (let k = 0; k < c.length; k++) {
          const yy = c.y - k * 14;
          if (yy < -10 || yy > H + 10) continue;
          const tip = k === 0;
          const a = (tip ? 1 : 0.55 - k / c.length * 0.5) * centerFade;
          if (a <= 0.02) continue;
          ctx.fillStyle = tip
            ? `rgba(255,255,255,${a})`
            : rgba(theme.colorA, a * 0.7);
          ctx.fillText(c.chars[k % c.chars.length], c.x, yy);
        }
      }

      // outer rotating ring (perimeter)
      const rOuter = 110;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.4);
      ctx.strokeStyle = rgba(theme.colorA, 0.5);
      ctx.lineWidth = 1.4;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, rOuter, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // inner hex
      const rIn = 64;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 0.6);
      ctx.strokeStyle = rgba(theme.colorA, 0.9);
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * rIn, y = Math.sin(a) * rIn;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      // inner glow
      const grd = ctx.createRadialGradient(0, 0, 10, 0, 0, rIn);
      grd.addColorStop(0, rgba(theme.colorA, 0.5));
      grd.addColorStop(1, rgba(theme.colorA, 0));
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();

      // padlock glyph (bold)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = rgba(theme.colorA, 0.95);
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      // shackle
      ctx.beginPath();
      ctx.arc(0, -8, 14, Math.PI, 0);
      ctx.stroke();
      // body
      ctx.fillStyle = rgba(theme.colorA, 0.95);
      const bw = 32, bh = 24;
      ctx.beginPath();
      ctx.moveTo(-bw/2, -2);
      ctx.lineTo(bw/2, -2);
      ctx.lineTo(bw/2, -2 + bh);
      ctx.lineTo(-bw/2, -2 + bh);
      ctx.closePath();
      ctx.fill();
      // keyhole
      ctx.fillStyle = "#060912";
      ctx.beginPath(); ctx.arc(0, 7, 3, 0, Math.PI*2); ctx.fill();
      ctx.fillRect(-1.2, 7, 2.4, 7);
      ctx.restore();

      // spawn threats from edges
      if (Math.random() < 0.04) {
        const side = (Math.random() * 4) | 0;
        let sx, sy;
        if (side === 0) { sx = Math.random()*W; sy = -10; }
        else if (side === 1) { sx = W+10; sy = Math.random()*H; }
        else if (side === 2) { sx = Math.random()*W; sy = H+10; }
        else { sx = -10; sy = Math.random()*H; }
        threats.push({ x: sx, y: sy, vx: (cx-sx)*0.006, vy: (cy-sy)*0.006, life: 1, blocked: false });
      }
      for (let i = threats.length - 1; i >= 0; i--) {
        const th = threats[i];
        if (!th.blocked) {
          th.x += th.vx; th.y += th.vy;
          const dx = th.x - cx, dy = th.y - cy;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < rOuter) {
            th.blocked = true;
            // shockwave
            th.shock = 0;
          }
          // line trail
          ctx.strokeStyle = rgba(theme.colorThreat, 0.7);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(th.x - th.vx*8, th.y - th.vy*8);
          ctx.lineTo(th.x, th.y);
          ctx.stroke();
          ctx.fillStyle = rgba(theme.colorThreat, 0.95);
          ctx.beginPath(); ctx.arc(th.x, th.y, 2.5, 0, Math.PI*2); ctx.fill();
        } else {
          th.shock += 1.2;
          th.life -= 0.04;
          if (th.life <= 0) { threats.splice(i, 1); continue; }
          // deflection ring
          ctx.strokeStyle = rgba(theme.colorA, th.life * 0.9);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(th.x, th.y, th.shock, 0, Math.PI*2);
          ctx.stroke();
          ctx.strokeStyle = rgba(theme.colorB, th.life * 0.5);
          ctx.beginPath();
          ctx.arc(th.x, th.y, th.shock * 1.6, 0, Math.PI*2);
          ctx.stroke();
        }
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  // 5) Field — data migration: legacy datacenter → cloud, with packets in flight
  function field(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    let packets = [];
    let migratedCount = 0;
    let totalCount = 4892;
    let progress = 0;
    let lastSpawn = 0;
    let rackBlocks = [];
    let cloudBlocks = [];

    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      packets = [];
      migratedCount = 0;
      progress = 0;
      // legacy rack rows (4 racks × 6 units)
      rackBlocks = [];
      for (let r2 = 0; r2 < 4; r2++) {
        for (let c = 0; c < 6; c++) {
          rackBlocks.push({ r: r2, c, migrated: false, blink: Math.random() * Math.PI * 2 });
        }
      }
      // cloud target slots
      cloudBlocks = [];
      for (let i = 0; i < 24; i++) cloudBlocks.push({ filled: false, glow: 0 });
    }
    init();
    window.addEventListener("resize", () => { resize(); init(); });

    function rgb(mix, a) {
      const c = [
        lerp(theme.colorA[0], theme.colorB[0], mix) | 0,
        lerp(theme.colorA[1], theme.colorB[1], mix) | 0,
        lerp(theme.colorA[2], theme.colorB[2], mix) | 0,
      ];
      return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    }

    function frame(ts) {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // bg grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      const pad = 24;
      const sideW = Math.min(180, W * 0.26);
      const sideH = Math.min(H - pad * 2 - 30, 280);
      const leftX = pad;
      const leftY = (H - sideH) / 2;
      const rightX = W - pad - sideW;
      const rightY = leftY;

      // ===== LEGACY DATACENTER (left) =====
      // rack frame
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(leftX + 0.5, leftY + 0.5, sideW, sideH);
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fillRect(leftX, leftY, sideW, sideH);
      // header
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(leftX, leftY, sideW, 22);
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText("LEGACY · ON-PREM", leftX + 8, leftY + 14);
      // status dot (red-ish to indicate decommissioning)
      ctx.fillStyle = "rgba(255,90,90,0.9)";
      ctx.beginPath(); ctx.arc(leftX + sideW - 12, leftY + 11, 2.5, 0, Math.PI * 2); ctx.fill();

      // rack units grid
      const rackPad = 12;
      const rackInnerX = leftX + rackPad;
      const rackInnerY = leftY + 30;
      const rackInnerW = sideW - rackPad * 2;
      const rackInnerH = sideH - 40;
      const cols = 6, rows = 4;
      const cellW = rackInnerW / cols;
      const cellH = rackInnerH / rows;
      for (const blk of rackBlocks) {
        const bx = rackInnerX + blk.c * cellW + 2;
        const by = rackInnerY + blk.r * cellH + 2;
        const bw = cellW - 4;
        const bh = cellH - 4;
        if (blk.migrated) {
          ctx.strokeStyle = "rgba(255,255,255,0.08)";
          ctx.lineWidth = 1;
          ctx.strokeRect(bx + 0.5, by + 0.5, bw, bh);
          // X mark
          ctx.strokeStyle = "rgba(255,255,255,0.15)";
          ctx.beginPath();
          ctx.moveTo(bx + 4, by + 4); ctx.lineTo(bx + bw - 4, by + bh - 4);
          ctx.moveTo(bx + bw - 4, by + 4); ctx.lineTo(bx + 4, by + bh - 4);
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.05)";
          ctx.fillRect(bx, by, bw, bh);
          ctx.strokeStyle = "rgba(255,255,255,0.18)";
          ctx.lineWidth = 1;
          ctx.strokeRect(bx + 0.5, by + 0.5, bw, bh);
          // blinking activity LED
          const led = (Math.sin(t * 4 + blk.blink) + 1) * 0.5;
          ctx.fillStyle = `rgba(${theme.colorA[0]|0},${theme.colorA[1]|0},${theme.colorA[2]|0},${0.3 + led * 0.7})`;
          ctx.beginPath(); ctx.arc(bx + 5, by + bh / 2, 1.5, 0, Math.PI * 2); ctx.fill();
          // disk lines
          ctx.strokeStyle = "rgba(255,255,255,0.12)";
          ctx.lineWidth = 0.5;
          for (let li = 1; li < 3; li++) {
            const ly2 = by + (bh / 3) * li;
            ctx.beginPath(); ctx.moveTo(bx + 10, ly2); ctx.lineTo(bx + bw - 4, ly2); ctx.stroke();
          }
        }
      }

      // ===== CLOUD (right) =====
      // cloud silhouette
      const cx0 = rightX, cy0 = rightY;
      const cw = sideW, ch = sideH;
      // cloud puff outline
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.strokeStyle = rgb(0.4, 0.5);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const cloudY = cy0 + 30;
      const cloudH = ch - 40;
      // build a soft cloud shape
      ctx.moveTo(cx0 + cw * 0.1, cloudY + cloudH);
      ctx.bezierCurveTo(cx0 - 5, cloudY + cloudH, cx0 - 5, cloudY + cloudH * 0.55, cx0 + cw * 0.18, cloudY + cloudH * 0.5);
      ctx.bezierCurveTo(cx0 + cw * 0.15, cloudY - 10, cx0 + cw * 0.55, cloudY - 18, cx0 + cw * 0.55, cloudY + cloudH * 0.25);
      ctx.bezierCurveTo(cx0 + cw * 0.7, cloudY - 8, cx0 + cw + 5, cloudY + cloudH * 0.1, cx0 + cw * 0.85, cloudY + cloudH * 0.45);
      ctx.bezierCurveTo(cx0 + cw + 8, cloudY + cloudH * 0.55, cx0 + cw + 5, cloudY + cloudH, cx0 + cw * 0.9, cloudY + cloudH);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // header label
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText("CLOUD · TARGET", cx0 + 8, cy0 + 14);
      ctx.fillStyle = rgb(0.2, 0.95);
      ctx.beginPath(); ctx.arc(cx0 + cw - 12, cy0 + 11, 2.5, 0, Math.PI * 2); ctx.fill();

      // cloud target slots (6×4 inside the cloud body)
      const slotCols = 6, slotRows = 4;
      const slotPadX = cw * 0.18, slotPadY = 24;
      const slotW = (cw - slotPadX * 2) / slotCols;
      const slotH = (cloudH - slotPadY * 2) / slotRows;
      for (let i = 0; i < cloudBlocks.length; i++) {
        const blk = cloudBlocks[i];
        const r2 = (i / slotCols) | 0, c = i % slotCols;
        const bx = cx0 + slotPadX + c * slotW + 2;
        const by = cloudY + slotPadY + r2 * slotH + 2;
        const bw = slotW - 4, bh = slotH - 4;
        if (blk.filled) {
          blk.glow = Math.max(0, blk.glow - 0.02);
          const g = blk.glow;
          ctx.fillStyle = rgb(0.3, 0.15 + g * 0.6);
          ctx.fillRect(bx, by, bw, bh);
          ctx.strokeStyle = rgb(0.3, 0.6 + g * 0.4);
          ctx.lineWidth = 1;
          ctx.strokeRect(bx + 0.5, by + 0.5, bw, bh);
          // checkmark
          ctx.strokeStyle = rgb(0.3, 0.9);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(bx + bw * 0.25, by + bh * 0.55);
          ctx.lineTo(bx + bw * 0.45, by + bh * 0.75);
          ctx.lineTo(bx + bw * 0.78, by + bh * 0.3);
          ctx.stroke();
        } else {
          ctx.strokeStyle = "rgba(255,255,255,0.08)";
          ctx.lineWidth = 0.8;
          ctx.setLineDash([2, 2]);
          ctx.strokeRect(bx + 0.5, by + 0.5, bw, bh);
          ctx.setLineDash([]);
        }
      }

      // ===== MIGRATION CHANNEL (between) =====
      const chX0 = leftX + sideW;
      const chX1 = rightX;
      const chY = (leftY + sideH / 2);

      // channel rails
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(chX0, chY - 30); ctx.lineTo(chX1, chY - 30);
      ctx.moveTo(chX0, chY + 30); ctx.lineTo(chX1, chY + 30);
      ctx.stroke();
      ctx.setLineDash([]);

      // channel center line with flowing gradient
      const grad = ctx.createLinearGradient(chX0, chY, chX1, chY);
      grad.addColorStop(0, rgb(0.0, 0));
      grad.addColorStop((Math.sin(t) + 1) / 2, rgb(0.3, 0.7));
      grad.addColorStop(1, rgb(0.5, 0));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(chX0, chY); ctx.lineTo(chX1, chY); ctx.stroke();

      // spawn migration packets
      const unmigrated = rackBlocks.filter(b => !b.migrated);
      const emptySlots = cloudBlocks.map((b, i) => ({ b, i })).filter(o => !o.b.filled);
      if (ts - lastSpawn > 360 && unmigrated.length && emptySlots.length && packets.length < 8) {
        const src = unmigrated[(Math.random() * unmigrated.length) | 0];
        const dst = emptySlots[(Math.random() * emptySlots.length) | 0];
        src.migrated = true; // visually mark as in-transit (we'll keep checks simple)
        const sx = rackInnerX + src.c * cellW + cellW / 2;
        const sy = rackInnerY + src.r * cellH + cellH / 2;
        const dr = (dst.i / slotCols) | 0, dc = dst.i % slotCols;
        const tx = cx0 + slotPadX + dc * slotW + slotW / 2;
        const ty = cloudY + slotPadY + dr * slotH + slotH / 2;
        packets.push({ sx, sy, tx, ty, p: 0, dstIdx: dst.i, mix: Math.random() });
        lastSpawn = ts;
      }
      // advance packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i];
        pk.p += 0.012;
        if (pk.p >= 1) {
          cloudBlocks[pk.dstIdx].filled = true;
          cloudBlocks[pk.dstIdx].glow = 1;
          migratedCount++;
          packets.splice(i, 1);
          // when all done, reset cycle
          if (cloudBlocks.every(b => b.filled)) {
            setTimeout(() => init(), 1200);
          }
          continue;
        }
        // bezier path: arc up
        const ease = pk.p;
        const midX = (pk.sx + pk.tx) / 2;
        const midY = Math.min(pk.sy, pk.ty) - 40 - Math.sin(pk.p * Math.PI) * 20;
        const x = (1 - ease) * (1 - ease) * pk.sx + 2 * (1 - ease) * ease * midX + ease * ease * pk.tx;
        const y = (1 - ease) * (1 - ease) * pk.sy + 2 * (1 - ease) * ease * midY + ease * ease * pk.ty;
        // trail
        ctx.strokeStyle = rgb(pk.mix, 0.25);
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let s = 0; s < 8; s++) {
          const e2 = Math.max(0, ease - s * 0.02);
          const px = (1 - e2) * (1 - e2) * pk.sx + 2 * (1 - e2) * e2 * midX + e2 * e2 * pk.tx;
          const py = (1 - e2) * (1 - e2) * pk.sy + 2 * (1 - e2) * e2 * midY + e2 * e2 * pk.ty;
          if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
        // packet glyph (small file icon)
        ctx.fillStyle = rgb(pk.mix, 0.95);
        ctx.fillRect(x - 4, y - 5, 8, 10);
        ctx.fillStyle = rgb(pk.mix, 0.4);
        ctx.fillRect(x - 4, y - 5, 8, 10);
        ctx.strokeStyle = rgb(pk.mix, 1);
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 4 + 0.5, y - 5 + 0.5, 8, 10);
        // halo
        ctx.fillStyle = rgb(pk.mix, 0.25);
        ctx.beginPath(); ctx.arc(x, y, 7 + Math.sin(t * 4) * 2, 0, Math.PI * 2); ctx.fill();
      }

      // ===== PROGRESS HUD =====
      progress = cloudBlocks.filter(b => b.filled).length / cloudBlocks.length;
      const hudY = H - 28;
      const hudW = Math.min(W * 0.55, 360);
      const hudX = (W - hudW) / 2;
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText("MIGRATION", hudX, hudY - 8);
      const pctTxt = `${(progress * 100).toFixed(1)}%`;
      ctx.fillStyle = rgb(0.3, 0.95);
      ctx.fillText(pctTxt, hudX + hudW - ctx.measureText(pctTxt).width, hudY - 8);
      // bar
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(hudX, hudY, hudW, 4);
      ctx.fillStyle = rgb(0.3, 0.95);
      ctx.fillRect(hudX, hudY, hudW * progress, 4);
      // live counter
      const migrated = Math.floor(progress * totalCount);
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      const counter = `${migrated.toLocaleString()} / ${totalCount.toLocaleString()} workloads`;
      ctx.fillText(counter, hudX, hudY + 16);
      // throughput indicator
      const tput = (40 + Math.sin(t * 1.5) * 12).toFixed(1) + " MB/s";
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fillText(tput, hudX + hudW - ctx.measureText(tput).width, hudY + 16);

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // 6) DAG — CI/test suite: live test runner with pass/fail, pipeline stages, coverage
  function dag(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    let tests = [], pipeline = [], coverage = 0, coverageTarget = 92;
    let lastSpawn = 0, lastPipe = 0;
    const PASS_COL = [79, 209, 197];   // teal
    const FAIL_COL = [255, 90, 90];    // red
    const RUN_COL  = [255, 122, 61];   // orange
    const DIM_COL  = [86, 99, 138];    // muted

    const PIPE_STAGES = ["Build", "Lint", "Unit", "Integration", "E2E", "Deploy"];
    const TEST_NAMES = [
      "auth.spec", "api.test", "db.unit", "cache.spec", "queue.test",
      "parser.unit", "router.spec", "billing.test", "notify.spec", "search.unit",
      "export.spec", "import.test", "report.unit", "user.spec", "audit.test"
    ];

    function rgb(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      tests = [];
      pipeline = PIPE_STAGES.map((s, i) => ({
        name: s, status: "pending", progress: 0, i,
        startAt: i * 1.8,
      }));
      coverage = 0;
    }
    init();
    window.addEventListener("resize", () => { resize(); init(); });

    function spawnTest() {
      const name = TEST_NAMES[(Math.random() * TEST_NAMES.length) | 0] + `.ts`;
      const willPass = Math.random() < 0.88;
      tests.unshift({ name, status: "running", elapsed: 0, pass: willPass, duration: rand(0.4, 2.2) });
      if (tests.length > 12) tests.pop();
    }

    function drawPanel(x, y, w, h, title) {
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fillRect(x, y, w, 20);
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText(title, x + 8, y + 13);
      // live indicator
      ctx.fillStyle = rgb(PASS_COL, 1);
      ctx.beginPath(); ctx.arc(x + w - 10, y + 10, 2.5, 0, Math.PI * 2); ctx.fill();
    }

    function frame(ts) {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // bg grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      const pad = 16;
      const cols = W < 380 ? 1 : 2;
      const cellW = (W - pad * 3) / cols;
      const cellH = (H - pad * (cols === 1 ? 5 : 3)) / (cols === 1 ? 4 : 2);

      // ---- PIPELINE (top-left) ----
      drawPanel(pad, pad, cellW, cellH, "CI PIPELINE");
      const stageW = (cellW - 24) / PIPE_STAGES.length;
      const stageY = pad + 36;

      // advance pipeline stages
      for (let i = 0; i < pipeline.length; i++) {
        const s = pipeline[i];
        if (s.status === "pending" && t > s.startAt) s.status = "running";
        if (s.status === "running") {
          s.progress += 0.008;
          if (s.progress >= 1) {
            s.status = Math.random() < 0.92 ? "pass" : "fail";
            s.progress = 1;
            // restart cycle after last stage
            if (i === pipeline.length - 1 && s.status === "pass") {
              setTimeout(() => {
                pipeline = PIPE_STAGES.map((st, j) => ({ name: st, status: "pending", progress: 0, i: j, startAt: t + j * 1.8 }));
                coverage = 0;
              }, 1800);
            }
          }
        }
        const sx = pad + 12 + i * stageW;
        const sy = stageY;
        const sc = s.status === "pass" ? PASS_COL : s.status === "fail" ? FAIL_COL : s.status === "running" ? RUN_COL : DIM_COL;

        // connector line
        if (i < pipeline.length - 1) {
          ctx.strokeStyle = i < pipeline.length - 1 && pipeline[i+1].status !== "pending"
            ? rgb(sc, 0.5) : "rgba(255,255,255,0.1)";
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(sx + stageW * 0.7, sy + 12);
          ctx.lineTo(sx + stageW, sy + 12);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // node
        ctx.fillStyle = rgb(sc, s.status === "pending" ? 0.12 : 0.2);
        ctx.beginPath(); ctx.arc(sx + stageW * 0.35, sy + 12, 10, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = rgb(sc, s.status === "pending" ? 0.3 : 0.9);
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(sx + stageW * 0.35, sy + 12, 10, 0, Math.PI * 2); ctx.stroke();

        // progress arc for running
        if (s.status === "running") {
          ctx.strokeStyle = rgb(RUN_COL, 0.95);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(sx + stageW * 0.35, sy + 12, 10, -Math.PI/2, -Math.PI/2 + s.progress * Math.PI * 2);
          ctx.stroke();
        }

        // icon inside node
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        if (s.status === "pass") { ctx.fillStyle = rgb(PASS_COL, 1); ctx.fillText("✓", sx + stageW * 0.35, sy + 12); }
        else if (s.status === "fail") { ctx.fillStyle = rgb(FAIL_COL, 1); ctx.fillText("✕", sx + stageW * 0.35, sy + 12); }
        else { ctx.fillStyle = rgb(sc, 0.6); ctx.fillText((i+1).toString(), sx + stageW * 0.35, sy + 12); }
        ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";

        // label
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = rgb(sc, s.status === "pending" ? 0.3 : 0.8);
        ctx.textAlign = "center";
        ctx.fillText(s.name, sx + stageW * 0.35, sy + 28);
        ctx.textAlign = "left";
      }

      // ---- TEST LIST (top-right) ----
      const lx = cols === 2 ? pad * 2 + cellW : pad;
      const ly = cols === 2 ? pad : pad * 2 + cellH;
      drawPanel(lx, ly, cellW, cellH, "TEST RUNNER · LIVE");

      // spawn tests
      if (ts - lastSpawn > 420) { spawnTest(); lastSpawn = ts; }

      const rowH = (cellH - 28) / 9;
      for (let i = 0; i < Math.min(tests.length, 9); i++) {
        const t2 = tests[i];
        t2.elapsed += 0.016;
        if (t2.status === "running" && t2.elapsed >= t2.duration) {
          t2.status = t2.pass ? "pass" : "fail";
          if (t2.pass) coverage = Math.min(coverageTarget, coverage + rand(0.2, 0.6));
        }
        const ry = ly + 26 + i * rowH;
        const sc = t2.status === "pass" ? PASS_COL : t2.status === "fail" ? FAIL_COL : RUN_COL;

        // status icon
        ctx.font = "10px sans-serif";
        ctx.fillStyle = rgb(sc, 0.9);
        const icon = t2.status === "pass" ? "✓" : t2.status === "fail" ? "✕" : "●";
        ctx.fillText(icon, lx + 10, ry + rowH * 0.65);

        // test name
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = t2.status === "running" ? rgb(RUN_COL, 1) : rgb(sc, t2.status === "pass" ? 0.7 : 0.9);
        ctx.fillText(t2.name, lx + 24, ry + rowH * 0.65);

        // duration
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        const dur = t2.status === "running" ? (t2.elapsed * 1000).toFixed(0) + "ms…" : (t2.duration * 1000).toFixed(0) + "ms";
        ctx.textAlign = "right";
        ctx.fillText(dur, lx + cellW - 8, ry + rowH * 0.65);
        ctx.textAlign = "left";

        // running pulse bar
        if (t2.status === "running") {
          const prog = t2.elapsed / t2.duration;
          ctx.fillStyle = rgb(RUN_COL, 0.18);
          ctx.fillRect(lx, ry, cellW, rowH);
          ctx.fillStyle = rgb(RUN_COL, 0.35);
          ctx.fillRect(lx, ry + rowH - 2, cellW * prog, 2);
        }
      }

      // ---- COVERAGE METER (bottom-left) ----
      const cx2 = pad, cy2 = cols === 2 ? pad * 2 + cellH : pad * 3 + cellH * 2;
      drawPanel(cx2, cy2, cellW, cellH, "COVERAGE");
      const covX = cx2 + 12, covY = cy2 + 28, covW = cellW - 24, covH = cellH - 44;

      // big coverage number
      ctx.font = `bold ${Math.min(56, covH * 0.55)}px 'Inter Tight', sans-serif`;
      ctx.fillStyle = rgb(PASS_COL, 0.95);
      ctx.textAlign = "center";
      ctx.fillText(coverage.toFixed(1) + "%", cx2 + cellW / 2, cy2 + cellH * 0.48);
      ctx.textAlign = "left";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.textAlign = "center";
      ctx.fillText("code coverage", cx2 + cellW / 2, cy2 + cellH * 0.62);
      ctx.textAlign = "left";

      // bar
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(covX, cy2 + cellH * 0.72, covW, 6);
      ctx.fillStyle = rgb(PASS_COL, 0.85);
      ctx.fillRect(covX, cy2 + cellH * 0.72, covW * (coverage / 100), 6);

      // target line
      ctx.strokeStyle = rgb(RUN_COL, 0.8);
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      const targetX = covX + covW * (coverageTarget / 100);
      ctx.beginPath(); ctx.moveTo(targetX, cy2 + cellH * 0.68); ctx.lineTo(targetX, cy2 + cellH * 0.82); ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.fillStyle = rgb(RUN_COL, 0.9);
      ctx.fillText("target", targetX + 4, cy2 + cellH * 0.68);

      // ---- FLAKINESS + STATS (bottom-right) ----
      const sx2 = cols === 2 ? pad * 2 + cellW : pad;
      const sy2 = cols === 2 ? pad * 2 + cellH : pad * 4 + cellH * 3;
      drawPanel(sx2, sy2, cellW, cellH, "SUITE STATS");

      const passed = tests.filter(t2 => t2.status === "pass").length;
      const failed = tests.filter(t2 => t2.status === "fail").length;
      const running = tests.filter(t2 => t2.status === "running").length;
      const total = tests.length;

      const stats = [
        { label: "PASSED", val: passed, col: PASS_COL },
        { label: "FAILED", val: failed, col: FAIL_COL },
        { label: "RUNNING", val: running, col: RUN_COL },
        { label: "FLAKY", val: "<0.4%", col: DIM_COL },
      ];
      const sw = (cellW - 24) / stats.length;
      for (let i = 0; i < stats.length; i++) {
        const s2 = stats[i];
        const sx3 = sx2 + 12 + i * sw;
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fillText(s2.label, sx3, sy2 + 44);
        ctx.font = `bold 22px 'Inter Tight', sans-serif`;
        ctx.fillStyle = rgb(s2.col, 0.95);
        ctx.fillText(s2.val, sx3, sy2 + 72);
        // mini bar
        const barH = typeof s2.val === "number" ? (s2.val / Math.max(total, 1)) * 28 : 8;
        ctx.fillStyle = rgb(s2.col, 0.25);
        ctx.fillRect(sx3, sy2 + 82, sw - 8, 28);
        ctx.fillStyle = rgb(s2.col, 0.7);
        ctx.fillRect(sx3, sy2 + 82 + (28 - barH), sw - 8, barH);
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // 7) Globe — wireframe sphere with arcs
  function globe(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    let pts = [];
    let arcs = [];
    init();
    window.addEventListener("resize", () => { resize(); init(); });
    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      pts = [];
      for (let i = 0; i < theme.points; i++) {
        // even sphere distribution
        const u = Math.random(), v = Math.random();
        const phi = Math.acos(2 * u - 1);
        const th = 2 * Math.PI * v;
        pts.push({
          x: Math.sin(phi) * Math.cos(th),
          y: Math.sin(phi) * Math.sin(th),
          z: Math.cos(phi),
        });
      }
    }

    function spawnArc() {
      if (pts.length < 2) return;
      const a = pts[(Math.random() * pts.length) | 0];
      const b = pts[(Math.random() * pts.length) | 0];
      arcs.push({ a, b, t: 0 });
    }

    function frame() {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      const cx = W * 0.62, cy = H * 0.5;
      const R = Math.min(W, H) * 0.32;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // halo
      const grd = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.4);
      grd.addColorStop(0, rgba(theme.colorA, 0.12));
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      const rotY = t * 0.2;
      const rotX = 0.3;

      function project(p) {
        // rotate Y
        let x = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        let z = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
        let y = p.y;
        // tilt
        const yy = y * Math.cos(rotX) - z * Math.sin(rotX);
        const zz = y * Math.sin(rotX) + z * Math.cos(rotX);
        return { x: cx + x * R, y: cy + yy * R, z: zz };
      }

      // latitude/longitude grid
      ctx.strokeStyle = rgba(theme.colorA, 0.15);
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        for (let lon = 0; lon <= 360; lon += 6) {
          const phi = (90 - lat) * Math.PI / 180;
          const th = lon * Math.PI / 180;
          const p = project({
            x: Math.sin(phi) * Math.cos(th),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(th),
          });
          if (p.z < -0.2) { ctx.stroke(); ctx.beginPath(); continue; }
          if (lon === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 6) {
          const phi = (90 - lat) * Math.PI / 180;
          const th = lon * Math.PI / 180;
          const p = project({
            x: Math.sin(phi) * Math.cos(th),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(th),
          });
          if (p.z < -0.2) { ctx.stroke(); ctx.beginPath(); continue; }
          if (lat === -90) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // points
      for (const p of pts) {
        const pp = project(p);
        if (pp.z < -0.5) continue;
        const a = Math.max(0, (pp.z + 0.5));
        ctx.fillStyle = rgba(theme.colorA, 0.6 * a);
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, 1.2 + a * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // arcs
      if (Math.random() < 0.04) spawnArc();
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        arc.t += 0.012;
        if (arc.t >= 1.3) { arcs.splice(i, 1); continue; }
        const a = project(arc.a);
        const b = project(arc.b);
        if (a.z < -0.4 && b.z < -0.4) continue;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const lift = 60;
        const cx2 = mx, cy2 = my - lift;
        const tt = Math.min(1, arc.t);
        ctx.strokeStyle = rgba(theme.colorB, (1 - Math.abs(tt - 0.5) * 2) * 0.9);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        // partial bezier up to tt
        const steps = 32;
        for (let s = 1; s <= steps * tt; s++) {
          const u = s / steps;
          const x = (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * cx2 + u * u * b.x;
          const y = (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * cy2 + u * u * b.y;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  // 8) Learning — training progress tracks, skill radar, graduation bursts
  function learning(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;

    const TRACKS = [
      { name: "AI Literacy",  col: [255, 122, 61],  modules: 6,  progress: 0.05, target: 0.80 },
      { name: "AI Strategy",  col: [76, 200, 255],  modules: 8,  progress: 0.05, target: 0.68 },
      { name: "Technical AI", col: [79, 209, 197],  modules: 10, progress: 0.05, target: 0.55 },
      { name: "Applied AI",   col: [197, 125, 255], modules: 9,  progress: 0.05, target: 0.88 },
      { name: "Quantum AI",   col: [245, 183, 107], modules: 7,  progress: 0.05, target: 0.42 },
    ];

    let gradBursts = [];
    let cohortCount = 847;
    let lastGrad = 0;

    function rgb(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      TRACKS.forEach(tr => {
        tr.progress = 0.04 + Math.random() * 0.25;
        tr.target   = 0.45 + Math.random() * 0.50;
      });
    }
    init();
    window.addEventListener("resize", () => { resize(); init(); });

    function frame(ts) {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // bg grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 44) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 44) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

      // ---- TRACK AREA ----
      const trX = W * 0.04, trY = H * 0.10;
      const trW = W * 0.57, trH = H * 0.82;
      const rowH = trH / TRACKS.length;

      for (let ti = 0; ti < TRACKS.length; ti++) {
        const tr = TRACKS[ti];
        const ry = trY + ti * rowH;
        const barY = ry + rowH * 0.52;
        const col  = tr.col;

        // advance progress
        if (tr.progress < tr.target) {
          tr.progress = Math.min(tr.target, tr.progress + 0.00055);
        } else {
          tr.target = Math.min(1.0, tr.target + rand(0.00005, 0.00012));
          if (tr.target >= 0.99 && ts - lastGrad > 800) {
            gradBursts.push({ x: trX + trW, y: barY, t: 0, col });
            tr.target = 0.12 + Math.random() * 0.15;
            tr.progress = 0.04;
            cohortCount += (rand(2, 8) | 0);
            lastGrad = ts;
          }
        }

        // track BG
        ctx.fillStyle = "rgba(255,255,255,0.04)";
        ctx.fillRect(trX, barY - 4, trW, 8);

        // progress fill gradient
        const progW = trW * tr.progress;
        const grd = ctx.createLinearGradient(trX, 0, trX + progW, 0);
        grd.addColorStop(0, rgb(col, 0.25));
        grd.addColorStop(1, rgb(col, 0.85));
        ctx.fillStyle = grd;
        ctx.fillRect(trX, barY - 4, progW, 8);

        // module nodes
        for (let mi = 0; mi < tr.modules; mi++) {
          const mx = trX + (mi / (tr.modules - 1)) * trW;
          const my = barY;
          const unlocked = (mi / (tr.modules - 1)) <= tr.progress + 0.01;
          const isActive = Math.abs((mi / (tr.modules - 1)) - tr.progress) < (1 / (tr.modules - 1)) * 0.6 && tr.progress < tr.target;

          if (unlocked) {
            ctx.fillStyle = rgb(col, 0.25);
            ctx.beginPath(); ctx.arc(mx, my, 9, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = unlocked ? rgb(col, 0.95) : "rgba(255,255,255,0.10)";
          ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill();

          if (isActive) {
            ctx.strokeStyle = rgb(col, 0.6);
            ctx.lineWidth = 1.5;
            const pr = 10 + Math.sin(t * 4.5 + ti) * 3;
            ctx.beginPath(); ctx.arc(mx, my, pr, 0, Math.PI * 2); ctx.stroke();
          }
        }

        // track label
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillStyle = rgb(col, 0.75);
        ctx.fillText(tr.name.toUpperCase(), trX, ry + rowH * 0.3);

        // pct
        ctx.textAlign = "right";
        ctx.fillStyle = rgb(col, 0.90);
        ctx.font = "bold 11px 'JetBrains Mono', monospace";
        ctx.fillText((tr.progress * 100).toFixed(0) + "%", trX + trW, ry + rowH * 0.3);
        ctx.textAlign = "left";
      }

      // ---- STATS PANEL (right) ----
      const spX = W * 0.67, spY = H * 0.08;
      const spW = W * 0.29, spH = H * 0.52;

      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.lineWidth = 1;
      ctx.strokeRect(spX + 0.5, spY + 0.5, spW, spH);
      ctx.fillStyle = "rgba(6,9,18,0.65)";
      ctx.fillRect(spX, spY, spW, 22);
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText("COHORT · LIVE", spX + 8, spY + 14);

      // live pulse dot
      ctx.fillStyle = rgb(theme.colorA, 1);
      ctx.beginPath(); ctx.arc(spX + spW - 10, spY + 11, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = rgb(theme.colorA, 0.3);
      ctx.beginPath(); ctx.arc(spX + spW - 10, spY + 11, 5 + Math.sin(t * 4) * 1.5, 0, Math.PI * 2); ctx.fill();

      // big learner count
      const liveCount = cohortCount + Math.floor(Math.sin(t * 0.3) * 2);
      ctx.font = "bold 46px 'Inter Tight', sans-serif";
      ctx.fillStyle = rgb(theme.colorA, 0.95);
      ctx.textAlign = "center";
      ctx.fillText(liveCount.toLocaleString(), spX + spW / 2, spY + 76);
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.38)";
      ctx.fillText("active learners", spX + spW / 2, spY + 92);
      ctx.textAlign = "left";

      // stats grid
      const statsItems = [
        ["COMPLETION", (91.2 + Math.sin(t * 0.12) * 0.4).toFixed(1) + "%", theme.colorA],
        ["TRACKS",     "5",     theme.colorB],
        ["DURATION",   "8 wks", [255, 255, 255]],
        ["CAPSTONE",   "100%",  [79, 209, 197]],
      ];
      const colW2 = spW / 2;
      for (let i = 0; i < statsItems.length; i++) {
        const ix = spX + 10 + (i % 2) * colW2;
        const iy = spY + 112 + Math.floor(i / 2) * 44;
        const col = statsItems[i][2];
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(255,255,255,0.32)";
        ctx.fillText(statsItems[i][0], ix, iy);
        ctx.font = "bold 17px 'Inter Tight', sans-serif";
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},0.95)`;
        ctx.fillText(statsItems[i][1], ix, iy + 16);
      }

      // ---- SKILL RADAR (right, below stats) ----
      const radarCx = spX + spW / 2;
      const radarCy = spY + spH - 72;
      const radarR = Math.min(spW * 0.33, 52);

      for (let ri = 1; ri <= 3; ri++) {
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        TRACKS.forEach((_, ti) => {
          const angle = (ti / TRACKS.length) * Math.PI * 2 - Math.PI / 2;
          const r2 = radarR * (ri / 3);
          const x = radarCx + Math.cos(angle) * r2;
          const y = radarCy + Math.sin(angle) * r2;
          if (ti === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.closePath(); ctx.stroke();
      }

      ctx.beginPath();
      TRACKS.forEach((tr, ti) => {
        const angle = (ti / TRACKS.length) * Math.PI * 2 - Math.PI / 2;
        const x = radarCx + Math.cos(angle) * radarR * tr.progress;
        const y = radarCy + Math.sin(angle) * radarR * tr.progress;
        if (ti === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = rgb(theme.colorA, 0.14);
      ctx.fill();
      ctx.strokeStyle = rgb(theme.colorA, 0.65);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      TRACKS.forEach((tr, ti) => {
        const angle = (ti / TRACKS.length) * Math.PI * 2 - Math.PI / 2;
        // axis
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(radarCx, radarCy);
        ctx.lineTo(radarCx + Math.cos(angle) * radarR, radarCy + Math.sin(angle) * radarR);
        ctx.stroke();
        // dot
        const x = radarCx + Math.cos(angle) * radarR * tr.progress;
        const y = radarCy + Math.sin(angle) * radarR * tr.progress;
        ctx.fillStyle = rgb(tr.col, 0.9);
        ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
      });

      ctx.font = "8px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.textAlign = "center";
      ctx.fillText("SKILL COVERAGE", radarCx, spY + spH - 10);
      ctx.textAlign = "left";

      // ---- GRADUATION BURSTS ----
      for (let i = gradBursts.length - 1; i >= 0; i--) {
        const gb = gradBursts[i];
        gb.t += 0.018;
        if (gb.t >= 1) { gradBursts.splice(i, 1); continue; }
        const alpha = 1 - gb.t;
        const r2 = gb.t * 55;
        ctx.strokeStyle = rgb(gb.col, alpha * 0.9);
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(gb.x, gb.y, r2, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = rgb(gb.col, alpha * 0.4);
        ctx.beginPath(); ctx.arc(gb.x, gb.y, r2 * 0.45, 0, Math.PI * 2); ctx.fill();
        if (gb.t < 0.55) {
          ctx.font = "bold 10px 'JetBrains Mono', monospace";
          ctx.fillStyle = rgb(gb.col, alpha);
          ctx.textAlign = "center";
          ctx.fillText("AI CERTIFIED ✓", gb.x, gb.y - r2 - 6);
          ctx.textAlign = "left";
        }
      }

      requestAnimationFrame(frame);
    }
    frame(0);
  }

  // 9) Vortex — particles spiraling toward center
  function vortex(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    let particles = [];
    init();
    window.addEventListener("resize", () => { resize(); init(); });
    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      particles = [];
      for (let i = 0; i < theme.particles; i++) {
        particles.push({
          a: Math.random() * Math.PI * 2,
          r: rand(40, Math.min(W, H) * 0.45),
          speed: rand(0.005, 0.02),
          mix: Math.random(),
          size: rand(0.8, 2.2),
        });
      }
    }
    function frame() {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      const cx = W * 0.62, cy = H * 0.5;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // central glow
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280);
      g.addColorStop(0, rgba(theme.colorA, 0.28));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        p.a += p.speed * (1 + 50 / Math.max(20, p.r));
        p.r -= 0.4;
        if (p.r < 20) {
          p.r = rand(Math.min(W, H) * 0.4, Math.min(W, H) * 0.55);
          p.a = Math.random() * Math.PI * 2;
        }
        const x = cx + Math.cos(p.a) * p.r;
        const y = cy + Math.sin(p.a) * p.r * 0.7;
        const c = [
          lerp(theme.colorA[0], theme.colorB[0], p.mix),
          lerp(theme.colorA[1], theme.colorB[1], p.mix),
          lerp(theme.colorA[2], theme.colorB[2], p.mix),
        ];
        ctx.fillStyle = `rgba(${c[0]|0},${c[1]|0},${c[2]|0},0.85)`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        // tail
        const x2 = cx + Math.cos(p.a - 0.1) * (p.r + 6);
        const y2 = cy + Math.sin(p.a - 0.1) * (p.r + 6) * 0.7;
        ctx.strokeStyle = `rgba(${c[0]|0},${c[1]|0},${c[2]|0},0.3)`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      requestAnimationFrame(frame);
    }
    frame();
  }

  // 9) Beacon — concentric rings pulsing outward
  function beacon(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0;
    init();
    window.addEventListener("resize", () => { resize(); init(); });
    function init() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
    }
    function frame() {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      const cx = W * 0.62, cy = H * 0.5;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      // dot grid background
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      for (let y = 0; y < H + 30; y += 30) {
        for (let x = 0; x < W + 30; x += 30) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
        }
      }

      // rings
      for (let i = 0; i < 6; i++) {
        const phase = (t * 0.4 + i * 0.7) % 3;
        const r = phase * 180;
        const a = Math.max(0, 1 - phase / 3);
        ctx.strokeStyle = rgba(i % 2 ? theme.colorA : theme.colorB, a * 0.7);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      // center
      ctx.fillStyle = rgba(theme.colorA, 0.95);
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rgba(theme.colorA, 0.2);
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(frame);
    }
    frame();
  }

  // ---------------------------------------------------------
  // Initializer
  // ---------------------------------------------------------

  // Careers — Global Talent Network
  function careers(canvas, theme) {
    if (canvas.__straditCareersStop) {
      canvas.__straditCareersStop();
      canvas.__straditCareersStop = null;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext('2d');

    function lerp(a, b, t) { return a + (b - a) * t; }
    function rand(a, b) { return a + Math.random() * (b - a); }
    function rgb(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }

    const ORANGE = [255, 122, 61];
    const CYAN   = [76, 200, 255];
    const TEAL   = [79, 209, 197];
    const GOLD   = [245, 183, 107];

    let W, H, t = 0;
    let hubs = [], particles = [], arcs = [], hires = [];
    let lastArc = 0, lastHire = 0;

    const HUB_DEFS = [
      { label: 'New York', fx: 0.22, fy: 0.44, team: 85, col: ORANGE, roles: 7 },
      { label: 'London', fx: 0.50, fy: 0.36, team: 112, col: CYAN, roles: 6 },
      { label: 'US and UK', fx: 0.78, fy: 0.54, team: 125, col: TEAL, roles: 5 },
    ];

    function initScene() {
      hubs = HUB_DEFS.map(d => ({ ...d, x: W * d.fx, y: H * d.fy }));
      particles = [];
      hubs.forEach((hub, hi) => {
        const count = 28 + Math.floor(hub.team / 3.5);
        for (let i = 0; i < count; i++) {
          const angle = rand(0, Math.PI * 2);
          const dist  = rand(28, 100);
          const ox = hub.x + Math.cos(angle) * dist;
          const oy = hub.y + Math.sin(angle) * dist;
          particles.push({ hub: hi, ox, oy, x: ox, y: oy, phase: rand(0, Math.PI * 2), speed: rand(0.003, 0.011), orbitR: rand(1.5, 5), r: rand(0.8, 2.4), col: hub.col, alpha: rand(0.35, 0.9) });
        }
      });
      arcs = []; hires = [];
    }

    function spawnArc() {
      const a = (Math.random() * hubs.length) | 0;
      let b = (Math.random() * hubs.length) | 0;
      while (b === a) b = (Math.random() * hubs.length) | 0;
      arcs.push({ a, b, progress: 0, speed: rand(0.007, 0.015) });
    }

    function spawnHire() {
      const hi = (Math.random() * hubs.length) | 0;
      const hub = hubs[hi];
      const edge = (Math.random() * 4) | 0;
      let sx, sy;
      if (edge === 0) { sx = rand(0, W); sy = -20; }
      else if (edge === 1) { sx = W + 20; sy = rand(0, H); }
      else if (edge === 2) { sx = rand(0, W); sy = H + 20; }
      else { sx = -20; sy = rand(0, H); }
      hires.push({ sx, sy, tx: hub.x + rand(-10, 10), ty: hub.y + rand(-10, 10), hi, progress: 0 });
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      canvas.width = (W * dpr) | 0; canvas.height = (H * dpr) | 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initScene();
    }

    let rafId = 0;
    function frame(ts) {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = '#060912';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(255,255,255,0.025)';
      for (let y = 0; y < H + 40; y += 40)
        for (let x = 0; x < W + 40; x += 40) {
          ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
        }

      for (const hub of hubs) {
        const g = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, 130);
        g.addColorStop(0, rgb(hub.col, 0.18)); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          if (a.hub !== b.hub) continue;
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx*dx + dy*dy;
          if (d2 > 55*55) continue;
          ctx.strokeStyle = rgb(a.col, (1 - d2/(55*55)) * 0.22);
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }


      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i]; arc.progress += arc.speed;
        if (arc.progress >= 1.4) { arcs.splice(i, 1); continue; }
        const ha = hubs[arc.a], hb = hubs[arc.b];
        const tt = Math.min(1, arc.progress);
        const alpha = (1 - Math.abs(tt - 0.5) * 2) * 0.72;
        const mx = (ha.x + hb.x) / 2, my = (ha.y + hb.y) / 2 - 65;
        const arcCol = [lerp(ha.col[0],hb.col[0],0.5), lerp(ha.col[1],hb.col[1],0.5), lerp(ha.col[2],hb.col[2],0.5)];
        ctx.strokeStyle = rgb(arcCol, alpha); ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let s = 0; s <= 40 * tt; s++) {
          const u = s / 40;
          const x = (1-u)*(1-u)*ha.x + 2*(1-u)*u*mx + u*u*hb.x;
          const y = (1-u)*(1-u)*ha.y + 2*(1-u)*u*my + u*u*hb.y;
          if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        const pu = tt;
        const px = (1-pu)*(1-pu)*ha.x + 2*(1-pu)*pu*mx + pu*pu*hb.x;
        const py = (1-pu)*(1-pu)*ha.y + 2*(1-pu)*pu*my + pu*pu*hb.y;
        ctx.fillStyle = rgb(arcCol, 0.95); ctx.beginPath(); ctx.arc(px, py, 2.8, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = rgb(arcCol, 0.28); ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI*2); ctx.fill();
      }

      for (let i = hires.length - 1; i >= 0; i--) {
        const h = hires[i]; h.progress += 0.013;
        if (h.progress >= 1.1) { hires.splice(i, 1); continue; }
        const tt = Math.min(1, h.progress);
        const x = h.sx + (h.tx - h.sx) * tt, y = h.sy + (h.ty - h.sy) * tt;
        ctx.fillStyle = rgb(GOLD, 0.95); ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = rgb(GOLD, 0.25); ctx.beginPath(); ctx.arc(x, y, 7 + Math.sin(t*9)*1.5, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = rgb(GOLD, 0.18); ctx.lineWidth = 1.2;
        const prevTt = Math.max(0, tt - 0.08);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(h.sx + (h.tx-h.sx)*prevTt, h.sy + (h.ty-h.sy)*prevTt); ctx.stroke();
      }

      for (const p of particles) {
        p.phase += p.speed;
        p.x = p.ox + Math.cos(p.phase) * p.orbitR;
        p.y = p.oy + Math.sin(p.phase) * p.orbitR;
        ctx.fillStyle = rgb(p.col, p.alpha);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      }

      for (const hub of hubs) {
        const pulse = Math.sin(t * 2.2) * 0.1;
        ctx.strokeStyle = rgb(hub.col, 0.28 + pulse); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(hub.x, hub.y, 26, 0, Math.PI*2); ctx.stroke();
        ctx.strokeStyle = rgb(hub.col, 0.15); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(hub.x, hub.y, 18 + Math.sin(t*1.8)*2, 0, Math.PI*2); ctx.stroke();
        ctx.fillStyle = rgb(hub.col, 0.14); ctx.beginPath(); ctx.arc(hub.x, hub.y, 20, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = rgb(hub.col, 0.95); ctx.beginPath(); ctx.arc(hub.x, hub.y, 7, 0, Math.PI*2); ctx.fill();
        ctx.font = "10px 'JetBrains Mono', monospace"; ctx.fillStyle = rgb(hub.col, 0.9); ctx.textAlign = 'center';
        ctx.fillText(hub.label, hub.x, hub.y + 40);
        ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.fillText(hub.team + '+ team · ' + hub.roles + ' open', hub.x, hub.y + 53);
        ctx.textAlign = 'left';
      }

      rafId = requestAnimationFrame(frame);
    }

    function onResize() {
      resize();
    }

    resize();
    window.addEventListener('resize', onResize);
    rafId = requestAnimationFrame(frame);

    canvas.__straditCareersStop = function () {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }

  // ---------------------------------------------------------
  // Blockchain — on-chain settlement ledger (Digital Assets)
  // ---------------------------------------------------------
  function blockchain(canvas, theme) {
    const { ctx, resize } = setupHiDPI(canvas);
    let W, H, t = 0, nodes = [], txPool = [], blocks = [], txParticles = [];
    let miningProg = 0, blockNum = 842190, lastSpawn = 0;

    function rh() {
      const c = "0123456789abcdef"; let h = "0x";
      for (let i = 0; i < 8; i++) h += c[(Math.random() * 16) | 0];
      return h;
    }

    function init2() {
      const r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
      nodes = [];
      const cx = W * 0.26, cy = H * 0.5;
      const rs = [0, 0.22, 0.18, 0.28, 0.24, 0.32, 0.2, 0.26, 0.3];
      const as = [0, 0.6, 2.1, 3.4, 4.9, 1.4, 5.6, 2.8, 0.2];
      for (let i = 0; i < 9; i++) {
        const R = Math.min(W, H) * rs[i];
        nodes.push({ x: cx + Math.cos(as[i]) * R, y: cy + Math.sin(as[i]) * R * 0.7, phase: Math.random() * Math.PI * 2, role: i === 0 ? "lead" : "ptcp", ca: 0 });
      }
      blocks = [];
      const lbls = ["EQUITY", "FIXED-INCOME", "ETF", "TREASURY", "MBS"];
      for (let i = 5; i >= 1; i--) blocks.push({ num: blockNum - i, hash: rh(), txs: ((Math.random() * 80) + 20) | 0, glow: 0, label: lbls[(i - 1) % 5] });
      miningProg = 0; txPool = []; txParticles = [];
    }
    init2();
    window.addEventListener("resize", () => { resize(); init2(); });

    function frame(ts) {
    if (!canvas || !canvas.isConnected) return;
    if (canvas.__straditIsIntersecting === false) {
      setTimeout(function() { requestAnimationFrame(frame); }, 250);
      return;
    }
      t += 0.016;
      ctx.fillStyle = theme.bg; ctx.fillRect(0, 0, W, H);

      // Hex grid background
      ctx.strokeStyle = "rgba(79,209,197,0.05)"; ctx.lineWidth = 0.8;
      const hs = 28, hr = hs * Math.sqrt(3) / 2;
      for (let row = -1; row < H / (hs * 1.5) + 2; row++) {
        for (let col = -1; col < W / (hr * 2) + 2; col++) {
          const xo = row % 2 === 0 ? 0 : hr, hx = col * hr * 2 + xo, hy = row * hs * 1.5;
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const a = k * Math.PI / 3 + Math.PI / 6;
            if (k === 0) ctx.moveTo(hx + Math.cos(a) * hs * 0.48, hy + Math.sin(a) * hs * 0.48);
            else ctx.lineTo(hx + Math.cos(a) * hs * 0.48, hy + Math.sin(a) * hs * 0.48);
          }
          ctx.closePath(); ctx.stroke();
        }
      }

      // Gossip lines between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          if (Math.hypot(a.x - b.x, a.y - b.y) > W * 0.24) continue;
          const pulse = (Math.sin(t * 2 + i * 0.7 + j * 0.4) + 1) * 0.5;
          ctx.strokeStyle = rgba(theme.colorA, 0.05 + pulse * 0.09); ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        n.phase += 0.018;
        const pulse = (Math.sin(n.phase) + 1) * 0.5;
        const isLead = n.role === "lead", nr = isLead ? 14 : 9, col = isLead ? theme.colorC : theme.colorA;
        ctx.fillStyle = rgba(col, 0.10 + pulse * 0.1); ctx.beginPath(); ctx.arc(n.x, n.y, nr + 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = rgba(col, 0.15 + n.ca * 0.3); ctx.beginPath(); ctx.arc(n.x, n.y, nr, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = rgba(col, 0.6 + pulse * 0.4); ctx.lineWidth = isLead ? 2 : 1.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, nr, 0, Math.PI * 2); ctx.stroke();
        ctx.font = `${isLead ? 8 : 7}px JetBrains Mono,monospace`;
        ctx.fillStyle = rgba(col, 0.9); ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(isLead ? "CUST" : "PTCP", n.x, n.y);
        ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
        if (n.ca > 0) n.ca -= 0.025;
      }

      // TX Pool
      if (ts - lastSpawn > 700 && txPool.length < 7) {
        txPool.push({ x: W * 0.47 + rand(-16, 16), y: H * 0.25 + Math.random() * H * 0.5, type: ["EQ", "ETF", "FI", "UST"][(Math.random() * 4) | 0], age: 0 });
        lastSpawn = ts;
      }
      ctx.font = "8px JetBrains Mono,monospace"; ctx.fillStyle = rgba(theme.colorB, 0.25);
      ctx.fillText("PENDING TXS", W * 0.45, H * 0.14);
      for (let i = txPool.length - 1; i >= 0; i--) {
        const tx = txPool[i]; tx.age += 0.016; tx.y -= 0.25;
        if (miningProg > 0.75) {
          txParticles.push({ x: tx.x, y: tx.y, tx2: W * 0.57 + blocks.length * 84, ty2: H * 0.5, p: 0 });
          txPool.splice(i, 1); continue;
        }
        ctx.strokeStyle = rgba(theme.colorB, 0.55); ctx.lineWidth = 1;
        ctx.strokeRect(tx.x - 8, tx.y - 7, 16, 14);
        ctx.fillStyle = rgba(theme.colorB, 0.06); ctx.fillRect(tx.x - 8, tx.y - 7, 16, 14);
        ctx.font = "7px JetBrains Mono,monospace"; ctx.fillStyle = rgba(theme.colorB, 0.85);
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(tx.type, tx.x, tx.y);
        ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
        if (tx.y < H * 0.1 || tx.age > 8) txPool.splice(i, 1);
      }

      // TX Particles flying into blocks
      for (let i = txParticles.length - 1; i >= 0; i--) {
        const p = txParticles[i]; p.p += 0.03;
        if (p.p >= 1) { txParticles.splice(i, 1); continue; }
        const ex = p.x + (p.tx2 - p.x) * p.p, ey = p.y + (p.ty2 - p.y) * p.p - Math.sin(p.p * Math.PI) * 28;
        ctx.fillStyle = rgba(theme.colorC, 0.9 * (1 - p.p));
        ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      // Mining progress
      miningProg += 0.0025;
      if (miningProg >= 1) {
        miningProg = 0; blockNum++;
        const lb = ["EQUITY", "ETF", "FIXED-INCOME", "TREASURY", "MBS"];
        blocks.push({ num: blockNum, hash: rh(), txs: ((Math.random() * 60) + 15) | 0, glow: 1, label: lb[blockNum % 5] });
        if (blocks.length > 5) blocks.shift();
        for (const n of nodes) n.ca = 1;
      }

      // Settlement ledger blocks
      const cX = W * 0.56, cY = H * 0.17, bW = Math.min(Math.floor((W * 0.42) / 5.6), 72), bH = H * 0.47, bG = 8;
      ctx.font = "8px JetBrains Mono,monospace"; ctx.fillStyle = rgba(theme.colorA, 0.3);
      ctx.fillText("SETTLEMENT LEDGER · TOKENIZED SECURITIES", cX, cY - 8);
      for (let i = 0; i < blocks.length; i++) {
        const bl = blocks[i], bx2 = cX + i * (bW + bG), by = cY;
        bl.glow = Math.max(0, bl.glow - 0.012);
        const latest = i === blocks.length - 1, col = latest ? theme.colorC : theme.colorA;
        if (i > 0) {
          ctx.strokeStyle = rgba(theme.colorA, 0.35); ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.moveTo(bx2 - bG + 1, by + bH * 0.4); ctx.lineTo(bx2 - 1, by + bH * 0.4);
          ctx.stroke(); ctx.setLineDash([]);
        }
        ctx.fillStyle = rgba(col, 0.04 + bl.glow * 0.14); ctx.fillRect(bx2, by, bW, bH);
        ctx.strokeStyle = rgba(col, 0.22 + bl.glow * 0.65); ctx.lineWidth = latest ? 1.5 : 1;
        ctx.strokeRect(bx2 + 0.5, by + 0.5, bW, bH);
        ctx.fillStyle = rgba(col, 0.06 + bl.glow * 0.08); ctx.fillRect(bx2, by, bW, 18);
        ctx.font = "8px JetBrains Mono,monospace"; ctx.fillStyle = rgba(col, 0.95); ctx.textAlign = "center";
        ctx.fillText("#" + bl.num, bx2 + bW / 2, by + 12);
        ctx.font = "6px JetBrains Mono,monospace"; ctx.fillStyle = rgba(theme.colorB, 0.75);
        ctx.fillText(bl.hash, bx2 + bW / 2, by + 27);
        ctx.fillStyle = rgba(col, 0.7); ctx.fillText(bl.label, bx2 + bW / 2, by + 40);
        ctx.font = "bold 14px Inter Tight,sans-serif"; ctx.fillStyle = rgba(col, 0.9);
        ctx.fillText(bl.txs, bx2 + bW / 2, by + 62);
        ctx.font = "6px JetBrains Mono,monospace"; ctx.fillStyle = rgba(col, 0.45);
        ctx.fillText("TOKENS", bx2 + bW / 2, by + 73);
        ctx.fillStyle = rgba(theme.colorA, 0.5); ctx.fillText("FINALIZED", bx2 + bW / 2, by + bH - 10);
        ctx.textAlign = "left";
      }

      // New block being mined
      const nbx = cX + blocks.length * (bW + bG), nby = cY, mp = miningProg;
      ctx.strokeStyle = rgba(theme.colorC, 0.25 + Math.sin(t * 3) * 0.15); ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.strokeRect(nbx + 0.5, nby + 0.5, bW, bH); ctx.setLineDash([]);
      ctx.font = "7px JetBrains Mono,monospace"; ctx.fillStyle = rgba(theme.colorC, 0.55); ctx.textAlign = "center";
      ctx.fillText("MINING", nbx + bW / 2, nby + 20);
      ctx.strokeStyle = rgba(theme.colorC, 0.75); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(nbx + bW / 2, nby + bH * 0.5, 13, -Math.PI / 2, -Math.PI / 2 + mp * Math.PI * 2); ctx.stroke();
      ctx.font = "9px Inter Tight,sans-serif"; ctx.fillStyle = rgba(theme.colorC, 0.8);
      ctx.fillText((mp * 100).toFixed(0) + "%", nbx + bW / 2, nby + bH * 0.5 + 4);
      ctx.textAlign = "left";

      // Live stats row
      const sy = H * 0.73, sX = W * 0.56, sw3 = (W * 0.42) / 4;
      const stats = [{ k: "BLOCK TIME", v: "12s" }, { k: "FINALITY", v: "T+0" }, { k: "THROUGHPUT", v: ((1800 + Math.sin(t) * 200) | 0) + " tps" }, { k: "NODES", v: "9 / 9" }];
      for (let i = 0; i < stats.length; i++) {
        const sx3 = sX + i * sw3;
        ctx.font = "8px JetBrains Mono,monospace"; ctx.fillStyle = rgba(theme.colorA, 0.38); ctx.fillText(stats[i].k, sx3, sy);
        ctx.font = "bold 13px Inter Tight,sans-serif"; ctx.fillStyle = rgba(theme.colorA, 0.95); ctx.fillText(stats[i].v, sx3, sy + 16);
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

})();
