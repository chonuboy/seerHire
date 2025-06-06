(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__02ad8f._.js", {

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
"[project]/src/components/header.tsx [client] (ecmascript)": ((__turbopack_context__) => {
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
                        fileName: "[project]/src/components/header.tsx",
                        lineNumber: 18,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/header.tsx",
                    lineNumber: 10,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/header.tsx",
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
                        fileName: "[project]/src/components/header.tsx",
                        lineNumber: 27,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-blue-500 font-semibold",
                        children: "SeerTech Systems"
                    }, void 0, false, {
                        fileName: "[project]/src/components/header.tsx",
                        lineNumber: 32,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/header.tsx",
                lineNumber: 26,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$image$2d$helper$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["imgHelper"].userProfile,
                    alt: "admin_icon",
                    className: "w-5 h-5 md:w-10 md:h-10 rounded-full"
                }, void 0, false, {
                    fileName: "[project]/src/components/header.tsx",
                    lineNumber: 35,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/header.tsx",
                lineNumber: 34,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/header.tsx",
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
"[project]/src/components/nav-links.tsx [client] (ecmascript)": ((__turbopack_context__) => {
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
                        fileName: "[project]/src/components/nav-links.tsx",
                        lineNumber: 68,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$roboto_845498f1$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__roboto$3e$__["roboto"].className} hidden md:block`,
                        children: link.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/nav-links.tsx",
                        lineNumber: 73,
                        columnNumber: 7
                    }, this)
                ]
            }, link.name, true, {
                fileName: "[project]/src/components/nav-links.tsx",
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
"[project]/src/components/sidenav.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SideNav)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nav$2d$links$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/nav-links.tsx [client] (ecmascript)");
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nav$2d$links$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/sidenav.tsx",
                            lineNumber: 13,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden h-auto w-full grow rounded-md bg-gray-50 md:block"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sidenav.tsx",
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
                                    fileName: "[project]/src/components/sidenav.tsx",
                                    lineNumber: 18,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:block",
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sidenav.tsx",
                                    lineNumber: 23,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sidenav.tsx",
                            lineNumber: 16,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sidenav.tsx",
                    lineNumber: 12,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sidenav.tsx",
                lineNumber: 9,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "sidebar",
                className: "fixed left-0 inset-y-10 transform -translate-x-full md:hidden transition-transform duration-200 ease-in-out bg-gray-50 py-4 h-full z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$nav$2d$links$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/sidenav.tsx",
                            lineNumber: 34,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sidenav.tsx",
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
                                fileName: "[project]/src/components/sidenav.tsx",
                                lineNumber: 38,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "",
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sidenav.tsx",
                                lineNumber: 43,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sidenav.tsx",
                        lineNumber: 36,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sidenav.tsx",
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
"[project]/src/components/layout.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>MainLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/header.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sidenav$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/sidenav.tsx [client] (ecmascript)");
;
;
;
function MainLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$header$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/layout.tsx",
                lineNumber: 8,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-screen flex-col md:flex-row md:overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex-none cts-sidebar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sidenav$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/layout.tsx",
                            lineNumber: 11,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout.tsx",
                        lineNumber: 10,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-grow p-4 md:overflow-y-auto md:p-6 cts-content-section",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout.tsx",
                        lineNumber: 13,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout.tsx",
                lineNumber: 9,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout.tsx",
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
"[project]/src/components/editable_list.tsx [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
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
    "candidates": (()=>candidates),
    "tableColumns": (()=>tableColumns),
    "tableData": (()=>tableData),
    "updateCandidateInfoSchema": (()=>updateCandidateInfoSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/yup/index.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/constants.ts [client] (ecmascript)");
;
;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CandidateModel = {
    firstName: 'Nantha',
    lastName: 'Kumar',
    dob: '2000-12-19',
    primaryNumber: '9629978640',
    secondaryNumber: '8925173395',
    emailId: 'nantha@gmail.com',
    designation: 'full stack',
    companyName: 'SeerTech',
    totalExperience: 1,
    isActive: true,
    candidateStatus: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CandidateStatus"].ACTIVE,
    currentSalary: 120000,
    highestEducation: 'masters',
    gender: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["Gender"].FEMALE,
    hiringType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["HiringType"].FULL,
    pinCode: 20987,
    maritalStatus: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["MaritalStatus"].MARRIED,
    techRole: 'software developer',
    noticePeriod: 15,
    currentLocation: {
        locationId: 1
    },
    differentlyAbled: false,
    isDifferentlyAbled: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["DifferentlyAbled"].NO,
    address: 'Chennai',
    addressLocality: 'North Street',
    differentlyAbledType: '',
    preferredJobType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["PreferredJobType"].REMOTE
};
const CandidateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.object({
    firstName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, 'Must be at least 3 characters').max(15, 'Must be 15 characters or less').required('First name is required'),
    lastName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, 'Must be at least 3 characters').max(20, 'Must be 20 characters or less').required('Last name is required'),
    dob: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.date().required('Date of birth is required').test('isPastDate', 'Date of birth must be in the past', function(value) {
        const today = new Date();
        return new Date(value) < today;
    }),
    primaryNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().matches(phoneRegExp, 'Phone number is not valid').required('Mobile no. is required'),
    secondaryNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().matches(phoneRegExp, 'Phone number is not valid').required('Alternate mobile no. is required'),
    emailId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().matches(/^[a-zA-Z0-9][-a-zA-Z0-9._]+@([-a-zA-Z0-9]+\.)+.[a-zA-Z]{2,4}$/i, 'Invalid email format').email('Invalid email address').required('Email address is required'),
    designation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, 'Must be at least 3 characters').max(20, 'Must be 50 characters or less').required('Designation is required'),
    companyName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    totalExperience: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.number().required('Experience is required'),
    candidateStatus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required('Select status'),
    currentSalary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.number().required('Current salary is required'),
    highestEducation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, 'Must be at least 3 characters').max(30, 'Must be 50 characters or less').required('Highest education is required'),
    gender: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required('Select gender'),
    hiringType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    pinCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.number(),
    maritalStatus: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required('Select marital status'),
    techRole: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().min(3, 'Must be at least 3 characters').required('Tech role is required'),
    noticePeriod: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.number().required('Notice period is required'),
    currentLocation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.object().required('Current location is required'),
    isDifferentlyAbled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required('Select your preference'),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    addressLocality: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    differentlyAbledType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string(),
    preferredJobType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__.string().required('Select preferred job type')
});
const updateCandidateInfoSchema = [
    {
        label: "Experience",
        name: "experience"
    },
    {
        label: "Relevant Experience",
        name: "relevantExperience"
    },
    {
        label: "Current Salary",
        name: "currentSalary"
    },
    {
        label: "Qualification",
        name: "qualification"
    },
    {
        label: "Expected Salary",
        name: "expectedSalary"
    },
    {
        label: "Current Location",
        name: "currentLocation"
    },
    {
        label: "Preferred Location",
        name: "preferredLocation"
    },
    {
        label: "Availability",
        name: "availability"
    },
    {
        label: "Marital Status",
        name: "maritalStatus"
    },
    {
        label: "Preferred Job Type",
        name: "preferredJobType"
    },
    {
        label: "Gender",
        name: "gender"
    },
    {
        label: "Mobile Number",
        name: "mobileNumber"
    },
    {
        label: "Email",
        name: "email",
        type: "email"
    }
];
const candidates = [
    {
        "firstName": "Nantha",
        "lastName": "Kumar",
        "dob": "2000-12-19",
        "primaryNumber": "9629978600",
        "secondaryNumber": "8925173395",
        "emailId": "candidate1@example.com",
        "designation": "frontend",
        "companyName": "SeerTech",
        "totalExperience": 2,
        "isActive": false,
        "candidateStatus": "ACTIVE",
        "currentSalary": 100000,
        "highestEducation": "masters",
        "gender": "FEMALE",
        "hiringType": "FULL",
        "pinCode": 20987,
        "maritalStatus": "MARRIED",
        "techRole": "developer",
        "noticePeriod": 15,
        "currentLocation": {
            "locationId": 1
        },
        "differentlyAbled": false,
        "isDifferentlyAbled": "NO",
        "address": "City1",
        "addressLocality": "North Street",
        "differentlyAbledType": "",
        "preferredJobType": "REMOTE"
    },
    {
        "firstName": "John",
        "lastName": "Doe",
        "dob": "2000-12-19",
        "primaryNumber": "9629978601",
        "secondaryNumber": "8925173395",
        "emailId": "candidate2@example.com",
        "designation": "backend",
        "companyName": "SeerTech",
        "totalExperience": 3,
        "isActive": true,
        "candidateStatus": "ACTIVE",
        "currentSalary": 120000,
        "highestEducation": "masters",
        "gender": "FEMALE",
        "hiringType": "FULL",
        "pinCode": 20987,
        "maritalStatus": "MARRIED",
        "techRole": "architect",
        "noticePeriod": 15,
        "currentLocation": {
            "locationId": 1
        },
        "differentlyAbled": false,
        "isDifferentlyAbled": "NO",
        "address": "City2",
        "addressLocality": "North Street",
        "differentlyAbledType": "",
        "preferredJobType": "REMOTE"
    },
    {
        "firstName": "Mary",
        "lastName": "Wick",
        "dob": "2000-12-19",
        "primaryNumber": "9629978602",
        "secondaryNumber": "8925173395",
        "emailId": "candidate3@example.com",
        "designation": "data engineer",
        "companyName": "SeerTech",
        "totalExperience": 4,
        "isActive": true,
        "candidateStatus": "ACTIVE",
        "currentSalary": 140000,
        "highestEducation": "masters",
        "gender": "FEMALE",
        "hiringType": "FULL",
        "pinCode": 20987,
        "maritalStatus": "MARRIED",
        "techRole": "analyst",
        "noticePeriod": 15,
        "currentLocation": {
            "locationId": 1
        },
        "differentlyAbled": false,
        "isDifferentlyAbled": "NO",
        "address": "City3",
        "addressLocality": "North Street",
        "differentlyAbledType": "",
        "preferredJobType": "REMOTE"
    },
    {
        "firstName": "James",
        "lastName": "watt",
        "dob": "2000-12-19",
        "primaryNumber": "9629978603",
        "secondaryNumber": "8925173395",
        "emailId": "candidate4@example.com",
        "designation": "designer",
        "companyName": "SeerTech",
        "totalExperience": 5,
        "isActive": true,
        "candidateStatus": "ACTIVE",
        "currentSalary": 160000,
        "highestEducation": "masters",
        "gender": "FEMALE",
        "hiringType": "FULL",
        "pinCode": 20987,
        "maritalStatus": "MARRIED",
        "techRole": "manager",
        "noticePeriod": 15,
        "currentLocation": {
            "locationId": 1
        },
        "differentlyAbled": false,
        "isDifferentlyAbled": "NO",
        "address": "City4",
        "addressLocality": "North Street",
        "differentlyAbledType": "",
        "preferredJobType": "REMOTE"
    },
    {
        "firstName": "Christiano",
        "lastName": "Ronaldo",
        "dob": "2000-12-19",
        "primaryNumber": "9629978604",
        "secondaryNumber": "8925173395",
        "emailId": "candidate5@example.com",
        "designation": "devops",
        "companyName": "SeerTech",
        "totalExperience": 6,
        "isActive": true,
        "candidateStatus": "ACTIVE",
        "currentSalary": 180000,
        "highestEducation": "masters",
        "gender": "FEMALE",
        "hiringType": "FULL",
        "pinCode": 20987,
        "maritalStatus": "MARRIED",
        "techRole": "tester",
        "noticePeriod": 15,
        "currentLocation": {
            "locationId": 1
        },
        "differentlyAbled": false,
        "isDifferentlyAbled": "NO",
        "address": "City5",
        "addressLocality": "North Street",
        "differentlyAbledType": "",
        "preferredJobType": "REMOTE"
    }
];
const tableColumns = [
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
        accessor: "status"
    }
];
const tableData = candidates.map((candidate)=>({
        fullName: `${candidate.firstName} ${candidate.lastName}`,
        techRole: candidate.techRole,
        primaryNumber: candidate.primaryNumber,
        emailId: candidate.emailId,
        status: candidate.isActive ? "Active" : "Inactive"
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/popup.tsx [client] (ecmascript)": ((__turbopack_context__) => {
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
            fileName: "[project]/src/components/popup.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/popup.tsx",
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
"[project]/src/pages/candidates/[id]/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Candidates)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/layout.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/pdf.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editable_list$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/editable_list.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$models$2f$candidate$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/models/candidate.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/popup.tsx [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
function Candidates() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isFormVisible, setIsFormVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false); // State to control form visibility
    const [isCompaniesVisible, setIsCompanyVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [companies, setCompanies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1,
            name: "Dell Technologies",
            editable: false
        },
        {
            id: 2,
            name: "Infosys",
            editable: false
        }
    ]);
    const [infoFormData, setInfoFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        experience: "3yrs",
        relevantExperience: "2yrs",
        currentSalary: "3LPA",
        qualification: "MSC",
        expectedSalary: "4LPA",
        currentLocation: "Chennai",
        preferredLocation: "Chennai",
        availability: "Immediate",
        maritalStatus: "Unmarried",
        preferredJobType: "Remote",
        gender: "Male",
        mobileNumber: 9629978640,
        email: "knanthakumar12@gmail.com"
    });
    const certificates = [
        {
            id: 1,
            name: "Web Development Bootcamp",
            editable: false
        },
        {
            id: 2,
            name: "AWS",
            editable: false
        }
    ];
    const id = router.query.id;
    // Handle input change
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setInfoFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    // Handle add Company Post req
    const addCompany = ()=>{};
    // Handle form submission
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Form Data:", infoFormData);
        setIsFormVisible(false); // Hide the form after submission
    };
    const handleCompanyButtonClick = ()=>{
        setIsCompanyVisible(true);
    };
    const handleUpdateCompany = (id, newName)=>{
        // Update company logic here
        setCompanies(companies.map((company)=>{
            if (company.id === id) {
                return {
                    ...company,
                    name: newName
                };
            }
            return company;
        }));
    };
    // Get all companies api should go here
    if (id == null) {
        // Static pre-generated HTML
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
            lineNumber: 82,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "space-y-8 p-4 relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "border-b border-black-200 font-semibold text-2xl",
                    children: "Profile"
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 89,
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
                                    children: "Nanthakumar Krishnamoorthy"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-semibold text-lg md:text-xl",
                                    children: "Web Developer"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs md:text-sm",
                                    children: "Date Of Birth : 19/12/2000"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 96,
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
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>document.getElementById("resume")?.scrollIntoView({
                                            behavior: "smooth"
                                        }),
                                    className: "bg-[var(--theme-background)] text-white hover:bg-[var(--content-background)] hover:text-[var(--theme-background)] hover:border-2 hover:border-[var(--theme-background)] md:py-1 px-2 md:rounded-lg",
                                    children: "Download Resume"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 92,
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
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "py-1 px-2 bg-[var(--inactive-background)] rounded-lg text-xs md:text-base text-white",
                                    onClick: ()=>{
                                        setIsFormVisible(true);
                                    },
                                    children: "Update"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "profile_info",
                            className: "grid md:grid-cols-2 grid-cols-1 gap-4 p-4 rounded-lg bg-[var(--field-background)]",
                            children: [
                                {
                                    label: "Experience",
                                    value: "Total : 2Yrs, Relevant Experience : 1Yr"
                                },
                                {
                                    label: "Current Salary",
                                    value: "2 LPA"
                                },
                                {
                                    label: "Qualification",
                                    value: "B.sc Physics"
                                },
                                {
                                    label: "Expected Salary",
                                    value: "3 LPA"
                                },
                                {
                                    label: "Current Location",
                                    value: "Chennai"
                                },
                                {
                                    label: "Preferred Location",
                                    value: "Chennai"
                                },
                                {
                                    label: "Availability",
                                    value: "Immediate"
                                },
                                {
                                    label: "Marital Status",
                                    value: "Single"
                                },
                                {
                                    label: "Preferred Job Type",
                                    value: "Remote"
                                },
                                {
                                    label: "Gender",
                                    value: "Male"
                                },
                                {
                                    label: "Mobile Number",
                                    value: "+919629978640"
                                },
                                {
                                    label: "Email",
                                    value: "pranoti@gmail.com"
                                }
                            ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 166,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold md:text-sm text-xs",
                                            children: item.value
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 167,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        isFormVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                            onClose: ()=>setIsFormVisible(false),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: " m-10 bg-white p-4 rounded-lg",
                                onSubmit: handleSubmit,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg shadow-md p-4 space-y-4",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$models$2f$candidate$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["updateCandidateInfoSchema"].map(({ label, name, type })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-lg font-semibold",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: type,
                                                        name: name,
                                                        className: "p-2 rounded-lg border border-gray-300",
                                                        onChange: handleInputChange,
                                                        value: infoFormData[name] || ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, name, true, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 179,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-end gap-4 mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "bg-gray-500 text-white p-2 rounded-lg",
                                                onClick: ()=>setIsFormVisible(false),
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 194,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "bg-blue-600 text-white p-2 rounded-lg",
                                                children: "Update"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 201,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 193,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 173,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-semibold text-xl",
                    children: "Interviews"
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "interviews",
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200",
                    children: [
                        {
                            title: "React Developer",
                            company: "SeerTechsystems",
                            status: "Selected",
                            date: "20/11/2024"
                        },
                        {
                            title: "Full Stack Developer",
                            company: "Google",
                            status: "Pending",
                            date: "15/10/2024"
                        },
                        {
                            title: "DevOps Engineer",
                            company: "Amazon",
                            status: "Rejected",
                            date: "28/09/2024"
                        },
                        {
                            title: "Data Scientist",
                            company: "Microsoft",
                            status: "Scheduled",
                            date: "12/11/2024"
                        }
                    ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-black-200 shadow-md bg-[var(--content-background)] p-4 rounded-lg text-xs md:text-base space-y-4 relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-semibold text-xl",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-3 h-3 md:w-4 md:h-4 rounded-full ${item.status === "Selected" ? "bg-green-500" : item.status === "Pending" ? "bg-yellow-500" : item.status === "Rejected" ? "bg-red-500" : "bg-blue-500"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs md:text-base",
                                                    children: item.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 249,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-lg text-blue-700",
                                    children: item.company
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 266,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs md:text-base",
                                    children: [
                                        "Conducted On : ",
                                        item.date
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-[var(--theme-background)] text-white border-black-200 border-2 py-1 px-2 rounded-lg absolute right-4 bottom-4",
                                    children: "View Results"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 245,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "skills",
                    className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-semibold text-sm md:text-lg",
                            children: "Skills"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "skill-dropdown",
                                            className: "bg-gray-200 rounded-md p-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select a skill"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Java",
                                                    children: "Java"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "JavaScript",
                                                    children: "JavaScript"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "React",
                                                    children: "React"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 285,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]",
                                            children: "Add Skill"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 294,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-4",
                                    children: [
                                        "React",
                                        "Angular",
                                        "HTML",
                                        "CSS",
                                        "JavaScript",
                                        "TypeScript",
                                        "Node.js",
                                        "Express.js",
                                        "MongoDB",
                                        "MySQL",
                                        "Git"
                                    ].map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center",
                                            children: [
                                                skill,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    className: "text-blue-500 hover:underline ml-1",
                                                    title: "Edit",
                                                    children: "🖉"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 312,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "skills_rating",
                    className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-sm md:text-lg",
                            children: "Skills Rating"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 335,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-6 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "skill-dropdown",
                                    className: "bg-gray-200 rounded-md p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select a skill"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 338,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Java",
                                            children: "Java"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "JavaScript",
                                            children: "JavaScript"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 340,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "React",
                                            children: "React"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 341,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "skill-dropdown",
                                    className: "bg-gray-200 rounded-md p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select Experience"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "1 Year",
                                            children: "1 Year"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 345,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "2 Years",
                                            children: "2 Years"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 346,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "3 Years",
                                            children: "3 Years"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "skill-dropdown",
                                    className: "bg-gray-200 rounded-md p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Select Level"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Beginner",
                                            children: "Beginner"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 351,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Intermediate",
                                            children: "Intermediate"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 352,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Expert",
                                            children: "Expert"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 353,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]",
                                    children: "Add Skill"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 355,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 336,
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
                                                    lineNumber: 363,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "font-bold text-left px-4 py-2",
                                                    children: "Experience"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "font-bold text-left px-4 py-2",
                                                    children: "Expertise Level"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "font-bold text-left px-4 py-2",
                                                    children: "Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 362,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 361,
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
                                                        lineNumber: 383,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "text-left px-4 py-2 border border-gray-200",
                                                        children: item.experience
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "text-left px-4 py-2 border border-gray-200",
                                                        children: item.level
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 389,
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
                                                            lineNumber: 393,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                lineNumber: 382,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 371,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 360,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 359,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 331,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "domain",
                    className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-sm md:text-lg",
                            children: "Domain"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 409,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "skill-dropdown",
                                            className: "bg-gray-200 rounded-md p-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Select a Domain"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Banking",
                                                    children: "Banking"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 417,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Business Administration",
                                                    children: "Business Administration"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Hospitality",
                                                    children: "Hospitality"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 412,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]",
                                            children: "Add Domain"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 423,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 411,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-4",
                                    children: [
                                        "Banking",
                                        "Marketing",
                                        "Business Administration"
                                    ].map((domain, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center",
                                            children: [
                                                domain,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "#",
                                                    className: "text-blue-500 hover:underline ml-1",
                                                    title: "Edit",
                                                    children: "🖉"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 430,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 410,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 405,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "companies",
                        className: "space-y-4 text-xs md:text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-sm md:text-lg",
                                        children: "Companies"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 454,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]",
                                        onClick: ()=>handleCompanyButtonClick(),
                                        children: "Add"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 455,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 453,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editable_list$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                items: companies,
                                onUpdate: handleUpdateCompany
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 462,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]",
                                onClick: ()=>{
                                    console.log(companies);
                                },
                                children: "Update"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this),
                            isCompaniesVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$popup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                onClose: ()=>setIsCompanyVisible(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center items-center h-screen",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center items-center bg-white p-4 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: addCompany,
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold",
                                                    children: "Add New Company"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 472,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                                    id: "company_name",
                                                    type: "text",
                                                    placeholder: "Enter company name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                                                    type: "submit",
                                                    children: "Add New Company"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                            lineNumber: 471,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                        lineNumber: 470,
                                        columnNumber: 11
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 469,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 468,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                        lineNumber: 452,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 451,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    id: "resume",
                    className: "bg-white p-4 rounded-lg shadow-sm border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-sm md:text-lg mb-4",
                                    children: "Resume"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 499,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                                    type: "button",
                                    children: "Update"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                    lineNumber: 500,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 498,
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
                                        lineNumber: 514,
                                        columnNumber: 15
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                                lineNumber: 512,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 507,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 494,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-[var(--inactive-background)] px-2 py-1 border-black-200 border-2 rounded",
                            children: "Back To Results"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 521,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "bg-[var(--theme-background)] text-white px-2 py-1 border-black-200 border-2 rounded hover:bg-[var(--content-background)] hover:text-[var(--theme-background)] hover:border-2 hover:border-[var(--theme-background)]",
                            children: "Select Candidate"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/candidates/[id]/index.tsx",
                    lineNumber: 520,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/candidates/[id]/index.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/candidates/[id]/index.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(Candidates, "lWPDpvKr5X8hmZsmzgIIt1FyVZw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Candidates;
{
/* <section className="space-y-8 p-4 relative">
        <div
          id="profile"
          className="flex justify-between items-center md:text-base text-xs mt-4"
        >
          <div className="space-y-2">
            <h3 className="font-semibold text-lg md:text-2xl">
              Nanthakumar Krishnamoorthy
            </h3>
            <h4 className="font-semibold text-lg md:text-xl">Web Developer</h4>
            <p className="text-xs md:text-sm">Date Of Birth : 19/12/2000</p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() =>
                document
                  .getElementById("resume")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[var(--field-background)] border-black-200 border-2 md:py-1 px-2 md:rounded-lg hover:bg-black hover:text-[var(--content-background)]"
            >
              View Resume
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("resume")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[var(--theme-background)] text-white hover:bg-[var(--content-background)] hover:text-[var(--theme-background)] hover:border-2 hover:border-[var(--theme-background)] md:py-1 px-2 md:rounded-lg"
            >
              Download Resume
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm md:text-lg">Personal Info</h3>
          <button
            className="py-1 px-2 bg-[var(--inactive-background)] rounded-lg text-xs md:text-base text-white"
            onClick={() => {
              handleButtonClick(true);
            }}
          >
            Update
          </button>
        </div>
        <div
          id="profile_info"
          className="items-center bg-[var(--field-background)] gap-4 p-4 rounded-lg grid md:grid-cols-2 grid-cols-1 md:text-base text-xs"
        >
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Experience</p>
            <div className="md:text-sm text-xs flex items-center gap-4">
              <p>
                Total : <span className="font-semibold">2Yrs</span>{" "}
              </p>
              <p>
                Relevant Experience : <span className="font-semibold">1Yr</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Current Salary</p>
            <p className="font-semibold md:text-sm text-xs">2 LPA</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Qualification</p>
            <p className="font-semibold md:text-sm text-xs">B.sc Physics</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Expected Salary</p>
            <p className="font-semibold md:text-sm text-xs">3 LPA</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Current Location</p>
            <p className="font-semibold md:text-sm text-xs">Chennai</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Preferred Location</p>
            <p className="font-semibold md:text-sm text-xs">Chennai</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Availability</p>
            <p className="font-semibold md:text-sm text-xs">Immediate</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Marital Status</p>
            <p className="font-semibold md:text-sm text-xs">Single</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Preferred Job Type</p>
            <p className="font-semibold md:text-sm text-xs">Remote</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p>Gender</p>
            <p className="font-semibold md:text-sm text-xs">Male</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p className="text-xs md:text-base">Mobile Number:</p>
            <p className="font-semibold md:text-sm text-xs">+919629978640</p>
          </div>
          <div className="flex flex-col space-y-2 bg-white shadow-sm p-2 rounded-lg">
            <p className="text-xs md:text-base">Email:</p>
            <p className="font-semibold md:text-sm text-xs ">
              pranoti@gmail.com
            </p>
          </div>
        </div>
        {isFormVisible && (
          <Popup onClose={() => handleButtonClick(false)}>
            <form
              className="m-8 bg-white p-4 rounded-lg"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(infoFormData);
              }}
            >
              <div className="rounded-lg shadow-md p-4 space-y-4">
                {updateCandidateInfoSchema.map(({ label, name, type }) => (
                  <div key={name} className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold">{label}</label>
                    <input
                      type={type}
                      name={name} // Ensure the input has the correct `name`
                      className="p-2 rounded-lg border border-gray-300"
                      onChange={handleInputChange} // Update state using `name`
                      value={infoFormData[name as keyof CandidateInfo] || null} // Ensure value matches state
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg mt-4"
                onClick={() => console.log(infoFormData)}
              >
                Update
              </button>
            </form>
          </Popup>
        )}
        <div
          id="interviews"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 shadow-lg rounded-lg p-4"
        >
          <div
            id="interview_card"
            className="border-b border-black-200 shadow-md bg-[var(--content-background)] p-4 rounded-lg text-xs md:text-base space-y-4 relative"
          >
            <div className="flex items-center justify-between  md:space-y-2 flex-wrap">
              <h2 className="font-semibold text-lg md:text-2xl">
                React Developer
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full"></div>
                <span className="text-xs md:text-base" id="status">
                  Selected
                </span>
              </div>
            </div>
            <h4 className="font-bold text-sm md:text-lg">SeerTechsystems</h4>
            <div className="space-y-4">
              <p className="text-xs md:text-base">
                Conducted On : <span id="display-date">20/11/2024</span>
              </p>
              <div className="block md:absolute space-x-2 md:right-4 md:bottom-4">
                <button className="bg-[var(--theme-background)] text-white border-black-200 border-2 py-1 px-2 rounded-lg">
                  View Results
                </button>
              </div>
            </div>
          </div>
          <div
            id="interview_card"
            className="border-b border-black-200 shadow-md bg-[var(--content-background)] p-4 rounded-lg text-xs md:text-base space-y-4 relative"
          >
            <div className="flex items-center justify-between  md:space-y-2 flex-wrap">
              <h2 className="font-semibold text-lg md:text-2xl">
                Full Stack Developer
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-xs md:text-base" id="status">
                  Pending
                </span>
              </div>
            </div>
            <h4 className="font-bold text-sm md:text-lg">Google</h4>
            <div className="space-y-4">
              <p className="text-xs md:text-base">
                Conducted On : <span id="display-date">15/10/2024</span>
              </p>
              <div className="block md:absolute md:right-4 space-x-2 md:bottom-4">
                <button className="bg-[var(--theme-background)] text-white border-black-200 border-2 py-1 px-2 rounded-lg">
                  View Results
                </button>
              </div>
            </div>
          </div>
          <div
            id="interview_card"
            className="border-b border-black-200 shadow-md bg-[var(--content-background)] p-4 rounded-lg text-xs md:text-base space-y-4 relative"
          >
            <div className="flex items-center justify-between  md:space-y-2 flex-wrap">
              <h2 className="font-semibold text-lg md:text-2xl">
                DevOps Engineer
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full"></div>
                <span className="text-xs md:text-base" id="status">
                  Rejected
                </span>
              </div>
            </div>
            <h4 className="font-bold text-sm md:text-lg">Amazon</h4>
            <div className="space-y-4">
              <p className="text-xs md:text-base">
                Conducted On : <span id="display-date">28/09/2024</span>
              </p>
              <div className="block md:absolute md:right-4 space-x-2 md:bottom-4">
                <button className="bg-[var(--theme-background)] text-white border-black-200 border-2 py-1 px-2 rounded-lg">
                  View Results
                </button>
              </div>
            </div>
          </div>
          <div
            id="interview_card"
            className="border-b border-black-200 shadow-md bg-[var(--content-background)] p-4 rounded-lg text-xs md:text-base space-y-4 relative"
          >
            <div className="flex items-center justify-between  md:space-y-2 flex-wrap">
              <h2 className="font-semibold text-lg md:text-2xl">
                Data Scientist
              </h2>
              <div className="flex gap-2 items-center flex-wrap">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full"></div>
                <span className="text-xs md:text-base" id="status">
                  Scheduled
                </span>
              </div>
            </div>
            <h4 className="font-bold text-sm md:text-lg">Microsoft</h4>
            <div className="space-y-4">
              <p className="text-xs md:text-base">
                Conducted On : <span id="display-date">12/11/2024</span>
              </p>
              <div className="block md:absolute md:right-4 space-x-2 md:bottom-4">
                <button className="bg-[var(--theme-background)] text-white border-black-200 border-2 py-1 px-2 rounded-lg">
                  View Results
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="skills" className="space-y-6 text-xs md:text-base">
          <h2 className="font-semibold text-sm md:text-lg">Skills</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <select
                id="skill-dropdown"
                className="bg-gray-200 rounded-md p-1"
              >
                <option value="">Select a skill</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
              </select>
              <button className="bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]">
                Add Skill
              </button>
            </div>
            <div className="flex gap-4 items-center">
              <select
                id="skill-dropdown"
                className="bg-gray-200 rounded-md p-1"
              >
                <option value="">Select a skill</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
              </select>
              <button className="py-1 px-2 bg-[var(--inactive-background)] rounded-lg text-xs md:text-base text-white">
                Update
              </button>
            </div>
          </div>

          <div
            id="skills_wrapper"
            className="flex flex-wrap gap-4 items-center"
          >
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              React
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              Angular
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              HTML
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              CSS
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              JavaScript
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              TypeScript
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              Node.js
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              Express.js
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              MongoDB
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              MySQL
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              Git
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
          </div>
        </div>
        <div id="skills_rating" className="space-y-4 text-xs md:text-base">
          <h3 className="font-semibold text-sm md:text-lg">Skills Rating</h3>
          <div className="flex items-center gap-6 flex-wrap">
            <select id="skill-dropdown" className="bg-gray-200 rounded-md p-1">
              <option value="">Select a skill</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
            </select>
            <select id="skill-dropdown" className="bg-gray-200 rounded-md p-1">
              <option value="">Select Experience</option>
              <option value="">Less than 1 Year</option>
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
            </select>
            <select id="skill-dropdown" className="bg-gray-200 rounded-md p-1">
              <option value="">Select Level</option>
              <option value="Java">Beginner</option>
              <option value="JavaScript">Intermediate</option>
              <option value="React">Expert</option>
            </select>
            <button className="bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]">
              Add Skill
            </button>
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
            <table className="table-auto w-full text-xs md:text-base border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="font-bold text-left px-4 py-2">Skill</th>
                  <th className="font-bold text-left px-4 py-2">Experience</th>
                  <th className="font-bold text-left px-4 py-2">
                    Expertise Level
                  </th>
                  <th className="font-bold text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="text-left px-4 py-2 border border-gray-200">
                    React
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    2 Years
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    Beginner
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    <p className="text-blue-500 hover:underline" title="Edit">
                      Update
                    </p>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="text-left px-4 py-2 border border-gray-200">
                    Angular
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    3 Years
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    Intermediate
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    <p className="text-blue-500 hover:underline" title="Edit">
                      Update
                    </p>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="text-left px-4 py-2 border border-gray-200">
                    Node.js
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    1 Year
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    Advanced
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    <p className="text-blue-500 hover:underline" title="Edit">
                      Update
                    </p>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="text-left px-4 py-2 border border-gray-200">
                    Python
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    5 Years
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    Expert
                  </td>
                  <td className="text-left px-4 py-2 border border-gray-200">
                    <p className="text-blue-500 hover:underline" title="Edit">
                      Update
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="special" className="text-xs md:text-base">
          <h3 className="font-semibold text-sm md:text-lg">
            Differently Abled
          </h3>
          <p>Differently Abled Type</p>
        </div>
        <div id="domain" className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm md:text-lg">Domain</h3>
            <div className="flex gap-4 items-center text-xs md:text-base">
              <select
                id="skill-dropdown"
                className="bg-gray-200 rounded-md p-1"
              >
                <option value="">Select a Domain</option>
                <option value="Java">Banking</option>
                <option value="JavaScript">Buiseness Administration</option>
                <option value="React">Hospitality</option>
              </select>
              <button className="bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]">
                Add Domain
              </button>
            </div>
            <div className="flex gap-4 items-center text-xs md:text-base">
              <select
                id="skill-dropdown"
                className="bg-gray-200 rounded-md p-1"
              >
                <option value="">Select a Domain</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
              </select>
              <button className="py-1 px-2 bg-[var(--inactive-background)] rounded-lg text-xs md:text-base text-white">
                Update
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              Banking
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              Marketing
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
            <span className="px-3 py-1 bg-gray-200 rounded text-xs md:text-base flex items-center">
              Buiseness Administration
              <a
                href="#"
                className="text-blue-500 hover:underline ml-1"
                title="Edit"
              >
                🖉
              </a>
            </span>
          </div>
        </div>
        <div id="companies" className="space-y-4 text-xs md:text-base">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm md:text-lg">Companies</h3>
            <button
              className="bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]"
              onClick={() => handleCompanyButtonClick(true)}
            >
              Add
            </button>
          </div>

          {/* List can be updated with single click on the text*/ }// <EditableList items={companies} onUpdate={handleUpdateCompany} />
// {isCompanyUpdated && (
//   <button className="bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]">
//     Update
//   </button>
// )}
{
/* Static list */ }{
/* <ul className="list-none p-0 m-0">
            <li className="bg-gray-200 rounded-md p-4 mb-4 shadow-md flex items-center gap-2">
              <h3 className="font-semibold text-md md:text-lg">
                Dell Technologies
              </h3>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Update
              </button>
            </li>
            <li className="bg-gray-200 rounded-md p-4 mb-4 shadow-md flex items-center gap-2">
              <h3 className="font-semibold text-md md:text-lg">
                Dell Technologies
              </h3>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Update
              </button>
            </li>
          </ul> */ } //     {isCompanyVisible && (
 //       <Popup onClose={() => setIsCompanyVisible(false)}>
 //         <div className="flex justify-center items-center h-screen">
 //           <div className="flex justify-center items-center bg-white p-4 rounded-lg">
 //             <form onSubmit={addCompany} className="space-y-4">
 //               <h3 className="text-lg font-semibold">Add New Company</h3>
 //               <input
 //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
 //                 id="company_name"
 //                 type="text"
 //                 placeholder="Enter company name"
 //               />
 //               <button
 //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
 //                 type="submit"
 //               >
 //                 Add New Company
 //               </button>
 //             </form>
 //           </div>
 //         </div>
 //       </Popup>
 //     )}
 //   </div>
 //   <div className="text-xs md:text-base">
 //     <h3 className="font-semibold text-sm md:text-lg">Address Locality</h3>
 //     <p>Nearby landmarks, Buildings etc.</p>
 //   </div>
 //   <div className="text-xs md:text-base">
 //     <h3 className="font-semibold text-sm md:text-lg">State</h3>
 //     <p>Chennai,Tamilnadu</p>
 //   </div>
 //   <div className="space-y-4">
 //     <h3 className="font-semibold text-xs md:text-lg">Education</h3>
 //     <div className="space-y-4 text-xs md:text-base">
 //       <h3 className="font-semibold">Degree</h3>
 //       <p>Bachelor of Science in Computer Science</p>
 //     </div>
 //     <div className="space-y-4 text-xs md:text-lg">
 //       <div className="flex items-center gap-2">
 //         <h3 className="font-semibold">Certificates</h3>
 //         <button
 //           className="bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]"
 //           type="button"
 //           onClick={() => {
 //             handleCertificateButtonClick(true);
 //           }}
 //         >
 //           Add
 //         </button>
 //       </div>
 //       <EditableList
 //         items={certificates}
 //         onUpdate={handleUpdateCertificate}
 //       />
 //       {isCertificateUpdated && (
 //         <button className="bg-[var(--theme-background)] shadow-md py-1 px-6 rounded-lg text-[var(--content-background)] md:text-base text-xs hover:bg-[var(--content-background)] hover:text-[var(--theme-background)]">
 //           Update
 //         </button>
 //       )}
 //       {isCertificatesVisible && (
 //         <Popup onClose={() => setIsCertificatesVisible(false)}>
 //           <div className="flex justify-center items-center h-screen">
 //             <div className="flex justify-center items-center bg-white p-4 rounded-lg">
 //               <div className="space-y-4">
 //               <h3 className="text-lg font-semibold">
 //                 Add New Certificate
 //               </h3>
 //               <form onSubmit={addCertificate} className="space-y-4">
 //                 <input
 //                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
 //                   id="company_name"
 //                   type="text"
 //                   placeholder="Enter certificate name"
 //                 />
 //                 <button
 //                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
 //                   type="submit"
 //                   onClick={() => {
 //                     handleCertificateButtonClick(false);
 //                   }}
 //                 >
 //                   Add New Certificate
 //                 </button>
 //               </form>
 //               </div>
 //             </div>
 //           </div>
 //         </Popup>
 //       )}
 //     </div>
 //   </div>
 //   <section id="resume">
 //     <div className="flex justify-between items-center">
 //       <h3 className="font-semibold text-sm md:text-lg mb-4">Resume</h3>
 //       <button
 //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
 //         type="button"
 //       >
 //         Update
 //       </button>
 //     </div>
 //     <object
 //       data={Doc.resume}
 //       type="application/pdf"
 //       className="w-full h-[500px] md:h-[650px]"
 //     >
 //       <p>
 //         Your browser does not support PDFs.
 //         <a href="Assets/Harish's Resume.pdf">Download the PDF</a>.
 //       </p>
 //     </object>
 //   </section>
 //   <div className="absolute right-4">
 //     <button className="bg-[var(--inactive-background)] px-2 py-1 border-black-200 border-2 rounded">
 //       Back To Results
 //     </button>
 //     <button className="bg-[var(--theme-background)] text-white px-2 py-1 border-black-200 border-2 rounded hover:bg-[var(--content-background)] hover:text-[var(--theme-background)] hover:border-2 hover:border-[var(--theme-background)]">
 //       Select Candidate
 //     </button>
 //   </div>
 //   <footer className="mb-4"></footer>
 // </section> */}
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

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__02ad8f._.js.map