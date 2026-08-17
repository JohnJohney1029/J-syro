/* =========================================================
   J-SYRO EXTENSION API
   ---------------------------------------------------------
   Public API exposed to extensions.

   Future-compatible architecture for:

   commands
   panels
   languages
   themes
   snippets
   formatters
   linters
   git
   AI
========================================================= */

(function () {

    "use strict";


    const security =
        window.jSyroExtensionSecurity;


    if (!security) {

        console.error(
            "J-SYRO Extension Security must load before Extension API."
        );

        return;

    }


    const registry = {

        commands:
            new Map(),

        panels:
            new Map(),

        languages:
            new Map(),

        themes:
            new Map(),

        snippets:
            new Map()

    };


    let activeExtension =
        null;


    function setActiveExtension(
        extension
    ) {

        activeExtension =
            extension || null;

    }


    function requireExtension() {

        if (!activeExtension) {

            throw new Error(
                "No active J-SYRO extension context."
            );

        }

        return activeExtension;

    }


    function requirePermission(
        permission
    ) {

        const extension =
            requireExtension();

        security.assertPermission(
            extension,
            permission
        );

    }


    function register(
        type,
        item,
        permission
    ) {

        requirePermission(
            permission
        );


        if (
            !item ||
            typeof item !== "object"
        ) {

            throw new Error(
                `Invalid ${type} registration.`
            );

        }


        if (!item.id) {

            throw new Error(
                `${type} requires an id.`
            );

        }


        const collection =
            registry[type];


        if (!collection) {

            throw new Error(
                `Unsupported registry: ${type}`
            );

        }


        collection.set(
            `${activeExtension.id}:${item.id}`,
            {
                ...item,

                extensionId:
                    activeExtension.id

            }
        );


        return item.id;

    }


    function unregisterExtensionItems(
        extensionId
    ) {

        Object.values(
            registry
        ).forEach(
            collection => {

                for (
                    const [
                        key,
                        value
                    ]
                    of collection
                ) {

                    if (
                        value.extensionId ===
                        extensionId
                    ) {

                        collection.delete(
                            key
                        );

                    }

                }

            }
        );

    }


    function getActiveFile() {

        requirePermission(
            "workspace.read"
        );


        if (
            typeof window.jSyroWorkspace ===
            "object" &&
            typeof window
                .jSyroWorkspace
                .getActiveFile ===
                "function"
        ) {

            return window
                .jSyroWorkspace
                .getActiveFile();

        }


        const file =
            document.getElementById(
                "breadcrumbFile"
            );


        return (
            file?.textContent
                ?.trim() ||
            null
        );

    }


    function getProjectFiles() {

        requirePermission(
            "workspace.read"
        );


        if (
            typeof window.jSyroWorkspace ===
            "object" &&
            typeof window
                .jSyroWorkspace
                .getProjectFiles ===
                "function"
        ) {

            return window
                .jSyroWorkspace
                .getProjectFiles();

        }


        return {};

    }


    function getActiveEditor() {

        requirePermission(
            "editor"
        );


        if (
            typeof window.jSyroWorkspace ===
            "object" &&
            typeof window
                .jSyroWorkspace
                .getEditor ===
                "function"
        ) {

            return window
                .jSyroWorkspace
                .getEditor();

        }


        return null;

    }


    function registerCommand(
        command
    ) {

        return register(
            "commands",
            command,
            "commands"
        );

    }


    function registerPanel(
        panel
    ) {

        return register(
            "panels",
            panel,
            "panels"
        );

    }


    function registerLanguage(
        language
    ) {

        return register(
            "languages",
            language,
            "languages"
        );

    }


    function registerTheme(
        theme
    ) {

        return register(
            "themes",
            theme,
            "themes"
        );

    }


    function registerSnippet(
        snippet
    ) {

        return register(
            "snippets",
            snippet,
            "snippets"
        );

    }


    function executeCommand(
        commandId,
        ...args
    ) {

        requirePermission(
            "commands"
        );


        for (
            const command
            of registry.commands.values()
        ) {

            if (
                command.id ===
                commandId
            ) {

                if (
                    typeof command.execute !==
                    "function"
                ) {

                    throw new Error(
                        `Command "${commandId}" has no execute function.`
                    );

                }


                return command.execute(
                    ...args
                );

            }

        }


        throw new Error(
            `Command "${commandId}" was not found.`
        );

    }


    const extensionAPI = {

        version: "1.0.0",

        extensions: {

            registerCommand,

            registerPanel,

            registerLanguage,

            registerTheme,

            registerSnippet,

            getActiveFile,

            getProjectFiles,

            getActiveEditor,

            executeCommand

        }

    };


    window.jSyroExtensionAPI =
        extensionAPI;


    window.jSyroExtensionRuntime = {

        setActiveExtension,

        unregisterExtensionItems,

        getRegistry() {

            return registry;

        }

    };


})();
