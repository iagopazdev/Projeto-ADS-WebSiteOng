export function initNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const skipLink = document.querySelector(".skip-link");
    const desktopViewport = window.matchMedia("(min-width: 768px)");
    const appMain = document.querySelector("main");
    const routeStatus = document.querySelector(".route-status");
    const pageSections = new Map(
      [...appMain.querySelectorAll(":scope > section")].map((section) => [section.id, section]),
    );
    const projectRoutes = [...document.querySelectorAll("#project-grid .project-card")].map(
      (card) => [card.id, { sectionId: "projetos", title: card.querySelector("h3").textContent }],
    );
    const routes = new Map([
      ["inicio", { sectionId: "inicio", title: "Início" }],
      ["projetos", { sectionId: "projetos", title: "Projetos" }],
      ["contato", { sectionId: "contato", title: "Contato" }],
      ...projectRoutes,
    ]);

    function closeMenu() {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
      mainNav.classList.remove("is-active");
    }

    skipLink.addEventListener("click", (event) => {
      event.preventDefault();

      const focusTarget = appMain.querySelector("h2") || appMain;
      if (focusTarget !== appMain) {
        focusTarget.setAttribute("tabindex", "-1");
      }

      focusTarget.focus({ preventScroll: true });
      focusTarget.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    });

    function normalizeRoute(hash) {
      let routeId = hash.replace(/^#/, "");

      try {
        routeId = decodeURIComponent(routeId);
      } catch {
        return "inicio";
      }

      return routes.has(routeId) ? routeId : "inicio";
    }

    function activateRoute(routeId, { moveFocus = true, announce = true } = {}) {
      const route = routes.get(routeId);
      const section = pageSections.get(route.sectionId);
      appMain.replaceChildren(section);
      document.title = `${route.title} | ONG Esperança`;

      if (announce) {
        routeStatus.textContent = `Conteúdo atualizado: ${route.title}.`;
      }

      if (!moveFocus) {
        return;
      }

      const focusTarget = routeId.startsWith("projeto-")
        ? section.querySelector(`#${routeId}`)
        : section.querySelector("h2");

      if (!focusTarget) {
        return;
      }

      focusTarget.setAttribute("tabindex", "-1");
      requestAnimationFrame(() => {
        focusTarget.focus({ preventScroll: true });
        focusTarget.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "start",
        });
      });
    }

    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
      mainNav.classList.toggle("is-active", !isExpanded);
    });

    mainNav.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        mainNav.classList.contains("is-active") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mainNav.classList.contains("is-active")) {
        closeMenu();
        menuToggle.focus();
      }
    });

    desktopViewport.addEventListener("change", (event) => {
      if (event.matches) {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest('a[href^="#"]');
      if (!link) {
        return;
      }

      let requestedRouteId = link.getAttribute("href").replace(/^#/, "");
      try {
        requestedRouteId = decodeURIComponent(requestedRouteId);
      } catch {
        return;
      }

      if (!routes.has(requestedRouteId)) {
        return;
      }

      event.preventDefault();
      closeMenu();

      if (window.location.hash !== `#${requestedRouteId}`) {
        window.history.pushState({ routeId: requestedRouteId }, "", `#${requestedRouteId}`);
      }

      activateRoute(normalizeRoute(link.getAttribute("href")));
    });

    function restoreRouteFromLocation() {
      activateRoute(normalizeRoute(window.location.hash || "#inicio"));
    }

    window.addEventListener("popstate", restoreRouteFromLocation);

    const initialHash = window.location.hash;
    const initialRouteId = normalizeRoute(initialHash || "#inicio");
    if (initialHash && !routes.has(initialHash.replace(/^#/, ""))) {
      window.history.replaceState({ routeId: initialRouteId }, "", "#inicio");
    }
    activateRoute(initialRouteId, { moveFocus: false, announce: false });
}