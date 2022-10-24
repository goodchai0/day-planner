$(function(){
    const immutableToday = moment();
    let today = moment();

    function generateView(){
        $("#dayPicked").text(today.format('LL'));
        //CURRENT DATE HEADER
        $("#currentDay").text(immutableToday.format('LL'));
        // CREATE DATE STRING DD/MM/YYYY, FOR USE AS STORAGE KEY
        let date = moment($('#dayPicked').text()).locale('fr').format('L');
        // DYNAMICALLY CREATE TIMEBLOCKS
        for(let i = 0; i < 5; i++){
            $("#timeBlocks").append(
                `<div class='col-md-12 pb-2 my-3 mx-3  timeBlock' data-block='${i}' style='background: linear-gradient(#d3c8c854, black); border-radius:18px'>
                    <form class='form-inline m-2 p-2' id='activity-form'>

                        
<div class='hourdiv col-xs-12 col-md-2'>
                            <label for='inlineFormInputName2'>
                                <h3 class='hour mt-2 p-1'>Hour: 0${i}</h3>
                            </label>
                        </div>

                        <div class='col-xs-12 col-md-8'>
                            <input type='text' class='form-control' data-hour='${i}' id='work' style='width:100%;'placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
                        </div>

                        <div class='col-xs-12 col-md-2 pt-1'>
                            <button type='button' class='btn btn-primary create' id='btn-submit' data-hour='${i}'>Create</button>
                        </div>
                    </form>

                    <div class='row p-1 todos' data-hour='${i}'></div>
                </div>`
            );   
        }
        for(let i = 5; i < 10; i++){
            $("#timeBlocks").append(
                `<div class='col-md-12 pb-2 my-3 mx-3 timeBlock' data-block='${i}' style='background: linear-gradient(#c3b0a52b, #ff6c00); border-radius:18px'>
                    <form class='form-inline m-2 p-2' id='activity-form'>

                        
<div class='hourdiv col-xs-12 col-md-2'>
                            <label for='inlineFormInputName2'>
                                <h3 class='hour mt-2 p-1'>Hour: 0${i}</h3>
                            </label>
                        </div>

                        <div class='col-xs-12 col-md-8'>
                            <input type='text' class='form-control' id='work' data-hour='${i}' style='width:100%;'placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
                        </div>

                        <div class='col-xs-12 col-md-2 pt-1'>
                            <button type='button' class='btn btn-primary create' id='btn-submit' data-hour='${i}'>Create</button>
                        </div>
                    </form>

                    <div class='row p-1 todos' data-hour='${i}'></div>
                </div>`
            );   
        }
        for(let i = 10; i < 18; i++){
            $("#timeBlocks").append(
                `<div class='col-md-12 pb-2 my-3 mx-3 timeBlock' data-block='${i}' style='background: linear-gradient(#c9cbeb4f, #4848e0); border-radius:18px'>
                    <form class='form-inline m-2 p-2' id='activity-form'>

                        
<div class='hourdiv col-xs-12 col-md-2'>
                            <label for='inlineFormInputName2'>
                                <h3 class='hour mt-2 p-1'>Hour: ${i}</h3>
                            </label>
                        </div>

                        <div class='col-xs-12 col-md-8'>
                            <input type='text' class='form-control' id='work' data-hour='${i}' style='width:100%;'placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
                        </div>

                        <div class='col-xs-12 col-md-2 pt-1'>
                            <button type='button' class='btn btn-primary create' id='btn-submit' data-hour='${i}'>Create</button>
                        </div>
                    </form>

                    <div class='row p-1 todos' data-hour='${i}'></div>
                </div>`
            );   
        }
        for(let i = 18; i < 21; i++){
            $("#timeBlocks").append(
                `<div class='col-md-12 pb-2 my-3 mx-3 timeBlock' data-block='${i}' style='background: linear-gradient(#c3b0a52b, #ff6c00); border-radius:18px'>
                    <form class='form-inline m-2 p-2' id='activity-form'>

                        
<div class='hourdiv col-xs-12 col-md-2'>
                            <label for='inlineFormInputName2'>
                                <h3 class='hour mt-2 p-1'>Hour: ${i}</h3>
                            </label>
                        </div>

                        <div class='col-xs-12 col-md-8'>
                            <input type='text' class='form-control' data-hour='${i}' id='work' style='width:100%;'placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
                        </div>

                        <div class='col-xs-12 col-md-2 pt-1'>
                            <button type='button' class='btn btn-primary create' id='btn-submit' data-hour='${i}'>Create</button>
                        </div>
                    </form>

                    <div class='row p-1 todos' data-hour='${i}'></div>
                </div>`
            );   
        }
        for(let i = 21; i < 24; i++){
            $("#timeBlocks").append(
                `<div class='col-md-12 pb-2 my-3 mx-3 timeBlock' data-block='${i}' style='background: linear-gradient(#d3c8c854, black); border-radius:18px'>
                    <form class='form-inline m-2 p-2' id='activity-form'>

                        <div class='hourdiv col-xs-12 col-md-2'>
                            <label for='inlineFormInputName2'>
                                <h3 class='hour mt-2 p-1'>Hour: ${i}</h3>
                            </label>
                        </div>

                        <div class='col-xs-12 col-md-8'>
                            <input type='text' class='form-control' id='work' data-hour='${i}' style='width:100%;'placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
                        </div>

                        <div class='col-xs-12 col-md-2 pt-1'>
                            <button type='button' class='btn btn-primary create' id='btn-submit' data-hour='${i}'>Create</button>
                        </div>
                    </form>

                    <div class='row p-1 todos' data-hour='${i}'></div>
                </div>`
            );   
        }
         //Enter functionalty
        let input = document.getElementById("work");
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("btn-submit").click();
            }
        });

        if(localStorage.getItem(date)){
            refreshItems()
        }/*else{
            colorBlocks()
        }*/
    }

    function addActivity() {
        let date = moment($('#dayPicked').text()).locale('fr').format('L');
        let saved = localStorage.getItem(date) ? JSON.parse(localStorage.getItem(date)) : [];
        let buttonVal = $(this).attr("data-hour");
        let inputVal = $(`input[data-hour=${buttonVal}]`);
        // NO EMPTY INPUTS
        if(inputVal.val() == ''){
            return;
        }
        let savedElement = saved.filter(hour => hour.time == buttonVal);
        // FIRST SAVE GLOBAL || FIRST SAVE PER HOUR
        if(!saved.length || !saved.includes(savedElement[0])){
            saved.push({"time": inputVal.attr("data-hour"), "activity" : [inputVal.val()]});
            // Specify the first item value, position in the activity array
            displayItem(buttonVal, inputVal.val(), 0)
        }else{
            // IF THERE IS A PREVIOUS LOCAL SAVE AT THIS SPOT, ADD THE NEW ITEM TO IT
            saved.forEach(hour => {
                if(hour.time == buttonVal && hour.activity.length){
                    hour.activity.push(inputVal.val());
                    // Specify the latest item value and position in the activity array
                    displayItem(buttonVal, inputVal.val(), hour.activity.length-1)
                }
            })    
        }

        localStorage.setItem(date, JSON.stringify(saved));
        inputVal.val('')
    }

    // function colorBlocks(){
    //     let date = moment($('#dayPicked').text()).locale('fr').format('L');
    //     let currentHour = moment().hour();
    //     let colorCode = ' #ED2939';
        
    //     $('.timeBlock').each(function(){
    //         if(moment(date).isBefore(moment(immutableToday).locale('fr').format('L'))){
    //         }else if(moment(date).isAfter(moment(immutableToday).locale('fr').format('L'))){
    //             colorCode = '#3F704D';
    //         }else{
    //             if($(this).attr('data-block') == currentHour){
    //                 colorCode = '#F4C430';
    //             }
    //             if($(this).attr('data-block') > currentHour){
    //                 colorCode = '#3F704D';
    //             }
    //         }
    //         $(this).attr('style', `background-color:${colorCode};`)
    //     })
    // }
    
    // DYNAMICALLY CREATE TODO ITEMS & CORRESPONDING DELETE BUTTONS
    function displayItem(btn, val, index){
        $(`div[data-hour=${btn}]`).append(

            `<div class='col-xs-12 col-md-2 mt-2'>
                <div class='card'> 
                    <div class='card-body'>
                        <p>${val}</p>
                        <button type='button' class='btn btn-danger delete' data-hour='${btn}' data-value='${val}' data-index='${index}'>Delete</button>
                    </div>
                </div>
            </div>`
        );
        $(`button[data-value='${val}']`).on("click", removeActivity);
    }

    function refreshItems(){
        let date=moment($('#dayPicked').text()).locale('fr').format('L');
        let saved=JSON.parse(localStorage.getItem(date));
        $(".todos").html('')

        if(saved){
            saved.forEach(hour=>{
                hour.activity.forEach((activity,index)=>{
                    displayItem(hour.time,activity, index)
                })
            })
        }
        colorBlocks()
    }

    function removeActivity(){
        let date = moment($('#dayPicked').text()).locale('fr').format('L');
        let saved = JSON.parse(localStorage.getItem(date));
        let buttonHour = $(this).attr("data-hour");
        let buttonIndx = $(this).attr("data-index");

        saved.forEach((hour, i) => {
            if(hour.time == buttonHour){ 
                
                // Button index holds the element positon in the array for which delete was clicked for that  hour
                // This removes 1 string from index = buttonIndx
                hour.activity.splice(buttonIndx, 1);
                
                // IF LAST ACTIVITY IN ARR, REMOVE ARR SO IT PLAYS NICE IN addActivity FUNC
                if(hour.activity.length === 0){
                    saved.splice(i, 1)
                }
            }
        });
    
        localStorage.setItem(date, JSON.stringify(saved));
        refreshItems()
    }
    
    generateView()

    $(".create").on("click", addActivity)

    $('#activity-form').on('submit', (e) => {
        e.preventDefault();
    });
    
    // GO BACK A DAY 
    $("#dayEarlier").on("click", () => {
        today = today.subtract(1, 'day');
        $('#dayPicked').text(today.format('LL'));
        refreshItems()
    })
    // GO FORWARD A DAY
    $("#dayLater").on("click", () => {
        today = today.add(1, 'day');
        $('#dayPicked').text(today.format('LL'));
        refreshItems()
    })
})




//* Dark mode implementation 

let darkMode = document.querySelectorAll(".darkModeBtn");
let b = document.querySelector("body");
let fm = document.querySelector("#dayPicked");
let c = document.querySelector("#img");

const changeTextToLight = () => {
    darkMode.forEach(ele =>{
        ele.innerText = "ENABLE LIGHT MODE"
    })
}

const changeTextToDark = () => {
    darkMode.forEach(ele =>{
        ele.innerText = "ENABLE DARK MODE"
    })
}

function renderMode() {
    if(localStorage.getItem('darkMode')) {
        changeTextToLight();
        b.classList.add('darkmode');
        c.src="images/4457753.png";
    }
    else {
        changeTextToDark();
        b.classList.remove('darkmode')
        c.src="images/diary_illustration.jpg"
    }
}

window.onload = () => {
    renderMode()
}

darkMode.forEach( ele =>{
        ele.addEventListener('click', () => {
            if (localStorage.getItem('darkMode')) {
                localStorage.removeItem('darkMode');
            } else {
                localStorage.setItem('darkMode', true);
            }
            renderMode()
        });
    }
);

