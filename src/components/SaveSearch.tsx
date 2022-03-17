import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";

export default function SaveSearch() {
  const [open, setOpen] = useState(false);
  const {
    saveSearch,
    state: { current },
  } = useSearch();

  const onSaveSearch = () => {
    if (current?.length === 0) {
      return;
    }

    saveSearch();
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <p className="save-search" onClick={onSaveSearch}>
        Sauvegarder la recherche
      </p>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Recherche sauvegarder
        </Alert>
      </Snackbar>
    </>
  );
}
