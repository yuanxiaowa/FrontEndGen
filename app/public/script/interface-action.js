var protocal = $('.js-interface-protocal').text();
var reqtype = $('.js-interface-reqtype').text();
var rettype = $('.js-interface-rettype ').text();

var server = $('#server');
var port = $('#port');
var path = $('#path');

$('.js-action').click(function(event) {
    var item = $(this).closest('.accordion-content');
    var _param = {
        host: server.val() + ':' + port.val(),
        path: path.val()
    }
    $.ajax({
        url: '/pipe?' + $.param(_param),
        type: item.find('.js-interface-method').text(),
        data: {
            a:1
        }
    })
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
    /*$.post('pipe', {
        protocal: protocal,
        reqtype: reqtype,
        rettype: rettype,
        server: server.val(),
        port: port.val(),
        path: path.val(),
        url: item.find('.js-interface-url').attr('href'),
        method: item.find('.js-interface-method').text(),
        param: item.find('.js-interface-param').val(),
        req: item.find('.js-interface-req').val()
    }, function (res) {
        console.log(res)
    });*/
});