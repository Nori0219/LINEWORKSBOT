// iOSのショートカットから以下がPOSTされるとする
// mydata : {
// name : "ショートカットからのデータ"
//}

function doPost(e) {
    var params = JSON.parse(e.postData.getDataAsString()); // POSTされたデータを取得
    var myData = params.mydata.name;  // ショートカットで指定したPOSTデータを取得
    var result = {};
       
    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    // addLog("params is :" + JSON.stringify(params)); // デバッグ用
    
    if (myData){
      
      result = {
        "success" : {
          "message" : "正常に処理されました。"
        }
      };
 
      startWorking(myData); // スプレッドシートにショートカットから送信されてきたデータを記録する関数（GASではライブラリから実行）
      ProjMMain.sendMessage(); //Botからメッセージを送信する
  
  
    } else {
      result = {
     "error": {
         "message": "データがありません。"
       }
     };
    }
    
    // 返すデータ（上記のresult）をセットする
    output.setContent(JSON.stringify(result));
    
    // リクエスト元（ショートカット）に返す
    return output;
  }
  
  
  //出勤時間を記録
  function startWorking(workerName) {
    // スプレッドシートのIDを設定
    const SPREADSHEET_ID = 'xxxxxxxxxxxxxxxxxx';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('勤怠記録');
    let lastRow = sheet.getLastRow();
  
    let presentTime = getPresentTime();
    let presentTimeFormatted = formatTime(presentTime);
    let presentDateFormatted = formatDate(presentTime);
  
    sheet.getRange(lastRow + 1 , 3).setValue(presentDateFormatted); //C列の最新行に日付を入力
    sheet.getRange(lastRow + 1 , 4).setValue(workerName); //D列の最新行に名前を入力
    sheet.getRange(lastRow + 1 , 5).setValue(presentTimeFormatted); //E列の最新行に時刻を入力
  }
  
  // 今日の日付と時刻を取得
  function getPresentTime() {
    return new Date();
  }
  
  // 時刻でフォーマットする
  function formatTime(date) {
    return Utilities.formatDate(date, 'JST', 'HH:mm');
  }
  
  // 日付でフォーマットする
  function formatDate(date) {
    return Utilities.formatDate(date, 'JST', 'yyyy年M月d日');
  }
  