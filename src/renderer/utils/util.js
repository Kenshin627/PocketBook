const fs = require('fs')
const path = require('path')
export function readFileByNode(callback) {
  const filePath = path.join(__dirname, '../store/userData.json')
  fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) {
      callback('ERR')
    } else {
      callback(data)
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

