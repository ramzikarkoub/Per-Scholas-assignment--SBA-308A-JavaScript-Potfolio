import { loadProjects } from "./api.js";
import { displayData } from "./utils.js";
import { displayNewProject } from "./utils.js";

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
  try {
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

    const req = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data
    );
    // const res = await req.json();

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
      console.log("POST status ", req.status);
      displayNewProject(data);
    }
  } catch (error) {
    console.log(error);
  }
});

// Filter and display data on search
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = document.querySelector(".search-input").value.trim();

  const filteredData = fetchedData.filter((e) => {
    return e.title.rendered.toLowerCase().includes(searchInput.toLowerCase());
  });

  if (filteredData.length === 0) {
    projects.innerHTML = "<p>No projects found.</p>";
  } else {
    // Update with filtered data
    displayData(filteredData);
  }
});

// Call initial load
inialLoad();
