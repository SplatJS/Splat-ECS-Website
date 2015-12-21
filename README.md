
clone the splat-ecs starter project

cd intot he starter project directory and run npm install or npm i for short this will install of the games dependencies from NPM including the splat-ecs engine.
open package.json
change name to the name of your game (no caps or spaces)

edit "description" to describe your getElementsByTagName
"repository" -> "url" to your github project url (if you have one)
"bugs" -> "url" to your github project url (if you have one)
"homepage" to your game project's website (if you have one)
change "author" to your name
change "license" to proprietary unless you want your game to be free and open source.

to get a feeling for the process we will use during development open the starter project in your terminal and run
`npm run build`

This is the build command that creates a 'build' of your game which you can try in your browser or distribute on the web, once this command is run the only thing you need to run your game is the 'build' folder and its contents.

for example if you were submitting your game to itch.io you could zip  and rename the build folder and upload that as your game.

Inside the build folder we have a index.html, index.js, and  images and sounds direcories.
index.html - The main html page your game will be displayed on, this contains the canvas element where your game is displayed.
index.js - this is all of the code of your game, but it is also all the code for Splat-ECS and all of its dependencies, This is a 'compiled' build version so everything is smashed into a single file.
images, sounds - where the assets your games uses live in the build folder

never edit anythign in the build folder, this is the output of your game and the next time you run `npm run build` it will all be overwritten anyway.
the build is only for testing your game int he browser, and distributing it to others, you will never need to do anything in the build but run it from the index.html file.
note: due to cross site scripting security measures google chrome and potentially other browsers will not run a splat-ecs game from a folder on your computer. Our recomendation is to run your build using a small webserver such as node-static. You can also open the index.html in firefox since it does not seem to have this issue.

node static installation instructions and usage:
`npm install -g node-static`
I recomend opening a new terminal tab or window since static needs stays active while running.
in your game's root directory run this command:
` static -H '{"Cache-Control": "no-cache, must-revalidate"}' -p 1337 build`

feel free to repace '1337' with the port of your choosing.
``-H '{"Cache-Control": "no-cache, must-revalidate"}'` will prevent caching of your game, so you can be sure it is always showing you the latest version
The last word 'build' if refering to your game's build directory.



tryin g out the test project:

so not you should have static serving your game at http://127.0.0.1:1337 (of the port you chose) and you should try it out to make sure it is working before you continue.
open a browser and go to http://127.0.0.1:1337

the splat-ecssample game is just a yellow square you can controll with WASD, or arrow keys.
Text that this is working and note that if the keys are not working you may need to click inside the browser window to give the game your 'focus'.

Now that we have a sample game running we can get started.

Splat-ECS uses and Entity Component system or ECS for short, as the name emplies this is a very important part of splat-ecs. ECS is at the core and you will need to understand the ECS mindset while working on your game, but don't worry you will ease into it and it will begin to become clear to you why ECS was chosen, as it is a very powerfull and organized design pattern.

Splat ecs uses eslint to test your game code before each time you build it, this will prevent errors or straying from the recomended JavaScript formatting rules.

Let's get into some code.

Everything you will ever edit in your game is inside the src/ folder.

lets examine the exiting game code for the sample project.

if you remember there was a yellow square and keyboard controlls, how does that work.

Open src/data and you will notice several .json files, these are the core of your game because this is where we will store all of the game's data.

Players, enemies, items, backgrounds, animations, everything will be stored in data.

if you open up entities.json you will see an array of entities inside the '[]'

the entity we have listed is
`
{
   "id": 0,
   "name": "player",
   "player": true,
   "position": {
    "x": 100,
    "y": 100
   },
   "size": {
    "width": 100,
    "height": 100
   },
   "velocity": {
    "x": 0,
    "y": 0
   }
  }
`

Notice the id of 0, the name "player", the position, width, and height.

this is our yellow box from before, it is a rectangle that is 100x100 and it's top left corner is drawn at x 100 and y 100 on the canvas screen.
the position, and size objects are what we call components int he ECS world, they can we added, removed, or modified to make an entity have differednt properties and/or behaviours.

There is nothing in this code denoting that it is a rectangle, or that it is yellow, so lets move on to that next.

So we have seen entities and components sofar, what about systems?

lets open up the systems folder and see what is inside.
In the systems folder you will see two other folders named "renderer", and "simulation"

these are the only two types of systems you will need in splat-ecs.
renderer systems draw to the screen, and simulation systems do everything else.
Lets start of looking in the simulation folder, inside we will see a system called control-player.js.
As the name implies control-player.js contains code to make the player move ont he screen when we press keys ont he keyboard.



Splat-ECS uses the common js module format for all system modules you will be creating. In control-player.js you will see module.exports on line 3, line 3 and 21 is the code to export the module for use by the game project and is vital that you wrap your code in this.

you will notice the arguments ecs, and data.   every chunck of code in splat-ecs is run through the ECS so it must be included, data is everything in the data directory which becomes a large JavaScript object when built.

inside that on line 4 there is a function being run on the ecs called addEach, this is saying to run this code on every entity that has "player" set to true (line 20)

So this code is looking in data, and finding anythign wil player set to true, and running the code on that each frame.

every frame this code sets the velocity to 0 ont he x and y axis then checks the four inputs using if statements to see if they are currently pressed.
if any of the inputs ar pressed it will set the velocity to 0.5 or -0.5 respectively for that frame.

So we know how the player moves, what about the rectangle and the color yellow, where does that come from.

lets check out the renderer folder, open up src/systems/renderer/render-player.js

Inside this system we will see how we format our code in Splat-ECS.

again you will see the common js module format (module.exports).

Line 4 is how we tell the this particular system which entities we want it to run on, in this example it will run on anything with 'position' AND 'size' components.
line 5 tells the ECS to runt he following code on every enetity that the search applied to.

this process might seem overwhelming but it will become eisier with time, because it is much simplier to copy this code and just change the registerSeach arguments, and the actual code inside you wish to run.

SO we now know that this system will run on all eneties that have 'position' and 'size' components, but what does this system actually do?

if we read lines 6-9 it is using the normal HTML5 canvas context to draw a yellow rectangle using the size and position specified in the given entities position and size components.

Lets test out the power of ECS by adding another entity and letting this same system handle both

go back into src/data/entities.json and lets copy lines 3-19 and paste them on a new line after  line 19, make sure to add a comma inbetween JavaScript objects int he array. Also make sure to change the 'id' to 1, each splat-ecs entitiy must have tis own unique id number.

`
{
 "main": [
  {
   "id": 0,
   "name": "player",
   "player": true,
   "position": {
    "x": 100,
    "y": 100
   },
   "size": {
    "width": 100,
    "height": 100
   },
   "velocity": {
    "x": 0,
    "y": 0
   }
  },
  {
   "id": 1,
   "name": "player",
   "player": true,
   "position": {
	"x": 100,
	"y": 100
   },
   "size": {
	"width": 100,
	"height": 100
   },
   "velocity": {
	"x": 0,
	"y": 0
   }
  }
 ]
}
`

If we fire up the game we will notice there are two yellow squares... wait there is still just one!

This is because we have two entities with "player" true, this means that the keyboard controls we looked at in src/systems/simulation/control-player.js are beging applied to both entities!

Remove the line `"player": true,` from entity 1, and build the game and try it again.

The reason I did this it to show off how the ECS can be powerful in running the same code for many entities in your game, but you also need to be careful that you tell it what to run the code on correctly.

So know that we have a basic understanding of how this works, letsbegin tweaking it to make out new game.
