const pageMeta = {
  dashboard: ["Surveillance Overview", "AI-powered border monitoring and intelligent video analytics"],
  surveillance: ["Live Surveillance", "Real-time CCTV feeds and camera health"],
  detection: ["AI Detection", "Object detection and intelligent event analysis"],
  alerts: ["Incident Alerts", "Review and manage AI-generated incidents"],
  map: ["Border Activity Map", "AI monitored surveillance zones"],
  analytics: ["System Analytics", "Detection performance and operational metrics"],
  logs: ["Activity Logs", "Recent platform and surveillance events"],
  settings: ["System Settings", "Platform configuration and monitoring preferences"]
};

const navItems = document.querySelectorAll(".nav-item");
const dashboardGrid = document.querySelector(".dashboard-grid");
const placeholder = document.getElementById("pagePlaceholder");
const placeholderTitle = document.getElementById("placeholderTitle");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");

function setPage(page) {
  const meta = pageMeta[page] || pageMeta.dashboard;
  pageTitle.textContent = meta[0];
  pageSubtitle.textContent = meta[1];

  navItems.forEach(item => item.classList.toggle("active", item.dataset.page === page));

  const isDashboard = page === "dashboard";
  dashboardGrid.style.display = isDashboard ? "" : "none";
  placeholder.classList.toggle("visible", !isDashboard);
  placeholderTitle.textContent = meta[0];

  if (window.innerWidth <= 800) sidebar.classList.remove("open");
}

navItems.forEach(item => {
  item.addEventListener("click", () => setPage(item.dataset.page));
});

mobileMenu.addEventListener("click", () => sidebar.classList.toggle("open"));

document.addEventListener("click", (event) => {
  if (window.innerWidth <= 800 &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      event.target !== mobileMenu) {
    sidebar.classList.remove("open");
  }
});

function updateClock() {
  const clock = document.getElementById("clock");
  clock.textContent = new Date().toLocaleTimeString("en-IN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
updateClock();
setInterval(updateClock, 1000);

// Small live-data simulation for the prototype UI.
let detections = 126;
setInterval(() => {
  if (Math.random() > 0.55) {
    detections += 1;
    document.getElementById("detectionCount").textContent = detections;
  }
}, 5000);

// Keep the dashboard layout stable after viewport changes.
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) sidebar.classList.remove("open");
});
