// interactionTools V0 By Rat Running on Studio API 1 
// tools to interact with UI elements originating from the editor, and converting them to valid
// discord.js objects, with ease!


module.exports = {
    studio: {"API": "0", "Version": "1"},
    
    stopExecution(uID) {
        var tempVars = JSON.parse(fs.readFileSync('./tempVars.json', 'utf8'))

        tempVars[uID][`${uID}_stop`] = true;
        fs.writeFileSync('./tempVars.json', JSON.stringify(tempVars))
    },
    async runCommand(id, actionRunner, uID, client, message) {
      const datjson = require('../data.json');
      for (let command in datjson.commands) {
        if (datjson.commands[command].customId == id) {
                await actionRunner(command, message, client, uID)
        }
      }
    },
    getButtons(storedAs) {
        const datjson = require('../data.json');
        var components = [];

        for (const ffsfaokpg in storedAs) {
          let elementStored = storedAs[ffsfaokpg]
          let foundElement = false;
          for (const bar of datjson.buttons.bars) {
            if (bar.customId == elementStored) {
              foundElement = true;
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
          if (foundElement == false) {
            for (let row in datjson.rows) {
              if (datjson.rows[row].customId == elementStored) {
                const {StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder} = require('discord.js')
                  foundElement = true;
                  const componentRow = new StringSelectMenuBuilder({
                    customId: datjson.rows[row].customId,
                    minValues: datjson.rows[row].minSelectable,
                    maxValues: datjson.rows[row].maxSelectable,
                    placeholder: datjson.rows[row].placeholder
                  })
                  let rowComponents = []

                  for (let component of datjson.rows[row].options) {
                    componentRow.addOptions(
                      new StringSelectMenuOptionBuilder({
                        label: component.label,
                        value: component.customValue,
                        description: component.description,
                      })
                    )
                  }
                  components.push(
                    new ActionRowBuilder()
                    .addComponents(componentRow)
                  )
              }
            }
          }
          if (foundElement == false) {
            console.log('Converting to action rows >>> Cannot find Menu/Button option ' + elementStored)
          }
        }
        return components

      },
      preventDeletion(uID) {
        const fs = require('fs')
        var tempVars = JSON.parse(fs.readFileSync(require('process').cwd() + '\\AppData\\Toolkit\\tempVars.json'))
        let toAdd = new Date().getTime()
        if (tempVars[uID][`${uID}preventDeletion$`]) {
          tempVars[uID][`${uID}preventDeletion$`][`${toAdd}`] = " "
          return
        } else {
          tempVars[uID][`${uID}preventDeletion$`] = { [`${toAdd}`]: " " }
        }
        fs.writeFileSync(require('process').cwd() + '\\AppData\\Toolkit\\tempVars.json', JSON.stringify(tempVars))
        return toAdd

      },
      leak(uID, customTimestamp) {
        const fs = require('fs')
        var tempVars = JSON.parse(fs.readFileSync(require('process').cwd() + '\\AppData\\Toolkit\\tempVars.json'))
        try {
          delete tempVars[uID][`${uID}preventDeletion$`][`${customTimestamp}`]
          fs.writeFileSync(require('process').cwd() + '\\AppData\\Toolkit\\tempVars.json', JSON.stringify(tempVars))
        } catch (err) {
          null
        }
      }
}