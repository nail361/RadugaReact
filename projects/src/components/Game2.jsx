import React, { PureComponent } from 'react';

import '../styles/Games.scss';
import { randomArr } from '../utils/help';

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
    id: 4, checked: false, correct: false, title: 'Придумат ещё что-то!!',
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
    this.getResultClass = this.getResultClass.bind(this);
  }

  onCheckboxChange(event, id) {
    const { checked } = event.currentTarget;
    let { answers } = this.state;
    answers = answers.map((answer) => {
      if (answer.id === id) {
        answer.checked = checked;
      }
      return answer;
    });

    this.setState({
      answers,
    });
  }

  getAnswers() {
    const { answers } = this.state;

    const answersCheckboxes = answers.map((answer, index) => (
      <div className={`checkbox-group ${this.getResultClass(index)}`} key={answer.id}>
        <input
          onChange={(e) => this.onCheckboxChange(e, answer.id)}
          id={`checkbox-${answer.id}`}
          type="checkbox"
          name={`checkbox-name-${index}`}
          style={{ display: 'none' }}
          checked={answer.checked}
        />
        <label htmlFor={`checkbox-${answer.id}`} checked={answer.checked}>
          <span className="input-background">
            <span />
          </span>
        </label>
        <span className="text-middle">
          <span>{answer.title}</span>
        </span>
      </div>
    ));

    return answersCheckboxes;
  }

  getResultClass(index) {
    const { iconsClasses } = this.state;

    if (index < iconsClasses.length) return iconsClasses[index];
    return '';
  }

  checkAnswer() {
    let correct = true;
    const { answers } = this.state;
    const classes = [];

    answers.forEach((answer) => {
      if (answer.checked === answer.correct) {
        classes.push('correct');
      } else {
        correct = false;
        classes.push('wrong');
      }
    });

    this.setState({
      iconsClasses: classes,
    });

    return correct;
  }

  replay() {
    let { answers } = this.state;

    answers.forEach((answer) => {
      answer.checked = false;
    });

    answers = randomArr(answers);

    this.setState({
      answers,
      iconsClasses: [],
    });
  }

  render() {
    return (
      <div className="game2-wrapper">
        <header className="header">
          <span>Зачем нужна атмосфера Земли?</span>
          <span>Отметьте правильные ответы:</span>
        </header>
        <main className="main">
          {this.getAnswers()}
        </main>
      </div>
    );
  }
}

export default Game2;
