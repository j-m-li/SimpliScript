
class parser {
	lex;
};


function parser__new(lex)
{
	var self;

	self = new parser();

	self.lex = lex;
	print(_("PARSER!!! \n"));

	return self;
}

function parser__dispose(self)
{
	free(self);
}

function parser__process(self)
{
	var tk;
	struct(tk, token);

	tk = lexer__next(self.lex);
	while (tk != null) {
		tk = lexer__next(self.lex);
	}
}

exporting([ 
	parser,
	parser__new,
	parser__dispose,
	parser__process
]);

