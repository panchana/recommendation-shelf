import { ClientsConfig, LRUCache, Service } from "@vtex/api";
import { Clients } from "./clients";
import { queries } from "./resolvers/queries";

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: 2000,
    },
    status: {
      memoryCache: new LRUCache<string, any>({ max: 5000 }),
    },
  },
};

export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query: {
        ...queries,
      },
    },
  },
});
