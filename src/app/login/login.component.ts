import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
	isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onLogin() {
  	let currentUrl = encodeURI(window.location.href);
  	let authUrl = `https://accounts.spotify.com/authorize
  	?client_id=3aca641b6b624d53bc175222657be0e4
  	&redirect_uri=${currentUrl}
  	&response_type=token`

  	window.location.href = authUrl;
  }

  onLogout() {
  	this.isLoggedIn = false;
  }
}
