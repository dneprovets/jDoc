jDoc
===

> Edit documents with JavaScript in browser

## Supported formats
* `docx`
* `txt`
* `fb2`
* `odt`
* `csv`
* `tsv`

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
    success: function (parsedFile) {

    },

    error: function (error) {

    }
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

## Release History

 * 2013-09-10   v0.1.0   Work in progress, not yet officially released.

---

Library submitted by ["webschik" Knyazevich Denis](https://github.com/webschik)
