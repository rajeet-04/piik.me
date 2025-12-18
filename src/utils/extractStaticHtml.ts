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
  const htmlPath = path.join(process.cwd(), "public", fileName);
  const html = fs.readFileSync(htmlPath, "utf8");
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch?.[1] ?? "";

  const scripts: ExtractedScript[] = [];
  const body = bodyContent.replace(
    /<script([^>]*)>([\s\S]*?)<\/script>/gi,
    (_match, attrs, inlineContent) => {
      const srcMatch =
        typeof attrs === "string"
          ? attrs.match(/src=["']([^"']+)["']/i)
          : null;

      if (srcMatch?.[1]) {
        scripts.push({ src: srcMatch[1] });
      } else if (inlineContent && inlineContent.trim()) {
        scripts.push({ inline: inlineContent.trim() });
      }

      return "";
    }
  );

  return {
    body,
    scripts,
  };
}
