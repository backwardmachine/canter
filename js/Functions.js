function getpixel( e )
{
	var rect  = e.target.getBoundingClientRect();
	var px 	  = e.clientX - rect.left; // x position
	var py 	  = e.clientY - rect.top;  // y position
	return { px: Math.floor( px ), py: Math.floor( py ) };
}

function __binary__to__fasta( sequence )
{
	var word = '';
	var words = new Array();
	var k = 0;
	for( let char of sequence )
	{
		if ( k == 2 ) {
			words.push( word );
			word = '';
			k = 0;
		}
		word += char;
		k++;
	}
	if ( k == 2 ) {
		words.push( word );
		word = '';
		k = 0;
	}

	//console.log( 'fasta words=', words );
	var str = '';
	for ( let word of words )
	{
		switch( word )
		{
			case '00':
				str += 'A';
				break;
			case '01':
				str += 'C';
				break;
			case '10':
				str += 'G';
				break;
			case '11':
				str += 'T';
				break;
		}
	}

	return str;
}

function __fasta__to__binary( sequence )
{
	var str = '';
	for ( let char of sequence )
	{
		switch( char )
		{
			case 'A':
			case 'a':
				str += '00';
				break;
			case 'C':
			case 'c':
				str += '01';
				break;
			case 'G':
			case 'g':
				str += '10';
				break;
			case 'T':
			case 't':
				str += '11';
				break;
		}
	}
	return str;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function download( content, fileName, contentType ) {
    var a 	   = document.createElement( "a" );
    var file   = new Blob(
			[ content ],
			{ type: contentType }
		);
    a.href 		 = URL.createObjectURL( file );
    a.download = fileName;
    a.click();
}

function upload(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
