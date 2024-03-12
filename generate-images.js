import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Input and output directories
const inputDir = 'cover';
const outputDir = 'cover';

// Read the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  const filesFiltered = files.filter((f) => {
    return !new RegExp(".*_\d*\.*$").test(f)
  })

  // Process each image
  filesFiltered.forEach((file) => {
    const inputImagePath = path.join(inputDir, file);
    const outputImageDir = path.join(outputDir);
    const outputBaseName = path.basename(file, path.extname(file));

    // Create output directory if not exists
    if (!fs.existsSync(outputImageDir)) {
      fs.mkdirSync(outputImageDir, { recursive: true });
    }

    // Define widths for srcset
    const widths = [120, 200, 320, 640, 800];

    // Generate and save images with different widths
    widths.forEach((width) => {
      const outputFile = path.join(outputImageDir, `${outputBaseName}_${width}.jpg`);

      sharp(inputImagePath)
        .resize({ width })
        .toFile(outputFile, (err) => {
          if (err) {
            console.error(`Error processing image ${inputImagePath} at width ${width}:`, err);
          } else {
            console.log(`Image processed successfully: ${outputFile}`);
          }
        });
    });
  });
});
