( function ( ){
  'use strict';

  function WeaponService( ){

    this.weaponList = [ ];
    var paper   = new ovo.Weapon( 'Paper',  'images/paper.svg');
    var scissor = new ovo.Weapon( 'Scissor','images/scissors.svg');
    var stone   = new ovo.Weapon( 'Stone',  'images/rock.svg');

    paper.  winsAgainst( stone);
    scissor.winsAgainst( paper);
    stone.  winsAgainst( scissor);

    this.weaponList.push ( paper );
    this.weaponList.push ( scissor );
    this.weaponList.push ( stone );

  }

  WeaponService.prototype.getWeapons = function getWeapons( ){
    return this.weaponList;
  };

  angular
    .module( 'ovo')
    .service( 'WeaponService', WeaponService)
  ;

})( );
