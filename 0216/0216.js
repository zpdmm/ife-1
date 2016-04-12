/*
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 var aqiData = {};
 var city_input = document.getElementById("aqi-city-input");
 var value_input = document.getElementById("aqi-value-input");
 var table = document.getElementById("aqi-table");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
 function addAqiData() {
 	var cityTrim = city_input.value.trim();//获取用户输入的数据,关于trim???
 	var value_trim = value_input.value.trim();

 	//正则
 	if(!cityTrim.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
 		alert("城市名必须为中英文字符！")
 		return;
 	}
 	if(!value_trim.match(/^\d+$/)) {
 		alert("空气质量指数必须为整数！")
 		return;
 	}
   	aqiData[cityTrim] = value_trim;//因为city_tirm是变量。所以使用方括号而不是点,不加双引号
 	// console.log(aqiData);
 }

/**
 * 渲染aqi-table表格
 */
 function renderAqiList() {
 	
 	table.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
 	//循环枚举
 	for(cityTrim in aqiData){
 		var tr = document.createElement("tr");
 		var td1 = document.createElement("td");
 		td1.innerHTML = cityTrim;
 		tr.appendChild(td1);

 		var td2 = document.createElement("td");
 		td2.innerHTML = aqiData[cityTrim];
 		tr.appendChild(td2);

 		var td3 = document.createElement("td");
 		td3.innerHTML = "<button>删除</button>";
 		tr.appendChild(td3);
 		table.appendChild(tr);
 	}
 }

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
 function addBtnHandle() {
 	addAqiData();
 	renderAqiList();
 }

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
 function delBtnHandle(target) {
  // do sth.
  var tr = target.parentElement.parentElement;
  var cityTrim = tr.children[0].innerHTML;
  delete aqiData[cityTrim];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").addEventListener("click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
/*  document.getElementById("aqi-table").addEventListener("click", function(event){
  	if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.cityTrim);
  })*/
table.addEventListener("click", function(event) {
	if (event.target.nodeName.toLowerCase() === "button") delBtnHandle(event.target);
})
}

init();

String.prototype.trim = function() {
	return this.replace(/[\\s(^\s+)(\s+$)]/g, "")
	// this.replace("\\s+","");
};