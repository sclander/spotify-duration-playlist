export class GeneratorParams {
	playlistId: string;
	duration: number;
	tolerance: number;

	constructor(playlistId: string, duration: number, tolerance?: number) {
		this.playlistId = playlistId;
		this.duration = duration;
		this.tolerance = tolerance || 0;
	}
}