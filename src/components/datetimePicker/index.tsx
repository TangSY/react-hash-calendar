import React from 'react';
import Calendar from '../calendar';
import TimePicker from '../timePicker';
import classNames from 'classnames';
import { formatDate } from '../../utils/util';
import { IDate, ITime } from '../../utils/type';
import { WEEK_LIST, DIRECTION_LIST } from '../../utils/constant';
import languageUtil from '../../language';
import './style.styl';

const defaultProps = {
  model: 'inline',
  pickerType: 'datetime', // 选择器类型 datetime：日期+时间   date：日期   time：时间
  format: '', // 确认选择之后，返回的日期格式
  visible: false, // 是否显示日历组件
  isShowAction: true, // 是否显示日历组件操作栏
  showTodayButton: true, // 是否显示返回今日按钮
  defaultDatetime: new Date(), // 默认时间
  disabledDate: (date: Date) => false, // 禁用的日期
  lang: 'CN', // 使用的语言包

  // calendar props
  disabledWeekView: false, // 禁用周视图
  isShowWeekView: false, // 是否展示周视图
  scrollChangeDate: true, // 滑动的时候，是否触发改变日期
  firstDayOfMonthClassName: '', // 每月第一天的 className
  todayClassName: '', // 当天日期的 className
  checkedDayClassName: '', // 日期被选中时的 className
  disabledClassName: '', // 日期被禁用时的 className
  notCurrentMonthDayClassName: '', // 不是当前展示月份日期的 className(例如日历前面几天与后面几天灰色部分)
  defaultDate: new Date(),
  weekStart: 'Sunday',
  markType: 'dot', // 日期标记类型
  disabledScroll: '', // 禁止滑动，可选值【'left', 'right', 'up', 'down', 'horizontal', 'vertical', 'all', ''】

  // timePicker props
  minuteStep: 1,
};

const state = {
  language: {
    CONFIRM: '',
    TODAY: '',
    WEEK: [''],
    MONTH: [''],
    DEFAULT_DATE_FORMAT: 'YY年MM月DD日',
    DEFAULT_TIME_FORMAT: 'hh:mm',
  },
  checkedDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  }, // 被选中的日期
  isShowCalendar: false, // 是否显示日历选择控件
  isShowDatetimePicker: false, // 是否显示日历组件
  calendarBodyHeight: 0, // 日历内容的高度
  calendarContentHeight: 0, // 日历内容的高度
  calendarTitleHeight: 0, // 日历组件标题显示高度
  calendarTitleRefHeight: 0, // 日历组件标题实际高度
  firstTimes: true, // 第一次触发
};

type Props = {
  weekStart: typeof WEEK_LIST[number];
  disabledScroll: typeof DIRECTION_LIST[number];
  markDate: any[];
  model: 'inline' | 'dialog';
  lang: 'CN' | 'EN';
  actionSlot?: React.ReactNode;
  todaySlot?: React.ReactNode;
  confirmSlot?: React.ReactNode;
  onVisibleChange?: (visible: boolean) => void;
  slideChangeCallback?: (direction: string) => void;
  touchStartCallback?: (e: React.TouchEvent) => void;
  touchMoveCallback?: (e: React.TouchEvent) => void;
  touchEndCallback?: (e: React.TouchEvent) => void;
  dateClickCallback?: (date: Date | string) => void;
  dateConfirmCallback?: (date: Date | string) => void;
} & Partial<typeof defaultProps>;
type State = { calendarRef?: any } & typeof state;

class ReactHashCalendar extends React.Component<
  Props & typeof defaultProps,
  State,
  {}
