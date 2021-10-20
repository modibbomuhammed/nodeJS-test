let objectIds;
let currentArtwork;
const baseUrl = `https://collectionapi.metmuseum.org/public/collection/v1/`;
const imageContainer = document.querySelector(".image-container");
imageContainer.innerHTML = `<h1 class='center'>Loading</h1>`;
setTimeout(() => {
  fetch(`${baseUrl}objects`)
    .then((res) => res.json())
    .then((serverIds) => {
      objectIds = serverIds.objectIDs;
      console.log({ objectIds });
    });
}, 1000);
const interval = setInterval(() => {
  const randomId = objectIds[Math.floor(Math.random() * objectIds.length)];
  fetch(`${baseUrl}objects/${randomId}`)
    .then((res) => res.json())
    .then((obj) => {
      currentArtwork = obj;
      imageContainer.innerHTML = `<img class='image' src="${obj.primaryImage}" />`;
    });
}, 10000);
