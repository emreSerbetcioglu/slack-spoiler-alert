const commandParser = (commandText) => {
  let receivedCommand = {
      movie : "",
      spoiler : ""
  };
  receivedCommand.movie = commandText.split(',')[0].replace('"','');
  receivedCommand.spoiler = commandText.split(',')[1].replace('"','');

  return receivedCommand;
}

module.exports = commandParser