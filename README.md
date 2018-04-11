# SpotifyDurationPlaylist

## Overview

This application connects to the Spotify API to allow users to create a playlist of songs to that will add up to a desired duration. These can be used for timed workouts, study sessions, cooking, or anything else you can think of that could use a timer!

[CLICK HERE TO RUN THIS APPLICATION LIVE ON GITHUB PAGES](https://sclander.github.io/spotify-duration-playlist/)

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

# Algorithm Overview

The algorithm for generating playlists is based on the so called [Subset Sum Problem](https://en.wikipedia.org/wiki/Subset_sum_problem). The easiest solution to implement is the naive algorithm to iterate through all subsets of length N. Originally, I was worried that the O((2^N)N) run time would make the naive algorithm useless here because it would simply take too long to generate results. I realized though, that the algortihm coulg be greatly simplified based on some assumptions that could be made about the data.

The major assumption is that all duration values will be > 0. This is a very different situation from the original subset sum problem with both positive and negative values. This is because having all values positive sets an upper (and lower) limit on how large the subset size N can be.

It was easy to calculate this min/max values from the song list. The songs are sorted by duration then added together in sequence until they reach the target duration. Adding up the shortest songs will give you the max number of songs that can possibly create a playlist of the desired duration, and adding the longest songs will give you the minimum. 

Once the min/max values are calculated, the runtime of the problem is signifigantly incread. Instead of having to examine subsets of 1 to N, the range is now much smaller and the calculations can be performed fairly quickly.

One potential improvement I hope to put into the algorithm would be min/max recalculation throughout the generation process. Basically, the process would be changed so that the code runs as follows:

* Songs put in order x0, x1, ..., xn
* Initial min/max calculated
* All potential matches containing song x0 are checked
* Remove x0 from song list
* Recalculate min/max using values from x1, ..., xn

The reason the method starts with the shortest songs is that these are the most likely songs to raise max length value. Any reduction in this maximum value greatly reduced the total number of calculations that need to be performed.


