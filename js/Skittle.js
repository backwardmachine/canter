class neodna__Skittle
{
  constructor()
  {
    this.t = 0; // turn
    this.a = 2; // angles
    this.g = 5; // potential
    this.c = 0; // count
    this.l = 0; // depth
    this.s = 0;
    this.pt = 0; // pointer
  }

  reset()
  {
    this.t = 0;
    this.a = 2;
    this.g = 5;
    this.c = 0;
    this.l = 0;
    this.s = 0;
    this.pt = 0;
  }

  angles( n )
  {
    this.a = n;
  }

  slope( x )
  {
    this.a = ( this.g + this.a + x ) % this.g;
  }

  turn( x )
  {
    this.t = ( this.a + this.t + x ) % this.a;
    this.c++;
  }

  spin()
  {
    var x = this.pt.value ? 1 : -1;
    this.turn( x );
  }

  go( p, n )
  {
    p.geto( this, n );
  }

  at( pt )
  {
    this.pt = pt;
    this.spin();
  }

  binary()
  {
    if ( this.a != 2 )
      return this.t % 2;
    return this.t;
  }

  set( p, n, b )
  {
    this.go( p, n );
    if ( this.pt )
      this.pt.value = b;
  }
}
