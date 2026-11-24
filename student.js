/* DARK MODE (self-contained: styles + toggle button)
   - Applies the saved theme before the page paints (no white flash).
   - First visit follows the device setting (light / dark).
   - Adds a sun/moon button; the choice is remembered in localStorage and
     separately for each portal (student, instructor, admin). */
(function () {
    var KEY = "cr_theme_student";   // each portal keeps its OWN dark-mode setting
    var root = document.documentElement;

    /* Dark colors are built into this file, so no extra css file is needed. */
    if (!document.getElementById("cr-dark-css")) {
        var darkStyle = document.createElement("style");
        darkStyle.id = "cr-dark-css";
        darkStyle.textContent = `
/* =========================================================
   CLASSROOMRESERVE - DARK MODE (student, instructor, admin)
   Load AFTER the page's own css. Everything dark lives under
   html[data-theme="dark"]; light mode is not touched.
========================================================= */

/* ---------- theme button (works in light + dark) ---------- */
.theme-toggle .i-sun { display: none; }
html[data-theme="dark"] .theme-toggle .i-sun { display: block; }
html[data-theme="dark"] .theme-toggle .i-moon { display: none; }
.theme-toggle svg { flex-shrink: 0; }

.s-actions { display: flex; align-items: center; gap: 8px; }
.s-refresh.s-theme { padding: 9px 11px; }


@media print { .theme-toggle, .theme-fab { display: none !important; } }

/* =========================================================
   DARK
========================================================= */
html[data-theme="dark"] { color-scheme: dark; }

html[data-theme="dark"] {
    /* shared palette */
    --d-bg: #0E1512;
    --d-surface: #16201B;
    --d-surface-2: #1C2924;
    --d-border: #2B3A33;
    --d-text: #E4EEE8;
    --d-muted: #93A69C;
    --d-accent: #5FD39A;          /* green used for text/icons on dark */

    /* student */
    --bg: var(--d-bg);
    --white: var(--d-surface);
    --line: var(--d-border);
    --text: var(--d-text);
    --muted: var(--d-muted);
    --ink: #E4EEE8;
    --green: #2E9B68;

    --free-bg: #12362A;  --free-line: #25664A;  --free-text: #6FDDA5;
    --part-bg: #3A2E12;  --part-line: #7A5B1E;  --part-text: #F0C676;
    --full-bg: #3A1D1F;  --full-line: #7A3A3C;  --full-text: #F29A9A;
    --past-bg: #1C2420;  --past-text: #6F8179;

    /* admin */
    --light: #1B3A2C;
    --border: var(--d-border);

    /* instructor */
    --background: var(--d-bg);
    --primary-light: #1B3A2C;
    --shadow: 0 3px 12px rgba(0, 0, 0, .35);
}

html[data-theme="dark"] body {
    background: var(--d-bg);
    color: var(--d-text);
}

html[data-theme="dark"] :focus-visible { outline-color: #3FAE7B; }
html[data-theme="dark"] ::placeholder { color: #6F8179; opacity: 1; }
html[data-theme="dark"] ::selection { background: #2E9B6866; }
html[data-theme="dark"] input,
html[data-theme="dark"] select,
html[data-theme="dark"] textarea { color: var(--d-text); }
html[data-theme="dark"] option { background: #16201B; color: var(--d-text); }

/* ---------------------------------------------------------
   STUDENT PORTAL
--------------------------------------------------------- */
html[data-theme="dark"] .s-header { background: #0B1511; border-bottom: 1px solid var(--d-border); }
html[data-theme="dark"] .s-logo { background: #17382B; }
html[data-theme="dark"] .s-brand strong { color: #fff; }
html[data-theme="dark"] .s-intro h1,
html[data-theme="dark"] .s-cal-head h2,
html[data-theme="dark"] .s-day h2,
html[data-theme="dark"] .s-booked h3 { color: var(--d-text); }

html[data-theme="dark"] .s-field select,
html[data-theme="dark"] .s-roominfo,
html[data-theme="dark"] .s-calendar,
html[data-theme="dark"] .s-day,
html[data-theme="dark"] .s-nav,
html[data-theme="dark"] .s-today,
html[data-theme="dark"] .s-legend li { background: var(--d-surface); }

html[data-theme="dark"] .s-roominfo img { background: #223029; }
html[data-theme="dark"] .s-nav { color: var(--d-accent); }
html[data-theme="dark"] .s-nav:hover { background: #1F3329; }
html[data-theme="dark"] .s-today { color: var(--d-accent); border-color: #2E9B68; }
html[data-theme="dark"] .s-today:hover { background: #2E9B68; color: #fff; }

html[data-theme="dark"] .s-notice { background: #3A2E12; border-color: #7A5B1E; color: #F0D9A5; }

html[data-theme="dark"] .s-day-cell:hover { box-shadow: 0 3px 12px rgba(0, 0, 0, .5); }
html[data-theme="dark"] .s-day-cell.today { box-shadow: 0 0 0 2px #E4EEE8; }
html[data-theme="dark"] .s-day-cell.selected {
    background: #2E9B68;
    border-color: #2E9B68;
    color: #06150E;
}
html[data-theme="dark"] .s-fill { background: rgba(0, 0, 0, .35); }
html[data-theme="dark"] .s-day-cell.selected .s-fill { background: rgba(0, 0, 0, .25); }
html[data-theme="dark"] .s-day-cell.selected .s-fill b { background: #06150E; }

html[data-theme="dark"] .dot.past { border-color: #3A4A43; }
html[data-theme="dark"] .dot.free { border-color: #3FAE7B; }
html[data-theme="dark"] .dot.part { border-color: #C28C2C; }
html[data-theme="dark"] .dot.full { border-color: #C45858; }
html[data-theme="dark"] .dot.today { background: var(--d-surface); border-color: #E4EEE8; }

html[data-theme="dark"] .s-slot.passed { border-color: #2B3A33; }
html[data-theme="dark"] .s-booked li { background: #2A1A1C; border-color: #5E3032; }
html[data-theme="dark"] .s-who small + small { color: #D9A0A0; }
html[data-theme="dark"] .s-slot.reserved.done { background: #1A2B23; border-color: #2F4A3D; color: #9CC4AE; }
html[data-theme="dark"] .s-booked li.done { background: #172720; border-color: #2F4A3D; }
html[data-theme="dark"] .s-booked li.done .s-when { color: #9CC4AE; }
html[data-theme="dark"] .s-booked li.done .s-who small + small { color: var(--d-muted); }
html[data-theme="dark"] .s-done,
html[data-theme="dark"] .s-slot.done .s-state { color: #6FDDA5; }

/* ---------------------------------------------------------
   ADMIN PORTAL
--------------------------------------------------------- */
html[data-theme="dark"] .login-card,
html[data-theme="dark"] .admin-modal-content,
html[data-theme="dark"] .admin-topbar,
html[data-theme="dark"] .admin-stat,
html[data-theme="dark"] .admin-table-card,
html[data-theme="dark"] .admin-room-card,
html[data-theme="dark"] .admin-notification,
html[data-theme="dark"] .fb-card { background: var(--d-surface); }

html[data-theme="dark"] .login-card { box-shadow: 0 20px 50px rgba(0, 0, 0, .55); }
html[data-theme="dark"] .login-card h1 { color: var(--d-text); }
html[data-theme="dark"] .admin-auth { background: linear-gradient(140deg, #07100C, #14513A); }

html[data-theme="dark"] .login-card input,
html[data-theme="dark"] .admin-modal-content input,
html[data-theme="dark"] .admin-modal-content select,
html[data-theme="dark"] .admin-modal-content textarea,
html[data-theme="dark"] .admin-search,
html[data-theme="dark"] .admin-filters input,
html[data-theme="dark"] .admin-filters select,
html[data-theme="dark"] .fb-card textarea { background: #101914; border-color: var(--d-border); }

html[data-theme="dark"] .admin-sidebar { background: #0B1511; border-right: 1px solid var(--d-border); }
html[data-theme="dark"] .admin-toast { background: #1C2924; border: 1px solid var(--d-border); }
html[data-theme="dark"] .admin-modal { background: rgba(0, 0, 0, .7); }

html[data-theme="dark"] .admin-outline,
html[data-theme="dark"] .small-btn,
html[data-theme="dark"] .notif-tab { background: var(--d-surface-2); border-color: var(--d-border); }
html[data-theme="dark"] .admin-outline,
html[data-theme="dark"] .small-btn { color: var(--d-accent); }
html[data-theme="dark"] .small-btn.danger { color: #F28585; }
html[data-theme="dark"] .notif-tab.active { background: #2E9B68; border-color: #2E9B68; color: #fff; }

html[data-theme="dark"] .admin-avatar,
html[data-theme="dark"] .admin-logo,
html[data-theme="dark"] .admin-chip { background-color: #1B3A2C; color: var(--d-accent); }
html[data-theme="dark"] .admin-stat > i,
html[data-theme="dark"] .admin-notification i { color: var(--d-accent); }
html[data-theme="dark"] .admin-stat { box-shadow: 0 3px 12px rgba(0, 0, 0, .3); }

html[data-theme="dark"] .admin-welcome { background: linear-gradient(110deg, #0F2E22, #1B6B47); }

html[data-theme="dark"] th,
html[data-theme="dark"] .dept-row td { background: #1C2A23; color: #A9C4B6; }
html[data-theme="dark"] tr.group-row td { background: #1A2B23; border-top-color: #2F4A3D; color: var(--d-text); }
html[data-theme="dark"] tbody tr:hover { background: #1B2823; }
html[data-theme="dark"] .admin-room-card img { background: #223029; }
html[data-theme="dark"] .usage-bar { background: #26352E; }

html[data-theme="dark"] .admin-notification.unread,
html[data-theme="dark"] .fb-card.unread {
    background: #15332A;
    border-color: #25664A;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .3);
}

html[data-theme="dark"] .danger-outline { color: #F28585; border-color: #6B3335; }

/* status pills (admin + instructor) */
html[data-theme="dark"] .status-active,
html[data-theme="dark"] .status-confirmed,
html[data-theme="dark"] .fb-status.resolved { color: #6FDDA5; background: #12362A; }
html[data-theme="dark"] .status-inactive,
html[data-theme="dark"] .status-cancelled { color: #F29A9A; background: #3A1D1F; }
html[data-theme="dark"] .status-completed,
html[data-theme="dark"] .history-count { color: #B6C2CC; background: #26313A; }
html[data-theme="dark"] .status-pending,
html[data-theme="dark"] .fb-status.reviewed { color: #F0C676; background: #3A2E12; }
html[data-theme="dark"] .fb-status.new,
html[data-theme="dark"] .status-new { color: #8DB8F5; background: #1B2B45; }

/* ---------------------------------------------------------
   INSTRUCTOR PORTAL
--------------------------------------------------------- */
html[data-theme="dark"] .auth-screen,
html[data-theme="dark"] .auth-content { background: var(--d-bg); }
html[data-theme="dark"] .auth-box h2,
html[data-theme="dark"] .form-section-title { color: var(--d-text); }
html[data-theme="dark"] .auth-box input { background: #101914; }

html[data-theme="dark"] .topbar,
html[data-theme="dark"] .stat-card,
html[data-theme="dark"] .room-card,
html[data-theme="dark"] .table-card,
html[data-theme="dark"] .form-card,
html[data-theme="dark"] .calendar-card,
html[data-theme="dark"] .notification-item,
html[data-theme="dark"] .modal-content,
html[data-theme="dark"] .modal-close,
html[data-theme="dark"] .empty-state,
html[data-theme="dark"] .footer,
html[data-theme="dark"] .date-picker,
html[data-theme="dark"] .schedule-preview,
html[data-theme="dark"] .feedback-card { background: var(--d-surface); }

html[data-theme="dark"] .sidebar { background: #0B1511; border-right: 1px solid var(--d-border); }
html[data-theme="dark"] .toast { background: #1C2924; border: 1px solid var(--d-border); }
html[data-theme="dark"] .toast.success { background: #14573B; border-color: #1F7A54; }
html[data-theme="dark"] .toast.error { background: #6B2326; border-color: #8E3236; }
html[data-theme="dark"] .modal { background: rgba(0, 0, 0, .7); }
html[data-theme="dark"] .empty-state { border-color: #2F4A3D; }
html[data-theme="dark"] .breadcrumb strong { color: var(--d-text); }

html[data-theme="dark"] .filter-bar input,
html[data-theme="dark"] .filter-bar select,
html[data-theme="dark"] .calendar-controls select,
html[data-theme="dark"] .calendar-controls input,
html[data-theme="dark"] .form-group input,
html[data-theme="dark"] .form-group select,
html[data-theme="dark"] .form-group textarea,
html[data-theme="dark"] .schedule-preview td input[type="time"] { background: #101914; border-color: var(--d-border); color: var(--d-text); }
html[data-theme="dark"] .form-group input:read-only { background: #17211C; color: var(--d-muted); }

html[data-theme="dark"] .btn-outline,
html[data-theme="dark"] .btn-light,
html[data-theme="dark"] .small-btn,
html[data-theme="dark"] .photo-upload-btn,
html[data-theme="dark"] .view-tab,
html[data-theme="dark"] .dp-head button,
html[data-theme="dark"] .action-btn { background: var(--d-surface-2); border-color: var(--d-border); }
html[data-theme="dark"] .btn-outline,
html[data-theme="dark"] .btn-light,
html[data-theme="dark"] .photo-upload-btn,
html[data-theme="dark"] .dp-head button { color: var(--d-accent); }
html[data-theme="dark"] .btn-outline:hover,
html[data-theme="dark"] .btn-light:hover,
html[data-theme="dark"] .photo-upload-btn:hover,
html[data-theme="dark"] .small-btn:hover,
html[data-theme="dark"] .dp-head button:hover { background: #24382F; }
html[data-theme="dark"] .action-btn { color: #F28585; border-color: #8E3236; }
html[data-theme="dark"] .action-btn:hover { background: #C73737; color: #fff; }
html[data-theme="dark"] .action-btn.neutral { color: var(--d-accent); border-color: #2E9B68; background: transparent; }
html[data-theme="dark"] .action-btn.neutral:hover { background: #2E9B68; color: #fff; }
html[data-theme="dark"] .view-tab.active { background: #2E9B68; border-color: #2E9B68; color: #fff; }
html[data-theme="dark"] .btn-primary { background: #1F8A5B; }
html[data-theme="dark"] .btn-primary:hover { background: #2AA06C; }
html[data-theme="dark"] .text-btn,
html[data-theme="dark"] .mobile-brand,
html[data-theme="dark"] .form-section-title i,
html[data-theme="dark"] .room-card .room-status { color: var(--d-accent); }
html[data-theme="dark"] .icon-btn:hover { background: #24382F; color: var(--d-accent); }

html[data-theme="dark"] .avatar,
html[data-theme="dark"] .profile-avatar,
html[data-theme="dark"] .notification-icon { background-color: #1B3A2C; color: var(--d-accent); }
/* keep uploaded photos exactly as they are */
html[data-theme="dark"] .avatar.has-photo,
html[data-theme="dark"] .profile-avatar.has-photo,
html[data-theme="dark"] .admin-avatar.has-photo { color: transparent; }
html[data-theme="dark"] .facility-tag,
html[data-theme="dark"] .notif-chip,
html[data-theme="dark"] .sp-summary { background: #1B3A2C; color: #9CE2B7; }
html[data-theme="dark"] .sp-end { color: #9CE2B7; }
html[data-theme="dark"] .sp-remove:hover,
html[data-theme="dark"] .small-btn.danger:hover { background: #3A1D1F; }

html[data-theme="dark"] .stat-icon.blue   { color: #5FD39A; background: #16352A; }
html[data-theme="dark"] .stat-icon.green  { color: #4FD69B; background: #123A2A; }
html[data-theme="dark"] .stat-icon.orange { color: #F2B45E; background: #3A2E12; }
html[data-theme="dark"] .stat-icon.purple { color: #B79AF0; background: #2A2142; }

html[data-theme="dark"] .room-card:hover { box-shadow: 0 7px 20px rgba(0, 0, 0, .5); }
html[data-theme="dark"] .room-card img { background: #223029; }

html[data-theme="dark"] thead,
html[data-theme="dark"] .schedule-preview th { background: #1C2A23; }
html[data-theme="dark"] th { color: #A9C4B6; }
html[data-theme="dark"] .availability-notice { background: #15332A; color: #6FDDA5; }

/* booking calendar slots */
html[data-theme="dark"] .time-slot { background: #12362A; border-color: #25664A; color: #6FDDA5; }
html[data-theme="dark"] .time-slot:hover:not(:disabled) { background: #1B4A37; border-color: #3FAE7B; color: #9CE2B7; }
html[data-theme="dark"] .time-slot.booked,
html[data-theme="dark"] .time-slot.booked:hover { background: #3A1D1F; border-color: #7A3A3C; color: #F29A9A; }
html[data-theme="dark"] .time-slot.selected { background: #1F8A5B; border-color: #3FAE7B; color: #fff; }
html[data-theme="dark"] .time-slot.done,
html[data-theme="dark"] .time-slot.done:hover { background: #1C2420; border-color: #2B3A33; color: #6F8179; }

html[data-theme="dark"] .dp-day { color: var(--d-text); }
html[data-theme="dark"] .dp-day:hover:not(:disabled) { background: #24382F; }
html[data-theme="dark"] .dp-day:disabled { color: #4A5C53; }
html[data-theme="dark"] .dp-day.selected { background: #1F8A5B; color: #fff; }

html[data-theme="dark"] .notification-item.unread {
    background: #15332A;
    border-color: #25664A;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .3);
}
html[data-theme="dark"] .notification-item.unread p { color: var(--d-text); }
html[data-theme="dark"] .feedback-reply { background: #12362A; border-left-color: #3FAE7B; }

/* ---------------------------------------------------------
   Scrollbars
--------------------------------------------------------- */
html[data-theme="dark"] * { scrollbar-color: #33463D #0E1512; }

`;
        (document.head || document.documentElement).appendChild(darkStyle);
    }

    function saved() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function systemTheme() {
        return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function apply(theme) {
        root.setAttribute("data-theme", theme);

        var meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "theme-color";
            document.head.appendChild(meta);
        }
        meta.content = theme === "dark" ? "#0B1511" : "#123D2C";

        document.querySelectorAll(".theme-toggle").forEach(function (b) {
            var label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
            b.setAttribute("aria-label", label);
            b.title = label;
            b.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        });
    }

    // 1) before first paint
    apply(saved() || systemTheme());

    // 2) follow the device while the user has not chosen manually
    if (window.matchMedia) {
        var mq = matchMedia("(prefers-color-scheme: dark)");
        var onChange = function () { if (!saved()) apply(systemTheme()); };
        if (mq.addEventListener) mq.addEventListener("change", onChange);
        else if (mq.addListener) mq.addListener(onChange);
    }

    // 3) keep several open tabs of THIS portal in step
    window.addEventListener("storage", function (e) {
        if (e.key === KEY && e.newValue) apply(e.newValue);
    });

    var ICONS =
        '<svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
        '<svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

    function makeButton(cls) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "theme-toggle " + cls;
        b.innerHTML = ICONS;
        b.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            try { localStorage.setItem(KEY, next); } catch (e) {}
            apply(next);
        });
        return b;
    }

    function init() {
        // Student page: toggle next to "Refresh"
        var refresh = document.getElementById("refreshBtn");
        if (refresh && refresh.parentNode.classList.contains("s-header")) {
            var wrap = document.createElement("div");
            wrap.className = "s-actions";
            refresh.parentNode.insertBefore(wrap, refresh);
            wrap.appendChild(makeButton("s-refresh s-theme"));
            wrap.appendChild(refresh);
        }

        // Instructor portal: inside the top bar actions
        var actions = document.querySelector(".topbar-actions");
        if (actions) actions.insertBefore(makeButton("icon-btn"), actions.firstChild);

        // Admin portal: inside the top bar, before the user name
        var adminUser = document.querySelector(".admin-user");
        if (adminUser) adminUser.insertBefore(makeButton("admin-icon"), adminUser.firstChild);


        apply(root.getAttribute("data-theme"));
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();


/* =========================================
   CLASSROOMRESERVE - STUDENT PORTAL
   View only: students check whether a room is free
   and which instructor reserved it. No sign-in.
========================================= */

/* PASTE YOUR WEB APP URL HERE (Apps Script > Deploy > Manage deployments >
   Web app URL, ending in /exec). The student page reads the database
   through this address. Use the same URL as the admin and instructor pages. */
const API_URL = "https://script.google.com/macros/s/AKfycbyxrdkkAAmclfl4RZDhYD6Ep6MJNlCDQQXsRsMe1_s9D6zmIreMRYXVdd7BxOgS3MmM8A/exec";

const OPEN_HOUR = 7;      // 7:00 AM
const CLOSE_HOUR = 21;    // 9:00 PM
const TOTAL_HOURS = CLOSE_HOUR - OPEN_HOUR;
const REFRESH_MS = 60000;

const $ = id => document.getElementById(id);

let rooms = [];
let bookings = [];          // confirmed reservations only
let roomId = "";
let viewMonth = firstOfMonth(new Date());
let selectedDate = localToday();
let loading = false;

/* ---------- date / time helpers ---------- */

function pad2(n) { return String(n).padStart(2, "0"); }

function iso(d) {
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function localToday() { return iso(new Date()); }

function firstOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }

function fromISO(s) {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
}

function normDate(v) {
    if (!v) return "";
    const s = String(v).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const d = new Date(s);
    return isNaN(d) ? s : iso(d);
}

function normTime(v) {
    if (v === null || v === undefined || v === "") return "";
    const s = String(v).trim();

    let m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)$/i);
    if (m) {
        let h = Number(m[1]) % 12;
        if (m[3].toUpperCase() === "PM") h += 12;
        return `${pad2(h)}:${m[2]}`;
    }

    m = s.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
    if (m) return `${pad2(m[1])}:${m[2]}`;

    const d = new Date(s);
    if (isNaN(d)) return s;

    let h = d.getHours(), min = d.getMinutes();
    if (d.getFullYear() < 1950) {
        // Sheets time-only cells carry a 1899 offset; snap to 5 minutes
        const total = Math.round((h * 60 + min) / 5) * 5;
        h = Math.floor(total / 60) % 24;
        min = total % 60;
    }
    return `${pad2(h)}:${pad2(min)}`;
}

