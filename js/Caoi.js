function caoi__binary__packet( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  // draw the background
  if ( block.data == '-1' )
    context.fillStyle = '#666';
  else if ( block.data == '0' )
    context.fillStyle = '#000000';
  else if ( block.data == '1' )
    context.fillStyle = '#33ddee';

  context.fillRect(
    unit.x * spx,
    unit.y * spy,
    spx,
    spy );
}

function caoi__binary( unit, canvas, block )
{
  //console.log( 'caoi__binary' );
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  // get index
  var index = ( unit.y * unit.parent.sX ) + unit.x;

  // draw the background
  if ( block.data == '-1' )
    context.fillStyle = '#0077aa';
  else if ( block.data == '0' )
  {
    context.fillStyle = '#000000';
    if ( spx == 8 )
        context.fillStyle = '#333';
  }
  else if ( block.data == '1' )
  {
    context.fillStyle = '#ffffff';
    if ( spx == 8 )
        context.fillStyle = '#999';
  }

  if ( unit.__flags.isflags() )
  {
    if ( unit.__flags.isflag( __STACK__MOUSE__OVER ) )
      context.fillStyle = '#ff0000';
    if ( unit.__flags.isflag( __STACK__MOUSE__CLICKED ) )
      context.fillStyle = '#00ff00';
    if ( unit.__flags.isflag( __STACK__PAINTED ) )
    {
      //console.log( 'unit is painted' );
      context.fillStyle = unit.color;
    }
  }

  //console.log( 'filling rect with color =', context.fillStyle );
  context.fillRect(
    unit.x * spx,
    unit.y * spy,
    spx,
    spy );

  context.fillStyle = ( context.fillStyle == '#ffffff' ) ? '#000000' : '#ffffff';

  if ( spx >= 12 )
  {
    // add font
    var szfont = 14;
    var padLeft = 0;
    if ( spx == 25 )
    {
      padLeft = 9;
      szfont = 14;
    }
    else if ( spx == 12 )
    {
      padLeft = 2;
      szfont = 14;
    }

    var padTop = 0;
    if ( spy == 25 )
      padTop = 18;
    else if ( spy == 12 )
      padTop = 11;

    context.font = szfont + 'px trebuchet ms';

    //if ( block.data != '-1' )
    //  context.fillText( block.data, padLeft + ( unit.x * spx ), padTop + ( unit.y * spy ) );
  }

}

function caoi__binary__clean( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  // draw the background
  if ( block.data == '-1' )
    context.fillStyle = '#0077aa';
  else if ( block.data == '0' )
    context.fillStyle = '#000000';
  else if ( block.data == '1' )
    context.fillStyle = '#ffffff';
/*
  // apply region offset
  var cx = 0;
  var cy = 0;
  if ( canvas.region )
  {
    var cx = canvas.region.left;
    var cy = canvas.region.top;
  }
*/
  //context.globalAlpha = block.opacity;
  //if ( block.opacity )
  //  console.log( 'block.opacity=', block.opacity );
  if ( canvas.intensity__on )
  {
    context.globalAlpha = canvas.intensity;
    context.globalAlpha *= block.opacity;
  }
  else
    context.globalAlpha = 1.0; // allow full background

  context.fillRect(
    ( unit.x * spx ),
    ( unit.y * spy ),
    spx,
    spy );

    /*
  context.fillRect(
    ( unit.x * spx ) - ( cx * spx ),
    ( unit.y * spy ) - ( cy * spy ),
    spx,
    spy );
*/
}

function caoi__binary__mote( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  // draw the background
  context.fillStyle = canvas.background;
  if ( block.data )
    context.fillStyle = block.data.color;

  if ( unit.__flags.isflags() )
  {
    if ( unit.__flags.isflag( __STACK__MOUSE__OVER ) )
      context.fillStyle = '#ff0000';
    if ( unit.__flags.isflag( __STACK__MOUSE__CLICKED ) )
      context.fillStyle = '#00ff00';
  }

  context.fillRect(
    unit.x * spx,
    unit.y * spy,
    spx,
    spy );
}

function caoi__mouseover( unit, context, block )
{
  var spx = unit.parent.parent.pixels.x;
  var spy = unit.parent.parent.pixels.y;

  context.fillStyle = '#ff0000';
  context.fillRect(
    unit.x * spx,
    unit.y * spy,
    spx,
    spy );
}

function caoi__binary__furnace( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  // draw the background
  //console.log( 'block data=', block.data );
  if ( block.data
    && block.data != -1
    && block.data != 0
    && block.data != 1 )
  {
    context.fillStyle = block.data.color;
  }
  else
    return;
  //context.fillStyle = '#ffffff';

  //console.log( unit );
  if ( unit.__flags.isflags() )
  {
    if ( unit.__flags.isflag( __STACK__MOUSE__OVER ) )
      context.fillStyle = '#ff0000';
    if ( unit.__flags.isflag( __STACK__MOUSE__CLICKED ) )
      context.fillStyle = '#00ff00';
  }

  var border = '#000000';
  var codex = block.data;
  if ( codex )
  {
    var tomeid = pandeminium.phylactery.tome__selected;
    var tome = pandeminium.phylactery.get( tomeid );
    if ( tome )
    {
      for ( let id of tome.itinerary.positions )
      {
        if ( id == codex.id )
        {
          border = '#ffffff';
        }
      }
    }
  }

  context.fillRect(
    ( unit.x * spx ),
    ( unit.y * spy ),
    spx,
    spy );

  if ( unit.__flags.isflags()
    && unit.__flags.isflag( __STACK__MOUSE__SELECTION ) )
    caoi__border( unit, canvas, block, border );
}

