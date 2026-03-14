const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

let dragStartIndex;

const richestPeople = [
"Elon Musk",
"Larry Page",
"Sergey Brin",
"Jeff Bezos",
"Mark Zuckerberg",
"Larry Ellison",
"Jensen Huang",
"Bernard Arnault",
"Rob Walton",
"Warren Buffett"
];

const listitems = [];

createList();

function createList(){

const shuffledPeople = [...richestPeople].sort(()=>Math.random()-0.5);

shuffledPeople.forEach((person,index)=>{

const listItem = document.createElement("li");

listItem.setAttribute("data-index",index);

listItem.innerHTML = `
<span class="number">${index + 1}</span>

<div class="draggable" draggable="true">
<p class="person-name">${person}</p>
<i class="fa-solid fa-grip-lines"></i>
</div>
`;

listitems.push(listItem);
draggable_list.appendChild(listItem);

});

addDragEventListeners();

}

function shuffleNames(){

// remove colors
listitems.forEach(item=>{
item.classList.remove("right");
item.classList.remove("wrong");
});

// get names
const names = listitems.map(item =>
item.querySelector(".person-name").innerText
);

// shuffle names
const shuffled = [...names].sort(()=>Math.random()-0.5);

// set shuffled names
listitems.forEach((item,index)=>{
item.querySelector(".person-name").innerText = shuffled[index];
});

}

function checkOrder(){

listitems.forEach((listItem,index)=>{

const personName = listItem.querySelector(".person-name").innerText.trim();

if(personName === richestPeople[index]){

listItem.classList.add("right");
listItem.classList.remove("wrong");

}else{

listItem.classList.add("wrong");
listItem.classList.remove("right");

}

});

}

// Drag Functions

function dragStart(){
dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter(){
this.classList.add("over");
}

function dragLeave(){
this.classList.remove("over");
}

function dragOver(e){
e.preventDefault();
}

function dragDrop(){

const dragEndIndex = +this.getAttribute("data-index");

swapItems(dragStartIndex,dragEndIndex);

this.classList.remove("over");

}

function swapItems(fromIndex,toIndex){

const itemOne = listitems[fromIndex].querySelector(".draggable");
const itemTwo = listitems[toIndex].querySelector(".draggable");

listitems[fromIndex].appendChild(itemTwo);
listitems[toIndex].appendChild(itemOne);

}

function addDragEventListeners(){

const draggables = document.querySelectorAll(".draggable");
const draggable_listItems = document.querySelectorAll(".draggable-list li");

draggables.forEach(draggable=>{
draggable.addEventListener("dragstart",dragStart);
});

draggable_listItems.forEach(item=>{
item.addEventListener("dragover",dragOver);
item.addEventListener("drop",dragDrop);
item.addEventListener("dragenter",dragEnter);
item.addEventListener("dragleave",dragLeave);
});

}

check.addEventListener("click",shuffleNames);
check.addEventListener("click",checkOrder);