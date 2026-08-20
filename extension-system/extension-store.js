/* =========================================
   J-SYRO EXTENSION STORE
   Marketplace catalog/search layer.
========================================= */
(() => {
    "use strict";

    function catalog() {
        return Array.isArray(window.jSyroExtensionCatalog)
            ? window.jSyroExtensionCatalog
            : [];
    }

    function getById(id) {
        return catalog().find(extension => extension.id === id) || null;
    }

    function search({ query = "", category = "all", sort = "popular" } = {}) {
        const needle = String(query).trim().toLowerCase();

        let items = catalog().filter(extension => {
            const categoryMatch = category === "all" || extension.category === category;
            if (!categoryMatch) return false;
            if (!needle) return true;

            return [
                extension.name,
                extension.publisher,
                extension.description,
                extension.category
            ].some(value => String(value || "").toLowerCase().includes(needle));
        });

        switch (sort) {
            case "rating":
                items.sort((a, b) => Number(b.rating) - Number(a.rating));
                break;
            case "newest":
                items.sort((a, b) => new Date(b.updated) - new Date(a.updated));
                break;
            case "name":
                items.sort((a, b) => String(a.name).localeCompare(String(b.name)));
                break;
            case "price-low":
                items.sort((a, b) => Number(a.price) - Number(b.price) || Number(b.rating) - Number(a.rating));
                break;
            case "popular":
            default:
                items.sort((a, b) => Number(b.installs) - Number(a.installs));
                break;
        }

        return items;
    }

    window.jSyroExtensionStore = {
        getAll: () => [...catalog()],
        getById,
        search,
        getCategories() {
            return [...new Set(catalog().map(item => item.category).filter(Boolean))];
        }
    };
})();
