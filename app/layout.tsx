import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1980s Animation DNA Transformer",
  description: "Upload prompts or a PDF and transform them with 80s animation DNA"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1>1980s Animation DNA Transformer</h1>
            <p className="tag">Turn your prompt book into radical 80s vibes</p>
          </header>
          <main>{children}</main>
          <footer className="footer">Built for creative prompt remixing</footer>
        </div>
      </body>
    </html>
  );
}
