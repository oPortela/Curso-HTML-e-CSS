// Array to store appointments
var appointments = [];

// Get elements
var appointmentForm = document.getElementById('appointment-form');
var calendarContent = document.getElementById('calendar-content');
var modal = document.getElementById('modal');
var modalContent = document.getElementById('appointment-details');
var closeModal = document.getElementsByClassName('close')[0];

// Event listeners
appointmentForm.addEventListener('submit', agendarHorario);
calendarContent.addEventListener('click', openModal);
closeModal.addEventListener('click', closeAppointmentDetails);
window.addEventListener('click', outsideClick);

// Function to handle appointment form submission
function agendarHorario(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var service = document.getElementById('service').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;

  if (name !== '' && service !== '' && date !== '' && time !== '') {
    var appointment = {
      name: name,
      service: service,
      date: date,
      time: time
    };

    appointments.push(appointment);
    resetForm();

    // Update calendar
    updateCalendar();

    // Show success message
    showMessage('Horário agendado com sucesso!', 'success');
  } else {
    showMessage('Por favor, preencha todos os campos.', 'error');
  }
}

// Function to reset the form
function resetForm() {
  appointmentForm.reset();
}

// Function to update the calendar
function updateCalendar() {
  calendarContent.innerHTML = '';

  appointments.forEach(function(appointment) {
    var calendarDay = document.createElement('div');
    calendarDay.classList.add('calendar-day');
    calendarDay.innerHTML = '<p>' + appointment.name + '</p><p>' + appointment.time + '</p>';

    calendarContent.appendChild(calendarDay);
  });
}

// Function to show a message
function showMessage(message, type) {
  var messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(type);
  messageElement.textContent = message;

  var form = document.getElementById('appointment-form');
  form.appendChild(messageElement);

  // Remove message after 3 seconds
  setTimeout(function() {
    form.removeChild(messageElement);
  }, 3000);
}

// Function to open the appointment details modal
function openModal(event) {
  var target = event.target;
  if (target.classList.contains('calendar-day')) {
    var appointmentIndex = Array.prototype.indexOf.call(calendarContent.children, target);
    var appointment = appointments[appointmentIndex];

    modalContent.innerHTML = '<h3>Detalhes do Agendamento</h3><p><strong>Nome:</strong> ' + appointment.name + '</p><p><strong>Serviço:</strong> ' + appointment.service + '</p><p><strong>Data:</strong> ' + appointment.date + '</p><p><strong>Horário:</strong> ' + appointment.time + '</p>';

    modal.style.display = 'block';
  }
}

// Function to close the appointment details modal
function closeAppointmentDetails() {
  modal.style.display = 'none';
}

// Function to close the appointment details modal when clicking outside
function outsideClick(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

