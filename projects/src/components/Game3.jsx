import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { randomArr } from '../utils/help';

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
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;

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

class Game3 extends PureComponent {
  constructor(props) {
    super(props);

    let layers = [
      { name: 'Кора', order: 0 },
      { name: 'Мантия', order: 1 },
      { name: 'Внешнее ядро', order: 2 },
      { name: 'Внутренее ядро', order: 3 },
    ];

    layers = randomArr(layers);

    this.state = {
      layers,
      layerClasses: [],
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.getLayers = this.getLayers.bind(this);
    this.getResultClass = this.getResultClass.bind(this);
    this.replay = this.replay.bind(this);
  }

  onDragEnd(result) {
    if (result.destination) {
      const { layers } = this.state;
      const newLayers = reorder(
        layers,
        result.source.index,
        result.destination.index,
      );

      this.setState({
        layers: newLayers,
      });
    }
  }

  getLayers() {
    const { layers } = this.state;

    const layersDiv = layers.map((layer, index) => (
      <Draggable
        key={layer.name}
        draggableId={layer.name}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getDropStyle(provided.draggableProps.style, snapshot)}
            className={`layer ${this.getResultClass(index)}`}
          >
            <span className="index">{`${index + 1}.`}</span>
            <span className="title">{layer.name}</span>
          </div>
        )}
      </Draggable>
    ));

    return layersDiv;
  }

  getResultClass(index) {
    const { layerClasses } = this.state;

    if (index < layerClasses.length) return layerClasses[index];
    return '';
  }

  checkAnswer() {
    let correct = true;
    const { layers } = this.state;
    const classes = [];

    layers.forEach((layer, index) => {
      if (layer.order === index) {
        classes.push('correct');
      } else {
        classes.push('wrong');
        correct = false;
      }
    });

    this.setState({
      layerClasses: classes,
    });

    return correct;
  }

  replay() {
    let { layers } = this.state;
    layers = randomArr(layers);

    this.setState({
      layers,
      layerClasses: [],
    });
  }

  render() {
    return (
      <div className="game3-wrapper">
        <header className="header">
          <span>Расположите слои Земли в правильном порядке.</span>
          <span>
            Перенесите слои так, как если бы они располагались на Земле от поверхности к центру.
          </span>
        </header>
        <main className="main">
          <div className="planet" />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="layers"
                >
                  {this.getLayers()}
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

export default Game3;
