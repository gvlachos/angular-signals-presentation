import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get<T>(key: string, defaultValue: T | undefined = undefined): T | undefined {
    if (this.isLocalStorageSupported) {
      try {
        const value = this.localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
      } catch (error) {
        console.warn(
          'localStorage.get',
          key,
          this.localStorage.getItem(key),
          error,
        );
      }
    }
    return undefined;
  }

  set<T>(key: string, value: T): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(userid: number): void {
    if (this.isLocalStorageSupported) {
      Object.keys(this.localStorage)
        .filter(key => key.startsWith(`${userid}`))
        .forEach(key => this.remove(key));
    }
  }

  debug(userid: number): void {
    if (this.isLocalStorageSupported) {
      Object.keys(this.localStorage)
        .filter(key => key.startsWith(`${userid}`))
        .forEach(key => {
          console.log(userid, key, this.localStorage.getItem(key));
        });
    }
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
