/* =========================================================
   J-SYRO WORKSPACE EXTENSION HOST
   Connects installed marketplace extensions to the real editor.
   Loaded by workspace.html after workspace.js.
========================================================= */
(() => {
    "use strict";

    const STORAGE_KEY = "jsyro-extension-manager-v4";

    const EXTENSIONS = {
        "jsyro-prettier": "J-SYRO Prettier",
        "js-lint-lite": "JS Lint Lite",
        "json-tools": "JSON Tools",
        "web-code-snippets": "Web Code Snippets",
        "bracket-colorizer": "Bracket Colorizer",
        "dark-pro-theme": "Dark Pro Theme",
        "git-tools": "Git Tools",
        "ai-coding-helper": "AI Coding Helper"
    };

    const $ = selector => document.querySelector(selector);

    function readManagerState() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            return {
                installed: saved?.installed && typeof saved.installed === "object" ? saved.installed : {},
                unlocked: saved?.unlocked && typeof saved.unlocked === "object" ? saved.unlocked : {}
            };
        } catch {
            return { installed: {}, unlocked: {} };
        }
    }

    function isInstalled(id) {
        const state = readManagerState();
        return !!state.installed[id];
    }

    function isEnabled(id) {
        const state = readManagerState();
        return !!state.installed[id] && state.installed[id].enabled !== false;
    }

    function requireEnabled(id) {
        if (!isInstalled(id)) {
            showToast(`${EXTENSIONS[id] || "Extension"} is not installed.`, "!");
            openExtensionsMarketplace();
            return false;
        }
        if (!isEnabled(id)) {
            showToast(`${EXTENSIONS[id] || "Extension"} is disabled. Enable it from Extensions.`, "!");
            return false;
        }
        return true;
    }

    function activeName() {
        return typeof state !== "undefined" && state.activeFile
            ? state.activeFile
            : "No file";
    }

    function syncEditor() {
        if (typeof state !== "undefined" && typeof editor !== "undefined" && state.activeFile) {
            state.files[state.activeFile] = editor.value;
            if (typeof persistFiles === "function") persistFiles();
            if (typeof renderTabs === "function") renderTabs();
        }
    }

    function refreshEditor() {
        if (typeof updateLineNumbers === "function") updateLineNumbers();
        if (typeof updateHighlighting === "function") updateHighlighting();
        if (typeof updateCursor === "function") updateCursor();
        if (typeof persistFiles === "function") persistFiles();
        if (typeof renderTabs === "function") renderTabs();
    }

    function showToast(message, icon = "✓") {
        if (typeof window.showToast === "function") {
            window.showToast(message);
            return;
        }
        if (typeof window.alert === "function") {
            console.log(`${icon} ${message}`);
        }
    }

    function insertAtCursor(text) {
        if (typeof editor === "undefined" || !editor || editor.disabled) {
            showToast("Open a file first.", "!");
            return false;
        }

        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.setRangeText(text, start, end, "end");
        editor.dispatchEvent(new Event("input", { bubbles: true }));
        syncEditor();
        refreshEditor();
        editor.focus();
        return true;
    }

    function getSelectionOrFile() {
        if (typeof editor === "undefined" || !editor) return "";
        return editor.value.slice(editor.selectionStart, editor.selectionEnd) || editor.value;
    }

    function formatHtml(source) {
        let text = source
            .replace(/>\s+</g, "><")
            .replace(/</g, "\n<")
            .trim();

        const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
        let depth = 0;
        const out = [];

        for (let line of lines) {
            if (/^<\//.test(line)) depth = Math.max(0, depth - 1);
            out.push("  ".repeat(depth) + line);
            if (/^<[^!/?][^>]*>$/.test(line) &&
                !/<\/[^>]+>$/.test(line) &&
                !/\/>$/.test(line) &&
                !/^<(meta|link|img|input|br|hr|source)\b/i.test(line)) {
                depth++;
            }
        }
        return out.join("\n");
    }

    function formatCss(source) {
        let text = source.replace(/\r/g, "").trim();
        text = text
            .replace(/\s*{\s*/g, " {\n")
            .replace(/;\s*/g, ";\n")
            .replace(/\s*}\s*/g, "\n}\n");

        let depth = 0;
        const lines = text.split("\n").map(x => x.trim()).filter(Boolean);
        const out = [];

        for (const line of lines) {
            if (line.startsWith("}")) depth = Math.max(0, depth - 1);
            out.push("  ".repeat(depth) + line);
            if (line.endsWith("{")) depth++;
        }
        return out.join("\n");
    }

    function formatJs(source) {
        let text = source.replace(/\r/g, "").trim();
        text = text
            .replace(/;\s*(?=[^\n}])/g, ";\n")
            .replace(/\{\s*/g, "{\n")
            .replace(/\s*\}/g, "\n}\n");

        let depth = 0;
        const out = [];

        for (const raw of text.split("\n")) {
            const line = raw.trim();
            if (!line) continue;
            if (line.startsWith("}")) depth = Math.max(0, depth - 1);
            out.push("  ".repeat(depth) + line);
            if (line.endsWith("{")) depth++;
        }
        return out.join("\n");
    }

    function prettier() {
        if (!requireEnabled("jsyro-prettier")) return;
        if (typeof editor === "undefined" || !editor || !state.activeFile) {
            showToast("Open a file first.", "!");
            return;
        }

        syncEditor();
        const type = typeof fileType === "function" ? fileType(state.activeFile) : "text";
        let formatted = editor.value;

        if (type === "html") formatted = formatHtml(editor.value);
        else if (type === "css") formatted = formatCss(editor.value);
        else if (type === "js") formatted = formatJs(editor.value);
        else formatted = editor.value.trim();

        editor.value = formatted;
        editor.dispatchEvent(new Event("input", { bubbles: true }));
        syncEditor();
        refreshEditor();
        showToast(`J-SYRO Prettier formatted ${activeName()}`);
    }

    function lint() {
        if (!requireEnabled("js-lint-lite")) return;
        if (typeof editor === "undefined" || !state.activeFile) {
            showToast("Open a JavaScript file first.", "!");
            return;
        }

        const source = editor.value;
        const diagnostics = [];
        const pairs = { "(": ")", "[": "]", "{": "}" };
        const closing = new Set(Object.values(pairs));
        const stack = [];

        for (let i = 0; i < source.length; i++) {
            const ch = source[i];
            if (pairs[ch]) stack.push({ ch, index: i });
            else if (closing.has(ch)) {
                const expected = stack.length ? pairs[stack[stack.length - 1].ch] : null;
                if (ch !== expected) {
                    diagnostics.push(`Unexpected "${ch}" at character ${i + 1}.`);
                    break;
                }
                stack.pop();
            }
        }
        if (stack.length) {
            diagnostics.push(`Missing closing "${pairs[stack[stack.length - 1].ch]}".`);
        }

        const lines = source.split("\n");
        lines.forEach((line, index) => {
            if (/\bvar\s+[A-Za-z_$]/.test(line)) {
                diagnostics.push(`Line ${index + 1}: prefer const/let instead of var.`);
            }
            if (/[ \t]+$/.test(line)) {
                diagnostics.push(`Line ${index + 1}: trailing whitespace.`);
            }
        });

        if (!diagnostics.length) {
            showToast(`JS Lint Lite: ${activeName()} passed`);
            return;
        }

        showResultModal(
            "JS Lint Lite",
            `<p><strong>${diagnostics.length} diagnostic${diagnostics.length === 1 ? "" : "s"}</strong></p>
             <ul>${diagnostics.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        );
    }

    function jsonTools() {
        if (!requireEnabled("json-tools")) return;
        if (typeof editor === "undefined" || !state.activeFile) {
            showToast("Open a JSON file first.", "!");
            return;
        }

        const raw = editor.value.trim();
        try {
            const parsed = JSON.parse(raw);
            editor.value = JSON.stringify(parsed, null, 2);
            editor.dispatchEvent(new Event("input", { bubbles: true }));
            syncEditor();
            refreshEditor();
            showToast(`JSON Tools formatted ${activeName()}`);
        } catch (error) {
            showResultModal(
                "JSON Tools",
                `<p><strong>Invalid JSON</strong></p><p>${escapeHtml(error.message)}</p>`
            );
        }
    }

    function snippets() {
        if (!requireEnabled("web-code-snippets")) return;

        const name = activeName().toLowerCase();
        let snippet = "";

        if (name.endsWith(".html")) {
            snippet = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>J-SYRO Page</title>
</head>
<body>

</body>
</html>`;
        } else if (name.endsWith(".css")) {
            snippet = `:root {
  --accent: #635bff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}`;
        } else if (name.endsWith(".js")) {
            snippet = `function init() {
  console.log("J-SYRO ready");
}

init();`;
        } else {
            snippet = `// J-SYRO snippet
`;
        }

        insertAtCursor(snippet);
        showToast(`Web Code Snippets inserted into ${activeName()}`);
    }

    function findMatchingBracket() {
        if (!requireEnabled("bracket-colorizer")) return;

        if (typeof editor === "undefined" || !state.activeFile) {
            showToast("Open a code file first.", "!");
            return;
        }

        const source = editor.value;
        const cursor = editor.selectionStart;
        const chars = "([{)]}";
        let start = cursor - 1;

        while (start >= 0 && !chars.includes(source[start])) start--;
        if (start < 0) {
            showToast("Place the cursor next to a bracket.", "!");
            return;
        }

        const ch = source[start];
        const pairs = { "(": ")", "[": "]", "{": "}" };
        const reverse = { ")": "(", "]": "[", "}": "{" };
        const target = pairs[ch] || reverse[ch];

        let depth = 0;
        let match = -1;
        const forward = !!pairs[ch];

        if (forward) {
            for (let i = start; i < source.length; i++) {
                if (source[i] === ch) depth++;
                if (source[i] === target) {
                    depth--;
                    if (depth === 0) { match = i; break; }
                }
            }
        } else {
            for (let i = start; i >= 0; i--) {
                if (source[i] === ch) depth++;
                if (source[i] === target) {
                    depth--;
                    if (depth === 0) { match = i; break; }
                }
            }
        }

        if (match < 0) {
            showToast(`No matching ${ch} found.`, "!");
            return;
        }

        const line = source.slice(0, match).split("\n").length;
        editor.focus();
        editor.setSelectionRange(Math.min(start, match), Math.max(start, match) + 1);
        showToast(`Bracket match found on line ${line}`);
    }

    function theme() {
        if (!requireEnabled("dark-pro-theme")) return;

        const button = document.getElementById("themeToggleBtn");
        const codeArea = document.querySelector(".code-wrapper");

        if (button && typeof button.click === "function") {
            button.click();
            showToast("Dark Pro Theme applied");
            return;
        }

        if (codeArea) {
            codeArea.classList.remove("code-light-theme");
            localStorage.setItem("jSyroCodeTheme", "dark");
            showToast("Dark Pro Theme applied");
        }
    }

    function git() {
        if (!requireEnabled("git-tools")) return;

        if (typeof state === "undefined") return;
        syncEditor();

        const files = Object.keys(state.files || {});
        const dirty = state.dirty ? [...state.dirty] : [];
        const branch = localStorage.getItem("jsyro-git-branch") || "main";

        showResultModal(
            "Git Tools",
            `<div class="git-summary">
                <div><strong>Branch</strong><span>${escapeHtml(branch)}</span></div>
                <div><strong>Files</strong><span>${files.length}</span></div>
                <div><strong>Unsaved</strong><span>${dirty.length}</span></div>
             </div>
             <p>This browser workspace does not have a native Git executable. Git Tools provides a safe workspace status view and local snapshots.</p>
             <button class="jsyro-host-action" data-host-action="snapshot">Create Local Snapshot</button>`
        );
    }

    function createSnapshot() {
        if (typeof state === "undefined") return;
        syncEditor();
        const snapshots = JSON.parse(localStorage.getItem("jsyro-git-snapshots") || "[]");
        snapshots.unshift({
            id: Date.now(),
            branch: localStorage.getItem("jsyro-git-branch") || "main",
            files: state.files,
            folders: state.folders,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem("jsyro-git-snapshots", JSON.stringify(snapshots.slice(0, 20)));
        if (state.dirty) state.dirty.clear();
        if (typeof renderTabs === "function") renderTabs();
        showToast("Git Tools: local snapshot created");
        closeResultModal();
    }

    function ai() {
        if (!requireEnabled("ai-coding-helper")) return;

        const selected = typeof editor !== "undefined"
            ? editor.value.slice(editor.selectionStart, editor.selectionEnd)
            : "";

        const source = selected || (typeof editor !== "undefined" ? editor.value : "");
        if (!source.trim()) {
            showResultModal("AI Coding Helper", "<p>Select some code or open a file to get coding assistance.</p>");
            return;
        }

        const type = typeof fileType === "function" ? fileType(activeName()) : "text";
        const lines = source.split("\n").length;
        const suggestions = [];

        if (type === "js") {
            if (/\bvar\b/.test(source)) suggestions.push("Replace var with const/let where possible.");
            if (/console\.log/.test(source)) suggestions.push("Remove debug console.log calls before production.");
            if (/function\s+\w+\s*\([^)]*\)\s*\{/.test(source)) suggestions.push("Consider smaller functions with one clear responsibility.");
        }
        if (type === "html") {
            if (!/<meta[^>]+viewport/i.test(source)) suggestions.push("Add a responsive viewport meta tag.");
            if (!/<main\b/i.test(source)) suggestions.push("Use semantic <main> content where appropriate.");
        }
        if (type === "css") {
            if (!/box-sizing\s*:\s*border-box/i.test(source)) suggestions.push("Consider using box-sizing: border-box.");
            if (!/var\(--/i.test(source)) suggestions.push("CSS variables can make repeated design values easier to maintain.");
        }
        if (!suggestions.length) suggestions.push("The selected code looks structurally reasonable. Consider naming, readability and error handling next.");

        showResultModal(
            "AI Coding Helper",
            `<p><strong>Local coding review</strong> · ${lines} line${lines === 1 ? "" : "s"} · ${escapeHtml(type.toUpperCase())}</p>
             <h4>Suggestions</h4>
             <ul>${suggestions.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
             <p class="muted">This built-in assistant works without sending your code anywhere.</p>`
        );
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function ensureHostStyle() {
        if (document.getElementById("jsyroExtensionHostStyle")) return;
        const style = document.createElement("style");
        style.id = "jsyroExtensionHostStyle";
        style.textContent = `
#jsyroUseExtensionsBtn{position:relative}
#jsyroUseExtensionsBtn::after{content:"";position:absolute;right:4px;top:4px;width:6px;height:6px;border-radius:50%;background:#635bff;box-shadow:0 0 0 3px rgba(99,91,255,.12)}
.jsyro-ext-modal{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(4,7,12,.72);backdrop-filter:blur(8px)}
.jsyro-ext-modal.open{display:flex}
.jsyro-ext-card{width:min(720px,100%);max-height:min(760px,calc(100vh - 40px));overflow:auto;background:#151821;color:#edf0f7;border:1px solid #2b3140;border-radius:16px;box-shadow:0 30px 100px rgba(0,0,0,.5);padding:22px}
.jsyro-ext-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}
.jsyro-ext-head h2{font-size:20px;margin:0}
.jsyro-ext-head p{margin:5px 0 0;color:#9aa2b3;font-size:11px}
.jsyro-ext-close{width:34px;height:34px;border:1px solid #2b3140;background:#1b1f2a;color:#9aa2b3;border-radius:8px;cursor:pointer;font-size:20px}
.jsyro-ext-list{display:grid;gap:9px}
.jsyro-ext-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px;border:1px solid #2b3140;background:#1b1f2a;border-radius:10px}
.jsyro-ext-info{min-width:0}
.jsyro-ext-info strong{display:block;font-size:12px}
.jsyro-ext-info span{display:block;color:#7f889b;font-size:10px;margin-top:3px}
.jsyro-ext-actions{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
.jsyro-ext-action{height:31px;padding:0 11px;border-radius:6px;border:1px solid #2b3140;background:#222735;color:#edf0f7;font-size:10px;font-weight:600;cursor:pointer}
.jsyro-ext-action.primary{background:#635bff;border-color:#635bff;color:#fff}
.jsyro-ext-action.danger{background:rgba(239,115,115,.1);border-color:rgba(239,115,115,.3);color:#f08d8d}
.jsyro-ext-empty{padding:28px 10px;text-align:center;color:#9aa2b3}
.jsyro-result-modal{position:fixed;inset:0;z-index:2147483100;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(4,7,12,.72);backdrop-filter:blur(8px)}
.jsyro-result-modal.open{display:flex}
.jsyro-result-card{width:min(620px,100%);max-height:calc(100vh - 40px);overflow:auto;background:#151821;color:#edf0f7;border:1px solid #2b3140;border-radius:16px;padding:22px;box-shadow:0 30px 100px rgba(0,0,0,.5)}
.jsyro-result-card h3{margin:0 0 14px;font-size:18px}
.jsyro-result-card p,.jsyro-result-card li{color:#aeb5c4;font-size:11px;line-height:1.65}
.jsyro-result-card ul{padding-left:20px;margin:10px 0}
.jsyro-result-card h4{margin:18px 0 7px}
.jsyro-result-card .muted{color:#70798c}
.jsyro-host-action{height:34px;padding:0 13px;border-radius:7px;border:1px solid #635bff;background:#635bff;color:#fff;font-size:10px;font-weight:700;cursor:pointer}
.git-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0 18px}
.git-summary div{padding:10px;border:1px solid #2b3140;border-radius:8px;background:#1b1f2a}
.git-summary strong,.git-summary span{display:block}.git-summary strong{font-size:9px;color:#70798c}.git-summary span{margin-top:4px;font-size:13px}
`;
        document.head.appendChild(style);
    }

    function openExtensionsMarketplace() {
        window.location.href = "extensions.html";
    }

    function ensureUseButton() {
        if (document.getElementById("jsyroUseExtensionsBtn")) return;

        const activity = document.querySelector(".activity-bar");
        if (!activity) return;

        const button = document.createElement("button");
        button.id = "jsyroUseExtensionsBtn";
        button.className = "activity-button extensions-activity-button";
        button.type = "button";
        button.title = "Use installed extensions";
        button.setAttribute("aria-label", "Use installed extensions");
        button.innerHTML = "<span>⚙</span>";
        activity.appendChild(button);
        button.addEventListener("click", openUseModal);
    }

    function buildUseModal() {
        if (document.getElementById("jsyroExtensionUseModal")) return;

        const modal = document.createElement("div");
        modal.id = "jsyroExtensionUseModal";
        modal.className = "jsyro-ext-modal";
        modal.innerHTML = `
            <div class="jsyro-ext-card" role="dialog" aria-modal="true" aria-labelledby="jsyroExtTitle">
                <div class="jsyro-ext-head">
                    <div>
                        <h2 id="jsyroExtTitle">Use installed extensions</h2>
                        <p>Run an installed extension directly on the active J-SYRO workspace file.</p>
                    </div>
                    <button class="jsyro-ext-close" type="button" aria-label="Close">×</button>
                </div>
                <div class="jsyro-ext-list" id="jsyroExtList"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector(".jsyro-ext-close").addEventListener("click", closeUseModal);
        modal.addEventListener("click", event => {
            if (event.target === modal) closeUseModal();
        });
    }

    function actionFor(id) {
        return {
            "jsyro-prettier": prettier,
            "js-lint-lite": lint,
            "json-tools": jsonTools,
            "web-code-snippets": snippets,
            "bracket-colorizer": findMatchingBracket,
            "dark-pro-theme": theme,
            "git-tools": git,
            "ai-coding-helper": ai
        }[id];
    }

    function actionLabel(id) {
        return {
            "jsyro-prettier": "Format",
            "js-lint-lite": "Lint",
            "json-tools": "Format JSON",
            "web-code-snippets": "Insert Snippet",
            "bracket-colorizer": "Find Bracket",
            "dark-pro-theme": "Apply Theme",
            "git-tools": "Git Status",
            "ai-coding-helper": "Review Code"
        }[id] || "Use";
    }

    function openUseModal() {
        ensureHostStyle();
        buildUseModal();

        const modal = document.getElementById("jsyroExtensionUseModal");
        const list = document.getElementById("jsyroExtList");
        const state = readManagerState();
        const installedIds = Object.keys(state.installed);

        if (!installedIds.length) {
            list.innerHTML = `
                <div class="jsyro-ext-empty">
                    <strong>No extensions installed yet.</strong>
                    <p>Open the Extensions marketplace and install an extension first.</p>
                    <button class="jsyro-ext-action primary" data-open-marketplace>Open Marketplace</button>
                </div>`;
            list.querySelector("[data-open-marketplace]").addEventListener("click", openExtensionsMarketplace);
        } else {
            list.innerHTML = installedIds.map(id => {
                const enabled = state.installed[id]?.enabled !== false;
                const name = EXTENSIONS[id] || id;
                return `
                    <div class="jsyro-ext-row">
                        <div class="jsyro-ext-info">
                            <strong>${escapeHtml(name)}</strong>
                            <span>${enabled ? "Installed · Enabled" : "Installed · Disabled"}</span>
                        </div>
                        <div class="jsyro-ext-actions">
                            <button class="jsyro-ext-action primary" data-run-extension="${escapeHtml(id)}" ${enabled ? "" : "disabled"}>${escapeHtml(actionLabel(id))}</button>
                            <button class="jsyro-ext-action" data-toggle-extension="${escapeHtml(id)}">${enabled ? "Disable" : "Enable"}</button>
                        </div>
                    </div>`;
            }).join("");

            list.querySelectorAll("[data-run-extension]").forEach(button => {
                button.addEventListener("click", () => {
                    const id = button.dataset.runExtension;
                    closeUseModal();
                    actionFor(id)?.();
                });
            });

            list.querySelectorAll("[data-toggle-extension]").forEach(button => {
                button.addEventListener("click", () => toggleExtension(button.dataset.toggleExtension));
            });
        }

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeUseModal() {
        const modal = document.getElementById("jsyroExtensionUseModal");
        if (!modal) return;
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    }

    function toggleExtension(id) {
        const state = readManagerState();
        if (!state.installed[id]) return;
        state.installed[id].enabled = state.installed[id].enabled === false;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        showToast(`${EXTENSIONS[id] || "Extension"} ${state.installed[id].enabled ? "enabled" : "disabled"}`);
        openUseModal();
    }

    function showResultModal(title, body) {
        let modal = document.getElementById("jsyroResultModal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "jsyroResultModal";
            modal.className = "jsyro-result-modal";
            modal.innerHTML = `
                <div class="jsyro-result-card" role="dialog" aria-modal="true">
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
                        <h3 id="jsyroResultTitle"></h3>
                        <button class="jsyro-ext-close" type="button" aria-label="Close">×</button>
                    </div>
                    <div id="jsyroResultBody"></div>
                </div>`;
            document.body.appendChild(modal);
            modal.querySelector(".jsyro-ext-close").addEventListener("click", closeResultModal);
            modal.addEventListener("click", event => {
                if (event.target === modal) closeResultModal();
            });
            modal.addEventListener("click", event => {
                if (event.target.closest("[data-host-action='snapshot']")) createSnapshot();
            });
        }
        modal.querySelector("#jsyroResultTitle").textContent = title;
        modal.querySelector("#jsyroResultBody").innerHTML = body;
        modal.classList.add("open");
    }

    function closeResultModal() {
        const modal = document.getElementById("jsyroResultModal");
        if (modal) modal.classList.remove("open");
    }

    // Public workspace bridge used by extension-api.js.
    window.jSyroWorkspace = {
        getActiveFile() {
            return activeName();
        },
        getSelection() {
            return typeof editor !== "undefined" && editor
                ? editor.value.slice(editor.selectionStart, editor.selectionEnd)
                : "";
        },
        getState() {
            return {
                activeFile: activeName(),
                files: typeof state !== "undefined" ? { ...state.files } : {},
                folders: typeof state !== "undefined" ? [...state.folders] : []
            };
        }
    };

    window.JSYRO_EXTENSION_HOST = {
        prettier,
        lint,
        jsonTools,
        snippets,
        brackets: findMatchingBracket,
        theme,
        git,
        ai,
        open: openUseModal,
        isInstalled,
        isEnabled
    };

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeUseModal();
            closeResultModal();
        }
    });

    function init() {
        ensureHostStyle();
        ensureUseButton();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
