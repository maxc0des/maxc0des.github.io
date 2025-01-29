let current_img = 0;
let image_src = [];

function change_image() {
    if (current_img + 1 >= image_src.length) {
        current_img = 0;
    } else {
        current_img++;
    }
    document.getElementById("image_frame").src = image_src[current_img];
}

function load_content() {
    fetch("content.json")
    .then(response => {
        if (!response.ok) {
            document.getElementById('title').innerHTML = "Something went wrong here :( <br> Try again later";
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Bilder aus der JSON-Datei ins Array laden
        data.images.forEach((image) => {
            image_src.push(image.source);
        });

        // Setze das erste Bild
        if (image_src.length > 0) {
            document.getElementById('image_frame').src = image_src[0];
        }

        // Setze den Inhalt für das aktuelle Projekt
        document.getElementById('content').innerHTML = `<span class="roboto-bold">What I'm currently working on:</span><br><br> ${data.latest_project.description}`;

        // Setze die Projekte
        data.projects.forEach((project, index) => {
            document.getElementById(`project-name${index + 1}`).innerHTML = project.title;
            document.getElementById(`project-description${index + 1}`).innerHTML = project.description;
            document.getElementById(`project-repo${index + 1}`).href = project.url;
        });

        data.blog.forEach((blog, index) => {
            document.getElementById(`blog-name${index + 1}`).innerHTML = blog.title;
            document.getElementById(`blog-description${index + 1}`).innerHTML = blog.description;
            document.getElementById(`blog-url${index + 1}`).href = blog.url;
        });
    })
    .catch(error => {
        console.error("Error fetching content:", error);
    });
}

function load_git(){
    fetch('https://api.github.com/users/maxc0des/events')
  .then(response => response.json())
  .then(data => {
    const lastThreeEvents = data.slice(0, 3);
    lastThreeEvents.forEach((event, index) => {
      document.getElementById(`github${index + 1}`).innerHTML = `Typ: ${event.type}, Repository: ${event.repo.name}`
    });
  })
  .catch(error => console.error('Fehler:', error));
}

document.getElementById('image_frame').addEventListener("click", change_image);
document.addEventListener('DOMContentLoaded', load_content);
document.addEventListener('DOMContentLoaded', load_git)
setInterval(change_image, 5000);