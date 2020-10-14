import React from "react";
import { Layout, useLayoutNavigation } from "@react-md/layout";
import { useLocation, Link } from "react-router-dom";

import navItems from "./components/NavItems/NavItems";

import App from "./App";

export default function MyLayout() {
  const { pathname } = useLocation();

  return (
    <Layout
      title="MetaCritic Game Finder"
      navHeaderTitle="Navigation"
      treeProps={useLayoutNavigation(navItems, pathname, Link)}
    >
      <App />
    </Layout>
  );
}