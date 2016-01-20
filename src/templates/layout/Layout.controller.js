( function ( ){
  'use strict';

  function LayoutController( $timeout, $rootscope, GameService) {
    var vm = this;
    vm.$timeout = $timeout;
    vm.$rootscope = $rootscope;
    vm.GameService = GameService;
    vm.uiInView = '';
    vm.next( );
    console.log( 'LayoutController constructor start');

    vm.$rootscope.$watchCollection( watchThis, andDoThis);

    function watchThis( ){
      return vm.GameService.playersArray;
    }
    function andDoThis( n, o){
      if ( n.length === 1 && o.length === 0){
        vm.next();
      }
      if ( n.length === 2 && o.length === 1){
        vm.next( );
      }
    }

  }
  LayoutController.$inject = [ '$timeout', '$rootScope', 'GameService'];
  LayoutController.stages  = [ '', 'player-details-1', 'player-details-2', 'game-type', 'game', 'scoreboard'];

  LayoutController.prototype.next = function next( ) {
    if ( this.uiInView === '') {
      this.goto( 'game-type');

    } else
    if ( this.uiInView === 'game-type' && this.GameService.getRoundsLeft( ) > 0) {
      this.goto( 'player-details-1');

    } else
    if ( this.uiInView === 'player-details-1') {
      this.goto( 'player-details-2');

    } else
    if ( this.uiInView === 'player-details-2') {
      this.goto( 'game');

    } else
    if ( this.uiInView === 'scoreboard') {

      if ( this.GameService.getRoundsLeft( ) > 0) {
        this.goto( 'game');

      } else {
        this.goto( 'game-type');
      }
    }
  };

  LayoutController.prototype.goto = function goto( stage) {
    if (LayoutController.stages.includes( stage)) {
      this.uiInView = stage;
    }
  };

  LayoutController.prototype.getView = function getView( ) {
    console.log('this.uiInView='+this.uiInView);
    return this.uiInView;
  };

  LayoutController.prototype.startOver = function( ){
    var theBeginning = 'game-type';
    this.goto( theBeginning);
  };

  angular
    .module( 'ovo')
    .controller( 'LayoutController', LayoutController)
  ;

})();