function clock(hour) {
    const d = new Date();
    d.setHours(hour, 0, 0, 0);
    return d.toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
}

function clockText(hhmm) {
    const [h, m] = String(hhmm).split(":").map(Number);
    const d = new Date();
    d.setHours(h || 0, m || 0, 0, 0);
    return d.toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
}

function longDate(s) {
    return fromISO(s).toLocaleDateString([], {weekday: "long", year: "numeric", month: "long", day: "numeric"});
}

const esc = v => String(v ?? "").replace(/[&<>"']/g, c =>
    ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));

/* ---------- loading ---------- */

/* Read-only requests to the SAME Apps Script (Code.gs) as the admin and
   instructor portals. These two actions need no sign-in:
     publicRooms     -> active classrooms
     publicSchedule  -> confirmed reservations between two dates          */
async function callApi(action, params = {}) {
    if (!/^https:\/\/script\.google\.com\/.+\/exec$/.test(API_URL)) {
        throw new Error("The web app URL is not set in student.js.");
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);

    try {
        const query = new URLSearchParams({action, ...params});
        const response = await fetch(`${API_URL}?${query}`, {signal: controller.signal});
        return await response.json();
    } finally {
        clearTimeout(timer);
    }
}

/* reservations are loaded one month at a time (the server allows 62 days) */
const monthCache = {};

