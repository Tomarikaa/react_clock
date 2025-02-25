import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clockName: string;
  currentTime: string;
  showClock: boolean;
};

export class App extends React.Component<{}, State> {
  intervalId: number | null = null;

  timerId: number | null = null;

  state: State = {
    clockName: 'Clock-0',
    currentTime: new Date().toUTCString().slice(-12, -4),
    showClock: true,
  };

  componentDidMount() {
    this.startTimer();
    this.startClock();
  }

  componentWillUnmount() {
    this.stopTimer();
    this.stopClock();
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

  handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({ showClock: false });
  };

  handleLeftClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({ showClock: true });
  };

  render() {
    const { clockName, currentTime, showClock } = this.state;

    return (
      <div
        className="App"
        onContextMenu={this.handleRightClick}
        onClick={this.handleLeftClick}
      >
        <h1>React clock</h1>
        {showClock && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong> time is{' '}
            <span className="Clock__time">{currentTime}</span>
          </div>
        )}
      </div>
    );
  }
}
