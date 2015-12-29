$('#file').change(function () {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var result = e.target.result;
    };
    reader.readAsText(file);
});

function getTmp(i) {
    return '<li class="callout"><div class="close-button">&times;</div><div class="row"><div class="columns small-3"><label class="text-right">接口名称</label></div><div class="columns small-9"><input name="item[interfaces][' + i +'][name]" type="text"></div></div><div class="row"><div class="columns small-3"><label class="text-right">接口地址</label></div><div class="columns small-9"><input name="item[interfaces][' + i +'][url]" type="text"></div></div><div class="row"><div class="columns small-3"><label class="text-right">请求方式</label></div><div class="columns small-9"><select name="item[interfaces][' + i +'][method]"><option selected>GET</option><option>POST</option><option>PUT</option><option>DELETE</option><option>OPTIONS</option><option>HEAD</option><option>TRACE</option><option>CONNECT</option></select></div></div><div class="row"><div class="columns small-3"><label class="text-right">请求参数</label></div><div class="columns small-9"><textarea name="item[interfaces][' + i +'][req]"></textarea></div></div><div class="row"><div class="columns small-3"><label class="text-right">返回格式</label></div><div class="columns small-9"><textarea name="item[interfaces][' + i +'][ret]"></textarea></div></div><div class="row"><div class="columns small-3"><label class="text-right">路由参数</label></div><div class="columns small-9"><textarea name="item[interfaces][' + i +'][param]"></textarea></div></div></li>';
}

var $ol = $('#ol');
var i = $ol.children().length;
$('#add').click(function() {
    $ol.append(getTmp(i++));
});

$ol.on('click', '.close-button', function () {
    $(this).parent().remove();
});

// 文本框编辑
$('textarea').keydown(function (e) {
    if (e.keyCode == 9) {
        e.preventDefault();
    }
}).keyup(function (e) {
    if (e.keyCode == 9) {
        var value = this.value;
        var pos = this.selectionStart;
        this.value = value.replace(new RegExp('([\\s\\S]{' + pos + '})'), '$1  ');
        this.selectionStart = pos + 2;
        this.selectionEnd = pos + 2;
    }
});