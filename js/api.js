const loader = document.getElementById("loader");
export const loadProjects = async () => {
  const url =
    "https://www.ramzikarkoub.com/wp-json/wp/v2/project?&acf_format=standard";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch projects");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
