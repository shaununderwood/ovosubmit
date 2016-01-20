( function ( ) {

  function GameController( $q, $timeout, PlayerService, WeaponService){
    var vm = this;

    vm.$q = $q;
    vm.$timeout = $timeout;
    vm.PlayerService = PlayerService;
    vm.WeaponService = WeaponService;

    vm.chosen = false;
    vm.theBigReveal = false;

    vm.players = vm.PlayerService.getPlayers( );
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