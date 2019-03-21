import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  UserID : string ;
  Startdate : string;
  Enddate : string;
  Description: string;
  passed : boolean;

  constructor(private validateService : ValidateService,
  private flashMessage : FlashMessagesService,
private authService : AuthService,
private router : Router) { 
    this.passed = false;
  }

  ngOnInit() {
  }

  onlistingSubmit(){
    console.log(this.UserID);

    const User_ID = localStorage.getItem('user');

    const listing = {
      UserID : User_ID,
      Startdate: this.Startdate,
      Enddate : this.Enddate,
      Description : this.Description
    }

    console.log(listing);

    this.passed = true;


    // //Required Fields
    // if (!this.validateService.validateRegister(user))   {
    //   console.log('Failed User Registration');
    //   this.flashMessage.show('Please fill in all fields',{cssClass : 'alert-danger',timeout : 3000});
    //   this.passed  = false;
    // }
    
    // //Validate Email
    //   if (!this.validateService.validateEmail(this.email)){
    //     this.passed = false;        
    //     console.log('Failed Email validation');
    //     this.flashMessage.show('Please fill in a valid Email address!',{cssClass : 'alert-danger',timeout : 3000});
    //   }

      
    //   if (this.passed) {
    //     console.log('Passed validation');
    //   } else {
        
    //   }

      //Register User
      if (this.passed)
      {
        this.authService.registerlisting(listing).subscribe(data => {
          if (data.success){
            
            this.flashMessage.show('listing saved!.',{cssClass : 'alert-success',timeout : 3000});
            this.router.navigate(['/dashboard']);
  
          } else  {
            this.flashMessage.show('Something went wrong.',{cssClass : 'alert-danger',timeout : 3000});
            this.router.navigate(['/register']);
  
          }
        })
      }

      

    
  }

}
