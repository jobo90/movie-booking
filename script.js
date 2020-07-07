const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Get data from local storage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Update total and count
const updateSelectedAndTotal = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Movie select event
movieSelect.addEventListener('change', (evt) => {
  ticketPrice = parseInt(evt.target.value);
  setMovieData(evt.target.selectedIndex, evt.target.value);
  updateSelectedAndTotal();
});

// Seat click event
container.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('seat') && !evt.target.classList.contains('occupied')) {
    evt.target.classList.toggle('selected');

    updateSelectedAndTotal();
  }
});

// Initial count and total set
updateSelectedAndTotal();