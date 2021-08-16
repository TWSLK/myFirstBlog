import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true
    }).then(res => {
      console.log(res);
      setList(res.data.list)
      console.log(list);
    })
  }

  /**删除文章 */
  const delArticle = (id) => {
    confirm({
      title: '确定删除吗？',
      content: '删除就没了呦',
      onOk() {
        axios({
          method: 'post',
          params: id,
          url: servicePath.delArticle,
          withCredentials: true
        }).then(res => {
          message.success('文章删除成功')
          getList();
        })
      },
      onCancel() {
        message.success('取消')
      }
    })
  }

/**修改文章跳转方法 */
const updateArticle = (id, checked) => {
  props.history.push('/index/add/' + id)
}

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                <b>{item.title}</b>
              </Col>
              <Col span={4}>
                <b>{item.typeName}</b>
              </Col>
              <Col span={4}>
                <b>{item.add_time}</b>
              </Col>
              <Col span={4}>
                <b>{item.view_count}</b>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>&nbsp;
                <Button onClick={() => delArticle(item.id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      ></List>
    </div>
  );
}

export default ArticleList;
