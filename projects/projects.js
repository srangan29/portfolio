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
 
  let data = [
    { value: 1, label: 'apples' },
    { value: 2, label: 'oranges' },
    { value: 3, label: 'mangos' },
    { value: 4, label: 'pears' },
    { value: 5, label: 'limes' },
    { value: 5, label: 'cherries' },
  ];  
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
let sliceGenerator = d3.pie();
let arcData = sliceGenerator(data);
let arcs = arcData.map((d) => arcGenerator(d));

// Refactor all plotting into one function
function renderPieChart(projectsGiven) {
  // re-calculate rolled data
  let newRolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );
  // re-calculate data
  let newData = newRolledData.map(([year, count]) => {
    return { value: count, label: year }; // TODO
  });

  // re-calculate slice generator, arc data, arc, etc.
  let newSliceGenerator = d3.pie().value((d) => d.value);
  let newArcData = newSliceGenerator(newData);
  let newArcs = newArcData.map((d) => arcGenerator(d));
  // TODO: clear up paths and legends
  let newSVG = d3.select('svg');
  newSVG.selectAll('path').remove();
  let colors = d3.scaleOrdinal(d3.schemeTableau10);
  newArcs.forEach((arc, idx) => {
    d3.select('svg')
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(idx)) // Fill in the attribute for fill color via indexing the colors variable
  })

let legend = d3.select('.legend');
newData.forEach((d, idx) => {
  legend
    .append('li')
    .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
    .attr('class', 'li_legend')
    .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
});

}

// Call this function on page load
renderPieChart(projects);

let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('change', (event) => {
  let filteredProjects = setQuery(event.target.value);
  // re-render legends and pie chart when event triggers
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
});


let selectedIndex = -1;

let svg = d3.select('svg');
svg.selectAll('path').remove();
arcs.forEach((arc, i) => {
  svg
    .append('path')
    .attr('d', arc)
    .attr('fill', colors(i))
    .on('click', () => {
      // What should we do? 
      selectedIndex = selectedIndex === i ? -1 : i;
      
      svg
    .selectAll('path')
    .attr('class', (_, idx) => (
      // TODO: filter idx to find correct pie slice and apply CSS from above
      idx === selectedIndex ? 'selected' : ''
    ));
  
    legend
    .selectAll('li')
    .attr('class', (_, idx) => (
      // TODO: filter idx to find correct legend and apply CSS from above
      idx === selectedIndex ? 'selected' : ''
    ));

    if (selectedIndex === -1) {
      renderProjects(projects, projectsContainer, 'h2');
    } else {
      // TODO: filter projects and project them onto webpage
      // Hint: `.label` might be useful
      let filteredProjects = setQuery(event.target.value);
      renderProjects(filteredProjects, projectsContainer, 'h2');
      renderPieChart(filteredProjects);
    }
});
});

