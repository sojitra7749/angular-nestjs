import { Entity, EntityList, EntityParams, FormControlMap } from '@interfaces/common.model';

export interface User extends Entity {
  email: string;
}

export interface CreateUser {
  name: string;
  email: string;
}

export interface UserListQueryParams extends EntityParams {
  userId: string;
  name: string;
  email: string;
}

export type UserList = EntityList<User>;

export type AddUserForm = FormControlMap<CreateUser>;
