module.exports = {
    data: {"name":"Calculate", 
    "firstNumber":"",
    "secondNumber": "",
     "storeAs":"",
     "operation":"Addition",
      },
     
    UI: {"compatibleWith":["Any"], 
    "text":"Calculate", 
    
    "sepbar3":"", 

    "btextFirstNumber":"First Number",
    "inputfirstnumber*": "firstNumber",
    "sepbarfirstnumber":"", 

     "btextOperation":"Operation",
      "menuBar":{"choices":["Addition", "Substraction", "Multiplication", "Division"], 
      storeAs:"operation"},
      "sepbarsecondnumber":"", 
      "btextSecondNumber":"Second Number",
      "inputsecondnumber*": "secondNumber",
      "sepbarsecond":"", 

      "btextStoreAs":"Store Result As",
      "inputstoreResultAs!*": "storeAs",

      "preview":"operation", 
      "previewName":"Operation"},

   async run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
        let firstNumber = parseFloat(varTools.transf(values.firstNumber, message, uID, tempVars))
        let secondNumber = parseFloat(varTools.transf(values.secondNumber, message, uID, tempVars))
        if (isNaN(firstNumber) || isNaN(secondNumber)) {
          console.log("Calculate >>> Invalid Numbers")
          return
        } 
        let result = 0
        switch (values.operation) {
          case 'Addition': 
            result = firstNumber + secondNumber
          break
          case 'Substraction':
            result = firstNumber - secondNumber
          break
          case 'Multiplication':
            result = firstNumber * secondNumber
          break
          case 'Division':
            result = firstNumber / secondNumber
          break
        }




}}