> {
  static defaultProps = defaultProps;

  public state: State = state;

  componentDidMount() {
    const { model, lang, onVisibleChange } = this.props;
    if (model === 'inline') {
      this.setState({ isShowDatetimePicker: true });
      onVisibleChange && onVisibleChange(true);
    }

    this.setState({ language: languageUtil[lang] });

    setTimeout(() => {
      this.setState({ isShowCalendar: true });
    });
  }

  componentDidUpdate(prevProps: Props) {
    const { pickerType } = prevProps;
    const { isShowAction, visible } = this.props;
    const {
      isShowCalendar,
      isShowDatetimePicker,
      calendarTitleRefHeight,
      calendarBodyHeight,
      calendarTitleHeight,
      calendarContentHeight,
    } = this.state;

    if (isShowCalendar && pickerType === 'time') {
      this.showTime();
    }

    if (visible && !isShowDatetimePicker) {
      this.show();
    }

    if (
      calendarTitleHeight !== calendarTitleRefHeight ||
      calendarContentHeight !== calendarTitleRefHeight + calendarBodyHeight
    ) {
      if (!isShowAction) {
        this.setState({ calendarTitleHeight: 0 });
      } else {
        this.setState({
          calendarTitleHeight: calendarTitleRefHeight,
          calendarContentHeight: calendarTitleRefHeight + calendarBodyHeight,
        });
      }
    }
  }

  // 显示时间选择控件
  showTime = () => {
    this.setState({ isShowCalendar: false });
  };

  showCalendar = () => {
    this.setState({ isShowCalendar: true });
  };

  show = () => {
    const { onVisibleChange } = this.props;
    this.setState({ isShowDatetimePicker: true });
    onVisibleChange && onVisibleChange(true);
  };

  close = () => {
    const { onVisibleChange } = this.props;
    this.setState({ isShowDatetimePicker: false });
    onVisibleChange && onVisibleChange(false);
  };

  formatDate(time: string, format: string) {
    const { lang } = this.props;
    return formatDate(time, format, lang);
  }

  today = () => {
    const { disabledDate } = this.props;
    if (disabledDate(new Date())) return;

    const { calendarRef } = this.state;
    calendarRef && calendarRef.today();
  };

  confirm = () => {
    const { format, model, lang, dateConfirmCallback } = this.props;
    const { checkedDate } = this.state;
    let date: Date | string = new Date(
      `${checkedDate.year}/${checkedDate.month + 1}/${checkedDate.day} ${
        checkedDate.hours
      }:${checkedDate.minutes}`
    );
    if (format) {
      date = formatDate(date, format, lang);
    }
    dateConfirmCallback && dateConfirmCallback(date);

    if (model === 'dialog') {
      this.close();
    }
  };

  dateChange = (date: IDate) => {
    const { checkedDate } = this.state;
    this.setState({
      checkedDate: {
        ...checkedDate,
        ...date,
      },
    });
  };

  timeChange = (time: ITime) => {
    const { checkedDate } = this.state;
    this.setState({
      checkedDate: {
        ...checkedDate,
        ...time,
      },
    });
  };

  heightChange = (height: number) => {
    console.log('heightChange -> height', height);
    const { firstTimes, calendarTitleHeight } = this.state;
    const { model } = this.props;

    if (!firstTimes && model === 'dialog') return;

    this.setState({
      calendarBodyHeight: height,
      calendarContentHeight: height + calendarTitleHeight,
      firstTimes: false,
    });
  };

  // 小于10，在前面补0
  fillNumber = (val: number) => (val > 9 ? val : '0' + val);

  calendarTitleRef = (ref: HTMLDivElement): void => {
    if (!ref) return;
    const height = ref.offsetHeight;

    this.setState({
      calendarTitleRefHeight: height,
    });
  };

  stopEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  onCalendarRef = (ref: any) => {
    this.setState({
      calendarRef: ref,
    });
  };

  // 监听手指开始滑动事件
  touchStart = (event: React.TouchEvent) => {
    const { touchStartCallback } = this.props;
    touchStartCallback && touchStartCallback(event);
  };

  // 监听手指开始滑动事件
  touchMove = (event: React.TouchEvent) => {
    const { touchMoveCallback } = this.props;
    touchMoveCallback && touchMoveCallback(event);
  };

  // 监听手指开始滑动事件
  touchEnd = (event: React.TouchEvent) => {
    const { touchEndCallback } = this.props;
    touchEndCallback && touchEndCallback(event);
  };

  // 滑动方向改变
  slideChange = (direction: string) => {
    const { slideChangeCallback } = this.props;
    slideChangeCallback && slideChangeCallback(direction);
  };

  dateClick = (date: IDate) => {
    const { checkedDate } = this.state;
    const { dateClickCallback, format, lang } = this.props;
    let _checkedDate = {
      ...checkedDate,
      ...date,
    };

    let fDate: Date | string = new Date(
      `${_checkedDate.year}/${_checkedDate.month + 1}/${_checkedDate.day} ${
        _checkedDate.hours
      }:${_checkedDate.minutes}`
    );
    if (format) {
      fDate = formatDate(fDate, format, lang);
    }

    this.setState({
      checkedDate: _checkedDate,
    });

    dateClickCallback && dateClickCallback(fDate);
  };

  render() {
    const {
      model,
      isShowAction,
      disabledDate,
      showTodayButton,
      pickerType,
      todaySlot,
      actionSlot,
      confirmSlot,
      defaultDatetime,
    } = this.props;

    const {
      calendarTitleHeight,
      calendarContentHeight,
      isShowDatetimePicker,
      isShowCalendar,
      checkedDate,
      language,
    } = this.state;

    const dateNode: React.ReactNode = (
      <span
        className={classNames('calendar_title_date_year', {
          calendar_title_date_active: isShowCalendar,
        })}
        onClick={this.showCalendar}
      >
        {this.formatDate(
          `${checkedDate.year}/${checkedDate.month + 1}/${checkedDate.day}`,
          language.DEFAULT_DATE_FORMAT
        )}
      </span>
    );

    const timeNode: React.ReactNode = (
      <span
        className={classNames('calendar_title_date_time', {
          calendar_title_date_active: !isShowCalendar,
        })}
        onClick={this.showTime}
      >
        {this.formatDate(
          `${checkedDate.year}/${checkedDate.month + 1}/${
            checkedDate.day
          } ${this.fillNumber(checkedDate.hours)}:${this.fillNumber(
            checkedDate.minutes
          )}`,
          language.DEFAULT_TIME_FORMAT
        )}
      </span>
    );

    const actionNode: React.ReactNode = actionSlot || (
      <div className="calendar_title" ref={this.calendarTitleRef}>
        <div className="calendar_title_date">
          {pickerType !== 'time' ? dateNode : ''}
          {pickerType !== 'date' ? timeNode : ''}
        </div>
        {showTodayButton ? (
          <div
            className={classNames('calendar_confirm', {
              today_disable: disabledDate(new Date()),
            })}
            onClick={this.today}
          >
            {todaySlot || language.TODAY}
          </div>
        ) : null}
        {model === 'dialog' ? (
          <div className="calendar_confirm" onClick={this.confirm}>
            {confirmSlot || language.CONFIRM}
          </div>
        ) : null}
      </div>
    );

    return isShowDatetimePicker ? (
      <div
        className={classNames('hash-calendar', {
          calendar_inline: model === 'inline',
        })}
        style={{
          height: `${model === 'inline' ? calendarContentHeight : undefined}px`,
        }}
        onClick={this.close}
      >
        <div
          className="calendar_content"
          style={{ height: `${calendarContentHeight}px` }}
          onClick={this.stopEvent}
        >
          {isShowAction ? actionNode : null}
          <Calendar
            onRef={this.onCalendarRef}
            {...this.props}
            calendarTitleHeight={calendarTitleHeight}
            show={isShowCalendar}
            slideChangeCallback={this.slideChange}
            dateChangeCallback={this.dateChange}
            heightCallback={this.heightChange}
            touchStartCallback={this.touchStart}
            touchMoveCallback={this.touchMove}
            touchEndCallback={this.touchEnd}
            dateClickCallback={this.dateClick}
          />
          {pickerType !== 'date' ? (
            <TimePicker
              show={!isShowCalendar}
              {...this.props}
              defaultTime={defaultDatetime}
              timeChangeCallback={this.timeChange}
            />
          ) : null}
        </div>
      </div>
    ) : null;
  }
}

export default ReactHashCalendar;
