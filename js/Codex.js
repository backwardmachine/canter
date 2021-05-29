function getb( p )
{
  if ( p == 1 )
    return 1;
  else if ( p == -1 )
    return 0;
  return -1;
}

var Handler = {};

Handler.code__move = function ( cursor ) {
  switch ( cursor.direction ) // by how much?
  {
    case 0: cursor.x += 1; break;
    case 1: cursor.y += 1; break;
    case 2: cursor.x -= 1; break;
    case 3: cursor.y -= 1; break;
  }
}

Handler.code__write = function ( cursor ) {
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    var x = getb( cursor.maiden );
    block.data = x;
    block.modified = 1;
  }
}

Handler.code__direction = function ( cursor ) {
  cursor.direction = ( 4 + cursor.direction + cursor.maiden ) % 4;
}

Handler.code__maiden = function ( cursor ) {
  if ( ! cursor.escape )
    cursor.maiden = ( cursor.maiden == 1 ) ? -1 : 1;
}

Handler.code__escape = function ( cursor ) {
  cursor.escape = cursor.escape ? 0 : 1;
}

Handler.code__codex = function ( cursor ) { // need to load the codex in by default ( ie. the brain )
  var canterroll = cursor.canterroll();
  cursor.dally.x = ( canterroll.boundary.x
    + cursor.dally.x
    + cursor.maiden )
  % canterroll.boundary.x;
}

Handler.code__packet = function ( cursor ) {
  var x = getb( cursor.maiden );
  cursor.packets.settle( x, 1 );
}

Handler.code__origin = function ( cursor ) {
  cursor.x = cursor.ox;
  cursor.y = cursor.oy;
}

Handler.code__change = function ( cursor ) { // convert 1 to -1
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    if ( block.data == '1' )
      block.data = '0';
    else if ( block.data == '0' )
      block.data = '1';
    block.modified = 1;
  }
}

Handler.code__angles = function ( cursor )
{
  var x = getb( cursor.maiden );
  cursor.skittle.slope( x );
}

Handler.code__slope = function ( cursor )
{
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    if ( block.data == '1' )
      cursor.skittle.slope( 1 );
    else if ( block.data == '0' )
      cursor.skittle.slope( -1 );
  }
}

Handler.code__spin = function ( cursor )
{
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    if ( block.data == '1' )
      cursor.skittle.turn( 1 );
    else if ( block.data == '0' )
      cursor.skittle.turn( -1 );
  }
}

Handler.code__replicate = function ( cursor )
{
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    if ( block.data == '1' )
      cursor.packets.settle( 1, 1 );
    else if ( block.data == '0' )
      cursor.packets.settle( 0, 1 );
  }
}

Handler.code__adjust = function ( cursor ) {
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    var x = getb( cursor.maiden );
    if ( Number( block.data ) == x )
      cursor.packets.settle( 1, 1 ); // happens when
  }
}

Handler.code__set = function ( cursor ) {
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    if ( block.data == '1' )
      cursor.skittle.set( cursor.packets, 1, 1 ); // happens when
    else if ( block.data == '0' )
      cursor.skittle.set( cursor.packets, 1, 0 );
  }
}

/* use a trigger and set
Handler.code__when = function ( cursor ) {
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    if ( block.data == '1' )
      cursor.packets.array[ cursor.skittle ].set( 1 ); // happens when
    else if ( block.data == '0' )
      cursor.packets.array[ cursor.skittle ].set( 0 );
  }
}
*/

Handler.code__extract = function ( cursor ) {
  var n = 0;
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
  {
    cursor.skittle.reset();
    cursor.skittle.go( cursor.packets, 1 );
    var n = cursor.skittle.binary();
    var b = getb( cursor.maiden );
    if ( b )
      block.data = n ? '1' : '0';
    else
      block.data = n ? '0' : '1';
    block.modified = 1;
  }
}


// note: this fn causes jumps ( ie. the fn isn't called for a while and the cursor runs negative )
Handler.code__climb = function ( cursor ) {
  cursor.x += 1;
  if ( cursor.x >= cursor.nX )
  {
    cursor.x = 0;
    cursor.y += 1;
    if ( cursor.y >= cursor.nY )
      cursor.y = 0;
  }

  if ( cursor.nY == 0 )
    cursor.y = 0;
  if ( cursor.nX == 0 )
    cursor.x = 0;
}

Handler.code__fall = function ( cursor ) {
  cursor.x -= 1;
  if ( cursor.x < 0 )
  {
    cursor.x = cursor.nX - 1;
    cursor.y -= 1;
    if ( cursor.y < 0 )
      cursor.y = cursor.nY - 1;
  }
  if ( cursor.nY == 0 )
    cursor.y = 0;
  if ( cursor.nX == 0 )
    cursor.x = 0;
}

