import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Toaster } from '@app/interfaces/common.model';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private toastSubject = new Subject<Toaster | null>();

  getToasts() {
    return this.toastSubject.asObservable();
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastSubject.next({
      message,
      type
    });

    // Automatically hide the toast after the specified duration
    setTimeout(() => this.toastSubject.next(null), 3000);
  }

  removeToast() {
    this.toastSubject.next(null);
  }
}
