let gameData = [{
    'trackInformation': {
        trackMeta: {
            trackTitle: "test title",
            trackArtist: "test artist",
            trackAlbum: "test album",
            trackReleaseDate: "September 3, 2003",
            trackLabel: "test label"
        },
        bpm: 120,
        songLengthMS: 7000
    },
    'beatMap': [
        {
            id: 1,
            validCircle: false,
            xValue: 50,
            yValue: 100,
            delay: 2000
        }, {
            id: 2,
            validCircle: false,
            xValue: 200,
            yValue: 100,
            delay: 2500
        }, {
            id: 3,
            validCircle: false,
            xValue: 300,
            yValue: 350,
            delay: 3500
        }, {
            id: 4,
            validCircle: false,
            xValue: 500,
            yValue: 350,
            delay: 4500
        }, {
            id: 5,
            validCircle: false,
            xValue: 400,
            yValue: 200,
            delay: 5500
        }, {
            id: 6,
            validCircle: false,
            xValue: 0,
            yValue: 0,
            delay: 8000,
            end: true
        }
    ]
}];
// Main container for the game
var mainContainer = document.querySelector("main");

mainContainer.style.width = (window.innerWidth) + "px";
mainContainer.style.height = (window.innerHeight) + "px";

window.addEventListener("resize", function () {
    mainContainer.style.width = (window.innerWidth) + "px";
    mainContainer.style.height = (window.innerHeight) + "px";
});

// Sets up UI for main menu
var menuScreen = function(gameData){

    var menuElement = document.createElement("div");
    var createTitle = document.createElement("h1");
    var createPlayButton = document.createElement("button");

    menuElement.setAttribute("id", "menuElement");

    createTitle.textContent = "clonesu!";
    createPlayButton.textContent = "Play!";

    mainContainer.appendChild(menuElement);
    menuElement.appendChild(createTitle);
    menuElement.appendChild(createPlayButton);

    createPlayButton.addEventListener("click", () => {
        mainContainer.removeChild(menuElement);
        playGame(gameData);
    });
}

// Sets up UI for game
var setGameUI = function(){

    // Integer Values
    var totalScoreUI = 0;
    var totalHealthUI = 50;

    // UI Values
    var createTotalScoreText = document.createElement("span");
    var createTotalHealthText = document.createElement("span");

    createTotalScoreText.setAttribute("id", "totalScoreText");
    createTotalHealthText.setAttribute("id", "totalHealthText");

    createTotalScoreText.textContent = `Total Score: ${totalScoreUI}`;
    createTotalHealthText.textContent = `Total Health: ${totalHealthUI}`;

    mainContainer.appendChild(createTotalScoreText);
    mainContainer.appendChild(createTotalHealthText);
}

var finishGame = function (totalScore) {
    mainContainer.removeChild(document.querySelector("#totalScoreText"));
    mainContainer.removeChild(document.querySelector("#totalHealthText"));

    var gameSummary = document.createElement("div");
    var gameOverHeaderText = document.createElement("h1");
    var finalScoreText = document.createElement("p");
    var toMenuButton = document.createElement("button");

    gameSummary.setAttribute("id", "gameSummary");
    gameOverHeaderText.setAttribute("id", "gameOverHeaderText");
    finalScoreText.setAttribute("id", "finalScoreText");
    toMenuButton.setAttribute("id", "toMenuButton");

    gameOverHeaderText.textContent = "Level Passed";
    finalScoreText.textContent = `Final Score: ${totalScore}`;
    toMenuButton.textContent = "Back To Menu";

    mainContainer.appendChild(gameSummary);
    gameSummary.appendChild(gameOverHeaderText);
    gameSummary.appendChild(finalScoreText);
    gameSummary.appendChild(toMenuButton);

    toMenuButton.addEventListener("click", function () {
        mainContainer.removeChild(document.querySelector("#gameSummary"));
        // menuScreen(gameData); // for when multiple playthrough bug is fixed
        window.location.href = '/';
    });
}

