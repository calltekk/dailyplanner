// Function to display the current day and time
function displayCurrentDay() {
  var currentDayElement = document.getElementById("currentDay");

  function updateDateTime() {
    var currentDateTime = dayjs().format("dddd, MMMM D, HH:mm:ss");
    currentDayElement.textContent = "Today is " + currentDateTime;
  }

  // Update the date and time every second
  setInterval(updateDateTime, 1000);

  // Initial update
  updateDateTime();
}

// Function to generate time blocks
function generateTimeBlocks() {
  var container = document.querySelector(".container");
  var currentDay = dayjs().startOf('day'); // Get the start of the current day
  var currentTime = dayjs().hour();

  for (var i = 9; i < 18; i++) {
    var timeBlock = document.createElement("div");
    timeBlock.classList.add("row", "time-block");

    var hourCol = document.createElement("div");
    hourCol.classList.add("col-md-1", "hour");
    hourCol.textContent = currentDay.hour(i).format("hA");

    var textCol = document.createElement("textarea");
    textCol.classList.add("col-md-10");

    var saveBtnCol = document.createElement("button");
    saveBtnCol.classList.add("col-md-1", "saveBtn");
    saveBtnCol.innerHTML = '<i class="fas fa-save"></i>';

    // Check if there's a saved event
    var savedEvent = localStorage.getItem(hourCol.textContent);

    // Set the background color based on the presence of a saved event
    if (i < currentTime) {
      timeBlock.style.backgroundColor = "#d3d3d3"; // Grey for past hours
      timeBlock.style.color = "white";
    } else if (i === currentTime) {
      timeBlock.style.backgroundColor = "#ff6961"; // Red for current hour
      timeBlock.style.color = "white";
    } else {
      timeBlock.style.backgroundColor = "#77dd77"; // Green for future hours
    }

    // Append elements to the time block
    timeBlock.appendChild(hourCol);
    timeBlock.appendChild(textCol);
    timeBlock.appendChild(saveBtnCol);

    // Append the time block to the container
    container.appendChild(timeBlock);
  }
}

// Function to save events to local storage
function saveEvent(hour, eventText) {
  localStorage.setItem(hour, eventText);
}

// Function to load events from local storage
function loadEvents() {
  var timeBlocks = document.querySelectorAll(".time-block");

  timeBlocks.forEach(function (timeBlock) {
    var hour = timeBlock.querySelector(".hour").textContent;
    var textArea = timeBlock.querySelector("textarea");

    // Load event from local storage
    var savedEvent = localStorage.getItem(hour);

    if (savedEvent) {
      textArea.value = savedEvent;
    }
  });
}

// Call functions when the page loads
document.addEventListener("DOMContentLoaded", function () {
  displayCurrentDay();
  generateTimeBlocks();
  loadEvents();
});

// Event listener for save buttons
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("saveBtn")) {
    var timeBlock = event.target.closest(".time-block");
    var hour = timeBlock.querySelector(".hour").textContent;
    var textArea = timeBlock.querySelector("textarea");
    var eventText = textArea.value.trim();

    // Save event to local storage
    saveEvent(hour, eventText);

    // Reload events
    loadEvents();
  }
});

// Event listener for textarea content change
document.addEventListener("input", function (event) {
  if (event.target.tagName === "TEXTAREA") {
    var timeBlock = event.target.closest(".time-block");
    var hour = timeBlock.querySelector(".hour").textContent;
    var textArea = timeBlock.querySelector("textarea");
    var eventText = textArea.value.trim();

    // If content is empty, remove from local storage
    if (!eventText) {
      localStorage.removeItem(hour);
    }
  }
});
