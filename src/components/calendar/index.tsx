import React from 'react';
import languageUtil from '../../language';
import { tuple } from '../../utils/type';
import { eq } from '../../utils/eq';
import { formatDate } from '../../utils/util';
import classNames from 'classnames';
import './style.styl';

const yearNow = new Date().getFullYear();
const monthNow = new Date().getMonth();
const dayNow = new Date().getDate();

const WEEK_LIST = tuple(
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
);

const DIRECTION_LIST = tuple(
  '',
  'all',
  'left',
  'right',
  'up',
  'down',
  'horizontal',
  'vertical'
);

const defaultProps = {
  show: false,
  disabledWeekView: false, // 禁用周视图
  isShowWeekView: false, // 是否展示周视图
  scrollChangeDate: true, // 滑动的时候，是否触发改变日期
  firstDayOfMonthClassName: '', // 每月第一天的 className
  todayClassName: '', // 当天日期的 className
  checkedDayClassName: '', // 日期被选中时的 className
  disabledClassName: '', // 日期被禁用时的 className
  notCurrentMonthDayClassName: '', // 不是当前展示月份日期的 className(例如日历前面几天与后面几天灰色部分)
  calendarTitleHeight: 0, // 操作栏高度
  defaultDate: new Date(),
  weekStart: 'Sunday',
  markType: 'dot', // 日期标记类型
  // markDate: [], // 日期下面的标记
  disabledDate: (date: Date) => false, // 禁用的日期
  disabledScroll: '', // 禁止滑动，可选值【'left', 'right', 'up', 'down', 'horizontal', 'vertical', 'all', ''】
  lang: 'CN', // 使用的语言包
};

const state = {
  language: { WEEK: [''] }, // 使用的语言包
  currentChangeIsScroll: false, // 改变当前日期的方式是否为滑动事件
  yearOfCurrentShow: new Date().getFullYear(), // 当前日历展示的年份
  monthOfCurrentShow: new Date().getMonth(), // 当前日历展示的月份
  yearOfToday: new Date().getFullYear(), // 今天所在的年份
  monthOfToday: new Date().getMonth(), // 今天所在的月份
  dayOfToday: new Date().getDate(), // 今天所在的日期
  weekArray: WEEK_LIST, // 星期数组
  calendarWeek: ['日', '一', '二', '三', '四', '五', '六'], // 日历对应的星期
  calendarOfMonth: [], // 月份对应的日历表
  calendarOfMonthShow: [], // 月份对应的日历表
  calendarDaysTotalLength: 42, // 日历表展示的总天数  6行7列
  lastMonthYear: null, // 上个月的年份
  lastMonth: null, // 上个月的月份
  nextMonthYear: null, // 下个月的年份
  nextMonth: null, // 下个月的月份
  checkedDate: { year: yearNow, month: monthNow, day: dayNow }, // 被选中的日期
  weekStartIndex: 0, // 日历第一天星期名称的index
  translateIndex: 0, // 用于计算上下偏移的距离
  transitionDuration: 0.3, // 动画持续时间
  touch: {
    x: 0,
    y: 0,
  }, // 本次touch事件，横向，纵向滑动的距离
  isTouching: false, // 是否正在滑动
  calendarGroupHeight: 0,
  calendarWeekTitleHeight: 0,
  calendarItemHeight: 0,
  touchStartPositionX: null, // 开始滑动x轴的值
  touchStartPositionY: null, // 开始滑动时y轴的值
  isShowWeek: false, // 当前日历是否以星期方式展示
  calendarY: 0, // 日历相对于Y轴的位置
  selectedDayIndex: 0, // 当前选中的日期，在这一周的第几天
  lastWeek: [], // 上一周的数据
  nextWeek: [], // 下一周的数据
  isLastWeekInCurrentMonth: false, // 上一周的数据是否在本月
  isNextWeekInCurrentMonth: false, // 下一周的数据是否在本月
  markDateColorObj: {}, // 所有被标记的日期所对应的颜色
  markDateTypeObj: {}, // 所有被标记的日期所对应的标记类型
};

type Props = {
  markDate: any[];
  disabledScroll: typeof DIRECTION_LIST[number];
  lang: 'CN' | 'EN';
  weekStart: typeof WEEK_LIST[number];
  weekSlot?: (week: string) => React.ReactNode;
} & Partial<typeof defaultProps>;
type State = typeof state;

class Calendar extends React.Component<Props & typeof defaultProps, State, {}> {
  static defaultProps = defaultProps;
  public state = state;

  componentDidMount() {
    const { lang, weekStart } = this.props;
    const { weekArray } = this.state;

    this.setState(
      {
        language: languageUtil[lang],
        calendarWeek: this.state.language.WEEK,
        weekStartIndex: weekArray.indexOf(weekStart),
      },
      () => {
        const start = this.state.calendarWeek.slice(this.state.weekStartIndex);
        const end = this.state.calendarWeek.slice(0, this.state.weekStartIndex);
        this.setState({ calendarWeek: [...start, ...end] });
      }
    );
  }

