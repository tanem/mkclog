# mkclog

[![NPM version](https://badge.fury.io/js/mkclog.svg)](http://badge.fury.io/js/mkclog)

Generate a changelog from Git commit data.

```
  Usage: mkclog [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -t, --tag [tag]      add a tag entry for commits since the previous tag;
                         if unspecified, will only use previous tags
    -o, --output [file]  write the output to this file;
                         if unspecified, will print to stdout
```

## Installation

```sh
$ npm install -g mkclog
```

## Example

Run from within a Git repo:

```sh
$ mkclog -t v1.0.1
```

Outputs something like:

```
## v1.0.1 / 2014-09-21

 * Add foo.txt
 * Remove bar.txt

## v1.0.0 / 2014-09-20

 * Initialised
```