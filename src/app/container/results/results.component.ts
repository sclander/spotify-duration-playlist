import { Component, OnInit, Input, OnChanges, NgZone, ChangeDetectorRef} from '@angular/core';
import { SpotifyService} from '../../spotify.service';
import { GeneratorService } from '../../generator.service';

import { UserData } from '../userData.model';
import { GeneratorParams } from '../generatorParams.model';
import { Song } from './song.model';
import 'rxjs/add/observable/interval';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})

export class ResultsComponent implements OnInit, OnChanges {
	@Input() token: string;
	@Input() userData: UserData;
	@Input() parameters: GeneratorParams;
	songs: Song[] = [];
	matches: string[][] = [];
  isLoading = false;
  percentLoaded$: Subject<number>;

  constructor(private zone: NgZone, private ref: ChangeDetectorRef, private spotify: SpotifyService, private generator: GeneratorService) {}

  ngOnInit() {
    this.percentLoaded$ = this.testProgress();
    setTimeout( () => this.percentLoaded$.next(0), 1000);
  }

  ngOnChanges(changes) {
		if ( changes.parameters && changes.parameters.currentValue.playlistId !== '') {
			this.songs = [];
			this.matches = [];
  		this.getPlaylistTracks();
  	}
  }

  getPlaylistTracks() {
    this.isLoading = true;
  	this.spotify.getPlaylistTracks(this.token, this.userData.id, this.parameters.playlistId)
  	.map( response => response.json() )
  	.subscribe(
  		body => {
  			for (const item of body.items) {
  				this.songs.push(new Song(item.track.name, item.track.duration_ms));
  			}
  		},
      error => console.log(error),
      () => this.generatePlaylists()
  	);
  }

  generatePlaylists() {
    this.generator.generatePlaylists(this.songs, this.parameters.duration, this.parameters.tolerance)
    .subscribe(
      data => this.matches.push(data),
      error => console.log('error:', error),
      () =>  {
        this.isLoading = false;
        // this.percentLoaded = 0;
      }   
    );
  }

  testProgress(): Subject<number> {
    return this.generator.testProgress();
  }
}