  componentDidUpdate(prevProps: Props & typeof defaultProps, prevState: State) {
    const {
      markDate: prevMarkDate,
      show: prevShow,
      isShowWeekView: prevIsShowWeekView,
    } = prevProps;
    const { markType, markDate, show, isShowWeekView } = this.props;

    const {
      weekStartIndex: prevWeekStartIndex,
      calendarGroupHeight: prevCalendarGroupHeight,
      checkedDate: prevCheckedDate,
    } = prevState;
    const { checkedDate, weekStartIndex, calendarGroupHeight } = this.state;

    if (!eq(prevMarkDate, markDate)) {
      markDate.forEach((item, index) => {
        if (!item.color) {
          let obj: { color?: string; date?: any[] } = { color: '', date: [] };
          obj.color = '#1c71fb';
          if (typeof item === 'string' || typeof item === 'number') {
            item = [item];
          }
          obj.date = item || [];
          markDate[index] = obj;
        }
        markDate[index].type = item.type || markType || '';

        markDate[index].date = formatDate(markDate[index].date);
      });
    }

    if (!eq(prevCheckedDate, checkedDate)) {
      // this.$emit('change', checkedDate)
    }

    if (prevWeekStartIndex !== weekStartIndex) {
      this.calculateCalendarOfThreeMonth(checkedDate.year, checkedDate.month);
    }

    if (prevShow !== show) {
      this.calculateCalendarOfThreeMonth(checkedDate.year, checkedDate.month);
      this.initDom();
    }

    if (prevIsShowWeekView !== isShowWeekView) {
      if (isShowWeekView) {
        setTimeout(() => {
          this.showWeek();
        });
      } else {
        setTimeout(() => {
          this.showMonth();
        });
      }
    }

    if (prevCalendarGroupHeight !== calendarGroupHeight) {
      // this.$emit('height', val + this.calendarWeekTitleHeight)
    }
  }

  initDom = () => {};

  showWeek = () => {};

  showMonth = () => {};

  weekTitleRef = (ref: HTMLDivElement): void => {};

  touchStart = (event: React.TouchEvent) => {};

  touchMove = (event: React.TouchEvent) => {};

  touchEnd = (event: React.TouchEvent) => {};

  formatDisabledDate = (date: any): boolean => {
    return false;
  };

  isFirstDayOfMonth = (date: any, index: number): boolean => {
    return false;
  };

  isNotCurrentMonthDay = (date: any, index: number): boolean => {
    return false;
  };

  markDateColor = (date: any, type: string): string => {
    return 'false';
  };

  isToday = (date: any): boolean => {
    return false;
  };

  isCheckedDay = (date: any): boolean => {
    return false;
  };

  // TODO 优化 date 类型
  clickCalendarDay = (e: React.MouseEvent, date: any) => {};

  calculateCalendarOfThreeMonth = (
    year: number = yearNow,
    month: number = monthNow
  ) => {
    console.log(year, month);
  };

  render() {
    const {
      calendarTitleHeight,
      show,
      weekSlot,
      disabledClassName,
      firstDayOfMonthClassName,
      todayClassName,
      checkedDayClassName,
      notCurrentMonthDayClassName,
    } = this.props;
    const {
      calendarWeek,
      calendarGroupHeight,
      calendarOfMonthShow,
      translateIndex,
      isTouching,
      touch,
      calendarY,
      transitionDuration,
    } = this.state;

    const weekNode: React.ReactNode = (
      <div className="calendar_week" ref={this.weekTitleRef}>
        {calendarWeek.map((item) => (
          <div className="calendar_item" key={`week-${item}`}>
            <p className="calendar_day">
              {(weekSlot && weekSlot(item)) || item}
            </p>
          </div>
        ))}
      </div>
    );

    const calendarItemNode = (item: { date: any }[]): React.ReactNode => {
      return item.map((date, index) => (
        <div
          className={classNames(
            'calendar_item',
            this.formatDisabledDate(date) &&
              (disabledClassName || 'calendar_item_disable')
          )}
          ref="calendarItem"
          key={`date-${index}`}
          onClick={(e) => this.clickCalendarDay(e, date)}
        >
          <div
            className={classNames(
              'calendar_day',
              this.isFirstDayOfMonth(date, index)
                ? firstDayOfMonthClassName || 'calendar_first_today'
                : '',
              this.isToday(date) ? todayClassName || 'calendar_day_today' : '',
              this.isCheckedDay(date)
                ? checkedDayClassName || 'calendar_day_checked'
                : '',
              this.isNotCurrentMonthDay(date, index)
                ? notCurrentMonthDayClassName || 'calendar_day_not'
                : '',
              this.markDateColor(date, 'circle') ? 'calendar_mark_circle' : ''
            )}
            style={{ borderColor: this.markDateColor(date, 'circle') }}
          ></div>
          <div
            style={{ background: this.markDateColor(date, 'dot') }}
            className="calendar_dot"
          ></div>
        </div>
      ));
    };

    const calendarGroupNode = (
      <ul style={{ transform: `translate3d(${-translateIndex * 100}%, 0, 0)` }}>
        {calendarOfMonthShow.map((item, index) => (
          <li
            className="calendar_group_li"
            key={`group-${index}`}
            style={{
              transform: `translate3d(${
                (index - 1 + translateIndex + (isTouching ? touch.x : 0)) * 100
              }%, ${calendarY}px, 0)`,
              transitionDuration: `${isTouching ? 0 : transitionDuration}s`,
            }}
          >
            {calendarItemNode(item)}
          </li>
        ))}
      </ul>
    );

    const calendarBodyNode = (
      <div
        className="calendar_group"
        style={{ height: `${calendarGroupHeight}px` }}
        ref="calendar"
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
      >
        {calendarGroupNode}
      </div>
    );

    return show ? (
      <div
        className="calendar_body"
        style={{ marginTop: calendarTitleHeight + 'px' }}
      >
        {weekNode}
        {calendarBodyNode}
      </div>
    ) : null;
  }
}

export default Calendar;
