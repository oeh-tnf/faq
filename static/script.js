window.addEventListener("load", () => {
    const nav = document.querySelector("body nav");
    const nav_button = document.createElement("button");
    nav_button.classList.add("nav-button");
    nav_button.textContent = "menu";
    nav_button.type = "button";

    function show() {
        nav.classList.add("shown");
        nav.classList.add("shown-at-least-once");
        nav.ariaHidden = false;
        nav_button.textContent = "close";
        for (const link of nav.getElementsByTagName("a")) {
            link.tabIndex = null;
        }
    }

    function hide() {
        nav.classList.remove("shown");
        nav.ariaHidden = true;
        nav_button.textContent = "menu";
        for (const link of nav.getElementsByTagName("a")) {
            link.tabIndex = -1;
        }
    }

    nav_button.addEventListener("click", () => {
        if (!nav.classList.contains("shown")) {
            show();
        } else {
            hide();
        }
    });
    document.body.insertBefore(nav_button, nav);
    for (const link of document.querySelectorAll("nav a")) {
        link.addEventListener("click", () => {
            hide();
        })
    }
    nav.classList.add("scripted");
    hide();
});
