import fs from "node:fs";
import path from "node:path";

const artDir = path.join(process.cwd(), "content/art/imgs");
const files = fs.existsSync(artDir) ? fs.readdirSync(artDir) : [];

export default 
{
	tags: ["art"],
	collectionKey: "art",
	layout: "art.njk",
	images: files
		.filter(file => {
			const fullPath = path.join(artDir, file);
			return fs.statSync(fullPath).isFile() && /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file);
		})
		.map(file => ({
			src: `./${file}`,
			name: file,
			slug: path.parse(file).name
		}))
};