const request = require('request');
const secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

// function to get contributors
function getRepoContributors(repoOwner, repoName, cb) {
    
    const options = {
        url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
        headers: {
            'User-Agent': 'request',
            'Authorization': secrets.GITHUB_TOKEN
        }
    };
    
    request(options, function(err, res, body) {
        
        if (err) {
            console.log(err);
        }
        if (body) {
            cb(err, JSON.parse(body))
        } 
    });
}

getRepoContributors('jquery', 'jquery', function(err, result) {
    //console.log('Errors:', err);
    for ( var key in result) {
        console.log(result[key].avatar_url);
    }
});