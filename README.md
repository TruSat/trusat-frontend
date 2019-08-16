# sathunt-frontend

## Get Started

Clone the repo, `cd` into it and then run the following commands:

```
git checkout --track origin/dev

yarn install && yarn start
```

## Maintaining Repo

[Style Guide](https://github.com/agis/git-style-guide)
With the addition of commits to the master branch are done through PRs (Pull Request).

## Releasing Versions

Modified from [pyorbital](https://github.com/pytroll/pyorbital/blob/master/RELEASING.md)

1. checkout master
2. pull from repo
3. run the unittests
4. create a tag with the new version number, starting with a 'v'. eg:

`git tag v0.1.1 -m "Version 0.1.1`
[Version Numbering](semver.org)

5. push changes to github `git push --follow-tags`
6. check verification tools
