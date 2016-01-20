
# Paper, Scissor, Stone

## background
My original though when reading the assignment was, _two players on one screen? How's that going to work?_

Then I saw _Play against the machine_ which made sense.

But my mind didn't let the initial thought rest.  So, I tried to structure the app such that it could
as some point in the future be adapted to easily replace a player with a remotePlayer, just as
 computerPlayer will have to do.
 
## testing
Before coding i set up the project to use jasmine-karma for unit testing. Hopefully I have by now
included some tests as a token of forethought.

## routing

Being a game it doesn't necessitate following standard routing practices. So, I used a LayoutController.

