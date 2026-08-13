/* =========================================
   J-SYRO ADMIN DASHBOARD
========================================= */

const ADMIN_SUPABASE_URL =
    "https://sajlcmcotxssyvovykkm.supabase.co";

const ADMIN_SUPABASE_KEY =
    "sb_publishable_6_oc0OAP5GXLJatcYM8Osw__8TVvBuX";


const adminSupabase =
    window.supabase.createClient(
        ADMIN_SUPABASE_URL,
        ADMIN_SUPABASE_KEY
    );


const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    Array.from(
        document.querySelectorAll(selector)
    );


let currentAdminUser = null;

let allAdminRequests = [];
let allAdminUsers = [];
let allAdminProjects = [];

let selectedAdminRequestId = null;
let adminToastTimer = null;


/* =========================================
   HELPERS
========================================= */

function escapeAdminHtml(value) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            })[character]
        );
}


function formatAdminDate(value) {

    if (!value) {
        return "Not available";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "Not available";
    }


    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
}


function formatAdminDateTime(value) {

    if (!value) {
        return "Not available";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "Not available";
    }


    return date.toLocaleString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


function showAdminToast(message) {

    const toast =
        $("#adminToast");


    if (!toast) {
        return;
    }


    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        adminToastTimer
    );


    adminToastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );
}


function getRequestStatusName(status) {

    const names = {
        pending: "Pending",
        reviewing: "Reviewing",
        in_progress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled"
    };


    return names[status] ||
        status ||
        "Pending";
}


function getRequestStatusClass(status) {

    return String(
        status || "pending"
    ).replace(
        /_/g,
        "-"
    );
}


function getWebsiteTypeName(type) {

    const names = {
        business: "Business Website",
        portfolio: "Portfolio Website",
        restaurant: "Restaurant Website",
        ecommerce: "E-commerce Website",
        saas: "SaaS Website",
        agency: "Agency Website",
        booking: "Booking Website",
        other: "Other Website"
    };


    return names[type] ||
        type ||
        "Website";
}


function getDisplayName(user) {

    return (
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Administrator"
    );
}


/* =========================================
   ADMIN ACCESS CHECK
========================================= */

async function initializeAdminAccess() {

    try {

        const {
            data: sessionData,
            error: sessionError
        } =
            await adminSupabase
                .auth
                .getSession();


        if (
            sessionError ||
            !sessionData.session
        ) {
            window.location.replace(
                "index.html"
            );

            return false;
        }


        const user =
            sessionData.session.user;


        const {
            data: planData,
            error: planError
        } =
            await adminSupabase
                .from("user_plans")
                .select(
                    "plan,status,role"
                )
                .eq(
                    "user_id",
                    user.id
                )
                .maybeSingle();


        if (planError) {
            throw planError;
        }


        if (
            !planData ||
            planData.role !== "admin" ||
            planData.status !== "active"
        ) {

            window.alert(
                "Admin access is required."
            );


            window.location.replace(
                "workspace.html"
            );

            return false;
        }


        currentAdminUser =
            user;


        const adminName =
            $("#adminUserName");

        const adminEmail =
            $("#adminUserEmail");


        if (adminName) {
            adminName.textContent =
                getDisplayName(user);
        }


        if (adminEmail) {
            adminEmail.textContent =
                user.email || "";
        }


        document.body.classList.remove(
            "admin-checking"
        );


        return true;

    } catch (error) {

        console.error(
            "Admin access error:",
            error
        );


        window.alert(
            error.message ||
            "Admin access could not be verified."
        );


        window.location.replace(
            "workspace.html"
        );


        return false;
    }
}


/* =========================================
   NAVIGATION
========================================= */

