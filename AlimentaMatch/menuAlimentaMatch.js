document.addEventListener("DOMContentLoaded", function () {
    const menuOptions = document.querySelectorAll(".menu-option");

    menuOptions.forEach(option => {
        option.addEventListener("click", function () {

            this.querySelector(".options").classList.toggle("active");
        });
    });
});
