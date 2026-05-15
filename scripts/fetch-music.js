import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer';

const BANDCAMP_URL = "https://joekenyon72.bandcamp.com/music";
const MUSIC_DIR = "./content/music"; 

async function downloadImage(url, dest) 
{
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(dest, buffer);
}



async function run() {

    if (!fs.existsSync(MUSIC_DIR)) fs.mkdirSync(MUSIC_DIR, { recursive: true });

    console.log("Starting Bandcamp to Markdown sync...");

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
        await page.goto(BANDCAMP_URL, { waitUntil: 'networkidle2' });
        const mainHtml = await page.content();
        const mainDom = new JSDOM(mainHtml);
        const gridItems = mainDom.window.document.querySelectorAll('#music-grid li');

        for (const item of gridItems) {
            const title = item.querySelector('.title')?.textContent.trim();
            const link = item.querySelector('a')?.getAttribute('href');
            const img = item.querySelector('img');
            
            if (!title || !link) continue;

            const fullUrl = link.startsWith('http') ? link : `https://joekenyon72.bandcamp.com${link}`;
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            console.log(`Processing: ${title}`);

            await page.goto(fullUrl, { waitUntil: 'networkidle2' });
            const albumHtml = await page.content();
            const albumDom = new JSDOM(albumHtml);
            
            const scriptTag = albumDom.window.document.querySelector('script[type="application/ld+json"]');
            let tracks = [];
            
            if (scriptTag) {
                const jsonData = JSON.parse(scriptTag.textContent);
                tracks = jsonData.track?.itemListElement?.map(listItem => {
                    const track = listItem.item;
                    
                    // Find the specific 'track_id' inside the additionalProperty array
                    const trackIdObj = track.additionalProperty?.find(p => p.name === "track_id");
                    const trackId = trackIdObj ? trackIdObj.value : null;

                    return {
                        title: track.name,
                        id: trackId, // This is your 'd394810' style numerical ID
                        url: track["@id"] || track.url || "", 
                        length: track.duration
                            ?.replace('P00H', '')
                            .replace('M', ':')
                            .replace('S', '')
                            .replace(/^0/, '')
                    };
                }) || [];
            }

            const REAL_MUSIC_DIR = path.join(MUSIC_DIR, slug , "/");
            if (!fs.existsSync(REAL_MUSIC_DIR)) fs.mkdirSync(REAL_MUSIC_DIR, { recursive: true });


            let imageUrl = img?.getAttribute('data-original') || img?.getAttribute('src');
            if (imageUrl)
            {
                imageUrl = imageUrl.replace('2.jpg', '10.jpg'); // 10.jpg is usually higher res than 1.jpg
                const imageExt = path.extname(imageUrl.split('?')[0]) || '.jpg';
                const imageFileName = `${slug}${imageExt}`;
                const imagePath = path.join(REAL_MUSIC_DIR, imageFileName);

                try 
                {
                    console.log(`Downloading image for: ${title}`);
                    await downloadImage(imageUrl, imagePath);
                
                    // Now use the LOCAL filename for the frontmatter instead of the URL
                    imageUrl = imageFileName; 
                } 
                catch (err) 
                {
                    console.error(`Could not download image for ${title}:`, err.message);
                }
            }
            // create the markdown content
            let frontmatter = "---\n";

            // append top-level keys (no indentation)
            frontmatter += `title: "${title.replace(/"/g, '\\"')}"\n`;
            frontmatter += `id: "${item.getAttribute('data-item-id')}"\n`;
            frontmatter += `thumbnail: "${imageUrl}"\n`;
            frontmatter += `url: "${fullUrl}"\n`;
            frontmatter += `source: "Bandcamp"\n`;

            // append tracks
            frontmatter += "tracks:\n";
            tracks.forEach(t => {
                // manually add the indent
                frontmatter += `  - title: "${t.title.replace(/"/g, '\\"')}"\n`;
                frontmatter += `    id: "${t.id}"\n`;
                frontmatter += `    length: "${t.length}"\n`;
                frontmatter += `    url: "${t.url}"\n`;
            });

            // close frontmatter and add body
            frontmatter += "---\n\n";

            const fileName = `${slug}.md`;
            fs.writeFileSync(path.join(REAL_MUSIC_DIR, fileName), frontmatter);
        }

        console.log(`Success! Created Markdown files in ${REAL_MUSIC_DIR}`);

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await browser.close();
    }
}

run();