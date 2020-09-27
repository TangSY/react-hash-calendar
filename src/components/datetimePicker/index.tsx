import React from 'react';
import Calendar from '../calendar';
import TimePicker from '../timePicker';
import classNames from 'classnames';
import { formatDate } from '../../utils/util';
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
  markDate: [], // 日期下面的标记
  disabledDate: (date: Date) => false, // 禁用的日期
  lang: 'CN', // 使用的语言包
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
  calendarBodyHeight: 400, // 日历内容的高度
  calendarContentHeight: 3000, // 日历内容的高度
  calendarTitleHeight: 100, // 日历组件标题显示高度
  calendarTitleRefHeight: 100, // 日历组件标题实际高度
  firstTimes: true, // 第一次触发
};

type Props = {
  lang: 'CN' | 'EN';
  actionSlot?: React.ReactNode;
  todaySlot?: React.ReactNode;
  confirmSlot?: React.ReactNode;
} & Partial<typeof defaultProps>;
type State = typeof state;

class ReactHashCalendar extends React.Component<
  Props & typeof defaultProps,
  State,
  {}
> {
  static defaultProps = defaultProps;

  public state = state;

  componentDidMount() {
    const { model, lang } = this.props;
    if (model === 'inline') {
      this.setState({
        isShowDatetimePicker: true,
      });
    }

    this.setState({ language: languageUtil[lang] });
  }

  componentDidUpdate(prevProps: Props) {
    const { pickerType, isShowAction } = prevProps;
    if (pickerType !== this.props.pickerType && pickerType === 'time') {
      this.showTime();
    }
    if (isShowAction !== this.props.isShowAction) {
      if (!isShowAction) {
        this.setState({ calendarTitleHeight: 0 });
      } else {
        setTimeout(() => {
          this.setState({
            calendarTitleHeight: this.state.calendarTitleRefHeight,
          });
        });
      }
    }
  }

  // 显示时间选择控件
  public showTime() {
    this.setState({ isShowCalendar: false });
  }

  close = () => {};

  showCalendar = () => {};

  today = () => {};

  confirm = () => {};

  // 小于10，在前面补0
  fillNumber = (val: number) => (val > 9 ? val : '0' + val);

  calendarTitleRef = (ref: HTMLDivElement): void => {
    const height = ref.offsetHeight;
    this.setState({
      calendarTitleRefHeight: height,
    });
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
    } = this.props;

    const {
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
        {formatDate(
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
        {formatDate(
          `${checkedDate.year}/${checkedDate.month + 1}/${
            checkedDate.day
          } ${this.fillNumber(checkedDate.hours)}:${this.fillNumber(
            checkedDate.minutes
          )}`,
          language.DEFAULT_TIME_FORMAT
        )}
      </span>
    );

    const actionNode: React.ReactNode = (
      <div>
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
        >
          {isShowAction ? (
            <div className="calendar_title" ref={this.calendarTitleRef}>
              {actionSlot || actionNode}
            </div>
          ) : null}
          <Calendar {...this.props} show={isShowCalendar} />
          <TimePicker />
        </div>
      </div>
    ) : null;
  }
}

export default ReactHashCalendar;
