const loader = document.getElementById("preloader");
const img = document.getElementById("theImage");
const tryAgainButton = document.querySelector(".try-again-button");
const attribution = document.getElementById("attribution");
const username = document.getElementById("username");

const getNewImage = () => {
  loader.style.display = "block"; // Starts displaying loader
  tryAgainButton.disabled = true;
  fetch("/.netlify/functions/getNewImage")
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
      }, 750);
    })
    .catch((err) => {
      console.error(err);
      tryAgainButton.disabled = false;
      loader.style.display = "none";
    });
};
