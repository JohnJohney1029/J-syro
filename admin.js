/* J-SYRO ADMIN DASHBOARD */

const ADMIN_SUPABASE_URL="https://sajlcmcotxssyvovykkm.supabase.co";
const ADMIN_SUPABASE_KEY="sb_publishable_6_oc0OAP5GXLJatcYM8Osw__8TVvBuX";
const adminSupabase=window.supabase.createClient(ADMIN_SUPABASE_URL,ADMIN_SUPABASE_KEY);
const $=selector=>document.querySelector(selector);
const $$=selector=>Array.from(document.querySelectorAll(selector));

let currentAdminUser=null;
let allAdminUsers=[];
let allAdminProjects=[];
let adminToastTimer=null;

function escapeAdminHtml(value){
    return String(value??"").replace(/[&<>"']/g,character=>({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    })[character]);
}

function formatAdminDate(value){
    if(!value)return"Not available";
    const date=new Date(value);
    if(Number.isNaN(date.getTime()))return"Not available";
    return date.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
}

function formatAdminDateTime(value){
    if(!value)return"Not available";
    const date=new Date(value);
    if(Number.isNaN(date.getTime()))return"Not available";
    return date.toLocaleString(undefined,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
}

function showAdminToast(message){
    const toast=$("#adminToast");
    if(!toast)return;
    toast.textContent=message;
    toast.classList.add("show");
    clearTimeout(adminToastTimer);
    adminToastTimer=setTimeout(()=>toast.classList.remove("show"),2600);
}

function getDisplayName(user){
    return user.user_metadata?.full_name||user.user_metadata?.name||user.email?.split("@")[0]||"Administrator";
}

/* ADMIN ACCESS CHECK */

async function initializeAdminAccess(){
    try{
        const{data:sessionData,error:sessionError}=await adminSupabase.auth.getSession();

        if(sessionError||!sessionData.session){
            window.location.replace("index.html");
            return false;
        }

        const user=sessionData.session.user;
        const{data:planData,error:planError}=await adminSupabase
            .from("user_plans")
            .select("plan,status,role")
            .eq("user_id",user.id)
            .maybeSingle();

        if(planError)throw planError;

        if(!planData||planData.role!=="admin"||planData.status!=="active"){
            window.alert("Admin access is required.");
            window.location.replace("workspace.html");
            return false;
        }

        currentAdminUser=user;

        const adminName=$("#adminUserName");
        const adminEmail=$("#adminUserEmail");

        if(adminName)adminName.textContent=getDisplayName(user);
        if(adminEmail)adminEmail.textContent=user.email||"";

        document.body.classList.remove("admin-checking");
        return true;
    }catch(error){
        console.error("Admin access error:",error);
        window.alert(error.message||"Admin access could not be verified.");
        window.location.replace("workspace.html");
        return false;
    }
}

/* NAVIGATION */

function initializeAdminNavigation(){
    const titles={dashboardSection:"Dashboard",trafficSection:"Traffic",usersSection:"Users",projectsSection:"Projects"};

    $$(".admin-nav-button").forEach(button=>{
        button.addEventListener("click",()=>{
            const sectionId=button.dataset.adminSection;

            $$(".admin-nav-button").forEach(item=>
                item.classList.toggle("active",item===button)
            );

            $$(".admin-section").forEach(section=>
                section.classList.toggle("active",section.id===sectionId)
            );

            const pageTitle=$("#adminPageTitle");
            if(pageTitle)pageTitle.textContent=titles[sectionId]||"Dashboard";
        });
    });
}

/* DASHBOARD STATS */

async function loadAdminStats(){
    const{data,error}=await adminSupabase.rpc("admin_dashboard_stats");
    if(error)throw error;

    const stats=Array.isArray(data)?(data[0]||{}):(data||{});

    const values={
        totalUsersStat:stats.total_users??0,
        totalProjectsStat:stats.total_projects??0,
        freeUsersStat:stats.free_users??0,
        proUsersStat:stats.pro_users??0,
        businessUsersStat:stats.business_users??0,
        workappsUsersStat:stats.workapps_users??0,
        allAccessUsersStat:stats.all_access_users??0,
        adminUsersStat:stats.admin_users??0
    };

    Object.entries(values).forEach(([id,value])=>{
        const el=$("#"+id);
        if(el)el.textContent=value;
    });
}

/* WEBSITE TRAFFIC — FIXED */

async function loadAdminTraffic(){
    try{
        const{data,error}=await adminSupabase.rpc("admin_traffic_stats");
        if(error)throw error;

        const stats=Array.isArray(data)?(data[0]||{}):(data||{});

        const today=Number(stats.today??0);
        const week=Number(stats.this_week??stats.week??0);
        const month=Number(stats.this_month??stats.month??0);
        const total=Number(stats.total??0);

        const values={
            todayTrafficStat:today,
            monthTrafficStat:month,

            dashboardTodayTraffic:today,
            dashboardWeekTraffic:week,
            dashboardMonthTraffic:month,

            trafficToday:today,
            trafficWeek:week,
            trafficMonth:month,
            trafficAllTime:total,

            trafficTodaySummary:today,
            trafficWeekSummary:week,
            trafficMonthSummary:month
        };

        Object.entries(values).forEach(([id,value])=>{
            const el=$("#"+id);
            if(el)el.textContent=value;
        });

        console.log("J-SYRO traffic loaded:",{today,week,month,total});
    }catch(error){
        console.warn("Traffic statistics are not available:",error);

        [
            "todayTrafficStat","monthTrafficStat",
            "dashboardTodayTraffic","dashboardWeekTraffic","dashboardMonthTraffic",
            "trafficToday","trafficWeek","trafficMonth","trafficAllTime",
            "trafficTodaySummary","trafficWeekSummary","trafficMonthSummary"
        ].forEach(id=>{
            const el=$("#"+id);
            if(el)el.textContent="—";
        });
    }
}

/* USERS */

async function loadAdminUsers(){
    const{data,error}=await adminSupabase.rpc("admin_list_users");
    if(error)throw error;

    allAdminUsers=Array.isArray(data)?data:[];
    renderAdminUsers();
}

function getFilteredAdminUsers(){
    const search=$("#adminUserSearch")?.value.trim().toLowerCase()||"";
    const plan=$("#adminUserPlanFilter")?.value||"all";

    return allAdminUsers.filter(user=>{
        const searchText=[user.display_name,user.email,user.user_id]
            .filter(Boolean).join(" ").toLowerCase();

        return(
            (!search||searchText.includes(search))&&
            (plan==="all"||user.plan===plan)
        );
    });
}

function renderAdminUsers(){
    const tableBody=$("#adminUsersTableBody");
    if(!tableBody)return;

    const users=getFilteredAdminUsers();

    if(users.length===0){
        tableBody.innerHTML=`
            <tr>
                <td colspan="6" class="admin-table-message">
                    No matching users found.
                </td>
            </tr>`;
        return;
    }

    tableBody.innerHTML=users.map(user=>`
        <tr>
            <td class="admin-user-cell">
                <strong>
                    ${escapeAdminHtml(user.display_name||"J-SYRO User")}
                    ${String(user.user_role||"user").toLowerCase()==="admin"
                        ?'<span class="admin-user-admin-badge">ADMIN</span>':""}
                </strong>
                <span>${escapeAdminHtml(user.email||user.user_id)}</span>
            </td>
            <td><span class="admin-plan-name ${escapeAdminHtml(user.plan)}">${escapeAdminHtml(String(user.plan||"free").toUpperCase())}</span></td>
            <td>${escapeAdminHtml(user.plan_status||"active")}</td>
            <td>${escapeAdminHtml(user.user_role||"user")}</td>
            <td>${escapeAdminHtml(formatAdminDate(user.created_at))}</td>
            <td>
                <button class="admin-action-button" type="button" data-edit-user="${escapeAdminHtml(user.user_id)}">Edit Access</button>
            </td>
        </tr>
    `).join("");

    tableBody.querySelectorAll("[data-edit-user]").forEach(button=>{
        button.addEventListener("click",()=>editAdminUserAccess(button.dataset.editUser));
    });
}

async function editAdminUserAccess(userId){
    const user=allAdminUsers.find(item=>item.user_id===userId);
    if(!user)return;

    const newPlan=window.prompt(
        "Enter plan: free, pro, workapps, business or all_access",
        user.plan||"free"
    );
    if(newPlan===null)return;

    const cleanPlan=newPlan.trim().toLowerCase();

    if(!["free","pro","business","workapps","all_access"].includes(cleanPlan)){
        showAdminToast("Invalid plan");
        return;
    }

    const newStatus=window.prompt(
        "Enter status: active, cancelled or past_due",
        user.plan_status||"active"
    );
    if(newStatus===null)return;

    const cleanStatus=newStatus.trim().toLowerCase();

    if(!["active","cancelled","past_due"].includes(cleanStatus)){
        showAdminToast("Invalid status");
        return;
    }

    const newRole=window.prompt(
        "Enter role: user or admin",
        user.user_role||"user"
    );
    if(newRole===null)return;

    const cleanRole=newRole.trim().toLowerCase();

    if(!["user","admin"].includes(cleanRole)){
        showAdminToast("Invalid role");
        return;
    }

    const expiryDefault=user.expires_at?String(user.expires_at).slice(0,10):"";

    const expiryInput=window.prompt(
        "Expiry date YYYY-MM-DD, or leave blank for no expiry",
        expiryDefault
    );
    if(expiryInput===null)return;

    let expiresAt=null;

    if(expiryInput.trim()){
        const expiryDate=new Date(`${expiryInput.trim()}T23:59:59.999Z`);

        if(Number.isNaN(expiryDate.getTime())){
            showAdminToast("Invalid expiry date");
            return;
        }

        expiresAt=expiryDate.toISOString();
    }

    const confirmed=window.confirm(`Update access for ${user.email}?`);
    if(!confirmed)return;

    try{
        const{error}=await adminSupabase.rpc("admin_update_user_access",{
            target_user_id:user.user_id,
            new_plan:cleanPlan,
            new_status:cleanStatus,
            new_role:cleanRole,
            new_expires_at:expiresAt
        });

        if(error)throw error;

        showAdminToast("User access updated");

        await Promise.all([
            loadAdminUsers(),
            loadAdminStats()
        ]);
    }catch(error){
        console.error("User access update error:",error);
        showAdminToast(error.message||"User access could not be updated");
    }
}


/* PROJECTS */

async function loadAdminProjects(){

    const tableBody=$("#adminProjectsTableBody");

    if(!tableBody)return;

    tableBody.innerHTML=`
        <tr>
            <td colspan="5" class="admin-table-message">
                Loading projects...
            </td>
        </tr>
    `;

    try{

        /* SESSION */

        const {
            data: sessionData,
            error: sessionError
        } = await adminSupabase.auth.getSession();

        console.log(
            "PROJECTS SESSION:",
            JSON.stringify(sessionData,null,2)
        );

        if(sessionError)throw sessionError;

        const sessionUser=sessionData?.session?.user;

        console.log(
            "PROJECTS SESSION USER:",
            sessionUser?.id,
            sessionUser?.email
        );

        if(!sessionUser){
            throw new Error("No active Supabase session.");
        }


        /* ADMIN RECORD */

        const {
            data: planData,
            error: planError
        } = await adminSupabase
            .from("user_plans")
            .select("user_id,plan,role,status")
            .eq("user_id",sessionUser.id)
            .maybeSingle();

        console.log(
            "PROJECTS ADMIN RECORD:",
            JSON.stringify(planData,null,2)
        );

        if(planError)throw planError;


        /* ADMIN DEBUG */

        const {
            data: debugData,
            error: debugError
        } = await adminSupabase.rpc(
            "debug_admin_access"
        );

        console.log(
            "PROJECTS ADMIN DEBUG DATA:",
            JSON.stringify(debugData,null,2)
        );

        console.log(
            "PROJECTS ADMIN DEBUG ERROR:",
            JSON.stringify(debugError,null,2)
        );


        /* PROJECT RPC */

        const {
            data,
            error
        } = await adminSupabase.rpc(
            "admin_list_projects"
        );

        console.log(
            "ADMIN PROJECT DATA:",
            JSON.stringify(data,null,2)
        );

        console.log(
            "ADMIN PROJECT ERROR:",
            JSON.stringify(error,null,2)
        );


        if(error){

            const fullError=[
                `code=${error.code||""}`,
                `message=${error.message||""}`,
                `details=${error.details||""}`,
                `hint=${error.hint||""}`
            ].join("\n");

            console.error(
                "ADMIN PROJECT RPC FULL ERROR:\n"+fullError
            );

            tableBody.innerHTML=`
                <tr>
                    <td colspan="5" class="admin-table-message">
                        ${escapeAdminHtml(
                            error.message ||
                            "Could not load projects."
                        )}
                    </td>
                </tr>
            `;

            return;
        }


        allAdminProjects=Array.isArray(data)
            ?data
            :[];

        renderAdminProjects();

    }catch(error){

        console.error(
            "Projects loading failed:",
            error
        );

        tableBody.innerHTML=`
            <tr>
                <td colspan="5" class="admin-table-message">
                    ${escapeAdminHtml(
                        error?.message ||
                        "Could not load projects."
                    )}
                </td>
            </tr>
        `;
    }
}

function renderAdminProjects(){

    const tableBody=$("#adminProjectsTableBody");

    if(!tableBody)return;

    const search=
        $("#adminProjectSearch")?.value
            .trim()
            .toLowerCase() || "";

    const projects=allAdminProjects.filter(project=>{

        const searchText=[
            project.project_name,
            project.project_key,
            project.owner_email,
            project.owner_id
        ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

        return(
            !search ||
            searchText.includes(search)
        );
    });


    if(projects.length===0){

        tableBody.innerHTML=`
            <tr>
                <td colspan="5" class="admin-table-message">
                    No projects found.
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML=projects.map(project=>`

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
                    project.project_key || ""
                )}
            </td>

            <td>
                ${escapeAdminHtml(
                    project.owner_email ||
                    project.owner_id ||
                    ""
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

    `).join("");
}
/* REFRESH DASHBOARD */

async function refreshAdminDashboard(){
    const refreshButton=$("#refreshAdminDashboard");
    const originalText=refreshButton?.textContent||"↻ Refresh";

    if(refreshButton){
        refreshButton.disabled=true;
        refreshButton.textContent="Refreshing...";
    }

    const results=await Promise.allSettled([
        loadAdminStats(),
        loadAdminTraffic(),
        loadAdminUsers(),
        loadAdminProjects()
    ]);

    const failedResult=results.find(result=>result.status==="rejected");

    if(failedResult){
        console.error("Admin dashboard load error:",failedResult.reason);
        showAdminToast(failedResult.reason?.message||"Some admin data could not be loaded");
    }else{
        showAdminToast("Dashboard refreshed");
    }

    if(refreshButton){
        refreshButton.disabled=false;
        refreshButton.textContent=originalText;
    }
}

/* LOGOUT */

async function adminLogout(){
    const button=$("#adminLogoutBtn");
    const originalText=button?.textContent||"Logout";

    if(button){
        button.disabled=true;
        button.textContent="Logging out...";
    }

    try{
        await adminSupabase.auth.signOut();
        window.location.replace("index.html");
    }catch(error){
        console.error("Admin logout error:",error);
        showAdminToast("Logout failed");

        if(button){
            button.disabled=false;
            button.textContent=originalText;
        }
    }
}

/* EVENT LISTENERS */

function showAdminSection(sectionId){
    const button=$(`.admin-nav-button[data-admin-section="${sectionId}"]`);
    if(button)button.click();
}

function initializeAdminEvents(){
    initializeAdminNavigation();

    $("#refreshAdminDashboard")?.addEventListener("click",refreshAdminDashboard);

    $("#refreshTrafficBtn")?.addEventListener("click",async()=>{
        const button=$("#refreshTrafficBtn");
        if(button){
            button.disabled=true;
            button.textContent="Refreshing...";
        }
        try{
            await loadAdminTraffic();
            showAdminToast("Traffic refreshed");
        }finally{
            if(button){
                button.disabled=false;
                button.textContent="↻ Refresh";
            }
        }
    });

    $("#viewTrafficBtn")?.addEventListener("click",()=>{
        showAdminSection("trafficSection");
    });

    $("#adminLogoutBtn")?.addEventListener("click",adminLogout);

    $("#adminUserSearch")?.addEventListener("input",renderAdminUsers);
    $("#adminUserPlanFilter")?.addEventListener("change",renderAdminUsers);
    $("#adminProjectSearch")?.addEventListener("input",renderAdminProjects);
}

/* START ADMIN DASHBOARD */

async function startAdminDashboard(){
    const hasAdminAccess=await initializeAdminAccess();

    if(!hasAdminAccess)return;

    initializeAdminEvents();
    await refreshAdminDashboard();
}

if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",startAdminDashboard);
}else{
    startAdminDashboard();
}
