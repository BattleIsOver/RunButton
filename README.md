# Run Button

This extension adds two run button on the editor title, one for a single javascript file
and one for npm start

# What does it do?

## Green button
It creates a terminal, named "Javascript" where it launchs the file using:
`node <editor's active file name>`.
If a terminal named Javascript alredy exist, it tries to launch the command
in the alredy existing terminal.

## Blue button
It creates a terminal, named "NPM start" where it launchs the package using:
`npm start`.
If a terminal named NPM start alredy exist, it tries to launch the command
in the alredy existing terminal.