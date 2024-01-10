import { promises as fs } from 'fs'
import * as path from 'path'
import * as util from 'util'
import * as core from '@actions/core'
import { context, getOctokit } from '@actions/github'

const trueValue: string[] = ['true', 'True', 'TRUE']

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  const { owner, repo }: { owner: string; repo: string } = context.repo
  const github = getOctokit(core.getInput('token'))

  const tagName: string = core.getInput('tag', { required: true })
  let name: string = core.getInput('name')
  const body: string[] = [core.getInput('body')]
  const bodyFile: string = core.getInput('body-file')
  const prerelease: boolean = core.getBooleanInput('prerelease')
  const files: string[] = core.getMultilineInput('files')
  const discussionCategoryName: string = core.getInput('discussion-category')
  const dryRun: boolean = core.getBooleanInput('dry-run')
  const generateReleaseNotes: string = core.getInput('generate-release-notes')

  // Append `body-file` to `body`
  if (bodyFile) {
    body.push(await fs.readFile(bodyFile, 'utf8'))
  }

  if (generateReleaseNotes) {
    const { data } = await github.rest.repos.generateReleaseNotes({
      owner,
      repo,
      tag_name: tagName,
      previous_tag_name: trueValue.includes(generateReleaseNotes)
        ? undefined
        : generateReleaseNotes
    })
    name = name || data.name
    body.push(data.body)
  }

  let release: {
    id?: number
    url?: string
    tag_name: string
    prerelease: boolean
    name?: string | null
    body?: string | null
    target_commitish?: string
  } = {
    tag_name: tagName,
    prerelease,
    name,
    body: body.filter(x => x).join('\n')
  }

  // Create Release
  if (!dryRun) {
    const { data } = await github.rest.repos.createRelease({
      ...release,
      owner,
      repo,
      discussionCategoryName,
      name: release.name as string,
      body: release.body as string
    })
    release = data

    await Promise.all(
      files.map(async filename => {
        github.rest.repos.uploadReleaseAsset({
          owner,
          repo,
          release_id: release.id as number,
          name: path.basename(filename),
          data: (await fs.readFile(filename)) as unknown as string
        })
      })
    )
  }

  core.setOutput('id', release.id)
  core.setOutput('url', release.url)
  core.setOutput('name', release.name)
  core.setOutput('body', release.body)
  core.setOutput('tag', release.tag_name)
  core.setOutput('prerelease', release.prerelease)
  core.setOutput('json', release)

  core.group('Output', async () => {
    core.info(util.inspect(release, { colors: true }))
  })
}
