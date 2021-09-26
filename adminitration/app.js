// Admin Signup
const signUp=()=>{
    let restaurantName=document.getElementById("restaurantName").value;
    let email=document.getElementById("email").value;
    let country=document.getElementById("country").value;
    let city=document.getElementById("city").value;
    let password=document.getElementById("password").value;
    if(restaurantName.length <= 0){
        alert("Enter Restaurant Name")
    }
    if(email.length <= 6 || (email.indexOf('.com')<=0) || (email.indexOf('@')<=0)){
        alert("Enter Valid email")
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
      let admin = {
        restaurantName: restaurantName,
        email: email,
        country:country,
        city:city,
        password: password
    }
    firebase.database().ref(`admins/${res.user.uid}`).set(admin)
    .then(()=>{
      window.location.href="adminsignIn.html";
    })
  })
  .catch((error) => {
    // console.log(error.message);
    alert(error.message)
  });
}
// Admin Sign In
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
    firebase.database().ref(`admins/${res.user.uid}`).once("value",(data)=>{
    //   localStorage.setItem("userBio",data.val().username);
    // console.log(res.user.uid)
    })
    .then(()=>{
      window.location.href="index.html";
    })
  })
  .catch((error) => {
    // console.log(error.message);
    alert(error.message)
  });
}
const signOut=()=>{
    // localStorage.removeItem("userBio");
    firebase.auth().signOut()
    .then(()=>{
        window.location="adminsignIn.html"
    })
    .catch(()=>{
  
    })
  }
