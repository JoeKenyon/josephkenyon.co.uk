import pluginNavigation from "@11ty/eleventy-navigation";
import pluginImages from "./eleventy.config.images.js";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import prettier from "prettier";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) 
{
	
	// --- PLUGINS ---
	
	// import all the image logic we defined in the other file
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(syntaxHighlight);

	// --- ASSETS & WATCHING ---
	
	// watch and copy CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");
	eleventyConfig.addPassthroughCopy({"css/**/*.css": "/"});
	
	// watch for new images in the content folder to trigger a rebuild
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addPassthroughCopy({"./public/": "/"});


	// i want this for some reason
	eleventyConfig.addTransform("prettierHTML", 
		function(content, outputPath) 
		{
			if (outputPath && outputPath.endsWith(".html")) 
			{
				try 
				{
					return prettier.format(content, 
					{ 
						parser: "html",
						printWidth: 120,
						tabWidth: 2,
						useTabs: false
					});
				} 
				catch (error) 
				{
					console.error(outputPath, error);
					return content;
				}
			}
			return content;
		}
	);
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