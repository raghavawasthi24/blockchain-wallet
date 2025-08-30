import { useSelector } from "react-redux";
import "./App.css";
import Header from "./components/shared/header";
import Overview from "./components/shared/overview";
import Table from "./components/shared/table";
import { useEffect } from "react";

function App() {
  const data = useSelector((state: any) => state.token);

  useEffect(()=> {
    console.log(data)
  }, [data])

  return (
    <main className="bg-[#212124]">
      <Header />
      <div className="p-4 flex flex-col gap-16">
        <Overview />
        <Table data={data} />
      </div>
    </main>
  );
}

export default App;
