const fs = require('fs')
const path = require('path')
export function readFileByNode(callback) {
  const filePath = path.join(global.__static, '/userData.json')
  fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) {
      callback('ERR')
    } else {
      callback(data)
    }
  })
}

export function writeFileByNode(data, callback) {
  const filePath = path.join(global.__static, '/userData.json')
  fs.writeFile(filePath, data, 'utf-8', (err) => {
    if (err) {
      callback(0)
    } else {
      callback(1)
    }
  })
}

export function MakeGUID() {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return guid
}

export function isToday(date) {
  const d = new Date(date.toString().replace(/-/g, '/'))
  const todaysDate = new Date()
  if (d.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
    return true
  } else {
    return false
  }
}

export function isMonth(date) {
  const d = new Date(date.toString().replace(/-/g, '/'))
  const todaysDate = new Date()
  if (new Date(d.setHours(0, 0, 0, 0)).setDate(1) === new Date(todaysDate.setHours(0, 0, 0, 0)).setDate(1)) {
    return true
  } else {
    return false
  }
}

export function GetLocalDateTime(utcDate) {
  if (!utcDate) {
    return '-'
  }
  function formatFunc(str) {
    return str > 9 ? str : '0' + str
  }
  var date2 = new Date(utcDate)
  var year = date2.getFullYear()
  var mon = formatFunc(date2.getMonth() + 1)
  var day = formatFunc(date2.getDate())
  var hour = date2.getHours()
  var noon = hour >= 12 ? 'PM' : 'AM'
  hour = hour >= 12 ? hour - 12 : hour
  hour = formatFunc(hour)
  var min = formatFunc(date2.getMinutes())
  var dateStr = year + '-' + mon + '-' + day + ' ' + noon + ' ' + hour + ':' + min
  return dateStr
}
