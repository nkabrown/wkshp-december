'use strict';

export default class SampleSpace {
  constructor(el, sides) {
    this.mount = el;
    this.sides = sides;
    this.faces = [1, 2, 3, 4, 5, 6];
    this.data = this.tabulate();
  }

  init() {
    // we need to constrain
    const margin = { top: 20, right: 20, bottom: 40, left: 40 },
          width = document.getElementsByClassName('sample-space')[0].clientWidth - 100 - margin.left - margin.right,
          height = document.getElementsByClassName('sample-space')[0].clientHeight - 100 - margin.top - margin.bottom;

    // define a container and coordinate space
    const graph = d3.select(this.mount).append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // define scales, input domain and output range
    const x = d3.scalePoint()
       .padding(0.5)
       .domain(this.faces)
       .range([0, width]);
       
    const y = d3.scalePoint()
        .padding(0.5)
        .domain(this.faces)
        .range([height, 0]);
        
    const xAxis = d3.axisBottom(x),
          yAxis = d3.axisLeft(y);

    graph.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    graph.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    const offset = y.step() / 2;

    graph.selectAll('.data-band')
       .data(this.data)
      .enter().append('g')
        .attr('class', 'data-band')
        .attr('transform',  (d, i) => `translate(0, ${i * y.step() + offset})`);

    d3.selectAll('.data-band')
        .each(function(row) {
          console.log(row);
          d3.select(this).selectAll('.point')
              .data(row)
            .enter().append('circle')
              .attr('class', 'point')
              .attr('r', 3.5)
              .attr('cx', d => x(d.x))
              .style('fill', '#444');

        });
  }

  event(roll) {
    const points = d3.selectAll('.point');
    points.each(function(d) {
      const point = d3.select(this);
      `${d.x}${d.y}` == roll ? point.transition(300).attr('r', 6).style('fill', '#f44336') : null;
    });
  }

  tabulate() {
    const matrix = this.faces.map((elem, i, obj) => obj.map(x => ({ x: x, y: obj[i] }))).reverse();
    console.log(matrix);
    return matrix;
  }
}
