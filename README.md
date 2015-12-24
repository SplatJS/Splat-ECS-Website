Splat-ECS is a free and Open Source game engine project with the goal of making it easy to build games which are native to the web.
This tutorial will guide you through the basics of using splat-ecs and by the end we will have a simple game.
in this tutorial you will learn:
* Splat-ecs recomended workflow
* The ECS mindset for building data-driven games
* Keyboard controls
* Sprite animation
* Using the camera
* Collision detection / resolution
* Timers
* Drawing text to the screen
* Creating and linking new scenes
* Basic easing

## Getting started with a new game project
##### Clone the splat-ecs starter project
In your terminal:
```bash
git clone https://github.com/SplatJS/splat-ecs-starter-project.git
```
cd into the starter project directory and install dependencies. this will install all of the games dependencies from NPM including the splat-ecs engine.
```bash
cd splat-ecs-starter-project
npm install
```

Open package.json in your code editor of choice.
change name to the name of your game (no caps or spaces)

edit "description" to describe your game

"repository" -> "url" to your github project url (if you have one)

"bugs" -> "url" to your github project url (if you have one)

"homepage" to your game project's website (if you have one)

change "author" to your name

change "license" to 'proprietary' unless you want your game to be free and open source.

#### Building your game
To get a feeling for the process we will use during development open the starter project in your terminal and run
```bash
npm run build
```
This is the build command that creates a fresh 'build' of your game which you can try in your browser or distribute on the web, once this command is run the only thing you need to play your game is the 'build' folder and its contents.


> For example if you were submitting your game to itch.io you could zip and rename the build folder and upload that as your game.

