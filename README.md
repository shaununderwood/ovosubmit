
# Paper, Scissor, Stone

## background
My original thought when reading the assignment was, _two players on one screen? How's that going to 
work?_ Then I saw _Play against the machine_ which made sense.

But my mind didn't let the initial thought rest.  So, I tried to structure the app such that it could
as some point in the future be adapted to easily replace a player with a remotePlayer. I think I've 
achieved a design that would faciliate this feature. 
 
## testing
Before coding I set up the project to use jasmine-karma for unit testing. Hopefully I have by now
included some tests as a nod of forethought.

## routing

Being a game it doesn't necessitate following standard routing practices. 
So, I used a controller mixed with some ng-if and ng-includes.

# Installation
Clone the repo, cd into the top-most folder:

  `npm install && bower install`, then `./start`

