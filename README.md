jDoc
===

> Edit documents with JavaScript in browser

## Overview
This library depends on [zip.js](http://gildas-lormeau.github.io/zip.js/) library

## Supported formats
* `docx`
* `txt`
* `fb2`
* `odt`
* `csv`
* `tsv`
* `rtf`
* `gif`
* `jpg`
* `jpeg`
* `pjpeg`
* `png`
* `svg`
* `tiff`
* `icon`
* `wbmp`

## Getting Started
Include script on your page:

```html
<script src="js/jDoc.v.js"></script>
```
or
```html
<script src="js/jDoc.v.min.js"></script>
```
where `v` - library version

You will be available to the global object jDoc

## Methods

#### read
Read the document.
Example:

```js

jD.read(file);

```

* `file` - [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object or [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object
* `fileData` - object with methods:
  * `html` - return result as documentFragment
  * `data` - return result as object {}
* `error` - object, {message: ""}

`error` can be:
 * {message: 'Invalid file format'} - invalid file format
 * {message: 'Can not read file'} - System error reading file
 * {message: 'First argument must be type of File'} - argument 'file' must be instanceof File
 * {message: 'Invalid file type'}
 * {message: 'Can't load the file'}
 * {message: 'Not have the required technology'} - unsupported browser

#### on
Bind a callback function to an object. The callback will be invoked whenever the event is fired.
#### once
Just like on, but causes the bound callback to only fire once before being removed.
#### off
Remove a previously-bound callback function from an object. If no context is specified, all of the versions of the callback with different contexts will be removed. If no callback is specified, all callbacks for the event will be removed. If no event is specified, callbacks for all events will be removed.

## Events

#### readstart
This event will always trigger when we will start to read the file.
#### readend
This event will always trigger when we will finish to read the file (with/without errors).
#### read
This event will always trigger when we will success read the file.
In the handler of this event we can have one argument - fileData, result of reading.
#### error
This event will always trigger when we will have some errors.
And we will one argument in the handler of this event - error object.

## Static methods

#### jDoc.a4DimensionCssRules
Css rules for A4 format of sheets in dimensions.
For example:
```js
{
    width: {
        value: 792,
        unit: "pt"
    },
    height: {
        value: 612,
        unit: "pt"
    }
}
```
#### jDoc.supported
This browser support required technologies for jDoc or no.
This property contains true/false;
#### jDoc.supportedFormats
Array with supported document formats.
#### jDoc.defineEngine(name, formats, engine)
* `name` - custom name of engine. F.e. "ODF" for ODF document format
* `formats` - array with supported document formats as MIME types. F.e. ['text/csv', 'text/tab-separated-values']
* `engine` - object inherited from jDoc.Engine

#### jDoc.Engine.extend(protoProperties)
* `protoProperties` - object with properties for new Engine prototype

## Grunt
Build a library:
* `grunt readers` - build all readers engines for supported formats
* `grunt readers:include` - build all readers engines for supported formats
* `grunt readers:include --rtf --oxml` - build only `rtf` and `oxml` engines
* `grunt readers:exclude` - exclude all readers engines from build
* `grunt readers:exclude --rtf --oxml` - build all readers engines for supported formats except `rtf` and `oxml` engines

## Help
* [Donate with LiqPay](https://www.liqpay.com/?do=clickNbuy&button=i62510136148)

## Release History

 * 2013-09-10   v0.1.0   Work in progress, not yet officially released.
 * 2013-11-10   v0.2.0   Support of RTF format.
 * 2014-01-12   v0.3.0   Add web workers support.
 * 2014-08-01   v0.4.0   New architecture of jDoc and new features. *NEW VERSION ISN'T COMPATIBLE WITH 0.3.*
 * 2014-08-19   v0.5.0   Add images engine support. Bug fix.

---
Library submitted by ["webschik" Knyazevich Denis](https://github.com/webschik)
