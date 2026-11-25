import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USERNAME = "plucky-panda-24";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "/output";
}

function validate(text: string): void {
  if (text.length < 1 || text.length > 30) {
    throw new Error("entry must be 1 to 30 characters");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be a single word with no whitespace");
  }
}

const dir = outputDir();
validate(USERNAME);
mkdirSync(dir, { recursive: true });
const target = join(dir, "entry.txt");
writeFileSync(target, USERNAME, "utf8");

// Read back what was written and confirm it is byte-for-byte the handle.
const written = readFileSync(target, "utf8");
if (written !== USERNAME) {
  throw new Error("written entry does not match the username");
}
validate(written);
