MP3-Elastic
===========
- search music on a simple elastic search database.
- can play songs over network
- yo-marionette backbone.js generated

###Events

####Search
  * query:created
  - Routes
   * app:navigate
    
    http://localhost:9000/#search/[ page ]/[ query ]

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
  * player:percentagePlayed
  * player:play
  * player:play:id
  * player:play:playlist
  * player:prev
  * player:song
  * player:voldown
  * player:volumeChanged
  * player:volup

----------

####Playlist
  * playlist:add:all
  * playlist:add:id
  * playlist:add:song
  * playlist:remove:all
  * playlist:remove:id

----------

