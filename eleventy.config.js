import pluginNavigation from "@11ty/eleventy-navigation";
import pluginImages from "./eleventy.config.images.js";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import htmlmin from "html-minifier-next";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) 
{
	
	// --- PLUGINS ---
	
	// Import all the image logic we defined in the other file
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(syntaxHighlight);

	// --- ASSETS & WATCHING ---
	
	// Copy the 'public' folder (where images are processed to) to the root of _site
	
	// Watch and copy CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");
	eleventyConfig.addPassthroughCopy({"css/**/*.css": "/"});
	
	// Watch for new images in the content folder to trigger a rebuild
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addPassthroughCopy({"./public/": "/"});

	eleventyConfig.addTransform("beautifyHTML", function(content, outputPath) {
		// Only run this on .html files
	if (outputPath && outputPath.endsWith(".html")) {
		let unminified = htmlmin.minify(content, {
			removeComments: false,
			collapseWhitespace: true,
			conservativeCollapse: true,
			// This is the magic flag that fixes your indentation:
			minifyJS: false,
			minifyCSS: false,
			caseSensitive: true
		});
		
		// If you want actual formatted pretty printing, you can pipe it to a prettifier, 
		// or configure html-minifier to keep it structured.
		return unminified;
		}
		return content;
	});
};

// --- DIRECTORY CONFIG ---

export const config = 
{
	templateFormats: ["md", "njk", "html", "11ty.js"],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
	dir: 
	{
		input: "content",          
		includes: "../_includes",  
		data: "../_data",          
		output: "_site"
	},
};