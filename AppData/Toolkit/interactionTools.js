// interactionTools V0 By Rat Running on Studio API 1 
// tools to interact with UI elements originating from the editor, and converting them to valid
// discord.js objects, with ease!


const fs = require('fs')
module.exports = {
    studio: {"API": "0", "Version": "1"},
    
    stopExecution(uID) {
        var tempVars = JSON.parse(fs.readFileSync('./tempVars.json', 'utf8'))

        tempVars[uID][`${uID}_stop`] = true;
        fs.writeFileSync('./tempVars.json', JSON.stringify(tempVars))
    },
    getButtons(storedAs) {
        const datjson = require('../data.json');
        var components = [];
        for (const elementStored of storedAs) {
          for (const bar of datjson.buttons.bars) {
            if (bar.customId === elementStored) {
              const buttons = bar.buttons;
              let barComponents = [];
              for (let button of buttons) {
                let endStyle;
                switch (button.style) {
                  case 'Default': 
                    endStyle = 1;
                    break;
                  case 'Success':
                    endStyle = 3;
                    break;
                  case 'Danger':
                    endStyle = 4;
                    break;
                  case 'Neutral': 
                    endStyle = 2;
                    break;
                  case 'Link': 
                    endStyle = 5;
                    break;
                }
                if (button.field === '') {
                  barComponents.push({
                    type: 2,
                    label: button.name,
                    style: endStyle,
                    disabled: button.disabled,
                    customId: button.customId,
                  });
                } else {
                  if (button.style === 'Link') {
                    barComponents.push({
                      type: 2,
                      label: button.name,
                      disabled: button.disabled,
                      customId: button.customId,
                      url: button.field,
                    });
                  } else {
                    if (button.field !== '') { 
                      barComponents.push({
                        type: 2,
                        label: button.name,
                        style: endStyle,
                        disabled: button.disabled,
                        custom_id: button.customId,
                        emoji: {
                          name: button.field.split(':')[0],
                          id: button.field.split(':')[1],
                        },
                      });
                    }
                  }
                }
              }
              components.push({
                type: 1,
                components: barComponents,
              });
            }

          }
        }
        return components

      }
}