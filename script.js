/* =========================
   SUPABASE CONNECTION
========================= */

const SUPABASE_URL =
    "https://sajlcmcotxssyvovykkm.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_6_oc0OAP5GXLJatcYM8Osw__8TVvBuX";


let supabaseClient = null;


/* Check that Supabase library loaded */

if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
) {
    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );

    console.log("J-SYRO connected to Supabase.");
} else {
    console.error(
        "Supabase library could not be loaded."
    );
}


/* =========================
   OPEN WORKSPACE
========================= */

async function startProject() {

    if (!supabaseClient) {
        alert(
            "Supabase connection failed. Please refresh the page."
        );

        return;
    }

    try {
        const {
            data,
            error
        } = await supabaseClient.auth.getSession();

        if (error) {
            throw error;
        }

        /* User already logged in */

        if (data.session) {
            window.location.href =
                "workspace.html";

            return;
        }

        /* User not logged in */

        openLogin();

        showAuthMessage(
            "Please log in before opening your workspace.",
            "error"
        );

    } catch (error) {
        console.error(
            "Session check error:",
            error
        );

        openLogin();

        showAuthMessage(
            "Unable to check your login. Please try again.",
            "error"
        );
    }
}


/* =========================================
   J-SYRO PAID PLAN → LOGIN → PAYMENT
========================================= */

const jSyroPaidPlans = {

    pro: {
        name: "PRO Templates",
        price: "$5.99"
    },

    workapps: {
        name: "Work Apps",
        price: "$7.99"
    },

    business: {
        name: "Business Templates",
        price: "$9.99"
    },

    allaccess: {
        name: "All Access",
        price: "$17.99"
    }

};


/* =========================================
   CHECK LOGIN
========================================= */

function isJSyroUserLoggedIn() {

    const userActions =
        document.querySelector(
            ".user-actions"
        );

    if (!userActions) {
        return false;
    }

    return !userActions.hidden;
}


/* =========================================
   GET USER EMAIL
========================================= */

function getJSyroUserEmail() {

    /*
        First try Supabase stored session.
    */

    try {

        const storedSession =
            localStorage.getItem(
                "sb-sajlcmcotxssyvovykkm-auth-token"
            );

        if (storedSession) {

            const parsed =
                JSON.parse(
                    storedSession
                );

            const email =
                parsed?.user?.email ||
                parsed?.currentSession?.user?.email ||
                parsed?.session?.user?.email;

            if (email) {
                return email;
            }
        }

    } catch (error) {

        console.warn(
            "Could not read stored email:",
            error
        );
    }


    /*
        Fallback:
        get email from login/signup inputs.
    */

    const emailInputs =
        document.querySelectorAll(
            'input[type="email"]:not(#paymentEmail)'
        );

    for (
        const input
        of emailInputs
    ) {

        const value =
            input.value.trim();

        if (
            value &&
            value.includes("@")
        ) {
            return value;
        }
    }


    return "";
}


/* =========================================
   CLOSE LOGIN POPUP
========================================= */

