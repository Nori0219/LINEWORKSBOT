function doPost(e) {
  if (e == null || e.postData == null || e.postData.contents == null) {
    Logger.log("情報がないので終わり")
    return
  }
  let requestJSON = e.postData.contents
  let requestObj = JSON.parse(requestJSON)
  recordRoomIDtoSheet(requestObj) //RoomIDをスプシに記録する

  //let text = requestObj.content.text // 応答メッセージ（今回はオウム返し）
  let text = "グループ通知テスト"

  let env = getEnv_()
  // channelIdを取得
  env.channelId = requestObj.source.channelId
  // トークルームにメッセージを送信
  //LINEWORKS.channelMessageSend(env, text)

}

//出勤状況をトークルームへ通知する
function sendMessage() {
  let env = getEnv_()
  env.channelId = getRoomIdFromSheet()
  let text = createAttendenceMessage()
  // 複数人トークルームにメッセージを送信
  LINEWORKS.channelMessageSend(env, text)
}

function getEnv_() {
  return {
    CLIENT_ID: "xxxxxxxxxxxx",
    CLIENT_SECRET: "xxxxxxxxxxx",
    SERVICE_ACCOUNT: "xxxxxxxxxx",
    PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\n【keyから一行になるようコピペする】\n-----END PRIVATE KEY-----",
    DOMAIN_ID: 1000000, 
    ADMIN_ID: "hoge@huga",//オーナーのID
    BOT_ID: 111111
  }
}

//テスト用のBotを作成する
function createBot() {
  let env = getEnv_()
  env.BOT_ID= LINEWORKS.qiitaSampleBotCreate(env).botId
  LINEWORKS.qiitaSampleBotDomainRegister(env)
  Logger.log("BOT_ID: " + String(env.BOT_ID))
}




