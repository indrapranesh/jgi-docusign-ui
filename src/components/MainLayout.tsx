import { Layout, Menu, PageHeader } from 'antd';
import React from 'react';
import { routing } from '../constants/routing';
import history from '../history';
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Footer } from 'antd/lib/layout/layout';
import Routes from './Routes';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MainLayout extends React.Component {
  
  render() {
    return (
        <Layout className="h-screen">
        <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
        <Layout>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background h-full" style={{ padding: 24, minHeight: 360 }}>
              <Routes />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Chimp Auditor ©2021 Made with Love.</Footer>
        </Layout>
      </Layout>
    );
  }
}
  

export default MainLayout;
