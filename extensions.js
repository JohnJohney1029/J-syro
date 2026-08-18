/* =========================================
   J-SYRO EXTENSIONS — extensions.js
   Keeps the existing HTML/CSS structure intact.
========================================= */

(() => {
    "use strict";

    const extensions = [
        {
            id: "web-code-snippets",
            name: "Web Code Snippets",
            publisher: "J-SYRO Community",
            category: "productivity",
            icon: "</>",
            description: "A collection of useful HTML, CSS and JavaScript snippets for faster development.",
            rating: 4.9,
            installs: 22100,
            version: "3.1.0",
            price: 0,
            verified: false,
            featured: true,
            updated: "2026-08-10",
            features: [
                "Ready-to-use HTML, CSS and JavaScript snippets",
                "Fast insertion into the active editor",
                "Organized snippet collection"
            ],
            permissions: [
                ["Editor access", "Insert and manage snippets in the active editor."],
                ["Workspace access", "Read the current workspace context when required."]
            ],
            readme: "<h3>Web Code Snippets</h3><p>Useful front-end snippets for everyday J-SYRO development. Browse the collection and insert common patterns without leaving your workspace.</p>",
            changelog: "<h3>3.1.0</h3><p>Improved snippet organization and editor compatibility.</p>"
        },
        {
            id: "jsyro-prettier",
            name: "J-SYRO Prettier",
            publisher: "J-SYRO",
            category: "formatters",
            icon: "✦",
            description: "Format your HTML, CSS and JavaScript projects directly inside J-SYRO.",
            rating: 4.9,
            installs: 18400,
            version: "1.2.0",
            price: 0,
            verified: true,
            featured: true,
            updated: "2026-08-12",
            features: [
                "Format HTML, CSS and JavaScript",
                "Consistent project formatting",
                "Format-on-save support"
            ],
            permissions: [
                ["Editor access", "Read and format the active file."],
                ["Workspace access", "Apply formatting to workspace files."]
            ],
            readme: "<h3>J-SYRO Prettier</h3><p>Keep your project files consistently formatted with a J-SYRO-native formatting workflow.</p>",
            changelog: "<h3>1.2.0</h3><p>Improved formatting stability across workspace files.</p>"
        },
        {
            id: "ai-coding-helper",
            name: "AI Coding Helper",
            publisher: "J-SYRO AI",
            category: "ai",
            icon: "✦",
            description: "AI-assisted coding tools for explaining, improving and working with your project code.",
            rating: 4.9,
            installs: 11800,
            version: "1.3.0",
            price: 4.99,
            verified: true,
            featured: true,
            updated: "2026-08-14",
            features: [
                "Explain selected code",
                "Suggest code improvements",
                "Generate coding assistance in context"
            ],
            permissions: [
                ["Editor access", "Read selected code for AI assistance."],
                ["Network access", "Connect to the configured AI service."]
            ],
            readme: "<h3>AI Coding Helper</h3><p>AI-assisted tools for understanding and improving code while staying inside the J-SYRO workspace.</p>",
            changelog: "<h3>1.3.0</h3><p>Improved coding explanations and project context handling.</p>"
        },
        {
            id: "dark-pro-theme",
            name: "Dark Pro Theme",
            publisher: "J-SYRO Themes",
            category: "themes",
            icon: "◐",
            description: "A polished dark theme designed for long coding sessions in J-SYRO.",
            rating: 4.8,
            installs: 9300,
            version: "2.0.0",
            price: 4.99,
            verified: true,
            featured: false,
            updated: "2026-08-08",
            features: [
                "Low-contrast dark interface",
                "Editor-focused color palette",
                "Workspace-wide theme support"
            ],
            permissions: [
                ["Theme access", "Apply visual theme settings to J-SYRO."]
            ],
            readme: "<h3>Dark Pro Theme</h3><p>A refined dark theme built for comfortable, extended coding sessions.</p>",
            changelog: "<h3>2.0.0</h3><p>Updated colors and improved editor contrast.</p>"
        },
        {
            id: "bracket-colorizer",
            name: "Bracket Colorizer",
            publisher: "J-SYRO Community",
            category: "productivity",
            icon: "{}",
            description: "Makes nested brackets easier to understand while working on large code files.",
            rating: 4.7,
            installs: 7300,
            version: "1.0.0",
            price: 0,
            verified: false,
            featured: false,
            updated: "2026-08-06",
            features: [
                "Color-coded bracket pairs",
                "Nested scope highlighting",
                "Lightweight editor integration"
            ],
            permissions: [
                ["Editor access", "Read syntax information for bracket highlighting."]
            ],
            readme: "<h3>Bracket Colorizer</h3><p>Improve readability in deeply nested code with clear bracket matching and highlighting.</p>",
            changelog: "<h3>1.0.0</h3><p>Initial marketplace release.</p>"
        },
        {
            id: "json-tools",
            name: "JSON Tools",
            publisher: "J-SYRO Labs",
            category: "formatters",
            icon: "{ }",
            description: "Useful JSON formatting, validation and editing tools for J-SYRO.",
            rating: 4.6,
            installs: 5100,
            version: "1.4.0",
            price: 0,
            verified: true,
            featured: false,
            updated: "2026-08-09",
            features: [
                "Format JSON",
                "Validate JSON documents",
                "Quick JSON editing helpers"
            ],
            permissions: [
                ["Editor access", "Read and modify JSON documents."]
            ],
            readme: "<h3>JSON Tools</h3><p>Formatting and validation utilities for JSON files inside J-SYRO.</p>",
            changelog: "<h3>1.4.0</h3><p>Improved validation messages and formatting.</p>"
        },
        {
            id: "js-lint-lite",
            name: "JS Lint Lite",
            publisher: "J-SYRO Labs",
            category: "linters",
            icon: "✓",
            description: "Lightweight JavaScript linting for everyday J-SYRO projects.",
            rating: 4.5,
            installs: 4600,
            version: "1.1.0",
            price: 0,
            verified: true,
            featured: false,
            updated: "2026-08-07",
            features: [
                "Fast JavaScript checks",
                "Inline diagnostics",
                "Simple project configuration"
            ],
            permissions: [
                ["Editor access", "Read JavaScript files for diagnostics."]
            ],
            readme: "<h3>JS Lint Lite</h3><p>A lightweight JavaScript linting experience for everyday projects.</p>",
            changelog: "<h3>1.1.0</h3><p>Improved diagnostics and editor integration.</p>"
        },
        {
            id: "git-tools",
            name: "Git Tools",
            publisher: "J-SYRO Labs",
            category: "git",
            icon: "┤",
            description: "Git workflow tools designed for the J-SYRO coding workspace.",
            rating: 4.8,
            installs: 3500,
            version: "1.0.0",
            price: 4.99,
            verified: true,
            featured: false,
            updated: "2026-08-13",
            features: [
                "Quick Git status",
                "Commit and branch helpers",
                "Workspace Git actions"
            ],
            permissions: [
                ["Workspace access", "Read workspace files and project state."],
                ["Git access", "Run approved Git workspace operations."]
            ],
            readme: "<h3>Git Tools</h3><p>Common Git workflow actions brought directly into the J-SYRO coding workspace.</p>",
            changelog: "<h3>1.0.0</h3><p>Initial marketplace release.</p>"
        }
    ];

    const state = {
        view: "marketplace",
        category: "all",
        search: "",
        sort: "popular",
        installed: new Set()
    };

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => Array.from(document.querySelectorAll(selector));

    const marketplaceGrid = $("#extensionsGrid");
    const featuredGrid = $("#featuredExtensions");
    const installedGrid = $("#installedGrid");
    const updatesGrid = $("#updatesGrid");

    const marketplaceEmpty = $("#marketplaceEmpty");
    const installedEmpty = $("#installedEmpty");
    const updatesEmpty = $("#updatesEmpty");

    const installedCount = $("#installedCount");
    const updatesCount = $("#updatesCount");
    const resultsCount = $("#resultsCount");

    const modal = $("#extensionDetailsModal");
    const modalName = $("#extensionDetailsName");
    const modalPublisher = $("#extensionDetailsPublisher");
    const modalIcon = $("#extensionDetailsIcon");
    const modalRating = $("#extensionDetailsRating");
    const modalInstalls = $("#extensionDetailsInstalls");
    const modalVersion = $("#extensionDetailsVersion");
    const modalDescription = $("#extensionDetailsDescription");
    const modalFeatures = $("#extensionDetailsFeatures");
    const modalPermissions = $("#extensionPermissionsList");
    const modalReadme = $("#extensionReadmeContent");
    const modalChangelog = $("#extensionChangelogContent");
    const modalPriceBadge = $("#extensionPriceBadge");
    const modalPrice = $("#extensionPrice");
    const modalPrimary = $("#extensionPrimaryAction");
    const modalSecondary = $("#extensionSecondaryAction");
    const verifiedBadge = $("#extensionVerifiedBadge");

    let currentModalId = null;
    let toastTimer = null;

    function formatInstalls(value) {
        if (value >= 1000000) return (value / 1000000).toFixed(1).replace(".0", "") + "M";
        if (value >= 1000) return (value / 1000).toFixed(1).replace(".0", "") + "K";
        return String(value);
    }

    function priceText(extension) {
        return extension.price > 0 ? `$${extension.price.toFixed(2)}` : "Free";
    }

    function matches(extension) {
        const search = state.search.trim().toLowerCase();

        const categoryMatch =
            state.category === "all" ||
            extension.category === state.category;

        if (!categoryMatch) return false;

        if (!search) return true;

        return [
            extension.name,
            extension.publisher,
            extension.description,
            extension.category
        ].some(value => value.toLowerCase().includes(search));
    }

    function sortExtensions(items) {
        const list = [...items];

        switch (state.sort) {
            case "rating":
                return list.sort((a, b) => b.rating - a.rating);
            case "newest":
                return list.sort((a, b) => new Date(b.updated) - new Date(a.updated));
            case "name":
                return list.sort((a, b) => a.name.localeCompare(b.name));
            case "price-low":
                return list.sort((a, b) => a.price - b.price || b.rating - a.rating);
            case "popular":
            default:
                return list.sort((a, b) => b.installs - a.installs);
        }
    }

    function buttonMarkup(extension) {
        const installed = state.installed.has(extension.id);

        if (installed) {
            return `
                <div class="extension-actions">
                    <button class="extension-button secondary" data-action="details" data-id="${extension.id}" type="button">Details</button>
                    <button class="extension-button danger" data-action="uninstall" data-id="${extension.id}" type="button">Uninstall</button>
                </div>
            `;
        }

        return `
            <div class="extension-actions">
                <button class="extension-button secondary" data-action="details" data-id="${extension.id}" type="button">Details</button>
                <button class="extension-button primary" data-action="install" data-id="${extension.id}" type="button">Install</button>
            </div>
        `;
    }

    function cardMarkup(extension, options = {}) {
        const installed = state.installed.has(extension.id);
        const showFeatured = options.featured === true;

        return `
            <article class="extension-card${showFeatured ? " featured" : ""}" data-extension-id="${extension.id}">
                ${installed ? `<span class="extension-installed-badge">Installed</span>` : ""}

                <div class="extension-card-header">
                    <div class="extension-icon">${extension.icon}</div>

                    <div class="extension-title-area">
                        <div class="extension-name">
                            ${escapeHtml(extension.name)}
                            ${extension.verified ? `<span class="verified-badge">✓ Verified</span>` : ""}
                        </div>

                        <div class="extension-publisher">
                            ${escapeHtml(extension.publisher)}
                        </div>
                    </div>
                </div>

                <p class="extension-description">
                    ${escapeHtml(extension.description)}
                </p>

                <div class="extension-stats">
                    <span class="extension-rating">★ ${extension.rating.toFixed(1)}</span>
                    <span>${formatInstalls(extension.installs)} installs</span>
                    <span class="version-badge">v${escapeHtml(extension.version)}</span>
                </div>

                <div class="extension-card-footer">
                    <div class="extension-price">
                        <span class="price-badge ${extension.price > 0 ? "paid" : "free"}">
                            ${extension.price > 0 ? "PRO" : "FREE"}
                        </span>
                        <strong>${extension.price > 0 ? `$${extension.price.toFixed(2)}` : "Free"}</strong>
                    </div>

                    ${buttonMarkup(extension)}
                </div>
            </article>
        `;
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

   function renderMarketplace() {
    const filtered = sortExtensions(
        extensions.filter(matches)
    );

    /*
     * PAID EXTENSIONS
     * Sirf Featured section mein.
     */
    const featured = filtered.filter(extension =>
        Number(extension.price) > 0
    );

    /*
     * FREE EXTENSIONS
     * Neeche All Extensions mein.
     */
    const marketplaceItems = filtered.filter(extension =>
        Number(extension.price) === 0
    );

    if (resultsCount) {
        resultsCount.textContent =
            `${marketplaceItems.length} extension${marketplaceItems.length === 1 ? "" : "s"}`;
    }

    /*
     * ALL EXTENSIONS
     * Paid yahan nahi aayengi.
     */
    if (marketplaceGrid) {
        marketplaceGrid.innerHTML =
            marketplaceItems
                .map(extension => cardMarkup(extension))
                .join("");
    }

    if (marketplaceEmpty) {
        marketplaceEmpty.hidden =
            marketplaceItems.length !== 0;
    }

    /*
     * FEATURED
     * Paid extensions sirf yahan.
     */
    if (featuredGrid) {
        featuredGrid.innerHTML =
            featured
                .map(extension =>
                    cardMarkup(extension, {
                        featured: true
                    })
                )
                .join("");
    }

    const featuredSection = $("#featuredSection");

    if (featuredSection) {
        featuredSection.hidden =
            featured.length === 0;
    }
}

    function renderAll() {
        renderMarketplace();
        renderInstalled();
        renderUpdates();
        renderCounts();
        updateViewVisibility();
    }

    function updateViewVisibility() {
        $$(".extension-view").forEach(view => view.classList.remove("active"));

        const target = $(`#${state.view}View`);
        if (target) target.classList.add("active");

        $$(".sidebar-item").forEach(item => {
            item.classList.toggle("active", item.dataset.view === state.view);
        });
    }

    function showToast(message, icon = "✓") {
        const toast = $("#extensionToast");
        const messageEl = $("#extensionToastMessage");
        const iconEl = $("#extensionToastIcon");

        if (!toast || !messageEl) return;

        messageEl.textContent = message;
        if (iconEl) iconEl.textContent = icon;

        toast.classList.add("show");

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }

    function openDetails(id) {
        const extension = extensions.find(item => item.id === id);
        if (!extension || !modal) return;

        currentModalId = id;

        modalName.textContent = extension.name;
        modalPublisher.textContent = extension.publisher;
        modalIcon.textContent = extension.icon;
        modalRating.textContent = `★ ${extension.rating.toFixed(1)}`;
        modalInstalls.textContent = `${formatInstalls(extension.installs)} installs`;
        modalVersion.textContent = `v${extension.version}`;
        modalDescription.textContent = extension.description;

        modalFeatures.innerHTML = extension.features
            .map(feature => `<li>${escapeHtml(feature)}</li>`)
            .join("");

        modalPermissions.innerHTML = extension.permissions
            .map(permission => `
                <div class="permission-item">
                    <strong>${escapeHtml(permission[0])}</strong>
                    <span>${escapeHtml(permission[1])}</span>
                </div>
            `)
            .join("");

        modalReadme.innerHTML = extension.readme;
        modalChangelog.innerHTML = extension.changelog;

        if (verifiedBadge) {
            verifiedBadge.hidden = !extension.verified;
        }

        if (extension.price > 0) {
            modalPriceBadge.textContent = "PRO";
            modalPriceBadge.className = "price-badge paid";
            modalPrice.textContent = `$${extension.price.toFixed(2)}`;
        } else {
            modalPriceBadge.textContent = "FREE";
            modalPriceBadge.className = "price-badge free";
            modalPrice.textContent = "Free";
        }

        const installed = state.installed.has(extension.id);
        modalPrimary.textContent = installed ? "Uninstall" : "Install";
        modalPrimary.className = `extension-button ${installed ? "danger" : "primary"}`;

        modalSecondary.textContent = "Close";
        modalSecondary.className = "extension-button secondary";

        $$(".details-tab").forEach(tab => {
            tab.classList.toggle("active", tab.dataset.detailsTab === "overview");
        });

        $$(".details-tab-content").forEach(content => {
            content.classList.toggle("active", content.id === "detailsOverview");
        });

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeDetails() {
        if (!modal) return;

        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        currentModalId = null;
    }

    function installExtension(id) {
        const extension = extensions.find(item => item.id === id);
        if (!extension) return;

        state.installed.add(id);
        saveInstalled();
        renderAll();
        showToast(`${extension.name} installed`);

        if (currentModalId === id) {
            openDetails(id);
        }
    }

    function uninstallExtension(id) {
        const extension = extensions.find(item => item.id === id);
        if (!extension) return;

        state.installed.delete(id);
        saveInstalled();
        renderAll();
        showToast(`${extension.name} uninstalled`);

        if (currentModalId === id) {
            openDetails(id);
        }
    }

    function saveInstalled() {
        try {
            localStorage.setItem(
                "jsyro-installed-extensions",
                JSON.stringify([...state.installed])
            );
        } catch (_) {}
    }

    function loadInstalled() {
        try {
            const saved = JSON.parse(
                localStorage.getItem("jsyro-installed-extensions") || "[]"
            );

            if (Array.isArray(saved)) {
                saved.forEach(id => {
                    if (extensions.some(extension => extension.id === id)) {
                        state.installed.add(id);
                    }
                });
            }
        } catch (_) {}
    }

    function bindEvents() {
        $$(".sidebar-item").forEach(item => {
            item.addEventListener("click", () => {
                state.view = item.dataset.view;
                renderAll();
            });
        });

        $$(".category-item").forEach(item => {
            item.addEventListener("click", () => {
                state.category = item.dataset.category;

                $$(".category-item").forEach(category => {
                    category.classList.toggle(
                        "active",
                        category.dataset.category === state.category
                    );
                });

                state.view = "marketplace";
                renderAll();
            });
        });

        const search = $("#extensionSearch");
        if (search) {
            search.addEventListener("input", event => {
                state.search = event.target.value;
                state.view = "marketplace";
                renderAll();
            });
        }

        const sort = $("#sortExtensions");
        if (sort) {
            sort.addEventListener("change", event => {
                state.sort = event.target.value;
                renderAll();
            });
        }

        document.addEventListener("click", event => {
            const actionButton = event.target.closest("[data-action]");
            if (!actionButton) return;

            const id = actionButton.dataset.id;
            const action = actionButton.dataset.action;

            if (action === "details") openDetails(id);
            if (action === "install") installExtension(id);
            if (action === "uninstall") uninstallExtension(id);
        });

        $("#closeExtensionDetails")?.addEventListener("click", closeDetails);
        $(".modal-backdrop")?.addEventListener("click", closeDetails);

        modalSecondary?.addEventListener("click", closeDetails);

        modalPrimary?.addEventListener("click", () => {
            if (!currentModalId) return;

            if (state.installed.has(currentModalId)) {
                uninstallExtension(currentModalId);
            } else {
                installExtension(currentModalId);
            }
        });

        $$(".details-tab").forEach(tab => {
            tab.addEventListener("click", () => {
                const target = tab.dataset.detailsTab;

                $$(".details-tab").forEach(item => {
                    item.classList.toggle("active", item === tab);
                });

                $$(".details-tab-content").forEach(content => {
                    content.classList.toggle(
                        "active",
                        content.id === `details${target.charAt(0).toUpperCase()}${target.slice(1)}`
                    );
                });
            });
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && modal?.classList.contains("open")) {
                closeDetails();
            }

            if (
                event.key === "/" &&
                !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)
            ) {
                event.preventDefault();
                search?.focus();
            }
        });

        $("#browseMarketplaceBtn")?.addEventListener("click", () => {
            state.view = "marketplace";
            renderAll();
        });

        $("#refreshMarketplaceBtn")?.addEventListener("click", () => {
            renderAll();
            showToast("Marketplace refreshed");
        });
    }

    function init() {
        loadInstalled();
        bindEvents();
        renderAll();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
