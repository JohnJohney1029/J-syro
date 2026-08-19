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
            featured: false,
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
        unlocked: new Set()
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

    function isPaid(extension) {
        return Number(extension.price) > 0;
    }

    function isUnlocked(id) {
        return state.unlocked.has(id);
    }

    function buttonMarkup(extension) {
        const installed = state.installed.has(extension.id);
        const paid = isPaid(extension);
        const unlocked = isUnlocked(extension.id);

        if (installed) {
            return `
                <div class="extension-actions">
                    <button class="extension-button secondary" data-action="details" data-id="${extension.id}" type="button">Details</button>
                    <button class="extension-button danger" data-action="uninstall" data-id="${extension.id}" type="button">Uninstall</button>
                </div>
            `;
        }

        if (paid && !unlocked) {
            return `
                <div class="extension-actions">
                    <button class="extension-button secondary" data-action="details" data-id="${extension.id}" type="button">Details</button>
                    <button class="extension-button primary" data-action="unlock" data-id="${extension.id}" type="button">🔒 Lock $${Number(extension.price).toFixed(2)}</button>
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
        const filtered = sortExtensions(extensions.filter(extension => !isPaid(extension) && matches(extension)));

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
        const paid = isPaid(extension);
        const unlocked = isUnlocked(extension.id);

        if (installed) {
            modalPrimary.textContent = "Uninstall";
            modalPrimary.className = "extension-button danger";
        } else if (paid && !unlocked) {
            modalPrimary.textContent = `🔒 Lock $${Number(extension.price).toFixed(2)}`;
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

        if (isPaid(extension) && !isUnlocked(id)) {
            openExtensionPayment(extension);
            return;
        }

        state.installed.add(id);
        saveState();
        renderAll();
        showToast(`${extension.name} installed`);

        if (currentModalId === id) {
            openDetails(id);
        }
    }

    function unlockExtension(id) {
        const extension = extensions.find(item => item.id === id);
        if (!extension || !isPaid(extension)) return;

        if (isUnlocked(id)) {
            renderAll();
            return;
        }

        openExtensionPayment(extension);
    }

    function completeExtensionPayment(id) {
        const extension = extensions.find(item => item.id === id);
        if (!extension || !isPaid(extension)) return;

        state.unlocked.add(id);
        // Payment unlocks access only. It must NOT install automatically.
        state.installed.delete(id);
        saveState();
        renderAll();
        showToast(`${extension.name} unlocked`);

        if (currentModalId === id) {
            openDetails(id);
        }
    }

    function openExtensionPayment(extension) {
        // Reuse the project's existing payment popup when available.
        const payload = {
            type: "extension",
            extensionId: extension.id,
            extensionName: extension.name,
            name: extension.name,
            price: extension.price,
            onSuccess: () => completeExtensionPayment(extension.id),
            success: () => completeExtensionPayment(extension.id),
            onComplete: () => completeExtensionPayment(extension.id)
        };

        const candidates = [
            [window, "openPaymentPopup"],
            [window, "openSubscriptionPopup"],
            [window, "openPaymentModal"],
            [window, "openSubscriptionModal"]
        ];

        for (const [target, name] of candidates) {
            if (target && typeof target[name] === "function") {
                try {
                    target[name](payload);
                    return;
                } catch (error) {
                    console.warn(`J-SYRO payment handler ${name} failed`, error);
                }
            }
        }

        if (window.jSyroPayment && typeof window.jSyroPayment.open === "function") {
            try {
                window.jSyroPayment.open(payload);
                return;
            } catch (error) {
                console.warn("jSyroPayment.open failed", error);
            }
        }

        if (window.jSyroAccess && typeof window.jSyroAccess.requestPayment === "function") {
            try {
                window.jSyroAccess.requestPayment(payload);
                return;
            } catch (error) {
                console.warn("jSyroAccess.requestPayment failed", error);
            }
        }

        // Fallback: render the same subscription-style popup locally.
        createExtensionPaymentModal(extension, () => completeExtensionPayment(extension.id));
    }

    function createExtensionPaymentModal(extension, onSuccess) {
        let modalEl = document.getElementById("extensionPaymentModal");
        if (modalEl) {
            modalEl.remove();
        }

        modalEl = document.createElement("div");
        modalEl.id = "extensionPaymentModal";
        modalEl.innerHTML = `
            <div class="extension-payment-backdrop" data-payment-close></div>
            <div class="extension-payment-card" role="dialog" aria-modal="true" aria-labelledby="extensionPaymentTitle">
                <button type="button" class="extension-payment-close" data-payment-close aria-label="Close">×</button>
                <div class="extension-payment-logo">JS</div>
                <h2 id="extensionPaymentTitle">J-SYRO Subscription</h2>
                <p class="extension-payment-subtitle">Choose your plan and continue to secure payment.</p>

                <div class="extension-payment-plans">
                    <button type="button" class="extension-plan selected" data-plan="pro">
                        <span class="extension-radio">◉</span><strong>PRO Templates</strong><b>$5.99</b>
                    </button>
                    <button type="button" class="extension-plan" data-plan="apps">
                        <span class="extension-radio">○</span><strong>Work Apps</strong><b>$7.99</b>
                    </button>
                    <button type="button" class="extension-plan" data-plan="business">
                        <span class="extension-radio">○</span><strong>Business Templates</strong><b>$9.99</b>
                    </button>
                    <button type="button" class="extension-plan" data-plan="all">
                        <span class="extension-radio">○</span><strong>All Access</strong><b>$17.99</b>
                    </button>
                </div>

                <div class="extension-payment-divider"></div>
                <label class="extension-payment-label">Account Email</label>
                <input class="extension-payment-email" value="" readonly aria-label="Account Email">
                <div class="extension-secure-box">
                    <div class="extension-secure-icon">▣</div>
                    <div><strong>Secure Payment</strong><span>Your payment will be processed securely by your payment provider.</span></div>
                </div>
                <p class="extension-payment-note">This is a monthly subscription. Your selected plan renews automatically each month until cancelled.</p>
                <button type="button" class="extension-payment-continue">Continue with PRO Templates — $5.99/month →</button>
                <small class="extension-payment-foot">J-SYRO does not store your card details.</small>
            </div>
        `;

        const style = document.createElement("style");
        style.id = "extensionPaymentModalStyles";
        style.textContent = `
            #extensionPaymentModal{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:rgba(4,7,12,.78);backdrop-filter:blur(9px);padding:16px}
            #extensionPaymentModal .extension-payment-card{position:relative;width:min(780px,100%);max-height:calc(100vh - 32px);overflow:auto;background:#fff;color:#202331;border-radius:22px;box-shadow:0 30px 100px rgba(0,0,0,.55);padding:42px}
            #extensionPaymentModal .extension-payment-close{position:absolute;right:22px;top:20px;width:54px;height:54px;border-radius:50%;border:1px solid #dce0e8;background:#f7f8fb;color:#687080;font-size:30px;cursor:pointer}
            #extensionPaymentModal .extension-payment-logo{width:92px;height:92px;border-radius:50%;margin:-82px auto 30px;display:grid;place-items:center;background:#11131b;color:#fff;border:8px solid #fff;box-shadow:0 8px 28px rgba(0,0,0,.25);font-weight:900;font-size:25px;font-style:italic}
            #extensionPaymentModal h2{text-align:center;font-size:36px;margin:0 0 10px;font-weight:800}
            #extensionPaymentModal .extension-payment-subtitle{text-align:center;color:#7b8190;font-size:18px;margin:0 0 38px}
            #extensionPaymentModal .extension-payment-plans{display:grid;gap:8px}
            #extensionPaymentModal .extension-plan{display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:12px;border:1px solid transparent;background:#fff;padding:17px 20px;border-radius:16px;text-align:left;font-size:18px;cursor:pointer;color:#444957}
            #extensionPaymentModal .extension-plan.selected{background:#f4f2ff;border-color:#ddd7ff}
            #extensionPaymentModal .extension-radio{font-size:26px;color:#8b7cff}
            #extensionPaymentModal .extension-plan b{font-size:19px}
            #extensionPaymentModal .extension-payment-divider{height:1px;background:#e5e7ec;margin:30px -42px}
            #extensionPaymentModal .extension-payment-label{display:block;font-weight:700;font-size:16px;margin-bottom:10px}
            #extensionPaymentModal .extension-payment-email{width:100%;height:56px;border:1px solid #d8dce4;border-radius:13px;padding:0 18px;font-size:18px;color:#4c5260;background:#fafbfc;margin-bottom:26px}
            #extensionPaymentModal .extension-secure-box{display:flex;gap:18px;align-items:center;border:1px solid #ddd8ff;background:#faf9ff;border-radius:16px;padding:20px}
            #extensionPaymentModal .extension-secure-icon{width:64px;height:64px;border-radius:14px;background:#eeeaff;display:grid;place-items:center;color:#705eff;font-size:26px}
            #extensionPaymentModal .extension-secure-box strong{display:block;font-size:18px;margin-bottom:6px}
            #extensionPaymentModal .extension-secure-box span{display:block;color:#7d8391;font-size:14px}
            #extensionPaymentModal .extension-payment-note{color:#7d8391;font-size:15px;line-height:1.55;margin:28px 4px 24px}
            #extensionPaymentModal .extension-payment-continue{width:100%;height:66px;border:0;border-radius:15px;background:linear-gradient(135deg,#6959ff,#765dff);color:#fff;font-size:18px;font-weight:800;cursor:pointer;box-shadow:0 12px 30px rgba(105,89,255,.24)}
            #extensionPaymentModal .extension-payment-foot{display:block;text-align:center;color:#9a9fac;margin-top:24px;font-size:13px}
            @media(max-width:600px){#extensionPaymentModal .extension-payment-card{padding:28px 20px;border-radius:16px}#extensionPaymentModal .extension-payment-logo{margin:-64px auto 22px}#extensionPaymentModal h2{font-size:27px}#extensionPaymentModal .extension-payment-divider{margin:25px -20px}}
        `;
        document.head.appendChild(style);
        document.body.appendChild(modalEl);

        const email = document.querySelector("#extensionPaymentModal .extension-payment-email");
        email.value = window.currentUserEmail || window.userEmail || window.accountEmail || "";

        const plans = Array.from(modalEl.querySelectorAll(".extension-plan"));
        const continueButton = modalEl.querySelector(".extension-payment-continue");
        const close = () => modalEl.remove();

        plans.forEach(plan => plan.addEventListener("click", () => {
            plans.forEach(item => item.classList.remove("selected"));
            plans.forEach(item => item.querySelector(".extension-radio").textContent = "○");
            plan.classList.add("selected");
            plan.querySelector(".extension-radio").textContent = "◉";
            const strong = plan.querySelector("strong").textContent;
            const price = plan.querySelector("b").textContent;
            continueButton.textContent = `Continue with ${strong} — ${price}/month →`;
        }));

        modalEl.querySelectorAll("[data-payment-close]").forEach(button => button.addEventListener("click", close));
        continueButton.addEventListener("click", () => {
            close();
            onSuccess();
        });
    }

    function uninstallExtension(id) {
        const extension = extensions.find(item => item.id === id);
        if (!extension) return;

        state.installed.delete(id);
        saveState();
        renderAll();
        showToast(`${extension.name} uninstalled`);

        if (currentModalId === id) {
            openDetails(id);
        }
    }

    function saveState() {
        try {
            localStorage.setItem("jsyro-installed-extensions", JSON.stringify([...state.installed]));
            localStorage.setItem("jsyro-unlocked-extensions", JSON.stringify([...state.unlocked]));
        } catch (_) {}
    }

    function loadInstalled() {
        try {
            const savedInstalled = JSON.parse(localStorage.getItem("jsyro-installed-extensions") || "[]");
            const savedUnlocked = JSON.parse(localStorage.getItem("jsyro-unlocked-extensions") || "[]");

            if (Array.isArray(savedUnlocked)) {
                savedUnlocked.forEach(id => {
                    const extension = extensions.find(item => item.id === id);
                    if (extension && isPaid(extension)) state.unlocked.add(id);
                });
            }

            if (Array.isArray(savedInstalled)) {
                savedInstalled.forEach(id => {
                    const extension = extensions.find(item => item.id === id);
                    if (!extension) return;
                    // A paid extension can NEVER remain installed without a recorded unlock.
                    if (isPaid(extension) && !state.unlocked.has(id)) return;
                    state.installed.add(id);
                });
            }

            // Clean stale/broken paid installs from previous versions.
            saveState();
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
            if (action === "unlock") unlockExtension(id);
            if (action === "install") installExtension(id);
            if (action === "uninstall") uninstallExtension(id);
        });

        $("#closeExtensionDetails")?.addEventListener("click", closeDetails);
        $(".modal-backdrop")?.addEventListener("click", closeDetails);

        modalSecondary?.addEventListener("click", closeDetails);

        modalPrimary?.addEventListener("click", () => {
            if (!currentModalId) return;

            const currentExtension = extensions.find(item => item.id === currentModalId);
            if (!currentExtension) return;

            if (state.installed.has(currentModalId)) {
                uninstallExtension(currentModalId);
            } else if (isPaid(currentExtension) && !isUnlocked(currentModalId)) {
                unlockExtension(currentModalId);
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
