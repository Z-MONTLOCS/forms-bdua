let socket;

let globalData = {
  message: "",
  socket_id: "",
  documentType: "",
  identificationNumber: "",
  code: "",
  urlImage: "",
};

document.getElementById("sendData").addEventListener("click", () => {
  //************************************************************
  //************************************************************
  //************************************************************
  //************************************************************

  //cambiar Propieddes de boton enviar
  const sendDataBtn = document.getElementById("sendData");
  sendDataBtn.setAttribute("disabled", true);
  sendDataBtn.classList.remove("btn-primary");
  sendDataBtn.classList.add("btn-secondary");

  document.getElementById("sendData").innerText = "Enviar";
  document.getElementById("sendData").innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
  //Notificacion
  document.getElementById("responseQuery").innerHTML =
    '<div class="alert alert-success">Enviando Informacion</div>';

  //socket = new WebSocket("ws://localhost:8765");
  socket = new WebSocket("wss://a8c4-2800-e2-4b80-13e4-952a-53cb-d6e6-24a8.ngrok-free.app/");

  //https://a8c4-2800-e2-4b80-13e4-952a-53cb-d6e6-24a8.ngrok-free.app/
 



  // Resto del código para configurar y usar la conexión WebSocket...

  // Manejar el error aquí o simplemente ignorarlo si no deseas hacer nada específico

  //************************************************************
  //************************************************************
  //************************************************************
  //************************************************************

  socket.onopen = (event) => {
    //************************************************************
    //************************************************************
    //************************************************************
    //************************************************************

    if (socket.readyState === WebSocket.OPEN) {
      //Definicicion de informacion a enviar
      const identificationNumber = document.getElementById(
        "identification_number"
      ).value;

      const documentType = document.getElementById("document_type").value;

      globalData.message = "data";
      globalData.socket_id = "";
      globalData.documentType = documentType;
      globalData.identificationNumber = identificationNumber;
      globalData.code = "";
      globalData.urlImage = "";

      //Envio de informacion

      //console.log("client request:", globalData);
      socket.send(JSON.stringify(globalData));

      //Deshabilitar  propiedades inputs
      const documentTypeSelect = document.getElementById("document_type");
      const identificationNumberInput = document.getElementById(
        "identification_number"
      );

      documentTypeSelect.disabled = true;
      identificationNumberInput.disabled = true;

      //Deshabilitar  y cambiar propiedades boton enviar
      const sendDataBtn = document.getElementById("sendData");
      sendDataBtn.setAttribute("disabled", true);
      sendDataBtn.classList.remove("btn-primary");
      sendDataBtn.classList.add("btn-secondary");

      document.getElementById("sendData").setAttribute("disabled", true);
    } else {
      //console.log("WebSocket close");
      document.getElementById("responseQuery").innerHTML =
        '<div class="alert alert-danger">error</div>';
      //console.log("WebSocket is not yet ready.");

      setTimeout(() => {}, 2000);
      location.reload();
    }
  };

  //************************************************************
  //************************************************************
  //********************* Mensajes   ***************************
  //************************************************************
  //************************************************************

  socket.onmessage = async (event) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      let data = JSON.parse(event.data);
      let serverResponse = data.server_response;

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "data save") {
        //Notificacion
        document.getElementById("sendData").innerHTML =
          '<span "></span> Enviar';

        //const sendDataBtn = document.getElementById("sendData");
        sendDataBtn.style.display = "none";

        document.getElementById("responseQuery").innerHTML =
          '<div class="alert alert-success">Informacion recibida con exito</div>';

        setTimeout(() => {
          //console.log("Server response:", serverResponse.message);
          globalData.message = "resgisterForms";
          //console.log("client request:", globalData);
          socket.send(JSON.stringify(globalData));
        }, 2000);
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "data validate") {
        //Notificacion
        //console.log("Server response:", serverResponse.message);

        document.getElementById("responseQuery").innerHTML =
          '<div class="alert alert-success">Validando Informacion </div>';
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "error_number_input") {
        //Notificacion
        document.getElementById("responseQuery").innerHTML =
          '<div class="alert alert-danger">Número de Identificación No Válida</div>';

        setTimeout(() => {
          document.getElementById("responseQuery").innerHTML = "";
          location.reload();

          const identificationNumberInput = document.getElementById(
            "identificationNumber"
          );

          identificationNumberInput.focus();
        }, 2000);
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "link send") {
        const imageContainer = document.getElementById("imageContainer");
        const imageCodeInput = document.getElementById("imageCode");
        const generateCode = document.getElementById("generateCode");

        const imgElement = new Image();

        imgElement.onload = function () {
          //console.log("Server response:", serverResponse);

          // Notificación
          // document.getElementById("responseQuery").innerHTML =
          //   '<div class="alert alert-success">¡Imagen cargada!</div>';

          imageContainer.style.display = "block";
          imageCodeInput.style.display = "block";
          generateCode.style.display = "block";

          imageCodeInput.focus();

          document.getElementById("responseQuery").innerHTML = "";

          // setTimeout(function () {

          //   document.getElementById("responseQuery").innerHTML = "";
          // }, 1000);
        };

        imgElement.src = serverResponse.urlImage;

        imageContainer.innerHTML = "";
        imageContainer.appendChild(imgElement);

        // Asignar los valores a las propiedades de globalData
        globalData.message = serverResponse.message;
        globalData.socket_id = serverResponse.socket_id;
        globalData.documentType = serverResponse.documentType;
        globalData.identificationNumber = serverResponse.identificationNumber;
        globalData.code = serverResponse.code;
        globalData.urlImage = serverResponse.urlImage;
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "code validate") {
        //Notificacion
        //console.log("Server response:", serverResponse.message);
        document.getElementById("responseQuery").innerHTML =
          '<div class="alert alert-success">Validando el codigo</div>';
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "code error") {
        //Notificacion
        //console.log("Server response:", serverResponse.message); // Notificación

        document.getElementById("responseQuery").innerHTML =
          '<div class="alert alert-danger">El codigo que digitaste no coincide</div>';

        setTimeout(() => {
          document.getElementById("responseQuery").innerHTML = "";
          location.reload();
          const identificationNumberInput = document.getElementById(
            "identificationNumber"
          );

          identificationNumberInput.focus();
        }, 3000);
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "charge") {
        //Notificacion
        document.getElementById("responseQuery").innerHTML =
          '<div class="alert alert-success">Cargando Informacion..</div>';
        //console.log("Server response:", serverResponse.message);
        document.getElementById("timer").style.display = "block";
        document.getElementById("progressBar").style.display = "block";

        startTimer();

        globalData.message = "get data";

        //console.log("client request:", globalData);
        socket.send(JSON.stringify(globalData));
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "charge data") {
        document.getElementById("generateCode").innerHTML =
          '<span "></span>Enviar Código';
        document.getElementById("timer").style.display = "none";
        document.getElementById("progressBar").style.display = "none";

        //console.log("Server response:", serverResponse);

        const info = data.server_response;

        const identificationNumber = document.getElementById(
          "identification_number"
        ).value;
        const documentType = document.getElementById("document_type").value;

        //document.getElementById("id").value = info.id;
        document.getElementById("documentType").value = documentType;
        document.getElementById("identificationNumber").value =
          identificationNumber;
        document.getElementById("firstName").value = info.first_name;
        document.getElementById("middleName").value = info.middle_name;
        document.getElementById("lastName").value = info.last_name;
        document.getElementById("secondLastName").value = info.second_last_name;
        document.getElementById("eps").value = info.eps;

        const apiForm = document.getElementById("apiForm");
        apiForm.style.display = "block";

        $("#myModal").modal("show");
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "user no found") {
        //console.log("Server response:", serverResponse.message);
        //console.log("Server response:", serverResponse.message_error);

        document.getElementById(
          "responseQuery"
        ).innerHTML = `<div class="alert alert-danger">${serverResponse.message_error}</div>`;

        setTimeout(() => {
          document.getElementById("responseQuery").innerHTML = "";
          location.reload();
          const identificationNumberInput = document.getElementById(
            "identificationNumber"
          );

          identificationNumberInput.focus();
        }, 3000);
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (serverResponse && serverResponse.message === "page no fount BDUA") {
        let responseQuery = document.getElementById("responseQuery");
        responseQuery.innerHTML = "";

        let enlace = document.createElement("a");

        enlace.href =
          "https://aplicaciones.adres.gov.co/bdua_internet/Pages/ConsultarAfiliadoWeb.aspx";
        enlace.target = "_blank";
        enlace.textContent =
          "Haz clic aquí para verificar la página del BDUA este disponible";

        document.getElementById(
          "responseQuery"
        ).innerHTML = `<div class="alert alert-danger">Error al cargar el Capcha</div>`;

        responseQuery.appendChild(enlace);

        setTimeout(() => {
          document.getElementById("responseQuery").innerHTML = "";
          location.reload();
          const identificationNumberInput = document.getElementById(
            "identificationNumber"
          );

          identificationNumberInput.focus();
        }, 6000);
      }

      //************************************************************
      //************************************************************
      //*********************++++++++++++***************************
      //************************************************************
      //************************************************************

      if (
        serverResponse &&
        serverResponse.message === "Error al inicializar el driver"
      ) {
        //Notificacion

        document.getElementById(
          "responseQuery"
        ).innerHTML = `<div class="alert alert-danger">Error al validar informacio</div>`;

        setTimeout(() => {
          document.getElementById("responseQuery").innerHTML = "";
          location.reload();
          const identificationNumberInput = document.getElementById(
            "identificationNumber"
          );

          identificationNumberInput.focus();
        }, 6000);
      }
    }
  };

  //************************************************************
  //************************************************************
  //*********************+++Boton Enviar Codigo+++++++++********
  //************************************************************
  //************************************************************

  document.getElementById("generateCode").addEventListener("click", () => {
    const generateCode = document.getElementById("generateCode");
    generateCode.setAttribute("disabled", true);
    generateCode.classList.remove("btn-primary");
    generateCode.classList.add("btn-secondary");

    imageContainer.style.display = "none";

    document.getElementById("imageContainer").innerHTML = "";

    const imageCodeInput = document.getElementById("imageCode");

    imageCodeInput.style.display = "none";

    globalData.code = document.getElementById("imageCode").value;
    globalData.message = "code send";

    //console.log("client request:", globalData);
    socket.send(JSON.stringify(globalData));

    document.getElementById("generateCode").innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> enviando...';
  });

  //************************************************************
  //************************************************************
  //************************************************************
  //************************************************************

  socket.onerror = function (event) {
    //console.error('Error de WebSocket:', event);

    document.getElementById("responseQuery").innerHTML =
      '<div class="alert alert-danger">Sin conexión</div>';

    setTimeout(() => {
      //console.log("WebSocket connection is closed");
      location.reload();
      const identificationNumberInput = document.getElementById(
        "identificationNumber"
      );
      identificationNumberInput.focus();
    }, 2000);
  };

  //************************************************************
  //************************************************************
  //************************************************************
  //************************************************************

  socket.onclose = function (event) {
    if (event.wasClean) {
      // console.log(
      //   "La conexión WebSocket se cerró de manera limpia:",
      //   event.reason
      // );

      document.getElementById("responseQuery").innerHTML =
        '<div class="alert alert-danger">Sin conexión</div>';

      setTimeout(() => {
        //console.log("WebSocket connection is closed");
        location.reload();
        const identificationNumberInput = document.getElementById(
          "identificationNumber"
        );
        identificationNumberInput.focus();
      }, 2000);
    } else {
      setTimeout(() => {
        //console.log("WebSocket connection is closed");
        location.reload();
        const identificationNumberInput = document.getElementById(
          "identificationNumber"
        );
        identificationNumberInput.focus();
      }, 2000);
    }
  };

  //************************************************************
  //************************************************************
  //************************************************************
  //************************************************************
});
