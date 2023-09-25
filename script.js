/* 
Super Common Functions and Or Calls
var xxx document.createElement()
var XXX = document.querySelector()
var XXX document.getElementById()
var XXX document.getElementsByClassName()
var XXX document.getElementsByTagName()
var.innerHTML = "TEXT"
var.setAttribute("style",";;;;;")
var.textContent = "Site 3";
var.appendChild();
var.addEventListener("click", function() {});
event.preventDefault(); // always under submission butons
var.parseFloat(); // converrt string to float number
var.toFixed(2); //rounds number to 2 decimal places
document.addEventListener("keydown", keydownAction); // listen for keydown
document.addEventListener("keyup", keyupAction); // listen for keyup
event.stopPropagation(); // stops bubbling up click events

addEventListener("click", function(event) {
  var element = event.target; // The element clicked
  var xxx = element.getAttribute("data-state") // snatching element attribute
});

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--; // Time Variable outside of function
    var.textContent = secondsLeft;

    if(secondsLeft === 0) {
     DO THING
    }

  }, 1000);
}

function keydownfunction (event) {
  // TODO: Complete keydown function
  document.querySelector("#status").innerHTML = "KEYDOWN Event";
  var.innerHTML = event.key; //The actual key pressed
  var.innerHTML = event.code;
  var.innerHTML = event.Keycode;
} 

*/

var body = document.querySelector("body");
var correct;
var miss;
var frame = document.createElement("main");
var score_card = document.createElement("table");
var score_header = document.createElement("tr");
var score_columns = document.createElement("tr");
var score_title = document.createElement("th");
var score_col_left = document.createElement("td");
var score_col_right =  document.createElement("td");



function landing_page(){
    
    document.querySelector("main").replaceChildren(); // clear the body
    console.log("Landing Page");
    var start_box = document.createElement("div");
    var start_button = document.createElement("button");

    frame.appendChild(start_box);
    start_box.appendChild(start_button);

    start_box.setAttribute("id","start_box");
    start_button.setAttribute("id","start_button");

    start_button.addEventListener("click",begin_game);

    start_button.textContent = "Start Quiz";
    frame.setAttribute("style",
        "display:flex; flex-direction:column; align-items:center; width:100%; justify-content:center; background-color:lightblue;");

    start_box.setAttribute("style",
    "display:flex; flex-direction:column; width:50%; height:50%; background-color:antiquewhite; justify-content:center; align-items:center")
};

function begin_game(){

    document.querySelector("main").replaceChildren(); // clear the body

    var card = document.createElement("div");
    var card_question = document.createElement("div");
    var card_response = document.createElement("div");
    var card_answer = document.createElement("ol");
    var text_slot = document.createElement("li");
    var question_status = document.createElement("div");
    var timer = document.createElement("div");
    var timeleft = 60;
    var question_queue = [];
    var answer_queue =[];
    var driver = 0;
    miss = 0;
    correct = 0;
    correctcount = 0;


    function create_questqueue(array){
        var driver = 0;
        for (i = 0; i < questionaire.length; i++){
            if (i % 2 === 0){
            // Calling all even numbers
                array[driver] = i;
                driver ++;
            }
        }
        return array;
    };

    
    function randomize_queue(array){
        // I'm randomizing the order Fisher-Yates style. This is a well accepted method for randomizing an ordered array.
        var random_index = [];
        var order_index = array.length, random_index;

        while (order_index > 0){
            // Pick a remaining available number
            random_index =     Math.floor(Math.random() * order_index);
            order_index--;

            //Swap it with current element;
            [array[order_index], array[random_index]] = [array[random_index], array[order_index]];
        }
        return array;
    };

    function create_answerqueue(array){
        for (i = 0; i<question_queue.length; i++){
            array[i] = question_queue[i] + 1;
        }
        return array;
    };

    function resetcard(){
        for (i =0; i<answer.length; i++){
        document.getElementById("slot"+[i.toString()]).remove(); //got to kill the old slots to make room for new
        }
    };

    function callquestion(){
        // ToDO: Call question from array
        card_question.innerHTML = questionaire[question_queue[0]];
        //card_answer.innerHTML = Array(questionaire[answer_queue[0]].length)
        answer = questionaire[answer_queue[0]].split("");// split the answer into an array of characters
        question_status.textContent = " ";
        console.log(answer);
        for (i = 0; i < answer.length; i++){
    // replace each character with an underscore;
            text_slot = document.createElement("li");
            text_slot.setAttribute("id","slot" + i.toString());
            text_slot.textContent = "-";
            card_answer.appendChild(text_slot);
        };
    };

    function keydownAction(event) {
        var keycode = event.keyCode;
        if (keycode !== 13 && keycode !== 16 && keycode !== 17 &&keycode !== 18 && keycode !== 20){ //avoid shift, alt, ctrl, capslock
            if (keycode !== 8) {
                target = document.getElementById("slot"+driver.toString());
                target.textContent = event.key;
                if (driver <answer.length){
                    driver++;}
            } else if (keycode === 8){
                if (driver >0){
                    target = document.getElementById("slot"+(driver-1).toString());
                    target.textContent ="-";
                    driver--;
                    } // backspace
            }; // enter
        } else if (keycode === 13){ // hit enter 
            checkanswer();
        };
    };

    function checkanswer(){

        var markdown = false;

        function checkletters(){
            for (i =0; i<answer.length; i++){
                var testletter = document.getElementById("slot"+[i.toString()]).textContent;
                var answerletter = answer[i];
                testletter = testletter.toLowerCase();
                answerletter = answerletter.toLowerCase();
                if (testletter !== answerletter) {
                    markdown = true; // Any mistake is permanent
                };
             };
             return markdown
        }; // Not going to punish upper and lower case, but no accents

        function checkpunish(value){
            if (value){
                timeleft -= 5;
                timer.textContent = timeleft;
                miss = miss +1;
                question_status.textContent = "Incorrect. Please Try Again.";
                console.log("miss");
            } else { 
                correct = correct +1;
                question_status.textContent = "Correct";
                console.log("corrrect")
                moveforward();
            };
        }
        
        checkletters();
        checkpunish(markdown);
    };

    function moveforward(){
        correctcount = correctcount +1;
        if (correctcount === answer_queue.length){
            document.removeEventListener("keydown", keydownAction);
            game_over()
        } else { 
            question_queue.push(question_queue[0]);//put the current at the end of the queue
            question_queue.shift();// remove the current from the front of the queue
            answer_queue.push(answer_queue[0]);//put the current answer at the end of the queue
            answer_queue.shift();// remove the current answer from the front of the queue 
            driver = 0; 
            //console.log(question_queue);
            //console.log(answer_queue);
            resetcard(); // reset the driver
            callquestion(); // call the next question
         };
    };

    function setTime() {
        var timerInterval = setInterval(function() {
        timeleft--; // Time Variable outside of function
        timer.textContent = timeleft.toString();
        if(timeleft <= 0) {
            timer.textContent = "Time's Up!";
            clearInterval(timerInterval);
            document.removeEventListener("keydown", keydownAction);
            game_over();
        }
    
        }, 1000);
    };
    
    card.setAttribute("id","card");
    card_question.setAttribute("id","question");
    card_response.setAttribute("id","response");
    timer.setAttribute("id","timer");
    question_status.setAttribute("id","status");

    frame.appendChild(card);
    frame.appendChild(timer);
    card.appendChild(card_question);
    card.appendChild(card_response);
    card.appendChild(question_status);
    card.appendChild(timer);
    card_response.appendChild(card_answer);
    card_answer.appendChild(text_slot);

    card.setAttribute("style",
        "display:flex; flex-direction:column; width:50%; height:50%; background-color:antiquewhite; justify-content:center; align-items:center");
    card_answer.setAttribute("style",
        "list-style-type:none; display:flex;flex-direction:row");    



    question_queue = create_questqueue(question_queue); // create the queue of questions (even numbers only becuase those are questions.)
    console.log(question_queue);
    question_queue = randomize_queue(question_queue); // randomize the order of the questions
    console.log(question_queue);
    answer_queue = create_answerqueue(answer_queue); // create the queue of answers (odd numbers only because those are answers.)
    console.log(answer_queue);
    callquestion();
    timer.textContent = timeleft;
    setTime();
    document.addEventListener("keydown", keydownAction);
}; // end of begin_game function

