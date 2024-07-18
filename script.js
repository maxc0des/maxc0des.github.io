console.log('hello world')
document.addEventListener('DOMContentLoaded', function() {
    fetch('latest-project.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').textContent = data;
        })
        .catch(error => console.error('Error loading the text file:', error));
});