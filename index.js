const TelegramApi = require('node-telegram-bot-api')
const token='6047983273:AAFw2mZSCqVx8V2pYQuUk35xDmlHcNP3-mo'

const bot = new TelegramApi(token,{polling:true})


const usersid=[]
const usersname=[]
const remind=[]


var times_btn = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '9:00', callback_data: '9' }],
        [{ text: '11:00', callback_data: '11' }],
        [{ text: '13:00', callback_data: '13' }],
        [{ text: '15:00', callback_data: '15' }],
        [{ text: '17:00', callback_data: '17' }],
        [{ text: '19:00', callback_data: '19' }],
        [{ text: '21:00', callback_data: '21' }],
        [{ text: '23:00', callback_data: '23' }],
        [{ text: '01:00', callback_data: '01' }],
      ]
    })
  };

bot.setMyCommands([
    {command:'/start', description: 'Начальное приветствие'},
    {command: '/n', description: 'Установить напоминание'}
])

bot.on('message',async msg =>{
    const text = msg.text;
    const chatId= msg.chat.id

    if(text === '/start')
    {
       await bot.sendMessage(chatId,"Добро пожаловать в бот для напоминаний! Producted by Котик")
       await bot.sendSticker(chatId,"https://chpic.su/_data/stickers/k/klepashiz/klepashiz_001.webp")
       newUser(msg);
       await bot.sendMessage(chatId,"Чтобы поставить напоминание введи команду /напомни 'Текст напоминания' в 'Время' ")
       console.log(usersid);
       console.log(usersname);
    }
      
})

bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
	var userId = msg.from.id;
	var text = match[1];
	var time = match[2];
    let newrem = {
        user_id:userId,
        user_name:msg.from.first_name,
        time:time ,
        text_time:text
    }
    remind.push(JSON.stringify(newrem))
    bot.sendMessage(userId,"Вы успешно поставили напоминание: " + text +" в " + time)
    console.log(remind)
});


const newUser = (msg) =>{
    usersid.push(msg.from.id);
    usersname.push(msg.from.first_name);
}

setInterval(function(){

const curDate = new Date().getHours() + ':' + new Date().getMinutes();
console.log("cur " + curDate)
//let obj = JSON.parse(remind[0])
for(let i=0;i<remind.length;i++)
{
    let obj = JSON.parse(remind[i])
    if(obj.time==curDate)
    {
        bot.sendMessage(obj.user_id, 'Напоминаю, что вы должны: '+ obj.text_time + ' сейчас.');
    }
}
}, 60000);


// function go()
// {
//     while(true)
//     {
//         for (var i = 0; i < remind.length; i++) {
//             const curDate = new Date().getHours() + ':' + new Date().getMinutes();
//             if (remind[i]['time'] === curDate) {
//                     console.log(curDate);
//                 bot.sendMessage(remind[i], 'Напоминаю, что вы должны: '+ remind[i]['text_time'] + ' сейчас.');
//             }
//         }
//     }
// }
// go();






// const newRemind = (msg) =>{
//     let time;
//     let text;
//     var promise = new Promise ((resolve,reject)=>{
//         bot.sendMessage(msg.from.id,"Введите время ежедневного напоминания!",times_btn);
//         resolve();
//     })
//     promise.then({},error => {
//         // вторая функция - запустится при вызове reject
//         alert("Rejected: " + error); // error - аргумент reject
//       })


    
//     bot.on('callback_query',async t =>{time=t.data; await bot.sendMessage(msg.from.id,'Вы выбрали ' + time + ":00")})
//     bot.sendMessage(msg.from.id,"Введите текст для напоминания")
//     bot.on('message', async mes =>{text=mes.text;  bot.sendMessage(msg.from.id,'Напоминание:' + text + " на " + time); return "ff" })
    
// let newrem = {
//     user_id:msg.from.id,
//     user_name:msg.from.first_name,
//     time:333 ,
//     text_time:333
// }
// remind.push(JSON.stringify(newrem))
// }