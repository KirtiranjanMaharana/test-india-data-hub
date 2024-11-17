import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";
import Loader from "./Loader";
import LogoutModal from "./modal/LogoutModal";

export default function Layout() {
  const [categories, setCategories] = useState([]);
  const [frequentItems, setFrequentItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/response1.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCategories(data.categories);
  //       setFrequentItems(data.frequent);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/response2.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setCategories(data.categories);
        setFrequentItems(data.frequent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setLogout(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full">
        <Header handleLogout={handleLogout} />
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[300px] h-full overflow-y-auto border-r border-gray-300">
          <Sidebar categories={categories} loading={loading} />
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {/* <Outlet /> */}
          {loading && !categories.length ? (
            <div className="min-h-[90vh]">
              <Loader />
            </div>
          ) : (
            <Home frequentItems={frequentItems} />
          )}

          {logout && <LogoutModal setLogout={setLogout} />}
        </main>
      </div>
    </div>
  );
}