const onCard=()=>{
    let item_name = document.getElementById("item-name");
    let price = document.getElementById("price");
    let category1 = document.getElementById("category1");
    let category2 = document.getElementById("category2");
    // let imgName = document.getElementById("imgName");
    let Free_Paid = document.getElementById("Free-Paid");
    var key=firebase.database().ref('cards').push().key;
    let addCard = {
        item_name: item_name.value,
        price: price.value,
        category1:category1.value,
        category2:category2.value,
        // imgName: imgName.value,
        Free_Paid:Free_Paid.value,
        key:key
    }
    firebase.database().ref(`cards/${key}`).set(addCard);
    item_name.value="";
    price.value="";
    category1.value="";  
    category2.value="";
    imgName.value="";
    Free_Paid.value="";
}
const onCardres2=()=>{
  let item_name = document.getElementById("item-name1");
  let price = document.getElementById("price1");
  let category1 = document.getElementById("category11");
  let category2 = document.getElementById("category21");
  // let imgName = document.getElementById("imgName");
  let Free_Paid = document.getElementById("Free-Paid1");
  var key=firebase.database().ref('cardsres2').push().key;
  let res2Card = {
      item_name: item_name.value,
      price: price.value,
      category1:category1.value,
      category2:category2.value,
      // imgName: imgName.value,
      Free_Paid:Free_Paid.value,
      key:key
  }
  firebase.database().ref(`cardsres2/${key}`).set(res2Card);
  item_name.value="";
  price.value="";
  category1.value="";  
  category2.value="";
  // imgName.value="";
  Free_Paid.value="";
  // console.log(item_name.value)
  // console.log(price.value)
  // console.log(category1.value)
  // console.log(category2.value)
  // console.log(Free_Paid.value)
}
const onCardres3=()=>{
  let item_name = document.getElementById("item-name2");
  let price = document.getElementById("price2");
  let category1 = document.getElementById("category12");
  let category2 = document.getElementById("category22");
  // let imgName = document.getElementById("imgName");
  let Free_Paid = document.getElementById("Free-Paid2");
  var key=firebase.database().ref('cardsres2').push().key;
  let res3Card = {
      item_name: item_name.value,
      price: price.value,
      category1:category1.value,
      category2:category2.value,
      // imgName: imgName.value,
      Free_Paid:Free_Paid.value,
      key:key
  }
  firebase.database().ref(`cardsres3/${key}`).set(res3Card);
  item_name.value="";
  price.value="";
  category1.value="";  
  category2.value="";
  // imgName.value="";
  Free_Paid.value="";
  // console.log(item_name.value)
  // console.log(price.value)
  // console.log(category1.value)
  // console.log(category2.value)
  // console.log(Free_Paid.value)
}
const getPost=()=>{
    firebase.database().ref(`cards`).on('child_added',(data)=>{
        // let li=document.createElement("li");
        // let liText=document.createTextNode(data.val().todo_item);
    // console.log(obj)
        // console.log(i)
        var list = document.getElementById("list");
        let li = document.createElement("li");
        li.innerHTML = `    <div class="card-body">
        <img src="../images.jpeg" width="100%" height="100%">
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
    <button id="${data.val().key}" class="logout" onclick="dltItem(this)">Delete</button>
    </div>`
    li.setAttribute("class","appLi")
    list.appendChild(li);
})
}
const getPostres2=()=>{
  firebase.database().ref(`cardsres2`).on('child_added',(data)=>{
      var list = document.getElementById("listres2");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="../images.jpeg" width="100%" height="100%">
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
  <button id="${data.val().key}" class="logout" onclick="dltItem2(this)">Delete</button>
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
      <img src="../images.jpeg" width="100%" height="100%">
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
  <button id="${data.val().key}" class="logout" onclick="dltItem3(this)">Delete</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const dltItem=(e)=>{
    firebase.database().ref(`cards`).child(e.id).remove();
    e.parentNode.parentNode.parentNode.parentNode.remove();
}
const dltItem2=(e)=>{
  firebase.database().ref(`cardsres2`).child(e.id).remove();
  e.parentNode.parentNode.parentNode.parentNode.remove();
}
const dltItem3=(e)=>{
  firebase.database().ref(`cardsres3`).child(e.id).remove();
  e.parentNode.parentNode.parentNode.parentNode.remove();
}
const pending=(e)=>{
    firebase.database().ref(`pending`).on('child_added',(data)=>{
        var list = document.getElementById("listpend");
        let li = document.createElement("li");
        li.innerHTML = `    <div class="card-body">
        <img src="../images.jpeg" width="100%" height="100%">
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
    <button id="${data.val().key}" class="logout" onclick="accepted(this)">Accepted</button>
    </div>`
    li.setAttribute("class","appLi")
    list.appendChild(li);
})
}
const pending2=(e)=>{
  firebase.database().ref(`pending2`).on('child_added',(data)=>{
      var list = document.getElementById("listpend");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="../images.jpeg" width="100%" height="100%">
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
  <button id="${data.val().key}" class="logout" onclick="accepted2(this)">Accepted</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const pending3=(e)=>{
  firebase.database().ref(`pending3`).on('child_added',(data)=>{
      var list = document.getElementById("listpend");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="../images.jpeg" width="100%" height="100%">
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
  <button id="${data.val().key}" class="logout" onclick="accepted3(this)">Accepted</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const accepted=(e)=>{
    firebase.database().ref(`pending/${e.id}`).once("value",(data)=>{
        var key=firebase.database().ref('accepted').push().key;
        let accepted = {
          item_name:data.val().item_name,
          price:data.val(). price,
          category1:data.val().category1,
          category2:data.val().category2,
          Free_Paid:data.val().Free_Paid,
          key:key
      }
      firebase.database().ref(`accepted/${key}`).set(accepted)    
      alert("Order Successfully Accepted")
      })
      firebase.database().ref(`pending`).child(e.id).remove();
        e.parentNode.parentNode.parentNode.parentNode.remove();
}
const accepted2=(e)=>{
  firebase.database().ref(`pending2/${e.id}`).once("value",(data)=>{
      var key=firebase.database().ref('accepted2').push().key;
      let accepted = {
        item_name:data.val().item_name,
        price:data.val(). price,
        category1:data.val().category1,
        category2:data.val().category2,
        Free_Paid:data.val().Free_Paid,
        key:key
    }
    firebase.database().ref(`accepted2/${key}`).set(accepted)    
    alert("Order Successfully Accepted")
    })
    firebase.database().ref(`pending2`).child(e.id).remove();
      e.parentNode.parentNode.parentNode.parentNode.remove();
}
const accepted3=(e)=>{
  firebase.database().ref(`pending3/${e.id}`).once("value",(data)=>{
      var key=firebase.database().ref('accepted3').push().key;
      let accepted = {
        item_name:data.val().item_name,
        price:data.val(). price,
        category1:data.val().category1,
        category2:data.val().category2,
        Free_Paid:data.val().Free_Paid,
        key:key
    }
    firebase.database().ref(`accepted3/${key}`).set(accepted)    
    alert("Order Successfully Accepted")
    })
    firebase.database().ref(`pending3`).child(e.id).remove();
      e.parentNode.parentNode.parentNode.parentNode.remove();
}
const acceptedData=(e)=>{
    firebase.database().ref(`accepted`).on('child_added',(data)=>{
        var list = document.getElementById("listaccept");
        let li = document.createElement("li");
        li.innerHTML = `    <div class="card-body">
        <img src="../images.jpeg" width="100%" height="100%">
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
    <button id="${data.val().key}" class="logout" onclick="deliver(this)">Deliver</button>
    </div>`
    li.setAttribute("class","appLi")
    list.appendChild(li);
})
}
const acceptedData2=(e)=>{
  firebase.database().ref(`accepted2`).on('child_added',(data)=>{
      var list = document.getElementById("listaccept");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="../images.jpeg" width="100%" height="100%">
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
  <button id="${data.val().key}" class="logout" onclick="deliver2(this)">Deliver</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const acceptedData3=(e)=>{
  firebase.database().ref(`accepted3`).on('child_added',(data)=>{
      var list = document.getElementById("listaccept");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="../images.jpeg" width="100%" height="100%">
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
  <button id="${data.val().key}" class="logout" onclick="deliver3(this)">Deliver</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const deliver=(e)=>{
    firebase.database().ref(`accepted/${e.id}`).once("value",(data)=>{
        var key=firebase.database().ref('deliver').push().key;
        let deliver = {
          item_name:data.val().item_name,
          price:data.val(). price,
          category1:data.val().category1,
          category2:data.val().category2,
          Free_Paid:data.val().Free_Paid,
          key:key
      }
      firebase.database().ref(`deliver/${key}`).set(deliver)    
      alert("Order Successfully Deliver")
      })
      firebase.database().ref(`accepted`).child(e.id).remove();
        e.parentNode.parentNode.parentNode.parentNode.remove();
}
const deliver2=(e)=>{
  firebase.database().ref(`accepted2/${e.id}`).once("value",(data)=>{
      var key=firebase.database().ref('deliver2').push().key;
      let deliver = {
        item_name:data.val().item_name,
        price:data.val(). price,
        category1:data.val().category1,
        category2:data.val().category2,
        Free_Paid:data.val().Free_Paid,
        key:key
    }
    firebase.database().ref(`deliver2/${key}`).set(deliver)    
    alert("Order Successfully Deliver")
    })
    firebase.database().ref(`accepted2`).child(e.id).remove();
      e.parentNode.parentNode.parentNode.parentNode.remove();
}
const deliver3=(e)=>{
  firebase.database().ref(`accepted3/${e.id}`).once("value",(data)=>{
      var key=firebase.database().ref('deliver3').push().key;
      let deliver = {
        item_name:data.val().item_name,
        price:data.val(). price,
        category1:data.val().category1,
        category2:data.val().category2,
        Free_Paid:data.val().Free_Paid,
        key:key
    }
    firebase.database().ref(`deliver3/${key}`).set(deliver)    
    alert("Order Successfully Deliver")
    })
    firebase.database().ref(`accepted3`).child(e.id).remove();
      e.parentNode.parentNode.parentNode.parentNode.remove();
}
const deliverData=(e)=>{
    firebase.database().ref(`deliver`).on('child_added',(data)=>{
        var list = document.getElementById("listdelivery");
        let li = document.createElement("li");
        li.innerHTML = `    <div class="card-body">
        <img src="../images.jpeg" width="100%" height="100%">
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
    <button id="${data.val().key}" class="logout" onclick="finish(this)">Finish</button>
    </div>`
    li.setAttribute("class","appLi")
    list.appendChild(li);
})
}
const deliverData2=(e)=>{
  firebase.database().ref(`deliver2`).on('child_added',(data)=>{
      var list = document.getElementById("listdelivery");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="../images.jpeg" width="100%" height="100%">
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
  <button id="${data.val().key}" class="logout" onclick="finish2(this)">Finish</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const deliverData3=(e)=>{
  firebase.database().ref(`deliver3`).on('child_added',(data)=>{
      var list = document.getElementById("listdelivery");
      let li = document.createElement("li");
      li.innerHTML = `    <div class="card-body">
      <img src="../images.jpeg" width="100%" height="100%">
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
  <button id="${data.val().key}" class="logout" onclick="finish3(this)">Finish</button>
  </div>`
  li.setAttribute("class","appLi")
  list.appendChild(li);
})
}
const finish=(e)=>{
    firebase.database().ref(`deliver`).child(e.id).remove();
    e.parentNode.parentNode.parentNode.parentNode.remove();
}
const finish2=(e)=>{
  firebase.database().ref(`deliver2`).child(e.id).remove();
  e.parentNode.parentNode.parentNode.parentNode.remove();
}
const finish3=(e)=>{
  firebase.database().ref(`deliver3`).child(e.id).remove();
  e.parentNode.parentNode.parentNode.parentNode.remove();
}