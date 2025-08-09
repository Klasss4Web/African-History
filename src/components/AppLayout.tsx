import type React from "react";

import Footer from "./Footer";
import Header from "./Header";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
