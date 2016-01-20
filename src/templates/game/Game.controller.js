( function ( ) {

  function GameController( $q, $timeout, PlayerService, WeaponService, GameService){
    var vm = this;

    vm.$q = $q;
    vm.$timeout = $timeout;
    vm.PlayerService = PlayerService;
    vm.WeaponService = WeaponService;
    vm.GameService = GameService;

    vm.chosen = false;
    vm.theBigReveal = false;
    vm.gameStatusModel = {
      gameStatus: false
    };

    //vm.players = vm.PlayerService.getPlayers( );
    vm.players = vm.GameService.getPlayers( );
    vm.weapons = vm.WeaponService.getWeapons( );

    var waitingForChoice = [ ];
    vm.players.forEach( function waitingForPlayerToMakeAChoice( player){
      waitingForChoice.push( player.choiceMadePromise( ));
    });

    $q
      .all( waitingForChoice)
      .then( gameFinished, gameAborted);

    function gameFinished( ){
      // addeseconds for extra suspense until the Big Reveal!
      vm.theBigReveal = true;

      var p0Outcome = vm.players[ 1].getWeapon( ).didItWin( vm.players[ 0].getWeapon( ));
      var p1Outcome = vm.players[ 0].getWeapon( ).didItWin( vm.players[ 1].getWeapon( ));
      $timeout( function( ){

        if ( p0Outcome && p1Outcome){
          alert( 'It\'s a DRAW');

        } else if ( p0Outcome){
          alert( vm.players[ 0 ].name + ' WON!');
          vm.players[ 0].won( );

        } else if ( p1Outcome){
          alert( vm.players[ 1 ].name + ' WON!');
          vm.players[ 1].won( );
        }

        vm.GameService.finishedGame( );
      }, 2000);
    }

    function gameAborted( ){
      alert( 'No idea how you did that. You got the Job!');
    }
  }

  GameController.prototype.setPlayerWeapon = function setPlayerWeapon( player, weapon){
    var vm = this;
    player.setWeapon( weapon);
  };

  angular
    .module( 'ovo')
    .controller( 'GameController', GameController);

})( );