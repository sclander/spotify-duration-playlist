import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

@Injectable()
export class SpotifyService {
	constructor(private http: Http){}

	getUser(token) {
		console.log(token);
		const headers = new Headers({
			'Authorization': `Bearer ${token}`
		});
		return this.http.get('https://api.spotify.com/v1/me',{headers: headers});
	}
}