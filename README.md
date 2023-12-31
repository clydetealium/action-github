# action-github

## github actions

### [findPRIssue](./findPRIssue/FIND_PR_ISSUE.md)

## Contributing
Clone this repo

### setup
install dependencies: 
```
npm run setup
```

run tests:
```
npm test
```

### build
The actions in this repo are implemented in javascript. They are built using ncc. To build an action, run the following command from the root of the repo:

```
ncc build findPRIssue/find-pr-issue.js --license licenses.txt --out findPRIssue/dist
```

or run:
```
npm run build
```

You'll need to install ncc globally to run this command:
```
npm install -g @vercel/ncc
```
Read more about this from the [GitHub Actions docs](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github)


## Conventional commit
Please see the [release workflow](./.github/workflows/release.yml) for context.

If you keep to the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format, the release workflow will automatically bump the version of the action and create a new release on each push to main.

### Breaking
Prefix your commit message with a label and an exclamation point i.e.:
- `feat!: commit message` - a new feature that's not backwards compatible
- `feat(JIRAID-123)!: commit message` - this works as well

### Minor
- `feat:` - new feature (creates a MINOR release)

### Patch
Prefix your commit message with one of the following:
- `fix:` - bug fix
- `docs:` - documentation only changes
- `style:` - changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor:` - a code change that neither fixes a bug nor adds a feature
- `perf:` - a code change that improves performance
- `test:` - adding missing tests or correcting existing tests
- `chore:` - changes to the build process or auxiliary tools and libraries such as documentation generation

## The Change Log
The [CHANGELOG.md](./CHANGELOG.md) is automatically created and / or updated on each push to main.  Please do not edit this file manually. It also serves as the basis for retrieving release notes for the action.