Inside the build folder we have **index.html**, **index.js**,  **images/*, and **sounds**.

**index.html** - The main html page your game will be displayed on, this contains the canvas element where your game is displayed.

**index.js** - this is all of the code of your game, but it is also all the code for Splat-ECS and all of its dependencies, This is a 'compiled' build version so everything is smashed into a single file.

**images**, **sounds** - where the assets your games uses live in the build folder.

>Never edit anything in the build folder, this is the output of your game and the next time you run `npm run build` it will all be overwritten anyway.

The build is only for testing your game in the browser, and distributing it to others, you will never need to do anything in the build but run it from the **index.html** file.

>Due to cross site scripting security measures google chrome and potentially other browsers will not run a splat-ecs game from a folder on your computer. Our recomendation is to run your build using a small web server such as node-static or python SimpleHTTPServer. You can also open the index.html in firefox since it does not seem to have this issue.

### Serving your game locally
 There are two options listed but any web server will work since splat-ecs games are all flat files. Chose the one you are most comfortable with:
##### node-static
node static installation instructions and usage:
`npm install -g node-static`
I recomend opening a new terminal tab or window since static needs stays active while running.
in your game's root directory run this command:
` static -H '{"Cache-Control": "no-cache, must-revalidate"}' -p 1337 build`

feel free to replace '1337' with the port of your choosing.
`-H '{"Cache-Control": "no-cache, must-revalidate"}'` will prevent caching of your game, so you can be sure it is always showing you the latest version
The last word 'build' if refering to your game's build directory.

##### python SimpleHTTPServer

node static installation instructions and usage:

I recomend opening a new terminal tab or window since python SimpleHTTPServer needs stays active while running.
in your game's build directory run this command:
`python -m SimpleHTTPServer 1337`
feel free to replace '1337' with the port of your choosing.



#### Trying out the test project:

So now you should have a webserver serving your game.
You should try running your game to make sure it is working before you continue.
Open a browser and go to http://127.0.0.1:1337 (or the port you chose).

The splat-ecs sample game is just a yellow square you can control with WASD, or arrow keys.
Test that this is working and note that if the keys are not working you may need to click inside the browser window to give the game your 'focus'.

Now that we have a sample game running we can get started.

#### Understanding ECS

Splat-ECS uses an Entity Component system or ECS for short, as the name implies this is a very important part of splat-ecs. ECS is at the core and you will need to understand the ECS mindset while working on your game, but don't worry you will ease into it and it will begin to become clear to you why ECS was chosen, as it is a very powerful and organized design pattern.
##### Splat-ECS basics
* All objects in the game that you can interact with should be entities
* The only way to modify an entity is to edit or delete it's components or add new components
* Systems run in the game loop (once per frame)
* Systems are where your JavaScript code will live, and there are two types Renderer and Simulation

#### Code formatting and error checking

Splat-ECS uses [eslint](http://eslint.org/) to test your game code before each time you build it, this will prevent errors or straying from the reccomended JavaScript formatting rules. When you build your game you may see errors or warnings, errors prevent the game from building and must be addressed before you can continue.


#### Working on your game
Let's get into some code.

Everything you will ever edit in your game is inside the **src/** folder.

lets examine the existing game code for the sample project.

If you remember there was a yellow square and keyboard controls, how does that work?


#### Entities and their Components

Open **src/data** and you will notice several .json files, these are the core of your game because this is where we will store all of the game's data.

> Players, enemies, items, backgrounds, animations, everything will be stored in data.

If you open up entities.json you will see an array of entities inside the '[]'

the entity we have listed is
```json
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
```

Notice the id of 0, the name "player", the position, width, and height.

This is our yellow box from before, it is a rectangle that is 100x100 and it's top left corner is drawn at x 100 and y 100 on the screen.
The position, and size objects are what we call components in the ECS world, they can be added, edited, or deleted to make an entity have different properties and/or behaviours.

There is nothing in this code denoting that it is a rectangle, or that it is yellow, so lets move on to that next.

#### Systems
So we have seen entities and components sofar, what about systems?
lets open up the **systems** folder and see what is inside.
In the **systems** folder you will see two other folders named **renderer**, and **simulation**

These are the only two types of systems you will need in splat-ecs.
**renderer systems** draw to the screen, and **simulation systems** do everything else.
Lets start of looking in the **simulation folder**, inside we will see a system called **control-player.js**.
As the name implies **control-player.js** contains code to make the player move ont he screen when we press keys on the keyboard.

>Splat-ECS uses the Common JS module format for all system modules you will be creating.
Inside this system we will see how we format our code in Splat-ECS.
In **control-player.js** you will see module.exports on line 3, line 3 and 21 is the code to export the module for use by the game project and is vital that you wrap your code in this.

You will notice the arguments ecs and data, every chunk of system code in splat-ecs is run through the ECS so it must be included, data is everything in the data directory which becomes a large JavaScript object when the game is built.

Starting on line 4 there is a function being run on the ECS called addEach, this is saying to run this code on every entity that has "player" set to true (line 20).

So this code is looking in data, and finding anything entity in entities.js with `
"player": true` and running the code on that entity each frame.

Every frame this perticular code sets the velocity to 0 on the x and y axis then checks the four inputs using if statements to see if they are currently pressed. If any of the inputs are pressed it will set the velocity to 0.5 or -0.5 respectively for that frame.

So now we know how the player moves, what about the rectangle and the color yellow, where does that come from?

lets check out the renderer folder, open up **src/systems/renderer/render-player.js**

Again you will see the Common JS module format (module.exports).

Line 4 is how we tell the this particular system which entities we want it to run on, in this example it will run on anything with 'position' AND 'size' components. Line 5 tells the ECS to run the following code on every entity that the search applied to.
This process might seem overwhelming but it will become easier with time. It is much simpler to copy an existing system and just change the registerSeach arguments, and the actual code inside you wish to run.

SO we now know that this system will run on all entities that have 'position' and 'size' components, but what does this system actually do?

If we read lines 6-9 it is using the normal HTML5 canvas context to draw a yellow rectangle using the size and position specified in the given entities position and size components.

Lets test out the power of ECS by adding another entity and letting this same system handle rendering both.

Go back into **src/data/entities.json** and lets copy lines 3-19 and paste them on a new line after line 19, make sure to add a comma in between JavaScript objects in the array. Also make sure to change the 'id' to 1, each splat-ecs entity must have it's own unique id number.

```json
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
```

If we fire up the game we will notice there are two yellow squares... wait there is still just one!

This is because we have two entities with `"player": true`, this means that the keyboard controls we looked at in **src/systems/simulation/control-player.js** are being applied to both entities, so there are two squares but they are always in the exact same location!

Remove the line `"player": true,` from entity 1, and build the game and try it again.

The reason I did this it to show off how the ECS can be powerful in running the same code for many entities in your game, but you also need to be careful that you tell it what to run the code on correctly.

So know that we have a basic understanding of how this works, let's begin tweaking it to make out new game.
