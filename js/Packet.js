class neodna__Packets
{
  constructor()
  {
    this.array = new Array();
  }

  add( x )
  {
    var p = new neodna__Packet( x );
    this.array.unshift( p );
  }

  geti( x )
  {
    if ( this.array.length )
      return this.array[ i ].value;
    return -1;
  }

  getl( x )
  {
    if ( this.array.length )
      return this.array[ this.array.length - 1 ].value;
    return -1;
  }

  geto( m, nonce ) // get open
  {
    if ( this.array.length )
    {
      var i = 0;
      for (
        i = 0;
          i < this.array.length - 1;
            i++ )
      {
        var a = this.array[ i + 0 ];
        m.at( a );
        var b = this.array[ i + 1 ];
        if ( b.value == 1 )
        {
          proceed( a );
          return m;
        }
        //turn( a );
      }

      var a = this.array[ this.array.length - 1 ];
      m.at( a );
      proceed( a );
    }
    return 0;

    function proceed( a )
    {
      if ( nonce && a.packets.array.length )
      {
        m.l++;
        var b = a.packets.array[ 0 ];
        if ( b.value == 1 )
          return 0;
        //turn( a );
        return a.packets.geto( m, 0 );
      }
      return 0;
    }
/*
    function turn( a )
    {
      var t = a.value ? 1 : -1;
      m.turn( t );

      //m.t = ( m.m + m.t + t ) % m.m;
      //m.c += 1;

    }
    */
  }

  getc( m, x, nonce )
  {
    var i = 0;
    for (
      i = 0;
        i < this.array.length - 1;
          i++ )
    {
      var a = this.array[ i ];
      turn( a );
    }

    for (
      i = this.array.length - 1;
        i >= 0;
          i-- )
    {
      var a = this.array[ i ];
      if ( nonce )
      {
        if ( a.packets.array.length )
        {
          turn( a );
          a.packets.getc( m, x, 0 );
        }
      }
      turn( a );
    }

    return m;

    function turn( a )
    {
      var t = a.value ? 1 : -1;
      m.turn( t );
      /*
      m.t = ( m.m + m.t + t ) % m.m;
      m.c += 1;
      */
    }
  }

  getf( x, nonce )
  {

  }

  gety( x, nonce )
  {

  }

  shorten( x, nonce )
  {
    var i = 0;
    for (
      i = 0;
        i < this.array.length - 1;
          i++ )
    {
      var a = this.array[ i + 0 ];
      var b = this.array[ i + 1 ];
      if ( a.value == 0
        && b.value == 0
        && a.packets.array.length == 0
        && b.packets.array.length == 0 )
      {
        this.array.splice( i + 1, 1 );
        return 1;
      }

      if ( nonce )
      {
        var x = packets( a );
        if ( x ) return 1;
        var y = packets( b );
        if ( y ) return 1;
        function packets( p )
        {
          if ( p.packets.array.length )
          {
            //var b = p.packets.array[ 0 ];
            if ( p.value == 0
              && p.packets.array[ 0 ].value == 0 )
            {
              p.packets.array.splice( 0, 1 );
              return 1;
            }
            else
              return p.packets.shorten( x, 0 );
          }
          return 0;
        }
      }
    }
    return 0;
  }

  tiny( x, nonce )
  {
    while( this.shorten( x, nonce ) )
      continue;
    return 1;
  }

  breakdown( x )
  { // breakdown a 11 to a 10 or 01
    var i = 0;
    for (
      i = 0;
        i < this.array.length - 1;
          i++ )
    {
      var a = this.array[ i + 0 ];
      var b = this.array[ i + 1 ];
      if ( a.value == 1
        && b.value == 1 )
      {
        a.value = x ? 1 : 0;
        b.value = x ? 0 : 1;
        break;
      }
    }
  }

  erase( x, nonce )
  { // potentially breakdown a 11, 10 or 01
    var i = 0;
    for (
      i = 0;
        i < this.array.length - 1;
          i++ )
    {
      var a = this.array[ i + 0 ];
      var b = this.array[ i + 1 ];
      if ( a.value == 0
        && b.value == 0 )
        continue;
      a.value = x ? 0 : a.value;
      b.value = x ? b.value : 0;
      break;
    }
  }

  nip( x, nonce )
  {
    if ( this.array.length )
    {
      var i = 0;
      for (
        i = 0;
          i < this.array.length - 1;
            i++ )
      {
        var a = this.array[ i + 0 ];
        var b = this.array[ i + 1 ];

        var r = 0;
        r = x ? ab( a, b ) : ab( b, a );
        if ( r )
          return 1; // do once

        r = lower( a );
        if ( r )
          return 1;
      }

      var a = this.array[ this.array.length - 1 ];
      var r = lower( a );
      if ( r )
        return 1;
    }
    return 0;

    function lower( a )
    {
      if ( nonce && a.packets.array.length )
      {
        var b = a.packets.array[ 0 ];
        var r = 0;
        r = x ? ab( a, b ) : ab( b, a );
        if ( r )
          return 1;
        r = a.packets.nip( x, 0 );
        if ( r )
          return 1;
      }
      return 0;
    }

    function ab( a, b )
    {
      if ( a.value == 1 )
      {
        a.value = 0;
        return 1;
      }
      else if ( b.value == 1 )
      {
        b.value = 0;
        return 1;
      }
      return 0;
    }

    return 0;
  }

  clear( x, nonce )
  {
    while( this.nip( x, nonce ) )
      continue;
    return 1;
  }

  breaker( x, nonce = 0, at = 0 ) // past all the way through, moving 1s once
  {
    var m = x ? 1 : 0;
    var n = x ? 0 : 1;
    var i = 0;
    for (
      i = at;
        i < this.array.length - 1;
          i++ )
    {
      var a = this.array[ i + 0 ];
      var b = this.array[ i + 1 ];
      var x = 0;
      if ( a.value == m
        && b.value == n )
      {
        a.value = n;
        b.value = m;
        x = 1;
        i++;
      }

      if ( nonce ) // push through gates
      {
        packets( a, x );
        packets( b, x );
        function packets( p, x )
        {
          if ( p.packets.array.length )
          {
            var start = 0;
            if ( !x ) // untouched
            {
              var b = p.packets.array[ 0 ];
              if ( p.value == m
                && b.value == n )
              {
                p.value = n;
                b.value = m;
                start++;
              }
            }

            if ( p.value == 0 )
              p.packets.breaker( x, 0, start );
          }
        }
      }
    }

    return 0;
  }

  seperate( x )
  { // move a single 1 in a direction of flow
    var m = x ? 1 : 0;
    var n = x ? 0 : 1;
    var i = 0;
    for (
      i = 0;
        i < this.array.length - 1;
          i++ )
    {
      var a = this.array[ i + 0 ];
      var b = this.array[ i + 1 ];
      if ( a.value == m
        && b.value == n )
      {
        a.value = n;
        b.value = m;
        return 1;
      }
    }
    return 0;
  }

  fire( x )
  {
    if ( this.array.length )
    {
      var start = -1;
      var i = 0;
      for (
        i = 0;
          i < this.array.length - 1;
            i++ )
      {
        if ( start < 0 )
          start = i;
        var a = this.array[ i ];
        if ( a.value == 1 )
        {
          if ( a.packets.array.length )
          {
            a.set   ( 0 );
            a.add   ( 1 );
            a.packets.power ( 0 );
            if ( i > 0 )
            {
              var b = this.array[ i - 1 ];
              b.value = 1;
            }
          }
          else
          {
            a.set ( 1 );
            this.power( start );
          }
          return 1;
        }
      }

      this.array[ this.array.length - 1 ].value = 1;
      return 1;
    }
    return 0;
  }

  power( at )
  {
    if ( this.array.length )
    {
      var i = 0;
      var started = 0;
      for (
        i = at;
          i < this.array.length - 1;
            i++ )
      {
        var a = this.array[ i + 0 ];
        var b = this.array[ i + 1 ];
        if ( a.value == 0 )
        {
          if ( b.value == 0 )
          {
            if ( ( i + 1 ) == ( this.array.length - 1 ) )
            {
              b.value = 1;
              break;
            }
            continue;
          }
          else if ( b.value == 1 )
          {
            started = 1;
            a.value = 1;
            b.value = 3;
          }
        }
        else if ( a.value == 1 )
        {
          if ( b.value == 0 )
          {
            a.value = 0;
            b.value = 1;
          }
          else if ( b.value == 1 )
          {
            started = 1;
            a.value = 1;
            b.value = 3;
          }
        }
        else if ( a.value == 2 )
        {
          a.value = 1;
          b.value += 1;
        }
        else if ( a.value == 3 ) // bumped
        {
          a.value = 0;
          b.value += 1;
        }
        if ( ( b.value == 1 ) && started )
          break;
        else if ( b.value == 2 )
          continue;
        else if ( b.value == 3 )
          continue;
      }

      var end = this.array[ this.array.length - 1 ];
      if ( end.value > 1 )
        end.value = 1;
      return 1;
    }
    return 0;
  }

  place( x )
  {
    //
  }

  settle( x, nonce = 0 )
  {
    var i = 0;
    if ( this.array.length
      && this.array[ 0 ].value == 0 )
    {
      for (
        i = 0;
          i < this.array.length - 1;
            i++ )
      {
        var p = this.array[ i + 0 ];
        var n = this.array[ i + 1 ];
        if ( n.value == 1 )
        {
          p.add( x, 0 );
          return;
        }
      }

      var p = this.array[ this.array.length - 1 ];
      if ( p.value == 0 )
      {
        p.add( x, 0 );
        return;
      }
    }

    var p = new neodna__Packet( x );
    this.array.unshift( p );
  }

  form()
  {
    var i = 0;
    for (
      i = 0;
        i < this.array.length - 1;
          i++ )
    {
      var a = this.array[ i + 0 ];
      var b = this.array[ i + 1 ];
      if ( a.value == 1 && !a.packets.array.length
        && b.value == 0 && !b.packets.array.length )
      {
        this.array.splice( i + 1, 1 );
        this.array[ i + 0 ].add( 0 );
      }
      else if ( a.value == 0 && !a.packets.array.length
             && b.value == 1 && !b.packets.array.length )
      {
        this.array.splice( i + 1, 1 );
        this.array[ i + 0 ].add( 1 );
      }
    }
  }

  tilt( x )
  {
    x ? this.tilt__left() : this.tilt__right();
  }

  tilt__left()
  {
    var n = 1;
    while ( n )
    {
      if ( n == 10000 )
      {
        console.log( 'too many iterations' );
        break;
      }
      n = this.flow__left();
    }
  }

  tilt__right()
  {
    var n = 1;
    while ( n )
    {
      if ( n == 10000 )
      {
        console.log( 'too many iterations' );
        break;
      }
      n = this.flow__right();
    }
  }

  flow( x )
  {
    x ? this.flow__left() : this.flow__right();
  }

  flow__left()
  {
    var i = 0;
    var n = 0;
    for (
      i = 0;
        i < this.array.length - 1;
          i++ )
    {
      var a = this.array[ i + 0 ];
      var b = this.array[ i + 1 ];
      if ( a.value == 0
        && b.value == 1 )
      {
        a.value = 1;
        b.value = 0;
        n++;
      }
    }
    return n;
  }

  flow__right()
  {
    var i = 0;
    var n = 0;
    for (
      i = this.array.length - 1;
        i >= 1;
          i-- )
    {
      var a = this.array[ i - 1 ];
      var b = this.array[ i + 0 ];
      if ( a.value == 1
        && b.value == 0 )
      {
        a.value = 0;
        b.value = 1;
        n++;
      }
    }
    return n;
  }
}

class neodna__Packet
{
  constructor( x )
  {
    this.value = x;
    this.packets = new neodna__Packets();
  }

  add( x, nonce )
  {
    this.packets.settle( x, nonce );
  }

  set( x )
  {
    this.value = x;
  }
}
