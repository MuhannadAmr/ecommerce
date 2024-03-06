import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
interface userDataInterface{
  name?:string,
  email?:string,
  password?:string,
  rePassword?:string,
  phone?:string,
  resetCode?:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL:string ="https://ecommerce.routemisr.com";
  userData:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }
  saveDataMethod(){
    if(localStorage.getItem("userToken")!=null){
      this.userData.next(localStorage.getItem("userToken")) ;
      this.userData.next(jwtDecode(this.userData.getValue())); 
    }else{
      this.userData.next(null);
    }
  }
  registerAPI(rData:userDataInterface):Observable<any>{
   return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signup`, rData)
  }
  loginAPI(rData:userDataInterface):Observable<any>{
    return  this._HttpClient.post(`${this.baseURL}/api/v1/auth/signin`, rData);
  }
  forgotAPI(rData:userDataInterface):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/forgotPasswords` , rData);
  }
  verifyAPI(rData:userDataInterface):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/verifyResetCode` , rData);
  }
  newPasswordAPI(rData:userDataInterface):Observable<any>{
    return this._HttpClient.put(`${this.baseURL}/api/v1/auth/resetPassword`, rData);
  }
}
