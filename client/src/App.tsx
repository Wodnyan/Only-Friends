import React from "react";

import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";

import { Routing } from "./routing";
import { LoginMutation, MeDocument, MeQuery } from "./generated/graphql";

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
          // logout: (result, _args, cache, _info) => {
          //   customUpdateQuery<LogoutMutation, MeQuery>(
          //     cache,
          //     {
          //       query: MeDocument,
          //     },
          //     result,
          //     () => ({ me: null })
          //   );
          // },
          login: (result, _args, cache, _info) => {
            customUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              result,
              (result, _) => {
                return {
                  // me: result.login?.user,
                  me: {
                    ...result.login,
                  },
                };
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
