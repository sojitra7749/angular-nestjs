import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ModalData } from '@interfaces/modal.class';
import { DialogService } from '@services/dialog.service';
import { ToasterService } from '@services/toaster.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule]
})
export class FormComponent implements OnInit {
  userFrom!: FormGroup;
  @Input() data!: ModalData;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private userService: UserService,
    private toasterService: ToasterService
  ) { }

  get frm() {
    return this.userFrom.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userFrom = this.fb.group({
      name: [this.data?.user?.name || '', Validators.required],
      email: [this.data?.user?.email || '', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.userFrom.markAllAsTouched();
    if (this.userFrom.invalid) return;

    if (this.data?.user?.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.userService.create({
      ...this.userFrom.value,
      password: 'Test@123' // TODO: dynamic password generate and send email
    }).subscribe(() => {
      this.toasterService.showToast('User created successfully!');
      this.dialogService.confirmUserDecision(true);
      this.closeModal();
    });
  }

  update() {
    this.userService.update(this.data.user.id, this.userFrom.value)
      .subscribe(() => {
        this.toasterService.showToast('User updated successfully!');
        this.dialogService.confirmUserDecision(true);
        this.closeModal();
      });
  }

  closeModal() {
    this.dialogService.close();
  }

}