function closeJSyroAuthForPayment() {

    const authModal =
        document.querySelector(
            ".auth-modal"
        );

    if (authModal) {

        authModal.classList.remove(
            "active"
        );

        authModal.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    document.body.classList.remove(
        "auth-modal-open"
    );
}


/* =========================================
   OPEN PAYMENT POPUP
========================================= */

function openPaymentModal(
    plan
) {

    if (
        !jSyroPaidPlans[plan]
    ) {
        plan = "pro";
    }


    const modal =
        document.getElementById(
            "paymentModal"
        );

    if (!modal) {

        console.error(
            "Payment modal not found"
        );

        return;
    }


    /*
        Remember selected checkout plan.
    */

    localStorage.setItem(
        "jSyroCheckoutPlan",
        plan
    );


    /*
        Automatically select
        correct radio button.
    */

    const planRadio =
        document.querySelector(
            'input[name="paymentPlan"]' +
            '[value="' +
            plan +
            '"]'
        );

    if (planRadio) {
        planRadio.checked = true;
    }


    /*
        Add logged-in email.
    */

    const paymentEmail =
        document.getElementById(
            "paymentEmail"
        );

    if (paymentEmail) {

        paymentEmail.value =
            getJSyroUserEmail();
    }


    /*
        Update payment button.
    */

    updatePaymentContinueButton(
        plan
    );


    /*
        Close Login / Signup modal.
    */

    closeJSyroAuthForPayment();


    /*
        Open payment popup.
    */

    modal.classList.add(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "payment-modal-open"
    );
}


/* =========================================
   CLOSE PAYMENT POPUP
========================================= */

function closePaymentModal() {

    const modal =
        document.getElementById(
            "paymentModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "payment-modal-open"
    );
}


/* =========================================
   PAYMENT BUTTON TEXT
========================================= */

function updatePaymentContinueButton(
    plan
) {

    const button =
        document.getElementById(
            "paymentContinueBtn"
        );

    const planData =
        jSyroPaidPlans[plan];

    if (
        !button ||
        !planData
    ) {
        return;
    }

    button.dataset.plan =
        plan;

    button.textContent =
        "Continue with " +
        planData.name +
        " — " +
        planData.price +
        "/month →";
}


/* =========================================
   USER CLICKS PAID PLAN
========================================= */

function openPaidLibrary(
    plan
) {

    if (
        !jSyroPaidPlans[plan]
    ) {
        return;
    }


    /*
        Remember which card user clicked.
    */

    localStorage.setItem(
        "jSyroPendingLibrary",
        plan
    );


    /*
        Already logged in?
        Payment opens immediately.
    */

    if (
        isJSyroUserLoggedIn()
    ) {

        localStorage.removeItem(
            "jSyroPendingLibrary"
        );

        openPaymentModal(
            plan
        );

        return;
    }


    /*
        Not logged in:
        open existing Login popup.
    */

    const loginButton =
        document.querySelector(
            ".login-button"
        );

    if (loginButton) {

        loginButton.click();

    } else {

        console.error(
            "Login button not found"
        );
    }
}


/* =========================================
   PRICING CARD FUNCTIONS
========================================= */

function choosePro() {

    openPaidLibrary(
        "pro"
    );
}


function chooseWorkApps() {

    openPaidLibrary(
        "workapps"
    );
}


function chooseBusiness() {

    openPaidLibrary(
        "business"
    );
}


function chooseAllAccess() {

    openPaidLibrary(
        "allaccess"
    );
}


/* =========================================
   AFTER LOGIN / SIGNUP
========================================= */

function watchPaidPlanLogin() {

    const userActions =
        document.querySelector(
            ".user-actions"
        );

    if (!userActions) {
        return;
    }


    function checkPendingPayment() {

        if (
            !isJSyroUserLoggedIn()
        ) {
            return;
        }


        const pendingPlan =
            localStorage.getItem(
                "jSyroPendingLibrary"
            );


        if (
            !pendingPlan ||
            !jSyroPaidPlans[
                pendingPlan
            ]
        ) {
            return;
        }


        /*
            Remove pending status
            before opening payment.
        */

        localStorage.removeItem(
            "jSyroPendingLibrary"
        );


        /*
            IMPORTANT:
            NO WORKSPACE REDIRECT.
        */

        setTimeout(
            function () {

                openPaymentModal(
                    pendingPlan
                );

            },
            250
        );
    }


    /*
        Login state changes
    */

    const observer =
        new MutationObserver(
            checkPendingPayment
        );


    observer.observe(
        userActions,
        {
            attributes: true,
            attributeFilter: [
                "hidden",
                "class",
                "style"
            ]
        }
    );


    /*
        Also check page load.
    */

    checkPendingPayment();
}


/* =========================================
   PLAN SWITCHING INSIDE PAYMENT POPUP
========================================= */

function initializePaymentPlanOptions() {

    const radios =
        document.querySelectorAll(
            'input[name="paymentPlan"]'
        );


    radios.forEach(
        function (radio) {

            radio.addEventListener(
                "change",
                function () {

                    if (
                        !radio.checked
                    ) {
                        return;
                    }


                    const plan =
                        radio.value;


                    localStorage.setItem(
                        "jSyroCheckoutPlan",
                        plan
                    );


                    updatePaymentContinueButton(
                        plan
                    );
                }
            );
        }
    );


    /*
        Secure payment button.
        Real provider comes next.
    */

    const paymentButton =
        document.getElementById(
            "paymentContinueBtn"
        );


    if (paymentButton) {

        paymentButton.addEventListener(
            "click",
            function () {

                const plan =
                    paymentButton
                        .dataset
                        .plan;

                const planData =
                    jSyroPaidPlans[
                        plan
                    ];


                if (!planData) {
                    return;
                }


                /*
                    We will replace this
                    in next step with the
                    real checkout provider.
                */

                alert(
                    planData.name +
                    "\n\n" +
                    planData.price +
                    "/month\n\n" +
                    "Secure payment connection is the next step."
                );
            }
        );
    }
}


/* =========================================
   INITIALIZE PAYMENT FLOW
========================================= */

function initializeJSyroPaymentFlow() {

    watchPaidPlanLogin();

    initializePaymentPlanOptions();
}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeJSyroPaymentFlow
    );

} else {

    initializeJSyroPaymentFlow();
}


