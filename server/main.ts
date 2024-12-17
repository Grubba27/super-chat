import { createModule } from "meteor-rpc";
import { ChatModule } from "./chat/module";

const server = createModule().addSubmodule(ChatModule).build();

export type Server = typeof server;
