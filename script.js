// Get the select element from the page.
const breedSelect = document.getElementById('breed-select');
const gallery = document.getElementById('gallery');

// Fetch all dog breeds from the Dog API.
async function fetchBreeds() {
	const response = await fetch('https://dog.ceo/api/breeds/list/all');
	const data = await response.json();

	// The API returns breeds as object keys in data.message.
	const breeds = Object.keys(data.message);

	// Sort breeds alphabetically so the menu is easier to scan.
	breeds.sort();

	// Create and add one option for each breed.
	breeds.forEach((breed) => {
		const option = document.createElement('option');
		option.value = breed;
		option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
		breedSelect.appendChild(option);
	});
}

// Fetch nine random images for the selected breed.
async function fetchBreedImages(breed) {
	const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/9`);
	const data = await response.json();

	// Clear the gallery and add the images.
	gallery.innerHTML = '';
	data.message.forEach((imageUrl) => {
		const galleryItem = document.createElement('div');
		galleryItem.classList.add('gallery-item');

		const img = document.createElement('img');
		img.src = imageUrl;
		img.alt = `A ${breed} dog`;
		galleryItem.appendChild(img);

		gallery.appendChild(galleryItem);
	});
}

// Initialize the app by fetching breeds.
fetchBreeds();

// When the user picks a breed, fetch nine random images for that breed.
breedSelect.addEventListener('change', (event) => {
	const selectedBreed = event.target.value;

	// If the placeholder option is selected, clear the gallery.
	if (!selectedBreed) {
		gallery.innerHTML = '';
		return;
	}

	fetchBreedImages(selectedBreed);
});
