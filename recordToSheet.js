// スプレッドシートのIDを設定
const SPREADSHEET_ID = 'xxxxxxxxxxxxxxxxxxxxxx';


//出勤時間を記録
function startWorking(workerName) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('勤怠記録');
  let lastRow = sheet.getLastRow();

  let presentTime = getPresentTime();
  let presentTimeFormatted = formatTime(presentTime);
  let presentDateFormatted = formatDate(presentTime);

  sheet.getRange(lastRow + 1 , 3).setValue(presentDateFormatted); //C列の最新行に日付を入力
  sheet.getRange(lastRow + 1 , 4).setValue(workerName); //D列の最新行に名前を入力
  sheet.getRange(lastRow + 1 , 5).setValue(presentTimeFormatted); //E列の最新行に時刻を入力
}

//最新の出勤状況からメッセージを作成
function createAttendenceMessage() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('勤怠記録');
  let workerName = sheet.getRange(sheet.getLastRow() , 4).getValue(); //社員名
  let recordTime = sheet.getRange(sheet.getLastRow() , 5).getValue(); //記録された業務開始時間
  let startTime = formatTime(recordTime);

  let message = "【業務開始】 " + startTime + "\n" + workerName +"が業務を開始しました "
  return message;
}

//送信先のIDを取得
function getRoomIdFromSheet(){
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('RoomID');
  let  channelID= sheet.getRange("G5").getValues(); //指定したRoomID

  return channelID
}

//RoomIDの情報を記録する
function recordRoomIDtoSheet(requestObj) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('RoomID');
  let lastRow = sheet.getLastRow();

  if (requestObj.source.channelId) {
    sheet.getRange(lastRow + 1 , 7).setValue(requestObj.source.channelId); //ChannelIDをG列の最新行に記録する
  }
  if (requestObj.source.userId) {
    sheet.getRange(lastRow + 1 , 4).setValue(requestObj.source.userId); //UserIDをD列の最新行に記録する
  }
}


function recordTestSHoge() {
  const workerName = "hoge"
  startWorking(workerName);
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
