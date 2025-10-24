import { tropeCategories, pickRandom } from "./tropes";

export type TransformItem = { original: string; transformed: string };

export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const buf = Buffer.from(await file.arrayBuffer());
  if (name.endsWith(".pdf")) {
    return await extractTextFromPdfBuffer(buf);
  }
  if (name.endsWith(".txt")) {
    return buf.toString("utf8");
  }
  throw new Error("Unsupported file type. Please upload .pdf or .txt");
}

async function extractTextFromPdfBuffer(buffer: Buffer): Promise<string> {
  // Use pdfjs-dist dynamically to avoid build-time issues
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;
  let out = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => (typeof item.str === "string" ? item.str : ""))
      .join(" ");
    out += pageText + "\n";
  }
  try {
    await (pdf as any).cleanup?.();
  } catch {}
  return out.trim();
}

export function splitIntoPrompts(raw: string): string[] {
  const lines = raw
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  return lines;
}

export function transformPrompts(prompts: string[], dna: string): TransformItem[] {
  return prompts.map((p) => ({ original: p, transformed: transformOne(p, dna) }));
}

function transformOne(prompt: string, dna: string): string {
  const emphasis = dna?.trim() ? `; emphasis: ${dna.trim()}` : "";

  const selections: string[] = [];
  for (const cat of tropeCategories) {
    const count = cat.name === "catchphrases" ? 1 : 1 + Math.floor(Math.random() * 2); // 1-2 items
    selections.push(...pickRandom(cat.options, count));
  }

  const tags = selections.join(", ");

  const guidance = [
    "1980s Saturday morning cartoon style",
    "cel-shaded, thick ink lines",
    "broadcast 4:3, limited 12fps",
    "toy-commercial composition",
    "VHS artifacts, analog warmth"
  ].join(", ");

  const structure = [
    `subject: ${prompt}`,
    `style: ${guidance}`,
    `tropes: ${tags}`,
    `soundtrack cues included`,
    `safe-for-tv, all-ages tone`,
    `avoid modern 3D realism`,
    `flattened highlights and airbrush shadows`,
    `color bleed and scanlines`
  ].join("; ");

  return `${structure}${emphasis}`;
}
