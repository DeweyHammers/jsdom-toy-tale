let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => renderToys(json));

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('form');

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelectorAll('input')

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: input[0].value,
        image: input[1].value,
        likes: 0
      })
    })
    .then(response => response.json())
    .then(json => makeToy(json))

    input[0].value = '';
    input[1].value = '';
    toyFormContainer.style.display = "none";
  })
});

const makeToy = (toy) => {
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const button = document.createElement('button');

  div.className = 'card'
  h2.innerText = toy.name;
  img.src = toy.image;
  img.className = 'toy-avatar';
  p.innerText = `${toy.likes} Likes`;
  button.innerText = 'Like <3';
  button.className = 'like-btn';

  document.body.appendChild(div);
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);

  button.addEventListener('click', () => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes += 1
      })
    })
    .then(response => response.json())
    .then(json => p.innerText = `${json.likes} Likes`)
  })
}

const renderToys = (json) => {
  json.forEach(toy => {
   makeToy(toy);
  })
}