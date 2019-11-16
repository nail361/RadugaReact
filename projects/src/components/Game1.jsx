import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../styles/Games.scss';

const getDropStyle = (style, snapshot) => {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  const { moveTo, curve, duration } = snapshot.dropAnimation;

  // move to the right spot
  // const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  const translate = 'translate(50%, 50%)';

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
  newDrop.push(oldDrop.splice(index, 1));

  return { newIcons: oldDrop, newPlanetIcons: newDrop };
};

const trueAnswers = ['bird', 'animal', 'people', 'fish'];

class Game1 extends PureComponent {
  constructor(props) {
    super(props);

    let icons = ['bird', 'animal', 'people', 'fish', 'dino', 'nfo'];
    icons = icons.sort(() => Math.random() - 0.5);

    this.state = {
      icons,
      planetIcons: [],
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    console.log(result);

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

  static getIcons(icons, place) {
    const isDragDisabled = place === 'planet';

    let iconsDiv;

    if (place === 'planet') {
      iconsDiv = icons.map((icon) => (
        <div
          key={icon}
          className={['icon', icon].join(' ')}
        >
          {icon}
        </div>
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
              className={['icon', icon].join(' ')}
            >
              {icon}
            </div>
          )}
        </Draggable>
      ));
    }

    return iconsDiv;
  }

  render() {
    const { icons, planetIcons } = this.state;

    return (
      <div className="game1-wrapper">
        <h2>Выберите кто населяет планету:</h2>
        <h3>Перенесите нужные иконки, из списка, на планету</h3>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="planet">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="planet"
              >
                {Game1.getIcons(planetIcons, 'planet')}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="icons"
              >
                {Game1.getIcons(icons, 'base')}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default Game1;
