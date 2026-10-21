import embedEverything from "eleventy-plugin-embed-everything";
import embedYouTube from "eleventy-plugin-youtube-embed";

export default async function(eleventyConfig) {
	// Configure Eleventy
    eleventyConfig.setOutputDirectory("dist");
    eleventyConfig.setIncludesDirectory("_includes");
    eleventyConfig.setLayoutsDirectory("_layouts");
    eleventyConfig.addPlugin(embedEverything);
    eleventyConfig.addPlugin(embedYouTube);
    eleventyConfig.addPassthroughCopy("art");
    eleventyConfig.addPassthroughCopy("styles.css");
    eleventyConfig.addPassthroughCopy("./projects/assets");
    eleventyConfig.addWatchTarget("./styles.css");

    // Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		});
};