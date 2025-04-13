console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
/* navLinks = $$("nav a");

let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname,
  );

if (currentLink) {
  // or if (currentLink !== undefined)
  currentLink.classList.add('current');
}*/

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    // add the rest of your pages here
    { url: 'contact/', title: 'Projects' },
    { url: 'resume/', title: 'Projects' },
    { url: 'https://github.com/srangan29', title: 'GitHub' },
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // next step: create link and add it to nav
    // Create link and add it to nav
nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
  }

  const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/website/";         // GitHub Pages repo name

  if (!url.startsWith('http')) {
    url = BASE_PATH + url;
  }
/* or url = !url.startsWith('http') ? BASE_PATH + url : url;*/

  /* <nav><a href="../index.html">Home</a>
        <a href="../projects/index.html">Projects</a>
        <a href="../contact/index.html">Contact</a> 
        <a href="../resume/index.html">Resume</a>
        <a href="https://github.com/srangan29" target="_blank">GitHub</a>
    </nav> */