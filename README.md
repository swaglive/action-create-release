# Create Release
Generate release notes content for a release

* [`contents: write` permission is required](https://github.com/orgs/community/discussions/79377)
* `discussions: write` permission is required if `discussion-category` is used

  ```yaml
  permissions:
    contents: write
    discussions: write
  ```

## Inputs
* `tag`: The tag name for the release. This can be an existing tag or a new one.
  * Required: `true`
  * Default: `${{ github.ref_name }}`
  * Example: `v1.2.3`
* `name`: The name for the release
  * Required: `false`
  * Example: `v1.2.3`
* `body`: The body content for the release
  * Required: `false`
  * Example: `Hello World`
* `body-file`: The body content for the release as a file
  * Required: `false`
  * Example: `CHANGELOG.md`
* `generate-release-notes`: Automatically generate release notes. Set to `true` to generate release notes from the latest release. Valid values: `true`, `false` or tag
  * Required: `true`
  * Default: `true`
  * Example: `true` or `v1.0.0`
* `prerelease`: Mark release as a prerelease.  Valid values: `true` or `false`
  * Required: `false`
  * Default: `false`
* `files`: Files to attach to the release. One file per line
  * Required: `false`
  * Example: `abc.zip`
* `discussion-category`: Github Discussion category to create a discussion for the Release
  * Required: `false`
  * Example: `Announcements`
* `dry-run`: Run without creating the Release. Valid values: `true` or `false`
  * Required: `false`
  * Default: `false`

## Outputs
* `id`: Release ID
* `name`: Release Name
* `body`: Release body as markdown
* `url`: Release URL
* `tag`: Release Tag
* `prerelease`: Release Prerelease
* `json`: Release as JSON
