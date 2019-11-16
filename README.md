<p align="center"><img src="./docs/img/banner.png" style="height:200px;" /></p>


<p align="center"><code>npm i -g quiero</code></p>
<p align="center">Quiero is a markup language deisgned to create question papers and worksheets.</p>

## Motivation and Features

- Designed keeping flow in mind.
- Easier than typing and formatting a word document.
- Uses *markdown-like*  tokens.
- Learning is a pice-of-cake.

### Playground

Freshly prepared web-enviornment for playing around [here](http://quiero.divy.work).

## Installation

* Install quiero via npm

    ` npm i -g quiero`


* Parse a `.quio` file using

    `quiero index.quio`

## Usage

### Questions
Defining questions is very easy.

**token** : `@`

**example**:
```md
@ Who is the current Prime Minister of India?
```
**result** :

```js
 {type:"Question", value:"Who is the current Prime Minister of India?"}
 ```

### Options
Define numbered-options using the `#` token.

**token** : `#{number}`
**example**:

```md
#1 Narendra Modi
#2 Donald Trump
#3 Imran Khan
```

**result**:

```js
{ type:"Answer", index:1, value:"Narendra Modi" }
{ type:"Answer", index:2, value:"Donald Trump" }
{ type:"Answer", index:3, value:"Imran Khan" }
```

### Variables
Assign one-char variables simply using the `:` operator.

**token**: `{variable} : {value}`

**example**:

```md
x : 2
y : 3
```

**result**:

```js
{ type:"Variable", name:"x", value:2 }
{ type:"Variable", name:"y", value:3 }
```

### End of line characters
2 characters will determine the end of a line in quiero.

Either `\n` or `;` will tell quiero to end the line.

## Parsing a file

Assuming the file name to be `index.quio`.

Just type in `quiero index.quio`  to get the output.

## Tests
Some tests have been created under the `tests` directory for you to play around and test them out.

## Contributing

Setup

```bash
$ git clone git@github.com:dan-divy/quiero.git
$ cd quiero 
$ npm i
```

## Maintainers

* [Divy Srivastava](https://divy.work/)
*  [DanCodes](https://dancodes.online)

## License

(The MIT License)

Copyright (c) 2019 Dan-Divy organisation <dan@dancodes.online>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
