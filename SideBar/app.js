const sideBar = document.querySelector(".sidebar");
const openBtn = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", () => {
    sideBar.classList.toggle("show-sidebar");
});

closeBtn.addEventListener("click", () => {
    sideBar.classList.toggle("show-sidebar");
});