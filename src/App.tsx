import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);
  return `Clock-${value}`;
}

type State = {
  clockName: string;
  currentTime: string;
  hasClock: boolean;
};

export class App extends React.Component<{}, State> {
  intervalId: number | null = null;
  timerId: number | null = null;

  state: State = {
    clockName: 'Clock-0',
    currentTime: new Date().toUTCString().slice(-12, -4),
    hasClock: true,
  };

  componentDidMount() {
    this.startTimer();
    this.startClock();
    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);
  }

  componentWillUnmount() {
    this.stopTimer();
    this.stopClock();
    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      const oldName = this.state.clockName;
      const newName = getRandomName();
      this.setState({ clockName: newName });
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${oldName} to ${newName}`);
    }, 3300);
  }

  stopTimer() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startClock() {
    this.timerId = window.setInterval(() => {
      const currentTime = new Date().toUTCString().slice(-12, -4);
      this.setState({ currentTime });
      // eslint-disable-next-line no-console
      console.log(currentTime);
    }, 1000);
  }

  stopClock() {
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleLeftClick = () => {
    this.setState({ hasClock: true });
  };

  render() {
    const { clockName, currentTime, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>
        {hasClock && <Clock name={clockName} time={currentTime} />}
      </div>
    );
  }
}
