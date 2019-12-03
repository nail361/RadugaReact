import { expect } from 'chai';
import { mount, render, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { reorder } from '../components/Game1';
// import { initialState } from '../reducers/gameState';
import { Game, App } from '../components/App';

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
  const initialState = {
    gameId: 0,
  };
  const mockStore = configureStore();
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    // wrapper = mount(<Provider store={store}><App /></Provider>);
    wrapper = shallow(<App store={store} />);
  });

  it('renders the Game wrapper', () => {
    console.log(wrapper.debug());

    expect(wrapper.find(Game)).to.have.length(1);
  });
});
