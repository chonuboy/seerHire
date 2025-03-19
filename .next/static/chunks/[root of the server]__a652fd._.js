(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__a652fd._.js", {

"[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": (()=>addMessageListener),
    "connectHMR": (()=>connectHMR),
    "sendMessage": (()=>sendMessage)
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
}}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_esm__({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)");
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/src/lib/image-helper.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "imgHelper": (()=>imgHelper)
});
const imgHelper = {
    'analytics': '/analytics.png',
    'availability': '/availability.png',
    'candidates': '/candidates.png',
    'client': '/client.png',
    'company': '/company.png',
    'home': '/home.png',
    'experience': '/experience.png',
    'gender': '/gender.png',
    'help': '/help.png',
    'jobRole': '/jobRole.png',
    'location': '/location.png',
    'logout': '/logout.png',
    'lpa': '/lpa.png',
    'martial': '/martial.png',
    'preferredJob': '/preferredJob.png',
    'qualification': '/qualification.png',
    'recruitment': '/recruitment.png',
    'resume': '/resume.png',
    'seertechsystemsLogo': '/seertechsystems_logo.jpeg',
    'settings': '/settings.png',
    'userProfile': '/userProfile.png',
    'edit': '/edit.png'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/internal/font/google/roboto_845498f1.module.css [client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "className": "roboto_845498f1-module__KAryFG__className",
});
}}),
"[next]/internal/font/google/roboto_845498f1.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[next]/internal/font/google/roboto_845498f1.module.css [client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Roboto', 'Roboto Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}}),
"[next]/internal/font/google/roboto_serif_972d93db.module.css [client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "className": "roboto_serif_972d93db-module__pn9C0G__className",
});
}}),
"[next]/internal/font/google/roboto_serif_972d93db.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_serif_972d93db$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[next]/internal/font/google/roboto_serif_972d93db.module.css [client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_serif_972d93db$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Roboto Serif', 'Roboto Serif Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_serif_972d93db$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_serif_972d93db$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}}),
"[project]/src/lib/fonts.ts [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
;
;
}}),
"[project]/src/lib/fonts.ts [client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/font/google/roboto_845498f1.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_serif_972d93db$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/font/google/roboto_serif_972d93db.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fonts$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/lib/fonts.ts [client] (ecmascript) <locals>");
}}),
"[next]/internal/font/google/roboto_845498f1.js [client] (ecmascript) <export default as roboto>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "roboto": (()=>__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/font/google/roboto_845498f1.js [client] (ecmascript)");
}}),
"[project]/src/components/Layouts/header.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SeerTechLogo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/image-helper.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fonts$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/lib/fonts.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__roboto$3e$__ = __turbopack_import__("[next]/internal/font/google/roboto_845498f1.js [client] (ecmascript) <export default as roboto>");
;
;
;
function SeerTechLogo() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__roboto$3e$__["roboto"].className} sticky top-0 w-full flex justify-between items-center bg-white py-2 px-4 shadow-md z-20`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                id: "menu-toggle",
                className: "md:hidden text-gray-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    stroke: "currentColor",
                    className: "w-6 h-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layouts/header.tsx",
                        lineNumber: 18,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Layouts/header.tsx",
                    lineNumber: 10,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Layouts/header.tsx",
                lineNumber: 9,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].seertechsystemsLogo,
                        alt: "Company Logo",
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layouts/header.tsx",
                        lineNumber: 27,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-blue-500 font-semibold",
                        children: "SeerTech Systems"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layouts/header.tsx",
                        lineNumber: 32,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Layouts/header.tsx",
                lineNumber: 26,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].userProfile,
                    alt: "admin_icon",
                    className: "w-5 h-5 md:w-10 md:h-10 rounded-full"
                }, void 0, false, {
                    fileName: "[project]/src/components/Layouts/header.tsx",
                    lineNumber: 35,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Layouts/header.tsx",
                lineNumber: 34,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Layouts/header.tsx",
        lineNumber: 6,
        columnNumber: 3
    }, this);
}
_c = SeerTechLogo;
var _c;
__turbopack_refresh__.register(_c, "SeerTechLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Layouts/nav-links.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>NavLinks)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/image-helper.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fonts$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/lib/fonts.ts [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__roboto$3e$__ = __turbopack_import__("[next]/internal/font/google/roboto_845498f1.js [client] (ecmascript) <export default as roboto>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    {
        name: 'Home',
        href: '/',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].home
    },
    {
        name: 'Candidates',
        href: '/candidates',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].candidates
    },
    {
        name: 'Client',
        href: '/clients',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].client
    },
    {
        name: 'Recruitment',
        href: '/recruitments',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].recruitment
    },
    {
        name: 'Analytics',
        href: '/analytics',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].analytics
    },
    {
        name: 'Help',
        href: '/help',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].help
    },
    {
        name: 'Search',
        href: '/search',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].resume
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].settings
    }
];
function NavLinks() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: links.map((link)=>{
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                href: link.href,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"])("flex h-[48px] grow items-center justify-center gap-4 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3", {
                    'bg-sky-100 text-blue-600': pathname === link.href
                }),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: link.icon,
                        alt: link.name,
                        className: "w-6 h-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layouts/nav-links.tsx",
                        lineNumber: 68,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__roboto$3e$__["roboto"].className} hidden md:block`,
                        children: link.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layouts/nav-links.tsx",
                        lineNumber: 73,
                        columnNumber: 7
                    }, this)
                ]
            }, link.name, true, {
                fileName: "[project]/src/components/Layouts/nav-links.tsx",
                lineNumber: 59,
                columnNumber: 6
            }, this);
        })
    }, void 0, false);
}
_s(NavLinks, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavLinks;
var _c;
__turbopack_refresh__.register(_c, "NavLinks");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Layouts/sidenav.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SideNav)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$nav$2d$links$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Layouts/nav-links.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/image-helper.ts [client] (ecmascript)");
;
;
;
function SideNav() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "hidden md:block bg-gray-50 py-4 fixed h-full top-14 cts-sidebar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$nav$2d$links$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/Layouts/sidenav.tsx",
                            lineNumber: 13,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden h-auto w-full grow rounded-md bg-gray-50 md:block"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Layouts/sidenav.tsx",
                            lineNumber: 14,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "flex h-[48px] grow items-center justify-center gap-4 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].logout,
                                    alt: "Logout",
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layouts/sidenav.tsx",
                                    lineNumber: 18,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:block",
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layouts/sidenav.tsx",
                                    lineNumber: 23,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Layouts/sidenav.tsx",
                            lineNumber: 16,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Layouts/sidenav.tsx",
                    lineNumber: 12,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Layouts/sidenav.tsx",
                lineNumber: 9,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "sidebar",
                className: "fixed left-0 inset-y-10 transform -translate-x-full md:hidden transition-transform duration-200 ease-in-out bg-gray-50 py-4 h-full z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$nav$2d$links$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/Layouts/sidenav.tsx",
                            lineNumber: 34,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layouts/sidenav.tsx",
                        lineNumber: 33,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex h-[48px] grow items-center justify-center gap-4 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].logout,
                                alt: "Logout",
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layouts/sidenav.tsx",
                                lineNumber: 38,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "",
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layouts/sidenav.tsx",
                                lineNumber: 43,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Layouts/sidenav.tsx",
                        lineNumber: 36,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Layouts/sidenav.tsx",
                lineNumber: 29,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true);
}
_c = SideNav;
var _c;
__turbopack_refresh__.register(_c, "SideNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Layouts/layout.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>MainLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Layouts/header.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$sidenav$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Layouts/sidenav.tsx [client] (ecmascript)");
;
;
;
function MainLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/Layouts/layout.tsx",
                lineNumber: 8,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-screen flex-col md:flex-row md:overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex-none cts-sidebar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$sidenav$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/Layouts/layout.tsx",
                            lineNumber: 11,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layouts/layout.tsx",
                        lineNumber: 10,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-grow p-4 md:overflow-y-auto md:p-6 cts-content-section",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/Layouts/layout.tsx",
                        lineNumber: 13,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Layouts/layout.tsx",
                lineNumber: 9,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Layouts/layout.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, this);
}
_c = MainLayout;
var _c;
__turbopack_refresh__.register(_c, "MainLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/pdf.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Doc": (()=>Doc)
});
const Doc = {
    "resume": "/Harish's Resume.pdf"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/constants.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "CandidateStatus": (()=>CandidateStatus),
    "DifferentlyAbled": (()=>DifferentlyAbled),
    "Gender": (()=>Gender),
    "HiringType": (()=>HiringType),
    "MaritalStatus": (()=>MaritalStatus),
    "PreferredJobType": (()=>PreferredJobType)
});
var CandidateStatus = /*#__PURE__*/ function(CandidateStatus) {
    CandidateStatus["ACTIVE"] = "Active";
    CandidateStatus["INACTIVE"] = "Inactive";
    return CandidateStatus;
}({});
var Gender = /*#__PURE__*/ function(Gender) {
    Gender["MALE"] = "Male";
    Gender["FEMALE"] = "Female";
    Gender["OTHERS"] = "Others";
    return Gender;
}({});
var HiringType = /*#__PURE__*/ function(HiringType) {
    HiringType["FULL"] = "Full";
    HiringType["PART"] = "Part";
    HiringType["CONTRACT"] = "Contract";
    return HiringType;
}({});
var MaritalStatus = /*#__PURE__*/ function(MaritalStatus) {
    MaritalStatus["MARRIED"] = "Married";
    MaritalStatus["UNMARRIED"] = "Unmarried";
    return MaritalStatus;
}({});
var DifferentlyAbled = /*#__PURE__*/ function(DifferentlyAbled) {
    DifferentlyAbled["YES"] = "Yes";
    DifferentlyAbled["NO"] = "No";
    return DifferentlyAbled;
}({});
var PreferredJobType = /*#__PURE__*/ function(PreferredJobType) {
    PreferredJobType["REMOTE"] = "Remote";
    PreferredJobType["HYBRID"] = "Hybrid";
    PreferredJobType["ONSITE"] = "Onsite";
    return PreferredJobType;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/models/candidate.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "CandidateModel": (()=>CandidateModel),
    "CandidateSchema": (()=>CandidateSchema),
    "CandidateSearchSchema": (()=>CandidateSearchSchema),
    "candidateTableColumns": (()=>candidateTableColumns),
    "certificates": (()=>certificates),
    "round": (()=>round)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/yup/index.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/constants.ts [client] (ecmascript)");
;
;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CandidateModel = {
    id: 1,
    firstName: "Nantha",
    lastName: "Kumar",
    dob: "2000-12-19",
    primaryNumber: "9629978640",
    secondaryNumber: "8925173395",
    emailId: "nantha@gmail.com",
    designation: "full stack",
    companyName: "SeerTech",
    totalExperience: 1,
    isActive: true,
    candidateStatus: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CandidateStatus"].ACTIVE,
    currentSalary: 120000,
    highestEducation: "masters",
    gender: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Gender"].FEMALE,
    hiringType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["HiringType"].FULL,
    pinCode: 20987,
    maritalStatus: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MaritalStatus"].MARRIED,
    techRole: "software developer",
    noticePeriod: 15,
    currentLocation: {
        locationId: 1,
        locationDetails: "",
        insertedOn: ""
    },
    differentlyAbled: false,
    isDifferentlyAbled: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["DifferentlyAbled"].NO,
    address: "Chennai",
    addressLocality: "North Street",
    differentlyAbledType: "",
    preferredJobType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["PreferredJobType"].REMOTE
};
const CandidateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.object({
    firstName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").max(15, "Must be 15 characters or less").required("First name is required"),
    lastName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").max(20, "Must be 20 characters or less").required("Last name is required"),
    dob: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.date().required("Date of birth is required").test("isPastDate", "Date of birth must be in the past", function(value) {
        const today = new Date();
        return new Date(value) < today;
    }),
    primaryNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().matches(phoneRegExp, "Phone number is not valid").required("Mobile no. is required"),
    secondaryNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().matches(phoneRegExp, "Phone number is not valid").required("Alternate mobile no. is required"),
    emailId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().matches(/^[a-zA-Z0-9][-a-zA-Z0-9._]+@([-a-zA-Z0-9]+\.)+.[a-zA-Z]{2,4}$/i, "Invalid email format").email("Invalid email address").required("Email address is required"),
    designation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").max(20, "Must be 50 characters or less").required("Designation is required"),
    companyName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    totalExperience: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.number().required("Experience is required"),
    candidateStatus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required("Select status"),
    currentSalary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.number().required("Current salary is required"),
    highestEducation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").max(30, "Must be 50 characters or less").required("Highest education is required"),
    gender: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required("Select gender"),
    hiringType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    pinCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.number(),
    maritalStatus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required("Select marital status"),
    techRole: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").required("Tech role is required"),
    noticePeriod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.number().required("Notice period is required"),
    currentLocation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.object().required("Current location is required"),
    isDifferentlyAbled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required("Select your preference"),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    addressLocality: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    differentlyAbledType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    preferredJobType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required("Select preferred job type")
});
const CandidateSearchSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.object({
    technologies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string()).min(0).max(10),
    companies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string()).min(0).max(10),
    domains: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string()).min(0).max(10),
    preferredLocations: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string()).min(0).max(10),
    techRole: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").max(50, "Must be 50 characters or less"),
    currentLocation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").max(50, "Must be 50 characters or less"),
    qualification: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").max(50, "Must be 50 characters or less"),
    experience: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, "Must be at least 3 characters").max(50, "Must be 50 characters or less"),
    salary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(2, "Must be at least 2 characters").max(10, "Must be 10 characters or less"),
    noticePeriod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(10, "Must be at least 10 characters").max(20, "Must be 20 characters or less")
});
const candidateTableColumns = [
    {
        Header: "Name",
        accessor: "fullName"
    },
    {
        Header: "Tech Role",
        accessor: "techRole"
    },
    {
        Header: "Primary Number",
        accessor: "primaryNumber",
        hiddenOnSmall: true
    },
    {
        Header: "Email Id",
        accessor: "emailId",
        hiddenOnSmall: true
    },
    {
        Header: "Status",
        accessor: "isActive"
    }
];
const certificates = [
    {
        id: 1,
        certificate: "Certificate 1"
    },
    {
        id: 2,
        certificate: "Certificate 2"
    },
    {
        id: 3,
        certificate: "Certificate 3"
    },
    {
        id: 4,
        certificate: "Certificate 4"
    },
    {
        id: 5,
        certificate: "Certificate 5"
    }
];
const round = {
    roundId: 1,
    roundName: "Technical Round",
    roundNumber: 1,
    roundDate: "2025-02-04",
    interviewerName: "Pranoti",
    technologyInterviewed: "JavaScript",
    techRating: 8,
    softskillsRating: 9,
    interviewStatus: "passed",
    remarks: "Great candidate!",
    interview: {
        interviewId: 1,
        interviewDate: "2025-02-04",
        interviewStatus: "passed"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/models/companies.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "companies": (()=>companies)
});
const companies = [
    {
        id: 1,
        company: "Dell"
    },
    {
        id: 2,
        company: "Google"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Elements/cards/popup.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Popup": (()=>Popup)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const Popup = ({ children, onClose })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "z-10 fixed top-0 left-0 w-full h-auto bg-gray-500 bg-opacity-50 flex justify-center items-center",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 rounded-lg md:w-1/2 h-screen overflow-y-auto",
            onClick: (e)=>e.stopPropagation(),
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/Elements/cards/popup.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Elements/cards/popup.tsx",
        lineNumber: 2,
        columnNumber: 5
    }, this);
