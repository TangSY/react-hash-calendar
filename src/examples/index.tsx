// import { ReactHashCalendar } from '../components';
import React from 'react';

const ReactHashCalendar = require('../components').ReactHashCalendar;
console.log(require('../components'));

const state = {
  defaultDatetime: new Date(),
  isShowCalendar: false,
  markDate: [
    '2020/11/24',
    '2020/11/22',
    {
      color: 'red',
      type: 'dot',
      date: [
        '0',
        '2020/02/25',
        '2020/03/25',
        '2020/04/01',
        '2020/05/25',
        '2020/06/25',
        '2020/07/25',
        '2020/08/25',
        '2020/09/25',
        '2020/10/25',
        '2020/11/25',
        '2020/12/25',
      ],
    },
    {
      color: 'blue',
      type: 'circle',
      date: [
        '2020/01/20',
        '2020/02/20',
        '2020/03/20',
        '2020/04/20',
        '2020/05/20',
        '2020/06/20',
        '2020/07/20',
        '2020/08/20',
        '2020/09/20',
        '2020/10/20',
        '2020/11/20',
        '2020/12/20',
      ],
    },
    {
      color: 'pink',
      date: [
        '2020/01/12',
        '2020/02/12',
        '2020/03/12',
        '2020/04/12',
        '2020/05/12',
        '2020/06/12',
        '2020/07/12',
        '2020/08/12',
        '2020/09/12',
        '2020/10/12',
        '2020/11/12',
        '2020/12/12',
      ],
    },
    {
      color: '#000000',
      date: [
        '2020/01/29',
        '2020/02/29',
        '2020/03/29',
        '2020/04/29',
        '2020/05/29',
        '2020/06/29',
        '2020/07/29',
        '2020/08/29',
        '2020/09/29',
        '2020/10/29',
        '2020/11/29',
        '2020/12/29',
      ],
    },
  ],
};

type State = typeof state;

class Examples extends React.Component<{}, State, {}> {
  public state: State = state;

  handleVisibleChange = (isShowCalendar: boolean) => {
    this.setState({ isShowCalendar });
  };

  showCalendar = () => {
    this.setState({ isShowCalendar: true });
  };

  dateClick = (date?: string | Date) => {
    console.log('Examples -> dateClick -> date', date);
  };

  dateConfirm = (date?: string | Date) => {
    console.log('Examples -> dateConfirm -> date', date);
  };

  disabledDate = (date: Date): boolean => {
    let timestamp = date.getTime();
    let oneDay = 24 * 60 * 60 * 1000;

    if (timestamp < new Date().getTime() - oneDay) {
      return true;
    }
    return false;
  };

  render() {
    const { isShowCalendar, markDate, defaultDatetime } = this.state;
    return (
      <div>
        <button onClick={this.showCalendar}>显示</button>
        <ReactHashCalendar
          pickerType="datetime"
          model="dialog"
          disabledScroll=""
          isShowWeekView={false}
          showTodayButton={true}
          disabledWeekView={false}
          disabledDate={this.disabledDate}
          isShowAction={true}
          lang="CN"
          visible={isShowCalendar}
          onVisibleChange={this.handleVisibleChange}
          dateClickCallback={this.dateClick}
          dateConfirmCallback={this.dateConfirm}
          format="YY/MM/DD hh:mm"
          markDate={markDate}
          scrollChangeDate={true}
          markType="dotcircle"
          weekStart="Sunday"
          defaultDatetime={defaultDatetime}
          minuteStep={1}
        />
      </div>
    );
  }
}

export default Examples;
