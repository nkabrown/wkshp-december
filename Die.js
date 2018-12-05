'use strict';

export default class Die {
  constructor(el, sides, id) {
    this.mount = el;
    this.sides = sides;
    this.identity = id;
  }

  init() {
    d3.select(this.mount).append('div')
        .attr('class', 'die')
        .attr('id', `die-${this.identity}`)
        .style('width', '100px')
        .style('height', '100px');
  }

  roll() {
    // return result between 1 and the number of sides
    // cannot roll a zero
    return Math.ceil(Math.random() * this.sides);
  }
}
