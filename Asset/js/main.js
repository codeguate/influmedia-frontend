
var valid = {
    dpi:false,
    email:false,
    codigo:false
}

function guardar(data){
    if($("#dpi").hasClass('border-success') && $("#email2").hasClass('border-success') && $("#codigo").hasClass('border-success')){
        $.ajax({
            type: "POST",
            async:true,
            cache:false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:JSON.stringify(data),
            url: "https://5bconectate.com/influmedia/backend/public/api/users",
            success: async function (response) {
    
                if(response.id){
                    location.href = "./dashboard/registrado.html"
                    // url = "https://eu57.chat-api.com/instance54781/sendFile?token=jyxxunefvf2f43sz&phone="+response.telefono+"&body=https://5bconectate.com/influmedia/backend/public/"+response.codigo+"_salida.png&filename="+response.codigo+".png"
                    // await $.ajax({
                    //         type: "GET",
                    //         url: url,
                    //         async:true,
                    //         cache:false,
                    //         dataType: "json",
                    //         success: function (response1) {
                    //             if(response1.sent){
                    //                 location.href = "./dashboard/registrado.html"
                    //             }
                    //         }
                    //     });
                    
                }
            },
            error:async function (error){
                if(error.status==400){
                    $("#alertModal").removeClass("d-none");
                    $("#ErrorMesagge").html("Error de Registro");
                    await verificar("email",$("#email2").val());
                    await verificar("dpi",$("#dpi").val().replace(/ /g, '').replace(/-/g, ''));
                    await verificar("codigo",$("#codigo").val());
                    await buscaCodigo($("#codigo").val());
                    setTimeout(() => {
                        $("#loaderModal").modal('hide');
                        
                    }, 500);
                }
                console.log(error);
    
                $("#loaderModal").modal('hide');
                
            }
        });

    }else if(!$("#dpi").hasClass('border-success')){
        $("#alertModal").removeClass("d-none");
        $("#ErrorMesagge").html("Identificacion incorrecta");
        setTimeout(() => {
            $("#loaderModal").modal('hide');
            
        }, 500);
        
    }else if(!$("#email2").hasClass('border-success')){
        console.log('eror email');
        $("#alertModal").removeClass("d-none");
        $("#ErrorMesagge").html("El Email ya esta registrado");
        setTimeout(() => {
            $("#loaderModal").modal('hide');
            
        }, 500);
        
    }else if(!$("#codigo").hasClass('border-success')){
        console.log('eror codigo');
        $("#ErrorMesagge").html("El codigo no puede registrarse");
        $("#alertModal").removeClass("d-none");
        setTimeout(() => {
            $("#loaderModal").modal('hide');
            
        }, 500);
        
    }
    
}

function verificar(type,id){
    if(id!=""){
        var data = {
            id:0,
            state:id,
            filter:type
        }
        type3=type

        if(type3=="email"){
            type3="email2";
        }
            $.ajax({
                type: "GET",
                async:true,
                cache:false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "https://5bconectate.com/influmedia/backend/public/api/filter/"+data.id+"/users/"+data.state+"?filter="+data.filter,
                success: function (response) {
                        console.log(response);
                        console.log("https://5bconectate.com/influmedia/backend/public/api/filter/"+data.id+"/users/"+data.state+"?filter="+data.filter);
                        
                        
                    if(response.length>0){
                        $("#"+type3+"Verificacion").removeClass('d-none')
                        $("#"+type3).addClass('border border-danger')
                        $("#"+type3).removeClass('border border-success')
                    }else{
                        $("#"+type3+"Verificacion").addClass('d-none')
                        $("#"+type3).removeClass('border border-danger')
                        $("#"+type3).addClass('border border-success')
                    }
                    
                },
                error: function (error){
                    if(error.status==404){
                        return false;
                    }
                }
            });
        
    }else{
        return false;
    }
}



