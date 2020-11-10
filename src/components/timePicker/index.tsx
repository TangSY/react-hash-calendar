import React from 'react';
import './style.styl';
import classNames from 'classnames';
import { checkPlatform } from '../../utils/util';
import { ITime } from '../../utils/type';

const defaultProps = {
  show: false,
  defaultTime: new Date(),
  minuteStep: 1,
};

type Props = { timeChangeCallback?: (date: ITime) => void } & Partial<
  typeof defaultProps
>;

const state = {
  hashID: [''],
  hashClass: '',
  timeRange: [''],
  timeOptions: {
    minHours: 24,
    minMinutes: 59,
    maxHours: 0,
    maxMinutes: 0,
  },
  checkedDate: {
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  },
  timeHeight: 0,
  timeStartY: 0,
  timeStartUp: 0,
};

type State = {
  timeArray?: number[][];
} & typeof state;

class TimePicker extends React.Component<
  Props & typeof defaultProps,
  State,
  {}
> {
  static defaultProps = defaultProps;
  public state: State = state;

  componentDidMount() {
    const { defaultTime, timeChangeCallback } = this.props;
    const { checkedDate } = this.state;

    this.setState({
      hashID: [
        `time${Math.floor(Math.random() * 1000000)}`,
        `time${Math.floor(Math.random() * 1000000)}`,
      ],
      hashClass: `time_item_${Math.floor(Math.random() * 1000000)}`,
    });

    if (defaultTime) {
      let _checkedDate: ITime = {
        ...checkedDate,
        hours: defaultTime.getHours(),
        minutes: defaultTime.getMinutes(),
      };
      this.setState({ checkedDate: _checkedDate });

      timeChangeCallback && timeChangeCallback(_checkedDate);
    }
  }

  componentDidUpdate(prevProps: Props & typeof defaultProps, prevState: State) {
    const { show: showPrev } = prevProps;
    const { show } = this.props;

    if (show !== showPrev && show) {
      setTimeout(() => {
        this.initTimeArray();
      });
    }
  }

  initTimeArray = () => {
    const { minuteStep } = this.props;
    const { checkedDate, hashClass, hashID } = this.state;

    let hours = [];
    let timeArray = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    let minutes = [];
    for (let i = 0; i < 60; i++) {
      if (i % minuteStep === 0) {
        minutes.push(i);
      }
    }
    timeArray.push(hours, minutes);

    this.setState({ timeArray });

    let checkHours = checkedDate.hours;
    let checkMinutes = checkedDate.minutes;

    let timeEle = document.querySelector(`.${hashClass}`);
    if (!timeEle) return;

    let _timeHeight: string = getComputedStyle(timeEle).height || '';
    let timeHeight = parseFloat(_timeHeight.split('px')[0]);

    this.setState({ timeHeight });

    let hoursUp = (2 - checkHours) * timeHeight;
    let hourEle = document.querySelector(`#${hashID[0]}`) as HTMLElement;
    let minuteEle = document.querySelector(`#${hashID[1]}`) as HTMLElement;

    if (!hourEle || !minuteEle) return;

    let minutesUp = (2 - checkMinutes / minuteStep) * timeHeight;
    hourEle.style.webkitTransform = 'translate3d(0px,' + hoursUp + 'px,0px)';
    minuteEle.style.webkitTransform =
      'translate3d(0px,' + minutesUp + 'px,0px)';
  };

  timeTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    let timeStartY = e.changedTouches[0].pageY;
    this.setState({ timeStartY });

    let eventEl = e.currentTarget as HTMLElement;
    let transform = eventEl.style.webkitTransform;
    if (transform) {
      let timeStartUp = parseFloat(transform.split(' ')[1].split('px')[0]);
      this.setState({ timeStartUp });
    }
  };

  timeTouchMove = (e: React.TouchEvent, index: number) => {
    const { timeStartY, timeStartUp } = this.state;

    let moveEndY = e.changedTouches[0].pageY;
    let Y = moveEndY - timeStartY;

    let eventEl = e.currentTarget as HTMLElement;
    eventEl.style.webkitTransform =
      'translate3d(0px,' + (Y + timeStartUp) + 'px,0px)';

    if (checkPlatform() === '2') {
      this.timeTouchEnd(e, index);
      return false;
    }
  };

  timeTouchEnd = (e: React.TouchEvent, index: number) => {
    const { minuteStep, timeChangeCallback } = this.props;
    const { checkedDate, timeStartUp, timeHeight, timeArray } = this.state;

    let eventEl = e.currentTarget as HTMLElement;
    let transform = eventEl.style.webkitTransform;
    let endUp = timeStartUp;
    if (transform) {
      endUp = parseFloat(
        eventEl.style.webkitTransform.split(' ')[1].split('px')[0]
      );
    }

    let distance = Math.abs(endUp - timeStartUp);
    let upCount = Math.floor(distance / timeHeight) || 1;
    let halfWinWith = timeHeight / 2;
    let up = timeStartUp;

    if (endUp <= timeStartUp) {
      // 向上滑动 未过临界值
      if (distance <= halfWinWith) {
        up = timeStartUp;
      } else {
        up = timeStartUp - timeHeight * upCount;

        if (timeArray && up < -(timeArray[index].length - 3) * timeHeight) {
          up = -(timeArray[index].length - 3) * timeHeight;
        }
      }
    } else {
      // 向下滑动 未过临界值
      if (distance <= halfWinWith) {
        up = timeStartUp;
      } else {
        up = timeStartUp + timeHeight * upCount;
        if (up > timeHeight * 2) {
          up = timeHeight * 2;
        }
      }
    }

    let _checkedDate: ITime;
    if (index === 0) {
      let hours = 2 - Math.round(up / timeHeight);
      _checkedDate = { ...checkedDate, hours };
    } else {
      let minute = 2 - Math.round(up / timeHeight);
      _checkedDate = { ...checkedDate, minutes: minute * minuteStep };
    }
    this.setState({ checkedDate: _checkedDate });
    timeChangeCallback && timeChangeCallback(_checkedDate);

    eventEl.style.webkitTransition = 'transform 300ms';
    eventEl.style.webkitTransform = 'translate3d(0px,' + up + 'px,0px)';
  };

  isBeSelectedTime = (time: number, index: number) => {
    // 是否为当前选中的时间
    const { checkedDate } = this.state;

    return (
      (index === 0 && time === checkedDate.hours) ||
      (index === 1 && time === checkedDate.minutes)
    );
  };

  // 小于10，在前面补0
  fillNumber = (val: number) => {
    return val > 9 ? val : '0' + val;
  };

  render() {
    const { show } = this.props;
    const { timeArray, hashID, hashClass } = this.state;

    const timeItemNode = (
      timeArr: number[],
      parentIndex: number
    ): React.ReactNode => {
      return timeArr.map((time: number, index: number) => (
        <div
          className={classNames(
            'time_item',
            { time_item_show: this.isBeSelectedTime(time, parentIndex) },
            hashClass
          )}
          key={index}
        >
          {this.fillNumber(time)}
        </div>
      ));
    };

    const timeContentNode = (timeArray?: number[][]): React.ReactNode => {
      return (
        timeArray &&
        timeArray.map((item: number[], index: number) => (
          <div
            className="time_content"
            id={hashID[index]}
            key={index}
            onTouchStart={this.timeTouchStart}
            onTouchMove={(event) => {
              this.timeTouchMove(event, index);
            }}
            onTouchEnd={(event) => {
              this.timeTouchEnd(event, index);
            }}
          >
            {timeItemNode(item, index)}
          </div>
        ))
      );
    };

    return show ? (
      <div className="time_body">
        <div className="time_group">{timeContentNode(timeArray)}</div>
      </div>
    ) : null;
  }
}

export default TimePicker;
