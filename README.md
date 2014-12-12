# Bigstock API Client

A node.js client to use with Bigstock

## Installation

```
npm install bigstock-node-client --save
```

## Usage

```
var Bigstock = require('bigstock-node-client');
var bs = bs = new Bigstock({
	'key': '769967',
	'secret': 'ef1b5fa0c05deef8a9768bb442e1726f2b3fee86',
	// 'hostname': 'https://apitest.bigstockphoto.com/'
});
```

## Documentation

The Bigstock client comes with some useful objects for you to utilize in your node.js project. All API endpoints return a promise object.

### Bigstock.asset(id, type)
Fetches an asset from the Bigstock API endpoint

### Bigstock.image(id)
Alias for Bigstock.asset - Returns an Image object

### Bigstock.video(id)
Alias for Bigstock.asset - Returns a Video object

### Bigstock.purchase(id, type, size)
Returns a Purchase object and id for you to generate a download URL

### Bigstock.lightbox(id, params, shareKey)
Returns a Lightbox object

### Bigstock.search(query, params)
Returns a Search object

### Bigstock.category(language)
Returns a Category object

## Examples

### Search

```
bs.search('duck', { 'response_detail': 'all', 'vectors' : true }).then(function(Search) {
	var images = Search.getImages(),
		image = {};
	for (var i in images) {
		image = images[i];
		console.log(image.toJSON());
	});
}
```

### Get a list of categories

```
Bigstock.category({ language: 'de' }).then(function(Category) {
	console.log(Category.toJSON());
});
```

### Get an image

```
Bigstock.asset(1326961, 'image').then(function(BigImage) {
	console.log(BigImage.toJSON())
});
```

### Purchase an image

```
Bigstock.purchase(1326961, 'image', 'l').then(function(Purchase) {
	if (Purchase.getResponse().response_code === 200) {
		console.log(bs.getDownloadUrl(Purchase.id)); // use this URL to download your image
	}
});
```

## License

```
The MIT License (MIT)

Copyright (c) 2014 Shutterstock, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```