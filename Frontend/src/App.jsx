import Header from "./User/UI/Header"; // Ensure path is correct
import Footer from "./User/UI/Footer"; // Ensure path is correct
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
