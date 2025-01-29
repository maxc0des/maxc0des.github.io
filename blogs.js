function load_blogs() {
    fetch("content.json")
    .then(response => {
        if (!response.ok) {
            document.getElementById('title').innerHTML = "Something went wrong here :( <br> Try again later";
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.blog || !Array.isArray(data.blog)) {
            throw new Error("Invalid data format: 'blog' is not an array");
        }

        // Create a container div for all blogs
        const blogsContainer = document.createElement('div');
        blogsContainer.id = 'blogs-container';

        // Setze die Blogs
        data.blog.forEach((blog) => {
            const blogDiv = document.createElement('div');
            blogDiv.className = 'blog-entry';

            const blogTitle = document.createElement('h2');
            blogTitle.innerHTML = blog.title;
            blogDiv.appendChild(blogTitle);

            const blogDescription = document.createElement('p');
            blogDescription.innerHTML = blog.description;
            blogDiv.appendChild(blogDescription);

            const blogLink = document.createElement('a');
            url = `/blog-post.html${blog.url}`;
            console.log(url);
            blogLink.href = url;
            blogLink.innerHTML = 'Read more';
            blogDiv.appendChild(blogLink);

            blogsContainer.appendChild(blogDiv);
        });

        document.getElementById('blogs').appendChild(blogsContainer);
    })
    .catch(error => {
        console.error("Error fetching content:", error);
    });
}

document.addEventListener('DOMContentLoaded', load_blogs);