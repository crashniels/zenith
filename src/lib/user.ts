import { v2 } from "osu-api-extended";
import { response } from "osu-api-extended/dist/types/v2_user_me_details";
import { StringGameMode } from "./gamemode";

class UserManager {
  private user: { [key in StringGameMode]: response | undefined | null } = {
    osu: undefined,
    taiko: undefined,
    mania: undefined,
    fruits: undefined,
  };

  public async getUser(
    _username: string,
    gameMode: StringGameMode
  ): Promise<response | null> {
    if (this.user[gameMode]) return this.user[gameMode] as response;
    if (this.user[gameMode] === null) return null;

    this.user[gameMode] = null;
    try {
      const user = await v2.user.me.details(gameMode);
      this.user[gameMode] = user;
    } catch (e) {
      this.user[gameMode] = null;
    }

    return this.user[gameMode] as response | null;
  }

  public isRequested(gameMode: StringGameMode) {
    if (this.user[gameMode] !== undefined) return true;
    return false;
  }
}

export const userManager = new UserManager();
