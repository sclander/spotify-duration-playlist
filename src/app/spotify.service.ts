import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

@Injectable()
export class SpotifyService {
	constructor(private http: Http){}

	authHeader(token: string): Headers {
		const headers = new Headers({
			'Authorization': `Bearer ${token}`
		});
		return headers;
	}

	getUser(token: string) {
		let headers = this.authHeader(token);
		return this.http.get('https://api.spotify.com/v1/me',{headers: headers});
	}

	getPlaylists(token:string , userId: string) {
		let headers = this.authHeader(token);
		return this.http.get(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`, {headers: headers});
	}

	getPlaylistTracks(token: string, userId: string, playlistId: string) {
		let headers = this.authHeader(token);
		return this.http.get(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {headers: headers});
	}

	newPlaylist(token: string, userId: string, name: string) {
		let headers = this.authHeader(token);
		headers.append('Content-Type', 'application/json');
		return this.http.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {name: name}, {headers: headers});
	}

	addTracksToPlaylist(token: string, userId: string, playlistId: string, uris: string[]) {
		let headers = this.authHeader(token);
		headers.append('Content-Type', 'application/json');
		return this.http.post(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {uris: uris}, {headers: headers});
	}
}