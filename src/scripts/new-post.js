import { UI } from './utils.js';
import { api } from './apis/api.js';
import { Storage } from "./utils/storage.js";

function addSubmitListener() {
    const postForm = document.getElementById('postForm');
    postForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const story = document.getElementById('story').value;
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    if (!file || !isValidImageFile(file)) {
        alert('Please upload a valid image file (.jpg, .jpeg, .png, .gif)');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const imageLink = reader.result; 
        const post = createPost(title, story, imageLink);
        savePostToApi(post);  
        goToHomePage();
    };
    reader.readAsDataURL(file);
}

function isValidImageFile(file) {
    return /\.(jpeg|jpg|gif|png)$/i.test(file.name);
}

function createPost(title, story, imageLink) {
    return {
        title: title,
        story: story,
        img: imageLink  
    };
}

function savePostToApi(post) {
    api.post.createPost(post)
        .then(response => {
            console.log('Post created:', response);
            if (response && response.id) {
                console.log('Post added successfully!');
                goToHomePage();  
            }
        })
        .catch(err => {
            console.error('Error creating post:', err);
        });
}


function goToHomePage() {
    window.location.href = '/home.html'; 
}

function deleteAllPosts() {
    localStorage.removeItem('posts');
}

function initializePage() {
    const container = UI.createElement('div', { class: 'container-root' }, [
        UI.createElement('header', { class: 'header' }, [
            UI.createElement('a', { class: 'btn', href: "/home.html" }, 'Home')
        ]),
        UI.createElement('div', { id: "createPost" }, [
            UI.createElement('h1', { class: "heading" }, 'Create Post'),
            UI.createElement('div', { class: "form-wrapper" }, [
                UI.createElement('form', { id: "postForm" }, [
                    UI.createElement('label', { for: "title" }, "Title"),
                    UI.createElement('input', { type: "text", id: "title", name: "title", class: "input" }),
                    UI.createElement('label', { for: "story" }, "Story"),
                    UI.createElement('textarea', { id: "story", name: "story", class: "input" }),
                    UI.createElement('label', { for: "file-upload" }, "Upload Image"),
                    UI.createElement('input', { type: "file", id: "file-upload", class: "file-upload" }),
                    UI.createElement('button', { type: "submit", class: "btn" }, 'Create')
                ])
            ])
        ])
    ]);

    UI.render(container, document.querySelector('body'));
    addSubmitListener();
}

initializePage();