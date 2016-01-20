( function ( ){
  'use strict';

  function ScoreboardController( $rootScope, PlayerService, GameService){
    var vm = this;
    vm.$rootScope = $rootScope;
    vm.GameService = GameService;
    vm.PlayerService = PlayerService;

    vm.playersReady = [ ];

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
    this.playerReady.push( player);
  };

  ScoreboardController.prototype.getPlayers = function getPlayers( ){
    return this.GameService.getPlayers( );
  };

  ScoreboardController.prototype.quit = function quit( ){
    //this.LayoutController.goto( );
  };

  ScoreboardController.prototype.getGamesLeft = function( ){
    return this.GameService.rounds - this.GameService.roundsFought;
  };

  ScoreboardController.prototype.getDraws = function( ){
    return this.GameService.draws;
  };

  ScoreboardController.prototype.gameOn = function gameOn( ){

  };




  angular
    .module('ovo')
    .controller('ScoreboardController', ScoreboardController)
  ;

})( );