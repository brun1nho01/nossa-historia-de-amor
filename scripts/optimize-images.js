import sharp from "sharp";
import { readdir } from "fs/promises";
import path from "path";

const inputDir = "public/images";
const outputDir = "public/images/optimized";

async function optimizeImages() {
  try {
    const files = await readdir(inputDir);
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      await sharp(inputPath)
        .resize(800, 800, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp"));

      console.log(`Optimized: ${file}`);
    }
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImages();
