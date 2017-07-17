export class Song {
	name: string;
	duration_ms: number;
	uri: string;

	constructor(name: string, duration_ms: number, uri: string) {
		this.name = name;
		this.duration_ms = duration_ms;
		this.uri = uri;
	}
}