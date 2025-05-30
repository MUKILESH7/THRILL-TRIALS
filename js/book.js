document.addEventListener("DOMContentLoaded", () => {
  const packageCards = document.querySelectorAll('.package-card');
  const packageInput = document.getElementById('packageInput');
  const priceDisplay = document.getElementById('priceDisplay');
  const imageDisplay = document.getElementById('imageDisplay');
  const packageImage = document.getElementById('packageImage');
  const bookingForm = document.getElementById('bookingForm');
  const bookingTypeSelect = document.getElementById('bookingType');
  const dateInput = document.getElementById('date');
  const toastElement = document.getElementById('successToast');
  const toast = new bootstrap.Toast(toastElement);

  // Package images URLs (Unsplash)
  const packageImages = {
    "Manali": "https://source.unsplash.com/400x250/?manali",
    "Goa": "https://source.unsplash.com/400x250/?goa,beach",
    "Delhi": "https://source.unsplash.com/400x250/?delhi",
    "Jaipur": "https://source.unsplash.com/400x250/?jaipur",
    "Kerala": "https://source.unsplash.com/400x250/?kerala",
    "Darjeeling": "https://source.unsplash.com/400x250/?darjeeling"
  };

  // Remove selection from all cards
  function clearSelection() {
    packageCards.forEach(card => card.classList.remove('selected'));
  }

  // When user clicks a package card
  packageCards.forEach(card => {
    card.addEventListener('click', () => {
      clearSelection();
      card.classList.add('selected');

      const selectedPackage = card.dataset.package;
      const selectedPrice = card.dataset.price;

      // Set hidden input value
      packageInput.value = selectedPackage;

      // Show price and image
      priceDisplay.style.display = 'block';
      priceDisplay.textContent = `Selected Package: ${selectedPackage} - Price Range: ${selectedPrice}`;
      imageDisplay.style.display = 'block';
      packageImage.src = packageImages[selectedPackage];
      packageImage.alt = selectedPackage + " Image";
    });
  });

  // Set today's date as default for date input
  dateInput.value = new Date().toISOString().split('T')[0];

  // Form submit handler
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();

    const selectedPackage = packageInput.value;
    const bookingType = bookingTypeSelect.value;
    const selectedDate = dateInput.value;

    if (!selectedPackage) {
      alert('Please select a package.');
      return;
    }
    if (!bookingType) {
      alert('Please select a booking type.');
      return;
    }
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }

    // Show confirmation
    if (confirm(`Confirm booking:\nPackage: ${selectedPackage}\nType: ${bookingType}\nDate: ${selectedDate}`)) {
      // Save booking in localStorage (optional)
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push({ package: selectedPackage, type: bookingType, date: selectedDate });
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Reset form and UI
      bookingForm.reset();
      clearSelection();
      packageInput.value = '';
      priceDisplay.style.display = 'none';
      imageDisplay.style.display = 'none';

      // Reset date to today
      dateInput.value = new Date().toISOString().split('T')[0];

      toast.show();
    }
  });
});
