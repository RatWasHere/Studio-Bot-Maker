# Studio Bot Maker Documentation

### What is included in this file?
- Basic guide for the average discord bot, and how they work!
- Basic guide to SBM 
- SBM for professionals 


## Understanding Discord Bots
  Discord bots are popular methods of creating automations for a certain Discord guild. They're programmed applications that reply to interactions pointed at them.
      The average discord bot uses prefixes! They're characters or quick workds that tell the bot "Hey there bud, this one's for you!" that are added before a command name. Most common prefixes are: ">" "!" "?" "." and "&" 
      
What's needed to create and run a Discord bot? 
Well, first off you need a way to create the bot, both in terms of the bot in itself and it's code. To create the bot's profile, check out: [Discord Developer Portal](https://discord.com/developers/applications). Whether it's via SBM or making your own (with libraries such as discord.js, discord.py etc), you'll always have to host the bot. Applications like "BotGhost" ( some sort of discord bot maker, but with little to no customization in terms of bot functionality) host it for you, but there's tradeoffs to it, unless you pay for it! Let's list off what we need for now:
- The bot in itself
- The bot's code 
- A way to host the bot

### If you're here then I already know you're going to create the bot via SBM, welcome to the team! 💖

## Let's continue off with SBM and how to create bots in it!

### Studio Bot Maker's main interface
![image](https://user-images.githubusercontent.com/100881234/236048512-f1a6add4-2f65-4e40-b162-d6d9331c3bf4.png)

--- Now, you might see a blank command pane, therefore, in order to create yourself a command, just how you see above, hit the "+" icon! Thank me later ;) 

> SBM's UI is way easier than it seems, trust me! 


Now, let's understand how SBM's controls look like for a moment: 
![image](https://user-images.githubusercontent.com/100881234/236049137-8f1be9d3-2502-419a-bd08-fcc7c0d654a4.png)
- The first icon, a "+" sign, you'll get more of it later on!
- The second button, contains two sub-buttons. One has an arrow pointing upwars, another downwards. It moves the currently highlighted object up or down!
- The third button contains two icons: Switch Objects, Project Home; (more on switch objects just now)

What the heck is SWITCH OBJECTS?!?!?!?!
ehehe, the name makes it sound way more difficult than it is. Let's understand how flexbile the left object pane gets:
### Displaying action groups
![image](https://user-images.githubusercontent.com/100881234/236049909-9f49c8b2-f3e9-4f16-847f-aa98b533b004.png)

### Displaying Actions of Action Group
![image](https://user-images.githubusercontent.com/100881234/236050050-59e167f0-2cc4-4e10-899a-31280d5f6c03.png)

### Displaying Action Editor Controls
![image](https://user-images.githubusercontent.com/100881234/236050205-ab6c2435-51aa-4a54-93b6-92dcc4b42e9b.png)


The 3 images above and their descriptions should be self explanatory: there's one element for everything: Displaying Action Groups, Displaying an Action Group's Actions, and Displaying the Action Editor Controls!

Now, the first 2 images can be switched from one another easily: You can view an action group's actions by hitting the switch objects button! (And view the actions' action group, so on!)
(Example)
![electron_bWSdVOyJ7z](https://user-images.githubusercontent.com/100881234/236050737-866035f7-60e9-4d02-a554-43cd86d175b6.gif)

Please note: You can double click on the action group to display it's actions, but can also use the switch objects button whilst it's highlighted! Double clicking an action switches everything to the action editor mode!

Got the hang of it yet? Great! Then let's move on to the 3rd primary UI object: The modifier pane.
What exactly is the modifier pane? Well, it's the pane that can modify stuff, obviously! Here's how it would look:
![image](https://user-images.githubusercontent.com/100881234/236051290-bf008f52-fa3a-4214-b448-5faf726b2a05.png)
What you can see above is a group's modifier pane. The group's name, and the group's trigger. 
When text command (or slash command) is selected, the group's name is also set as the command needed to invoke to use that group!
Under the group's trigger, you see three buttons: 
- Group Trigger 
- Duplicate (Action Group Only)
- Command Options

Let's go through each one of them:

### The group trigger menu
![image](https://user-images.githubusercontent.com/100881234/236051984-3a7ee181-752e-4833-bf4f-466ac7a61c3d.png)
The group trigger is what triggers each command. The primary type of triggers are: Event, Command
We'll discuss later on about events, but for now, let's learn how to use group triggers correctly!

Ignoring the "Command" and "Event" buttons, let's move on to the bottom row of the group trigger menu:
- Text Command: A command that can be triggered via the prefix, followed by the group's name!
- Slash Command: A command that can be triggered via Discord.js slash commands! More on them later!
- Mesage: When a random message is sent, and it includes the group's name, it triggers the group! There's no need to add the prefix when using message!


### The duplicate button
Not much to explain, it just duplicates the highlighted action group


### The command options button, something you'll love!

(example of group trigger and action group)
https://user-images.githubusercontent.com/100881234/236053285-54a29993-49f6-485c-813c-fd96dfe1980e.mp4

You might have noticed the action group is not yet available for text commands. That's going to change over the next 12 months!
Right, later on we'll discuss what the heck was the slash command menu and why it looked so weird!



