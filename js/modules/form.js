import {
  clearProjectPreference,
  loadProjectPreference,
  saveProjectPreference,
} from "./storage.js";

export function initForm() {
    const contactForm = document.querySelector("#contact-form");
    if (!contactForm) {
      return;
    }

    const formAlert = contactForm.querySelector(".form-alert");
    const toastRegion = document.querySelector(".toast-region");
    const feedbackDialog = document.querySelector("#feedback-dialog");
    const projectSelect = contactForm.querySelector("#projeto");
    const rememberProject = contactForm.querySelector("#remember-project");
    const preferenceFeedback = contactForm.querySelector("#preference-feedback");
    const validProjectValues = new Set(
      [...projectSelect.options].map((option) => option.value),
    );
    const fields = [...contactForm.querySelectorAll('input:not([type="checkbox"]), select')];
    let toastTimer;

    contactForm.noValidate = true;

    function setPreferenceFeedback(message, state = "") {
      preferenceFeedback.textContent = message;
      preferenceFeedback.dataset.state = state;
    }

    function restoreProjectPreference() {
      const result = loadProjectPreference(validProjectValues);

      if (result.status === "restored") {
        projectSelect.value = result.preference.project;
        rememberProject.checked = true;
        setPreferenceFeedback("Preferência restaurada deste navegador.", "success");
      } else if (result.status === "unavailable") {
        setPreferenceFeedback("Não foi possível ler a preferência salva.", "error");
      }
    }

    function saveProjectPreference() {
      if (saveProjectPreference(projectSelect.value)) {
        setPreferenceFeedback("Preferência salva neste navegador.", "success");
        return;
      }

      rememberProject.checked = false;
      setPreferenceFeedback("Não foi possível salvar neste navegador.", "error");
    }

    function clearProjectPreference() {
      if (clearProjectPreference()) {
        setPreferenceFeedback("A preferência salva foi removida.");
        return;
      }

      setPreferenceFeedback("Não foi possível remover a preferência salva.", "error");
    }

    function getFieldMessage(field) {
      if (field.validity.valueMissing || (field.required && !field.value.trim())) {
        return "Este campo é obrigatório.";
      }

      if (field.validity.typeMismatch && field.type === "email") {
        return "Informe um endereço de e-mail válido.";
      }

      if (field.type === "tel" && field.value.trim()) {
        const phoneValue = field.value.trim();
        const phoneDigitCount = phoneValue.replace(/\D/g, "").length;

        if (
          !/^[0-9()+. -]{8,20}$/.test(phoneValue) ||
          phoneDigitCount < 8 ||
          phoneDigitCount > 15
        ) {
          return "Informe um telefone com 8 a 15 dígitos e formato válido.";
        }
      }

      return "";
    }

    function updateFieldFeedback(field, showSuccess = false) {
      const message = getFieldMessage(field);
      const feedback = document.querySelector(`#${field.id}-feedback`);
      const hasValue = Boolean(field.value.trim());

      field.setAttribute("aria-invalid", String(Boolean(message)));
      feedback.textContent = message || (showSuccess && hasValue ? "Preenchimento válido." : "");
      feedback.dataset.state = message ? "error" : showSuccess && hasValue ? "success" : "";

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

    restoreProjectPreference();

    rememberProject.addEventListener("change", () => {
      if (rememberProject.checked) {
        saveProjectPreference();
        return;
      }

      clearProjectPreference();
    });

    projectSelect.addEventListener("change", () => {
      if (rememberProject.checked) {
        saveProjectPreference();
      }
    });

    for (const field of fields) {
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

      const invalidFields = fields.filter((field) => {
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
}