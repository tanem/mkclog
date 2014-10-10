# mkclog

[![NPM version](https://badge.fury.io/js/mkclog.svg)](http://badge.fury.io/js/mkclog)

Generate a Git changelog from the command-line.

```
Usage: mkclog [options]

Options:

-h, --help           output usage information
-V, --version        output the version number
-a, --all            Generate entire history, including commits since the
                     previous tag.
-t, --tag [tag]      Tag to use for commits since the previous tag.
-u, --url [url]      The url to the project homepage. This will be used when
                     linking to commits.
                     If this option is unspecified, the package.json "homepage"
                     value will be used.
                     If this option is unspecified and the package.json
                     "homepage" property does not exist, no commit links will
                     be added.
-o, --output [file]  Write the output to this file.
                     If the file exists and the -a option is not used, the
                     output will be prepended to the file.
                     If the file exists and the -a option is used, the output
                     will overwrite the file.
                     If this option is unspecified, the output will print to
                     stdout.
```

## Installation

```
$ npm install -g mkclog
```

## Example

From within a Git repo, we can generate an entry for the latest commits which contains a link to the commits and the commit messages:

```
$ mkclog -t v1.0.2 -u http://foo
## v1.0.2 / 2014-09-22

 * ([1234567](http://foo/commit/123456789)) Mod bar.txt
```

We can also prepend that information to an existing `changelog.md` file:

```
$ cat changelog.md
## v1.0.1 / 2014-09-21

 * ([2345678](http://foo/commit/234567890)) Update bar.txt
 * ([3456789](http://foo/commit/345678901)) More meddling

## v1.0.0 / 2014-09-21

 * ([4567890](http://foo/commit/456789012)) Add foo.txt

$ mkclog -t v1.0.2 -u http://foo -o changelog.md
$ cat changelog.md
## v1.0.2 / 2014-09-22

 * ([1234567](http://foo/commit/123456789)) Mod bar.txt

## v1.0.1 / 2014-09-21

 * ([2345678](http://foo/commit/234567890)) Update bar.txt
 * ([3456789](http://foo/commit/345678901)) More meddling

## v1.0.0 / 2014-09-21

 * ([4567890](http://foo/commit/456789012)) Add foo.txt
```

The entire history can be generated, along with an entry for the latest commits:

```
$ mkclog -a -t v1.0.2 -u http://foo
## v1.0.2 / 2014-09-22

 * ([1234567](http://foo/commit/123456789)) Mod bar.txt

## v1.0.1 / 2014-09-21

 * ([2345678](http://foo/commit/234567890)) Update bar.txt
 * ([3456789](http://foo/commit/345678901)) More meddling

## v1.0.0 / 2014-09-21

 * ([4567890](http://foo/commit/456789012)) Add foo.txt
```

We can also output the entire history to a file. Note that you may want to edit the resulting content since all commits will be listed by default. Also note that any existing file of the same name will be overwritten:

```
$ mkclog -a -t v1.0.2 -u http://foo -o changelog.md
$ cat changelog.md
## v1.0.2 / 2014-09-22

 * ([1234567](http://foo/commit/123456789)) Mod bar.txt

## v1.0.1 / 2014-09-21

 * ([2345678](http://foo/commit/234567890)) Update bar.txt
 * ([3456789](http://foo/commit/345678901)) More meddling

## v1.0.0 / 2014-09-21

 * ([4567890](http://foo/commit/456789012)) Add foo.txt
```

Issue links will also be added where appropriate. For example, `#1` will be turned into a link to issue 1:

```
$ mkclog -t v1.0.3 -u http://foo
## v1.0.3 / 2014-09-23

 * ([0123456](http://foo/commit/012345678)) Update bar.txt (fixes [#1](http://foo/issues/1))
```