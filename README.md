MP3-Elastic
===========
- search music on a simple elastic search database.
- can play songs over network
- yo-marionette backbone.js generated

###Events

####Search
  * query:created (elasticQuery: string)
  - Routes
   * app:navigate (url: string)
      * ex: http://localhost:9000/#search/[ page ]/[ query ]
  - Pagination
   * page:next
   * page:prev

----------

####Layout
  * layout:show:playlist
  * layout:show:search

----------

####Player
  * player:next
  * player:pause
  * player:percentagePlayed (percentage: integer [ 0-100 ] )
  * player:play
  * player:play:id (id: integer)
  * player:play:playlist (songList: songCollection, currentSong: songModel)
  * player:prev
  * player:song (song model, audio)
  * player:volup
  * player:voldown
  * player:volumeChanged ( volume: integer )

----------

####Playlist
  * playlist:add:all
  * playlist:add:id (id: integer)
  * playlist:add:song (song: songModel)
  * playlist:remove:all
  * playlist:remove:id (id: integer)
