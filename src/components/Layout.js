import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "../pages/Home";

export default function Layout() {
  const [categories, setCategories] = useState([]);
  const [frequentItems, setFrequentItems] = useState([]);
  const [loading, setLoading] = useState(false);

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
        console.log("ssssss", data);
        setCategories(data.categories);
        setFrequentItems(data.frequent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Full-width Header */}
      <header className="w-full">
        <Header />
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with independent scrolling */}
        <aside className="w-[300px] h-full overflow-y-auto border-r border-gray-300">
          <Sidebar categories={categories} loading={loading} />
        </aside>
        {/* Main Content with independent scrolling */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {/* <Outlet /> */}
          <Home frequentItems={frequentItems} loading={loading} />
        </main>
      </div>
    </div>
  );
}
