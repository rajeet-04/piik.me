import fs from "fs";
import path from "path";

export type ExtractedScript = {
  src?: string;
  inline?: string;
};

export type ExtractedHtml = {
  body: string;
  scripts: ExtractedScript[];
};

export function extractStaticHtml(fileName: string): ExtractedHtml {
  if (path.isAbsolute(fileName) || fileName.includes("..")) {
    throw new Error("Invalid file name");
  }

  const normalizedName = fileName.replace(/^[/\\]+/, "");
  const publicDir = path.join(process.cwd(), "public");
  const htmlPath = path.join(publicDir, normalizedName);

  if (!htmlPath.startsWith(publicDir)) {
    throw new Error("Invalid file path");
  }

  const html = fs.readFileSync(htmlPath, "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch?.[1] ?? "";

  const scripts: ExtractedScript[] = [];
  const scriptRegex =
    /<\s*script\b([^>]*)>([\s\S]*?)<\s*\/\s*script[^>]*>/gi;

  const matches = Array.from(bodyContent.matchAll(scriptRegex));
  let lastIndex = 0;
  let body = "";

  for (const match of matches) {
    const [full, attrs, inlineContent] = match;
    const start = match.index ?? 0;
    body += bodyContent.slice(lastIndex, start);

    const srcMatch = attrs?.match(/src=["']([^"']+)["']/i);

    if (srcMatch?.[1]) {
      scripts.push({ src: srcMatch[1] });
    } else if (typeof inlineContent === "string" && inlineContent.trim()) {
      scripts.push({ inline: inlineContent.trim() });
    }

    lastIndex = start + full.length;
  }

  body += bodyContent.slice(lastIndex);

  if (/<\s*script/i.test(body)) {
    throw new Error("Inline scripts are not allowed in static HTML content");
  }

  return {
    body,
    scripts,
  };
}