/* =========================
   LOGIN / SIGN UP MODAL
========================= */

function openLogin() {
    const modal =
        document.getElementById("authModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "auth-modal-open"
    );

    showLoginForm();

    setTimeout(function () {
        const emailInput =
            document.getElementById(
                "loginEmail"
            );

        if (emailInput) {
            emailInput.focus();
        }
    }, 100);
}


function openSignup() {
    const modal =
        document.getElementById("authModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "auth-modal-open"
    );

    showSignupForm();

    setTimeout(function () {
        const nameInput =
            document.getElementById(
                "signupName"
            );

        if (nameInput) {
            nameInput.focus();
        }
    }, 100);
}


function closeAuthModal() {
    const modal =
        document.getElementById("authModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "auth-modal-open"
    );

    clearAuthMessage();
}


/* =========================
   LOGIN / SIGNUP FORM SWITCH
========================= */

function showLoginForm() {
    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");

    const loginTab =
        document.getElementById("loginTab");

    const signupTab =
        document.getElementById("signupTab");

    const title =
        document.getElementById("authTitle");

    const subtitle =
        document.getElementById(
            "authSubtitle"
        );

    if (!loginForm || !signupForm) {
        return;
    }

    loginForm.hidden = false;
    signupForm.hidden = true;

    if (loginTab) {
        loginTab.classList.add("active");

        loginTab.setAttribute(
            "aria-selected",
            "true"
        );
    }

    if (signupTab) {
        signupTab.classList.remove(
            "active"
        );

        signupTab.setAttribute(
            "aria-selected",
            "false"
        );
    }

    if (title) {
        title.textContent =
            "Log in to continue";
    }

    if (subtitle) {
        subtitle.textContent =
            "Access your workspace and saved projects.";
    }

    clearAuthMessage();
}


function showSignupForm() {
    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");

    const loginTab =
        document.getElementById("loginTab");

    const signupTab =
        document.getElementById("signupTab");

    const title =
        document.getElementById("authTitle");

    const subtitle =
        document.getElementById(
            "authSubtitle"
        );

    if (!loginForm || !signupForm) {
        return;
    }

    loginForm.hidden = true;
    signupForm.hidden = false;

    if (loginTab) {
        loginTab.classList.remove(
            "active"
        );

        loginTab.setAttribute(
            "aria-selected",
            "false"
        );
    }

    if (signupTab) {
        signupTab.classList.add("active");

        signupTab.setAttribute(
            "aria-selected",
            "true"
        );
    }

    if (title) {
        title.textContent =
            "Create your account";
    }

    if (subtitle) {
        subtitle.textContent =
            "Start building and save your J-SYRO projects.";
    }

    clearAuthMessage();
}


/* =========================
   FORM MESSAGES
========================= */

