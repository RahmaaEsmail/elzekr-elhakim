import React, { Component } from 'react';
// import './next-jamah-time.css';
import moment from 'moment/moment';
import PrayerData from './PrayerData';

class NextJammahTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextJammahTime: this.getNextJammahTime()
    };
  }

  getTodaysPrayerTime() {
    var date = moment().format('DD/MM/YYYY');
    var _data = new PrayerData();
    return _data.getPrayerTimes(date);
  }

  getTomorrowsPrayerTime() {
    var date = moment()
      .add(1, 'days')
      .format('DD/MM/YYYY');
    var _data = new PrayerData();
    return _data.getPrayerTimes(date);
  }

  getCurrentTime() {
    return moment().format('HH:mm');
  }

  stringToTime(stringTime) {
    return moment(stringTime, 'HH:mm a').format('HH:mm');
  }

  getNextJammahTime() {
    var currentDate = this.getTodaysPrayerTime();
    var tomorrowsPrayerTime = this.getTomorrowsPrayerTime();
    var currentTime = this.getCurrentTime();
    if (this.stringToTime(`${currentDate['fajr_jamaah']} AM`) > currentTime) {
      return {
        name: 'Fajr',
        time: `${currentDate['fajr_jamaah']} AM`
      };
    }

    if (this.stringToTime(`${currentDate['zuhr_jamaah']} PM`) > currentTime) {
      return {
        name: 'Zuhr',
        time: `${currentDate['zuhr_jamaah']} PM`
      };
    }

    if (this.stringToTime(`${currentDate['asr_jamaah']} PM`) > currentTime) {
      return {
        name: 'Asr',
        time: `${currentDate['asr_jamaah']} PM`
      };
    }

    if (
      this.stringToTime(`${currentDate['maghrib_jamaah']} PM`) > currentTime
    ) {
      return {
        name: 'Maghrib',
        time: `${currentDate['maghrib_jamaah']} PM`
      };
    }

    if (this.stringToTime(`${currentDate['isha_jamaah']} PM`) > currentTime) {
      return {
        name: 'Isha',
        time: `${currentDate['isha_jamaah']} PM`
      };
    }

    // if none return the next day fajr
    return {
      name: 'Fajr',
      time: `${tomorrowsPrayerTime['fajr_jamaah']} AM`
    };
  }

  render() {
    return (
      <div className="NextJammahTimeWrapper">
        <h4>{this.state.nextJammahTime.name=='Fajr'?'الفجر':this.state.nextJammahTime.name=="Zuhr"?'الظهر':this.state.nextJammahTime.name=="Asr"?'العصر':this.state.nextJammahTime.name=="Maghrib"?"المغرب":"العشاء"}</h4>
      </div>
    );
  }
}

export default NextJammahTime;
