import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

const targets = [
  {
    label: "Web (apps/www.k3h4.io)",
    cwd: resolve(root, "apps/www.k3h4.io"),
    command: "bun",
    args: ["run", "test", "--coverage"],
  },
  {
    label: "API (apps/api.k3h4.io)",
    cwd: resolve(root, "apps/api.k3h4.io"),
    command: "bun",
    args: ["run", "test:coverage"],
  },
];

function runCommand({ label, cwd, command, args }) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8" });
  const stripAnsi = (text) => text?.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "") || "";
  const stdout = stripAnsi(result.stdout || "");
  const stderr = stripAnsi(result.stderr || "");
  const ok = result.status === 0;
  const summary = extractCoverage(stdout) || extractCoverage(stderr) || "Coverage summary not found.";
  return { label, ok, summary, stdout, stderr, code: result.status ?? -1 };
}

function extractCoverage(text) {
  if (!text) return "";
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line.toLowerCase().includes("coverage report"));
  if (start !== -1) {
    let end = lines.length;
    for (let i = start + 1; i < lines.length - 1; i += 1) {
      if (lines[i].trim() === "" && lines[i + 1].trim() === "") {
        end = i;
        break;
      }
    }
    return lines.slice(start, end).join("\n").trim();
  }

  // Fallback: last 80 lines
  const tail = lines.slice(-80).join("\n").trim();
  return tail;
}

function updateReadme(snapshots) {
  const startMarker = "<!-- coverage-start -->";
  const endMarker = "<!-- coverage-end -->";
  const readmePath = resolve(root, "README.md");
  const readme = readFileSync(readmePath, "utf8");

  const payload = [
    startMarker,
    "## Latest Coverage",
    `Updated: ${new Date().toISOString()}`,
    "",
    "```",
    ...snapshots.flatMap((snap) => [snap.label, snap.summary, ""]),
    "```",
    endMarker,
  ].join("\n");

  const pattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, "g");
  const stripped = readme.replace(pattern, "").trim();
  const updated = `${stripped}\n\n${payload}\n`;
  writeFileSync(readmePath, updated);
}

const snapshots = targets.map(runCommand);
updateReadme(snapshots);

const failed = snapshots.filter((s) => !s.ok);
if (failed.length) {
  console.error("Coverage command failed", failed.map((f) => `${f.label} (code ${f.code})`).join(", "));
  process.exit(1);
}

console.log("Coverage snapshot updated in README.md");
