const contacts = 
  [
  {
    "name": "",    "phone": "(358) 274-0770",   "avatar": "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/14.jpg","id": "1"
 },
  {
    "name": "Timothy Lynch",    "phone": "451-547-4540",    "avatar": "https://avatars.githubusercontent.com/u/22613659",    "id": "2"
  },
  {
    "name": "Janice Bechtelar",    "phone": " 954-4482 x959",    "avatar": "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/84.jpg",    "id": "3"
  },
  {
    "name": "Bill Wolf Sr.",    "phone": "753-468-1434",    "avatar": "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/41.jpg",    "id": "4"
  },
  
];

const add = document.getElementById("add_contact");
  const task = document.getElementById("contact_list");
  const delete_all = document.getElementById("delete_all");


function displayContacts(){
  task.innerHTML= "";
  contacts.forEach((contact) => {
    const li = create_contact(contact.name, contact.phone, contact.avatar);
    task.appendChild(li);

  });
}

 function create_contact(name,phone,photo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap shadow-sm mb-2 p-2";

  li.innerHTML = ` 
        <div class="d-flex gap-3">
          <img src="${photo}" alt="${name}'s avatar" width="60px" height="60px" class="rounded-circle border">

          <div class="">
            <h6 class="mb-1 contact_name">${name}</h6>
            <em class="mb-1 phone text-muted">${phone}</em>
          </div>
        </div>
        <div class="d-flex gap-2 mt-2 mt-md-0">
          <button class="edit btn btn-primary btn-sm">Edit</button>
          <button class="delete btn btn-warning btn-sm">Delete</button>

        </div>  
`;
  return li;
}
 
add.addEventListener("click",function () {

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const photoFile = document.getElementById("photo").files[0];
  const photo = photoFile ? URL.createObjectURL(photoFile) : "https://i.pravatar.cc/100";

  
   if (name === "" || phone === "") {
    alert("Please enter both name and phone number!");
    return;
  }
  
  const new_contact = {name, phone, avatar:photo};
  contacts.push(new_contact);

  const li = create_contact(name,phone,photo);
  task.appendChild(li);

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("photo").file[0] = "";



});

delete_all.addEventListener("click",function(){
  if (task.innerHTML === ""){
    return;
  }
 if (confirm("Are you sure to delete all contacts?")) {
  task.innerHTML = "";
 }
});

task.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  
  if (e.target.classList.contains("delete")) {
    li.remove();
  }


  else if (e.target.classList.contains("edit")) {
    const nameField = li.querySelector(".contact_name");
    const phoneField = li.querySelector(".phone");

    const new_name = prompt("Edit name:", nameField.textContent);
    const new_phone = prompt("Edit phone number:", phoneField.textContent);

    if (new_name && new_name.trim() !== "") {
      nameField.textContent = new_name.trim();
    }
    if (new_phone && new_phone.trim() !== "") {
      phoneField.textContent = new_phone.trim();
    }
  }
});

displayContacts();