import React from 'react';
import languageUtil from '../../language';
import { tuple, IDate } from '../../utils/type';
import { eq } from '../../utils/eq';
import { formatDate } from '../../utils/util';
import classNames from 'classnames';
import './style.styl';

const yearNow = new Date().getFullYear();
const monthNow = new Date().getMonth();
const dayNow = new Date().getDate();
interface IObjectString {
  [index: string]: string;
}

const SCROLL_DIRECTION_LIST = tuple('left', 'right', 'up', 'down');

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
  calendarTitleHeight: 60, // 操作栏高度
  defaultDate: new Date(),
  weekStart: 'Sunday',
  markType: 'dot', // 日期标记类型
  disabledDate: (date: Date) => false, // 禁用的日期
  disabledScroll: '', // 禁止滑动，可选值【'left', 'right', 'up', 'down', 'horizontal', 'vertical', 'all', ''】
  lang: 'CN', // 使用的语言包
};

interface ICalendarOfMonthChild {
  [index: number]: IDate;
}

interface ICalendarOfMonth {
  [index: number]: ICalendarOfMonthChild;
}

const state = {
  language: { WEEK: [''], MONTH: [''] }, // 使用的语言包
  currentChangeIsScroll: false, // 改变当前日期的方式是否为滑动事件
  yearOfCurrentShow: yearNow, // 当前日历展示的年份
  monthOfCurrentShow: monthNow, // 当前日历展示的月份
  weekArray: WEEK_LIST, // 星期数组
  calendarWeek: ['日', '一', '二', '三', '四', '五', '六'], // 日历对应的星期
  calendarOfMonth: [[{ year: yearNow, month: monthNow, day: dayNow }]], // 月份对应的日历表
  calendarOfMonthShow: [[{ year: yearNow, month: monthNow, day: dayNow }]], // 月份对应的日历表
  calendarDaysTotalLength: 42, // 日历表展示的总天数  6行7列
  lastMonthYear: 0, // 上个月的年份
  lastMonth: 0, // 上个月的月份
  nextMonthYear: 0, // 下个月的年份
  nextMonth: 0, // 下个月的月份
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
  touchStartPositionX: 0, // 开始滑动x轴的值
  touchStartPositionY: 0, // 开始滑动时y轴的值
  isShowWeek: false, // 当前日历是否以星期方式展示
  calendarY: 0, // 日历相对于Y轴的位置
  selectedDayIndex: 0, // 当前选中的日期，在这一周的第几天
  lastWeek: [{ year: yearNow, month: monthNow, day: dayNow }], // 上一周的数据
  nextWeek: [{ year: yearNow, month: monthNow, day: dayNow }], // 下一周的数据
  isLastWeekInCurrentMonth: false, // 上一周的数据是否在本月
  isNextWeekInCurrentMonth: false, // 下一周的数据是否在本月
  markDateColorObj: {}, // 所有被标记的日期所对应的颜色
  markDateTypeObj: {}, // 所有被标记的日期所对应的标记类型
  calendarWidth: 0,
  calendarHeight: 0,
};

type Props = {
  markDate: any[];
  disabledScroll: typeof DIRECTION_LIST[number];
  lang: 'CN' | 'EN';
  weekStart: typeof WEEK_LIST[number];
  onRef?: (ref: any) => void;
  weekSlot?: (week: string) => React.ReactNode;
  heightCallback?: (height: number) => void;
  dateChangeCallback?: (date: IDate) => void;
  slideChangeCallback?: (direction: string) => void;
  touchStartCallback?: (e: React.TouchEvent) => void;
  touchMoveCallback?: (e: React.TouchEvent) => void;
  touchEndCallback?: (e: React.TouchEvent) => void;
  dateClickCallback?: (date: IDate) => void;
  daySlot?: (
    date: IDate,
    extendAttr: {
      isMarked: boolean;
      isDisabledDate: boolean;
      isToday: boolean;
      isChecked: boolean;
      isCurrentMonthDay: boolean;
      isFirstDayOfMonth: boolean;
    }
  ) => React.ReactNode;
} & Partial<typeof defaultProps>;
type State = {
  markDateColorObj: IObjectString;
  markDateTypeObj: IObjectString;
} & typeof state;

