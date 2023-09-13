import { Presence } from "discord-rpc";
import { response } from "osu-api-extended/dist/types/v2_user_me_details";
import { resolveFullGameMode, StringGameMode } from "./gamemode";

export function getUserPresence(
  user: response,
  gameMode: StringGameMode
): Presence {
  const presence: Presence = {};

  const rank = user.rank_history.data[user.rank_history.data.length - 1];
  // @ts-ignore
  presence.smallImageKey = `https://a.ppy.sh/${user.id}?1640769389.jpeg`;
  presence.smallImageText = `${
    // @ts-ignore
    user.username
  } (#${rank.toLocaleString()}) \nplaying ${resolveFullGameMode(gameMode)}`;
  presence.buttons = [
    {
      label: "View Profile",
      //@ts-ignore
      url: `https://osu.ppy.sh/users/${user.id}/${gameMode}`,
    },
  ];

  return presence;
}
