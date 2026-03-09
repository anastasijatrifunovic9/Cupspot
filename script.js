

const cafes = [
{name:"Coffee Pub", location:"Omladinska 61, Kraljevo", rating:4.5, hours:"07:30-00:00", image:"slike/pub.jpg", types:["moderni","basta","kolaci"]},
{name:"Aleksandar Caffee", location:"Ulica Heroja Maričića 99, Kraljevo", rating:4.7, hours: "07:00-00:00", image:"slike/aleksandar.jpg", types:["mirni","kolaci"]},
{name:"Pino cafe", location:"Milomira Brkušanca, Kraljevo", rating:4.6, hours:"08:00-23:00", image:"slike/pino.jpg", types:["moderni","basta","muzika"]},
{name:"Cafe Exit", location:"Omladinska 21, Kraljevo", rating:4.5, hours:"08:00-00:00", image:"slike/exit.jpg", types:["moderni","basta","muzika"]},
{name:"Caffe Flash", location:"Omladinska 53, Kraljevo", rating:4.4, hours:"08:00-00:00", image:"slike/flash.jpg", types:["mirni","basta"]},
{name:"Raffaelo", location:"Omladinska, Kraljevo", rating:4.1, hours:"08:00-00:00", image:"slike/r.jpg", types:["mirni","basta"]},
{name:"Papa's Caffe", location:"Toplice Milana 14a, Kraljevo", rating:4.5, hours:"08:00-00:00", image:"slike/papas.jpg", types:["moderni","basta","muzika"]},
{name:"Cafeteria Story", location:"Omladinska 45, Kraljevo", rating:3.7, hours:"07:30-00:00", image:"slike/story.jpg", types:["mirni","basta"]},
{name:"Cafe Hug", location:"Miloša Velikog 62, Kraljevo", rating:4.3, hours:"06:00-00:00", image:"slike/hug.jpg", types:["mirni","basta"]},
{name:"Kafica Bar", location:"Toplice Milana 5, Kraljevo", rating:4.9, hours:"07:30-00:00", image:"slike/kaficabar.jpg", types:["mirni","kolaci"]},
{name:"Caffe Kutak", location:"Dušana Popovića, Kraljevo", rating:4.4, hours:"07:00-00:00", image:"slike/kutak.jpg", types:["mirni","basta"]},
{name:"Dolce Vita", location:"Kralja Milana 6, Kraljevo", rating:4.3, hours:"07:00-00:00", image:"slike/dolcevita.jpg", types:["basta","kolaci"]},
];


function showCafes(list){

const container = document.getElementById("cafeList");
container.innerHTML="";

list.forEach(cafe => {

container.innerHTML += `
<div class="cafe">
<h3>${cafe.name}</h3>
<p>Lokacija: ${cafe.location}</p>
<p>Ocena: ${cafe.rating}</p>
<p>Radno vreme: ${cafe.hours}</p>
<img src="${cafe.image}" alt="${cafe.name}" width="200" height="250">
<p>Tip: ${cafe.types.join(", ")}</p>
<h4>Ostavi ocenu</h4>

<select id="rating-${cafe.name}">
<option value="5">5</option>
<option value="4">4</option>
<option value="3">3</option>
<option value="2">2</option>
<option value="1">1</option>
</select>

<input type="text" id="comment-${cafe.name}" placeholder="Napiši komentar">

<button onclick="addComment('${cafe.name}')">Pošalji</button>

<div id="comments-${cafe.name}"></div>
</div>
`;
showComments(cafe.name);
});

}

showCafes(cafes);


function registerUser(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(email === "" || password === ""){
document.getElementById("message").innerText = "Popunite sva polja";
return;
}

const user = {
email: email,
password: password
};

localStorage.setItem("user", JSON.stringify(user));

document.getElementById("register-screen").style.display = "none";
document.getElementById("main-content").style.display = "block";

}

window.onload = function(){

const user = localStorage.getItem("user");

if(user){
document.getElementById("register-screen").style.display = "none";
document.getElementById("main-content").style.display = "block";
}

}

function filterCafes(){

const type = document.getElementById("typeFilter").value;
const rating = document.getElementById("ratingFilter").value;
const location = document.getElementById("locationFilter").value.toLowerCase();

const filtered = cafes.filter(cafe => {

return (
(type === "" || cafe.types.includes(type)) &&
(rating === "" || cafe.rating >= rating) &&
(location === "" || cafe.location.toLowerCase().includes(location))
);

});

showCafes(filtered);

}

function addComment(cafeName){

const rating = document.getElementById(`rating-${cafeName}`).value;
const comment = document.getElementById(`comment-${cafeName}`).value;

const key = "comments-" + cafeName;

let comments = JSON.parse(localStorage.getItem(key)) || [];

comments.push({
rating: rating,
text: comment
});

localStorage.setItem(key, JSON.stringify(comments));

showComments(cafeName);

}

function showComments(cafeName){

const key = "comments-" + cafeName;

const comments = JSON.parse(localStorage.getItem(key)) || [];

const container = document.getElementById(`comments-${cafeName}`);

container.innerHTML = "<h4>Komentari:</h4>";

comments.forEach((c,index) => {

container.innerHTML += `
<p>⭐ ${c.rating} - ${c.text}
<button onclick="deleteComment('${cafeName}', ${index})">Obriši</button>
</p>
`;

});

}

function deleteComment(cafeName, index){

const key = "comments-" + cafeName;

let comments = JSON.parse(localStorage.getItem(key)) || [];

comments.splice(index,1);

localStorage.setItem(key, JSON.stringify(comments));

showComments(cafeName);

}

