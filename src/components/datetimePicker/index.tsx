import React from 'react';
import Canlendar from '../calendar';
import TimePicker from '../timePicker';
import classNames from 'classnames';
// import { formatDate } from '../../utils/util';
// import languageUtil from '../../language';

const defaultProps = {
  model: 'inline',
  pickerType: 'datetime', // 选择器类型 datetime：日期+时间   date：日期   time：时间
  format: '', // 确认选择之后，返回的日期格式
  visible: false, // 是否显示日历组件
  isShowAction: true, // 是否显示日历组件操作栏
  showTodayButton: true, // 是否显示返回今日按钮
  defaultDatetime: new Date(), // 默认时间
  markDate: [], // 日期下面的标记
  disabledDate: () => false, // 禁用的日期
  lang: 'CN', // 使用的语言包
};

const state = {
  language: {}, // 使用的语言包
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
  calendarTitleHeight: 0, // 日历组件标题高度
  firstTimes: true, // 第一次触发
};

type Props = Partial<typeof defaultProps>;
type State = typeof state;

class ReactHashCalendar extends React.Component<
  Props & typeof defaultProps,
  State,
  {}
> {
  static defaultProps = defaultProps;

  public state = state;

  componentDidMount() {
    const { model } = this.props;
    if (model === 'inline') {
      this.setState({
        isShowDatetimePicker: true,
      });
    }

    // this.setState({ language: languageUtil[lang.toUpperCase()] }); TODO 类型转换有问题
    this.setState({
      language: {
        CONFIRM: '确定',
        TODAY: '今天',
        WEEK: ['日', '一', '二', '三', '四', '五', '六'],
        MONTH: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        DEFAULT_DATE_FORMAT: 'YY年MM月DD日',
        DEFAULT_TIME_FORMAT: 'hh:mm',
      },
    });
  }

  componentDidUpdate(prevProps: Props) {
    console.log(prevProps, 'prevProps');
    const { pickerType, isShowAction } = prevProps;
    if (pickerType === 'time') {
      this.showTime();
    }
    if (!isShowAction) {
      this.setState({ calendarTitleHeight: 0 });
    } else {
      setTimeout(() => {
        this.setState({
          // calendarTitleHeight: this.refs.calendarTitle
          //   ? this.refs.calendarTitle.offsetHeight
          //   : 0,
          calendarTitleHeight: 0,
        });
      });
    }
  }

  // 显示时间选择控件
  public showTime() {
    this.setState({ isShowCalendar: false });
  }

  render() {
    return (
      <div
        className={classNames('hash-calendar', {
          calendar_inline: this.props.model === 'inline',
        })}
      >
        <Canlendar />
        <TimePicker />
      </div>
    );
  }
}

export default ReactHashCalendar;