_c = Popup;
var _c;
__turbopack_refresh__.register(_c, "Popup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/api/api_URL.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "API_URL": (()=>API_URL)
});
const API_URL = "http://localhost:8080/"; // export const swaggerurl = "http://fee7-110-235-232-108.ngrok-free.app"
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/Features/auth/authSlice.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "login": (()=>login),
    "logout": (()=>logout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
;
const initialState = {
    user: null,
    isAuthenticated: false
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        login (state, action) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload.user)); // Store user in localStorage
        },
        logout (state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user'); // Clear user from localStorage
        }
    }
});
const { login, logout } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/Features/auth/credentialSlice.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SetPassword": (()=>SetPassword),
    "default": (()=>__TURBOPACK__default__export__),
    "setEmail": (()=>setEmail)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
;
const initialState = {
    Email: '',
    Password: ''
};
const credentialSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'credentials',
    initialState,
    reducers: {
        setEmail: (state, action)=>{
            state.Email = action.payload;
        },
        SetPassword: (state, action)=>{
            state.Password = action.payload;
        }
    }
});
const { setEmail, SetPassword } = credentialSlice.actions;
const __TURBOPACK__default__export__ = credentialSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/Features/Store.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "store": (()=>store)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Features$2f$auth$2f$authSlice$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/Features/auth/authSlice.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Features$2f$auth$2f$credentialSlice$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/Features/auth/credentialSlice.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [client] (ecmascript) <locals>");
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Features$2f$auth$2f$authSlice$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"],
        credentials: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Features$2f$auth$2f$credentialSlice$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"]
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/api/creds.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Email": (()=>Email),
    "Password": (()=>Password)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Features$2f$Store$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/Features/Store.ts [client] (ecmascript)");
