import path from "path";
import eleventyImage from "@11ty/eleventy-img";

// Helper: Resolves image paths relative to the file using them (e.g., projects/my-app/img.png)
function relativeToInputPath(inputPath, relativeFilePath) 
{
	let split = inputPath.split("/");
	split.pop();
	return path.resolve(split.join(path.sep), relativeFilePath);
}

// Helper: Checks if the image is a local file or an external URL
function isFullUrl(url) 
{
	try 
	{
		new URL(url);
		return true;
	} 
	catch (e) 
	{
		return false;
	}
}

export default function (eleventyConfig) 
{
	// The {% image %} shortcode for responsive <picture> tags
	eleventyConfig.addAsyncShortcode(
		"image",
		async function imageShortcode(src, alt, widths, sizes) 
		{
			let formats = ["avif", "webp", "auto"];
			let input;

			// If it's a full URL, use it; otherwise, find it relative to the Markdown file
			if (isFullUrl(src)) 
			{
				input = src;
			} else 
			{
				input = relativeToInputPath(this.page.inputPath, src);
			}

			let metadata = await eleventyImage(input, 
			{
				widths: widths || ["auto"],
				formats: ["avif", "webp", "jpeg"],
				sharpOptions: 
				{
					pngOptions: 
					{
						compressionLevel: 9,
						quality: 60
					}
				},
				urlPath: "/img/", // URL used in the HTML src
				outputDir: "./public/img/", // Where the files are saved on disk
			});

			let imageAttributes = 
			{
				alt,
				sizes,
				loading: "lazy",
				decoding: "async",
			};

			return eleventyImage.generateHTML(metadata, imageAttributes);
		}
	);

	// filter to check if an image is an external URL
	eleventyConfig.addFilter("fullPostImgUrl", (src) => isFullUrl(src));
};