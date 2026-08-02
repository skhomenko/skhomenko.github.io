/**
 * Generates public/og.png, the Open Graph card every link preview renders.
 *
 * Built from the site's own tokens rather than an illustration, so a shared
 * link looks like the page it opens. Run with `node scripts/make-og.mjs`
 * after changing the name, the role line, or the palette.
 */
import sharp from "sharp";

const W = 1200;
const H = 630;

const ink0 = "#f3f7f5";
const ink2 = "#91a09d";
const surface0 = "#071014";
const mint = "#89f0dc";
const blue = "#6cb9ff";
const amber = "#f3c77a";

const sans = "Avenir Next, Avenir, Helvetica Neue, Helvetica, sans-serif";
const mono = "Menlo, SFMono-Regular, Consolas, monospace";

const name = "Sergii Khomenko";
const role = "SOFTWARE ENGINEER  ·  QUALITY ENGINEERING AND DEVELOPMENT";
const motto = "Every difficult problem has a path forward.";
const url = "skhomenko.github.io";

/** Same 40px lattice the page body uses, at the same near-invisible weight. */
const grid = () => {
  const lines = [];
  for (let x = 40; x < W; x += 40)
    lines.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${mint}" stroke-opacity="0.035" stroke-width="1"/>`,
    );
  for (let y = 40; y < H; y += 40)
    lines.push(
      `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${mint}" stroke-opacity="0.035" stroke-width="1"/>`,
    );
  return lines.join("");
};

/** The header's brand mark: three stacked rules, mint over blue over amber. */
const brandMark = (x, y, w = 96) =>
  `<rect x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="${mint}"/>
   <rect x="${x}" y="${y + 16}" width="${w * 0.68}" height="6" rx="3" fill="${blue}"/>
   <rect x="${x}" y="${y + 32}" width="${w * 0.84}" height="6" rx="3" fill="${amber}"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="rail" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${mint}"/>
      <stop offset="0.55" stop-color="${blue}"/>
      <stop offset="1" stop-color="${amber}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.15" cy="0.1" r="0.9">
      <stop offset="0" stop-color="${mint}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${mint}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${surface0}"/>
  ${grid()}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  ${brandMark(88, 92)}

  <text x="88" y="290" font-family="${sans}" font-size="82" font-weight="600"
        fill="${ink0}" letter-spacing="-2">${name}</text>

  <rect x="88" y="330" width="420" height="2" rx="1" fill="url(#rail)"/>

  <text x="88" y="392" font-family="${mono}" font-size="23"
        fill="${mint}" letter-spacing="1.5">${role}</text>

  <text x="88" y="470" font-family="${sans}" font-size="27"
        fill="${ink2}">${motto}</text>

  <text x="88" y="560" font-family="${mono}" font-size="21"
        fill="${ink2}" letter-spacing="1.2">${url}</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: true })
  .toFile(process.argv[2] ?? "public/og.png");

console.log(`wrote ${process.argv[2] ?? "public/og.png"} (${W}x${H})`);
