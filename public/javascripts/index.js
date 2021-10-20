let objectIds;
let currentArtwork;
const baseUrl = `https://collectionapi.metmuseum.org/public/collection/v1/`;
const notAvailableIcon = `https://img.icons8.com/ios-filled/50/000000/image-not-avialable.png`;
const imageContainer = document.querySelector(".image-container");
imageContainer.innerHTML = `<h1 class='center'>Loading</h1>`;

const populateArtwork = () => {
  const randomId = objectIds[Math.floor(Math.random() * objectIds.length)];
  fetch(`${baseUrl}objects/${randomId}`)
    .then((res) => res.json())
    .then((obj) => {
      const picture = obj.primaryImage || notAvailableIcon;
      currentArtwork = obj;
      imageContainer.innerHTML = `<img class='image' src="${picture}" />`;
    });
};

setTimeout(() => {
  fetch(`${baseUrl}objects`)
    .then((res) => res.json())
    .then((serverIds) => {
      objectIds = serverIds.objectIDs;
      return populateArtwork();
    });
}, 250);

const timer = new Timer(populateArtwork, 10000);
timer.startTimer();

imageContainer.addEventListener("click", function (e) {
  if (!timer.paused) {
    timer.pause();
    const { creditLine, department, objectDate, repository } = currentArtwork;
    const otherDetails = {
      creditLine,
      department,
      objectDate,
      repository,
    };
    const createUl = document.createElement("ul");
    for (let detail in otherDetails) {
      const li = document.createElement("li");
      li.innerHTML = `<b>${detail}:</b> <span>${otherDetails[detail]}</span>`;
      createUl.append(li);
    }
    const p = document.createElement("p");
    p.textContent = `Additional Information On This Artwork`;
    p.setAttribute("class", "additional-info");
    this.append(p);
    this.append(createUl);
  } else {
    timer.resume();
    this.innerHTML = `<img class='image' src="${
      currentArtwork.primaryImage || notAvailableIcon
    }" />`;
    timer.startTimer();
  }
});
