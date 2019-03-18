import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string ;
  username : string;
  email : string;
  password: string;
  passed : boolean;

  constructor(private validateService : ValidateService,
  private flashMessage : FlashMessagesService,
private authService : AuthService,
private router : Router) { 
    this.passed = false;
  }

  ngOnInit() {
  }

  onRegisterSubmit(){
    console.log(this.name);
    const user = {
      name : this.name,
      username: this.username,
      email : this.email,
      password : this.password
    }

    this.passed = true;


    //Required Fields
    if (!this.validateService.validateRegister(user))   {
      console.log('Failed User Registration');
      this.flashMessage.show('Please fill in all fields',{cssClass : 'alert-danger',timeout : 3000});
      this.passed  = false;
    }
    
    //Validate Email
      if (!this.validateService.validateEmail(this.email)){
        this.passed = false;        
        console.log('Failed Email validation');
        this.flashMessage.show('Please fill in a valid Email address!',{cssClass : 'alert-danger',timeout : 3000});
      }

      
      if (this.passed) {
        console.log('Passed validation');
      } else {
        
      }

      //Register User
      if (this.passed)
      {
        this.authService.registerUser(user).subscribe(data => {
          if (data.success){
            
            this.flashMessage.show('You are now registered and can login.',{cssClass : 'alert-success',timeout : 3000});
            this.router.navigate(['/login']);
  
          } else  {
            this.flashMessage.show('Something went wrong.',{cssClass : 'alert-danger',timeout : 3000});
            this.router.navigate(['/register']);
  
          }
        })
      }

      

    
  }

}
