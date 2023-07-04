let tempActions;
let tempLastAct;
let lastTempActions;
function deleteTempAction(obj) {
    let keyToRemove = obj.parentNode.id.split('ion')[1];
        let filteredEntries = Object.entries(commandActions).filter(([key]) => key != keyToRemove);
        let newJson = {};
        for (let i = 0; i < filteredEntries.length; i++) {
          newJson[i + 1] = filteredEntries[i][1];
        }
        console.log(commandActions, newJson)
        lastTempActions = newJson;
        wast()
        document.getElementById(obj.parentNode.id).style.animationName = 'deleteObject';
        document.getElementById(obj.parentNode.id).style.animationDelay = '0s';
    document.getElementById(obj.parentNode.id).style.animationDuration = '0.4s';
    document.getElementById('actionUI').innerHTML = `
     
    `
        setTimeout (() => {
          document.getElementById(obj.parentNode.id).remove()
          refreshModalActions()
        }, 390)
        closeControls()

}



function setComponentRun(cID, btn, bar, actionRow) {
    if (!actionRow) {
        commandActions[lastAct].data.actionRows[bar].components[btn].runs = cID
    } else {
        commandActions[lastAct].data.actionRows[bar].options[btn].runs = cID
    }
    wast()
    setRunningElement(cID)
}