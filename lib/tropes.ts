export type TropeCategory = {
  name: string;
  options: string[];
};

export const tropeCategories: TropeCategory[] = [
  {
    name: "visualStyle",
    options: [
      "Saturday-morning cartoon cel shading",
      "bold black inked outlines",
      "limited animation 12fps",
      "hand-painted acetate cels",
      "flat airbrush gradients",
      "screen-tone halftone shadows",
      "4:3 broadcast framing",
      "toyetic character design",
      "Hanna-Barbera walk-cycles",
      "Filmation-style looped motions",
      "Smear frames on fast action",
      "exaggerated squash-and-stretch",
      "ThunderCats thunderous hero poses",
      "He-Man heroic stance silhouettes",
      "TMNT sewer grime texture",
      "Transformers-style panel highlights"
    ]
  },
  {
    name: "colorPalette",
    options: [
      "neon magenta and cyan glow",
      "sunset gradient: fuchsia→orange",
      "electric teal with hot pink accents",
      "primary toy aisle palette",
      "pastel Miami Vice hues",
      "VHS-scanline muted brights",
      "saturated comic-book inks",
      "retro computer terminal greens"
    ]
  },
  {
    name: "texture",
    options: [
      "VHS tape noise and chroma bleed",
      "analog scanlines and tracking drift",
      "slight film grain and dust",
      "off-register color misprint",
      "cel shadow jitter",
      "paper background fiber",
      "CRT phosphor glow"
    ]
  },
  {
    name: "camera",
    options: [
      "zooms with snap-in rack focus",
      "parallax multiplane background",
      "hero push-in dolly zoom",
      "low-angle toy commercial shot",
      "whip-pan between characters",
      "freeze-frame on catchphrase",
      "star-wipe transition"
    ]
  },
  {
    name: "narrative",
    options: [
      "monster-of-the-week setup",
      "team lineup pose intro",
      "villain explains plan loudly",
      "lesson-of-the-day moral tag",
      "gadget-of-the-episode spotlight",
      "cliffhanger to be continued",
      "secret lair with blinking consoles"
    ]
  },
  {
    name: "audio",
    options: [
      "analog synth brass stabs",
      "gated reverb drums",
      "arpeggiated bassline",
      "power-chord guitar sting",
      "cheesy mascot voice-over",
      "Saturday-morning jingle chorus"
    ]
  },
  {
    name: "catchphrases",
    options: [
      "By the power of retro!",
      "Totally tubular!",
      "Radical rescue mode!",
      "Cowabunga strike!",
      "Let's roll out!",
      "Neon justice, ignite!",
      "To the lair!",
      "Synthwave slam!"
    ]
  }
];

export function pickRandom<T>(arr: T[], count: number): T[] {
  if (count >= arr.length) return shuffle(arr.slice());
  return shuffle(arr.slice()).slice(0, count);
}

export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
