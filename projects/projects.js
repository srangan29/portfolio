import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

  const heading = document.querySelector("h1");
  heading.classList.add('projects-title');
  
  const title = document.querySelector('.projects-title');
  const projectCounter = projects.length
  title.textContent = `${projectCounter} Projects`;

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);



let projects = await fetchJSON('../lib/projects.json');; // fetch your project data
let rolledData = d3.rollups(
  projects,
  (v) => v.length,
  (d) => d.year,
);

let data = rolledData.map(([year, count]) => {
  return { value: count, label: year };
});

let sliceGenerator = d3.pie().value((d) => d.value);
let arcData = sliceGenerator(data);
let arcs = arcData.map((d) => arcGenerator(d));
let colors = d3.scaleOrdinal(d3.schemeTableau10);

arcs.forEach((arc, idx) => {
  d3.select('svg')
    .append('path')
    .attr('d', arc)
    .attr('fill', colors(idx)) // Fill in the attribute for fill color via indexing the colors variable
})

let legend = d3.select('.legend');
data.forEach((d, idx) => {
  legend
    .append('li')
    .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
    .attr('class', 'li_legend')
    .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
});


