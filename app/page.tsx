"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type TransformResponse = {
  original: string;
  transformed: string;
}[];

export default function Page() {
  const [dna, setDna] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<TransformResponse>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hasResults = results.length > 0;

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/transform", { method: "POST", body: formData });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }
      const data = (await res.json()) as TransformResponse;
      setResults(data);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadTxt = useCallback(() => {
    const lines = results.map((r, idx) => `${idx + 1}. ${r.transformed}`);
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "1980s-dna-prompts.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [results]);

  const clearAll = useCallback(() => {
    setResults([]);
    setError(null);
    setDna("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const placeholder = useMemo(
    () =>
      "Optional: Describe specific 80s animation tropes to bias transformations (e.g., Saturday-morning slapstick, synthwave neon, VHS artifacts, 4:3 framing, toyetic villains)",
    []
  );

  return (
    <div className="card">
      <form onSubmit={onSubmit} className="form" encType="multipart/form-data">
        <div className="row">
          <label className="label">Upload PDF or TXT of prompts</label>
          <input ref={fileInputRef} name="file" type="file" accept=".pdf,.txt" required />
        </div>
        <div className="row">
          <label className="label">Tropes DNA (optional)</label>
          <textarea name="dna" value={dna} onChange={(e) => setDna(e.target.value)} placeholder={placeholder} rows={3} />
        </div>
        <div className="actions">
          <button type="submit" disabled={loading}>{loading ? "Transforming…" : "Transform"}</button>
          <button type="button" onClick={clearAll} className="secondary">Clear</button>
          <button type="button" onClick={downloadTxt} disabled={!hasResults} className="secondary">Download TXT</button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {hasResults && (
        <div className="results">
          {results.map((r, i) => (
            <div className="result" key={i}>
              <div className="result-left">
                <div className="eyebrow">Original</div>
                <div className="mono small">{r.original}</div>
              </div>
              <div className="result-right">
                <div className="eyebrow">1980s DNA</div>
                <div className="mono">{r.transformed}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
