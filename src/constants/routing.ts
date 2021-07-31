import { AuditOutlined, HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import routes from './routes.json';

export const routing = [
    {
        value: 'Home',
        path: routes.DASHBOARD,
        icon: HomeOutlined
    },
    {
        value: 'Audits',
        path: routes.AUDITS,
        icon: AuditOutlined
    },
    {
        value: 'Stakeholders',
        path: routes.STAKEHOLDERS,
        icon: UserOutlined
    },
    {
        value: 'Logout',
        path: routes.LOGOUT,
        icon: LogoutOutlined
    }
]