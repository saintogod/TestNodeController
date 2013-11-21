define(['jquery'], function($) {
    'use strict';
    $.isString = function(value) {
        return typeof value === "string";
    };
    /* ----------The following code are the third part plugins-------------*/
    /*
     * This is come from prototype.js
     */
    (function($) {
        var arrayProto = Array.prototype,
            slice = arrayProto.slice,
            _each = arrayProto.forEach; // use native browser JS 1.6 implementation if available

        function each(iterator, context) {
            for (var i = 0, length = this.length >>> 0; i < length; i++) {
                if (i in this) iterator.call(context, this[i], i, this);
            }
        }
        if (!_each) _each = each;

        function clear() {
            this.length = 0;
            return this;
        }

        function first() {
            return this[0];
        }

        function last() {
            return this[this.length - 1];
        }

        function compact() {
            return this.select(function(value) {
                return value != null;
            });
        }

        function flatten() {
            return this.inject([], function(array, value) {
                if (Object.isArray(value))
                    return array.concat(value.flatten());
                array.push(value);
                return array;
            });
        }

        function without() {
            var values = slice.call(arguments, 0);
            return this.select(function(value) {
                return !values.include(value);
            });
        }

        function reverse(inline) {
            return (inline === false ? this.toArray() : this)._reverse();
        }

        function uniq(sorted) {
            return this.inject([], function(array, value, index) {
                if (0 == index || (sorted ? array.last() != value : !array.include(value)))
                    array.push(value);
                return array;
            });
        }

        function intersect(array) {
            return this.uniq().findAll(function(item) {
                return array.detect(function(value) {
                    return item === value
                });
            });
        }


        function clone() {
            return slice.call(this, 0);
        }

        function size() {
            return this.length;
        }

        function inspect() {
            return '[' + this.map(Object.inspect).join(', ') + ']';
        }

        function indexOf(item, i) {
            i || (i = 0);
            var length = this.length;
            if (i < 0) i = length + i;
            for (; i < length; i++)
                if (this[i] === item) return i;
            return -1;
        }

        function lastIndexOf(item, i) {
            i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;
            var n = this.slice(0, i).reverse().indexOf(item);
            return (n < 0) ? n : i - n - 1;
        }

        function concat() {
            var array = slice.call(this, 0),
                item;
            for (var i = 0, length = arguments.length; i < length; i++) {
                item = arguments[i];
                if (Object.isArray(item) && !('callee' in item)) {
                    for (var j = 0, arrayLength = item.length; j < arrayLength; j++)
                        array.push(item[j]);
                } else {
                    array.push(item);
                }
            }
            return array;
        }

        if (!arrayProto._reverse)
            arrayProto._reverse = arrayProto.reverse;

        $.extend(arrayProto, {
            _each: _each,
            clear: clear,
            first: first,
            last: last,
            compact: compact,
            flatten: flatten,
            without: without,
            reverse: reverse,
            uniq: uniq,
            intersect: intersect,
            clone: clone,
            toArray: clone,
            size: size,
            inspect: inspect
        });

        var CONCAT_ARGUMENTS_BUGGY = (function() {
            return [].concat(arguments)[0][0] !== 1;
        })(1, 2)

        if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

        if (!arrayProto.indexOf) arrayProto.indexOf = indexOf;
        if (!arrayProto.lastIndexOf) arrayProto.lastIndexOf = lastIndexOf;
    })($);
    /*
      jQuery strings - 0.3
      http://code.google.com/p/jquery-utils/
      
      (c) Maxime Haineault <haineault@gmail.com>
      http://haineault.com   

      MIT License (http://www.opensource.org/licenses/mit-license.php)

      Implementation of Python3K advanced string formatting
      http://www.python.org/dev/peps/pep-3101/

      Documentation: http://code.google.com/p/jquery-utils/wiki/StringFormat
    */
    (function($) {
        var strings = {
            strConversion: {
                // tries to translate any objects type into string gracefully
                __repr: function(i) {
                    switch (this.__getType(i)) {
                        case 'array':
                        case 'date':
                        case 'number':
                            return i.toString();
                        case 'object':
                            var o = [];
                            for (x = 0; x < i.length; i++) {
                                o.push(i + ': ' + this.__repr(i[x]));
                            }
                            return o.join(', ');
                        case 'string':
                            return i;
                        default:
                            return i;
                    }
                },
                // like typeof but less vague
                __getType: function(i) {
                    if (!i || !i.constructor) {
                        return typeof(i);
                    }
                    var match = i.constructor.toString().match(/Array|Number|String|Object|Date/);
                    return match && match[0].toLowerCase() || typeof(i);
                },
                //+ Jonas Raoni Soares Silva
                //@ http://jsfromhell.com/string/pad [v1.0]
                __pad: function(str, l, s, t) {
                    var p = s || ' ';
                    var o = str;
                    if (l - str.length > 0) {
                        o = new Array(Math.ceil(l / p.length)).join(p).substr(0, t = !t ? l : t == 1 ? 0 : Math.ceil(l / 2)) + str + p.substr(0, l - t);
                    }
                    return o;
                },
                __getInput: function(arg, args) {
                    var key = arg.getKey();
                    switch (this.__getType(args)) {
                        case 'object': // Thanks to Jonathan Works for the patch
                            var keys = key.split('.');
                            var obj = args;
                            for (var subkey = 0; subkey < keys.length; subkey++) {
                                obj = obj[keys[subkey]];
                            }
                            if (typeof(obj) != 'undefined') {
                                if (strings.strConversion.__getType(obj) == 'array') {
                                    return arg.getFormat().match(/\.\*/) && obj[1] || obj;
                                }
                                return obj;
                            } else {
                                // TODO: try by numerical index                    
                            }
                            break;
                        case 'array':
                            key = parseInt(key, 10);
                            if (arg.getFormat().match(/\.\*/) && typeof args[key + 1] != 'undefined') {
                                return args[key + 1];
                            } else if (typeof args[key] != 'undefined') {
                                return args[key];
                            } else {
                                return key;
                            }
                            break;
                    }
                    return '{' + key + '}';
                },
                __formatToken: function(token, args) {
                    var arg = new Argument(token, args);
                    return strings.strConversion[arg.getFormat().slice(-1)](this.__getInput(arg, args), arg);
                },

                // Signed integer decimal.
                d: function(input, arg) {
                    var o = parseInt(input, 10); // enforce base 10
                    var p = arg.getPaddingLength();
                    if (p) {
                        return this.__pad(o.toString(), p, arg.getPaddingString(), 0);
                    } else {
                        return o;
                    }
                },
                // Signed integer decimal.
                i: function(input, args) {
                    return this.d(input, args);
                },
                // Unsigned octal
                o: function(input, arg) {
                    var o = input.toString(8);
                    if (arg.isAlternate()) {
                        o = this.__pad(o, o.length + 1, '0', 0);
                    }
                    return this.__pad(o, arg.getPaddingLength(), arg.getPaddingString(), 0);
                },
                // Unsigned decimal
                u: function(input, args) {
                    return Math.abs(this.d(input, args));
                },
                // Unsigned hexadecimal (lowercase)
                x: function(input, arg) {
                    var o = parseInt(input, 10).toString(16);
                    o = this.__pad(o, arg.getPaddingLength(), arg.getPaddingString(), 0);
                    return arg.isAlternate() ? '0x' + o : o;
                },
                // Unsigned hexadecimal (uppercase)
                X: function(input, arg) {
                    return this.x(input, arg).toUpperCase();
                },
                // Floating point exponential format (lowercase)
                e: function(input, arg) {
                    return parseFloat(input, 10).toExponential(arg.getPrecision());
                },
                // Floating point exponential format (uppercase)
                E: function(input, arg) {
                    return this.e(input, arg).toUpperCase();
                },
                // Floating point decimal format
                f: function(input, arg) {
                    return this.__pad(parseFloat(input, 10).toFixed(arg.getPrecision()), arg.getPaddingLength(), arg.getPaddingString(), 0);
                },
                // Floating point decimal format (alias)
                F: function(input, args) {
                    return this.f(input, args);
                },
                // Floating point format. Uses exponential format if exponent is greater than -4 or less than precision, decimal format otherwise
                g: function(input, arg) {
                    var o = parseFloat(input, 10);
                    return (o.toString().length > 6) ? Math.round(o.toExponential(arg.getPrecision())) : o;
                },
                // Floating point format. Uses exponential format if exponent is greater than -4 or less than precision, decimal format otherwise
                G: function(input, args) {
                    return this.g(input, args);
                },
                // Single character (accepts integer or single character string).   
                c: function(input, args) {
                    var match = input.match(/\w|\d/);
                    return match && match[0] || '';
                },
                // String (converts any JavaScript object to anotated format)
                r: function(input, args) {
                    return this.__repr(input);
                },
                // String (converts any JavaScript object using object.toString())
                s: function(input, args) {
                    return input.toString && input.toString() || '' + input;
                }
            },

            format: function(str, args) {
                var end = 0;
                var start = 0;
                var match = false;
                var buffer = [];
                var token = '';
                var tmp = (str || '').split('');
                for (start = 0; start < tmp.length; start++) {
                    if (tmp[start] == '{' && tmp[start + 1] != '{') {
                        end = str.indexOf('}', start);
                        token = tmp.slice(start + 1, end).join('');
                        if (tmp[start - 1] != '{' && tmp[end + 1] != '}') {
                            var tokenArgs = (typeof arguments[1] != 'object') ? arguments2Array(arguments, 2) : args || [];
                            buffer.push(strings.strConversion.__formatToken(token, tokenArgs));
                        } else {
                            buffer.push(token);
                        }
                    } else if (start > end || buffer.length < 1) {
                        buffer.push(tmp[start]);
                    }
                }
                return (buffer.length > 1) ? buffer.join('') : buffer[0];
            },

            calc: function(str, args) {
                return eval(format(str, args));
            },

            repeat: function(s, n) {
                return new Array(n + 1).join(s);
            },

            UTF8encode: function(s) {
                return unescape(encodeURIComponent(s));
            },

            UTF8decode: function(s) {
                return decodeURIComponent(escape(s));
            },

            tpl: function() {
                var out = '';
                var render = true;
                // Set
                // $.tpl('ui.test', ['<span>', helloWorld ,'</span>']);
                if (arguments.length == 2 && $.isArray(arguments[1])) {
                    this[arguments[0]] = arguments[1].join('');
                    return $(this[arguments[0]]);
                }
                // $.tpl('ui.test', '<span>hello world</span>');
                if (arguments.length == 2 && $.isString(arguments[1])) {
                    this[arguments[0]] = arguments[1];
                    return $(this[arguments[0]]);
                }
                // Call
                // $.tpl('ui.test');
                if (arguments.length == 1) {
                    return $(this[arguments[0]]);
                }
                // $.tpl('ui.test', false);
                if (arguments.length == 2 && arguments[1] == false) {
                    return this[arguments[0]];
                }
                // $.tpl('ui.test', {value:blah});
                if (arguments.length == 2 && $.isObject(arguments[1])) {
                    return $($.format(this[arguments[0]], arguments[1]));
                }
                // $.tpl('ui.test', {value:blah}, false);
                if (arguments.length == 3 && $.isObject(arguments[1])) {
                    return (arguments[2] == true) ? $.format(this[arguments[0]], arguments[1]) : $($.format(this[arguments[0]], arguments[1]));
                }
            }
        };

        var Argument = function(arg, args) {
            this.__arg = arg;
            this.__args = args;
            this.__max_precision = parseFloat('1.' + (new Array(32)).join('1'), 10).toString().length - 3;
            this.__def_precision = 6;
            this.getString = function() {
                return this.__arg;
            };
            this.getKey = function() {
                return this.__arg.split(':')[0];
            };
            this.getFormat = function() {
                var match = this.getString().split(':');
                return (match && match[1]) ? match[1] : 's';
            };
            this.getPrecision = function() {
                var match = this.getFormat().match(/\.(\d+|\*)/g);
                if (!match) {
                    return this.__def_precision;
                } else {
                    match = match[0].slice(1);
                    if (match != '*') {
                        return parseInt(match, 10);
                    } else if (strings.strConversion.__getType(this.__args) == 'array') {
                        return this.__args[1] && this.__args[0] || this.__def_precision;
                    } else if (strings.strConversion.__getType(this.__args) == 'object') {
                        return this.__args[this.getKey()] && this.__args[this.getKey()][0] || this.__def_precision;
                    } else {
                        return this.__def_precision;
                    }
                }
            };
            this.getPaddingLength = function() {
                var match = false;
                if (this.isAlternate()) {
                    match = this.getString().match(/0?#0?(\d+)/);
                    if (match && match[1]) {
                        return parseInt(match[1], 10);
                    }
                }
                match = this.getString().match(/(0|\.)(\d+|\*)/g);
                return match && parseInt(match[0].slice(1), 10) || 0;
            };
            this.getPaddingString = function() {
                var o = '';
                if (this.isAlternate()) {
                    o = ' ';
                }
                // 0 take precedence on alternate format
                if (this.getFormat().match(/#0|0#|^0|\.\d+/)) {
                    o = '0';
                }
                return o;
            };
            this.getFlags = function() {
                var match = this.getString().matc(/^(0|\#|\-|\+|\s)+/);
                return match && match[0].split('') || [];
            };
            this.isAlternate = function() {
                return !!this.getFormat().match(/^0?#/);
            };
        };

        var arguments2Array = function(args, shift) {
            var o = [];
            for (l = args.length, x = (shift || 0) - 1; x < l; x++) {
                o.push(args[x]);
            }
            return o;
        };
        $.extend(strings);
    })($);

    /**
     * jQuery JSON plugin 2.4.0
     *
     * @author Brantley Harris, 2009-2011
     * @author Timo Tijhof, 2011-2012
     * @source This plugin is heavily influenced by MochiKit's serializeJSON, which is
     *         copyrighted 2005 by Bob Ippolito.
     * @source Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
     *         website's http://www.json.org/json2.js, which proclaims:
     *         "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
     *         I uphold.
     * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
     */
    (function($) {
        'use strict';

        var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
            meta = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            },
            hasOwn = Object.prototype.hasOwnProperty;

        /**
         * jQuery.toJSON
         * Converts the given argument into a JSON representation.
         *
         * @param o {Mixed} The json-serializable *thing* to be converted
         *
         * If an object has a toJSON prototype, that will be used to get the representation.
         * Non-integer/string keys are skipped in the object, as are keys that point to a
         * function.
         *
         */
        $.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function(o) {
            if (o === null) {
                return 'null';
            }

            var pairs, k, name, val,
                type = $.type(o);

            if (type === 'undefined') {
                return undefined;
            }

            // Also covers instantiated Number and Boolean objects,
            // which are typeof 'object' but thanks to $.type, we
            // catch them here. I don't know whether it is right
            // or wrong that instantiated primitives are not
            // exported to JSON as an {"object":..}.
            // We choose this path because that's what the browsers did.
            if (type === 'number' || type === 'boolean') {
                return String(o);
            }
            if (type === 'string') {
                return $.quoteString(o);
            }
            if (typeof o.toJSON === 'function') {
                return $.toJSON(o.toJSON());
            }
            if (type === 'date') {
                var month = o.getUTCMonth() + 1,
                    day = o.getUTCDate(),
                    year = o.getUTCFullYear(),
                    hours = o.getUTCHours(),
                    minutes = o.getUTCMinutes(),
                    seconds = o.getUTCSeconds(),
                    milli = o.getUTCMilliseconds();

                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (milli < 100) {
                    milli = '0' + milli;
                }
                if (milli < 10) {
                    milli = '0' + milli;
                }
                return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds +
                    '.' + milli + 'Z"';
            }

            pairs = [];

            if ($.isArray(o)) {
                for (k = 0; k < o.length; k++) {
                    pairs.push($.toJSON(o[k]) || 'null');
                }
                return '[' + pairs.join(',') + ']';
            }

            // Any other object (plain object, RegExp, ..)
            // Need to do typeof instead of $.type, because we also
            // want to catch non-plain objects.
            if (typeof o === 'object') {
                for (k in o) {
                    // Only include own properties,
                    // Filter out inherited prototypes
                    if (hasOwn.call(o, k)) {
                        // Keys must be numerical or string. Skip others
                        type = typeof k;
                        if (type === 'number') {
                            name = '"' + k + '"';
                        } else if (type === 'string') {
                            name = $.quoteString(k);
                        } else {
                            continue;
                        }
                        type = typeof o[k];

                        // Invalid values like these return undefined
                        // from toJSON, however those object members
                        // shouldn't be included in the JSON string at all.
                        if (type !== 'function' && type !== 'undefined') {
                            val = $.toJSON(o[k]);
                            pairs.push(name + ':' + val);
                        }
                    }
                }
                return '{' + pairs.join(',') + '}';
            }
        };

        /**
         * jQuery.evalJSON
         * Evaluates a given json string.
         *
         * @param str {String}
         */
        $.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(str) {
            /*jshint evil: true */
            return eval('(' + str + ')');
        };

        /**
         * jQuery.secureEvalJSON
         * Evals JSON in a way that is *more* secure.
         *
         * @param str {String}
         */
        $.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(str) {
            var filtered =
                str
                .replace(/\\["\\\/bfnrtu]/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, '');

            if (/^[\],:{}\s]*$/.test(filtered)) {
                /*jshint evil: true */
                return eval('(' + str + ')');
            }
            throw new SyntaxError('Error parsing JSON, source is not valid.');
        };

        /**
         * jQuery.quoteString
         * Returns a string-repr of a string, escaping quotes intelligently.
         * Mostly a support function for toJSON.
         * Examples:
         * >>> jQuery.quoteString('apple')
         * "apple"
         *
         * >>> jQuery.quoteString('"Where are we going?", she asked.')
         * "\"Where are we going?\", she asked."
         */
        $.quoteString = function(str) {
            if (str.match(escape)) {
                return '"' + str.replace(escape, function(a) {
                    var c = meta[a];
                    if (typeof c === 'string') {
                        return c;
                    }
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
            }
            return '"' + str + '"';
        };
    }($));
});