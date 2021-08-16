import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../static/adminIndex.css";
import { Route } from "react-router-dom";
import AddArticle from "./addArticle";
import ArticleList from "./articleList";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// class SiderDemo extends React.Component {
function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleClickArticle = (e) => {
    if (e.key == "addArticle") {
      props.history.push("/index/add");
    } else {
      props.history.push("/index/list");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            文章管理
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            onClick={handleClickArticle}
            title="User"
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          {/* <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu> */}
          <Menu.Item key="9" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div>
              <Route path="/index/" exact component={AddArticle}></Route>
              <Route path="/index/add/" exact component={AddArticle}></Route>
              <Route path="/index/list/" exact component={ArticleList}></Route>
              <Route path="/index/add/:id" exact component={AddArticle}></Route>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          TESLA ©2018 Created by W
        </Footer>
      </Layout>
    </Layout>
  );
}

// ReactDOM.render(<SiderDemo />, mountNode);
export default AdminIndex;
