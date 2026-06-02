import fs from 'fs';
import sizeOf from 'image-size';
import path from 'path';

const ART_ASSETS_DIR = '../src/assets/imgs/art';
const ART_CONTENT_DIR = '../src/content/art';
const ART_IMG_DIR_REL = '../../assets/imgs/art'; //releative to the md post

// Ensure the content directory exists
if (!fs.existsSync(ART_CONTENT_DIR)) {
    fs.mkdirSync(ART_CONTENT_DIR, { recursive: true });
}

console.log("Generating Art Markdown files...");

const files = fs.readdirSync(ART_ASSETS_DIR).filter(file => 
  /\.(png|jpg|jpeg|svg|webp)$/i.test(file)
);

files.forEach(file => {
    const filePath = path.join(ART_ASSETS_DIR, file);
    try {
        const buffer = fs.readFileSync(filePath);
        const dimensions = sizeOf(buffer);
        
        // Create a URL-friendly slug from the filename (e.g., "My Art.png" -> "my-art")
        const slug = file.toLowerCase()
            .replace(/\.[^/.]+$/, "") // Remove extension
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const title = file.replace(/\.[^/.]+$/, ""); // Title without extension

        let frontmatter = "---\n";
        frontmatter += `title: "${title}"\n`;
        frontmatter += `thumbnail: "${ART_IMG_DIR_REL}/${file}"\n`; // The filename in src/assets/art/
        frontmatter += `width: ${dimensions.width}\n`;
        frontmatter += `height: ${dimensions.height}\n`;
        frontmatter += `ratio: "${(dimensions.height / dimensions.width).toFixed(4)}"\n`;
        frontmatter += "---\n\n";
        frontmatter += `Details for ${title}.`;

        const fileName = `${slug}.md`;
        fs.writeFileSync(path.join(ART_CONTENT_DIR, fileName), frontmatter);
        console.log(`Generated: ${fileName}`);

    } catch (err) {
        console.warn(`Skipping ${file}: ${err.message}`);
    }
});

console.log("Success!");