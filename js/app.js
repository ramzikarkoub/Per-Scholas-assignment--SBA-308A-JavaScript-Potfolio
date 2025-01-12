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

const inialLoad = async (query = "") => {
  fetchedData = await loadProjects(); // Assign to global variable
  console.log(fetchedData);

  if (fetchedData.length === 0) {
    projects.innerHTML = "<p>No projects found.</p>";
    return;
  } else {
    displayData(fetchedData); // Display all data initially
  }
};

submitProjectSend.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(projectName.value);
  console.log(projectImage.value);
  console.log(projectTechUsed.value);
  console.log(projectDesx.value);
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
    displayData(filteredData); // Update with filtered data
  }
});

// Call initial load
inialLoad();
