const projectPreferenceKey = "ong-esperanca:project-preference";

export function loadProjectPreference(validProjects) {
  try {
    const storedValue = localStorage.getItem(projectPreferenceKey);
    if (!storedValue) {
      return { status: "empty" };
    }

    const preference = JSON.parse(storedValue);
    if (!validProjects.has(preference?.project)) {
      localStorage.removeItem(projectPreferenceKey);
      return { status: "invalid" };
    }

    return { status: "restored", preference };
  } catch {
    return { status: "unavailable" };
  }
}

export function saveProjectPreference(project) {
  try {
    localStorage.setItem(
      projectPreferenceKey,
      JSON.stringify({ project, updatedAt: new Date().toISOString() }),
    );
    return true;
  } catch {
    return false;
  }
}

export function clearProjectPreference() {
  try {
    localStorage.removeItem(projectPreferenceKey);
    return true;
  } catch {
    return false;
  }
}