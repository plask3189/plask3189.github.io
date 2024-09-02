
feelings_array =[]
document.getElementById("option1").addEventListener("change", function() {
    const msg = document.getElementById("option1_id");
    feelings_array.push("Okay")
    if (this.checked) {
        msg.textContent = "You checked Okay!";
    } else {
        msg.textContent = "";
    }
});

document.getElementById("option2").addEventListener("change", function() {
    const msg = document.getElementById("option2_id");
    feelings_array.push("Alright")
    if (this.checked) {
        msg.textContent = "You checked Alright!";
    } else {
        msg.textContent = "";
    }
});

document.getElementById("option3").addEventListener("change", function() {
    const msg = document.getElementById("option3_id");
    feelings_array.push("Fine")
    if (this.checked) {
        msg.textContent = "You checked Fine!";
    } else {
        msg.textContent = "";
    }
});

/*****************************************************************
 * Create an array objects that stores the user entries.  
 * Add some dummy data for a few days before today.  Think about 
 * what fields would be useful in this array.  
 * If the user interacts with the page, 
 * update the array object for the current day. ***/

let selectedHours = 0; 
document.getElementById("sleepHours").addEventListener("change", function() {
    selectedHours = this.value;
    console.log("Selected hours of sleep:", selectedHours);});

let journalText = ""
document.getElementById("journalEntryText").addEventListener("change", function() {
    journalText = this.value;
    console.log(journalText);});

let imageEntry = ""
document.getElementById("imageUpload").addEventListener("change", function() {
    imageEntry = this.value;
    console.log(imageEntry);});
date =""
/** an entry for the day. Each day we  track:
 * list of feelings
 * how many hours of sleep
 * jounral entry text
 * image.  **/
function createUserDayEntry(date, journalText, hoursOfSleep, feelings_array, imageEntry) {
    return {
        date: date,
        journalText: journalText,
        hoursOfSleep: hoursOfSleep,
        feelings: feelings_array,
        imageEntry: imageEntry
    };
}

// Add some dummy data for a few days before today.
let entries = []; // list of previous userDayEntry objects
entries.push(createUserDayEntry("8/27/24", "I practiced the Vivaldi Variation on the harp", 6, ["Okay", "Alright"], "image0.png"));
entries.push(createUserDayEntry("8/28/24","Did some scales, learned another few finger note positions on the Flute", 5, ["Fine"], "image1.png"));
entries.push(createUserDayEntry("8/29/24","Some Chopin", 8, ["Alright", "Fine"], "image2.png"));
//entries.push(createUserDayEntry("Today",journalText, hoursOfSleep, feelings, imageEntry));

function triggerTodaySubmit() {
    document.getElementById("todaySubmit").click();
}


document.getElementById("sleepHours").addEventListener("change", triggerTodaySubmit);
document.getElementById("sleepHours").addEventListener("change", showAvSleepHrs);
document.getElementById("option1").addEventListener("change", showCountFeelings);
document.getElementById("option2").addEventListener("change", showCountFeelings);
document.getElementById("option3").addEventListener("change", showCountFeelings);
document.getElementById("journalEntryText").addEventListener("change", triggerTodaySubmit);
document.getElementById("imageUpload").addEventListener("change", triggerTodaySubmit);
document.getElementById("option1").addEventListener("change", triggerTodaySubmit);
document.getElementById("option2").addEventListener("change", triggerTodaySubmit);
document.getElementById("option3").addEventListener("change", triggerTodaySubmit);

document.getElementById("todaySubmit").addEventListener("click", function() {
    // if entry for today exists.
   let todayEntry = null;
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].date === "Today") { 
            todayEntry = entries[i];
            break; 
        }
    }
    if (todayEntry) { //update today's entry if it already exists.
        todayEntry.journalText = journalText;
        todayEntry.hoursOfSleep = parseInt(selectedHours,10); //10 bc base 10
        todayEntry.feelings = feelings_array;
        todayEntry.imageEntry = imageEntry;
        console.log("Updated today's entry:", todayEntry);
    } else { // make new entry for today
        todayEntry = createUserDayEntry("Today", journalText, parseInt(selectedHours,10), feelings_array, imageEntry);
        entries.push(todayEntry);
        console.log("Added new entry for today:", todayEntry);
    }

    displayEntries();  // Calls after adding or updating the entry
    showCountFeelings();

});


function displayEntries() {
    const entryHistory = document.getElementById("entryHistory");
    entryHistory.innerHTML = "";  // delete prior entries
    //entryHistory.textContent = JSON.stringify(entries, null, 2);
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        console.log(entry.journalText);
        
        const entryForDay = document.createElement("div");
        entryForDay.classList.add("entry");
        const dateVal = document.createElement("p");
        dateVal.textContent = `Date: ${entry.date}`;
        entryForDay.appendChild(dateVal);
        const journalParagraph = document.createElement("p");
        journalParagraph.textContent = `Journal: ${entry.journalText}`;
        entryForDay.appendChild(journalParagraph);
        const sleepVal = document.createElement("p");
        sleepVal.textContent = `Hours of Sleep: ${entry.hoursOfSleep}`;
        entryForDay.appendChild(sleepVal);
        const feelingsVal = document.createElement("p");
        feelingsVal.textContent = `Feelings: ${entry.feelings}`;
        entryForDay.appendChild(feelingsVal);
        
        entryHistory.appendChild(entryForDay);

        const hr = document.createElement("hr"); // makes the line between each entry
        entryHistory.appendChild(hr);
        if (entry.date == "Today") {
            entryForDay.classList.add("bold");
        }
    }
}

function avSleepHrs() {
    let sleepHoursList = [];
    for (let i = 0; i < entries.length; i++) {
        sleepHoursList.push(entries[i].hoursOfSleep);
    }
    console.log(sleepHoursList);
    let total = 0;
    for (let i= 0; i < sleepHoursList.length; i++) {
        total = total + sleepHoursList[i]; 
    }

    let average = total / sleepHoursList.length;
    return average;
}

function showAvSleepHrs() {
    const sleepAverage = avSleepHrs();
    console.log("Average hours of sleep:", sleepAverage);
    document.querySelector('.sleep-Av').textContent = `You've had an average ${sleepAverage} hours of sleep.`;
}
showAvSleepHrs();
displayEntries();
showCountFeelings();

//Compute the number of days they say they have different feelings (how many days energetic, tired...). 
function countFeelings(){

    let feelingsList = [];
    for (let i = 0; i < entries.length; i++) {
        feelingsList.push(...entries[i].feelings); // list of all the feeligns
    }
    console.log(feelingsList); 

    let feelingsCount = {};

    for (let i = 0; i < feelingsList.length; i++) {
        const feeling = feelingsList[i];
        if (feelingsCount[feeling]) {
            feelingsCount[feeling]++;
        } else {
            feelingsCount[feeling] = 1;
        }
    }

    console.log(feelingsCount);
    return feelingsCount; 
}

function showCountFeelings(){
    let feelingText = '';
    const feelingsCount = countFeelings(); 
    console.log(`feelingsCount:`, feelingsCount)
    for (const feeling in feelingsCount) {
        console.log(`${feeling}: ${feelingsCount[feeling]} days`);
        //document.querySelector('.feeling').textContent = `${feeling}: ${feelingsCount[feeling]} days`;
        feelingText = feelingText + `${feeling}: ${feelingsCount[feeling]} days<br>`; 
    }
    document.querySelector('.feeling').innerHTML = feelingText;
    //document.querySelector('.feeling').textContent = `Feeling counts ${feelingsCount}:`;
}