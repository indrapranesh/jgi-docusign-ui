import { Layout, Menu } from 'antd';
import React from 'react';
import { routing } from '../constants/routing';
import history from '../history';
import { Footer } from 'antd/lib/layout/layout';
import Routes from './Routes';
import './MainLayout.scss';

const { Content, Sider } = Layout;

interface LayoutState {
    selectedKey: Array<string>
}

class MainLayout extends React.Component<{}, LayoutState> {

    constructor(props: any) {
        super(props);
        this.state = {
            selectedKey: ['0']
        }
        routing.map((route, index) => {
            if(window.location.pathname === route.path) {
                this.setState({
                    selectedKey: [`${index}`]
                });
                console.log(route.path, index)
            }
        })
    }
  
  render() {
    return (
        <Layout className="h-screen">
            <Sider
            breakpoint="lg"
            width="250"
            collapsedWidth="0"
            onBreakpoint={broken => {
            console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
            }}
        >
            <div className="h-20 flex items-center justify-center">
                <p className="logo font-bold text-xl text-white ">Chimp Auditor</p>
            </div>
            <div className="pt-5">
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.selectedKey}>
                    {
                        routing.map((route, index) => 
                            <Menu.Item onClick={() => history.push(route.path)} key={index} icon={<route.icon />}>
                                {route.value}
                            </Menu.Item>
                        )
                    }
                </Menu>
            </div>
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
