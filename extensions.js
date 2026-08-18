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
            featured: true,
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
            featured: true,
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
        installed: new Set(),
        unlockedPaid: new Set()
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
        const paid = extension.price > 0;
        const unlocked = state.unlockedPaid.has(extension.id);

        if (installed) {
            return `
                <div class="extension-actions">
                    <button class="extension-button secondary" data-action="details" data-id="${extension.id}" type="button">Details</button>
                    <button class="extension-button danger" data-action="uninstall" data-id="${extension.id}" type="button">Uninstall</button>
                </div>
            `;
        }

        const actionLabel = paid && !unlocked
            ? `🔒 Lock $${extension.price.toFixed(2)}`
            : "Install";

        return `
            <div class="extension-actions">
                <button class="extension-button secondary" data-action="details" data-id="${extension.id}" type="button">Details</button>
                <button class="extension-button primary" data-action="install" data-id="${extension.id}" type="button">${actionLabel}</button>
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
        // Paid extensions live only in the Recommended/Featured row.
        // The Marketplace list contains free extensions only, so paid cards
        // are never duplicated lower down.
        const filtered = sortExtensions(
            extensions.filter(extension => extension.price === 0 && matches(extension))
        );

        if (resultsCount) {
            resultsCount.textContent = `${filtered.length} extension${filtered.length === 1 ? "" : "s"}`;
        }

        if (marketplaceGrid) {
            marketplaceGrid.innerHTML = filtered.map(extension => cardMarkup(extension)).join("");
        }

        if (marketplaceEmpty) {
            marketplaceEmpty.hidden = filtered.length !== 0;
        }

        const featured = extensions.filter(extension =>
            extension.featured &&
            extension.price > 0 &&
            (state.category === "all" || extension.category === state.category) &&
            (!state.search.trim() || matches(extension))
        );

        if (featuredGrid) {
            featuredGrid.innerHTML = featured.map(extension =>
                cardMarkup(extension, { featured: true })
            ).join("");
        }

        const featuredSection = $("#featuredSection");
        if (featuredSection) {
            featuredSection.hidden = featured.length === 0;
        }
    }

    function renderInstalled() {
        const installed = extensions.filter(extension => state.installed.has(extension.id));

        if (installedGrid) {
            installedGrid.innerHTML = installed.map(extension => cardMarkup(extension)).join("");
        }

        if (installedEmpty) {
            installedEmpty.hidden = installed.length !== 0;
        }
    }

    function renderUpdates() {
        // In this local marketplace, installed extensions with a newer catalog
        // version are treated as available updates.
        const updates = extensions.filter(extension =>
            state.installed.has(extension.id) && extension.id.endsWith("-update")
        );

        if (updatesGrid) {
            updatesGrid.innerHTML = updates.map(extension => cardMarkup(extension)).join("");
        }

        if (updatesEmpty) {
            updatesEmpty.hidden = updates.length !== 0;
        }
    }

    function renderCounts() {
        if (installedCount) {
            installedCount.textContent = String(state.installed.size);
        }

        if (updatesCount) {
            updatesCount.textContent = "0";
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
        const paid = extension.price > 0;
        const unlocked = state.unlockedPaid.has(extension.id);

        if (installed) {
            modalPrimary.textContent = "Uninstall";
            modalPrimary.className = "extension-button danger";
        } else if (paid && !unlocked) {
            modalPrimary.textContent = `🔒 Lock $${extension.price.toFixed(2)}`;
            modalPrimary.className = "extension-button primary";
        } else {
            modalPrimary.textContent = "Install";
            modalPrimary.className = "extension-button primary";
        }

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

        // Hard gate: paid extensions can NEVER be installed before payment.
        if (extension.price > 0 && !state.unlockedPaid.has(extension.id)) {
            openExtensionPayment(extension);
            return;
        }

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
            const savedInstalled = JSON.parse(
                localStorage.getItem("jsyro-installed-extensions") || "[]"
            );
            const savedUnlocked = JSON.parse(
                localStorage.getItem("jsyro-paid-extensions") || "[]"
            );

            if (Array.isArray(savedUnlocked)) {
                savedUnlocked.forEach(id => {
                    const extension = extensions.find(item => item.id === id);
                    if (extension && extension.price > 0) {
                        state.unlockedPaid.add(id);
                    }
                });
            }

            if (Array.isArray(savedInstalled)) {
                savedInstalled.forEach(id => {
                    const extension = extensions.find(item => item.id === id);
                    if (!extension) return;

                    // Remove any paid extension that was installed by the old
                    // broken flow without a recorded payment.
                    if (extension.price > 0 && !state.unlockedPaid.has(id)) return;

                    state.installed.add(id);
                });
            }
        } catch (_) {}
    }

    function saveUnlockedPaid() {
        try {
            localStorage.setItem(
                "jsyro-paid-extensions",
                JSON.stringify([...state.unlockedPaid])
            );
        } catch (_) {}
    }

    function getAccountEmail() {
        const candidates = [
            window.currentUser?.email,
            window.user?.email,
            window.jSyroUser?.email,
            window.jsyroUser?.email
        ];

        for (const value of candidates) {
            if (typeof value === "string" && value.includes("@")) return value;
        }

        for (const key of ["jsyro-user", "jsyroUser", "currentUser", "user"]) {
            try {
                const raw = localStorage.getItem(key);
                if (!raw) continue;
                const parsed = JSON.parse(raw);
                if (typeof parsed?.email === "string" && parsed.email.includes("@")) {
                    return parsed.email;
                }
            } catch (_) {}
        }

        const identity = $("#userIdentity")?.textContent?.trim() || "";
        return identity.includes("@") ? identity : "";
    }

    function ensureExtensionPaymentStyles() {
        if ($("#extensionPaymentStyles")) return;

        const style = document.createElement("style");
        style.id = "extensionPaymentStyles";
        style.textContent = `
            #extensionPaymentModal {
                position: fixed;
                inset: 0;
                z-index: 10000000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background: rgba(3, 6, 11, .72);
                backdrop-filter: blur(8px);
            }
            #extensionPaymentModal.open { display: flex; }
            .extension-payment-card {
                width: min(775px, calc(100vw - 28px));
                max-height: calc(100vh - 28px);
                overflow-y: auto;
                position: relative;
                background: #fff;
                color: #343744;
                border-radius: 20px;
                box-shadow: 0 30px 90px rgba(0,0,0,.48);
            }
            .extension-payment-logo {
                width: 88px; height: 88px; border-radius: 50%;
                display: grid; place-items: center;
                position: relative; margin: -58px auto 28px;
                background: #0f1117; border: 7px solid #fff;
                color: #fff; font-size: 34px; font-weight: 800;
                box-shadow: 0 8px 24px rgba(0,0,0,.22);
            }
            .extension-payment-inner { padding: 58px 44px 28px; }
            .extension-payment-close {
                position:absolute; right:20px; top:20px; width:54px; height:54px;
                border:1px solid #dfe2e8; border-radius:50%; background:#f8f9fb;
                color:#6f7480; font-size:28px; cursor:pointer;
            }
            .extension-payment-title { text-align:center; font-size:34px; font-weight:800; margin:0 0 10px; }
            .extension-payment-subtitle { text-align:center; color:#8a8f9b; font-size:18px; margin-bottom:42px; }
            .extension-payment-plans { display:grid; gap:14px; }
            .extension-payment-plan {
                display:flex; align-items:center; gap:18px; padding:18px 22px;
                border:1px solid #e1ddff; border-radius:15px; background:#faf9ff;
                font-size:19px; font-weight:700; cursor:default;
            }
            .extension-payment-radio {
                width:27px; height:27px; border:2px solid #9297a2; border-radius:50%;
                display:grid; place-items:center; flex:0 0 27px;
            }
            .extension-payment-plan.selected .extension-payment-radio { border-color:#705dff; }
            .extension-payment-plan.selected .extension-payment-radio::after {
                content:""; width:13px; height:13px; border-radius:50%; background:#705dff;
            }
            .extension-payment-price { margin-left:auto; font-weight:800; }
            .extension-payment-divider { height:1px; background:#e4e6eb; margin:34px -44px 30px; }
            .extension-payment-label { display:block; font-size:17px; font-weight:700; margin-bottom:12px; }
            .extension-payment-email {
                width:100%; height:56px; padding:0 18px; border:1px solid #d7dae1;
                border-radius:12px; background:#fff; color:#555a66; font-size:18px; outline:none;
            }
            .extension-payment-secure {
                display:flex; align-items:center; gap:16px; margin-top:26px; padding:20px 22px;
                border:1px solid #e2ddff; border-radius:15px; background:#fbfaff;
            }
            .extension-payment-secure-icon {
                width:62px; height:62px; border-radius:13px; background:#eeeaff;
                display:grid; place-items:center; color:#6758ff; font-size:26px;
            }
            .extension-payment-secure strong { display:block; font-size:18px; margin-bottom:5px; }
            .extension-payment-secure span { color:#8c919d; font-size:15px; }
            .extension-payment-note { color:#858a96; font-size:16px; line-height:1.55; margin:30px 4px 26px; }
            .extension-payment-continue {
                width:100%; height:78px; border:0; border-radius:15px; cursor:pointer;
                color:#fff; background:linear-gradient(135deg,#6b59ff,#775fff);
                font-size:21px; font-weight:800; box-shadow:0 12px 28px rgba(102,84,255,.24);
            }
            .extension-payment-footer { text-align:center; color:#a0a4ad; font-size:14px; margin:24px 0 2px; }
            @media (max-width: 650px) {
                .extension-payment-inner { padding:52px 22px 24px; }
                .extension-payment-divider { margin-left:-22px; margin-right:-22px; }
                .extension-payment-title { font-size:28px; }
                .extension-payment-subtitle { font-size:15px; margin-bottom:28px; }
                .extension-payment-plan { font-size:15px; padding:15px; }
            }
        `;
        document.head.appendChild(style);
    }

    function openExtensionPayment(extension) {
        ensureExtensionPaymentStyles();

        let paymentModal = $("#extensionPaymentModal");
        if (!paymentModal) {
            paymentModal = document.createElement("div");
            paymentModal.id = "extensionPaymentModal";
            paymentModal.setAttribute("aria-hidden", "true");
            paymentModal.innerHTML = `
                <div class="extension-payment-card" role="dialog" aria-modal="true" aria-labelledby="extensionPaymentTitle">
                    <button class="extension-payment-close" type="button" aria-label="Close">×</button>
                    <div class="extension-payment-inner">
                        <div class="extension-payment-logo">JS</div>
                        <h2 id="extensionPaymentTitle" class="extension-payment-title">J-SYRO Subscription</h2>
                        <p class="extension-payment-subtitle">Choose your plan and continue to secure payment.</p>
                        <div class="extension-payment-plans">
                            <div class="extension-payment-plan selected">
                                <span class="extension-payment-radio"></span>
                                <span class="extension-payment-plan-name">PRO Templates</span>
                                <span class="extension-payment-price">$5.99</span>
                            </div>
                            <div class="extension-payment-plan">
                                <span class="extension-payment-radio"></span>
                                <span class="extension-payment-plan-name">Work Apps</span>
                                <span class="extension-payment-price">$7.99</span>
                            </div>
                            <div class="extension-payment-plan">
                                <span class="extension-payment-radio"></span>
                                <span class="extension-payment-plan-name">Business Templates</span>
                                <span class="extension-payment-price">$9.99</span>
                            </div>
                            <div class="extension-payment-plan">
                                <span class="extension-payment-radio"></span>
                                <span class="extension-payment-plan-name">All Access</span>
                                <span class="extension-payment-price">$17.99</span>
                            </div>
                        </div>
                        <div class="extension-payment-divider"></div>
                        <label class="extension-payment-label" for="extensionPaymentEmail">Account Email</label>
                        <input id="extensionPaymentEmail" class="extension-payment-email" type="email" readonly>
                        <div class="extension-payment-secure">
                            <div class="extension-payment-secure-icon">▣</div>
                            <div><strong>Secure Payment</strong><span>Your payment will be processed securely by your payment provider.</span></div>
                        </div>
                        <p class="extension-payment-note">This is a monthly subscription. Your selected plan renews automatically each month until cancelled.</p>
                        <button class="extension-payment-continue" type="button">Continue with PRO Templates — $5.99/month →</button>
                        <div class="extension-payment-footer">J-SYRO does not store your card details.</div>
                    </div>
                </div>
            `;
            document.body.appendChild(paymentModal);

            const close = () => closeExtensionPayment();
            paymentModal.querySelector(".extension-payment-close").addEventListener("click", close);
            paymentModal.addEventListener("click", event => {
                if (event.target === paymentModal) close();
            });
            paymentModal.querySelector(".extension-payment-continue").addEventListener("click", () => {
                completeExtensionPayment();
            });
        }

        paymentModal.dataset.extensionId = extension.id;
        const email = $("#extensionPaymentEmail");
        if (email) email.value = getAccountEmail();
        paymentModal.classList.add("open");
        paymentModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeExtensionPayment() {
        const paymentModal = $("#extensionPaymentModal");
        if (!paymentModal) return;
        paymentModal.classList.remove("open");
        paymentModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function completeExtensionPayment() {
        const paymentModal = $("#extensionPaymentModal");
        const id = paymentModal?.dataset.extensionId;
        const extension = extensions.find(item => item.id === id);
        if (!extension || extension.price <= 0) return;

        // Payment success unlocks the extension only. It deliberately does NOT install it.
        state.unlockedPaid.add(extension.id);
        saveUnlockedPaid();
        closeExtensionPayment();
        renderAll();
        showToast(`${extension.name} unlocked — press Install to install it.`);
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

            const extension = extensions.find(item => item.id === currentModalId);
            if (!extension) return;

            if (state.installed.has(currentModalId)) {
                uninstallExtension(currentModalId);
            } else if (extension.price > 0 && !state.unlockedPaid.has(currentModalId)) {
                openExtensionPayment(extension);
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
