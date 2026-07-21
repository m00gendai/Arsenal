import { dateLocales } from "configs/configs";
import fs from "fs";
import path from "path";

const languages = Array.from(new Set(Object.values(dateLocales).map(locale => locale.split("-")[0].toUpperCase())))

for(const language of languages){
    const pathName = `../website/src/text/salesPitch_${language}.mdx`
const filePath = path.resolve(__dirname, pathName);
let content = fs.readFileSync(filePath, "utf-8");

content = content
  // Remove import statements
  .replace(/^import .+;?\s*$/gm, "")
  // Remove JSX/HTML components (self-closing or with children), e.g. <Reviews ... />
  .replace(/<[A-Za-z][^>]*\/?>/g, "")
  .replace(/<\/[A-Za-z][^>]*>/g, "")
  // Remove H1
  .replace(/^#.+\n?/m, "")
  // Remove Bold / italic
  .replace(/\*\*(.*?)\*\*/g, "$1")
  .replace(/\*(.*?)\*/g, "$1")
  // Remove Markdown line-break backslash at end of line -> just a newline
  .replace(/\\\s*$/gm, "")
  // Collapse 3+ blank lines down to max 1 blank line
  .replace(/\n{3,}/g, "\n\n")
  .trim();

console.log("\n\n################################################################################")
console.log(`${language}`)
console.log(`Length: ${content.length}`);
console.log("################################################################################\n\n")

console.log(content);

}

