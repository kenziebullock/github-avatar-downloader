const request = require('request');
const secrets = require('./secrets');
const fs = require('fs');
let avatarURL = '';
let avatarPath = '';

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
    // request and parse data
    request(options, function(err, res, body) {
        
        if (err) {
            console.log(err);
        }
        if (body) {
            cb(err, JSON.parse(body));
        } 
    });
}

// worked on project with alex buck

getRepoContributors('jquery', 'jquery', function(err, result) {
    //console.log('Errors:', err);
    for (var key in result) {
        avatarPath = `avatars/${result[key].login}.jpg`;
        avatarURL = result[key].avatar_url;
        downloadImageByURL(avatarURL, avatarPath);
    }
    return true;
});

function downloadImageByURL(url, filePath) {
    request.get(url)
           .on('error', function(err) {
               console.log(err);
               throw err;
           })
           .on('response', function(response) {
               console.log('Downloading image...')
           })
           .on('end', function(end) {
               console.log('Downloading complete.')
           })
           .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL(avatarURLs, avatarPath);