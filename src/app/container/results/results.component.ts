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
	matches: string[][] = [];
  isLoading: boolean = false;
  percentLoaded: number = 0; 

  constructor(private spotify: SpotifyService) {}

  ngOnInit() {}

  ngOnChanges(changes) {
		if( changes.parameters && changes.parameters.currentValue.playlistId != '') {
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
  			for(let item of body.items) {
  				this.songs.push(new Song(item.track.name, item.track.duration_ms));
  			}
  			this.generatePlaylists();
        this.isLoading = false;
  		}
  	)
  }

  generatePlaylists() {
  	// determine absolute max and min
  	let maxDuration = this.parameters.duration + this.parameters.tolerance;
		let minDuration = this.parameters.duration - this.parameters.tolerance;

  	// sort by duration
  	this.songs = this.songs.sort((a, b) => {
  		if (a.duration_ms < b.duration_ms)
	    	return -1;
		  if (a.duration_ms > b.duration_ms)
		    return 1;
		  return 0;
  	});

  	// Determine initial max length
		let maxLength = 0;
		let maxTestVal = 0;
		let maxCount = 0
		while (maxTestVal < maxDuration) {
			maxTestVal += this.songs[maxCount].duration_ms;
			
			if (maxTestVal < maxDuration) {
				maxCount++;
			} else {
				maxLength = maxCount;
			}
		}

		// Determine initial min length
		let minLength = 0;
		let minTestVal = 0;
		let minCount = 0;
		while (minTestVal < maxDuration) {
			minTestVal += this.songs[this.songs.length - minCount - 1].duration_ms;
			minCount++

			if (minTestVal > maxDuration)
				minLength = minCount;		
		}

    let totalIterations = this.numIterations(minLength, maxLength, this.songs.length);
    let completedIterations = 0;

		for(let i = minLength; i <= maxLength; i++) {
			this.iterateSubsets(this.songs, i, minDuration, maxDuration);
      completedIterations += this.nChooseR(this.songs.length, i);
      this.percentLoaded = (completedIterations / totalIterations) * 100;
      console.log(this.percentLoaded);
		}
  }

  iterateSubsets(set, subsetLength, min, max) {		
		let s = [];
		
		// Generate the first set of indicies
		for (let i = 0; (s[i] = i) < subsetLength - 1; i++);
		this.checkDuration(set, s, min, max);

		// Loop through the rest of the indicies
		for(;;) {
			for (var i = subsetLength - 1; i >= 0 && s[i] == set.length - subsetLength + i; i--);
			if (i < 0) {
	      break;
	    } else {
	      s[i]++;                    						// increment this item
	      for (++i; i < subsetLength; i++) {    // fill up remaining items
	        s[i] = s[i - 1] + 1; 
	      }
	      this.checkDuration(set, s, min, max); 
	    }
		}
	}

	checkDuration(set, indices, min, max) {
		let subsetDuration = 0;
		for(var i = 0; i < indices.length; i++) {
			subsetDuration += set[indices[i]].duration_ms;
		}
		if (subsetDuration >= min && subsetDuration <= max) {
			this.printMatch(indices);
		}
	}

	printMatch(indices) {
		let match = [];
		for(var i = 0; i < indices.length; i++) {
			match.push(this.songs[indices[i]].name);
		}
		this.matches.push(match);
	}

  numIterations(min, max, total): number {
    let numIterations = 0;
    let counter = min;

    for (counter; counter <= max; counter++) {
      numIterations += this.nChooseR(total, counter);
    }

    return numIterations;
  }

  nChooseR(n: number, r: number): number {
    return this.factorial(n) / (this.factorial(r) * this.factorial(n - r));
  }

  factorial(n: number): number {
    if (n === 0)
      { return 1; }
    else
      { return n * this.factorial( n - 1 ); }
  }
}
