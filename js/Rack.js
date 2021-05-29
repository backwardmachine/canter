class neodna__Unit
{
	constructor( parent, posX, posY )
	{
		this.parent 	 = parent;
		this.x 	   		 = posX;
		this.y	   		 = posY;
		this.caoi			 = 0; // way
		this.__flags   = new neodna__Flags();
		this.modified  = 0;
		this.color     = 0;
	}

	pos()
	{
		return ( this.y * this.parent.sX ) + this.x;
	}

	draw( canvas, block )
	{
		if ( !this.modified )
			return;

		if (
		     this.caoi
			&& this.caoi.length )
		{
			for ( let caoi of this.caoi )
				caoi( this, canvas, block );
		}

		this.modified = 0;
		if ( block )
			block.modified = 0;
	}

	within( region )
	{
		if ( this.x >= region.left
			&& this.y >= region.top
			&& this.x <  region.right
			&& this.y <  region.bottom )
			return 1;
		return 0;
	}
}

class neodna__Rack
{
	constructor( x, y, parent )
	{
		this.parent = parent;
		this.sX = x;
		this.sY = y;
		this.units   = new Array();
		this.amount  = this.sX * this.sY;
		this.palette = [ 0, 0, 0, 0 ];
	}

	build()
	{
		this.populate( this.amount );
	}

	data( binary )
	{
		var i = 0;
		var k = 0;
		var wordLength = 1; // two bits per word
		for( let unit of this.units )
		{
			//if ( binary.length < ( i + wordLength ) ) // complete unit data only
			//	break;

			var word = '';
			var n = 0;
			while ( n < wordLength )
			{
				if ( typeof binary[ i + n ] === 'undefined' )
					word += '-1';
				else
					word += binary[ i + n ];
				n++;
			}
			//console.log( word );
			unit.data = word;
			i+=n;
			k++;
		}

		console.log( 'updated ' + k + ' units')
	}

	populate( amount )
	{
		var i = 0;
		for ( i = 0;
			i < amount;
			  i++ )
		{

			var x = i % this.sX;
			var y = Math.floor( i / this.sX );
			//console.log( 'x=' + x + ', y=' + y );
			var unit = new neodna__Unit( this, x, y );
			this.units.push( unit );

		}
	}

	convert( input ) // ie. "This is the input"
	{
		var output = "";
		var i = 0;
	  for ( i = 0;
			i < input.length;
				i++ ) {
	      output += data[ i ].charCodeAt(0).toString(2) + " ";
	  }
		return output;
	}

	parse( word ) // tubits 00 01 10 11
	{
		switch ( word )
		{
			case '00': return 0;
			case '01': return 1;
			case '10': return 2;
			case '11': return 3;
		}

		return -1;
	}

	load( binary )
	{
		var i = 0;
		var k = 0;
		var wordLength = 2; // two bits per word
		for( let unit of this.units )
		{
			if ( binary.length < ( i + wordLength ) ) // complete unit data only
				break;

			var word = '';
			var n = 0;
			while ( n < wordLength )
			{
				word += binary[ i + n ];
				n++;
			}
			console.log( word );
			unit.face = this.parse( word );
			i+=n;
			k++;
		}
		//console.log( this.parent );
	}

	getXY( x, y )
	{
		// out of bounds, nothing there
		if ( x < 0 ) return 0;
		if ( y < 0 ) return 0;
		if ( x >= this.sX ) return 0;
		if ( y >= this.sY ) return 0;

		var n = ( y * this.sX ) + x;
		return this.units[ n ];
	}

	//drawRegion( )



	draw( canvas, data = 0, f = 0 )
	{
		var n = 0;
		var i = 0;
		for ( i = 0;
			i < this.units.length;
			  i++ )
		{
			var unit = this.units[ i ];
			if ( canvas.region
				&& !unit.within( canvas.region ) )
				continue;
			if ( f )
				unit.modified = 1;
			else if (
					 data.blocks[ i ]
				&& data.blocks[ i ].modified )
				unit.modified = 1;
			if ( unit.modified )
			{
				var __data = '';
				if ( data.blocks[ i ]
					&& data.blocks[ i ].data )
					__data = data.blocks[ i ];

					unit.draw( canvas, __data );
					unit.modified = 0;
					n++;
			}
		}

		canvas.drawn = n;
		//__debug.draw.messages.push( 'drawn n=' + n + ' units with f=' + f );
		//__debug.draw.n++;
		//console.log( 'drawn n=' + n + ' units with f=' + f );
		//console.log( 'rack=', this );
	}

	paint( palette )
	{
		this.palette = palette;
	}
}
