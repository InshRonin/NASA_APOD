const button = document.getElementById("search-btn");
const input = document.getElementById("date");
const image = document.getElementById("image");
const info = document.getElementById("info");
const darkBtn = document.getElementById("dark-search");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
moon.style.display = "none";
darkBtn.style.display = "none";

function darkmode() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    // Dark mode is ON
    sun.style.display = "none";
    moon.style.display = "block";
    darkBtn.style.display = "block";
    button.style.display = "none";
  } else {
    // Light mode is ON
    sun.style.display = "block";
    moon.style.display = "none";
    darkBtn.style.display = "none";
    button.style.display = "block";
  }
}

async function search() {
  const date = input.value;
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (date == data.date) {
      image.src = data.url;
      image.style.display = "block";
      info.textContent = data.explanation;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    info.innerHTML = `${error} occured`;
  }
}

button.addEventListener("click", search);
