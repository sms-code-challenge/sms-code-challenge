const moment = require('moment')

module.exports = (element) => {
  return {
    id: element.id,
    name: element.city,
    start_date: moment.utc(element.start_date, 'MM/DD/YYYY'),
    end_date: moment.utc(element.end_date, 'MM/DD/YYYY'),
    price: element.price,
    status: element.status,
    color: element.color
  }
}
