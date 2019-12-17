import React, { PureComponent } from 'react';

import classes from './Game2.scss';
import globalClasses from '../../styles/Games.scss';
import { randomArr, getResultClass } from '../../utils/help';

const initAnswers = [
  {
    id: 0, checked: false, correct: true, title: 'Обеспечивает Землю кислородом',
  },
  {
    id: 1, checked: false, correct: true, title: 'Защищает Землю от космического мусора',
  },
  {
    id: 2, checked: false, correct: false, title: 'Поглощает кислород Земли',
  },
  {
    id: 3, checked: false, correct: false, title: 'Создаёт солнечный свет',
  },
  {
    id: 4, checked: false, correct: false, title: 'Притягивает всё к земле',
  },
];

class Game2 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answers: randomArr(initAnswers),
      iconsClasses: [],
    };

    this.getAnswers = this.getAnswers.bind(this);
  }

  onCheckboxChange(event, id) {
    const { checked } = event.currentTarget;
    let { answers } = this.state;
    answers = answers.map((answer) => {
      const newAnswer = { ...answer };
      if (newAnswer.id === id) {
        newAnswer.checked = checked;
      }
      return newAnswer;
    });

    this.setState({
      answers,
    });
  }

  getAnswers() {
    const { answers, iconsClasses } = this.state;

    const answersCheckboxes = answers.map((answer, index) => (
      <div className={`${classes['checkbox-group']} ${getResultClass(index, iconsClasses)}`} key={answer.id}>
        <input
          onChange={(e) => this.onCheckboxChange(e, answer.id)}
          id={`checkbox-${answer.id}`}
          type="checkbox"
          name={`checkbox-name-${index}`}
          style={{ display: 'none' }}
          checked={answer.checked}
        />
        <label htmlFor={`checkbox-${answer.id}`} checked={answer.checked}>
          <span className={classes['input-background']}>
            <span />
          </span>
        </label>
        <span className={classes['text-middle']}>
          <span>{answer.title}</span>
        </span>
      </div>
    ));

    return answersCheckboxes;
  }

  checkAnswer() {
    let correct = true;
    const { answers } = this.state;
    const iconsClasses = [];

    answers.forEach((answer) => {
      if (answer.checked) {
        if (answer.correct) iconsClasses.push(classes.correct);
        else {
          iconsClasses.push(classes.wrong);
          correct = false;
        }
      } else iconsClasses.push('');
    });

    this.setState({
      iconsClasses,
    });

    return correct;
  }

  replay() {
    let { answers } = this.state;

    answers = answers.map((answer) => {
      const newAnswer = { ...answer, checked: false };
      return newAnswer;
    });

    answers = randomArr(answers);

    this.setState({
      answers,
      iconsClasses: [],
    });
  }

  render() {
    return (
      <div className={`${classes.Game2} ${globalClasses['game-wrapper']}`}>
        <header className={globalClasses.header}>
          <span>Зачем нужна атмосфера Земли?</span>
          <span>Отметьте правильные ответы:</span>
        </header>
        <main className={classes.main}>
          {this.getAnswers()}
        </main>
      </div>
    );
  }
}

export default Game2;
