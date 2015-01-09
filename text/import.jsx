var CR = String.fromCharCode(13);
// scvのPATH
var filename = "C:/Users/ito/Desktop/jsx/text/text.csv";
var fileObj = new File(filename);
var flg = fileObj.open("r");
var txtAry = [];
var resAry = [];
//---------------------------------------
//ｃｓｖ ファイル読み込み
//---------------------------------------
if (flg == true) {
	alert(filename+"を読み込みます");
	var textCsv = fileObj.read();
	csvCount = textCsv.split(",");
	for (var i = 0; i <= csvCount.length-2; i++) {
		alert(csvCount[i]);
		txtAry.push(csvCount[i]);
	};
	fileObj.close();
	//---------------------------------------
	//レイヤーセット内にテキストレイヤーが含まれる
	//---------------------------------------
	function loadLayerName(layObj) {
		var _title = 'Title';
		var str = prompt("調べる文字を入れて下さい（正規表現）", _title);
		var regObj = new RegExp(str, "g");
		var txtObj = activeDocument.artLayers;
		var n = layObj.artLayers.length;
		for (var i = 0; i < n; i++) {
			if (txtObj[i].kind == LayerKind.TEXT) {
				var txt = txtObj[i].textItem.contents;
				var layName = layObj.artLayers[i].name;
				var result = layName.match(regObj);
				if (result) {
					//alert(layObj.artLayers[i]);
					resAry.push(layObj.artLayers[i]);
				}
			}
		}
		for (var i = 0; i < resAry.length; i++){
				resAry[i].textItem.contents = txtAry[i];
		}
		alert("Done!!!");
	}
	loadLayerName(activeDocument);

} else {
	alert("ファイルが開けませんでした");
}