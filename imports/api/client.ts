import { createClient } from "meteor-rpc";
import type { Server } from "/server/main";

export const client = createClient<Server>();
