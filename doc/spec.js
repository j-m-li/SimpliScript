//
// This software is dedicated to the public domain.
//

// There is no type checking. Every variable is threated equaly as an 
// integer, a reference, a one dimension array of integer/reference, a 
// reference to a byte array or a function reference.

if (typeof require !== 'undefined') {importScripts = require;} // for nodejs !!
					// "if" is only for the preprocessor

importScripts("../lib/std.js"); // include a source file

define('MY_CONST', 47); //define a constant

class myst { // a structure with four members
	one; 
	next;
	three;
	four;
}; 

function startup(argc, argv) 
{		            // definition of the entry point function

	var i,a,s,b,end; //declaration of local variables
	var n;
	var f,y;
	struct(s,myst); // declare type of variable s to class "myst".

	a = array(123);   //allocate an array of 123 intergers
	s = new myst();   //allocate a "myst" structure
	b = bytes(3);     //allocate 3 bytes of memory
	
	poke(b,0,'B');	  // put a B in the first byte of b memory
	poke(b,1,'\n');
	poke(b,2,0);
	print(_("B:"));
	print(b);

	f = t2;		 // function pointer
	f(100,2,3,+4,-5); // indirect function call
	f = f();

	n = mul2(1, 20) + mod2(2,3) - div2(2,3) + (17 - 4); //that's all the operators that we have
	print2(n);

	s.one = 10001; // to access a struct member we 
                            //put the name of the struct 
                            //then the member name

	s.next = _("two"); // string literal (nul terminated as in C)
	s.three = 3;    // integer constant

	i = a[1];	     // array access

	a[0] = _("yo");
	a[122] = _("lAst");

	print(_("héllo world!\n")); // UTF-8
	print2(peek(a[122], 1));  // print the integer value of the second byte
                                  // of the string pointed by the 123 cell of a
	print(_("\n"));
	print(argv[argc-1]);
	print2(argv[argc-1]);

	i = 0;
	y = i;
	while (i == y && i != y && i < y && i <= y && i > y && i >= y) {
	}

	switch (argc > 2) {      // switch is used as a replacement of if/else
	case true:	
		print(_("yo \n"));
		i = 2;
		end = 0;
		while (i < argc && (end == 0 || 3 == 2)) { // only while loop
			print(_("."));
			i = i + 1;
			switch (i) {
			case +10: 
				end = 1;
				break;
			};
		};
		break;
	case false:
	default:
		print(s.next);
		break;
	}
	free(a);
	test(); 	// function call
	free(s);
	f = file_size(argv[1]);
	switch(f > 0) { // a compare operation result is either +1, -1 or 0. 
	case -5: 
	case 2: 
	case 3:       // these are garbage, but are allowed
	case true: 		// +1 is true
		f = file_load(argv[1], f);
		print(f);
		break;
	default: 
	case false: break;      // -1 or 0 are false
	}
	
	f = new RIKIKI_CLASS();
	switch (47) {
	case MY_CONST:
		print(RIKIKI);
		break;
	default:
		print(_("grr"));
	}
	return 0;
}

// definition of functions
function test()
{
	print(_("test\n")); //print a string
	print2(MY_CONST); // print a number (print3 is for ternary encoded numbers)
	t2(1,2);
}

function t2( a , b ) {
	print2(a+b);
	print(_("\n"));
}

end(startup);

