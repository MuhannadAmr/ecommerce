import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'khanJuwayria';
  isLogin!:boolean
  toUp(){
    window.scrollTo(0,0)
  }
  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() == null) {
          this.isLogin = false;
        } else {
          this.isLogin = true;
        }
      }
    })
  }
}
