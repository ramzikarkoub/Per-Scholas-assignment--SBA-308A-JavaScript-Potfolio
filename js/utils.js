export function displayData(fetchedData) {
  let projectHTML = fetchedData
    .map(
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
            <p class="description">${project.content.rendered.substring(
              0,
              300
            )}</p>
            <a href="${project.acf.url}" target="_blank">View Project</a>
          </div>`
    )
    .join("");

  projects.innerHTML = projectHTML;
}
