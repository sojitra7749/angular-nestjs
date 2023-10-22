import { NgClass, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Toaster } from '@interfaces/common.model';
import { ToasterService } from '@services/toaster.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  standalone: true,
  imports: [NgIf, NgClass]
})
export class ToastComponent implements OnDestroy {
  toaster!: Toaster | null;
  private subscription: Subscription;

  constructor(private toasterService: ToasterService) {
    this.subscription = this.toasterService.getToasts()
      .subscribe(toaster => {
        this.toaster = toaster;
      });
  }

  closeToast() {
    this.toasterService.removeToast();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
