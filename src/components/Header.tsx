import { PageHeader } from 'antd';
import React from 'react';

function Header() {

  return (
    <div className="header font- container mx-auto">
        <PageHeader
            className="site-page-header"
            title="Chimps Map"
        />
    </div>
  );
}

export default Header;
