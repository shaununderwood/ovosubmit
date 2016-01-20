( function ( ){
  'use strict';

  function GameService( ){
    var m = this;

    m.rounds = 0;
    m.roundsFought = 0;
    m.gameType = null;
    m.playersArray = [ ];
    m.player1 = null;
    m.player2 = null;
    m.gameStatusModel = {
      gameFinished : false
    };
  }

  GameService.prototype.reset = function reset( ){
    var m = this;
    m.rounds = 0;
    m.gameType = null;
    m.playersArray = [ ];
    m.player1 = null;
    m.player2 = null;
    m.gameStatusModel = {
      gameFinished : false
    };
  };

  GameService.prototype.startNextGame = function startNextGame( ){
    var m = this;
    m.reset();
    m.LayoutController.goto('');
  };

  GameService.prototype.addPlayer = function addPlayer( playerName){
    this.playersArray.push( new ovo.Player( playerName));
  };

  GameService.prototype.getRounds = function getRounts( ){
    return this.rounds;
  };

  GameService.prototype.getRoundsLeft = function getRounts( ){
    return this.rounds;
  };

  GameService.prototype.setRounds = function setRounds( rounds){
    this.rounds = rounds;
  };

  GameService.prototype.getGameType = function getGameType( ){
    return this.gameType;
  };

  GameService.prototype.setGameType = function setRounds( gameType) {
    var m = this;
    m.gameType = gameType;

    //if ( m.gameType === 'hvh' ) {
    //  m.player1 = new PlayerHuman();
    //  m.player2 = new PlayerHuman();
    //
    //} else if ( m.gameType === 'hva' ) {
    //  m.player1 = new PlayerHuman();
    //  m.player2 = new PlayerAI();
    //
    //} else if ( m.gameType === 'avh' ) {
    //  m.player1 = new PlayerAI();
    //  m.player2 = new PlayerHuman();
    //
    //} else if ( m.gameType === 'ava' ) {
    //  m.player1 = new PlayerAI();
    //  m.player2 = new PlayerAI();
    //}
  };

  GameService.prototype.nextPlayerNumber = function nextPlayerNumber( ){
    return this.playersArray.length + 1;
  };


  GameService.prototype.finishedGame = function finishedGame(){
    this.gameStatusModel.gameFinished = true;
  };

  angular
    .module('ovo')
    .service( 'GameService', GameService)
  ;

})( );