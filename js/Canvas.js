var __init__vars__canvas = {
  nest:      0,
  n__x:      0,
  n__y:      0,
  unit__px:  0,
  unit__py:  0
}

function __init__canvas( vars )
{
  var elem = document.getElementById( vars.nest );
  elem.onselectstart = function () { return false; }

  var canvas = new neodna__Canvas();
  var canvasNest = vars.nest;
  canvas.split (
    vars.n__x,
    vars.n__y
  ); // creates a rack
  canvas.span  (
    vars.unit__px,
    vars.unit__py
  );
  canvas.use   ( canvasNest );
  canvas.caoi  ( caoi__binary__clean );
  canvas.mouse = new neodna__Mouse();
  canvas.mouse.fns.click = function( px, py )
  {
    //console.log( 'click at px=' + px + ', py = ' + py );
    var unit = this.getXYp( px, py );
  }.bind( canvas );
  canvas.mouse.fns.over = function( px, py )
  {
    //console.log( 'mouse is over canvas' );
    var unit = this.getXYp( px, py );
    unit.__flags.setflag( __STACK__MOUSE__OVER );
  }.bind( canvas );
  return canvas;
}

class neodna__Canvas
{
	constructor()
	{
		this.width  		= 100;
		this.height 		= 100;
		this.background = '#0077aa';
		this.nest				= '';
		this.rack       = 0;
		this.mouse 			= new neodna__Mouse( this );
		this.object     = 0;
		this.pixels 		= { x: 25, y: 25 };
		this.caoi__     = 0;
		this.context    = 0;
		this.buffer     = 0;
		this.region     = 0;
		this.intensity  = 0;
		this.intensity__on = 0;
		this.drawn 			= 0;
    this.border     = 0;
    this.data       = 0;
    this.__cfg      = 0;
	}

	use( nest )
	{
		this.nest 	= nest;
		this.object = document.getElementById( nest );
		if ( !this.object )
			console.error( 'missing object for nest=', nest );
		var width  	= this.width;
		var height 	= this.height;

		if ( this.rack )
		{
			//console.log( 'setting width and height to rack proportions' );
			width  = ( this.rack.sX * this.pixels.x );
			height = ( this.rack.sY * this.pixels.y );
		}
		this.object.style.width  = width + 'px';
		this.object.style.height = height + 'px';
		this.object.width        = width;
		this.object.height       = height;
		this.width  = width;
		this.height = height;


	}

/*
	using( data ) // use a data set
	{
		this.data = data;
	}
*/
	split( x, y ) // splits the canvas into a rack
	{
		this.rack = new neodna__Rack( x, y, this );
		this.rack.build();
		this.caoi( this.caoi__ );
	}

	span( px, py )
	{
		this.pixels = { x: px, y: py };
	}

  at( index )
  {
    return this.rack.units[ index ];
  }

	getXY( x, y )
	{
		return this.rack.getXY( x, y );
	}

	getXYp( px, py )
	{
		var x = Math.floor( px / this.pixels.x );
		var y = Math.floor( py / this.pixels.y );
		return this.getXY( x, y );
	}

  coords( index )
  {
    var x = 0;
    var y = 0;
    if ( this.rack.sX
      && this.rack.sY )
    {
      y = Math.floor( index / this.rack.sX );
      x = index - ( y * this.rack.sX );
    }
    return { x: x, y: y };
  }

	index( x, y )
	{
		if ( !this.rack )
			return -1;
		return ( y * this.rack.sX ) + x;
	}

	draw__init()
	{
		this.context = this.object.getContext( '2d' );
		this.buffer  = this.context.getImageData(
			0,
			0,
			this.width,
			this.height
		);
	}

	draw__buffer() // dont forget draw__init()
	{
		if ( !this.buffer )
			return;
		var pixels = this.buffer.data;
		var i = 0;
		for (
			i = 0;
				i < this.width * this.height;
					i++ )
		{
			var pos = i * 4;
			pixels[ pos + 0 ] = '255';
			pixels[ pos + 1 ] = '155';
			pixels[ pos + 2 ] = '200';
			pixels[ pos + 3 ] = '255';

		}

		this.context.putImageData( this.buffer, 0, 0 );
	}

  draw__border()
  {
    //console.log( 'drawing canvas for this=', this );
    var elem = document.getElementById( this.nest );
    var context = elem.getContext( '2d' );
    context.globalAlpha = 1.0;
    switch ( this.border.state )
    {
      case 0: context.fillStyle = this.border.out; break;
      case 1: context.fillStyle = this.border.over; break;
      case 2: context.fillStyle = this.border.clicked; break;
      case 3: context.fillStyle = this.border.out; break;
      case 4: context.fillStyle = this.border.selected; break;
    }
    context.fillRect( 0, 0, this.width, this.border.size );
    context.fillRect( 0, 0, this.border.size, this.height );
    context.fillRect( this.width - this.border.size, 0, this.border.size, this.height );
    context.fillRect( 0, this.height - this.border.size, this.width, this.border.size );
  }

	draw( data, f = 0 )
	{
		this.rack.draw( this, data, f );
    if ( this.border && this.border.on )
    {
      //this.draw__border();
    }
	}

	clear()
	{
		var context = this.object.getContext('2d');
    context.globalAlpha = 1.0;
		//console.log( 'clearing this=', context );
		//console.log( this );

		context.clearRect(
			0,
			0,
			this.width,
			this.height
		);
	}

	paint( array )
	{
		this.rack.paint( array );
	}

	caoi( caoi )
	{
		if ( !caoi )
			return;
		this.caoi__ = caoi;
		for ( let unit of this.rack.units )
		{
			//if ( !unit.caoi )
			unit.caoi = new Array();
			unit.caoi.push( caoi );
		}
	}
}
