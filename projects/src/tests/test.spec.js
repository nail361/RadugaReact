import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../main';
import { reorder } from '../components/Game1';
import App, { Game } from '../components/App';

configure({ adapter: new Adapter() });

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

describe('App Component', () => {
  it('renders the Game wrapper', () => {
    const wrapper = shallow(<Provider store={store}><App /></Provider>);

    console.log(wrapper.debug());

    expect(wrapper.find(Game)).to.have.length(1);
  });
});
