document.documentElement.classList.add("has-js");

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const desktopViewport = window.matchMedia("(min-width: 768px)");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  mainNav.classList.remove("is-active");
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

const contactForm = document.querySelector("#contact-form");
const formAlert = contactForm.querySelector(".form-alert");
const toastRegion = document.querySelector(".toast-region");
const feedbackDialog = document.querySelector("#feedback-dialog");
const formFields = [...contactForm.querySelectorAll("input, select")];
let toastTimer;

contactForm.noValidate = true;

function getFieldMessage(field) {
  if (field.validity.valueMissing) {
    return "Este campo é obrigatório.";
  }

  if (field.validity.typeMismatch && field.type === "email") {
    return "Informe um endereço de e-mail válido.";
  }

  return "";
}

function updateFieldFeedback(field, showSuccess = false) {
  const message = getFieldMessage(field);
  const feedback = document.querySelector(`#${field.id}-feedback`);

  field.setAttribute("aria-invalid", String(Boolean(message)));
  feedback.textContent = message || (showSuccess && field.value ? "Preenchimento válido." : "");
  feedback.dataset.state = message ? "error" : showSuccess && field.value ? "success" : "";

  return !message;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toastRegion.replaceChildren();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.dataset.state = "success";
  toast.setAttribute("role", "status");

  const text = document.createElement("p");
  text.className = "toast-message";
  text.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.className = "toast-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Fechar notificação");
  closeButton.textContent = "×";
  closeButton.addEventListener("click", () => toast.remove());

  toast.append(text, closeButton);
  toastRegion.append(toast);
  toastTimer = window.setTimeout(() => toast.remove(), 6000);
}

for (const field of formFields) {
  field.addEventListener("blur", () => {
    field.dataset.touched = "true";
    updateFieldFeedback(field, true);
  });

  field.addEventListener("input", () => {
    if (field.dataset.touched === "true") {
      updateFieldFeedback(field, true);
    }
  });
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const invalidFields = formFields.filter((field) => {
    field.dataset.touched = "true";
    return !updateFieldFeedback(field, true);
  });

  if (invalidFields.length > 0) {
    formAlert.textContent = "Revise os campos destacados antes de continuar.";
    formAlert.hidden = false;
    invalidFields[0].focus();
    return;
  }

  formAlert.hidden = true;
  showToast("Validação concluída. Este protótipo não envia nem armazena dados.");
});

contactForm.querySelector(".feedback-help").addEventListener("click", () => {
  feedbackDialog.showModal();
});

feedbackDialog.querySelector(".dialog-close").addEventListener("click", () => {
  feedbackDialog.close();
});

feedbackDialog.addEventListener("click", (event) => {
  if (event.target === feedbackDialog) {
    feedbackDialog.close();
  }
});