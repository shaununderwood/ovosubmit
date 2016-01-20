( function( ){
  'use strict';

  function PlayerDetailsService( GameService, PlayerService){
    var vm = this;
    vm.GameService = GameService;
    vm.PlayerService = PlayerService;



  }

  angular
    .module( 'ovo')
    .controller( 'PlayerDetailsService', PlayerDetailsService)
  ;

})( );