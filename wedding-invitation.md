<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Wedding of Joefren & Allyster</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400;500&family=Great+Vibes&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
--burgundy: #6B2737;
--burgundy-deep: #4A1525;
--burgundy-light: #8B3A4D;
--cream: #F7F0E8;
--cream-warm: #EFE4D4;
--cream-deep: #E2D2BF;
--gold: #C8A96E;
--gold-light: #DFC28F;
--rose-muted: #C8A0A8;
--text-dark: #3A1E24;
--text-mid: #7A4A52;
}

html, body {
height: 100%;
background: var(--cream);
overflow-x: hidden;
}

body {
font-family: 'Cormorant Garamond', Georgia, serif;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
min-height: 100vh;
position: relative;
}

/_ Subtle grain texture overlay _/
body::before {
content: '';
position: fixed;
inset: 0;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
pointer-events: none;
z-index: 0;
}

/_ Radial vignette _/
body::after {
content: '';
position: fixed;
inset: 0;
background: radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, rgba(106, 39, 55, 0.08) 100%);
pointer-events: none;
z-index: 0;
}

/_ Corner botanical ornaments _/
.corner-ornament {
position: fixed;
width: 180px;
height: 180px;
opacity: 0.12;
pointer-events: none;
z-index: 1;
}
.corner-ornament.tl { top: 0; left: 0; }
.corner-ornament.tr { top: 0; right: 0; transform: scaleX(-1); }
.corner-ornament.bl { bottom: 0; left: 0; transform: scaleY(-1); }
.corner-ornament.br { bottom: 0; right: 0; transform: scale(-1); }

/_ ── Header ── _/
.page-header {
position: relative;
z-index: 2;
text-align: center;
padding: 56px 24px 24px;
width: 100%;
}

.eyebrow {
font-family: 'Cormorant SC', serif;
font-size: 11px;
font-weight: 400;
letter-spacing: 0.35em;
color: var(--rose-muted);
text-transform: uppercase;
margin-bottom: 18px;
}

.title-block {
position: relative;
line-height: 1;
margin-bottom: 28px;
}

.title-our {
font-family: 'Cormorant Garamond', serif;
font-size: clamp(72px, 10vw, 112px);
font-weight: 300;
color: var(--text-dark);
display: block;
letter-spacing: -0.02em;
}

.title-wedding {
font-family: 'Cormorant SC', serif;
font-size: clamp(58px, 8.5vw, 96px);
font-weight: 300;
color: var(--rose-muted);
display: block;
letter-spacing: 0.08em;
margin-top: -8px;
}

.header-rule {
width: 80px;
height: 1px;
background: linear-gradient(90deg, transparent, var(--gold), transparent);
margin: 0 auto 20px;
}

.invite-line {
font-size: 18px;
font-weight: 300;
color: var(--text-mid);
font-style: italic;
letter-spacing: 0.03em;
}

.invite-line strong {
font-style: normal;
font-weight: 500;
color: var(--text-dark);
}

/_ ── Scene ── _/
.scene {
position: relative;
z-index: 2;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding: 16px 24px 80px;
perspective: 1400px;
}

/_ ── Envelope wrapper ── _/
.envelope-wrap {
position: relative;
width: min(520px, 90vw);
cursor: pointer;
user-select: none;
}

/_ ── Envelope body ── _/
.envelope-body {
position: relative;
width: 100%;
padding-bottom: 63%; /_ 3:2 aspect roughly _/
border-radius: 4px 4px 6px 6px;
overflow: hidden;
}

.env-back {
position: absolute;
inset: 0;
background: linear-gradient(160deg, #F2E8DC 0%, #EAD9C8 40%, #E0CDB8 100%);
border-radius: inherit;
box-shadow:
0 2px 6px rgba(74,21,37,0.10),
0 12px 40px rgba(74,21,37,0.14),
0 40px 80px rgba(74,21,37,0.10),
inset 0 1px 0 rgba(255,255,255,0.6),
inset 0 -1px 0 rgba(0,0,0,0.06);
}

/_ Paper texture lines _/
.env-back::before {
content: '';
position: absolute;
inset: 0;
background-image: repeating-linear-gradient(
0deg,
transparent,
transparent 18px,
rgba(200,169,110,0.06) 18px,
rgba(200,169,110,0.06) 19px
);
border-radius: inherit;
}

/_ Diagonal fold lines at corners _/
.env-back::after {
content: '';
position: absolute;
inset: 0;
background-image:
linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 35%),
linear-gradient(225deg, rgba(255,255,255,0.2) 0%, transparent 30%);
border-radius: inherit;
pointer-events: none;
}