function initializeAdminNavigation() {

    const titles = {
        dashboardSection:
            "Dashboard",

        requestsSection:
            "Business Requests",

        usersSection:
            "Users",

        projectsSection:
            "Projects"
    };


    $$(".admin-nav-button")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const sectionId =
                            button.dataset
                                .adminSection;


                        $$(".admin-nav-button")
                            .forEach(
                                item =>
                                    item.classList
                                        .toggle(
                                            "active",
                                            item === button
                                        )
                            );


                        $$(".admin-section")
                            .forEach(
                                section =>
                                    section.classList
                                        .toggle(
                                            "active",
                                            section.id ===
                                            sectionId
                                        )
                            );


                        const pageTitle =
                            $("#adminPageTitle");


                        if (pageTitle) {
                            pageTitle.textContent =
                                titles[sectionId] ||
                                "Dashboard";
                        }
                    }
                );
            }
        );


    $("#viewAllRequestsBtn")
        ?.addEventListener(
            "click",
            function () {

                const requestButton =
                    document.querySelector(
                        '[data-admin-section="requestsSection"]'
                    );


                requestButton?.click();
            }
        );
}


/* =========================================
   DASHBOARD STATISTICS
========================================= */

async function loadAdminStats() {

    const {
        data,
        error
    } =
        await adminSupabase
            .rpc(
                "admin_dashboard_stats"
            );


    if (error) {
        throw error;
    }


    const stats =
        Array.isArray(data)
            ? data[0]
            : data;


    if (!stats) {
        return;
    }


    $("#totalUsersStat").textContent =
        stats.total_users ?? 0;

    $("#totalProjectsStat").textContent =
        stats.total_projects ?? 0;

    $("#totalRequestsStat").textContent =
        stats.total_requests ?? 0;

    $("#pendingRequestsStat").textContent =
        stats.pending_requests ?? 0;

    $("#pendingRequestsCount").textContent =
        stats.pending_requests ?? 0;

    $("#freeUsersStat").textContent =
        stats.free_users ?? 0;

    $("#proUsersStat").textContent =
        stats.pro_users ?? 0;

    $("#businessUsersStat").textContent =
        stats.business_users ?? 0;

    $("#adminUsersStat").textContent =
        stats.admin_users ?? 0;
}


/* =========================================
   BUSINESS REQUESTS
========================================= */

async function loadAdminRequests() {

    const {
        data,
        error
    } =
        await adminSupabase
            .from(
                "business_requests"
            )
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {
        throw error;
    }


    allAdminRequests =
        Array.isArray(data)
            ? data
            : [];


    renderAdminRequests();
    renderRecentAdminRequests();
}


