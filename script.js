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

function alligne_items() {
    var aboutText = document.getElementById("about_text");
    var latestProject = document.getElementById("latest_project");
  
    if (aboutText && latestProject) {
      var offset = aboutText.offsetLeft;
      console.log("Offset left of about_text: " + offset);
  
      latestProject.style.transform = `translateX(${offset}px)`;
      console.log("New transform of latest_project: " + latestProject.style.transform);
    } else {
      console.error("One or both elements are not found.");
    }
  }

document.getElementById('image_frame').addEventListener("click", change_image);
window.addEventListener("resize", alligne_items);

console.log('hello world');

document.addEventListener('DOMContentLoaded', function() {
    fetch('latest-project.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').textContent = data;
        })
        .catch(error => console.error('Error loading the text file:', error));
});