function caoi__border( unit, canvas, block, color )
{
  var pixels = {
    x: canvas.pixels.x,
    y: canvas.pixels.y
  };

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  var cx = unit.x * pixels.x;
  var cy = unit.y * pixels.y;

  context.fillStyle = color;

  // left
  context.fillRect(
    cx,
    cy,
    2,
    pixels.y );

  // top
  context.fillRect(
    cx,
    cy,
    pixels.x,
    2 );

  // right
  context.fillRect(
    cx + pixels.x - 2,
    cy,
    2,
    pixels.y );

  // bottom
  context.fillRect(
    cx,
    cy + pixels.y - 2,
    pixels.x,
    2 );
}

function caoi__binary__plain( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  // draw the background
  if ( block.data == '-1' )
    context.fillStyle = '#0077aa';
  else if ( block.data == '0' )
    context.fillStyle = '#000000';
  else if ( block.data == '1' )
    context.fillStyle = '#ffffff';

  context.fillRect(
    ( unit.x * spx ),
    ( unit.y * spy ),
    spx,
    spy );
}

function caoi__binary__plus( unit, canvas, block )
{
  var pixels = {
    x: canvas.pixels.x,
    y: canvas.pixels.y
  };

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  var cx = unit.x * pixels.x;
  var cy = unit.y * pixels.y;

  // draw the background
  if ( block.data == '-1' )
    context.fillStyle = '#0077aa';
  else if ( block.data == '0' )
    context.fillStyle = '#000000';
  else if ( block.data == '1' )
    context.fillStyle = '#ffffff';

  context.fillRect(
    cx,
    cy,
    pixels.x,
    pixels.y );

  context.fillStyle = '#999999';

  // vertical symbol
  var symbol__width = 3;
  var symbol__height = Math.floor( pixels.y * 0.7 );
  context.fillRect(
    cx + Math.floor( pixels.x / 2 ) - Math.floor( symbol__width / 2 ),
    cy + Math.floor( pixels.y / 2 ) - Math.floor( symbol__height / 2 ),
    symbol__width,
    symbol__height );

  // horizontal symbol
  var symbol__width = Math.floor( pixels.x * 0.7 );
  var symbol__height = 3;
  context.fillRect(
    cx + Math.floor( pixels.x / 2 ) - Math.floor( symbol__width / 2 ),
    cy + Math.floor( pixels.y / 2 ) - Math.floor( symbol__height / 2 ),
    symbol__width,
    symbol__height );

  caoi__border( unit, canvas, block, '#999999' );
}

function caoi__binary__phylactery( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  // draw the background
  if ( block.data
    && block.data != -1
    && block.data != 0
    && block.data != 1)
  {
    context.fillStyle = block.data.color;
  }
  else
    return;
  //else
  //  context.fillStyle = '#ffffff';

  if ( unit.__flags.isflags() )
  {
    if ( unit.__flags.isflag( __STACK__MOUSE__OVER ) )
      context.fillStyle = '#ff0000';
    if ( unit.__flags.isflag( __STACK__MOUSE__CLICKED ) )
      context.fillStyle = '#00ff00';
  }

  context.fillRect(
    ( unit.x * spx ),
    ( unit.y * spy ),
    spx,
    spy );

  var border = '#000000';
  var tome = block.data;
  if ( tome )
  {
    var id = pandeminium.phylactery.tome__selected;
    if ( id == tome.id )
    {
      console.log( 'selected tomeid=', id );
      border = '#ffffff';
    }
  }

  if ( unit.__flags.isflags()
    && unit.__flags.isflag( __STACK__MOUSE__SELECTION ) )
    caoi__border( unit, canvas, block, border );
}

function caoi__binary__parisfair( unit, canvas, block )
{
  var spx = canvas.pixels.x;
  var spy = canvas.pixels.y;

  var elem = document.getElementById( canvas.nest );
  var context = elem.getContext( "2d" );

  // draw the background
  if ( block.data
    && block.data != -1
    && block.data != 0
    && block.data != 1)
  {
    context.fillStyle = block.data.color;
  }
  else
    return;
  //else
  //  context.fillStyle = '#ffffff';

  if ( unit.__flags.isflags() )
  {
    if ( unit.__flags.isflag( __STACK__MOUSE__OVER ) )
      context.fillStyle = '#ff0000';
    //if ( unit.__flags.isflag( __STACK__MOUSE__CLICKED ) )
      //context.fillStyle = '#00ff00';
  }

  context.fillRect(
    ( unit.x * spx ),
    ( unit.y * spy ),
    spx,
    spy );

  if ( unit.__flags.isflags()
    && unit.__flags.isflag( __STACK__MOUSE__CLICKED ) )
    caoi__border( unit, canvas, block, '#000000' );
}
