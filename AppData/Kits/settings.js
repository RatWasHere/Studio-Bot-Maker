let settingsFS = require("fs");
let ownSettings = {};
try {
  ownSettings = JSON.parse(
    settingsFS.readFileSync("C:/ProgramData/EditorSettings.json", "utf8"),
  );
} catch (err) {
  console.log(err);
}

let editorSettings = {};
console.log(ownSettings.preffered);
switch (ownSettings.preffered) {
  default:
    editorSettings.groupPaneHeight = "inherit";
    editorSettings.actionPaneHeight = "inherit";
    break;
  case "Group Pane":
    editorSettings.actionPaneHeight = "calc(35.5vh - 12px)";
    editorSettings.groupPaneHeight = "calc(44.5vh - 12px)";
    break;
  case "Action Pane":
    editorSettings.groupPaneHeight = "calc(35vh - 12px)";
    editorSettings.actionPaneHeight = "calc(45vh - 12px)";
    break;
}
switch (ownSettings.colorSmoothness) {
  default:
    editorSettings.smoothness = "170%";
    break;
  case "High":
    editorSettings.smoothness = "200%";
    break;
  case "Low":
    editorSettings.smoothness = "140%";
    break;
}
switch (ownSettings.actionPreviewPosition) {
  default:
    editorSettings.subtitlePosition = "center";
    break;
  case "Right":
    editorSettings.subtitlePosition = "right";
    break;
  case "Left":
    editorSettings.subtitlePosition = "left";
    break;
}
switch (ownSettings.separatorPos) {
  default:
    editorSettings.separatorPosition = "left";
    break;
  case "Right":
    editorSettings.separatorPosition = "right";
    break;
  case "Both":
    editorSettings.separatorPosition = "both";
    break;
  case "None":
    editorSettings.separatorPosition = "none";
    break;
}
switch (ownSettings.widthChanges) {
  default:
    editorSettings.widthChanges = true;
    break;
  case "Off":
    editorSettings.widthChanges = false;
    break;
}
switch (ownSettings.actionPreviews) {
  case "On":
    editorSettings.previews = "inherit";
    break;
  case "Off":
    editorSettings.previews = "none";
    break;
}
switch (ownSettings.searchStyling) {
  case "Grid":
    editorSettings.searchStyling = "grid";
    break;
  case "List":
    editorSettings.searchStyling = "list";
    break;
}
switch (ownSettings.animations) {
  case "Slow":
    editorSettings.commonAnimation = 6;
    editorSettings.fastAnimation = 4;
    break;
  case "Relaxed":
    editorSettings.commonAnimation = 4;
    editorSettings.fastAnimation = 3;
    break;
  case "Fast":
    editorSettings.commonAnimation = 2;
    editorSettings.fastAnimation = 1;
    break;
  case "Off":
    editorSettings.commonAnimation = 0;
    editorSettings.fastAnimation = 0;
    break;
  default:
    editorSettings.commonAnimation = 3;
    editorSettings.fastAnimation = 2;
    break;
}