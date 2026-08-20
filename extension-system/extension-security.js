/* =========================================
   J-SYRO EXTENSION SECURITY
   Permission and state safety helpers.
========================================= */
(() => {
    "use strict";

    const granted = new Set();

    function normalize(permission) {
        return String(permission || "")
            .trim()
            .toLowerCase();
    }

    function request(extensionId, permissions = []) {
        const id = String(extensionId || "");
        const list = Array.isArray(permissions) ? permissions : [];
        list.forEach(permission => {
            const key = `${id}:${normalize(Array.isArray(permission) ? permission[0] : permission)}`;
            granted.add(key);
        });
        return true;
    }

    function revoke(extensionId) {
        const prefix = `${String(extensionId || "")}:`;
        [...granted].forEach(key => {
            if (key.startsWith(prefix)) granted.delete(key);
        });
    }

    function has(extensionId, permission) {
        return granted.has(`${String(extensionId || "")}:${normalize(permission)}`);
    }

    window.jSyroExtensionSecurity = {
        request,
        revoke,
        has,
        sanitize(value) {
            return String(value ?? "");
        }
    };
})();
