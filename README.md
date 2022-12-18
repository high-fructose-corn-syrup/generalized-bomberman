# generalized-bomberman

### Game Rules

A generalized version of the game Bomberman. No obstacles and bombs go in 8 directions and have a range limited by the size of the grid.  

This comes from a puzzle for which the board is a 23x23 grid. The red squares--capturables--represent spots for which you need to capture using bombs. The bombs explode in 8 directions, N, NE, E, SE, S, SW, W, and NW. You can place a blue square--bomb--at any point on the grid except spots occupied by capturables. The goal is to capture all red squares using a limited number of blue squares.

### Generating Puzzle
If you want to generate solvable puzzles for this game of size `n`x`n` with `M` bombs: pick random `N` spots on your `n`x`n` grid defined by `x, y`. From those points, find all of the grid points that lay on the diagonals, horizontal, and vertical axis from that `x, y` point. With those points, pick random `M` random ones to make a red square. Its notable that a higher `N` results in a harder puzzle because it makes it more difficult to tell where points are sampled from. 


### Intersection Matrix
You can use the intersection matrix to solve the puzzle. The idea is that you work backwards. For each capturable square you generate all the spots the bomb can be placed by going in the 8 described directions. For all of these points you add 1 to a counter keeping track how many times an `x, y` pair has been visited. Places with high intersections represent spots where you would want your bombs to go through which simplifies the puzzle greatly as you just need to place the bombs such that they match enough of the lines generated by intersections. 
![image](https://user-images.githubusercontent.com/107040758/208286178-3e0f7ae5-4b5a-4c61-b5c9-25ba1b35f259.png)
