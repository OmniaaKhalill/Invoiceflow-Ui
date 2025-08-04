import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


   

      //  showAlertSource = new Subject<boolean>();
      //  showAlert$ = this.showAlertSource.asObservable();
      //  showAlert(value: boolean) {
      //    this.showAlertSource.next(value);
      //  }


          //Notification prompt

          alertColorSource = new Subject<string>();
          alertColor$ = this.alertColorSource.asObservable();
          alertColor(value: string) {
            this.alertColorSource.next(value);
          }

               //Notification prompt Message alertColor
          alertMessageSource = new Subject<string>();
          alertMessage$ = this.alertMessageSource.asObservable();
          alertnMessage(value: string) {
            this.alertMessageSource.next(value);
          }




          
    NotSeenOrderSource = new Subject<number>();
    NotSeenOrder$ = this.NotSeenOrderSource.asObservable();
    NotSeenOrder(value: number) {
      this.NotSeenOrderSource.next(value);
    }



    isNotSeenOrderSource = new Subject<boolean>();
    isNotSeenOrder$ = this.isNotSeenOrderSource.asObservable();
    isNotSeenOrder(value: boolean) {
      this.isNotSeenOrderSource.next(value);
    }
  constructor() { }
}
