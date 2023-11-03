const core = require('@actions/core');
const github = require('@actions/github');

try {
  const context = github.context;
  const commitMessages = context.payload.commits.map((commit) => commit.message);
  const prDescription = context.payload.pull_request.body;
  const sourceBranchName = context.payload.pull_request.head.ref;
  const jiraIssuePattern = /[A-Z]+-\d{3,}/g;

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
