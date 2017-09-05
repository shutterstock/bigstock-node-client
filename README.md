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

### Bigstock

#### Bigstock.asset(id, type)
Fetches an asset from the Bigstock API endpoint

#### Bigstock.image(id)
Alias for Bigstock.asset - Returns a BigImage object

#### Bigstock.video(id)
Alias for Bigstock.asset - Returns a Video object

#### Bigstock.purchase(id, type, size)
Returns a Purchase object and id for you to generate a download URL

#### Bigstock.lightbox(id, params, shareKey)
Returns a Lightbox object

#### Bigstock.search(query, params)
Returns a Search object

#### Bigstock.category(language)
Returns a Category object

### BigImage

#### BigImage.toJSON()
Returns the full object details in JSON

### Video

#### Video.toJSON()
Returns the full object details in JSON

### Purchase

#### Purchase.getResponse()
Returns the raw response from the API server

#### Purchase.toJSON()
Returns the full object details in JSON

### Lightbox

#### Lightbox.hasNextPage()
Determines if there is another page to lightbox

#### Lightbox.hasPrevPage()
Determines if there is a previous page to lightbox

#### Lightbox.getNextPage()
Gets the next page number to lightbox

#### Lightbox.getPrevPage()
Gets the previous page number to lightbox

#### Lightbox.getImages()
Gets the images contained in the lightbox

#### Lightbox.getResponse()
Returns the raw response from the API server

#### Lightbox.toJSON()
Returns the full object details in JSON

### Search

#### Search.hasNextPage()
Determines if there is another page to search

#### Search.hasPrevPage()
Determines if there is a previous page to search

#### Search.getNextPage()
Gets the next page number to search

#### Search.getPrevPage()
Gets the previous page number to search

#### Search.getImages()
Gets the images contained in the search

#### Search.getResponse()
Returns the raw response from the API server

#### Search.toJSON()
Returns the full object details in JSON

### Category

#### Category.getResponse()
Returns the raw response from the API server

#### Category.toJSON()
Returns the full object details in JSON

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

[MIT](LICENSE) © 2014-2017 Shutterstock Images, LLC
