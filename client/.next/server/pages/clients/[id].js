const CHUNK_PUBLIC_PATH = "server/pages/clients/[id].js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__467528._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_305053._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__321645._.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/clients/[id]/index.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/src/pages/_document.tsx [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
