import { NgClass, NgIf } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ModalData } from '@interfaces/modal.class';
import { DialogService } from '@services/dialog.service';
import { ToasterService } from '@services/toaster.service';
import { UserService } from '@services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [NgIf, NgClass, ReactiveFormsModule]
})
export class FormComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  userFrom!: FormGroup;
  @Input() data!: ModalData;
  isLoading = false;

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
    this.isLoading = true;
    this.userService.create({
      ...this.userFrom.value,
      password: 'Test@123' // TODO: dynamic password generate and send email
    }).pipe(
      takeUntilDestroyed(this.#destroyRef),
      finalize(() => this.isLoading = false)
    ).subscribe(() => {
      this.toasterService.showToast('User created successfully!');
      this.userService.refresh$.next(true);
      this.closeModal();
    });
  }

  update() {
    this.isLoading = true;
    this.userService.update(this.data.user.id, this.userFrom.value)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        finalize(() => this.isLoading = false)
      ).subscribe(() => {
        this.toasterService.showToast('User updated successfully!');
        this.userService.refresh$.next(true);
        this.closeModal();
      });
  }

  closeModal() {
    this.dialogService.close();
  }

}
