/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote], button[data-confirm]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive', {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//


function PopUpShow(){$("#popup").show()}function PopUpHide(){$("#popup").hide()}function removeUser(t,e){var i=$(e).parents("tr")[0];$.ajax({type:"POST",data:{_method:"DELETE"},url:"/admin/users/"+t,success:function(t){console.log(i),t.success===!0&&($(i).fadeOut(150),PopUpHide())},error:function(t){console.log(t)}})}!function(t,e){"object"==typeof module&&"object"==typeof module.exports?module.exports=t.document?e(t,!0):function(t){if(!t.document)throw new Error("jQuery requires a window with a document");return e(t)}:e(t)}("undefined"!=typeof window?window:this,function(t,e){function i(t){var e=t.length,i=se.type(t);return"function"===i||se.isWindow(t)?!1:1===t.nodeType&&e?!0:"array"===i||0===e||"number"==typeof e&&e>0&&e-1 in t}function n(t,e,i){if(se.isFunction(e))return se.grep(t,function(t,n){return!!e.call(t,n,t)!==i});if(e.nodeType)return se.grep(t,function(t){return t===e!==i});if("string"==typeof e){if(de.test(e))return se.filter(e,t,i);e=se.filter(e,t)}return se.grep(t,function(t){return se.inArray(t,e)>=0!==i})}function s(t,e){do t=t[e];while(t&&1!==t.nodeType);return t}function o(t){var e=_e[t]={};return se.each(t.match(be)||[],function(t,i){e[i]=!0}),e}function a(){fe.addEventListener?(fe.removeEventListener("DOMContentLoaded",r,!1),t.removeEventListener("load",r,!1)):(fe.detachEvent("onreadystatechange",r),t.detachEvent("onload",r))}function r(){(fe.addEventListener||"load"===event.type||"complete"===fe.readyState)&&(a(),se.ready())}function l(t,e,i){if(void 0===i&&1===t.nodeType){var n="data-"+e.replace(De,"-$1").toLowerCase();if(i=t.getAttribute(n),"string"==typeof i){try{i="true"===i?!0:"false"===i?!1:"null"===i?null:+i+""===i?+i:ke.test(i)?se.parseJSON(i):i}catch(s){}se.data(t,e,i)}else i=void 0}return i}function h(t){var e;for(e in t)if(("data"!==e||!se.isEmptyObject(t[e]))&&"toJSON"!==e)return!1;return!0}function u(t,e,i,n){if(se.acceptData(t)){var s,o,a=se.expando,r=t.nodeType,l=r?se.cache:t,h=r?t[a]:t[a]&&a;if(h&&l[h]&&(n||l[h].data)||void 0!==i||"string"!=typeof e)return h||(h=r?t[a]=X.pop()||se.guid++:a),l[h]||(l[h]=r?{}:{toJSON:se.noop}),("object"==typeof e||"function"==typeof e)&&(n?l[h]=se.extend(l[h],e):l[h].data=se.extend(l[h].data,e)),o=l[h],n||(o.data||(o.data={}),o=o.data),void 0!==i&&(o[se.camelCase(e)]=i),"string"==typeof e?(s=o[e],null==s&&(s=o[se.camelCase(e)])):s=o,s}}function c(t,e,i){if(se.acceptData(t)){var n,s,o=t.nodeType,a=o?se.cache:t,r=o?t[se.expando]:se.expando;if(a[r]){if(e&&(n=i?a[r]:a[r].data)){se.isArray(e)?e=e.concat(se.map(e,se.camelCase)):e in n?e=[e]:(e=se.camelCase(e),e=e in n?[e]:e.split(" ")),s=e.length;for(;s--;)delete n[e[s]];if(i?!h(n):!se.isEmptyObject(n))return}(i||(delete a[r].data,h(a[r])))&&(o?se.cleanData([t],!0):ie.deleteExpando||a!=a.window?delete a[r]:a[r]=null)}}}function d(){return!0}function p(){return!1}function f(){try{return fe.activeElement}catch(t){}}function m(t){var e=je.split("|"),i=t.createDocumentFragment();if(i.createElement)for(;e.length;)i.createElement(e.pop());return i}function g(t,e){var i,n,s=0,o=typeof t.getElementsByTagName!==Ce?t.getElementsByTagName(e||"*"):typeof t.querySelectorAll!==Ce?t.querySelectorAll(e||"*"):void 0;if(!o)for(o=[],i=t.childNodes||t;null!=(n=i[s]);s++)!e||se.nodeName(n,e)?o.push(n):se.merge(o,g(n,e));return void 0===e||e&&se.nodeName(t,e)?se.merge([t],o):o}function v(t){Ie.test(t.type)&&(t.defaultChecked=t.checked)}function y(t,e){return se.nodeName(t,"table")&&se.nodeName(11!==e.nodeType?e:e.firstChild,"tr")?t.getElementsByTagName("tbody")[0]||t.appendChild(t.ownerDocument.createElement("tbody")):t}function b(t){return t.type=(null!==se.find.attr(t,"type"))+"/"+t.type,t}function _(t){var e=Ve.exec(t.type);return e?t.type=e[1]:t.removeAttribute("type"),t}function w(t,e){for(var i,n=0;null!=(i=t[n]);n++)se._data(i,"globalEval",!e||se._data(e[n],"globalEval"))}function x(t,e){if(1===e.nodeType&&se.hasData(t)){var i,n,s,o=se._data(t),a=se._data(e,o),r=o.events;if(r){delete a.handle,a.events={};for(i in r)for(n=0,s=r[i].length;s>n;n++)se.event.add(e,i,r[i][n])}a.data&&(a.data=se.extend({},a.data))}}function C(t,e){var i,n,s;if(1===e.nodeType){if(i=e.nodeName.toLowerCase(),!ie.noCloneEvent&&e[se.expando]){s=se._data(e);for(n in s.events)se.removeEvent(e,n,s.handle);e.removeAttribute(se.expando)}"script"===i&&e.text!==t.text?(b(e).text=t.text,_(e)):"object"===i?(e.parentNode&&(e.outerHTML=t.outerHTML),ie.html5Clone&&t.innerHTML&&!se.trim(e.innerHTML)&&(e.innerHTML=t.innerHTML)):"input"===i&&Ie.test(t.type)?(e.defaultChecked=e.checked=t.checked,e.value!==t.value&&(e.value=t.value)):"option"===i?e.defaultSelected=e.selected=t.defaultSelected:("input"===i||"textarea"===i)&&(e.defaultValue=t.defaultValue)}}function k(e,i){var n,s=se(i.createElement(e)).appendTo(i.body),o=t.getDefaultComputedStyle&&(n=t.getDefaultComputedStyle(s[0]))?n.display:se.css(s[0],"display");return s.detach(),o}function D(t){var e=fe,i=Ze[t];return i||(i=k(t,e),"none"!==i&&i||(Je=(Je||se("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement),e=(Je[0].contentWindow||Je[0].contentDocument).document,e.write(),e.close(),i=k(t,e),Je.detach()),Ze[t]=i),i}function T(t,e){return{get:function(){var i=t();if(null!=i)return i?void delete this.get:(this.get=e).apply(this,arguments)}}}function S(t,e){if(e in t)return e;for(var i=e.charAt(0).toUpperCase()+e.slice(1),n=e,s=di.length;s--;)if(e=di[s]+i,e in t)return e;return n}function E(t,e){for(var i,n,s,o=[],a=0,r=t.length;r>a;a++)n=t[a],n.style&&(o[a]=se._data(n,"olddisplay"),i=n.style.display,e?(o[a]||"none"!==i||(n.style.display=""),""===n.style.display&&Ee(n)&&(o[a]=se._data(n,"olddisplay",D(n.nodeName)))):(s=Ee(n),(i&&"none"!==i||!s)&&se._data(n,"olddisplay",s?i:se.css(n,"display"))));for(a=0;r>a;a++)n=t[a],n.style&&(e&&"none"!==n.style.display&&""!==n.style.display||(n.style.display=e?o[a]||"":"none"));return t}function M(t,e,i){var n=li.exec(e);return n?Math.max(0,n[1]-(i||0))+(n[2]||"px"):e}function I(t,e,i,n,s){for(var o=i===(n?"border":"content")?4:"width"===e?1:0,a=0;4>o;o+=2)"margin"===i&&(a+=se.css(t,i+Se[o],!0,s)),n?("content"===i&&(a-=se.css(t,"padding"+Se[o],!0,s)),"margin"!==i&&(a-=se.css(t,"border"+Se[o]+"Width",!0,s))):(a+=se.css(t,"padding"+Se[o],!0,s),"padding"!==i&&(a+=se.css(t,"border"+Se[o]+"Width",!0,s)));return a}function N(t,e,i){var n=!0,s="width"===e?t.offsetWidth:t.offsetHeight,o=ti(t),a=ie.boxSizing&&"border-box"===se.css(t,"boxSizing",!1,o);if(0>=s||null==s){if(s=ei(t,e,o),(0>s||null==s)&&(s=t.style[e]),ni.test(s))return s;n=a&&(ie.boxSizingReliable()||s===t.style[e]),s=parseFloat(s)||0}return s+I(t,e,i||(a?"border":"content"),n,o)+"px"}function P(t,e,i,n,s){return new P.prototype.init(t,e,i,n,s)}function A(){return setTimeout(function(){pi=void 0}),pi=se.now()}function H(t,e){var i,n={height:t},s=0;for(e=e?1:0;4>s;s+=2-e)i=Se[s],n["margin"+i]=n["padding"+i]=t;return e&&(n.opacity=n.width=t),n}function F(t,e,i){for(var n,s=(bi[e]||[]).concat(bi["*"]),o=0,a=s.length;a>o;o++)if(n=s[o].call(i,e,t))return n}function j(t,e,i){var n,s,o,a,r,l,h,u,c=this,d={},p=t.style,f=t.nodeType&&Ee(t),m=se._data(t,"fxshow");i.queue||(r=se._queueHooks(t,"fx"),null==r.unqueued&&(r.unqueued=0,l=r.empty.fire,r.empty.fire=function(){r.unqueued||l()}),r.unqueued++,c.always(function(){c.always(function(){r.unqueued--,se.queue(t,"fx").length||r.empty.fire()})})),1===t.nodeType&&("height"in e||"width"in e)&&(i.overflow=[p.overflow,p.overflowX,p.overflowY],h=se.css(t,"display"),u="none"===h?se._data(t,"olddisplay")||D(t.nodeName):h,"inline"===u&&"none"===se.css(t,"float")&&(ie.inlineBlockNeedsLayout&&"inline"!==D(t.nodeName)?p.zoom=1:p.display="inline-block")),i.overflow&&(p.overflow="hidden",ie.shrinkWrapBlocks()||c.always(function(){p.overflow=i.overflow[0],p.overflowX=i.overflow[1],p.overflowY=i.overflow[2]}));for(n in e)if(s=e[n],mi.exec(s)){if(delete e[n],o=o||"toggle"===s,s===(f?"hide":"show")){if("show"!==s||!m||void 0===m[n])continue;f=!0}d[n]=m&&m[n]||se.style(t,n)}else h=void 0;if(se.isEmptyObject(d))"inline"===("none"===h?D(t.nodeName):h)&&(p.display=h);else{m?"hidden"in m&&(f=m.hidden):m=se._data(t,"fxshow",{}),o&&(m.hidden=!f),f?se(t).show():c.done(function(){se(t).hide()}),c.done(function(){var e;se._removeData(t,"fxshow");for(e in d)se.style(t,e,d[e])});for(n in d)a=F(f?m[n]:0,n,c),n in m||(m[n]=a.start,f&&(a.end=a.start,a.start="width"===n||"height"===n?1:0))}}function O(t,e){var i,n,s,o,a;for(i in t)if(n=se.camelCase(i),s=e[n],o=t[i],se.isArray(o)&&(s=o[1],o=t[i]=o[0]),i!==n&&(t[n]=o,delete t[i]),a=se.cssHooks[n],a&&"expand"in a){o=a.expand(o),delete t[n];for(i in o)i in t||(t[i]=o[i],e[i]=s)}else e[n]=s}function z(t,e,i){var n,s,o=0,a=yi.length,r=se.Deferred().always(function(){delete l.elem}),l=function(){if(s)return!1;for(var e=pi||A(),i=Math.max(0,h.startTime+h.duration-e),n=i/h.duration||0,o=1-n,a=0,l=h.tweens.length;l>a;a++)h.tweens[a].run(o);return r.notifyWith(t,[h,o,i]),1>o&&l?i:(r.resolveWith(t,[h]),!1)},h=r.promise({elem:t,props:se.extend({},e),opts:se.extend(!0,{specialEasing:{}},i),originalProperties:e,originalOptions:i,startTime:pi||A(),duration:i.duration,tweens:[],createTween:function(e,i){var n=se.Tween(t,h.opts,e,i,h.opts.specialEasing[e]||h.opts.easing);return h.tweens.push(n),n},stop:function(e){var i=0,n=e?h.tweens.length:0;if(s)return this;for(s=!0;n>i;i++)h.tweens[i].run(1);return e?r.resolveWith(t,[h,e]):r.rejectWith(t,[h,e]),this}}),u=h.props;for(O(u,h.opts.specialEasing);a>o;o++)if(n=yi[o].call(h,t,u,h.opts))return n;return se.map(u,F,h),se.isFunction(h.opts.start)&&h.opts.start.call(t,h),se.fx.timer(se.extend(l,{elem:t,anim:h,queue:h.opts.queue})),h.progress(h.opts.progress).done(h.opts.done,h.opts.complete).fail(h.opts.fail).always(h.opts.always)}function W(t){return function(e,i){"string"!=typeof e&&(i=e,e="*");var n,s=0,o=e.toLowerCase().match(be)||[];if(se.isFunction(i))for(;n=o[s++];)"+"===n.charAt(0)?(n=n.slice(1)||"*",(t[n]=t[n]||[]).unshift(i)):(t[n]=t[n]||[]).push(i)}}function L(t,e,i,n){function s(r){var l;return o[r]=!0,se.each(t[r]||[],function(t,r){var h=r(e,i,n);return"string"!=typeof h||a||o[h]?a?!(l=h):void 0:(e.dataTypes.unshift(h),s(h),!1)}),l}var o={},a=t===$i;return s(e.dataTypes[0])||!o["*"]&&s("*")}function R(t,e){var i,n,s=se.ajaxSettings.flatOptions||{};for(n in e)void 0!==e[n]&&((s[n]?t:i||(i={}))[n]=e[n]);return i&&se.extend(!0,t,i),t}function U(t,e,i){for(var n,s,o,a,r=t.contents,l=t.dataTypes;"*"===l[0];)l.shift(),void 0===s&&(s=t.mimeType||e.getResponseHeader("Content-Type"));if(s)for(a in r)if(r[a]&&r[a].test(s)){l.unshift(a);break}if(l[0]in i)o=l[0];else{for(a in i){if(!l[0]||t.converters[a+" "+l[0]]){o=a;break}n||(n=a)}o=o||n}return o?(o!==l[0]&&l.unshift(o),i[o]):void 0}function $(t,e,i,n){var s,o,a,r,l,h={},u=t.dataTypes.slice();if(u[1])for(a in t.converters)h[a.toLowerCase()]=t.converters[a];for(o=u.shift();o;)if(t.responseFields[o]&&(i[t.responseFields[o]]=e),!l&&n&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),l=o,o=u.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=h[l+" "+o]||h["* "+o],!a)for(s in h)if(r=s.split(" "),r[1]===o&&(a=h[l+" "+r[0]]||h["* "+r[0]])){a===!0?a=h[s]:h[s]!==!0&&(o=r[0],u.unshift(r[1]));break}if(a!==!0)if(a&&t["throws"])e=a(e);else try{e=a(e)}catch(c){return{state:"parsererror",error:a?c:"No conversion from "+l+" to "+o}}}return{state:"success",data:e}}function B(t,e,i,n){var s;if(se.isArray(e))se.each(e,function(e,s){i||Vi.test(t)?n(t,s):B(t+"["+("object"==typeof s?e:"")+"]",s,i,n)});else if(i||"object"!==se.type(e))n(t,e);else for(s in e)B(t+"["+s+"]",e[s],i,n)}function q(){try{return new t.XMLHttpRequest}catch(e){}}function Y(){try{return new t.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}function V(t){return se.isWindow(t)?t:9===t.nodeType?t.defaultView||t.parentWindow:!1}var X=[],K=X.slice,Q=X.concat,G=X.push,J=X.indexOf,Z={},te=Z.toString,ee=Z.hasOwnProperty,ie={},ne="1.11.1",se=function(t,e){return new se.fn.init(t,e)},oe=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ae=/^-ms-/,re=/-([\da-z])/gi,le=function(t,e){return e.toUpperCase()};se.fn=se.prototype={jquery:ne,constructor:se,selector:"",length:0,toArray:function(){return K.call(this)},get:function(t){return null!=t?0>t?this[t+this.length]:this[t]:K.call(this)},pushStack:function(t){var e=se.merge(this.constructor(),t);return e.prevObject=this,e.context=this.context,e},each:function(t,e){return se.each(this,t,e)},map:function(t){return this.pushStack(se.map(this,function(e,i){return t.call(e,i,e)}))},slice:function(){return this.pushStack(K.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,i=+t+(0>t?e:0);return this.pushStack(i>=0&&e>i?[this[i]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:G,sort:X.sort,splice:X.splice},se.extend=se.fn.extend=function(){var t,e,i,n,s,o,a=arguments[0]||{},r=1,l=arguments.length,h=!1;for("boolean"==typeof a&&(h=a,a=arguments[r]||{},r++),"object"==typeof a||se.isFunction(a)||(a={}),r===l&&(a=this,r--);l>r;r++)if(null!=(s=arguments[r]))for(n in s)t=a[n],i=s[n],a!==i&&(h&&i&&(se.isPlainObject(i)||(e=se.isArray(i)))?(e?(e=!1,o=t&&se.isArray(t)?t:[]):o=t&&se.isPlainObject(t)?t:{},a[n]=se.extend(h,o,i)):void 0!==i&&(a[n]=i));return a},se.extend({expando:"jQuery"+(ne+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===se.type(t)},isArray:Array.isArray||function(t){return"array"===se.type(t)},isWindow:function(t){return null!=t&&t==t.window},isNumeric:function(t){return!se.isArray(t)&&t-parseFloat(t)>=0},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},isPlainObject:function(t){var e;if(!t||"object"!==se.type(t)||t.nodeType||se.isWindow(t))return!1;try{if(t.constructor&&!ee.call(t,"constructor")&&!ee.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(i){return!1}if(ie.ownLast)for(e in t)return ee.call(t,e);for(e in t);return void 0===e||ee.call(t,e)},type:function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?Z[te.call(t)]||"object":typeof t},globalEval:function(e){e&&se.trim(e)&&(t.execScript||function(e){t.eval.call(t,e)})(e)},camelCase:function(t){return t.replace(ae,"ms-").replace(re,le)},nodeName:function(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()},each:function(t,e,n){var s,o=0,a=t.length,r=i(t);if(n){if(r)for(;a>o&&(s=e.apply(t[o],n),s!==!1);o++);else for(o in t)if(s=e.apply(t[o],n),s===!1)break}else if(r)for(;a>o&&(s=e.call(t[o],o,t[o]),s!==!1);o++);else for(o in t)if(s=e.call(t[o],o,t[o]),s===!1)break;return t},trim:function(t){return null==t?"":(t+"").replace(oe,"")},makeArray:function(t,e){var n=e||[];return null!=t&&(i(Object(t))?se.merge(n,"string"==typeof t?[t]:t):G.call(n,t)),n},inArray:function(t,e,i){var n;if(e){if(J)return J.call(e,t,i);for(n=e.length,i=i?0>i?Math.max(0,n+i):i:0;n>i;i++)if(i in e&&e[i]===t)return i}return-1},merge:function(t,e){for(var i=+e.length,n=0,s=t.length;i>n;)t[s++]=e[n++];if(i!==i)for(;void 0!==e[n];)t[s++]=e[n++];return t.length=s,t},grep:function(t,e,i){for(var n,s=[],o=0,a=t.length,r=!i;a>o;o++)n=!e(t[o],o),n!==r&&s.push(t[o]);return s},map:function(t,e,n){var s,o=0,a=t.length,r=i(t),l=[];if(r)for(;a>o;o++)s=e(t[o],o,n),null!=s&&l.push(s);else for(o in t)s=e(t[o],o,n),null!=s&&l.push(s);return Q.apply([],l)},guid:1,proxy:function(t,e){var i,n,s;return"string"==typeof e&&(s=t[e],e=t,t=s),se.isFunction(t)?(i=K.call(arguments,2),n=function(){return t.apply(e||this,i.concat(K.call(arguments)))},n.guid=t.guid=t.guid||se.guid++,n):void 0},now:function(){return+new Date},support:ie}),se.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){Z["[object "+e+"]"]=e.toLowerCase()});var he=function(t){function e(t,e,i,n){var s,o,a,r,l,h,c,p,f,m;if((e?e.ownerDocument||e:L)!==P&&N(e),e=e||P,i=i||[],!t||"string"!=typeof t)return i;if(1!==(r=e.nodeType)&&9!==r)return[];if(H&&!n){if(s=ye.exec(t))if(a=s[1]){if(9===r){if(o=e.getElementById(a),!o||!o.parentNode)return i;if(o.id===a)return i.push(o),i}else if(e.ownerDocument&&(o=e.ownerDocument.getElementById(a))&&z(e,o)&&o.id===a)return i.push(o),i}else{if(s[2])return Z.apply(i,e.getElementsByTagName(t)),i;if((a=s[3])&&w.getElementsByClassName&&e.getElementsByClassName)return Z.apply(i,e.getElementsByClassName(a)),i}if(w.qsa&&(!F||!F.test(t))){if(p=c=W,f=e,m=9===r&&t,1===r&&"object"!==e.nodeName.toLowerCase()){for(h=D(t),(c=e.getAttribute("id"))?p=c.replace(_e,"\\$&"):e.setAttribute("id",p),p="[id='"+p+"'] ",l=h.length;l--;)h[l]=p+d(h[l]);f=be.test(t)&&u(e.parentNode)||e,m=h.join(",")}if(m)try{return Z.apply(i,f.querySelectorAll(m)),i}catch(g){}finally{c||e.removeAttribute("id")}}}return S(t.replace(le,"$1"),e,i,n)}function i(){function t(i,n){return e.push(i+" ")>x.cacheLength&&delete t[e.shift()],t[i+" "]=n}var e=[];return t}function n(t){return t[W]=!0,t}function s(t){var e=P.createElement("div");try{return!!t(e)}catch(i){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function o(t,e){for(var i=t.split("|"),n=t.length;n--;)x.attrHandle[i[n]]=e}function a(t,e){var i=e&&t,n=i&&1===t.nodeType&&1===e.nodeType&&(~e.sourceIndex||X)-(~t.sourceIndex||X);if(n)return n;if(i)for(;i=i.nextSibling;)if(i===e)return-1;return t?1:-1}function r(t){return function(e){var i=e.nodeName.toLowerCase();return"input"===i&&e.type===t}}function l(t){return function(e){var i=e.nodeName.toLowerCase();return("input"===i||"button"===i)&&e.type===t}}function h(t){return n(function(e){return e=+e,n(function(i,n){for(var s,o=t([],i.length,e),a=o.length;a--;)i[s=o[a]]&&(i[s]=!(n[s]=i[s]))})})}function u(t){return t&&typeof t.getElementsByTagName!==V&&t}function c(){}function d(t){for(var e=0,i=t.length,n="";i>e;e++)n+=t[e].value;return n}function p(t,e,i){var n=e.dir,s=i&&"parentNode"===n,o=U++;return e.first?function(e,i,o){for(;e=e[n];)if(1===e.nodeType||s)return t(e,i,o)}:function(e,i,a){var r,l,h=[R,o];if(a){for(;e=e[n];)if((1===e.nodeType||s)&&t(e,i,a))return!0}else for(;e=e[n];)if(1===e.nodeType||s){if(l=e[W]||(e[W]={}),(r=l[n])&&r[0]===R&&r[1]===o)return h[2]=r[2];if(l[n]=h,h[2]=t(e,i,a))return!0}}}function f(t){return t.length>1?function(e,i,n){for(var s=t.length;s--;)if(!t[s](e,i,n))return!1;return!0}:t[0]}function m(t,i,n){for(var s=0,o=i.length;o>s;s++)e(t,i[s],n);return n}function g(t,e,i,n,s){for(var o,a=[],r=0,l=t.length,h=null!=e;l>r;r++)(o=t[r])&&(!i||i(o,n,s))&&(a.push(o),h&&e.push(r));return a}function v(t,e,i,s,o,a){return s&&!s[W]&&(s=v(s)),o&&!o[W]&&(o=v(o,a)),n(function(n,a,r,l){var h,u,c,d=[],p=[],f=a.length,v=n||m(e||"*",r.nodeType?[r]:r,[]),y=!t||!n&&e?v:g(v,d,t,r,l),b=i?o||(n?t:f||s)?[]:a:y;if(i&&i(y,b,r,l),s)for(h=g(b,p),s(h,[],r,l),u=h.length;u--;)(c=h[u])&&(b[p[u]]=!(y[p[u]]=c));if(n){if(o||t){if(o){for(h=[],u=b.length;u--;)(c=b[u])&&h.push(y[u]=c);o(null,b=[],h,l)}for(u=b.length;u--;)(c=b[u])&&(h=o?ee.call(n,c):d[u])>-1&&(n[h]=!(a[h]=c))}}else b=g(b===a?b.splice(f,b.length):b),o?o(null,a,b,l):Z.apply(a,b)})}function y(t){for(var e,i,n,s=t.length,o=x.relative[t[0].type],a=o||x.relative[" "],r=o?1:0,l=p(function(t){return t===e},a,!0),h=p(function(t){return ee.call(e,t)>-1},a,!0),u=[function(t,i,n){return!o&&(n||i!==E)||((e=i).nodeType?l(t,i,n):h(t,i,n))}];s>r;r++)if(i=x.relative[t[r].type])u=[p(f(u),i)];else{if(i=x.filter[t[r].type].apply(null,t[r].matches),i[W]){for(n=++r;s>n&&!x.relative[t[n].type];n++);return v(r>1&&f(u),r>1&&d(t.slice(0,r-1).concat({value:" "===t[r-2].type?"*":""})).replace(le,"$1"),i,n>r&&y(t.slice(r,n)),s>n&&y(t=t.slice(n)),s>n&&d(t))}u.push(i)}return f(u)}function b(t,i){var s=i.length>0,o=t.length>0,a=function(n,a,r,l,h){var u,c,d,p=0,f="0",m=n&&[],v=[],y=E,b=n||o&&x.find.TAG("*",h),_=R+=null==y?1:Math.random()||.1,w=b.length;for(h&&(E=a!==P&&a);f!==w&&null!=(u=b[f]);f++){if(o&&u){for(c=0;d=t[c++];)if(d(u,a,r)){l.push(u);break}h&&(R=_)}s&&((u=!d&&u)&&p--,n&&m.push(u))}if(p+=f,s&&f!==p){for(c=0;d=i[c++];)d(m,v,a,r);if(n){if(p>0)for(;f--;)m[f]||v[f]||(v[f]=G.call(l));v=g(v)}Z.apply(l,v),h&&!n&&v.length>0&&p+i.length>1&&e.uniqueSort(l)}return h&&(R=_,E=y),m};return s?n(a):a}var _,w,x,C,k,D,T,S,E,M,I,N,P,A,H,F,j,O,z,W="sizzle"+-new Date,L=t.document,R=0,U=0,$=i(),B=i(),q=i(),Y=function(t,e){return t===e&&(I=!0),0},V="undefined",X=1<<31,K={}.hasOwnProperty,Q=[],G=Q.pop,J=Q.push,Z=Q.push,te=Q.slice,ee=Q.indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(this[e]===t)return e;return-1},ie="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",se="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",oe=se.replace("w","w#"),ae="\\["+ne+"*("+se+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+oe+"))|)"+ne+"*\\]",re=":("+se+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ae+")*)|.*)\\)|)",le=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),he=new RegExp("^"+ne+"*,"+ne+"*"),ue=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),ce=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),de=new RegExp(re),pe=new RegExp("^"+oe+"$"),fe={ID:new RegExp("^#("+se+")"),CLASS:new RegExp("^\\.("+se+")"),TAG:new RegExp("^("+se.replace("w","w*")+")"),ATTR:new RegExp("^"+ae),PSEUDO:new RegExp("^"+re),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+ie+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},me=/^(?:input|select|textarea|button)$/i,ge=/^h\d$/i,ve=/^[^{]+\{\s*\[native \w/,ye=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,be=/[+~]/,_e=/'|\\/g,we=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),xe=function(t,e,i){var n="0x"+e-65536;return n!==n||i?e:0>n?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320)};try{Z.apply(Q=te.call(L.childNodes),L.childNodes),Q[L.childNodes.length].nodeType}catch(Ce){Z={apply:Q.length?function(t,e){J.apply(t,te.call(e))}:function(t,e){for(var i=t.length,n=0;t[i++]=e[n++];);t.length=i-1}}}w=e.support={},k=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return e?"HTML"!==e.nodeName:!1},N=e.setDocument=function(t){var e,i=t?t.ownerDocument||t:L,n=i.defaultView;return i!==P&&9===i.nodeType&&i.documentElement?(P=i,A=i.documentElement,H=!k(i),n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",function(){N()},!1):n.attachEvent&&n.attachEvent("onunload",function(){N()})),w.attributes=s(function(t){return t.className="i",!t.getAttribute("className")}),w.getElementsByTagName=s(function(t){return t.appendChild(i.createComment("")),!t.getElementsByTagName("*").length}),w.getElementsByClassName=ve.test(i.getElementsByClassName)&&s(function(t){return t.innerHTML="<div class='a'></div><div class='a i'></div>",t.firstChild.className="i",2===t.getElementsByClassName("i").length}),w.getById=s(function(t){return A.appendChild(t).id=W,!i.getElementsByName||!i.getElementsByName(W).length}),w.getById?(x.find.ID=function(t,e){if(typeof e.getElementById!==V&&H){var i=e.getElementById(t);return i&&i.parentNode?[i]:[]}},x.filter.ID=function(t){var e=t.replace(we,xe);return function(t){return t.getAttribute("id")===e}}):(delete x.find.ID,x.filter.ID=function(t){var e=t.replace(we,xe);return function(t){var i=typeof t.getAttributeNode!==V&&t.getAttributeNode("id");return i&&i.value===e}}),x.find.TAG=w.getElementsByTagName?function(t,e){return typeof e.getElementsByTagName!==V?e.getElementsByTagName(t):void 0}:function(t,e){var i,n=[],s=0,o=e.getElementsByTagName(t);if("*"===t){for(;i=o[s++];)1===i.nodeType&&n.push(i);return n}return o},x.find.CLASS=w.getElementsByClassName&&function(t,e){return typeof e.getElementsByClassName!==V&&H?e.getElementsByClassName(t):void 0},j=[],F=[],(w.qsa=ve.test(i.querySelectorAll))&&(s(function(t){t.innerHTML="<select msallowclip=''><option selected=''></option></select>",t.querySelectorAll("[msallowclip^='']").length&&F.push("[*^$]="+ne+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||F.push("\\["+ne+"*(?:value|"+ie+")"),t.querySelectorAll(":checked").length||F.push(":checked")}),s(function(t){var e=i.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&F.push("name"+ne+"*[*^$|!~]?="),t.querySelectorAll(":enabled").length||F.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),F.push(",.*:")})),(w.matchesSelector=ve.test(O=A.matches||A.webkitMatchesSelector||A.mozMatchesSelector||A.oMatchesSelector||A.msMatchesSelector))&&s(function(t){w.disconnectedMatch=O.call(t,"div"),O.call(t,"[s!='']:x"),j.push("!=",re)}),F=F.length&&new RegExp(F.join("|")),j=j.length&&new RegExp(j.join("|")),e=ve.test(A.compareDocumentPosition),z=e||ve.test(A.contains)?function(t,e){var i=9===t.nodeType?t.documentElement:t,n=e&&e.parentNode;return t===n||!(!n||1!==n.nodeType||!(i.contains?i.contains(n):t.compareDocumentPosition&&16&t.compareDocumentPosition(n)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},Y=e?function(t,e){if(t===e)return I=!0,0;var n=!t.compareDocumentPosition-!e.compareDocumentPosition;return n?n:(n=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,1&n||!w.sortDetached&&e.compareDocumentPosition(t)===n?t===i||t.ownerDocument===L&&z(L,t)?-1:e===i||e.ownerDocument===L&&z(L,e)?1:M?ee.call(M,t)-ee.call(M,e):0:4&n?-1:1)}:function(t,e){if(t===e)return I=!0,0;var n,s=0,o=t.parentNode,r=e.parentNode,l=[t],h=[e];if(!o||!r)return t===i?-1:e===i?1:o?-1:r?1:M?ee.call(M,t)-ee.call(M,e):0;if(o===r)return a(t,e);for(n=t;n=n.parentNode;)l.unshift(n);for(n=e;n=n.parentNode;)h.unshift(n);for(;l[s]===h[s];)s++;return s?a(l[s],h[s]):l[s]===L?-1:h[s]===L?1:0},i):P},e.matches=function(t,i){return e(t,null,null,i)},e.matchesSelector=function(t,i){if((t.ownerDocument||t)!==P&&N(t),i=i.replace(ce,"='$1']"),!(!w.matchesSelector||!H||j&&j.test(i)||F&&F.test(i)))try{var n=O.call(t,i);if(n||w.disconnectedMatch||t.document&&11!==t.document.nodeType)return n}catch(s){}return e(i,P,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==P&&N(t),z(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==P&&N(t);var i=x.attrHandle[e.toLowerCase()],n=i&&K.call(x.attrHandle,e.toLowerCase())?i(t,e,!H):void 0;return void 0!==n?n:w.attributes||!H?t.getAttribute(e):(n=t.getAttributeNode(e))&&n.specified?n.value:null},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},e.uniqueSort=function(t){var e,i=[],n=0,s=0;if(I=!w.detectDuplicates,M=!w.sortStable&&t.slice(0),t.sort(Y),I){for(;e=t[s++];)e===t[s]&&(n=i.push(s));for(;n--;)t.splice(i[n],1)}return M=null,t},C=e.getText=function(t){var e,i="",n=0,s=t.nodeType;if(s){if(1===s||9===s||11===s){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)i+=C(t)}else if(3===s||4===s)return t.nodeValue}else for(;e=t[n++];)i+=C(e);return i},x=e.selectors={cacheLength:50,createPseudo:n,match:fe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(we,xe),t[3]=(t[3]||t[4]||t[5]||"").replace(we,xe),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,i=!t[6]&&t[2];return fe.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":i&&de.test(i)&&(e=D(i,!0))&&(e=i.indexOf(")",i.length-e)-i.length)&&(t[0]=t[0].slice(0,e),t[2]=i.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(we,xe).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=$[t+" "];return e||(e=new RegExp("(^|"+ne+")"+t+"("+ne+"|$)"))&&$(t,function(t){return e.test("string"==typeof t.className&&t.className||typeof t.getAttribute!==V&&t.getAttribute("class")||"")})},ATTR:function(t,i,n){return function(s){var o=e.attr(s,t);return null==o?"!="===i:i?(o+="","="===i?o===n:"!="===i?o!==n:"^="===i?n&&0===o.indexOf(n):"*="===i?n&&o.indexOf(n)>-1:"$="===i?n&&o.slice(-n.length)===n:"~="===i?(" "+o+" ").indexOf(n)>-1:"|="===i?o===n||o.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(t,e,i,n,s){var o="nth"!==t.slice(0,3),a="last"!==t.slice(-4),r="of-type"===e;return 1===n&&0===s?function(t){return!!t.parentNode}:function(e,i,l){var h,u,c,d,p,f,m=o!==a?"nextSibling":"previousSibling",g=e.parentNode,v=r&&e.nodeName.toLowerCase(),y=!l&&!r;if(g){if(o){for(;m;){for(c=e;c=c[m];)if(r?c.nodeName.toLowerCase()===v:1===c.nodeType)return!1;f=m="only"===t&&!f&&"nextSibling"}return!0}if(f=[a?g.firstChild:g.lastChild],a&&y){for(u=g[W]||(g[W]={}),h=u[t]||[],p=h[0]===R&&h[1],d=h[0]===R&&h[2],c=p&&g.childNodes[p];c=++p&&c&&c[m]||(d=p=0)||f.pop();)if(1===c.nodeType&&++d&&c===e){u[t]=[R,p,d];break}}else if(y&&(h=(e[W]||(e[W]={}))[t])&&h[0]===R)d=h[1];else for(;(c=++p&&c&&c[m]||(d=p=0)||f.pop())&&((r?c.nodeName.toLowerCase()!==v:1!==c.nodeType)||!++d||(y&&((c[W]||(c[W]={}))[t]=[R,d]),c!==e)););return d-=s,d===n||d%n===0&&d/n>=0}}},PSEUDO:function(t,i){var s,o=x.pseudos[t]||x.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return o[W]?o(i):o.length>1?(s=[t,t,"",i],x.setFilters.hasOwnProperty(t.toLowerCase())?n(function(t,e){for(var n,s=o(t,i),a=s.length;a--;)n=ee.call(t,s[a]),t[n]=!(e[n]=s[a])}):function(t){return o(t,0,s)}):o}},pseudos:{not:n(function(t){var e=[],i=[],s=T(t.replace(le,"$1"));return s[W]?n(function(t,e,i,n){for(var o,a=s(t,null,n,[]),r=t.length;r--;)(o=a[r])&&(t[r]=!(e[r]=o))}):function(t,n,o){return e[0]=t,s(e,null,o,i),!i.pop()}}),has:n(function(t){return function(i){return e(t,i).length>0}}),contains:n(function(t){return function(e){return(e.textContent||e.innerText||C(e)).indexOf(t)>-1}}),lang:n(function(t){return pe.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(we,xe).toLowerCase(),function(e){var i;do if(i=H?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return i=i.toLowerCase(),i===t||0===i.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var i=t.location&&t.location.hash;return i&&i.slice(1)===e.id},root:function(t){return t===A},focus:function(t){return t===P.activeElement&&(!P.hasFocus||P.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:function(t){return t.disabled===!1},disabled:function(t){return t.disabled===!0},checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,t.selected===!0},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!x.pseudos.empty(t)},header:function(t){return ge.test(t.nodeName)},input:function(t){return me.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:h(function(){return[0]}),last:h(function(t,e){return[e-1]}),eq:h(function(t,e,i){return[0>i?i+e:i]}),even:h(function(t,e){for(var i=0;e>i;i+=2)t.push(i);return t}),odd:h(function(t,e){for(var i=1;e>i;i+=2)t.push(i);return t}),lt:h(function(t,e,i){for(var n=0>i?i+e:i;--n>=0;)t.push(n);return t}),gt:h(function(t,e,i){for(var n=0>i?i+e:i;++n<e;)t.push(n);return t})}},x.pseudos.nth=x.pseudos.eq;for(_ in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})x.pseudos[_]=r(_);for(_ in{submit:!0,reset:!0})x.pseudos[_]=l(_);return c.prototype=x.filters=x.pseudos,x.setFilters=new c,D=e.tokenize=function(t,i){var n,s,o,a,r,l,h,u=B[t+" "];if(u)return i?0:u.slice(0);for(r=t,l=[],h=x.preFilter;r;){(!n||(s=he.exec(r)))&&(s&&(r=r.slice(s[0].length)||r),l.push(o=[])),n=!1,(s=ue.exec(r))&&(n=s.shift(),o.push({value:n,type:s[0].replace(le," ")}),r=r.slice(n.length));for(a in x.filter)!(s=fe[a].exec(r))||h[a]&&!(s=h[a](s))||(n=s.shift(),o.push({value:n,type:a,matches:s}),r=r.slice(n.length));if(!n)break}return i?r.length:r?e.error(t):B(t,l).slice(0)},T=e.compile=function(t,e){var i,n=[],s=[],o=q[t+" "];if(!o){for(e||(e=D(t)),i=e.length;i--;)o=y(e[i]),o[W]?n.push(o):s.push(o);o=q(t,b(s,n)),o.selector=t}return o},S=e.select=function(t,e,i,n){var s,o,a,r,l,h="function"==typeof t&&t,c=!n&&D(t=h.selector||t);if(i=i||[],1===c.length){if(o=c[0]=c[0].slice(0),o.length>2&&"ID"===(a=o[0]).type&&w.getById&&9===e.nodeType&&H&&x.relative[o[1].type]){if(e=(x.find.ID(a.matches[0].replace(we,xe),e)||[])[0],!e)return i;
    h&&(e=e.parentNode),t=t.slice(o.shift().value.length)}for(s=fe.needsContext.test(t)?0:o.length;s--&&(a=o[s],!x.relative[r=a.type]);)if((l=x.find[r])&&(n=l(a.matches[0].replace(we,xe),be.test(o[0].type)&&u(e.parentNode)||e))){if(o.splice(s,1),t=n.length&&d(o),!t)return Z.apply(i,n),i;break}}return(h||T(t,c))(n,e,!H,i,be.test(t)&&u(e.parentNode)||e),i},w.sortStable=W.split("").sort(Y).join("")===W,w.detectDuplicates=!!I,N(),w.sortDetached=s(function(t){return 1&t.compareDocumentPosition(P.createElement("div"))}),s(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||o("type|href|height|width",function(t,e,i){return i?void 0:t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),w.attributes&&s(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||o("value",function(t,e,i){return i||"input"!==t.nodeName.toLowerCase()?void 0:t.defaultValue}),s(function(t){return null==t.getAttribute("disabled")})||o(ie,function(t,e,i){var n;return i?void 0:t[e]===!0?e.toLowerCase():(n=t.getAttributeNode(e))&&n.specified?n.value:null}),e}(t);se.find=he,se.expr=he.selectors,se.expr[":"]=se.expr.pseudos,se.unique=he.uniqueSort,se.text=he.getText,se.isXMLDoc=he.isXML,se.contains=he.contains;var ue=se.expr.match.needsContext,ce=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,de=/^.[^:#\[\.,]*$/;se.filter=function(t,e,i){var n=e[0];return i&&(t=":not("+t+")"),1===e.length&&1===n.nodeType?se.find.matchesSelector(n,t)?[n]:[]:se.find.matches(t,se.grep(e,function(t){return 1===t.nodeType}))},se.fn.extend({find:function(t){var e,i=[],n=this,s=n.length;if("string"!=typeof t)return this.pushStack(se(t).filter(function(){for(e=0;s>e;e++)if(se.contains(n[e],this))return!0}));for(e=0;s>e;e++)se.find(t,n[e],i);return i=this.pushStack(s>1?se.unique(i):i),i.selector=this.selector?this.selector+" "+t:t,i},filter:function(t){return this.pushStack(n(this,t||[],!1))},not:function(t){return this.pushStack(n(this,t||[],!0))},is:function(t){return!!n(this,"string"==typeof t&&ue.test(t)?se(t):t||[],!1).length}});var pe,fe=t.document,me=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ge=se.fn.init=function(t,e){var i,n;if(!t)return this;if("string"==typeof t){if(i="<"===t.charAt(0)&&">"===t.charAt(t.length-1)&&t.length>=3?[null,t,null]:me.exec(t),!i||!i[1]&&e)return!e||e.jquery?(e||pe).find(t):this.constructor(e).find(t);if(i[1]){if(e=e instanceof se?e[0]:e,se.merge(this,se.parseHTML(i[1],e&&e.nodeType?e.ownerDocument||e:fe,!0)),ce.test(i[1])&&se.isPlainObject(e))for(i in e)se.isFunction(this[i])?this[i](e[i]):this.attr(i,e[i]);return this}if(n=fe.getElementById(i[2]),n&&n.parentNode){if(n.id!==i[2])return pe.find(t);this.length=1,this[0]=n}return this.context=fe,this.selector=t,this}return t.nodeType?(this.context=this[0]=t,this.length=1,this):se.isFunction(t)?"undefined"!=typeof pe.ready?pe.ready(t):t(se):(void 0!==t.selector&&(this.selector=t.selector,this.context=t.context),se.makeArray(t,this))};ge.prototype=se.fn,pe=se(fe);var ve=/^(?:parents|prev(?:Until|All))/,ye={children:!0,contents:!0,next:!0,prev:!0};se.extend({dir:function(t,e,i){for(var n=[],s=t[e];s&&9!==s.nodeType&&(void 0===i||1!==s.nodeType||!se(s).is(i));)1===s.nodeType&&n.push(s),s=s[e];return n},sibling:function(t,e){for(var i=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&i.push(t);return i}}),se.fn.extend({has:function(t){var e,i=se(t,this),n=i.length;return this.filter(function(){for(e=0;n>e;e++)if(se.contains(this,i[e]))return!0})},closest:function(t,e){for(var i,n=0,s=this.length,o=[],a=ue.test(t)||"string"!=typeof t?se(t,e||this.context):0;s>n;n++)for(i=this[n];i&&i!==e;i=i.parentNode)if(i.nodeType<11&&(a?a.index(i)>-1:1===i.nodeType&&se.find.matchesSelector(i,t))){o.push(i);break}return this.pushStack(o.length>1?se.unique(o):o)},index:function(t){return t?"string"==typeof t?se.inArray(this[0],se(t)):se.inArray(t.jquery?t[0]:t,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,e){return this.pushStack(se.unique(se.merge(this.get(),se(t,e))))},addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}}),se.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return se.dir(t,"parentNode")},parentsUntil:function(t,e,i){return se.dir(t,"parentNode",i)},next:function(t){return s(t,"nextSibling")},prev:function(t){return s(t,"previousSibling")},nextAll:function(t){return se.dir(t,"nextSibling")},prevAll:function(t){return se.dir(t,"previousSibling")},nextUntil:function(t,e,i){return se.dir(t,"nextSibling",i)},prevUntil:function(t,e,i){return se.dir(t,"previousSibling",i)},siblings:function(t){return se.sibling((t.parentNode||{}).firstChild,t)},children:function(t){return se.sibling(t.firstChild)},contents:function(t){return se.nodeName(t,"iframe")?t.contentDocument||t.contentWindow.document:se.merge([],t.childNodes)}},function(t,e){se.fn[t]=function(i,n){var s=se.map(this,e,i);return"Until"!==t.slice(-5)&&(n=i),n&&"string"==typeof n&&(s=se.filter(n,s)),this.length>1&&(ye[t]||(s=se.unique(s)),ve.test(t)&&(s=s.reverse())),this.pushStack(s)}});var be=/\S+/g,_e={};se.Callbacks=function(t){t="string"==typeof t?_e[t]||o(t):se.extend({},t);var e,i,n,s,a,r,l=[],h=!t.once&&[],u=function(o){for(i=t.memory&&o,n=!0,a=r||0,r=0,s=l.length,e=!0;l&&s>a;a++)if(l[a].apply(o[0],o[1])===!1&&t.stopOnFalse){i=!1;break}e=!1,l&&(h?h.length&&u(h.shift()):i?l=[]:c.disable())},c={add:function(){if(l){var n=l.length;!function o(e){se.each(e,function(e,i){var n=se.type(i);"function"===n?t.unique&&c.has(i)||l.push(i):i&&i.length&&"string"!==n&&o(i)})}(arguments),e?s=l.length:i&&(r=n,u(i))}return this},remove:function(){return l&&se.each(arguments,function(t,i){for(var n;(n=se.inArray(i,l,n))>-1;)l.splice(n,1),e&&(s>=n&&s--,a>=n&&a--)}),this},has:function(t){return t?se.inArray(t,l)>-1:!(!l||!l.length)},empty:function(){return l=[],s=0,this},disable:function(){return l=h=i=void 0,this},disabled:function(){return!l},lock:function(){return h=void 0,i||c.disable(),this},locked:function(){return!h},fireWith:function(t,i){return!l||n&&!h||(i=i||[],i=[t,i.slice?i.slice():i],e?h.push(i):u(i)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},se.extend({Deferred:function(t){var e=[["resolve","done",se.Callbacks("once memory"),"resolved"],["reject","fail",se.Callbacks("once memory"),"rejected"],["notify","progress",se.Callbacks("memory")]],i="pending",n={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var t=arguments;return se.Deferred(function(i){se.each(e,function(e,o){var a=se.isFunction(t[e])&&t[e];s[o[1]](function(){var t=a&&a.apply(this,arguments);t&&se.isFunction(t.promise)?t.promise().done(i.resolve).fail(i.reject).progress(i.notify):i[o[0]+"With"](this===n?i.promise():this,a?[t]:arguments)})}),t=null}).promise()},promise:function(t){return null!=t?se.extend(t,n):n}},s={};return n.pipe=n.then,se.each(e,function(t,o){var a=o[2],r=o[3];n[o[1]]=a.add,r&&a.add(function(){i=r},e[1^t][2].disable,e[2][2].lock),s[o[0]]=function(){return s[o[0]+"With"](this===s?n:this,arguments),this},s[o[0]+"With"]=a.fireWith}),n.promise(s),t&&t.call(s,s),s},when:function(t){var e,i,n,s=0,o=K.call(arguments),a=o.length,r=1!==a||t&&se.isFunction(t.promise)?a:0,l=1===r?t:se.Deferred(),h=function(t,i,n){return function(s){i[t]=this,n[t]=arguments.length>1?K.call(arguments):s,n===e?l.notifyWith(i,n):--r||l.resolveWith(i,n)}};if(a>1)for(e=new Array(a),i=new Array(a),n=new Array(a);a>s;s++)o[s]&&se.isFunction(o[s].promise)?o[s].promise().done(h(s,n,o)).fail(l.reject).progress(h(s,i,e)):--r;return r||l.resolveWith(n,o),l.promise()}});var we;se.fn.ready=function(t){return se.ready.promise().done(t),this},se.extend({isReady:!1,readyWait:1,holdReady:function(t){t?se.readyWait++:se.ready(!0)},ready:function(t){if(t===!0?!--se.readyWait:!se.isReady){if(!fe.body)return setTimeout(se.ready);se.isReady=!0,t!==!0&&--se.readyWait>0||(we.resolveWith(fe,[se]),se.fn.triggerHandler&&(se(fe).triggerHandler("ready"),se(fe).off("ready")))}}}),se.ready.promise=function(e){if(!we)if(we=se.Deferred(),"complete"===fe.readyState)setTimeout(se.ready);else if(fe.addEventListener)fe.addEventListener("DOMContentLoaded",r,!1),t.addEventListener("load",r,!1);else{fe.attachEvent("onreadystatechange",r),t.attachEvent("onload",r);var i=!1;try{i=null==t.frameElement&&fe.documentElement}catch(n){}i&&i.doScroll&&!function s(){if(!se.isReady){try{i.doScroll("left")}catch(t){return setTimeout(s,50)}a(),se.ready()}}()}return we.promise(e)};var xe,Ce="undefined";for(xe in se(ie))break;ie.ownLast="0"!==xe,ie.inlineBlockNeedsLayout=!1,se(function(){var t,e,i,n;i=fe.getElementsByTagName("body")[0],i&&i.style&&(e=fe.createElement("div"),n=fe.createElement("div"),n.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",i.appendChild(n).appendChild(e),typeof e.style.zoom!==Ce&&(e.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",ie.inlineBlockNeedsLayout=t=3===e.offsetWidth,t&&(i.style.zoom=1)),i.removeChild(n))}),function(){var t=fe.createElement("div");if(null==ie.deleteExpando){ie.deleteExpando=!0;try{delete t.test}catch(e){ie.deleteExpando=!1}}t=null}(),se.acceptData=function(t){var e=se.noData[(t.nodeName+" ").toLowerCase()],i=+t.nodeType||1;return 1!==i&&9!==i?!1:!e||e!==!0&&t.getAttribute("classid")===e};var ke=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,De=/([A-Z])/g;se.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(t){return t=t.nodeType?se.cache[t[se.expando]]:t[se.expando],!!t&&!h(t)},data:function(t,e,i){return u(t,e,i)},removeData:function(t,e){return c(t,e)},_data:function(t,e,i){return u(t,e,i,!0)},_removeData:function(t,e){return c(t,e,!0)}}),se.fn.extend({data:function(t,e){var i,n,s,o=this[0],a=o&&o.attributes;if(void 0===t){if(this.length&&(s=se.data(o),1===o.nodeType&&!se._data(o,"parsedAttrs"))){for(i=a.length;i--;)a[i]&&(n=a[i].name,0===n.indexOf("data-")&&(n=se.camelCase(n.slice(5)),l(o,n,s[n])));se._data(o,"parsedAttrs",!0)}return s}return"object"==typeof t?this.each(function(){se.data(this,t)}):arguments.length>1?this.each(function(){se.data(this,t,e)}):o?l(o,t,se.data(o,t)):void 0},removeData:function(t){return this.each(function(){se.removeData(this,t)})}}),se.extend({queue:function(t,e,i){var n;return t?(e=(e||"fx")+"queue",n=se._data(t,e),i&&(!n||se.isArray(i)?n=se._data(t,e,se.makeArray(i)):n.push(i)),n||[]):void 0},dequeue:function(t,e){e=e||"fx";var i=se.queue(t,e),n=i.length,s=i.shift(),o=se._queueHooks(t,e),a=function(){se.dequeue(t,e)};"inprogress"===s&&(s=i.shift(),n--),s&&("fx"===e&&i.unshift("inprogress"),delete o.stop,s.call(t,a,o)),!n&&o&&o.empty.fire()},_queueHooks:function(t,e){var i=e+"queueHooks";return se._data(t,i)||se._data(t,i,{empty:se.Callbacks("once memory").add(function(){se._removeData(t,e+"queue"),se._removeData(t,i)})})}}),se.fn.extend({queue:function(t,e){var i=2;return"string"!=typeof t&&(e=t,t="fx",i--),arguments.length<i?se.queue(this[0],t):void 0===e?this:this.each(function(){var i=se.queue(this,t,e);se._queueHooks(this,t),"fx"===t&&"inprogress"!==i[0]&&se.dequeue(this,t)})},dequeue:function(t){return this.each(function(){se.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},promise:function(t,e){var i,n=1,s=se.Deferred(),o=this,a=this.length,r=function(){--n||s.resolveWith(o,[o])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";a--;)i=se._data(o[a],t+"queueHooks"),i&&i.empty&&(n++,i.empty.add(r));return r(),s.promise(e)}});var Te=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Se=["Top","Right","Bottom","Left"],Ee=function(t,e){return t=e||t,"none"===se.css(t,"display")||!se.contains(t.ownerDocument,t)},Me=se.access=function(t,e,i,n,s,o,a){var r=0,l=t.length,h=null==i;if("object"===se.type(i)){s=!0;for(r in i)se.access(t,e,r,i[r],!0,o,a)}else if(void 0!==n&&(s=!0,se.isFunction(n)||(a=!0),h&&(a?(e.call(t,n),e=null):(h=e,e=function(t,e,i){return h.call(se(t),i)})),e))for(;l>r;r++)e(t[r],i,a?n:n.call(t[r],r,e(t[r],i)));return s?t:h?e.call(t):l?e(t[0],i):o},Ie=/^(?:checkbox|radio)$/i;!function(){var t=fe.createElement("input"),e=fe.createElement("div"),i=fe.createDocumentFragment();if(e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",ie.leadingWhitespace=3===e.firstChild.nodeType,ie.tbody=!e.getElementsByTagName("tbody").length,ie.htmlSerialize=!!e.getElementsByTagName("link").length,ie.html5Clone="<:nav></:nav>"!==fe.createElement("nav").cloneNode(!0).outerHTML,t.type="checkbox",t.checked=!0,i.appendChild(t),ie.appendChecked=t.checked,e.innerHTML="<textarea>x</textarea>",ie.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue,i.appendChild(e),e.innerHTML="<input type='radio' checked='checked' name='t'/>",ie.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,ie.noCloneEvent=!0,e.attachEvent&&(e.attachEvent("onclick",function(){ie.noCloneEvent=!1}),e.cloneNode(!0).click()),null==ie.deleteExpando){ie.deleteExpando=!0;try{delete e.test}catch(n){ie.deleteExpando=!1}}}(),function(){var e,i,n=fe.createElement("div");for(e in{submit:!0,change:!0,focusin:!0})i="on"+e,(ie[e+"Bubbles"]=i in t)||(n.setAttribute(i,"t"),ie[e+"Bubbles"]=n.attributes[i].expando===!1);n=null}();var Ne=/^(?:input|select|textarea)$/i,Pe=/^key/,Ae=/^(?:mouse|pointer|contextmenu)|click/,He=/^(?:focusinfocus|focusoutblur)$/,Fe=/^([^.]*)(?:\.(.+)|)$/;se.event={global:{},add:function(t,e,i,n,s){var o,a,r,l,h,u,c,d,p,f,m,g=se._data(t);if(g){for(i.handler&&(l=i,i=l.handler,s=l.selector),i.guid||(i.guid=se.guid++),(a=g.events)||(a=g.events={}),(u=g.handle)||(u=g.handle=function(t){return typeof se===Ce||t&&se.event.triggered===t.type?void 0:se.event.dispatch.apply(u.elem,arguments)},u.elem=t),e=(e||"").match(be)||[""],r=e.length;r--;)o=Fe.exec(e[r])||[],p=m=o[1],f=(o[2]||"").split(".").sort(),p&&(h=se.event.special[p]||{},p=(s?h.delegateType:h.bindType)||p,h=se.event.special[p]||{},c=se.extend({type:p,origType:m,data:n,handler:i,guid:i.guid,selector:s,needsContext:s&&se.expr.match.needsContext.test(s),namespace:f.join(".")},l),(d=a[p])||(d=a[p]=[],d.delegateCount=0,h.setup&&h.setup.call(t,n,f,u)!==!1||(t.addEventListener?t.addEventListener(p,u,!1):t.attachEvent&&t.attachEvent("on"+p,u))),h.add&&(h.add.call(t,c),c.handler.guid||(c.handler.guid=i.guid)),s?d.splice(d.delegateCount++,0,c):d.push(c),se.event.global[p]=!0);t=null}},remove:function(t,e,i,n,s){var o,a,r,l,h,u,c,d,p,f,m,g=se.hasData(t)&&se._data(t);if(g&&(u=g.events)){for(e=(e||"").match(be)||[""],h=e.length;h--;)if(r=Fe.exec(e[h])||[],p=m=r[1],f=(r[2]||"").split(".").sort(),p){for(c=se.event.special[p]||{},p=(n?c.delegateType:c.bindType)||p,d=u[p]||[],r=r[2]&&new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=d.length;o--;)a=d[o],!s&&m!==a.origType||i&&i.guid!==a.guid||r&&!r.test(a.namespace)||n&&n!==a.selector&&("**"!==n||!a.selector)||(d.splice(o,1),a.selector&&d.delegateCount--,c.remove&&c.remove.call(t,a));l&&!d.length&&(c.teardown&&c.teardown.call(t,f,g.handle)!==!1||se.removeEvent(t,p,g.handle),delete u[p])}else for(p in u)se.event.remove(t,p+e[h],i,n,!0);se.isEmptyObject(u)&&(delete g.handle,se._removeData(t,"events"))}},trigger:function(e,i,n,s){var o,a,r,l,h,u,c,d=[n||fe],p=ee.call(e,"type")?e.type:e,f=ee.call(e,"namespace")?e.namespace.split("."):[];if(r=u=n=n||fe,3!==n.nodeType&&8!==n.nodeType&&!He.test(p+se.event.triggered)&&(p.indexOf(".")>=0&&(f=p.split("."),p=f.shift(),f.sort()),a=p.indexOf(":")<0&&"on"+p,e=e[se.expando]?e:new se.Event(p,"object"==typeof e&&e),e.isTrigger=s?2:3,e.namespace=f.join("."),e.namespace_re=e.namespace?new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),i=null==i?[e]:se.makeArray(i,[e]),h=se.event.special[p]||{},s||!h.trigger||h.trigger.apply(n,i)!==!1)){if(!s&&!h.noBubble&&!se.isWindow(n)){for(l=h.delegateType||p,He.test(l+p)||(r=r.parentNode);r;r=r.parentNode)d.push(r),u=r;u===(n.ownerDocument||fe)&&d.push(u.defaultView||u.parentWindow||t)}for(c=0;(r=d[c++])&&!e.isPropagationStopped();)e.type=c>1?l:h.bindType||p,o=(se._data(r,"events")||{})[e.type]&&se._data(r,"handle"),o&&o.apply(r,i),o=a&&r[a],o&&o.apply&&se.acceptData(r)&&(e.result=o.apply(r,i),e.result===!1&&e.preventDefault());if(e.type=p,!s&&!e.isDefaultPrevented()&&(!h._default||h._default.apply(d.pop(),i)===!1)&&se.acceptData(n)&&a&&n[p]&&!se.isWindow(n)){u=n[a],u&&(n[a]=null),se.event.triggered=p;try{n[p]()}catch(m){}se.event.triggered=void 0,u&&(n[a]=u)}return e.result}},dispatch:function(t){t=se.event.fix(t);var e,i,n,s,o,a=[],r=K.call(arguments),l=(se._data(this,"events")||{})[t.type]||[],h=se.event.special[t.type]||{};if(r[0]=t,t.delegateTarget=this,!h.preDispatch||h.preDispatch.call(this,t)!==!1){for(a=se.event.handlers.call(this,t,l),e=0;(s=a[e++])&&!t.isPropagationStopped();)for(t.currentTarget=s.elem,o=0;(n=s.handlers[o++])&&!t.isImmediatePropagationStopped();)(!t.namespace_re||t.namespace_re.test(n.namespace))&&(t.handleObj=n,t.data=n.data,i=((se.event.special[n.origType]||{}).handle||n.handler).apply(s.elem,r),void 0!==i&&(t.result=i)===!1&&(t.preventDefault(),t.stopPropagation()));return h.postDispatch&&h.postDispatch.call(this,t),t.result}},handlers:function(t,e){var i,n,s,o,a=[],r=e.delegateCount,l=t.target;if(r&&l.nodeType&&(!t.button||"click"!==t.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==t.type)){for(s=[],o=0;r>o;o++)n=e[o],i=n.selector+" ",void 0===s[i]&&(s[i]=n.needsContext?se(i,this).index(l)>=0:se.find(i,this,null,[l]).length),s[i]&&s.push(n);s.length&&a.push({elem:l,handlers:s})}return r<e.length&&a.push({elem:this,handlers:e.slice(r)}),a},fix:function(t){if(t[se.expando])return t;var e,i,n,s=t.type,o=t,a=this.fixHooks[s];for(a||(this.fixHooks[s]=a=Ae.test(s)?this.mouseHooks:Pe.test(s)?this.keyHooks:{}),n=a.props?this.props.concat(a.props):this.props,t=new se.Event(o),e=n.length;e--;)i=n[e],t[i]=o[i];return t.target||(t.target=o.srcElement||fe),3===t.target.nodeType&&(t.target=t.target.parentNode),t.metaKey=!!t.metaKey,a.filter?a.filter(t,o):t},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(t,e){return null==t.which&&(t.which=null!=e.charCode?e.charCode:e.keyCode),t}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(t,e){var i,n,s,o=e.button,a=e.fromElement;return null==t.pageX&&null!=e.clientX&&(n=t.target.ownerDocument||fe,s=n.documentElement,i=n.body,t.pageX=e.clientX+(s&&s.scrollLeft||i&&i.scrollLeft||0)-(s&&s.clientLeft||i&&i.clientLeft||0),t.pageY=e.clientY+(s&&s.scrollTop||i&&i.scrollTop||0)-(s&&s.clientTop||i&&i.clientTop||0)),!t.relatedTarget&&a&&(t.relatedTarget=a===t.target?e.toElement:a),t.which||void 0===o||(t.which=1&o?1:2&o?3:4&o?2:0),t}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==f()&&this.focus)try{return this.focus(),!1}catch(t){}},delegateType:"focusin"},blur:{trigger:function(){return this===f()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return se.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(t){return se.nodeName(t.target,"a")}},beforeunload:{postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}},simulate:function(t,e,i,n){var s=se.extend(new se.Event,i,{type:t,isSimulated:!0,originalEvent:{}});n?se.event.trigger(s,null,e):se.event.dispatch.call(e,s),s.isDefaultPrevented()&&i.preventDefault()}},se.removeEvent=fe.removeEventListener?function(t,e,i){t.removeEventListener&&t.removeEventListener(e,i,!1)}:function(t,e,i){var n="on"+e;t.detachEvent&&(typeof t[n]===Ce&&(t[n]=null),t.detachEvent(n,i))},se.Event=function(t,e){return this instanceof se.Event?(t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&t.returnValue===!1?d:p):this.type=t,e&&se.extend(this,e),this.timeStamp=t&&t.timeStamp||se.now(),void(this[se.expando]=!0)):new se.Event(t,e)},se.Event.prototype={isDefaultPrevented:p,isPropagationStopped:p,isImmediatePropagationStopped:p,preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=d,t&&(t.preventDefault?t.preventDefault():t.returnValue=!1)},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=d,t&&(t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0)},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=d,t&&t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.stopPropagation()}},se.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,e){se.event.special[t]={delegateType:e,bindType:e,handle:function(t){var i,n=this,s=t.relatedTarget,o=t.handleObj;return(!s||s!==n&&!se.contains(n,s))&&(t.type=o.origType,i=o.handler.apply(this,arguments),t.type=e),i}}}),ie.submitBubbles||(se.event.special.submit={setup:function(){return se.nodeName(this,"form")?!1:void se.event.add(this,"click._submit keypress._submit",function(t){var e=t.target,i=se.nodeName(e,"input")||se.nodeName(e,"button")?e.form:void 0;i&&!se._data(i,"submitBubbles")&&(se.event.add(i,"submit._submit",function(t){t._submit_bubble=!0}),se._data(i,"submitBubbles",!0))})},postDispatch:function(t){t._submit_bubble&&(delete t._submit_bubble,this.parentNode&&!t.isTrigger&&se.event.simulate("submit",this.parentNode,t,!0))},teardown:function(){return se.nodeName(this,"form")?!1:void se.event.remove(this,"._submit")}}),ie.changeBubbles||(se.event.special.change={setup:function(){return Ne.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(se.event.add(this,"propertychange._change",function(t){"checked"===t.originalEvent.propertyName&&(this._just_changed=!0)}),se.event.add(this,"click._change",function(t){this._just_changed&&!t.isTrigger&&(this._just_changed=!1),se.event.simulate("change",this,t,!0)})),!1):void se.event.add(this,"beforeactivate._change",function(t){var e=t.target;Ne.test(e.nodeName)&&!se._data(e,"changeBubbles")&&(se.event.add(e,"change._change",function(t){!this.parentNode||t.isSimulated||t.isTrigger||se.event.simulate("change",this.parentNode,t,!0)}),se._data(e,"changeBubbles",!0))})},handle:function(t){var e=t.target;return this!==e||t.isSimulated||t.isTrigger||"radio"!==e.type&&"checkbox"!==e.type?t.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return se.event.remove(this,"._change"),!Ne.test(this.nodeName)}}),ie.focusinBubbles||se.each({focus:"focusin",blur:"focusout"},function(t,e){var i=function(t){se.event.simulate(e,t.target,se.event.fix(t),!0)};se.event.special[e]={setup:function(){var n=this.ownerDocument||this,s=se._data(n,e);s||n.addEventListener(t,i,!0),se._data(n,e,(s||0)+1)},teardown:function(){var n=this.ownerDocument||this,s=se._data(n,e)-1;s?se._data(n,e,s):(n.removeEventListener(t,i,!0),se._removeData(n,e))}}}),se.fn.extend({on:function(t,e,i,n,s){var o,a;if("object"==typeof t){"string"!=typeof e&&(i=i||e,e=void 0);for(o in t)this.on(o,e,i,t[o],s);return this}if(null==i&&null==n?(n=e,i=e=void 0):null==n&&("string"==typeof e?(n=i,i=void 0):(n=i,i=e,e=void 0)),n===!1)n=p;else if(!n)return this;return 1===s&&(a=n,n=function(t){return se().off(t),a.apply(this,arguments)},n.guid=a.guid||(a.guid=se.guid++)),this.each(function(){se.event.add(this,t,n,i,e)})},one:function(t,e,i,n){return this.on(t,e,i,n,1)},off:function(t,e,i){var n,s;if(t&&t.preventDefault&&t.handleObj)return n=t.handleObj,se(t.delegateTarget).off(n.namespace?n.origType+"."+n.namespace:n.origType,n.selector,n.handler),this;if("object"==typeof t){for(s in t)this.off(s,e,t[s]);return this}return(e===!1||"function"==typeof e)&&(i=e,e=void 0),i===!1&&(i=p),this.each(function(){se.event.remove(this,t,i,e)})},trigger:function(t,e){return this.each(function(){se.event.trigger(t,e,this)})},triggerHandler:function(t,e){var i=this[0];return i?se.event.trigger(t,e,i,!0):void 0}});var je="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Oe=/ jQuery\d+="(?:null|\d+)"/g,ze=new RegExp("<(?:"+je+")[\\s/>]","i"),We=/^\s+/,Le=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Re=/<([\w:]+)/,Ue=/<tbody/i,$e=/<|&#?\w+;/,Be=/<(?:script|style|link)/i,qe=/checked\s*(?:[^=]|=\s*.checked.)/i,Ye=/^$|\/(?:java|ecma)script/i,Ve=/^true\/(.*)/,Xe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Ke={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:ie.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},Qe=m(fe),Ge=Qe.appendChild(fe.createElement("div"));Ke.optgroup=Ke.option,Ke.tbody=Ke.tfoot=Ke.colgroup=Ke.caption=Ke.thead,Ke.th=Ke.td,se.extend({clone:function(t,e,i){var n,s,o,a,r,l=se.contains(t.ownerDocument,t);if(ie.html5Clone||se.isXMLDoc(t)||!ze.test("<"+t.nodeName+">")?o=t.cloneNode(!0):(Ge.innerHTML=t.outerHTML,Ge.removeChild(o=Ge.firstChild)),!(ie.noCloneEvent&&ie.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||se.isXMLDoc(t)))for(n=g(o),r=g(t),a=0;null!=(s=r[a]);++a)n[a]&&C(s,n[a]);if(e)if(i)for(r=r||g(t),n=n||g(o),a=0;null!=(s=r[a]);a++)x(s,n[a]);else x(t,o);return n=g(o,"script"),n.length>0&&w(n,!l&&g(t,"script")),n=r=s=null,o},buildFragment:function(t,e,i,n){for(var s,o,a,r,l,h,u,c=t.length,d=m(e),p=[],f=0;c>f;f++)if(o=t[f],o||0===o)if("object"===se.type(o))se.merge(p,o.nodeType?[o]:o);else if($e.test(o)){for(r=r||d.appendChild(e.createElement("div")),l=(Re.exec(o)||["",""])[1].toLowerCase(),u=Ke[l]||Ke._default,r.innerHTML=u[1]+o.replace(Le,"<$1></$2>")+u[2],s=u[0];s--;)r=r.lastChild;if(!ie.leadingWhitespace&&We.test(o)&&p.push(e.createTextNode(We.exec(o)[0])),!ie.tbody)for(o="table"!==l||Ue.test(o)?"<table>"!==u[1]||Ue.test(o)?0:r:r.firstChild,s=o&&o.childNodes.length;s--;)se.nodeName(h=o.childNodes[s],"tbody")&&!h.childNodes.length&&o.removeChild(h);for(se.merge(p,r.childNodes),r.textContent="";r.firstChild;)r.removeChild(r.firstChild);r=d.lastChild}else p.push(e.createTextNode(o));for(r&&d.removeChild(r),ie.appendChecked||se.grep(g(p,"input"),v),f=0;o=p[f++];)if((!n||-1===se.inArray(o,n))&&(a=se.contains(o.ownerDocument,o),r=g(d.appendChild(o),"script"),a&&w(r),i))for(s=0;o=r[s++];)Ye.test(o.type||"")&&i.push(o);return r=null,d},cleanData:function(t,e){for(var i,n,s,o,a=0,r=se.expando,l=se.cache,h=ie.deleteExpando,u=se.event.special;null!=(i=t[a]);a++)if((e||se.acceptData(i))&&(s=i[r],o=s&&l[s])){if(o.events)for(n in o.events)u[n]?se.event.remove(i,n):se.removeEvent(i,n,o.handle);l[s]&&(delete l[s],h?delete i[r]:typeof i.removeAttribute!==Ce?i.removeAttribute(r):i[r]=null,X.push(s))}}}),se.fn.extend({text:function(t){return Me(this,function(t){return void 0===t?se.text(this):this.empty().append((this[0]&&this[0].ownerDocument||fe).createTextNode(t))},null,t,arguments.length)},append:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=y(this,t);e.appendChild(t)}})},prepend:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=y(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},remove:function(t,e){for(var i,n=t?se.filter(t,this):this,s=0;null!=(i=n[s]);s++)e||1!==i.nodeType||se.cleanData(g(i)),i.parentNode&&(e&&se.contains(i.ownerDocument,i)&&w(g(i,"script")),i.parentNode.removeChild(i));return this},empty:function(){for(var t,e=0;null!=(t=this[e]);e++){for(1===t.nodeType&&se.cleanData(g(t,!1));t.firstChild;)t.removeChild(t.firstChild);t.options&&se.nodeName(t,"select")&&(t.options.length=0)}return this},clone:function(t,e){return t=null==t?!1:t,e=null==e?t:e,this.map(function(){return se.clone(this,t,e)})},html:function(t){return Me(this,function(t){var e=this[0]||{},i=0,n=this.length;if(void 0===t)return 1===e.nodeType?e.innerHTML.replace(Oe,""):void 0;if(!("string"!=typeof t||Be.test(t)||!ie.htmlSerialize&&ze.test(t)||!ie.leadingWhitespace&&We.test(t)||Ke[(Re.exec(t)||["",""])[1].toLowerCase()])){t=t.replace(Le,"<$1></$2>");try{for(;n>i;i++)e=this[i]||{},1===e.nodeType&&(se.cleanData(g(e,!1)),e.innerHTML=t);e=0}catch(s){}}e&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=arguments[0];return this.domManip(arguments,function(e){t=this.parentNode,se.cleanData(g(this)),t&&t.replaceChild(e,this)}),t&&(t.length||t.nodeType)?this:this.remove()},detach:function(t){return this.remove(t,!0)},domManip:function(t,e){t=Q.apply([],t);var i,n,s,o,a,r,l=0,h=this.length,u=this,c=h-1,d=t[0],p=se.isFunction(d);if(p||h>1&&"string"==typeof d&&!ie.checkClone&&qe.test(d))return this.each(function(i){var n=u.eq(i);p&&(t[0]=d.call(this,i,n.html())),n.domManip(t,e)});if(h&&(r=se.buildFragment(t,this[0].ownerDocument,!1,this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=se.map(g(r,"script"),b),s=o.length;h>l;l++)n=r,l!==c&&(n=se.clone(n,!0,!0),s&&se.merge(o,g(n,"script"))),e.call(this[l],n,l);if(s)for(a=o[o.length-1].ownerDocument,se.map(o,_),l=0;s>l;l++)n=o[l],Ye.test(n.type||"")&&!se._data(n,"globalEval")&&se.contains(a,n)&&(n.src?se._evalUrl&&se._evalUrl(n.src):se.globalEval((n.text||n.textContent||n.innerHTML||"").replace(Xe,"")));r=i=null}return this}}),se.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,e){se.fn[t]=function(t){for(var i,n=0,s=[],o=se(t),a=o.length-1;a>=n;n++)i=n===a?this:this.clone(!0),se(o[n])[e](i),G.apply(s,i.get());return this.pushStack(s)}});var Je,Ze={};!function(){var t;ie.shrinkWrapBlocks=function(){if(null!=t)return t;t=!1;var e,i,n;return i=fe.getElementsByTagName("body")[0],i&&i.style?(e=fe.createElement("div"),n=fe.createElement("div"),n.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",i.appendChild(n).appendChild(e),typeof e.style.zoom!==Ce&&(e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",e.appendChild(fe.createElement("div")).style.width="5px",t=3!==e.offsetWidth),i.removeChild(n),t):void 0}}();var ti,ei,ii=/^margin/,ni=new RegExp("^("+Te+")(?!px)[a-z%]+$","i"),si=/^(top|right|bottom|left)$/;t.getComputedStyle?(ti=function(t){return t.ownerDocument.defaultView.getComputedStyle(t,null)},ei=function(t,e,i){var n,s,o,a,r=t.style;return i=i||ti(t),a=i?i.getPropertyValue(e)||i[e]:void 0,i&&(""!==a||se.contains(t.ownerDocument,t)||(a=se.style(t,e)),ni.test(a)&&ii.test(e)&&(n=r.width,s=r.minWidth,o=r.maxWidth,r.minWidth=r.maxWidth=r.width=a,a=i.width,r.width=n,r.minWidth=s,r.maxWidth=o)),void 0===a?a:a+""}):fe.documentElement.currentStyle&&(ti=function(t){return t.currentStyle},ei=function(t,e,i){var n,s,o,a,r=t.style;return i=i||ti(t),a=i?i[e]:void 0,null==a&&r&&r[e]&&(a=r[e]),ni.test(a)&&!si.test(e)&&(n=r.left,s=t.runtimeStyle,o=s&&s.left,o&&(s.left=t.currentStyle.left),r.left="fontSize"===e?"1em":a,a=r.pixelLeft+"px",r.left=n,o&&(s.left=o)),void 0===a?a:a+""||"auto"}),function(){function e(){var e,i,n,s;i=fe.getElementsByTagName("body")[0],i&&i.style&&(e=fe.createElement("div"),n=fe.createElement("div"),n.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",i.appendChild(n).appendChild(e),e.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",o=a=!1,l=!0,t.getComputedStyle&&(o="1%"!==(t.getComputedStyle(e,null)||{}).top,a="4px"===(t.getComputedStyle(e,null)||{width:"4px"}).width,s=e.appendChild(fe.createElement("div")),s.style.cssText=e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",s.style.marginRight=s.style.width="0",e.style.width="1px",l=!parseFloat((t.getComputedStyle(s,null)||{}).marginRight)),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=e.getElementsByTagName("td"),s[0].style.cssText="margin:0;border:0;padding:0;display:none",r=0===s[0].offsetHeight,r&&(s[0].style.display="",s[1].style.display="none",r=0===s[0].offsetHeight),i.removeChild(n))
}var i,n,s,o,a,r,l;i=fe.createElement("div"),i.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",s=i.getElementsByTagName("a")[0],n=s&&s.style,n&&(n.cssText="float:left;opacity:.5",ie.opacity="0.5"===n.opacity,ie.cssFloat=!!n.cssFloat,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",ie.clearCloneStyle="content-box"===i.style.backgroundClip,ie.boxSizing=""===n.boxSizing||""===n.MozBoxSizing||""===n.WebkitBoxSizing,se.extend(ie,{reliableHiddenOffsets:function(){return null==r&&e(),r},boxSizingReliable:function(){return null==a&&e(),a},pixelPosition:function(){return null==o&&e(),o},reliableMarginRight:function(){return null==l&&e(),l}}))}(),se.swap=function(t,e,i,n){var s,o,a={};for(o in e)a[o]=t.style[o],t.style[o]=e[o];s=i.apply(t,n||[]);for(o in e)t.style[o]=a[o];return s};var oi=/alpha\([^)]*\)/i,ai=/opacity\s*=\s*([^)]*)/,ri=/^(none|table(?!-c[ea]).+)/,li=new RegExp("^("+Te+")(.*)$","i"),hi=new RegExp("^([+-])=("+Te+")","i"),ui={position:"absolute",visibility:"hidden",display:"block"},ci={letterSpacing:"0",fontWeight:"400"},di=["Webkit","O","Moz","ms"];se.extend({cssHooks:{opacity:{get:function(t,e){if(e){var i=ei(t,"opacity");return""===i?"1":i}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":ie.cssFloat?"cssFloat":"styleFloat"},style:function(t,e,i,n){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var s,o,a,r=se.camelCase(e),l=t.style;if(e=se.cssProps[r]||(se.cssProps[r]=S(l,r)),a=se.cssHooks[e]||se.cssHooks[r],void 0===i)return a&&"get"in a&&void 0!==(s=a.get(t,!1,n))?s:l[e];if(o=typeof i,"string"===o&&(s=hi.exec(i))&&(i=(s[1]+1)*s[2]+parseFloat(se.css(t,e)),o="number"),null!=i&&i===i&&("number"!==o||se.cssNumber[r]||(i+="px"),ie.clearCloneStyle||""!==i||0!==e.indexOf("background")||(l[e]="inherit"),!(a&&"set"in a&&void 0===(i=a.set(t,i,n)))))try{l[e]=i}catch(h){}}},css:function(t,e,i,n){var s,o,a,r=se.camelCase(e);return e=se.cssProps[r]||(se.cssProps[r]=S(t.style,r)),a=se.cssHooks[e]||se.cssHooks[r],a&&"get"in a&&(o=a.get(t,!0,i)),void 0===o&&(o=ei(t,e,n)),"normal"===o&&e in ci&&(o=ci[e]),""===i||i?(s=parseFloat(o),i===!0||se.isNumeric(s)?s||0:o):o}}),se.each(["height","width"],function(t,e){se.cssHooks[e]={get:function(t,i,n){return i?ri.test(se.css(t,"display"))&&0===t.offsetWidth?se.swap(t,ui,function(){return N(t,e,n)}):N(t,e,n):void 0},set:function(t,i,n){var s=n&&ti(t);return M(t,i,n?I(t,e,n,ie.boxSizing&&"border-box"===se.css(t,"boxSizing",!1,s),s):0)}}}),ie.opacity||(se.cssHooks.opacity={get:function(t,e){return ai.test((e&&t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":e?"1":""},set:function(t,e){var i=t.style,n=t.currentStyle,s=se.isNumeric(e)?"alpha(opacity="+100*e+")":"",o=n&&n.filter||i.filter||"";i.zoom=1,(e>=1||""===e)&&""===se.trim(o.replace(oi,""))&&i.removeAttribute&&(i.removeAttribute("filter"),""===e||n&&!n.filter)||(i.filter=oi.test(o)?o.replace(oi,s):o+" "+s)}}),se.cssHooks.marginRight=T(ie.reliableMarginRight,function(t,e){return e?se.swap(t,{display:"inline-block"},ei,[t,"marginRight"]):void 0}),se.each({margin:"",padding:"",border:"Width"},function(t,e){se.cssHooks[t+e]={expand:function(i){for(var n=0,s={},o="string"==typeof i?i.split(" "):[i];4>n;n++)s[t+Se[n]+e]=o[n]||o[n-2]||o[0];return s}},ii.test(t)||(se.cssHooks[t+e].set=M)}),se.fn.extend({css:function(t,e){return Me(this,function(t,e,i){var n,s,o={},a=0;if(se.isArray(e)){for(n=ti(t),s=e.length;s>a;a++)o[e[a]]=se.css(t,e[a],!1,n);return o}return void 0!==i?se.style(t,e,i):se.css(t,e)},t,e,arguments.length>1)},show:function(){return E(this,!0)},hide:function(){return E(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){Ee(this)?se(this).show():se(this).hide()})}}),se.Tween=P,P.prototype={constructor:P,init:function(t,e,i,n,s,o){this.elem=t,this.prop=i,this.easing=s||"swing",this.options=e,this.start=this.now=this.cur(),this.end=n,this.unit=o||(se.cssNumber[i]?"":"px")},cur:function(){var t=P.propHooks[this.prop];return t&&t.get?t.get(this):P.propHooks._default.get(this)},run:function(t){var e,i=P.propHooks[this.prop];return this.pos=e=this.options.duration?se.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),i&&i.set?i.set(this):P.propHooks._default.set(this),this}},P.prototype.init.prototype=P.prototype,P.propHooks={_default:{get:function(t){var e;return null==t.elem[t.prop]||t.elem.style&&null!=t.elem.style[t.prop]?(e=se.css(t.elem,t.prop,""),e&&"auto"!==e?e:0):t.elem[t.prop]},set:function(t){se.fx.step[t.prop]?se.fx.step[t.prop](t):t.elem.style&&(null!=t.elem.style[se.cssProps[t.prop]]||se.cssHooks[t.prop])?se.style(t.elem,t.prop,t.now+t.unit):t.elem[t.prop]=t.now}}},P.propHooks.scrollTop=P.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},se.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2}},se.fx=P.prototype.init,se.fx.step={};var pi,fi,mi=/^(?:toggle|show|hide)$/,gi=new RegExp("^(?:([+-])=|)("+Te+")([a-z%]*)$","i"),vi=/queueHooks$/,yi=[j],bi={"*":[function(t,e){var i=this.createTween(t,e),n=i.cur(),s=gi.exec(e),o=s&&s[3]||(se.cssNumber[t]?"":"px"),a=(se.cssNumber[t]||"px"!==o&&+n)&&gi.exec(se.css(i.elem,t)),r=1,l=20;if(a&&a[3]!==o){o=o||a[3],s=s||[],a=+n||1;do r=r||".5",a/=r,se.style(i.elem,t,a+o);while(r!==(r=i.cur()/n)&&1!==r&&--l)}return s&&(a=i.start=+a||+n||0,i.unit=o,i.end=s[1]?a+(s[1]+1)*s[2]:+s[2]),i}]};se.Animation=se.extend(z,{tweener:function(t,e){se.isFunction(t)?(e=t,t=["*"]):t=t.split(" ");for(var i,n=0,s=t.length;s>n;n++)i=t[n],bi[i]=bi[i]||[],bi[i].unshift(e)},prefilter:function(t,e){e?yi.unshift(t):yi.push(t)}}),se.speed=function(t,e,i){var n=t&&"object"==typeof t?se.extend({},t):{complete:i||!i&&e||se.isFunction(t)&&t,duration:t,easing:i&&e||e&&!se.isFunction(e)&&e};return n.duration=se.fx.off?0:"number"==typeof n.duration?n.duration:n.duration in se.fx.speeds?se.fx.speeds[n.duration]:se.fx.speeds._default,(null==n.queue||n.queue===!0)&&(n.queue="fx"),n.old=n.complete,n.complete=function(){se.isFunction(n.old)&&n.old.call(this),n.queue&&se.dequeue(this,n.queue)},n},se.fn.extend({fadeTo:function(t,e,i,n){return this.filter(Ee).css("opacity",0).show().end().animate({opacity:e},t,i,n)},animate:function(t,e,i,n){var s=se.isEmptyObject(t),o=se.speed(e,i,n),a=function(){var e=z(this,se.extend({},t),o);(s||se._data(this,"finish"))&&e.stop(!0)};return a.finish=a,s||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(t,e,i){var n=function(t){var e=t.stop;delete t.stop,e(i)};return"string"!=typeof t&&(i=e,e=t,t=void 0),e&&t!==!1&&this.queue(t||"fx",[]),this.each(function(){var e=!0,s=null!=t&&t+"queueHooks",o=se.timers,a=se._data(this);if(s)a[s]&&a[s].stop&&n(a[s]);else for(s in a)a[s]&&a[s].stop&&vi.test(s)&&n(a[s]);for(s=o.length;s--;)o[s].elem!==this||null!=t&&o[s].queue!==t||(o[s].anim.stop(i),e=!1,o.splice(s,1));(e||!i)&&se.dequeue(this,t)})},finish:function(t){return t!==!1&&(t=t||"fx"),this.each(function(){var e,i=se._data(this),n=i[t+"queue"],s=i[t+"queueHooks"],o=se.timers,a=n?n.length:0;for(i.finish=!0,se.queue(this,t,[]),s&&s.stop&&s.stop.call(this,!0),e=o.length;e--;)o[e].elem===this&&o[e].queue===t&&(o[e].anim.stop(!0),o.splice(e,1));for(e=0;a>e;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete i.finish})}}),se.each(["toggle","show","hide"],function(t,e){var i=se.fn[e];se.fn[e]=function(t,n,s){return null==t||"boolean"==typeof t?i.apply(this,arguments):this.animate(H(e,!0),t,n,s)}}),se.each({slideDown:H("show"),slideUp:H("hide"),slideToggle:H("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){se.fn[t]=function(t,i,n){return this.animate(e,t,i,n)}}),se.timers=[],se.fx.tick=function(){var t,e=se.timers,i=0;for(pi=se.now();i<e.length;i++)t=e[i],t()||e[i]!==t||e.splice(i--,1);e.length||se.fx.stop(),pi=void 0},se.fx.timer=function(t){se.timers.push(t),t()?se.fx.start():se.timers.pop()},se.fx.interval=13,se.fx.start=function(){fi||(fi=setInterval(se.fx.tick,se.fx.interval))},se.fx.stop=function(){clearInterval(fi),fi=null},se.fx.speeds={slow:600,fast:200,_default:400},se.fn.delay=function(t,e){return t=se.fx?se.fx.speeds[t]||t:t,e=e||"fx",this.queue(e,function(e,i){var n=setTimeout(e,t);i.stop=function(){clearTimeout(n)}})},function(){var t,e,i,n,s;e=fe.createElement("div"),e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=e.getElementsByTagName("a")[0],i=fe.createElement("select"),s=i.appendChild(fe.createElement("option")),t=e.getElementsByTagName("input")[0],n.style.cssText="top:1px",ie.getSetAttribute="t"!==e.className,ie.style=/top/.test(n.getAttribute("style")),ie.hrefNormalized="/a"===n.getAttribute("href"),ie.checkOn=!!t.value,ie.optSelected=s.selected,ie.enctype=!!fe.createElement("form").enctype,i.disabled=!0,ie.optDisabled=!s.disabled,t=fe.createElement("input"),t.setAttribute("value",""),ie.input=""===t.getAttribute("value"),t.value="t",t.setAttribute("type","radio"),ie.radioValue="t"===t.value}();var _i=/\r/g;se.fn.extend({val:function(t){var e,i,n,s=this[0];{if(arguments.length)return n=se.isFunction(t),this.each(function(i){var s;1===this.nodeType&&(s=n?t.call(this,i,se(this).val()):t,null==s?s="":"number"==typeof s?s+="":se.isArray(s)&&(s=se.map(s,function(t){return null==t?"":t+""})),e=se.valHooks[this.type]||se.valHooks[this.nodeName.toLowerCase()],e&&"set"in e&&void 0!==e.set(this,s,"value")||(this.value=s))});if(s)return e=se.valHooks[s.type]||se.valHooks[s.nodeName.toLowerCase()],e&&"get"in e&&void 0!==(i=e.get(s,"value"))?i:(i=s.value,"string"==typeof i?i.replace(_i,""):null==i?"":i)}}}),se.extend({valHooks:{option:{get:function(t){var e=se.find.attr(t,"value");return null!=e?e:se.trim(se.text(t))}},select:{get:function(t){for(var e,i,n=t.options,s=t.selectedIndex,o="select-one"===t.type||0>s,a=o?null:[],r=o?s+1:n.length,l=0>s?r:o?s:0;r>l;l++)if(i=n[l],!(!i.selected&&l!==s||(ie.optDisabled?i.disabled:null!==i.getAttribute("disabled"))||i.parentNode.disabled&&se.nodeName(i.parentNode,"optgroup"))){if(e=se(i).val(),o)return e;a.push(e)}return a},set:function(t,e){for(var i,n,s=t.options,o=se.makeArray(e),a=s.length;a--;)if(n=s[a],se.inArray(se.valHooks.option.get(n),o)>=0)try{n.selected=i=!0}catch(r){n.scrollHeight}else n.selected=!1;return i||(t.selectedIndex=-1),s}}}}),se.each(["radio","checkbox"],function(){se.valHooks[this]={set:function(t,e){return se.isArray(e)?t.checked=se.inArray(se(t).val(),e)>=0:void 0}},ie.checkOn||(se.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value})});var wi,xi,Ci=se.expr.attrHandle,ki=/^(?:checked|selected)$/i,Di=ie.getSetAttribute,Ti=ie.input;se.fn.extend({attr:function(t,e){return Me(this,se.attr,t,e,arguments.length>1)},removeAttr:function(t){return this.each(function(){se.removeAttr(this,t)})}}),se.extend({attr:function(t,e,i){var n,s,o=t.nodeType;if(t&&3!==o&&8!==o&&2!==o)return typeof t.getAttribute===Ce?se.prop(t,e,i):(1===o&&se.isXMLDoc(t)||(e=e.toLowerCase(),n=se.attrHooks[e]||(se.expr.match.bool.test(e)?xi:wi)),void 0===i?n&&"get"in n&&null!==(s=n.get(t,e))?s:(s=se.find.attr(t,e),null==s?void 0:s):null!==i?n&&"set"in n&&void 0!==(s=n.set(t,i,e))?s:(t.setAttribute(e,i+""),i):void se.removeAttr(t,e))},removeAttr:function(t,e){var i,n,s=0,o=e&&e.match(be);if(o&&1===t.nodeType)for(;i=o[s++];)n=se.propFix[i]||i,se.expr.match.bool.test(i)?Ti&&Di||!ki.test(i)?t[n]=!1:t[se.camelCase("default-"+i)]=t[n]=!1:se.attr(t,i,""),t.removeAttribute(Di?i:n)},attrHooks:{type:{set:function(t,e){if(!ie.radioValue&&"radio"===e&&se.nodeName(t,"input")){var i=t.value;return t.setAttribute("type",e),i&&(t.value=i),e}}}}}),xi={set:function(t,e,i){return e===!1?se.removeAttr(t,i):Ti&&Di||!ki.test(i)?t.setAttribute(!Di&&se.propFix[i]||i,i):t[se.camelCase("default-"+i)]=t[i]=!0,i}},se.each(se.expr.match.bool.source.match(/\w+/g),function(t,e){var i=Ci[e]||se.find.attr;Ci[e]=Ti&&Di||!ki.test(e)?function(t,e,n){var s,o;return n||(o=Ci[e],Ci[e]=s,s=null!=i(t,e,n)?e.toLowerCase():null,Ci[e]=o),s}:function(t,e,i){return i?void 0:t[se.camelCase("default-"+e)]?e.toLowerCase():null}}),Ti&&Di||(se.attrHooks.value={set:function(t,e,i){return se.nodeName(t,"input")?void(t.defaultValue=e):wi&&wi.set(t,e,i)}}),Di||(wi={set:function(t,e,i){var n=t.getAttributeNode(i);return n||t.setAttributeNode(n=t.ownerDocument.createAttribute(i)),n.value=e+="","value"===i||e===t.getAttribute(i)?e:void 0}},Ci.id=Ci.name=Ci.coords=function(t,e,i){var n;return i?void 0:(n=t.getAttributeNode(e))&&""!==n.value?n.value:null},se.valHooks.button={get:function(t,e){var i=t.getAttributeNode(e);return i&&i.specified?i.value:void 0},set:wi.set},se.attrHooks.contenteditable={set:function(t,e,i){wi.set(t,""===e?!1:e,i)}},se.each(["width","height"],function(t,e){se.attrHooks[e]={set:function(t,i){return""===i?(t.setAttribute(e,"auto"),i):void 0}}})),ie.style||(se.attrHooks.style={get:function(t){return t.style.cssText||void 0},set:function(t,e){return t.style.cssText=e+""}});var Si=/^(?:input|select|textarea|button|object)$/i,Ei=/^(?:a|area)$/i;se.fn.extend({prop:function(t,e){return Me(this,se.prop,t,e,arguments.length>1)},removeProp:function(t){return t=se.propFix[t]||t,this.each(function(){try{this[t]=void 0,delete this[t]}catch(e){}})}}),se.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(t,e,i){var n,s,o,a=t.nodeType;if(t&&3!==a&&8!==a&&2!==a)return o=1!==a||!se.isXMLDoc(t),o&&(e=se.propFix[e]||e,s=se.propHooks[e]),void 0!==i?s&&"set"in s&&void 0!==(n=s.set(t,i,e))?n:t[e]=i:s&&"get"in s&&null!==(n=s.get(t,e))?n:t[e]},propHooks:{tabIndex:{get:function(t){var e=se.find.attr(t,"tabindex");return e?parseInt(e,10):Si.test(t.nodeName)||Ei.test(t.nodeName)&&t.href?0:-1}}}}),ie.hrefNormalized||se.each(["href","src"],function(t,e){se.propHooks[e]={get:function(t){return t.getAttribute(e,4)}}}),ie.optSelected||(se.propHooks.selected={get:function(t){var e=t.parentNode;return e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex),null}}),se.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){se.propFix[this.toLowerCase()]=this}),ie.enctype||(se.propFix.enctype="encoding");var Mi=/[\t\r\n\f]/g;se.fn.extend({addClass:function(t){var e,i,n,s,o,a,r=0,l=this.length,h="string"==typeof t&&t;if(se.isFunction(t))return this.each(function(e){se(this).addClass(t.call(this,e,this.className))});if(h)for(e=(t||"").match(be)||[];l>r;r++)if(i=this[r],n=1===i.nodeType&&(i.className?(" "+i.className+" ").replace(Mi," "):" ")){for(o=0;s=e[o++];)n.indexOf(" "+s+" ")<0&&(n+=s+" ");a=se.trim(n),i.className!==a&&(i.className=a)}return this},removeClass:function(t){var e,i,n,s,o,a,r=0,l=this.length,h=0===arguments.length||"string"==typeof t&&t;if(se.isFunction(t))return this.each(function(e){se(this).removeClass(t.call(this,e,this.className))});if(h)for(e=(t||"").match(be)||[];l>r;r++)if(i=this[r],n=1===i.nodeType&&(i.className?(" "+i.className+" ").replace(Mi," "):"")){for(o=0;s=e[o++];)for(;n.indexOf(" "+s+" ")>=0;)n=n.replace(" "+s+" "," ");a=t?se.trim(n):"",i.className!==a&&(i.className=a)}return this},toggleClass:function(t,e){var i=typeof t;return"boolean"==typeof e&&"string"===i?e?this.addClass(t):this.removeClass(t):this.each(se.isFunction(t)?function(i){se(this).toggleClass(t.call(this,i,this.className,e),e)}:function(){if("string"===i)for(var e,n=0,s=se(this),o=t.match(be)||[];e=o[n++];)s.hasClass(e)?s.removeClass(e):s.addClass(e);else(i===Ce||"boolean"===i)&&(this.className&&se._data(this,"__className__",this.className),this.className=this.className||t===!1?"":se._data(this,"__className__")||"")})},hasClass:function(t){for(var e=" "+t+" ",i=0,n=this.length;n>i;i++)if(1===this[i].nodeType&&(" "+this[i].className+" ").replace(Mi," ").indexOf(e)>=0)return!0;return!1}}),se.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(t,e){se.fn[e]=function(t,i){return arguments.length>0?this.on(e,null,t,i):this.trigger(e)}}),se.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)},bind:function(t,e,i){return this.on(t,null,e,i)},unbind:function(t,e){return this.off(t,null,e)},delegate:function(t,e,i,n){return this.on(e,t,i,n)},undelegate:function(t,e,i){return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",i)}});var Ii=se.now(),Ni=/\?/,Pi=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;se.parseJSON=function(e){if(t.JSON&&t.JSON.parse)return t.JSON.parse(e+"");var i,n=null,s=se.trim(e+"");return s&&!se.trim(s.replace(Pi,function(t,e,s,o){return i&&e&&(n=0),0===n?t:(i=s||e,n+=!o-!s,"")}))?Function("return "+s)():se.error("Invalid JSON: "+e)},se.parseXML=function(e){var i,n;if(!e||"string"!=typeof e)return null;try{t.DOMParser?(n=new DOMParser,i=n.parseFromString(e,"text/xml")):(i=new ActiveXObject("Microsoft.XMLDOM"),i.async="false",i.loadXML(e))}catch(s){i=void 0}return i&&i.documentElement&&!i.getElementsByTagName("parsererror").length||se.error("Invalid XML: "+e),i};var Ai,Hi,Fi=/#.*$/,ji=/([?&])_=[^&]*/,Oi=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,zi=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Wi=/^(?:GET|HEAD)$/,Li=/^\/\//,Ri=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ui={},$i={},Bi="*/".concat("*");try{Hi=location.href}catch(qi){Hi=fe.createElement("a"),Hi.href="",Hi=Hi.href}Ai=Ri.exec(Hi.toLowerCase())||[],se.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Hi,type:"GET",isLocal:zi.test(Ai[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Bi,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":se.parseJSON,"text xml":se.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,e){return e?R(R(t,se.ajaxSettings),e):R(se.ajaxSettings,t)},ajaxPrefilter:W(Ui),ajaxTransport:W($i),ajax:function(t,e){function i(t,e,i,n){var s,u,v,y,_,x=e;2!==b&&(b=2,r&&clearTimeout(r),h=void 0,a=n||"",w.readyState=t>0?4:0,s=t>=200&&300>t||304===t,i&&(y=U(c,w,i)),y=$(c,y,w,s),s?(c.ifModified&&(_=w.getResponseHeader("Last-Modified"),_&&(se.lastModified[o]=_),_=w.getResponseHeader("etag"),_&&(se.etag[o]=_)),204===t||"HEAD"===c.type?x="nocontent":304===t?x="notmodified":(x=y.state,u=y.data,v=y.error,s=!v)):(v=x,(t||!x)&&(x="error",0>t&&(t=0))),w.status=t,w.statusText=(e||x)+"",s?f.resolveWith(d,[u,x,w]):f.rejectWith(d,[w,x,v]),w.statusCode(g),g=void 0,l&&p.trigger(s?"ajaxSuccess":"ajaxError",[w,c,s?u:v]),m.fireWith(d,[w,x]),l&&(p.trigger("ajaxComplete",[w,c]),--se.active||se.event.trigger("ajaxStop")))}"object"==typeof t&&(e=t,t=void 0),e=e||{};var n,s,o,a,r,l,h,u,c=se.ajaxSetup({},e),d=c.context||c,p=c.context&&(d.nodeType||d.jquery)?se(d):se.event,f=se.Deferred(),m=se.Callbacks("once memory"),g=c.statusCode||{},v={},y={},b=0,_="canceled",w={readyState:0,getResponseHeader:function(t){var e;if(2===b){if(!u)for(u={};e=Oi.exec(a);)u[e[1].toLowerCase()]=e[2];e=u[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(t,e){var i=t.toLowerCase();return b||(t=y[i]=y[i]||t,v[t]=e),this},overrideMimeType:function(t){return b||(c.mimeType=t),this},statusCode:function(t){var e;if(t)if(2>b)for(e in t)g[e]=[g[e],t[e]];else w.always(t[w.status]);return this},abort:function(t){var e=t||_;return h&&h.abort(e),i(0,e),this}};if(f.promise(w).complete=m.add,w.success=w.done,w.error=w.fail,c.url=((t||c.url||Hi)+"").replace(Fi,"").replace(Li,Ai[1]+"//"),c.type=e.method||e.type||c.method||c.type,c.dataTypes=se.trim(c.dataType||"*").toLowerCase().match(be)||[""],null==c.crossDomain&&(n=Ri.exec(c.url.toLowerCase()),c.crossDomain=!(!n||n[1]===Ai[1]&&n[2]===Ai[2]&&(n[3]||("http:"===n[1]?"80":"443"))===(Ai[3]||("http:"===Ai[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=se.param(c.data,c.traditional)),L(Ui,c,e,w),2===b)return w;l=c.global,l&&0===se.active++&&se.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Wi.test(c.type),o=c.url,c.hasContent||(c.data&&(o=c.url+=(Ni.test(o)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=ji.test(o)?o.replace(ji,"$1_="+Ii++):o+(Ni.test(o)?"&":"?")+"_="+Ii++)),c.ifModified&&(se.lastModified[o]&&w.setRequestHeader("If-Modified-Since",se.lastModified[o]),se.etag[o]&&w.setRequestHeader("If-None-Match",se.etag[o])),(c.data&&c.hasContent&&c.contentType!==!1||e.contentType)&&w.setRequestHeader("Content-Type",c.contentType),w.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+Bi+"; q=0.01":""):c.accepts["*"]);for(s in c.headers)w.setRequestHeader(s,c.headers[s]);if(c.beforeSend&&(c.beforeSend.call(d,w,c)===!1||2===b))return w.abort();_="abort";for(s in{success:1,error:1,complete:1})w[s](c[s]);if(h=L($i,c,e,w)){w.readyState=1,l&&p.trigger("ajaxSend",[w,c]),c.async&&c.timeout>0&&(r=setTimeout(function(){w.abort("timeout")},c.timeout));try{b=1,h.send(v,i)}catch(x){if(!(2>b))throw x;i(-1,x)}}else i(-1,"No Transport");return w},getJSON:function(t,e,i){return se.get(t,e,i,"json")},getScript:function(t,e){return se.get(t,void 0,e,"script")}}),se.each(["get","post"],function(t,e){se[e]=function(t,i,n,s){return se.isFunction(i)&&(s=s||n,n=i,i=void 0),se.ajax({url:t,type:e,dataType:s,data:i,success:n})}}),se.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){se.fn[e]=function(t){return this.on(e,t)}}),se._evalUrl=function(t){return se.ajax({url:t,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},se.fn.extend({wrapAll:function(t){if(se.isFunction(t))return this.each(function(e){se(this).wrapAll(t.call(this,e))});if(this[0]){var e=se(t,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstChild&&1===t.firstChild.nodeType;)t=t.firstChild;return t}).append(this)}return this},wrapInner:function(t){return this.each(se.isFunction(t)?function(e){se(this).wrapInner(t.call(this,e))}:function(){var e=se(this),i=e.contents();i.length?i.wrapAll(t):e.append(t)})},wrap:function(t){var e=se.isFunction(t);return this.each(function(i){se(this).wrapAll(e?t.call(this,i):t)})},unwrap:function(){return this.parent().each(function(){se.nodeName(this,"body")||se(this).replaceWith(this.childNodes)}).end()}}),se.expr.filters.hidden=function(t){return t.offsetWidth<=0&&t.offsetHeight<=0||!ie.reliableHiddenOffsets()&&"none"===(t.style&&t.style.display||se.css(t,"display"))},se.expr.filters.visible=function(t){return!se.expr.filters.hidden(t)};var Yi=/%20/g,Vi=/\[\]$/,Xi=/\r?\n/g,Ki=/^(?:submit|button|image|reset|file)$/i,Qi=/^(?:input|select|textarea|keygen)/i;se.param=function(t,e){var i,n=[],s=function(t,e){e=se.isFunction(e)?e():null==e?"":e,n[n.length]=encodeURIComponent(t)+"="+encodeURIComponent(e)};if(void 0===e&&(e=se.ajaxSettings&&se.ajaxSettings.traditional),se.isArray(t)||t.jquery&&!se.isPlainObject(t))se.each(t,function(){s(this.name,this.value)});else for(i in t)B(i,t[i],e,s);return n.join("&").replace(Yi,"+")},se.fn.extend({serialize:function(){return se.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=se.prop(this,"elements");return t?se.makeArray(t):this}).filter(function(){var t=this.type;return this.name&&!se(this).is(":disabled")&&Qi.test(this.nodeName)&&!Ki.test(t)&&(this.checked||!Ie.test(t))}).map(function(t,e){var i=se(this).val();return null==i?null:se.isArray(i)?se.map(i,function(t){return{name:e.name,value:t.replace(Xi,"\r\n")}}):{name:e.name,value:i.replace(Xi,"\r\n")}}).get()}}),se.ajaxSettings.xhr=void 0!==t.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&q()||Y()}:q;var Gi=0,Ji={},Zi=se.ajaxSettings.xhr();t.ActiveXObject&&se(t).on("unload",function(){for(var t in Ji)Ji[t](void 0,!0)}),ie.cors=!!Zi&&"withCredentials"in Zi,Zi=ie.ajax=!!Zi,Zi&&se.ajaxTransport(function(t){if(!t.crossDomain||ie.cors){var e;return{send:function(i,n){var s,o=t.xhr(),a=++Gi;if(o.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(s in t.xhrFields)o[s]=t.xhrFields[s];t.mimeType&&o.overrideMimeType&&o.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(s in i)void 0!==i[s]&&o.setRequestHeader(s,i[s]+"");o.send(t.hasContent&&t.data||null),e=function(i,s){var r,l,h;if(e&&(s||4===o.readyState))if(delete Ji[a],e=void 0,o.onreadystatechange=se.noop,s)4!==o.readyState&&o.abort();else{h={},r=o.status,"string"==typeof o.responseText&&(h.text=o.responseText);try{l=o.statusText}catch(u){l=""}r||!t.isLocal||t.crossDomain?1223===r&&(r=204):r=h.text?200:404}h&&n(r,l,h,o.getAllResponseHeaders())},t.async?4===o.readyState?setTimeout(e):o.onreadystatechange=Ji[a]=e:e()},abort:function(){e&&e(void 0,!0)}}}}),se.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(t){return se.globalEval(t),t}}}),se.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET",t.global=!1)}),se.ajaxTransport("script",function(t){if(t.crossDomain){var e,i=fe.head||se("head")[0]||fe.documentElement;return{send:function(n,s){e=fe.createElement("script"),e.async=!0,t.scriptCharset&&(e.charset=t.scriptCharset),e.src=t.url,e.onload=e.onreadystatechange=function(t,i){(i||!e.readyState||/loaded|complete/.test(e.readyState))&&(e.onload=e.onreadystatechange=null,e.parentNode&&e.parentNode.removeChild(e),e=null,i||s(200,"success"))},i.insertBefore(e,i.firstChild)},abort:function(){e&&e.onload(void 0,!0)}}}});var tn=[],en=/(=)\?(?=&|$)|\?\?/;se.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var t=tn.pop()||se.expando+"_"+Ii++;return this[t]=!0,t}}),se.ajaxPrefilter("json jsonp",function(e,i,n){var s,o,a,r=e.jsonp!==!1&&(en.test(e.url)?"url":"string"==typeof e.data&&!(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&en.test(e.data)&&"data");return r||"jsonp"===e.dataTypes[0]?(s=e.jsonpCallback=se.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,r?e[r]=e[r].replace(en,"$1"+s):e.jsonp!==!1&&(e.url+=(Ni.test(e.url)?"&":"?")+e.jsonp+"="+s),e.converters["script json"]=function(){return a||se.error(s+" was not called"),a[0]},e.dataTypes[0]="json",o=t[s],t[s]=function(){a=arguments},n.always(function(){t[s]=o,e[s]&&(e.jsonpCallback=i.jsonpCallback,tn.push(s)),a&&se.isFunction(o)&&o(a[0]),a=o=void 0}),"script"):void 0}),se.parseHTML=function(t,e,i){if(!t||"string"!=typeof t)return null;"boolean"==typeof e&&(i=e,e=!1),e=e||fe;var n=ce.exec(t),s=!i&&[];return n?[e.createElement(n[1])]:(n=se.buildFragment([t],e,s),s&&s.length&&se(s).remove(),se.merge([],n.childNodes))};var nn=se.fn.load;se.fn.load=function(t,e,i){if("string"!=typeof t&&nn)return nn.apply(this,arguments);var n,s,o,a=this,r=t.indexOf(" ");return r>=0&&(n=se.trim(t.slice(r,t.length)),t=t.slice(0,r)),se.isFunction(e)?(i=e,e=void 0):e&&"object"==typeof e&&(o="POST"),a.length>0&&se.ajax({url:t,type:o,dataType:"html",data:e}).done(function(t){s=arguments,a.html(n?se("<div>").append(se.parseHTML(t)).find(n):t)}).complete(i&&function(t,e){a.each(i,s||[t.responseText,e,t])}),this},se.expr.filters.animated=function(t){return se.grep(se.timers,function(e){return t===e.elem}).length};var sn=t.document.documentElement;se.offset={setOffset:function(t,e,i){var n,s,o,a,r,l,h,u=se.css(t,"position"),c=se(t),d={};"static"===u&&(t.style.position="relative"),r=c.offset(),o=se.css(t,"top"),l=se.css(t,"left"),h=("absolute"===u||"fixed"===u)&&se.inArray("auto",[o,l])>-1,h?(n=c.position(),a=n.top,s=n.left):(a=parseFloat(o)||0,s=parseFloat(l)||0),se.isFunction(e)&&(e=e.call(t,i,r)),null!=e.top&&(d.top=e.top-r.top+a),null!=e.left&&(d.left=e.left-r.left+s),"using"in e?e.using.call(t,d):c.css(d)}},se.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){se.offset.setOffset(this,t,e)});var e,i,n={top:0,left:0},s=this[0],o=s&&s.ownerDocument;if(o)return e=o.documentElement,se.contains(e,s)?(typeof s.getBoundingClientRect!==Ce&&(n=s.getBoundingClientRect()),i=V(o),{top:n.top+(i.pageYOffset||e.scrollTop)-(e.clientTop||0),left:n.left+(i.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}):n},position:function(){if(this[0]){var t,e,i={top:0,left:0},n=this[0];return"fixed"===se.css(n,"position")?e=n.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),se.nodeName(t[0],"html")||(i=t.offset()),i.top+=se.css(t[0],"borderTopWidth",!0),i.left+=se.css(t[0],"borderLeftWidth",!0)),{top:e.top-i.top-se.css(n,"marginTop",!0),left:e.left-i.left-se.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||sn;t&&!se.nodeName(t,"html")&&"static"===se.css(t,"position");)t=t.offsetParent;return t||sn})}}),se.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,e){var i=/Y/.test(e);se.fn[t]=function(n){return Me(this,function(t,n,s){var o=V(t);return void 0===s?o?e in o?o[e]:o.document.documentElement[n]:t[n]:void(o?o.scrollTo(i?se(o).scrollLeft():s,i?s:se(o).scrollTop()):t[n]=s)},t,n,arguments.length,null)}}),se.each(["top","left"],function(t,e){se.cssHooks[e]=T(ie.pixelPosition,function(t,i){return i?(i=ei(t,e),ni.test(i)?se(t).position()[e]+"px":i):void 0})}),se.each({Height:"height",Width:"width"},function(t,e){se.each({padding:"inner"+t,content:e,"":"outer"+t},function(i,n){se.fn[n]=function(n,s){var o=arguments.length&&(i||"boolean"!=typeof n),a=i||(n===!0||s===!0?"margin":"border");return Me(this,function(e,i,n){var s;return se.isWindow(e)?e.document.documentElement["client"+t]:9===e.nodeType?(s=e.documentElement,Math.max(e.body["scroll"+t],s["scroll"+t],e.body["offset"+t],s["offset"+t],s["client"+t])):void 0===n?se.css(e,i,a):se.style(e,i,n,a)},e,o?n:void 0,o,null)}})}),se.fn.size=function(){return this.length},se.fn.andSelf=se.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return se});var on=t.jQuery,an=t.$;return se.noConflict=function(e){return t.$===se&&(t.$=an),e&&t.jQuery===se&&(t.jQuery=on),se},typeof e===Ce&&(t.jQuery=t.$=se),se}),function(t,e){t.rails!==e&&t.error("jquery-ujs has already been loaded!");var i,n=t(document);t.rails=i={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",buttonClickSelector:"button[data-remote], button[data-confirm]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input[type=file]",linkDisableSelector:"a[data-disable-with], a[data-disable]",buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]",CSRFProtection:function(e){var i=t('meta[name="csrf-token"]').attr("content");i&&e.setRequestHeader("X-CSRF-Token",i)},refreshCSRFTokens:function(){var e=t("meta[name=csrf-token]").attr("content"),i=t("meta[name=csrf-param]").attr("content");t('form input[name="'+i+'"]').val(e)},fire:function(e,i,n){var s=t.Event(i);return e.trigger(s,n),s.result!==!1},confirm:function(t){return confirm(t)},ajax:function(e){return t.ajax(e)},href:function(t){return t.attr("href")},handleRemote:function(n){var s,o,a,r,l,h,u,c;if(i.fire(n,"ajax:before")){if(r=n.data("cross-domain"),l=r===e?null:r,h=n.data("with-credentials")||null,u=n.data("type")||t.ajaxSettings&&t.ajaxSettings.dataType,n.is("form")){s=n.attr("method"),o=n.attr("action"),a=n.serializeArray();
    var d=n.data("ujs:submit-button");d&&(a.push(d),n.data("ujs:submit-button",null))}else n.is(i.inputChangeSelector)?(s=n.data("method"),o=n.data("url"),a=n.serialize(),n.data("params")&&(a=a+"&"+n.data("params"))):n.is(i.buttonClickSelector)?(s=n.data("method")||"get",o=n.data("url"),a=n.serialize(),n.data("params")&&(a=a+"&"+n.data("params"))):(s=n.data("method"),o=i.href(n),a=n.data("params")||null);return c={type:s||"GET",data:a,dataType:u,beforeSend:function(t,s){return s.dataType===e&&t.setRequestHeader("accept","*/*;q=0.5, "+s.accepts.script),i.fire(n,"ajax:beforeSend",[t,s])?void n.trigger("ajax:send",t):!1},success:function(t,e,i){n.trigger("ajax:success",[t,e,i])},complete:function(t,e){n.trigger("ajax:complete",[t,e])},error:function(t,e,i){n.trigger("ajax:error",[t,e,i])},crossDomain:l},h&&(c.xhrFields={withCredentials:h}),o&&(c.url=o),i.ajax(c)}return!1},handleMethod:function(n){var s=i.href(n),o=n.data("method"),a=n.attr("target"),r=t("meta[name=csrf-token]").attr("content"),l=t("meta[name=csrf-param]").attr("content"),h=t('<form method="post" action="'+s+'"></form>'),u='<input name="_method" value="'+o+'" type="hidden" />';l!==e&&r!==e&&(u+='<input name="'+l+'" value="'+r+'" type="hidden" />'),a&&h.attr("target",a),h.hide().append(u).appendTo("body"),h.submit()},formElements:function(e,i){return e.is("form")?t(e[0].elements).filter(i):e.find(i)},disableFormElements:function(e){i.formElements(e,i.disableSelector).each(function(){i.disableFormElement(t(this))})},disableFormElement:function(t){var i,n;i=t.is("button")?"html":"val",n=t.data("disable-with"),t.data("ujs:enable-with",t[i]()),n!==e&&t[i](n),t.prop("disabled",!0)},enableFormElements:function(e){i.formElements(e,i.enableSelector).each(function(){i.enableFormElement(t(this))})},enableFormElement:function(t){var e=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[e](t.data("ujs:enable-with")),t.prop("disabled",!1)},allowAction:function(t){var e,n=t.data("confirm"),s=!1;return n?(i.fire(t,"confirm")&&(s=i.confirm(n),e=i.fire(t,"confirm:complete",[s])),s&&e):!0},blankInputs:function(e,i,n){var s,o,a=t(),r=i||"input,textarea",l=e.find(r);return l.each(function(){if(s=t(this),o=s.is("input[type=checkbox],input[type=radio]")?s.is(":checked"):s.val(),!o==!n){if(s.is("input[type=radio]")&&l.filter('input[type=radio]:checked[name="'+s.attr("name")+'"]').length)return!0;a=a.add(s)}}),a.length?a:!1},nonBlankInputs:function(t,e){return i.blankInputs(t,e,!0)},stopEverything:function(e){return t(e.target).trigger("ujs:everythingStopped"),e.stopImmediatePropagation(),!1},disableElement:function(t){var n=t.data("disable-with");t.data("ujs:enable-with",t.html()),n!==e&&t.html(n),t.bind("click.railsDisable",function(t){return i.stopEverything(t)})},enableElement:function(t){t.data("ujs:enable-with")!==e&&(t.html(t.data("ujs:enable-with")),t.removeData("ujs:enable-with")),t.unbind("click.railsDisable")}},i.fire(n,"rails:attachBindings")&&(t.ajaxPrefilter(function(t,e,n){t.crossDomain||i.CSRFProtection(n)}),n.delegate(i.linkDisableSelector,"ajax:complete",function(){i.enableElement(t(this))}),n.delegate(i.buttonDisableSelector,"ajax:complete",function(){i.enableFormElement(t(this))}),n.delegate(i.linkClickSelector,"click.rails",function(n){var s=t(this),o=s.data("method"),a=s.data("params"),r=n.metaKey||n.ctrlKey;if(!i.allowAction(s))return i.stopEverything(n);if(!r&&s.is(i.linkDisableSelector)&&i.disableElement(s),s.data("remote")!==e){if(r&&(!o||"GET"===o)&&!a)return!0;var l=i.handleRemote(s);return l===!1?i.enableElement(s):l.error(function(){i.enableElement(s)}),!1}return s.data("method")?(i.handleMethod(s),!1):void 0}),n.delegate(i.buttonClickSelector,"click.rails",function(e){var n=t(this);if(!i.allowAction(n))return i.stopEverything(e);n.is(i.buttonDisableSelector)&&i.disableFormElement(n);var s=i.handleRemote(n);return s===!1?i.enableFormElement(n):s.error(function(){i.enableFormElement(n)}),!1}),n.delegate(i.inputChangeSelector,"change.rails",function(e){var n=t(this);return i.allowAction(n)?(i.handleRemote(n),!1):i.stopEverything(e)}),n.delegate(i.formSubmitSelector,"submit.rails",function(n){var s,o,a=t(this),r=a.data("remote")!==e;if(!i.allowAction(a))return i.stopEverything(n);if(a.attr("novalidate")==e&&(s=i.blankInputs(a,i.requiredInputSelector),s&&i.fire(a,"ajax:aborted:required",[s])))return i.stopEverything(n);if(r){if(o=i.nonBlankInputs(a,i.fileInputSelector)){setTimeout(function(){i.disableFormElements(a)},13);var l=i.fire(a,"ajax:aborted:file",[o]);return l||setTimeout(function(){i.enableFormElements(a)},13),l}return i.handleRemote(a),!1}setTimeout(function(){i.disableFormElements(a)},13)}),n.delegate(i.formInputClickSelector,"click.rails",function(e){var n=t(this);if(!i.allowAction(n))return i.stopEverything(e);var s=n.attr("name"),o=s?{name:s,value:n.val()}:null;n.closest("form").data("ujs:submit-button",o)}),n.delegate(i.formSubmitSelector,"ajax:send.rails",function(e){this==e.target&&i.disableFormElements(t(this))}),n.delegate(i.formSubmitSelector,"ajax:complete.rails",function(e){this==e.target&&i.enableFormElements(t(this))}),t(function(){i.refreshCSRFTokens()}))}(jQuery),function(){var t,e,i,n,s,o,a,r,l,h,u,c,d,p,f,m,g,v,y,b,_,w,x,C,k,D,T,S,E,M,I,N,P,A,H,F,j,O,z,W,L,R,U,$,B,q,Y,V,X,K,Q,G=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1},J={}.hasOwnProperty,Z=function(t,e){function i(){this.constructor=t}for(var n in e)J.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},te=[].slice;M={},c=10,q=!1,m=null,S=null,F=null,f=null,K=null,b=function(t){var e;return t=new i(t),L(),u(),q&&(e=Y(t.absolute))?(_(e),w(t)):w(t,$)},Y=function(t){var e;return e=M[t],e&&!e.transitionCacheDisabled?e:void 0},g=function(t){return null==t&&(t=!0),q=t},w=function(t,e){return null==e&&(e=function(){return function(){}}(this)),V("page:fetch",{url:t.absolute}),null!=K&&K.abort(),K=new XMLHttpRequest,K.open("GET",t.withoutHashForIE10compatibility(),!0),K.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),K.setRequestHeader("X-XHR-Referer",F),K.onload=function(){var i;return V("page:receive",{url:t.absolute}),(i=A())?(j(t),d.apply(null,y(i)),E(),O(),e(),V("page:load")):document.location.href=t.absolute},K.onloadend=function(){return K=null},K.onerror=function(){return document.location.href=t.absolute},K.send()},_=function(t){return null!=K&&K.abort(),d(t.title,t.body),H(t),V("page:restore")},u=function(){var t;return t=new i(m.url),M[t.absolute]={url:t.relative,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset,cachedAt:(new Date).getTime(),transitionCacheDisabled:null!=document.querySelector("[data-no-transition-cache]")},p(c)},N=function(t){return null==t&&(t=c),/^[\d]+$/.test(t)?c=parseInt(t):void 0},p=function(t){var e,i,n,s,o,a;for(n=Object.keys(M),e=n.map(function(t){return M[t].cachedAt}).sort(function(t,e){return e-t}),a=[],s=0,o=n.length;o>s;s++)i=n[s],M[i].cachedAt<=e[t]&&(V("page:expire",M[i]),a.push(delete M[i]));return a},d=function(e,i,n,s){return document.title=e,document.documentElement.replaceChild(i,document.body),null!=n&&t.update(n),B(),s&&v(),m=window.history.state,V("page:change"),V("page:update")},v=function(){var t,e,i,n,s,o,a,r,l,h,u,c;for(o=Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),a=0,l=o.length;l>a;a++)if(s=o[a],""===(u=s.type)||"text/javascript"===u){for(e=document.createElement("script"),c=s.attributes,r=0,h=c.length;h>r;r++)t=c[r],e.setAttribute(t.name,t.value);e.appendChild(document.createTextNode(s.innerHTML)),n=s.parentNode,i=s.nextSibling,n.removeChild(s),n.insertBefore(e,i)}},R=function(t){return t.innerHTML=t.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi,""),t},B=function(){var t,e;return t=(e=document.querySelectorAll("input[autofocus], textarea[autofocus]"))[e.length-1],t&&document.activeElement!==t?t.focus():void 0},j=function(t){return(t=new i(t)).absolute!==F?window.history.pushState({turbolinks:!0,url:t.absolute},"",t.absolute):void 0},O=function(){var t,e;return(t=K.getResponseHeader("X-XHR-Redirected-To"))?(t=new i(t),e=t.hasNoHash()?document.location.hash:"",window.history.replaceState(m,"",t.href+e)):void 0},L=function(){return F=document.location.href},W=function(){return window.history.replaceState({turbolinks:!0,url:document.location.href},"",document.location.href)},z=function(){return m=window.history.state},E=function(){var t;return navigator.userAgent.match(/Firefox/)&&!(t=new i).hasNoHash()?(window.history.replaceState(m,"",t.withoutHash()),document.location.hash=t.hash):void 0},H=function(t){return window.scrollTo(t.positionX,t.positionY)},$=function(){return document.location.hash?document.location.href=document.location.href:window.scrollTo(0,0)},P=function(t){var e,i;return e=(null!=(i=document.cookie.match(new RegExp(t+"=(\\w+)")))?i[1].toUpperCase():void 0)||"",document.cookie=t+"=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",e},V=function(t,e){var i;return i=document.createEvent("Events"),e&&(i.data=e),i.initEvent(t,!0,!0),document.dispatchEvent(i)},I=function(){return!V("page:before-change")},A=function(){var t,e,i,n,s,o;return e=function(){var t;return 400<=(t=K.status)&&600>t},o=function(){return K.getResponseHeader("Content-Type").match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)},n=function(t){var e,i,n,s,o;for(s=t.head.childNodes,o=[],i=0,n=s.length;n>i;i++)e=s[i],null!=("function"==typeof e.getAttribute?e.getAttribute("data-turbolinks-track"):void 0)&&o.push(e.getAttribute("src")||e.getAttribute("href"));return o},t=function(t){var e;return S||(S=n(document)),e=n(t),e.length!==S.length||s(e,S).length!==S.length},s=function(t,e){var i,n,s,o,a;for(t.length>e.length&&(o=[e,t],t=o[0],e=o[1]),a=[],n=0,s=t.length;s>n;n++)i=t[n],G.call(e,i)>=0&&a.push(i);return a},!e()&&o()&&(i=f(K.responseText),i&&!t(i))?i:void 0},y=function(e){var i;return i=e.querySelector("title"),[null!=i?i.textContent:void 0,R(e.body),t.get(e).token,"runScripts"]},t={get:function(t){var e;return null==t&&(t=document),{node:e=t.querySelector('meta[name="csrf-token"]'),token:null!=e&&"function"==typeof e.getAttribute?e.getAttribute("content"):void 0}},update:function(t){var e;return e=this.get(),null!=e.token&&null!=t&&e.token!==t?e.node.setAttribute("content",t):void 0}},s=function(){var t,e,i,n,s,o;e=function(t){return(new DOMParser).parseFromString(t,"text/html")},t=function(t){var e;return e=document.implementation.createHTMLDocument(""),e.documentElement.innerHTML=t,e},i=function(t){var e;return e=document.implementation.createHTMLDocument(""),e.open("replace"),e.write(t),e.close(),e};try{if(window.DOMParser)return s=e("<html><body><p>test"),e}catch(a){return n=a,s=t("<html><body><p>test"),t}finally{if(1!==(null!=s&&null!=(o=s.body)?o.childNodes.length:void 0))return i}},i=function(){function t(e){return this.original=null!=e?e:document.location.href,this.original.constructor===t?this.original:void this._parse()}return t.prototype.withoutHash=function(){return this.href.replace(this.hash,"")},t.prototype.withoutHashForIE10compatibility=function(){return this.withoutHash()},t.prototype.hasNoHash=function(){return 0===this.hash.length},t.prototype._parse=function(){var t;return(null!=this.link?this.link:this.link=document.createElement("a")).href=this.original,t=this.link,this.href=t.href,this.protocol=t.protocol,this.host=t.host,this.hostname=t.hostname,this.port=t.port,this.pathname=t.pathname,this.search=t.search,this.hash=t.hash,this.origin=[this.protocol,"//",this.hostname].join(""),0!==this.port.length&&(this.origin+=":"+this.port),this.relative=[this.pathname,this.search,this.hash].join(""),this.absolute=this.href},t}(),n=function(t){function e(t){return this.link=t,this.link.constructor===e?this.link:(this.original=this.link.href,void e.__super__.constructor.apply(this,arguments))}return Z(e,t),e.HTML_EXTENSIONS=["html"],e.allowExtensions=function(){var t,i,n,s;for(i=1<=arguments.length?te.call(arguments,0):[],n=0,s=i.length;s>n;n++)t=i[n],e.HTML_EXTENSIONS.push(t);return e.HTML_EXTENSIONS},e.prototype.shouldIgnore=function(){return this._crossOrigin()||this._anchored()||this._nonHtml()||this._optOut()||this._target()},e.prototype._crossOrigin=function(){return this.origin!==(new i).origin},e.prototype._anchored=function(){var t;return(this.hash&&this.withoutHash())===(t=new i).withoutHash()||this.href===t.href+"#"},e.prototype._nonHtml=function(){return this.pathname.match(/\.[a-z]+$/g)&&!this.pathname.match(new RegExp("\\.(?:"+e.HTML_EXTENSIONS.join("|")+")?$","g"))},e.prototype._optOut=function(){var t,e;for(e=this.link;!t&&e!==document;)t=null!=e.getAttribute("data-no-turbolink"),e=e.parentNode;return t},e.prototype._target=function(){return 0!==this.link.target.length},e}(i),e=function(){function t(t){this.event=t,this.event.defaultPrevented||(this._extractLink(),this._validForTurbolinks()&&(I()||X(this.link.href),this.event.preventDefault()))}return t.installHandlerLast=function(e){return e.defaultPrevented?void 0:(document.removeEventListener("click",t.handle,!1),document.addEventListener("click",t.handle,!1))},t.handle=function(e){return new t(e)},t.prototype._extractLink=function(){var t;for(t=this.event.target;t.parentNode&&"A"!==t.nodeName;)t=t.parentNode;return"A"===t.nodeName&&0!==t.href.length?this.link=new n(t):void 0},t.prototype._validForTurbolinks=function(){return null!=this.link&&!(this.link.shouldIgnore()||this._nonStandardClick())},t.prototype._nonStandardClick=function(){return this.event.which>1||this.event.metaKey||this.event.ctrlKey||this.event.shiftKey||this.event.altKey},t}(),h=function(t){return setTimeout(t,500)},k=function(){return document.addEventListener("DOMContentLoaded",function(){return V("page:change"),V("page:update")},!0)},T=function(){return"undefined"!=typeof jQuery?jQuery(document).on("ajaxSuccess",function(t,e){return jQuery.trim(e.responseText)?V("page:update"):void 0}):void 0},D=function(t){var e,n;return(null!=(n=t.state)?n.turbolinks:void 0)?(e=M[new i(t.state.url).absolute])?(u(),_(e)):X(t.target.location.href):void 0},C=function(){return W(),z(),f=s(),document.addEventListener("click",e.installHandlerLast,!0),window.addEventListener("hashchange",function(){return W(),z()},!1),h(function(){return window.addEventListener("popstate",D,!1)})},x=void 0!==window.history.state||navigator.userAgent.match(/Firefox\/2[6|7]/),r=window.history&&window.history.pushState&&window.history.replaceState&&x,o=!navigator.userAgent.match(/CriOS\//),U="GET"===(Q=P("request_method"))||""===Q,l=r&&o&&U,a=document.addEventListener&&document.createEvent,a&&(k(),T()),l?(X=b,C()):X=function(t){return document.location.href=t},this.Turbolinks={visit:X,pagesCached:N,enableTransitionCache:g,allowLinkExtensions:n.allowExtensions,supported:l}}.call(this),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t,e){var i=0,n=Array.prototype.slice,s=t.cleanData;t.cleanData=function(e){for(var i,n=0;null!=(i=e[n]);n++)try{t(i).triggerHandler("remove")}catch(o){}s(e)},t.widget=function(e,i,n){var s,o,a,r,l={},h=e.split(".")[0];e=e.split(".")[1],s=h+"-"+e,n||(n=i,i=t.Widget),t.expr[":"][s.toLowerCase()]=function(e){return!!t.data(e,s)},t[h]=t[h]||{},o=t[h][e],a=t[h][e]=function(t,e){return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new a(t,e)},t.extend(a,o,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),r=new i,r.options=t.widget.extend({},r.options),t.each(n,function(e,n){return t.isFunction(n)?void(l[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},s=function(t){return i.prototype[e].apply(this,t)};return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=s,e=n.apply(this,arguments),this._super=i,this._superApply=o,e}}()):void(l[e]=n)}),a.prototype=t.widget.extend(r,{widgetEventPrefix:o?r.widgetEventPrefix:e},l,{constructor:a,namespace:h,widgetName:e,widgetFullName:s}),o?(t.each(o._childConstructors,function(e,i){var n=i.prototype;t.widget(n.namespace+"."+n.widgetName,a,i._proto)}),delete o._childConstructors):i._childConstructors.push(a),t.widget.bridge(e,a)},t.widget.extend=function(i){for(var s,o,a=n.call(arguments,1),r=0,l=a.length;l>r;r++)for(s in a[r])o=a[r][s],a[r].hasOwnProperty(s)&&o!==e&&(i[s]=t.isPlainObject(o)?t.isPlainObject(i[s])?t.widget.extend({},i[s],o):t.widget.extend({},o):o);return i},t.widget.bridge=function(i,s){var o=s.prototype.widgetFullName||i;t.fn[i]=function(a){var r="string"==typeof a,l=n.call(arguments,1),h=this;return a=!r&&l.length?t.widget.extend.apply(null,[a].concat(l)):a,this.each(r?function(){var n,s=t.data(this,o);return s?t.isFunction(s[a])&&"_"!==a.charAt(0)?(n=s[a].apply(s,l),n!==s&&n!==e?(h=n&&n.jquery?h.pushStack(n.get()):n,!1):void 0):t.error("no such method '"+a+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; attempted to call method '"+a+"'")}:function(){var e=t.data(this,o);e?e.option(a||{})._init():t.data(this,o,new s(a,this))}),h}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,n){n=t(n||this.defaultElement||this)[0],this.element=t(n),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),n!==this&&(t.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===n&&this.destroy()}}),this.document=t(n.style?n.ownerDocument:n.document||n),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,n){var s,o,a,r=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(r={},s=i.split("."),i=s.shift(),s.length){for(o=r[i]=t.widget.extend({},this.options[i]),a=0;a<s.length-1;a++)o[s[a]]=o[s[a]]||{},o=o[s[a]];if(i=s.pop(),n===e)return o[i]===e?null:o[i];o[i]=n}else{if(n===e)return this.options[i]===e?null:this.options[i];r[i]=n}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(e,i,n){var s,o=this;"boolean"!=typeof e&&(n=i,i=e,e=!1),n?(i=s=t(i),this.bindings=this.bindings.add(i)):(n=i,i=this.element,s=this.widget()),t.each(n,function(n,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=n.match(/^(\w+)\s*(.*)$/),h=l[1]+o.eventNamespace,u=l[2];u?s.delegate(u,h,r):i.bind(h,r)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?n[t]:t).apply(n,arguments)}var n=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,n){var s,o,a=this.options[e];if(n=n||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(s in o)s in i||(i[s]=o[s]);return this.element.trigger(i,n),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(n,s,o){"string"==typeof s&&(s={effect:s});var a,r=s?s===!0||"number"==typeof s?i:s.effect||i:e;s=s||{},"number"==typeof s&&(s={duration:s}),a=!t.isEmptyObject(s),s.complete=o,s.delay&&n.delay(s.delay),a&&t.effects&&t.effects.effect[r]?n[e](s):r!==e&&n[r]?n[r](s.duration,s.easing,o):n.queue(function(i){t(this)[e](),o&&o.call(n[0]),i()})}})}),function(t){"use strict";var e=function(t,i,n){var s,o,a=document.createElement("img");return a.onerror=i,a.onload=function(){!o||n&&n.noRevoke||e.revokeObjectURL(o),i(e.scale(a,n))},s=window.Blob&&t instanceof Blob||window.File&&t instanceof File?o=e.createObjectURL(t):t,s?(a.src=s,a):e.readFile(t,function(t){a.src=t})},i=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;e.scale=function(t,e){e=e||{};var i=document.createElement("canvas"),n=t.width,s=t.height,o=Math.max((e.minWidth||n)/n,(e.minHeight||s)/s);return o>1&&(n=parseInt(n*o,10),s=parseInt(s*o,10)),o=Math.min((e.maxWidth||n)/n,(e.maxHeight||s)/s),1>o&&(n=parseInt(n*o,10),s=parseInt(s*o,10)),t.getContext||e.canvas&&i.getContext?(i.width=n,i.height=s,i.getContext("2d").drawImage(t,0,0,n,s),i):(t.width=n,t.height=s,t)},e.createObjectURL=function(t){return i?i.createObjectURL(t):!1},e.revokeObjectURL=function(t){return i?i.revokeObjectURL(t):!1},e.readFile=function(t,e){if(window.FileReader&&FileReader.prototype.readAsDataURL){var i=new FileReader;return i.onload=function(t){e(t.target.result)},i.readAsDataURL(t),i}return!1},"function"==typeof define&&define.amd?define(function(){return e}):t.loadImage=e}(this),function(t){"use strict";var e=t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype,i=t.Blob&&function(){try{return Boolean(new Blob)}catch(t){return!1}}(),n=i&&t.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(t){return!1}}(),s=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||t.MSBlobBuilder,o=(i||s)&&t.atob&&t.ArrayBuffer&&t.Uint8Array&&function(t){var e,o,a,r,l,h;for(e=t.split(",")[0].indexOf("base64")>=0?atob(t.split(",")[1]):decodeURIComponent(t.split(",")[1]),o=new ArrayBuffer(e.length),a=new Uint8Array(o),r=0;r<e.length;r+=1)a[r]=e.charCodeAt(r);return l=t.split(",")[0].split(":")[1].split(";")[0],i?new Blob([n?a:o],{type:l}):(h=new s,h.append(o),h.getBlob(l))};t.HTMLCanvasElement&&!e.toBlob&&(e.mozGetAsFile?e.toBlob=function(t,e){t(this.mozGetAsFile("blob",e))}:e.toDataURL&&o&&(e.toBlob=function(t,e){t(o(this.toDataURL(e)))})),"function"==typeof define&&define.amd?define(function(){return o}):t.dataURLtoBlob=o}(this),function(t){"use strict";var e=function(t,i){var n=/[^\w\-\.:]/.test(t)?new Function(e.arg+",tmpl","var _e=tmpl.encode"+e.helper+",_s='"+t.replace(e.regexp,e.func)+"';return _s;"):e.cache[t]=e.cache[t]||e(e.load(t));return i?n(i,e):function(t){return n(t,e)}};e.cache={},e.load=function(t){return document.getElementById(t).innerHTML},e.regexp=/([\s'\\])(?![^%]*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,e.func=function(t,e,i,n,s,o){return e?{"\n":"\\n","\r":"\\r","	":"\\t"," ":" "}[t]||"\\"+t:i?"="===i?"'+_e("+n+")+'":"'+("+n+"||'')+'":s?"';":o?"_s+='":void 0},e.encReg=/[<>&"'\x00]/g,e.encMap={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"},e.encode=function(t){return String(t||"").replace(e.encReg,function(t){return e.encMap[t]||""})},e.arg="o",e.helper=",print=function(s,e){_s+=e&&(s||'')||_e(s);},include=function(s,d){_s+=tmpl(s,d);}","function"==typeof define&&define.amd?define(function(){return e}):t.tmpl=e}(this),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(window.jQuery)}(function(t){"use strict";var e=0;t.ajaxTransport("iframe",function(i){if(i.async){var n,s,o;return{send:function(a,r){n=t('<form style="display:none;"></form>'),n.attr("accept-charset",i.formAcceptCharset),o=/\?/.test(i.url)?"&":"?","DELETE"===i.type?(i.url=i.url+o+"_method=DELETE",i.type="POST"):"PUT"===i.type?(i.url=i.url+o+"_method=PUT",i.type="POST"):"PATCH"===i.type&&(i.url=i.url+o+"_method=PATCH",i.type="POST"),s=t('<iframe src="javascript:false;" name="iframe-transport-'+(e+=1)+'"></iframe>').bind("load",function(){var e,o=t.isArray(i.paramName)?i.paramName:[i.paramName];s.unbind("load").bind("load",function(){var e;try{if(e=s.contents(),!e.length||!e[0].firstChild)throw new Error}catch(i){e=void 0}r(200,"success",{iframe:e}),t('<iframe src="javascript:false;"></iframe>').appendTo(n),n.remove()}),n.prop("target",s.prop("name")).prop("action",i.url).prop("method",i.type),i.formData&&t.each(i.formData,function(e,i){t('<input type="hidden"/>').prop("name",i.name).val(i.value).appendTo(n)}),i.fileInput&&i.fileInput.length&&"POST"===i.type&&(e=i.fileInput.clone(),i.fileInput.after(function(t){return e[t]}),i.paramName&&i.fileInput.each(function(e){t(this).prop("name",o[e]||i.paramName)}),n.append(i.fileInput).prop("enctype","multipart/form-data").prop("encoding","multipart/form-data")),n.submit(),e&&e.length&&i.fileInput.each(function(i,n){var s=t(e[i]);t(n).prop("name",s.prop("name")),s.replaceWith(n)})}),n.append(s).appendTo(document.body)},abort:function(){s&&s.unbind("load").prop("src","javascript".concat(":false;")),n&&n.remove()}}}}),t.ajaxSetup({converters:{"iframe text":function(e){return e&&t(e[0].body).text()},"iframe json":function(e){return e&&t.parseJSON(t(e[0].body).text())},"iframe html":function(e){return e&&t(e[0].body).html()},"iframe script":function(e){return e&&t.globalEval(t(e[0].body).text())}}})}),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","jquery.ui.widget"],t):t(window.jQuery)}(function(t){"use strict";t.support.xhrFileUpload=!(!window.XMLHttpRequestUpload||!window.FileReader),t.support.xhrFormDataFileUpload=!!window.FormData,t.propHooks.elements={get:function(e){return t.nodeName(e,"form")?t.grep(e.elements,function(e){return!t.nodeName(e,"input")||"file"!==e.type}):null}},t.widget("blueimp.fileupload",{options:{dropZone:t(document),pasteZone:t(document),fileInput:void 0,replaceFileInput:!0,paramName:void 0,singleFileUploads:!0,limitMultiFileUploads:void 0,sequentialUploads:!1,limitConcurrentUploads:void 0,forceIframeTransport:!1,redirect:void 0,redirectParamName:void 0,postMessage:void 0,multipart:!0,maxChunkSize:void 0,uploadedBytes:void 0,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,formData:function(t){return t.serializeArray()},add:function(t,e){e.submit()},processData:!1,contentType:!1,cache:!1},_refreshOptionsList:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_BitrateTimer:function(){this.timestamp=+new Date,this.loaded=0,this.bitrate=0,this.getBitrate=function(t,e,i){var n=t-this.timestamp;return(!this.bitrate||!i||n>i)&&(this.bitrate=(e-this.loaded)*(1e3/n)*8,this.loaded=e,this.timestamp=t),this.bitrate}},_isXHRUpload:function(e){return!e.forceIframeTransport&&(!e.multipart&&t.support.xhrFileUpload||t.support.xhrFormDataFileUpload)},_getFormData:function(e){var i;return"function"==typeof e.formData?e.formData(e.form):t.isArray(e.formData)?e.formData:e.formData?(i=[],t.each(e.formData,function(t,e){i.push({name:t,value:e})}),i):[]},_getTotal:function(e){var i=0;return t.each(e,function(t,e){i+=e.size||1}),i},_onProgress:function(t,e){if(t.lengthComputable){var i,n,s=+new Date;if(e._time&&e.progressInterval&&s-e._time<e.progressInterval&&t.loaded!==t.total)return;e._time=s,i=e.total||this._getTotal(e.files),n=parseInt(t.loaded/t.total*(e.chunkSize||i),10)+(e.uploadedBytes||0),this._loaded+=n-(e.loaded||e.uploadedBytes||0),e.lengthComputable=!0,e.loaded=n,e.total=i,e.bitrate=e._bitrateTimer.getBitrate(s,n,e.bitrateInterval),this._trigger("progress",t,e),this._trigger("progressall",t,{lengthComputable:!0,loaded:this._loaded,total:this._total,bitrate:this._bitrateTimer.getBitrate(s,this._loaded,e.bitrateInterval)})}},_initProgressListener:function(e){var i=this,n=e.xhr?e.xhr():t.ajaxSettings.xhr();n.upload&&(t(n.upload).bind("progress",function(t){var n=t.originalEvent;t.lengthComputable=n.lengthComputable,t.loaded=n.loaded,t.total=n.total,i._onProgress(t,e)}),e.xhr=function(){return n})},_initXHRData:function(e){var i,n=e.files[0],s=e.multipart||!t.support.xhrFileUpload,o=e.paramName[0];e.headers=e.headers||{},e.contentRange&&(e.headers["Content-Range"]=e.contentRange),s?t.support.xhrFormDataFileUpload&&(e.postMessage?(i=this._getFormData(e),e.blob?i.push({name:o,value:e.blob}):t.each(e.files,function(t,n){i.push({name:e.paramName[t]||o,value:n})})):(e.formData instanceof FormData?i=e.formData:(i=new FormData,t.each(this._getFormData(e),function(t,e){i.append(e.name,e.value)})),e.blob?(e.headers["Content-Disposition"]='attachment; filename="'+encodeURI(n.name)+'"',i.append(o,e.blob,n.name)):t.each(e.files,function(t,n){(window.Blob&&n instanceof Blob||window.File&&n instanceof File)&&i.append(e.paramName[t]||o,n,n.name)})),e.data=i):(e.headers["Content-Disposition"]='attachment; filename="'+encodeURI(n.name)+'"',e.contentType=n.type,e.data=e.blob||n),e.blob=null},_initIframeSettings:function(e){e.dataType="iframe "+(e.dataType||""),e.formData=this._getFormData(e),e.redirect&&t("<a></a>").prop("href",e.url).prop("host")!==location.host&&e.formData.push({name:e.redirectParamName||"redirect",value:e.redirect})},_initDataSettings:function(t){this._isXHRUpload(t)?(this._chunkedUpload(t,!0)||(t.data||this._initXHRData(t),this._initProgressListener(t)),t.postMessage&&(t.dataType="postmessage "+(t.dataType||""))):this._initIframeSettings(t,"iframe")},_getParamName:function(e){var i=t(e.fileInput),n=e.paramName;return n?t.isArray(n)||(n=[n]):(n=[],i.each(function(){for(var e=t(this),i=e.prop("name")||"files[]",s=(e.prop("files")||[1]).length;s;)n.push(i),s-=1}),n.length||(n=[i.prop("name")||"files[]"])),n},_initFormSettings:function(e){e.form&&e.form.length||(e.form=t(e.fileInput.prop("form")),e.form.length||(e.form=t(this.options.fileInput.prop("form")))),e.paramName=this._getParamName(e),e.url||(e.url=e.form.prop("action")||location.href),e.type=(e.type||e.form.prop("method")||"").toUpperCase(),"POST"!==e.type&&"PUT"!==e.type&&"PATCH"!==e.type&&(e.type="POST"),e.formAcceptCharset||(e.formAcceptCharset=e.form.attr("accept-charset"))},_getAJAXSettings:function(e){var i=t.extend({},this.options,e);return this._initFormSettings(i),this._initDataSettings(i),i},_enhancePromise:function(t){return t.success=t.done,t.error=t.fail,t.complete=t.always,t},_getXHRPromise:function(e,i,n){var s=t.Deferred(),o=s.promise();return i=i||this.options.context||o,e===!0?s.resolveWith(i,n):e===!1&&s.rejectWith(i,n),o.abort=s.promise,this._enhancePromise(o)},_getUploadedBytes:function(t){var e=t.getResponseHeader("Range"),i=e&&e.split("-"),n=i&&i.length>1&&parseInt(i[1],10);return n&&n+1},_chunkedUpload:function(e,i){var n,s,o=this,a=e.files[0],r=a.size,l=e.uploadedBytes=e.uploadedBytes||0,h=e.maxChunkSize||r,u=a.slice||a.webkitSlice||a.mozSlice,c=t.Deferred(),d=c.promise();return this._isXHRUpload(e)&&u&&(l||r>h)&&!e.data?i?!0:l>=r?(a.error="Uploaded bytes exceed file size",this._getXHRPromise(!1,e.context,[null,"error",a.error])):(s=function(){var i=t.extend({},e);i.blob=u.call(a,l,l+h,a.type),i.chunkSize=i.blob.size,i.contentRange="bytes "+l+"-"+(l+i.chunkSize-1)+"/"+r,o._initXHRData(i),o._initProgressListener(i),n=(o._trigger("chunksend",null,i)!==!1&&t.ajax(i)||o._getXHRPromise(!1,i.context)).done(function(n,a,h){l=o._getUploadedBytes(h)||l+i.chunkSize,(!i.loaded||i.loaded<i.total)&&o._onProgress(t.Event("progress",{lengthComputable:!0,loaded:l-i.uploadedBytes,total:l-i.uploadedBytes}),i),e.uploadedBytes=i.uploadedBytes=l,i.result=n,i.textStatus=a,i.jqXHR=h,o._trigger("chunkdone",null,i),o._trigger("chunkalways",null,i),r>l?s():c.resolveWith(i.context,[n,a,h])}).fail(function(t,e,n){i.jqXHR=t,i.textStatus=e,i.errorThrown=n,o._trigger("chunkfail",null,i),o._trigger("chunkalways",null,i),c.rejectWith(i.context,[t,e,n])
})},this._enhancePromise(d),d.abort=function(){return n.abort()},s(),d):!1},_beforeSend:function(t,e){0===this._active&&(this._trigger("start"),this._bitrateTimer=new this._BitrateTimer),this._active+=1,this._loaded+=e.uploadedBytes||0,this._total+=this._getTotal(e.files)},_onDone:function(e,i,n,s){if(!this._isXHRUpload(s)||!s.loaded||s.loaded<s.total){var o=this._getTotal(s.files)||1;this._onProgress(t.Event("progress",{lengthComputable:!0,loaded:o,total:o}),s)}s.result=e,s.textStatus=i,s.jqXHR=n,this._trigger("done",null,s)},_onFail:function(t,e,i,n){n.jqXHR=t,n.textStatus=e,n.errorThrown=i,this._trigger("fail",null,n),n.recalculateProgress&&(this._loaded-=n.loaded||n.uploadedBytes||0,this._total-=n.total||this._getTotal(n.files))},_onAlways:function(t,e,i,n){this._active-=1,this._trigger("always",null,n),0===this._active&&(this._trigger("stop"),this._loaded=this._total=0,this._bitrateTimer=null)},_onSend:function(e,i){var n,s,o,a,r=this,l=r._getAJAXSettings(i),h=function(){return r._sending+=1,l._bitrateTimer=new r._BitrateTimer,n=n||((s||r._trigger("send",e,l)===!1)&&r._getXHRPromise(!1,l.context,s)||r._chunkedUpload(l)||t.ajax(l)).done(function(t,e,i){r._onDone(t,e,i,l)}).fail(function(t,e,i){r._onFail(t,e,i,l)}).always(function(t,e,i){if(r._sending-=1,r._onAlways(t,e,i,l),l.limitConcurrentUploads&&l.limitConcurrentUploads>r._sending)for(var n,s=r._slots.shift();s;){if(n=s.state?"pending"===s.state():!s.isRejected()){s.resolve();break}s=r._slots.shift()}})};return this._beforeSend(e,l),this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending?(this.options.limitConcurrentUploads>1?(o=t.Deferred(),this._slots.push(o),a=o.pipe(h)):a=this._sequence=this._sequence.pipe(h,h),a.abort=function(){return s=[void 0,"abort","abort"],n?n.abort():(o&&o.rejectWith(l.context,s),h())},this._enhancePromise(a)):h()},_onAdd:function(e,i){var n,s,o,a,r=this,l=!0,h=t.extend({},this.options,i),u=h.limitMultiFileUploads,c=this._getParamName(h);if((h.singleFileUploads||u)&&this._isXHRUpload(h))if(!h.singleFileUploads&&u)for(o=[],n=[],a=0;a<i.files.length;a+=u)o.push(i.files.slice(a,a+u)),s=c.slice(a,a+u),s.length||(s=c),n.push(s);else n=c;else o=[i.files],n=[c];return i.originalFiles=i.files,t.each(o||i.files,function(s,a){var h=t.extend({},i);return h.files=o?a:[a],h.paramName=n[s],h.submit=function(){return h.jqXHR=this.jqXHR=r._trigger("submit",e,this)!==!1&&r._onSend(e,this),this.jqXHR},l=r._trigger("add",e,h)}),l},_replaceFileInput:function(e){var i=e.clone(!0);t("<form></form>").append(i)[0].reset(),e.after(i).detach(),t.cleanData(e.unbind("remove")),this.options.fileInput=this.options.fileInput.map(function(t,n){return n===e[0]?i[0]:n}),e[0]===this.element[0]&&(this.element=i)},_handleFileTreeEntry:function(e,i){var n,s=this,o=t.Deferred(),a=function(t){t&&!t.entry&&(t.entry=e),o.resolve([t])};return i=i||"",e.isFile?e._file?(e._file.relativePath=i,o.resolve(e._file)):e.file(function(t){t.relativePath=i,o.resolve(t)},a):e.isDirectory?(n=e.createReader(),n.readEntries(function(t){s._handleFileTreeEntries(t,i+e.name+"/").done(function(t){o.resolve(t)}).fail(a)},a)):o.resolve([]),o.promise()},_handleFileTreeEntries:function(e,i){var n=this;return t.when.apply(t,t.map(e,function(t){return n._handleFileTreeEntry(t,i)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(e){e=e||{};var i=e.items;return i&&i.length&&(i[0].webkitGetAsEntry||i[0].getAsEntry)?this._handleFileTreeEntries(t.map(i,function(t){var e;return t.webkitGetAsEntry?(e=t.webkitGetAsEntry(),e&&(e._file=t.getAsFile()),e):t.getAsEntry()})):t.Deferred().resolve(t.makeArray(e.files)).promise()},_getSingleFileInputFiles:function(e){e=t(e);var i,n,s=e.prop("webkitEntries")||e.prop("entries");if(s&&s.length)return this._handleFileTreeEntries(s);if(i=t.makeArray(e.prop("files")),i.length)void 0===i[0].name&&i[0].fileName&&t.each(i,function(t,e){e.name=e.fileName,e.size=e.fileSize});else{if(n=e.prop("value"),!n)return t.Deferred().resolve([]).promise();i=[{name:n.replace(/^.*\\/,"")}]}return t.Deferred().resolve(i).promise()},_getFileInputFiles:function(e){return e instanceof t&&1!==e.length?t.when.apply(t,t.map(e,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)}):this._getSingleFileInputFiles(e)},_onChange:function(e){var i=this,n={fileInput:t(e.target),form:t(e.target.form)};this._getFileInputFiles(n.fileInput).always(function(t){n.files=t,i.options.replaceFileInput&&i._replaceFileInput(n.fileInput),i._trigger("change",e,n)!==!1&&i._onAdd(e,n)})},_onPaste:function(e){var i=e.originalEvent.clipboardData,n=i&&i.items||[],s={files:[]};return t.each(n,function(t,e){var i=e.getAsFile&&e.getAsFile();i&&s.files.push(i)}),this._trigger("paste",e,s)===!1||this._onAdd(e,s)===!1?!1:void 0},_onDrop:function(t){var e=this,i=t.dataTransfer=t.originalEvent.dataTransfer,n={};i&&i.files&&i.files.length&&t.preventDefault(),this._getDroppedFiles(i).always(function(i){n.files=i,e._trigger("drop",t,n)!==!1&&e._onAdd(t,n)})},_onDragOver:function(e){var i=e.dataTransfer=e.originalEvent.dataTransfer;return this._trigger("dragover",e)===!1?!1:void(i&&-1!==t.inArray("Files",i.types)&&(i.dropEffect="copy",e.preventDefault()))},_initEventHandlers:function(){this._isXHRUpload(this.options)&&(this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop}),this._on(this.options.pasteZone,{paste:this._onPaste})),this._on(this.options.fileInput,{change:this._onChange})},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragover drop"),this._off(this.options.pasteZone,"paste"),this._off(this.options.fileInput,"change")},_setOption:function(e,i){var n=-1!==t.inArray(e,this._refreshOptionsList);n&&this._destroyEventHandlers(),this._super(e,i),n&&(this._initSpecialOptions(),this._initEventHandlers())},_initSpecialOptions:function(){var e=this.options;void 0===e.fileInput?e.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]'):e.fileInput instanceof t||(e.fileInput=t(e.fileInput)),e.dropZone instanceof t||(e.dropZone=t(e.dropZone)),e.pasteZone instanceof t||(e.pasteZone=t(e.pasteZone))},_create:function(){var e=this.options;t.extend(e,t(this.element[0].cloneNode(!1)).data()),this._initSpecialOptions(),this._slots=[],this._sequence=this._getXHRPromise(!0),this._sending=this._active=this._loaded=this._total=0,this._initEventHandlers()},_destroy:function(){this._destroyEventHandlers()},add:function(e){var i=this;e&&!this.options.disabled&&(e.fileInput&&!e.files?this._getFileInputFiles(e.fileInput).always(function(t){e.files=t,i._onAdd(null,e)}):(e.files=t.makeArray(e.files),this._onAdd(null,e)))},send:function(e){if(e&&!this.options.disabled){if(e.fileInput&&!e.files){var i,n,s=this,o=t.Deferred(),a=o.promise();return a.abort=function(){return n=!0,i?i.abort():(o.reject(null,"abort","abort"),a)},this._getFileInputFiles(e.fileInput).always(function(t){n||(e.files=t,i=s._onSend(null,e).then(function(t,e,i){o.resolve(t,e,i)},function(t,e,i){o.reject(t,e,i)}))}),this._enhancePromise(a)}if(e.files=t.makeArray(e.files),e.files.length)return this._onSend(null,e)}return this._getXHRPromise(!1,e&&e.context)}})}),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","load-image","canvas-to-blob","./jquery.fileupload"],t):t(window.jQuery,window.loadImage)}(function(t,e){"use strict";t.widget("blueimp.fileupload",t.blueimp.fileupload,{options:{process:[],add:function(e,i){t(this).fileupload("process",i).done(function(){i.submit()})}},processActions:{load:function(i,n){var s=this,o=i.files[i.index],a=t.Deferred();return window.HTMLCanvasElement&&window.HTMLCanvasElement.prototype.toBlob&&("number"!==t.type(n.maxFileSize)||o.size<n.maxFileSize)&&(!n.fileTypes||n.fileTypes.test(o.type))?e(o,function(t){return t.src?(i.img=t,void a.resolveWith(s,[i])):a.rejectWith(s,[i])}):a.rejectWith(s,[i]),a.promise()},resize:function(i,n){var s,o=i.img;return n=t.extend({canvas:!0},n),o&&(s=e.scale(o,n),(s.width!==o.width||s.height!==o.height)&&(i.canvas=s)),i},save:function(e){if(!e.canvas)return e;var i=this,n=e.files[e.index],s=n.name,o=t.Deferred(),a=function(t){t.name||(n.type===t.type?t.name=n.name:n.name&&(t.name=n.name.replace(/\..+$/,"."+t.type.substr(6)))),e.files[e.index]=t,o.resolveWith(i,[e])};return e.canvas.mozGetAsFile?a(e.canvas.mozGetAsFile(/^image\/(jpeg|png)$/.test(n.type)&&s||(s&&s.replace(/\..+$/,"")||"blob")+".png",n.type)):e.canvas.toBlob(a,n.type),o.promise()}},_processFile:function(e,i,n){var s=this,o=t.Deferred().resolveWith(s,[{files:e,index:i}]),a=o.promise();return s._processing+=1,t.each(n.process,function(t,e){a=a.pipe(function(t){return s.processActions[e.action].call(this,t,e)})}),a.always(function(){s._processing-=1,0===s._processing&&s.element.removeClass("fileupload-processing")}),1===s._processing&&s.element.addClass("fileupload-processing"),a},process:function(e){var i=this,n=t.extend({},this.options,e);return n.process&&n.process.length&&this._isXHRUpload(n)&&t.each(e.files,function(s){i._processingQueue=i._processingQueue.pipe(function(){var o=t.Deferred();return i._processFile(e.files,s,n).always(function(){o.resolveWith(i)}),o.promise()})}),this._processingQueue},_create:function(){this._super(),this._processing=0,this._processingQueue=t.Deferred().resolveWith(this).promise()}})}),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","tmpl","load-image","./jquery.fileupload-fp"],t):t(window.jQuery,window.tmpl,window.loadImage)}(function(t,e,i){"use strict";t.widget("blueimp.fileupload",t.blueimp.fileupload,{options:{autoUpload:!1,maxNumberOfFiles:void 0,maxFileSize:void 0,minFileSize:void 0,acceptFileTypes:/.+$/i,previewSourceFileTypes:/^image\/(gif|jpeg|png)$/,previewSourceMaxFileSize:5e6,previewMaxWidth:80,previewMaxHeight:80,previewAsCanvas:!0,uploadTemplateId:"template-upload",downloadTemplateId:"template-download",filesContainer:void 0,prependFiles:!1,dataType:"json",add:function(e,i){var n=t(this).data("blueimp-fileupload")||t(this).data("fileupload"),s=n.options,o=i.files;t(this).fileupload("process",i).done(function(){n._adjustMaxNumberOfFiles(-o.length),i.maxNumberOfFilesAdjusted=!0,i.files.valid=i.isValidated=n._validate(o),i.context=n._renderUpload(o).data("data",i),s.filesContainer[s.prependFiles?"prepend":"append"](i.context),n._renderPreviews(i),n._forceReflow(i.context),n._transition(i.context).done(function(){n._trigger("added",e,i)!==!1&&(s.autoUpload||i.autoUpload)&&i.autoUpload!==!1&&i.isValidated&&i.submit()})})},send:function(e,i){var n=t(this).data("blueimp-fileupload")||t(this).data("fileupload");return i.isValidated||(i.maxNumberOfFilesAdjusted||(n._adjustMaxNumberOfFiles(-i.files.length),i.maxNumberOfFilesAdjusted=!0),n._validate(i.files))?(i.context&&i.dataType&&"iframe"===i.dataType.substr(0,6)&&i.context.find(".progress").addClass(!t.support.transition&&"progress-animated").attr("aria-valuenow",100).find(".bar").css("width","100%"),n._trigger("sent",e,i)):!1},done:function(e,i){var n,s,o=t(this).data("blueimp-fileupload")||t(this).data("fileupload"),a=o._getFilesFromResponse(i);i.context?i.context.each(function(s){var r=a[s]||{error:"Empty file upload result"},l=o._addFinishedDeferreds();r.error&&o._adjustMaxNumberOfFiles(1),o._transition(t(this)).done(function(){var s=t(this);n=o._renderDownload([r]).replaceAll(s),o._forceReflow(n),o._transition(n).done(function(){i.context=t(this),o._trigger("completed",e,i),o._trigger("finished",e,i),l.resolve()})})}):(a.length&&(t.each(a,function(t,e){i.maxNumberOfFilesAdjusted&&e.error?o._adjustMaxNumberOfFiles(1):i.maxNumberOfFilesAdjusted||e.error||o._adjustMaxNumberOfFiles(-1)}),i.maxNumberOfFilesAdjusted=!0),n=o._renderDownload(a).appendTo(o.options.filesContainer),o._forceReflow(n),s=o._addFinishedDeferreds(),o._transition(n).done(function(){i.context=t(this),o._trigger("completed",e,i),o._trigger("finished",e,i),s.resolve()}))},fail:function(e,i){var n,s,o=t(this).data("blueimp-fileupload")||t(this).data("fileupload");i.maxNumberOfFilesAdjusted&&o._adjustMaxNumberOfFiles(i.files.length),i.context?i.context.each(function(a){if("abort"!==i.errorThrown){var r=i.files[a];r.error=r.error||i.errorThrown||!0,s=o._addFinishedDeferreds(),o._transition(t(this)).done(function(){var a=t(this);n=o._renderDownload([r]).replaceAll(a),o._forceReflow(n),o._transition(n).done(function(){i.context=t(this),o._trigger("failed",e,i),o._trigger("finished",e,i),s.resolve()})})}else s=o._addFinishedDeferreds(),o._transition(t(this)).done(function(){t(this).remove(),o._trigger("failed",e,i),o._trigger("finished",e,i),s.resolve()})}):"abort"!==i.errorThrown?(i.context=o._renderUpload(i.files).appendTo(o.options.filesContainer).data("data",i),o._forceReflow(i.context),s=o._addFinishedDeferreds(),o._transition(i.context).done(function(){i.context=t(this),o._trigger("failed",e,i),o._trigger("finished",e,i),s.resolve()})):(o._trigger("failed",e,i),o._trigger("finished",e,i),o._addFinishedDeferreds().resolve())},progress:function(t,e){if(e.context){var i=parseInt(e.loaded/e.total*100,10);e.context.find(".progress").attr("aria-valuenow",i).find(".bar").css("width",i+"%")}},progressall:function(e,i){var n=t(this),s=parseInt(i.loaded/i.total*100,10),o=n.find(".fileupload-progress"),a=o.find(".progress-extended");a.length&&a.html((n.data("blueimp-fileupload")||n.data("fileupload"))._renderExtendedProgress(i)),o.find(".progress").attr("aria-valuenow",s).find(".bar").css("width",s+"%")},start:function(e){var i=t(this).data("blueimp-fileupload")||t(this).data("fileupload");i._resetFinishedDeferreds(),i._transition(t(this).find(".fileupload-progress")).done(function(){i._trigger("started",e)})},stop:function(e){var i=t(this).data("blueimp-fileupload")||t(this).data("fileupload"),n=i._addFinishedDeferreds();t.when.apply(t,i._getFinishedDeferreds()).done(function(){i._trigger("stopped",e)}),i._transition(t(this).find(".fileupload-progress")).done(function(){t(this).find(".progress").attr("aria-valuenow","0").find(".bar").css("width","0%"),t(this).find(".progress-extended").html("&nbsp;"),n.resolve()})},destroy:function(e,i){var n=t(this).data("blueimp-fileupload")||t(this).data("fileupload");i.url&&(t.ajax(i),n._adjustMaxNumberOfFiles(1)),n._transition(i.context).done(function(){t(this).remove(),n._trigger("destroyed",e,i)})}},_resetFinishedDeferreds:function(){this._finishedUploads=[]},_addFinishedDeferreds:function(e){return e||(e=t.Deferred()),this._finishedUploads.push(e),e},_getFinishedDeferreds:function(){return this._finishedUploads},_getFilesFromResponse:function(e){return e.result&&t.isArray(e.result.files)?e.result.files:[]},_enableDragToDesktop:function(){var e=t(this),i=e.prop("href"),n=e.prop("download"),s="application/octet-stream";e.bind("dragstart",function(t){try{t.originalEvent.dataTransfer.setData("DownloadURL",[s,n,i].join(":"))}catch(e){}})},_adjustMaxNumberOfFiles:function(t){"number"==typeof this.options.maxNumberOfFiles&&(this.options.maxNumberOfFiles+=t,this.options.maxNumberOfFiles<1?this._disableFileInputButton():this._enableFileInputButton())},_formatFileSize:function(t){return"number"!=typeof t?"":t>=1e9?(t/1e9).toFixed(2)+" GB":t>=1e6?(t/1e6).toFixed(2)+" MB":(t/1e3).toFixed(2)+" KB"},_formatBitrate:function(t){return"number"!=typeof t?"":t>=1e9?(t/1e9).toFixed(2)+" Gbit/s":t>=1e6?(t/1e6).toFixed(2)+" Mbit/s":t>=1e3?(t/1e3).toFixed(2)+" kbit/s":t.toFixed(2)+" bit/s"},_formatTime:function(t){var e=new Date(1e3*t),i=parseInt(t/86400,10);return i=i?i+"d ":"",i+("0"+e.getUTCHours()).slice(-2)+":"+("0"+e.getUTCMinutes()).slice(-2)+":"+("0"+e.getUTCSeconds()).slice(-2)},_formatPercentage:function(t){return(100*t).toFixed(2)+" %"},_renderExtendedProgress:function(t){return this._formatBitrate(t.bitrate)+" | "+this._formatTime(8*(t.total-t.loaded)/t.bitrate)+" | "+this._formatPercentage(t.loaded/t.total)+" | "+this._formatFileSize(t.loaded)+" / "+this._formatFileSize(t.total)},_hasError:function(t){return t.error?t.error:this.options.maxNumberOfFiles<0?"Maximum number of files exceeded":this.options.acceptFileTypes.test(t.type)||this.options.acceptFileTypes.test(t.name)?this.options.maxFileSize&&t.size>this.options.maxFileSize?"File is too big":"number"==typeof t.size&&t.size<this.options.minFileSize?"File is too small":null:"Filetype not allowed"},_validate:function(e){var i=this,n=!!e.length;return t.each(e,function(t,e){e.error=i._hasError(e),e.error&&(n=!1)}),n},_renderTemplate:function(e,i){if(!e)return t();var n=e({files:i,formatFileSize:this._formatFileSize,options:this.options});return n instanceof t?n:t(this.options.templatesContainer).html(n).children()},_renderPreview:function(e,n){var s=this,o=this.options,a=t.Deferred();return(i&&i(e,function(e){n.append(e),s._forceReflow(n),s._transition(n).done(function(){a.resolveWith(n)}),t.contains(s.document[0].body,n[0])||a.resolveWith(n)},{maxWidth:o.previewMaxWidth,maxHeight:o.previewMaxHeight,canvas:o.previewAsCanvas})||a.resolveWith(n))&&a},_renderPreviews:function(e){var i=this,n=this.options;return e.context.find(".preview span").each(function(s,o){var a=e.files[s];n.previewSourceFileTypes.test(a.type)&&("number"!==t.type(n.previewSourceMaxFileSize)||a.size<n.previewSourceMaxFileSize)&&(i._processingQueue=i._processingQueue.pipe(function(){var n=t.Deferred(),s=t.Event("previewdone",{target:o});return i._renderPreview(a,t(o)).done(function(){i._trigger(s.type,s,e),n.resolveWith(i)}),n.promise()}))}),this._processingQueue},_renderUpload:function(t){return this._renderTemplate(this.options.uploadTemplate,t)},_renderDownload:function(t){return this._renderTemplate(this.options.downloadTemplate,t).find("a[download]").each(this._enableDragToDesktop).end()},_startHandler:function(e){e.preventDefault();var i=t(e.currentTarget),n=i.closest(".template-upload"),s=n.data("data");s&&s.submit&&!s.jqXHR&&s.submit()&&i.prop("disabled",!0)},_cancelHandler:function(e){e.preventDefault();var i=t(e.currentTarget).closest(".template-upload"),n=i.data("data")||{};n.jqXHR?n.jqXHR.abort():(n.errorThrown="abort",this._trigger("fail",e,n))},_deleteHandler:function(e){e.preventDefault();var i=t(e.currentTarget);this._trigger("destroy",e,t.extend({context:i.closest(".template-download"),type:"DELETE",dataType:this.options.dataType},i.data()))},_forceReflow:function(e){return t.support.transition&&e.length&&e[0].offsetWidth},_transition:function(e){var i=t.Deferred();return t.support.transition&&e.hasClass("fade")?e.bind(t.support.transition.end,function(n){n.target===e[0]&&(e.unbind(t.support.transition.end),i.resolveWith(e))}).toggleClass("in"):(e.toggleClass("in"),i.resolveWith(e)),i},_initButtonBarEventHandlers:function(){var e=this.element.find(".fileupload-buttonbar"),i=this.options.filesContainer;this._on(e.find(".start"),{click:function(t){t.preventDefault(),i.find(".start button").click()}}),this._on(e.find(".cancel"),{click:function(t){t.preventDefault(),i.find(".cancel button").click()}}),this._on(e.find(".delete"),{click:function(t){t.preventDefault(),i.find(".delete input:checked").siblings("button").click(),e.find(".toggle").prop("checked",!1)}}),this._on(e.find(".toggle"),{change:function(e){i.find(".delete input").prop("checked",t(e.currentTarget).is(":checked"))}})},_destroyButtonBarEventHandlers:function(){this._off(this.element.find(".fileupload-buttonbar button"),"click"),this._off(this.element.find(".fileupload-buttonbar .toggle"),"change.")},_initEventHandlers:function(){this._super(),this._on(this.options.filesContainer,{"click .start button":this._startHandler,"click .cancel button":this._cancelHandler,"click .delete button":this._deleteHandler}),this._initButtonBarEventHandlers()},_destroyEventHandlers:function(){this._destroyButtonBarEventHandlers(),this._off(this.options.filesContainer,"click"),this._super()},_enableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",!1).parent().removeClass("disabled")},_disableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",!0).parent().addClass("disabled")},_initTemplates:function(){var t=this.options;t.templatesContainer=this.document[0].createElement(t.filesContainer.prop("nodeName")),e&&(t.uploadTemplateId&&(t.uploadTemplate=e(t.uploadTemplateId)),t.downloadTemplateId&&(t.downloadTemplate=e(t.downloadTemplateId)))},_initFilesContainer:function(){var e=this.options;void 0===e.filesContainer?e.filesContainer=this.element.find(".files"):e.filesContainer instanceof t||(e.filesContainer=t(e.filesContainer))},_stringToRegExp:function(t){var e=t.split("/"),i=e.pop();return e.shift(),new RegExp(e.join("/"),i)},_initRegExpOptions:function(){var e=this.options;"string"===t.type(e.acceptFileTypes)&&(e.acceptFileTypes=this._stringToRegExp(e.acceptFileTypes)),"string"===t.type(e.previewSourceFileTypes)&&(e.previewSourceFileTypes=this._stringToRegExp(e.previewSourceFileTypes))},_initSpecialOptions:function(){this._super(),this._initFilesContainer(),this._initTemplates(),this._initRegExpOptions()},_setOption:function(t,e){this._super(t,e),"maxNumberOfFiles"===t&&this._adjustMaxNumberOfFiles(0)},_create:function(){this._super(),this._refreshOptionsList.push("filesContainer","uploadTemplateId","downloadTemplateId"),this._processingQueue||(this._processingQueue=t.Deferred().resolveWith(this).promise(),this.process=function(){return this._processingQueue}),this._resetFinishedDeferreds()},enable:function(){var t=!1;this.options.disabled&&(t=!0),this._super(),t&&(this.element.find("input, button").prop("disabled",!1),this._enableFileInputButton())},disable:function(){this.options.disabled||(this.element.find("input, button").prop("disabled",!0),this._disableFileInputButton()),this._super()}})}),window.locale={fileupload:{errors:{maxFileSize:"File is too big",minFileSize:"File is too small",acceptFileTypes:"Filetype not allowed",maxNumberOfFiles:"Max number of files exceeded",uploadedBytes:"Uploaded bytes exceed file size",emptyResult:"Empty file upload result"},error:"Error",start:"Start",cancel:"Cancel",destroy:"Delete"}},+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.affix"),o="object"==typeof e&&e;s||n.data("bs.affix",s=new i(this,o)),"string"==typeof e&&s[e]()})}var i=function(e,n){this.options=t.extend({},i.DEFAULTS,n),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(e),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};i.VERSION="3.2.0",i.RESET="affix affix-top affix-bottom",i.DEFAULTS={offset:0,target:window},i.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(i.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},i.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},i.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e=t(document).height(),n=this.$target.scrollTop(),s=this.$element.offset(),o=this.options.offset,a=o.top,r=o.bottom;"object"!=typeof o&&(r=a=o),"function"==typeof a&&(a=o.top(this.$element)),"function"==typeof r&&(r=o.bottom(this.$element));var l=null!=this.unpin&&n+this.unpin<=s.top?!1:null!=r&&s.top+this.$element.height()>=e-r?"bottom":null!=a&&a>=n?"top":!1;if(this.affixed!==l){null!=this.unpin&&this.$element.css("top","");var h="affix"+(l?"-"+l:""),u=t.Event(h+".bs.affix");this.$element.trigger(u),u.isDefaultPrevented()||(this.affixed=l,this.unpin="bottom"==l?this.getPinnedOffset():null,this.$element.removeClass(i.RESET).addClass(h).trigger(t.Event(h.replace("affix","affixed"))),"bottom"==l&&this.$element.offset({top:e-this.$element.height()-r}))}}};var n=t.fn.affix;t.fn.affix=e,t.fn.affix.Constructor=i,t.fn.affix.noConflict=function(){return t.fn.affix=n,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var i=t(this),n=i.data();n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),e.call(i,n)})})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),s=i.data("bs.alert");s||i.data("bs.alert",s=new n(this)),"string"==typeof e&&s[e].call(i)})}var i='[data-dismiss="alert"]',n=function(e){t(e).on("click",i,this.close)};n.VERSION="3.2.0",n.prototype.close=function(e){function i(){o.detach().trigger("closed.bs.alert").remove()}var n=t(this),s=n.attr("data-target");s||(s=n.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,""));var o=t(s);e&&e.preventDefault(),o.length||(o=n.hasClass("alert")?n:n.parent()),o.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(o.removeClass("in"),t.support.transition&&o.hasClass("fade")?o.one("bsTransitionEnd",i).emulateTransitionEnd(150):i())};var s=t.fn.alert;t.fn.alert=e,t.fn.alert.Constructor=n,t.fn.alert.noConflict=function(){return t.fn.alert=s,this},t(document).on("click.bs.alert.data-api",i,n.prototype.close)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.button"),o="object"==typeof e&&e;s||n.data("bs.button",s=new i(this,o)),"toggle"==e?s.toggle():e&&s.setState(e)})}var i=function(e,n){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,n),this.isLoading=!1};i.VERSION="3.2.0",i.DEFAULTS={loadingText:"loading..."},i.prototype.setState=function(e){var i="disabled",n=this.$element,s=n.is("input")?"val":"html",o=n.data();e+="Text",null==o.resetText&&n.data("resetText",n[s]()),n[s](null==o[e]?this.options[e]:o[e]),setTimeout(t.proxy(function(){"loadingText"==e?(this.isLoading=!0,n.addClass(i).attr(i,i)):this.isLoading&&(this.isLoading=!1,n.removeClass(i).removeAttr(i))},this),0)},i.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")&&(i.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&i.prop("checked",!this.$element.hasClass("active")).trigger("change")}t&&this.$element.toggleClass("active")};var n=t.fn.button;t.fn.button=e,t.fn.button.Constructor=i,t.fn.button.noConflict=function(){return t.fn.button=n,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(i){var n=t(i.target);n.hasClass("btn")||(n=n.closest(".btn")),e.call(n,"toggle"),i.preventDefault()})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.carousel"),o=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e),a="string"==typeof e?e:o.slide;s||n.data("bs.carousel",s=new i(this,o)),"number"==typeof e?s.to(e):a?s[a]():o.interval&&s.pause().cycle()})}var i=function(e,i){this.$element=t(e).on("keydown.bs.carousel",t.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};i.VERSION="3.2.0",i.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},i.prototype.keydown=function(t){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()},i.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},i.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},i.prototype.to=function(e){var i=this,n=this.getItemIndex(this.$active=this.$element.find(".item.active"));return e>this.$items.length-1||0>e?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){i.to(e)}):n==e?this.pause().cycle():this.slide(e>n?"next":"prev",t(this.$items[e]))},i.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},i.prototype.next=function(){return this.sliding?void 0:this.slide("next")},i.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},i.prototype.slide=function(e,i){var n=this.$element.find(".item.active"),s=i||n[e](),o=this.interval,a="next"==e?"left":"right",r="next"==e?"first":"last",l=this;if(!s.length){if(!this.options.wrap)return;s=this.$element.find(".item")[r]()}if(s.hasClass("active"))return this.sliding=!1;var h=s[0],u=t.Event("slide.bs.carousel",{relatedTarget:h,direction:a});if(this.$element.trigger(u),!u.isDefaultPrevented()){if(this.sliding=!0,o&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var c=t(this.$indicators.children()[this.getItemIndex(s)]);c&&c.addClass("active")}var d=t.Event("slid.bs.carousel",{relatedTarget:h,direction:a});return t.support.transition&&this.$element.hasClass("slide")?(s.addClass(e),s[0].offsetWidth,n.addClass(a),s.addClass(a),n.one("bsTransitionEnd",function(){s.removeClass([e,a].join(" ")).addClass("active"),n.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(d)},0)}).emulateTransitionEnd(1e3*n.css("transition-duration").slice(0,-1))):(n.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(d)),o&&this.cycle(),this}};var n=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=i,t.fn.carousel.noConflict=function(){return t.fn.carousel=n,this},t(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(i){var n,s=t(this),o=t(s.attr("data-target")||(n=s.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""));if(o.hasClass("carousel")){var a=t.extend({},o.data(),s.data()),r=s.attr("data-slide-to");r&&(a.interval=!1),e.call(o,a),r&&o.data("bs.carousel").to(r),i.preventDefault()}}),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var i=t(this);e.call(i,i.data())})})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.collapse"),o=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);!s&&o.toggle&&"show"==e&&(e=!e),s||n.data("bs.collapse",s=new i(this,o)),"string"==typeof e&&s[e]()})}var i=function(e,n){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,n),this.transitioning=null,this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};i.VERSION="3.2.0",i.DEFAULTS={toggle:!0},i.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},i.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var i=t.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){var n=this.$parent&&this.$parent.find("> .panel > .in");if(n&&n.length){var s=n.data("bs.collapse");if(s&&s.transitioning)return;e.call(n,"hide"),s||n.data("bs.collapse",null)}var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0),this.transitioning=1;var a=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return a.call(this);var r=t.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",t.proxy(a,this)).emulateTransitionEnd(350)[o](this.$element[0][r])}}},i.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var i=this.dimension();this.$element[i](this.$element[i]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var n=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return t.support.transition?void this.$element[i](0).one("bsTransitionEnd",t.proxy(n,this)).emulateTransitionEnd(350):n.call(this)}}},i.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var n=t.fn.collapse;t.fn.collapse=e,t.fn.collapse.Constructor=i,t.fn.collapse.noConflict=function(){return t.fn.collapse=n,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(i){var n,s=t(this),o=s.attr("data-target")||i.preventDefault()||(n=s.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""),a=t(o),r=a.data("bs.collapse"),l=r?"toggle":s.data(),h=s.attr("data-parent"),u=h&&t(h);
    r&&r.transitioning||(u&&u.find('[data-toggle="collapse"][data-parent="'+h+'"]').not(s).addClass("collapsed"),s[a.hasClass("in")?"addClass":"removeClass"]("collapsed")),e.call(a,l)})}(jQuery),+function(t){"use strict";function e(e){e&&3===e.which||(t(s).remove(),t(o).each(function(){var n=i(t(this)),s={relatedTarget:this};n.hasClass("open")&&(n.trigger(e=t.Event("hide.bs.dropdown",s)),e.isDefaultPrevented()||n.removeClass("open").trigger("hidden.bs.dropdown",s))}))}function i(e){var i=e.attr("data-target");i||(i=e.attr("href"),i=i&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var n=i&&t(i);return n&&n.length?n:e.parent()}function n(e){return this.each(function(){var i=t(this),n=i.data("bs.dropdown");n||i.data("bs.dropdown",n=new a(this)),"string"==typeof e&&n[e].call(i)})}var s=".dropdown-backdrop",o='[data-toggle="dropdown"]',a=function(e){t(e).on("click.bs.dropdown",this.toggle)};a.VERSION="3.2.0",a.prototype.toggle=function(n){var s=t(this);if(!s.is(".disabled, :disabled")){var o=i(s),a=o.hasClass("open");if(e(),!a){"ontouchstart"in document.documentElement&&!o.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click",e);var r={relatedTarget:this};if(o.trigger(n=t.Event("show.bs.dropdown",r)),n.isDefaultPrevented())return;s.trigger("focus"),o.toggleClass("open").trigger("shown.bs.dropdown",r)}return!1}},a.prototype.keydown=function(e){if(/(38|40|27)/.test(e.keyCode)){var n=t(this);if(e.preventDefault(),e.stopPropagation(),!n.is(".disabled, :disabled")){var s=i(n),a=s.hasClass("open");if(!a||a&&27==e.keyCode)return 27==e.which&&s.find(o).trigger("focus"),n.trigger("click");var r=" li:not(.divider):visible a",l=s.find('[role="menu"]'+r+', [role="listbox"]'+r);if(l.length){var h=l.index(l.filter(":focus"));38==e.keyCode&&h>0&&h--,40==e.keyCode&&h<l.length-1&&h++,~h||(h=0),l.eq(h).trigger("focus")}}}};var r=t.fn.dropdown;t.fn.dropdown=n,t.fn.dropdown.Constructor=a,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=r,this},t(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",o,a.prototype.toggle).on("keydown.bs.dropdown.data-api",o+', [role="menu"], [role="listbox"]',a.prototype.keydown)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.tab");s||n.data("bs.tab",s=new i(this)),"string"==typeof e&&s[e]()})}var i=function(e){this.element=t(e)};i.VERSION="3.2.0",i.prototype.show=function(){var e=this.element,i=e.closest("ul:not(.dropdown-menu)"),n=e.data("target");if(n||(n=e.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var s=i.find(".active:last a")[0],o=t.Event("show.bs.tab",{relatedTarget:s});if(e.trigger(o),!o.isDefaultPrevented()){var a=t(n);this.activate(e.closest("li"),i),this.activate(a,a.parent(),function(){e.trigger({type:"shown.bs.tab",relatedTarget:s})})}}},i.prototype.activate=function(e,i,n){function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),e.addClass("active"),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu")&&e.closest("li.dropdown").addClass("active"),n&&n()}var o=i.find("> .active"),a=n&&t.support.transition&&o.hasClass("fade");a?o.one("bsTransitionEnd",s).emulateTransitionEnd(150):s(),o.removeClass("in")};var n=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=i,t.fn.tab.noConflict=function(){return t.fn.tab=n,this},t(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(i){i.preventDefault(),e.call(t(this),"show")})}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,n=this;t(this).one("bsTransitionEnd",function(){i=!0});var s=function(){i||t(n).trigger(t.support.transition.end)};return setTimeout(s,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(t){"use strict";function e(i,n){var s=t.proxy(this.process,this);this.$body=t("body"),this.$scrollElement=t(t(i).is("body")?window:i),this.options=t.extend({},e.DEFAULTS,n),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s),this.refresh(),this.process()}function i(i){return this.each(function(){var n=t(this),s=n.data("bs.scrollspy"),o="object"==typeof i&&i;s||n.data("bs.scrollspy",s=new e(this,o)),"string"==typeof i&&s[i]()})}e.VERSION="3.2.0",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e="offset",i=0;t.isWindow(this.$scrollElement[0])||(e="position",i=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var n=this;this.$body.find(this.selector).map(function(){var n=t(this),s=n.data("target")||n.attr("href"),o=/^#./.test(s)&&t(s);return o&&o.length&&o.is(":visible")&&[[o[e]().top+i,s]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){n.offsets.push(this[0]),n.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),n=this.options.offset+i-this.$scrollElement.height(),s=this.offsets,o=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),e>=n)return a!=(t=o[o.length-1])&&this.activate(t);if(a&&e<=s[0])return a!=(t=o[0])&&this.activate(t);for(t=s.length;t--;)a!=o[t]&&e>=s[t]&&(!s[t+1]||e<=s[t+1])&&this.activate(o[t])},e.prototype.activate=function(e){this.activeTarget=e,t(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',n=t(i).parents("li").addClass("active");n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate.bs.scrollspy")};var n=t.fn.scrollspy;t.fn.scrollspy=i,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=n,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery),+function(t){"use strict";function e(e,n){return this.each(function(){var s=t(this),o=s.data("bs.modal"),a=t.extend({},i.DEFAULTS,s.data(),"object"==typeof e&&e);o||s.data("bs.modal",o=new i(this,a)),"string"==typeof e?o[e](n):a.show&&o.show(n)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.2.0",i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var i=this,n=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.backdrop(function(){var n=t.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(i.$body),i.$element.show().scrollTop(0),n&&i.$element[0].offsetWidth,i.$element.addClass("in").attr("aria-hidden",!1),i.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:e});n?i.$element.find(".modal-dialog").one("bsTransitionEnd",function(){i.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(300):i.$element.trigger("focus").trigger(s)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var i=this,n=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&n;if(this.$backdrop=t('<div class="modal-backdrop '+n+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;s?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(150):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var o=function(){i.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",o).emulateTransitionEnd(150):o()}else e&&e()},i.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},i.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var n=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=n,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var n=t(this),s=n.attr("href"),o=t(n.attr("data-target")||s&&s.replace(/.*(?=#[^\s]+$)/,"")),a=o.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(s)&&s},o.data(),n.data());n.is("a")&&i.preventDefault(),o.one("show.bs.modal",function(t){t.isDefaultPrevented()||o.one("hidden.bs.modal",function(){n.is(":visible")&&n.trigger("focus")})}),e.call(o,a,this)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.tooltip"),o="object"==typeof e&&e;(s||"destroy"!=e)&&(s||n.data("bs.tooltip",s=new i(this,o)),"string"==typeof e&&s[e]())})}var i=function(t,e){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",t,e)};i.VERSION="3.2.0",i.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},i.prototype.init=function(e,i,n){this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(n),this.$viewport=this.options.viewport&&t(this.options.viewport.selector||this.options.viewport);for(var s=this.options.trigger.split(" "),o=s.length;o--;){var a=s[o];if("click"==a)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=a){var r="hover"==a?"mouseenter":"focusin",l="hover"==a?"mouseleave":"focusout";this.$element.on(r+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},i.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,n){i[t]!=n&&(e[t]=n)}),e},i.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="in",i.options.delay&&i.options.delay.show?void(i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)):i.show()},i.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),clearTimeout(i.timeout),i.hoverState="out",i.options.delay&&i.options.delay.hide?void(i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)):i.hide()},i.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var i=t.contains(document.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!i)return;var n=this,s=this.tip(),o=this.getUID(this.type);this.setContent(),s.attr("id",o),this.$element.attr("aria-describedby",o),this.options.animation&&s.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,r=/\s?auto?\s?/i,l=r.test(a);l&&(a=a.replace(r,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element);var h=this.getPosition(),u=s[0].offsetWidth,c=s[0].offsetHeight;if(l){var d=a,p=this.$element.parent(),f=this.getPosition(p);a="bottom"==a&&h.top+h.height+c-f.scroll>f.height?"top":"top"==a&&h.top-f.scroll-c<0?"bottom":"right"==a&&h.right+u>f.width?"left":"left"==a&&h.left-u<f.left?"right":a,s.removeClass(d).addClass(a)}var m=this.getCalculatedOffset(a,h,u,c);this.applyPlacement(m,a);var g=function(){n.$element.trigger("shown.bs."+n.type),n.hoverState=null};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",g).emulateTransitionEnd(150):g()}},i.prototype.applyPlacement=function(e,i){var n=this.tip(),s=n[0].offsetWidth,o=n[0].offsetHeight,a=parseInt(n.css("margin-top"),10),r=parseInt(n.css("margin-left"),10);isNaN(a)&&(a=0),isNaN(r)&&(r=0),e.top=e.top+a,e.left=e.left+r,t.offset.setOffset(n[0],t.extend({using:function(t){n.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),n.addClass("in");var l=n[0].offsetWidth,h=n[0].offsetHeight;"top"==i&&h!=o&&(e.top=e.top+o-h);var u=this.getViewportAdjustedDelta(i,e,l,h);u.left?e.left+=u.left:e.top+=u.top;var c=u.left?2*u.left-s+l:2*u.top-o+h,d=u.left?"left":"top",p=u.left?"offsetWidth":"offsetHeight";n.offset(e),this.replaceArrow(c,n[0][p],d)},i.prototype.replaceArrow=function(t,e,i){this.arrow().css(i,t?50*(1-t/e)+"%":"")},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},i.prototype.hide=function(){function e(){"in"!=i.hoverState&&n.detach(),i.$element.trigger("hidden.bs."+i.type)}var i=this,n=this.tip(),s=t.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(s),s.isDefaultPrevented()?void 0:(n.removeClass("in"),t.support.transition&&this.$tip.hasClass("fade")?n.one("bsTransitionEnd",e).emulateTransitionEnd(150):e(),this.hoverState=null,this)},i.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},i.prototype.hasContent=function(){return this.getTitle()},i.prototype.getPosition=function(e){e=e||this.$element;var i=e[0],n="BODY"==i.tagName;return t.extend({},"function"==typeof i.getBoundingClientRect?i.getBoundingClientRect():null,{scroll:n?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop(),width:n?t(window).width():e.outerWidth(),height:n?t(window).height():e.outerHeight()},n?{top:0,left:0}:e.offset())},i.prototype.getCalculatedOffset=function(t,e,i,n){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-n,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-n/2,left:e.left-i}:{top:e.top+e.height/2-n/2,left:e.left+e.width}},i.prototype.getViewportAdjustedDelta=function(t,e,i,n){var s={top:0,left:0};if(!this.$viewport)return s;var o=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-o-a.scroll,l=e.top+o-a.scroll+n;r<a.top?s.top=a.top-r:l>a.top+a.height&&(s.top=a.top+a.height-l)}else{var h=e.left-o,u=e.left+o+i;h<a.left?s.left=a.left-h:u>a.width&&(s.left=a.left+a.width-u)}return s},i.prototype.getTitle=function(){var t,e=this.$element,i=this.options;return t=e.attr("data-original-title")||("function"==typeof i.title?i.title.call(e[0]):i.title)},i.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},i.prototype.tip=function(){return this.$tip=this.$tip||t(this.options.template)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},i.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},i.prototype.enable=function(){this.enabled=!0},i.prototype.disable=function(){this.enabled=!1},i.prototype.toggleEnabled=function(){this.enabled=!this.enabled},i.prototype.toggle=function(e){var i=this;e&&(i=t(e.currentTarget).data("bs."+this.type),i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i))),i.tip().hasClass("in")?i.leave(i):i.enter(i)},i.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var n=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=i,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=n,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),s=n.data("bs.popover"),o="object"==typeof e&&e;(s||"destroy"!=e)&&(s||n.data("bs.popover",s=new i(this,o)),"string"==typeof e&&s[e]())})}var i=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");i.VERSION="3.2.0",i.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),i.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),i.prototype.constructor=i,i.prototype.getDefaults=function(){return i.DEFAULTS},i.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").empty()[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},i.prototype.hasContent=function(){return this.getTitle()||this.getContent()},i.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},i.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},i.prototype.tip=function(){return this.$tip||(this.$tip=t(this.options.template)),this.$tip};var n=t.fn.popover;t.fn.popover=e,t.fn.popover.Constructor=i,t.fn.popover.noConflict=function(){return t.fn.popover=n,this}}(jQuery),function(){}.call(this),function(){}.call(this),function(){}.call(this),function(t,e,i){var n=function(){for(var t=/audio(.min)?.js.*/,e=document.getElementsByTagName("script"),i=0,n=e.length;n>i;i++){var s=e[i].getAttribute("src");if(t.test(s))return s.replace(t,"")}}();i[t]={instanceCount:0,instances:{},flashSource:'      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;">         <param name="movie" value="$2?playerInstance='+t+'.instances[\'$1\']&datetime=$3">         <param name="allowscriptaccess" value="always">         <embed name="$1" src="$2?playerInstance='+t+'.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always">       </object>',settings:{autoplay:!1,loop:!1,preload:!0,imageLocation:n+"player-graphics.gif",swfLocation:n+"audiojs.swf",useFlash:function(){var t=document.createElement("audio");return!(t.canPlayType&&t.canPlayType("audio/mpeg;").replace(/no/,""))}(),hasFlash:function(){if(navigator.plugins&&navigator.plugins.length&&navigator.plugins["Shockwave Flash"])return!0;if(navigator.mimeTypes&&navigator.mimeTypes.length){var t=navigator.mimeTypes["application/x-shockwave-flash"];return t&&t.enabledPlugin}try{return new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),!0}catch(e){}return!1}(),createPlayer:{markup:'          <div class="play-pause">             <p class="play"></p>             <p class="pause"></p>             <p class="loading"></p>             <p class="error"></p>           </div>           <div class="scrubber">             <div class="progress"></div>             <div class="loaded"></div>           </div>           <div class="time">             <em class="played">00:00</em>/<strong class="duration">00:00</strong>           </div>           <div class="error-message"></div>',playPauseClass:"play-pause",scrubberClass:"scrubber",progressClass:"progress",loaderClass:"loaded",timeClass:"time",durationClass:"duration",playedClass:"played",errorMessageClass:"error-message",playingClass:"playing",loadingClass:"loading",errorClass:"error"},css:'        .audiojs audio { position: absolute; left: -1px; }         .audiojs { width: 460px; height: 36px; background: #404040; overflow: hidden; font-family: monospace; font-size: 12px;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(0.5, #555), color-stop(0.51, #444), color-stop(1, #444));           background-image: -moz-linear-gradient(center top, #444 0%, #555 50%, #444 51%, #444 100%);           -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);           -o-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); }         .audiojs .play-pause { width: 25px; height: 40px; padding: 4px 6px; margin: 0px; float: left; overflow: hidden; border-right: 1px solid #000; }         .audiojs p { display: none; width: 25px; height: 40px; margin: 0px; cursor: pointer; }         .audiojs .play { display: block; }         .audiojs .scrubber { position: relative; float: left; width: 280px; background: #5a5a5a; height: 14px; margin: 10px; border-top: 1px solid #3f3f3f; border-left: 0px; border-bottom: 0px; overflow: hidden; }         .audiojs .progress { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #ccc; z-index: 1;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc));           background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%); }         .audiojs .loaded { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #000;           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222));           background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); }         .audiojs .time { float: left; height: 36px; line-height: 36px; margin: 0px 0px 0px 6px; padding: 0px 6px 0px 12px; border-left: 1px solid #000; color: #ddd; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5); }         .audiojs .time em { padding: 0px 2px 0px 0px; color: #f9f9f9; font-style: normal; }         .audiojs .time strong { padding: 0px 0px 0px 2px; font-weight: normal; }         .audiojs .error-message { float: left; display: none; margin: 0px 10px; height: 36px; width: 400px; overflow: hidden; line-height: 36px; white-space: nowrap; color: #fff;           text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; }         .audiojs .error-message a { color: #eee; text-decoration: none; padding-bottom: 1px; border-bottom: 1px solid #999; white-space: wrap; }                 .audiojs .play { background: url("$1") -2px -1px no-repeat; }         .audiojs .loading { background: url("$1") -2px -31px no-repeat; }         .audiojs .error { background: url("$1") -2px -61px no-repeat; }         .audiojs .pause { background: url("$1") -2px -91px no-repeat; }                 .playing .play, .playing .loading, .playing .error { display: none; }         .playing .pause { display: block; }                 .loading .play, .loading .pause, .loading .error { display: none; }         .loading .loading { display: block; }                 .error .time, .error .play, .error .pause, .error .scrubber, .error .loading { display: none; }         .error .error { display: block; }         .error .play-pause p { cursor: auto; }         .error .error-message { display: block; }',trackEnded:function(){},flashError:function(){var e=this.settings.createPlayer,n=s(e.errorMessageClass,this.wrapper),o='Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';this.mp3&&(o+=' <a href="'+this.mp3+'">Download audio file</a>.'),i[t].helpers.removeClass(this.wrapper,e.loadingClass),i[t].helpers.addClass(this.wrapper,e.errorClass),n.innerHTML=o},loadError:function(){var e=this.settings.createPlayer,n=s(e.errorMessageClass,this.wrapper);i[t].helpers.removeClass(this.wrapper,e.loadingClass),i[t].helpers.addClass(this.wrapper,e.errorClass),n.innerHTML='Error loading: "'+this.mp3+'"'},init:function(){i[t].helpers.addClass(this.wrapper,this.settings.createPlayer.loadingClass)},loadStarted:function(){var e=this.settings.createPlayer,n=s(e.durationClass,this.wrapper),o=Math.floor(this.duration/60),a=Math.floor(this.duration%60);i[t].helpers.removeClass(this.wrapper,e.loadingClass),n.innerHTML=(10>o?"0":"")+o+":"+(10>a?"0":"")+a},loadProgress:function(t){var e=this.settings.createPlayer,i=s(e.scrubberClass,this.wrapper);s(e.loaderClass,this.wrapper).style.width=i.offsetWidth*t+"px"},playPause:function(){this.playing?this.settings.play():this.settings.pause()},play:function(){i[t].helpers.addClass(this.wrapper,this.settings.createPlayer.playingClass)},pause:function(){i[t].helpers.removeClass(this.wrapper,this.settings.createPlayer.playingClass)},updatePlayhead:function(t){var e=this.settings.createPlayer,i=s(e.scrubberClass,this.wrapper);s(e.progressClass,this.wrapper).style.width=i.offsetWidth*t+"px",e=s(e.playedClass,this.wrapper),i=this.duration*t,t=Math.floor(i/60),i=Math.floor(i%60),e.innerHTML=(10>t?"0":"")+t+":"+(10>i?"0":"")+i}},create:function(t,e){return e=e||{},t.length?this.createAll(e,t):this.newInstance(t,e)},createAll:function(t,e){var i=e||document.getElementsByTagName("audio"),n=[];t=t||{};for(var s=0,o=i.length;o>s;s++)n.push(this.newInstance(i[s],t));return n},newInstance:function(t,n){var s=this.helpers.clone(this.settings),o="audiojs"+this.instanceCount,a="audiojs_wrapper"+this.instanceCount;return this.instanceCount++,null!=t.getAttribute("autoplay")&&(s.autoplay=!0),null!=t.getAttribute("loop")&&(s.loop=!0),"none"==t.getAttribute("preload")&&(s.preload=!1),n&&this.helpers.merge(s,n),s.createPlayer.markup?t=this.createPlayer(t,s.createPlayer,a):t.parentNode.setAttribute("id",a),a=new i[e](t,s),s.css&&this.helpers.injectCss(a,s.css),s.useFlash&&s.hasFlash?(this.injectFlash(a,o),this.attachFlashEvents(a.wrapper,a)):s.useFlash&&!s.hasFlash&&this.settings.flashError.apply(a),(!s.useFlash||s.useFlash&&s.hasFlash)&&this.attachEvents(a.wrapper,a),this.instances[o]=a},createPlayer:function(t,e,i){var n=document.createElement("div"),s=t.cloneNode(!0);return n.setAttribute("class","audiojs"),n.setAttribute("className","audiojs"),n.setAttribute("id",i),s.outerHTML&&!document.createElement("audio").canPlayType?(s=this.helpers.cloneHtml5Node(t),n.innerHTML=e.markup,n.appendChild(s),t.outerHTML=n.outerHTML,n=document.getElementById(i)):(n.appendChild(s),n.innerHTML+=e.markup,t.parentNode.replaceChild(n,t)),n.getElementsByTagName("audio")[0]},attachEvents:function(e,n){if(n.settings.createPlayer){var o=n.settings.createPlayer,a=s(o.playPauseClass,e),r=s(o.scrubberClass,e);i[t].events.addListener(a,"click",function(){n.playPause.apply(n)}),i[t].events.addListener(r,"click",function(t){t=t.clientX;var e=this,i=0;if(e.offsetParent)do i+=e.offsetLeft;while(e=e.offsetParent);n.skipTo((t-i)/r.offsetWidth)}),n.settings.useFlash||(i[t].events.trackLoadProgress(n),i[t].events.addListener(n.element,"timeupdate",function(){n.updatePlayhead.apply(n)}),i[t].events.addListener(n.element,"ended",function(){n.trackEnded.apply(n)}),i[t].events.addListener(n.source,"error",function(){clearInterval(n.readyTimer),clearInterval(n.loadTimer),n.settings.loadError.apply(n)}))}},attachFlashEvents:function(t,e){e.swfReady=!1,e.load=function(t){e.mp3=t,e.swfReady&&e.element.load(t)},e.loadProgress=function(t,i){e.loadedPercent=t,e.duration=i,e.settings.loadStarted.apply(e),e.settings.loadProgress.apply(e,[t])},e.skipTo=function(t){t>e.loadedPercent||(e.updatePlayhead.call(e,[t]),e.element.skipTo(t))},e.updatePlayhead=function(t){e.settings.updatePlayhead.apply(e,[t])},e.play=function(){e.settings.preload||(e.settings.preload=!0,e.element.init(e.mp3)),e.playing=!0,e.element.pplay(),e.settings.play.apply(e)},e.pause=function(){e.playing=!1,e.element.ppause(),e.settings.pause.apply(e)},e.setVolume=function(t){e.element.setVolume(t)},e.loadStarted=function(){e.swfReady=!0,e.settings.preload&&e.element.init(e.mp3),e.settings.autoplay&&e.play.apply(e)}},injectFlash:function(t,e){var i=this.flashSource.replace(/\$1/g,e);i=i.replace(/\$2/g,t.settings.swfLocation),i=i.replace(/\$3/g,+new Date+Math.random());var n=t.wrapper.innerHTML,s=document.createElement("div");s.innerHTML=i+n,t.wrapper.innerHTML=s.innerHTML,t.element=this.helpers.getSwf(e)},helpers:{merge:function(t,e){for(attr in e)(t.hasOwnProperty(attr)||e.hasOwnProperty(attr))&&(t[attr]=e[attr])},clone:function(t){if(null==t||"object"!=typeof t)return t;var e,i=new t.constructor;for(e in t)i[e]=arguments.callee(t[e]);return i},addClass:function(t,e){RegExp("(\\s|^)"+e+"(\\s|$)").test(t.className)||(t.className+=" "+e)},removeClass:function(t,e){t.className=t.className.replace(RegExp("(\\s|^)"+e+"(\\s|$)")," ")},injectCss:function(t,e){for(var i="",n=document.getElementsByTagName("style"),s=e.replace(/\$1/g,t.settings.imageLocation),o=0,a=n.length;a>o;o++){var r=n[o].getAttribute("title");if(r&&~r.indexOf("audiojs")){if(a=n[o],a.innerHTML===s)return;i=a.innerHTML;break}}n=document.getElementsByTagName("head")[0],o=n.firstChild,a=document.createElement("style"),n&&(a.setAttribute("type","text/css"),a.setAttribute("title","audiojs"),a.styleSheet?a.styleSheet.cssText=i+s:a.appendChild(document.createTextNode(i+s)),o?n.insertBefore(a,o):n.appendChild(styleElement))},cloneHtml5Node:function(t){var e=document.createDocumentFragment(),i=e.createElement?e:document;return i.createElement("audio"),i=i.createElement("div"),e.appendChild(i),i.innerHTML=t.outerHTML,i.firstChild
},getSwf:function(t){return t=document[t]||window[t],t.length>1?t[t.length-1]:t}},events:{memoryLeaking:!1,listeners:[],addListener:function(e,n,s){e.addEventListener?e.addEventListener(n,s,!1):e.attachEvent&&(this.listeners.push(e),this.memoryLeaking||(window.attachEvent("onunload",function(){if(this.listeners)for(var e=0,n=this.listeners.length;n>e;e++)i[t].events.purge(this.listeners[e])}),this.memoryLeaking=!0),e.attachEvent("on"+n,function(){s.call(e,window.event)}))},trackLoadProgress:function(t){if(t.settings.preload){var e,i;t=t;var n=/(ipod|iphone|ipad)/i.test(navigator.userAgent);e=setInterval(function(){t.element.readyState>-1&&(n||t.init.apply(t)),t.element.readyState>1&&(t.settings.autoplay&&t.play.apply(t),clearInterval(e),i=setInterval(function(){t.loadProgress.apply(t),t.loadedPercent>=1&&clearInterval(i)}))},10),t.readyTimer=e,t.loadTimer=i}},purge:function(t){var e,i=t.attributes;if(i)for(e=0;e<i.length;e+=1)"function"==typeof t[i[e].name]&&(t[i[e].name]=null);if(i=t.childNodes)for(e=0;e<i.length;e+=1)purge(t.childNodes[e])},ready:function(){return function(t){var e=window,i=!1,n=!0,s=e.document,o=s.documentElement,a=s.addEventListener?"addEventListener":"attachEvent",r=s.addEventListener?"removeEventListener":"detachEvent",l=s.addEventListener?"":"on",h=function(n){("readystatechange"!=n.type||"complete"==s.readyState)&&(("load"==n.type?e:s)[r](l+n.type,h,!1),!i&&(i=!0)&&t.call(e,n.type||n))},u=function(){try{o.doScroll("left")}catch(t){return void setTimeout(u,50)}h("poll")};if("complete"==s.readyState)t.call(e,"lazy");else{if(s.createEventObject&&o.doScroll){try{n=!e.frameElement}catch(c){}n&&u()}s[a](l+"DOMContentLoaded",h,!1),s[a](l+"readystatechange",h,!1),e[a](l+"load",h,!1)}}}()}},i[e]=function(t,e){this.element=t,this.wrapper=t.parentNode,this.source=t.getElementsByTagName("source")[0]||t,this.mp3=function(t){var e=t.getElementsByTagName("source")[0];return t.getAttribute("src")||(e?e.getAttribute("src"):null)}(t),this.settings=e,this.loadStartedCalled=!1,this.loadedPercent=0,this.duration=1,this.playing=!1},i[e].prototype={updatePlayhead:function(){this.settings.updatePlayhead.apply(this,[this.element.currentTime/this.duration])},skipTo:function(t){t>this.loadedPercent||(this.element.currentTime=this.duration*t,this.updatePlayhead())},load:function(e){this.loadStartedCalled=!1,this.source.setAttribute("src",e),this.element.load(),this.mp3=e,i[t].events.trackLoadProgress(this)},loadError:function(){this.settings.loadError.apply(this)},init:function(){this.settings.init.apply(this)},loadStarted:function(){return this.element.duration?(this.duration=this.element.duration,this.updatePlayhead(),void this.settings.loadStarted.apply(this)):!1},loadProgress:function(){null!=this.element.buffered&&this.element.buffered.length&&(this.loadStartedCalled||(this.loadStartedCalled=this.loadStarted()),this.loadedPercent=this.element.buffered.end(this.element.buffered.length-1)/this.duration,this.settings.loadProgress.apply(this,[this.loadedPercent]))},playPause:function(){this.playing?this.pause():this.play()},play:function(){/(ipod|iphone|ipad)/i.test(navigator.userAgent)&&0==this.element.readyState&&this.init.apply(this),this.settings.preload||(this.settings.preload=!0,this.element.setAttribute("preload","auto"),i[t].events.trackLoadProgress(this)),this.playing=!0,this.element.play(),this.settings.play.apply(this)},pause:function(){this.playing=!1,this.element.pause(),this.settings.pause.apply(this)},setVolume:function(t){this.element.volume=t},trackEnded:function(){this.skipTo.apply(this,[0]),this.settings.loop||this.pause.apply(this),this.settings.trackEnded.apply(this)}};var s=function(t,e){var i=[];if(e=e||document,e.getElementsByClassName)i=e.getElementsByClassName(t);else{var n,s,o=e.getElementsByTagName("*"),a=RegExp("(^|\\s)"+t+"(\\s|$)");for(n=0,s=o.length;s>n;n++)a.test(o[n].className)&&i.push(o[n])}return i.length>1?i:i[0]}}("audiojs","audiojsInstance",this),!function(t){function e(){return new Date(Date.UTC.apply(Date,arguments))}var i=function(e,i){var o=this;this.element=t(e),this.container=i.container||"body",this.language=i.language||this.element.data("date-language")||"en",this.language=this.language in n?this.language:"en",this.isRTL=n[this.language].rtl||!1,this.formatType=i.formatType||this.element.data("format-type")||"standard",this.format=s.parseFormat(i.format||this.element.data("date-format")||n[this.language].format||s.getDefaultFormat(this.formatType,"input"),this.formatType),this.isInline=!1,this.isVisible=!1,this.isInput=this.element.is("input"),this.fontAwesome=i.fontAwesome||this.element.data("font-awesome")||!1,this.bootcssVer=i.bootcssVer||(this.isInput?this.element.is(".form-control")?3:2:this.bootcssVer=this.element.is(".input-group")?3:2),this.component=this.element.is(".date")?3==this.bootcssVer?this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar, .input-group-addon .glyphicon-calendar .fa-calendar .fa-clock-o").parent():this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar .fa-calendar .fa-clock-o").parent():!1,this.componentReset=this.element.is(".date")?3==this.bootcssVer?this.element.find(".input-group-addon .glyphicon-remove .fa-times").parent():this.element.find(".add-on .icon-remove .fa-times").parent():!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&0===this.component.length&&(this.component=!1),this.linkField=i.linkField||this.element.data("link-field")||!1,this.linkFormat=s.parseFormat(i.linkFormat||this.element.data("link-format")||s.getDefaultFormat(this.formatType,"link"),this.formatType),this.minuteStep=i.minuteStep||this.element.data("minute-step")||5,this.pickerPosition=i.pickerPosition||this.element.data("picker-position")||"bottom-right",this.showMeridian=i.showMeridian||this.element.data("show-meridian")||!1,this.initialDate=i.initialDate||new Date,this.icons={leftArrow:this.fontAwesome?"fa-arrow-left":3===this.bootcssVer?"glyphicon-arrow-left":"icon-arrow-left",rightArrow:this.fontAwesome?"fa-arrow-right":3===this.bootcssVer?"glyphicon-arrow-right":"icon-arrow-right"},this.icontype=this.fontAwesome?"fa":"glyphicon",this._attachEvents(),this.formatViewType="datetime","formatViewType"in i?this.formatViewType=i.formatViewType:"formatViewType"in this.element.data()&&(this.formatViewType=this.element.data("formatViewType")),this.minView=0,"minView"in i?this.minView=i.minView:"minView"in this.element.data()&&(this.minView=this.element.data("min-view")),this.minView=s.convertViewMode(this.minView),this.maxView=s.modes.length-1,"maxView"in i?this.maxView=i.maxView:"maxView"in this.element.data()&&(this.maxView=this.element.data("max-view")),this.maxView=s.convertViewMode(this.maxView),this.wheelViewModeNavigation=!1,"wheelViewModeNavigation"in i?this.wheelViewModeNavigation=i.wheelViewModeNavigation:"wheelViewModeNavigation"in this.element.data()&&(this.wheelViewModeNavigation=this.element.data("view-mode-wheel-navigation")),this.wheelViewModeNavigationInverseDirection=!1,"wheelViewModeNavigationInverseDirection"in i?this.wheelViewModeNavigationInverseDirection=i.wheelViewModeNavigationInverseDirection:"wheelViewModeNavigationInverseDirection"in this.element.data()&&(this.wheelViewModeNavigationInverseDirection=this.element.data("view-mode-wheel-navigation-inverse-dir")),this.wheelViewModeNavigationDelay=100,"wheelViewModeNavigationDelay"in i?this.wheelViewModeNavigationDelay=i.wheelViewModeNavigationDelay:"wheelViewModeNavigationDelay"in this.element.data()&&(this.wheelViewModeNavigationDelay=this.element.data("view-mode-wheel-navigation-delay")),this.startViewMode=2,"startView"in i?this.startViewMode=i.startView:"startView"in this.element.data()&&(this.startViewMode=this.element.data("start-view")),this.startViewMode=s.convertViewMode(this.startViewMode),this.viewMode=this.startViewMode,this.viewSelect=this.minView,"viewSelect"in i?this.viewSelect=i.viewSelect:"viewSelect"in this.element.data()&&(this.viewSelect=this.element.data("view-select")),this.viewSelect=s.convertViewMode(this.viewSelect),this.forceParse=!0,"forceParse"in i?this.forceParse=i.forceParse:"dateForceParse"in this.element.data()&&(this.forceParse=this.element.data("date-force-parse"));for(var a=3===this.bootcssVer?s.templateV3:s.template;-1!==a.indexOf("{iconType}");)a=a.replace("{iconType}",this.icontype);for(;-1!==a.indexOf("{leftArrow}");)a=a.replace("{leftArrow}",this.icons.leftArrow);for(;-1!==a.indexOf("{rightArrow}");)a=a.replace("{rightArrow}",this.icons.rightArrow);if(this.picker=t(a).appendTo(this.isInline?this.element:this.container).on({click:t.proxy(this.click,this),mousedown:t.proxy(this.mousedown,this)}),this.wheelViewModeNavigation&&(t.fn.mousewheel?this.picker.on({mousewheel:t.proxy(this.mousewheel,this)}):console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")),this.picker.addClass(this.isInline?"datetimepicker-inline":"datetimepicker-dropdown-"+this.pickerPosition+" dropdown-menu"),this.isRTL){this.picker.addClass("datetimepicker-rtl");var r=3===this.bootcssVer?".prev span, .next span":".prev i, .next i";this.picker.find(r).toggleClass(this.icons.leftArrow+" "+this.icons.rightArrow)}t(document).on("mousedown",function(e){0===t(e.target).closest(".datetimepicker").length&&o.hide()}),this.autoclose=!1,"autoclose"in i?this.autoclose=i.autoclose:"dateAutoclose"in this.element.data()&&(this.autoclose=this.element.data("date-autoclose")),this.keyboardNavigation=!0,"keyboardNavigation"in i?this.keyboardNavigation=i.keyboardNavigation:"dateKeyboardNavigation"in this.element.data()&&(this.keyboardNavigation=this.element.data("date-keyboard-navigation")),this.todayBtn=i.todayBtn||this.element.data("date-today-btn")||!1,this.todayHighlight=i.todayHighlight||this.element.data("date-today-highlight")||!1,this.weekStart=(i.weekStart||this.element.data("date-weekstart")||n[this.language].weekStart||0)%7,this.weekEnd=(this.weekStart+6)%7,this.startDate=-1/0,this.endDate=1/0,this.daysOfWeekDisabled=[],this.setStartDate(i.startDate||this.element.data("date-startdate")),this.setEndDate(i.endDate||this.element.data("date-enddate")),this.setDaysOfWeekDisabled(i.daysOfWeekDisabled||this.element.data("date-days-of-week-disabled")),this.setMinutesDisabled(i.minutesDisabled||this.element.data("date-minute-disabled")),this.setHoursDisabled(i.hoursDisabled||this.element.data("date-hour-disabled")),this.fillDow(),this.fillMonths(),this.update(),this.showMode(),this.isInline&&this.show()};i.prototype={constructor:i,_events:[],_attachEvents:function(){this._detachEvents(),this.isInput?this._events=[[this.element,{focus:t.proxy(this.show,this),keyup:t.proxy(this.update,this),keydown:t.proxy(this.keydown,this)}]]:this.component&&this.hasInput?(this._events=[[this.element.find("input"),{focus:t.proxy(this.show,this),keyup:t.proxy(this.update,this),keydown:t.proxy(this.keydown,this)}],[this.component,{click:t.proxy(this.show,this)}]],this.componentReset&&this._events.push([this.componentReset,{click:t.proxy(this.reset,this)}])):this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:t.proxy(this.show,this)}]];for(var e,i,n=0;n<this._events.length;n++)e=this._events[n][0],i=this._events[n][1],e.on(i)},_detachEvents:function(){for(var t,e,i=0;i<this._events.length;i++)t=this._events[i][0],e=this._events[i][1],t.off(e);this._events=[]},show:function(e){this.picker.show(),this.height=this.component?this.component.outerHeight():this.element.outerHeight(),this.forceParse&&this.update(),this.place(),t(window).on("resize",t.proxy(this.place,this)),e&&(e.stopPropagation(),e.preventDefault()),this.isVisible=!0,this.element.trigger({type:"show",date:this.date})},hide:function(){this.isVisible&&(this.isInline||(this.picker.hide(),t(window).off("resize",this.place),this.viewMode=this.startViewMode,this.showMode(),this.isInput||t(document).off("mousedown",this.hide),this.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this.isVisible=!1,this.element.trigger({type:"hide",date:this.date})))},remove:function(){this._detachEvents(),this.picker.remove(),delete this.picker,delete this.element.data().datetimepicker},getDate:function(){var t=this.getUTCDate();return new Date(t.getTime()+6e4*t.getTimezoneOffset())},getUTCDate:function(){return this.date},setDate:function(t){this.setUTCDate(new Date(t.getTime()-6e4*t.getTimezoneOffset()))},setUTCDate:function(t){t>=this.startDate&&t<=this.endDate?(this.date=t,this.setValue(),this.viewDate=this.date,this.fill()):this.element.trigger({type:"outOfRange",date:t,startDate:this.startDate,endDate:this.endDate})},setFormat:function(t){this.format=s.parseFormat(t,this.formatType);var e;this.isInput?e=this.element:this.component&&(e=this.element.find("input")),e&&e.val()&&this.setValue()},setValue:function(){var e=this.getFormattedDate();this.isInput?this.element.val(e):(this.component&&this.element.find("input").val(e),this.element.data("date",e)),this.linkField&&t("#"+this.linkField).val(this.getFormattedDate(this.linkFormat))},getFormattedDate:function(t){return void 0==t&&(t=this.format),s.formatDate(this.date,t,this.language,this.formatType)},setStartDate:function(t){this.startDate=t||-1/0,this.startDate!==-1/0&&(this.startDate=s.parseDate(this.startDate,this.format,this.language,this.formatType)),this.update(),this.updateNavArrows()},setEndDate:function(t){this.endDate=t||1/0,1/0!==this.endDate&&(this.endDate=s.parseDate(this.endDate,this.format,this.language,this.formatType)),this.update(),this.updateNavArrows()},setDaysOfWeekDisabled:function(e){this.daysOfWeekDisabled=e||[],t.isArray(this.daysOfWeekDisabled)||(this.daysOfWeekDisabled=this.daysOfWeekDisabled.split(/,\s*/)),this.daysOfWeekDisabled=t.map(this.daysOfWeekDisabled,function(t){return parseInt(t,10)}),this.update(),this.updateNavArrows()},setMinutesDisabled:function(e){this.minutesDisabled=e||[],t.isArray(this.minutesDisabled)||(this.minutesDisabled=this.minutesDisabled.split(/,\s*/)),this.minutesDisabled=t.map(this.minutesDisabled,function(t){return parseInt(t,10)}),this.update(),this.updateNavArrows()},setHoursDisabled:function(e){this.hoursDisabled=e||[],t.isArray(this.hoursDisabled)||(this.hoursDisabled=this.hoursDisabled.split(/,\s*/)),this.hoursDisabled=t.map(this.hoursDisabled,function(t){return parseInt(t,10)}),this.update(),this.updateNavArrows()},place:function(){if(!this.isInline){var e=0;t("div").each(function(){var i=parseInt(t(this).css("zIndex"),10);i>e&&(e=i)});var i,n,s,o,a=e+10;o=this.container instanceof t?this.container.offset():t(this.container).offset(),this.component?(i=this.component.offset(),s=i.left,("bottom-left"==this.pickerPosition||"top-left"==this.pickerPosition)&&(s+=this.component.outerWidth()-this.picker.outerWidth())):(i=this.element.offset(),s=i.left),s+220>document.body.clientWidth&&(s=document.body.clientWidth-220),n="top-left"==this.pickerPosition||"top-right"==this.pickerPosition?i.top-this.picker.outerHeight():i.top+this.height,n-=o.top,s-=o.left,this.picker.css({top:n,left:s,zIndex:a})}},update:function(){var t,e=!1;arguments&&arguments.length&&("string"==typeof arguments[0]||arguments[0]instanceof Date)?(t=arguments[0],e=!0):(t=(this.isInput?this.element.val():this.element.find("input").val())||this.element.data("date")||this.initialDate,("string"==typeof t||t instanceof String)&&(t=t.replace(/^\s+|\s+$/g,""))),t||(t=new Date,e=!1),this.date=s.parseDate(t,this.format,this.language,this.formatType),e&&this.setValue(),this.viewDate=new Date(this.date<this.startDate?this.startDate:this.date>this.endDate?this.endDate:this.date),this.fill()},fillDow:function(){for(var t=this.weekStart,e="<tr>";t<this.weekStart+7;)e+='<th class="dow">'+n[this.language].daysMin[t++%7]+"</th>";e+="</tr>",this.picker.find(".datetimepicker-days thead").append(e)},fillMonths:function(){for(var t="",e=0;12>e;)t+='<span class="month">'+n[this.language].monthsShort[e++]+"</span>";this.picker.find(".datetimepicker-months td").html(t)},fill:function(){if(null!=this.date&&null!=this.viewDate){var i=new Date(this.viewDate),o=i.getUTCFullYear(),a=i.getUTCMonth(),r=i.getUTCDate(),l=i.getUTCHours(),h=i.getUTCMinutes(),u=this.startDate!==-1/0?this.startDate.getUTCFullYear():-1/0,c=this.startDate!==-1/0?this.startDate.getUTCMonth()+1:-1/0,d=1/0!==this.endDate?this.endDate.getUTCFullYear():1/0,p=1/0!==this.endDate?this.endDate.getUTCMonth()+1:1/0,f=new e(this.date.getUTCFullYear(),this.date.getUTCMonth(),this.date.getUTCDate()).valueOf(),m=new Date;if(this.picker.find(".datetimepicker-days thead th:eq(1)").text(n[this.language].months[a]+" "+o),"time"==this.formatViewType){var g=this.getFormattedDate();this.picker.find(".datetimepicker-hours thead th:eq(1)").text(g),this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(g)}else this.picker.find(".datetimepicker-hours thead th:eq(1)").text(r+" "+n[this.language].months[a]+" "+o),this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(r+" "+n[this.language].months[a]+" "+o);this.picker.find("tfoot th.today").text(n[this.language].today).toggle(this.todayBtn!==!1),this.updateNavArrows(),this.fillMonths();var v=e(o,a-1,28,0,0,0,0),y=s.getDaysInMonth(v.getUTCFullYear(),v.getUTCMonth());v.setUTCDate(y),v.setUTCDate(y-(v.getUTCDay()-this.weekStart+7)%7);var b=new Date(v);b.setUTCDate(b.getUTCDate()+42),b=b.valueOf();for(var _,w=[];v.valueOf()<b;)v.getUTCDay()==this.weekStart&&w.push("<tr>"),_="",v.getUTCFullYear()<o||v.getUTCFullYear()==o&&v.getUTCMonth()<a?_+=" old":(v.getUTCFullYear()>o||v.getUTCFullYear()==o&&v.getUTCMonth()>a)&&(_+=" new"),this.todayHighlight&&v.getUTCFullYear()==m.getFullYear()&&v.getUTCMonth()==m.getMonth()&&v.getUTCDate()==m.getDate()&&(_+=" today"),v.valueOf()==f&&(_+=" active"),(v.valueOf()+864e5<=this.startDate||v.valueOf()>this.endDate||-1!==t.inArray(v.getUTCDay(),this.daysOfWeekDisabled))&&(_+=" disabled"),w.push('<td class="day'+_+'">'+v.getUTCDate()+"</td>"),v.getUTCDay()==this.weekEnd&&w.push("</tr>"),v.setUTCDate(v.getUTCDate()+1);this.picker.find(".datetimepicker-days tbody").empty().append(w.join("")),w=[];for(var x="",C="",k="",D=this.hoursDisabled||[],T=0;24>T;T++)if(-1===D.indexOf(T)){var S=e(o,a,r,T);_="",S.valueOf()+36e5<=this.startDate||S.valueOf()>this.endDate?_+=" disabled":l==T&&(_+=" active"),this.showMeridian&&2==n[this.language].meridiem.length?(C=12>T?n[this.language].meridiem[0]:n[this.language].meridiem[1],C!=k&&(""!=k&&w.push("</fieldset>"),w.push('<fieldset class="hour"><legend>'+C.toUpperCase()+"</legend>")),k=C,x=T%12?T%12:12,w.push('<span class="hour'+_+" hour_"+(12>T?"am":"pm")+'">'+x+"</span>"),23==T&&w.push("</fieldset>")):(x=T+":00",w.push('<span class="hour'+_+'">'+x+"</span>"))}this.picker.find(".datetimepicker-hours td").html(w.join("")),w=[],x="",C="",k="";for(var E=this.minutesDisabled||[],T=0;60>T;T+=this.minuteStep)if(-1===E.indexOf(T)){var S=e(o,a,r,l,T,0);_="",S.valueOf()<this.startDate||S.valueOf()>this.endDate?_+=" disabled":Math.floor(h/this.minuteStep)==Math.floor(T/this.minuteStep)&&(_+=" active"),this.showMeridian&&2==n[this.language].meridiem.length?(C=12>l?n[this.language].meridiem[0]:n[this.language].meridiem[1],C!=k&&(""!=k&&w.push("</fieldset>"),w.push('<fieldset class="minute"><legend>'+C.toUpperCase()+"</legend>")),k=C,x=l%12?l%12:12,w.push('<span class="minute'+_+'">'+x+":"+(10>T?"0"+T:T)+"</span>"),59==T&&w.push("</fieldset>")):(x=T+":00",w.push('<span class="minute'+_+'">'+l+":"+(10>T?"0"+T:T)+"</span>"))}this.picker.find(".datetimepicker-minutes td").html(w.join(""));var M=this.date.getUTCFullYear(),I=this.picker.find(".datetimepicker-months").find("th:eq(1)").text(o).end().find("span").removeClass("active");M==o&&I.eq(this.date.getUTCMonth()+2).addClass("active"),(u>o||o>d)&&I.addClass("disabled"),o==u&&I.slice(0,c+1).addClass("disabled"),o==d&&I.slice(p).addClass("disabled"),w="",o=10*parseInt(o/10,10);var N=this.picker.find(".datetimepicker-years").find("th:eq(1)").text(o+"-"+(o+9)).end().find("td");o-=1;for(var T=-1;11>T;T++)w+='<span class="year'+(-1==T||10==T?" old":"")+(M==o?" active":"")+(u>o||o>d?" disabled":"")+'">'+o+"</span>",o+=1;N.html(w),this.place()}},updateNavArrows:function(){var t=new Date(this.viewDate),e=t.getUTCFullYear(),i=t.getUTCMonth(),n=t.getUTCDate(),s=t.getUTCHours();switch(this.viewMode){case 0:this.picker.find(".prev").css(this.startDate!==-1/0&&e<=this.startDate.getUTCFullYear()&&i<=this.startDate.getUTCMonth()&&n<=this.startDate.getUTCDate()&&s<=this.startDate.getUTCHours()?{visibility:"hidden"}:{visibility:"visible"}),this.picker.find(".next").css(1/0!==this.endDate&&e>=this.endDate.getUTCFullYear()&&i>=this.endDate.getUTCMonth()&&n>=this.endDate.getUTCDate()&&s>=this.endDate.getUTCHours()?{visibility:"hidden"}:{visibility:"visible"});break;case 1:this.picker.find(".prev").css(this.startDate!==-1/0&&e<=this.startDate.getUTCFullYear()&&i<=this.startDate.getUTCMonth()&&n<=this.startDate.getUTCDate()?{visibility:"hidden"}:{visibility:"visible"}),this.picker.find(".next").css(1/0!==this.endDate&&e>=this.endDate.getUTCFullYear()&&i>=this.endDate.getUTCMonth()&&n>=this.endDate.getUTCDate()?{visibility:"hidden"}:{visibility:"visible"});break;case 2:this.picker.find(".prev").css(this.startDate!==-1/0&&e<=this.startDate.getUTCFullYear()&&i<=this.startDate.getUTCMonth()?{visibility:"hidden"}:{visibility:"visible"}),this.picker.find(".next").css(1/0!==this.endDate&&e>=this.endDate.getUTCFullYear()&&i>=this.endDate.getUTCMonth()?{visibility:"hidden"}:{visibility:"visible"});break;case 3:case 4:this.picker.find(".prev").css(this.startDate!==-1/0&&e<=this.startDate.getUTCFullYear()?{visibility:"hidden"}:{visibility:"visible"}),this.picker.find(".next").css(1/0!==this.endDate&&e>=this.endDate.getUTCFullYear()?{visibility:"hidden"}:{visibility:"visible"})}},mousewheel:function(e){if(e.preventDefault(),e.stopPropagation(),!this.wheelPause){this.wheelPause=!0;var i=e.originalEvent,n=i.wheelDelta,s=n>0?1:0===n?0:-1;this.wheelViewModeNavigationInverseDirection&&(s=-s),this.showMode(s),setTimeout(t.proxy(function(){this.wheelPause=!1},this),this.wheelViewModeNavigationDelay)}},click:function(i){i.stopPropagation(),i.preventDefault();var n=t(i.target).closest("span, td, th, legend");if(n.is("."+this.icontype)&&(n=t(n).parent().closest("span, td, th, legend")),1==n.length){if(n.is(".disabled"))return void this.element.trigger({type:"outOfRange",date:this.viewDate,startDate:this.startDate,endDate:this.endDate});switch(n[0].nodeName.toLowerCase()){case"th":switch(n[0].className){case"switch":this.showMode(1);break;case"prev":case"next":var o=s.modes[this.viewMode].navStep*("prev"==n[0].className?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveHour(this.viewDate,o);break;case 1:this.viewDate=this.moveDate(this.viewDate,o);break;case 2:this.viewDate=this.moveMonth(this.viewDate,o);break;case 3:case 4:this.viewDate=this.moveYear(this.viewDate,o)}this.fill(),this.element.trigger({type:n[0].className+":"+this.convertViewModeText(this.viewMode),date:this.viewDate,startDate:this.startDate,endDate:this.endDate});break;case"today":var a=new Date;a=e(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),0),a<this.startDate?a=this.startDate:a>this.endDate&&(a=this.endDate),this.viewMode=this.startViewMode,this.showMode(0),this._setDate(a),this.fill(),this.autoclose&&this.hide()}break;case"span":if(!n.is(".disabled")){var r=this.viewDate.getUTCFullYear(),l=this.viewDate.getUTCMonth(),h=this.viewDate.getUTCDate(),u=this.viewDate.getUTCHours(),c=this.viewDate.getUTCMinutes(),d=this.viewDate.getUTCSeconds();if(n.is(".month")?(this.viewDate.setUTCDate(1),l=n.parent().find("span").index(n),h=this.viewDate.getUTCDate(),this.viewDate.setUTCMonth(l),this.element.trigger({type:"changeMonth",date:this.viewDate}),this.viewSelect>=3&&this._setDate(e(r,l,h,u,c,d,0))):n.is(".year")?(this.viewDate.setUTCDate(1),r=parseInt(n.text(),10)||0,this.viewDate.setUTCFullYear(r),this.element.trigger({type:"changeYear",date:this.viewDate}),this.viewSelect>=4&&this._setDate(e(r,l,h,u,c,d,0))):n.is(".hour")?(u=parseInt(n.text(),10)||0,(n.hasClass("hour_am")||n.hasClass("hour_pm"))&&(12==u&&n.hasClass("hour_am")?u=0:12!=u&&n.hasClass("hour_pm")&&(u+=12)),this.viewDate.setUTCHours(u),this.element.trigger({type:"changeHour",date:this.viewDate}),this.viewSelect>=1&&this._setDate(e(r,l,h,u,c,d,0))):n.is(".minute")&&(c=parseInt(n.text().substr(n.text().indexOf(":")+1),10)||0,this.viewDate.setUTCMinutes(c),this.element.trigger({type:"changeMinute",date:this.viewDate}),this.viewSelect>=0&&this._setDate(e(r,l,h,u,c,d,0))),0!=this.viewMode){var p=this.viewMode;this.showMode(-1),this.fill(),p==this.viewMode&&this.autoclose&&this.hide()}else this.fill(),this.autoclose&&this.hide()}break;case"td":if(n.is(".day")&&!n.is(".disabled")){var h=parseInt(n.text(),10)||1,r=this.viewDate.getUTCFullYear(),l=this.viewDate.getUTCMonth(),u=this.viewDate.getUTCHours(),c=this.viewDate.getUTCMinutes(),d=this.viewDate.getUTCSeconds();n.is(".old")?0===l?(l=11,r-=1):l-=1:n.is(".new")&&(11==l?(l=0,r+=1):l+=1),this.viewDate.setUTCFullYear(r),this.viewDate.setUTCMonth(l,h),this.element.trigger({type:"changeDay",date:this.viewDate}),this.viewSelect>=2&&this._setDate(e(r,l,h,u,c,d,0))}var p=this.viewMode;this.showMode(-1),this.fill(),p==this.viewMode&&this.autoclose&&this.hide()}}},_setDate:function(t,e){e&&"date"!=e||(this.date=t),e&&"view"!=e||(this.viewDate=t),this.fill(),this.setValue();var i;this.isInput?i=this.element:this.component&&(i=this.element.find("input")),i&&(i.change(),this.autoclose&&(!e||"date"==e)),this.element.trigger({type:"changeDate",date:this.date})},moveMinute:function(t,e){if(!e)return t;var i=new Date(t.valueOf());return i.setUTCMinutes(i.getUTCMinutes()+e*this.minuteStep),i},moveHour:function(t,e){if(!e)return t;var i=new Date(t.valueOf());return i.setUTCHours(i.getUTCHours()+e),i},moveDate:function(t,e){if(!e)return t;var i=new Date(t.valueOf());return i.setUTCDate(i.getUTCDate()+e),i},moveMonth:function(t,e){if(!e)return t;var i,n,s=new Date(t.valueOf()),o=s.getUTCDate(),a=s.getUTCMonth(),r=Math.abs(e);if(e=e>0?1:-1,1==r)n=-1==e?function(){return s.getUTCMonth()==a}:function(){return s.getUTCMonth()!=i},i=a+e,s.setUTCMonth(i),(0>i||i>11)&&(i=(i+12)%12);else{for(var l=0;r>l;l++)s=this.moveMonth(s,e);i=s.getUTCMonth(),s.setUTCDate(o),n=function(){return i!=s.getUTCMonth()}}for(;n();)s.setUTCDate(--o),s.setUTCMonth(i);return s},moveYear:function(t,e){return this.moveMonth(t,12*e)},dateWithinRange:function(t){return t>=this.startDate&&t<=this.endDate},keydown:function(t){if(this.picker.is(":not(:visible)"))return void(27==t.keyCode&&this.show());var e,i,n,s=!1;switch(t.keyCode){case 27:this.hide(),t.preventDefault();break;case 37:case 39:if(!this.keyboardNavigation)break;e=37==t.keyCode?-1:1,viewMode=this.viewMode,t.ctrlKey?viewMode+=2:t.shiftKey&&(viewMode+=1),4==viewMode?(i=this.moveYear(this.date,e),n=this.moveYear(this.viewDate,e)):3==viewMode?(i=this.moveMonth(this.date,e),n=this.moveMonth(this.viewDate,e)):2==viewMode?(i=this.moveDate(this.date,e),n=this.moveDate(this.viewDate,e)):1==viewMode?(i=this.moveHour(this.date,e),n=this.moveHour(this.viewDate,e)):0==viewMode&&(i=this.moveMinute(this.date,e),n=this.moveMinute(this.viewDate,e)),this.dateWithinRange(i)&&(this.date=i,this.viewDate=n,this.setValue(),this.update(),t.preventDefault(),s=!0);break;case 38:case 40:if(!this.keyboardNavigation)break;e=38==t.keyCode?-1:1,viewMode=this.viewMode,t.ctrlKey?viewMode+=2:t.shiftKey&&(viewMode+=1),4==viewMode?(i=this.moveYear(this.date,e),n=this.moveYear(this.viewDate,e)):3==viewMode?(i=this.moveMonth(this.date,e),n=this.moveMonth(this.viewDate,e)):2==viewMode?(i=this.moveDate(this.date,7*e),n=this.moveDate(this.viewDate,7*e)):1==viewMode?this.showMeridian?(i=this.moveHour(this.date,6*e),n=this.moveHour(this.viewDate,6*e)):(i=this.moveHour(this.date,4*e),n=this.moveHour(this.viewDate,4*e)):0==viewMode&&(i=this.moveMinute(this.date,4*e),n=this.moveMinute(this.viewDate,4*e)),this.dateWithinRange(i)&&(this.date=i,this.viewDate=n,this.setValue(),this.update(),t.preventDefault(),s=!0);break;case 13:if(0!=this.viewMode){var o=this.viewMode;this.showMode(-1),this.fill(),o==this.viewMode&&this.autoclose&&this.hide()}else this.fill(),this.autoclose&&this.hide();t.preventDefault();break;case 9:this.hide()}if(s){var a;this.isInput?a=this.element:this.component&&(a=this.element.find("input")),a&&a.change(),this.element.trigger({type:"changeDate",date:this.date})}},showMode:function(t){if(t){var e=Math.max(0,Math.min(s.modes.length-1,this.viewMode+t));e>=this.minView&&e<=this.maxView&&(this.element.trigger({type:"changeMode",date:this.viewDate,oldViewMode:this.viewMode,newViewMode:e}),this.viewMode=e)}this.picker.find(">div").hide().filter(".datetimepicker-"+s.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()},reset:function(){this._setDate(null,"date")},convertViewModeText:function(t){switch(t){case 4:return"decade";case 3:return"year";case 2:return"month";case 1:return"day";case 0:return"hour"}}},t.fn.datetimepicker=function(e){var n=Array.apply(null,arguments);n.shift();var s;return this.each(function(){var o=t(this),a=o.data("datetimepicker"),r="object"==typeof e&&e;return a||o.data("datetimepicker",a=new i(this,t.extend({},t.fn.datetimepicker.defaults,r))),"string"==typeof e&&"function"==typeof a[e]&&(s=a[e].apply(a,n),void 0!==s)?!1:void 0}),void 0!==s?s:this},t.fn.datetimepicker.defaults={},t.fn.datetimepicker.Constructor=i;var n=t.fn.datetimepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],meridiem:["am","pm"],suffix:["st","nd","rd","th"],today:"Today"}},s={modes:[{clsName:"minutes",navFnc:"Hours",navStep:1},{clsName:"hours",navFnc:"Date",navStep:1},{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(t){return t%4===0&&t%100!==0||t%400===0},getDaysInMonth:function(t,e){return[31,s.isLeapYear(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]},getDefaultFormat:function(t,e){if("standard"==t)return"input"==e?"yyyy-mm-dd hh:ii":"yyyy-mm-dd hh:ii:ss";if("php"==t)return"input"==e?"Y-m-d H:i":"Y-m-d H:i:s";throw new Error("Invalid format type.")},validParts:function(t){if("standard"==t)return/hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;if("php"==t)return/[dDjlNwzFmMnStyYaABgGhHis]/g;throw new Error("Invalid format type.")},nonpunctuation:/[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,parseFormat:function(t,e){var i=t.replace(this.validParts(e),"\x00").split("\x00"),n=t.match(this.validParts(e));if(!i||!i.length||!n||0==n.length)throw new Error("Invalid date format.");return{separators:i,parts:n}},parseDate:function(s,o,a,r){if(s instanceof Date){var l=new Date(s.valueOf()-6e4*s.getTimezoneOffset());return l.setMilliseconds(0),l}if(/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(s)&&(o=this.parseFormat("yyyy-mm-dd",r)),/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(s)&&(o=this.parseFormat("yyyy-mm-dd hh:ii",r)),/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(s)&&(o=this.parseFormat("yyyy-mm-dd hh:ii:ss",r)),/^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(s)){var h,u,c=/([-+]\d+)([dmwy])/,d=s.match(/([-+]\d+)([dmwy])/g);s=new Date;for(var p=0;p<d.length;p++)switch(h=c.exec(d[p]),u=parseInt(h[1]),h[2]){case"d":s.setUTCDate(s.getUTCDate()+u);break;case"m":s=i.prototype.moveMonth.call(i.prototype,s,u);break;case"w":s.setUTCDate(s.getUTCDate()+7*u);break;case"y":s=i.prototype.moveYear.call(i.prototype,s,u)}return e(s.getUTCFullYear(),s.getUTCMonth(),s.getUTCDate(),s.getUTCHours(),s.getUTCMinutes(),s.getUTCSeconds(),0)}var f,m,h,d=s&&s.match(this.nonpunctuation)||[],s=new Date(0,0,0,0,0,0,0),g={},v=["hh","h","ii","i","ss","s","yyyy","yy","M","MM","m","mm","D","DD","d","dd","H","HH","p","P"],y={hh:function(t,e){return t.setUTCHours(e)},h:function(t,e){return t.setUTCHours(e)},HH:function(t,e){return t.setUTCHours(12==e?0:e)},H:function(t,e){return t.setUTCHours(12==e?0:e)},ii:function(t,e){return t.setUTCMinutes(e)},i:function(t,e){return t.setUTCMinutes(e)},ss:function(t,e){return t.setUTCSeconds(e)},s:function(t,e){return t.setUTCSeconds(e)},yyyy:function(t,e){return t.setUTCFullYear(e)},yy:function(t,e){return t.setUTCFullYear(2e3+e)},m:function(t,e){for(e-=1;0>e;)e+=12;
    for(e%=12,t.setUTCMonth(e);t.getUTCMonth()!=e;){if(isNaN(t.getUTCMonth()))return t;t.setUTCDate(t.getUTCDate()-1)}return t},d:function(t,e){return t.setUTCDate(e)},p:function(t,e){return t.setUTCHours(1==e?t.getUTCHours()+12:t.getUTCHours())}};if(y.M=y.MM=y.mm=y.m,y.dd=y.d,y.P=y.p,s=e(s.getFullYear(),s.getMonth(),s.getDate(),s.getHours(),s.getMinutes(),s.getSeconds()),d.length==o.parts.length){for(var p=0,b=o.parts.length;b>p;p++){if(f=parseInt(d[p],10),h=o.parts[p],isNaN(f))switch(h){case"MM":m=t(n[a].months).filter(function(){var t=this.slice(0,d[p].length),e=d[p].slice(0,t.length);return t==e}),f=t.inArray(m[0],n[a].months)+1;break;case"M":m=t(n[a].monthsShort).filter(function(){var t=this.slice(0,d[p].length),e=d[p].slice(0,t.length);return t.toLowerCase()==e.toLowerCase()}),f=t.inArray(m[0],n[a].monthsShort)+1;break;case"p":case"P":f=t.inArray(d[p].toLowerCase(),n[a].meridiem)}g[h]=f}for(var _,p=0;p<v.length;p++)_=v[p],_ in g&&!isNaN(g[_])&&y[_](s,g[_])}return s},formatDate:function(e,i,o,a){if(null==e)return"";var r;if("standard"==a)r={yy:e.getUTCFullYear().toString().substring(2),yyyy:e.getUTCFullYear(),m:e.getUTCMonth()+1,M:n[o].monthsShort[e.getUTCMonth()],MM:n[o].months[e.getUTCMonth()],d:e.getUTCDate(),D:n[o].daysShort[e.getUTCDay()],DD:n[o].days[e.getUTCDay()],p:2==n[o].meridiem.length?n[o].meridiem[e.getUTCHours()<12?0:1]:"",h:e.getUTCHours(),i:e.getUTCMinutes(),s:e.getUTCSeconds()},r.H=2==n[o].meridiem.length?r.h%12==0?12:r.h%12:r.h,r.HH=(r.H<10?"0":"")+r.H,r.P=r.p.toUpperCase(),r.hh=(r.h<10?"0":"")+r.h,r.ii=(r.i<10?"0":"")+r.i,r.ss=(r.s<10?"0":"")+r.s,r.dd=(r.d<10?"0":"")+r.d,r.mm=(r.m<10?"0":"")+r.m;else{if("php"!=a)throw new Error("Invalid format type.");r={y:e.getUTCFullYear().toString().substring(2),Y:e.getUTCFullYear(),F:n[o].months[e.getUTCMonth()],M:n[o].monthsShort[e.getUTCMonth()],n:e.getUTCMonth()+1,t:s.getDaysInMonth(e.getUTCFullYear(),e.getUTCMonth()),j:e.getUTCDate(),l:n[o].days[e.getUTCDay()],D:n[o].daysShort[e.getUTCDay()],w:e.getUTCDay(),N:0==e.getUTCDay()?7:e.getUTCDay(),S:e.getUTCDate()%10<=n[o].suffix.length?n[o].suffix[e.getUTCDate()%10-1]:"",a:2==n[o].meridiem.length?n[o].meridiem[e.getUTCHours()<12?0:1]:"",g:e.getUTCHours()%12==0?12:e.getUTCHours()%12,G:e.getUTCHours(),i:e.getUTCMinutes(),s:e.getUTCSeconds()},r.m=(r.n<10?"0":"")+r.n,r.d=(r.j<10?"0":"")+r.j,r.A=r.a.toString().toUpperCase(),r.h=(r.g<10?"0":"")+r.g,r.H=(r.G<10?"0":"")+r.G,r.i=(r.i<10?"0":"")+r.i,r.s=(r.s<10?"0":"")+r.s}for(var e=[],l=t.extend([],i.separators),h=0,u=i.parts.length;u>h;h++)l.length&&e.push(l.shift()),e.push(r[i.parts[h]]);return l.length&&e.push(l.shift()),e.join("")},convertViewMode:function(t){switch(t){case 4:case"decade":t=4;break;case 3:case"year":t=3;break;case 2:case"month":t=2;break;case 1:case"day":t=1;break;case 0:case"hour":t=0}return t},headTemplate:'<thead><tr><th class="prev"><i class="{leftArrow}"/></th><th colspan="5" class="switch"></th><th class="next"><i class="{rightArrow}"/></th></tr></thead>',headTemplateV3:'<thead><tr><th class="prev"><span class="{iconType} {leftArrow}"></span> </th><th colspan="5" class="switch"></th><th class="next"><span class="{iconType} {rightArrow}"></span> </th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'};s.template='<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">'+s.headTemplate+s.contTemplate+s.footTemplate+'</table></div><div class="datetimepicker-hours"><table class=" table-condensed">'+s.headTemplate+s.contTemplate+s.footTemplate+'</table></div><div class="datetimepicker-days"><table class=" table-condensed">'+s.headTemplate+"<tbody></tbody>"+s.footTemplate+'</table></div><div class="datetimepicker-months"><table class="table-condensed">'+s.headTemplate+s.contTemplate+s.footTemplate+'</table></div><div class="datetimepicker-years"><table class="table-condensed">'+s.headTemplate+s.contTemplate+s.footTemplate+"</table></div></div>",s.templateV3='<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">'+s.headTemplateV3+s.contTemplate+s.footTemplate+'</table></div><div class="datetimepicker-hours"><table class=" table-condensed">'+s.headTemplateV3+s.contTemplate+s.footTemplate+'</table></div><div class="datetimepicker-days"><table class=" table-condensed">'+s.headTemplateV3+"<tbody></tbody>"+s.footTemplate+'</table></div><div class="datetimepicker-months"><table class="table-condensed">'+s.headTemplateV3+s.contTemplate+s.footTemplate+'</table></div><div class="datetimepicker-years"><table class="table-condensed">'+s.headTemplateV3+s.contTemplate+s.footTemplate+"</table></div></div>",t.fn.datetimepicker.DPGlobal=s,t.fn.datetimepicker.noConflict=function(){return t.fn.datetimepicker=old,this},t(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api",'[data-provide="datetimepicker"]',function(e){var i=t(this);i.data("datetimepicker")||(e.preventDefault(),i.datetimepicker("show"))}),t(function(){t('[data-provide="datetimepicker-inline"]').datetimepicker()})}(window.jQuery),function(t){t.fn.datetimepicker.dates.ru={days:["\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435","\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a","\u0412\u0442\u043e\u0440\u043d\u0438\u043a","\u0421\u0440\u0435\u0434\u0430","\u0427\u0435\u0442\u0432\u0435\u0440\u0433","\u041f\u044f\u0442\u043d\u0438\u0446\u0430","\u0421\u0443\u0431\u0431\u043e\u0442\u0430","\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435"],daysShort:["\u0412\u0441\u043a","\u041f\u043d\u0434","\u0412\u0442\u0440","\u0421\u0440\u0434","\u0427\u0442\u0432","\u041f\u0442\u043d","\u0421\u0443\u0431","\u0412\u0441\u043a"],daysMin:["\u0412\u0441","\u041f\u043d","\u0412\u0442","\u0421\u0440","\u0427\u0442","\u041f\u0442","\u0421\u0431","\u0412\u0441"],months:["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c","\u0410\u0432\u0433\u0443\u0441\u0442","\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c","\u041e\u043a\u0442\u044f\u0431\u0440\u044c","\u041d\u043e\u044f\u0431\u0440\u044c","\u0414\u0435\u043a\u0430\u0431\u0440\u044c"],monthsShort:["\u042f\u043d\u0432","\u0424\u0435\u0432","\u041c\u0430\u0440","\u0410\u043f\u0440","\u041c\u0430\u0439","\u0418\u044e\u043d","\u0418\u044e\u043b","\u0410\u0432\u0433","\u0421\u0435\u043d","\u041e\u043a\u0442","\u041d\u043e\u044f","\u0414\u0435\u043a"],today:"\u0421\u0435\u0433\u043e\u0434\u043d\u044f",suffix:[],meridiem:[]}}(jQuery),function(){}.call(this),function(){}.call(this),function(){}.call(this),function(){}.call(this),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){function e(e,n){var s,o,a,r=e.nodeName.toLowerCase();return"area"===r?(s=e.parentNode,o=s.name,e.href&&o&&"map"===s.nodeName.toLowerCase()?(a=t("img[usemap='#"+o+"']")[0],!!a&&i(a)):!1):(/input|select|textarea|button|object/.test(r)?!e.disabled:"a"===r?e.href||n:n)&&i(e)}function i(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}t.ui=t.ui||{},t.extend(t.ui,{version:"1.11.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({scrollParent:function(e){var i=this.css("position"),n="absolute"===i,s=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return n&&"static"===e.css("position")?!1:s.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,n){return!!t.data(e,n[3])},focusable:function(i){return e(i,!isNaN(t.attr(i,"tabindex")))},tabbable:function(i){var n=t.attr(i,"tabindex"),s=isNaN(n);return(s||n>=0)&&e(i,!s)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(e,i){function n(e,i,n,o){return t.each(s,function(){i-=parseFloat(t.css(e,"padding"+this))||0,n&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var s="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,n(this,e)+"px")})},t.fn["outer"+i]=function(e,s){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,n(this,e,!0,s)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(i){return arguments.length?e.call(this,t.camelCase(i)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.fn.extend({focus:function(e){return function(i,n){return"number"==typeof i?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),n&&n.call(e)},i)}):e.apply(this,arguments)}}(t.fn.focus),disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(e){if(void 0!==e)return this.css("zIndex",e);if(this.length)for(var i,n,s=t(this[0]);s.length&&s[0]!==document;){if(i=s.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(n=parseInt(s.css("zIndex"),10),!isNaN(n)&&0!==n))return n;s=s.parent()}return 0}}),t.ui.plugin={add:function(e,i,n){var s,o=t.ui[e].prototype;for(s in n)o.plugins[s]=o.plugins[s]||[],o.plugins[s].push([i,n[s]])},call:function(t,e,i,n){var s,o=t.plugins[e];if(o&&(n||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(s=0;s<o.length;s++)t.options[o[s][0]]&&o[s][1].apply(t.element,i)}}}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){var e=0,i=Array.prototype.slice;return t.cleanData=function(e){return function(i){var n,s,o;for(o=0;null!=(s=i[o]);o++)try{n=t._data(s,"events"),n&&n.remove&&t(s).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,n){var s,o,a,r,l={},h=e.split(".")[0];return e=e.split(".")[1],s=h+"-"+e,n||(n=i,i=t.Widget),t.expr[":"][s.toLowerCase()]=function(e){return!!t.data(e,s)},t[h]=t[h]||{},o=t[h][e],a=t[h][e]=function(t,e){return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new a(t,e)},t.extend(a,o,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),r=new i,r.options=t.widget.extend({},r.options),t.each(n,function(e,n){return t.isFunction(n)?void(l[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},s=function(t){return i.prototype[e].apply(this,t)};return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=s,e=n.apply(this,arguments),this._super=i,this._superApply=o,e}}()):void(l[e]=n)}),a.prototype=t.widget.extend(r,{widgetEventPrefix:o?r.widgetEventPrefix||e:e},l,{constructor:a,namespace:h,widgetName:e,widgetFullName:s}),o?(t.each(o._childConstructors,function(e,i){var n=i.prototype;t.widget(n.namespace+"."+n.widgetName,a,i._proto)}),delete o._childConstructors):i._childConstructors.push(a),t.widget.bridge(e,a),a},t.widget.extend=function(e){for(var n,s,o=i.call(arguments,1),a=0,r=o.length;r>a;a++)for(n in o[a])s=o[a][n],o[a].hasOwnProperty(n)&&void 0!==s&&(e[n]=t.isPlainObject(s)?t.isPlainObject(e[n])?t.widget.extend({},e[n],s):t.widget.extend({},s):s);return e},t.widget.bridge=function(e,n){var s=n.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=i.call(arguments,1),l=this;return o=!a&&r.length?t.widget.extend.apply(null,[o].concat(r)):o,this.each(a?function(){var i,n=t.data(this,s);return"instance"===o?(l=n,!1):n?t.isFunction(n[o])&&"_"!==o.charAt(0)?(i=n[o].apply(n,r),i!==n&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+o+"'")}:function(){var e=t.data(this,s);e?(e.option(o||{}),e._init&&e._init()):t.data(this,s,new n(o,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(i,n){n=t(n||this.defaultElement||this)[0],this.element=t(n),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),n!==this&&(t.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===n&&this.destroy()}}),this.document=t(n.style?n.ownerDocument:n.document||n),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var n,s,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},n=e.split("."),e=n.shift(),n.length){for(s=a[e]=t.widget.extend({},this.options[e]),o=0;o<n.length-1;o++)s[n[o]]=s[n[o]]||{},s=s[n[o]];if(e=n.pop(),1===arguments.length)return void 0===s[e]?null:s[e];s[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!e),e&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(e,i,n){var s,o=this;"boolean"!=typeof e&&(n=i,i=e,e=!1),n?(i=s=t(i),this.bindings=this.bindings.add(i)):(n=i,i=this.element,s=this.widget()),t.each(n,function(n,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=n.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,u=l[2];u?s.delegate(u,h,r):i.bind(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(i).undelegate(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?n[t]:t).apply(n,arguments)}var n=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,n){var s,o,a=this.options[e];if(n=n||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(s in o)s in i||(i[s]=o[s]);return this.element.trigger(i,n),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(n,s,o){"string"==typeof s&&(s={effect:s});var a,r=s?s===!0||"number"==typeof s?i:s.effect||i:e;s=s||{},"number"==typeof s&&(s={duration:s}),a=!t.isEmptyObject(s),s.complete=o,s.delay&&n.delay(s.delay),a&&t.effects&&t.effects.effect[r]?n[e](s):r!==e&&n[r]?n[r](s.duration,s.easing,o):n.queue(function(i){t(this)[e](),o&&o.call(n[0]),i()})}}),t.widget}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.accordion",{version:"1.11.2",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),e.active<0&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t()}},_createIcons:function(){var e=this.options.icons;e&&(t("<span>").addClass("ui-accordion-header-icon ui-icon "+e.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),t=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?void this._activate(e):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),void("disabled"===t&&(this.element.toggleClass("ui-state-disabled",!!e).attr("aria-disabled",e),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!e))))},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,n=this.headers.length,s=this.headers.index(e.target),o=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:o=this.headers[(s+1)%n];break;case i.LEFT:case i.UP:o=this.headers[(s-1+n)%n];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:o=this.headers[0];break;case i.END:o=this.headers[n-1]}o&&(t(e.target).attr("tabIndex",-1),t(o).attr("tabIndex",0),o.focus(),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().focus()},refresh:function(){var e=this.options;this._processPanels(),e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=t()):e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var t=this.headers,e=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),e&&(this._off(t.not(this.headers)),this._off(e.not(this.panels)))},_refresh:function(){var e,i=this.options,n=i.heightStyle,s=this.element.parent();this.active=this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var e=t(this),i=e.uniqueId().attr("id"),n=e.next(),s=n.uniqueId().attr("id");e.attr("aria-controls",s),n.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===n?(e=s.height(),this.element.siblings(":visible").each(function(){var i=t(this),n=i.css("position");"absolute"!==n&&"fixed"!==n&&(e-=i.outerHeight(!0))}),this.headers.each(function(){e-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,e-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===n&&(e=0,this.headers.next().each(function(){e=Math.max(e,t(this).css("height","").height())}).height(e))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i=this.options,n=this.active,s=t(e.currentTarget),o=s[0]===n[0],a=o&&i.collapsible,r=a?t():s.next(),l=n.next(),h={oldHeader:n,oldPanel:l,newHeader:a?t():s,newPanel:r};e.preventDefault(),o&&!i.collapsible||this._trigger("beforeActivate",e,h)===!1||(i.active=a?!1:this.headers.index(s),this.active=o?t():s,this._toggle(h),n.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),o||(s.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),s.next().addClass("ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,n=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=n,this.options.animate?this._animate(i,n,e):(n.hide(),i.show(),this._toggleComplete(e)),n.attr({"aria-hidden":"true"}),n.prev().attr("aria-selected","false"),i.length&&n.length?n.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true",tabIndex:0,"aria-expanded":"true"})},_animate:function(t,e,i){var n,s,o,a=this,r=0,l=t.length&&(!e.length||t.index()<e.index()),h=this.options.animate||{},u=l&&h.down||h,c=function(){a._toggleComplete(i)};return"number"==typeof u&&(o=u),"string"==typeof u&&(s=u),s=s||u.easing||h.easing,o=o||u.duration||h.duration,e.length?t.length?(n=t.show().outerHeight(),e.animate(this.hideProps,{duration:o,easing:s,step:function(t,e){e.now=Math.round(t)}}),void t.hide().animate(this.showProps,{duration:o,easing:s,complete:c,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?r+=i.now:"content"!==a.options.heightStyle&&(i.now=Math.round(n-e.outerHeight()-r),r=0)}})):e.animate(this.hideProps,o,s,c):t.animate(this.showProps,o,s,c)},_toggleComplete:function(t){var e=t.oldPanel;e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}})}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){return function(){function e(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var s,o,a=Math.max,r=Math.abs,l=Math.round,h=/left|center|right/,u=/top|center|bottom/,c=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==s)return s;var e,i,n=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),e=o.offsetWidth,n.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=n[0].clientWidth),n.remove(),s=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),n=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),s="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===n||"auto"===n&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:s?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),n=t.isWindow(i[0]),s=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:n,isDocument:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:n||s?i.width():i.outerWidth(),height:n||s?i.height():i.outerHeight()}}},t.fn.position=function(s){if(!s||!s.of)return f.apply(this,arguments);s=t.extend({},s);var p,m,g,v,y,b,_=t(s.of),w=t.position.getWithinInfo(s.within),x=t.position.getScrollInfo(w),C=(s.collision||"flip").split(" "),k={};return b=n(_),_[0].preventDefault&&(s.at="left top"),m=b.width,g=b.height,v=b.offset,y=t.extend({},v),t.each(["my","at"],function(){var t,e,i=(s[this]||"").split(" ");1===i.length&&(i=h.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=h.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",t=c.exec(i[0]),e=c.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],s[this]=[d.exec(i[0])[0],d.exec(i[1])[0]]}),1===C.length&&(C[1]=C[0]),"right"===s.at[0]?y.left+=m:"center"===s.at[0]&&(y.left+=m/2),"bottom"===s.at[1]?y.top+=g:"center"===s.at[1]&&(y.top+=g/2),p=e(k.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var n,h,u=t(this),c=u.outerWidth(),d=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=c+f+i(this,"marginRight")+x.width,T=d+b+i(this,"marginBottom")+x.height,S=t.extend({},y),E=e(k.my,u.outerWidth(),u.outerHeight());"right"===s.my[0]?S.left-=c:"center"===s.my[0]&&(S.left-=c/2),"bottom"===s.my[1]?S.top-=d:"center"===s.my[1]&&(S.top-=d/2),S.left+=E[0],S.top+=E[1],o||(S.left=l(S.left),S.top=l(S.top)),n={marginLeft:f,marginTop:b},t.each(["left","top"],function(e,i){t.ui.position[C[e]]&&t.ui.position[C[e]][i](S,{targetWidth:m,targetHeight:g,elemWidth:c,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[p[0]+E[0],p[1]+E[1]],my:s.my,at:s.at,within:w,elem:u})}),s.using&&(h=function(t){var e=v.left-S.left,i=e+m-c,n=v.top-S.top,o=n+g-d,l={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:S.left,top:S.top,width:c,height:d},horizontal:0>i?"left":e>0?"right":"center",vertical:0>o?"top":n>0?"bottom":"middle"};c>m&&r(e+i)<m&&(l.horizontal="center"),d>g&&r(n+o)<g&&(l.vertical="middle"),l.important=a(r(e),r(i))>a(r(n),r(o))?"horizontal":"vertical",s.using.call(this,t,l)}),u.offset(t.extend(S,{using:h}))})},t.ui.position={fit:{left:function(t,e){var i,n=e.within,s=n.isWindow?n.scrollLeft:n.offset.left,o=n.width,r=t.left-e.collisionPosition.marginLeft,l=s-r,h=r+e.collisionWidth-o-s;e.collisionWidth>o?l>0&&0>=h?(i=t.left+l+e.collisionWidth-o-s,t.left+=l-i):t.left=h>0&&0>=l?s:l>h?s+o-e.collisionWidth:s:l>0?t.left+=l:h>0?t.left-=h:t.left=a(t.left-r,t.left)},top:function(t,e){var i,n=e.within,s=n.isWindow?n.scrollTop:n.offset.top,o=e.within.height,r=t.top-e.collisionPosition.marginTop,l=s-r,h=r+e.collisionHeight-o-s;e.collisionHeight>o?l>0&&0>=h?(i=t.top+l+e.collisionHeight-o-s,t.top+=l-i):t.top=h>0&&0>=l?s:l>h?s+o-e.collisionHeight:s:l>0?t.top+=l:h>0?t.top-=h:t.top=a(t.top-r,t.top)}},flip:{left:function(t,e){var i,n,s=e.within,o=s.offset.left+s.scrollLeft,a=s.width,l=s.isWindow?s.scrollLeft:s.offset.left,h=t.left-e.collisionPosition.marginLeft,u=h-l,c=h+e.collisionWidth-a-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>u?(i=t.left+d+p+f+e.collisionWidth-a-o,(0>i||i<r(u))&&(t.left+=d+p+f)):c>0&&(n=t.left-e.collisionPosition.marginLeft+d+p+f-l,(n>0||r(n)<c)&&(t.left+=d+p+f))},top:function(t,e){var i,n,s=e.within,o=s.offset.top+s.scrollTop,a=s.height,l=s.isWindow?s.scrollTop:s.offset.top,h=t.top-e.collisionPosition.marginTop,u=h-l,c=h+e.collisionHeight-a-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>u?(n=t.top+p+f+m+e.collisionHeight-a-o,t.top+p+f+m>u&&(0>n||n<r(u))&&(t.top+=p+f+m)):c>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-l,t.top+p+f+m>c&&(i>0||r(i)<c)&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,n,s,a,r=document.getElementsByTagName("body")[0],l=document.createElement("div");e=document.createElement(r?"div":"body"),n={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&t.extend(n,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in n)e.style[a]=n[a];e.appendChild(l),i=r||document.documentElement,i.insertBefore(e,i.firstChild),l.style.cssText="position: absolute; left: 10.7432222px;",s=t(l).offset().left,o=s>10&&11>s,e.innerHTML="",i.removeChild(e)}()}(),t.ui.position}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position"],t):t(jQuery)}(function(t){return t.widget("ui.menu",{version:"1.11.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(t){t.preventDefault()},"click .ui-menu-item":function(e){var i=t(e.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&t(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))
},"mouseenter .ui-menu-item":function(e){if(!this.previousFilter){var i=t(e.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.find(this.options.items).eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){this._closeOnDocumentClick(t)&&this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){var i,n,s,o,a=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:a=!1,n=this.previousFilter||"",s=String.fromCharCode(e.keyCode),o=!1,clearTimeout(this.filterTimer),s===n?o=!0:s=n+s,i=this._filterMenuItems(s),i=o&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(s=String.fromCharCode(e.keyCode),i=this._filterMenuItems(s)),i.length?(this.focus(e,i),this.previousFilter=s,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}a&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(t):this.select(t))},refresh:function(){var e,i,n=this,s=this.options.icons.submenu,o=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),o.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),i=e.parent(),n=t("<span>").addClass("ui-menu-icon ui-icon "+s).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(n),e.attr("aria-labelledby",i.attr("id"))}),e=o.add(this.element),i=e.find(this.options.items),i.not(".ui-menu-item").each(function(){var e=t(this);n._isDivider(e)&&e.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!e).attr("aria-disabled",e),this._super(t,e)},focus:function(t,e){var i,n;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),n=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",n.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,n,s,o,a,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,n=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,s=e.offset().top-this.activeMenu.offset().top-i-n,o=this.activeMenu.scrollTop(),a=this.activeMenu.height(),r=e.outerHeight(),0>s?this.activeMenu.scrollTop(o+s):s+r>a&&this.activeMenu.scrollTop(o+s-a+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var n=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));n.length||(n=this.element),this._close(n),this.blur(e),this.activeMenu=n},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(e){return!t(e.target).closest(".ui-menu").length},_isDivider:function(t){return!/[^\-\u2014\u2013\s]/.test(t.text())},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var n;this.active&&(n="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),n&&n.length&&this.active||(n=this.activeMenu.find(this.options.items)[e]()),this.focus(i,n)},nextPage:function(e){var i,n,s;return this.active?void(this.isLastItem()||(this._hasScroll()?(n=this.active.offset().top,s=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-n-s<0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))):void this.next(e)},previousPage:function(e){var i,n,s;return this.active?void(this.isFirstItem()||(this._hasScroll()?(n=this.active.offset().top,s=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-n+s>0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items).first()))):void this.next(e)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)},_filterMenuItems:function(e){var i=e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),n=new RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return n.test(t.trim(t(this).text()))})}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position","./menu"],t):t(jQuery)}(function(t){return t.widget("ui.autocomplete",{version:"1.11.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,i,n,s=this.element[0].nodeName.toLowerCase(),o="textarea"===s,a="input"===s;this.isMultiLine=o?!0:a?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[o||a?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(s){if(this.element.prop("readOnly"))return e=!0,n=!0,void(i=!0);e=!1,n=!1,i=!1;var o=t.ui.keyCode;switch(s.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",s);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",s);break;case o.UP:e=!0,this._keyEvent("previous",s);break;case o.DOWN:e=!0,this._keyEvent("next",s);break;case o.ENTER:this.menu.active&&(e=!0,s.preventDefault(),this.menu.select(s));break;case o.TAB:this.menu.active&&this.menu.select(s);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(s),s.preventDefault());break;default:i=!0,this._searchTimeout(s)}},keypress:function(n){if(e)return e=!1,void((!this.isMultiLine||this.menu.element.is(":visible"))&&n.preventDefault());if(!i){var s=t.ui.keyCode;switch(n.keyCode){case s.PAGE_UP:this._move("previousPage",n);break;case s.PAGE_DOWN:this._move("nextPage",n);break;case s.UP:this._keyEvent("previous",n);break;case s.DOWN:this._keyEvent("next",n)}}},input:function(t){return n?(n=!1,void t.preventDefault()):void this._searchTimeout(t)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?void delete this.cancelBlur:(clearTimeout(this.searching),this.close(t),void this._change(t))}}),this._initSource(),this.menu=t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];t(e.target).closest(".ui-menu-item").length||this._delay(function(){var e=this;this.document.one("mousedown",function(n){n.target===e.element[0]||n.target===i||t.contains(i,n.target)||e.close()})})},menufocus:function(e,i){var n,s;return this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type))?(this.menu.blur(),void this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)})):(s=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",e,{item:s})&&e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(s.value),n=i.item.attr("aria-label")||s.value,void(n&&t.trim(n).length&&(this.liveRegion.children().hide(),t("<div>").text(n).appendTo(this.liveRegion))))},menuselect:function(t,e){var i=e.item.data("ui-autocomplete-item"),n=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=n,this._delay(function(){this.previous=n,this.selectedItem=i})),!1!==this._trigger("select",t,{item:i})&&this._value(i.value),this.term=this._value(),this.close(t),this.selectedItem=i}}),this.liveRegion=t("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,n=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,n){n(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,s){n.xhr&&n.xhr.abort(),n.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){s(t)},error:function(){s([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){var e=this.term===this._value(),i=this.menu.element.is(":visible"),n=t.altKey||t.ctrlKey||t.metaKey||t.shiftKey;(!e||e&&!i&&!n)&&(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):void 0},_search:function(t){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return t.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({},e,{label:e.label||e.value,value:e.value||e.label})})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var n=this;t.each(i,function(t,i){n._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").text(i.label).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[t](e):void this.search(null,e)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(t,e),e.preventDefault())}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var n=new RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return n.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.children().hide(),t("<div>").text(i).appendTo(this.liveRegion))}}),t.ui.autocomplete}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],t):t(jQuery)}(function(t){var e,i="ui-button ui-widget ui-state-default ui-corner-all",n="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",s=function(){var e=t(this);setTimeout(function(){e.find(":ui-button").button("refresh")},1)},o=function(e){var i=e.name,n=e.form,s=t([]);return i&&(i=i.replace(/'/g,"\\'"),s=n?t(n).find("[name='"+i+"'][type=radio]"):t("[name='"+i+"'][type=radio]",e.ownerDocument).filter(function(){return!this.form})),s};return t.widget("ui.button",{version:"1.11.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,s),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var n=this,a=this.options,r="checkbox"===this.type||"radio"===this.type,l=r?"":"ui-state-active";null===a.label&&(a.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(i).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){a.disabled||this===e&&t(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){a.disabled||t(this).removeClass(l)}).bind("click"+this.eventNamespace,function(t){a.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),r&&this.element.bind("change"+this.eventNamespace,function(){n.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return a.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(a.disabled)return!1;t(this).addClass("ui-state-active"),n.buttonElement.attr("aria-pressed","true");var e=n.element[0];o(e).not(e).map(function(){return t(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return a.disabled?!1:(t(this).addClass("ui-state-active"),e=this,void n.document.one("mouseup",function(){e=null}))}).bind("mouseup"+this.eventNamespace,function(){return a.disabled?!1:void t(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(e){return a.disabled?!1:void((e.keyCode===t.ui.keyCode.SPACE||e.keyCode===t.ui.keyCode.ENTER)&&t(this).addClass("ui-state-active"))}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){t(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===t.ui.keyCode.SPACE&&t(this).click()})),this._setOption("disabled",a.disabled),this._resetButton()},_determineButtonType:function(){var t,e,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=t.length?t.siblings():this.element.siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(i+" ui-state-active "+n).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){return this._super(t,e),"disabled"===t?(this.widget().toggleClass("ui-state-disabled",!!e),this.element.prop("disabled",!!e),void(e&&this.buttonElement.removeClass("checkbox"===this.type||"radio"===this.type?"ui-state-focus":"ui-state-focus ui-state-active"))):void this._resetButton()},refresh:function(){var e=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOption("disabled",e),"radio"===this.type?o(this.element[0]).each(function(){t(this).is(":checked")?t(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return void(this.options.label&&this.element.val(this.options.label));var e=this.buttonElement.removeClass(n),i=t("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),s=this.options.icons,o=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(o?"s":s.primary?"-primary":"-secondary")),s.primary&&e.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&e.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(o?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||e.attr("title",t.trim(i)))):a.push("ui-button-text-only"),e.addClass(a.join(" "))}}),t.widget("ui.buttonset",{version:"1.11.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var e="rtl"===this.element.css("direction"),i=this.element.find(this.options.items),n=i.filter(":ui-button");i.not(":ui-button").button(),n.button("refresh"),this.buttons=i.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(e?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}}),t.ui.button}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core"],t):t(jQuery)}(function(t){function e(t){for(var e,i;t.length&&t[0]!==document;){if(e=t.css("position"),("absolute"===e||"relative"===e||"fixed"===e)&&(i=parseInt(t.css("zIndex"),10),!isNaN(i)&&0!==i))return i;t=t.parent()}return 0}function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.regional.en=t.extend(!0,{},this.regional[""]),this.regional["en-US"]=t.extend(!0,{},this.regional.en),this.dpDiv=n(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function n(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.delegate(i,"mouseout",function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",s)}function s(){t.datepicker._isDisabledDatepicker(a.inline?a.dpDiv.parent()[0]:a.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))}function o(e,i){t.extend(e,i);for(var n in i)null==i[n]&&(e[n]=i[n]);return e}t.extend(t.ui,{datepicker:{version:"1.11.2"}});var a;return t.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return o(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var n,s,o;n=e.nodeName.toLowerCase(),s="div"===n||"span"===n,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),s),o.settings=t.extend({},i||{}),"input"===n?this._connectDatepicker(e,o):s&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var s=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?n(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var n=t(e);i.append=t([]),i.trigger=t([]),n.hasClass(this.markerClassName)||(this._attachments(n,i),n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),t.data(e,"datepicker",i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var n,s,o,a=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),a&&(i.append=t("<span class='"+this._appendClass+"'>"+a+"</span>"),e[r?"before":"after"](i.append)),e.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),n=this._get(i,"showOn"),("focus"===n||"both"===n)&&e.focus(this._showDatepicker),("button"===n||"both"===n)&&(s=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:s,title:s}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:s,title:s}):s)),e[r?"before":"after"](i.trigger),i.trigger.click(function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,n,s,o=new Date(2009,11,20),a=this._get(t,"dateFormat");a.match(/[DM]/)&&(e=function(t){for(i=0,n=0,s=0;s<t.length;s++)t[s].length>i&&(i=t[s].length,n=s);return n},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var n=t(e);n.hasClass(this.markerClassName)||(n.addClass(this.markerClassName).append(i.dpDiv),t.data(e,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,n,s,a){var r,l,h,u,c,d=this._dialogInst;return d||(this.uuid+=1,r="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+r+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),t("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},t.data(this._dialogInput[0],"datepicker",d)),o(d.settings,s||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(l=document.documentElement.clientWidth,h=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,c=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+u,h/2-150+c]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=n,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(e){var i,n=t(e),s=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,"datepicker"),"input"===i?(s.append.remove(),s.trigger.remove(),n.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&n.removeClass(this.markerClassName).empty())},_enableDatepicker:function(e){var i,n,s=t(e),o=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(n=s.children("."+this._inlineClass),n.children().removeClass("ui-state-disabled"),n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,n,s=t(e),o=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(n=s.children("."+this._inlineClass),n.children().addClass("ui-state-disabled"),n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;e<this._disabledInputs.length;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,i,n){var s,a,r,l,h=this._getInst(e);return 2===arguments.length&&"string"==typeof i?"defaults"===i?t.extend({},t.datepicker._defaults):h?"all"===i?t.extend({},h.settings):this._get(h,i):null:(s=i||{},"string"==typeof i&&(s={},s[i]=n),void(h&&(this._curInst===h&&this._hideDatepicker(),a=this._getDateDatepicker(e,!0),r=this._getMinMaxDate(h,"min"),l=this._getMinMaxDate(h,"max"),o(h.settings,s),null!==r&&void 0!==s.dateFormat&&void 0===s.minDate&&(h.settings.minDate=this._formatDate(h,r)),null!==l&&void 0!==s.dateFormat&&void 0===s.maxDate&&(h.settings.maxDate=this._formatDate(h,l)),"disabled"in s&&(s.disabled?this._disableDatepicker(e):this._enableDatepicker(e)),this._attachments(t(e),h),this._autoSize(h),this._setDate(h,a),this._updateAlternate(h),this._updateDatepicker(h))))
},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,n,s,o=t.datepicker._getInst(e.target),a=!0,r=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),a=!1;break;case 13:return s=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),s[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,s[0]),i=t.datepicker._get(o,"onSelect"),i?(n=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[n,o])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),a=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),a=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?1:-1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),a=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?-1:1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),a=e.ctrlKey||e.metaKey;break;default:a=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):a=!1;a&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var i,n,s=t.datepicker._getInst(e.target);return t.datepicker._get(s,"constrainInput")?(i=t.datepicker._possibleChars(t.datepicker._get(s,"dateFormat")),n=String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),e.ctrlKey||e.metaKey||" ">n||!i||i.indexOf(n)>-1):void 0},_doKeyUp:function(e){var i,n=t.datepicker._getInst(e.target);if(n.input.val()!==n.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(n,"dateFormat"),n.input?n.input.val():null,t.datepicker._getFormatConfig(n)),i&&(t.datepicker._setDateFromField(n),t.datepicker._updateAlternate(n),t.datepicker._updateDatepicker(n))}catch(s){}return!0},_showDatepicker:function(i){if(i=i.target||i,"input"!==i.nodeName.toLowerCase()&&(i=t("input",i.parentNode)[0]),!t.datepicker._isDisabledDatepicker(i)&&t.datepicker._lastInput!==i){var n,s,a,r,l,h,u;n=t.datepicker._getInst(i),t.datepicker._curInst&&t.datepicker._curInst!==n&&(t.datepicker._curInst.dpDiv.stop(!0,!0),n&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),s=t.datepicker._get(n,"beforeShow"),a=s?s.apply(i,[i,n]):{},a!==!1&&(o(n.settings,a),n.lastVal=null,t.datepicker._lastInput=i,t.datepicker._setDateFromField(n),t.datepicker._inDialog&&(i.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(i),t.datepicker._pos[1]+=i.offsetHeight),r=!1,t(i).parents().each(function(){return r|="fixed"===t(this).css("position"),!r}),l={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,n.dpDiv.empty(),n.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(n),l=t.datepicker._checkOffset(n,l,r),n.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":r?"fixed":"absolute",display:"none",left:l.left+"px",top:l.top+"px"}),n.inline||(h=t.datepicker._get(n,"showAnim"),u=t.datepicker._get(n,"duration"),n.dpDiv.css("z-index",e(t(i))+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[h]?n.dpDiv.show(h,t.datepicker._get(n,"showOptions"),u):n.dpDiv[h||"show"](h?u:null),t.datepicker._shouldFocusInput(n)&&n.input.focus(),t.datepicker._curInst=n))}},_updateDatepicker:function(e){this.maxRows=4,a=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var i,n=this._getNumberOfMonths(e),o=n[1],r=17,l=e.dpDiv.find("."+this._dayOverClass+" a");l.length>0&&s.apply(l.get(0)),e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),o>1&&e.dpDiv.addClass("ui-datepicker-multi-"+o).css("width",r*o+"em"),e.dpDiv[(1!==n[0]||1!==n[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.focus(),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,n){var s=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),a=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,l=document.documentElement.clientWidth+(n?0:t(document).scrollLeft()),h=document.documentElement.clientHeight+(n?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?s-a:0,i.left-=n&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=n&&i.top===e.input.offset().top+r?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+s>l&&l>s?Math.abs(i.left+s-l):0),i.top-=Math.min(i.top,i.top+o>h&&h>o?Math.abs(o+r):0),i},_findPos:function(e){for(var i,n=this._getInst(e),s=this._get(n,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[s?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,n,s,o,a=this._curInst;!a||e&&a!==t.data(e,"datepicker")||this._datepickerShowing&&(i=this._get(a,"showAnim"),n=this._get(a,"duration"),s=function(){t.datepicker._tidyDialog(a)},t.effects&&(t.effects.effect[i]||t.effects[i])?a.dpDiv.hide(i,t.datepicker._get(a,"showOptions"),n,s):a.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?n:null,s),i||s(),this._datepickerShowing=!1,o=this._get(a,"onClose"),o&&o.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),n=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==n)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,n){var s=t(e),o=this._getInst(s[0]);this._isDisabledDatepicker(s[0])||(this._adjustInstDate(o,i+("M"===n?this._get(o,"showCurrentAtPos"):0),n),this._updateDatepicker(o))},_gotoToday:function(e){var i,n=t(e),s=this._getInst(n[0]);this._get(s,"gotoCurrent")&&s.currentDay?(s.selectedDay=s.currentDay,s.drawMonth=s.selectedMonth=s.currentMonth,s.drawYear=s.selectedYear=s.currentYear):(i=new Date,s.selectedDay=i.getDate(),s.drawMonth=s.selectedMonth=i.getMonth(),s.drawYear=s.selectedYear=i.getFullYear()),this._notifyChange(s),this._adjustDate(n)},_selectMonthYear:function(e,i,n){var s=t(e),o=this._getInst(s[0]);o["selected"+("M"===n?"Month":"Year")]=o["draw"+("M"===n?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(s)},_selectDay:function(e,i,n,s){var o,a=t(e);t(s).hasClass(this._unselectableClass)||this._isDisabledDatepicker(a[0])||(o=this._getInst(a[0]),o.selectedDay=o.currentDay=t("a",s).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=n,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var n,s=t(e),o=this._getInst(s[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),n=this._get(o,"onSelect"),n?n.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.focus(),this._lastInput=null)},_updateAlternate:function(e){var i,n,s,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),n=this._getDate(e),s=this.formatDate(i,n,this._getFormatConfig(e)),t(o).each(function(){t(this).val(s)}))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(e,i,n){if(null==e||null==i)throw"Invalid arguments";if(i="object"==typeof i?i.toString():i+"",""===i)return null;var s,o,a,r,l=0,h=(n?n.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof h?h:(new Date).getFullYear()%100+parseInt(h,10),c=(n?n.dayNamesShort:null)||this._defaults.dayNamesShort,d=(n?n.dayNames:null)||this._defaults.dayNames,p=(n?n.monthNamesShort:null)||this._defaults.monthNamesShort,f=(n?n.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,b=!1,_=function(t){var i=s+1<e.length&&e.charAt(s+1)===t;return i&&s++,i},w=function(t){var e=_(t),n="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,s="y"===t?n:1,o=new RegExp("^\\d{"+s+","+n+"}"),a=i.substring(l).match(o);if(!a)throw"Missing number at position "+l;return l+=a[0].length,parseInt(a[0],10)},x=function(e,n,s){var o=-1,a=t.map(_(e)?s:n,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(a,function(t,e){var n=e[1];return i.substr(l,n.length).toLowerCase()===n.toLowerCase()?(o=e[0],l+=n.length,!1):void 0}),-1!==o)return o+1;throw"Unknown name at position "+l},C=function(){if(i.charAt(l)!==e.charAt(s))throw"Unexpected literal at position "+l;l++};for(s=0;s<e.length;s++)if(b)"'"!==e.charAt(s)||_("'")?C():b=!1;else switch(e.charAt(s)){case"d":v=w("d");break;case"D":x("D",c,d);break;case"o":y=w("o");break;case"m":g=w("m");break;case"M":g=x("M",p,f);break;case"y":m=w("y");break;case"@":r=new Date(w("@")),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"!":r=new Date((w("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"'":_("'")?C():b=!0;break;default:C()}if(l<i.length&&(a=i.substr(l),!/^\s+/.test(a)))throw"Extra/unparsed characters found in date: "+a;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),y>-1)for(g=1,v=y;;){if(o=this._getDaysInMonth(m,g-1),o>=v)break;g++,v-=o}if(r=this._daylightSavingAdjust(new Date(m,g-1,v)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==v)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*60*60*1e7,formatDate:function(t,e,i){if(!e)return"";var n,s=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,a=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,l=function(e){var i=n+1<t.length&&t.charAt(n+1)===e;return i&&n++,i},h=function(t,e,i){var n=""+e;if(l(t))for(;n.length<i;)n="0"+n;return n},u=function(t,e,i,n){return l(t)?n[e]:i[e]},c="",d=!1;if(e)for(n=0;n<t.length;n++)if(d)"'"!==t.charAt(n)||l("'")?c+=t.charAt(n):d=!1;else switch(t.charAt(n)){case"d":c+=h("d",e.getDate(),2);break;case"D":c+=u("D",e.getDay(),s,o);break;case"o":c+=h("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":c+=h("m",e.getMonth()+1,2);break;case"M":c+=u("M",e.getMonth(),a,r);break;case"y":c+=l("y")?e.getFullYear():(e.getYear()%100<10?"0":"")+e.getYear()%100;break;case"@":c+=e.getTime();break;case"!":c+=1e4*e.getTime()+this._ticksTo1970;break;case"'":l("'")?c+="'":d=!0;break;default:c+=t.charAt(n)}return c},_possibleChars:function(t){var e,i="",n=!1,s=function(i){var n=e+1<t.length&&t.charAt(e+1)===i;return n&&e++,n};for(e=0;e<t.length;e++)if(n)"'"!==t.charAt(e)||s("'")?i+=t.charAt(e):n=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":s("'")?i+="'":n=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),n=t.lastVal=t.input?t.input.val():null,s=this._getDefaultDate(t),o=s,a=this._getFormatConfig(t);try{o=this.parseDate(i,n,a)||s}catch(r){n=e?"":n}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=n?o.getDate():0,t.currentMonth=n?o.getMonth():0,t.currentYear=n?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,n){var s=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(n){}for(var s=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=s.getFullYear(),a=s.getMonth(),r=s.getDate(),l=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,h=l.exec(i);h;){switch(h[2]||"d"){case"d":case"D":r+=parseInt(h[1],10);break;case"w":case"W":r+=7*parseInt(h[1],10);break;case"m":case"M":a+=parseInt(h[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a));break;case"y":case"Y":o+=parseInt(h[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a))}h=l.exec(i)}return new Date(o,a,r)},a=null==i||""===i?n:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?n:s(i):new Date(i.getTime());return a=a&&"Invalid Date"===a.toString()?n:a,a&&(a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),this._daylightSavingAdjust(a)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var n=!e,s=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),s===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(n?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),n="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(n,-i,"M")},next:function(){t.datepicker._adjustDate(n,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(n)},selectDay:function(){return t.datepicker._selectDay(n,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(n,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(n,this,"Y"),!1}};t(this).bind(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,n,s,o,a,r,l,h,u,c,d,p,f,m,g,v,y,b,_,w,x,C,k,D,T,S,E,M,I,N,P,A,H,F,j,O,z,W,L=new Date,R=this._daylightSavingAdjust(new Date(L.getFullYear(),L.getMonth(),L.getDate())),U=this._get(t,"isRTL"),$=this._get(t,"showButtonPanel"),B=this._get(t,"hideIfNoPrevNext"),q=this._get(t,"navigationAsDateFormat"),Y=this._getNumberOfMonths(t),V=this._get(t,"showCurrentAtPos"),X=this._get(t,"stepMonths"),K=1!==Y[0]||1!==Y[1],Q=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),G=this._getMinMaxDate(t,"min"),J=this._getMinMaxDate(t,"max"),Z=t.drawMonth-V,te=t.drawYear;if(0>Z&&(Z+=12,te--),J)for(e=this._daylightSavingAdjust(new Date(J.getFullYear(),J.getMonth()-Y[0]*Y[1]+1,J.getDate())),e=G&&G>e?G:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=q?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-X,1)),this._getFormatConfig(t)):i,n=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"e":"w")+"'>"+i+"</span></a>":B?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"e":"w")+"'>"+i+"</span></a>",s=this._get(t,"nextText"),s=q?this.formatDate(s,this._daylightSavingAdjust(new Date(te,Z+X,1)),this._getFormatConfig(t)):s,o=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+s+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"w":"e")+"'>"+s+"</span></a>":B?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+s+"'><span class='ui-icon ui-icon-circle-triangle-"+(U?"w":"e")+"'>"+s+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?Q:R,a=q?this.formatDate(a,r,this._getFormatConfig(t)):a,l=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",h=$?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(U?l:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(U?"":l)+"</div>":"",u=parseInt(this._get(t,"firstDay"),10),u=isNaN(u)?0:u,c=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),m=this._get(t,"monthNamesShort"),g=this._get(t,"beforeShowDay"),v=this._get(t,"showOtherMonths"),y=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),_="",x=0;x<Y[0];x++){for(C="",this.maxRows=4,k=0;k<Y[1];k++){if(D=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),T=" ui-corner-all",S="",K){if(S+="<div class='ui-datepicker-group",Y[1]>1)switch(k){case 0:S+=" ui-datepicker-group-first",T=" ui-corner-"+(U?"right":"left");break;case Y[1]-1:S+=" ui-datepicker-group-last",T=" ui-corner-"+(U?"left":"right");break;default:S+=" ui-datepicker-group-middle",T=""}S+="'>"}for(S+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+T+"'>"+(/all|left/.test(T)&&0===x?U?o:n:"")+(/all|right/.test(T)&&0===x?U?n:o:"")+this._generateMonthYearHeader(t,Z,te,G,J,x>0||k>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead><tr>",E=c?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)M=(w+u)%7,E+="<th scope='col'"+((w+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+"><span title='"+d[M]+"'>"+p[M]+"</span></th>";for(S+=E+"</tr></thead><tbody>",I=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,I)),N=(this._getFirstDayOfMonth(te,Z)-u+7)%7,P=Math.ceil((N+I)/7),A=K&&this.maxRows>P?this.maxRows:P,this.maxRows=A,H=this._daylightSavingAdjust(new Date(te,Z,1-N)),F=0;A>F;F++){for(S+="<tr>",j=c?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(H)+"</td>":"",w=0;7>w;w++)O=g?g.apply(t.input?t.input[0]:null,[H]):[!0,""],z=H.getMonth()!==Z,W=z&&!y||!O[0]||G&&G>H||J&&H>J,j+="<td class='"+((w+u+6)%7>=5?" ui-datepicker-week-end":"")+(z?" ui-datepicker-other-month":"")+(H.getTime()===D.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===H.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(W?" "+this._unselectableClass+" ui-state-disabled":"")+(z&&!v?"":" "+O[1]+(H.getTime()===Q.getTime()?" "+this._currentClass:"")+(H.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(z&&!v||!O[2]?"":" title='"+O[2].replace(/'/g,"&#39;")+"'")+(W?"":" data-handler='selectDay' data-event='click' data-month='"+H.getMonth()+"' data-year='"+H.getFullYear()+"'")+">"+(z&&!v?"&#xa0;":W?"<span class='ui-state-default'>"+H.getDate()+"</span>":"<a class='ui-state-default"+(H.getTime()===R.getTime()?" ui-state-highlight":"")+(H.getTime()===Q.getTime()?" ui-state-active":"")+(z?" ui-priority-secondary":"")+"' href='#'>"+H.getDate()+"</a>")+"</td>",H.setDate(H.getDate()+1),H=this._daylightSavingAdjust(H);S+=j+"</tr>"}Z++,Z>11&&(Z=0,te++),S+="</tbody></table>"+(K?"</div>"+(Y[0]>0&&k===Y[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),C+=S}_+=C}return _+=h,t._keyEvent=!1,_},_generateMonthYearHeader:function(t,e,i,n,s,o,a,r){var l,h,u,c,d,p,f,m,g=this._get(t,"changeMonth"),v=this._get(t,"changeYear"),y=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(o||!g)_+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(l=n&&n.getFullYear()===i,h=s&&s.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++)(!l||u>=n.getMonth())&&(!h||u<=s.getMonth())&&(_+="<option value='"+u+"'"+(u===e?" selected='selected'":"")+">"+r[u]+"</option>");_+="</select>"}if(y||(b+=_+(!o&&g&&v?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(c=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(c[0]),m=Math.max(f,p(c[1]||"")),f=n?Math.max(f,n.getFullYear()):f,m=s?Math.min(m,s.getFullYear()):m,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),y&&(b+=(!o&&g&&v?"":"&#xa0;")+_),b+="</div>"},_adjustInstDate:function(t,e,i){var n=t.drawYear+("Y"===i?e:0),s=t.drawMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(n,s))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(n,s,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),n=this._getMinMaxDate(t,"max"),s=i&&i>e?i:e;return n&&s>n?n:s},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,n){var s=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,n+(0>e?e:s[0]*s[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,n,s=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,l=this._get(t,"yearRange");return l&&(i=l.split(":"),n=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=n),i[1].match(/[+\-].*/)&&(r+=n)),(!s||e.getTime()>=s.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||e.getFullYear()<=r)},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,n){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var s=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(n,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),s,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).mousedown(t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new i,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.11.2",t.datepicker}),function(t){"function"==typeof define&&define.amd?define(["jquery","./widget"],t):t(jQuery)}(function(t){var e=!1;return t(document).mouseup(function(){e=!1}),t.widget("ui.mouse",{version:"1.11.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!e){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var n=this,s=1===i.which,o="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;return s&&!o&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){n.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return n._mouseMove(t)},this._mouseUpDelegate=function(t){return n._mouseUp(t)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),e=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||document.documentMode<9)&&!e.button)return this._mouseUp(e);if(!e.which)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(i){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,i.target===this._mouseDownEvent.target&&t.data(i.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(i)),e=!1,!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.draggable",t.ui.mouse,{version:"1.11.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?void(this.destroyOnClear=!0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),void this._mouseDestroy())},_mouseCapture:function(e){var i=this.options;return this._blurActiveElement(e),this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map(function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var i=this.document[0];if(this.handleElement.is(e.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&t(i.activeElement).blur()}catch(n){}},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===t(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._normalizeRightBottom(),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var n=this._uiHash();
    if(this._trigger("drag",e,n)===!1)return this._mouseUp({}),!1;this.position=n.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,n=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(n=t.ui.ddmanager.drop(this,e)),this.dropped&&(n=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!n||"valid"===this.options.revert&&n||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,n)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.focus(),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(e){var i=this.options,n=t.isFunction(i.helper),s=n?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),n&&s[0]===this.element[0]&&this._setPositionRelative(),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,n,s=this.options,o=this.document[0];return this.relativeContainer=null,s.containment?"window"===s.containment?void(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===s.containment?void(this.containment=[0,0,t(o).width()-this.helperProportions.width-this.margins.left,(t(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):s.containment.constructor===Array?void(this.containment=s.containment):("parent"===s.containment&&(s.containment=this.helper[0].parentNode),i=t(s.containment),n=i[0],void(n&&(e=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(n.scrollWidth,n.offsetWidth):n.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(n.scrollHeight,n.offsetHeight):n.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i))):void(this.containment=null)},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,n=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:n?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:n?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,n,s,o,a=this.options,r=this._isRootNode(this.scrollParent[0]),l=t.pageX,h=t.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(n=this.relativeContainer.offset(),i=[this.containment[0]+n.left,this.containment[1]+n.top,this.containment[2]+n.left,this.containment[3]+n.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),a.grid&&(s=a.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,h=i?s-this.offset.click.top>=i[1]||s-this.offset.click.top>i[3]?s:s-this.offset.click.top>=i[1]?s-a.grid[1]:s+a.grid[1]:s,o=a.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,l=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o),"y"===a.axis&&(l=this.originalPageX),"x"===a.axis&&(h=this.originalPageY)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(e,i,n){return n=n||this._uiHash(),t.ui.plugin.call(this,e,[i,n,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),n.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,i,n)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i,n){var s=t.extend({},i,{item:n.element});n.sortables=[],t(n.options.connectToSortable).each(function(){var i=t(this).sortable("instance");i&&!i.options.disabled&&(n.sortables.push(i),i.refreshPositions(),i._trigger("activate",e,s))})},stop:function(e,i,n){var s=t.extend({},i,{item:n.element});n.cancelHelperRemoval=!1,t.each(n.sortables,function(){var t=this;t.isOver?(t.isOver=0,n.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,s))})},drag:function(e,i,n){t.each(n.sortables,function(){var s=!1,o=this;o.positionAbs=n.positionAbs,o.helperProportions=n.helperProportions,o.offset.click=n.offset.click,o._intersectsWith(o.containerCache)&&(s=!0,t.each(n.sortables,function(){return this.positionAbs=n.positionAbs,this.helperProportions=n.helperProportions,this.offset.click=n.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&t.contains(o.element[0],this.element[0])&&(s=!1),s})),s?(o.isOver||(o.isOver=1,o.currentItem=i.helper.appendTo(o.element).data("ui-sortable-item",!0),o.options._helper=o.options.helper,o.options.helper=function(){return i.helper[0]},e.target=o.currentItem[0],o._mouseCapture(e,!0),o._mouseStart(e,!0,!0),o.offset.click.top=n.offset.click.top,o.offset.click.left=n.offset.click.left,o.offset.parent.left-=n.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=n.offset.parent.top-o.offset.parent.top,n._trigger("toSortable",e),n.dropped=o.element,t.each(n.sortables,function(){this.refreshPositions()}),n.currentItem=n.element,o.fromOutside=n),o.currentItem&&(o._mouseDrag(e),i.position=o.position)):o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",e,o._uiHash(o)),o._mouseStop(e,!0),o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),n._refreshOffsets(e),i.position=n._generatePosition(e,!0),n._trigger("fromSortable",e),n.dropped=!1,t.each(n.sortables,function(){this.refreshPositions()}))})}}),t.ui.plugin.add("draggable","cursor",{start:function(e,i,n){var s=t("body"),o=n.options;s.css("cursor")&&(o._cursor=s.css("cursor")),s.css("cursor",o.cursor)},stop:function(e,i,n){var s=n.options;s._cursor&&t("body").css("cursor",s._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i,n){var s=t(i.helper),o=n.options;s.css("opacity")&&(o._opacity=s.css("opacity")),s.css("opacity",o.opacity)},stop:function(e,i,n){var s=n.options;s._opacity&&t(i.helper).css("opacity",s._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(e,i,n){var s=n.options,o=!1,a=n.scrollParentNotHidden[0],r=n.document[0];a!==r&&"HTML"!==a.tagName?(s.axis&&"x"===s.axis||(n.overflowOffset.top+a.offsetHeight-e.pageY<s.scrollSensitivity?a.scrollTop=o=a.scrollTop+s.scrollSpeed:e.pageY-n.overflowOffset.top<s.scrollSensitivity&&(a.scrollTop=o=a.scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(n.overflowOffset.left+a.offsetWidth-e.pageX<s.scrollSensitivity?a.scrollLeft=o=a.scrollLeft+s.scrollSpeed:e.pageX-n.overflowOffset.left<s.scrollSensitivity&&(a.scrollLeft=o=a.scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(e.pageY-t(r).scrollTop()<s.scrollSensitivity?o=t(r).scrollTop(t(r).scrollTop()-s.scrollSpeed):t(window).height()-(e.pageY-t(r).scrollTop())<s.scrollSensitivity&&(o=t(r).scrollTop(t(r).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(e.pageX-t(r).scrollLeft()<s.scrollSensitivity?o=t(r).scrollLeft(t(r).scrollLeft()-s.scrollSpeed):t(window).width()-(e.pageX-t(r).scrollLeft())<s.scrollSensitivity&&(o=t(r).scrollLeft(t(r).scrollLeft()+s.scrollSpeed)))),o!==!1&&t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(n,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,i,n){var s=n.options;n.snapElements=[],t(s.snap.constructor!==String?s.snap.items||":data(ui-draggable)":s.snap).each(function(){var e=t(this),i=e.offset();this!==n.element[0]&&n.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:i.top,left:i.left})})},drag:function(e,i,n){var s,o,a,r,l,h,u,c,d,p,f=n.options,m=f.snapTolerance,g=i.offset.left,v=g+n.helperProportions.width,y=i.offset.top,b=y+n.helperProportions.height;for(d=n.snapElements.length-1;d>=0;d--)l=n.snapElements[d].left-n.margins.left,h=l+n.snapElements[d].width,u=n.snapElements[d].top-n.margins.top,c=u+n.snapElements[d].height,l-m>v||g>h+m||u-m>b||y>c+m||!t.contains(n.snapElements[d].item.ownerDocument,n.snapElements[d].item)?(n.snapElements[d].snapping&&n.options.snap.release&&n.options.snap.release.call(n.element,e,t.extend(n._uiHash(),{snapItem:n.snapElements[d].item})),n.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(s=Math.abs(u-b)<=m,o=Math.abs(c-y)<=m,a=Math.abs(l-v)<=m,r=Math.abs(h-g)<=m,s&&(i.position.top=n._convertPositionTo("relative",{top:u-n.helperProportions.height,left:0}).top),o&&(i.position.top=n._convertPositionTo("relative",{top:c,left:0}).top),a&&(i.position.left=n._convertPositionTo("relative",{top:0,left:l-n.helperProportions.width}).left),r&&(i.position.left=n._convertPositionTo("relative",{top:0,left:h}).left)),p=s||o||a||r,"outer"!==f.snapMode&&(s=Math.abs(u-y)<=m,o=Math.abs(c-b)<=m,a=Math.abs(l-g)<=m,r=Math.abs(h-v)<=m,s&&(i.position.top=n._convertPositionTo("relative",{top:u,left:0}).top),o&&(i.position.top=n._convertPositionTo("relative",{top:c-n.helperProportions.height,left:0}).top),a&&(i.position.left=n._convertPositionTo("relative",{top:0,left:l}).left),r&&(i.position.left=n._convertPositionTo("relative",{top:0,left:h-n.helperProportions.width}).left)),!n.snapElements[d].snapping&&(s||o||a||r||p)&&n.options.snap.snap&&n.options.snap.snap.call(n.element,e,t.extend(n._uiHash(),{snapItem:n.snapElements[d].item})),n.snapElements[d].snapping=s||o||a||r||p)}}),t.ui.plugin.add("draggable","stack",{start:function(e,i,n){var s,o=n.options,a=t.makeArray(t(o.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});a.length&&(s=parseInt(t(a[0]).css("zIndex"),10)||0,t(a).each(function(e){t(this).css("zIndex",s+e)}),this.css("zIndex",s+a.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i,n){var s=t(i.helper),o=n.options;s.css("zIndex")&&(o._zIndex=s.css("zIndex")),s.css("zIndex",o.zIndex)},stop:function(e,i,n){var s=n.options;s._zIndex&&t(i.helper).css("zIndex",s._zIndex)}}),t.ui.draggable}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.resizable",t.ui.mouse,{version:"1.11.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseInt(t,10)||0},_isNumber:function(t){return!isNaN(parseInt(t,10))},_hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var n=i&&"left"===i?"scrollLeft":"scrollTop",s=!1;return e[n]>0?!0:(e[n]=1,s=e[n]>0,e[n]=0,s)},_create:function(){var e,i,n,s,o,a=this,r=this.options;if(this.element.addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),e=this.handles.split(","),this.handles={},i=0;i<e.length;i++)n=t.trim(e[i]),o="ui-resizable-"+n,s=t("<div class='ui-resizable-handle "+o+"'></div>"),s.css({zIndex:r.zIndex}),"se"===n&&s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[n]=".ui-resizable-"+n,this.element.append(s);this._renderAxis=function(e){var i,n,s,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=this.element.children(this.handles[i]).first().show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(n=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?n.outerHeight():n.outerWidth(),s=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(s,o),this._proportionallyResize()),t(this.handles[i]).length},this._renderAxis(this.element),this._handles=t(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){a.resizing||(this.className&&(s=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),a.axis=s&&s[1]?s[1]:"se")}),r.autoHide&&(this._handles.hide(),t(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(t(this).removeClass("ui-resizable-autohide"),a._handles.show())}).mouseleave(function(){r.disabled||a.resizing||(t(this).addClass("ui-resizable-autohide"),a._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(e){var i,n,s=!1;for(i in this.handles)n=t(this.handles[i])[0],(n===e.target||t.contains(n,e.target))&&(s=!0);return!this.options.disabled&&s},_mouseStart:function(e){var i,n,s,o=this.options,a=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),n=this._num(this.helper.css("top")),o.containment&&(i+=t(o.containment).scrollLeft()||0,n+=t(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:n},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:a.width(),height:a.height()},this.originalSize=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:a.width(),height:a.height()},this.sizeDiff={width:a.outerWidth()-a.width(),height:a.outerHeight()-a.height()},this.originalPosition={left:i,top:n},this.originalMousePosition={left:e.pageX,top:e.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,s=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===s?this.axis+"-resize":s),a.addClass("ui-resizable-resizing"),this._propagate("start",e),!0},_mouseDrag:function(e){var i,n,s=this.originalMousePosition,o=this.axis,a=e.pageX-s.left||0,r=e.pageY-s.top||0,l=this._change[o];return this._updatePrevProperties(),l?(i=l.apply(this,[e,a,r]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),n=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(n)||(this._updatePrevProperties(),this._trigger("resize",e,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,n,s,o,a,r,l,h=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,n=i.length&&/textarea/i.test(i[0].nodeName),s=n&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,o=n?0:u.sizeDiff.width,a={width:u.helper.width()-o,height:u.helper.height()-s},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,l=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,h.animate||this.element.css(t.extend(a,{top:l,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!h.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var e,i,n,s,o,a=this.options;o={minWidth:this._isNumber(a.minWidth)?a.minWidth:0,maxWidth:this._isNumber(a.maxWidth)?a.maxWidth:1/0,minHeight:this._isNumber(a.minHeight)?a.minHeight:0,maxHeight:this._isNumber(a.maxHeight)?a.maxHeight:1/0},(this._aspectRatio||t)&&(e=o.minHeight*this.aspectRatio,n=o.minWidth/this.aspectRatio,i=o.maxHeight*this.aspectRatio,s=o.maxWidth/this.aspectRatio,e>o.minWidth&&(o.minWidth=e),n>o.minHeight&&(o.minHeight=n),i<o.maxWidth&&(o.maxWidth=i),s<o.maxHeight&&(o.maxHeight=s)),this._vBoundaries=o},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,n=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===n&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===n&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,n=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,s=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,o=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,a=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,r=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,h=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return o&&(t.width=e.minWidth),a&&(t.height=e.minHeight),n&&(t.width=e.maxWidth),s&&(t.height=e.maxHeight),o&&h&&(t.left=r-e.minWidth),n&&h&&(t.left=r-e.maxWidth),a&&u&&(t.top=l-e.minHeight),s&&u&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],n=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],s=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];4>e;e++)i[e]=parseInt(n[e],10)||0,i[e]+=parseInt(s[e],10)||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;e<this._proportionallyResizeElements.length;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,n=this.originalPosition;return{left:n.left+e,width:i.width-e}},n:function(t,e,i){var n=this.originalSize,s=this.originalPosition;return{top:s.top+i,height:n.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,n){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,n]))},sw:function(e,i,n){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,n]))},ne:function(e,i,n){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,n]))},nw:function(e,i,n){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,n]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).resizable("instance"),n=i.options,s=i._proportionallyResizeElements,o=s.length&&/textarea/i.test(s[0].nodeName),a=o&&i._hasScroll(s[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,l={width:i.size.width-r,height:i.size.height-a},h=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(l,u&&h?{top:u,left:h}:{}),{duration:n.animateDuration,easing:n.animateEasing,step:function(){var n={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};s&&s.length&&t(s[0]).css({width:n.width,height:n.height}),i._updateCache(n),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var e,i,n,s,o,a,r,l=t(this).resizable("instance"),h=l.options,u=l.element,c=h.containment,d=c instanceof t?c.get(0):/parent/.test(c)?u.parent().get(0):c;d&&(l.containerElement=t(d),/document/.test(c)||c===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(e=t(d),i=[],t(["Top","Right","Left","Bottom"]).each(function(t,n){i[t]=l._num(e.css("padding"+n))}),l.containerOffset=e.offset(),l.containerPosition=e.position(),l.containerSize={height:e.innerHeight()-i[3],width:e.innerWidth()-i[1]},n=l.containerOffset,s=l.containerSize.height,o=l.containerSize.width,a=l._hasScroll(d,"left")?d.scrollWidth:o,r=l._hasScroll(d)?d.scrollHeight:s,l.parentData={element:d,left:n.left,top:n.top,width:a,height:r}))},resize:function(e){var i,n,s,o,a=t(this).resizable("instance"),r=a.options,l=a.containerOffset,h=a.position,u=a._aspectRatio||e.shiftKey,c={top:0,left:0},d=a.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(c=l),h.left<(a._helper?l.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-l.left:a.position.left-c.left),u&&(a.size.height=a.size.width/a.aspectRatio,p=!1),a.position.left=r.helper?l.left:0),h.top<(a._helper?l.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-l.top:a.position.top),u&&(a.size.width=a.size.height*a.aspectRatio,p=!1),a.position.top=a._helper?l.top:0),s=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),s&&o?(a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top):(a.offset.left=a.element.offset().left,a.offset.top=a.element.offset().top),i=Math.abs(a.sizeDiff.width+(a._helper?a.offset.left-c.left:a.offset.left-l.left)),n=Math.abs(a.sizeDiff.height+(a._helper?a.offset.top-c.top:a.offset.top-l.top)),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,u&&(a.size.height=a.size.width/a.aspectRatio,p=!1)),n+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-n,u&&(a.size.width=a.size.height*a.aspectRatio,p=!1)),p||(a.position.left=a.prevPosition.left,a.position.top=a.prevPosition.top,a.size.width=a.prevSize.width,a.size.height=a.prevSize.height)},stop:function(){var e=t(this).resizable("instance"),i=e.options,n=e.containerOffset,s=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),l=a.outerWidth()-e.sizeDiff.width,h=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-s.left-n.left,width:l,height:h}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-s.left-n.left,width:l,height:h})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).resizable("instance"),i=e.options,n=function(e){t(e).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseInt(e.width(),10),height:parseInt(e.height(),10),left:parseInt(e.css("left"),10),top:parseInt(e.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?n(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],n(i.alsoResize)):t.each(i.alsoResize,function(t){n(t)})},resize:function(e,i){var n=t(this).resizable("instance"),s=n.options,o=n.originalSize,a=n.originalPosition,r={height:n.size.height-o.height||0,width:n.size.width-o.width||0,top:n.position.top-a.top||0,left:n.position.left-a.left||0},l=function(e,n){t(e).each(function(){var e=t(this),s=t(this).data("ui-resizable-alsoresize"),o={},a=n&&n.length?n:e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(a,function(t,e){var i=(s[e]||0)+(r[e]||0);i&&i>=0&&(o[e]=i||null)}),e.css(o)})};"object"!=typeof s.alsoResize||s.alsoResize.nodeType?l(s.alsoResize):t.each(s.alsoResize,function(t,e){l(t,e)})},stop:function(){t(this).removeData("resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).resizable("instance"),i=e.options,n=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:n.height,width:n.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).resizable("instance");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).resizable("instance");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e,i=t(this).resizable("instance"),n=i.options,s=i.size,o=i.originalSize,a=i.originalPosition,r=i.axis,l="number"==typeof n.grid?[n.grid,n.grid]:n.grid,h=l[0]||1,u=l[1]||1,c=Math.round((s.width-o.width)/h)*h,d=Math.round((s.height-o.height)/u)*u,p=o.width+c,f=o.height+d,m=n.maxWidth&&n.maxWidth<p,g=n.maxHeight&&n.maxHeight<f,v=n.minWidth&&n.minWidth>p,y=n.minHeight&&n.minHeight>f;
    n.grid=l,v&&(p+=h),y&&(f+=u),m&&(p-=h),g&&(f-=u),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=a.top-d):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=a.left-c):((0>=f-u||0>=p-h)&&(e=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=a.top-d):(f=u-e.height,i.size.height=f,i.position.top=a.top+o.height-f),p-h>0?(i.size.width=p,i.position.left=a.left-c):(p=u-e.height,i.size.width=p,i.position.left=a.left+o.width-p))}}),t.ui.resizable}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./button","./draggable","./mouse","./position","./resizable"],t):t(jQuery)}(function(t){return t.widget("ui.dialog",{version:"1.11.2",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i,n=this;if(this._isOpen&&this._trigger("beforeClose",e)!==!1){if(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length)try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&t(i).blur()}catch(s){}this._hide(this.uiDialog,this.options.hide,function(){n._trigger("close",e)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(e,i){var n=!1,s=this.uiDialog.siblings(".ui-front:visible").map(function(){return+t(this).css("z-index")}).get(),o=Math.max.apply(null,s);return o>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",o+1),n=!0),n&&!i&&this._trigger("focus",e),n},open:function(){var e=this;return this._isOpen?void(this._moveToTop()&&this._focusTabbable()):(this._isOpen=!0,this.opener=t(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._makeFocusTarget(),void this._trigger("open"))},_focusTabbable:function(){var t=this._focusedElement;t||(t=this.element.find("[autofocus]")),t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).focus()},_keepFocus:function(e){function i(){var e=this.document[0].activeElement,i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),void this.close(e);if(e.keyCode===t.ui.keyCode.TAB&&!e.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),n=i.filter(":first"),s=i.filter(":last");e.target!==s[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==n[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(this._delay(function(){s.focus()}),e.preventDefault()):(this._delay(function(){n.focus()}),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=t("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(e),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title||t.html("&#160;"),t.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?void this.uiDialog.removeClass("ui-dialog-buttons"):(t.each(i,function(i,n){var s,o;n=t.isFunction(n)?{click:n,text:i}:n,n=t.extend({type:"button"},n),s=n.click,n.click=function(){s.apply(e.element[0],arguments)},o={icons:n.icons,text:n.showText},delete n.icons,delete n.showText,t("<button></button>",n).button(o).appendTo(e.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),void this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,n=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(n,s){t(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",n,e(s))},drag:function(t,n){i._trigger("drag",t,e(n))},stop:function(s,o){var a=o.offset.left-i.document.scrollLeft(),r=o.offset.top-i.document.scrollTop();n.position={my:"left top",at:"left"+(a>=0?"+":"")+a+" top"+(r>=0?"+":"")+r,of:i.window},t(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",s,e(o))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,n=this.options,s=n.resizable,o=this.uiDialog.css("position"),a="string"==typeof s?s:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:n.maxWidth,maxHeight:n.maxHeight,minWidth:n.minWidth,minHeight:this._minHeight(),handles:a,start:function(n,s){t(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",n,e(s))},resize:function(t,n){i._trigger("resize",t,e(n))},stop:function(s,o){var a=i.uiDialog.offset(),r=a.left-i.document.scrollLeft(),l=a.top-i.document.scrollTop();n.height=i.uiDialog.height(),n.width=i.uiDialog.width(),n.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" top"+(l>=0?"+":"")+l,of:i.window},t(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",s,e(o))}}).css("position",o)},_trackFocus:function(){this._on(this.widget(),{focusin:function(e){this._makeFocusTarget(),this._focusedElement=t(e.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var e=this._trackingInstances(),i=t.inArray(this,e);-1!==i&&e.splice(i,1)},_trackingInstances:function(){var t=this.document.data("ui-dialog-instances");return t||(t=[],this.document.data("ui-dialog-instances",t)),t},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(e){var i=this,n=!1,s={};t.each(e,function(t,e){i._setOption(t,e),t in i.sizeRelatedOptions&&(n=!0),t in i.resizableRelatedOptions&&(s[t]=e)}),n&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(t,e){var i,n,s=this.uiDialog;"dialogClass"===t&&s.removeClass(this.options.dialogClass).addClass(e),"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:""+e}),"draggable"===t&&(i=s.is(":data(ui-draggable)"),i&&!e&&s.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(n=s.is(":data(ui-resizable)"),n&&!e&&s.resizable("destroy"),n&&"string"==typeof e&&s.resizable("option","handles",e),n||e===!1||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,n=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),n.minWidth>n.width&&(n.width=n.minWidth),t=this.uiDialog.css({height:"auto",width:n.width}).outerHeight(),e=Math.max(0,n.minHeight-t),i="number"==typeof n.maxHeight?Math.max(0,n.maxHeight-t):"none","auto"===n.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,n.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=!0;this._delay(function(){e=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(t){e||this._allowInteraction(t)||(t.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var t=this.document.data("ui-dialog-overlays")-1;t?this.document.data("ui-dialog-overlays",t):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null}}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./mouse","./draggable"],t):t(jQuery)}(function(t){return t.widget("ui.droppable",{version:"1.11.2",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,n=i.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(n)?n:function(t){return t.is(n)},this.proportions=function(){return arguments.length?void(e=arguments[0]):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(e){t.ui.ddmanager.droppables[e]=t.ui.ddmanager.droppables[e]||[],t.ui.ddmanager.droppables[e].push(this)},_splice:function(t){for(var e=0;e<t.length;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var e=t.ui.ddmanager.droppables[this.options.scope];this._splice(e),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(e,i){if("accept"===e)this.accept=t.isFunction(i)?i:function(t){return t.is(i)};else if("scope"===e){var n=t.ui.ddmanager.droppables[this.options.scope];this._splice(n),this._addToManager(i)}this._super(e,i)},_activate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var n=i||t.ui.ddmanager.current,s=!1;return n&&(n.currentItem||n.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=t(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===n.options.scope&&i.accept.call(i.element[0],n.currentItem||n.element)&&t.ui.intersect(n,t.extend(i,{offset:i.element.offset()}),i.options.tolerance,e)?(s=!0,!1):void 0}),s?!1:this.accept.call(this.element[0],n.currentItem||n.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",e,this.ui(n)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}}}),t.ui.intersect=function(){function t(t,e,i){return t>=e&&e+i>t}return function(e,i,n,s){if(!i.offset)return!1;var o=(e.positionAbs||e.position.absolute).left+e.margins.left,a=(e.positionAbs||e.position.absolute).top+e.margins.top,r=o+e.helperProportions.width,l=a+e.helperProportions.height,h=i.offset.left,u=i.offset.top,c=h+i.proportions().width,d=u+i.proportions().height;switch(n){case"fit":return o>=h&&c>=r&&a>=u&&d>=l;case"intersect":return h<o+e.helperProportions.width/2&&r-e.helperProportions.width/2<c&&u<a+e.helperProportions.height/2&&l-e.helperProportions.height/2<d;case"pointer":return t(s.pageY,u,i.proportions().height)&&t(s.pageX,h,i.proportions().width);case"touch":return(a>=u&&d>=a||l>=u&&d>=l||u>a&&l>d)&&(o>=h&&c>=o||r>=h&&c>=r||h>o&&r>c);default:return!1}}}(),t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var n,s,o=t.ui.ddmanager.droppables[e.options.scope]||[],a=i?i.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(n=0;n<o.length;n++)if(!(o[n].options.disabled||e&&!o[n].accept.call(o[n].element[0],e.currentItem||e.element))){for(s=0;s<r.length;s++)if(r[s]===o[n].element[0]){o[n].proportions().height=0;continue t}o[n].visible="none"!==o[n].element.css("display"),o[n].visible&&("mousedown"===a&&o[n]._activate.call(o[n],i),o[n].offset=o[n].element.offset(),o[n].proportions({width:o[n].element[0].offsetWidth,height:o[n].element[0].offsetHeight}))}},drop:function(e,i){var n=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&t.ui.intersect(e,this,this.options.tolerance,i)&&(n=this._drop.call(this,i)||n),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),n},dragStart:function(e,i){e.element.parentsUntil("body").bind("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var n,s,o,a=t.ui.intersect(e,this,this.options.tolerance,i),r=!a&&this.isover?"isout":a&&!this.isover?"isover":null;r&&(this.options.greedy&&(s=this.options.scope,o=this.element.parents(":data(ui-droppable)").filter(function(){return t(this).droppable("instance").options.scope===s}),o.length&&(n=t(o[0]).droppable("instance"),n.greedyChild="isover"===r)),n&&"isover"===r&&(n.isover=!1,n.isout=!0,n._out.call(n,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),n&&"isout"===r&&(n.isout=!1,n.isover=!0,n._over.call(n,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").unbind("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}},t.ui.droppable}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){var e="ui-effects-",i=t;return t.effects={effect:{}},function(t,e){function i(t,e,i){var n=c[e.type]||{};return null==t?i||!e.def?null:e.def:(t=n.floor?~~t:parseFloat(t),isNaN(t)?e.def:n.mod?(t+n.mod)%n.mod:0>t?0:n.max<t?n.max:t)}function n(e){var i=h(),n=i._rgba=[];return e=e.toLowerCase(),f(l,function(t,s){var o,a=s.re.exec(e),r=a&&s.parse(a),l=s.space||"rgba";return r?(o=i[l](r),i[u[l].cache]=o[u[l].cache],n=i._rgba=o._rgba,!1):void 0}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),i):o[e]}function s(t,e,i){return i=(i+1)%1,1>6*i?t+(e-t)*i*6:1>2*i?e:2>3*i?t+(e-t)*(2/3-i)*6:t}var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,l=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],h=t.Color=function(e,i,n,s){return new t.Color.fn.parse(e,i,n,s)},u={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},c={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=h.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(u,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),h.fn=t.extend(h.prototype,{parse:function(s,a,r,l){if(s===e)return this._rgba=[null,null,null,null],this;(s.jquery||s.nodeType)&&(s=t(s).css(a),a=e);var c=this,d=t.type(s),p=this._rgba=[];return a!==e&&(s=[s,a,r,l],d="array"),"string"===d?this.parse(n(s)||o._default):"array"===d?(f(u.rgba.props,function(t,e){p[e.idx]=i(s[e.idx],e)}),this):"object"===d?(s instanceof h?f(u,function(t,e){s[e.cache]&&(c[e.cache]=s[e.cache].slice())}):f(u,function(e,n){var o=n.cache;f(n.props,function(t,e){if(!c[o]&&n.to){if("alpha"===t||null==s[t])return;c[o]=n.to(c._rgba)}c[o][e.idx]=i(s[t],e,!0)}),c[o]&&t.inArray(null,c[o].slice(0,3))<0&&(c[o][3]=1,n.from&&(c._rgba=n.from(c[o])))}),this):void 0},is:function(t){var e=h(t),i=!0,n=this;return f(u,function(t,s){var o,a=e[s.cache];return a&&(o=n[s.cache]||s.to&&s.to(n._rgba)||[],f(s.props,function(t,e){return null!=a[e.idx]?i=a[e.idx]===o[e.idx]:void 0})),i}),i},_space:function(){var t=[],e=this;return f(u,function(i,n){e[n.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var n=h(t),s=n._space(),o=u[s],a=0===this.alpha()?h("transparent"):this,r=a[o.cache]||o.to(a._rgba),l=r.slice();return n=n[o.cache],f(o.props,function(t,s){var o=s.idx,a=r[o],h=n[o],u=c[s.type]||{};null!==h&&(null===a?l[o]=h:(u.mod&&(h-a>u.mod/2?a+=u.mod:a-h>u.mod/2&&(a-=u.mod)),l[o]=i((h-a)*e+a,s)))}),this[s](l)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),n=i.pop(),s=h(e)._rgba;return h(t.map(i,function(t,e){return(1-n)*s[e]+n*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),n=i.pop();return e&&i.push(~~(255*n)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),h.fn.parse.prototype=h.fn,u.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,n=t[0]/255,s=t[1]/255,o=t[2]/255,a=t[3],r=Math.max(n,s,o),l=Math.min(n,s,o),h=r-l,u=r+l,c=.5*u;return e=l===r?0:n===r?60*(s-o)/h+360:s===r?60*(o-n)/h+120:60*(n-s)/h+240,i=0===h?0:.5>=c?h/u:h/(2-u),[Math.round(e)%360,i,c,null==a?1:a]},u.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],n=t[2],o=t[3],a=.5>=n?n*(1+i):n+i-n*i,r=2*n-a;return[Math.round(255*s(r,a,e+1/3)),Math.round(255*s(r,a,e)),Math.round(255*s(r,a,e-1/3)),o]},f(u,function(n,s){var o=s.props,a=s.cache,l=s.to,u=s.from;h.fn[n]=function(n){if(l&&!this[a]&&(this[a]=l(this._rgba)),n===e)return this[a].slice();var s,r=t.type(n),c="array"===r||"object"===r?n:arguments,d=this[a].slice();return f(o,function(t,e){var n=c["object"===r?t:e.idx];null==n&&(n=d[e.idx]),d[e.idx]=i(n,e)}),u?(s=h(u(d)),s[a]=d,s):h(d)},f(o,function(e,i){h.fn[e]||(h.fn[e]=function(s){var o,a=t.type(s),l="alpha"===e?this._hsla?"hsla":"rgba":n,h=this[l](),u=h[i.idx];return"undefined"===a?u:("function"===a&&(s=s.call(this,u),a=t.type(s)),null==s&&i.empty?this:("string"===a&&(o=r.exec(s),o&&(s=u+parseFloat(o[2])*("+"===o[1]?1:-1))),h[i.idx]=s,this[l](h)))})})}),h.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,s){var o,a,r="";if("transparent"!==s&&("string"!==t.type(s)||(o=n(s)))){if(s=h(o||s),!d.rgba&&1!==s._rgba[3]){for(a="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&a&&a.style;)try{r=t.css(a,"backgroundColor"),a=a.parentNode}catch(l){}s=s.blend(r&&"transparent"!==r?r:"_default")}s=s.toRgbaString()}try{e.style[i]=s}catch(l){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=h(e.elem,i),e.end=h(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},h.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,n){e["border"+n+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(i),function(){function e(e){var i,n,s=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(s&&s.length&&s[0]&&s[s[0]])for(n=s.length;n--;)i=s[n],"string"==typeof s[i]&&(o[t.camelCase(i)]=s[i]);else for(i in s)"string"==typeof s[i]&&(o[i]=s[i]);return o}function n(e,i){var n,s,a={};for(n in i)s=i[n],e[n]!==s&&(o[n]||(t.fx.step[n]||!isNaN(parseFloat(s)))&&(a[n]=s));return a}var s=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,n){t.fx.step[n]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(i.style(t.elem,n,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(i,o,a,r){var l=t.speed(o,a,r);return this.queue(function(){var o,a=t(this),r=a.attr("class")||"",h=l.children?a.find("*").addBack():a;h=h.map(function(){var i=t(this);return{el:i,start:e(this)}}),o=function(){t.each(s,function(t,e){i[e]&&a[e+"Class"](i[e])})},o(),h=h.map(function(){return this.end=e(this.el[0]),this.diff=n(this.start,this.end),this}),a.attr("class",r),h=h.map(function(){var e=this,i=t.Deferred(),n=t.extend({},l,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,n),i.promise()}),t.when.apply(t,h.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),l.complete.call(a[0])})})},t.fn.extend({addClass:function(e){return function(i,n,s,o){return n?t.effects.animateClass.call(this,{add:i},n,s,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,n,s,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},n,s,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(i,n,s,o,a){return"boolean"==typeof n||void 0===n?s?t.effects.animateClass.call(this,n?{add:i}:{remove:i},s,o,a):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:i},n,s,o)}}(t.fn.toggleClass),switchClass:function(e,i,n,s,o){return t.effects.animateClass.call(this,{add:i,remove:e},n,s,o)}})}(),function(){function i(e,i,n,s){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(s=i,n=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(s=n,n=i,i={}),t.isFunction(n)&&(s=n,n=null),i&&t.extend(e,i),n=n||i.duration,e.duration=t.fx.off?0:"number"==typeof n?n:n in t.fx.speeds?t.fx.speeds[n]:t.fx.speeds._default,e.complete=s||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}t.extend(t.effects,{version:"1.11.2",save:function(t,i){for(var n=0;n<i.length;n++)null!==i[n]&&t.data(e+i[n],t[0].style[i[n]])},restore:function(t,i){var n,s;for(s=0;s<i.length;s++)null!==i[s]&&(n=t.data(e+i[s]),void 0===n&&(n=""),t.css(i[s],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,n;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":n=0;break;case"center":n=.5;break;case"right":n=1;break;default:n=t[1]/e.width}return{x:n,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},n=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),s={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(a){o=document.body}return e.wrap(n),(e[0]===o||t.contains(e[0],o))&&t(o).focus(),n=e.parent(),"static"===e.css("position")?(n.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,n){i[n]=e.css(n),isNaN(parseInt(i[n],10))&&(i[n]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(s),n.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,n,s){return s=s||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(s[i]=o[0]*n+o[1])}),s}}),t.fn.extend({effect:function(){function e(e){function i(){t.isFunction(o)&&o.call(s[0]),t.isFunction(e)&&e()}var s=t(this),o=n.complete,r=n.mode;(s.is(":hidden")?"hide"===r:"show"===r)?(s[r](),i()):a.call(s[0],n,i)}var n=i.apply(this,arguments),s=n.mode,o=n.queue,a=t.effects.effect[n.effect];return t.fx.off||!a?s?this[s](n.duration,n.complete):this.each(function(){n.complete&&n.complete.call(this)}):o===!1?this.each(e):this.queue(o||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var s=i.apply(this,arguments);return s.mode="show",this.effect.call(this,s)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var s=i.apply(this,arguments);return s.mode="hide",this.effect.call(this,s)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var s=i.apply(this,arguments);return s.mode="toggle",this.effect.call(this,s)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),n=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(n=[parseFloat(i),e])}),n}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;t<((e=Math.pow(2,--i))-1)/11;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}(),t.effects}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.blind=function(e,i){var n,s,o,a=t(this),r=/up|down|vertical/,l=/up|left|vertical|horizontal/,h=["position","top","bottom","left","right","height","width"],u=t.effects.setMode(a,e.mode||"hide"),c=e.direction||"up",d=r.test(c),p=d?"height":"width",f=d?"top":"left",m=l.test(c),g={},v="show"===u;a.parent().is(".ui-effects-wrapper")?t.effects.save(a.parent(),h):t.effects.save(a,h),a.show(),n=t.effects.createWrapper(a).css({overflow:"hidden"}),s=n[p](),o=parseFloat(n.css(f))||0,g[p]=v?s:0,m||(a.css(d?"bottom":"right",0).css(d?"top":"left","auto").css({position:"absolute"}),g[f]=v?o:s+o),v&&(n.css(p,0),m||n.css(f,o+s)),n.animate(g,{duration:e.duration,easing:e.easing,queue:!1,complete:function(){"hide"===u&&a.hide(),t.effects.restore(a,h),t.effects.removeWrapper(a),i()}})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.bounce=function(e,i){var n,s,o,a=t(this),r=["position","top","bottom","left","right","height","width"],l=t.effects.setMode(a,e.mode||"effect"),h="hide"===l,u="show"===l,c=e.direction||"up",d=e.distance,p=e.times||5,f=2*p+(u||h?1:0),m=e.duration/f,g=e.easing,v="up"===c||"down"===c?"top":"left",y="up"===c||"left"===c,b=a.queue(),_=b.length;
    for((u||h)&&r.push("opacity"),t.effects.save(a,r),a.show(),t.effects.createWrapper(a),d||(d=a["top"===v?"outerHeight":"outerWidth"]()/3),u&&(o={opacity:1},o[v]=0,a.css("opacity",0).css(v,y?2*-d:2*d).animate(o,m,g)),h&&(d/=Math.pow(2,p-1)),o={},o[v]=0,n=0;p>n;n++)s={},s[v]=(y?"-=":"+=")+d,a.animate(s,m,g).animate(o,m,g),d=h?2*d:d/2;h&&(s={opacity:0},s[v]=(y?"-=":"+=")+d,a.animate(s,m,g)),a.queue(function(){h&&a.hide(),t.effects.restore(a,r),t.effects.removeWrapper(a),i()}),_>1&&b.splice.apply(b,[1,0].concat(b.splice(_,f+1))),a.dequeue()}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.clip=function(e,i){var n,s,o,a=t(this),r=["position","top","bottom","left","right","height","width"],l=t.effects.setMode(a,e.mode||"hide"),h="show"===l,u=e.direction||"vertical",c="vertical"===u,d=c?"height":"width",p=c?"top":"left",f={};t.effects.save(a,r),a.show(),n=t.effects.createWrapper(a).css({overflow:"hidden"}),s="IMG"===a[0].tagName?n:a,o=s[d](),h&&(s.css(d,0),s.css(p,o/2)),f[d]=h?o:0,f[p]=h?0:o/2,s.animate(f,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){h||a.hide(),t.effects.restore(a,r),t.effects.removeWrapper(a),i()}})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.drop=function(e,i){var n,s=t(this),o=["position","top","bottom","left","right","opacity","height","width"],a=t.effects.setMode(s,e.mode||"hide"),r="show"===a,l=e.direction||"left",h="up"===l||"down"===l?"top":"left",u="up"===l||"left"===l?"pos":"neg",c={opacity:r?1:0};t.effects.save(s,o),s.show(),t.effects.createWrapper(s),n=e.distance||s["top"===h?"outerHeight":"outerWidth"](!0)/2,r&&s.css("opacity",0).css(h,"pos"===u?-n:n),c[h]=(r?"pos"===u?"+=":"-=":"pos"===u?"-=":"+=")+n,s.animate(c,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&s.hide(),t.effects.restore(s,o),t.effects.removeWrapper(s),i()}})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.explode=function(e,i){function n(){b.push(this),b.length===c*d&&s()}function s(){p.css({visibility:"visible"}),t(b).remove(),m||p.hide(),i()}var o,a,r,l,h,u,c=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=c,p=t(this),f=t.effects.setMode(p,e.mode||"hide"),m="show"===f,g=p.show().css("visibility","hidden").offset(),v=Math.ceil(p.outerWidth()/d),y=Math.ceil(p.outerHeight()/c),b=[];for(o=0;c>o;o++)for(l=g.top+o*y,u=o-(c-1)/2,a=0;d>a;a++)r=g.left+a*v,h=a-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-a*v,top:-o*y}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:y,left:r+(m?h*v:0),top:l+(m?u*y:0),opacity:m?0:1}).animate({left:r+(m?0:h*v),top:l+(m?0:u*y),opacity:m?1:0},e.duration||500,e.easing,n)}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.fade=function(e,i){var n=t(this),s=t.effects.setMode(n,e.mode||"toggle");n.animate({opacity:s},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.fold=function(e,i){var n,s,o=t(this),a=["position","top","bottom","left","right","height","width"],r=t.effects.setMode(o,e.mode||"hide"),l="show"===r,h="hide"===r,u=e.size||15,c=/([0-9]+)%/.exec(u),d=!!e.horizFirst,p=l!==d,f=p?["width","height"]:["height","width"],m=e.duration/2,g={},v={};t.effects.save(o,a),o.show(),n=t.effects.createWrapper(o).css({overflow:"hidden"}),s=p?[n.width(),n.height()]:[n.height(),n.width()],c&&(u=parseInt(c[1],10)/100*s[h?0:1]),l&&n.css(d?{height:0,width:u}:{height:u,width:0}),g[f[0]]=l?s[0]:u,v[f[1]]=l?s[1]:0,n.animate(g,m,e.easing).animate(v,m,e.easing,function(){h&&o.hide(),t.effects.restore(o,a),t.effects.removeWrapper(o),i()})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.highlight=function(e,i){var n=t(this),s=["backgroundImage","backgroundColor","opacity"],o=t.effects.setMode(n,e.mode||"show"),a={backgroundColor:n.css("backgroundColor")};"hide"===o&&(a.opacity=0),t.effects.save(n,s),n.show().css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(a,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===o&&n.hide(),t.effects.restore(n,s),i()}})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.size=function(e,i){var n,s,o,a=t(this),r=["position","top","bottom","left","right","width","height","overflow","opacity"],l=["position","top","bottom","left","right","overflow","opacity"],h=["width","height","overflow"],u=["fontSize"],c=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],d=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],p=t.effects.setMode(a,e.mode||"effect"),f=e.restore||"effect"!==p,m=e.scale||"both",g=e.origin||["middle","center"],v=a.css("position"),y=f?r:l,b={height:0,width:0,outerHeight:0,outerWidth:0};"show"===p&&a.show(),n={height:a.height(),width:a.width(),outerHeight:a.outerHeight(),outerWidth:a.outerWidth()},"toggle"===e.mode&&"show"===p?(a.from=e.to||b,a.to=e.from||n):(a.from=e.from||("show"===p?b:n),a.to=e.to||("hide"===p?b:n)),o={from:{y:a.from.height/n.height,x:a.from.width/n.width},to:{y:a.to.height/n.height,x:a.to.width/n.width}},("box"===m||"both"===m)&&(o.from.y!==o.to.y&&(y=y.concat(c),a.from=t.effects.setTransition(a,c,o.from.y,a.from),a.to=t.effects.setTransition(a,c,o.to.y,a.to)),o.from.x!==o.to.x&&(y=y.concat(d),a.from=t.effects.setTransition(a,d,o.from.x,a.from),a.to=t.effects.setTransition(a,d,o.to.x,a.to))),("content"===m||"both"===m)&&o.from.y!==o.to.y&&(y=y.concat(u).concat(h),a.from=t.effects.setTransition(a,u,o.from.y,a.from),a.to=t.effects.setTransition(a,u,o.to.y,a.to)),t.effects.save(a,y),a.show(),t.effects.createWrapper(a),a.css("overflow","hidden").css(a.from),g&&(s=t.effects.getBaseline(g,n),a.from.top=(n.outerHeight-a.outerHeight())*s.y,a.from.left=(n.outerWidth-a.outerWidth())*s.x,a.to.top=(n.outerHeight-a.to.outerHeight)*s.y,a.to.left=(n.outerWidth-a.to.outerWidth)*s.x),a.css(a.from),("content"===m||"both"===m)&&(c=c.concat(["marginTop","marginBottom"]).concat(u),d=d.concat(["marginLeft","marginRight"]),h=r.concat(c).concat(d),a.find("*[width]").each(function(){var i=t(this),n={height:i.height(),width:i.width(),outerHeight:i.outerHeight(),outerWidth:i.outerWidth()};f&&t.effects.save(i,h),i.from={height:n.height*o.from.y,width:n.width*o.from.x,outerHeight:n.outerHeight*o.from.y,outerWidth:n.outerWidth*o.from.x},i.to={height:n.height*o.to.y,width:n.width*o.to.x,outerHeight:n.height*o.to.y,outerWidth:n.width*o.to.x},o.from.y!==o.to.y&&(i.from=t.effects.setTransition(i,c,o.from.y,i.from),i.to=t.effects.setTransition(i,c,o.to.y,i.to)),o.from.x!==o.to.x&&(i.from=t.effects.setTransition(i,d,o.from.x,i.from),i.to=t.effects.setTransition(i,d,o.to.x,i.to)),i.css(i.from),i.animate(i.to,e.duration,e.easing,function(){f&&t.effects.restore(i,h)})})),a.animate(a.to,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){0===a.to.opacity&&a.css("opacity",a.from.opacity),"hide"===p&&a.hide(),t.effects.restore(a,y),f||("static"===v?a.css({position:"relative",top:a.to.top,left:a.to.left}):t.each(["top","left"],function(t,e){a.css(e,function(e,i){var n=parseInt(i,10),s=t?a.to.left:a.to.top;return"auto"===i?s+"px":n+s+"px"})})),t.effects.removeWrapper(a),i()}})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect","./effect-size"],t):t(jQuery)}(function(t){return t.effects.effect.scale=function(e,i){var n=t(this),s=t.extend(!0,{},e),o=t.effects.setMode(n,e.mode||"effect"),a=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"hide"===o?0:100),r=e.direction||"both",l=e.origin,h={height:n.height(),width:n.width(),outerHeight:n.outerHeight(),outerWidth:n.outerWidth()},u={y:"horizontal"!==r?a/100:1,x:"vertical"!==r?a/100:1};s.effect="size",s.queue=!1,s.complete=i,"effect"!==o&&(s.origin=l||["middle","center"],s.restore=!0),s.from=e.from||("show"===o?{height:0,width:0,outerHeight:0,outerWidth:0}:h),s.to={height:h.height*u.y,width:h.width*u.x,outerHeight:h.outerHeight*u.y,outerWidth:h.outerWidth*u.x},s.fade&&("show"===o&&(s.from.opacity=0,s.to.opacity=1),"hide"===o&&(s.from.opacity=1,s.to.opacity=0)),n.effect(s)}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect","./effect-scale"],t):t(jQuery)}(function(t){return t.effects.effect.puff=function(e,i){var n=t(this),s=t.effects.setMode(n,e.mode||"hide"),o="hide"===s,a=parseInt(e.percent,10)||150,r=a/100,l={height:n.height(),width:n.width(),outerHeight:n.outerHeight(),outerWidth:n.outerWidth()};t.extend(e,{effect:"scale",queue:!1,fade:!0,mode:s,complete:i,percent:o?a:100,from:o?l:{height:l.height*r,width:l.width*r,outerHeight:l.outerHeight*r,outerWidth:l.outerWidth*r}}),n.effect(e)}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.pulsate=function(e,i){var n,s=t(this),o=t.effects.setMode(s,e.mode||"show"),a="show"===o,r="hide"===o,l=a||"hide"===o,h=2*(e.times||5)+(l?1:0),u=e.duration/h,c=0,d=s.queue(),p=d.length;for((a||!s.is(":visible"))&&(s.css("opacity",0).show(),c=1),n=1;h>n;n++)s.animate({opacity:c},u,e.easing),c=1-c;s.animate({opacity:c},u,e.easing),s.queue(function(){r&&s.hide(),i()}),p>1&&d.splice.apply(d,[1,0].concat(d.splice(p,h+1))),s.dequeue()}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.shake=function(e,i){var n,s=t(this),o=["position","top","bottom","left","right","height","width"],a=t.effects.setMode(s,e.mode||"effect"),r=e.direction||"left",l=e.distance||20,h=e.times||3,u=2*h+1,c=Math.round(e.duration/u),d="up"===r||"down"===r?"top":"left",p="up"===r||"left"===r,f={},m={},g={},v=s.queue(),y=v.length;for(t.effects.save(s,o),s.show(),t.effects.createWrapper(s),f[d]=(p?"-=":"+=")+l,m[d]=(p?"+=":"-=")+2*l,g[d]=(p?"-=":"+=")+2*l,s.animate(f,c,e.easing),n=1;h>n;n++)s.animate(m,c,e.easing).animate(g,c,e.easing);s.animate(m,c,e.easing).animate(f,c/2,e.easing).queue(function(){"hide"===a&&s.hide(),t.effects.restore(s,o),t.effects.removeWrapper(s),i()}),y>1&&v.splice.apply(v,[1,0].concat(v.splice(y,u+1))),s.dequeue()}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.slide=function(e,i){var n,s=t(this),o=["position","top","bottom","left","right","width","height"],a=t.effects.setMode(s,e.mode||"show"),r="show"===a,l=e.direction||"left",h="up"===l||"down"===l?"top":"left",u="up"===l||"left"===l,c={};t.effects.save(s,o),s.show(),n=e.distance||s["top"===h?"outerHeight":"outerWidth"](!0),t.effects.createWrapper(s).css({overflow:"hidden"}),r&&s.css(h,u?isNaN(n)?"-"+n:-n:n),c[h]=(r?u?"+=":"-=":u?"-=":"+=")+n,s.animate(c,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){"hide"===a&&s.hide(),t.effects.restore(s,o),t.effects.removeWrapper(s),i()}})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./effect"],t):t(jQuery)}(function(t){return t.effects.effect.transfer=function(e,i){var n=t(this),s=t(e.to),o="fixed"===s.css("position"),a=t("body"),r=o?a.scrollTop():0,l=o?a.scrollLeft():0,h=s.offset(),u={top:h.top-r,left:h.left-l,height:s.innerHeight(),width:s.innerWidth()},c=n.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({top:c.top-r,left:c.left-l,height:n.innerHeight(),width:n.innerWidth(),position:o?"fixed":"absolute"}).animate(u,e.duration,e.easing,function(){d.remove(),i()})}}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.progressbar",{version:"1.11.2",options:{max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min}),this.valueDiv=t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this._refreshValue()},_destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove()},value:function(t){return void 0===t?this.options.value:(this.options.value=this._constrainedValue(t),void this._refreshValue())},_constrainedValue:function(t){return void 0===t&&(t=this.options.value),this.indeterminate=t===!1,"number"!=typeof t&&(t=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,t))},_setOptions:function(t){var e=t.value;delete t.value,this._super(t),this.options.value=this._constrainedValue(e),this._refreshValue()},_setOption:function(t,e){"max"===t&&(e=Math.max(this.min,e)),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!e).attr("aria-disabled",e),this._super(t,e)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var e=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||e>this.min).toggleClass("ui-corner-right",e===this.options.max).width(i.toFixed(0)+"%"),this.element.toggleClass("ui-progressbar-indeterminate",this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=t("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":e}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),e===this.options.max&&this._trigger("complete")}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.selectable",t.ui.mouse,{version:"1.11.2",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e=t(i.options.filter,i.element[0]),e.addClass("ui-selectee"),e.each(function(){var e=t(this),i=e.offset();t.data(this,"selectable-item",{element:this,$element:e,left:i.left,top:i.top,right:i.left+e.outerWidth(),bottom:i.top+e.outerHeight(),startselected:!1,selected:e.hasClass("ui-selected"),selecting:e.hasClass("ui-selecting"),unselecting:e.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=e.addClass("ui-selectee"),this._mouseInit(),this.helper=t("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(e){var i=this,n=this.options;this.opos=[e.pageX,e.pageY],this.options.disabled||(this.selectees=t(n.filter,this.element[0]),this._trigger("start",e),t(n.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),n.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var n=t.data(this,"selectable-item");n.startselected=!0,e.metaKey||e.ctrlKey||(n.$element.removeClass("ui-selected"),n.selected=!1,n.$element.addClass("ui-unselecting"),n.unselecting=!0,i._trigger("unselecting",e,{unselecting:n.element}))}),t(e.target).parents().addBack().each(function(){var n,s=t.data(this,"selectable-item");return s?(n=!e.metaKey&&!e.ctrlKey||!s.$element.hasClass("ui-selected"),s.$element.removeClass(n?"ui-unselecting":"ui-selected").addClass(n?"ui-selecting":"ui-unselecting"),s.unselecting=!n,s.selecting=n,s.selected=n,n?i._trigger("selecting",e,{selecting:s.element}):i._trigger("unselecting",e,{unselecting:s.element}),!1):void 0}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var i,n=this,s=this.options,o=this.opos[0],a=this.opos[1],r=e.pageX,l=e.pageY;return o>r&&(i=r,r=o,o=i),a>l&&(i=l,l=a,a=i),this.helper.css({left:o,top:a,width:r-o,height:l-a}),this.selectees.each(function(){var i=t.data(this,"selectable-item"),h=!1;i&&i.element!==n.element[0]&&("touch"===s.tolerance?h=!(i.left>r||i.right<o||i.top>l||i.bottom<a):"fit"===s.tolerance&&(h=i.left>o&&i.right<r&&i.top>a&&i.bottom<l),h?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,n._trigger("selecting",e,{selecting:i.element}))):(i.selecting&&((e.metaKey||e.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),n._trigger("unselecting",e,{unselecting:i.element}))),i.selected&&(e.metaKey||e.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,n._trigger("unselecting",e,{unselecting:i.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,t(".ui-unselecting",this.element[0]).each(function(){var n=t.data(this,"selectable-item");n.$element.removeClass("ui-unselecting"),n.unselecting=!1,n.startselected=!1,i._trigger("unselected",e,{unselected:n.element})}),t(".ui-selecting",this.element[0]).each(function(){var n=t.data(this,"selectable-item");n.$element.removeClass("ui-selecting").addClass("ui-selected"),n.selecting=!1,n.selected=!0,n.startselected=!0,i._trigger("selected",e,{selected:n.element})}),this._trigger("stop",e),this.helper.remove(),!1}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position","./menu"],t):t(jQuery)}(function(t){return t.widget("ui.selectmenu",{version:"1.11.2",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null,change:null,close:null,focus:null,open:null,select:null},_create:function(){var t=this.element.uniqueId().attr("id");this.ids={element:t,button:t+"-button",menu:t+"-menu"},this._drawButton(),this._drawMenu(),this.options.disabled&&this.disable()},_drawButton:function(){var e=this,i=this.element.attr("tabindex");this.label=t("label[for='"+this.ids.element+"']").attr("for",this.ids.button),this._on(this.label,{click:function(t){this.button.focus(),t.preventDefault()}}),this.element.hide(),this.button=t("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:i||this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element),t("<span>",{"class":"ui-icon "+this.options.icons.button}).prependTo(this.button),this.buttonText=t("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button),this._setText(this.buttonText,this.element.find("option:selected").text()),this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){e.menuItems||e._refreshMenu()}),this._hoverable(this.button),this._focusable(this.button)},_drawMenu:function(){var e=this;this.menu=t("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=t("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()),this.menuInstance=this.menu.menu({role:"listbox",select:function(t,i){t.preventDefault(),e._setSelection(),e._select(i.item.data("ui-selectmenu-item"),t)},focus:function(t,i){var n=i.item.data("ui-selectmenu-item");null!=e.focusIndex&&n.index!==e.focusIndex&&(e._trigger("focus",t,{item:n}),e.isOpen||e._select(n,t)),e.focusIndex=n.index,e.button.attr("aria-activedescendant",e.menuItems.eq(n.index).attr("id"))}}).menu("instance"),this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this._setText(this.buttonText,this._getSelectedItem().text()),this.options.width||this._resizeButton()},_refreshMenu:function(){this.menu.empty();var t,e=this.element.find("option");e.length&&(this._parseOptions(e),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup"),t=this._getSelectedItem(),this.menuInstance.focus(null,t),this._setAria(t.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(t){this.options.disabled||(this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",t))},_position:function(){this.menuWrap.position(t.extend({of:this.button},this.options.position))},close:function(t){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",t))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderMenu:function(e,i){var n=this,s="";t.each(i,function(i,o){o.optgroup!==s&&(t("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider"+(o.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:o.optgroup}).appendTo(e),s=o.optgroup),n._renderItemData(e,o)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-selectmenu-item",e)},_renderItem:function(e,i){var n=t("<li>");return i.disabled&&n.addClass("ui-state-disabled"),this._setText(n,i.label),n.appendTo(e)},_setText:function(t,e){e?t.text(e):t.html("&#160;")},_move:function(t,e){var i,n,s=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex):(i=this.menuItems.eq(this.element[0].selectedIndex),s+=":not(.ui-state-disabled)"),n="first"===t||"last"===t?i["first"===t?"prevAll":"nextAll"](s).eq(-1):i[t+"All"](s).eq(0),n.length&&this.menuInstance.focus(e,n)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex)},_toggle:function(t){this[this.isOpen?"close":"open"](t)},_setSelection:function(){var t;this.range&&(window.getSelection?(t=window.getSelection(),t.removeAllRanges(),t.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(e){this.isOpen&&(t(e.target).closest(".ui-selectmenu-menu, #"+this.ids.button).length||this.close(e))}},_buttonEvents:{mousedown:function(){var t;window.getSelection?(t=window.getSelection(),t.rangeCount&&(this.range=t.getRangeAt(0))):this.range=document.selection.createRange()},click:function(t){this._setSelection(),this._toggle(t)},keydown:function(e){var i=!0;switch(e.keyCode){case t.ui.keyCode.TAB:case t.ui.keyCode.ESCAPE:this.close(e),i=!1;break;case t.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(e);break;case t.ui.keyCode.UP:e.altKey?this._toggle(e):this._move("prev",e);break;case t.ui.keyCode.DOWN:e.altKey?this._toggle(e):this._move("next",e);break;case t.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(e):this._toggle(e);break;case t.ui.keyCode.LEFT:this._move("prev",e);break;case t.ui.keyCode.RIGHT:this._move("next",e);break;case t.ui.keyCode.HOME:case t.ui.keyCode.PAGE_UP:this._move("first",e);break;case t.ui.keyCode.END:case t.ui.keyCode.PAGE_DOWN:this._move("last",e);break;default:this.menu.trigger(e),i=!1}i&&e.preventDefault()}},_selectFocusedItem:function(t){var e=this.menuItems.eq(this.focusIndex);e.hasClass("ui-state-disabled")||this._select(e.data("ui-selectmenu-item"),t)},_select:function(t,e){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=t.index,this._setText(this.buttonText,t.label),this._setAria(t),this._trigger("select",e,{item:t}),t.index!==i&&this._trigger("change",e,{item:t}),this.close(e)},_setAria:function(t){var e=this.menuItems.eq(t.index).attr("id");this.button.attr({"aria-labelledby":e,"aria-activedescendant":e}),this.menu.attr("aria-activedescendant",e)},_setOption:function(t,e){"icons"===t&&this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(e.button),this._super(t,e),"appendTo"===t&&this.menuWrap.appendTo(this._appendTo()),"disabled"===t&&(this.menuInstance.option("disabled",e),this.button.toggleClass("ui-state-disabled",e).attr("aria-disabled",e),this.element.prop("disabled",e),e?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)),"width"===t&&this._resizeButton()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front")),e.length||(e=this.document[0].body),e},_toggleAttr:function(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen),this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var t=this.options.width;t||(t=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(t)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){return{disabled:this.element.prop("disabled")}},_parseOptions:function(e){var i=[];e.each(function(e,n){var s=t(n),o=s.parent("optgroup");i.push({element:s,index:e,value:s.attr("value"),label:s.text(),optgroup:o.attr("label")||"",disabled:o.prop("disabled")||s.prop("disabled")})}),this.items=i},_destroy:function(){this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.label.attr("for",this.ids.element)}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.slider",t.ui.mouse,{version:"1.11.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,n=this.options,s=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),o="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",a=[];for(i=n.values&&n.values.length||1,s.length>i&&(s.slice(i).remove(),s=s.slice(0,i)),e=s.length;i>e;e++)a.push(o);this.handles=s.add(t(a.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,n,s,o,a,r,l,h,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},n=this._normValueFromMouse(i),s=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(n-u.values(e));(s>i||s===i&&(e===u._lastChangedValue||u.values(e)===c.min))&&(s=i,o=t(this),a=e)}),r=this._start(e,a),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=a,o.addClass("ui-state-active").focus(),l=o.offset(),h=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=h?{left:0,top:0}:{left:e.pageX-l.left-o.width()/2,top:e.pageY-l.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,a,n),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,n,s,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),n=i/e,n>1&&(n=1),0>n&&(n=0),"vertical"===this.orientation&&(n=1-n),s=this._valueMax()-this._valueMin(),o=this._valueMin()+n*s,this._trimAlignValue(o)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var n,s,o;this.options.values&&this.options.values.length?(n=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>n||1===e&&n>i)&&(i=n),i!==this.values(e)&&(s=this.values(),s[e]=i,o=this._trigger("slide",t,{handle:this.handles[e],value:i,values:s}),n=this.values(e?0:1),o!==!1&&this.values(e,i))):i!==this.value()&&(o=this._trigger("slide",t,{handle:this.handles[e],value:i}),o!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),void this._change(null,0)):this._value()},values:function(e,i){var n,s,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),void this._change(null,e);if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(n=this.options.values,s=arguments[0],o=0;o<n.length;o+=1)n[o]=this._trimAlignValue(s[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var n,s=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(s=this.options.values.length),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!i),this._super(e,i),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");
    break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),n=0;s>n;n+=1)this._change(null,n);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,n;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),n=0;n<i.length;n+=1)i[n]=this._trimAlignValue(i[n]);return i}return[]},_trimAlignValue:function(t){if(t<=this._valueMin())return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,n=t-i;return 2*Math.abs(i)>=e&&(n+=i>0?e:-e),parseFloat(n.toFixed(5))},_calculateNewMax:function(){var t=(this.options.max-this._valueMin())%this.options.step;this.max=this.options.max-t},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var e,i,n,s,o,a=this.options.range,r=this.options,l=this,h=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(n){i=(l.values(n)-l._valueMin())/(l._valueMax()-l._valueMin())*100,u["horizontal"===l.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[h?"animate":"css"](u,r.animate),l.options.range===!0&&("horizontal"===l.orientation?(0===n&&l.range.stop(1,1)[h?"animate":"css"]({left:i+"%"},r.animate),1===n&&l.range[h?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===n&&l.range.stop(1,1)[h?"animate":"css"]({bottom:i+"%"},r.animate),1===n&&l.range[h?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(n=this.value(),s=this._valueMin(),o=this._valueMax(),i=o!==s?(n-s)/(o-s)*100:0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[h?"animate":"css"](u,r.animate),"min"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({width:i+"%"},r.animate),"max"===a&&"horizontal"===this.orientation&&this.range[h?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({height:i+"%"},r.animate),"max"===a&&"vertical"===this.orientation&&this.range[h?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(e){var i,n,s,o,a=t(e.target).data("ui-slider-handle-index");switch(e.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(e.target).addClass("ui-state-active"),i=this._start(e,a),i===!1))return}switch(o=this.options.step,n=s=this.options.values&&this.options.values.length?this.values(a):this.value(),e.keyCode){case t.ui.keyCode.HOME:s=this._valueMin();break;case t.ui.keyCode.END:s=this._valueMax();break;case t.ui.keyCode.PAGE_UP:s=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;s=this._trimAlignValue(n+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;s=this._trimAlignValue(n-o)}this._slide(e,a,s)},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./mouse","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.sortable",t.ui.mouse,{version:"1.11.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&e+i>t},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){var t=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===t.axis||this._isFloating(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),t.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,i){var n=null,s=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(n=t(this),!1):void 0}),t.data(e.target,o.widgetName+"-item")===o&&(n=t(e.target)),n&&(!this.options.handle||i||(t(this.options.handle,n).find("*").addBack().each(function(){this===e.target&&(s=!0)}),s))?(this.currentItem=n,this._removeCurrentsFromItems(),!0):!1)},_mouseStart:function(e,i,n){var s,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!n)for(s=this.containers.length-1;s>=0;s--)this.containers[s]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,n,s,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-t(document).scrollTop()<a.scrollSensitivity?r=t(document).scrollTop(t(document).scrollTop()-a.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<a.scrollSensitivity&&(r=t(document).scrollTop(t(document).scrollTop()+a.scrollSpeed)),e.pageX-t(document).scrollLeft()<a.scrollSensitivity?r=t(document).scrollLeft(t(document).scrollLeft()-a.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<a.scrollSensitivity&&(r=t(document).scrollLeft(t(document).scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(n=this.items[i],s=n.item[0],o=this._intersectsWithPointer(n),o&&n.instance===this.currentContainer&&s!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==s&&!t.contains(this.placeholder[0],s)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],s):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(n))break;this._rearrange(e,n),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var n=this,s=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=s.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=s.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){n._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),n=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&n.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!n.length&&e.key&&n.push(e.key+"="),n.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),n=[];return e=e||{},i.each(function(){n.push(t(e.item||this).attr(e.attribute||"id")||"")}),n},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,n=this.positionAbs.top,s=n+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,l=r+t.height,h=this.offset.click.top,u=this.offset.click.left,c="x"===this.options.axis||n+h>r&&l>n+h,d="y"===this.options.axis||e+u>o&&a>e+u,p=c&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:o<e+this.helperProportions.width/2&&i-this.helperProportions.width/2<a&&r<n+this.helperProportions.height/2&&s-this.helperProportions.height/2<l},_intersectsWithPointer:function(t){var e="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),n=e&&i,s=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return n?this.floating?o&&"right"===o||"down"===s?2:1:s&&("down"===s?2:1):!1},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),n=this._getDragVerticalDirection(),s=this._getDragHorizontalDirection();return this.floating&&s?"right"===s&&i||"left"===s&&!i:n&&("down"===n&&e||"up"===n&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){r.push(this)}var n,s,o,a,r=[],l=[],h=this._connectWith();if(h&&e)for(n=h.length-1;n>=0;n--)for(o=t(h[n]),s=o.length-1;s>=0;s--)a=t.data(o[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&l.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(l.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),n=l.length-1;n>=0;n--)l[n][0].each(i);return t(r)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;i<e.length;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,n,s,o,a,r,l,h,u=this.items,c=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(s=t(d[i]),n=s.length-1;n>=0;n--)o=t.data(s[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(c.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=c.length-1;i>=0;i--)for(a=c[i][1],r=c[i][0],n=0,h=r.length;h>n;n++)l=t(r[n]),l.data(this.widgetName+"-item",a),u.push({item:l,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,n,s,o;for(i=this.items.length-1;i>=0;i--)n=this.items[i],n.instance!==this.currentContainer&&this.currentContainer&&n.item[0]!==this.currentItem[0]||(s=this.options.toleranceElement?t(this.options.toleranceElement,n.item):n.item,e||(n.width=s.outerWidth(),n.height=s.outerHeight()),o=s.offset(),n.left=o.left,n.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,n=e.options;n.placeholder&&n.placeholder.constructor!==String||(i=n.placeholder,n.placeholder={element:function(){var n=e.currentItem[0].nodeName.toLowerCase(),s=t("<"+n+">",e.document[0]).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===n?e.currentItem.children().each(function(){t("<td>&#160;</td>",e.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(s)}):"img"===n&&s.attr("src",e.currentItem.attr("src")),i||s.css("visibility","hidden"),s},update:function(t,s){(!i||n.forcePlaceholderSize)&&(s.height()||s.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),s.width()||s.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(n.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),n.placeholder.update(e,e.placeholder)},_contactContainers:function(e){var i,n,s,o,a,r,l,h,u,c,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!t.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&t.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",e,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(s=1e4,o=null,u=d.floating||this._isFloating(this.currentItem),a=u?"left":"top",r=u?"width":"height",c=u?"clientX":"clientY",n=this.items.length-1;n>=0;n--)t.contains(this.containers[p].element[0],this.items[n].item[0])&&this.items[n].item[0]!==this.currentItem[0]&&(l=this.items[n].item.offset()[a],h=!1,e[c]-l>this.items[n][r]/2&&(h=!0),Math.abs(e[c]-l)<s&&(s=Math.abs(e[c]-l),o=this.items[n],this.direction=h?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return void(this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash()),this.currentContainer.containerCache.over=1));o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.containers[p].element,!0),this._trigger("change",e,this._uiHash()),this.containers[p]._trigger("change",e,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(e){var i=this.options,n=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return n.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(n[0]),n[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!n[0].style.width||i.forceHelperSize)&&n.width(this.currentItem.width()),(!n[0].style.height||i.forceHelperSize)&&n.height(this.currentItem.height()),n},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,n,s=this.options;"parent"===s.containment&&(s.containment=this.helper[0].parentNode),("document"===s.containment||"window"===s.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,t("document"===s.containment?document:window).width()-this.helperProportions.width-this.margins.left,(t("document"===s.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(s.containment)||(e=t(s.containment)[0],i=t(s.containment).offset(),n="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(n?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(n?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var n="absolute"===e?1:-1,s="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(s[0].tagName);return{top:i.top+this.offset.relative.top*n+this.offset.parent.top*n-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:s.scrollTop())*n,left:i.left+this.offset.relative.left*n+this.offset.parent.left*n-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:s.scrollLeft())*n}},_generatePosition:function(e){var i,n,s=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),s.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/s.grid[1])*s.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-s.grid[1]:i+s.grid[1]:i,n=this.originalPageX+Math.round((o-this.originalPageX)/s.grid[0])*s.grid[0],o=this.containment?n-this.offset.click.left>=this.containment[0]&&n-this.offset.click.left<=this.containment[2]?n:n-this.offset.click.left>=this.containment[0]?n-s.grid[0]:n+s.grid[0]:n)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():l?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():l?0:r.scrollLeft())}},_rearrange:function(t,e,i,n){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var s=this.counter;this._delay(function(){s===this.counter&&this.refreshPositions(!n)})},_clear:function(t,e){function i(t,e,i){return function(n){i._trigger(t,n,e._uiHash(e))}}this.reverting=!1;var n,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(n in this._storedCSS)("auto"===this._storedCSS[n]||"static"===this._storedCSS[n])&&(this._storedCSS[n]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),n=this.containers.length-1;n>=0;n--)e||s.push(i("deactivate",this,this.containers[n])),this.containers[n].containerCache.over&&(s.push(i("out",this,this.containers[n])),this.containers[n].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(n=0;n<s.length;n++)s[n].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./button"],t):t(jQuery)}(function(t){function e(t){return function(){var e=this.element.val();t.apply(this,arguments),this._refresh(),e!==this.element.val()&&this._trigger("change")}}return t.widget("ui.spinner",{version:"1.11.2",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var e={},i=this.element;return t.each(["min","max","step"],function(t,n){var s=i.attr(n);void 0!==s&&s.length&&(e[n]=s)}),e},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){return this.cancelBlur?void delete this.cancelBlur:(this._stop(),this._refresh(),void(this.previous!==this.element.val()&&this._trigger("change",t)))},mousewheel:function(t,e){if(e){if(!this.spinning&&!this._start(t))return!1;this._spin((e>0?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(e){function i(){var t=this.element[0]===this.document[0].activeElement;t||(this.element.focus(),this.previous=n,this._delay(function(){this.previous=n}))}var n;n=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),e.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(e)!==!1&&this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(e){return t(e.currentTarget).hasClass("ui-state-active")?this._start(e)===!1?!1:void this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var t=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=t.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*t.height())&&t.height()>0&&t.height(t.height()),this.options.disabled&&this.disable()},_keydown:function(e){var i=this.options,n=t.ui.keyCode;switch(e.keyCode){case n.UP:return this._repeat(null,1,e),!0;case n.DOWN:return this._repeat(null,-1,e),!0;case n.PAGE_UP:return this._repeat(null,i.page,e),!0;case n.PAGE_DOWN:return this._repeat(null,-i.page,e),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon "+this.options.icons.down+"'>&#9660;</span></a>"},_start:function(t){return this.spinning||this._trigger("start",t)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(t,e,i){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,e,i)},t),this._spin(e*this.options.step,i)},_spin:function(t,e){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+t*this._increment(this.counter)),this.spinning&&this._trigger("spin",e,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(e){var i=this.options.incremental;return i?t.isFunction(i)?i(e):Math.floor(e*e*e/5e4-e*e/500+17*e/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=t.toString(),i=e.indexOf(".");return-1===i?0:e.length-i-1},_adjustValue:function(t){var e,i,n=this.options;return e=null!==n.min?n.min:0,i=t-e,i=Math.round(i/n.step)*n.step,t=e+i,t=parseFloat(t.toFixed(this._precision())),null!==n.max&&t>n.max?n.max:null!==n.min&&t<n.min?n.min:t
},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,e){if("culture"===t||"numberFormat"===t){var i=this._parse(this.element.val());return this.options[t]=e,void this.element.val(this._format(i))}("max"===t||"min"===t||"step"===t)&&"string"==typeof e&&(e=this._parse(e)),"icons"===t&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(e.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(e.down)),this._super(t,e),"disabled"===t&&(this.widget().toggleClass("ui-state-disabled",!!e),this.element.prop("disabled",!!e),this.buttons.button(e?"disable":"enable"))},_setOptions:e(function(t){this._super(t)}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var t=this.value();return null===t?!1:t===this._adjustValue(t)},_value:function(t,e){var i;""!==t&&(i=this._parse(t),null!==i&&(e||(i=this._adjustValue(i)),t=this._format(i))),this.element.val(t),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:e(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:e(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:e(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:e(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){return arguments.length?void e(this._value).call(this,t):this._parse(this.element.val())},widget:function(){return this.uiSpinner}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget"],t):t(jQuery)}(function(t){return t.widget("ui.tabs",{version:"1.11.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var t=/#.*$/;return function(e){var i,n;e=e.cloneNode(!1),i=e.href.replace(t,""),n=location.href.replace(t,"");try{i=decodeURIComponent(i)}catch(s){}try{n=decodeURIComponent(n)}catch(s){}return e.hash.length>1&&i===n}}(),_create:function(){var e=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var e=this.options.active,i=this.options.collapsible,n=location.hash.substring(1);return null===e&&(n&&this.tabs.each(function(i,s){return t(s).attr("aria-controls")===n?(e=i,!1):void 0}),null===e&&(e=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===e||-1===e)&&(e=this.tabs.length?0:!1)),e!==!1&&(e=this.tabs.index(this.tabs.eq(e)),-1===e&&(e=i?!1:0)),!i&&e===!1&&this.anchors.length&&(e=0),e},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(e){var i=t(this.document[0].activeElement).closest("li"),n=this.tabs.index(i),s=!0;if(!this._handlePageNav(e)){switch(e.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:n++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:s=!1,n--;break;case t.ui.keyCode.END:n=this.anchors.length-1;break;case t.ui.keyCode.HOME:n=0;break;case t.ui.keyCode.SPACE:return e.preventDefault(),clearTimeout(this.activating),void this._activate(n);case t.ui.keyCode.ENTER:return e.preventDefault(),clearTimeout(this.activating),void this._activate(n===this.options.active?!1:n);default:return}e.preventDefault(),clearTimeout(this.activating),n=this._focusNextTab(n,s),e.ctrlKey||(i.attr("aria-selected","false"),this.tabs.eq(n).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",n)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.focus())},_handlePageNav:function(e){return e.altKey&&e.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):e.altKey&&e.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(e,i){function n(){return e>s&&(e=0),0>e&&(e=s),e}for(var s=this.tabs.length-1;-1!==t.inArray(n(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).focus(),t},_setOption:function(t,e){return"active"===t?void this._activate(e):"disabled"===t?void this._setupDisabled(e):(this._super(t,e),"collapsible"===t&&(this.element.toggleClass("ui-tabs-collapsible",e),e||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(e),void("heightStyle"===t&&this._setupHeightStyle(e)))},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this,i=this.tabs,n=this.anchors,s=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=t(),this.anchors.each(function(i,n){var s,o,a,r=t(n).uniqueId().attr("id"),l=t(n).closest("li"),h=l.attr("aria-controls");e._isLocal(n)?(s=n.hash,a=s.substring(1),o=e.element.find(e._sanitizeSelector(s))):(a=l.attr("aria-controls")||t({}).uniqueId()[0].id,s="#"+a,o=e.element.find(s),o.length||(o=e._createPanel(a),o.insertAfter(e.panels[i-1]||e.tablist)),o.attr("aria-live","polite")),o.length&&(e.panels=e.panels.add(o)),h&&l.data("ui-tabs-aria-controls",h),l.attr({"aria-controls":a,"aria-labelledby":r}),o.attr("aria-labelledby",r)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),i&&(this._off(i.not(this.tabs)),this._off(n.not(this.anchors)),this._off(s.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(e){t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1);for(var i,n=0;i=this.tabs[n];n++)e===!0||-1!==t.inArray(n,e)?t(i).addClass("ui-state-disabled").attr("aria-disabled","true"):t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=e},_setupEvents:function(e){var i={};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(t){t.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,n=this.element.parent();"fill"===e?(i=n.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),n=e.css("position");"absolute"!==n&&"fixed"!==n&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,n=this.active,s=t(e.currentTarget),o=s.closest("li"),a=o[0]===n[0],r=a&&i.collapsible,l=r?t():this._getPanelForTab(o),h=n.length?this._getPanelForTab(n):t(),u={oldTab:n,oldPanel:h,newTab:r?t():o,newPanel:l};e.preventDefault(),o.hasClass("ui-state-disabled")||o.hasClass("ui-tabs-loading")||this.running||a&&!i.collapsible||this._trigger("beforeActivate",e,u)===!1||(i.active=r?!1:this.tabs.index(o),this.active=a?t():o,this.xhr&&this.xhr.abort(),h.length||l.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),l.length&&this.load(this.tabs.index(o),e),this._toggle(e,u))},_toggle:function(e,i){function n(){o.running=!1,o._trigger("activate",e,i)}function s(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),a.length&&o.options.show?o._show(a,o.options.show,n):(a.show(),n())}var o=this,a=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),s()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),s()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),a.length&&r.length?i.oldTab.attr("tabIndex",-1):a.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),a.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(e){var i,n=this._findActive(e);n[0]!==this.active[0]&&(n.length||(n=this.active),i=n.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(t){return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+t+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(e){var i=this.options.disabled;i!==!1&&(void 0===e?i=!1:(e=this._getIndex(e),i=t.isArray(i)?t.map(i,function(t){return t!==e?t:null}):t.map(this.tabs,function(t,i){return i!==e?i:null})),this._setupDisabled(i))},disable:function(e){var i=this.options.disabled;if(i!==!0){if(void 0===e)i=!0;else{if(e=this._getIndex(e),-1!==t.inArray(e,i))return;i=t.isArray(i)?t.merge([e],i).sort():[e]}this._setupDisabled(i)}},load:function(e,i){e=this._getIndex(e);var n=this,s=this.tabs.eq(e),o=s.find(".ui-tabs-anchor"),a=this._getPanelForTab(s),r={tab:s,panel:a};this._isLocal(o[0])||(this.xhr=t.ajax(this._ajaxSettings(o,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(s.addClass("ui-tabs-loading"),a.attr("aria-busy","true"),this.xhr.success(function(t){setTimeout(function(){a.html(t),n._trigger("load",i,r)},1)}).complete(function(t,e){setTimeout(function(){"abort"===e&&n.panels.stop(!1,!0),s.removeClass("ui-tabs-loading"),a.removeAttr("aria-busy"),t===n.xhr&&delete n.xhr},1)})))},_ajaxSettings:function(e,i,n){var s=this;return{url:e.attr("href"),beforeSend:function(e,o){return s._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:o},n))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}})}),function(t){"function"==typeof define&&define.amd?define(["jquery","./core","./widget","./position"],t):t(jQuery)}(function(t){return t.widget("ui.tooltip",{version:"1.11.2",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_addDescribedBy:function(e,i){var n=(e.attr("aria-describedby")||"").split(/\s+/);n.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(n.join(" ")))},_removeDescribedBy:function(e){var i=e.data("ui-tooltip-id"),n=(e.attr("aria-describedby")||"").split(/\s+/),s=t.inArray(i,n);-1!==s&&n.splice(s,1),e.removeData("ui-tooltip-id"),n=t.trim(n.join(" ")),n?e.attr("aria-describedby",n):e.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable(),this.liveRegion=t("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)},_setOption:function(e,i){var n=this;return"disabled"===e?(this[i?"_disable":"_enable"](),void(this.options[e]=i)):(this._super(e,i),void("content"===e&&t.each(this.tooltips,function(t,e){n._updateContent(e.element)})))},_disable:function(){var e=this;t.each(this.tooltips,function(i,n){var s=t.Event("blur");s.target=s.currentTarget=n.element[0],e.close(s,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).removeAttr("title")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,n=t(e?e.target:this.element).closest(this.options.items);n.length&&!n.data("ui-tooltip-id")&&(n.attr("title")&&n.data("ui-tooltip-title",n.attr("title")),n.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&n.parents().each(function(){var e,n=t(this);n.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),n.attr("title")&&(n.uniqueId(),i.parents[this.id]={element:this,title:n.attr("title")},n.attr("title",""))}),this._updateContent(n,e))},_updateContent:function(t,e){var i,n=this.options.content,s=this,o=e?e.type:null;return"string"==typeof n?this._open(e,t,n):(i=n.call(t[0],function(i){t.data("ui-tooltip-open")&&s._delay(function(){e&&(e.type=o),this._open(e,t,i)})}),void(i&&this._open(e,t,i)))},_open:function(e,i,n){function s(t){u.of=t,a.is(":hidden")||a.position(u)}var o,a,r,l,h,u=t.extend({},this.options.position);if(n){if(o=this._find(i))return void o.tooltip.find(".ui-tooltip-content").html(n);i.is("[title]")&&(e&&"mouseover"===e.type?i.attr("title",""):i.removeAttr("title")),o=this._tooltip(i),a=o.tooltip,this._addDescribedBy(i,a.attr("id")),a.find(".ui-tooltip-content").html(n),this.liveRegion.children().hide(),n.clone?(h=n.clone(),h.removeAttr("id").find("[id]").removeAttr("id")):h=n,t("<div>").html(h).appendTo(this.liveRegion),this.options.track&&e&&/^mouse/.test(e.type)?(this._on(this.document,{mousemove:s}),s(e)):a.position(t.extend({of:i},this.options.position)),a.hide(),this._show(a,this.options.show),this.options.show&&this.options.show.delay&&(l=this.delayedShow=setInterval(function(){a.is(":visible")&&(s(u.of),clearInterval(l))},t.fx.interval)),this._trigger("open",e,{tooltip:a}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var n=t.Event(e);n.currentTarget=i[0],this.close(n,!0)}}},i[0]!==this.element[0]&&(r.remove=function(){this._removeTooltip(a)}),e&&"mouseover"!==e.type||(r.mouseleave="close"),e&&"focusin"!==e.type||(r.focusout="close"),this._on(!0,i,r)}},close:function(e){var i,n=this,s=t(e?e.currentTarget:this.element),o=this._find(s);o&&(i=o.tooltip,o.closing||(clearInterval(this.delayedShow),s.data("ui-tooltip-title")&&!s.attr("title")&&s.attr("title",s.data("ui-tooltip-title")),this._removeDescribedBy(s),o.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){n._removeTooltip(t(this))}),s.removeData("ui-tooltip-open"),this._off(s,"mouseleave focusout keyup"),s[0]!==this.element[0]&&this._off(s,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete n.parents[e]}),o.closing=!0,this._trigger("close",e,{tooltip:i}),o.hiding||(o.closing=!1)))},_tooltip:function(e){var i=t("<div>").attr("role","tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||"")),n=i.uniqueId().attr("id");return t("<div>").addClass("ui-tooltip-content").appendTo(i),i.appendTo(this.document[0].body),this.tooltips[n]={element:e,tooltip:i}},_find:function(t){var e=t.data("ui-tooltip-id");return e?this.tooltips[e]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,n){var s=t.Event("blur"),o=n.element;s.target=s.currentTarget=o[0],e.close(s,!0),t("#"+i).remove(),o.data("ui-tooltip-title")&&(o.attr("title")||o.attr("title",o.data("ui-tooltip-title")),o.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}})}),$(document).ready(function(){var t=$("section#audio");$("a.html5").click(function(){var e=$("<audio>",{controls:"controls"}),i=$(this).attr("href");return $("<source>").attr("src",i).appendTo(e),t.html(e),!1}),$("[checked]").each(function(){$(this).parent("label").addClass("active")})}),$(document).on("click","div.escalls-datetimepicker",function(){$("#datetimepicker").datetimepicker("show")}),$(document).on("click","a.popup-show",function(){PopUpShow();var t=$(this).attr("data-id"),e=this;$(".removeUser").on("click",function(){removeUser(t,e)})}),$(function(){$("a#comment-btn").bind("click",function(){$("div.comment").toggle("blind",400),$("a#comment-btn").toggleClass("active")})}),$(function(){$("a#estimate-btn").bind("click",function(){var t=$(this).parents("td")[0];$("> div.textarea",t).toggle("blind",300),$("a#estimate-btn").toggleClass("active")})}),$(function(){$("td.estimate").bind("mouseenter mouseleave",function(){$("> a#estimate-btn",this).toggleClass("invisible")})}),$(function(){$(".call-panel").bind("mouseenter mouseleave",function(){$("> div.dropdown",this).toggleClass("invisible"),$("> div.dropdown",this).removeClass("open"),$(this).toggleClass("call-active")})});


;
$(function showCriterionForm(){
    $('.criterion-btn').bind('click', function() {
        $(this).next().toggle('drop', 300);
    })
});