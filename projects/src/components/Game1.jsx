import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { randomArr } from '../plugins/help';

import '../styles/Games.scss';

const getDropStyle = (style, snapshot) => {
  if (!snapshot.isDropAnimating) {
    return style;
  }

  const { draggingOver, dropAnimation } = snapshot;

  if (draggingOver === 'droppable') {
    return style;
  }

  const { moveTo, curve, duration } = dropAnimation;

  // move to the right spot
  const translate = `translate(${moveTo.x + 50}px, ${moveTo.y + 50}px)`;

  // patching the existing style
  return {
    ...style,
    transform: `${translate}`,
    transition: `all ${curve} ${duration}s`,
  };
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const switchDroppable = (index, oldDrop, newDrop) => {
  newDrop.push(oldDrop.splice(index, 1)[0]);

  return { newIcons: oldDrop, newPlanetIcons: newDrop };
};

const trueAnswers = ['bird', 'animal', 'human', 'fish'];

class Game1 extends PureComponent {
  constructor(props) {
    super(props);

    let icons = ['bird', 'animal', 'human', 'fish', 'dino', 'ufo'];
    icons = randomArr(icons);

    this.state = {
      icons,
      planetIcons: [],
      iconsClasses: [],
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.getIcons = this.getIcons.bind(this);
    this.getResultClass = this.getResultClass.bind(this);
    this.replay = this.replay.bind(this);
  }

  onDragEnd(result) {
    if (result.destination) {
      if (result.destination.droppableId === 'planet') {
        const { icons, planetIcons } = this.state;

        const { newIcons, newPlanetIcons } = switchDroppable(
          result.source.index,
          icons,
          planetIcons,
        );

        this.setState({
          icons: newIcons,
          planetIcons: newPlanetIcons,
        });
      } else {
        const { icons } = this.state;

        const newIcons = reorder(
          icons,
          result.source.index,
          result.destination.index,
        );

        this.setState({
          icons: newIcons,
        });
      }
    }
  }

  getIcons(icons, place) {
    const isDragDisabled = place === 'planet';

    let iconsDiv;

    if (place === 'planet') {
      iconsDiv = icons.map((icon, index) => (
        <div
          key={icon}
          className={`icon ${icon} ${this.getResultClass(index)}`}
        />
      ));
    } else {
      iconsDiv = icons.map((icon, index) => (
        <Draggable
          key={icon}
          draggableId={icon + place}
          index={index}
          isDragDisabled={isDragDisabled}
        >
          {(provided, snapshot) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={getDropStyle(provided.draggableProps.style, snapshot)}
              className={`icon ${icon}`}
            />
          )}
        </Draggable>
      ));
    }

    return iconsDiv;
  }

  getResultClass(index) {
    const { iconsClasses } = this.state;

    if (index < iconsClasses.length) return iconsClasses[index];
    return '';
  }

  checkAnswer() {
    let correct = true;
    const { planetIcons } = this.state;

    let trueCount = trueAnswers.length;
    const classes = [];

    planetIcons.forEach((icon) => {
      if (trueAnswers.indexOf(icon) >= 0) {
        trueCount--;
        classes.push('correct');
      } else {
        trueCount++;
        classes.push('wrong');
      }
    });

    this.setState({
      iconsClasses: classes,
    });

    if (trueCount > 0) correct = false;

    return correct;
  }

  replay() {
    const { icons, planetIcons } = this.state;
    let newIcons = [...icons, ...planetIcons];
    newIcons = randomArr(newIcons);

    this.setState({
      icons: newIcons,
      planetIcons: [],
      iconsClasses: [],
    });
  }

  render() {
    const { icons, planetIcons } = this.state;

    return (
      <div className="game1-wrapper">
        <header className="header">
          <span>Выберите кто населяет планету:</span>
          <span>Перенесите нужные иконки, из списка, на планету</span>
        </header>
        <main className="main">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="planet">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="planet"
                >
                  {this.getIcons(planetIcons, 'planet')}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="icons"
                >
                  {this.getIcons(icons, 'base')}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
      </div>
    );
  }
}

export default Game1;
