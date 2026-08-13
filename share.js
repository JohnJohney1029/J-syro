const SUPABASE_URL =
    "https://sajlcmcotxssyvovykkm.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_6_oc0OAP5GXLJatcYM8Osw__8TVvBuX";


console.log(
    "J-SYRO share.js loaded"
);


const frame =
    document.getElementById(
        "projectFrame"
    );

const statusScreen =
    document.getElementById(
        "statusScreen"
    );

const projectNameElement =
    document.getElementById(
        "projectName"
    );


/* =========================
   ERROR SCREEN
========================= */

function showError(
    title,
    message
) {

    statusScreen.style.display =
        "flex";

    statusScreen.innerHTML = `

        <div class="status-card">

            <div class="error-icon">
                !
            </div>

            <h1>
                ${escapeHtml(title)}
            </h1>

            <p>
                ${escapeHtml(message)}
            </p>

        </div>

    `;
}


/* =========================
   ESCAPE HTML
========================= */

function escapeHtml(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        );
}


/* =========================
   BUILD PROJECT
========================= */

function buildProjectDocument(
    files
) {

    if (
        !files ||
        typeof files !== "object"
    ) {

        throw new Error(
            "Project files are missing"
        );
    }


    const htmlFile =

        files["index.html"] !== undefined

            ? "index.html"

            : Object.keys(
                files
            ).find(
                function (fileName) {

                    return /\.html$/i
                        .test(fileName);
                }
            );


    if (!htmlFile) {

        throw new Error(
            "No HTML file found"
        );
    }


    let html =
        files[htmlFile] || "";


    const css =
        files["style.css"] || "";


    const js =
        files["script.js"] || "";


    /* Remove project stylesheet */

    html =
        html.replace(
            /<link\b[^>]*href=["'][^"']*style\.css(?:\?[^"']*)?["'][^>]*>/gi,
            ""
        );


    /* Remove project JS */

    html =
        html.replace(
            /<script\b[^>]*src=["'][^"']*script\.js(?:\?[^"']*)?["'][^>]*><\/script\s*>/gi,
            ""
        );


    /* Make sure viewport exists */

    if (
        !/<meta[^>]+name=["']viewport["']/i
            .test(html)
    ) {

        html =
            html.replace(
                /<head([^>]*)>/i,

                `<head$1>
<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>`
            );
    }


    /* Add CSS */

    const styleBlock =
        "<style>\n" +
        css +
        "\n</style>";


    if (
        /<\/head\s*>/i
            .test(html)
    ) {

        html =
            html.replace(
                /<\/head\s*>/i,
                styleBlock +
                "\n</head>"
            );

    } else {

        html =
            styleBlock +
            "\n" +
            html;
    }


    /* Add project JavaScript */

    const safeJs =
        js.replace(
            /<\/script/gi,
            "<\\/script"
        );


    const scriptBlock =
        "<" +
        "script>\n" +
        safeJs +
        "\n</" +
        "script>";


    if (
        /<\/body\s*>/i
            .test(html)
    ) {

        html =
            html.replace(
                /<\/body\s*>/i,
                scriptBlock +
                "\n</body>"
            );

    } else {

        html +=
            "\n" +
            scriptBlock;
    }


    return html;
}


/* =========================
   LOAD SHARED PROJECT
========================= */

async function loadProject() {

    try {

        projectNameElement.textContent =
            "Connecting...";


        const params =
            new URLSearchParams(
                window.location.search
            );


        const shareId =
            params.get("id");


        console.log(
            "Share ID:",
            shareId
        );


        if (!shareId) {

            showError(
                "Invalid share link",
                "No share ID was found in this URL."
            );

            return;
        }


        const queryUrl =

            SUPABASE_URL +

            "/rest/v1/project_shares" +

            "?share_token=eq." +

            encodeURIComponent(
                shareId
            ) +

            "&is_active=eq.true" +

            "&select=project_name,files,folders,is_active";


        console.log(
            "Fetching project..."
        );


        const response =
            await fetch(
                queryUrl,
                {
                    method:
                        "GET",

                    headers: {

                        "apikey":
                            SUPABASE_KEY,

                        "Accept":
                            "application/json"
                    }
                }
            );


        console.log(
            "Status:",
            response.status
        );


        if (!response.ok) {

            const errorText =
                await response.text();


            console.error(
                "Supabase error:",
                errorText
            );


            showError(
                "Database request failed",
                `Supabase returned ${response.status}.`
            );

            return;
        }


        const rows =
            await response.json();


        console.log(
            "Project data:",
            rows
        );


        if (
            !Array.isArray(rows) ||
            rows.length === 0
        ) {

            showError(
                "Project unavailable",
                "This shared project does not exist or has been disabled."
            );

            return;
        }


        const sharedProject =
            rows[0];


        const projectName =
            sharedProject.project_name ||
            "J-SYRO Project";


        projectNameElement.textContent =
            projectName;


        document.title =
            `${projectName} | J-SYRO`;


        const finalDocument =
            buildProjectDocument(
                sharedProject.files
            );


        frame.addEventListener(
            "load",
            function () {

                statusScreen.style.display =
                    "none";

                console.log(
                    "Shared project rendered"
                );
            },
            {
                once: true
            }
        );


        frame.srcdoc =
            finalDocument;


        setTimeout(
            function () {

                statusScreen.style.display =
                    "none";

            },
            2500
        );


    } catch (error) {

        console.error(
            "Share page error:",
            error
        );


        showError(
            "Could not load project",
            error.message ||
            "Something went wrong."
        );
    }
}


/* =========================
   START
========================= */

loadProject();