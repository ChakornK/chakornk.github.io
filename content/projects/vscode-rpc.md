---
name: VSCode Discord RPC
description: Simple no-config Discord RPC extension for Visual Studio Code
thumbnail: /projects/vscode-rpc/1.png
thumbnailPosition: left
github: chakornk/vscode-rpc
website: https://marketplace.visualstudio.com/items?itemName=ChakornK.vsc-discord-rpc
skills: Node.js, VSCode API
---

Discord is a messaging platform that allows users to share their current activity with their friends through Rich Presence (RPC). This extension uses the RPC protocol to display your current VSCode activity on Discord, allowing your friends to see what you are working on.

I implemented a minimal version of Discord's RPC protocol for this extension, which supports setting the current activity's state, details, and image.

![Preview of rich presence](/projects/vscode-rpc/1.png)

The extension updates the activity image according to the current file that is being edited in VSCode. In order to make the icons follow the same design style and look consistent, I used Adobe Illustrator to design the icons. The following are a sample of the icons:

![Sample icons](/projects/vscode-rpc/2.png)

## Tech stack

- **Extension**: TypeScript, Node.js, VSCode API
- **CI/CD**: GitHub Actions
- **Design**: Adobe Illustrator
