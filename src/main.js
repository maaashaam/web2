const dogList = document.getElementById('dogList');
const dogImage = document.getElementById('dogImage');
const loadBtn = document.getElementById('loadDogs');

const dogsss = 'live_bKhR2sj3sl07nONV4MWU5meXp8mFSqzHmwFliaYQJt2QiAXcs0bLDhIt080qPjBS'; 

async function fetchRandom() {
  const res = await fetch(`https://api.thedogapi.com/v1/images/search?api_key=${dogsss}`);
  const data = await res.json();
  return data[0].url; 
}

async function loadImage(count = 8) {
  dogList.innerHTML = '';
  const promises = Array.from({ length: count }, () => fetchRandom());
  const dogs = await Promise.all(promises);

  dogs.forEach((dogUrl) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = dogUrl;
    img.addEventListener('click', () => showDogDetail(dogUrl));
    li.appendChild(img);
    dogList.appendChild(li);
  });
}

function showDogDetail(url) {
  dogImage.src = url;
  dogImage.style.display = 'block';
}

loadBtn.addEventListener('click', () => {
  loadImage();
});
