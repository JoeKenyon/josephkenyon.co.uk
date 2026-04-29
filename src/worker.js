export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    if (response.status === 404) {
      // 1. Fetch specifically from the root origin
      const index = await env.ASSETS.fetch(new Request(url.origin, request));
      
      // 2. Force the Content-Type to text/html
      // This prevents the "text file" issue on mobile browsers
      return new Response(index.body, {
        ...index,
        headers: {
          ...index.headers,
          "Content-Type": "text/html;charset=UTF-8",
        },
      });
    }

    return response;
  },
};