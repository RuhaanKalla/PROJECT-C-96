var firebaseConfig = {
    apiKey: "AIzaSyBnZSoE_yokDvBKoIv60b8E9n2GZZiOXMM",
    authDomain: "lets-web-chat-app.firebaseapp.com",
    databaseURL: "https://lets-web-chat-app-default-rtdb.firebaseio.com",
    projectId: "lets-web-chat-app",
    storageBucket: "lets-web-chat-app.appspot.com",
    messagingSenderId: "437390431468",
    appId: "1:437390431468:web:c8596095e74c2ebae241c9"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name")

    function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
          like:0,
          message:msg,
          name:user_name
      });
      document.getElementById("msg").value = "";
  }

  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
   firebase_message_id = childKey;
    message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data);
    message  = message_data["message"];
    name = message_data["name"];
    like = message_data["like"];

    name_with_tag = "<h4>" + name + "</h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button = "<button class='btn btn-warning' id="+firebase_message_id+"value ="+like+"onclick = 'update_like(this.id)'>";
    span_with_tag = "<span class='glypicon glyphicon-thumbs-up'>Like : " + like + "</span></button><hr>";
    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;

  }});
});
  }

  getData();

  function update_like(message_id){
      console.log("inside function"+message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updatedlikes = Number(likes) + 1;
      firebase.database().ref(room_name).child(button_id).update({
          like : updatedlikes
      });
  }

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");

    window.location = "kwitter_page.html";
}