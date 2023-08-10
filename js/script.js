const removeBtn = document.querySelector('#remove');

const removeAlert = (e) => {
	e.preventDefault();
	if (confirm('Czy na pewno chcesz usunąć produkt?')) {
		// Save it!
		console.log('Thing was saved to the database.');
	  } else {
		// Do nothing!
		console.log('Thing was not saved to the database.');
	  }
};

removeBtn.addEventListener('click', removeAlert);
