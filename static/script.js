window.addEventListener("load", () => {
    const nav = document.querySelector("body nav");
    const nav_button = document.createElement("button");
    nav_button.classList.add("nav-button");
    nav_button.textContent = "\u2630";
    nav_button.type = "button";
    nav_button.addEventListener("click", () => {
        if (!nav.classList.contains("shown")) {
            nav.classList.add("shown");
            nav.classList.add("shown-at-least-once");
            nav_button.textContent = "\u{1F7A9}";
        } else {
            nav.classList.remove("shown");
            nav_button.textContent = "\u2630";
        }
    });
    document.body.appendChild(nav_button);
    for (const link of document.querySelectorAll("nav a")) {
        link.addEventListener("click", () => {
            nav.classList.remove("shown");
            nav_button.textContent = "\u2630";
        })
    }
    nav.classList.add("scripted");
});
