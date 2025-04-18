window.addEventListener("load", () => {

    /**************************
     * COLLAPSIBLE NAVIGATION *
     **************************/

    const nav = document.querySelector("body nav");
    const nav_button = document.createElement("button");
    nav_button.type = "button";
    nav_button.classList.add("nav-button");
    nav_button.textContent = "menu";

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
    const mediaMatch = window.matchMedia("(min-width: 1200px)");
    if (mediaMatch.matches) {
        show();
    } else {
        hide();
    }
    mediaMatch.addEventListener("change", (e) => {
        if (e.matches) {
            show();
        } else {
            hide();
        }
    });

    /**************************
     * DARK/LIGHT MODE SWITCH *
     **************************/

    let currentColorTheme = localStorage.getItem("prefers-color-scheme");
    const cycleColorsButton = document.createElement("button");
    cycleColorsButton.type = "button";
    cycleColorsButton.classList.add("cycle-colors-button");
    cycleColorsButton.textContent = currentColorTheme == "light" ? "light_mode" : currentColorTheme == "dark" ? "dark_mode" : "routine";

    cycleColorsButton.addEventListener("click", () => {
        if (currentColorTheme == "dark") {
            document.documentElement.classList.remove("force-dark-color-scheme");
            currentColorTheme = "light";
            localStorage.setItem("prefers-color-scheme", "light");
            document.documentElement.classList.add("force-light-color-scheme");
        } else if (currentColorTheme == "light") {
            document.documentElement.classList.remove("force-light-color-scheme");
            currentColorTheme = null;
            localStorage.removeItem("prefers-color-scheme");
        } else {
            currentColorTheme = "dark";
            localStorage.setItem("prefers-color-scheme", "dark");
            document.documentElement.classList.add("force-dark-color-scheme");
        }
        cycleColorsButton.textContent = currentColorTheme == "light" ? "light_mode" : currentColorTheme == "dark" ? "dark_mode" : "routine";
    });

    document.querySelector("body header").insertBefore(cycleColorsButton, document.querySelector("body header a.lang-button"));
    
    /******************************
     * CLICK ON HEADING DOES COPY *
     ******************************/
    
    const copyLinkHandler = async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(e.target.href);
        const tooltip = document.createElement("div");
        tooltip.ariaRole = "tooltip";
        tooltip.textContent = "link copied";
        tooltip.classList.add("tooltip");
        tooltip.style.setProperty("position", "fixed");
        tooltip.style.setProperty("left", (e.clientX + 20) + "px");
        tooltip.style.setProperty("top", e.clientY + "px");
        document.body.appendChild(tooltip);
        setTimeout(() => tooltip.remove(), 500);
    };
    
    for (const link of document.querySelectorAll("article > h2 > a")) {
        link.addEventListener("click", copyLinkHandler);
    }
    for (const link of document.querySelectorAll("article > h3 > a")) {
        link.addEventListener("click", copyLinkHandler);
    }
    for (const link of document.querySelectorAll("article > h4 > a")) {
        link.addEventListener("click", copyLinkHandler);
    }
});
