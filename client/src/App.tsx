import React from "react";

import { createClient, Provider } from "urql";

import { Routing } from "./routing";

const client = createClient({
  url: "http://localhost:5050/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

const App: React.FC = () => {
  return (
    <>
      <Provider value={client}>
        <Routing />
      </Provider>
    </>
  );
};

export default App;
