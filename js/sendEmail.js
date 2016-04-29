var SendEmail = {
    init: function() {
        SendEmail.send();
        SendEmail.removeErrorHint();
    },

    send: function() {
        $('#send').click(function(e){
            $(this).prop('disabled', true);
            $('.alert').addClass('hidden');

            if (SendEmail.validate()) {
                $.ajax({
                    url: "//formspree.io/contato@tisstech.com.br",
                    method: "POST",
                    data: {
                        nome: $('#name').val(),
                        email: $('#email').val(),
                        telefone: $('#telephone').val(),
                        assunto: $('#subject').val(),
                        mensagem: $('#message').val(),
                        _subject: "Contato Pelo Site Tisstech.com.br"
                    },
                    dataType: "json"
                })
                .done(function() {
                    $('.alert-success').removeClass('hidden');
                    $('#name').val('');
                    $('#email').val('');
                    $('#telephone').val('');
                    $('#subject').val('');
                    $('#message').val('');
                })
                .fail(function() {
                    $('.alert-danger').removeClass('hidden');
                })
                .always(function() {
                    $('#send').prop("disabled", false);
                });
            } else {
                $('#send').prop("disabled", false);
            }
        });
    },

    validate: function() {
        var result = true;
        var name = $('#name').val();
        var email = $('#email').val()
        var telephone = $('#telephone').val()
        var message = $('#message').val();

        if (name == '') {
            $('#div-error-name').addClass('has-error');
            $('#span-error-name').removeClass('hidden');
            result = false;
        }
        if (email == '') {
            $('#div-error-email').addClass('has-error');
            $('#span-error-email').removeClass('hidden');
            result = false;
        } else {
            if (!SendEmail.isEmailAddress(email)) {
                $('#div-error-email').addClass('has-error');
                $('#span-error-email-2').removeClass('hidden');
                result = false;
            }
        }
        if (telephone == '') {
            $('#div-error-telephone').addClass('has-error');
            $('#span-error-telephone').removeClass('hidden');
            result = false;
        }
        if (message == '') {
            $('#div-error-message').addClass('has-error');
            $('#span-error-message').removeClass('hidden');
            result = false;
        }

        return result;
    },

    removeErrorHint: function() {
        $('input, textarea').focusout(function () {
            if ($(this).val() != '') {
                $('#div-error-' + $(this).attr('name')).removeClass('has-error');
                $('#span-error-' + $(this).attr('name')).addClass('hidden');
                $('#span-error-' + $(this).attr('name') + '-2').addClass('hidden');
            }
        });
    },

    isEmailAddress: function(str) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(str);
    }
}

SendEmail.init();
