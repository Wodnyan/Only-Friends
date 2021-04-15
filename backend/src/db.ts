import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";

export const connection = () => {
  return MikroORM.init(microConfig);
};