/_ Side triangles _/
.env-side {
position: absolute;
bottom: 0;
width: 50%;
height: 100%;
pointer-events: none;
}
.env-side.left {
left: 0;
clip-path: polygon(0 100%, 0 18%, 50% 55%, 50% 100%);
background: linear-gradient(135deg, #DCC8B0 0%, #E5D4BF 100%);
}
.env-side.right {
right: 0;
clip-path: polygon(100% 100%, 100% 18%, 50% 55%, 50% 100%);
background: linear-gradient(225deg, #DCC8B0 0%, #E5D4BF 100%);
}

/_ Bottom flap _/
.env-bottom {
position: absolute;
bottom: 0;
left: 0; right: 0;
height: 55%;
clip-path: polygon(0 100%, 50% 0%, 100% 100%);
background: linear-gradient(180deg, #E8D8C4 0%, #DCC8AE 100%);
pointer-events: none;
}

/_ ── Flap (top) ── _/
.flap-wrap {
position: absolute;
top: 0; left: 0; right: 0;
height: 58%;
transform-origin: top center;
transform-style: preserve-3d;
transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
z-index: 10;
}

.env-flap {
position: absolute;
inset: 0;
clip-path: polygon(0 0, 50% 75%, 100% 0);
background: linear-gradient(160deg, var(--burgundy) 0%, var(--burgundy-deep) 60%, #3A1020 100%);
box-shadow: inset 0 -3px 12px rgba(0,0,0,0.25);
backface-visibility: hidden;
}

/_ Flap fabric sheen _/
.env-flap::before {
content: '';
position: absolute;
inset: 0;
clip-path: inherit;
background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%);
}

/_ Inner flap reveal (shown when open) _/
.env-flap-inner {
position: absolute;
inset: 0;
clip-path: polygon(0 0, 50% 75%, 100% 0);
background: linear-gradient(180deg, #E0D0C0 0%, #D4C4B0 100%);
transform: rotateY(180deg);
backface-visibility: hidden;
}

.envelope-wrap.is-open .flap-wrap {
transform: rotateX(-178deg);
}

/_ ── Wax seal ── _/
.seal-wrap {
position: absolute;
left: 50%;
top: 54%;
transform: translate(-50%, -50%);
z-index: 20;
transition:
transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
opacity 0.4s ease;
}

.envelope-wrap.is-open .seal-wrap {
transform: translate(-50%, -50%) scale(0.5) rotate(15deg);
opacity: 0;
pointer-events: none;
transition-delay: 0s;
}

.seal {
width: 82px;
height: 82px;
position: relative;
}

.seal svg {
width: 100%;
height: 100%;
filter: drop-shadow(0 4px 12px rgba(74,21,37,0.5)) drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

/_ Hover shimmer on seal _/
.seal-wrap:hover .seal svg {
filter: drop-shadow(0 6px 16px rgba(106,39,55,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.3));
transition: filter 0.3s ease;
}

/_ ── Card ── _/
.card-slot {
position: absolute;
bottom: 0; left: 6%; right: 6%;
height: 88%;
z-index: 5;
overflow: hidden;
}

.invite-card {
position: absolute;
bottom: -100%;
left: 0; right: 0;
height: 100%;
background: linear-gradient(170deg, #FDFAF6 0%, #F7F0E8 100%);
border: 0.5px solid rgba(200,169,110,0.25);
border-radius: 3px;
box-shadow:
0 -2px 8px rgba(74,21,37,0.08),
inset 0 1px 0 rgba(255,255,255,0.9);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 28px 32px;
transition: bottom 0.8s cubic-bezier(0.16, 1, 0.3, 1);
transition-delay: 0.5s;
text-align: center;
gap: 14px;
}

.envelope-wrap.is-open .invite-card {
bottom: 4%;
}

/_ Card decorative border _/
.invite-card::before {
content: '';
position: absolute;
inset: 10px;
border: 0.5px solid rgba(200,169,110,0.35);
border-radius: 2px;
pointer-events: none;
}

/_ Gold corner flourishes _/
.invite-card::after {
content: '';
position: absolute;
inset: 10px;
background-image:
radial-gradient(circle at 0% 0%, var(--gold) 1px, transparent 1px),
radial-gradient(circle at 100% 0%, var(--gold) 1px, transparent 1px),
radial-gradient(circle at 0% 100%, var(--gold) 1px, transparent 1px),
radial-gradient(circle at 100% 100%, var(--gold) 1px, transparent 1px);
background-size: 8px 8px;
background-repeat: no-repeat;
background-position: 0 0, 100% 0, 0 100%, 100% 100%;
pointer-events: none;
}

.card-to {
font-size: 11px;
letter-spacing: 0.25em;
text-transform: uppercase;
color: var(--rose-muted);
font-family: 'Cormorant SC', serif;
display: flex;
align-items: center;
gap: 8px;
}

.card-to::before, .card-to::after {
content: '';
width: 20px;
height: 0.5px;
background: var(--rose-muted);
}

.card-names {
font-family: 'Great Vibes', cursive;
font-size: clamp(30px, 5vw, 40px);
color: var(--text-dark);
letter-spacing: 0.02em;
line-height: 1.1;
}

.card-divider {
display: flex;
align-items: center;
gap: 10px;
width: 70%;
}

.card-divider-line {
flex: 1;
height: 0.5px;
background: linear-gradient(90deg, transparent, var(--gold-light));
}

.card-divider-line:last-child {
background: linear-gradient(90deg, var(--gold-light), transparent);
}

.card-divider-diamond {
width: 5px;
height: 5px;
background: var(--gold);
transform: rotate(45deg);
flex-shrink: 0;
}

.card-tagline {
font-size: 14px;
font-style: italic;
font-weight: 300;
color: var(--text-mid);
line-height: 1.6;
letter-spacing: 0.02em;
max-width: 220px;
}

.card-quote {
font-size: 12px;
font-style: italic;
color: var(--rose-muted);
background: rgba(200,169,110,0.08);
border: 0.5px solid rgba(200,169,110,0.2);
border-radius: 2px;
padding: 8px 14px;
width: 90%;
letter-spacing: 0.02em;
line-height: 1.5;
}

.card-ornament {
display: flex;
align-items: center;
gap: 6px;
opacity: 0.4;
}

.card-ornament-dot {
width: 3px;
height: 3px;
border-radius: 50%;
background: var(--gold);
}

.card-ornament-line {
width: 24px;
height: 0.5px;
background: var(--gold);
}

/_ ── Click hint ── _/
.click-hint {
margin-top: 28px;
text-align: center;
z-index: 2;
transition: opacity 0.4s ease;
}

.click-hint-text {
font-family: 'Cormorant Garamond', serif;
font-size: 14px;
font-style: italic;
font-weight: 300;
color: var(--rose-muted);
letter-spacing: 0.08em;
display: block;
margin-bottom: 10px;
}

.click-hint-chevron {
width: 14px;
height: 14px;
border-right: 1px solid var(--rose-muted);
border-bottom: 1px solid var(--rose-muted);
transform: rotate(45deg);
margin: 0 auto;
animation: bob 2.2s ease-in-out infinite;
}

@keyframes bob {
0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.6; }
50% { transform: rotate(45deg) translateY(5px); opacity: 1; }
}

.click-hint.hidden {
opacity: 0;
pointer-events: none;
}

/_ ── Scatter petals ── _/
.petal {
position: fixed;
pointer-events: none;
z-index: 100;
border-radius: 50% 0 50% 0;
animation: fall linear forwards;
opacity: 0;
}

@keyframes fall {
0% { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

/_ ── Shimmer entrance ── _/
@keyframes fade-up {
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
}

.page-header { animation: fade-up 0.9s ease both; }
.scene { animation: fade-up 0.9s 0.2s ease both; }
</style>

</head>
<body>

<!-- Corner botanical ornaments -->
<svg class="corner-ornament tl" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10 Q80 10 10 80" stroke="#6B2737" stroke-width="1" fill="none"/>
  <path d="M10 10 Q60 40 40 90" stroke="#6B2737" stroke-width="0.7" fill="none"/>
  <path d="M10 10 Q40 60 90 40" stroke="#6B2737" stroke-width="0.7" fill="none"/>
  <circle cx="10" cy="10" r="3" fill="#6B2737"/>
  <ellipse cx="50" cy="50" rx="18" ry="10" fill="#6B2737" opacity="0.6" transform="rotate(-30 50 50)"/>
  <ellipse cx="30" cy="70" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(-60 30 70)"/>
  <ellipse cx="70" cy="30" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(0 70 30)"/>
  <circle cx="55" cy="20" r="4" fill="#6B2737" opacity="0.4"/>
  <circle cx="20" cy="55" r="4" fill="#6B2737" opacity="0.4"/>
  <circle cx="75" cy="55" r="3" fill="#6B2737" opacity="0.3"/>
  <circle cx="55" cy="75" r="3" fill="#6B2737" opacity="0.3"/>
  <path d="M25 80 Q35 65 50 70 Q45 85 25 80Z" fill="#6B2737" opacity="0.5"/>
  <path d="M80 25 Q65 35 70 50 Q85 45 80 25Z" fill="#6B2737" opacity="0.5"/>
</svg>
<svg class="corner-ornament tr" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10 Q80 10 10 80" stroke="#6B2737" stroke-width="1" fill="none"/>
  <path d="M10 10 Q60 40 40 90" stroke="#6B2737" stroke-width="0.7" fill="none"/>
  <path d="M10 10 Q40 60 90 40" stroke="#6B2737" stroke-width="0.7" fill="none"/>
  <circle cx="10" cy="10" r="3" fill="#6B2737"/>
  <ellipse cx="50" cy="50" rx="18" ry="10" fill="#6B2737" opacity="0.6" transform="rotate(-30 50 50)"/>
  <ellipse cx="30" cy="70" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(-60 30 70)"/>
  <ellipse cx="70" cy="30" rx="14" ry="8" fill="#6B2737" opacity="0.5"/>
  <circle cx="55" cy="20" r="4" fill="#6B2737" opacity="0.4"/>
  <circle cx="20" cy="55" r="4" fill="#6B2737" opacity="0.4"/>
  <path d="M25 80 Q35 65 50 70 Q45 85 25 80Z" fill="#6B2737" opacity="0.5"/>
  <path d="M80 25 Q65 35 70 50 Q85 45 80 25Z" fill="#6B2737" opacity="0.5"/>
</svg>
<svg class="corner-ornament bl" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10 Q80 10 10 80" stroke="#6B2737" stroke-width="1" fill="none"/>
  <path d="M10 10 Q60 40 40 90" stroke="#6B2737" stroke-width="0.7" fill="none"/>
  <path d="M10 10 Q40 60 90 40" stroke="#6B2737" stroke-width="0.7" fill="none"/>
  <circle cx="10" cy="10" r="3" fill="#6B2737"/>
  <ellipse cx="50" cy="50" rx="18" ry="10" fill="#6B2737" opacity="0.6" transform="rotate(-30 50 50)"/>
  <ellipse cx="30" cy="70" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(-60 30 70)"/>
  <ellipse cx="70" cy="30" rx="14" ry="8" fill="#6B2737" opacity="0.5"/>
  <path d="M25 80 Q35 65 50 70 Q45 85 25 80Z" fill="#6B2737" opacity="0.5"/>
  <path d="M80 25 Q65 35 70 50 Q85 45 80 25Z" fill="#6B2737" opacity="0.5"/>
</svg>
<svg class="corner-ornament br" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 10 Q80 10 10 80" stroke="#6B2737" stroke-width="1" fill="none"/>
  <path d="M10 10 Q60 40 40 90" stroke="#6B2737" stroke-width="0.7" fill="none"/>
  <path d="M10 10 Q40 60 90 40" stroke="#6B2737" stroke-width="0.7" fill="none"/>
  <circle cx="10" cy="10" r="3" fill="#6B2737"/>
  <ellipse cx="50" cy="50" rx="18" ry="10" fill="#6B2737" opacity="0.6" transform="rotate(-30 50 50)"/>
  <ellipse cx="30" cy="70" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(-60 30 70)"/>
  <ellipse cx="70" cy="30" rx="14" ry="8" fill="#6B2737" opacity="0.5"/>
  <path d="M25 80 Q35 65 50 70 Q45 85 25 80Z" fill="#6B2737" opacity="0.5"/>
  <path d="M80 25 Q65 35 70 50 Q85 45 80 25Z" fill="#6B2737" opacity="0.5"/>
</svg>

<header class="page-header">
  <p class="eyebrow">Welcome to our wedding</p>
  <div class="title-block">
    <span class="title-our">Our</span>
    <span class="title-wedding">Wedding</span>
  </div>
  <div class="header-rule"></div>
  <p class="invite-line">Dear <strong>Guest</strong> &mdash; You are invited to our wedding</p>
</header>

<div class="scene">
  <div class="envelope-wrap" id="envelope" onclick="openEnvelope()" role="button" aria-label="Click to open invitation">

    <div class="envelope-body">
      <div class="env-back"></div>
      <div class="env-side left"></div>
      <div class="env-side right"></div>
      <div class="env-bottom"></div>

      <!-- Flap -->
      <div class="flap-wrap" id="flap">
        <div class="env-flap"></div>
        <div class="env-flap-inner"></div>
      </div>

      <!-- Wax seal -->
      <div class="seal-wrap" id="seal">
        <div class="seal">
          <svg viewBox="0 0 82 82" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sealGrad" cx="38%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#8B3A4D"/>
                <stop offset="50%" stop-color="#6B2737"/>
                <stop offset="100%" stop-color="#3A1020"/>
              </radialGradient>
              <radialGradient id="goldRing" cx="50%" cy="50%" r="50%">
                <stop offset="80%" stop-color="transparent"/>
                <stop offset="90%" stop-color="#C8A96E" stop-opacity="0.7"/>
                <stop offset="100%" stop-color="#A88040" stop-opacity="0.5"/>
              </radialGradient>
            </defs>
            <!-- Outer decorative ring -->
            <circle cx="41" cy="41" r="40" fill="none" stroke="#C8A96E" stroke-width="0.5" opacity="0.6"/>
            <!-- Main seal -->
            <circle cx="41" cy="41" r="36" fill="url(#sealGrad)"/>
            <!-- Texture ring -->
            <circle cx="41" cy="41" r="36" fill="url(#goldRing)"/>
            <!-- Inner ring -->
            <circle cx="41" cy="41" r="29" fill="none" stroke="#C8A96E" stroke-width="0.5" opacity="0.5"/>
            <!-- Monogram -->
            <text x="41" y="36" text-anchor="middle" font-family="Great Vibes, cursive" font-size="13" fill="#F0D8A0" opacity="0.95">J &amp; A</text>
            <!-- Star ornaments -->
            <g fill="#C8A96E" opacity="0.5">
              <polygon points="41,13 42.2,16.6 46,16.6 43,18.8 44.2,22.4 41,20.2 37.8,22.4 39,18.8 36,16.6 39.8,16.6" transform="scale(0.55) translate(33,17)"/>
            </g>
            <!-- Small dots ring -->
            <g fill="#C8A96E" opacity="0.45">
              <circle cx="41" cy="12" r="1.2"/>
              <circle cx="41" cy="70" r="1.2"/>
              <circle cx="12" cy="41" r="1.2"/>
              <circle cx="70" cy="41" r="1.2"/>
              <circle cx="20" cy="20" r="1"/>
              <circle cx="62" cy="20" r="1"/>
              <circle cx="20" cy="62" r="1"/>
              <circle cx="62" cy="62" r="1"/>
            </g>
            <!-- Light reflection -->
            <ellipse cx="32" cy="28" rx="10" ry="6" fill="white" opacity="0.06" transform="rotate(-30 32 28)"/>
          </svg>
        </div>
      </div>

      <!-- Card slot -->
      <div class="card-slot">
        <div class="invite-card" id="card">
          <div class="card-ornament">
            <div class="card-ornament-dot"></div>
            <div class="card-ornament-line"></div>
            <div class="card-ornament-dot"></div>
          </div>

          <div class="card-to">to: Guest</div>

          <div class="card-names">Joefren &amp; Allyster</div>

          <div class="card-divider">
            <div class="card-divider-line"></div>
            <div class="card-divider-diamond"></div>
            <div class="card-divider-line"></div>
          </div>

          <p class="card-tagline">Inviting you to share in the joy of our wedding day</p>

          <p class="card-quote">&ldquo;You changed my world the moment I met you&hellip;&rdquo;</p>

          <div class="card-ornament">
            <div class="card-ornament-dot"></div>
            <div class="card-ornament-line"></div>
            <div class="card-ornament-dot"></div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="click-hint" id="hint">
    <span class="click-hint-text">Click the invitation to open</span>
    <div class="click-hint-chevron"></div>
  </div>
</div>

<script>
  let opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    const env = document.getElementById('envelope');
    env.classList.add('is-open');
    document.getElementById('hint').classList.add('hidden');

    // Release rose petals
    setTimeout(scatterPetals, 400);
  }

  function scatterPetals() {
    const colors = ['#C8A0A8', '#DEB8C0', '#E8C8C0', '#C8A96E', '#EDD8C8'];
    const count = 22;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = 6 + Math.random() * 10;
        const xPos = 20 + Math.random() * 60;
        const dur = 2.5 + Math.random() * 2.5;
        const delay = Math.random() * 0.4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        petal.style.cssText = `
          left: ${xPos}%;
          top: 30%;
          width: ${size}px;
          height: ${size * 0.65}px;
          background: ${color};
          opacity: 0;
          animation: fall ${dur}s ${delay}s linear forwards;
          border-radius: ${Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'};
        `;

        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), (dur + delay + 0.2) * 1000);
      }, i * 80);
    }
  }
</script>
</body>
</html>
