# NES Tetris Planner

When playing Tetris, it can be difficult to know what play is the best. There's not much information given, you only have your current piece and your next piece to go on. When seeing analysis videos, I saw many that assumed that one knew the piece sequence coming up, because there was no other real way to compare these options, but this is insufficient for any realistic analysis of the game.

That's why I created this tool. It will allow you to set up the scenario you want to analyse, including the stack and current and next pieces, and then allow you to run through all the possible next pieces. You can add multiple "Options" to run through, and then compare them against each other, possible piece by possible piece.

This relies on one main assumption: When looking at two stacks, I can tell you which one I would prefer of the two.

As long as this assumption is true, then this tool will allow you to figure out your preferences for each possibility in the game.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Getting it on Github Pages

1. Switch to the gh-pages branch
2. Run `yarn build`
3. Copy the `build` folder into the root
4. Push it
5. Wait a minute