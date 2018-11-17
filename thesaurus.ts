import readline from "readline";
import * as fs from "fs";

const lineReader = readline.createInterface({
    input: fs.createReadStream("./src/openthesaurus.txt")
});

if(process.argv.length < 3){
    console.log("Please specify words");
    process.exit(-1);
}

let words: string[] = [];
for(let i = 2; i < process.argv.length; i++){
    words.push(process.argv[i]);
}

let found: boolean = false;

findSynonyms();

function findSynonyms(){
    lineReader.on("line", function (line) {
        let synonyms = line.split(";");
        
        words.forEach(word => {
            for(let i = 0; i < synonyms.length; i++){
                let synonym: string[] = synonyms[i].split("-");
                let partmatch: boolean = false;
                synonym.forEach(part => {
                    if(part === word){
                        partmatch = true;
                    }
                });
                if(synonyms[i] === word || partmatch){
                    console.log(`${synonyms[i]}: `);
                    for(let j = 0; j < synonyms.length; j++){
                        if(i !== j){
                            console.log(`\t${synonyms[j]}`);
                        }
                    }
                    i=synonyms.length;
                    console.log("");
                    found = true;
                }
            }
        });
    }).on('close', function() {
        if(!found){
            console.log("No matches found");
        }
        process.exit(0);
    });
}