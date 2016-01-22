/* var drawSnake = function (snakeToDraw) {
    var drawableSnake = { color:"green", pixels: snakeToDraw };
    var drawableObjects = [drawableSnake];
    CHUNK.draw(drawableObjects);
    
}
*/

var draw = function(snakeToDraw, apple) {
    var drawableSnake = { color: "green", pixels: snakeToDraw };
    var drawableApple = { color: "red", pixels: [apple] };
    var drawableObjects = [drawableSnake, drawableApple];
    CHUNK.draw(drawableObjects);
}

var moveSnake = function (snake) {
    
    return snake.map (function(oldSegment, segmentIndex) {
        var newSegment = moveSegment(oldSegment);
        newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
        return newSegment;
    });
    
}


var ate = function(snake, otherThing) {
    var head = snake[0];
    return CHUNK.detectCollisionBetween([head], otherThing);
}

var advanceGame = function() {
    var newSnake = moveSnake(snake);
    var gotApple = false;
    
    if (ate(newSnake, snake)) {
        CHUNK.endGame();
        CHUNK.flashMessage("Whoops! You ate yourself!");
    }
    
    if (ate(newSnake, [apple])) {
        newSnake = growSnake(newSnake);
        // CHUNK.flashMessage("You just got bigger!")
        gotApple = true;
        document.getElementById("size").textContent = newSnake.length;
        apple = CHUNK.randomLocation();
    }
    
    if (ate(newSnake, CHUNK.gameBoundaries())) {
        CHUNK.endGame();
        CHUNK.flashMessage("Whoops!  You hit a wall!");
    }
    
    snake = newSnake;
    draw(snake, apple);
    if (gotApple === true) {
        CHUNK.flashMessage("You just got bigger!");
        gotApple = false;
    }
}

var moveSegment = function (segment) {
    
    switch (segment.direction) {
        case "down": return {top: segment.top + 1, left: segment.left}; break;
        case "up"  : return {top: segment.top - 1, left: segment.left}; break;
        case "right": return {top: segment.top, left: segment.left + 1}; break;
        case "left" : return {top: segment.top, left: segment.left - 1}; break;
        default: return segment;
    }

}

var changeDirection = function(direction) {
    snake[0].direction = direction;
}

var segmentFurtherForwardThan = function(index, snake) {
    
    return snake[index-1] || snake[index];
    
/*  // The replacement expression above is more interesting.
    if (snake[index-1] === undefined) {
        return snake[index];
    } else {
        return snake[index-1];
    }
 */
}

var growSnake = function(snake) {
    var indexOfLastSegment = snake.length - 1;
    var lastSegment = snake[indexOfLastSegment];
    snake.push({top: lastSegment.top, left: lastSegment.left});
    return snake;
}


var snake = [{top:2, left:0, direction: "down"}, {top:1, left:0, direction: "down"}, {top:0, left:0, direction: "down"}];
// snake[0] is the head.

var apple = { top: 8, left: 10 };

CHUNK.executeNTimesPerSecond(advanceGame, 2); // try at .5 sec. interval
CHUNK.onArrowKey(changeDirection);  // onArrowKey must call changeDirection and passes it the direction parameter.



