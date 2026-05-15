export default 
{
	layout: "base.njk",
    permalink: (data) => {
		
		if (data.page.filePathStem === "/index") {
			return "index.html";
		}
		// If it ends with /index, strip it and add .html
		if (data.page.filePathStem.endsWith("/index")) {
			return `${data.page.filePathStem.slice(0, -6)}.html`;
		}
		// Otherwise just add .html
		return `${data.page.filePathStem}.html`;
	}
};