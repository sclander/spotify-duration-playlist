import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SpotifyService} from '../../spotify.service';

import { UserData } from '../userData.model';
import { GeneratorParams } from '../generatorParams.model';
import { Song } from './song.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {
	@Input() token: string;
	@Input() userData: UserData;
	@Input() parameters: GeneratorParams;
	songs: Song[] = [];

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {}

  ngOnChanges(changes) {
		if( changes.parameters && changes.parameters.currentValue.playlistId != '') {
			this.songs = [];
  		this.getPlaylistTracks();
  	}
  }

  getPlaylistTracks() {
  	this.spotify.getPlaylistTracks(this.token, this.userData.id, this.parameters.playlistId)
  	.map( response => response.json() )
  	.subscribe(
  		body => {
  			for(let item of body.items) {
  				this.songs.push(new Song(item.track.name, item.track.duration_ms));
  			}
  		}
  	)
  }
}
