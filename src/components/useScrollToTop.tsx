import { ArrowUpward } from "@mui/icons-material";
import React, { useState } from "react";

export default function BackToTop() {
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const onScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <button
      onClick={onScrollTop}
      id="back-top"
      style={{ height: 40, display: showScroll ? "flex" : "none" }}
    >
      <ArrowUpward />
    </button>
  );
}