var playGame = function(gameData){
    console.log(gameData);

    // Game Variables
    var totalScore = 0;
    let totalHealth = 50;

    // Creation of game UI elements
    setGameUI();

    // Selectors for the UI
    var totalScoreText = document.querySelector("#totalScoreText");
    var totalHealthText = document.querySelector("#totalHealthText");

    // Play beatmap audio
    var audio = new Audio('./assets/music/metronome-track.wav');
    audio.play();

    gameData[0].beatMap.forEach((circle) => {
        setTimeout(function(){
            if (!circle.end) {
                var createCircle = document.createElement("div");
                var createCircleTimer = document.createElement("p");

                var circleScore = 0;
        
                createCircle.setAttribute("class", `osuCircle`);
                createCircle.setAttribute("id", `circle${circle.id}`);
                createCircle.setAttribute(
                    "style",
                    `left: ${circle.xValue}px;
                    top: ${circle.yValue}px;`
                );
                createCircleTimer.setAttribute("class", "osuCircleTimer");
                createCircleTimer.setAttribute("id", `timer${circle.id}`);
        
                var registerKey = function(e){
                    if (circle.validCircle && e.keyCode === 32 /* spacebar keycode */) {
                        switch (true) {
                            case ( circleScore < 50 ):
                                console.log("Poor");
                                totalScore += circleScore;
                                if (totalHealth !== 100) {
                                    totalHealth = totalHealth + 5;
                                    if (totalHealth > 100) {
                                        totalHealth = 100;
                                    }
                                }
                                break;
                            case ( circleScore >= 50 && circleScore < 70 ):
                                console.log("OK");
                                totalScore += circleScore;
                                if (totalHealth !== 100) {
                                    totalHealth = totalHealth + 8;
                                    if (totalHealth > 100) {
                                        totalHealth = 100;
                                    }
                                }
                                break;
                            case ( circleScore >= 70 && circleScore < 85 ):
                                console.log("Good");
                                totalScore += circleScore;
                                if (totalHealth !== 100) {
                                    totalHealth = totalHealth + 12;
                                    if (totalHealth > 100) {
                                        totalHealth = 100;
                                    }
                                }
                                break;
                            case ( circleScore >= 85 && circleScore < 99 ):
                                console.log("Excellent");
                                totalScore += circleScore;
                                if (totalHealth !== 100) {
                                    totalHealth = totalHealth + 15;
                                    if (totalHealth > 100) {
                                        totalHealth = 100;
                                    }
                                }
                                break;
                            case ( circleScore === 99 ):
                                console.log("Perfect");
                                totalScore += circleScore;
                                if (totalHealth !== 100) {
                                    totalHealth = totalHealth + 20;
                                    if (totalHealth > 100) {
                                        totalHealth = 100;
                                    }
                                }
                                break;
                        }

                        // Removes circle by removing child off of the main container
                        if (document.querySelector(`#circle${circle.id}`)) {
                            mainContainer.removeChild(document.querySelector(`#circle${circle.id}`));
                        }
                        
                        // Overwrites total score when key is pressed
                        totalScoreText.textContent = `Total Score: ${totalScore}`;
                        totalHealthText.textContent = `Total Health: ${totalHealth}`;

                    }
                }
        
                var increaseCircleScore = function(){
                    setTimeout(function(){
                        if (document.querySelector(`#timer${circle.id}`)) {
                            document.querySelector(`#timer${circle.id}`).textContent = `${circleScore + 1} / 100`;
                        }
                        circleScore++;
                        if ( circleScore < 100 ) {
                            increaseCircleScore();
                        } else if (circleScore === 100) {
                            if (document.querySelector(`#circle${circle.id}`)) {
                                console.log("Miss");

                                // Update health
                                totalHealth = totalHealth - 20;
                                totalHealthText.textContent = `Total Health: ${totalHealth}`;

                                window.removeEventListener("keypress", registerKey);
                                mainContainer.removeChild(document.querySelector(`#circle${circle.id}`));
                            }
                        }
                    }, 10);
                }
        
                mainContainer.appendChild(createCircle);
                createCircle.appendChild(createCircleTimer);
        
                var osuCircle = document.querySelector(`#circle${circle.id}`);
                var osuCircleTimer = document.querySelector(`#timer${circle.id}`);

                // Adds event listener for individual circle
                window.addEventListener("keypress", registerKey);
        
                osuCircleTimer.textContent = circleScore;
        
                increaseCircleScore();

                // Event listeners for when the player hovers over a circle
                osuCircle.addEventListener("mouseover", function(){
                    circle.validCircle = true;
                });
                osuCircle.addEventListener("mouseout", function(){
                    circle.validCircle = false;
                });

            } else {
                console.log("Total Score:", totalScore);
                finishGame(totalScore);
            }
        }, circle.delay);
    });
}

menuScreen(gameData);