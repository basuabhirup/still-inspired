const loader = document.getElementById("preloader");
const img = document.getElementById("theImage");
const tryAgainButton = document.querySelector(".try-again-button");
const attribution = document.getElementById("attribution");
const username = document.getElementById("username");
const filters = document.querySelector(".filters")
const filterOptions = document.querySelectorAll(".option");
const applyButton = document.querySelector("button");
const SELECTED_FILTERS_KEY = "sawoa-selectedFilters";

// Load selected filters from localStorage (if available)
let selectedFilters = [];
const storedFilters = localStorage.getItem(SELECTED_FILTERS_KEY);
if (storedFilters) {
  try {
    selectedFilters = JSON.parse(storedFilters);
  } catch (error) {
    console.error("Error parsing stored filters:", error);
  }
} else {
  filterOptions.forEach((option) =>
    selectedFilters.push(option.dataset.filter)
  );
}

// Handle filter click and load initial states
filterOptions.forEach((option) => {
  const name = option.textContent.split(" (")[0].trim();
  const filter = option.dataset.filter;
  updateFilterUI(name, filter);

  option.addEventListener("click", () => {
    if (selectedFilters.includes(filter)) {
      // Remove filter from selected list
      selectedFilters.splice(selectedFilters.indexOf(filter), 1);
    } else {
      // Add filter to selected list
      selectedFilters.push(filter);
    }
    updateFilterUI(name, filter);
    
    // Update localStorage with selectedFilters
    localStorage.setItem(SELECTED_FILTERS_KEY, JSON.stringify(selectedFilters));
  });
});

// Update UI based on selected filters
function updateFilterUI(name, filter) {
  const filterSpan = document.querySelector(`[data-filter="${filter}"]`);
  tryAgainButton.value = "Apply Filter";
  if (selectedFilters.includes(filter)) {
    filterSpan.innerHTML = `${name} <span role="button">(x)</span>`;
    filterSpan.style.border = "1px solid grey";
  } else {
    filterSpan.innerHTML = `${name} <span role="button">(+)</span>`;
    filterSpan.style.border = "none";
  }
}

const getNewImage = () => {
  let NETLIFY_FUNCTION_URL = "/.netlify/functions/getNewImage"
  window.scrollTo({
    top: 100,
    behavior: "smooth",
  });
  loader.style.display = "block"; // Starts displaying loader
  filters.style.display = "none";
  tryAgainButton.style.display = "none";
  tryAgainButton.disabled = true;
  tryAgainButton.value = "Try another Picture"

  if (selectedFilters.length > 0) {
    const queryString = selectedFilters.join(",")
    NETLIFY_FUNCTION_URL += `?q=${queryString}`
  }

  fetch(NETLIFY_FUNCTION_URL)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data) // View API response in browser console
      img.src = data.urls.regular;
      img.alt = data.alt_description;
      username.href = `${data.user.links.html}?utm_source=Still-a-Work-of-Art&utm_medium=referral`;
      username.innerHTML = data.user.name;
      setTimeout(() => {
        attribution.style.display = "block";
        tryAgainButton.disabled = false;
        loader.style.display = "none"; // Stops displaying Loader after getting succesfully changing image
        filters.style.display = "flex";
        tryAgainButton.style.display = "block";
      }, 1000);
    })
    .catch((err) => {
      console.error(err);
      tryAgainButton.disabled = false;
      loader.style.display = "none";
      filters.style.display = "flex";
      tryAgainButton.style.display = "block";
    });
};
