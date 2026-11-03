import embedEverything from "eleventy-plugin-embed-everything";
import embedYouTube from "eleventy-plugin-youtube-embed";
import fs from 'node:fs';
import path from 'node:path';

export default async function(eleventyConfig) 
{
  // Configure Eleventy directories
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setLayoutsDirectory("_layouts");

  // Plugins
  eleventyConfig.addPlugin(embedEverything);
  eleventyConfig.addPlugin(embedYouTube);

  // Passthrough Copies
  eleventyConfig.addPassthroughCopy("./src/art/*");
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy("src/projects/assets/*");
  eleventyConfig.addPassthroughCopy("src/music/assets/*");
  eleventyConfig.addPassthroughCopy("src/music/misc/*");

  // Watch targets
  eleventyConfig.addWatchTarget("styles.css");

  // Collections
  eleventyConfig.addCollection("artImages", function(collectionApi) 
  {
    const artDir = "./src/art";
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
    // Since inputDir is "src", glob paths are relative to "src"
    return collectionApi.getFilteredByGlob("./src/projects/**/*.md");
  });

  eleventyConfig.addCollection("music", function(collectionApi) 
  {
    return collectionApi.getFilteredByGlob("./src/music/**/*.md");
  });

  eleventyConfig.addCollection("misc_music", function(collectionApi) 
  {
    const musicDir = "./src/music/misc";
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

  // Copy root public folder assets directly to dist root
  eleventyConfig.addPassthroughCopy({ "public": "." });
};