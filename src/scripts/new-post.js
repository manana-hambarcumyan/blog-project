import { api } from './apis/api.js'
import { Storage } from "./utils/storage.js";

function createForm() {
  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "home.html" }, "Home"),
    ]),
    UI.createElement("form", { class: "form-wrapper" }, [
      UI.createElement("div", { class: "create-form-container" }, [
        UI.createElement("input", {
          type: "text",
          id: "postTitle",
          name: "postTitle",
          placeholder: "Enter post title",
        }),
        UI.createElement("textarea", {
          id: "postStory",
          name: "postStory",
          placeholder: "Enter your story here",
          rows: "5",
          cols: "50",
        }),
        UI.createElement("input", {
          id: "file-upload",
          type: "file",
        }),
        UI.createElement("div", { class: "" }, [
          UI.createElement("button", { id: "create-new-post" }, "Create Post"),
        ]),
      ]),
    ]),
  ]);

  UI.render(container, document.body);

  const createPostForm = document.getElementById("create-new-post");
  createPostForm.addEventListener("click", createPostHandler);
}

function initApplicants() {
  createForm();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  if (searchParams.has("id")) {
    const postId = searchParams.get("id");

    api.post.getPostById(postId).then(post => {
      document.getElementById("postTitle").value = post.title;
      document.getElementById("postStory").value = post.story;
      document.getElementById("postImage").value = post.img ? post.img : "";   
    }).catch(() => {
      window.location.assign("home.html");
    })
  }

}

initApplicants();


async function createPostHandler(event) {
  event.preventDefault();

  const title = document.getElementById("postTitle").value.trim();
  const story = document.getElementById("postStory").value.trim();
  const fileUpload = document.getElementById("file-upload");

  const uploadedFile = await api.fileUpload.upload(fileUpload.files[0]);

  if (!title || !story || !fileUpload.files.length) {
    alert("Please fill in all fields.");
    return;
  }

  const user = Storage.getItem('user');

  const newPost = {
    title,
    story,
    authorName: user.username, 
    img: uploadedFile.url,
    userId: user.id
  };

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get("id");


  if (id) {
    api.post.update(id, newPost).then((post) => {
      console.log(post);
      window.location.assign("home.html");  
    })
  } else {
    api.post.create(newPost).then((post) => {
      console.log(post);
      window.location.assign("home.html");  
    })
  }
}