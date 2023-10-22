import { FormControl } from '@angular/forms';

export interface ActionToolbar {
  label: string;
  callback: (rowReference: unknown) => void;
}

export interface SvgIcon {
  name: string;
  path: string;
}

export interface DialogData {
  name?: string;
  type: string;
}

export interface Entity {
  _id: string;
  name: string;
  created_at: string;
  uuid: string;
  action: ActionToolbar[];
}

export interface EntityList<T> {
  data: T[];
  totalRecords: number;
}

export interface EntityParams {
  sort: string;
  page: number;
  pageSize: number;
  search: string;
}

export type FormControlMap<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export interface TableColumn {
  key: string;
  label: string;
}

export interface Media {
  url: string;
  file?: File;
}

export interface Toaster {
  message: string;
  type: 'success' | 'error';
}
