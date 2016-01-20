( function ( topScope){
  'use strict';

  topScope.ovo = topScope.ovo || {};
  var ovo = topScope.ovo;

  // pull in angular's $q service
  angular.injector( [ 'ng']).invoke( [ '$q', function get$q( $q) {
    ovo.$q = $q;
  }]);

  ovo.Player = function Player( _name){
    this.name = ( _name ? _name[ 0].toUpperCase( ) + _name.substr( 1, _name.length) : 'no name yet');
    this.score = 0;
    this.$q = ovo.$q;
    this.type = ovo.Player.HUMAN;
    this.weaponDefered = null;
  };

  ovo.Player.playerTypes = { // Static
    HUMAN : 'human',
    AI: 'ai'
  };

  ovo.Player.prototype.reset = function reset( ){
    this.score = 0;
    this.weaponDefered = null;
  };

  ovo.Player.prototype.won = function won( ){
    this.score++;
  };

  ovo.Player.prototype.setWeapon = function setWeapon( weapon){
    if ( weapon instanceof ovo.Weapon){
      this.weapon = weapon;
      this.weaponDefered.resolve( weapon);
      return;
    }
    alert( 'That\'s not a Weapon!');
  };

  ovo.Player.prototype.getWeapon = function getWeapon( ){
    if ( this.hasChosenWeapon){
      return this.weapon;
    }
  };

  ovo.Player.prototype.hasChosenWeapon = function hasChosenWeapon( ){
    return !!this.weapon;
  };

  ovo.Player.prototype.hasNotChosenWeapon = function hasNotChosenWeapon( ){
    return !this.weapon;
  };

  ovo.Player.prototype.choiceMadePromise = function choiceMadePromise( ){
    this.weaponDefered = ovo.$q.defer();
    return this.weaponDefered.promise;
  };

  ovo.Player.prototype.setup = function setup( uiHook){
  };


})( window);
