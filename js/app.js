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

submitProjectSend.addEventListener("click", async (e) => {
  e.preventDefault();
  const nameProject = projectName.value;
  const proImg = projectImage.value;
  const techUsedProject = projectTechUsed.value;
  const descProject = projectDesx.value;

  // const name = projectName.value;
  // const projectImage = projectImage.value;
  // const projectTechUsed = projectTechUsed.value;
  // const projectDesx = projectDesx.value;

  const data = {
    nameProject,
    proImg,
    techUsedProject,
    descProject,
  };
  const req = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
  const res = await req.json();
  console.log(res.status);
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
