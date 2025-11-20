import React from "react";
import OriginalNavbar from "@theme-original/Navbar";
import clsx from "clsx";
import "../../css/styles.css";

export default function Navbar(props) {
  return (
    <header className={clsx("custom-header")}>
      <OriginalNavbar {...props} />
      header
    </header>
  );
}
