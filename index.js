'use strict';
import { fail, switchcase } from './utils.js';
import Die from './Die.js';
import SampleSpace from './SampleSpace.js';

const layout = (mount, caseName) => {
  d3.text('templates/figure.html').then(str => {
    console.log(str);
    const interactivity = () => d3.select(mount).append('div').attr('class', 'dice-ui');
    const figure = (str) => d3.select(mount).append('div').attr('class', 'sample-space').html(str);
    const horizontal = {
      'left': () => { interactivity(); figure(); },
      'right': () => { figure(); interactivity(); }
    };

    switchcase(horizontal)(caseName)(() => fail(`unknown layout orientation: must be either ${Object.keys(horizontal)[0]} or ${Object.keys(horizontal)[1]}.`))();

    const die1 = new Die('.dice-ui', 6, 0),
          die2 = new Die('.dice-ui', 6, 1);
          die1.init(), die2.init();

    const roll1 = die1.roll(),
          roll2 = die2.roll();
    console.log(roll1, roll2);

    const space = new SampleSpace('.sample-space', 6);
    space.init();

    d3.select('#die-0').text(roll1);
    d3.select('#die-1').text(roll2);
  });
}

layout('#mount', 'right');
