class neodna__Pictures
{
  constructor()
  {
    this.pictures = new Array();
    this.t = 0;
    this.m = 1;
  }

  add()
  {
    var picture = new neodna__Picture();
    this.pictures.push( picture );
    return picture;
  }

  get( x )
  {
    if ( this.pictures[ this.t ] )
      return this.pictures[ this.t ];
    return 0;
  }

  spin( x )
  {
    this.t = ( this.pictures.length + this.t + x ) % this.pictures.length;
    return this.focus();
  }

  focus()
  {
    if ( this.pictures[ this.t ] )
      return this.pictures[ this.t ];
    return 0;
  }
}

class neodna__Picture
{
  constructor()
  {
    this.bits = 2;
    this.blocks = new Array();
    this.words = new Array();
    this.length = 0;
    this.finished = 0;
  }

  add( b )
  {
    if ( this.length && this.length.open() )
    {
      var block = {
        b: b,
        word: 0
      };
      this.blocks.push( block );
      return block;
    }
    return 0;
  }

  done()
  {
    this.finished = 1;
    this.form();
    console.log( 'picture is finished=', this );
  }

  form()
  {
    this.words = new Array();

    var word = new Array();
    var i = 0;
    for (
      i = 0;
        i < this.blocks.length;
          i++ )
    {
      word.push( this.blocks[ i ] );
      this.blocks[ i ].word = word;
      if ( word.length == this.bits )
      {
        this.words.push( word );
        word = new Array();
      }
    }
  }
}
