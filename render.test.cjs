const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const source=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const els=new Map();
function element(id){if(!els.has(id))els.set(id,{innerHTML:'',textContent:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},querySelector(){return {style:{}}},append(){},open:false});return els.get(id)}
const document={querySelector:element,querySelectorAll:()=>[],addEventListener(){},body:{classList:{add(){},remove(){},toggle(){}}}};
const store=new Map();const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)};
store.set('ventureTrack:v1','user-backup');
const ctx={document,localStorage,console,URL,Date,Math,JSON,Set,Map,AbortController,setTimeout,clearTimeout};
vm.createContext(ctx);new vm.Script(source).runInContext(ctx);
assert.match(element('#vw').innerHTML,/internship command centre/i);
assert.equal(store.get('ventureTrack:v1'),'user-backup');
console.log('Initial dashboard renders and legacy storage is retained');
