export function displayData(fetchedData) {
  let projectHTML = fetchedData.map(
    (project) =>
      `<div id="project" class="project">
            <img
              src="${
                project.acf.image
                  ? project.acf.image
                  : project.acf.image_thumbnail
              }" 
              class="project-img" 
            />
            <h3 class="title">${project.title.rendered}</h3>
            <h5 class="Tech">Technologies used: ${
              project.acf.technologiesTechnologies
            }</h5>
            
            <p class="description">${project.content.rendered.substring(
              0,
              300
            )}</p>
            <a href="${
              project.acf.url
            }" target="_blank"  class="view-project">View Project</a>
          </div>`
  );

  projects.innerHTML = projectHTML;
}
export function displayNewProject(data) {
  const newProject = `<div id="project" class="project">
      <img src="${data.proImg}" class="project-img" />
      <h3 class="title">${data.nameProject}</h3>
      <h5 class="Tech">Technologies used: ${data.techUsedProject}</h5>
      <p class="description">${data.descProject.substring(0, 300)}</p>
      <a href="${
        data.url
      }" target="_blank" class="view-project">View Project</a>
    </div>`;
  projects.insertAdjacentHTML("afterbegin", newProject);
}
