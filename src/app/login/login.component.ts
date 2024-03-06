import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage!:string
  forgotErrorMessage!:string
  verifyErrorMessage!:string
  newPasswordErrorMessage!:string

  isLoading:boolean=false
  showForgot:boolean = true;
  showVerify:boolean = false;
  showNewPassword:boolean = false;

  constructor(private _AuthService:AuthService , private _Router:Router){}

  ngOnInit(): void {    
  }

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z].{6}/)]),
  })
  
  // firstForm
  forgotForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required])
  })
  // secondForm
  verifyForm:FormGroup = new FormGroup({
    resetCode: new FormControl(null , [Validators.required])
  })
  // thirdForm
  newPasswordForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]),
    newPassword: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z].{6}/)])
  })

  



  loginSubmit(){
    this.isLoading=true
    this._AuthService.loginAPI(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        

        this.isLoading=false;

       if(res.message == "success"){

          localStorage.setItem("userToken" , res.token);
          this._AuthService.saveDataMethod();
          this._Router.navigate(["/home"]);

       }
      },
      error:(err)=>{
        console.log(err);
        
        this.isLoading=false;
        this.errorMessage = err?.error?.message;
      }
    })
  }
  forgotSubmit(){
    this.isLoading=true;
    this._AuthService.forgotAPI(this.forgotForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
        this.showForgot = false;
        this.showVerify = true;
      },
      error:(err)=>{
        this.isLoading=false;
        this.forgotErrorMessage = err.error.message;
        console.log(err);
        
        
      }

    })
  }
  verifySubmit(){
    this.isLoading=true
    this._AuthService.verifyAPI(this.verifyForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
        this.showVerify = false;
        this.showNewPassword = true;
        
      },
      error:(err)=>{
        this.isLoading=false;
        this.verifyErrorMessage=err.error.message
        
      }
    })
  }
  newPasswordSubmit(){
    this.isLoading=true;
    this._AuthService.newPasswordAPI(this.newPasswordForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
        
        
        // if(localStorage.getItem("userToken")!= null){
        //   localStorage.removeItem("userToken");
        //   localStorage.setItem("userToken", res.token)
        //   this._AuthService.saveDataMethod()
        // }
        // this._Router.navigate(['/home'])
        
      },
      error:(err)=>{
        this.isLoading=false;
        this.newPasswordErrorMessage=err.error.message
        
      }
    })
  }
}
