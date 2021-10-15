export const STORAGE_KEYS = {
  SCOREBOARD: "scoreboard",
  CURRENT_USER: "current_user",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ram: {} as Record<string, string>,
  setItem(key: string, value: {} | string) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(e);
      this.ram[key] = JSON.stringify(value);
    }
  },
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(e);
      this.ram[key] = undefined;
    }
  },
  getItem<T>(key: string): T {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.warn(e);
      return JSON.parse(this.ram[key]);
    }
  },
};
