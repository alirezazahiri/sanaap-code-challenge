import fs from "fs";
import path from "path";
import { transform } from "@svgr/core";

const INPUT_DIR = path.resolve(__dirname, "../src/assets/icons");
const OUTPUT_DIR = path.resolve(__dirname, "../src/components/shared/icons");

async function generateIcons() {
  const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith(".svg"));

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const indexExports: string[] = [];
  let generatedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const componentName = `${toPascalCase(path.basename(file, ".svg"))}Icon`;
    const outPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);

    if (fs.existsSync(outPath)) {
      indexExports.push(
        `export { default as ${componentName} } from './${componentName}';`
      );
      skippedCount++;
      continue;
    }

    const svgPath = path.join(INPUT_DIR, file);
    const svgCode = fs.readFileSync(svgPath, "utf8");

    try {
      const jsxCode = await transform(
        svgCode,
        {
          icon: true,
          typescript: true,
          jsxRuntime: "classic",
          prettier: true,
          plugins: ["@svgr/plugin-jsx"],
        },
        { componentName }
      );

      const svgMatch = jsxCode.match(/<svg[\s\S]*<\/svg>/);
      if (!svgMatch) {
        console.error(`Γ¥î failed to transform SVG for ${file}`);
        continue;
      }

      const svgPart = svgMatch[0]
        .replace(/<svg/, "<svg\n    ")
        .replace(/width="[^"]*"/, 'width="1em"')
        .replace(/height="[^"]*"/, 'height="1em"')
        .replace(/class="[^"]*"/g, "")
        .replace(/><\//g, ">\n  </");

      const customCode = `import * as React from 'react';
import type { SVGProps } from "react";

const ${componentName} = (props: SVGProps<SVGSVGElement>) => (
  ${svgPart}
);

export default ${componentName};`;

      fs.writeFileSync(outPath, customCode);
      indexExports.push(
        `export { default as ${componentName} } from './${componentName}';`
      );
      generatedCount++;
    } catch (err) {
      console.error(`Γ¥î Error processing ${file}:`, err);
    }
  }

  if (generatedCount > 0) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, "index.ts"),
      indexExports.join("\n")
    );
  }

  console.log(
    `Γ£à Icons generation complete. Generated ${generatedCount} new icons, skipped ${skippedCount} existing ones.`
  );
}

function toPascalCase(str: string) {
  return str
    .replace(/[-_]+/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+(.)(\w+)/g, (_, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (_, p1) => p1.toUpperCase());
}

generateIcons().catch((err) => {
  console.error(err);
  process.exit(1);
});