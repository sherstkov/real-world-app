type StorageType = 'localStorage' | 'sessionStorage';

export default class WebStorage<T = unknown> {
  private readonly storageType: StorageType;
  private readonly key: string;

  constructor(storageType: StorageType = 'localStorage', key: string) {
    this.key = key;
    this.storageType = storageType;
  }

  get(): T | null {
    try {
      const value = window[this.storageType].getItem(this.key) ?? '';
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  set(value: T) {
    const strValue = JSON.stringify(value);
    console.log(strValue);

    window[this.storageType].setItem(this.key, strValue);
  }

  remove() {
    window[this.storageType].removeItem(this.key);
  }
}
