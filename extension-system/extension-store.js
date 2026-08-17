/* =========================================================
   J-SYRO EXTENSION STORE
   ---------------------------------------------------------
   Marketplace data layer.

   Current version:
   - Local demo marketplace
   - Search
   - Categories
   - Free / Paid extensions
   - Versions
   - Ratings
   - Installs
   - README
   - Permissions
   - Changelog
   - Update detection

   Future:
   - Connect this same API to a real J-SYRO marketplace server.
========================================================= */

(function () {

    "use strict";


    const STORE_VERSION = "1.0.0";


    /*
     * =====================================================
     * DEMO MARKETPLACE DATA
     * =====================================================
     *
     * Ye temporary local marketplace hai.
     *
     * Future mein isi structure ko API/server se load
     * kiya ja sakta hai.
     */

    const extensions = [

        {
            id: "jsyro-prettier",
            name: "jsyro-prettier",

            displayName:
                "J-SYRO Prettier",

            publisher:
                "J-SYRO",

            version:
                "1.2.0",

            previousVersion:
                "1.1.0",

            price:
                0,

            currency:
                "USD",

            category:
                "formatters",

            categories: [
                "formatters",
                "productivity"
            ],

            icon:
                "✦",

            verified:
                true,

            featured:
                true,

            rating:
                4.9,

            installs:
                18420,

            description:
                "Format your HTML, CSS and JavaScript projects directly inside J-SYRO.",

            features: [
                "HTML formatting",
                "CSS formatting",
                "JavaScript formatting",
                "Workspace formatting commands",
                "Configurable formatting options"
            ],

            permissions: [
                "workspace.read",
                "workspace.write",
                "editor",
                "commands"
            ],

            readme: {
                heading:
                    "J-SYRO Prettier",

                paragraphs: [
                    "J-SYRO Prettier provides formatting tools for modern web projects.",
                    "It is designed specifically for the J-SYRO workspace and can format supported project files with a single command."
                ]
            },

            changelog: [
                {
                    version:
                        "1.2.0",

                    date:
                        "2026-08-10",

                    text:
                        "Improved JavaScript formatting and workspace command integration."
                },

                {
                    version:
                        "1.1.0",

                    date:
                        "2026-06-21",

                    text:
                        "Added CSS formatting support."
                }
            ]
        },


        {
            id: "jsyro-dark-pro",
            name: "jsyro-dark-pro",

            displayName:
                "Dark Pro Theme",

            publisher:
                "J-SYRO Themes",

            version:
                "2.0.0",

            previousVersion:
                "1.5.0",

            price:
                4.99,

            currency:
                "USD",

            category:
                "themes",

            categories: [
                "themes"
            ],

            icon:
                "◐",

            verified:
                true,

            featured:
                true,

            rating:
                4.8,

            installs:
                9270,

            description:
                "A polished dark theme designed for long coding sessions in J-SYRO.",

            features: [
                "Premium dark editor theme",
                "Readable syntax colors",
                "Workspace UI customization",
                "Multiple accent presets",
                "Low-contrast interface"
            ],

            permissions: [
                "themes"
            ],

            readme: {
                heading:
                    "Dark Pro Theme",

                paragraphs: [
                    "Dark Pro is a premium J-SYRO theme focused on a clean coding environment.",
                    "The extension only requests the theme permission required to register and apply its theme."
                ]
            },

            changelog: [
                {
                    version:
                        "2.0.0",

                    date:
                        "2026-08-12",

                    text:
                        "Redesigned the entire theme system with improved editor contrast."
                },

                {
                    version:
                        "1.5.0",

                    date:
                        "2026-05-14",

                    text:
                        "Added additional syntax color improvements."
                }
            ]
        },


        {
            id: "jsyro-bracket-colorizer",
            name: "jsyro-bracket-colorizer",

            displayName:
                "Bracket Colorizer",

            publisher:
                "J-SYRO Community",

            version:
                "1.0.0",

            previousVersion:
                "1.0.0",

            price:
                0,

            currency:
                "USD",

            category:
                "productivity",

            categories: [
                "productivity",
                "languages"
            ],

            icon:
                "{}",

            verified:
                false,

            featured:
                true,

            rating:
                4.7,

            installs:
                7310,

            description:
                "Makes nested brackets easier to understand while working on large code files.",

            features: [
                "Bracket highlighting",
                "Nested scope visualization",
                "Editor integration",
                "JavaScript support",
                "CSS support"
            ],

            permissions: [
                "editor"
            ],

            readme: {
                heading:
                    "Bracket Colorizer",

                paragraphs: [
                    "Bracket Colorizer helps developers understand nested code structures.",
                    "It integrates with the J-SYRO editor without requesting workspace write access."
                ]
            },

            changelog: [
                {
                    version:
                        "1.0.0",

                    date:
                        "2026-07-01",

                    text:
                        "Initial public release."
                }
            ]
        },


        {
            id: "jsyro-json-tools",
            name: "jsyro-json-tools",

            displayName:
                "JSON Tools",

            publisher:
                "J-SYRO Labs",

            version:
                "1.4.0",

            previousVersion:
                "1.3.0",

            price:
                0,

            currency:
                "USD",

            category:
                "languages",

            categories: [
                "languages",
                "formatters",
                "productivity"
            ],

            icon:
                "{ }",

            verified:
                true,

            featured:
                false,

            rating:
                4.6,

            installs:
                5120,

            description:
                "Useful JSON formatting, validation and editing tools for J-SYRO.",

            features: [
                "JSON formatting",
                "JSON validation",
                "Minify JSON",
                "Pretty print JSON",
                "Editor commands"
            ],

            permissions: [
                "workspace.read",
                "editor",
                "commands"
            ],

            readme: {
                heading:
                    "JSON Tools",

                paragraphs: [
                    "JSON Tools adds convenient JSON utilities to your J-SYRO workspace.",
                    "Use commands to format, validate and minify JSON files."
                ]
            },

            changelog: [
                {
                    version:
                        "1.4.0",

                    date:
                        "2026-08-02",

                    text:
                        "Improved validation messages and added minify command."
                },

                {
                    version:
                        "1.3.0",

                    date:
                        "2026-06-18",

                    text:
                        "Added JSON pretty-print support."
                }
            ]
        },


        {
            id: "jsyro-code-snippets",
            name: "jsyro-code-snippets",

            displayName:
                "Web Code Snippets",

            publisher:
                "J-SYRO Community",

            version:
                "3.1.0",

            previousVersion:
                "3.0.0",

            price:
                0,

            currency:
                "USD",

            category:
                "snippets",

            categories: [
                "snippets",
                "productivity",
                "languages"
            ],

            icon:
                "</>",

            verified:
                false,

            featured:
                false,

            rating:
                4.9,

            installs:
                22140,

            description:
                "A collection of useful HTML, CSS and JavaScript snippets for faster development.",

            features: [
                "HTML snippets",
                "CSS snippets",
                "JavaScript snippets",
                "Component snippets",
                "Quick insertion"
            ],

            permissions: [
                "snippets",
                "editor"
            ],

            readme: {
                heading:
                    "Web Code Snippets",

                paragraphs: [
                    "Speed up your web development workflow with reusable code snippets.",
                    "The extension only accesses the editor and snippet APIs."
                ]
            },

            changelog: [
                {
                    version:
                        "3.1.0",

                    date:
                        "2026-08-05",

                    text:
                        "Added new JavaScript and responsive CSS snippets."
                }
            ]
        },


        {
            id: "jsyro-eslint-lite",
            name: "jsyro-eslint-lite",

            displayName:
                "JS Lint Lite",

            publisher:
                "J-SYRO Labs",

            version:
                "1.1.0",

            previousVersion:
                "1.0.0",

            price:
                0,

            currency:
                "USD",

            category:
                "linters",

            categories: [
                "linters",
                "languages"
            ],

            icon:
                "✓",

            verified:
                true,

            featured:
                false,

            rating:
                4.5,

            installs:
                4630,

            description:
                "Lightweight JavaScript linting for everyday J-SYRO projects.",

            features: [
                "JavaScript diagnostics",
                "Common error detection",
                "Editor warnings",
                "Configurable rules"
            ],

            permissions: [
                "workspace.read",
                "editor"
            ],

            readme: {
                heading:
                    "JS Lint Lite",

                paragraphs: [
                    "JS Lint Lite provides lightweight JavaScript diagnostics.",
                    "It is designed to remain fast while working inside browser-based J-SYRO projects."
                ]
            },

            changelog: [
                {
                    version:
                        "1.1.0",

                    date:
                        "2026-07-25",

                    text:
                        "Improved diagnostic detection."
                }
            ]
        },


        {
            id: "jsyro-git-tools",
            name: "jsyro-git-tools",

            displayName:
                "Git Tools",

            publisher:
                "J-SYRO Labs",

            version:
                "1.0.0",

            previousVersion:
                "1.0.0",

            price:
                4.99,

            currency:
                "USD",

            category:
                "git",

            categories: [
                "git",
                "productivity"
            ],

            icon:
                "⑂",

            verified:
                true,

            featured:
                false,

            rating:
                4.8,

            installs:
                3480,

            description:
                "Git workflow tools designed for the J-SYRO coding workspace.",

            features: [
                "Git status panel",
                "Commit helper",
                "Branch information",
                "Change overview",
                "Git workspace panel"
            ],

            permissions: [
                "workspace.read",
                "commands",
                "panels",
                "git"
            ],

            readme: {
                heading:
                    "Git Tools",

                paragraphs: [
                    "Git Tools brings common Git workflow features into the J-SYRO workspace.",
                    "Some capabilities require additional J-SYRO Git integration."
                ]
            },

            changelog: [
                {
                    version:
                        "1.0.0",

                    date:
                        "2026-08-01",

                    text:
                        "Initial release."
                }
            ]
        },


        {
            id: "jsyro-ai-helper",
            name: "jsyro-ai-helper",

            displayName:
                "AI Coding Helper",

            publisher:
                "J-SYRO AI",

            version:
                "1.3.0",

            previousVersion:
                "1.2.0",

            price:
                4.99,

            currency:
                "USD",

            category:
                "ai",

            categories: [
                "ai",
                "productivity"
            ],

            icon:
                "✦",

            verified:
                true,

            featured:
                false,

            rating:
                4.9,

            installs:
                11850,

            description:
                "AI-assisted coding tools for explaining, improving and working with your project code.",

            features: [
                "Code explanations",
                "Code suggestions",
                "Editor actions",
                "Project-aware assistance",
                "AI command palette integration"
            ],

            permissions: [
                "workspace.read",
                "editor",
                "commands",
                "ai"
            ],

            readme: {
                heading:
                    "AI Coding Helper",

                paragraphs: [
                    "AI Coding Helper is designed as a J-SYRO extension rather than a separate editor.",
                    "Its architecture allows future J-SYRO AI services to be connected without changing the extension marketplace."
                ]
            },

            changelog: [
                {
                    version:
                        "1.3.0",

                    date:
                        "2026-08-14",

                    text:
                        "Improved project context handling."
                },

                {
                    version:
                        "1.2.0",

                    date:
                        "2026-07-12",

                    text:
                        "Added editor actions."
                }
            ]
        }

    ];


    /*
     * =====================================================
     * INTERNAL HELPERS
     * =====================================================
     */

    function cloneExtension(
        extension
    ) {

        return JSON.parse(
            JSON.stringify(
                extension
            )
        );

    }


    function normalizeQuery(
        query
    ) {

        return String(
            query || ""
        )
            .trim()
            .toLowerCase();

    }


    function matchesSearch(
        extension,
        query
    ) {

        if (!query) {
            return true;
        }


        const searchableText = [

            extension.name,

            extension.displayName,

            extension.publisher,

            extension.description,

            extension.category,

            ...(extension.categories || [])

        ]
            .join(" ")
            .toLowerCase();


        return searchableText.includes(
            query
        );

    }


    function matchesCategory(
        extension,
        category
    ) {

        if (
            !category ||
            category === "all"
        ) {

            return true;

        }


        return (
            extension.category ===
            category
        ) ||
        (
            extension.categories ||
            []
        ).includes(
            category
        );

    }


    function compareExtensions(
        a,
        b,
        sort
    ) {

        switch (sort) {

            case "rating":

                return (
                    b.rating -
                    a.rating
                );


            case "newest":

                return (
                    String(b.version)
                        .localeCompare(
                            String(a.version),
                            undefined,
                            {
                                numeric: true
                            }
                        )
                );


            case "name":

                return (
                    a.displayName
                        .localeCompare(
                            b.displayName
                        )
                );


            case "price-low":

                return (
                    a.price -
                    b.price
                );


            case "popular":
            default:

                return (
                    b.installs -
                    a.installs
                );

        }

    }


    /*
     * =====================================================
     * PUBLIC STORE API
     * =====================================================
     */

    function getAll() {

        return extensions.map(
            cloneExtension
        );

    }


    function getById(
        extensionId
    ) {

        const extension =
            extensions.find(
                item =>
                    item.id ===
                    extensionId
            );


        return extension
            ? cloneExtension(
                extension
            )
            : null;

    }


    function search(
        options = {}
    ) {

        const query =
            normalizeQuery(
                options.query
            );

        const category =
            options.category ||
            "all";

        const sort =
            options.sort ||
            "popular";


        return extensions

            .filter(
                extension =>
                    matchesSearch(
                        extension,
                        query
                    )
            )

            .filter(
                extension =>
                    matchesCategory(
                        extension,
                        category
                    )
            )

            .sort(
                (
                    a,
                    b
                ) =>
                    compareExtensions(
                        a,
                        b,
                        sort
                    )
            )

            .map(
                cloneExtension
            );

    }


    function getFeatured() {

        return extensions

            .filter(
                extension =>
                    extension.featured
            )

            .sort(
                (
                    a,
                    b
                ) =>
                    b.rating -
                    a.rating
            )

            .map(
                cloneExtension
            );

    }


    function getCategories() {

        const categories =
            new Set();


        extensions.forEach(
            extension => {

                if (
                    extension.category
                ) {

                    categories.add(
                        extension.category
                    );

                }


                (
                    extension.categories ||
                    []
                ).forEach(
                    category =>
                        categories.add(
                            category
                        )
                );

            }
        );


        return [
            ...categories
        ].sort();

    }


    function getLatestVersion(
        extensionId
    ) {

        const extension =
            extensions.find(
                item =>
                    item.id ===
                    extensionId
            );


        return extension
            ? extension.version
            : null;

    }


    function hasUpdate(
        extensionId,
        installedVersion
    ) {

        const latest =
            getLatestVersion(
                extensionId
            );


        if (!latest) {
            return false;
        }


        return (
            compareVersions(
                latest,
                installedVersion
            ) > 0
        );

    }


    function compareVersions(
        first,
        second
    ) {

        const a =
            String(first || "0")
                .split(".")
                .map(
                    Number
                );

        const b =
            String(second || "0")
                .split(".")
                .map(
                    Number
                );


        const length =
            Math.max(
                a.length,
                b.length
            );


        for (
            let i = 0;
            i < length;
            i++
        ) {

            const av =
                Number.isFinite(
                    a[i]
                )
                    ? a[i]
                    : 0;

            const bv =
                Number.isFinite(
                    b[i]
                )
                    ? b[i]
                    : 0;


            if (
                av > bv
            ) {

                return 1;

            }


            if (
                av < bv
            ) {

                return -1;

            }

        }


        return 0;

    }


    /*
     * =====================================================
     * REMOTE STORE READY INTERFACE
     * =====================================================
     *
     * Future server integration can replace these
     * functions without changing the UI layer.
     */

    async function fetchRemoteMarketplace(
        endpoint
    ) {

        if (!endpoint) {

            throw new Error(
                "Marketplace endpoint is required."
            );

        }


        const response =
            await fetch(
                endpoint,
                {
                    method:
                        "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                `Marketplace request failed: ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            !Array.isArray(
                data.extensions
            )
        ) {

            throw new Error(
                "Invalid marketplace response."
            );

        }


        return data.extensions;

    }


    /*
     * =====================================================
     * STORE OBJECT
     * =====================================================
     */

    const store = {

        version:
            STORE_VERSION,

        getAll,

        getById,

        search,

        getFeatured,

        getCategories,

        getLatestVersion,

        hasUpdate,

        compareVersions,

        fetchRemoteMarketplace

    };


    window.jSyroExtensionStore =
        store;


})();
