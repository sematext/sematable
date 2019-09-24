# How to create new release

## Integrate changes and test them

All PRs that go into the release should be merged to master and tested
accordingly.

## Bump the version number

Bump the version number in package.json and commit the change.

Use "Bump version to x.x.x" commit message.

Given a version number MAJOR.MINOR.PATCH, increment the:

 * MAJOR version when you make incompatible API changes,
 * MINOR version when you add functionality in a backwards compatible manner, and
 * PATCH version when you make backwards compatible bug fixes.

Read more at [semver.org](https://semver.org/).

## Tag the release

Now that you have created the version bump commit, tag it with the release name. For example:

```
git tag v2.1.2
```

## Push the changes and tags

```
git push origin master
git push --tags origin
```

## Edit the relase at Github

Find the release at [Releases
page](https://github.com/sematext/sematable/releases) and edit it if necessary
to add more information about the changes that were made. For minor and patch
releases this is usually not required.

## Publish the release

```
npm publish
```

Go to the Releases page, edit the release and click "Publish release"
