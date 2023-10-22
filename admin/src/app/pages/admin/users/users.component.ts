import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DcDirective } from '@app/directives/dc.directive';
import { User } from '@app/interfaces/user.model';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { DialogService } from '@services/dialog.service';
import { UserService } from '@services/user.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, DcDirective, PaginationComponent, ReactiveFormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  @ViewChild(DcDirective, { static: true }) dcContainer!: DcDirective;
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl()
  });
  users: User[] = [];
  page = 1;
  pageSize = 10;
  totalUsers = 0;

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUsers();
    this.dialogService.confirm$.subscribe(() => this.getUsers());
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
    console.log(user);
  }
}
