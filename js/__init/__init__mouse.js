function __init__mouse( stack, name )
{
  var elem = document.getElementById( name );
  elem.onclick = function ( e )
  {
    var pixel = getpixel( e );
    this.click( pixel.px, pixel.py, e );
  }.bind( stack );

  elem.onmousemove = function ( e )
  {
    var pixel = getpixel( e );
    this.over( pixel.px, pixel.py, e );
  }.bind( stack );

  elem.onmouseout = function ( e )
  {
    var pixel = getpixel( e );
    this.out( pixel.px, pixel.py, e );
  }.bind( stack );
}
