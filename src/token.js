
class token {
	id;
	value;
	len;
};

function token__new()
{
	var self;
	struct(self, token);

	self = new token();
	self.id = 0;
	self.value = 0;
	self.len = 0;
	return self;
}

function token__dispose(self)
{
	free(self);
}

exporting([
	token,
	token__new,
	token__dispose,
]);
