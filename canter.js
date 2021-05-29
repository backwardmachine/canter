function __canteroll__caoi( unit, canvas, block )
{
  var elem = document.getElementById( canvas.nest );
  canvas.context = elem.getContext( "2d" );

  var char = block.data.char;
  if ( char == '-1' )
    return;
  else if ( char == '0' )
    canvas.context.fillStyle = '#000000';
  else if ( char == '1' )
    canvas.context.fillStyle = '#ffffff';

  var index = parseInt( block.data.word, 2 );
  var code = library[ index ];
  if ( code )
  {
    var color = code.color;
    canvas.context.fillStyle = color;
  }

  __canteroll__caoi__core( unit, canvas );
}

function __canteroll__caoi__core( unit, canvas )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;
  canvas.context.fillRect(
    ( unit.x * spx ),
    ( unit.y * spy ),
    spx,
    spy );
}

var __canteroll__forward__interval  = 0;
var __canteroll__forward__moment    = 0;
var __canteroll__forward__on        = 0;

function __canteroll__forward__fn()
{
  var interval = 1;
  var i;
  for (
    i = 0;
      i < interval;
        i++
  )
  {
    haidentot.forward();
    stack.sequence.add__offset( __CANTER__WORDLENGTH );
    stack.update();
    stack.draw( 1 );
    __canteroll__draw__codes( stack );
  }
  haidentot.draw( 0 ); // draw modified units only
}

function __canteroll__forward( e )
{
  clearInterval( __canteroll__forward__interval );
  if ( __canteroll__forward__on )
  {
    e.target.style.backgroundImage = "url( './style/canter__rightarrow__plain.png' ) ";
    __canteroll__forward__on = 0;
  }
  else {
    e.target.style.backgroundImage = "url( './style/canter__rightarrow__hover.png' ) ";
    __canteroll__forward__interval = setInterval( __canteroll__forward__fn, 100 );
    __canteroll__forward__on = 1;
  }
}

function __canteroll__import( e )
{
  document.getElementById( "canter__canteroll__import__file" ).click();
}

function __canteroll__import__file( e )
{
  var reader = new FileReader();
  reader.onload = function( event )
  {
    var text = event.target.result;
    __canteroll__import__text( text );
  };

  if ( event.target.files[ 0 ] )
    reader.readAsText( event.target.files[ 0 ] );
}

function __canteroll__import__text( list )
{
  list       = list.replace( /[\n\r\s]/g, '' );
  var words  = list.split( "," );
  var data   = '';
  var frames = new Array();

  for ( let word of words )
  {
    var code = library[ word ];
    frames.push( 'code__' + code.name );
    var num = Number( word );
    var b = num.toString( 2 );
    b = b.padStart( __CANTER__WORDLENGTH, '0' );
    data += b;
  }

  stack.set( data );
  stack.words( __CANTER__WORDLENGTH );
  stack.update();
  stack.draw( 1 );
  __canteroll__draw__codes( stack );
  haidentot.canter( frames );
}

function __canteroll__draw__codes( stack )
{
  var words = stack.sequence.__words;
  var offset = Math.floor( stack.sequence.sequence__clip__offset / __CANTER__WORDLENGTH );
  var i = 0;
  var n = 0;
  for (
    i = offset;
      i < offset + Math.min( 10, words.length );
        i++ )
  {
    var word = words[ i ];
    var x = 0;
    var y = n;
    var name = '';
    var index = parseInt( word, 2 );
    var code = library[ index ];
    if ( code )
      name = code.name;

    var canvas = stack.canvas;
    var context = canvas.context;
    canvas.context.font = canvas.__cfg.text.font;
    canvas.context.fillStyle = '#ffffff';
    canvas.context.fillText(
      name,
      canvas.__cfg.text.left + ( canvas.pixels.x * ( x + 0 ) ),
      canvas.__cfg.text.top  + ( canvas.pixels.y * ( y + 1 ) )
    );
    n++;
  }
}

function __canteroll__load__codes()
{
  var library = new Array();
  var i = 0;
  for ( var key in Handler )
  {
    library.push( {
      id: i++,
      name: key.substring( 6 ),
      color: getRandomColor()
    } );
  }
  return library;
}

function __canteroll__base( n )
{
  var s = '';
  var i = 0;
  for (
    i = 0;
      i < n;
        i++ )
    s += 1;
  return s;
}
