module.exports = {
  transf(text, variables) {
    const tempVars = (variable) => {
      if (typeof variables[variable] == 'string' || variables[variable] == undefined) {
        return variables[variable];
      } else {
        if (variables[variable].user && variables[variable].user.id) {
          return `<@${variables[variable].user.id}>`
        } else if (variables[variable].type && variables[variable].guildID && variables[variables].parentID) {
          return `<#${variables[variable].id}>`
        } else if (variables[variable].discriminator && variables[variable].mention) {
          return `<@${variables[variable].id}>`
        } else if (typeof variables[variable].hoist == "boolean") {
          return `<@&${variables[variable].id}>`
        }
      }
    };

    let formattedText = text;
    if (formattedText.includes("`")) {
      formattedText = formattedText.replace(/`/g, "\\`");
    }

    const evaluatedText = eval("`" + formattedText + "`");
    return evaluatedText;
  },
};
