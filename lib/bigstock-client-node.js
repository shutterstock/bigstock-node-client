
var Bigstock,
	BigImage,
	Purchase,
	Lightbox,
	Page,
	Search,
	Video,
	Category;

var Q = require('q'),
	crypto = require('crypto'),
	Client = require('node-rest-client').Client,
	rest = new Client();

BigImage = function(data) {

	/**
	 * ID
	 * @var {number}
	 */
	this.id = data.id || null,

	/**
	 * Title
	 * @var {string}
	 */
	this.title = data.title || null,

	/**
	 * Description
	 * @var {string}
	 */
	this.description = data.description || null,

	/**
	 * Preview
	 * @var {object}
	 */
	this.preview = data.preview || {},

	/**
	 * Formats
	 * @var {array}
	 */
	this.formats = data.formats || [],

	/**
	 * Categories
	 * @var {array}
	 */
	this.categories = data.categories || [],

	/**
	 * Keywords
	 * @var {array}
	 */
	this.keywords = (data.keywords) ? data.keywords.split(',') : [],

	/**
	 * Small thumb
	 * @var {object}
	 */
	this.small_thumb = data.small_thumb || {},

	/**
	 * Large thumb
	 * @var {object}
	 */
	this.large_thumb = data.large_thumb || {},

	/**
	 * Contributor
	 * @var {string}
	 */
	this.contributor = data.contributor || null,

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.toJSON = function() {
		return data;
	};

	return this;
}

Video = function(data) {

	/**
	 * ID
	 * @var {number}
	 */
	this.id = data.id || null,

	/**
	 * Title
	 * @var {string}
	 */
	this.title = data.title || null,

	/**
	 * Description
	 * @var {string}
	 */
	this.description = data.description || null,

	/**
	 * Preview
	 * @var {object}
	 */
	this.preview = data.preview || {},

	/**
	 * Formats
	 * @var {array}
	 */
	this.formats = data.formats || [],

	/**
	 * Categories
	 * @var {array}
	 */
	this.categories = data.categories || [],

	/**
	 * Keywords
	 * @var {array}
	 */
	this.keywords = (data.keywords) ? data.keywords.split(',') : [],

	/**
	 * Contributor
	 * @var {string}
	 */
	this.contributor = data.contributor || null,

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.toJSON = function() {
		return data;
	};

	return this;
}

Purchase = function(response) {

	/**
	 * JSON response result
	 * @var {object}
	 * @private
	 */
	var result = (response) ? JSON.parse(response).data : {};

	/**
	 * ID
	 * @var {number}
	 */
	this.id = result.download_id || null,

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.getResponse = function() {
		return response;
	},

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.toJSON = function() {
		return result.data;
	};

	return this;
}

Search = function(response, Bigstock) {

	/**
	 * JSON response result
	 * @var {object}
	 * @private
	 */
	var result = response ? JSON.parse(response) : null;

	/**
	 * Has next page
	 * @return {boolean}
	 */
	this.hasNextPage = function() {
		return result.data.paging.page < result.data.paging.total_pages;
	},

	/**
	 * Has previous page
	 * @return {boolean}
	 */
	this.hasPrevPage = function() {
		return result.data.paging.page > 1;
	},

	/**
	 * Get next page
	 * @return {boolean}
	 */
	this.getNextPage = function() {
		return result.data.paging.page + 1;
	},

	/**
	 * Get previous page
	 * @return {boolean}
	 */
	this.getPrevPage = function() {
		return result.data.paging.page - 1;
	},

	/**
	 * Get images from result 
	 * @return {boolean}
	 */
	this.getImages = function() {
		var images = [],
			image = {};
		for (var i in result.data.images) {
			image = result.data.images[i];
			images.push(new BigImage(image));
		}

		return images;
	},

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.getResponse = function() {
		return response;
	},

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.toJSON = function() {
		return result.data;
	};

	return this;
};

Category = function(response) {

	/**
	 * JSON response result
	 * @var {object}
	 * @private
	 */
	var result = response ? JSON.parse(response) : null;

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.getResponse = function() {
		return response;
	},

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.toJSON = function() {
		return result.data;
	};
}

Lightbox = function(response) {

	/**
	 * JSON response result
	 * @var {object}
	 * @private
	 */
	var result = response ? JSON.parse(response) : null;

	this.id = result.id || null,

	/**
	 * Has next page
	 * @return {boolean}
	 */
	this.hasNextPage = function() {
		return result.data.page.page < result.data.page.total_pages;
	},

	/**
	 * Has previous page
	 * @return {boolean}
	 */
	this.hasPrevPage = function() {
		return result.data.page.page > 1;
	},

	/**
	 * Get next page
	 * @return {boolean}
	 */
	this.getNextPage = function() {
		return result.data.page.page + 1;
	},

	/**
	 * Get previous page
	 * @return {boolean}
	 */
	this.getPrevPage = function() {
		return result.data.page.page - 1;
	},

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.getResponse = function() {
		return response;
	},

	/**
	 * Get images from result 
	 * @return {boolean}
	 */
	this.getImages = function() {
		var images = [],
			image = {};
		for (var i in result.data.images) {
			image = result.data.images[i];
			images.push(new BigImage(image));
		}

		return images;
	},

	/**
	 * Get images from result 
	 * @return {boolean}
	 */
	this.getLightboxes = function() {
		return result.data.lightboxes;
	},

	/**
	 * Gets the raw response object
	 * @return {object}
	 */
	this.toJSON = function() {
		return result.data;
	};
}

