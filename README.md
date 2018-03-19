# SpotifyDurationPlaylist

## Overview

This application connects to the Spotify API to allow users to create a playlist of songs to that will add up to a desired duration. These can be used for timed workouts, study sessions, cooking, or anything else you can think of that could use a timer!

## Usage

After following the on-page dialog to login to your Spotify account, you will see a few form inputs. You can use these to specify the parameters for the playlists you want to generate.

*Note - Source playlists >75 songs or target durations >30 minutes may result in long computation times. The page may look like it is frozen but results should eventually come up in these scenarios*

### Playlist

This is the source "pool" of songs that the custom playlists will be created from. Recommended size is 25-75 songs. 

*Note - This application will only work with playlists that your spotify account has created, playlists created by other users will result in an error - I plan to fix this in the future*

### Target Duration

This is the desired length of the generated playlists

*Note - works best with durations <30 minutes*

### Tolerance

This parameter allows for "wiggle room" in your matches to allow for playlists that don't exactly match your desired time. Results + or - your tolerance time (in miliseconds) will also be displayed. This is especially useful for playlists under 10 minutes (as it is unlikely that exact matches will be found for this duration)

## Results

After hitting the "Generate" button, you should see a list of playlists displayed on the right (bulleted lists of song names). Click the "Make a playlist" button and follow the prompt to add this new playlist to your Spotify account. It's as easy as that!

If you dont see results, try increasing the tolerance parameter


