module.exports = {
  transf(text, variables) {
    const tempVars = (variable) => {
      if (typeof variables[variable] == 'string' || variables[variable] == undefined) {
        return variables[variable];
      } else {
        try {
        if (variables[variable].userID) {
          return `<@${variables[variable].user.id}>`
        } else if (variables[variable].topic && variables[variable].guildID) {
          return `<#${variables[variable].id}>`
        } else if (variables[variable].publicFlags) {
          return `<@${variables[variable].id}>`
        } else if (typeof variables[variable].hoist == "boolean") {
          return `<@&${variables[variable].id}>`
        }
      } catch (err) {return variables[variable]}
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