function getFilteredAdminRequests() {

    const search =
        $("#adminRequestSearch")
            ?.value
            .trim()
            .toLowerCase() || "";


    const status =
        $("#adminRequestStatusFilter")
            ?.value || "all";


    return allAdminRequests.filter(
        function (request) {

            const searchText = [
                request.business_name,
                request.industry,
                request.contact_email,
                request.website_type,
                request.phone,
                request.whatsapp,
                request.domain_name
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                !search ||
                searchText.includes(
                    search
                );


            const matchesStatus =
                status === "all" ||
                request.status === status;


            return (
                matchesSearch &&
                matchesStatus
            );
        }
    );
}


function renderAdminRequests() {

    const container =
        $("#adminRequestsList");


    if (!container) {
        return;
    }


    const requests =
        getFilteredAdminRequests();


    if (
        requests.length === 0
    ) {

        container.innerHTML = `
            <p class="admin-empty-message">
                No matching business requests found.
            </p>
        `;

        return;
    }


    container.innerHTML =
        requests.map(
            function (request) {

                const statusClass =
                    getRequestStatusClass(
                        request.status
                    );


                const pages =
                    Array.isArray(
                        request.requested_pages
                    )
                        ? request
                            .requested_pages
                            .join(", ")
                        : "Not selected";


                return `
                    <article
                        class="admin-request-card"
                        data-request-id="${escapeAdminHtml(
                            request.id
                        )}"
                    >

                        <div class="admin-request-card-top">

                            <div>

                                <h3>
                                    ${escapeAdminHtml(
                                        request.business_name
                                    )}
                                </h3>

                                <p>
                                    ${escapeAdminHtml(
                                        request.contact_email
                                    )}
                                    ·
                                    ${escapeAdminHtml(
                                        formatAdminDateTime(
                                            request.created_at
                                        )
                                    )}
                                </p>

                            </div>


                            <span
                                class="admin-request-status ${escapeAdminHtml(
                                    statusClass
                                )}"
                            >
                                ${escapeAdminHtml(
                                    getRequestStatusName(
                                        request.status
                                    )
                                )}
                            </span>

                        </div>


                        <div class="admin-request-meta">

                            <span>
                                ${escapeAdminHtml(
                                    getWebsiteTypeName(
                                        request.website_type
                                    )
                                )}
                            </span>

                            <span>
                                ${escapeAdminHtml(
                                    request.industry
                                )}
                            </span>

                            <span>
                                Pages:
                                ${escapeAdminHtml(
                                    pages
                                )}
                            </span>

                            <span>
                                Domain:
                                ${escapeAdminHtml(
                                    request.domain_name ||
                                    request.domain_status ||
                                    "Not decided"
                                )}
                            </span>

                        </div>

                    </article>
                `;
            }
        ).join("");


    container
        .querySelectorAll(
            ".admin-request-card"
        )
        .forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        openAdminRequestModal(
                            card.dataset
                                .requestId
                        );
                    }
                );
            }
        );
}


function renderRecentAdminRequests() {

    const container =
        $("#recentBusinessRequests");


    if (!container) {
        return;
    }


    const recentRequests =
        allAdminRequests.slice(
            0,
            5
        );


    if (
        recentRequests.length === 0
    ) {

        container.innerHTML = `
            <p class="admin-empty-message">
                No business requests yet.
            </p>
        `;

        return;
    }


    container.innerHTML =
        recentRequests.map(
            function (request) {

                const statusClass =
                    getRequestStatusClass(
                        request.status
                    );


                return `
                    <article
                        class="admin-recent-item"
                        data-request-id="${escapeAdminHtml(
                            request.id
                        )}"
                    >

                        <div>

                            <strong>
                                ${escapeAdminHtml(
                                    request.business_name
                                )}
                            </strong>

                            <p>
                                ${escapeAdminHtml(
                                    getWebsiteTypeName(
                                        request.website_type
                                    )
                                )}
                                ·
                                ${escapeAdminHtml(
                                    formatAdminDate(
                                        request.created_at
                                    )
                                )}
                            </p>

                        </div>


                        <span
                            class="admin-recent-status ${escapeAdminHtml(
                                statusClass
                            )}"
                        >
                            ${escapeAdminHtml(
                                getRequestStatusName(
                                    request.status
                                )
                            )}
                        </span>

                    </article>
                `;
            }
        ).join("");


    container
        .querySelectorAll(
            ".admin-recent-item"
        )
        .forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        openAdminRequestModal(
                            item.dataset
                                .requestId
                        );
                    }
                );
            }
        );
}


function createAdminDetailItem(
    label,
    value,
    fullWidth = false,
    allowHtml = false
) {

    return `
        <div
            class="admin-detail-item ${
                fullWidth
                    ? "full"
                    : ""
            }"
        >

            <small>
                ${escapeAdminHtml(
                    label
                )}
            </small>

            ${
                allowHtml
                    ? value
                    : `
                        <p>
                            ${escapeAdminHtml(
                                value ||
                                "Not provided"
                            )}
                        </p>
                    `
            }

        </div>
    `;
}


async function getAdminLogoLink(
    logoPath
) {

    if (!logoPath) {
        return null;
    }


    const {
        data,
        error
    } =
        await adminSupabase
            .storage
            .from(
                "business-request-logos"
            )
            .createSignedUrl(
                logoPath,
                600
            );


    if (error) {

        console.error(
            "Logo signed URL error:",
            error
        );

        return null;
    }


    return data?.signedUrl ||
        null;
}