function monthKey(d) { return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`; }

function monthRange(key) {
    const [y, m] = key.split("-").map(Number);
    return {from: `${key}-01`, to: `${key}-${pad2(new Date(y, m, 0).getDate())}`};
}

function rebuildBookings() {
    bookings = Object.values(monthCache).flat();
}

const inflight = {};

function loadMonth(key) {
    // never request the same month twice at the same time
    return inflight[key] ||= fetchMonth(key).finally(() => { delete inflight[key]; });
}

async function fetchMonth(key) {
    const {from, to} = monthRange(key);
    const data = await callApi("publicSchedule", {from, to});

    if (!data || !data.success) {
        throw new Error((data && data.message) || "The room schedule could not be loaded.");
    }

    storeMonth(key, data.reservations);
}

function storeMonth(key, list) {
    monthCache[key] = (list || []).map(r => ({
        RoomID: String(r.RoomID),
        Date: normDate(r.Date),
        Start: normTime(r.StartTime),
        End: normTime(r.EndTime),
        Instructor: String(r.InstructorName || "").trim(),
        Subject: String(r.Subject || "").trim()
    })).filter(r => r.Start && r.End);

    rebuildBookings();
    saveCache();
}

/* ---------- saved copy: the page shows instantly, then updates ---------- */

const CACHE_KEY = "crStudentCache_v1";
const CACHE_MAX_AGE = 6 * 60 * 60 * 1000;   // 6 hours
let cachedAt = 0;

function saveCache() {
    try {
        const keys = Object.keys(monthCache).sort().slice(-4);
        const months = {};
        keys.forEach(k => months[k] = monthCache[k]);
        localStorage.setItem(CACHE_KEY, JSON.stringify({t: Date.now(), rooms, months}));
    } catch (e) { /* storage full or blocked: ignore */ }
}

function loadCache() {
    try {
        const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (!c || !Array.isArray(c.rooms) || !c.rooms.length || Date.now() - c.t > CACHE_MAX_AGE) return false;
        rooms = c.rooms;
        Object.assign(monthCache, c.months || {});
        rebuildBookings();
        cachedAt = c.t;
        return true;
    } catch (e) { return false; }
}

/* quietly fetch the months next to the one on screen so arrows feel instant */
function prefetchNeighbours() {
    const run = () => {
        [-1, 1].forEach(n => {
            const key = monthKey(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + n, 1));
            if (!monthCache[key]) loadMonth(key).catch(() => {});
        });
    };
    (window.requestIdleCallback || (f => setTimeout(f, 1500)))(run);
}

function showNotice(message) {
    $("notice").textContent = message;
    $("notice").classList.remove("hidden");
}

function hideNotice() { $("notice").classList.add("hidden"); }

async function load(silent = false) {
    if (loading) return;
    loading = true;
    if (!silent) $("refreshBtn").classList.add("spin");

    try {
        // classrooms and the month schedule are requested at the same time
        const keys = [...new Set([monthKey(viewMonth), selectedDate.slice(0, 7)])];
        let roomData = null;

        // ONE request for rooms + schedule (needs the updated Code.gs)
        try {
            const {from, to} = monthRange(keys[0]);
            const all = await callApi("publicAll", {from, to});
            if (all && all.success && Array.isArray(all.rooms)) {
                roomData = all;
                rooms = all.rooms;
                storeMonth(keys[0], all.reservations);
                await Promise.all(keys.slice(1).map(loadMonth));
            }
        } catch (e) {
            if (e.name === "AbortError") throw e;
        }

        // older Code.gs, or publicAll failed: use the two separate requests
        if (!roomData) {
            [roomData] = await Promise.all([
                callApi("publicRooms"),
                ...keys.map(loadMonth)
            ]);
        }

        if (!roomData || !roomData.success) {
            throw new Error((roomData && roomData.message) || "The classrooms could not be loaded.");
        }

        rooms = (roomData.rooms || [])
            .sort((a, b) => String(a.Building).localeCompare(String(b.Building)) ||
                            String(a.RoomName).localeCompare(String(b.RoomName), undefined, {numeric: true}));

        saveCache();
        cachedAt = 0;
        hideNotice();
        renderRoomSelect();
        renderAll();
        $("updatedAt").textContent = "Last updated " +
            new Date().toLocaleTimeString([], {hour: "numeric", minute: "2-digit"});
        prefetchNeighbours();

    } catch (error) {
        console.warn("Student schedule error:", error.message);

        if (cachedAt) {
            $("updatedAt").textContent = "Showing saved schedule from " +
                new Date(cachedAt).toLocaleTimeString([], {hour: "numeric", minute: "2-digit"}) + ". Could not update.";
        }

        if (!silent || !rooms.length) {
            showNotice(error.name === "AbortError"
                ? "The server is taking too long. Please try again."
                : /not set in student\.js/.test(error.message) ? error.message
                : (error.message === "Failed to fetch"
                    ? "Connection problem. Check your internet and try again."
                    : "The room schedule can't be loaded right now. Please try again in a few minutes."));
        }
    } finally {
        loading = false;
        $("refreshBtn").classList.remove("spin");
    }
}

/* load a month the student navigated to */
async function ensureMonth() {
    const key = monthKey(viewMonth);
    if (monthCache[key]) return;

    try {
        await loadMonth(key);
        hideNotice();
    } catch (error) {
        showNotice("This month's schedule can't be loaded right now. Please try again.");
    }

    renderMonth();
    renderDay();
}

/* ---------- availability maths ---------- */

/* An hour [h, h+1) is reserved when any booking overlaps it */
function hourBooked(room, date, hour) {
    const start = `${pad2(hour)}:00`;
    const end = `${pad2(hour + 1)}:00`;
    return bookings.some(b =>
        b.RoomID === room && b.Date === date && start < b.End && end > b.Start
    );
}

/* The booking (if any) that covers a given hour */
function bookingAt(room, date, hour) {
    const start = `${pad2(hour)}:00`;
    const end = `${pad2(hour + 1)}:00`;
    return bookings.find(b =>
        b.RoomID === room && b.Date === date && start < b.End && end > b.Start
    );
}

function reservedHours(room, date) {
    let n = 0;
    for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) if (hourBooked(room, date, h)) n++;
    return n;
}

/* Hours that have already gone by today */
function hourPassed(date, hour) {
    const today = localToday();
    if (date < today) return true;
    if (date > today) return false;
    const now = new Date();
    return hour + 1 <= now.getHours() + now.getMinutes() / 60;
}

/* A booking is COMPLETE once its end time has gone by */
function bookingDone(b) {
    const today = localToday();
    if (b.Date < today) return true;
    if (b.Date > today) return false;
    const now = new Date();
    return b.End <= `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
}

