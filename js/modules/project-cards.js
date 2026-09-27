export const projects = [
    {
      id: "projeto-educacao",
      title: "Projeto Educação",
      description:
        "Oferecemos cursos gratuitos, reforço escolar e formação para jovens em situação de vulnerabilidade.",
      status: "Em andamento",
    },
    {
      id: "projeto-alimentacao",
      title: "Projeto Alimentação",
      description:
        "Distribuímos cestas básicas e apoio alimentar para famílias em situação de risco social.",
      status: "Em andamento",
    },
    {
      id: "projeto-comunidade",
      title: "Projeto Comunidade",
      description:
        "Promovemos ações sociais, acolhimento e apoio emocional para a comunidade local.",
      status: "Em andamento",
    },
];

export function renderProjectCards() {
  const projectGrid = document.querySelector("#project-grid");
  const projectTemplate = document.querySelector("#project-card-template");

  if (!projectGrid || !projectTemplate) {
    return;
  }

  projectGrid.replaceChildren();

  for (const project of projects) {
    const cardFragment = projectTemplate.content.cloneNode(true);
    const card = cardFragment.querySelector(".project-card");

    card.id = project.id;
    card.querySelector(".project-badge").textContent = project.status;
    card.querySelector("h3").textContent = project.title;
    card.querySelector("p").textContent = project.description;
    projectGrid.append(cardFragment);
  }
}