function showAuthMessage(message, type) {
    const messageBox =
        document.getElementById(
            "authMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent = message;

    messageBox.className =
        "auth-message show " + type;
}


function clearAuthMessage() {
    const messageBox =
        document.getElementById(
            "authMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent = "";

    messageBox.className =
        "auth-message";
}


/* =========================
   BUTTON LOADING STATE
========================= */

function setFormLoading(
    form,
    isLoading,
    loadingText
) {
    if (!form) {
        return;
    }

    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );

    if (!submitButton) {
        return;
    }

    if (isLoading) {

        submitButton.dataset.originalText =
            submitButton.textContent;

        submitButton.textContent =
            loadingText;

        submitButton.disabled = true;

        submitButton.style.cursor =
            "wait";

        submitButton.style.opacity =
            "0.75";

    } else {

        submitButton.textContent =
            submitButton.dataset.originalText ||
            "Continue";

        submitButton.disabled = false;

        submitButton.style.cursor = "";

        submitButton.style.opacity = "";

        delete submitButton.dataset
            .originalText;
    }
}


/* =========================
   LOGIN FORM
========================= */

async function handleLogin(event) {
    event.preventDefault();

    clearAuthMessage();

    const form = event.currentTarget;

    const emailInput =
        document.getElementById(
            "loginEmail"
        );

    const passwordInput =
        document.getElementById(
            "loginPassword"
        );

    if (
        !emailInput ||
        !passwordInput
    ) {
        return;
    }

    const email =
        emailInput.value
            .trim()
            .toLowerCase();

    const password =
        passwordInput.value;


    /* Validation */

    if (email === "") {
        showAuthMessage(
            "Please enter your email address.",
            "error"
        );

        emailInput.focus();

        return;
    }

    if (!isValidEmail(email)) {
        showAuthMessage(
            "Please enter a valid email address.",
            "error"
        );

        emailInput.focus();

        return;
    }

    if (password.length < 6) {
        showAuthMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        passwordInput.focus();

        return;
    }

    if (!supabaseClient) {
        showAuthMessage(
            "Supabase connection failed. Please refresh the page.",
            "error"
        );

        return;
    }


    setFormLoading(
        form,
        true,
        "Logging in..."
    );


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .signInWithPassword({
                    email: email,
                    password: password
                });


        if (error) {
            throw error;
        }


        if (!data.session) {
            showAuthMessage(
                "Login could not be completed. Please try again.",
                "error"
            );

            return;
        }


        showAuthMessage(
            "Login successful. Opening your workspace...",
            "success"
        );


        setTimeout(function () {
            window.location.href =
                "workspace.html";
        }, 800);


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        showAuthMessage(
            getFriendlyAuthError(error),
            "error"
        );

    } finally {

        setFormLoading(
            form,
            false,
            "Logging in..."
        );
    }
}


/* =========================
   SIGN UP FORM
========================= */

async function handleSignup(event) {
    event.preventDefault();

    clearAuthMessage();

    const form = event.currentTarget;

    const nameInput =
        document.getElementById(
            "signupName"
        );

    const emailInput =
        document.getElementById(
            "signupEmail"
        );

    const passwordInput =
        document.getElementById(
            "signupPassword"
        );

    const confirmPasswordInput =
        document.getElementById(
            "signupConfirmPassword"
        );


    if (
        !nameInput ||
        !emailInput ||
        !passwordInput ||
        !confirmPasswordInput
    ) {
        return;
    }


    const fullName =
        nameInput.value.trim();

    const email =
        emailInput.value
            .trim()
            .toLowerCase();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    /* Validation */

    if (fullName.length < 2) {
        showAuthMessage(
            "Please enter your full name.",
            "error"
        );

        nameInput.focus();

        return;
    }


    if (!isValidEmail(email)) {
        showAuthMessage(
            "Please enter a valid email address.",
            "error"
        );

        emailInput.focus();

        return;
    }


    if (password.length < 6) {
        showAuthMessage(
            "Password must contain at least 6 characters.",
            "error"
        );

        passwordInput.focus();

        return;
    }


    if (password !== confirmPassword) {
        showAuthMessage(
            "Passwords do not match.",
            "error"
        );

        confirmPasswordInput.focus();

        return;
    }


    if (!supabaseClient) {
        showAuthMessage(
            "Supabase connection failed. Please refresh the page.",
            "error"
        );

        return;
    }


    setFormLoading(
        form,
        true,
        "Creating account..."
    );


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .signUp({
                    email: email,

                    password: password,

                    options: {
                        data: {
                            full_name:
                                fullName
                        }
                    }
                });


        if (error) {
            throw error;
        }


        /*
        If email confirmation is disabled,
        Supabase returns a session immediately.
        */

        if (data.session) {

            showAuthMessage(
                "Account created successfully. Opening your workspace...",
                "success"
            );


            setTimeout(function () {
                window.location.href =
                    "workspace.html";
            }, 900);

            return;
        }


        /*
        If email confirmation is enabled,
        the user must confirm their email first.
        */

        showAuthMessage(
            "Account created. Please check your email and confirm your account before logging in.",
            "success"
        );


        form.reset();


    } catch (error) {

        console.error(
            "Sign Up error:",
            error
        );

        showAuthMessage(
            getFriendlyAuthError(error),
            "error"
        );

    } finally {

        setFormLoading(
            form,
            false,
            "Creating account..."
        );
    }
}


