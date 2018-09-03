const request = require('request');
const secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

// function to get contributors
function getRepoContributors(repoOwner, repoName, cb) {
    const options = {
        url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
        headers: {
            'User-Agent': 'request',
            'Authorization': '' 
        }
    };
    
    request(options, function(err, res, body) {
        cb(err, body);
    });
}

getRepoContributors('jquery', 'jquery', function(err, result) {
    console.log('Errors:', err);
    console.log('Results', result);
});