This software is dedicated to the public domain.

# SimpliScript
JavaScript subset for easy translation to C

The name of this project comes from a chat with [copilot](https://copilot.microsoft.com/chats/UBFBNeHixBPQd3ZQArFxf).


JavaScript
```
class MyStruct {
    x;
    y;
}

function MyStruct__new(x,y)
{
    var self;
    self = new MyStruct();
    self.x = x;
    self.y = y;
    return self;
}

function MyStruct__dispose(self)
{
    free(self);
}

function startup(argc, argv)
{
    var s;
    s = MyStruct__new(10,8);
    print(_("Hello World!\n"));
    MyStruct__dispose(s);
    return 0;
}
```

Translated to C (conceptual)
```
#include <stdlib.h>
#include <stdio.h>

typedef struct MyStruct {
    void *x;
    void *y;
} MyStruct;

void *MyStruct__new(void *x, void *y)
{
    void *self;
    self = malloc(sizeof(MyStruct));
    self.x = x;
    self.y = y;
    return self;
}

void *MyStruct__dispose(void *self)
{
    free(self);
    return NULL;
}

void *startup(argc, argv)
{
    void *s;
    s = MyStruct__new(10,8);
    printf("%s", (char*)("Hello World!\n"));
    MyStruct__dispose(s);
    return NULL;
}

int main(int argc, char *argv[])
{
    return (int)startup((void*)argc, (void*)argv);
}

```


https://3o3.org