Handler.code__opacity = function ( cursor ) {
  cursor.opacity += cursor.maiden * 0.005;
  if ( cursor.opacity > 1 )
    cursor.opacity = 0;
  if ( cursor.opacity < 0 )
    cursor.opacity = 1;
}

Handler.code__intensity = function ( cursor ) {
  var canvas = cursor.__canvas;
  canvas.intensity += cursor.maiden * 0.005;
  if ( canvas.intensity > 1 )
    canvas.intensity = 0;
  if ( canvas.intensity < 0 )
    canvas.intensity = 1;
}

Handler.code__presence = function ( cursor ) {
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
    block.opacity += cursor.maiden * 0.005;
  if ( block.opacity > 1 )
    block.opacity = 0;
  if ( block.opacity < 0 )
    block.opacity = 1;
}

Handler.code__height = function ( cursor ) {
  var block = cursor.__data.getXY( cursor.x, cursor.y );
  if ( block )
    block.opacity = cursor.opacity;
}

Handler.code__tail = function ( cursor ) {
  var x = getb( cursor.maiden );
  if ( x )
    cursor.tail.extend();
  else
    cursor.tail.shorten();
}

Handler.code__chamber = function ( cursor ) {
  cursor.chamber = cursor.chamber ? 0 : 1;
}

Handler.code__gate = function ( cursor ) {
  cursor.gate.spin( cursor.maiden );
}

Handler.code__burn = function ( cursor ) {
  var name = cursor.tail.eject(); // use consumption and leave underlying program alone
  if ( name )
    Handler[ name ]( cursor );
}

Handler.code__form = function ( cursor ) {
  cursor.packets.form();
}

Handler.code__tilt = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.tilt( b );
}

Handler.code__flow = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.flow( b );
}

Handler.code__settle = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.settle( b, 1 );
}

Handler.code__place = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.place( b );
}

Handler.code__fire = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.fire( 1 );
}

Handler.code__seperate = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.seperate( b );
}

Handler.code__breaker = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.breaker( b, 1, 0 );
}

Handler.code__clear = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.clear( b, 1 );
}

Handler.code__nip = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.nip( b, 1 );
}

Handler.code__breakdown = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.breakdown( b );
}

Handler.code__tiny = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.tiny( b, 1 );
}

Handler.code__shorten = function ( cursor ) {
  var b = getb( cursor.maiden );
  cursor.packets.shorten( b, 1 );
}

Handler.code__canvas = function ( cursor ) {
  var picture = cursor.pictures.focus();
  if ( picture && picture.length && !picture.finished )
    picture.length.spin( 1 );
}

Handler.code__picture = function ( cursor ) {
  var picture = cursor.pictures.focus();
  if ( !picture )
    picture = cursor.pictures.add();
}

Handler.code__pgate = function ( cursor ) {
  var picture = cursor.pictures.focus();
  if ( picture && !picture.length )
  {
    picture.length = new neodna__Gate();
    picture.length.potential( 1000 );
  }
}

Handler.code__probe = function ( cursor ) {
  var picture = cursor.pictures.focus();
  if ( picture && !picture.finished )
  {
    cursor.skittle.reset();
    cursor.skittle.go( cursor.packets, 1 );
    var b = cursor.skittle.binary();
    var success = picture.add( b );
    if ( !success )
    {
      picture.done();
      cursor.pictures.spin( cursor.maiden );
    }
  }
}

Handler.code__page = function ( cursor ) {
  cursor.pictures.spin( cursor.maiden );
}

class neodna__PdmnCodex
{
	constructor( id, color )
	{
		this.id      = id;
    this.color   = color;
		this.codes   = new Array();
		this.length  = 4;
    this.names   = new Array();
	}

	add( code )
	{
		if ( this.codes.length >= this.length )
			console.log( 'codex is full, failed to add...');
		else
    {
			this.codes.push( code );
      this.names = new Array();
      for ( let code of this.codes )
      {
        var name = Object.keys( Handler )[ code ];
        this.names.push( name );
      }
    }
	}

	draw()
	{
		var elem = document.getElementById( "neodna__pdmn__codex" + this.id );
		var html = this.html();
		elem.innerHTML = html;
	}

	html()
	{
		var html = '';
		var i = 0;
		for ( let id of this.codes )
		{
      var code = pandeminium.book.get( id );
			var name = Object.keys( Handler )[ code.id ];
      if ( !name )
        continue;

			html += '<div id="neodna__pdmn__codex' + this.id + '__code' + i
			+ '" class="neodna__pdmn__codex__code" style="background:' + code.color
      + '"><div class="neodna__pdmn__code__inner">' + name.substring( 6 ) + '</div></div>';
			i++;
		}
		return html;
	}
}
