const postcontainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  return data;
}

async function showPosts() {
  const posts = await getPosts();
  console.log(posts);

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <div class="post-title">${post.title}</div>
        <div class="post-body">${post.body}</div>
        </div>    
        `;
    postcontainer.appendChild(postEl);
  });
}

function showLoading() {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

function filterPost(e) {
  const val = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(val) > -1 || body.indexOf(val) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

showPosts();

// scrollTop - "hieght of the part of the page" which go top outside the page, when we scroll down,
// clientHeight - height of current showing part of the page which is showed on the current browser window
//scrollHeight - it is full page height when a page has scroll
// when we reach at the bottom of the page,
// scrollHeight = scrollTop + clientHeight

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
});

filter.addEventListener("input", filterPost);
