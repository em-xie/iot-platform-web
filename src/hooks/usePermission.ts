import { refreshWindow } from "@/utils/web";
import { useStorage } from "@vueuse/core";
import { userStore } from "@/store/user";

class Permission {
  public defaultPermission = useStorage<string>("role", "superadmin");

  public togglePermission = async () => {
    this.defaultPermission.value =
      this.defaultPermission.value === "superadmin" ? "editor" : "superadmin";
    refreshWindow();
  };

  public hasPermission(value: string): boolean {
    const userState = userStore();
    // console.log(userState.permission!.includes(value));
    return userState.permission!.includes(value);
  }
}

export default new Permission();
