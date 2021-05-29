class neodna__Haidentot
{
  constructor( id, __cfg )
  {
    this.id = id;
    this.name = '';
    this.stack = 0;
    this.sX = __cfg.width;
    this.sY = __cfg.height;
    this.ox = 20;
    this.oy = 20;
    this.skutterer = 0;
    this.animation = new neodna__Animation();
    this.oldenscrybe = 0;
    this.oldenscrybe__id = -1;
    this.nest = 0;
    this.src = 0;
    this.src__offset = 0;
    this.__flags = new neodna__Flags();
    this.__cfg = __cfg;
  }

  init()
  {
    var sequence = '';
    var i = 0;
    for (
      i = 0;
        i < this.sX * this.sY;
          i++ )
      sequence += '0';

    this.stack = __init__stack( sequence, this.__cfg );
    this.stack.canvas = __init__stack__canvas( this.__cfg, this.sX, this.sY );
    __init__mouse( this.stack, this.__cfg.container );
    this.stack.canvas.intensity = 1;
    this.stack.canvas.intensity__on = 1;
    this.stack.update();
    if ( !this.src )
      this.src = this.stack.blocks;

    //this.skutterer = new neodna__Skutterer ( this.ox, this.oy );
    //this.skutterer.reset( this );
    this.reset();
  }

  set( sequence )
  {
    this.stack.set( sequence );
  }

  canter( frames )
  {
    this.reset();
    this.animation.canter = 1;
    this.animation.frames = frames;
  }

  attach( data, offset )
  {
    this.src         = data;
    this.src__offset = offset;
    this.skutterer.__data = this.src;
  }

  program( sequence )
  {
    var data = sequence.get();
    this.animation.program( data.clip__focus );
  }

  read()
  {
    var __src = this.src.blocks;
    var __dest = this.stack.blocks;

    for ( let block of __src )
    {
      var b = __dest.getXY(
        block.x,
        block.y
      );

      if ( b )
        b.data = block.data;
    }
  }

  forward()
  {
    if ( !this.stack )
    {
      console.log( 'please use init() before forward() is called.' );
      return 0;
    }
    if ( this.skutterer )
      return this.animation.forward( this.skutterer );
  }

  draw( f = 0 )
  {
    if ( !this.stack )
    {
      console.log( 'please use init() before draw() is called.' );
      return 0;
    }
    this.stack.draw( f );
    //this.stack.canvas.draw__buffer();
  }

  // set the region of the haidentot for drawing
  /*
  region( left, top, right, bottom )
  {
    /this.stack.region( left, top, right, bottom );
  }
  */

  clear()
  {
    this.stack.clear();
  }

  reset()
  {
    this.animation.reset();
    this.skutterer = new neodna__Skutterer ( this.ox, this.oy );
    this.skutterer.reset( this );
    this.clear();
    this.blank();
    console.log( 'reset haidentot =', this );
  }

  blank()
  {
    this.stack.canvas.intensity__on = 0;
    this.draw( 0 ); // make sure we draw cleared pixels
    this.stack.canvas.intensity__on = 1;
  }

  play()
  {
    return;
    /*
  	this.reset();
  	var j = 0;
  	for (
  		j = 0;
  			j < 10;
  				j++ )
  	{
  		this.complete ();
  	}

    console.log( 'gaaden=', gaaden );
  	//console.log( 'played ' + ( i * j ) + ' frames ending at frame=' + haidentot.skutterer.frame );
    */
  }

  link( oldenscrybe )
  {
    console.log( 'changing haidentot link to=', oldenscrybe );

    var oldenscrybe__previous = this.oldenscrybe;
    if ( oldenscrybe__previous
      && oldenscrybe__previous.id == oldenscrybe.id )
      return; // no change
    this.oldenscrybe = oldenscrybe;

    oldenscrybe.subscribe ( this );
    if ( oldenscrybe__previous )
      oldenscrybe__previous.unsubscribe ( this );

    var __haidentot = {
      id:          this.id,
      name:        this.name,
      color:       this.color,
      oldenscrybe: this.oldenscrybe.id
    };
    db__haidentot__update( __haidentot );
  }

  export()
  {
    console.log( 'exporting' );
    if ( this.oldenscrybe
      && this.oldenscrybe.canterroll )
    {
      console.log( 'exporting oldenscrybe=', this.oldenscrybe );
      var canterroll = this.oldenscrybe.canterroll;
      var text = '';
      var i    = 0;
      var sum  = 0;
      var m    = 0;
      if ( this.skutterer && !this.skutterer.frames.length )
      {
        while ( this.forward() ) // play through completely once
          continue;
        console.log( 'played through all frames' );
        //console.log( 'played through, frames = ', this.skutterer.frames );
      }

      if ( this.skutterer && this.skutterer.frames.length )
      {
        var i = 0;
        var ids = new Array();
        for ( let frame of this.skutterer.frames )
        {
          var name = frame.substring( 6 );
          for ( let code of gaaden.pandeminium.book.codes )
            if ( code.name == name )
              ids.push( code.id );
        }

        console.log( ids );
        if ( ids.length )
        {
          text += ids[ 0 ];
          sum += ids[ 0 ];
          for ( let id of ids )
          {
            text += ',';
            text += id;
            sum += id;
          }

          var m = ends( ids );
          function ends( ids )
          {
            var i;

            var s = 0;
            for (
              i = 0;
                i < Math.min( ids.length, 8 );
                  i++ )
            {
              console.log( s );
              s = ( s + ids[ i ] ) / 2;
            }

            var e = 0;
            for (
              i = Math.min( ids.length - 1, 7 );
                i >= 0;
                  i-- )
              e = ( e + ids[ i ] ) / 2;

            return {
              s: trim( s ),
              e: trim( e )
            };

            function trim( m )
            {
              m = m.toString();
              m = m.replace( /\./, 'd' );
              return m;
            }
          }

          console.log( m );
          var name = m.s + 'm' + m.e + 's' + sum.toString();
          download( text, name + '.canter', 'text/plain' );
        }
      }
    }
  }
}
