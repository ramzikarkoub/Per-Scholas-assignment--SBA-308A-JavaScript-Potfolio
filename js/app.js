import { loadProjects } from "./api.js";
import { displayData } from "./utils.js";

let fetchedData;
const projects = document.getElementById("projects");
const loader = document.getElementById("loader");
const submitBtn = document.querySelector(".submitBtn");
const projectName = document.querySelector(".projectName");
const projectImage = document.querySelector(".projectImage");
const projectTechUsed = document.querySelector(".projectTechUsed");
const projectDesx = document.querySelector(".projectDesx");
const submitProjectSend = document.querySelector(".submitProjectSend");
const authCode = document.querySelector(".authCode");
const projectUrl = document.querySelector(".projectUrl");

const inialLoad = async (query = "") => {
  // Assign to global variable
  fetchedData = await loadProjects();
  console.log(fetchedData);

  if (fetchedData.length === 0) {
    projects.innerHTML = "<p>No projects found.</p>";
    return;
  } else {
    // Display all data initially
    displayData(fetchedData);
  }
};

submitProjectSend.addEventListener("click", async (e) => {
  e.preventDefault();
  const nameProject = projectName.value;
  const proImg = projectImage.value;
  const techUsedProject = projectTechUsed.value;
  const descProject = projectDesx.value;
  const code = authCode.value;
  const url = projectUrl.value;
  const data = {
    proImg,
    nameProject,
    techUsedProject,
    url,
    descProject,
    code,
  };
  const req = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  const res = await req.json();
  console.log(res);
  if (
    !nameProject ||
    !proImg ||
    !techUsedProject ||
    !descProject ||
    !code ||
    !url
  ) {
    alert("Please fill in all fields before submitting!");
    return;
  }
  if (
    data.nameProject &&
    data.proImg &&
    data.techUsedProject &&
    data.descProject &&
    data.code &&
    data.url
  ) {
    const newProject = `<div id="project" class="project">
      <img src="${data.proImg}" class="project-img" />
      <h3 class="title">${data.nameProject}</h3>
      <h5 class="Tech">Technologies used: ${data.techUsedProject}</h5>
      <p class="description">${data.descProject.substring(0, 300)}</p>
      <a href="${data.url}" target="_blank">View Project</a>
    </div>`;
    // const projectContainer = document.getElementById("projects");
    projects.insertAdjacentHTML("afterbegin", newProject);
  }
});

// Filter and display data on search
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector(".search-input").value.trim();
  console.log("object");
  console.log(fetchedData);

  const filteredData = fetchedData.filter((e) => {
    return e.title.rendered.toLowerCase().includes(searchInput.toLowerCase());
  });
  console.log(filteredData);

  if (filteredData.length === 0) {
    projects.innerHTML = "<p>No projects found.</p>";
  } else {
    // Update with filtered data
    displayData(filteredData);
  }
});

// Call initial load
inialLoad();