/* =========================
   FRIENDLY SUPABASE ERRORS
========================= */

function getFriendlyAuthError(error) {
    const message =
        error && error.message
            ? error.message.toLowerCase()
            : "";


    if (
        message.includes(
            "invalid login credentials"
        )
    ) {
        return (
            "Email or password is incorrect."
        );
    }


    if (
        message.includes(
            "email not confirmed"
        )
    ) {
        return (
            "Please confirm your email before logging in."
        );
    }


    if (
        message.includes(
            "user already registered"
        ) ||
        message.includes(
            "already been registered"
        )
    ) {
        return (
            "An account with this email already exists."
        );
    }


    if (
        message.includes(
            "password should be"
        )
    ) {
        return (
            "Please choose a stronger password."
        );
    }


    if (
        message.includes(
            "rate limit"
        ) ||
        message.includes(
            "too many requests"
        )
    ) {
        return (
            "Too many attempts. Please wait a few minutes and try again."
        );
    }


    if (
        message.includes(
            "failed to fetch"
        ) ||
        message.includes(
            "network"
        )
    ) {
        return (
            "Internet connection problem. Please check your connection."
        );
    }


    return (
        error && error.message
            ? error.message
            : "Something went wrong. Please try again."
    );
}


/* =========================
   EMAIL VALIDATION
========================= */

function isValidEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeAuthModal();
        }

    }
);
/* =========================
   HOME PAGE ACCOUNT STATE
========================= */

function updateHomeAccountUI(session) {
    const guestActions =
        document.getElementById("guestActions");

    const userActions =
        document.getElementById("userActions");

    const userIdentity =
        document.getElementById("homeUserIdentity");


    const user =
        session && session.user
            ? session.user
            : null;


    /* User logged in */

    if (user) {
        if (guestActions) {
            guestActions.hidden = true;
        }

        if (userActions) {
            userActions.hidden = false;
        }


        const fullName =
            user.user_metadata &&
            user.user_metadata.full_name
                ? user.user_metadata.full_name.trim()
                : "";


        if (userIdentity) {
            userIdentity.textContent =
                fullName ||
                user.email ||
                "My account";
        }

        return;
    }


    /* User logged out */

    if (guestActions) {
        guestActions.hidden = false;
    }

    if (userActions) {
        userActions.hidden = true;
    }

    if (userIdentity) {
        userIdentity.textContent =
            "Account";
    }
}


/* Check saved login when page opens */

async function checkHomeAccount() {
    if (!supabaseClient) {
        return;
    }


    try {
        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();


        if (error) {
            throw error;
        }


        updateHomeAccountUI(
            data.session
        );

    } catch (error) {
        console.error(
            "Home session check failed:",
            error
        );

        updateHomeAccountUI(null);
    }
}


/* Logout from welcome page */

async function logoutFromHome() {
    if (!supabaseClient) {
        return;
    }


    const logoutButton =
        document.getElementById(
            "homeLogoutBtn"
        );


    if (logoutButton) {
        logoutButton.disabled = true;

        logoutButton.textContent =
            "Logging out...";
    }


    try {
        const {
            error
        } =
            await supabaseClient.auth
                .signOut({
                    scope: "local"
                });


        if (error) {
            throw error;
        }


        updateHomeAccountUI(null);


    } catch (error) {
        console.error(
            "Home logout failed:",
            error
        );

        alert(
            "Logout failed. Please try again."
        );

    } finally {
        if (logoutButton) {
            logoutButton.disabled = false;

            logoutButton.textContent =
                "Logout";
        }
    }
}


/* Logout button */

document
    .getElementById("homeLogoutBtn")
    ?.addEventListener(
        "click",
        logoutFromHome
    );


/* Keep account UI updated automatically */

if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange(
        function (event, session) {
            updateHomeAccountUI(session);
        }
    );
}


/* Run check when welcome page loads */

checkHomeAccount();