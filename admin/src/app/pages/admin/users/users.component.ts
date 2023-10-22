import { NgFor } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from '@app/components/confirm/confirm.component';
import { DcDirective } from '@app/directives/dc.directive';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { User } from '@interfaces/user.model';
import { DialogService } from '@services/dialog.service';
import { ToasterService } from '@services/toaster.service';
import { UserService } from '@services/user.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, DcDirective, PaginationComponent, ReactiveFormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
  @ViewChild(DcDirective, { static: true }) dcContainer!: DcDirective;
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl()
  });
  users: User[] = [];
  currentUser!: User;
  page = 1;
  pageSize = 10;
  totalUsers = 0;

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.getUsers();

    this.dialogService.confirm$.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe((isYes) => isYes && this.confirmDelete());

    this.userService.refresh$.pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe(() => this.getUsers());
  }

  getUsers() {
    this.userService.get({
      page: this.page,
      pageSize: this.pageSize,
      name: this.searchForm.value.name || '',
      email: this.searchForm.value.email || ''
    }).subscribe((res) => {
      this.users = res.data;
      this.totalUsers = res.totalRecords;
    });
  }

  add() {
    this.dialogService.open(FormComponent, {
      dcContainer: this.dcContainer,
      data: {}
    });
  }

  edit(user: User) {
    this.dialogService.open(FormComponent, {
      dcContainer: this.dcContainer,
      data: {
        user
      }
    });
  }

  onPageChange(page: number) {
    this.page = page;
    this.getUsers();
  }

  onSearch() {
    this.page = 1;
    this.getUsers();
  }

  onReset() {
    this.searchForm.reset();
    this.getUsers();
  }

  delete(user: User) {
    this.currentUser = user;
    this.dialogService.open(ConfirmComponent, {
      dcContainer: this.dcContainer,
      data: user
    });
  }

  confirmDelete() {
    this.userService.delete(this.currentUser._id).subscribe(() => {
      this.toasterService.showToast('User removed successfully!');
      this.dialogService.close();
      this.getUsers();
    });
  }
}
