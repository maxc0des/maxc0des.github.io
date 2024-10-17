let current_img = 0;  // Index für das aktuelle Bild
let image_src = [];  // Hier werden die Bilder aus der JSON-Datei gespeichert

function change_image() {
    // Überprüfen, ob das nächste Bild existiert
    if (current_img + 1 >= image_src.length) {
        current_img = 0;  // Zurück zum ersten Bild
    } else {
        current_img++;  // Nächstes Bild
    }
    document.getElementById("image_frame").src = image_src[current_img];  // Setze das Bild
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
    })
    .catch(error => {
        console.error("Error fetching content:", error);
    });
}

// Event Listener für den Bildwechsel
document.getElementById('image_frame').addEventListener("click", change_image);

// Lädt den Inhalt beim Laden der Seite
document.addEventListener('DOMContentLoaded', load_content);