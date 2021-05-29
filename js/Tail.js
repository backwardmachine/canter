class neodna__Tail
{
  constructor()
  {
    this.units = new Array();
  }

  extend()
  {
    //console.log( 'extending tail to length=', this.units.length );
    this.units.push( 0 );
  }

  shorten()
  {
    //console.log( 'shortening tail to length=', this.units.length );
    if ( this.units.length )
      this.units.shift();
  }

  feed( code )
  {
    if ( this.units.length )
    {
      //console.log( 'feeding tail with code=', code );
      this.units.shift();
      this.units.push( code );
      //console.log( 'last element=', this.units[ this.units.length - 1 ] );
    }
  }

  eject()
  {
    if ( this.units.length )
    {
      var code = this.units.pop();
      //console.log( 'tail remaining=', this.units.length );
      //console.log( 'ejecting from tail code=', code );
      //console.log( 'tail length=', this.units.length );
      return code;
    }
    return 0;
  }
}
