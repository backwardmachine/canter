// A cursor into a haidentot
class neodna__Skutterer
{
  constructor( x, y )
  {
    this.__data    = 0; // give a skutterer access to the data blocks when building the haidentot
    this.__canvas  = 0;
    this.x         = x;
    this.y         = y;
    this.ox        = x;
    this.oy        = y;
    this.nX        = 0;
    this.nY        = 0;
    this.step      = 1;
    this.direction = 0;
    this.maiden    = 1;
    this.frame     = 0;
    this.incident  = 1;
    this.packets   = new neodna__Packets();
    this.skittle   = new neodna__Skittle();
    this.gate      = new neodna__Gate();
    this.pictures  = new neodna__Pictures();
    this.frames    = new Array();
    this.escape    = 0;
    this.pos       = 0;
    this.opacity   = 1;
    this.oldenscrybe = 0;
    this.dally = {
      x: 0,
      y: 0
    };
    this.tail = new neodna__Tail();
    this.chamber = 0;
    this.focus = 0;
  }

  reset( parent )
  {
    this.__data   = parent.src;
    this.__canvas = parent.stack.canvas;
    this.__canvas.intensity = 1;
    this.__canvas.intensity__on = 1;
    this.nX = parent.sX;
    this.nY = parent.sY;
    this.oldenscrybe = parent.oldenscrybe;
  }

  canterroll()
  {
    if ( this.oldenscrybe )
      return this.oldenscrybe.canterroll;
    return 0;
  }
}
