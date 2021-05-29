class neodna__Animation
{
  constructor()
  {
    this.pos    = 0;
    this.words  = new Array(); // 00, 01, 10, 11 etc
    this.frames = new Array(); // code__move, code__direction etc
    this.frame  = 0;
    this.runs   = 0;
    this.canter = 0;
  }

  program( data ) // use binary to 00, 01, 10, 11 data to program
  {
    //console.log( 'programming animation with data=', data );
    //console.log( 'animation is using program=', data );
    this.words = new Array();
    var i = 0;
    var j = 0;
    var word = '';
    for (
      i = 0;
        i < data.length;
          i++ )
    {
      if ( j == 2 )
      {
        //this.tofn( word );
        this.words.push( word );
        j = 0;
        word = '';
      }
      word += data[ i ];
      j++;
    }
  }

  reset()
  {
    this.pos    = 0;
    this.frames = new Array();
    this.frame  = 0;
    this.runs   = 0;
    this.canter = 0;
  }

  forward( cursor )
  {
    if ( this.canter )
    {
      if ( cursor.frame == this.frames.length )
      {
        cursor.frames = this.frames;
        cursor.frame  = 0;
        return 0;
      }

      var name = this.frames[ cursor.frame ];
      if ( name == "code__codex" )
      {
        cursor.frame++; // skip
        return 1;
      }
      this.play( cursor );
      return 1;
    }
    else
    {
      return this.build( cursor );
    }
  }

  build( cursor )
  {
    if ( !this.words.length ) // no program
      return 0;
    if ( cursor.pos == this.words.length )
    {
      //console.log( 'reached the end of the road' );
      if ( !cursor.frames.length )
        cursor.frames = this.frames;
      this.frames = new Array();
      return 0;
    }
    var word   = this.words[ cursor.pos ];
    var result = this.extend( word, cursor ); // extend the program
    if ( result )
    {
      // play the next frame
      this.play( cursor );
      cursor.pos++;
      return 1;
    }

    return 0;
  }

  extend( __in, cursor )
  {
    var oldenscrybe = cursor.oldenscrybe;
    if ( !oldenscrybe )
      return;

    var canterroll = oldenscrybe.canterroll;
    var at = canterroll.at(
      cursor.dally.x,
      cursor.dally.y
    );

    var codex = at.object;
    if ( !codex )
      return;

    var i = 0;
    var words = Array( '00', '01', '10', '11' );
    for ( let word of words )
    {
      if ( word == __in )
      {
        //console.log( 'word=', word );
        //if ( !codex.names[ i ] ) // breaks the program!
        //  continue;
        var name = codex.names[ i ];
        if ( !name )
          name = 0;
        this  .frames.push( name );
        //cursor.frames.push( name );
        return 1;
      }
      i++;
    }
    return 0; // no more functions to add
  }

  play( cursor )
  {
    var name = this.frames[ cursor.frame ];
    if ( name == "code__chamber" )
      Handler[ "code__chamber" ]( cursor ); // WARNING: after switching chamber, execution is off
    else
    {
      if ( cursor.chamber == 0 )
      {
        if ( name )
          Handler[ name ]( cursor ); // execute now
      }
      else if ( cursor.chamber == 1 )
      {
        cursor.focus = 0;
        if ( name )
          cursor.focus = name;
        cursor.tail.feed( cursor.focus ); // store

        var r = cursor.gate.spin( cursor.maiden );
        if ( !r )
          cursor.chamber = 0;
      }
    }
    cursor.frame += 1;// * cursor.incident;
    return 1;
  }
}
