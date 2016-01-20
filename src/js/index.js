( function( ){
  'use strict';

  function RouterConfiguratororor( $routeProvider) {

    $routeProvider
      .when( '/game-type', {
        templateUrl: 'templates/game-type/game-type-ui.html',
        controller: 'GameTypeController',
        controllerAs: 'vm'
      })
      .when( '/player-details', {
        redirectTo: '/player-details-1'
      })
      .when( '/player-details-1', {
        templateUrl: 'templates/player-details/player-details-ui.html',
        controller: 'PlayerDetailsController',
        controllerAs: 'vm'
      })
      .when( '/player-details-2', {
        templateUrl: 'templates/player-details/player-details-ui.html',
        controller: 'PlayerDetailsController',
        controllerAs: 'vm'
      })
      .when( '/scoreboard', {
        templateUrl: 'templates/scoreboard/scoreboard.html',
        controller: 'ScoreboardController',
        controllerAs: 'vm'
      })
      .when( '/game', {
        templateUrl: 'templates/game/game.html',
        controller: 'GameController',
        controllerAs: 'vm'
      })
    .otherwise( { redirectTo: '/game-type'});

  }

  angular
    .module( 'ovo', [
      'ngRoute'
    ])
    .config( RouterConfiguratororor)
  ;

})( );
