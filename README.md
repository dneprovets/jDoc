jDoc
===

> Edit documents with JavaScript in browser

## Overview
This library depends on [zip.js](http://gildas-lormeau.github.io/zip.js/) library and these APIs optionally:
* [Web workers](https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers)
* [File API](https://developer.mozilla.org/en-US/docs/Trash/File_APIs)
* [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

## Supported formats
* `docx`
* `txt`
* `fb2`
* `odt`
* `csv`
* `tsv`
* `rtf`

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
jDoc.read(file, {
    before: function () {},
    success: function (parsedFile) {

    },

    error: function (error) {

    },
    complete: function () {}
});
```

* `file` - [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object
* `parsedFile` - object with methods:
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

## Grunt
Build a library:
* `grunt readers` - build all engines for supported formats
* `grunt readers:include` - build all engines for supported formats
* `grunt readers:include --rtf --oxml` - build only `rtf` and `oxml` engines
* `grunt readers:exclude` - exclude all engines from build
* `grunt readers:exclude --rtf --oxml` - build all engines for supported formats except `rtf` and `oxml` engines

[Small donations are welcomed](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HS9E9QGBFDB9U)

## Release History

 * 2013-09-10   v0.1.0   Work in progress, not yet officially released.
 * 2013-11-10   v0.2.0   Support of RTF format.
 * 2014-01-12   v0.3.0   Add web workers support.

---

Library submitted by ["webschik" Knyazevich Denis](https://github.com/webschik)
