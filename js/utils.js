let startTime;
let intervalId;
const maxTime = 17;

//************************************************************
//************************************************************
//*********************++++++++++++***************************
//************************************************************
//************************************************************

function startTimer() {

  startTime = Date.now();
  updateTimer();
  intervalId = setInterval(updateTimer, 1000);

}

//************************************************************
//************************************************************
//*********************++++++++++++***************************
//************************************************************
//************************************************************

function updateTimer() {

  const currentTime = Date.now();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const remainingTime = maxTime - elapsedTime;

  document.getElementById("timer").textContent = ` ${remainingTime}`;
  document.getElementById("progressBar").value = elapsedTime;

  if (elapsedTime >= maxTime) {
    clearInterval(intervalId);
  }

}

//************************************************************
//************************************************************
//*********************++++++++++++***************************
//************************************************************
//************************************************************

document.addEventListener("DOMContentLoaded", function () {

  const identificationNumberInput = document.getElementById(
    "identification_number"
  );

  identificationNumberInput.focus();

  identificationNumberInput.addEventListener("input", function (event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  });


  const sendDataButton = document.getElementById("sendData");

  identificationNumberInput.addEventListener("input", function () {

    const inputValue = identificationNumberInput.value;

    
    if (inputValue.length > 3) {

      sendDataButton.removeAttribute("disabled");
      sendDataButton.classList.remove("btn-secondary");
      sendDataButton.classList.add("btn-primary");
    } else {

      sendDataButton.setAttribute("disabled", "true");

      sendDataButton.classList.add("btn-secondary");
      sendDataButton.classList.remove("btn-primary");
    }

  });



//************************************************************
//************************************************************
//*********************++++++++++++***************************
//************************************************************
//************************************************************

  const imageCodeInput = document.getElementById("imageCode");
  const generateCodeButton = document.getElementById("generateCode");

  imageCodeInput.addEventListener("input", function () {
    const inputValue = imageCodeInput.value;

    imageCodeInput.addEventListener("input", function (event) {

      event.target.value = event.target.value.replace(/[^0-9]/g, "");

    });


    if (imageCodeInput.value.length > 5) {

      imageCodeInput.value = imageCodeInput.value.slice(0, 5);
    }


    if (inputValue.length === 5) {

      generateCodeButton.removeAttribute("disabled");
      generateCodeButton.classList.remove("btn-secondary");
      generateCodeButton.classList.add("btn-primary");

    } else {

      generateCodeButton.setAttribute("disabled", "true");
      generateCodeButton.classList.add("btn-secondary");
      generateCodeButton.classList.remove("btn-primary");

    }

  });
});



//************************************************************
//************************************************************
//*********************++++++++++++***************************
//************************************************************
//************************************************************

document.getElementById("save").addEventListener("click", function () {

  location.reload();
  socket.close();
  const identificationNumberInput = document.getElementById(
    "identificationNumber"
  );

  identificationNumberInput.focus();

});

//************************************************************
//************************************************************
//*********************++++++++++++***************************
//************************************************************
//************************************************************

document.getElementById("close").addEventListener("click", function () {

  location.reload();
  socket.close();
  const identificationNumberInput = document.getElementById(
    "identificationNumber"
  );

  identificationNumberInput.focus();

});

//************************************************************
//************************************************************
//*********************++++++++++++***************************
//************************************************************
//************************************************************

document.getElementById("closeH").addEventListener("click", function () {

  location.reload();
  socket.close();
  const identificationNumberInput = document.getElementById(
    "identificationNumber"
    
  );

  identificationNumberInput.focus();
});
