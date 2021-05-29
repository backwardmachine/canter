# canter
Import a .canter file from [neodna](https://github.com/adamlater/neodna), and display the resulting image.

![Screenshot](ss29052021.jpg)

In [neodna](https://github.com/adamlater/neodna), a DNA sequence becomes an image by converting words ( ie. 00, 01, 10, 11 or ACGT ) into basic commands which instruct a pixel to move around a canvas, creating a picture, changing variables and interacting with other data.

A simple library of functions for this program might be:  
code__move       ( move by 1 in the current direction )  
code__write      ( write 1 pixel )  
code__direction  ( change direction by 90 degrees )  
code__origin     ( return to origin__x, origin__y )  
code__codex      ( change to the adjacent codex [ a set of functions ] )  

By running the sequence over the library, a program is created ( in [neodna](https://github.com/adamlater/neodna) this is a canteroll, which has .canter format ) which is as long as the original sequence, and can be used to represent the original sequence graphically, but does not contain the original sequence and can be difficult to reverse without the underlying library which helped create it.

This program will allow you to view a single .canter file in slow-motion as it runs through it's sequence.
