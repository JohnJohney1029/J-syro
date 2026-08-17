/* =========================================================
   J-SYRO EXTENSIONS PAGE
   ---------------------------------------------------------
   Marketplace UI controller.

   Handles:

   - Marketplace
   - Search
   - Categories
   - Extension cards
   - Free / Paid states
   - Install
   - Uninstall
   - Enable / Disable
   - Details
   - README
   - Ratings
   - Installs
   - Updates
   - Installed extensions
   - Paid extension unlock flow

   IMPORTANT:
   This file controls the Extensions page UI.

   It does NOT contain the core extension manager/store/API.
========================================================= */

(function () {

    "use strict";


    /*
     * =====================================================
     * SYSTEM REFERENCES
     * =====================================================
     */

    const store =
        window.jSyroExtensionStore;

    const manager =
        window.jSyroExtensionManager;

    const api =
        window.jSyroExtensionAPI;


    /*
     * =====================================================
     * SAFETY CHECK
     * =====================================================
     */

    if (!store) {

        console.error(
            "J-SYRO Extension Store is not loaded."
        );

        return;

    }


    if (!manager) {

        console.error(
            "J-SYRO Extension Manager is not loaded."
        );

        return;

    }


    /*
     * =====================================================
     * PAGE STATE
     * =====================================================
     */

    const state = {

        view:
            "marketplace",

        query:
            "",

        category:
            "all",

        sort:
            "popular",

        selectedExtension:
            null

    };


    /*
     * =====================================================
     * DOM HELPERS
     * =====================================================
     */

    function $(selector) {

        return document.querySelector(
            selector
        );

    }


    function $$(selector) {

        return [
            ...document.querySelectorAll(
                selector
            )
        ];

    }


    function createElement(
        tag,
        className
    ) {

        const element =
            document.createElement(
                tag
            );


        if (className) {

            element.className =
                className;

        }


        return element;

    }


    /*
     * =====================================================
     * INITIALIZE
     * =====================================================
     */

    document.addEventListener(
        "DOMContentLoaded",
        initialize
    );


    function initialize() {

        setupNavigation();

        setupSearch();

        setupCategoryFilter();

        setupSort();

        setupEvents();

        renderMarketplace();

        renderCategories();

        updateCounts();

    }


    /*
     * =====================================================
     * NAVIGATION
     * =====================================================
     */

    function setupNavigation() {

        $$(
            "[data-extension-view]"
        ).forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const view =
                            button.dataset
                                .extensionView;


                        if (!view) {
                            return;
                        }


                        state.view =
                            view;


                        updateNavigation(
                            button
                        );


                        if (
                            view ===
                            "marketplace"
                        ) {

                            renderMarketplace();

                        }


                        if (
                            view ===
                            "installed"
                        ) {

                            renderInstalled();

                        }


                        if (
                            view ===
                            "updates"
                        ) {

                            renderUpdates();

                        }

                    }
                );

            }
        );

    }


    function updateNavigation(
        activeButton
    ) {

        $$(
            "[data-extension-view]"
        ).forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button ===
                        activeButton
                );

            }
        );


        const title =
            $(
                "#extensionsPageTitle"
            );


        if (!title) {
            return;
        }


        const titles = {

            marketplace:
                "Extensions Marketplace",

            installed:
                "Installed Extensions",

            updates:
                "Extension Updates"

        };


        title.textContent =
            titles[
                state.view
            ] ||
            "Extensions";

    }


    /*
     * =====================================================
     * SEARCH
     * =====================================================
     */

    function setupSearch() {

        const search =
            $(
                "#extensionSearch"
            );


        if (!search) {
            return;
        }


        search.addEventListener(
            "input",
            event => {

                state.query =
                    event.target.value
                        .trim();


                if (
                    state.view ===
                    "marketplace"
                ) {

                    renderMarketplace();

                }

            }
        );

    }


    /*
     * =====================================================
     * CATEGORY FILTER
     * =====================================================
     */

    function setupCategoryFilter() {

        const select =
            $(
                "#extensionCategory"
            );


        if (!select) {
            return;
        }


        select.addEventListener(
            "change",
            event => {

                state.category =
                    event.target.value;


                renderMarketplace();

            }
        );

    }


    /*
     * =====================================================
     * SORT
     * =====================================================
     */

    function setupSort() {

        const select =
            $(
                "#extensionSort"
            );


        if (!select) {
            return;
        }


        select.addEventListener(
            "change",
            event => {

                state.sort =
                    event.target.value;


                renderMarketplace();

            }
        );

    }


    /*
     * =====================================================
     * GENERAL EVENT DELEGATION
     * =====================================================
     */

    function setupEvents() {

        document.addEventListener(
            "click",
            event => {

                const card =
                    event.target.closest(
                        "[data-extension-id]"
                    );


                const installButton =
                    event.target.closest(
                        "[data-extension-install]"
                    );


                const uninstallButton =
                    event.target.closest(
                        "[data-extension-uninstall]"
                    );


                const enableButton =
                    event.target.closest(
                        "[data-extension-enable]"
                    );


                const disableButton =
                    event.target.closest(
                        "[data-extension-disable]"
                    );


                const detailsButton =
                    event.target.closest(
                        "[data-extension-details]"
                    );


                const updateButton =
                    event.target.closest(
                        "[data-extension-update]"
                    );


                const closeButton =
                    event.target.closest(
                        "[data-extension-close]"
                    );


                /*
                 * Prevent card click when an action
                 * button was clicked.
                 */

                if (
                    installButton
                ) {

                    event.stopPropagation();

                    handleInstall(
                        installButton.dataset
                            .extensionInstall
                    );

                    return;

                }


                if (
                    uninstallButton
                ) {

                    event.stopPropagation();

                    handleUninstall(
                        uninstallButton.dataset
                            .extensionUninstall
                    );

                    return;

                }


                if (
                    enableButton
                ) {

                    event.stopPropagation();

                    handleEnable(
                        enableButton.dataset
                            .extensionEnable
                    );

                    return;

                }


                if (
                    disableButton
                ) {

                    event.stopPropagation();

                    handleDisable(
                        disableButton.dataset
                            .extensionDisable
                    );

                    return;

                }


                if (
                    updateButton
                ) {

                    event.stopPropagation();

                    handleUpdate(
                        updateButton.dataset
                            .extensionUpdate
                    );

                    return;

                }


                if (
                    closeButton
                ) {

                    event.stopPropagation();

                    closeDetails();

                    return;

                }


                if (
                    detailsButton
                ) {

                    event.stopPropagation();

                    openDetails(
                        detailsButton.dataset
                            .extensionDetails
                    );

                    return;

                }


                /*
                 * Clicking an extension card opens
                 * its details.
                 */

                if (
                    card &&
                    !event.target.closest(
                        "button"
                    )
                ) {

                    openDetails(
                        card.dataset
                            .extensionId
                    );

                }

            }
        );

    }


    /*
     * =====================================================
     * MARKETPLACE
     * =====================================================
     */

    function renderMarketplace() {

        const container =
            $(
                "#extensionsGrid"
            );


        if (!container) {
            return;
        }


        const extensions =
            store.search({

                query:
                    state.query,

                category:
                    state.category,

                sort:
                    state.sort

            });


        clear(
            container
        );


        if (!extensions.length) {

            renderEmptyState(
                container,
                "No extensions found.",
                "Try another search or category."
            );


            return;

        }


        /*
         * Keep the existing search/category/sort result intact,
         * but show paid/PRO extensions before free extensions.
         * No install, unlock, or payment logic is changed here.
         */
        const paidExtensions =
            extensions.filter(
                extension =>
                    Number(
                        extension.price
                    ) > 0
            );


        const freeExtensions =
            extensions.filter(
                extension =>
                    Number(
                        extension.price
                    ) <= 0
            );


        const orderedExtensions =
            paidExtensions.concat(
                freeExtensions
            );


        orderedExtensions.forEach(
            extension => {

                container.appendChild(
                    createExtensionCard(
                        extension
                    )
                );

            }
        );

    }


    /*
     * =====================================================
     * INSTALLED
     * =====================================================
     */

    function renderInstalled() {

        const container =
            $(
                "#extensionsGrid"
            );


        if (!container) {
            return;
        }


        const installed =
            manager.getAllInstalled();


        clear(
            container
        );


        if (!installed.length) {

            renderEmptyState(
                container,
                "No extensions installed.",
                "Browse the marketplace to find extensions."
            );


            return;

        }


        installed.forEach(
            item => {

                if (
                    !item.marketplace
                ) {
                    return;
                }


                container.appendChild(
                    createExtensionCard(
                        item.marketplace,
                        {
                            installed:
                                true
                        }
                    )
                );

            }
        );

    }


    /*
     * =====================================================
     * UPDATES
     * =====================================================
     */

    function renderUpdates() {

        const container =
            $(
                "#extensionsGrid"
            );


        if (!container) {
            return;
        }


        const updates =
            manager.getUpdates();


        clear(
            container
        );


        if (!updates.length) {

            renderEmptyState(
                container,
                "You're up to date.",
                "There are no extension updates available."
            );


            return;

        }


        updates.forEach(
            update => {

                if (
                    !update.extension
                ) {
                    return;
                }


                container.appendChild(
                    createExtensionCard(
                        update.extension,
                        {
                            update:
                                true
                        }
                    )
                );

            }
        );

    }


    /*
     * =====================================================
     * EXTENSION CARD
     * =====================================================
     */

    function createExtensionCard(
        extension,
        options = {}
    ) {

        const card =
            createElement(
                "article",
                "extension-card"
            );


        card.dataset.extensionId =
            extension.id;


        const installed =
            manager.isInstalled(
                extension.id
            );


        const enabled =
            manager.isEnabled(
                extension.id
            );


        const paid =
            Number(
                extension.price
            ) > 0;


        /*
         * Mark the card so the marketplace CSS can also
         * recognize paid/free cards without touching
         * the existing payment or install flow.
         */
        card.classList.add(
            paid
                ? "extension-card-paid"
                : "extension-card-free"
        );


        const unlocked =
            manager.isExtensionUnlocked(
                extension.id
            );


        /*
         * Header
         */

        const header =
            createElement(
                "div",
                "extension-card-header"
            );


        const icon =
            createElement(
                "div",
                "extension-icon"
            );


        icon.textContent =
            extension.icon ||
            "◆";


        const heading =
            createElement(
                "div",
                "extension-card-heading"
            );


        const name =
            createElement(
                "h3"
            );


        name.textContent =
            extension.displayName;


        const publisher =
            createElement(
                "span",
                "extension-publisher"
            );


        publisher.textContent =
            extension.publisher;


        heading.appendChild(
            name
        );


        heading.appendChild(
            publisher
        );


        header.appendChild(
            icon
        );


        header.appendChild(
            heading
        );


        /*
         * Verified badge
         */

        if (
            extension.verified
        ) {

            const verified =
                createElement(
                    "span",
                    "extension-verified"
                );


            verified.textContent =
                "✓ Verified";


            header.appendChild(
                verified
            );

        }


        /*
         * Description
         */

        const description =
            createElement(
                "p",
                "extension-description"
            );


        description.textContent =
            extension.description;


        /*
         * Metadata
         */

        const metadata =
            createElement(
                "div",
                "extension-meta"
            );


        const rating =
            createElement(
                "span"
            );


        rating.textContent =
            `★ ${Number(
                extension.rating || 0
            ).toFixed(1)}`;


        const installs =
            createElement(
                "span"
            );


        installs.textContent =
            formatInstalls(
                extension.installs
            );


        const version =
            createElement(
                "span"
            );


        version.textContent =
            `v${extension.version}`;


        metadata.appendChild(
            rating
        );


        metadata.appendChild(
            installs
        );


        metadata.appendChild(
            version
        );


        /*
         * Footer
         */

        const footer =
            createElement(
                "div",
                "extension-card-footer"
            );


        const price =
            createElement(
                "span",
                paid
                    ? "extension-price paid"
                    : "extension-price free"
            );


        if (paid) {

            price.textContent =
                `PRO $${Number(
                    extension.price
                ).toFixed(2)}`;

        } else {

            price.textContent =
                "FREE";

        }


        footer.appendChild(
            price
        );


        /*
         * Action button
         */

        const actionArea =
            createElement(
                "div",
                "extension-actions"
            );


        if (
            options.update
        ) {

            const button =
                createButton(
                    "Update",
                    "primary"
                );


            button.dataset
                .extensionUpdate =
                extension.id;


            actionArea.appendChild(
                button
            );

        }

        else if (
            installed
        ) {

            const stateButton =
                createButton(
                    enabled
                        ? "Disable"
                        : "Enable",
                    enabled
                        ? "secondary"
                        : "primary"
                );


            if (enabled) {

                stateButton.dataset
                    .extensionDisable =
                    extension.id;

            } else {

                stateButton.dataset
                    .extensionEnable =
                    extension.id;

            }


            actionArea.appendChild(
                stateButton
            );


            const uninstallButton =
                createButton(
                    "Uninstall",
                    "danger"
                );


            uninstallButton.dataset
                .extensionUninstall =
                extension.id;


            actionArea.appendChild(
                uninstallButton
            );

        }

        else if (
            paid &&
            !unlocked
        ) {

            const unlockButton =
                createButton(
                    `Unlock $${Number(
                        extension.price
                    ).toFixed(2)}`,
                    "primary"
                );


            unlockButton.dataset
                .extensionInstall =
                extension.id;


            actionArea.appendChild(
                unlockButton
            );

        }

        else {

            const installButton =
                createButton(
                    "Install",
                    "primary"
                );


            installButton.dataset
                .extensionInstall =
                extension.id;


            actionArea.appendChild(
                installButton
            );

        }


        /*
         * Details button
         */

        const detailsButton =
            createButton(
                "Details",
                "secondary"
            );


        detailsButton.dataset
            .extensionDetails =
            extension.id;


        actionArea.appendChild(
            detailsButton
        );


        footer.appendChild(
            actionArea
        );


        /*
         * Assemble card
         */

        card.appendChild(
            header
        );

        card.appendChild(
            description
        );

        card.appendChild(
            metadata
        );

        card.appendChild(
            footer
        );


        return card;

    }


    /*
     * =====================================================
     * BUTTON CREATOR
     * =====================================================
     */

    function createButton(
        text,
        type
    ) {

        const button =
            createElement(
                "button",
                `extension-button ${type}`
            );


        button.type =
            "button";


        button.textContent =
            text;


        return button;

    }


    /*
     * =====================================================
     * INSTALL / UNLOCK
     * =====================================================
     */

    function handleInstall(
        extensionId
    ) {

        const extension =
            store.getById(
                extensionId
            );


        if (!extension) {

            showToast(
                "Extension not found.",
                "error"
            );


            return;

        }


        /*
         * Paid extension.
         */

        if (
            Number(extension.price) > 0 &&
            !manager.isExtensionUnlocked(
                extensionId
            )
        ) {

            openPaymentForExtension(
                extension
            );


            return;

        }


        try {

            manager.install(
                extensionId
            );


            showToast(
                `${extension.displayName} installed.`,
                "success"
            );


            refreshCurrentView();

            updateCounts();

        } catch (error) {

            console.error(
                error
            );


            showToast(
                error.message ||
                    "Could not install extension.",
                "error"
            );

        }

    }


    /*
     * =====================================================
     * EXISTING PAYMENT SYSTEM
     * =====================================================
     *
     * We DO NOT create a duplicate payment system.
     *
     * This function attempts to use the existing J-SYRO
     * payment/access functions if they exist.
     */

    function openPaymentForExtension(
        extension
    ) {

        /*
         * Option 1:
         * Existing J-SYRO global payment function.
         */

        if (
            typeof window.openPaymentPopup ===
            "function"
        ) {

            window.openPaymentPopup({

                type:
                    "extension",

                extensionId:
                    extension.id,

                extensionName:
                    extension.displayName,

                price:
                    extension.price,

                onSuccess:
                    () => {

                        completeExtensionUnlock(
                            extension
                        );

                    }

            });


            return;

        }


        /*
         * Option 2:
         * Existing J-SYRO payment popup object.
         */

        if (
            window.jSyroPayment &&
            typeof window
                .jSyroPayment
                .open ===
            "function"
        ) {

            window.jSyroPayment.open({

                type:
                    "extension",

                extensionId:
                    extension.id,

                name:
                    extension.displayName,

                price:
                    extension.price,

                onSuccess:
                    () => {

                        completeExtensionUnlock(
                            extension
                        );

                    }

            });


            return;

        }


        /*
         * Option 3:
         * Existing generic access/payment handler.
         */

        if (
            window.jSyroAccess &&
            typeof window
                .jSyroAccess
                .requestPayment ===
            "function"
        ) {

            window.jSyroAccess
                .requestPayment({

                    type:
                        "extension",

                    extensionId:
                        extension.id,

                    price:
                        extension.price,

                    onSuccess:
                        () => {

                            completeExtensionUnlock(
                                extension
                            );

                        }

                });


            return;

        }


        /*
         * Current project may use a different existing
         * payment function.
         *
         * For now, do not fake a successful payment.
         */

        showToast(
            "Connect this button to your existing J-SYRO payment popup.",
            "info"
        );

    }


    /*
     * =====================================================
     * PAYMENT SUCCESS
     * =====================================================
     */

    function completeExtensionUnlock(
        extension
    ) {

        try {

            manager.markUnlocked(
                extension.id
            );


            showToast(
                `${extension.displayName} unlocked.`,
                "success"
            );


            /*
             * Automatically install after successful
             * payment.
             */

            manager.install(
                extension.id
            );


            showToast(
                `${extension.displayName} installed.`,
                "success"
            );


            refreshCurrentView();

            updateCounts();

        } catch (error) {

            console.error(
                error
            );


            showToast(
                error.message ||
                    "Extension could not be installed.",
                "error"
            );

        }

    }


    /*
     * =====================================================
     * UNINSTALL
     * =====================================================
     */

    function handleUninstall(
        extensionId
    ) {

        const extension =
            store.getById(
                extensionId
            );


        if (!extension) {
            return;
        }


        const confirmed =
            window.confirm(
                `Uninstall "${extension.displayName}"?`
            );


        if (!confirmed) {
            return;
        }


        try {

            manager.uninstall(
                extensionId
            );


            showToast(
                `${extension.displayName} uninstalled.`,
                "success"
            );


            refreshCurrentView();

            updateCounts();

        } catch (error) {

            console.error(
                error
            );


            showToast(
                error.message ||
                    "Could not uninstall extension.",
                "error"
            );

        }

    }


    /*
     * =====================================================
     * ENABLE
     * =====================================================
     */

    function handleEnable(
        extensionId
    ) {

        try {

            const extension =
                store.getById(
                    extensionId
                );


            manager.enable(
                extensionId
            );


            showToast(
                `${extension.displayName} enabled.`,
                "success"
            );


            refreshCurrentView();

        } catch (error) {

            console.error(
                error
            );


            showToast(
                error.message ||
                    "Could not enable extension.",
                "error"
            );

        }

    }


    /*
     * =====================================================
     * DISABLE
     * =====================================================
     */

    function handleDisable(
        extensionId
    ) {

        try {

            const extension =
                store.getById(
                    extensionId
                );


            manager.disable(
                extensionId
            );


            showToast(
                `${extension.displayName} disabled.`,
                "success"
            );


            refreshCurrentView();

        } catch (error) {

            console.error(
                error
            );


            showToast(
                error.message ||
                    "Could not disable extension.",
                "error"
            );

        }

    }


    /*
     * =====================================================
     * UPDATE
     * =====================================================
     */

    function handleUpdate(
        extensionId
    ) {

        try {

            const updated =
                manager.update(
                    extensionId
                );


            showToast(
                `${updated.displayName} updated to v${updated.version}.`,
                "success"
            );


            refreshCurrentView();

            updateCounts();

        } catch (error) {

            console.error(
                error
            );


            showToast(
                error.message ||
                    "Could not update extension.",
                "error"
            );

        }

    }


    /*
     * =====================================================
     * DETAILS MODAL
     * =====================================================
     */

    function openDetails(
        extensionId
    ) {

        const extension =
            store.getById(
                extensionId
            );


        if (!extension) {
            return;
        }


        state.selectedExtension =
            extensionId;


        const modal =
            $(
                "#extensionDetailsModal"
            );


        if (!modal) {

            createDetailsModal();

        }


        renderDetails(
            extension
        );


        const detailsModal =
            $(
                "#extensionDetailsModal"
            );


        if (detailsModal) {

            detailsModal.classList.add(
                "open"
            );

            detailsModal.setAttribute(
                "aria-hidden",
                "false"
            );

        }

    }


    function createDetailsModal() {

        const modal =
            createElement(
                "div",
                "extension-details-modal"
            );


        modal.id =
            "extensionDetailsModal";


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        modal.innerHTML = `

            <div
                class="extension-details-backdrop"
                data-extension-close
            ></div>

            <div
                class="extension-details-dialog"
                role="dialog"
                aria-modal="true"
            >

                <button
                    type="button"
                    class="extension-details-close"
                    data-extension-close
                    aria-label="Close"
                >
                    ×
                </button>

                <div
                    id="extensionDetailsContent"
                    class="extension-details-content"
                ></div>

            </div>
        `;


        document.body.appendChild(
            modal
        );

    }


    function renderDetails(
        extension
    ) {

        const content =
            $(
                "#extensionDetailsContent"
            );


        if (!content) {
            return;
        }


        const installed =
            manager.isInstalled(
                extension.id
            );


        const enabled =
            manager.isEnabled(
                extension.id
            );


        const unlocked =
            manager.isExtensionUnlocked(
                extension.id
            );


        const paid =
            Number(
                extension.price
            ) > 0;


        const features =
            Array.isArray(
                extension.features
            )
                ? extension.features
                : [];


        const permissions =
            Array.isArray(
                extension.permissions
            )
                ? extension.permissions
                : [];


        const readme =
            extension.readme ||
            {};


        const paragraphs =
            Array.isArray(
                readme.paragraphs
            )
                ? readme.paragraphs
                : [];


        const changelog =
            Array.isArray(
                extension.changelog
            )
                ? extension.changelog
                : [];


        let actionHTML =
            "";


        if (
            installed
        ) {

            actionHTML = `

                <div class="extension-detail-actions">

                    <button
                        type="button"
                        class="extension-button ${
                            enabled
                                ? "secondary"
                                : "primary"
                        }"
                        data-extension-${
                            enabled
                                ? "disable"
                                : "enable"
                        }="${escapeHTML(
                            extension.id
                        )}"
                    >
                        ${
                            enabled
                                ? "Disable"
                                : "Enable"
                        }
                    </button>

                    <button
                        type="button"
                        class="extension-button danger"
                        data-extension-uninstall="${escapeHTML(
                            extension.id
                        )}"
                    >
                        Uninstall
                    </button>

                </div>

            `;

        }

        else if (
            paid &&
            !unlocked
        ) {

            actionHTML = `

                <div class="extension-detail-actions">

                    <button
                        type="button"
                        class="extension-button primary"
                        data-extension-install="${escapeHTML(
                            extension.id
                        )}"
                    >
                        Unlock $${Number(
                            extension.price
                        ).toFixed(2)}
                    </button>

                </div>

            `;

        }

        else {

            actionHTML = `

                <div class="extension-detail-actions">

                    <button
                        type="button"
                        class="extension-button primary"
                        data-extension-install="${escapeHTML(
                            extension.id
                        )}"
                    >
                        Install
                    </button>

                </div>

            `;

        }


        content.innerHTML = `

            <div class="extension-detail-header">

                <div class="extension-detail-icon">
                    ${escapeHTML(
                        extension.icon || "◆"
                    )}
                </div>

                <div>

                    <h2>
                        ${escapeHTML(
                            extension.displayName
                        )}
                    </h2>

                    <p>
                        ${escapeHTML(
                            extension.publisher
                        )}
                    </p>

                </div>

            </div>


            <div class="extension-detail-meta">

                <span>
                    ★ ${Number(
                        extension.rating || 0
                    ).toFixed(1)}
                </span>

                <span>
                    ${formatInstalls(
                        extension.installs
                    )}
                </span>

                <span>
                    v${escapeHTML(
                        extension.version
                    )}
                </span>

                <span>
                    ${
                        paid
                            ? `PRO $${Number(
                                extension.price
                            ).toFixed(2)}`
                            : "FREE"
                    }
                </span>

            </div>


            <p class="extension-detail-description">
                ${escapeHTML(
                    extension.description
                )}
            </p>


            ${actionHTML}


            <section class="extension-detail-section">

                <h3>
                    Features
                </h3>

                <ul>

                    ${
                        features
                            .map(
                                feature =>
                                    `<li>${escapeHTML(
                                        feature
                                    )}</li>`
                            )
                            .join("")
                    }

                </ul>

            </section>


            <section class="extension-detail-section">

                <h3>
                    Permissions
                </h3>

                <div class="extension-permissions">

                    ${
                        permissions
                            .map(
                                permission =>
                                    `<span>${escapeHTML(
                                        permission
                                    )}</span>`
                            )
                            .join("")
                    }

                </div>

            </section>


            <section class="extension-detail-section">

                <h3>
                    ${escapeHTML(
                        readme.heading ||
                        "README"
                    )}
                </h3>

                ${
                    paragraphs
                        .map(
                            paragraph =>
                                `<p>${escapeHTML(
                                    paragraph
                                )}</p>`
                        )
                        .join("")
                }

            </section>


            <section class="extension-detail-section">

                <h3>
                    Changelog
                </h3>

                ${
                    changelog
                        .map(
                            item => `

                                <div class="extension-changelog-item">

                                    <strong>
                                        v${escapeHTML(
                                            item.version
                                        )}
                                    </strong>

                                    <span>
                                        ${escapeHTML(
                                            item.date
                                        )}
                                    </span>

                                    <p>
                                        ${escapeHTML(
                                            item.text
                                        )}
                                    </p>

                                </div>

                            `
                        )
                        .join("")
                }

            </section>

        `;

    }


    function closeDetails() {

        const modal =
            $(
                "#extensionDetailsModal"
            );


        if (!modal) {
            return;
        }


        modal.classList.remove(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        state.selectedExtension =
            null;

    }


    /*
     * =====================================================
     * CATEGORIES
     * =====================================================
     */

    function renderCategories() {

        const select =
            $(
                "#extensionCategory"
            );


        if (!select) {
            return;
        }


        const categories =
            store.getCategories();


        const current =
            state.category;


        select.innerHTML = `

            <option value="all">
                All Categories
            </option>

            ${
                categories
                    .map(
                        category =>
                            `
                            <option
                                value="${escapeHTML(
                                    category
                                )}"
                            >
                                ${formatCategory(
                                    category
                                )}
                            </option>
                            `
                    )
                    .join("")
            }

        `;


        select.value =
            categories.includes(
                current
            )
                ? current
                : "all";

    }


    /*
     * =====================================================
     * COUNTS
     * =====================================================
     */

    function updateCounts() {

        const installed =
            manager.getAllInstalled();


        const updates =
            manager.getUpdates();


        const installedCount =
            $(
                "#installedExtensionsCount"
            );


        const updatesCount =
            $(
                "#extensionUpdatesCount"
            );


        if (installedCount) {

            installedCount.textContent =
                installed.length;

        }


        if (updatesCount) {

            updatesCount.textContent =
                updates.length;

        }

    }


    /*
     * =====================================================
     * EMPTY STATE
     * =====================================================
     */

    function renderEmptyState(
        container,
        title,
        message
    ) {

        const empty =
            createElement(
                "div",
                "extensions-empty"
            );


        empty.innerHTML = `

            <div class="extensions-empty-icon">
                ◇
            </div>

            <h3>
                ${escapeHTML(
                    title
                )}
            </h3>

            <p>
                ${escapeHTML(
                    message
                )}
            </p>

        `;


        container.appendChild(
            empty
        );

    }


    /*
     * =====================================================
     * REFRESH
     * =====================================================
     */

    function refreshCurrentView() {

        if (
            state.view ===
            "installed"
        ) {

            renderInstalled();

        }

        else if (
            state.view ===
            "updates"
        ) {

            renderUpdates();

        }

        else {

            renderMarketplace();

        }


        if (
            state.selectedExtension
        ) {

            const extension =
                store.getById(
                    state.selectedExtension
                );


            if (extension) {

                renderDetails(
                    extension
                );

            }

        }

    }


    /*
     * =====================================================
     * UTILITIES
     * =====================================================
     */

    function clear(
        element
    ) {

        while (
            element.firstChild
        ) {

            element.removeChild(
                element.firstChild
            );

        }

    }


    function formatInstalls(
        number
    ) {

        const value =
            Number(
                number || 0
            );


        if (
            value >= 1000000
        ) {

            return (
                `${(
                    value / 1000000
                ).toFixed(1)}M installs`
            );

        }


        if (
            value >= 1000
        ) {

            return (
                `${(
                    value / 1000
                ).toFixed(1)}K installs`
            );

        }


        return (
            `${value} installs`
        );

    }


    function formatCategory(
        category
    ) {

        return String(
            category || ""
        )
            .replace(
                /[-_]/g,
                " "
            )
            .replace(
                /\b\w/g,
                letter =>
                    letter.toUpperCase()
            );

    }


    function escapeHTML(
        value
    ) {

        return String(
            value ?? ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /*
     * =====================================================
     * TOAST
     * =====================================================
     */

    function showToast(
        message,
        type = "info"
    ) {

        let container =
            $(
                "#jsyroExtensionToasts"
            );


        if (!container) {

            container =
                createElement(
                    "div",
                    "jsyro-extension-toasts"
                );


            container.id =
                "jsyroExtensionToasts";


            document.body.appendChild(
                container
            );

        }


        const toast =
            createElement(
                "div",
                `jsyro-extension-toast ${type}`
            );


        toast.textContent =
            message;


        container.appendChild(
            toast
        );


        requestAnimationFrame(
            () => {

                toast.classList.add(
                    "show"
                );

            }
        );


        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );


                setTimeout(
                    () => {

                        toast.remove();

                    },
                    250
                );

            },
            3000
        );

    }


    /*
     * =====================================================
     * PUBLIC PAGE API
     * =====================================================
     */

    window.jSyroExtensionsPage = {

        refresh:
            refreshCurrentView,

        openDetails,

        closeDetails,

        renderMarketplace,

        renderInstalled,

        renderUpdates,

        getState() {

            return {
                ...state
            };

        }

    };


})();
