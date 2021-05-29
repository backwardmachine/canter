class neodna__Block
{
	constructor( posX, posY, parent )
	{
		this.parent 	 = parent;
		this.x 	   		 = posX;
		this.y	   		 = posY;
		this.data      = '';
		this.modified  = 0;
		this.opacity   = 1;
	}

	pos()
	{
		return ( this.y * this.parent.sX ) + this.x;
	}
}

// contains the data via a set of blocks but is seperated from the canvas
// data manipulation occurs here
class neodna__Blocks
{
  constructor( x, y, parent )
  {
    this.parent   = parent;
    this.sX       = x;
    this.sY       = y;
    this.blocks   = new Array();
    this.amount   = this.sX * this.sY;
    //this.canvas   = 0; // display sequence as a canvas
  }

  build()
  {
    this.populate( this.amount );
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
      var block = new neodna__Block( x, y, this );
      this.blocks.push( block );
    }
  }

  getXY( x, y )
  {
    // out of bounds, nothing there
    if ( x < 0 ) return 0;
    if ( y < 0 ) return 0;
    if ( x >= this.sX ) return 0;
    if ( y >= this.sY ) return 0;

    var n = ( y * this.sX ) + x;
    return this.blocks[ n ];
  }

	data( binary )
	{
		var i = 0;
		var k = 0;
		var wordLength = 1; // two bits per word
		for( let block of this.blocks ) // DO THIS IN REVERSE ORDER FOR LEADING STACK
		{
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
			block.data = word;
			i+=n;
			k++;
		}
	}

	words( sequence )
	{
		var words   = sequence.__words;
		var offset  = sequence.sequence__clip__offset;
		var visible = sequence.sequence.clip__window.length;
		if ( offset < 0 )
			offset = 0;
		if ( !words.length )
			return 0;
		var offset__w = Math.floor( offset / words[ 0 ].length );
		var offset__c = offset - ( offset__w * words[ 0 ].length );
		//console.log( 'offset__w=', offset__w );
		//console.log( 'offset__c=', offset__c );
		var blocks = this.blocks;
		var n = 0;
		if ( words[ offset__w ] )
			word( words[ offset__w ], offset__c );

		var i = 0;
		for (
		 	i = offset__w + 1;
				i < words.length;
			 		i++ )
			word( words[ i ], 0 );

		function word( word, start )
		{
			var i = 0;
			for (
				i = start;
					i < word.length;
						i++ )
				block( word, i );
		}

		function block( word, i )
		{
			var block = blocks[ n ];
			if ( !block )
				return;
			block.data = {
				word:  word,
				index: i,
				char:  word[ i ]
			};
			n++;
		}
	}

	data__push()
	{
		if ( !this.blocks.length )
			return;
		// push all the data to the back
		var start = 0;
		var n = 0;
		var i = 0;
		for (
			i = this.blocks.length - 1;
				i >= 0;
			 		i-- )
		{
			var block = this.blocks[ i ];
			if ( block.data != '-1' )
			{
				start = i;
				break;
			}
			n++;
		}

		for (
		 	i = start;
		 		i >= 0;
					i-- )
		{
			var block = this.blocks[ i ];
			this.blocks[ i + n ].data = block.data;
		}

		for (
			i = 0;
				i < n;
					i++ )
			this.blocks[ i ].data = '-1';
	}

	clear()
	{
		for ( let block of this.blocks )
		{
			block.data = '0';
			block.modified = 1;
		}
	}
}