/* ---------- rendering ---------- */

function renderRoomSelect() {
    const select = $("roomSelect");

    if (!rooms.length) {
        select.innerHTML = `<option>No classrooms available</option>`;
        select.disabled = true;
        $("roomInfo").classList.add("hidden");
        return;
    }

    const byBuilding = {};
    rooms.forEach(r => (byBuilding[r.Building || "Other"] ||= []).push(r));

    select.innerHTML = Object.entries(byBuilding).map(([building, list]) => `
        <optgroup label="${esc(building)}">
            ${list.map(r => `<option value="${esc(r.RoomID)}">${esc(r.RoomName)}</option>`).join("")}
        </optgroup>`).join("");

    select.disabled = false;

    // keep the room the student already chose
    if (!rooms.some(r => String(r.RoomID) === roomId)) roomId = String(rooms[0].RoomID);
    select.value = roomId;
}

function renderRoomInfo() {
    const room = rooms.find(r => String(r.RoomID) === roomId);
    const box = $("roomInfo");

    if (!room) { box.classList.add("hidden"); return; }

    const bits = [];
    if (room.Building) bits.push(esc(room.Building));
    if (room.Floor) bits.push(esc(room.Floor));
    if (room.Capacity) bits.push(`Seats ${esc(room.Capacity)}`);

    const photo = room.PhotoURL
        ? `<img src="${esc(room.PhotoURL)}" alt="" loading="lazy" onerror="this.remove()">`
        : "";

    box.innerHTML = `
        ${photo}
        <div>
            <p><strong>${esc(room.RoomName)}</strong> · ${bits.join(" · ")}</p>
            ${room.Facilities ? `<p>${esc(room.Facilities)}</p>` : ""}
        </div>`;
    box.classList.remove("hidden");
}

