import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { randomArr, getResultClass } from '../../utils/help';

import classes from './Game3.scss';

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
    const { layers, layerClasses } = this.state;

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
            className={`${classes.layer} ${getResultClass(index, layerClasses)}`}
          >
            <span className={classes.index}>{`${index + 1}.`}</span>
            <span className={classes.title}>{layer.name}</span>
          </div>
        )}
      </Draggable>
    ));

    return layersDiv;
  }

  checkAnswer() {
    let correct = true;
    const { layers } = this.state;
    const layerClasses = [];

    layers.forEach((layer, index) => {
      if (layer.order === index) {
        layerClasses.push(classes.correct);
      } else {
        layerClasses.push(classes.wrong);
        correct = false;
      }
    });

    this.setState({
      layerClasses,
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
      <div className={classes.Game3}>
        <header className={classes.header}>
          <span>Расположите слои Земли в правильном порядке.</span>
          <span>
            Перенесите слои так, как если бы они располагались на Земле от поверхности к центру.
          </span>
        </header>
        <main className={classes.main}>
          <div className={classes.planet} />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={classes.layers}
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
