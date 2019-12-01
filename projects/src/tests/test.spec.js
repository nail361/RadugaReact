import { expect } from 'chai';
import { reorder } from '../components/Game1';

const assert = require('assert');

describe('Game1.jsx', () => {
  it('Should delete elem from start index and place it to end index', () => {
    const arr = [1, 2, 3, 4, 5];
    const reorderedArr1 = reorder(arr, 0, 3);
    const reorderedArr2 = reorder(arr, 2, 4);
    const reorderedArr3 = reorder(arr, 4, 4);
    expect(reorderedArr1).to.be.an('array').that.eql([2, 3, 4, 1, 5]);
    expect(reorderedArr2).to.be.an('array').that.eql([1, 2, 4, 5, 3]);
    expect(reorderedArr3).to.be.an('array').that.eql([1, 2, 3, 4, 5]);
  });
});
