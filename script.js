console.log('hello world')
let current_img = 1;
const images = 4;
document.addEventListener('DOMContentLoaded', function() {
    fetch('latest-project.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').textContent = data;
        })
        .catch(error => console.error('Error loading the text file:', error));
});
document.getElementById('image_frame').addEventListener("click", change_image);

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