import "./App.css";

import { Provider as RecordsProvider } from "./context/RecordsContext";
import TableRecords from "./components/TableRecords";
import Search from "./components/Search";

export default function App() {
  return (
    <RecordsProvider>
      <div className="App">
        <Search />
        <TableRecords />
      </div>
    </RecordsProvider>
  );
}
