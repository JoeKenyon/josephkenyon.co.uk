import embedEverything from "eleventy-plugin-embed-everything";
import embedYouTube from "eleventy-plugin-youtube-embed";
import fs from 'node:fs';
import path from 'node:path';

export default async function(eleventyConfig) 
{
	// Configure Eleventy
    eleventyConfig.setOutputDirectory("dist");
    eleventyConfig.setIncludesDirectory("_includes");
    eleventyConfig.setLayoutsDirectory("_layouts");
    eleventyConfig.addPlugin(embedEverything);
    eleventyConfig.addPlugin(embedYouTube);
    eleventyConfig.addPassthroughCopy("art");
    eleventyConfig.addPassthroughCopy("styles.css");
    eleventyConfig.addPassthroughCopy("./projects/assets");
    eleventyConfig.addPassthroughCopy("./music/assets");
    eleventyConfig.addPassthroughCopy("./music/demos");
    eleventyConfig.addWatchTarget("./styles.css");

  eleventyConfig.addCollection("artImages", function(collectionApi) 
  {
    const artDir = "./art"; // update this path if your art folder is located elsewhere
    if (!fs.existsSync(artDir)) return [];
    
    return fs.readdirSync(artDir)
      .filter(file => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
      .map(file => 
      {
        return {
          url: `/art/${file}`,
          alt: path.basename(file, path.extname(file)).replace(/[-_]/g, ' ')
        };
      });
  });

  eleventyConfig.addCollection("projects", function(collectionApi) 
  {
    return collectionApi.getFilteredByGlob("./projects/**/*.{md,njk,html}");
  });

  eleventyConfig.addCollection("music", function(collectionApi) 
  {
    return collectionApi.getFilteredByGlob("./music/**/*.{md,njk,html}");
  });

  eleventyConfig.addCollection("misc_music", function(collectionApi) 
  {
    const musicDir = "./music/misc";
    if (!fs.existsSync(musicDir)) return [];
    
    return fs.readdirSync(musicDir)
      .filter(file => /\.mp3$/i.test(file))
      .map(file => 
      {
        return {
          url: `/music/misc/${file}`,
          title: path.basename(file, path.extname(file)).replace(/[-_]/g, ' ')
        };
      });
  });

    // Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		});
};

