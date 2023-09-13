import { /*match_object,*/ response } from "osu-api-extended/dist/types/v2_user_me_details";
import { Data } from "../../types";
import { StringGameMode } from "../gamemode";
import { userManager } from "../user";
import { Client, Presence } from "discord-rpc";
import { getUserPresence } from "../userpresence";

let songProgress: number | undefined;

export async function setMultiPresence(
  client: Client,
  data: Data,
  gameMode: StringGameMode
) {
  const isPlaying = songProgress !== data.menu.bm.time.current;
  songProgress = data.menu.bm.time.current;

  let user: response | null = null;
  if (userManager.isRequested(gameMode)) {
    user = await userManager.getUser(data.gameplay.name, gameMode);
  }

  let details = "In multiplayer room";

  let presence: Presence = {
    details,
    largeImageKey: "https://i.imgur.com/aNzdqQW.png",
  };

  if (isPlaying) {
    presence.state = `▶ ${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title}`;
  }

  if (user) {
    presence = { ...presence, ...getUserPresence(user, gameMode) };
  }

  await client.setActivity(presence);
}
