

var body = document.querySelector("body");
var frame = document.createElement("main");
var scores = [];
var storedscore = JSON.parse(localStorage.getItem("highscores"));
var button_style = "width:100%; padding:10px; margin: 20px; font-size:1.7em; border-radius: 20px; background-color:rgb(240, 248, 255); box-shadow: 10px 10px 10px rgb(222, 184, 135)";
var card_style = "width:85%; height:85%; background-color:antiquewhite; border-radius: 20px; box-shadow: 10px 10px 10px rgb(100, 149, 237);";
var row_style = "display:flex; flex-direction:row; justify-content:center; align-items:center;"
var col_style = "display:flex; flex-direction:column; justify-content:center; align-items:center;"


function create_scoretable(){
    var score_card = document.createElement("table");
    var score_header = document.createElement("tr");
    var score_columns = document.createElement("tr");
    var score_title = document.createElement("th");
    var score_col_left = document.createElement("td");
    var score_col_right =  document.createElement("td");

    function render_scores (storedscore){
        console.log("rendering");
        for (i =0; i< storedscore.length; i++){
                var row = score_card.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerText = storedscore[i][0];
                cell2.innerText = storedscore[i][1];
        };
    };

    function stylize (){
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
    }

    stylize();
    if (storedscore !== null) {
        render_scores(storedscore);
        score_card.setAttribute("style","display:flex; flex-direction:column; padding:15px");
    } else {
        score_card.setAttribute("style", "display:none; padding:15px");
    };
};

function landing_page(){

    var title = document.createElement("h1");
    var subtitle = document.createElement("h2");
    var start_box = document.createElement("div");
    var button_box = document.createElement("div");
    var start_button_fillin = document.createElement("button");
    var start_button_multi = document.createElement("button");
    var clear_button = document.createElement("button");
    var game_type = "";

    function stylize() {

        frame.appendChild(start_box);
        start_box.appendChild(title);
        start_box.appendChild(subtitle);
        start_box.appendChild(button_box);
        button_box.appendChild(start_button_fillin);
        button_box.appendChild(start_button_multi);
        button_box.appendChild(clear_button);
    
        title.setAttribute("id","title");
        title.textContent = "Web Development Quiz"
        subtitle.setAttribute("id","subtitle")
        subtitle.textContent = "Pick a Quiz type below to begin studying! Watch out, you only have a minute to complete the Quiz!"
        start_box.setAttribute("id","start_box");
        start_button_fillin.setAttribute("id","start_button");
        start_button_fillin.textContent = "Begin Fill-in-Blank Quiz (Hard Mode)";
        start_button_multi.setAttribute("id","start_button");
        start_button_multi.textContent = "Begin Multiple Choice Quiz (Normal Mode)";
        clear_button.setAttribute("id","clear_button");
        clear_button.textContent = "Clear High Scores";

        
        frame.setAttribute("style", "display:flex; flex-direction:column; align-items:center; width:100%; justify-content:center; background-color:lightblue; ");
        start_box.setAttribute("style", card_style+ " " + col_style);
        title.setAttribute("style", "font-size:5em; margin:30px;")
        subtitle.setAttribute("style", "font-size:2em; margin:20px; text-align:center")
        button_box.setAttribute("style", col_style);
        console.log( card_style+" "+row_style);
        for (i = 0; i < button_box.children.length; i++){
            button_box.children[i].setAttribute("style", button_style);
        };
    };

    function clear_scores(){
        if (storedscore !== null){
            storedscore = JSON.parse(localStorage.getItem("highscores")) // I want to call this to capture any current storedscores.
            console.log(score_card.rows.length);
            console.log(score_card);
            localStorage.removeItem("highscores");
            storedscore = [];
            for (i =0; i< score_card.rows.length-2; i++){ // Deleting from bottom up, leaving top rows
                var row_count = score_card.rows.length;
                score_card.deleteRow(row_count-1); //Just run this for loop enough times to kill everything.
            };
            score_card.setAttribute("style", "display:none; padding:15px");
            console.log("clearing");
        };
    };
    
    document.querySelector("main").replaceChildren(); // clear the mainframe
    start_button_fillin.addEventListener("click",function () {game_type = "fill"; begin_game(game_type)});;
    start_button_multi.addEventListener("click",function () {game_type = "multi"; begin_game(game_type)});
    clear_button.addEventListener("click", clear_scores);
    stylize ();
};


