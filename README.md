# mkclog

[![NPM version](https://badge.fury.io/js/mkclog.svg)](http://badge.fury.io/js/mkclog)

Generate a changelog based on Git commit data from the command-line.

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

From within a Git repo, we can generate an entry for the latest commits:

```sh
$ mkclog -t v1.0.2
## v1.0.2 / 2014-09-22

 * Mod bar.txt
```

We can also prepend that information to an existing `changelog.md` file:

```sh
$ cat changelog.md
## v1.0.1 / 2014-09-21

 * Update bar.txt
 * More meddling

## v1.0.0 / 2014-09-21

 * Add foo.txt
$ mkclog -t v1.0.2 -o changelog.md
$ cat changelog.md
## v1.0.2 / 2014-09-22

 * Mod bar.txt

## v1.0.1 / 2014-09-21

 * Update bar.txt
 * More meddling

## v1.0.0 / 2014-09-21

 * Add foo.txt

```

The entire history can be generated, along with an entry for the latest commits:

```sh
$ mkclog -a -t v1.0.2
## v1.0.2 / 2014-09-22

 * Mod bar.txt

## v1.0.1 / 2014-09-21

 * Update bar.txt
 * More meddling

## v1.0.0 / 2014-09-21

 * Add foo.txt

```

We can also output the entire history to a file. Note that you may want to edit the resulting content since all commits will be listed by default. Also note that any existing file of the same name will be overwritten:

```sh
$ mkclog -a -t v1.0.2 -o changelog.md
$ cat changelog.md
## v1.0.2 / 2014-09-22

 * Mod bar.txt

## v1.0.1 / 2014-09-21

 * Update bar.txt
 * More meddling

## v1.0.0 / 2014-09-21

 * Add foo.txt

```