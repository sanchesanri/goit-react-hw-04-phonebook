import { Component } from 'react';
import { FeedBack } from './Feedback/Feedback';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  changeStateValue = key => {
    this.setState(prevState => ({
      ...prevState,
      [key]: prevState[key] + 1,
    }));
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, item) => (acc += item), 0);
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;

    return this.countTotalFeedback() !== 0
      ? Math.ceil((Number(good) * 100) / Number(this.countTotalFeedback()))
      : 0;
  };

  render() {
    this.countPositiveFeedbackPercentage();
    this.countTotalFeedback();
    const { good, neutral, bad } = this.state;
    return (
      <div>
        <FeedBack options={this.state} changeState={this.changeStateValue} />
        <h2>Statistic</h2>

        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {this.countTotalFeedback()}</p>
        <p>Positive feedback: {this.countPositiveFeedbackPercentage()}%</p>
      </div>
    );
  }
}
