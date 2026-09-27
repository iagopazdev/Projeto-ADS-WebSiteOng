import { initForm } from "./modules/form.js";
import { initNavigation } from "./modules/navigation.js";
import { renderProjectCards } from "./modules/project-cards.js";

document.documentElement.classList.add("has-js");
renderProjectCards();
initForm();
initNavigation();