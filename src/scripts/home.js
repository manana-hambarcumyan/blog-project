import { api } from './apis/api.js';
import { isUserLogin } from './utils/is-user-login.js';
import { Storage } from './utils/storage.js';

const state = { posts: [], bloggers: [] };

const createHomeLayout = function () {
  const token = Storage.getItem('token');
  const isUserLoggedIn = !!token;

  const createNewPostButton = UI.createElement("button", { class: "btn btn-primary" }, "Create New Post");
  createNewPostButton.addEventListener("click", () => window.location.assign("new-post.html"));

  const container = UI.createElement("div", { class: "container" }, [
    UI.createElement("header", { class: "header" }, [
      UI.createElement("a", { href: "index.html" }, isUserLoggedIn ? "Log Out" : "Log In"),
      UI.createElement("a", { href: "registration.html" }, "Sign Up"),
    ]),
    UI.createElement("main", { class: "main" }, [
      createSidebar(state.bloggers),
      UI.createElement("section", { class: "content" }, [
        createNewPostButton,
        createSection(),
        createFooter()
      ])
    ])
  ]);

  UI.render(container, document.body);
};

function createFooter() {
  return UI.createElement("footer", { class: "footer" }, `© ${new Date().getFullYear()}`);
}

function createSidebar(bloggers) {
  const bloggerElements = bloggers.map(blogger => {
    return UI.createElement("div", { class: "sidebar-item" }, [
      UI.createElement("img", { src: blogger.avatar, alt: "Blogger Avatar", class: "avatar" }),
      UI.createElement("p", {}, `${blogger.firstName} ${blogger.lastName}`)
    ]);
  });

  return UI.createElement("aside", { class: "sidebar" }, bloggerElements);
}

function createSection() {
  const postElements = state.posts.map(post => {
    const deleteButton = UI.createElement("button", { class: "btn btn-danger" }, "Delete");
    deleteButton.addEventListener("click", () => handleDelete(post.id));

    const editButton = UI.createElement("button", { class: "btn btn-warning" }, "Edit");
    editButton.addEventListener("click", () => handleEdit(post.id));

    return UI.createElement("div", { class: "post-card" }, [
      UI.createElement("h2", {}, post.title),
      UI.createElement("p", {}, post.story),
      UI.createElement("div", {}, [deleteButton, editButton])
    ]);
  });

  return UI.createElement("div", { class: "post-section" }, postElements);
}

function handleDelete(id) {
  api.post.delete(id).then(() => {
    state.posts = state.posts.filter(post => post.id !== id);
    createHomeLayout();
  });
}

function handleEdit(id) {
  window.location.assign(`post-update.html?id=${id}`);
}

const initHome = () => {
  if (!isUserLogin()) {
    window.location.assign('index.html');
    return;
  }

  Promise.all([api.post.getPosts(), api.user.getUsers()]).then(([posts, bloggers]) => {
    state.posts = posts;
    state.bloggers = bloggers;
    createHomeLayout();
  });
};

initHome();







// home.html


// new-post.html


// registration.html


// home.js
