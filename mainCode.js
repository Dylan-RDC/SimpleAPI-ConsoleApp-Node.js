const reader = require("./node_modules/readline-sync");
const OMDb = new (require('./node_modules/omdbapi'))('907131e7');
const TClient = require("./twitterClient.js");
const SpotifyS = require("./spotify.js")
const txtReader = require('./textfile.js');

const Menu = {"Exit":0,"Twitter":1,"Spotify":2,"OMDb":3,"TextFile":4}
let completed = false;
i = 0;

function TwitterValidation(input)//Validation to make sure the twitter API gets the correct 
{
        if (/\d/.test(input)) {
            console.log("Twitter username cannot contain numbers");
            return false;
        }
        if (/\s/.test(input)) {
            console.log("Twitter username cannot contain spaces");
            return false;
        }
        if (/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g.test(input)) {
            console.log("Twitter username must only contain letters");
            return false;
        }
        return true;
}


function PrintTextMenu() {//print menu for functions found in text file
    console.log("");
    console.log("Select Function:");
    console.log("============================");
    console.log("Back:\t\t\t  0")
    console.log("Search Spotify Album:     1");
    console.log("Search recent tweets:\t  2");
    console.log("Spotify artist details:\t  3");
    console.log("============================");
}

function PrintMenu()//print menu for options within the application
{
    console.log("");
    console.log("Menu:");
    console.log("============================");
    console.log("Exit:\t\t  0");
    console.log("Twitter Search:\t  1");
    console.log("Spotify Search:\t  2");
    console.log("OMDb Search:\t  3");
    console.log("Textfile methods: 4");
    console.log("============================");
}



async function GetMovieInfo(MovieName) {// retrieves a JSON object relative to the movie name
   return new Promise(async (res,rej) => {
    try {
        let movie =  await OMDb.get({
            title: MovieName,  
            type: 'movie'
            })
             console.log(`Title: ${movie.title}\nYear: ${movie.year}\nRated: ${movie.rated}\nIMDb Rating: ${movie.imdbrating}`)
             res();
        }
     catch (error) {
        console.log(`Error: ${error.message}`);
        rej();
    }
   })
}

module.exports = async function RunApp (){
    while ((completed == false) & (i<2)) {
        PrintMenu()
    
        let option =  parseInt((reader.question('Make Selection: ', {})));
        console.log("");
            switch (option) {
                
                case Menu.Exit:
                    completed = true;
                    break;
                case Menu.Twitter:
                    try {
                        let count = 20;
                        let name =  (reader.question('Please enter twitter username: ', {}));
                        if (TwitterValidation(name)) {
                                count =  (reader.question('Please enter the amount of tweets to be retrieved: ', {}));
                                if (!isNaN(count))
                                {
                                    count = parseInt(count)
                                    await TClient(name,count)
                                }
                                else
                                {
                                    console.log("Please ensure amount of tweets is a number");
                                }
                        }
                    } catch (error) {
                        //error printed from the TClient function
                    }
                   break;
                case Menu.Spotify:
                    let songname =  (reader.question('Please enter desired song name: ', {}));
                    await SpotifyS(songname);
                   
                    break;
                case Menu.OMDb:
                    let input =  (reader.question('Please input movie title: ', {}));
                    await GetMovieInfo(input)
                    break;
                case Menu.TextFile:
                    PrintTextMenu()
    
                    let choice = parseInt((reader.question('Please make selection: ', {})));
                    switch (choice) {
                        case 0:
                            break;
                        case 1:
                            await txtReader(choice)//call chosen function
                            break;
                        case 2:
                            await txtReader(choice)//call chosen function
                            break;
                        case 3:
                            await txtReader(choice)//call chosen function
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    console.log("Please enter a number that corresponds to one of the option.")
                    break;
            }   
    
    }
    }