async function openAdminRequestModal(
    requestId
) {

    const request =
        allAdminRequests.find(
            item =>
                item.id === requestId
        );


    if (!request) {
        showAdminToast(
            "Request was not found"
        );

        return;
    }


    selectedAdminRequestId =
        request.id;


    const modal =
        $("#adminRequestModal");

    const details =
        $("#adminRequestDetails");

    const title =
        $("#adminRequestModalTitle");

    const statusSelect =
        $("#adminRequestStatus");

    const noteInput =
        $("#adminRequestNote");


    if (
        !modal ||
        !details
    ) {
        return;
    }


    title.textContent =
        request.business_name ||
        "Request Details";


    statusSelect.value =
        request.status ||
        "pending";


    noteInput.value =
        request.admin_note ||
        "";


    const logoLink =
        await getAdminLogoLink(
            request.logo_url
        );


    const logoHtml =
        logoLink
            ? `
                <a
                    class="admin-logo-link"
                    href="${escapeAdminHtml(
                        logoLink
                    )}"
                    target="_blank"
                    rel="noopener"
                >
                    View uploaded logo
                    ↗
                </a>
            `
            : `
                <p>
                    ${
                        request.logo_name
                            ? "Logo file could not be opened"
                            : "No logo uploaded"
                    }
                </p>
            `;


    const requestedPages =
        Array.isArray(
            request.requested_pages
        )
            ? request
                .requested_pages
                .join(", ")
            : "Not selected";


    details.innerHTML = `
        <div class="admin-detail-grid">

            ${createAdminDetailItem(
                "Business Name",
                request.business_name
            )}

            ${createAdminDetailItem(
                "Website Type",
                getWebsiteTypeName(
                    request.website_type
                )
            )}

            ${createAdminDetailItem(
                "Industry",
                request.industry
            )}

            ${createAdminDetailItem(
                "Contact Email",
                request.contact_email
            )}

            ${createAdminDetailItem(
                "Phone",
                request.phone
            )}

            ${createAdminDetailItem(
                "WhatsApp",
                request.whatsapp
            )}

            ${createAdminDetailItem(
                "Business Location",
                request.business_location
            )}

            ${createAdminDetailItem(
                "Domain Status",
                request.domain_status
            )}

            ${createAdminDetailItem(
                "Domain Name",
                request.domain_name
            )}

            ${createAdminDetailItem(
                "Submitted",
                formatAdminDateTime(
                    request.created_at
                )
            )}

            ${createAdminDetailItem(
                "Requested Pages",
                requestedPages,
                true
            )}

            ${createAdminDetailItem(
                "Website Description",
                request.description,
                true
            )}

            ${createAdminDetailItem(
                "Brand Colors",
                request.brand_colors,
                true
            )}

            ${createAdminDetailItem(
                "Social Links",
                request.social_links,
                true
            )}

            ${createAdminDetailItem(
                "Additional Notes",
                request.additional_notes,
                true
            )}

            ${createAdminDetailItem(
                "Uploaded Logo",
                logoHtml,
                true,
                true
            )}

        </div>
    `;


    modal.classList.add(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeAdminRequestModal() {

    const modal =
        $("#adminRequestModal");


    modal?.classList.remove(
        "open"
    );


    modal?.setAttribute(
        "aria-hidden",
        "true"
    );


    selectedAdminRequestId =
        null;
}


async function saveAdminRequestUpdate() {

    if (
        !selectedAdminRequestId
    ) {
        return;
    }


    const saveButton =
        $("#saveAdminRequestBtn");

    const status =
        $("#adminRequestStatus")
            .value;

    const adminNote =
        $("#adminRequestNote")
            .value
            .trim();


    const originalText =
        saveButton.textContent;


    saveButton.disabled =
        true;

    saveButton.textContent =
        "Saving update...";


    try {

        const {
            error
        } =
            await adminSupabase
                .from(
                    "business_requests"
                )
                .update({
                    status:
                        status,

                    admin_note:
                        adminNote || null,

                    updated_at:
                        new Date()
                            .toISOString()
                })
                .eq(
                    "id",
                    selectedAdminRequestId
                );


        if (error) {
            throw error;
        }


        showAdminToast(
            "Request updated successfully"
        );


        closeAdminRequestModal();


        await Promise.all([
            loadAdminRequests(),
            loadAdminStats()
        ]);

    } catch (error) {

        console.error(
            "Request update error:",
            error
        );


        showAdminToast(
            error.message ||
            "Request could not be updated"
        );

    } finally {

        saveButton.disabled =
            false;

        saveButton.textContent =
            originalText;
    }
}


/* =========================================
   USERS
========================================= */

async function loadAdminUsers() {

    const {
        data,
        error
    } =
        await adminSupabase
            .rpc(
                "admin_list_users"
            );


    if (error) {
        throw error;
    }


    allAdminUsers =
        Array.isArray(data)
            ? data
            : [];


    renderAdminUsers();
}


function getFilteredAdminUsers() {

    const search =
        $("#adminUserSearch")
            ?.value
            .trim()
            .toLowerCase() || "";


    const plan =
        $("#adminUserPlanFilter")
            ?.value || "all";


    return allAdminUsers.filter(
        function (user) {

            const searchText = [
                user.display_name,
                user.email,
                user.user_id
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                !search ||
                searchText.includes(
                    search
                );


            const matchesPlan =
                plan === "all" ||
                user.plan === plan;


            return (
                matchesSearch &&
                matchesPlan
            );
        }
    );
}


function renderAdminUsers() {

    const tableBody =
        $("#adminUsersTableBody");


    if (!tableBody) {
        return;
    }


    const users =
        getFilteredAdminUsers();


    if (
        users.length === 0
    ) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="admin-table-message"
                >
                    No matching users found.
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML =
        users.map(
            function (user) {

                return `
                    <tr>

                        <td class="admin-user-cell">

                            <strong>
                                ${escapeAdminHtml(
                                    user.display_name ||
                                    "J-SYRO User"
                                )}
                            </strong>

                            <span>
                                ${escapeAdminHtml(
                                    user.email ||
                                    user.user_id
                                )}
                            </span>

                        </td>


                        <td>

                            <span
                                class="admin-plan-name ${escapeAdminHtml(
                                    user.plan
                                )}"
                            >
                                ${escapeAdminHtml(
                                    String(
                                        user.plan ||
                                        "free"
                                    ).toUpperCase()
                                )}
                            </span>

                        </td>


                        <td>
                            ${escapeAdminHtml(
                                user.plan_status ||
                                "active"
                            )}
                        </td>


                        <td>
                            ${escapeAdminHtml(
                                user.user_role ||
                                "user"
                            )}
                        </td>


                        <td>
                            ${escapeAdminHtml(
                                formatAdminDate(
                                    user.created_at
                                )
                            )}
                        </td>


                        <td>

                            <button
                                class="admin-action-button"
                                type="button"
                                data-edit-user="${escapeAdminHtml(
                                    user.user_id
                                )}"
                            >
                                Edit Access
                            </button>

                        </td>

                    </tr>
                `;
            }
        ).join("");


    tableBody
        .querySelectorAll(
            "[data-edit-user]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        editAdminUserAccess(
                            button.dataset
                                .editUser
                        );
                    }
                );
            }
        );
}


