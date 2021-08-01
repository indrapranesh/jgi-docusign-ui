import { Layout, Menu } from 'antd';
import React from 'react';
import { routing } from '../constants/routing';
import history from '../history';
import { Footer } from 'antd/lib/layout/layout';
import Routes from './Routes';
import './MainLayout.scss';
import { connect } from 'react-redux';

const { Content, Sider } = Layout;

interface LayoutState {
    selectedKey: Array<string>
}

interface LayoutProps {
    session: {
        isLoggedIn: boolean;
    }
}

class MainLayout extends React.Component<LayoutProps, LayoutState> {

    constructor(props: any) {
        super(props);
        routing.forEach((route, index) => {
            console.log(window.location.pathname, route.path)
            if(window.location.pathname.includes(route.path)) {
                this.state = {
                    selectedKey: [`${index}`]
                };
                console.log(route.path, index)
                console.log(this.state)
            }
        })
    }
  
  render() {
    return (
        <Layout className="h-screen">
            {
                (this.props.session.isLoggedIn) ? (
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
                ) : null
            }
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


function mapStateToProps(state: any) {
    return {
        session: state.session
    }
  }
  

export default connect(mapStateToProps)(MainLayout);
