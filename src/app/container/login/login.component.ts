import { Component, OnInit, Input } from '@angular/core';

import { UserData } from '../userData.model';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
	@Input() isLoggedIn: boolean = false;
	@Input() userData: UserData;

  constructor() {}

  ngOnInit() {}

  onLogin() {
  	let currentUrl = encodeURI(window.location.href);
  	let authUrl = `https://accounts.spotify.com/authorize?client_id=3aca641b6b624d53bc175222657be0e4&redirect_uri=${currentUrl}&response_type=token`

  	window.location.href = authUrl;
  }

  onLogout() {
    let hashlessUrl = encodeURI(window.location.href.split('#')[0]);
  	window.location.href = hashlessUrl;
  }
}