async function editAdminUserAccess(
    userId
) {

    const user =
        allAdminUsers.find(
            item =>
                item.user_id === userId
        );


    if (!user) {
        return;
    }


    const newPlan =
        window.prompt(
            "Enter plan: free, pro or business",
            user.plan || "free"
        );


    if (newPlan === null) {
        return;
    }


    const cleanPlan =
        newPlan
            .trim()
            .toLowerCase();


    if (
        ![
            "free",
            "pro",
            "business"
        ].includes(cleanPlan)
    ) {

        showAdminToast(
            "Invalid plan"
        );

        return;
    }


    const newStatus =
        window.prompt(
            "Enter status: active, cancelled or past_due",
            user.plan_status ||
            "active"
        );


    if (newStatus === null) {
        return;
    }


    const cleanStatus =
        newStatus
            .trim()
            .toLowerCase();


    if (
        ![
            "active",
            "cancelled",
            "past_due"
        ].includes(cleanStatus)
    ) {

        showAdminToast(
            "Invalid status"
        );

        return;
    }


    const newRole =
        window.prompt(
            "Enter role: user or admin",
            user.user_role ||
            "user"
        );


    if (newRole === null) {
        return;
    }


    const cleanRole =
        newRole
            .trim()
            .toLowerCase();


    if (
        ![
            "user",
            "admin"
        ].includes(cleanRole)
    ) {

        showAdminToast(
            "Invalid role"
        );

        return;
    }


    const expiryDefault =
        user.expires_at
            ? String(
                user.expires_at
            ).slice(0, 10)
            : "";


    const expiryInput =
        window.prompt(
            "Expiry date YYYY-MM-DD, or leave blank for no expiry",
            expiryDefault
        );


    if (expiryInput === null) {
        return;
    }


    let expiresAt =
        null;


    if (
        expiryInput.trim()
    ) {

        const expiryDate =
            new Date(
                `${expiryInput.trim()}T23:59:59.999Z`
            );


        if (
            Number.isNaN(
                expiryDate.getTime()
            )
        ) {

            showAdminToast(
                "Invalid expiry date"
            );

            return;
        }


        expiresAt =
            expiryDate.toISOString();
    }


    const confirmed =
        window.confirm(
            `Update access for ${user.email}?`
        );


    if (!confirmed) {
        return;
    }


    try {

        const {
            error
        } =
            await adminSupabase
                .rpc(
                    "admin_update_user_access",
                    {
                        target_user_id:
                            user.user_id,

                        new_plan:
                            cleanPlan,

                        new_status:
                            cleanStatus,

                        new_role:
                            cleanRole,

                        new_expires_at:
                            expiresAt
                    }
                );


        if (error) {
            throw error;
        }


        showAdminToast(
            "User access updated"
        );


        await Promise.all([
            loadAdminUsers(),
            loadAdminStats()
        ]);

    } catch (error) {

        console.error(
            "User access update error:",
            error
        );


        showAdminToast(
            error.message ||
            "User access could not be updated"
        );
    }
}


