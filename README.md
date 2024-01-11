# action-create-release

Generate release notes content for a release

* [`contents: write` permission is required](https://github.com/orgs/community/discussions/79377)
* `discussions: write` permission is required if `discussion-category` is used

```yaml
permissions:
  contents: write
  discussions: write
```

## Usage

## Inputs 📥

| Input | Required? | Default | Description |
| ----- | --------- | ------- | ----------- |
| `tag` | yes | `${{ github.ref_name }}` | Tag name for the release. This can be an existing tag or a new one. |
| `name` | no | `` | Name for the release |
| `body` | no | `` | Body content for the release |
| `body-file` | no | `` | File path of the body content to be included in the release |
| `generate-release-notes` | `yes` | `true` | Automatically generate release notes. Set to `true` to generate release notes from the latest release. Valid values: `true`, `false` or tag |
| `prerelease` | `false` | `false` | Mark release as a prerelease.  Valid values: `true` or `false` |
| `files` | `false` | `` | Files to attach to the release. One file per line |
| `discussion-category` | `false` | `` | Github Discussion category to create a discussion for the Release |
| `dry-run` | `false` | `false` | Run without creating the Release. Valid values: `true` or `false` |
| `token` | no | `${{ github.token }}` | Github token to use |

## Outputs 📤

| Output | Description |
| ------ | ----------- |
| `id` | Release ID. Empty string on `dry-run` |
| `url` | Release URL. Empty string on `dry-run` |
| `name` | Name for the release |
| `body` | Body content for the release |
| `tag` |  Tag name for the release |
| `prerelease` | Release is a prerelease |
| `json` | Raw data of the release in JSON |
