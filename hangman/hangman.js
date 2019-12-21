$(document).ready(function() {
    var wordBank = ["TITANIC", "BLACKPEARL", "ENTERPRISE", "BOW", "STERN", "PORT", "STARBOARD", "BOAT"];
    var lettersGuessed;
    var word;
    var wordLength;
    var life = 6;
    var locations;
    var wins = 0;
    var loses = 0;


    $("#start").on("click", function() {
        $("#start").addClass("hide");
        $("#restart").addClass("hide");
        start()
    });
    $("#restart").on("click", function() {
        $("#restart").addClass("hide");
        $("#statusImage").attr("src", " https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRlfMBjcIQ6qRlMKo_oQZL3vE_jiPLmrpvtIN5PFLev_HrFvniK");
        start()
    });

    function restart() {
        $(".letter").addClass("disappear");
        $("#restart").removeClass("hide");
        $("#letter-display").addClass("hide");

        life = 6;
    }

    function start() {
        var randomIndex = Math.floor(Math.random() * wordBank.length);
        word = wordBank[randomIndex];
        /*console.log(`The chosen word is ${word}.`); */

        /*
        for(var i = 0; i < word.length;i++){
            wordLength[i] = "_";
        }
        */
        wordLength = "_".repeat(word.length).split("");
        $("#letter-display").text(wordLength.join(" "));
        $("#letter-display").removeClass("hide")
        for (var i = 65; i < 91; i++) {
            var letterButton = $("<button>");
            letterButton.addClass("letter");
            letterButton.attr("letterData", String.fromCharCode(i));
            letterButton.text(String.fromCharCode(i));
            letterButton.on("click", function() {
                lettersGuessed = $(this).attr("letterData");
                console.log(lettersGuessed);
                $(this).addClass("hide");
                letterCheck()
            });
            $("#keyboard").append(letterButton);
        }
    }

    function letterCheck() {
        /*
        console.log("working");
        for (var i = 0; i < wordLength.length; i++) {
            if (word[i] === lettersGuessed) {
                wordLength[i] = lettersGuessed;
                $("#letter-display").append(wordLength);
            } else {
                life--
                break
            }
        }
        */
        let wordArray = word.split("");
        locations = [];
        let idx = wordArray.indexOf(lettersGuessed);
        if (idx === -1) {
            life--
            $("#guessesLeft").text(`Guesses Remaining: ${life}`);
            console.log(life);
        }
        while (idx != -1) {
            locations.push(idx);
            idx = wordArray.indexOf(lettersGuessed, idx + 1);
        }
        for (let i = 0; i < locations.length; i++) {
            wordLength[locations[i]] = wordArray[locations[i]];
            $("#letter-display").text(wordLength.join(" "));
        }

        console.log(wordLength)
        console.log(locations)








        if (word === wordLength.join("")) {
            wins++
            $(".wins").text(`Wins: ${wins}`);
            $("#statusImage").attr("src", "https://media.vanityfair.com/photos/5a987f511c6be356b8dcf8a5/master/w_1820,h_1240,c_limit/titanic-anniversary-sai-2-embed-02.jpg")
            console.log("You Win");
            $(".soundW")[0].play()
            console.log("soundW") // this part here
            restart()
        } else if (life === 0) {
            loses++
            $(".loses").text(`loses: ${loses}`);
            $("#statusImage").attr("src", "https://img.theculturetrip.com/768x432/wp-content/uploads/2017/03/titanic.jpeg")
            console.log("you Lose");
            $(".soundL")[0].play()
            restart()
        }
    }





});