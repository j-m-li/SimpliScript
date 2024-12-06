//
// This software is dedicated to the public domain.
//

class lexer {
	input;
	in_len;
	position;
	read_position;
	ch;
	tk;
	line;
};

function lexer__new(input, len)
{
	var self;
	struct(self, lexer);

	self = new lexer();
	self.input = input;
	self.in_len = len;
	self.position = 0;
	self.line = 1;
	self.read_position = 0;
	self.ch = __(" ");
	self.tk = token__new();
	lexer__read_char(self);
	return self;
}

function lexer__dispose(self)
{
	struct(self, lexer);
	token__dispose(self.tk);
	free(self);
}

function lexer__read_char(self)
{
	struct(self, lexer);
	if (self.read_position >= self.in_len) {
		self.ch = 0;
		return 0;
	}
	self.ch = peek(self.input, self.read_position);
	self.position = self.read_position;
	if (self.ch != 0) {
		self.read_position = self.read_position + 1;
	}
	return self.ch;
}

function lexer__peek_char(self)
{
	struct(self, lexer);
	if (self.read_position >= self.in_len) {
		return 0;
	}
	return peek(self.input, self.read_position);
}

function lexer__error(self,txt)
{
	struct(self, lexer);
	print(_("#error : "));
	print(txt);
	print(_(" at line "));
	print2(self.line);
	print(_("\n"));
	exit(-1);
}

function lexer__next(self)
{
	struct(self, lexer);
	lexer__skip_whitespace(self);
	switch (self.ch) {
	case __("="):
		if (lexer__peek_char(self) == __("=")) {
			lexer__read_char(self);
			if (lexer__peek_char(self) == __("=")) {
				lexer__read_char(self);
			}
		}
		print(_("Equal\n"));
		break;
	case __(">"):
		if (lexer__peek_char(self) == __("=")) {
			lexer__read_char(self);
		}
		break;
	case __("<"):
		if (lexer__peek_char(self) == __("=")) {
			lexer__read_char(self);
		}
		break;
	case __("!"):
		if (lexer__peek_char(self) == __("=")) {
			lexer__read_char(self);
			if (lexer__peek_char(self) == __("=")) {
				lexer__read_char(self);
			}
		}
		break;
	case __("&"):
		if (lexer__peek_char(self) == __("&")) {
			lexer__read_char(self);
		}
		break;
	case __("|"):
		if (lexer__peek_char(self) == __("|")) {
			lexer__read_char(self);
		}
		break;
	case __("+"):
	case __("-"):
	case __(","):
	case __(";"):
	case __(":"):
	case __("."):
			break;
	case __("\""):
	case __("'"):
			return lexer__read_string(self);
	case __("{"):
	case __("}"):
	case __("["):
	case __("]"):
	case __("("):
	case __(")"):
		break;
	case 0:
		return null;
	default:
		if (lexer__is_id(self.ch)) {
			return lexer__read_id(self);
		} else if (lexer__is_digit(self.ch)) {
			return lexer__read_num(self);
		} else {
			print2(self.ch);
			lexer__error(self, _("Unexpected character"));
			return null;
		}
		break;
	}
	lexer__read_char(self);
	return self.tk;
}

function lexer__is_digit(ch)
{
	if (ch >= __("0") && ch <= __("9")) {
		return true;
	}
}

function lexer__is_id(ch)
{
	if (ch >= __("a") && ch <= __("z")) {
		return true;
	}
	if (ch >= __("A") && ch <= __("Z")) {
		return true;
	}
	if (ch == __("_")) {
		return true;
	}
	return false;
}

function lexer__read_id(self)
{
	var pos;
	struct(self, lexer);

	pos = self.read_position;
	lexer__read_char(self);
	while (self.ch != 0) {
		if (lexer__is_id(self.ch) || lexer__is_digit(self.ch)) {
			lexer__read_char(self);
		} else {
			break;
		}
	}
	return self.tk;
}

function lexer__read_string(self)
{
	var pos,c;
	struct(self, lexer);

	c = self.ch;
	pos = self.read_position;
	lexer__read_char(self);
	while (self.ch != 0 && self.ch != c) {
		if (self.ch == __("\\")) {
			lexer__read_char(self);
		}
		lexer__read_char(self);
	}
	lexer__read_char(self);
	return self.tk;
}

function lexer__read_num(self)
{
	var pos;
	struct(self, lexer);

	pos = self.read_position;
	lexer__read_char(self);
	while (self.ch != 0) {
		if (lexer__is_digit(self.ch)) {
			lexer__read_char(self);
		} else {
			break;
		}
	}
	return self.tk;
}

function lexer__skip_whitespace(self)
{
	struct(self, lexer);
	while (self.ch != 0) {
		switch (self.ch) {
		case __("\n"):
			self.line = self.line + 1;
		case __(" "):
		case __("\r"):
		case __("\t"):
			break;
		case __("/"):
			if (lexer__peek_char(self) == __("/")) {
				lexer__read_char(self);
				while (self.ch != 0 && self.ch != __("\n")) {
					lexer__read_char(self);
				}
				self.line = self.line + 1;
			} else {
				return;
			}
			break;
		default:
			return;
		}
		lexer__read_char(self);
	}
}

exporting([ 
	lexer,
	lexer__new,
	lexer__dispose,
	lexer__next,
	lexer__error,
]);

