/* =========================================
   J-SYRO EXTENSION MANAGER
   Real install / enable / disable / unlock state.
========================================= */
(() => {
    "use strict";

    const store = window.jSyroExtensionStore;
    const security = window.jSyroExtensionSecurity;
    const STORAGE_KEY = "jsyro-extension-manager-v4";

    const state = {
        installed: {},
        unlocked: {}
    };

    function read() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
            if (saved && typeof saved === "object") {
                state.installed = saved.installed && typeof saved.installed === "object" ? saved.installed : {};
                state.unlocked = saved.unlocked && typeof saved.unlocked === "object" ? saved.unlocked : {};
            }
        } catch (error) {
            console.warn("Could not load J-SYRO extension state", error);
        }
    }

    function write() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.warn("Could not save J-SYRO extension state", error);
        }
    }

    function get(id) {
        return store?.getById(id) || null;
    }

    function assertExtension(id) {
        const extension = get(id);
        if (!extension) throw new Error("Extension not found.");
        return extension;
    }

    function isInstalled(id) {
        return !!state.installed[id];
    }

    function isEnabled(id) {
        return isInstalled(id) && state.installed[id].enabled !== false;
    }

    function isExtensionUnlocked(id) {
        const extension = get(id);
        if (!extension) return false;
        return Number(extension.price) <= 0 || !!state.unlocked[id];
    }

    function markUnlocked(id) {
        const extension = assertExtension(id);
        if (Number(extension.price) <= 0) return true;
        state.unlocked[id] = {
            unlockedAt: Date.now(),
            version: extension.version
        };
        write();
        return true;
    }

    function install(id) {
        const extension = assertExtension(id);

        if (Number(extension.price) > 0 && !isExtensionUnlocked(id)) {
            throw new Error("This PRO extension must be unlocked before installation.");
        }

        state.installed[id] = {
            version: extension.version,
            enabled: true,
            installedAt: state.installed[id]?.installedAt || Date.now()
        };

        if (security) {
            security.request(id, extension.permissions || []);
        }

        write();
        return getInstalledRecord(id);
    }

    function uninstall(id) {
        const extension = assertExtension(id);
        delete state.installed[id];
        security?.revoke(id);
        write();
        return extension;
    }

    function enable(id) {
        assertExtension(id);
        if (!isInstalled(id)) throw new Error("Extension is not installed.");
        state.installed[id].enabled = true;
        write();
        return getInstalledRecord(id);
    }

    function disable(id) {
        assertExtension(id);
        if (!isInstalled(id)) throw new Error("Extension is not installed.");
        state.installed[id].enabled = false;
        write();
        return getInstalledRecord(id);
    }

    function getInstalledRecord(id) {
        const extension = get(id);
        if (!extension || !state.installed[id]) return null;
        return {
            ...state.installed[id],
            id,
            marketplace: extension,
            extension
        };
    }

    function getAllInstalled() {
        return Object.keys(state.installed)
            .map(getInstalledRecord)
            .filter(Boolean);
    }

    function getInstalledCount() {
        return getAllInstalled().length;
    }

    function getUpdates() {
        return getAllInstalled()
            .map(record => {
                const latest = get(record.id);
                if (!latest) return null;
                if (String(record.version) === String(latest.version)) return null;
                return {
                    extension: latest,
                    installedVersion: record.version,
                    latestVersion: latest.version
                };
            })
            .filter(Boolean);
    }

    function update(id) {
        const extension = assertExtension(id);
        if (!isInstalled(id)) throw new Error("Extension is not installed.");
        state.installed[id].version = extension.version;
        state.installed[id].enabled = true;
        write();
        return getInstalledRecord(id);
    }

    read();

    window.jSyroExtensionManager = {
        isInstalled,
        isEnabled,
        isExtensionUnlocked,
        markUnlocked,
        install,
        uninstall,
        enable,
        disable,
        update,
        getAllInstalled,
        getInstalledCount,
        getUpdates
    };
})();
