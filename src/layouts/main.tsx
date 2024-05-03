import React from 'react';

import './layout.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div className="layout">{children}</div>;
};

export default Layout;
