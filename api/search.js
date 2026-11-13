// Vercel serverless function: /api/jobs/search. Set SERPAPI_API_KEY in Vercel project settings.
const KEY=process.env.SERPAPI_API_KEY;
const map=(d,engine)=>(d.jobs_results||d.jobs||[]).map(j=>engine==='indeed_jobs'?{providerJobId:j.job_key||j.job_id||null,title:j.title||j.position,company:j.company_name||j.company,location:j.location,via:'Indeed',description:j.description||j.snippet,postedText:j.posted_at||j.date,shareLink:j.link,applyOptions:j.link?[{title:'Indeed',link:j.link}]:[],salaryText:j.salary,scheduleType:j.job_type}
 :{providerJobId:j.job_id||null,title:j.title,company:j.company_name,location:j.location,via:j.via,description:j.description,postedText:j.detected_extensions&&j.detected_extensions.posted_at,scheduleType:j.detected_extensions&&j.detected_extensions.schedule_type,salaryText:j.detected_extensions&&j.detected_extensions.salary,shareLink:j.share_link,applyOptions:(j.apply_options||[]).map(a=>({title:a.title,link:a.link})),thumbnail:j.thumbnail});
export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).json({error:'method_not_allowed'});
 const p=req.query,one=k=>Array.isArray(p[k])?p[k][0]:p[k];
 if(one('ping'))return res.status(200).json({configured:!!KEY});
 if(!KEY)return res.status(501).json({error:'not_configured'});
 if(typeof one('q')!=='string'||!one('q').trim()||one('q').length>200||String(one('location')||'').length>120||String(one('next_page_token')||'').length>4096)return res.status(400).json({error:'invalid_query'});
 const engine=one('source')==='indeed_jobs'?'indeed_jobs':'google_jobs',q=new URLSearchParams({engine,api_key:KEY});
 q.set('q',one('q')||'');
 if(engine==='google_jobs'){for(const k of['location','gl','hl','next_page_token'])one(k)&&q.set(k,one(k))}
 else{one('location')&&q.set('l',one('location'));one('fromage')&&q.set('fromage',one('fromage'))}
 try{const r=await fetch('https://serpapi.com/search.json?'+q,{signal:AbortSignal.timeout(15000)});
  if(r.status===429){res.setHeader('Retry-After',r.headers.get('retry-after')||'30');return res.status(429).json({error:'rate_limited'})}
  if(r.status===401||r.status===403)return res.status(401).json({error:'auth'});
  if(!r.ok)return res.status(502).json({error:'provider',upstreamStatus:r.status});
  const d=await r.json();if(d.error||d.search_metadata?.status==='Error')return res.status(502).json({error:'provider'});const jobs=map(d,engine).map(j=>({...j,provider:'serpapi:'+engine}));
  return res.status(200).json({status:'ok',retrievedAt:new Date().toISOString(),jobs,sources:[...new Set(jobs.map(j=>j.via).filter(Boolean))],nextPageToken:d.serpapi_pagination&&d.serpapi_pagination.next_page_token||null})}
 catch(e){return res.status(502).json({error:'provider'})}}
