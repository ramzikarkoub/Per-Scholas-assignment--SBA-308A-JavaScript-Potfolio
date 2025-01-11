import { loadProjects } from "./api.js";

const inialLoad = async (query = "") => {
  const fetchedData = await loadProjects();
  console.log(fetchedData);
  const projects = document.getElementById("projects");
  const project = document.getElementById("project");
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  //   const projects = await fetchProjects(query);
  loader.style.display = "none";

  if (fetchedData.length === 0) {
    projects.innerHTML = "<p>No projects found.</p>";
    return;
  } else {
    let projectHTML = fetchedData
      .map(
        (project) =>
          `<div id="project" class="project">
          <img
            src=${
              project.acf.image
                ? project.acf.image
                : project.acf.image_thumbnail
            } class="project-img" />
          <h3 class="title">${project.title.rendered}</h3>
          <p class="description">${project.content.rendered.substring(
            0,
            300
          )}</p>
          <a href="${project.acf.url}" target="_blank">View Project</a>
          </div>
  
        `
      )
      .join("");

    project.innerHTML = projectHTML;
  }
};
inialLoad();
