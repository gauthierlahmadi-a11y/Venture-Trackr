# VentureTrack

Internship application tracker for Summer 2026 finance roles in Paris and Europe.
Live listings come from SerpApi through a server-side proxy. The browser never sees your API key.

## Structure

```
public/index.html      The app (single file, no build step)
api/jobs/search.js     Vercel serverless proxy: GET /api/jobs/search
vercel.json            Security headers, no caching on the API
.env.example           Names the one environment variable you need
```

## Deploy (GitHub + Vercel)

1. Create a GitHub repository and upload everything in this folder (keep the folder layout).
2. In Vercel choose Add New > Project, import the repository, leave the framework preset as "Other".
3. Under Environment Variables add `SERPAPI_API_KEY` with your SerpApi key.
4. Click Deploy, then open the address Vercel gives you.
5. Click "Run live search". You should see "Proxy reachable and configured."

Changing the key later: update it in Vercel settings, then redeploy.

## Run locally

```
npm i -g vercel
cp .env.example .env     # add your key
vercel dev
```

## Using the app

- Leave the keyword blank to run the full query set (14 searches), or type one query.
- Review results, then Import selected or Import all verified.
- Open a role to see sources, original links, freshness, notes, checklist and documents.
- Refresh listing / Refresh all live listings re-check sources and never overwrite your own data.

## Good to know

- No demo data: the app is empty until a live search succeeds.
- Your applications, notes and document metadata are stored in the browser (localStorage). Use Export data to back up. Files are not uploaded anywhere.
- Each query uses one SerpApi request. Repeated queries within 12 hours reuse the saved live result.
- The proxy has no login. Anyone with your URL can spend your SerpApi quota, so keep the URL private or enable Vercel Deployment Protection.
- The key lives only in the Vercel environment variable. Never put it in the code.
