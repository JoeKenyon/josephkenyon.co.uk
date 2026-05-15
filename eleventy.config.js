import pluginNavigation from "@11ty/eleventy-navigation";
import pluginImages from "./eleventy.config.images.js";
import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) 
{
	
	// --- PLUGINS ---
	
	// Import all the image logic we defined in the other file
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	// --- ASSETS & WATCHING ---
	
	// Copy the 'public' folder (where images are processed to) to the root of _site
	eleventyConfig.addPassthroughCopy({"./public/": "/"});
	
	// Watch and copy CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");
	eleventyConfig.addPassthroughCopy({"css/**/*.css": "/"});
	
	// Watch for new images in the content folder to trigger a rebuild
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
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