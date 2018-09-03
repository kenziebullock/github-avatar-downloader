var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

// function to get contributors
function getRepoContributors(repoOwner, repoName, cb) {
    //  
}

getRepoContributors('jquery', 'jquery', function(err, result) {
    console.log('Errors:', err);
    console.log('Results', result);
});