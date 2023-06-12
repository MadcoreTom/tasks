const PREFIX = "MadcoretomTasks";
const FILENAMES = PREFIX + ".filenames";
const FILE = PREFIX + ".file.";

class LocalStorage {
    listFiles(): string[] {
        const names = window.localStorage.getItem(FILENAMES);
        if (names) {
            return JSON.parse(names) as string[];
        }
        return [];
    }

    saveFile(name: string, data: string) {
        window.localStorage.setItem(FILE + name, data);
        const files = this.listFiles();
        if (files.indexOf(name) < 0) {
            window.localStorage.setItem(FILENAMES, JSON.stringify([...files, name]));
        }
    }

    deleteFile(name: string) {
        const files = this.listFiles();
        window.localStorage.setItem(FILENAMES, JSON.stringify(files.filter(f => f != name)));
    }

    loadFile(name: string): string {
        const item = window.localStorage.getItem(FILE + name);
        return item ? item : "#nothing";
    }
}

export const LOCAL_STORAGE = new LocalStorage();