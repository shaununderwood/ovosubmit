( function ( topScope){
  'use strict';
  /*
      Some cunning logic: We only need to know against whom we win.
      like combatants both-lose
      unlike combatants either win or lose
      Either way we only need to check if either party won
   */

  topScope.ovo = topScope.ovo || { };
  var ovo = topScope.ovo;

  ovo.Weapon = function Weapon( _name, _image){
    this.name = _name;
    this.image = _image;
  };

  ovo.Weapon.prototype.winsAgainst = function winsAgainst( weapon){
    this.beats = weapon;
  };

  ovo.Weapon.prototype.didItWin = function didItWin( weapon){

    // I went to all the trouble of creating JS Classes just so i can test out using proper JS classes
    // within an Angular app; i hardly needed them.  But it did lead to the nifty conclusion that
    // we only need to check if we won to work out who the winner is.

    if ( weapon instanceof ovo.Weapon){
      return this.beats !== weapon;
    }
    return false;
  };


  // static functions
  ovo.Weapon.isWinner = function( otherWeapon){
    return this.beats === otherWeapon;
  };


})( window);
