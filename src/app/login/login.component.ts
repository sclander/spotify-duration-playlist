import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import 'rxjs/add/operator/map';

import { UserData } from './userData.model';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
	isLoggedIn: boolean = false;
	token: string = '';
	userData: UserData = new UserData('', '', '');

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit() {
  	let rawData = this.route.snapshot.fragment;

  	if (rawData !== null) {
  		let fragParams = this.getFragmentParams(rawData);
	  	this.token = fragParams.access_token;

	  	if(this.token !== '') {
	  		this.isLoggedIn = true;
	  	}

	  	this.getUser();
  	}	
  }

  onLogin() {
  	let currentUrl = encodeURI(window.location.href);
  	let authUrl = `https://accounts.spotify.com/authorize?client_id=3aca641b6b624d53bc175222657be0e4&redirect_uri=${currentUrl}&response_type=token`

  	window.location.href = authUrl;
  }

  onLogout() {
  	this.isLoggedIn = false;
  }

  getFragmentParams(fragment: string) {
  	let fragParams = {
  		access_token: '',
  		token_type: '',
  		expires_in: ''
  	};
  	let fragArray = fragment.split('&');

  	for (let frag of fragArray) {
  		let fragParts = frag.split('=');
  		fragParams[fragParts[0]] = fragParts[1];
  	}

  	return fragParams;
  }

  getUser() {
  	this.spotify.getUser(this.token).map( response => response.json() ).subscribe(
  		body => this.userData = new UserData(body.display_name, body.id, body.images[0].url)
  	);
  }
}
