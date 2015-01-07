//---------------------------------------
//レイヤー名をテキストに保存
//---------------------------------------
CR = String.fromCharCode(13);
savename = File.saveDialog("保存するファイル名を入れてください");
if (savename) {
	var fileObj = new File(savename);
	var flag = fileObj.open("w");
	if (flag == true) {
		writeLayerName(activeDocument);
		fileObj.close();
	} else {
		alert("ファイルが開けませんでした");
	}
}
//---------------------------------------
//レイヤーセット内にレイヤーが含まれる限り書き出し（再帰）
//---------------------------------------
function writeLayerName(layObj) {
	var _title = 'Title';
	var str = prompt("調べる文字を入れて下さい（正規表現）", _title);
	var regObj = new RegExp(str, "g");
	var txtObj = activeDocument.artLayers;
	var n = layObj.artLayers.length;
	for (var i = 0; i < n; i++) {
		if (txtObj[i].kind == LayerKind.TEXT) {
			var txt = txtObj[i].textItem.contents;
			var result = txt.match(regObj);
			var layName = layObj.artLayers[i].name;
			if (result) {
				fileObj.write(i + ':' + layName + CR + txt + CR + CR);
				//alert("レイヤー名「" + txtObj[i].name.substr(0, 5) + "...」に該当文字があります。");
			}
		}
	}
	var ns = layObj.layerSets.length;
	for (var i = 0; i < ns; i++) {
		writeLayerName(layObj.layerSets[i])
	}
}