function renderMonth() {
    const y = viewMonth.getFullYear(), m = viewMonth.getMonth();
    const today = localToday();

    $("monthTitle").textContent = viewMonth.toLocaleDateString([], {month: "long", year: "numeric"});

    const lead = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const cells = [];

    for (let i = 0; i < lead; i++) cells.push(`<span class="s-day-cell blank"></span>`);

    for (let d = 1; d <= days; d++) {
        const date = `${y}-${pad2(m + 1)}-${pad2(d)}`;
        const used = roomId ? reservedHours(roomId, date) : 0;
        const past = date < today;

        const ready = !!monthCache[monthKey(viewMonth)];
        const state = !ready ? "loading" : past ? "past" : used === 0 ? "free" : used >= TOTAL_HOURS ? "full" : "part";
        const label = !ready ? "loading" : past ? "passed"
            : used === 0 ? "free all day"
            : used >= TOTAL_HOURS ? "fully reserved"
            : `${TOTAL_HOURS - used} of ${TOTAL_HOURS} hours free`;

        cells.push(`
            <button type="button" role="gridcell"
                class="s-day-cell ${state} ${date === today ? "today" : ""} ${date === selectedDate ? "selected" : ""}"
                data-date="${date}"
                aria-label="${esc(longDate(date))}, ${label}"
                aria-pressed="${date === selectedDate}">
                <span>${d}</span>
                <span class="s-fill"><b style="width:${Math.round(used / TOTAL_HOURS * 100)}%"></b></span>
            </button>`);
    }

    $("monthGrid").innerHTML = cells.join("");
}

