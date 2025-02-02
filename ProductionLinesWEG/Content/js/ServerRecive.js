﻿// todos os methodos do servidor > cliente, dentro dessa função
function ServerReciveMethods() {

    //registra um cookie no browser
    connector.client.cookie = function (name, key) {
        $.cookie(name, key);
    };

    //aceita o login do usuário, registra o cookie "AuthId" e o redireciona para a dashboard
    connector.client.acceptLoginUser = function (key) {
        $.cookie('AuthId', key);

        window.location.href = '/Dashboard';
    };

    //função para exibir toast, pode ser utilizada no servidor
    connector.client.showToast = function (message) {
        M.toast({ html: message })
    };
    var t = true;
    //função para atualizar o dashboard
    connector.client.reciveListDashboard = function (jMessage) {
        var jsonDashboard = [];

        for (var i = 0; i < jMessage.length; i++) {
            var v = jMessage[i];


            let line = {
                horario: v.Date,
                mensagem: v.Message,
                critico: v.Critico
            };

            jsonDashboard.push(line);
        }

        inserirT(jsonDashboard);
    };

    connector.client.reciveTickDashboard = function (jMessage) {
        $(jMessage).each(function () {

            if (this.Nivel == parseInt($("#nivelDash :selected").val()) || parseInt($("#nivelDash :selected").val()) == 4) {
                $("#xuxu").prepend(
                    "<tr><td>" +
                    this.Date +
                    "</td><td>" +
                    this.Message +
                    "</td></tr>"
                );
            }
        });

        getTickDashboard();
    }

    connector.client.reciveTickEsteira = function (esteira, pecas) {
        var id = $("#item").data().id;
        if (id != "") {
            setOnOff(id, esteira.Ligado);
            setPiecesModal(pecas);
            getTickEsteira();
        }
    }

    //lista os processos na tela de processos
    connector.client.listProcessos = function (jsonRecived) {
        $("#listProcesso").html("");

        generateList(jsonRecived, $("#listProcesso"));

        $("#loading").hide();
    }

    //lista as esteiras na tela de esteiras
    connector.client.listEsteiras = function (jsonRecived) {
        try {
            $("#esteirasModel").html("");
            $("#esteirasArma").html("");
            $("#esteirasEtiq").html("");
            $("#esteirasDesvio").html("");

            // Pagina Esteiras
            generateListEsteira(jsonRecived.listModel, $("#esteirasModel"), 1, "colorEModel");
            generateListEsteira(jsonRecived.listArmazenamento, $("#esteirasArma"), 2, "colorEArmazem");
            generateListEsteira(jsonRecived.listEtiquetadora, $("#esteirasEtiq"), 3, "colorEEtiqueta");
            generateListEsteira(jsonRecived.listDesvio, $("#esteirasDesvio"), 4, "colorEDesvio");

            $("#loading").hide();
        } catch (e) {
            // null
        }

        try {
            $("#tmodelo tbody").html("");
            $("#tarmazenamento tbody").html("");
            $("#tetiquetadora tbody").html("");
            $("#tdesvio tbody").html("");

            // Pagina Planta
            generateListProducao(jsonRecived.listModel, $("#tmodelo tbody"), 1, "blue darken-4");
            generateListProducao(jsonRecived.listArmazenamento, $("#tarmazenamento tbody"), 2, "orange darken-4");
            generateListProducao(jsonRecived.listEtiquetadora, $("#tetiquetadora tbody"), 3, "teal darken-2");
            generateListProducao(jsonRecived.listDesvio, $("#tdesvio tbody"), 4, "purple lighten-1");

            setDropDragItens();
        } catch (e) {
            // null
        }
    }

    connector.client.setNivelDash = function (nivel) {
        var html = '';

        if (nivel == 1) {
            html += '<option value="1" selected>Nível de mensagem</option>';
        } else {
            html += '<option value="1">Nível de mensagem</option>';
        }

        if (nivel == 2) {
            html += '<option value="2" selected>Nível de aviso</option>';
        } else {
            html += '<option value="2">Nível de aviso</option>';
        }

        if (nivel == 3) {
            html += '<option value="3" selected>Nível de erro</option>';
        } else {
            html += '<option value="3">Nível de erro</option>';
        }

        if (nivel == 4) {
            html += '<option value="4" selected>Nível de debug</option>';
        } else {
            html += '<option value="4">Nível de debug</option>';
        }

        $("#nivelDash").html(html);
        $('select').formSelect();
    }

    connector.client.setOnOff = function (id, state) {
        setOnOff(id, state);
    }

    connector.client.setFirstConnection = function () {
        getFirstConnection();
    }

    connector.client.setNavColor = function (inSimulation) {

        if (inSimulation && !$("#navId").hasClass("red darken-2")) {
            $("#navId").removeAttr("class");
            $("#navId").addClass("red darken-2");
            blockDrag(true);
        } else if (!inSimulation && !$("#navId").hasClass("light-blue darken-2")) {
            $("#navId").removeAttr("class");
            $("#navId").addClass("light-blue darken-2");
            blockDrag(false);
        }
    }

    connector.client.clearProcess = function () {
        limpaInfo();
    }

    connector.client.clearEsteira = function () {
        limpaAbout();
    }
};