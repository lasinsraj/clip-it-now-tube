
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 flex">
        <div className="flex-1">
          {children}
        </div>
        
        {/* Ad space - Sidebar banner */}
        <div className="w-[300px] h-[600px] bg-gray-100 hidden lg:flex items-center justify-center border rounded-md ml-6 shrink-0">
          <span className="text-muted-foreground text-sm">Advertisement Space</span>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
