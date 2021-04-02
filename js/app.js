var mainContainer = document.querySelector("main");

var menuScreen = function(){
    var createTitle = document.createElement("h1");
    var createPlayButton = document.createElement("button");
    createTitle.textContent = "clonesu!";
    createPlayButton.textContent = "Play!";
    mainContainer.appendChild(createTitle);
    mainContainer.appendChild(createPlayButton);

    createPlayButton.addEventListener("click", () => {
        mainContainer.removeChild(createTitle);
        mainContainer.removeChild(createPlayButton);
        playGame();
    });
}

var setGameUI = function(){
    var totalScoreUI = 0;
    var createTotalScoreText = document.createElement("span");

    createTotalScoreText.setAttribute("id", "totalScoreText");
    createTotalScoreText.textContent = totalScoreUI;
    mainContainer.appendChild(createTotalScoreText);
}

var playGame = function(){
    let gameData = [{
        'trackInformation': {
            title: "test title",
            artist: "test artist",
            album: "test album",
            releaseDate: "September 3, 2003",
            bpm: 120
        },
        'beatMap': [
            {
                id: 1,
                number: 1,
                keyValue: 49,
                xValue: 50,
                yValue: 100,
                delay: 2000
            }, {
                id: 2,
                number: 2,
                keyValue: 50,
                xValue: 200,
                yValue: 100,
                delay: 3000
            }, {
                id: 3,
                number: 3,
                keyValue: 51,
                xValue: 300,
                yValue: 350,
                delay: 3500
            }
        ]
    }];

    // Game Variables
    var totalScore = 0;

    // Creation of game UI elements
    setGameUI();

    // Selectors for the UI
    var totalScoreText = document.querySelector("#totalScoreText");

    // Play beatmap audio
    var audio = new Audio('./assets/music/metronome-track.wav');
    audio.play();

    gameData[0].beatMap.forEach((circle) => {
        setTimeout(function(){
            var createCircle = document.createElement("div");
            var createNumber = document.createElement("p");
            var createCircleTimer = document.createElement("p");

            var circleScore = 0;
            let circleBorder = 40;
            var validCircle = false;
    
            createCircle.setAttribute("class", "osuCircle");
            createCircle.setAttribute("id", `circle${circle.number}`);
            createCircle.setAttribute(
                "style",
                `left: ${circle.xValue}px;
                top: ${circle.yValue}px;`
            );
            createNumber.setAttribute("class", "osuNumber");
            createNumber.setAttribute("id", `number${circle.id}`);
            createCircleTimer.setAttribute("class", "osuCircleTimer");
            createCircleTimer.setAttribute("id", `timer${circle.id}`);
    
            var registerKey = function(e){
                if (validCircle && e.keyCode === circle.keyValue) {
                    switch (true) {
                        case ( circleScore < 5 ):
                            console.log("Poor");
                            totalScore += circleScore;
                            break;
                        case ( circleScore >= 10 && circleScore < 15 ):
                            console.log("OK");
                            totalScore += circleScore;
                            break;
                        case ( circleScore >= 15 && circleScore < 17 ):
                            console.log("Good");
                            totalScore += circleScore;
                            break;
                        case ( circleScore >= 17 && circleScore < 19 ):
                            console.log("Excellent");
                            totalScore += circleScore;
                            break;
                        case ( circleScore === 19 ):
                            console.log("Perfect");
                            totalScore += circleScore;
                            break;
                    }
                    if (document.querySelector(`#circle${circle.id}`)) {
                        mainContainer.removeChild(document.querySelector(`#circle${circle.id}`));
                    }
                    totalScoreText.textContent = totalScore;
                }
            }
    
            var increaseCircleScore = function(){
                setTimeout(function(){
                    if (document.querySelector(`#timer${circle.id}`)) {
                        document.querySelector(`#timer${circle.id}`).textContent = `${circleScore + 1} / 20`;
                    }
                    circleScore++;
                    if ( circleScore < 20 ) {
                        increaseCircleScore();
                    } else if (circleScore === 20) {
                        if (document.querySelector(`#circle${circle.id}`)) {
                            console.log("Miss");
                            window.removeEventListener("keypress", registerKey);
                            mainContainer.removeChild(document.querySelector(`#circle${circle.id}`));
                        }
                    }
                }, 50);
            }
    
            mainContainer.appendChild(createCircle);
            createCircle.appendChild(createNumber);
            createCircle.appendChild(createCircleTimer);
    
            var osuCircle = document.querySelector(`#circle${circle.id}`);
            var osuNumber = document.querySelector(`#number${circle.id}`);
            var osuCircleTimer = document.querySelector(`#timer${circle.id}`);
    
            window.addEventListener("keypress", registerKey);
    
            osuNumber.textContent = circle.number;
            osuCircleTimer.textContent = circleScore;
    
            increaseCircleScore();
    
            osuCircle.addEventListener("mouseover", function(){
                validCircle = true;
            });
            osuCircle.addEventListener("mouseout", function(){
                validCircle = false;
            });
    
        }, circle.delay);
    });
}

menuScreen();