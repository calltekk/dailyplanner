$(document).ready(function () {
  // Function to display the current day and time
  function displayCurrentDay() {
    var currentDayElement = $("#currentDay");

    function updateDateTime() {
      var currentDateTime = dayjs().format("dddd, MMMM D, HH:mm:ss");
      currentDayElement.text("Today is " + currentDateTime);
    }

    // Update the date and time every second
    setInterval(updateDateTime, 1000);

    // Initial update
    updateDateTime();
  }

  // Function to generate time blocks
  function generateTimeBlocks() {
    var container = $(".container");
    var currentDay = dayjs().startOf('day'); // Get the start of the current day
    var currentTime = dayjs().hour();

    for (var i = 9; i < 18; i++) {
      var timeBlock = $("<div>").addClass("row time-block");

      var hourCol = $("<div>").addClass("col-md-1 hour");
      hourCol.text(currentDay.hour(i).format("hA"));

      var textCol = $("<textarea>").addClass("col-md-10");

      var saveBtnCol = $("<button>").addClass("col-md-1 saveBtn");
      saveBtnCol.html('<i class="fas fa-save"></i>');

      // Check if there's a saved event
      var savedEvent = localStorage.getItem(hourCol.text());

      // Set the background color based on the presence of a saved event
      if (i < currentTime) {
        timeBlock.css({ backgroundColor: "#d3d3d3", color: "white" }); // Grey for past hours
      } else if (i === currentTime) {
        timeBlock.css({ backgroundColor: "#ff6961", color: "white" }); // Red for current hour
      } else {
        timeBlock.css({ backgroundColor: "#77dd77" }); // Green for future hours
      }

      // Append elements to the time block
      timeBlock.append(hourCol, textCol, saveBtnCol);

      // Append the time block to the container
      container.append(timeBlock);

      // Load event from local storage
      if (savedEvent) {
        textCol.val(savedEvent);
      }
    }
  }

  // Function to save events to local storage
  function saveEvent(hour, eventText) {
    localStorage.setItem(hour, eventText);
  }

  // Function to load events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).find(".hour").text();
      var textArea = $(this).find("textarea");

      // Load event from local storage
      var savedEvent = localStorage.getItem(hour);

      if (savedEvent) {
        textArea.val(savedEvent);
      }
    });
  }

  // Call functions when the page loads
  displayCurrentDay();
  generateTimeBlocks();
  loadEvents();

  // Event listener for save buttons
  $(document).on("click", ".saveBtn", function () {
    var timeBlock = $(this).closest(".time-block");
    var hour = timeBlock.find(".hour").text();
    var textArea = timeBlock.find("textarea");
    var eventText = textArea.val().trim();

    // Save event to local storage
    saveEvent(hour, eventText);

    // Reload events
    loadEvents();
  });

  // Event listener for textarea content change
  $(document).on("input", "textarea", function () {
    var timeBlock = $(this).closest(".time-block");
    var hour = timeBlock.find(".hour").text();
    var textArea = timeBlock.find("textarea");
    var eventText = textArea.val().trim();

    // If content is empty, remove from local storage
    if (!eventText) {
      localStorage.removeItem(hour);
    }
  });
});
