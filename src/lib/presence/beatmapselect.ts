import { response } from "osu-api-extended/dist/types/v2_user_me_details";
import { Data } from "../../types";
import { StringGameMode } from "../gamemode";
import { userManager } from "../user";
import { Client, Presence } from "discord-rpc";
import { getUserPresence } from "../userpresence";

export async function setBeatmapSelectPresence(
  client: Client,
  data: Data,
  gameMode: StringGameMode,
  details: string
) {
  let user: response | null = null;
  if (userManager.isRequested(gameMode)) {
    user = await userManager.getUser(data.gameplay.name, gameMode);
  }

  let presence: Presence = {
    details: details,
    largeImageKey: "https://i.imgur.com/aNzdqQW.png",
    state: `▶ ${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title}`,
  };

  if (user) {
    presence = { ...presence, ...getUserPresence(user, gameMode) };
  }

  await client.setActivity(presence);
}
