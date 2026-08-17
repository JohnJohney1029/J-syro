/* =========================================================
   J-SYRO EXTENSION SECURITY
   ---------------------------------------------------------
   Permission registry + capability checks.

   Extensions MUST request permissions explicitly.

   Supported permissions:

   workspace.read
   workspace.write
   editor
   commands
   panels
   themes
   languages
   snippets
   git
   ai
========================================================= */

(function () {

    "use strict";


    const PERMISSIONS = {

        "workspace.read": {
            id: "workspace.read",
            label: "Workspace Read",
            description:
                "Allows the extension to read project files."
        },

        "workspace.write": {
            id: "workspace.write",
            label: "Workspace Write",
            description:
                "Allows the extension to modify project files."
        },

        "editor": {
            id: "editor",
            label: "Editor",
            description:
                "Allows the extension to interact with the active editor."
        },

        "commands": {
            id: "commands",
            label: "Commands",
            description:
                "Allows the extension to register and execute commands."
        },

        "panels": {
            id: "panels",
            label: "Panels",
            description:
                "Allows the extension to create J-SYRO panels."
        },

        "themes": {
            id: "themes",
            label: "Themes",
            description:
                "Allows the extension to provide workspace themes."
        },

        "languages": {
            id: "languages",
            label: "Languages",
            description:
                "Allows the extension to register language support."
        },

        "snippets": {
            id: "snippets",
            label: "Snippets",
            description:
                "Allows the extension to provide code snippets."
        },

        "git": {
            id: "git",
            label: "Git",
            description:
                "Allows the extension to interact with supported Git features."
        },

        "ai": {
            id: "ai",
            label: "AI",
            description:
                "Allows the extension to use J-SYRO AI extension capabilities."
        }

    };


    const SECURITY_VERSION = "1.0.0";


    function normalizePermissions(
        permissions
    ) {

        if (!Array.isArray(permissions)) {
            return [];
        }

        return [
            ...new Set(
                permissions
                    .map(
                        permission =>
                            String(permission)
                                .trim()
                                .toLowerCase()
                    )
                    .filter(
                        permission =>
                            Boolean(
                                PERMISSIONS[
                                    permission
                                ]
                            )
                    )
            )
        ];

    }


    function getPermission(
        permission
    ) {

        return (
            PERMISSIONS[
                String(permission)
                    .trim()
                    .toLowerCase()
            ] ||
            null
        );

    }


    function hasPermission(
        extension,
        permission
    ) {

        if (!extension) {
            return false;
        }

        const requested =
            normalizePermissions(
                extension.permissions
            );

        return requested.includes(
            String(permission)
                .trim()
                .toLowerCase()
        );

    }


    function assertPermission(
        extension,
        permission
    ) {

        if (
            !hasPermission(
                extension,
                permission
            )
        ) {

            throw new Error(
                `Extension "${extension?.id || extension?.name || "unknown"}" does not have permission "${permission}".`
            );

        }

        return true;

    }


    function validateManifest(
        manifest
    ) {

        const errors = [];


        if (
            !manifest ||
            typeof manifest !== "object"
        ) {

            errors.push(
                "Extension manifest must be an object."
            );

            return {
                valid: false,
                errors
            };

        }


        if (
            !manifest.name ||
            typeof manifest.name !== "string"
        ) {

            errors.push(
                "Manifest requires a valid name."
            );

        }


        if (
            !manifest.displayName ||
            typeof manifest.displayName !== "string"
        ) {

            errors.push(
                "Manifest requires a valid displayName."
            );

        }


        if (
            !manifest.version ||
            typeof manifest.version !== "string"
        ) {

            errors.push(
                "Manifest requires a valid version."
            );

        }


        if (
            !manifest.main ||
            typeof manifest.main !== "string"
        ) {

            errors.push(
                "Manifest requires a valid main entry file."
            );

        }


        const permissions =
            normalizePermissions(
                manifest.permissions
            );


        const unknownPermissions = (
            Array.isArray(
                manifest.permissions
            )
                ? manifest.permissions
                    .map(
                        permission =>
                            String(permission)
                                .trim()
                                .toLowerCase()
                    )
                    .filter(
                        permission =>
                            !PERMISSIONS[
                                permission
                            ]
                    )
                : []
        );


        if (
            unknownPermissions.length
        ) {

            errors.push(
                `Unknown permissions: ${unknownPermissions.join(", ")}`
            );

        }


        return {

            valid:
                errors.length === 0,

            errors,

            permissions

        };

    }


    function createCapabilityToken(
        extensionId,
        permission
    ) {

        const normalizedPermission =
            String(permission)
                .trim()
                .toLowerCase();


        if (
            !PERMISSIONS[
                normalizedPermission
            ]
        ) {

            throw new Error(
                "Cannot create token for unknown permission."
            );

        }


        return Object.freeze({

            extensionId,

            permission:
                normalizedPermission,

            securityVersion:
                SECURITY_VERSION,

            createdAt:
                Date.now()

        });

    }


    function verifyCapabilityToken(
        token,
        extension,
        permission
    ) {

        if (!token) {
            return false;
        }

        if (
            token.extensionId !==
            extension?.id
        ) {
            return false;
        }

        if (
            token.permission !==
            String(permission)
                .trim()
                .toLowerCase()
        ) {
            return false;
        }

        return hasPermission(
            extension,
            permission
        );

    }


    window.jSyroExtensionSecurity = {

        version:
            SECURITY_VERSION,

        permissions:
            Object.freeze(
                PERMISSIONS
            ),

        normalizePermissions,

        getPermission,

        hasPermission,

        assertPermission,

        validateManifest,

        createCapabilityToken,

        verifyCapabilityToken

    };


})();
