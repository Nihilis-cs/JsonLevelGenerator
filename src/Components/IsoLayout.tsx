import { Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header, Content, Footer } from "antd/es/layout/layout";
import MenuItem from "antd/es/menu/MenuItem";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    onClick?: () => void,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

function IsoLayout() {
    const navigate = useNavigate();
    type MenuItem = Required<MenuProps>['items'][number];
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        onClick: () => void,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',

    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
            onClick,
        } as MenuItem;
    }
    const items: MenuProps['items'] = [
        getItem('NewLevel', 'sub1', () => navigate("/leveparametor")),
        //getItem('ByType', 'sub1', () => navigate("/filteredType")),
    ];
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    items={items} />
            </Sider>
            <Layout className="site-layout">
                {/* <Header style={{ padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        </Layout>);
}

export default IsoLayout;