/* =========================================
   PROJECTS
========================================= */

async function loadAdminProjects() {

    const {
        data,
        error
    } =
        await adminSupabase
            .rpc(
                "admin_list_projects"
            );


    if (error) {
        throw error;
    }


    allAdminProjects =
        Array.isArray(data)
            ? data
            : [];


    renderAdminProjects();
}


function renderAdminProjects() {

    const tableBody =
        $("#adminProjectsTableBody");


    if (!tableBody) {
        return;
    }


    const search =
        $("#adminProjectSearch")
            ?.value
            .trim()
            .toLowerCase() || "";


    const projects =
        allAdminProjects.filter(
            function (project) {

                const searchText = [
                    project.project_name,
                    project.project_key,
                    project.owner_email,
                    project.owner_id
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return (
                    !search ||
                    searchText.includes(
                        search
                    )
                );
            }
        );


    if (
        projects.length === 0
    ) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="admin-table-message"
                >
                    No matching projects found.
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML =
        projects.map(
            function (project) {

                return `
                    <tr>

                        <td>
                            <strong>
                                ${escapeAdminHtml(
                                    project.project_name ||
                                    "untitled-project"
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeAdminHtml(
                                project.project_key
                            )}
                        </td>

                        <td>
                            ${escapeAdminHtml(
                                project.owner_email ||
                                project.owner_id
                            )}
                        </td>

                        <td>
                            ${escapeAdminHtml(
                                project.file_count ?? 0
                            )}
                        </td>

                        <td>
                            ${escapeAdminHtml(
                                formatAdminDateTime(
                                    project.updated_at
                                )
                            )}
                        </td>

                    </tr>
                `;
            }
        ).join("");
}


/* =========================================
   REFRESH DASHBOARD
========================================= */

async function refreshAdminDashboard() {

    const refreshButton =
        $("#refreshAdminDashboard");


    const originalText =
        refreshButton?.textContent ||
        "↻ Refresh";


    if (refreshButton) {

        refreshButton.disabled =
            true;

        refreshButton.textContent =
            "Refreshing...";
    }


    const results =
        await Promise.allSettled([
            loadAdminStats(),
            loadAdminRequests(),
            loadAdminUsers(),
            loadAdminProjects()
        ]);


    const failedResult =
        results.find(
            result =>
                result.status ===
                "rejected"
        );


    if (failedResult) {

        console.error(
            "Admin dashboard load error:",
            failedResult.reason
        );


        showAdminToast(
            failedResult.reason
                ?.message ||
            "Some admin data could not be loaded"
        );

    } else {

        showAdminToast(
            "Dashboard refreshed"
        );
    }


    if (refreshButton) {

        refreshButton.disabled =
            false;

        refreshButton.textContent =
            originalText;
    }
}


/* =========================================
   LOGOUT
========================================= */

async function adminLogout() {

    const button =
        $("#adminLogoutBtn");


    const originalText =
        button?.textContent ||
        "Logout";


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Logging out...";
    }


    try {

        await adminSupabase
            .auth
            .signOut();


        window.location.replace(
            "index.html"
        );

    } catch (error) {

        console.error(
            "Admin logout error:",
            error
        );


        showAdminToast(
            "Logout failed"
        );


        if (button) {

            button.disabled =
                false;

            button.textContent =
                originalText;
        }
    }
}


