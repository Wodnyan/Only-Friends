import React from "react";

import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";

import { Routing } from "./routing";
import {
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "./generated/graphql";

function customUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (result: Result, query: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:5050/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (result, _args, cache, _info) => {
            customUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              result,
              () => ({ me: null })
            );
          },
          register: (result, _args, cache, _info) => {
            customUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              result,
              (result, query) => {
                if (result.register.validationErrors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
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
