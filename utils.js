'use strict';

export const switchcase = cases => key => unknown => key in cases ? cases[key] : unknown;

export const fail = reason => {
  throw new Error(reason);
};
