import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { DcDirective } from '@app/directives/dc.directive';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  vc!: ViewContainerRef;
  confirm$ = new Subject<boolean>();
  isLoading = false;

  confirmUserDecision(confirm: boolean): void {
    this.confirm$.next(confirm);
  }

  open(component: Type<any>, option: { dcContainer: DcDirective; data: any; }) {
    this.vc = option.dcContainer.viewContainerRef;
    this.vc.clear();

    const componentRef = this.vc.createComponent(component);
    componentRef.instance.data = option.data;
  }

  close() {
    this.vc?.clear();
  }
}
