$(function () {
  // Define an array of hours
  const hours = [9, 10, 11, 12, 1, 2, 3, 4, 5]
  let data
  
  try {
    // Attempt to retrieve data from local storage
    const storedData = localStorage.getItem('data')
    // Parse the stored data if available, otherwise initialize with default values
    data = storedData ? JSON.parse(storedData) : {
      '9AM': '',
      '10AM': '',
      '11AM': '',
      '12PM': '',
      '1PM': '',
      '2PM': '',
      '3PM': '',
      '4PM': '',
      '5PM': ''
    }
  } catch (error) {
    // If there is an error parsing the stored data, initialize with default values
    data = {
      '9AM': '',
      '10AM': '',
      '11AM': '',
      '12PM': '',
      '1PM': '',
      '2PM': '',
      '3PM': '',
      '4PM': '',
      '5PM': ''
    }
  }
  
  // Function to save data to local storage
  function saveToLocalStorage() {
    try {
      localStorage.setItem('data', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to local storage:', error)
    }
  }
  
  // Function to populate text areas with data
  function populateTextAreas() {
    for (const hour of hours) {
      const meridian = (hour <= 5 || hour === 12) ? 'PM' : 'AM'
      const key = `${hour}${meridian}`
  
      // Retrieve the value from data
      const value = data[key]
  
      // Set the value in the corresponding text area
      $(`#hour${hour} textarea`).val(value)
    }
  }
  
  // Function to create an HTML element for each hour
  function createHourElement(hour) {
    let meridian = (hour <= 5 || hour === 12) ? 'PM' : 'AM'

    // Determine the time class for styling (past, present, future)
    let currentHour = dayjs().format('hA')
    let timeClass = ''
    if (currentHour === `${hour}${meridian}`) {
      timeClass = 'present'
    } else if (dayjs(`${hour}${meridian}`, 'hA').isBefore(dayjs(currentHour, 'hA'))) {
      timeClass = 'past'
    } else {
      timeClass = 'future'
    }

    // Create the HTML element for the hour
    let element = $(`
      <div class="row time-block ${timeClass}" id="hour${hour}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour} ${meridian}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `);
  
    // Attach the event listener to the save button
    element.find('.saveBtn').on('click', function () {
      let text = $(this).siblings('.description').val()
  
      // Update the data object with the entered text
      data[`${hour}${meridian}`] = text
  
      // Save the data to local storage
      saveToLocalStorage()
    });
  
    // Append the element to the container
    $('#hourContainer').append(element)
  }
  
  // Create the elements for each hour
  for (let i = 0; i < hours.length; i++) {
    createHourElement(hours[i])
  }
  
  // Populate text areas on page load
  populateTextAreas()

  // Function to update the current time on the page
  function updateCurrentTime() {

    let currentTime = dayjs().format('h:mm A')
    let currentDate = dayjs().format('MMMM D, YYYY')

    // Update the current time and date on the page
    document.getElementById('currentTime').innerText = `It is currently ${currentTime} on ${currentDate}`
  }

  // Call the updateCurrentTime function initially
  updateCurrentTime()

  // Set an interval to update the current time every second
  setInterval(updateCurrentTime, 1000)
});
