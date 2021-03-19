// Document is ready

$(document).ready(function () {
  // Validate Username
  $("#usercheck").hide();
  var usernameError = false;
  $("#fname").keyup(function () {
    validateUsername();
  });
  // Validate UserLastname
  // $('#userchecks').hide();
  // var userlastnameError = true;
  // $('#lname').keyup(function () {
  //  validateUserLastname();

  // });
  //validate address
  $("#addr").hide();
  var useraddrError = false;
  $("#address").keyup(function () {
    validateAddress();
  });

  //validate email
  $("#emailcheck").hide();
  var useremailError = false;
  $("#email").keyup(function () {
    validateEmail();
  });

  //validate phone
  $("#phonecheck").hide();
  var userphoneError = false;
  $("#phone").keyup(function (e) {
    if (e.keyCode != 8) {
      if ($("#phone").val().length == 1) {
        let curVal = $("#phone").val();
        $("#phone").val("(" + curVal);
      }
      if ($("#phone").val().length == 4) {
        let curVal = $("#phone").val();
        $("#phone").val(curVal + ") ");
      }
      if ($("#phone").val().length == 9) {
        let curVal = $("#phone").val();
        $("#phone").val(curVal + "-");
      }
    }
    validatePhone();
  });

  //username
  function validateUsername() {
    var usernameValue = $("#fname").val();
    if (usernameValue.length == "") {
      $("#fname").css("border", "1px solid red");
      $("#usercheck").html("**username missing");
      $("#usercheck").show();
      usernameError = true;
    } else if (usernameValue.length < 3 || usernameValue.length > 10) {
      $("#fname").css("border", "1px solid lightgrey");
      $("#usercheck").show();
      $("#usercheck").html("**length of username must be between 3 and 10");
      usernameError = true;
    } else {
      $("#usercheck").hide();
      usernameError = false;
    }
  }

  //user last name
  // function validateUserLastname(){
  //   var userlastnameValue = $('#lname').val();
  //   if((userlastnameValue.length < 1)||
  //   (userlastnameValue.length > 15)) {
  //     $('#lname').css("border","1px solid red")
  // $('#userchecks').show();
  // $('#userchecks').html
  // ("length of lastname must be between 1 and 15");
  // userlastnameError = false;
  // return false;
  // }
  // else {
  //   $('#lname').css("border","1px solid lightgrey")
  // $('#userchecks').hide();
  // }
  // }

  //email
  function validateEmail() {
    var useremailValue = $("#email").val();
    var reg = /^[^ ]+@[^ ]+\.[a-z]{3,3}$/;
    if (useremailValue.length == "") {
      $("#email").css("border", "1px solid red");
      $("#emailcheck").html("**email missing");
      $("#emailcheck").show();
      useremailError = true;
    } else if (reg.test(useremailValue)) {
      $("#email").css("border", "1px solid lightgrey");
      $("#emailcheck").hide();
      useremailError = false;
    } else {
      $("#email").css("border", "1px solid red");
      $("#emailcheck").show();

      $("#emailcheck").html("**please enter valid email");
      useremailError = true;
    }
  }

  // function numberOnly(input){
  //   var pattern=/[^0-9]/gi;
  //   input.value=input.value.replace(pattern,"");
  // }

  //phone
  function validatePhone() {
    var phoneValue = $("#phone").val();
    var re = /[A-Za-z]+/;
    var maxlength = 14;
    console.log("phonevalue", phoneValue);
    if (phoneValue == "") {
      $("#phone").css("border", "1px solid red");
      $("#phonecheck").html("**Phone number missing");
      $("#phonecheck").show();
      userphoneError = true;
    } else if (phoneValue.length < maxlength) {
      $("#phone").css("border", "1px solid red");
      $("#phonecheck").html("**Please enter the correct phone number");
      $("#phonecheck").show();
      userphoneError = true;
    } else if (re.test($("#phone").val().trim())) {
      $("#phone").css("border", "1px solid red");
      $("#phonecheck").html("**allow only numbers");
      $("#phonecheck").show();
      userphoneError = true;
    } else {
      $("#phone").css("border", "1px solid lightgrey");
      $("#phonecheck").hide();
      userphoneError = false;
    }
  }

  //address
  function validateAddress() {
    var addressValue = $("#address").val();
    if (addressValue.length == "") {
      $("#address").css("border", "1px solid red");
      $("#addr").html("**address is missing");
      $("#addr").show();
      useraddrError = true;
    } else {
      $("#address").css("border", "1px solid lightgrey");
      $("#addr").hide();
      useraddrError = false;
    }
  }

  //captcha

  var sum;
  let data1 = Math.round(10 * Math.random());
  let data2 = Math.round(10 * Math.random());
  let str = ` ${data1}+${data2}=?`;
  $("#captcha").html(str);

  $("#captcha").css({
    "font-size": "200%",
    "font-weight": "bold",
    "text-align": "center",
  });
  sum = data1 + data2;
  $("#texts").keyup(function () {
    validateCaptcha();
  });

  function validateCaptcha() {
    var textValue = $("#texts").val();

    if (textValue == sum) {
      $("#captchacheck").html("Ohh ss its correct").fadeOut(2000);
      $("#captchacheck").css("color", "green");
    } else {
      $("#captchacheck").html("Opps! its Incorrect ");
      $("#captchacheck").css("color", "red");
    }
  }

  function enableButton() {
    $("#mybtn").prop("disabled", false); // enable the submit button
    $("#mybtn").css({ opacity: "1" }); // make the submit button look enabled
  }

  function disableButton() {
    $("#mybtn").prop("disabled", true); // disable the submit button
    $("#mybtn").css({ opacity: "0.5" }); // make the submit button look dsiabled
  }

  //   Add the data to firebase

  function storeData() {
    //get values
    var FirstName = $("#fname").val();
    var LastName = $("#lname").val();
    var Email = $("#email").val();
    var Phone = $("#phone").val();
    var Address = $("#address").val();
    db.collection("users")
      .doc()
      .set({
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Phone: Phone,
        Address: Address,
      })

      .then(() => {
        console.log("document written successfully");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  //read the data
  function getData() {
    var useremailValue = $("#email").val();
    var temp = [];

    db.collection("users")
      .get()
      .then((doc) => {
        doc.forEach((d) => {
          let currentData = d.data().Email;
          temp.push(currentData);
        });

        if (temp.includes(useremailValue)) {
          $("#email").css("border", "1px solid red");
          $("#emailcheck").html("**email already exist");
          $("#emailcheck").show();
          useremailError = true;
        } else {
          $("#email").css("border", "1px solid lightgrey");
          $("#emailcheck").hide();
          useremailError = false;
        }
        if (
          usernameError === true ||
          useremailError === true ||
          userphoneError === true ||
          useraddrError === true
        ) {
          $("#result").css({ color: "red", "margin-bottom": "10px" });
          $("#result").html("Please make sure all fields entered properly");

          return false;
        } else {
          storeData();

          $("#result").html("Thank You").fadeOut(5000);
          $("#result").css({
            color: "green",
            "margin-bottom": "10px",
            "font-size": "20px",
            "font-weight": "bold",
            "text-align": "center",
          });

          var sum;
          let data1 = Math.round(10 * Math.random());
          let data2 = Math.round(10 * Math.random());
          let str = ` ${data1}+${data2}=?`;
          $("#captcha").html(str);

          $("#captcha").css({
            "font-size": "200%",
            "font-weight": "bold",
            "text-align": "center",
          });
          sum = data1 + data2;
          $("#memoForm").trigger("reset");
        }
      });
  }

  //validate all fields length
  $("#memoForm").click("input", () => {
    x = document.getElementById("check").checked;
    y = document.getElementById("checks").checked;

    if (
      fname.value.length > 0 &&
      email.value.length > 0 &&
      phone.value.length > 0 &&
      address.value.length > 0 &&
      texts.value.length > 0 &&
      x == true &&
      y == true
    ) {
      enableButton();
    } else {
      disableButton();
    }
  });

  // create blur event

  $("input").blur(function (event) {
    if (event.target.value.length == 0) {
      event.target.style.borderColor = "red";
    } else {
      event.target.style.borderColor = "lightgrey";
    }
  });

  // Submitt button
  $("#mybtn").click(function (e) {
    e.preventDefault();
    // disableButton(); // disable button for making it not tappable multiple times.

    // var x=$("input[type='checkbox']:checked");
    // if(x.length==2){
    //   storeData();
    //   $("#result").html ("Thank You").fadeOut(2000);
    //   $("#result").css({"color":"green","margin-bottom":"10px","font-size":"20px" ,"font-weight":"bold", "text-align":"center"})
    //   $("#memoForm").trigger("reset");
    // }

    // else{
    //   $("#result").html("Please select the options before submit the form")
    //   $("#result").css({"color":"red","margin-bottom":"10px"})
    // }

    getData();
  });
});
