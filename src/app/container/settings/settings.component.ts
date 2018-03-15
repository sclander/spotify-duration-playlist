import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { SpotifyService } from '../../spotify.service';

import { UserData } from '../userData.model';
import { PlaylistRef } from './playlistRef.model';
import { GeneratorParams } from '../generatorParams.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnChanges{
	@Input() token: string;
	@Input() userData: UserData;
	@Output() parameters: EventEmitter<GeneratorParams> = new EventEmitter<GeneratorParams>();
	playlists: PlaylistRef[] = [];

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {}

  ngOnChanges(changes) {
  	if( changes.userData.currentValue.id != '') {
  		this.getPlaylists();
  	}
  }

  getPlaylists() {
  	this.spotify.getPlaylists(this.token, this.userData.id).map( response => response.json() ).subscribe(
  		body => {
  			for (let item of body.items) {
  				this.playlists.push(new PlaylistRef(item.id, item.name));
  			}
  		}
  	);
  }

  onGenerate(form) {
		let value = form.value;
		const duration_ms = ((value.duration_min * 60) + value.duration_sec) * 1000;
		console.log('WOWOWOWOW', duration_ms)

  	this.parameters.emit(new GeneratorParams(value.playlist, value.duration, value.tolerance));
  }
}
