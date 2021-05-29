class neodna__Sequence
{
  constructor( sequence )
  {
    this.__NEODNA__ERRORS = 0;

    this.sequence = {
      clip__blob      : sequence,
      clip__focus     : '',
      clip__window    : '',
      clip__leading   : '',
      clip__trailing  : '',
    };

    this.sequence__clip__offset   = 0;
    this.sequence__clip__leading  = 0;
    this.sequence__clip__trailing = 0;
    this.sequence__clip__width    = 8;
    this.sequence__clip__length   = 100000;
    this.sequence__clip__lock     = 0;
    this.sequence__clip__visible  = 100000;
    this.__words = new Array();
  }

  set( sequence )
  {
    //console.log( 'sequencelength=', sequence.length );
    this.sequence = {
      clip__blob      : sequence,
      clip__focus     : '',
      clip__leading   : '',
      clip__trailing  : '',
    };
    this.__words = new Array();
  }

  set__offset( n )
  {
    this.sequence__clip__offset = n;
  }

  add__offset( n )
  {
    this.sequence__clip__offset += n;
  }

  set__leading( n )
  {
    this.sequence__clip__leading = n;
  }

  set__trailing( n )
  {
    this.sequence__clip__trailing = n;
  }

  set__width( n )
  {
    this.sequence__clip__width = n;
  }

  set__length( n )
  {
    this.sequence__clip__length = n;
  }

  set__visible( n )
  {
    this.sequence__clip__visible = n;
  }

  set__lock( on = 1 )
  {
    this.sequence__clip__lock = on;
    if ( on )
      this.sequence__clip__lock__length = this.sequence__clip__end - this.sequence__clip__start;
  }

  is__locked()
  {
    return this.sequence__clip__lock;
  }

  frame()
  {
    //if ( !this.sequence.clip__blob.length )
    //  return;

    this.sequence__clip__start  = Math.max( 0, this.sequence__clip__offset );
    this.sequence__clip__end    = Math.max( 0, this.sequence.clip__blob.length + this.sequence__clip__offset );
    if ( this.sequence__clip__end > this.sequence.clip__blob.length ) // can't extend past the blob
      this.sequence__clip__end = this.sequence.clip__blob.length;
    if ( this.sequence__clip__start > this.sequence__clip__end )
      this.sequence__clip__start = this.sequence__clip__end;

    // clip to length
    if ( this.sequence__clip__end - this.sequence__clip__start > this.sequence__clip__length )
      this.sequence__clip__end = this.sequence__clip__start + this.sequence__clip__length;
    if ( this.sequence__clip__lock )
    {
      //console.log( 'sequence__clip__end=', this.sequence__clip__end );
      //console.log( 'sequence__clip__start=', this.sequence__clip__start );
      this.sequence__clip__end = this.sequence__clip__start + this.sequence__clip__lock__length;
      if ( this.sequence__clip__end > this.sequence.clip__blob.length ) // can't extend past the blob
      {
        this.sequence__clip__end   = this.sequence.clip__blob.length;
        this.sequence__clip__start = Math.max( 0, this.sequence__clip__end - this.sequence__clip__lock__length );
        //console.log( 'sequence__clip__end=', this.sequence__clip__end );
        //console.log( 'sequence__clip__start=', this.sequence__clip__start );
      }
    }
  }

  build()
  {
    this.frame();

    // copy focus clip
    var s = '';
    var i = 0;
    var amount = this.sequence__clip__end - this.sequence__clip__start;
    if ( amount > this.sequence__clip__visible )
      amount = this.sequence__clip__visible;
    this.sequence__clip__height = Math.ceil( amount / this.sequence__clip__width );

    this.sequence.clip__window = '';
    this.sequence.clip__focus = '';
    var p__a = this.sequence__clip__start;
    var p__b = this.sequence__clip__start + amount;
    for (
      i = p__a;
        i < p__b;
          i++ )
    {
      this.sequence.clip__window += this.sequence.clip__blob[ i ];
      this.sequence.clip__focus  += this.sequence.clip__blob[ i ];
    }
    for (
      i = p__b;
        i < this.sequence__clip__end;
          i++ )
    {
      this.sequence.clip__focus += this.sequence.clip__blob[ i ];
    }
    this.sequence.clip__leading = '';
    this.sequence.clip__trailing = '';

    // copy leading clip
    if ( this.sequence__clip__start > 0 )
    {
      var a = this.sequence__clip__start - this.sequence__clip__leading;
      if ( a < 0 )
        a = 0;

      var b = this.sequence__clip__start;
      var i = 0;
      var s = '';
      for (
        i = a;
          i < b;
            i++ )
        s += this.sequence.clip__blob[ i ];
      this.sequence.clip__leading = s;
      //console.log( 'clip__leading=', this.sequence.clip__leading );
      if ( this.__NEODNA__ERRORS )
      {
        //console.log(  );
        console.log(
                     'a=' + Math.max( 0, this.sequence__clip__offset ) + ', '
                   + 'b=' + Math.max( 0, this.sequence__clip__leading + this.sequence__clip__offset ) + ', '
                   + 'offset=' + this.sequence__clip__offset
                 );
        console.log( 'setting leading clip to s=', this.sequence.clip__leading );
      }
    }

    var end = Math.min( this.sequence__clip__length, this.sequence.clip__blob.length );
    if ( p__b < end )
    {
      var a = p__b;
      var b = Math.min( a + this.sequence__clip__trailing, end );
      b = Math.min( -this.sequence__clip__offset, b );
      var i = 0;
      var s = '';
      for (
        i = a;
          i < b;
            i++ )
        s += this.sequence.clip__blob[ i ];
      this.sequence.clip__trailing = s;
    }
  }

  getwidth()
  {
    return this.sequence__clip__width;
  }

  getheight()
  {
    return this.sequence__clip__height;
  }

  get()
  {
    return this.sequence;
  }

  focus()
  {
    return this.sequence.clip__focus;
  }

  blob()
  {
    return this.sequence.clip__blob;
  }

  words( n, array )
  {
    this.__words = new Array();
    var blob = this.blob();
    var sequence = '';
    if ( n == 2 )
    {
      var word = '';
      var i = 0;
      for (
        i = 0;
          i < blob.length;
            i++ )
      {
        word += blob[ i ];
        if ( word.length == 2 )
        {
          switch ( word )
          {
            case '00': sequence += array[ 0 ]; break;
            case '01': sequence += array[ 1 ]; break;
            case '10': sequence += array[ 2 ]; break;
            case '11': sequence += array[ 3 ]; break;
          }
          word = '';
        }
      }
      this.set( sequence );
    }
    else
    {
      var word = '';
      var i = 0;
      for (
        i = 0;
          i < blob.length;
            i++ )
      {
        word += blob[ i ];
        if ( word.length == n )
        {
          this.__words.push( word );
          word = '';
        }
      }
    }
  }

  packets( sequence__clip )
  {
    //console.log( 'packets() sequence__clip=', sequence__clip );
    var clip = sequence__clip.get();
    this.sequence.clip__blob = '';
    var packet__size = 216;
    if ( sequence__clip.sequence__clip__start > 0 )
    {
      //console.log( sequence__clip );
      var packet__scope = sequence__clip.sequence__clip__start;
      //console.log( 'packet scope=', packet__scope );
      //console.log( 'packet calc=', packet__scope / packet__size );
      var n = Math.floor( packet__scope / packet__size );
      var i = 0;
      for (
        i = 0;
          i < n;
            i++
      )
      {
        this.sequence.clip__blob += '1';
      }
      //if ( n > 0 )
      //  console.log( 'n leading packets=', n );
    }
  }

  packets__right( sequence__clip )
  {

  }

  to( index )
  {
    this.sequence__clip__offset = index;
    this.build();
  }
}
