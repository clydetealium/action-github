const core = require('@actions/core');
const github = require('@actions/github');

async function main() {

  try {
    const context = github.context;

    const commitMessages = await getCommitMessages(context);
    const prDescription = context.payload.pull_request.body || '';
    const sourceBranchName = context.payload.pull_request.head.ref;
    const jiraIssuePattern = /[A-Z]+-\d{3,}/g;

    console.log('commitMessages', commitMessages);

    const issues = [
      ...commitMessages.join(' ').match(jiraIssuePattern) || [],
      ...prDescription.match(jiraIssuePattern) || [],
      ...sourceBranchName.match(jiraIssuePattern) || [],
    ];

    console.log('Identified Jira issues:', issues);
    core.setOutput('jira-issues', issues.join(','));

  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

async function getCommitMessages(context) {
  const token = core.getInput('github-token');
  const octokit = github.getOctokit(token);

  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const prNumber = context.payload.pull_request.number;

  const response = await octokit.rest.pulls.listCommits({
    owner,
    repo,
    pull_number: prNumber,
  });

  const commitMessages = response.data.map((commit) => commit.commit.message);
  return commitMessages;
}

main();

module.exports = main;