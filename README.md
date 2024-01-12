# semver-action

A Github Action that wil parse, validate and then provide data back on a SemVer version number.

This includes parsing out the `major`, `minor`, `patch` and the pre release aspects as well as providing `next` version numbers for the major, minor and patch for the provided version number.

## Parameters

* `version`: The version number to be parsed as a SemVer


## Outputs

* `version`: The parsed SemVer value

* `major`: The major part of the parsed SemVer, e.g. for version `1.2.3` it would return `1`

* `minor`: The minor part of the parsed SemVer, e.g. for version `1.2.3` it would return `2`

* `patch`: The major part of the parsed SemVer, e.g. for version `1.2.3` it would return `3`

* `isPreRelease`: A boolean as a string indicating if the parsed SemVer is a pre release version, e.g. for version `1.2.3` it would return `false`, but for `1.2.3-alpha` it would return `true

* `preRelease`: The pre release part of the parsed SemVer as a JSON array, e.g. for version `1.2.3-alpha.1` it would return `["alpha", 1]`

* `preReleaseString`: The pre release part of the parsed SemVer as a string, e.g. for version `1.2.3-alpha.1` it would return `alpha.1`

* `nextMajor`: The next major version number as a string, e.g. for version `1.2.3` it would return `2.0.0`

* `nextMinor`: The next minor version number as a string, e.g. for version `1.2.3` it would return `1.3.0`

* `nextPatch`: The next patch version number as a string, e.g. for version `1.2.3` it would return `1.2.4`

* `semeverData`: The full JSON data structure of the parsed [SemverData type](src/semver.ts#L3)

## Usage

```yaml
- name: Parse SemVer
  id: version
  uses: peter-murray/semver-action@v1
  with:
    version: 1.2.3-alpha.1

- name: Print next major
  run: echo ${{ steps.version.outputs.nextMajor }}
```
