'use strict';
import { fail, switchcase } from './utils.js';

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
  });
}

layout('#mount', 'right');
