//系统 主入口

var map;    //地图对象 
var request; //url传入的参数

$(document).ready(function () { 
    //记录url传入参数
    request = haoutil.system.getRequest();
    if (window.top) {//有父级
        request = haoutil.system.getRequest(window.top);
    }

    initMap();
});

function initMap() {
    var configfile = "config/config.json"; //默认地址
    if (request.config)//url传入地址
        configfile = request.config;

    haoutil.loading.show();
    $.ajax({
        type: "get",
        dataType: "json",
        url: configfile,
        timeout: 0,
        success: function (data) {
            haoutil.loading.hide(); 
 
            //构造地图
            map = L.mars.createMap({
                id: "map",
                data: data.map,
                serverURL: data.serverURL, 
                layerToMap:layerToMap
            });
 
            //如果有xyz传参，进行定位 
            if (haoutil.isutil.isNotNull(request.x)
                && haoutil.isutil.isNotNull(request.y)
                && haoutil.isutil.isNotNull(request.z)) {
                var x = Number(request.x);
                var y = Number(request.y);
                var z = Number(request.z);
                map.setView([y, x], z);
            }

            initWork(map);  //项目的其他事项 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            haoutil.loading.hide();
            haoutil.alert(configfile + "文件加载失败！");
        }
    });
  
}
 

//当前页面业务相关
function initWork() {


}


//自定义图层添加方法
function layerToMap(config, layer) {
    if (config.type == "wfs") {
        layer = L.wfsLayer(config);//wfs插件
        return layer;
    }
};
 