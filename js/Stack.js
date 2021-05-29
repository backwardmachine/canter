class neodna__Stack
{
  constructor()
  {
    this.sequence = 0;
    this.blocks   = 0;
    this.canvas   = 0;
    this.caoi     = 0; // default
    this.container = "";
    //this.region   = 0;
  }

  set( data )
  {
    if ( this.sequence )
    {
      this.sequence.set( data );
      this.sequence.set__offset( 0 );
    }
    this.update();
  }

  update()
  {
    this.sequence.build();

    var w = this.sequence.getwidth  ();
    var h = this.sequence.getheight ();

    this.canvas.split( w, h ); // rebuild rack
    this.canvas.use  ( this.canvas.nest ); // keep nest

    this.blocks = new neodna__Blocks( w, h, this );
    this.blocks.build();
    this.blocks.data( this.sequence.focus() );

    if ( this.sequence.words.length )
      this.blocks.words(
        this.sequence
      );
  }

  click( px, py, e )
  {
    //console.log( 'e=', e );
    this.canvas.mouse.click( px, py, e );
    this.draw( 0 );
  }

  over( px, py, e )
  {
    //console.log( 'e=', e );
    //console.log( 'mouse over stack=', this );
    this.canvas.mouse.over( px, py, e );
    this.draw( 0 );
  }

  out( px, py, e )
  {
    this.canvas.mouse.out( px, py, e );
    //console.log( 'mouse left the stack' );
    var coords = this.canvas.mouse.current__over;
    //console.log( 'coords=', coords );
    if ( coords.x >= 0
      || coords.y >= 0 )
    {
      console.log( 'drawing MOUSE current__over')
      var unit = this.canvas.getXY(
        coords.x,
        coords.y
      );
      if ( unit )
      {
        unit.__flags.endflag( __STACK__MOUSE__OVER );
        unit.modified = 1;
      }
    }

    this.draw( 0 );
  }

  offset( n )
  {

  }

  clear() // clear via blocks
  {
    //this.canvas.clear();
    this.blocks.clear();
  }

  // set the region of the haidentot for drawing
  region( left, top, right, bottom )
  {
    this.canvas.region = {
      left   : left,
      top    : top,
      right  : right,
      bottom : bottom
    };
  }

  resize()
  {
    var elem = document.getElementById( this.container );
    elem.style.width  = this.canvas.width  + 'px';
    elem.style.height = this.canvas.height + 'px';
    elem.width        = this.canvas.width;
    elem.height       = this.canvas.height;
  }

  height()
  {
    return this.canvas.height;
  }

  width()
  {
    return this.canvas.width;
  }

  words( n )
  {
    this.sequence.words( n );
    if ( this.blocks.length && this.sequence.words.length )
      this.blocks.words( this.sequence );
  }

  // draw the data
  draw( f = 0 )
  {
    if ( this.canvas )
      this.canvas.draw( this.blocks, f );
  }

}