function game_over(){
    var scoreboard = document.createElement("div");
    var score_title = document.createElement("div");
    var score = document.createElement("div");
    var submission = document.createElement("div");
    var prompt_button = document.createElement("button");
    var initials_box = document.createElement("textarea");
    var initials = '';
    var big_score = [];

    function submit (){
       
        function save(event){
            event.preventDefault();
            console.log(initials);

            var row = score_card.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerText = initials;
            cell2.innerText = big_score;

            /*var new_row_index = score_card.rows.length;
            var new_row = score_card.insertRow(new_row_index);
            var new_initials = initials;
            var new_score = big_score;
            console.log(score_card.rows.length);
            console.log(new_row_index);
            console.log(initials);
            new_initials = new_row.insertCell(0);
            new_score = new_row.insertCell(1);*/
            score_card.setAttribute("style","display:flex; flex-direction:column");
            landing_page(); // restart the game
        };
    

        prompt_button.textContent ="Save"
        scoreboard.appendChild(initials_box);
        initials = document.getElementById("initials_box").value;
        prompt_button.addEventListener("click", save);
    };

    document.querySelector("main").replaceChildren();
    console.log("Game Over");

    frame.appendChild(scoreboard);
    scoreboard.appendChild(score_title);
    scoreboard.appendChild(score);
    scoreboard.appendChild(submission);
    submission.appendChild(prompt_button);

    prompt_button.addEventListener("click",submit);
    prompt_button.textContent = "Would You like to Save your Score?";


    scoreboard.setAttribute("id","scoreboard");
    score_title.setAttribute("id","score_title");
    initials_box.setAttribute("id","initials_box")
    score.setAttribute("id","score");

    scoreboard.setAttribute("style",
    "display:flex; flex-direction:column; width:50%; height:50%; background-color:antiquewhite; justify-content:center; align-items:center");

    score_title.textContent = "Your Score is:";
    score.textContent = correct.toString()+"/"+(correct+miss).toString();
    big_score = score.textContent;
}


body.setAttribute("style","boxSizing: border-box; display:flex; flex-direction:row");

body.appendChild(frame);
body.appendChild(score_card);
score_card.appendChild(score_header);
score_card.appendChild(score_columns);
score_header.appendChild(score_title);
score_columns.appendChild(score_col_left);
score_columns.appendChild(score_col_right);

score_title.textContent = "Your High Scores";
score_col_left.textContent = "Initials";
score_col_right.textContent = "Score";

score_col_left.setAttribute("style", "width:50%");
score_col_right.setAttribute("style", "width:50%");
score_card.setAttribute("id","score_card");
score_card.setAttribute("style", "display:none; padding:15px");

landing_page();