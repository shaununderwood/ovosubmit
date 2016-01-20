( function( ){
  'use strict';

  function PlayerDetailsController( GameService){
    var vm = this;
    vm.GameService = GameService;

    vm.playerNumber = vm.GameService.nextPlayerNumber( );
  }
  PlayerDetailsController.$inject = [ 'GameService'];

  PlayerDetailsController.prototype.savePlayerDetails = function savePlayerDetails( playerDetails){
    var vm = this;
    if ( !!playerDetails && playerDetails.length > 0){
      vm.GameService.addPlayer( playerDetails);

    } else {
      alert( 'You must have a name?!');
    }
  };

  angular
    .module( 'ovo')
    .controller( 'PlayerDetailsController', PlayerDetailsController)
  ;
})( );