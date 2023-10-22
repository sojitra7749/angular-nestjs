import { Component } from '@angular/core';
import { DialogService } from '@services/dialog.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
  constructor(
    private dialogService: DialogService
  ) { }

  confirm() {
    this.dialogService.confirmUserDecision(true);
  }

  closeModal() {
    this.dialogService.close();
  }
}
