import { NextResponse } from "next/server";
import { extractTextFromFile, splitIntoPrompts, transformPrompts } from "@/lib/transform";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const dna = String(form.get("dna") || "");

    if (!(file instanceof File)) {
      return new NextResponse("Missing file", { status: 400 });
    }

    const text = await extractTextFromFile(file);
    const prompts = splitIntoPrompts(text);

    if (prompts.length === 0) {
      return NextResponse.json([]);
    }

    const items = transformPrompts(prompts, dna);

    return NextResponse.json(items);
  } catch (err: any) {
    return new NextResponse(err?.message || "Server error", { status: 500 });
  }
}
