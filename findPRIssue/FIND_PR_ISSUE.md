# findPRIssue
The Jira Issue Identifier Action is a GitHub Action that identifies Jira issue keys in commit messages, PR descriptions, and the source branch name of a pull request. It can be used to automatically discover and list Jira issues referenced in your Git repository's activities.

## Usage
### Inputs
#### github-token (required):
The GitHub token used for authenticating with the GitHub API.

### Outputs
#### jira-issues:
A comma-separated list of identified Jira issues.

### Example Workflow
Here's an example of how to use the Jira Issue Identifier Action in a workflow:

```yaml
name: Identify Jira Issues

on:
  pull_request:
    types:
      - opened
      - synchronize

jobs:
  identify-jira-issues:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v3

      - name: Identify Jira Issues
        uses: clydetealium/action-github/findIssue@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Use Jira Issues
        run: |
          identifiedIssues="${{ steps.identify-jira-issues.outputs.jira-issues }}"
          echo "Identified Jira issues: $identifiedIssues"
```
In this workflow, the action is triggered when a pull request is opened or synchronized. It identifies Jira issues and makes the list available as an output.