class Calendar extends React.Component<Props & typeof defaultProps, State, {}> {
  static defaultProps = defaultProps;
  public state: State = state;

  componentDidMount() {
    const { lang, weekStart, onRef } = this.props;
    const { weekArray } = this.state;

    const language = languageUtil[lang];
    const calendarWeek = language.WEEK;
    const weekStartIndex = weekArray.indexOf(weekStart);
    const start = calendarWeek.slice(weekStartIndex);
    const end = calendarWeek.slice(0, weekStartIndex);

    onRef && onRef(this);

    this.setState({
      language: language,
      weekStartIndex: weekStartIndex,
      calendarWeek: [...start, ...end],
    });
  }

  componentDidUpdate(prevProps: Props & typeof defaultProps, prevState: State) {
    const {
      markDate: prevMarkDate,
      show: prevShow,
      isShowWeekView: prevIsShowWeekView,
    } = prevProps;
    const {
      markType,
      markDate,
      show,
      isShowWeekView,
      heightCallback,
      dateChangeCallback,
    } = this.props;

    const {
      weekStartIndex: prevWeekStartIndex,
      calendarGroupHeight: prevCalendarGroupHeight,
      checkedDate: prevCheckedDate,
    } = prevState;
    const {
      checkedDate,
      weekStartIndex,
      calendarGroupHeight,
      calendarWeekTitleHeight,
    } = this.state;

    console.log(prevMarkDate, 'prevMarkDate');
    console.log(markDate, 'markDate');
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

      let _markDateColorObj: IObjectString = {};
      let _markDateTypeObj: IObjectString = {};
      markDate.forEach((item) => {
        if (Array.isArray(item.date)) {
          item.date.forEach((date: string) => {
            _markDateColorObj[date] = item.color;
            _markDateTypeObj[date] = item.type;
          });
        }
      });
      console.log(_markDateTypeObj);
      this.setState({
        markDateColorObj: _markDateColorObj,
        markDateTypeObj: _markDateTypeObj,
      });
    }

    if (!eq(prevCheckedDate, checkedDate)) {
      dateChangeCallback && dateChangeCallback(checkedDate);
    }

