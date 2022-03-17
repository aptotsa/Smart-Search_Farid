import React from "react";

import { Provider as RecordProvider } from "./RecordsContext";
import { Provider as SearchProvider } from "./SearchContext";

const ContextProvider = ({ children }: { children: any }) => {
  return (
    <RecordProvider>
      <SearchProvider>{children}</SearchProvider>
    </RecordProvider>
  );
};

export default ContextProvider;