;
const currentstate = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Features$2f$Store$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["store"].getState().credentials;
const Email = currentstate.Email;
const Password = currentstate.Password;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/api/candidates/candidates.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createCandidate": (()=>createCandidate),
    "deleteCandidates": (()=>deleteCandidates),
    "fetchCandidate": (()=>fetchCandidate),
    "fetchCandidates": (()=>fetchCandidates),
    "searchCandidates": (()=>searchCandidates),
    "updateCandidate": (()=>updateCandidate)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/api_URL.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/creds.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
;
;
const createCandidate = async (reqData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}contacts/create`, reqData, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data; // Axios automatically parses the JSON response
    } catch (err) {
        // Axios throws an error for non-2xx status codes, you can access `err.response`
        return err.response ? err.response.data : err.message;
    }
};
const updateCandidate = async (reqData, candidateId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}contacts/${candidateId}`, reqData, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data; // Axios automatically parses the JSON response
    } catch (err) {
        // Axios throws an error for non-2xx status codes, you can access `err.response`
        return err.response ? err.response.data : err.message;
    }
};
const fetchCandidates = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}contacts/allContacts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data; // Axios automatically parses the JSON response
    } catch (err) {
        // Axios throws an error for non-2xx status codes, you can access `err.response`
        return err.response ? err.response.data : err.message;
    }
};
const deleteCandidates = async (candidateId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}contacts/${candidateId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data; // Axios automatically parses the JSON response
    } catch (err) {
        // Axios throws an error for non-2xx status codes, you can access `err.response`
        return err.response ? err.response.data : err.message;
    }
};
const fetchCandidate = async (candidateId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}contacts/${candidateId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data; // Axios automatically parses the JSON response
    } catch (err) {
        // Axios throws an error for non-2xx status codes, you can access `err.response`
        return err.response ? err.response.data : err.message;
    }
};
const searchCandidates = async (query)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}contacts/search`, {
            method: "POST",
            params: {
                query
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/api/candidates/interviews.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createContactInterview": (()=>createContactInterview),
    "deleteContactInterview": (()=>deleteContactInterview),
    "fetchAllContactInterviews": (()=>fetchAllContactInterviews),
    "fetchContactInterview": (()=>fetchContactInterview),
    "fetchContactsByJob": (()=>fetchContactsByJob),
    "fetchInterviewsByContactAndClient": (()=>fetchInterviewsByContactAndClient),
    "fetchJobsByContact": (()=>fetchJobsByContact),
    "updateContactInterview": (()=>updateContactInterview)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/api_URL.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/creds.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
;
;
const fetchContactInterview = async (id)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-interviews/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const updateContactInterview = async (id, reqData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-interviews/${id}`, reqData, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const deleteContactInterview = async (id)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-interviews/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const fetchAllContactInterviews = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-interviews`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const createContactInterview = async (reqData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-interviews`, reqData, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const fetchContactsByJob = async (jobId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-interviews/job/${jobId}/contacts`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const fetchJobsByContact = async (contactId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-interviews/job/contact/${contactId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const fetchInterviewsByContactAndClient = async (contactId, clientId)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-interviews/contact/${contactId}/client/${clientId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/api/candidates/candidateTech.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createContactTechnology": (()=>createContactTechnology),
    "deleteContactTechnology": (()=>deleteContactTechnology),
    "fetchAllContactTechnologies": (()=>fetchAllContactTechnologies),
    "fetchContactTechnology": (()=>fetchContactTechnology),
    "updateContactTechnology": (()=>updateContactTechnology)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/api_URL.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/creds.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
;
;
const fetchContactTechnology = async (id)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-technology/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const updateContactTechnology = async (id, reqData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-technology/${id}`, reqData, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const deleteContactTechnology = async (id)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-technology/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const fetchAllContactTechnologies = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-technology`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const createContactTechnology = async (reqData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/contact-technology`, reqData, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Authorization: "Basic " + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`)
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/api/master/masterTech.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "createTechnology": (()=>createTechnology),
    "deleteTechnology": (()=>deleteTechnology),
    "fetchAllTechnologies": (()=>fetchAllTechnologies),
    "fetchTechnology": (()=>fetchTechnology),
    "updateTechnology": (()=>updateTechnology)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/api_URL.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/creds.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
;
;
const fetchTechnology = async (id)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/technologies/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const updateTechnology = async (id, reqData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/technologies/${id}`, reqData, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`),
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const deleteTechnology = async (id)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/technologies/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const fetchAllTechnologies = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/technologies`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
const createTechnology = async (reqData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$api_URL$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["API_URL"]}api/technologies`, reqData, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Email"]}:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$creds$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Password"]}`),
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        return response.data;
    } catch (err) {
        return err.response ? err.response.data : err.message;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/candidates/[id]/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Candidates)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$layout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Layouts/layout.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/pdf.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-toastify/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$models$2f$candidate$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/models/candidate.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$models$2f$companies$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/models/companies.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Elements$2f$cards$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Elements/cards/popup.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$candidates$2f$candidates$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/candidates/candidates.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$candidates$2f$interviews$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/candidates/interviews.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$candidates$2f$candidateTech$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/candidates/candidateTech.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$master$2f$masterTech$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/api/master/masterTech.ts [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Candidates() {
    _s();
    const [currentCandidate, setCurrentCandidate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [candidateInterviews, setCandidateInterviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [technologies, setTechnologies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [techExp, setTechExp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [expLevel, setExpLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const experienceOptions = [
        "Less than a year"
    ]; // Start with "Less than a year"
    // Add options from 1 year to 20 years
    for(let i = 1; i <= 10; i++){
        experienceOptions.push(`${i}`); // Add "year" or "years" based on the count
    }
    const [masterTech, setMasterTech] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedSkill, setSelectedSkill] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Candidates.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$candidates$2f$candidates$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fetchCandidate"])(Number(router.query.id)).then({
                "Candidates.useEffect": (data)=>{
                    setCurrentCandidate(data);
                }
            }["Candidates.useEffect"]).catch({
                "Candidates.useEffect": (error)=>console.log(error)
            }["Candidates.useEffect"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$candidates$2f$interviews$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fetchJobsByContact"])(Number(router.query.id)).then({
                "Candidates.useEffect": (data)=>{
                    setCandidateInterviews(data);
                }
            }["Candidates.useEffect"]).catch({
                "Candidates.useEffect": (error)=>{
                    console.log(error);
                }
            }["Candidates.useEffect"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$candidates$2f$candidateTech$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fetchContactTechnology"])(Number(router.query.id)).then({
                "Candidates.useEffect": (data)=>{
                    setTechnologies([
                        data.technology
                    ]);
                }
            }["Candidates.useEffect"]).catch({
                "Candidates.useEffect": (error)=>console.log(error)
            }["Candidates.useEffect"]);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$master$2f$masterTech$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["fetchAllTechnologies"])().then({
                "Candidates.useEffect": (data)=>{
                    console.log(data);
                    setMasterTech(data);
                }
            }["Candidates.useEffect"]).catch({
                "Candidates.useEffect": (error)=>{
                    console.log(error);
                }
            }["Candidates.useEffect"]);
        }
    }["Candidates.useEffect"], []);
    const handleSkillDropdown = (e)=>{
        setSelectedSkill(e.target.value);
    };
    console.log(masterTech);
    const postSkill = async ()=>{
        try {
            // Check if a skill is selected
            if (selectedSkill.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error("Please select a skill", {
                    position: "top-center"
                });
                return;
            }
            // Check if the skill exists in masterTech
            const skillExists = masterTech?.some((tech)=>tech.technology.toLowerCase() === selectedSkill.toLowerCase());
            // If the skill doesn't exist in masterTech, add it
            if (!skillExists) {
                const newSkill = {
                    technology: selectedSkill
                };
                const createdSkill = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$master$2f$masterTech$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createTechnology"])(newSkill);
                console.log("New skill added to masterTech:", createdSkill);
                // Update masterTech state with the new skill
                setMasterTech((prev)=>prev ? [
                        ...prev,
                        createdSkill
                    ] : [
                        createdSkill
                    ]);
            }
            // Add the skill to technologies
            const updatedTechnologies = technologies ? [
                ...technologies,
                {
                    technology: selectedSkill
                }
            ] : [
                {
                    technology: selectedSkill
                }
            ];
            setTechnologies(updatedTechnologies);
            const tempId = masterTech?.find((tech)=>tech.technology.toLowerCase() === selectedSkill.toLowerCase());
            // Call createContactTechnology to associate the skill with the candidate
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$candidates$2f$candidateTech$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createContactTechnology"])({
                contactDetails: currentCandidate,
                technology: tempId,
                experience: techExp,
                expertiseLevel: expLevel
            }).then((data)=>console.log(data));
            console.log("Skill added to candidate:", selectedSkill);
            setSelectedSkill("");
            setExpLevel("");
            setTechExp("");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success("Skill added successfully", {
                position: "top-center"
            });
        } catch (error) {
            console.error("Error adding skill:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to add skill. Please try again.", {
                position: "top-center"
            });
        }
    };
    const [isUpdateSkillVisible, setIsUpdateSkillVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [candidateSkills, setCandidateSkills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Node.js",
        "Express.js",
        "MongoDB"
    ]);
    const [isUpdateDomainVisible, setIsUpdateDomainVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAddDomainVisible, setIsAddDomainVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleRemoveDomain = (domain)=>{
        setCandidateDomains(candidateDomains.filter((d)=>d !== domain));
    };
    const [candidateDomains, setCandidateDomains] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        "Banking",
        "Business Administration",
        "Hospitality"
    ]);
    const [existingDomains, setExistingDomains] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        "Banking",
        "Business Administration",
        "Hospitality",
        "Marketing",
        "Finance",
        "Healthcare",
        "Technology"
    ]);
    const [selectedDomain, setSelectedDomain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newDomain, setNewDomain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleAddDomainFromDropdown = ()=>{
        if (selectedDomain === "") return;
        setCandidateDomains([
            ...candidateDomains,
            selectedDomain
        ]);
        setExistingDomains([
            ...existingDomains,
            selectedDomain
        ]);
        setSelectedDomain("");
    };
    const handleAddDomain = ()=>{
        setCandidateDomains([
            ...candidateDomains,
            newDomain
        ]);
        setExistingDomains([
            ...existingDomains,
            newDomain
        ]);
        setNewDomain("");
    };
    const handleRemoveSkill = (skill)=>{};
    const handleUpdateSkills = ()=>{
        // Update the skills in the database
        fetch("/api/skills", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(candidateSkills)
        }).then((response)=>response.json()).then((data)=>console.log(data)).catch((error)=>console.error(error));
    };
    const [newSkill, setNewSkill] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isFormVisible, setIsFormVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false); // State to control form visibility
    const [isEditingCompany, setIsCompanyEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCompanyAdded, setIsCompanyAdded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCertificateAdded, setIsCertificateAdded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newCompany, setNewCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        id: 0,
        company: ""
    });
    const [newCertificate, setNewCertificate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        id: 0,
        certificate: ""
    });
    const handleSkillPopup = ()=>{};
    const [isEditingCertificate, setIsCertificateEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [changes, setChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [updatedCompanies, setUpdatedCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$models$2f$companies$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["companies"]);
    const [updatedCertificates, setUpdatedCertificates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$models$2f$candidate$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["certificates"]);
    const handleAddSkill = ()=>{
        setCandidateSkills([
            ...candidateSkills,
            newSkill
        ]);
        setNewSkill("");
    };
    // Handle input change
    const handleCompanyChange = (id, value)=>{
        if (value.trim() === "") {
            setErrors((prev)=>({
                    ...prev,
                    [id]: "Company name cannot be empty"
                }));
        } else {
            setErrors((prev)=>{
                const updatedErrors = {
                    ...prev
                };
                delete updatedErrors[id]; // Remove error when value is valid
                return updatedErrors;
            });
        }
        setChanges((prev)=>({
                ...prev,
                [id]: value
            }));
        setUpdatedCompanies((prev)=>prev.map((company)=>company.id === id ? {
                    ...company,
                    company: value
                } : company));
    };
    const handleCertificateChange = (id, value)=>{
        if (value.trim() === "") {
            setErrors((prev)=>({
                    ...prev,
                    [id]: "Please Enter Certificate Name"
                }));
        } else {
            setErrors((prev)=>{
                const updatedErrors = {
                    ...prev
                };
                delete updatedErrors[id]; // Remove error when value is valid
                return updatedErrors;
            });
        }
        setChanges((prev)=>({
                ...prev,
                [id]: value
            }));
        setUpdatedCertificates((prev)=>prev.map((certificate)=>certificate.id === id ? {
                    ...certificate,
                    certificate: value
                } : certificate));
    };
    //   // Handle submit
    const handleCompanySubmit = async ()=>{
        if (Object.values(errors).length > 0) {
            return;
        }
        const updatedFields = Object.keys(changes).map((id)=>({
                id: Number(id),
                company: changes[Number(id)]
            }));
        console.log("Submitting:", updatedCompanies);
    };
    // Handle add Company Post req
    const addCompany = (e)=>{
        const { name, value } = e.target;
        setNewCompany((prev)=>({
                ...prev,
                [name]: value
            }));
        console.log(newCompany);
    };
    const addCertificate = (e)=>{
        const { name, value } = e.target;
        setNewCertificate((prev)=>({
                ...prev,
                [name]: value
            }));
        console.log(newCertificate);
    };
    // if (id == null) {
    //   // Static pre-generated HTML
    //   return <h1>Loading...</h1>;
    // }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layouts$2f$layout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "space-y-10 p-4 relative md:text-base text-xs",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "border-b border-black-200 font-semibold text-2xl",
                    children: "Profile"
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 298,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "profile",
                    className: "flex justify-between items-center md:text-base text-xs mt-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-lg md:text-2xl",
                                    children: [
                                        currentCandidate?.firstName,
                                        " ",
                                        currentCandidate?.lastName
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-semibold text-lg md:text-xl",
                                    children: currentCandidate?.designation
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 309,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs md:text-sm",
                                    children: [
                                        "Date of Birth: ",
                                        currentCandidate?.dob
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 312,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>document.getElementById("resume")?.scrollIntoView({
                                            behavior: "smooth"
                                        }),
                                    className: "bg-[var(--field-background)] border-black-200 border-2 md:py-1 px-2 md:rounded-lg hover:bg-black hover:text-[var(--content-background)]",
                                    children: "View Resume"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>document.getElementById("resume")?.scrollIntoView({
                                            behavior: "smooth"
                                        }),
                                    className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                    children: "Download Resume"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded-lg space-y-4 shadow-sm border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-xl",
                                    children: "Personal Info"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                    onClick: ()=>{
                                        setIsFormVisible(true);
                                    },
                                    children: "Update"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "profile_info",
                            className: "bg-zinc-200 p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Total Experience"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: [
                                                    currentCandidate?.totalExperience === null || undefined ? "-" : currentCandidate?.totalExperience,
                                                    "Yrs"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this),
                                    currentCandidate?.differentlyAbled === true && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Differently Abled Type"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 367,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate.differentlyAbledType === null || undefined ? "-" : currentCandidate.differentlyAbledType
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 368,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Relavant Experience"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 376,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: [
                                                    currentCandidate?.relavantExperience === null || undefined ? "-" : currentCandidate?.relavantExperience,
                                                    " ",
                                                    "1 Year"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 377,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Qualification"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 385,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.highestEducation === null || undefined ? "-" : currentCandidate?.highestEducation
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Mobile Number"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 393,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.primaryNumber === null || undefined ? "-" : currentCandidate?.primaryNumber
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 394,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 401,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.emailId === null || undefined ? "-" : currentCandidate?.emailId
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 402,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Current Salary"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 409,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.currentSalary === null || undefined ? "-" : currentCandidate?.currentSalary
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Expected Salary"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 417,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.currentSalary === null || undefined ? "-" : currentCandidate?.currentSalary
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 418,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 416,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Preferred Location"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 425,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.currentLocation.locationDetails === null || undefined ? "-" : currentCandidate?.currentLocation.locationDetails
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 426,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 424,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Preferred Job Type"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 434,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.preferredJobType === null || undefined ? "-" : currentCandidate?.preferredJobType
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 435,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 433,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Gender"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 442,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.gender === null || undefined ? "-" : currentCandidate?.gender
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 443,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 441,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Notice Period"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 450,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.noticePeriod === null || undefined ? "-" : currentCandidate?.noticePeriod
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 451,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 449,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Marital Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 458,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.maritalStatus === null || undefined ? "-" : currentCandidate?.maritalStatus
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 459,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Location"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 466,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.currentLocation.locationDetails === null || undefined ? "-" : currentCandidate?.currentLocation.locationDetails
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 467,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 465,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Address"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold md:text-sm text-xs",
                                                children: currentCandidate?.addressLocality === null || undefined ? "-" : currentCandidate?.addressLocality + ", " + currentCandidate?.address === null || undefined ? "-" : currentCandidate?.address
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 476,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 474,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 355,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 354,
                            columnNumber: 11
                        }, this),
                        isFormVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Elements$2f$cards$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                            onClose: ()=>setIsFormVisible(false),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-6 mt-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "space-y-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "totalExperience",
                                                            className: "font-medium",
                                                            children: "Total Experience (Years)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "totalExperience",
                                                            type: "number",
                                                            placeholder: "e.g. 5",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 498,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "relevantExperience",
                                                            className: "font-medium",
                                                            children: "Relevant Experience (Years)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 508,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "relevantExperience",
                                                            type: "number",
                                                            placeholder: "e.g. 3",
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "highestEducation",
                                                            className: "font-medium",
                                                            children: "Highest Qualification"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 523,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "highestEducation",
                                                            placeholder: "e.g. Bachelor's in Computer Science",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 526,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "primaryNumber",
                                                            className: "font-medium",
                                                            children: "Mobile Number"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 535,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "primaryNumber",
                                                            type: "tel",
                                                            placeholder: "e.g. +1234567890",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "emailId",
                                                            className: "font-medium",
                                                            children: "Email"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 548,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "emailId",
                                                            type: "email",
                                                            placeholder: "e.g. john@example.com",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 547,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "currentSalary",
                                                            className: "font-medium",
                                                            children: "Current Salary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 561,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "currentSalary",
                                                            type: "text",
                                                            placeholder: "e.g. 50000",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 564,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "expectedSalary",
                                                            className: "font-medium",
                                                            children: "Expected Salary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 574,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "expectedSalary",
                                                            type: "text",
                                                            placeholder: "e.g. 60000",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 577,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 573,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "preferredLocation",
                                                            className: "font-medium",
                                                            children: "Preferred Location"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 587,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "preferredLocation",
                                                            placeholder: "e.g. New York",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "preferredJobType",
                                                            className: "font-medium",
                                                            children: "Preferred Job Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 602,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "full-time",
                                                                    children: "Full-time"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 606,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "part-time",
                                                                    children: "Part-time"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 607,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "contract",
                                                                    children: "Contract"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 608,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "freelance",
                                                                    children: "Freelance"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 609,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 605,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "gender",
                                                            className: "font-medium",
                                                            children: "Gender"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "male",
                                                                    children: "Male"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 618,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "female",
                                                                    children: "Female"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 619,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "other",
                                                                    children: "Other"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 620,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "prefer-not-to-say",
                                                                    children: "Prefer not to say"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 621,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 617,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "noticePeriod",
                                                            className: "font-medium",
                                                            children: "Notice Period (Days)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 628,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "noticePeriod",
                                                            type: "text",
                                                            placeholder: "e.g. 30",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 627,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "maritalStatus",
                                                            className: "font-medium",
                                                            children: "Marital Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 641,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "single",
                                                                    children: "Single"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 645,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "married",
                                                                    children: "Married"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 646,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "divorced",
                                                                    children: "Divorced"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 647,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "widowed",
                                                                    children: "Widowed"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 648,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 644,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 640,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "currentLocation",
                                                            className: "font-medium",
                                                            children: "Current Location"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 653,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "currentLocation",
                                                            placeholder: "e.g. Los Angeles",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 652,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "address",
                                                            className: "font-medium",
                                                            children: "Address"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 664,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "address",
                                                            placeholder: "eg.West Street, City, Country",
                                                            required: true,
                                                            className: "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 663,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 493,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300",
                                            children: "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 676,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 492,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 491,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 490,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-lg shadow-sm border border-gray-200 p-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-xl",
                            children: "Interviews"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 691,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "interviews",
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4",
                            children: candidateInterviews?.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border border-black-200  shadow-md bg-[var(--content-background)] p-4 rounded-lg text-xs md:text-base space-y-4 relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between flex-wrap border-b border-black-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "font-semibold md:text-xl text-lg",
                                                    children: item.clientJob.jobTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 702,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-3 h-3 md:w-4 md:h-4 rounded-full ${item.interviewStatus === "DONE" ? "bg-green-500" : item.interviewStatus === "PENDING" ? "bg-yellow-500" : item.interviewStatus === "REJECTED" ? "bg-red-500" : "bg-blue-500"}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 706,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs md:text-base",
                                                            children: item.interviewStatus
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 717,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 705,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 701,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-bold md:text-lg text-md text-blue-700",
                                            children: item.clientJob.client.clientName
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 722,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs md:text-base",
                                            children: [
                                                "Date : ",
                                                item.interviewDate
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 725,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/candidates/${Number(router.query.id)}/interviews/${index + 1}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-[var(--theme-background)] border-black-200 border-2 py-1 px-2 absolute right-4 bottom-4 bg-blue-500 text-white rounded-md border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                                children: "View Results"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 733,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 728,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 697,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 692,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 690,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "skills",
                    className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-semibold text-sm md:text-lg",
                                    children: "Skills"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                    onClick: ()=>setIsUpdateSkillVisible(true),
                                    children: "Update"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 749,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 747,
                            columnNumber: 11
                        }, this),
                        isUpdateSkillVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Elements$2f$cards$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                            onClose: ()=>{
                                setIsUpdateSkillVisible(false);
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-4 mt-10 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-lg",
                                        children: "Added Skills"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 764,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-4",
                                        children: technologies?.map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-3 py-1 bg-gray-200 rounded text-xs md:text-base",
                                                    children: [
                                                        skill.technology,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "ml-2 text-red-500 hover:text-red-700 transition duration-200",
                                                            onClick: ()=>handleRemoveSkill(skill?.toString()),
                                                            children: "X"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 770,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 768,
                                                    columnNumber: 23
                                                }, this)
                                            }, index, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 767,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 765,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                        onClick: handleUpdateSkills,
                                        children: "Update"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 781,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 763,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 758,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex md:flex-row flex-wrap flex-col gap-4 md:items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "skill-dropdown",
                                                    className: "bg-gray-200 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none",
                                                    list: "skill-list",
                                                    placeholder: "Select or type a skill",
                                                    value: selectedSkill,
                                                    onChange: handleSkillDropdown
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 794,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                                    id: "skill-list",
                                                    children: masterTech?.map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: skill.technology,
                                                            children: skill.technology
                                                        }, index, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 804,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 802,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 793,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "skillExp",
                                                    type: "text",
                                                    list: "exp-list",
                                                    placeholder: "Experience",
                                                    style: {
                                                        WebkitAppearance: "none"
                                                    },
                                                    className: "bg-gray-200 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none",
                                                    value: techExp,
                                                    onChange: (e)=>setTechExp(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 811,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                                    id: "exp-list",
                                                    className: "absolute mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto scrollbar-none appearance-none",
                                                    children: experienceOptions.map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: option,
                                                            className: "p-2 hover:bg-gray-100 cursor-pointer",
                                                            children: option
                                                        }, index, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 823,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 821,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 810,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "skillLevel",
                                                    type: "text",
                                                    list: "level-list",
                                                    placeholder: "Level",
                                                    style: {
                                                        WebkitAppearance: "none"
                                                    },
                                                    className: "bg-gray-200 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none",
                                                    value: expLevel,
                                                    onChange: (e)=>setExpLevel(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 830,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                                    id: "level-list",
                                                    className: "absolute mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto scrollbar-none appearance-none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Beginner",
                                                            children: "Beginner"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 841,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Intermediate",
                                                            children: "Intermediate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 842,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Advanced",
                                                            children: "Advanced"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 843,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 840,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 829,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 846,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 792,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                        onClick: postSkill,
                                        children: "Add Skill"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 850,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 849,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 791,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "skills_rating",
                            className: "bg-white rounded-lg shadow-sm space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-sm md:text-lg",
                                    children: "Rating"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 862,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-hidden rounded-lg shadow-lg border border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "table-auto w-full text-xs md:text-base border border-gray-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-100",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "font-bold text-left px-4 py-2",
                                                            children: "Skill"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 867,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "font-bold text-left px-4 py-2",
                                                            children: "Experience"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 868,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "font-bold text-left px-4 py-2",
                                                            children: "Expertise Level"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 869,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "font-bold text-left px-4 py-2",
                                                            children: "Actions"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 872,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 866,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 865,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: [
                                                    {
                                                        skill: "React",
                                                        experience: "2 Years",
                                                        level: "Beginner"
                                                    },
                                                    {
                                                        skill: "Angular",
                                                        experience: "3 Years",
                                                        level: "Intermediate"
                                                    },
                                                    {
                                                        skill: "Node.js",
                                                        experience: "1 Year",
                                                        level: "Advanced"
                                                    },
                                                    {
                                                        skill: "Python",
                                                        experience: "5 Years",
                                                        level: "Expert"
                                                    }
                                                ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-gray-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "text-left px-4 py-2 border border-gray-200",
                                                                children: item.skill
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                lineNumber: 887,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "text-left px-4 py-2 border border-gray-200",
                                                                children: item.experience
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                lineNumber: 890,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "text-left px-4 py-2 border border-gray-200",
                                                                children: item.level
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                lineNumber: 893,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "text-left px-4 py-2 border border-gray-200",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-blue-500 hover:underline",
                                                                    title: "Edit",
                                                                    children: "Update"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                    lineNumber: 897,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                lineNumber: 896,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 886,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 875,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 864,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 863,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 858,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 743,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "domain",
                        className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-sm md:text-lg",
                                        children: "Domain"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 919,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                        onClick: ()=>setIsUpdateDomainVisible(true),
                                        children: "Update"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 920,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 918,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    id: "domain-dropdown",
                                                    className: "bg-gray-200 rounded-md p-2",
                                                    value: selectedDomain,
                                                    onChange: (e)=>setSelectedDomain(e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "select a Domain"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 936,
                                                            columnNumber: 21
                                                        }, this),
                                                        existingDomains.map((domain, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: domain,
                                                                children: domain
                                                            }, index, false, {
                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                lineNumber: 938,
                                                                columnNumber: 23
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 930,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 929,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                                    onClick: handleAddDomainFromDropdown,
                                                    children: "Add Domain"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 945,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 944,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "bg-green-400 px-4 py-1 rounded-md border-2 border-green-400 hover:bg-white hover:text-green-400 hover:shadow-lg transition duration-200 box-border",
                                                    onClick: ()=>setIsAddDomainVisible(true),
                                                    children: "Add New Domain"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 953,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 952,
                                                columnNumber: 17
                                            }, this),
                                            isAddDomainVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Elements$2f$cards$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                                onClose: ()=>{
                                                    setIsAddDomainVisible(false);
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "items-center justify-center top-48 relative p-2 bg-white rounded-md",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                        className: "space-y-4 p-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: "font-semibold text-sm md:text-lg",
                                                                children: "Add New Domain"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                lineNumber: 968,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        id: "new-domain-input",
                                                                        className: "bg-gray-200 rounded-md p-2",
                                                                        value: newDomain,
                                                                        onChange: (e)=>setNewDomain(e.target.value),
                                                                        placeholder: "Enter new domain"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                        lineNumber: 972,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-x-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                                                                onClick: ()=>{
                                                                                    handleAddDomain();
                                                                                    setIsAddDomainVisible(false);
                                                                                },
                                                                                children: "Add"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                                lineNumber: 981,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>setIsAddDomainVisible(false),
                                                                                className: "bg-red-500 text-white px-4 py-1 rounded-md border-2 border-red-500 hover:bg-white hover:text-red-500 hover:shadow-lg transition duration-200 box-border",
                                                                                children: "Cancel"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                                lineNumber: 990,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                        lineNumber: 980,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                lineNumber: 971,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 966,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 961,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 928,
                                        columnNumber: 15
                                    }, this),
                                    isUpdateDomainVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Elements$2f$cards$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                        onClose: ()=>{
                                            setIsUpdateDomainVisible(false);
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white p-4 mt-10 space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-lg",
                                                    children: "Added Skills"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1010,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-4",
                                                    children: candidateDomains.map((domain, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-3 py-1 bg-gray-200 rounded text-xs md:text-base",
                                                                children: [
                                                                    domain,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "ml-2 text-red-500 hover:text-red-700 transition duration-200",
                                                                        onClick: ()=>handleRemoveDomain(domain),
                                                                        children: "X"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                        lineNumber: 1016,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                                lineNumber: 1014,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, index, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 1013,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1011,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                                    children: "Update"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1027,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 1009,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1004,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 927,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: candidateDomains.map((domain, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1 bg-gray-200 rounded text-xs md:text-base",
                                            children: domain
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 1040,
                                            columnNumber: 19
                                        }, this)
                                    }, index, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1039,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 1037,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                        lineNumber: 914,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 913,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-white rounded-lg shadow-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold",
                                        children: "Previous Companies"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1054,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsCompanyAdded(true),
                                        className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                        children: "Add Company"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1055,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 1053,
                                columnNumber: 13
                            }, this),
                            isCompanyAdded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Elements$2f$cards$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                onClose: ()=>setIsCompanyAdded(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "items-center justify-center top-48 relative p-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        className: "space-y-6 m-10 bg-white p-4 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-xl font-semibold",
                                                children: "Add New Company"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1067,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Enter Company Name",
                                                value: newCompany.company,
                                                className: "p-2 w-full bg-slate-200",
                                                name: "company",
                                                onChange: addCompany
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1068,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        className: "rounded-full bg-blue-500 px-6 py-2 text-white font-medium hover:bg-blue-600",
                                                        children: "Add"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 1077,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "rounded-full bg-red-500 px-6 py-2 text-white font-medium hover:bg-red-600",
                                                        onClick: ()=>setIsCompanyAdded(false),
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 1083,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1076,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1066,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 1065,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 1064,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2",
                                children: updatedCompanies.map((company)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm",
                                        children: isEditingCompany ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: company.company,
                                                    onChange: (e)=>handleCompanyChange(company.id, e.target.value),
                                                    className: `border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 ${errors[company.id] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1104,
                                                    columnNumber: 23
                                                }, this),
                                                errors[company.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-red-500 text-sm mt-1",
                                                    children: errors[company.id]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1117,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 1103,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-700",
                                            children: company.company
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 1123,
                                            columnNumber: 21
                                        }, this)
                                    }, company.id, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 1096,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: isEditingCompany && Object.keys(updatedCompanies).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-x-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCompanySubmit,
                                            className: "bg-green-500 text-white px-4 py-1 rounded-md border-2 border-green-500 hover:bg-white hover:text-green-500 hover:shadow-lg transition duration-200 box-border",
                                            disabled: Object.values(errors).length > 0,
                                            children: "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsCompanyEditing(false),
                                            className: "bg-red-500 text-white px-4 py-1 rounded-md border-2  hover:bg-white border-red-500 hover:text-black hover:shadow-lg transition duration-200 box-border",
                                            disabled: Object.values(errors).length > 0,
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 1138,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 1130,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsCompanyEditing(true),
                                    className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                    children: "Update"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 1147,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 1128,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                        lineNumber: 1052,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 1051,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold",
                                                children: "Certificates"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1164,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                                onClick: ()=>setIsCertificateAdded(true),
                                                children: "Add Certificate"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1165,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: updatedCertificates.map((certificate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm",
                                                children: isEditingCertificate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: certificate.certificate,
                                                            onChange: (e)=>handleCertificateChange(certificate.id, e.target.value),
                                                            className: `border rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 ${errors[certificate.id] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 1180,
                                                            columnNumber: 25
                                                        }, this),
                                                        errors[certificate.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-red-500 text-sm mt-1",
                                                            children: errors[certificate.id]
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                            lineNumber: 1196,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1179,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-700",
                                                    children: certificate.certificate
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1202,
                                                    columnNumber: 23
                                                }, this)
                                            }, certificate.id, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1174,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1172,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: isEditingCertificate && Object.keys(updatedCertificates).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    // onClick={handleCertificateSubmit}
                                                    className: "bg-green-500 text-white px-4 py-1 rounded-md border-2 border-green-500 hover:bg-white hover:text-green-500 hover:shadow-lg transition duration-200 box-border",
                                                    disabled: Object.values(errors).length > 0,
                                                    children: "Submit"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1213,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setIsCertificateEditing(false),
                                                    className: "bg-red-500 text-white px-4 py-1 rounded-md border-2  hover:bg-white border-red-500 hover:text-black hover:shadow-lg transition duration-200 box-border",
                                                    disabled: Object.values(errors).length > 0,
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 1220,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 1212,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsCertificateEditing(true),
                                            className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                            children: "Update"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 1229,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1209,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 1162,
                                columnNumber: 13
                            }, this),
                            isCertificateAdded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Elements$2f$cards$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                onClose: ()=>setIsCertificateAdded(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "items-center justify-center top-48 relative p-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        className: "space-y-6 m-10 bg-white p-4 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-xl font-semibold",
                                                children: "Add New Certificate"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1242,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Enter Certificate Name",
                                                value: newCertificate.certificate,
                                                className: "p-2 w-full bg-slate-200",
                                                name: "certificate",
                                                onChange: addCertificate
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1245,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        className: "rounded-full bg-blue-500 px-6 py-2 text-white font-medium hover:bg-blue-600",
                                                        children: "Add"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 1254,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "rounded-full bg-red-500 px-6 py-2 text-white font-medium hover:bg-red-600",
                                                        onClick: ()=>setIsCertificateAdded(false),
                                                        children: "Cancel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 1260,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 1253,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1241,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 1240,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 1239,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                        lineNumber: 1161,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 1160,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    id: "resume",
                    className: "bg-white p-4 rounded-lg shadow-sm border space-y-6 border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-sm md:text-lg mb-4",
                                    children: "Resume"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 1281,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "file",
                                    className: "hidden",
                                    id: "resume_input"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 1282,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                                    type: "button",
                                    children: "Update"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 1283,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 1280,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("object", {
                            data: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Doc"].resume,
                            type: "application/pdf",
                            className: "w-full h-[500px] md:h-[650px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Your browser does not support PDFs.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "Assets/Harish's Resume.pdf",
                                        children: "Download the PDF"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 1297,
                                        columnNumber: 15
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 1295,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 1290,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 1276,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-4 space-x-2 p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-gray-500 text-white px-4 py-1 rounded-md border-2 border-black hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                            children: "Back To Results"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 1304,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border",
                            children: "select Candidate"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 1307,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 1303,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "mb-10"
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 1311,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
            lineNumber: 296,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
        lineNumber: 295,
        columnNumber: 5
    }, this);
}
_s(Candidates, "HBvzGlkryzsCM/z0EUEoYbXCkiU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Candidates;
var _c;
__turbopack_refresh__.register(_c, "Candidates");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/candidates/[id]/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/candidates/[id]";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/candidates/[id]/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/src/pages/candidates/[id]/index.tsx (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/candidates/[id]/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__a652fd._.js.map