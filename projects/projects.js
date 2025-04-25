import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

export function renderProjects(project, containerElement, headingLevel= 'h2') {
    // Your code will go here
    containerElement.innerHTML = '';
        const article = document.createElement('article'); 
        article.innerHTML = `
        <h3>${project.title}</h3>
        <img src="${project.image}" alt="${project.title}">
        <p>${project.description}</p>
`;
        containerElement.appendChild(article);
  }

  const heading = document.querySelector("h1");
  title.classList.add('projects-title');
  const title = document.querySelector('.projects-title');
  const projectCounter = document.querySelectorAll('article').length;
  title.textContent = "$(projectCounter)$ Projects";