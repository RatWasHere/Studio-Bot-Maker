module.exports = {
    transf(text, variables) {
        const tempVars = (variable) => {
          return variables[variable];
        };
      
        let formattedText = text;
        if (formattedText.includes('`')) {
          formattedText = formattedText.replace(/`/g, "\\`");
        }
      
        const evaluatedText = eval("`" + formattedText + "`");
        return evaluatedText;
    }
}