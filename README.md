# VentureTrack

Internship application tracker for Summer 2026 finance roles in Paris and Europe.
Live listings come from SerpApi through a server-side proxy. The browser never sees your API key.

## Structure

```
index.html             The app (single file, no build step)
api/jobs/search.js     Vercel serverless proxy: GET /api/jobs/search
vercel.json            Security headers, no caching on the API
tests/                 Local regression checks
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
# Configure SERPAPI_API_KEY in your local Vercel environment.
vercel dev
```

## Using the app

- Leave the keyword blank to run the full query set (14 searches), or type one query.
- Review results, then Import selected or Import complete records. Complete does not mean independently verified.
- Open a role to see sources, original links, freshness, notes, checklist and documents.
- Refresh listing / Refresh all live listings repeat the originating search. Absence from search does not establish that a job has closed.

## Good to know

- No demo data: the app is empty until a live search succeeds.
- Your applications, notes and document metadata are stored in the browser (localStorage). Use Export data to back up. Files are not uploaded anywhere.
- Each query uses one SerpApi request. Repeated queries within 12 hours reuse the saved live result.
- The proxy has no login. Anyone with your URL can spend your SerpApi quota, so keep the URL private or enable Vercel Deployment Protection.
- The key lives only in the Vercel environment variable. Never put it in the code.
- Google Jobs posted-date filter is currently not applied. The search targets 2026 unless a custom keyword is supplied.
- Automated checks: `node tests/render.test.cjs` and `node tests/identity.test.cjs`.
