# Review build — incomplete

This is not a production-ready comprehensive upgrade. Export your tracker data before testing. Existing records may already contain incorrectly merged source links; this build does not reconstruct or repair those records.

Identity checks preserve query strings and fragments, ignore common tracking parameters, reject generic landing pages, and require agreement on company, title and known city before merging. Fuzzy matches are flagged instead of merged. Source refresh no longer declares an absent search result closed. Provider HTTP and JSON errors are not reported as successful responses.

Run `node tests/identity.test.cjs` from this directory. Tests use synthetic inputs only.

Outstanding: proxy authentication and durable rate limiting; query budget and year controls; pagination; per-query retries and progress; source repair and schema migration; comprehensive normalization, tests and accessibility; safe cache migration; accurate source verification. The date-posted filter is currently not forwarded for Google Jobs and should not be relied on. Search confirmation is only an estimate and retries can lead to more requests. The default search still uses the original 2026 query set. Never expose this proxy publicly without access protection.

No real API credentials, live provider checks or deployment are included.