function begin_game(game_type){

    var card = document.createElement("div");
    var card_question = document.createElement("div");
    var card_response = document.createElement("div");
    var card_answer = document.createElement("ol");
    var answer_slot = [document.createElement("li")];
    var question_status = document.createElement("div");
    var timer = document.createElement("div");
    var timeleft = 60;
    var correct = 0;
    var miss = 0;
    var question_queue = [];
    var answer_queue =[];
    var driver = 0;
    var correctcount = 0;

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

    function create_answerqueue(array){
        for (i = 0; i<question_queue.length; i++){
            array[i] = question_queue[i] + 1;
        }
        return array;
    }

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

    function resetcard(parent){
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);//remove the children of the feature.
        }
    };

    function callquestion(){
        // ToDO: Call question from array
        card_question.innerHTML = questionaire[question_queue[0]];
        if (game_type === "fill"){
            answer = questionaire[answer_queue[0]].split("");// split the answer into an array of characters
            question_status.textContent = " ";
            //console.log(answer);
            for (i = 0; i < answer.length; i++){
        // replace each character with an underscore;
                answer_slot = document.createElement("li");
                answer_slot.setAttribute("id","slot" + i.toString());
                answer_slot.setAttribute("class","slot");
                answer_slot.textContent = "-";
                card_answer.appendChild(answer_slot);
            };
        };
        if (game_type === "multi"){
            var wrong_choice = [];
            var correct_choice = [];// Correct Choice for the multiple choice options
            var choice_queue = [];
            var choice = [];
            function fill_choices (){
                wrong_choice = answer_queue.slice(1);
                correct_choice = answer_queue[0];
                randomize_queue(wrong_choice); //randomize the wrong choices, take the first three
                for (i = 0; i < 3; i++){
                    choice_queue[i] = wrong_choice[i];
                };
            choice_queue.push(correct_choice); //Add the correct answer back
            randomize_queue(choice_queue); //Randomize answers again
            };
            
            fill_choices();
            answer = questionaire[answer_queue[0]];
            question_status.textContent = " ";
            randomize_queue(choice_queue);
            for (i = 0; i < 4; i++){
                answer_slot = document.createElement("button");
                answer_slot.setAttribute("id","button" + i.toString());
                answer_slot.innerHTML = questionaire[choice_queue[i]];
                card_answer.appendChild(answer_slot);
                answer_slot.addEventListener("click", function(event){
                    choice = event.target.innerHTML;
                    checkanswer(choice)});
                //answer_slot.addEventListener("click", checkanswer());
                }
        }
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

    function checkanswer(choice){

        console.log("checking");
        var markdown = false;
        
        function checkpunish(value){
            console.log("punshing");
            if (value){
                timeleft -= 5;
                timer.textContent = "Seconds Remaining: " +timeleft;
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
        
        function checkletter (){
            console.log("filling")
            for (i =0; i<answer.length; i++){
                var testletter = document.getElementById("slot"+[i.toString()]).textContent;
                var answerletter = answer[i];
                testletter = testletter.toLowerCase();
                answerletter = answerletter.toLowerCase();
                if (testletter !== answerletter) {
                    markdown = true; // Any mistake is permanent
                    console.log("marking");
                };
            };
                return markdown
        
            };
        
        function checkchoice (choice){
            if (choice !== answer){
                markdown = true;
            };
            return markdown;
        };

        if (game_type === "fill"){
            checkletter ()};

        if (game_type === "multi"){
            checkchoice (choice);}

        checkpunish(markdown);   // Not going to punish upper and lower case, but no accents       
    };

    function moveforward(){
        correctcount = correctcount +1;
        if (correctcount === answer_queue.length){
            document.removeEventListener("keydown", keydownAction);
            timeleft = 0;
            game_over(correct,miss);
        } else { 
            question_queue.push(question_queue[0]);//put the current at the end of the queue
            question_queue.shift();// remove the current from the front of the queue
            answer_queue.push(answer_queue[0]);//put the current answer at the end of the queue
            answer_queue.shift();// remove the current answer from the front of the queue 
            driver = 0; 
            //console.log(question_queue);
            //console.log(answer_queue);
            resetcard(card_answer); // reset the driver
            callquestion(); // call the next question
            stylize(); //gotta restyle the card
         };
    };

    function setTime() {
        var timerInterval = setInterval(function() {
        timeleft--; // Time Variable outside of function
        timer.textContent = "Seconds Remaining: " + timeleft.toString();
        if(timeleft <= 0) {
            timer.textContent = "Time's Up!";
            clearInterval(timerInterval);
            document.removeEventListener("keydown", keydownAction);
            game_over(correct,miss);
        }
    
        }, 1000);
    };
    
    function stylize (){
        card.setAttribute("id","card");
        card_question.setAttribute("id","question");
        card_response.setAttribute("id","response");
        card_answer.setAttribute("id","answer");

        timer.setAttribute("id","timer");
        question_status.setAttribute("id","status");

    
        frame.appendChild(card);
        frame.appendChild(timer);
        card.appendChild(card_question);
        card.appendChild(card_response);
        card.appendChild(question_status);
        card.appendChild(timer);
        card_response.appendChild(card_answer);
    
        card.setAttribute("style", card_style+" "+col_style);
        card_question.setAttribute("style", "font-size:1.5em; margin: 20px;")
        timer.setAttribute("style", "margin:30px; font-size: 1.5em;")
        if (game_type === "fill"){
            card_answer.setAttribute("style", "list-style-type:none;" + row_style);
            for (i =0; i< card_answer.children.length; i++){
                card_answer.children[i].setAttribute("style","font-size:2em; margin: 3px");
            };
        };
        if (game_type === "multi"){
            card_answer.setAttribute("style","list-style-type:none;" + col_style);
            for (i =0; i< card_answer.children.length; i++){
                card_answer.children[i].setAttribute("style","margin: 3px;" + button_style);
            };
        };
   
    };
   

    document.querySelector("main").replaceChildren(); // clear the mainframe
    console.log(game_type);

    question_queue = create_questqueue(question_queue); // create the queue of questions (even numbers only becuase those are questions.)
    question_queue = randomize_queue(question_queue);
    answer_queue = create_answerqueue(answer_queue);
    timer.textContent = "Seconds Remaining: " +timeleft;
    setTime();
    callquestion();
    stylize ();
    if (game_type === "fill") {
        document.addEventListener("keydown", keydownAction);
    };
}; // end of begin_game function

function game_over(correct,miss){
    var scoreboard = document.createElement("div");
    var scorebox = document.createElement("div");
    var score_title = document.createElement("div");
    var score = document.createElement("div");
    var submission = document.createElement("div");
    var prompt_button = document.createElement("button");
    var esc_button = document.createElement("button");
    var initials_box = document.createElement("textarea");
    var initials = '';
    var big_score = [];

    function begin_save (){
        function submit(event){
            event.preventDefault();
            if (storedscore === null) {
                storedscore = []; // This gives us a spot IF storedscore had no stored data
            };
            console.log(initials);
            console.log(storedscore);
            var row = score_card.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerText = initials;
            cell2.innerText = big_score;
            storedscore.push([initials,big_score]); //always add on to the existing highscores
            console.log(storedscore)
            localStorage.setItem("highscores", JSON.stringify(storedscore));


            score_card.setAttribute("style","display:flex; flex-direction:column; padding:15px");
            landing_page(); // restart the game
        };
    

        prompt_button.textContent ="Save";
        scoreboard.appendChild(initials_box);
        initials_box.setAttribute("style", "margin:50px; width:30%; font-size:1.5em; text-align:center; display:flex; justify-content:center");
        initials_box.setAttribute("placeholder", "Please Type your Initials Here")
        initials = document.getElementById("initials_box").value;
        prompt_button.addEventListener("click", submit);
    };

    function stylize () {
        frame.appendChild(scoreboard);
        scoreboard.appendChild(scorebox);
        scorebox.appendChild(score_title);
        scorebox.appendChild(score);
        scorebox.appendChild(submission);
        submission.appendChild(prompt_button);
        submission.appendChild(esc_button);

        prompt_button.textContent = "High Score? Click Here to Save It!";
        prompt_button.setAttribute("style", button_style.replace("margin: 20px","margin: 10px auto"));
        esc_button.textContent ="Start Over";
        esc_button.setAttribute("style", button_style.replace("margin: 20px","margin: 10px auto"));
    
        scoreboard.setAttribute("id","scoreboard");
        scorebox.setAttribute("id","scorebox");
        score_title.setAttribute("id","score_title");
        initials_box.setAttribute("id","initials_box")
        score.setAttribute("id","score");
    
        scoreboard.setAttribute("style", card_style + col_style);
        scorebox.setAttribute("style", col_style);
        score_title.setAttribute("style", "margin: 30px; font-size:2em");
        score.setAttribute("style", "margin: 30px; font-size:2em");
    
        score_title.textContent = "Your Score is:";
        score.textContent = correct.toString()+"/"+(correct+miss).toString();
        big_score = score.textContent;
    };

    document.querySelector("main").replaceChildren();
    console.log("Game Over");
    stylize();
    prompt_button.addEventListener("click",begin_save);
    esc_button.addEventListener("click",landing_page);
    

  
}

body.setAttribute("style","boxSizing: border-box; display:flex; flex-direction:row");
body.appendChild(frame);

create_scoretable();
landing_page();