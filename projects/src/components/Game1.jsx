import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../styles/Games.scss';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Game1 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      icons: ['bird', 'animal', 'people', 'fish', 'dino', 'nfo'],
    };
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

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

  static getIcons(icons) {
    const iconsDiv = icons.map((icon, index) =>
      (
        <Draggable key={icon} draggableId={icon} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className={['icon', icon].join(' ')}
            >
              {icon}
            </div>
          )}
        </Draggable>
      ));

    return iconsDiv;
  }

  render() {
    const { icons } = this.state;

    return (
      <div className="game1-wrapper">
        <h2>Выберите кто населяет планету:</h2>
        <h3>Перенесите нужные иконки, из списка, на планету</h3>
        <div className="planet" />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="icons"
              >
                {Game1.getIcons(icons)}
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
