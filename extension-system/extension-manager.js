/* =========================================================
   J-SYRO EXTENSION MANAGER
   ---------------------------------------------------------
   Handles:

   - Install
   - Uninstall
   - Enable
   - Disable
   - Installed extensions
   - Version tracking
   - Updates
   - Extension access state
   - Paid extension unlock state
   - Local persistence

   IMPORTANT:
   This manager does NOT create a new payment system.

   Paid extensions use the existing J-SYRO access/payment
   architecture when available.
========================================================= */

(function () {

    "use strict";


    const MANAGER_VERSION = "1.0.0";

    const STORAGE_KEY =
        "jsyro_installed_extensions";

    const UNLOCK_STORAGE_KEY =
        "jsyro_extension_unlocks";


    const store =
        window.jSyroExtensionStore;

    const security =
        window.jSyroExtensionSecurity;

    const runtime =
        window.jSyroExtensionRuntime;


    /*
     * =====================================================
     * SAFETY CHECK
     * =====================================================
     */

    if (!store) {

        console.error(
            "J-SYRO Extension Store must load before Extension Manager."
        );

        return;

    }


    if (!security) {

        console.error(
            "J-SYRO Extension Security must load before Extension Manager."
        );

        return;

    }


    /*
     * =====================================================
     * STORAGE HELPERS
     * =====================================================
     */

    function readStorage(
        key,
        fallback
    ) {

        try {

            const raw =
                localStorage.getItem(
                    key
                );


            if (!raw) {
                return fallback;
            }


            const parsed =
                JSON.parse(
                    raw
                );


            return parsed;

        } catch (error) {

            console.warn(
                "J-SYRO Extension Manager: storage read failed.",
                error
            );

            return fallback;

        }

    }


    function writeStorage(
        key,
        value
    ) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(
                    value
                )
            );


            return true;

        } catch (error) {

            console.error(
                "J-SYRO Extension Manager: storage write failed.",
                error
            );


            return false;

        }

    }


    /*
     * =====================================================
     * INSTALLED EXTENSIONS
     * =====================================================
     */

    function getInstalledMap() {

        const data =
            readStorage(
                STORAGE_KEY,
                {}
            );


        if (
            !data ||
            typeof data !== "object" ||
            Array.isArray(data)
        ) {

            return {};

        }


        return data;

    }


    function saveInstalledMap(
        map
    ) {

        return writeStorage(
            STORAGE_KEY,
            map
        );

    }


    /*
     * =====================================================
     * UNLOCKED PAID EXTENSIONS
     * =====================================================
     */

    function getUnlockMap() {

        const data =
            readStorage(
                UNLOCK_STORAGE_KEY,
                {}
            );


        if (
            !data ||
            typeof data !== "object" ||
            Array.isArray(data)
        ) {

            return {};

        }


        return data;

    }


    function saveUnlockMap(
        map
    ) {

        return writeStorage(
            UNLOCK_STORAGE_KEY,
            map
        );

    }


    /*
     * =====================================================
     * EXISTING J-SYRO ACCESS SYSTEM
     * =====================================================
     */

    function getJsyroAccess() {

        if (
            window.jSyroAccess &&
            typeof window.jSyroAccess ===
            "object"
        ) {

            return window.jSyroAccess;

        }


        return null;

    }


    /*
     * =====================================================
     * PAID EXTENSION ACCESS
     * =====================================================
     *
     * We intentionally do not create another payment
     * popup here.
     *
     * The manager checks the existing J-SYRO access system
     * first.
     */

    function isExtensionUnlocked(
        extensionId
    ) {

        const extension =
            store.getById(
                extensionId
            );


        if (!extension) {
            return false;
        }


        /*
         * Free extensions do not need unlocking.
         */

        if (
            Number(extension.price) <= 0
        ) {

            return true;

        }


        /*
         * Check local extension unlock state.
         */

        const unlocks =
            getUnlockMap();


        if (
            unlocks[
                extensionId
            ] === true
        ) {

            return true;

        }


        /*
         * Existing J-SYRO access system.
         *
         * This intentionally checks several possible
         * access flags so the extension system can work
         * with the current J-SYRO access object.
         */

        const access =
            getJsyroAccess();


        if (access) {

            if (
                access.hasAllAccess === true
            ) {

                return true;

            }


            if (
                access.hasPro === true &&
                extension.requiredPlan ===
                    "pro"
            ) {

                return true;

            }


            if (
                access.hasBusiness === true &&
                extension.requiredPlan ===
                    "business"
            ) {

                return true;

            }


            if (
                access.hasWorkApps === true &&
                extension.requiredPlan ===
                    "workapps"
            ) {

                return true;

            }

        }


        return false;

    }


    /*
     * =====================================================
     * MARK EXTENSION AS UNLOCKED
     * =====================================================
     *
     * Called after the EXISTING J-SYRO payment system
     * confirms payment.
     */

    function markUnlocked(
        extensionId
    ) {

        const extension =
            store.getById(
                extensionId
            );


        if (!extension) {

            throw new Error(
                "Extension not found."
            );

        }


        const unlocks =
            getUnlockMap();


        unlocks[
            extensionId
        ] = true;


        saveUnlockMap(
            unlocks
        );


        emit(
            "extension:unlocked",
            {
                extensionId
            }
        );


        return true;

    }


    /*
     * =====================================================
     * REMOVE UNLOCK
     * =====================================================
     */

    function removeUnlock(
        extensionId
    ) {

        const unlocks =
            getUnlockMap();


        delete unlocks[
            extensionId
        ];


        saveUnlockMap(
            unlocks
        );


        emit(
            "extension:lock-removed",
            {
                extensionId
            }
        );


        return true;

    }


    /*
     * =====================================================
     * INSTALLED CHECK
     * =====================================================
     */

    function isInstalled(
        extensionId
    ) {

        const installed =
            getInstalledMap();


        return Boolean(
            installed[
                extensionId
            ]
        );

    }


    /*
     * =====================================================
     * ENABLED CHECK
     * =====================================================
     */

    function isEnabled(
        extensionId
    ) {

        const installed =
            getInstalledMap();


        if (
            !installed[
                extensionId
            ]
        ) {

            return false;

        }


        return (
            installed[
                extensionId
            ].enabled === true
        );

    }


    /*
     * =====================================================
     * INSTALL
     * =====================================================
     */

    function install(
        extensionId
    ) {

        const extension =
            store.getById(
                extensionId
            );


        if (!extension) {

            throw new Error(
                "Extension not found."
            );

        }


        /*
         * Paid extension check.
         */

        if (
            Number(extension.price) > 0 &&
            !isExtensionUnlocked(
                extensionId
            )
        ) {

            const error =
                new Error(
                    "Extension requires payment/unlock before installation."
                );


            error.code =
                "EXTENSION_LOCKED";

            error.extension =
                extension;


            throw error;

        }


        /*
         * Already installed.
         */

        if (
            isInstalled(
                extensionId
            )
        ) {

            return getInstalled(
                extensionId
            );

        }


        const installed =
            getInstalledMap();


        installed[
            extensionId
        ] = {

            id:
                extension.id,

            name:
                extension.name,

            displayName:
                extension.displayName,

            publisher:
                extension.publisher,

            version:
                extension.version,

            installedAt:
                Date.now(),

            updatedAt:
                Date.now(),

            enabled:
                true,

            permissions:
                security.normalizePermissions(
                    extension.permissions
                )

        };


        const saved =
            saveInstalledMap(
                installed
            );


        if (!saved) {

            throw new Error(
                "Could not save extension installation."
            );

        }


        emit(
            "extension:installed",
            {
                extension:
                    getInstalled(
                        extensionId
                    )
            }
        );


        return getInstalled(
            extensionId
        );

    }


    /*
     * =====================================================
     * UNINSTALL
     * =====================================================
     */

    function uninstall(
        extensionId
    ) {

        const installed =
            getInstalledMap();


        if (
            !installed[
                extensionId
            ]
        ) {

            return false;

        }


        /*
         * Remove registered API items.
         */

        if (
            runtime &&
            typeof runtime
                .unregisterExtensionItems ===
            "function"
        ) {

            runtime
                .unregisterExtensionItems(
                    extensionId
                );

        }


        delete installed[
            extensionId
        ];


        saveInstalledMap(
            installed
        );


        emit(
            "extension:uninstalled",
            {
                extensionId
            }
        );


        return true;

    }


    /*
     * =====================================================
     * ENABLE
     * =====================================================
     */

    function enable(
        extensionId
    ) {

        const installed =
            getInstalledMap();


        if (
            !installed[
                extensionId
            ]
        ) {

            throw new Error(
                "Extension is not installed."
            );

        }


        installed[
            extensionId
        ].enabled =
            true;


        installed[
            extensionId
        ].updatedAt =
            Date.now();


        saveInstalledMap(
            installed
        );


        emit(
            "extension:enabled",
            {
                extensionId
            }
        );


        return getInstalled(
            extensionId
        );

    }


    /*
     * =====================================================
     * DISABLE
     * =====================================================
     */

    function disable(
        extensionId
    ) {

        const installed =
            getInstalledMap();


        if (
            !installed[
                extensionId
            ]
        ) {

            throw new Error(
                "Extension is not installed."
            );

        }


        /*
         * Remove registered API items while disabled.
         */

        if (
            runtime &&
            typeof runtime
                .unregisterExtensionItems ===
            "function"
        ) {

            runtime
                .unregisterExtensionItems(
                    extensionId
                );

        }


        installed[
            extensionId
        ].enabled =
            false;


        installed[
            extensionId
        ].updatedAt =
            Date.now();


        saveInstalledMap(
            installed
        );


        emit(
            "extension:disabled",
            {
                extensionId
            }
        );


        return getInstalled(
            extensionId
        );

    }


    /*
     * =====================================================
     * GET INSTALLED
     * =====================================================
     */

    function getInstalled(
        extensionId
    ) {

        const installed =
            getInstalledMap();


        const item =
            installed[
                extensionId
            ];


        if (!item) {
            return null;
        }


        const marketplaceExtension =
            store.getById(
                extensionId
            );


        return {

            ...item,

            marketplace:
                marketplaceExtension

        };

    }


    /*
     * =====================================================
     * GET ALL INSTALLED
     * =====================================================
     */

    function getAllInstalled() {

        const installed =
            getInstalledMap();


        return Object.keys(
            installed
        )
            .map(
                extensionId =>
                    getInstalled(
                        extensionId
                    )
            )
            .filter(
                Boolean
            );

    }


    /*
     * =====================================================
     * UPDATE CHECK
     * =====================================================
     */

    function checkForUpdate(
        extensionId
    ) {

        const installed =
            getInstalled(
                extensionId
            );


        if (!installed) {
            return null;
        }


        const marketplace =
            store.getById(
                extensionId
            );


        if (!marketplace) {
            return null;
        }


        const hasUpdate =
            store.hasUpdate(
                extensionId,
                installed.version
            );


        return {

            available:
                hasUpdate,

            installedVersion:
                installed.version,

            latestVersion:
                marketplace.version,

            extension:
                marketplace

        };

    }


    /*
     * =====================================================
     * GET ALL UPDATES
     * =====================================================
     */

    function getUpdates() {

        return getAllInstalled()

            .map(
                installed =>
                    checkForUpdate(
                        installed.id
                    )
            )

            .filter(
                result =>
                    result &&
                    result.available
            );

    }


    /*
     * =====================================================
     * UPDATE
     * =====================================================
     */

    function update(
        extensionId
    ) {

        const result =
            checkForUpdate(
                extensionId
            );


        if (!result) {

            throw new Error(
                "Extension is not installed or no longer exists."
            );

        }


        if (
            !result.available
        ) {

            return getInstalled(
                extensionId
            );

        }


        /*
         * Paid extensions must remain unlocked.
         */

        if (
            Number(
                result.extension.price
            ) > 0 &&
            !isExtensionUnlocked(
                extensionId
            )
        ) {

            const error =
                new Error(
                    "Extension update requires an unlocked extension."
                );


            error.code =
                "EXTENSION_LOCKED";

            throw error;

        }


        const installed =
            getInstalledMap();


        installed[
            extensionId
        ].version =
            result.latestVersion;


        installed[
            extensionId
        ].updatedAt =
            Date.now();


        saveInstalledMap(
            installed
        );


        emit(
            "extension:updated",
            {
                extensionId,

                version:
                    result.latestVersion
            }
        );


        return getInstalled(
            extensionId
        );

    }


    /*
     * =====================================================
     * RESET
     * =====================================================
     *
     * Development helper.
     */

    function resetAll() {

        localStorage.removeItem(
            STORAGE_KEY
        );


        localStorage.removeItem(
            UNLOCK_STORAGE_KEY
        );


        emit(
            "extensions:reset",
            {}
        );


        return true;

    }


    /*
     * =====================================================
     * EVENT SYSTEM
     * =====================================================
     */

    const listeners =
        new Map();


    function on(
        eventName,
        callback
    ) {

        if (
            typeof callback !==
            "function"
        ) {

            throw new Error(
                "Extension Manager event callback must be a function."
            );

        }


        if (
            !listeners.has(
                eventName
            )
        ) {

            listeners.set(
                eventName,
                new Set()
            );

        }


        listeners
            .get(
                eventName
            )
            .add(
                callback
            );


        return function unsubscribe() {

            listeners
                .get(
                    eventName
                )
                ?.delete(
                    callback
                );

        };

    }


    function emit(
        eventName,
        detail
    ) {

        const callbacks =
            listeners.get(
                eventName
            );


        if (!callbacks) {
            return;
        }


        callbacks.forEach(
            callback => {

                try {

                    callback(
                        detail
                    );

                } catch (error) {

                    console.error(
                        `J-SYRO extension event "${eventName}" failed.`,
                        error
                    );

                }

            }
        );

    }


    /*
     * =====================================================
     * PUBLIC MANAGER API
     * =====================================================
     */

    const manager = {

        version:
            MANAGER_VERSION,

        isInstalled,

        isEnabled,

        isExtensionUnlocked,

        markUnlocked,

        removeUnlock,

        install,

        uninstall,

        enable,

        disable,

        getInstalled,

        getAllInstalled,

        checkForUpdate,

        getUpdates,

        update,

        resetAll,

        on

    };


    window.jSyroExtensionManager =
        manager;


})();
