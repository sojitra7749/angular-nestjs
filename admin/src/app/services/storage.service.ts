import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<object>,
    @Inject('STORAGE') private storage: Storage,
  ) { }

  /**
   * Gets storage value
   * @param key Key name through which value can be accessed
   */
  get(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.storage.getItem(key);
    }
    return null;
  }

  /**
   * Sets storage value
   * @param key Key name through which value can be accessed
   * @param value Storage value
   */
  set(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.setItem(key, value);
    }
  }

  /**
   * Removes storage of particular key
   * @param key Key name through which value can be accessed
   */
  remove(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.removeItem(key);
    }
  }

  /**
   * Empties the list stored in window storage with the object of all key/value pairs, if storage are there.
   */
  clear() {
    if (isPlatformBrowser(this.platformId)) {
      this.storage.clear();
    }
  }
}
