( function ( ){
  'use strict';

  function ScoreboardController( $rootScope, PlayerService, GameService){
    var vm = this;
    vm.$rootScope = $rootScope;
    vm.GameService = GameService;
    vm.PlayerService = PlayerService;

    vm.playersReady = [];

    vm.$rootScope.$watchCollection(
      function watchThis(){
        return vm.playersReady;
      },
      function andDoThis( n, o){
        if ( n.length === 2){
          vm.GameService.startNextGame( );
        }
      }
    )
  }

  ScoreboardController.prototype.playerReady = function playerReady( player){
    var vm = this;
    vm.playerReady.push( player);
  };

  ScoreboardController.prototype.getPlayers = function getPlayers( ){
    var vm = this;
    return vm.Pla;
  };



  angular
    .module('ovo')
    .controller('ScoreboardController', ScoreboardController)
  ;

})( );