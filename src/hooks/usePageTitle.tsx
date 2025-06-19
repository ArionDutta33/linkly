// src/hooks/usePageTitle.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pageTitles from "../lib/pageTitles";

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const title = pageTitles[path] || "linkly.io";
    document.title = title;
  }, [location.pathname]);
};

export default usePageTitle;
