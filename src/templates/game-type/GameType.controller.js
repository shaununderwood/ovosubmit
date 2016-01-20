( function( ){

  function GameTypeController( $location, GameService){
    var vm = this;
    vm.$location = $location;
    vm.GameService = GameService;
    vm.GameService.reset( );

    // this is experimental
    Object.defineProperties( vm, {
      'rounds':{
        get:function( ){      return vm.GameService.getRounds( ); },
        set:function( round){ return vm.GameService.setRounds( round); }
      },
      'gameType':{
        get:function( ){     return vm.GameService.getGameType( ); },
        set:function( type){ return vm.GameService.setGameType( type); }
      }
      });
  }

  GameTypeController.prototype.decreaseRounds = function decreaseRounds( ){
    var vm = this;
    vm.rounds--;
    if ( vm.rounds < 0){
      vm.rounds = 0;
    }
  };

  GameTypeController.prototype.increaseRounds = function increaseRounds( ){
    var vm = this;
    vm.rounds++;
    if ( vm.rounds > 10){
      vm.rounds = 10;
    }
  };

  GameTypeController.prototype.setGameType = function setGameType( gameType) {
    var vm = this;
    vm.gameType = ( vm.gameType === gameType) ? null : gameType;
  };


  angular
    .module( 'ovo')
    .controller( 'GameTypeController', GameTypeController)
  ;

})();