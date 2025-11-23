import React from "react";

const MainLayout = ({ children }) => {
  return <div className="min-h-screen bg-black"><div className="container mx-auto py-32">{children}</div></div>;
};

export default MainLayout;
