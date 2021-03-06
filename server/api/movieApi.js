var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sql')

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: 1,
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

router.post('/getMovie', (req, res) => {
  var sql = $sql.movie.get
  var params = req.body
  conn.query(sql, [params.count], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

router.get('/totalCount', (req, res) => {
  var sql = $sql.movie.totalCount
  conn.query(sql, function (err, result, field) {
    if (err) {
      console.log(err)
    }
    if (result) {
      const name = field[0].name
      jsonWrite(res, result[0][name])
    }
  })
})

router.post('/recommend', (req, res) => {
  var sql = $sql.movie.recommend
  var params = req.body
  conn.query(sql, [params.type], function (err, result) {
    if (err) console.log(err)
    if (result) jsonWrite(res, result)
  })
})

router.post('/byOrder', (req, res) => {
  var sql = $sql.movie.getByOrder
  var params = req.body
  conn.query(sql, [params.order], function (err, result) {
    if (err) console.log(err)
    if (result) jsonWrite(res, result)
  })
})

router.post('/search', (req, res) => {
  var sql = $sql.movie.search
  var params = req.body
  conn.query(sql, [params.searchWord], function (err, result) {
    if (err) console.log(err)
    if (result) jsonWrite(res, result)
  })
})

module.exports = router
