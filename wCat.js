let fs = require('fs');
//to take input
let input = process.argv.slice(2);
console.log("input : ", input );
let options = [], filePaths = [];
// to extract options and filepaths from the input
for(let i = 0; i<input.length; i++ )
{
    if( input[i]=="-b"|| input[i]=="-s" || input[i]=="-n" )
    {
        options.push(input[i]);
    }
    else
    {
        filePaths.push(input[i]);
    }
}
console.log("options : ", options);
console.log("filepaths : ", filePaths);
// to check whether the given input file exists or not
for ( let i = 0; i<filePaths.length; i++ )
{
    let fileisPresent = fs.existsSync(filePaths[i]);
    if(fileisPresent == false)
    {
        console.log("filepath",filePaths[i], "does not exist");
        return;
    }
}
//read n number of files
let totalContent = ""
for( let i = 0; i<filePaths.length; i++ )
{
    let contentofCF = fs.readFileSync(filePaths[i]);
    totalContent += contentofCF + "\r\n";
}
console.log(totalContent);

//-s option implement
// to remove line breaks
let isSoption = options.includes("-s");
if( isSoption == true)
{
    //split on basis of newline character
    let outputArr = totalContent.split("\r\n");
    let temp=[];
    //to identify and remove empty lines
    for( let i = 0; i<outputArr.length; i++ )
    {
        let isStringPresent = outputArr[i]!=="";       // boolean variable being assigned along with condition
        if(isStringPresent)   // if no specific condition is mentioned while evaluating boolean variables it automatically 
        {                     // takes condition to be "if true"
            temp.push(outputArr[i]);   
        }
    }
    totalContent = temp.join("\r\n");          // here values in array temp are being joined together to form a single string
                                             //which is to added along \n - newline character
}
// console.log(totalContent);
let isNoption = options.includes("-n");
let isBoption = options.includes("-b");
let finaloption;
if(isNoption==true&&isBoption==true)
{
    if(options.indexOf("-n")<options.indexOf("-b")){
        finaloption = "-n";
    }
    else{
        finaloption = "-b";
    }
}
else if(isNoption==true)
{
    finaloption = "-n";
}
else{
    finaloption = "-b";
}

// -n option implementation
// to number the every line of the file including empty lines
if(finaloption=="-n")
{
    let ct = 1;
    let numberArray = totalContent.split("\r\n");
    for( let j = 0; j<numberArray.length; j++ )
    {
        numberArray[j] = ct + ". " + numberArray[j];
        ct++;
    }
    totalContent = numberArray.join("\r\n");
}

//-b option implementation
//to number only non empty lines
if(finaloption=="-b")
{
    let ct = 1;
    let numEmpArray = totalContent.split("\r\n");
    for( let i = 0; i<numEmpArray.length; i++ )
    {
        if(numEmpArray[i]!="")
        {
            numEmpArray[i] = ct + ". " + numEmpArray[i];
            ct++;
        }
    }
    totalContent = numEmpArray.join("\r\n");
}
console.log(totalContent);