// PageLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';

const PageLayout = ({ children, currentPage }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;