$(function () {
  const hours = [9, 10, 11, 12, 1, 2, 3, 4, 5]
  let data
  
  try {
    const storedData = localStorage.getItem('data')
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
  
  function saveToLocalStorage() {
    try {
      localStorage.setItem('data', JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to local storage:', error)
    }
  }
  
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
  
  function createHourElement(hour) {
    let meridian = (hour <= 5 || hour === 12) ? 'PM' : 'AM'
  
    let element = $(`
      <div class="row time-block" id="hour${hour}">
        <div class="col-2 col-md-1 hour text-center py-3">${hour} ${meridian}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `)
  
    // Attach the event listener
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

  function updateCurrentTime() {

    let currentTime = dayjs().format('h:mm A')
    let currentDate = dayjs().format('MMMM D, YYYY')

    document.getElementById('currentTime').innerText = `It is currently ${currentTime} on ${currentDate}`
  }

  updateCurrentTime()

  setInterval(updateCurrentTime, 1000)
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  


  // TODO: Add code to display the current date in the header of the page.
});
