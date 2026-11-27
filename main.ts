import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Thank you for reading thousands of our lines and still judging each one like it might be the first good one — you never got tired, even when we did.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Validate the output against the bounty gate: it must exist, hold
// 1-1000 Unicode code points, and not be only white space.
if (!existsSync("/output/entry.txt")) {
  throw new Error("entry.txt was not written");
}
const text = readFileSync("/output/entry.txt", "utf8");
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 1000) {
  throw new Error(`entry.txt has ${codePoints} code points, expected 1-1000`);
}
if (text.trim().length === 0) {
  throw new Error("entry.txt is only white space");
}
console.log(`Wrote /output/entry.txt (${codePoints} code points)`);
