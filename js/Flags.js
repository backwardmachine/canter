var __STACK__HAIDENTOT__OVER = 1;
var __STACK__MOUSE__OVER = 2;
var __STACK__MOUSE__CLICKED = 3;
var __STACK__PAINTED = 4;
var __STACK__CALISMADE = 5;
var __STACK__FORTUNES = 6;
var __STACK__SATELYTE__LOCKED = 7;
var __STACK__MOUSE__SELECTION = 8;
class neodna__Flags
{
  constructor()
  {
    this.flags = new Array();
  }

  addflag( type, on = 0 )
  {
    for ( let flag of this.flags )
    {
      if ( flag.type == type )
        return 0;
    }
    this.flags.push( { type: type, on: on } );
    return 1;
  }

  setflag( type, on = 1 )
  {
    //console.log( 'setting flag=', on );
    for ( let flag of this.flags )
    {
      if ( flag.type == type )
      {
        flag.on = on;
        return 1; // flag set
      }
    }
    this.addflag( type, on );
    return 0; // flag not found
  }

  endflag( type )
  {
    this.setflag( type, 0 );
  }

  isflag( type )
  {
    for ( let flag of this.flags )
    {
      if ( ( flag.type == type )
          && flag.on )
        return 1; // flag set
    }
    return 0; // flag not found
  }

  isflags()
  {
    if ( this.flags.length )
      return 1;
    return 0;
  }

  log()
  {
    for ( let flag of this.flags )
      console.log( 'flag.type=' + flag.type + ', flag.on=' + flag.on );
  }
}
