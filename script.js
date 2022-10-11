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
        for(let i = 0; i < 24; i++){
            $("#timeBlocks").append(
                `<div class='col-md-12 pb-2 mb-2 timeBlock' data-block='${i}'>
                    <form class='form-inline m-2 p-2' id='activity-form'>

                        <div class='col-xs-12 col-md-2'>
                            <label for='inlineFormInputName2'>
                                <h3 class='mt-2 p-1'>Hour: ${i < 10 ? '0' + i : i}</h3>
                            </label>
                        </div>

                        <div class='col-xs-12 col-md-8'>
                            <input type='text' class='form-control' data-hour='${i}' style='width:100%;'placeholder='Eat, sleep, code' minlength='2' maxlength='50'></input>
                        </div>

                        <div class='col-xs-12 col-md-2 pt-1'>
                            <button type='button' class='btn btn-primary create' data-hour='${i}'>Create</button>
                        </div>
                    </form>

                    <div class='row p-1 todos' data-hour='${i}'></div>
                </div>`
            );   
        }

        if(localStorage.getItem(date)){
            refreshItems()
        }else{
            colorBlocks()
        }
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
            displayItem(buttonVal, inputVal.val())
        }else{
            // IF THERE IS A PREVIOUS LOCAL SAVE AT THIS SPOT, ADD THE NEW ITEM TO IT
            saved.forEach(hour => {
                if(hour.time == buttonVal && hour.activity.length){
                    hour.activity.push(inputVal.val());
                    displayItem(buttonVal, inputVal.val())
                }
            })    
        }

        localStorage.setItem(date, JSON.stringify(saved));
        inputVal.val('')
    }

    function colorBlocks(){
        let date = moment($('#dayPicked').text()).locale('fr').format('L');
        let currentHour = moment().hour();
        let colorCode = 'rgba(255, 0, 0, 0.8);';
        
        $('.timeBlock').each(function(){
            if(moment(date).isBefore(moment(immutableToday).locale('fr').format('L'))){
            }else if(moment(date).isAfter(moment(immutableToday).locale('fr').format('L'))){
                colorCode = 'rgba(0,128,0, 0.8);';
            }else{
                if($(this).attr('data-block') == currentHour){
                    colorCode = 'rgba(255,255,0, 0.8);';
                }
                if($(this).attr('data-block') > currentHour){
                    colorCode = 'rgba(0,128,0, 0.8);';
                }
            }
            $(this).attr('style', `background-color:${colorCode};`)
        })
    }
    
    // DYNAMICALLY CREATE TODO ITEMS & CORRESPONDING DELETE BUTTONS
    function displayItem(btn, val){
        $(`div[data-hour=${btn}]`).append(

            `<div class='col-xs-12 col-md-2 mt-2'>
                <div class='card'> 
                    <div class='card-body'>
                        <p>${val}</p>
                        <button type='button' class='btn btn-danger delete' data-hour='${btn}' data-value='${val}'>Delete</button>
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
                hour.activity.forEach(activity=>{
                    displayItem(hour.time,activity)
                })
            })
        }
        colorBlocks()
    }


    function removeActivity(){
        let date = moment($('#dayPicked').text()).locale('fr').format('L');
        let saved = JSON.parse(localStorage.getItem(date));
        let buttonHour = $(this).attr("data-hour");
        let buttonValue = $(this).attr("data-value");

        saved.forEach((hour, i) => {
            if(hour.time == buttonHour){ 
                // BUG: IF ELEMENTS THAT SHARE AN ARRAY HAVE THE SAME NAME, THEY BOTH GET GANKED
                let index = hour.activity.findIndex(el => el === buttonValue);
                hour.activity.splice(index, 1);
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