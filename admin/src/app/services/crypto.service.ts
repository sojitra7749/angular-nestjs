import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

import { StorageService } from '@services/storage.service';

@Injectable({
	providedIn: 'root'
})
export class CryptoService {

	sessionInitial = 'rs';

	/**
	 *Creates an instance of CryptoService.
	 */
	constructor(
		private storageService: StorageService,
	) { }

	/**
	 * Encrypts the data in Crypto AES format for security purpose
	 * @returns Encrypted string
	* @param {*} data
	 */
	encryptData(data: unknown): string {
		return Buffer.from(JSON.stringify(data)).toString('base64');
	}

	/**
	 * Decrypts the data from Crypto AES format to human understandable parsed format in
	 * @returns Decrypted parsed data
	 * @param {*} data
	 */
	decryptData(data: string): unknown {
		const encrypted = Buffer.from(data, 'base64').toString('ascii');
		return JSON.parse(encrypted);
	}

	/**
	 * Sets encrypted secured storage data
	 * @param key Storage Key
	 * @param data Data to be stored
	 */
	setEncryptedStorage(key: string, data: unknown): void {
		const encryptedString = this.encryptData(data);
		const keyName = this.sessionInitial + '-' + key.trim();
		this.storageService.set(keyName, encryptedString);
	}

	/**
	 * Gets secured storage data after decryption
	 * @param key Storage Key
	 * @returns Parsed storage data
	 */
	getDecryptedStorage(key: string): unknown {
		const keyName = this.sessionInitial + '-' + key.trim();
		const storageData = this.storageService.get(keyName);
		if (storageData) {
			return this.decryptData(storageData);
		}
		return null;
	}

	/**
	 * Removes encrypted storage data
	 * @param key Storage Key
	 */
	removeEncryptedStorage(key: string): void {
		const keyName = this.sessionInitial + '-' + key.trim();
		this.storageService.remove(keyName);
	}
}
