import { createModule } from "meteor-rpc";
import { ChatCollection } from "./model";
import { z } from "zod";

export const ChatModule = createModule("chat")
  .addMethod("createTheRoom", z.void(), async () => {
    return ChatCollection.insertAsync({ createdAt: new Date(), messages: [] });
  })
  .addMethod(
    "sendMessage",
    z.object({ chatId: z.string(), message: z.string(), user: z.string() }),
    async ({ chatId, message, user }) => {
      return ChatCollection.updateAsync(
        { _id: chatId },
        {
          $push: {
            messages: { text: message, who: user, createdAt: new Date() },
          },
        }
      );
    }
  )
  .addPublication("room", z.string(), (chatId) => {
    return ChatCollection.find({ _id: chatId });
  })
  .addPublication("rooms", z.void(), () => {
    return ChatCollection.find();
  })
  .buildSubmodule(); // this is very important, don't forget to call this method
