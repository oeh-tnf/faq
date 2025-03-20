window.addEventListener("load", () => {
    const nav = document.querySelector("body nav");
    const nav_button = document.createElement("button");
    nav_button.classList.add("nav-button");
    nav_button.textContent = "menu";
    nav_button.type = "button";
    nav_button.addEventListener("click", () => {
        if (!nav.classList.contains("shown")) {
            nav.classList.add("shown");
            nav.classList.add("shown-at-least-once");
            nav.ariaHidden = false;
            nav_button.textContent = "close";
        } else {
            nav.classList.remove("shown");
            nav.ariaHidden = true;
            nav_button.textContent = "menu";
        }
    });
    document.body.insertBefore(nav_button, nav);
    for (const link of document.querySelectorAll("nav a")) {
        link.addEventListener("click", () => {
            nav.classList.remove("shown");
            nav.ariaHidden = true;
            nav_button.textContent = "menu";
        })
    }
    nav.classList.add("scripted");
    nav.ariaHidden = true;
});
