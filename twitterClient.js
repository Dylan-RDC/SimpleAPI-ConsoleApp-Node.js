const {TwitterApi} = require('twitter-api-v2');

const twitterClient = new TwitterApi("AAAAAAAAAAAAAAAAAAAAAM%2B4cQEAAAAAxv99xzurhLaDsgNyFvIIs2egqyA%3DOzCkHiCTyhWvgMRJUGp7kxuDJY82HuewCwS2DJscicSSxodBjJ");
//creates a twitterclient using the given token
const roClient = twitterClient.readOnly; //creates a Read Only client

module.exports = async function Tweet(username,results)
{
    return new Promise(async (res,rej) => {
        try {
            const user = await roClient.v2.userByUsername(username);
            let user_id = Object.values(Object.values(user)[0])[0];//Get the user values 
            const userTimeline = await twitterClient.v2.userTimeline(user_id,{max_results:results,exclude:'replies'});//Get the user timelines(icludes their tweets)
            const fetchedTweets = userTimeline.tweets;
    
            for (let i = 0; i < fetchedTweets.length; i++) {
                console.log(`${i} ${fetchedTweets[i].text}`) //loop through the tweets printing the tweets
                
            }
            res();
        } catch (error) {
            console.log(`Error: ${error.message}`);
            rej();
        }  
    })
}


