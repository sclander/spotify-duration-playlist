import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import 'rxjs/add/operator/map';

import { UserData } from './userData.model';
import { GeneratorParams } from './generatorParams.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
	token: string;
	userData: UserData = new UserData('', '', '');
  generatorParams: GeneratorParams = new GeneratorParams('', 0, 0);
  showResults: boolean = false;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit() {
  	let rawData = this.route.snapshot.fragment;

  	if (rawData !== null) {
			let fragParams = this.getFragmentParams(rawData);
	  	this.token = fragParams.access_token;
	  	this.getUser();
	  }
  }

  getFragmentParams(fragment: string) {
  	let fragParams = { access_token: '', token_type: '', expires_in: ''};
  	let fragArray = fragment.split('&');

  	for (let frag of fragArray) {
  		let fragParts = frag.split('=');
  		fragParams[fragParts[0]] = fragParts[1];
  	}

  	return fragParams;
  }

  getUser() {
  	this.spotify.getUser(this.token).map( response => response.json() ).subscribe(
  		body =>  {
        const imgUrl = body.images[0] ? body.images[0].url : 'https://memegenerator.net/img/images/300x300/14756717/bilbo-baggins.jpg';
        this.userData = new UserData(body.display_name, body.id, imgUrl)
      }
  	);
  }

  onParameters(parameters: GeneratorParams) {
    this.generatorParams = parameters;
    if (this.generatorParams.playlistId) {
      this.showResults = true;
    }
  }
}
