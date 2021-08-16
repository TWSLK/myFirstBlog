'use strict'

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api'
  }

  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql = "SELECT username FROM admin_user WHERE username = '" + userName + "' AND password = '" + password + "'";
    const res = await this.app.mysql.query(sql);
    if(res.length > 0) {
      let openId = new Date().getTime();
      this.ctx.session.openId = {'openId': openId};
      this.ctx.body = {'data': '登录成功', 'openId': openId};
    } else {
      this.ctx.body = {'data': '登录失败'}
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = {data: resType}
  }

  /**添加文章 */
  async addArticle() {

    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    /**返回id的原因是 如果我进行修改了 那么根据id修改 而不是插入数据 */
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId
    }

  }

  /**修改文章 */
  async updateArticle() {
    let tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: insertSuccess
    }
  }

  /**文章列表 */
  async getArticleList() {
    let sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s') as add_time," +
    'article.view_count as view_count,' +
    'type.type_name as type_name ' + 
    'FROM article LEFT JOIN type ON article.type_id = type.id' +
    ' ORDER BY article.id DESC'

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = {
      list: resList
    }
  }

  /**删除文章 */
  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', {'id': id});
    this.ctx.body = {data: res}
  }

  /**修改文章 */
  async getArticleById() {
    let id = this.ctx.params.id

    let sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.add_time,'%Y-%m-%d') as add_time," +
    'article.view_count as view_count,' +
    'type.type_name as type_name,' + 
    'type.is as type_id ' +
    'FROM article LEFT JOIN type ON article.type_id = type.id' +
    ' WHERE article.id = ' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {data: result}
  }

}

module.exports = MainController