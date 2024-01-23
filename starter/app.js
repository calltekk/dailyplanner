// Function to display the current day
function displayCurrentDay() {
    var currentDayElement = document.getElementById("currentDay");
    var currentDay = dayjs().format("dddd, MMMM D");
    currentDayElement.textContent = "Today is " + currentDay;
  }
  
  // Function to generate time blocks
  function generateTimeBlocks() {
    var container = document.querySelector(".container");
    var businessHours = 9; // Start from 9 AM
    var currentTime = dayjs().hour();
  
    for (var i = 0; i < 9; i++) {
      var timeBlock = document.createElement("div");
      timeBlock.classList.add("row", "time-block");
  
      var hourCol = document.createElement("div");
      hourCol.classList.add("col-md-1", "hour");
      hourCol.textContent = dayjs().hour(businessHours).format("hA");
  
      var textCol = document.createElement("textarea");
      textCol.classList.add("col-md-10");
  
      var saveBtnCol = document.createElement("button");
      saveBtnCol.classList.add("col-md-1", "saveBtn");
      saveBtnCol.innerHTML = '<i class="fas fa-save"></i>';
  
      // Check if there's a saved event
      var savedEvent = localStorage.getItem(hourCol.textContent);
  
      // Set the background color based on the presence of a saved event
      if (savedEvent) {
        textCol.value = savedEvent;
        timeBlock.classList.add("event-saved");
        timeBlock.style.backgroundColor = "#77dd77"; // Green for saved event
      } else if (businessHours < currentTime) {
        timeBlock.style.backgroundColor = "#d3d3d3";
        timeBlock.style.color = "white";
      } else if (businessHours === currentTime) {
        timeBlock.style.backgroundColor = "#ff6961"; // Red for current hour
        timeBlock.style.color = "white";
      } else {
        timeBlock.style.backgroundColor = "#d3d3d3"; // Default color for future hours (grey)
      }
  
      // Append elements to the time block
      timeBlock.appendChild(hourCol);
      timeBlock.appendChild(textCol);
      timeBlock.appendChild(saveBtnCol);
  
      // Append the time block to the container
      container.appendChild(timeBlock);
  
      // Increment business hours
      businessHours++;
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
        timeBlock.classList.add("event-saved");
        timeBlock.style.backgroundColor = "#77dd77"; // Green for saved event
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
  
      // Remove existing color classes and set the background color
      timeBlock.classList.remove("event-saved");
      timeBlock.style.backgroundColor = "#77dd77"; // Green for saved event
  
      // Reload events to set the correct background color
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
  
      // If content is empty, reset the background color
      if (!eventText) {
        timeBlock.classList.remove("event-saved");
        timeBlock.style.backgroundColor = "#d3d3d3"; // Set to default color (grey)
      }
    }
  });
  