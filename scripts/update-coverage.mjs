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
  const metrics = parseMetrics(summary);
  return { label, ok, summary, stdout, stderr, code: result.status ?? -1, metrics };
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

function parseMetrics(summary) {
  const line = summary.split(/\r?\n/).find((l) => l.trim().startsWith("All files"));
  if (!line) return null;

  // Parse the pipe-delimited v8 summary row to avoid NaN when spacing varies.
  const match = line.match(/All files\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)/);
  if (!match) return null;

  const [, stmts, branch, funcs, lines] = match;
  const toNum = (s) => Number.parseFloat(s);
  return { stmts: toNum(stmts), branch: toNum(branch), funcs: toNum(funcs), lines: toNum(lines) };
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
    ...snapshots.map((snap) => renderSnapshot(snap)),
    endMarker,
  ].join("\n");

  const pattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, "g");
  const stripped = readme.replace(pattern, "").trim();
  const updated = `${stripped}\n\n${payload}\n`;
  writeFileSync(readmePath, updated);
}

function renderSnapshot(snap) {
  const badge = snap.metrics
    ? `![${snap.label} coverage](https://img.shields.io/badge/${encodeURIComponent(snap.label.replace(/\s+/g, "_"))}-${snap.metrics.lines.toFixed(2)}%25-blue)`
    : "";
  const table = snap.metrics
    ? [
        `| App | %Stmts | %Branch | %Funcs | %Lines |`,
        `| --- | ------ | ------- | ------ | ------ |`,
        `| ${snap.label} | ${snap.metrics.stmts.toFixed(2)} | ${snap.metrics.branch.toFixed(2)} | ${snap.metrics.funcs.toFixed(2)} | ${snap.metrics.lines.toFixed(2)} |`,
      ].join("\n")
    : "(Coverage summary not found)";

  return [snap.label, badge, "", table, "", "<details><summary>Full report</summary>", "", "```", snap.summary, "```", "", "</details>", ""].join("\n");
}

const snapshots = targets.map(runCommand);
updateReadme(snapshots);

const failed = snapshots.filter((s) => !s.ok);
if (failed.length) {
  console.error("Coverage command failed", failed.map((f) => `${f.label} (code ${f.code})`).join(", "));
  process.exit(1);
}

console.log("Coverage snapshot updated in README.md");
