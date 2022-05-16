const fs = require('fs');
const { type } = require('os');


function readfile() {//read from file
    return fs.readFileSync('random.txt', (err, data) => {
    if (err) throw err;
    else
    {
        return data  
    }
})       
}



module.exports = async function searchTxt(commandnum){
    return new Promise(async (res,rej) => {
        try {
        let lines = (readfile()).toString().split('###');//splits the textfile into an array
        console.log("");
        await eval(lines[commandnum-1])//executes the find code in the text file according to user input
        res();
        } catch (error) {
            console.log(`Error: ${error.message}`);
            rej();
        }
    });
}


