const request = require('request');
const secrets = require('./secrets');
const fs = require('fs');
require('dotenv').config();
const args = process.argv;


let avatarURL = '';
let avatarPath = '';

console.log('Welcome to the GitHub Avatar Downloader!');

// function to get contributors
function getRepoContributors(repoOwner, repoName, cb) {
    // checks if CL inputs are correct
    if (args.length < 4) {
        throw 'Invalid CL arguments';
    }
    // checks if download destiantion path exists
    if (!fs.existsSync('avatars/')) {
        fs.mkdirSync('avatars/');
    }
    // checks if .env file exists
    if (!fs.existsSync('./.env')) {
        throw '.env file missing!'
    }
    // check if owner/repo exist
    // 
        
    const options = {
        url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
        headers: {
            'User-Agent': 'request',
            'Authorization': process.env.DB_TOKEN
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

// call function with nameless callback
getRepoContributors(args[2], args[3], function(err, result) {
    // console.log('Errors:', err);
    
    for (var key in result) {
        avatarPath = `avatars/${result[key].login}.jpg`;
        avatarURL = result[key].avatar_url;
        downloadImageByURL(avatarURL, avatarPath);
    }
    return true;
});

// function to GET image 
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

