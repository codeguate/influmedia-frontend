<?php
$codigo = $_GET['codigo'];
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <link rel="shortcut icon" href="../Asset/img/favicon/favicon.png" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../Asset/css/style.css">
    <title>SOMOS | INFLUMEDIA</title>
  </head>
  <body>
    <div id="alertModal" class="d-none alert alert-danger" >
      <button type="button" class="close" onClick="$('#alertModal').addClass('d-none');">&times;</button>
      <span id="ErrorMesagge">

      </span>
        </div>
    <div class="row h-100">
        
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 h-100 d-flex" >
            <div class="w-70 text-left m-auto ">
                <img class="w-90" src="../Asset/img/Somos.png">
                <img class="w-90" src="../Asset/img/Logo Influmedia.png">
                <br>
                <!-- <p class="text-white text-somos">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p> -->
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 h-100 d-none" id="FormFacebook" >
            <div class="w-75 text-center m-auto ">
                <!-- <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div> -->
                  <img id="loginFacebook" class="w-90 m-auto pointerpointerpointer" src="../Asset/img/LoginFB.png">
                <p class="text-left text-white texto-login">
                    Regístrate con Facebook para continuar con la validación de tu código además podrás ganar un premio sorpresa.
                </p>
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 h-100 d-flex" id="FormRegistro" style="background-color: white">
          <div class="w-60 h-80 text-center m-auto ">
              <div>
                  <h4 class="title_bienvenido">BIENVENIDO</h4>
                  <h6 class="desck_title">Registra tus datos y código.</h6>
              </div>
              <div class="d-flex w-50 mx-auto" >
                  <img id="ProfilePic" class="w-50 mx-auto rounded-circle" src="../Asset/img/Iconos Formulario/Nombre.png">
              </div>
              <div class="content_form">
                  <form>
                      <div class="d-flex content-input" >
                          <img id="icon_1" class="w-10" src="../Asset/img/Iconos Formulario/Nombre.png">
                          <input class="form-control w-90" type="text" id="name1" name="name1" placeholder="Nombre">
                      </div>
                      <div class="d-flex content-input" >
                          <img class="w-10" src="../Asset/img/Iconos Formulario/Documento.png">
                          <input class="form-control w-90" type="text" id="dpi" name="dpi" onkeyup="cuiIsValid(event);" placeholder="Documento Identificación">
                          
                      </div>
                      <div id="dpiVerificacion" class="d-none alert alert-danger w-75 mx-auto">
                          Tu Identificacion ya se encuentra registrado
                       </div>
                      <div class="d-flex content-input" >
                          <div class="row mx-auto responsive-inputs" style="width: 100%;"> 
                            
                            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                              <img class="w-100" src="../Asset/img/Iconos Formulario/Telefono.png">
                            </div>
                            
                            <input type="text" class="form-control col-xs-4 col-sm-4 col-md-4 col-lg-4 " id="area" name="area" placeholder="PREFIJO" onkeyup="calidarArea(event);">
                            <input type="text" class="form-control col-xs-7 col-sm-7 col-md-7 col-lg-7" id="telefono" name="telefono" placeholder="TELÉFONO" onkeyup="calidarTele(event);">
                          </div>
                      </div>
                      <div class="d-flex content-input" >
                          <img class="w-10" src="../Asset/img/Iconos Formulario/Email.png">
                          <input class="form-control w-90" type="email" id="email2" name="email2" placeholder="Correo electrónico">
                          
                      </div>
                      <div id="email2Verificacion" class="d-none alert alert-danger mt-2 w-75 mx-auto">
                          Tu Email ya se encuentra registrado
                       </div>
                      <div class="d-flex content-input" >
                          <img class="w-10" src="../Asset/img/Iconos Formulario/Codigo.png">
                          <input class="form-control w-90" type="text" id="codigo" name="codigo" placeholder="Código de Registro" onkeyup="buscaCodigo(event);">
                          
                          
                      </div>
                      <div id="codigoVerificacion" class="d-none alert alert-danger mt-2  w-75 mx-auto">
                          Este Código no Existe
                       </div>
                      <div id="codigoVerificacion2" class="d-none alert alert-danger  mt-2 w-75 mx-auto">
                          Tu Codigo ya esta registrado en otro usuario
                       </div>
                      <div class="form-group w-100 text-center">
                          <button type="button" class="m-auto w-75 btn btn-success" disabled="true">Registrado</button>
                      </div>
                      <!-- <input type="submit" placeholder="registrarse"> -->
                  </form>
              </div>
          </div>
      </div>
    </div>
    <div class="modal" id="loaderModal">
        <div style="height: 100%;text-align: center;" >
            <div class="lds-ring" style="align-self: center;margin-top: 15%;"><div></div><div></div><div></div><div></div></div>

        </div>
      </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="../Asset/js/main.js"></script>
    <script src="../Asset/js/events.js"></script>
    <script>
    buscarCodigo('<?php echo $codigo; ?>');
    </script>
  </body>
</html>