function renderDay() {
    const room = rooms.find(r => String(r.RoomID) === roomId);

    if (!room || !selectedDate) {
        $("dayTitle").textContent = "Select a date";
        $("daySummary").textContent = "";
        $("freeRanges").textContent = "";
        $("bookedList").innerHTML = "";
        $("slotGrid").innerHTML = "";
        return;
    }

    $("dayTitle").textContent = longDate(selectedDate);

    const slots = [];
    let freeCount = 0;
    const freeHours = [];

    for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
        const booked = hourBooked(roomId, selectedDate, h);
        const passed = !booked && hourPassed(selectedDate, h);
        const done = booked && hourPassed(selectedDate, h);

        if (!booked && !passed) { freeCount++; freeHours.push(h); }

        const bk = booked ? (bookingAt(roomId, selectedDate, h) || {}) : {};
        const who = bk.Instructor;
        const subj = bk.Subject;

        slots.push(`
            <div class="s-slot ${booked ? (done ? "reserved done" : "reserved") : passed ? "passed" : ""}">
                <div class="s-slot-l">
                    <span class="s-slot-time">${clock(h)} - ${clock(h + 1)}</span>
                    <em class="s-state">${booked ? (done ? "✓ Completed" : "Reserved") : passed ? "Passed" : "Free"}</em>
                </div>
                ${who || subj ? `<div class="s-slot-r">
                    ${who ? `<small>Instructor: ${esc(who)}</small>` : ""}
                    ${subj ? `<small>Subject: ${esc(subj)}</small>` : ""}
                </div>` : ""}
            </div>`);
    }

    $("slotGrid").innerHTML = slots.join("");
    $("daySummary").textContent = `${room.RoomName} · open ${clock(OPEN_HOUR)} to ${clock(CLOSE_HOUR)}`;

    // join consecutive free hours: "8:00 AM - 11:00 AM, 1:00 PM - 6:00 PM"
    const ranges = [];
    freeHours.forEach(h => {
        const last = ranges[ranges.length - 1];
        if (last && last.end === h) last.end = h + 1;
        else ranges.push({start: h, end: h + 1});
    });

    // who booked the room, with the exact times
    const day = bookings
        .filter(b => b.RoomID === roomId && b.Date === selectedDate)
        .sort((a, b) => a.Start.localeCompare(b.Start));

    $("bookedList").innerHTML = day.length ? `
        <h3>Reservations</h3>
        <ul>${day.map(b => `
            <li class="${bookingDone(b) ? "done" : ""}">
                <span class="s-when">${esc(clockText(b.Start))} - ${esc(clockText(b.End))}${bookingDone(b) ? `<em class="s-done">✓ Completed</em>` : ""}</span>
                <span class="s-who">
                    ${b.Instructor ? `<small>Instructor: ${esc(b.Instructor)}</small>` : "Reserved"}
                    ${b.Subject ? `<small>Subject: ${esc(b.Subject)}</small>` : ""}
                </span>
            </li>`).join("")}
        </ul>` : "";

    const box = $("freeRanges");
    if (ranges.length) {
        box.className = "s-free";
        box.textContent = "Free: " + ranges.map(r => `${clock(r.start)} - ${clock(r.end)}`).join(", ");
    } else {
        box.className = "s-free none";
        box.textContent = selectedDate < localToday()
            ? "This day has already passed."
            : "No free hours on this day.";
    }
}

