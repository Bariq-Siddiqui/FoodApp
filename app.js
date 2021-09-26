// Signup
const signUp=()=>{
    let username=document.getElementById("username").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    let country=document.getElementById("country").value;
    let city=document.getElementById("city").value;
    let password=document.getElementById("password").value;
    if(username.length <= 0){
        alert("Enter Name")
    }
    if(email.length <= 6 || (email.indexOf('.com')<=0) || (email.indexOf('@')<=0)){
        alert("Enter Valid email")
    }
    if(phone.length <= 9){
        alert("Enter Phone Number")
    }
    if(country.length <= 0){
        alert("Enter Country Name")
    }
    if(city.length <= 0){
        alert("Enter City Name")
    }
    if(password.length <= 5){
        alert("Enter Password")
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      let user = {
        username: username,
        email: email,
        phone:phone,
        country:country,
        city:city,
        password: password
    }
    firebase.database().ref(`users/${res.user.uid}`).set(user)
    .then(()=>{
      window.location.href="signIn.html";
    })
  })
  .catch((error) => {
    // console.log(error.message);
    alert(error.message)

  });
}
// Sign In
const onLogin=()=>{
  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value;
  if(email.length <= 6 || (email.indexOf('.com')<=0) || (email.indexOf('@')<=0)){
    alert("Enter Valid email")
  }
  if(password.length <= 5){
    alert("Ente Correct Password")
  }
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((res) => {
    firebase.database().ref(`users/${res.user.uid}`).once("value",(data)=>{
    //   localStorage.setItem("userBio",data.val().username);
    })
    .then(()=>{
      window.location.href="allrestaurent.html";
    })
  })
  .catch((error) => {
    // console.log(error.message);
    alert(error.message)
  });
}
const signOut=()=>{
  localStorage.removeItem("userBio");
  firebase.auth().signOut()
  .then(()=>{
      window.location="signIn.html"
  })
  .catch(()=>{

  })
}
const getPost=()=>{
  firebase.database().ref(`cards`).on('child_added',(data)=>{
      var list = document.getElementById("list");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="images.jpeg" width="100%" height="100%">
      <h5 class="card-title" id="card_title"> <span class="cardNme"> ${data.val().item_name}</h5>
      <p class="card-text" id="card_text"><span class="cardNme"><b>Price:</b></span> ${data.val().price}</p>
      <p class="card-text" id="card_text"></p>
      <div class="nav-item dropdown">
        <a class="dropdown-toggle abc" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item">${data.val().category1}</a>
          <a class="dropdown-item">${data.val().category1}</a>
      </div>
      <div class="nav-item dropdown">
        <a class="dropdown-toggle abc" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Delivery Type
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item">${data.val().Free_Paid}</a>
      </div> <br><br>
  <button id="${data.val().key}" class="logout" onclick="pending(this)">Order</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const pending=(e)=>{
  firebase.database().ref(`cards/${e.id}`).once("value",(data)=>{
    var key=firebase.database().ref('pending').push().key;
    let pending = {
      item_name:data.val().item_name,
      price:data.val(). price,
      category1:data.val().category1,
      category2:data.val().category2,
      Free_Paid:data.val().Free_Paid,
      key:key
  }
  firebase.database().ref(`pending/${key}`).set(pending)    
    alert("Order Successfully")
  })
}
const rest=()=>{
  window.location.href="restaurent1.html";
}
const getPostres2=()=>{
  firebase.database().ref(`cardsres2`).on('child_added',(data)=>{
      var list = document.getElementById("listres2");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="images.jpeg" width="100%" height="100%">
      <h5 class="card-title" id="card_title"> <span class="cardNme"> ${data.val().item_name}</h5>
      <p class="card-text" id="card_text"><span class="cardNme"><b>Price:</b></span> ${data.val().price}</p>
      <p class="card-text" id="card_text"></p>
      <div class="nav-item dropdown">
        <a class="dropdown-toggle abc" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item">${data.val().category1}</a>
          <a class="dropdown-item">${data.val().category1}</a>
      </div>
      <div class="nav-item dropdown">
        <a class="dropdown-toggle abc" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Delivery Type
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item">${data.val().Free_Paid}</a>
      </div> <br><br>
  <button id="${data.val().key}" class="logout" onclick="order2(this)">Order</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const getPostres3=()=>{
  firebase.database().ref(`cardsres3`).on('child_added',(data)=>{
      var list = document.getElementById("listres3");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="images.jpeg" width="100%" height="100%">
      <h5 class="card-title" id="card_title"> <span class="cardNme"> ${data.val().item_name}</h5>
      <p class="card-text" id="card_text"><span class="cardNme"><b>Price:</b></span> ${data.val().price}</p>
      <p class="card-text" id="card_text"></p>
      <div class="nav-item dropdown">
        <a class="dropdown-toggle abc" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item">${data.val().category1}</a>
          <a class="dropdown-item">${data.val().category1}</a>
      </div>
      <div class="nav-item dropdown">
        <a class="dropdown-toggle abc" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Delivery Type
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item">${data.val().Free_Paid}</a>
      </div> <br><br>
  <button id="${data.val().key}" class="logout" onclick="order3(this)">Order</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const rest2=()=>{
  window.location.href="restaurent2.html";
}
const rest3=()=>{
  window.location.href="restaurent3.html";
}
const order2=(e)=>{
  firebase.database().ref(`cardsres2/${e.id}`).once("value",(data)=>{
    var key=firebase.database().ref('pending2').push().key;
    let pending = {
      item_name:data.val().item_name,
      price:data.val(). price,
      category1:data.val().category1,
      category2:data.val().category2,
      Free_Paid:data.val().Free_Paid,
      key:key
  }
  firebase.database().ref(`pending2/${key}`).set(pending)    
    alert("Order Successfully")
  })
}
const order3=(e)=>{
  firebase.database().ref(`cardsres3/${e.id}`).once("value",(data)=>{
    var key=firebase.database().ref('pending3').push().key;
    let pending = {
      item_name:data.val().item_name,
      price:data.val(). price,
      category1:data.val().category1,
      category2:data.val().category2,
      Free_Paid:data.val().Free_Paid,
      key:key
  }
  firebase.database().ref(`pending3/${key}`).set(pending)    
    alert("Order Successfully")
  })
}
