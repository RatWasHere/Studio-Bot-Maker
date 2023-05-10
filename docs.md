# Studio Bot Maker Documentation

### What is included in this file?
- Basic guide for the average discord bot, and how they work!
- Basic guide to SBM 
- SBM for professionals 


## Understanding Discord Bots
  Discord bots are popular methods of creating automations for a certain Discord guild. They're programmed applications that reply to interactions pointed at them.
      The average discord bot uses prefixes! They're characters or quick words that tell the bot "Hey there bud, this one's for you!" that are added before a command name. Most common prefixes are: ">" "!" "?" "." and "&" 
      
What's needed to create and run a Discord bot? 
Well, first off you need a way to create the bot, both in terms of the bot in itself and it's code. To create the bot's profile, check out: [Discord Developer Portal](https://discord.com/developers/applications). Whether it's via SBM or making your own (with libraries such as discord.js, discord.py etc), you'll always have to host the bot. Applications like "BotGhost" ( some sort of discord bot maker, but with little to no customization in terms of bot functionality) host it for you, but there's tradeoffs to it, unless you pay for it! Let's list off what we need for now:
- The bot in itself
- The bot's code 
### Reccomended Hosts 
- A way to host the bot (Strongly Reccomended: [Phantom Hosting](https://phantom-hosting.net/store/software-hosting))  (Other Bot Hosts (Low-End, Slow): [BOTSHARD - Free](https://botshard.com/) |  | [Bot-Hosting.net](https://bot-hosting.net/) | [Vexy Host](https://vexyhost.com/free-hosting/discord/))

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
> Displaying action groups

![image](https://user-images.githubusercontent.com/100881234/236049909-9f49c8b2-f3e9-4f16-847f-aa98b533b004.png)

> Displaying Actions of Action Group

![image](https://user-images.githubusercontent.com/100881234/236633347-1d6ef973-525b-47a3-8ed3-9e35fc8d6bdc.png)

> Displaying Action Editor Controls

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


## Slash Comand Editor, Parameters & Slash Command Descriptions
Whilst SBM is quite simple to understand, slash commands aren't, and in order to accomodate for their use, they've dragged down SBM. Fortunately, getting the hang of them isn't as hard as you think. Let's get started!

> In order to initialize a slash command, please refer to [this](https://github.com/RatWasHere/Studio-Bot-Maker/blob/main/docs.md#the-group-trigger-menu)
To start, hit the "Options" button!

![image](https://user-images.githubusercontent.com/100881234/236650207-610a6f50-46d0-409c-8396-cf64b22d7080.png)

This menu should pop up! 

![image](https://user-images.githubusercontent.com/100881234/236650225-32ce5422-00f3-4005-a5f7-a955ba47a8b6.png)

Now, go on and give your slash command a short description of your choice!
> side note: your slash command's name shouldn't have any spaces nor any caps.

That's all of it... unless you want to add parameters to your slash command! In order to do so, hit the "+" button!

![image](https://user-images.githubusercontent.com/100881234/236650294-373b8332-cab4-4199-8338-42b6d36f2c55.png)

You should now see this:

![image](https://user-images.githubusercontent.com/100881234/236650318-4bc39c0e-fbf5-4605-95b4-00c7a6175b8e.png)
(Click on the parameter twice to rename it!)
> side note: your parameter's name shouldn't have any spaces nor any caps.

## Understanding Parameter Types

String: Some Text
> Woohoo! I'm a string!


Integer: A number
> 10101000

Boolean: A true or false choice
> true

Channel: A channel from the slash command's guild!
> #cat-pics

User: A member of the slash command's guild!
> @TheAlmightyRat

Role: A role of the slash command's guild!
> @Admin 

Mentionable: Either an user, role, or a member!
> #cat-pics

> @Admin

> @TheAlmightyRat



Now that you've got the hang of parameter types, let's tilt our heads a little upwards. What do we see?

![image](https://user-images.githubusercontent.com/100881234/236650443-39914439-8017-4e92-9808-6f7c74fd0137.png)

Ahh yes... require parameter!
Now, what it does is quite simple trust me: If a parameter is required, the user must fill it out in order to execute the slash command. If not required, the user can choose the parameter only if they wish to!
> side note: required parameters must be put first before non-required parameters!


Alright, now that you know that, let's look below the surface. What else do we see?

![image](https://user-images.githubusercontent.com/100881234/236650544-db9a0f35-72ce-42da-8ef5-bcbacd63b878.png)


Guessed it right! Parameter description!
It's quite literally just like the slash command description but for parameters
> Just like slash commands descriptions, parameter descriptions are also required.



## Buttons, using buttons and reacting to them!

In order to open the SBM Project Home menu, click the button with an arrow pointing upwards inside a circle

![image](https://user-images.githubusercontent.com/100881234/236653552-f625a301-62d2-4bfe-8315-384c78194b22.png)

You should now see this!

![image](https://user-images.githubusercontent.com/100881234/236653581-3199d79b-38e5-47a3-8fff-ab4287ee9a90.png)

Alright, now click the "Buttons" button on top! (How ironicccc)

> If this is your first time, then you will see this, prompting you to Build the button registry! Obviously, click "Build"!

![image](https://user-images.githubusercontent.com/100881234/236653652-95785c30-7c3e-43ef-9f4a-293f01b9ea33.png)


> Now that you've built the button registry, you should see this!

![image](https://user-images.githubusercontent.com/100881234/236653691-25993175-5d98-46c1-abb0-adb41e2ed53f.png)

## Editing Buttons
To get started, hit the "Edit" Button of any Button Bar you wish modify!

![image](https://user-images.githubusercontent.com/100881234/236653714-ca6d94c9-4ceb-4d55-8791-c198c264559b.png)


Your view should now look something like this:

![image](https://user-images.githubusercontent.com/100881234/236653722-8c114a2b-c52a-41be-ad7f-fd69d48073b6.png)

Hit the "+" button to create buttons!

![image](https://user-images.githubusercontent.com/100881234/236653738-8dab3eec-8240-4496-b6a7-8a8ffa9cb1a1.png)

Now that you've created your first button, let's personalize it so it matches our command wants!

## Understanding Buttons
All buttons have 3 essential values: Labels, Custom IDs and styles!
Let's for now focus on the first 2!

![image](https://user-images.githubusercontent.com/100881234/236653786-8b506cdd-7c4a-4b24-b3c6-4ea39d5054f0.png)

What is a label? Well, simple answer: It's the text you see on a button! 
Now, what about custom IDs? Well, they're simply identifiers that can help you out later on when you want to handle the press of a button!

Right.. but what about button styles?

![image](https://user-images.githubusercontent.com/100881234/236653876-278b6d94-f6d7-4516-bf7a-eb444eb89405.png)

Well, they're basically the background colors of buttons! SBM provides a handy lil' dot to show each color on the right side of the style!
There's not much to explain about them, so let's just move onto Button Bars

## Button Bars

Basically Action Groups But For Buttons!
(BAGBFB™️) 

## Linking Button Bars to actions!
Let's now take a compatible action with the ability of doing so!

If you open up a send embed action and look to the bottom right, you'll see the "Action Rows" button!

![image](https://user-images.githubusercontent.com/100881234/236654016-04e4411f-cb07-4d63-80b9-881b708af0cf.png)

After clicking that button, you'll see 5 panes saying "Empty Slot" 
Click a pane to occupy a slot. It's that simple!
