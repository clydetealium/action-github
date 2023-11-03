/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 911:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 602:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(911);
const github = __nccwpck_require__(602);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;