    if (prevWeekStartIndex !== weekStartIndex) {
      this.calculateCalendarOfThreeMonth(checkedDate.year, checkedDate.month);
    }
    console.log(prevShow, 'prevShow');
    console.log(show, 'show');
    if (prevShow !== show) {
      this.calculateCalendarOfThreeMonth(checkedDate.year, checkedDate.month);
      this.showMonth();
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
      heightCallback &&
        heightCallback(calendarGroupHeight + calendarWeekTitleHeight);
    }
  }

  today = () => {
    const { checkedDate, isShowWeek, transitionDuration } = this.state;
    this.setState(
      {
        checkedDate: { ...checkedDate, day: dayNow },
        yearOfCurrentShow: yearNow,
        monthOfCurrentShow: monthNow,
      },
      () => {
        this.calculateCalendarOfThreeMonth();
      }
    );

    if (isShowWeek) {
      setTimeout(() => {
        this.setState({ isTouching: true });
        this.showWeek();
      }, transitionDuration * 1000);
    }
  };

  showWeek = (checkedDate?: IDate) => {
    const {
      calendarOfMonth,
      checkedDate: _checkedDate,
      calendarItemHeight,
      selectedDayIndex,
    } = this.state;
    checkedDate = _checkedDate;

    let daysArr: number[] = [];
    calendarOfMonth[1].forEach((item: IDate) => {
      daysArr.push(item.day);
    });
    let dayIndexOfMonth = daysArr.indexOf(checkedDate.day);
    // 当day为月底的天数时，有可能在daysArr的前面也存在上一个月对应的日期，所以需要取lastIndexOf
    if (checkedDate.day > 15) {
      dayIndexOfMonth = daysArr.lastIndexOf(checkedDate.day);
    }

    // 计算当前日期在第几行
    let indexOfLine = Math.ceil((dayIndexOfMonth + 1) / 7);
    let lastLine = indexOfLine - 1;

    this.setState({
      calendarY: -(calendarItemHeight * lastLine),
      isShowWeek: true,
      calendarGroupHeight: calendarItemHeight,
    });

    let currentWeek = [];
    let sliceStart = lastLine * 7;
    let sliceEnd = sliceStart + 7;
    currentWeek = calendarOfMonth[1].slice(sliceStart, sliceEnd);

    let _selectedDayIndex = 0;
    let _isLastWeekInCurrentMonth = false;
    for (let i in currentWeek) {
      if (currentWeek[i].day === checkedDate.day) {
        _selectedDayIndex = parseInt(i);
      }
    }

    this.setState({ selectedDayIndex: _selectedDayIndex });

    let firstDayOfCurrentWeek = currentWeek[0];
    let lastDayOfCurrentWeek = currentWeek[6];

    let lastWeek: IDate[];
    if (
      lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day &&
      lastDayOfCurrentWeek.month === checkedDate.month
    ) {
      lastWeek = calendarOfMonth[0].slice(21, 28);
    } else {
      if (firstDayOfCurrentWeek.day === 1) {
        lastWeek = calendarOfMonth[0].slice(28, 35);
      } else {
        lastWeek = calendarOfMonth[1].slice(sliceStart - 7, sliceEnd - 7);
        if (
          lastWeek[selectedDayIndex] &&
          lastWeek[selectedDayIndex].month === checkedDate.month
        ) {
          _isLastWeekInCurrentMonth = true;
        }
      }
    }

    this.setState({
      lastWeek,
      isLastWeekInCurrentMonth: _isLastWeekInCurrentMonth,
    });

    let _isNextWeekInCurrentMonth = false;
    let nextWeek: IDate[];
    if (
      lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day &&
      lastDayOfCurrentWeek.month !== checkedDate.month
    ) {
      nextWeek = calendarOfMonth[2].slice(7, 14);
    } else {
      if (
        lastDayOfCurrentWeek.day ===
        this.daysOfMonth(lastDayOfCurrentWeek.year)[lastDayOfCurrentWeek.month]
      ) {
        nextWeek = calendarOfMonth[2].slice(0, 7);
      } else {
        nextWeek = calendarOfMonth[1].slice(sliceStart + 7, sliceEnd + 7);
        if (nextWeek[selectedDayIndex].month === checkedDate.month) {
          _isNextWeekInCurrentMonth = true;
        }
      }
    }
    this.state.calendarOfMonthShow[0].splice(sliceStart, 7, ...lastWeek);
    this.state.calendarOfMonthShow[2].splice(sliceStart, 7, ...nextWeek);

    this.setState({
      nextWeek,
      isNextWeekInCurrentMonth: _isNextWeekInCurrentMonth,
    });
  };

  showMonth = () => {
    const { checkedDate, calendarItemHeight } = this.state;

    this.setState({
      calendarY: 0,
      isShowWeek: false,
      isLastWeekInCurrentMonth: false,
      isNextWeekInCurrentMonth: false,
      calendarGroupHeight: calendarItemHeight * 6,
    });
    console.log('showMonth');
    this.calculateCalendarOfThreeMonth(checkedDate.year, checkedDate.month);
  };

  weekTitleRef = (ref: HTMLDivElement): void => {
    if (!ref) return;

    this.setState({ calendarWeekTitleHeight: ref.offsetHeight });
  };

  calendarRef = (ref: HTMLDivElement): void => {
    if (!ref) return;

    this.setState({
      calendarWidth: ref.offsetWidth,
      calendarHeight: ref.offsetHeight,
    });
  };

  calendarItemRef = (ref: HTMLDivElement): void => {
    if (!ref) return;

    const height = ref.offsetHeight;
    this.setState({
      calendarItemHeight: height,
      calendarGroupHeight: height * 6,
    });
  };

  touchStart = (event: React.TouchEvent) => {
    const { touchStartCallback } = this.props;
    touchStartCallback && touchStartCallback(event);

    console.log('touchStart');
    this.setState({
      touchStartPositionX: event.touches[0].clientX,
      touchStartPositionY: event.touches[0].clientY,
      touch: { x: 0, y: 0 },
      isTouching: true,
    });
  };

  touchMove = (event: React.TouchEvent) => {
    event.stopPropagation();
    console.log('touchMove');
    const {
      touchStartPositionX,
      touchStartPositionY,
      calendarWidth,
      calendarHeight,
    } = this.state;
    const { disabledWeekView, touchMoveCallback } = this.props;

    touchMoveCallback && touchMoveCallback(event);

    let moveX = event.touches[0].clientX - touchStartPositionX;
    let moveY = event.touches[0].clientY - touchStartPositionY;
    if (Math.abs(moveX) > Math.abs(moveY)) {
      this.setState({ touch: { x: moveX / calendarWidth, y: 0 } });
    } else {
      // 禁用周视图（禁止上下滑动）
      if (disabledWeekView) return;

      this.setState({ touch: { x: 0, y: moveY / calendarHeight } });
    }

    this.setDisabledScrollDirection();
  };

  touchEnd = (event: React.TouchEvent) => {
    // this.$emit('touchend', e);
    console.log('touchEnd');
    const {
      touch,
      isShowWeek,
      calendarHeight,
      transitionDuration,
    } = this.state;
    const { slideChangeCallback, touchEndCallback } = this.props;

    touchEndCallback && touchEndCallback(event);

    let isTouching = false;
    if (Math.abs(touch.x) > Math.abs(touch.y) && Math.abs(touch.x) > 0.2) {
      this.setState({ currentChangeIsScroll: true });
      if (touch.x > 0) {
        slideChangeCallback && slideChangeCallback('right');
        this.getLastMonth();
        if (isShowWeek) {
          setTimeout(() => {
            isTouching = true;
            this.setState({ currentChangeIsScroll: true });
            this.getLastWeek();
          }, transitionDuration * 1000);
        }
      } else if (touch.x < 0) {
        slideChangeCallback && slideChangeCallback('left');

        this.getNextMonth();
        if (isShowWeek) {
          setTimeout(() => {
            isTouching = true;
            this.setState({ currentChangeIsScroll: true });
            this.getNextWeek();
          }, transitionDuration * 1000);
        }
      }
    }

    this.setState({ isTouching });

    if (
      Math.abs(touch.y) > Math.abs(touch.x) &&
      Math.abs(touch.y * calendarHeight) > 50
    ) {
      if (touch.y > 0 && isShowWeek) {
        slideChangeCallback && slideChangeCallback('down');

        this.showMonth();
      } else if (touch.y < 0 && !isShowWeek) {
        slideChangeCallback && slideChangeCallback('up');

        this.showWeek();
      }
    } else {
      this.setState({ touch: { x: 0, y: 0 } });
    }
  };

  // 显示上一周
  getLastWeek = () => {
    const { lastWeek, selectedDayIndex, currentChangeIsScroll } = this.state;
    const { scrollChangeDate } = this.props;

    let _checkedDate = lastWeek[selectedDayIndex];
    this.showWeek(_checkedDate);

    if (this.formatDisabledDate(_checkedDate)) return;

    if (!scrollChangeDate && currentChangeIsScroll) {
      this.setState({ currentChangeIsScroll: false });
      return;
    }

    this.setState({ checkedDate: _checkedDate });
  };

  // 显示下一周
  getNextWeek = () => {
    const { nextWeek, selectedDayIndex, currentChangeIsScroll } = this.state;
    const { scrollChangeDate } = this.props;

    let _checkedDate = nextWeek[selectedDayIndex];
    this.showWeek(_checkedDate);

    if (this.formatDisabledDate(_checkedDate)) return;

    if (!scrollChangeDate && currentChangeIsScroll) {
      this.setState({ currentChangeIsScroll: false });
      return;
    }

    this.setState({ checkedDate: _checkedDate });
  };

  // 获取上个月日历
  getLastMonth = () => {
    const {
      yearOfCurrentShow,
      monthOfCurrentShow,
      lastMonthYear,
      lastMonth,
      isLastWeekInCurrentMonth,
    } = this.state;

    this.setState((preState) => ({
      translateIndex: preState.translateIndex + 1,
    }));

    let _yearOfCurrentShow = yearOfCurrentShow;
    let _monthOfCurrentShow = monthOfCurrentShow;
    if (!isLastWeekInCurrentMonth) {
      _yearOfCurrentShow = lastMonthYear;
      _monthOfCurrentShow = lastMonth;
    }

    this.setState({
      yearOfCurrentShow: _yearOfCurrentShow,
      monthOfCurrentShow: _monthOfCurrentShow,
    });

    this.calculateCalendarOfThreeMonth(_yearOfCurrentShow, _monthOfCurrentShow);
  };

  // 获取下个月日历
  getNextMonth = () => {
    const {
      yearOfCurrentShow,
      monthOfCurrentShow,
      nextMonthYear,
      nextMonth,
      isNextWeekInCurrentMonth,
    } = this.state;

    this.setState((preState) => ({
      translateIndex: preState.translateIndex - 1,
    }));

    let _yearOfCurrentShow = yearOfCurrentShow;
    let _monthOfCurrentShow = monthOfCurrentShow;
    if (!isNextWeekInCurrentMonth) {
      _yearOfCurrentShow = nextMonthYear;
      _monthOfCurrentShow = nextMonth;
    }

    this.setState({
      yearOfCurrentShow: _yearOfCurrentShow,
      monthOfCurrentShow: _monthOfCurrentShow,
    });

    this.calculateCalendarOfThreeMonth(_yearOfCurrentShow, _monthOfCurrentShow);
  };

  // 设置禁止滑动的方向
  setDisabledScrollDirection = () => {
    const { touch } = this.state;

    touch.x < 0 &&
      !this.isCanScroll('left') &&
      this.setState({ touch: { ...touch, x: 0 } });
    touch.x > 0 &&
      !this.isCanScroll('right') &&
      this.setState({ touch: { ...touch, x: 0 } });
    touch.y < 0 &&
      !this.isCanScroll('up') &&
      this.setState({ touch: { ...touch, y: 0 } });
    touch.y > 0 &&
      !this.isCanScroll('down') &&
      this.setState({ touch: { ...touch, y: 0 } });
  };

  // 是否可以滑动
  isCanScroll = (dire: typeof SCROLL_DIRECTION_LIST[number]): boolean => {
    const { disabledScroll } = this.props;
    const scrollObj = {
      up: [true, 'up', 'vertical'],
      down: [true, 'down', 'vertical'],
      left: [true, 'left', 'horizontal'],
      right: [true, 'right', 'horizontal'],
    };

    let checkedScrollArr = scrollObj[dire];
    return !checkedScrollArr.some((item) => item === disabledScroll);
  };

  formatDisabledDate = (date: IDate): boolean => {
    const { disabledDate } = this.props;

    let fDate = new Date(`${date.year}/${date.month + 1}/${date.day}`);

    return disabledDate(fDate);
  };

  isFirstDayOfMonth = (date: IDate, index: number): boolean => {
    return date.day === 1 && !this.isNotCurrentMonthDay(date, index);
  };

  isNotCurrentMonthDay = (date: IDate, index: number): boolean => {
    const { calendarOfMonth } = this.state;

    if (!calendarOfMonth[index]) return false;
    let dateOfCurrentShow: IDate = calendarOfMonth[index][15]; // 本月中间的日期一定为本月

    if (!dateOfCurrentShow) return false;
    return (
      date.year !== dateOfCurrentShow.year ||
      date.month !== dateOfCurrentShow.month
    );
  };

  markDateColor = (date: IDate, type: string): string => {
    const { markDateTypeObj, markDateColorObj } = this.state;
    // console.log(date, 'date');
    // console.log(type, 'type');
    // console.log(markDateTypeObj, 'markDateTypeObj');

    let dateString = `${date.year}/${this.fillNumber(
      date.month + 1
    )}/${this.fillNumber(date.day)}`;
    let markDateTypeString = markDateTypeObj[dateString] || '';

    if (markDateTypeString.indexOf(type) === -1) return '';

    return markDateColorObj[dateString];
  };

  // 小于10，在前面补0
  fillNumber = (val: number) => {
    return val > 9 ? val : '0' + val;
  };

  isToday = (date: IDate): boolean => {
    return (
      yearNow === date.year && monthNow === date.month && dayNow === date.day
    );
  };

  isCheckedDay = (date: IDate): boolean => {
    if (this.formatDisabledDate(date)) return false;

    const { checkedDate } = this.state;

    return (
      checkedDate.year === date.year &&
      checkedDate.month === date.month &&
      checkedDate.day === date.day
    );
  };

  clickCalendarDay = (e: React.MouseEvent, date: IDate) => {
    console.log('clickCalendarDay');
    if (!date) return;

    if (this.formatDisabledDate(date)) return;

    const { dateClickCallback } = this.props;
    this.setState(
      {
        checkedDate: { year: date.year, month: date.month, day: date.day },
      },
      () => {
        const {
          lastMonth,
          lastMonthYear,
          nextMonth,
          nextMonthYear,
          isShowWeek,
        } = this.state;

        if (date.month === lastMonth && date.year === lastMonthYear) {
          console.log(date.month, 'getLastMonth');
          this.getLastMonth();
        }
        if (date.month === nextMonth && date.year === nextMonthYear) {
          console.log(date.month, 'getNextMonth');
          this.getNextMonth();
        }

        if (isShowWeek) {
          this.showWeek();
        }
      }
    );

    dateClickCallback && dateClickCallback(date);
  };

  calculateCalendarOfThreeMonth = (
    year: number = yearNow,
    month: number = monthNow
  ) => {
    const { currentChangeIsScroll, checkedDate } = this.state;
    const { scrollChangeDate } = this.props;

    const {
      lastMonthYear,
      lastMonth,
      nextMonthYear,
      nextMonth,
    } = this.getNearYearAndMonth(year, month);

    this.setState({
      lastMonthYear,
      lastMonth,
      nextMonthYear,
      nextMonth,
    });

    let firstMonth = this.calculateCalendarOfMonth(lastMonthYear, lastMonth);
    let secondMonth = this.calculateCalendarOfMonth(year, month);
    let thirdMonth = this.calculateCalendarOfMonth(nextMonthYear, nextMonth);

    let calendarOfMonth = [];
    calendarOfMonth.push(firstMonth, secondMonth, thirdMonth);

    this.setState(
      {
        calendarOfMonth,
        calendarOfMonthShow: JSON.parse(JSON.stringify(calendarOfMonth)),
      },
      () => {
        console.log(this.state.calendarOfMonthShow, 'calendarOfMonthShow');
      }
    );

    if (!scrollChangeDate && currentChangeIsScroll) {
      this.setState({
        currentChangeIsScroll: false,
      });
      return;
    }

    // 改变日期选择的日期
    let tempDate: IDate;
    let day = checkedDate.day;
    if (day > 30 || (day > 28 && month === 1)) {
      day = this.daysOfMonth(year)[month];
    }
    tempDate = { day: day, year: year, month: month };

    if (this.formatDisabledDate(tempDate)) return;

    this.setState({
      checkedDate: { day: tempDate.day, year, month },
    });
  };

  calculateCalendarOfMonth = (
    year: number = yearNow,
    month: number = monthNow
  ) => {
    let calendarOfCurrentMonth = [];

    const { weekStartIndex, calendarDaysTotalLength } = this.state;

    const {
      lastMonthYear,
      lastMonth,
      nextMonthYear,
      nextMonth,
    } = this.getNearYearAndMonth(year, month);

    // 如果当月第一天不是指定的开始星期名称，则在前面补齐上个月的日期
    let dayOfWeek = this.getDayOfWeek(year, month);
    let lastMonthDays = this.daysOfMonth(year)[lastMonth]; // 上个月的总天数
    if (dayOfWeek < weekStartIndex) {
      dayOfWeek = 7 - weekStartIndex + dayOfWeek;
    } else {
      dayOfWeek -= weekStartIndex;
    }
    for (let i = 0; i < dayOfWeek; i++) {
      calendarOfCurrentMonth.push({
        year: lastMonthYear,
        month: lastMonth,
        day: lastMonthDays - (dayOfWeek - 1 - i),
      });
    }

    // 当月日期
    for (let i = 0; i < this.daysOfMonth(year)[month]; i++) {
      calendarOfCurrentMonth.push({ year, month, day: i + 1 });
    }

    // 在日历后面填充下个月的日期，补齐6行7列
    let fillDays = calendarDaysTotalLength - calendarOfCurrentMonth.length;
    for (let i = 0; i < fillDays; i++) {
      calendarOfCurrentMonth.push({
        year: nextMonthYear,
        month: nextMonth,
        day: i + 1,
      });
    }

    return calendarOfCurrentMonth;
  };

  // 获取月份某一天是星期几
  getDayOfWeek = (
    year: number = yearNow,
    month: number = monthNow,
    day: number = 1
  ) => {
    let dayOfMonth = new Date(year, month, day); // 获取当月的第day天
    let dayOfWeek = dayOfMonth.getDay(); // 判断第day天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一)
    return dayOfWeek;
  };

  daysOfMonth = (year: number) => {
    return [31, 28 + this.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  };

  // 判断是否为闰年
  isLeap = (year: number) => {
    return year % 4 === 0
      ? year % 100 !== 0
        ? 1
        : year % 400 === 0
        ? 1
        : 0
      : 0;
  };

  getNearYearAndMonth = (year: number, month: number) => {
    const lastMonthYear = month === 0 ? year - 1 : year; // 上个月的年份
    const lastMonth = month === 0 ? 11 : month - 1; // 上个月的月份
    const nextMonthYear = month === 11 ? year + 1 : year; // 下个月的年份
    const nextMonth = month === 11 ? 0 : month + 1; // 下个月的月份

    return { lastMonthYear, lastMonth, nextMonthYear, nextMonth };
  };

  render() {
    const {
      calendarTitleHeight,
      show,
      weekSlot,
      daySlot,
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

    const calendarItemNode = (
      item: IDate[],
      mIndex: number
    ): React.ReactNode => {
      const { language } = this.state;
      return item.map((date, index) => (
        <div
          className={classNames(
            'calendar_item',
            this.formatDisabledDate(date) &&
              (disabledClassName || 'calendar_item_disable')
          )}
          ref={this.calendarItemRef}
          key={`date-${index}`}
          onClick={(e) => this.clickCalendarDay(e, date)}
        >
          <div
            className={classNames(
              'calendar_day',
              this.isFirstDayOfMonth(date, mIndex)
                ? firstDayOfMonthClassName || 'calendar_first_today'
                : '',
              this.isToday(date) ? todayClassName || 'calendar_day_today' : '',
              this.isCheckedDay(date)
                ? checkedDayClassName || 'calendar_day_checked'
                : '',
              this.isNotCurrentMonthDay(date, mIndex)
                ? notCurrentMonthDayClassName || 'calendar_day_not'
                : '',
              this.markDateColor(date, 'circle') ? 'calendar_mark_circle' : ''
            )}
            style={{ borderColor: this.markDateColor(date, 'circle') }}
          >
            {(daySlot &&
              daySlot(date, {
                isMarked: !!(
                  this.markDateColor(date, 'circle') ||
                  this.markDateColor(date, 'dot')
                ),
                isDisabledDate: this.formatDisabledDate(date),
                isToday: this.isToday(date),
                isChecked: this.isCheckedDay(date),
                isCurrentMonthDay: !this.isNotCurrentMonthDay(date, mIndex),
                isFirstDayOfMonth: this.isFirstDayOfMonth(date, mIndex),
              })) ||
            this.isFirstDayOfMonth(date, mIndex)
              ? language.MONTH && language.MONTH[date.month]
              : date.day}
          </div>
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
            {calendarItemNode(item, index)}
          </li>
        ))}
      </ul>
    );

    const calendarBodyNode = (
      <div
        className="calendar_group"
        style={{ height: `${calendarGroupHeight}px` }}
        ref={this.calendarRef}
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
