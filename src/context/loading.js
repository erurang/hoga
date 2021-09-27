import React, { createContext } from "react";

const Store = createContext();

const Loading = (props) => {
  const loading = {
    loading: true,
    data: false,
    error: null,
  };

  return <Store.Provider value={loading}>{props.children}</Store.Provider>;
};

export default Loading;
