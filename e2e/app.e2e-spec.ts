import { SpotifyDurationPlaylistPage } from './app.po';

describe('spotify-duration-playlist App', () => {
  let page: SpotifyDurationPlaylistPage;

  beforeEach(() => {
    page = new SpotifyDurationPlaylistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
