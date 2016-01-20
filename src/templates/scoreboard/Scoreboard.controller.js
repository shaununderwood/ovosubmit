( function ( ){
  'use strict';

  function ScoreboardController( $rootScope, PlayerService, GameService, LayoutController){
    var vm = this;
    vm.$rootScope = $rootScope;
    vm.GameService = GameService;
    vm.PlayerService = PlayerService;
    vm.LayoutController = LayoutController;

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
    this.playerReady.push( player);
  };

  ScoreboardController.prototype.getPlayers = function getPlayers( ){
    this.GameService.getPlayers();
  };

  ScoreboardController.prototype.quit = function quit( ){
    this.LayoutController.goto( );
  };





  angular
    .module('ovo')
    .controller('ScoreboardController', ScoreboardController)
  ;

})( );