import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { API } from '@constants/api.constant';
import { CreateUser, User, UserList, UserListQueryParams } from '@interfaces/user.model';
import { BaseService } from '@services/base.service';
import { Observable } from 'rxjs';

export const UserDetail: ResolveFn<Observable<CreateUser | unknown>> =
  (route: ActivatedRouteSnapshot) => {
    const userService = inject(UserService);
    return userService.getById(route.params.uuid);
  };

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User, UserList, UserListQueryParams> {

  getEndPoint(): string {
    return API.USERS;
  }
}
