This software is dedicated to the public domain.

# SimpliScript
JavaScript subset for easy translation to C

The name of this project comes from a chat with [copilot](https://copilot.microsoft.com/chats/UBFBNeHixBPQd3ZQArFxf).


### JavaScript
```
class MyStruct {
    x;
    y;
}

function MyStruct__new(x,y)
{
    var self;
    struct(self, MyStruct);

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
    struct(s, MyStruct);

    s = MyStruct__new(10,8);
    print(_("Hello World!\n"));
    MyStruct__dispose(s);
    return 0;
}
```

### Translated to C 
```

#include <stdlib.h>
#include <stdio.h>

typedef struct MyStruct {
    void *x;
    void *y;
} MyStruct;

void *MyStruct__new(void *x, void *y)
{
    MyStruct *self;
    self = malloc(sizeof(MyStruct));
    self->x = x;
    self->y = y;
    return self;
}

void *MyStruct__dispose(void *self)
{
    free(self);
    return NULL;
}

void *startup(void *argc, void *argv)
{
    MyStruct *s;
    s = MyStruct__new((void*)(long)10, (void*)(long)8);
    printf("%s", (char*)("Hello World!\n"));
    MyStruct__dispose(s);
    return (void*)(long)0;
}

int main(int argc, char *argv[])
{
    return (int)(long)startup((void*)(long)argc, (void*)argv);
}


```

***

https://3o3.org

