import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../../core/services/Shared/shared.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  message=''
  isGreen=true

  
  
  constructor(private sharedService:SharedService){
    
  }

  //1422 * 650
  ngOnInit(): void {
    this.sharedService.alertMessage$.subscribe((value) => {
      this.message = value;

      this.sharedService.alertColor$.subscribe((value) => {
        this.isVisible = true;
        this.isGreen= value== 'green' ? true : false
        setTimeout(() => {
          this.isVisible = false;
        }, 5000);
    
      });
      
    });
    
  }

  errorMessage: string = 'Something went Wrong';
  isVisible: boolean = false;

  show(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}