Bigstock = function(options) {

	/**
	 * Reference to self
	 * @var {object}
	 * @private
	 */
	var self = this,

	/**
	 * API key
	 * @var {string}
	 * @private
	 */
	key = options.key || null,

	/**
	 * API secret
	 * @var {string}
	 * @private
	 */
	secret = options.secret || null,

	/**
	 * Authentication method
	 * @var {string}
	 * @private
	 */
	authentication = options.auth || 'rest',

	/**
	 * API hostname
	 * @var {string}
	 * @private
	 */
	hostname = options.hostname || 'https://api.bigstockphoto.com/',

	/**
	 * API version
	 * @var {string}
	 * @private
	 */
	version = options.version || '2',

	/**
	 * Makes an API call
	 * @return {object}
	 * @private
	 */
	makeApiCall = function(url, obj) {
		// Create the SHA1
		var deferred = Q.defer();

		rest.get(url, function(data, response) {
	    	deferred.resolve(new obj(data, this));
	    }).on('requestTimeout',function(req){
			deferred.reject({
				"response_code": 0,
				"message": "Request timeout"
			});
		    req.abort();
		}).on('responseTimeout',function(){
		    deferred.reject({
				"response_code": 0,
				"message": "Response timeout"
			});
		});

		return deferred.promise;
	},

	/**
	 * Creates an authentication key
	 * @param {int} id
	 * @param {string} secret (optional)
	 * @return {string}
	 * @private
	 */
	createSha1Key = function(id, secretKey) {
		var hash = [secret, key, id, secretKey];
		return crypto.createHash('sha1').update(hash.join('')).digest('hex');
	};


	/**
	 * Gets the URL of a download ID
	 * @param {int} id
	 * @return {boolean}
	 */
	this.getDownloadUrl = function(id) {
		var authKey = createSha1Key(id);
		return this.getUrl('download', {
			'auth_key' : authKey,
			'download_id' : id
		});
	}

	/**
	 * Returns a full API URL
	 * @param {string} path
	 * @param {object} params
	 * @return {string}
	 */
	this.getUrl = function(path, params) {
		var paramStr = [],
			url = hostname + version + '/' + key + '/' + path,
			p;

		if (params) {
			// explode the params
			for(p in params) {
				if (params.hasOwnProperty(p)) {
					paramStr.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
				}
			}
			paramStr = paramStr.join("&");

			url += '?' + paramStr;
		}

		return url;
	},

	/**
	 * Fetch an asset
	 * @param {int} id
	 * @param {string} type
	 * @return {Image}
	 */
	this.asset = function(id, type) {
		if (!id) {
			throw new Exception("You must provide an ID for an asset");
		}

		var url = this.getUrl(type + '/' + id);

		return makeApiCall(url, BigImage);
	},

	/**
	 * Fetch an image asset
	 * @param {int} id
	 * @param {string} type
	 * @return {object}
	 */
	this.image = function(id) {
		return this.asset(id, 'image');
	},

	/**
	 * Purchase an asset
	 * @param {int} id
	 * @param {string} type
	 * @return {Purchase}
	 */
	this.purchase = function(id, type, size) {
		if (!id) {
			throw new Exception("You must provide an asset ID to purchase");
		}
		if (!type) {
			throw new Exception("You must provide an asset type to purchase (Supported types are 'image' and 'video')");
		}
		if (!size) {
			throw new Exception("You must provide an asset size to purchase");
		}

		var authKey = createSha1Key(id),
			url = this.getUrl('purchase', {
				'image_id' : id,
				'size_code' : size,
				'auth_key' : authKey
			});

		return makeApiCall(url, Purchase);
	},

	/**
	 * Get a list of lightboxes (or return just one)
	 * @param {int} id (optional)
	 * @param {string} shareKey; The share key from a user's private lightbox (optional)
	 * @return {Lightbox}
	 */
	this.lightbox = function(id, params, shareKey) {
		var authKey = ''
			params = params || {},
			url = '',
			id = id || '';

		authKey = createSha1Key(id, shareKey);
		params.auth_key = authKey;

		url = this.getUrl('lightbox/' + id, params);

		return makeApiCall(url, Lightbox);
	},

	/**
	 * Search the API
	 * @param {string} query
	 * @param {object} params
	 * @return {Search}
	 */
	this.search = function(query, params) {
		params = params || {};
		params.q = query;

		var url = this.getUrl('search', params);

		return makeApiCall(url, Search);
	},

	/**
	 * Get a list of categories
	 * @param {string} query
	 * @param {object} params
	 * @return {Search}
	 */
	this.category = function(language) {
		language = language || 'en';
		var url = this.getUrl('categories', { 'language': language });

		return makeApiCall(url, Category);
	};

	return this;
}

module.exports = Bigstock;