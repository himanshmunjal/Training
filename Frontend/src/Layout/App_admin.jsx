import Header from "../Admin/UI/Header";
import Footer from "../Admin/UI/Footer";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      <div className="p-1">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
