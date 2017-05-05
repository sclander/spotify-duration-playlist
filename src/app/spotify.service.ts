import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

@Injectable()
export class SpotifyService {
	constructor(private http: Http){}

	authHeader(token): Headers {
		const headers = new Headers({
			'Authorization': `Bearer ${token}`
		});
		return headers;
	}

	getUser(token) {
		const headers = this.authHeader(token);
		return this.http.get('https://api.spotify.com/v1/me', {headers: headers});
	}

	getPlaylists(token, userId) {
		const headers = this.authHeader(token);
		return this.http.get(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`, {headers: headers});
	}

	getPlaylistTracks(token, userId, playlistId) {
		const headers = this.authHeader(token);
		return this.http.get(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {headers: headers});
	}
}
