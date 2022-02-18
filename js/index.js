"use script"; //开发环境建议开启严格模式

var map;

//读取 config.json 配置文件
mars2d.Util.fetchJson({ url: "config/config.json" })
  .then(function (data) {
    window.initMap(data.mars2d); //构建地图
  })
  .catch(function (error) {
    console.log(error);
    haoutil.alert(error && error.message, "出错了");
  });

function initMap(options) {
  //合并属性参数，可覆盖config.json中的对应配置
  let mapOptions = mars2d.Util.merge(options, {});

  //创建地图
  map = new mars2d.Map("mars2dContainer", mapOptions);
}