function renderAll() {
    renderRoomInfo();
    renderMonth();
    renderDay();
}

/* ---------- events ---------- */

$("roomSelect").addEventListener("change", e => {
    roomId = e.target.value;
    renderAll();
});

$("monthGrid").addEventListener("click", e => {
    const cell = e.target.closest("[data-date]");
    if (!cell) return;
    selectedDate = cell.dataset.date;
    renderMonth();
    renderDay();

    // on phones, bring the hours into view
    if (window.matchMedia("(max-width: 900px)").matches) {
        $("dayTitle").scrollIntoView({behavior: "smooth", block: "start"});
    }
});

$("prevMonth").onclick = () => {
    viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
    renderMonth();
    ensureMonth();
};

$("nextMonth").onclick = () => {
    viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
    renderMonth();
    ensureMonth();
};

$("todayBtn").onclick = () => {
    selectedDate = localToday();
    viewMonth = firstOfMonth(new Date());
    renderMonth();
    renderDay();
    ensureMonth();
};

$("refreshBtn").onclick = () => load(false);

/* keep the schedule fresh without the student doing anything */
setInterval(() => { if (!document.hidden) load(true); }, REFRESH_MS);
document.addEventListener("visibilitychange", () => { if (!document.hidden) load(true); });
window.addEventListener("online", () => load(true));

/* show the saved copy straight away (if any), then fetch fresh data */
if (loadCache()) {
    renderRoomSelect();
    renderAll();
    $("updatedAt").textContent = "Showing saved schedule. Updating...";
}
load(true);
