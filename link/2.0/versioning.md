# Versioning
Version `major.minor`

Version is not changed for bugfixes and minor improvements. 

A new docker image will pushed to the same tag. We do some basic tests before pushing a build to docker hub. Our production instance uses these same tags. Ci builds are untested, please test yourself before pushing to production if the bot is important to you.

## Minor
Minor is incremented when large new features are added or a database migration is required. Upgrading requires some work or consideration but should not break anything.

## Major
Major is incremented with backwards-incompatible website API changes and/or the above. Be very careful when upgrading.