function buscaCodigo(id){
    if(id!=""){
        var data = {
            id:0,
            state:id,
            filter:"codigo"
        }

        try{
        
            $.ajax({
                type: "GET",
                async:true,
                cache:false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "https://5bconectate.com/influmedia/backend/public/api/filter/"+data.id+"/codigos/"+data.state+"?filter="+data.filter,
                success: function (response) {
                    $("#codigoVerificacion").addClass('d-none')
                    if(response.length>0){
                        $.ajax({
                            type: "GET",
                            async:true,
                            cache:false,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: "https://5bconectate.com/influmedia/backend/public/api/filter/"+data.id+"/users/"+data.state+"?filter="+data.filter,
                            success: function (response) {
                                if(response.length>0){
                                    if(response[0]){
                                        if(response[0].email==$("#email2").val()){
                                            $("#codigoVerificacion").addClass('d-none')
                                            $("#codigoVerificacion2").addClass('d-none')
                                            $("#codigo").removeClass('border border-danger')
                                            $("#codigo").addClass('border border-success')
                                        }else{
                                            $("#codigoVerificacion").addClass('d-none')
                                            $("#codigoVerificacion2").removeClass('d-none')
                                            $("#codigo").addClass('border border-danger')
                                            $("#codigo").removeClass('border border-success')
                                        }
                                    }
                                }else{
                                    $("#codigoVerificacion").addClass('d-none')
                                    $("#codigoVerificacion2").addClass('d-none')
                                    $("#codigo").removeClass('border border-danger')
                                    $("#codigo").addClass('border border-success')
                                }
                                
                            },
                            error: function (error){
                                if(error.status==404){
                                    return false;
                                }
                            }
                        });
                        
                    }else{
                        $("#codigoVerificacion").removeClass('d-none')
                        $("#codigo").addClass('border border-danger')
                        $("#codigo").removeClass('border border-success')
                    }
                },
                error: function (error){
                    if(error.status==404){
                        return false;
                    }
                }
            });
        }
        catch(error){
            
        }
    }else{
        return false;
    }
}
function buscarCodigo(codigo){

    if(codigo!=""){
        var data = {
            id:0,
            state:codigo,
            filter:"codigo"
        }

        try{
        
            $.ajax({
                type: "GET",
                async:true,
                cache:false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "https://5bconectate.com/influmedia/backend/public/api/filter/"+data.id+"/users/"+data.state+"?filter="+data.filter,
                success: function (response) {
                    if(response.length>0){
                        response = response[0]
                        $("#name").val(response.nombres+" "+response.apellidos);
                        $("#dpi").val(formatearDPI(response.dpi));
                        $("#area").val("+"+response.telefono.substring(0,3));
                        $("#telefono").val(formatearTel(response.telefono.substring(3)));
                        $("#email2").val(response.email);
                        $("#empresa").val(response.descripcion);
                        $("#codigo").val(response.codigo);

                        $("#name").attr('disabled',true);
                        $("#dpi").attr('disabled',true);
                        $("#area").attr('disabled',true);
                        $("#telefono").attr('disabled',true);
                        $("#email2").attr('disabled',true);
                        $("#empresa").attr('disabled',true);
                        $("#codigo").attr('disabled',true);

                        $("#name").removeClass('border-danger');
                        $("#dpi").removeClass('border-danger');
                        $("#area").removeClass('border-danger');
                        $("#telefono").removeClass('border-danger');
                        $("#email2").removeClass('border-danger');
                        $("#empresa").removeClass('border-danger');
                        $("#codigo").removeClass('border-danger');

                        $("#name").addClass('border-success');
                        $("#dpi").addClass('border-success');
                        $("#area").addClass('border-success');
                        $("#telefono").addClass('border-success');
                        $("#email2").addClass('border-success');
                        $("#empresa").addClass('border-success');
                        $("#codigo").addClass('border-success');
                        
                        
                    }else{
                        $("#codigoVerificacion").removeClass('d-none')
                        $("#codigo").addClass('border border-danger')
                        $("#codigo").removeClass('border border-success')
                    }
                },
                error: function (error){
                    if(error.status==404){
                        return false;
                    }
                }
            });
        }
        catch(error){
            
        }
    }else{
        return false;
    }
    
}

var normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};
   
    for(var i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );
   
    return function( str ) {
        var ret = [];
        for( var i = 0, j = str.length; i < j; i++ ) {
            var c = str.charAt( i );
            if( mapping.hasOwnProperty( str.charAt( i ) ) )
                ret.push( mapping[ c ] );
            else
                ret.push( c );
        }      
        return ret.join( '' );
    }
   
  })();

$(document).ready(function () {
    $("#guardar").attr('disabled',true);

    $("#codigo").keyup(async function (e) { 
        if ( e.which != 13 ) {
            e.preventDefault();
            $("#loaderModal").modal('hide');
        }else{
            await verificar("codigo",$("#codigo").val());
            await buscaCodigo($("#codigo").val());
            if(valid.codigo){
                $("#codigo").css('border-color','red');
                $("#guardar").attr('disabled',true);
                $("#loaderModal").modal('hide');
                
            }else{
                $("#codigo").css('border-color','green');
                $("#guardar").attr('disabled',false);
                $("#loaderModal").modal('hide');
            }
        }
    });

    $("#guardar").click(function (e) { 
        $("#loaderModal").modal("show");
        e.preventDefault();
        let nombre= normalize($("#name1").val());
        let nombres = ['','','','']
        if(nombre!=""){
            let nombresC = nombre.split(' ');
                if(nombresC.length>2){
                    nombres[0] = nombresC[0]
                    nombres[1] = nombresC[1]
                    nombres[2] = nombresC[2]
                }else{
                    nombres[0] = nombresC[0]
                    nombres[2] = nombresC[1]
                }
            
        }
        
        var data = {
            nombres:nombres[0]+" "+nombres[1],
            apellidos:nombres[2]+" "+nombres[3],
            telefono:($("#area").val().substring(0,$("#area").val().length).replace(/ /g, '').replace("+", ''))+""+($("#telefono").val().substring(0,$("#telefono").val().length).replace(/ /g, '').replace(/-/g, '')),
            dpi:$("#dpi").val().replace(/ /g, '').replace(/-/g, ''),
            email:$("#email2").val(),
            foto:$("#ProfilePic").attr('src'),
            password:"5Bconectados",
            username:$("#email2").val().split('@')[0],
            descripcion:$("#empresa").val(),
            codigo:$("#codigo").val()
        }
        if(!buscaCodigo(data.codigo)){
            guardar(data);
        }
        
        
    });



    $("#login").click(function (e) { 
        $("#loaderModal").modal("show");
        e.preventDefault();
        var data = {
            username:$("#username").val().split(' ')[0],
            password:$("#password").val()
        }

        $.ajax({
            type: "POST",
            url: "https://5bconectate.com/influmedia/backend/public/api/login",
            data: data,
            dataType: "json",
            success: function (response) {
                if(response.id>0){
                    let hoy = new Date();
                    let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 7;
                    let suma = hoy.getTime() + semanaEnMilisegundos; //getTime devuelve milisegundos de esa fecha
                    let fechaDentroDeUnaSemana = new Date(suma);
                    localStorage.setItem("sesion5BConectate",true);
                    localStorage.setItem("sesionVence5BConectate",fechaDentroDeUnaSemana);
                    createTable();
                }
                console.log(response);
                
                
            },
            error: function (error){
                if(error.status==401){
                    $("#ErrorMesagge").html("Parece que su usuario o contraseña son incorrectos");
                    $("#alertModal").removeClass("d-none");
                    
                }else{
                    console.log(error);
                }

                setTimeout(() => {
                    $("#loaderModal").modal('hide');
                    
                }, 500);
                
            }
        });
        
        
        
    });
});