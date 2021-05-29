function __init__stack__canvas( __cfg, width, height )
{
  var elem = document.getElementById( __cfg.nest );
  if ( elem )
    elem.onselectstart = function () { return false; }

  var canvas = new neodna__Canvas();
  canvas.__cfg = __cfg;
  canvas.__cfg.words = {
    n: 1,
    array: '01'
  };
  canvas.split (
    width,
    height
  ); // creates a rack
  canvas.span  (
    __cfg.pixels.x,
    __cfg.pixels.y
  );
  canvas.use   ( __cfg.nest );
  canvas.paint ( [
  	'333333',
  	'ffffff',
  	'333333',
  	'ffffff'
  ] );
  if ( __cfg.caoi )
    canvas.caoi  ( __cfg.caoi );

  return canvas;
}