/* =========================================
   EVENT LISTENERS
========================================= */

function initializeAdminEvents() {

    initializeAdminNavigation();


    $("#refreshAdminDashboard")
        ?.addEventListener(
            "click",
            refreshAdminDashboard
        );


    $("#adminLogoutBtn")
        ?.addEventListener(
            "click",
            adminLogout
        );


    $("#adminRequestSearch")
        ?.addEventListener(
            "input",
            renderAdminRequests
        );


    $("#adminRequestStatusFilter")
        ?.addEventListener(
            "change",
            renderAdminRequests
        );


    $("#adminUserSearch")
        ?.addEventListener(
            "input",
            renderAdminUsers
        );


    $("#adminUserPlanFilter")
        ?.addEventListener(
            "change",
            renderAdminUsers
        );


    $("#adminProjectSearch")
        ?.addEventListener(
            "input",
            renderAdminProjects
        );


    $("#closeAdminRequestModal")
        ?.addEventListener(
            "click",
            closeAdminRequestModal
        );


    $("#saveAdminRequestBtn")
        ?.addEventListener(
            "click",
            saveAdminRequestUpdate
        );


    $("#adminRequestModal")
        ?.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.id ===
                    "adminRequestModal"
                ) {
                    closeAdminRequestModal();
                }
            }
        );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {
                closeAdminRequestModal();
            }
        }
    );
}


/* =========================================
   START ADMIN DASHBOARD
========================================= */

async function startAdminDashboard() {

    const hasAdminAccess =
        await initializeAdminAccess();


    if (!hasAdminAccess) {
        return;
    }


    initializeAdminEvents();


    await refreshAdminDashboard();
}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startAdminDashboard
    );

} else {

    startAdminDashboard();
}