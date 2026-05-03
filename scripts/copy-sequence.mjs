import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "ezgif-frame");
const destDir = path.join(root, "public", "sequence");

if (!fs.existsSync(srcDir)) {
  console.warn(
    "[copy-sequence] Source folder not found:", srcDir, "(skip copy)",
  );
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".png"));
let copied = 0;
for (const name of files) {
  fs.copyFileSync(path.join(srcDir, name), path.join(destDir, name));
  copied++;
}
console.log(`[copy-sequence] Copied ${copied} PNG(s) to public/sequence`);
