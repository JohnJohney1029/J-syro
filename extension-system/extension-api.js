/* =========================================
   J-SYRO EXTENSION API
   Safe bridge exposed to extensions.
========================================= */
(() => {
    "use strict";

    const security = window.jSyroExtensionSecurity;

    function requirePermission(extensionId, permission) {
        if (!security) throw new Error("J-SYRO extension security is unavailable.");
        if (!security.has(extensionId, permission)) {
            throw new Error(`Permission required: ${permission}`);
        }
    }

    const api = {
        version: "1.0.0",

        getContext(extensionId) {
            return {
                extensionId,
                page: location.pathname,
                timestamp: Date.now()
            };
        },

        permissions: {
            request(extensionId, permissions) {
                return security.request(extensionId, permissions);
            },
            has(extensionId, permission) {
                return security.has(extensionId, permission);
            },
            require: requirePermission
        },

        editor: {
            getActiveFile(extensionId) {
                requirePermission(extensionId, "Editor access");
                return window.jSyroWorkspace?.getActiveFile?.() ?? null;
            },
            getSelection(extensionId) {
                requirePermission(extensionId, "Editor access");
                return window.jSyroWorkspace?.getSelection?.() ?? "";
            }
        },

        workspace: {
            getState(extensionId) {
                requirePermission(extensionId, "Workspace access");
                return window.jSyroWorkspace?.getState?.() ?? null;
            }
        }
    };

    window.jSyroExtensionAPI = api;
})();
