export class TimestampParserUtil {
  private date: Date;
  constructor(
    timestamp: string
  ) {
    this.date = new Date(timestamp);
  }

  getMessageFormatDate() {
    const month = (this.date.getMonth() + 1 >= 10) ? this.date.getMonth() + 1 : `0${this.date.getMonth() + 1}`
    const day = (this.date.getDate() >= 10) ? this.date.getDate() : `0${this.date.getDate()}`
    return `${this.date.getFullYear()}-${month}-${day}`
  }

  getMessageFormatTime() {
    const hours = (this.date.getHours() >= 10) ? this.date.getHours() : `0${this.date.getHours()}`
    const minutes = (this.date.getMinutes() >= 10) ? this.date.getMinutes() : `0${this.date.getMinutes()}`
    return `${hours}:${minutes}`
  }

  getDayNum() {
    return this.date.getDate();
  }
}
