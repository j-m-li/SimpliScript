
class lexer {
	input;
};


function lexer__new()
{
	var self;

	self = new lexer();

	print(_("LEXER!!! "));

	return self;
}

function lexer__dispose(self)
{
	free(self);
}

function lexer__next(self)
{
	return null;
}

exporting([ 
	lexer,
	lexer__new,
	lexer__dispose,
	lexer__next,
]);

