import "./App.css";

import TableRecords from "./components/TableRecords";
import Search from "./components/Search";
import BackToTop from "./components/useScrollToTop";
import ContextProvider from "./context/ContextProvider";

export default function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Search />
        <TableRecords />
        <BackToTop />
      </div>
    </ContextProvider>
  );
}
