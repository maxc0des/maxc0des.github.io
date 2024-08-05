let current_img = 1;
const images = 4;

function change_image() {
    if(current_img+1>images){
        next_img = 1;
    }
    else{
        next_img = current_img + 1;
    }
    let source = "/images/image"+ next_img + ".jpg";
    current_img = next_img;
    document.getElementById("image_frame").src = source;
}

function load_content(){
    fetch("content.json")
    .then(response => {
      if (!response.ok) {
        document.getElementById('title').innerHTML = "something went wrong here :( <br> try again later";
        throw new Error(`HTTP error! status: ${response.status}`);
        
      }
      return response.json();
    })
    .then(data => {
        document.getElementById('content').innerHTML = `<span class="roboto-bold">What im currently working on:</span><br><br> ${data.latest_project.description}`;
        data.projects.forEach((project, index) => {
            document.getElementById(`project-name${index + 1}`).innerHTML = project.title;
            document.getElementById(`project-description${index + 1}`).innerHTML = project.description;
            document.getElementById(`project-repo${index + 1}`).href = project.url;
          });
    })
    .catch(error => {
      console.error("Fehler beim Abrufen des Artikels:", error);
    });
}

document.getElementById('image_frame').addEventListener("click", change_image);
document.addEventListener('DOMContentLoaded', load_content)

console.log('hello world');