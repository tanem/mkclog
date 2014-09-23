# mkclog

[![NPM version](https://badge.fury.io/js/mkclog.svg)](http://badge.fury.io/js/mkclog)

Generate a changelog from Git commit data.

```
  Usage: mkclog [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -a, --all            Generate entire history, including commits since the previous tag.
    -t, --tag [tag]      Tag to use for commits since the previous tag.
    -o, --output [file]  Write the output to this file.
                         If the file exists and the -a option is not used, the output will be prepended to the file.
                         If the file exists and the -a option is used, the output will overwrite the file.
                         If this option is unspecified, the output will print to stdout.
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