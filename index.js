'use strict';
import { fail, switchcase } from './utils.js';
import Die from './Die.js';
import SampleSpace from './SampleSpace.js';

const layout = (mount, caseName) => {
  d3.text('templates/figure.html').then(str => {
    const interactivity = () => d3.select(mount).append('div').attr('class', 'dice-ui');
    const figure = str => d3.select(mount).append('div').attr('class', 'sample-space').html(str);
    const horizontal = {
      'left': () => { interactivity(); figure(str); },
      'right': () => { figure(str); interactivity(); }
    };

    switchcase(horizontal)(caseName)(() => fail(`unknown layout orientation: must be either ${Object.keys(horizontal)[0]} or ${Object.keys(horizontal)[1]}.`))();

    d3.select('.dice-ui').append('div')
        .attr('class', 'dice-container');

    const die1 = new Die('.dice-container', 6, 0),
          die2 = new Die('.dice-container', 6, 1);
          die1.init(), die2.init();


    const space = new SampleSpace('.sample-space', 6);
    space.init();

    d3.select('.dice-ui').insert('button', ':first-child')
        .attr('id', 'roll-control')
        .text('Roll Dice')
        .on('click', () => {
          eventItems.transition(300).style('color', '#444');

          const roll1 = die1.roll(),
                roll2 = die2.roll();

          space.event(`${roll1}${roll2}`);
          d3.select('#die-0').text(roll1);
          d3.select('#die-1').text(roll2);
        });

    const list = d3.select('.dice-ui').append('div')
        .attr('class', 'event-list');

    list.append('p')
       .attr('class', 'list-title')
       .html('Events <span>(click to select)</span>');

    list.append('ul')

    list.select('ul').append('li')
      .text('All points equal to the sum of dice roll')
      .on('click', function() {
        eventItems.transition(300).style('color', '#444');
        const roll1 = d3.select('#die-0').text(),
              roll2 = d3.select('#die-1').text();
        space.sum(+roll1, +roll2);
        d3.select(this).transition(300).style('color', '#f44336');
      });

    const eventItems = d3.selectAll('.event-list ul > li');
  });
}

layout('#mount', 'right');
