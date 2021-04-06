const container = document.querySelector(".container");

const showCoffees = () => {
  let output = "";

  fetch("https://dev-coffee-server.herokuapp.com/api/coffee")
    .then(response => response.json())
    .then(coffees => {
      coffees.forEach(
        ({ name, image }) =>
          (output += `
                  <div class="card">
                    <img class="card--avatar" src=${image} alt="image ${name}"/>
                    <h1 class="card--title">${name}</h1>
                    <a class="card--link" href="#">Taste</a>
                  </div>
                  `)
      );
      container.innerHTML = output;
    })
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    /** Ici nous allons enregistrer notre service worker */
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(() => console.log('Service worker enregistré avec succès'))
      .catch((err) => console.error("Le service worker n'a pas été enregistré", err))
  });
}
