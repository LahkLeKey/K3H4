import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const root = join(process.cwd(), "src", "stores");

const violations: { file: string; message: string }[] = [];

function walk(dir: string) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }
    if (!full.endsWith(".ts") && !full.endsWith(".tsx")) continue;
    checkFile(full);
  }
}

function checkFile(filePath: string) {
  const content = readFileSync(filePath, "utf8");
  const rel = relative(process.cwd(), filePath).replace(/\\/g, "/");

  if (content.includes("useState(")) {
    violations.push({ file: rel, message: "useState is not allowed in stores" });
  }
  if (content.includes("fetch(")) {
    violations.push({ file: rel, message: "fetch should not be called from stores (use react-query hooks)" });
  }
  if (content.match(/\baxios\b/)) {
    violations.push({ file: rel, message: "axios should not be used in stores" });
  }
}

walk(root);

if (violations.length > 0) {
  console.error("Store policy violations detected:\n");
  for (const v of violations) {
    console.error(`- ${v.file}: ${v.message}`);
  }
  process.exit(1);
}

console.log("Store policy check passed.");
