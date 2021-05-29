function __init__stack( sequence, __cfg )
{
  // main sequence
  var stack 		 = new neodna__Stack();
  stack.sequence = new neodna__Sequence( sequence );
  stack.sequence.__NEODNA__ERRORS = __cfg.errors ? 1 : 0;
  if ( __cfg.offset )
    stack.sequence.set__offset   ( __cfg.offset );
  if ( __cfg.leading )
    stack.sequence.set__leading  ( __cfg.leading );
  if ( __cfg.trailing )
    stack.sequence.set__trailing ( __cfg.trailing );
  if ( __cfg.width )
    stack.sequence.set__width    ( __cfg.width );
  if ( __cfg.length )
    stack.sequence.set__length   ( __cfg.length );
  if ( __cfg.visible )
    stack.sequence.set__visible  ( __cfg.visible );
  stack.sequence.build();

  var nX = stack.sequence.getwidth();
  var nY = stack.sequence.getheight();

  stack.container = __cfg.container;

  // create canvas
  stack.canvas = __init__stack__canvas(
    __cfg,
    nX,
    nY
  );

  // create blocks
  stack.blocks = new neodna__Blocks(
    nX,
    nY,
    stack );
  stack.blocks.build();
  stack.blocks.data  ( stack.sequence.get().clip__focus );

  return stack;
}
