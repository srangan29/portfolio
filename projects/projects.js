import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

  const heading = document.querySelector("h1");
  heading.classList.add('projects-title');
  const title = document.querySelector('.projects-title');
  const projectCounter = document.querySelectorAll('article').length;
  title.textContent = `${projectCounter} Projects`;