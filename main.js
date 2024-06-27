import * as readline from "node:readline/promises";
import {
  constrainedMemory,
  stdin as input,
  stdout as output,
} from "node:process";
import { setTimeout } from "timers/promises";

var db = [
  { ans: false, en: "Apple", tw: "蘋果" },
  { ans: false, en: "Banana", tw: "香蕉" },
  { ans: false, en: "Cherry", tw: "櫻桃" },
  { ans: false, en: "Date", tw: "棗" },
  { ans: false, en: "Eggplant", tw: "茄子" },
  { ans: false, en: "Fig", tw: "無花果" },
  { ans: false, en: "Grape", tw: "葡萄" },
  { ans: false, en: "Honeydew", tw: "哈密瓜" },
  { ans: false, en: "Iceberg", tw: "冰山" },
  { ans: false, en: "Jackfruit", tw: "菠蘿蜜" },
  { ans: false, en: "Kiwifruit", tw: "奇異果" },
  { ans: false, en: "Lemon", tw: "檸檬" },
  { ans: false, en: "Mango", tw: "芒果" },
  { ans: false, en: "Nectarine", tw: "油桃" },
  { ans: false, en: "Orange", tw: "橘子" },
  { ans: false, en: "Papaya", tw: "木瓜" },
  { ans: false, en: "Quince", tw: "榲桲" },
  { ans: false, en: "Raspberry", tw: "覆盆子" },
  { ans: false, en: "Strawberry", tw: "草莓" },
  { ans: false, en: "Tomato", tw: "番茄" },
  { ans: false, en: "Ugli", tw: "烏貴" },
  { ans: false, en: "Vegetable", tw: "蔬菜" },
  { ans: false, en: "Watermelon", tw: "西瓜" },
  { ans: false, en: "Xigua", tw: "西瓜" },
  { ans: false, en: "Yam", tw: "山藥" },
  { ans: false, en: "Zucchini", tw: "西葫蘆" },
  { ans: false, en: "Airplane", tw: "飛機" },
  { ans: false, en: "Boat", tw: "船" },
  { ans: false, en: "Car", tw: "汽車" },
  { ans: false, en: "Door", tw: "門" },
  { ans: false, en: "Elephant", tw: "大象" },
  { ans: false, en: "Fork", tw: "叉子" },
  { ans: false, en: "Guitar", tw: "吉他" },
  { ans: false, en: "Hat", tw: "帽子" },
  { ans: false, en: "Ink", tw: "墨水" },
  { ans: false, en: "Jacket", tw: "夾克" },
  { ans: false, en: "Kite", tw: "風箏" },
  { ans: false, en: "Lamp", tw: "燈" },
  { ans: false, en: "Map", tw: "地圖" },
  { ans: false, en: "Notebook", tw: "筆記本" },
  { ans: false, en: "Oven", tw: "烤箱" },
  { ans: false, en: "Piano", tw: "鋼琴" },
  { ans: false, en: "Quilt", tw: "棉被" },
  { ans: false, en: "Ring", tw: "戒指" },
  { ans: false, en: "Spoon", tw: "湯匙" },
  { ans: false, en: "Table", tw: "桌子" },
  { ans: false, en: "Umbrella", tw: "雨傘" },
  { ans: false, en: "Vase", tw: "花瓶" },
  { ans: false, en: "Window", tw: "窗戶" },
  { ans: false, en: "Xylophone", tw: "木琴" },
  { ans: false, en: "Yard", tw: "院子" },
  { ans: false, en: "Zebra", tw: "斑馬" },
  { ans: false, en: "Agenda", tw: "議程" },
  { ans: false, en: "Budget", tw: "預算" },
  { ans: false, en: "Contract", tw: "合約" },
  { ans: false, en: "Deadline", tw: "截止日期" },
  { ans: false, en: "Efficiency", tw: "效率" },
  { ans: false, en: "Feedback", tw: "回饋" },
  { ans: false, en: "Inventory", tw: "庫存" },
  { ans: false, en: "Negotiation", tw: "談判" },
  { ans: false, en: "Quarterly", tw: "季度的" },
  { ans: false, en: "Reservation", tw: "預訂" },
  { ans: false, en: "Strategy", tw: "策略" },
  { ans: false, en: "Terminate", tw: "結束" },
  { ans: false, en: "negotiate", tw: "協商、談判" },
  { ans: false, en: "presentation", tw: "簡報、演示" },
  { ans: false, en: "collaborate", tw: "合作、協作" },
  { ans: false, en: "proposal", tw: "提案、建議" },
  { ans: false, en: "delegate", tw: "委派、分派" },
  { ans: false, en: "deadline", tw: "截止日期、最後期限" },
  { ans: false, en: "agenda", tw: "議程、日程表" },
  { ans: false, en: "correspondence", tw: "信函、通信" },
  { ans: false, en: "minutes", tw: "會議記錄" },
  { ans: false, en: "report", tw: "報告、報告書" },
  { ans: false, en: "dine-in", tw: "內用；在餐廳內用餐" },
  { ans: false, en: "take out", tw: "外帶；外出用餐" },
  { ans: false, en: "menu", tw: "菜單；提供可點選的食物選項清單" },
  { ans: false, en: "special", tw: "特餐；餐廳提供的特別菜色或優惠餐點" },
  { ans: false, en: "reservation", tw: "預約；預先安排餐廳席位或用餐時間" },
  { ans: false, en: "appetizer", tw: "開胃菜；用於開胃的小菜或前菜" },
  {
    ans: false,
    en: "waiter",
    tw: "服務生；在餐廳中負責點餐、送餐等工作的人員",
  },
  { ans: false, en: "ticket", tw: "票，用於進入或觀看特定活動的證明文件" },
  { ans: false, en: "film", tw: "電影，以影像和聲音方式記錄的故事或表演" },
  { ans: false, en: "concert", tw: "音樂會，音樂表演活動" },
  { ans: false, en: "theater", tw: "戲劇院，演出戲劇、電影等的場所" },
  { ans: false, en: "gaming", tw: "遊戲，進行娛樂或休閒活動的遊戲" },
  { ans: false, en: "audience", tw: "觀眾；看電影、戲劇或演出的群眾" },
  { ans: false, en: "Account", tw: "帳戶" },
  { ans: false, en: "Inventory", tw: "存貨" },
  { ans: false, en: "Revenue", tw: "收入" },
  { ans: false, en: "Compliance", tw: "遵守" },
  { ans: false, en: "Consultant", tw: "顧問" },
  { ans: false, en: "Deduct", tw: "扣除" },
  { ans: false, en: "Expenditure", tw: "支出" },
  { ans: false, en: "Facility", tw: "設施" },
  { ans: false, en: "Guarantee", tw: "保證" },
  { ans: false, en: "Highlight", tw: "強調" },
  { ans: false, en: "conference", tw: "會議" },
  { ans: false, en: "revenue", tw: "收入" },
  { ans: false, en: "negotiate", tw: "協商" },
  { ans: false, en: "subsidiary", tw: "子公司" },
  { ans: false, en: "inventory", tw: "庫存" },
  { ans: false, en: "efficiency", tw: "效率" },
  { ans: false, en: "invoice", tw: "發票" },
  { ans: false, en: "merger", tw: "合併" },
  { ans: false, en: "candidate", tw: "候選人" },
  { ans: false, en: "logistics", tw: "物流" },
  { ans: false, en: "allocate", tw: "分配" },
  { ans: false, en: "policy", tw: "政策" },
  { ans: false, en: "audit", tw: "審計" },
  { ans: false, en: "budget", tw: "預算" },
  { ans: false, en: "contract", tw: "合約" },
  { ans: false, en: "Account", tw: "帳戶" },
  { ans: false, en: "Budget", tw: "預算" },
  { ans: false, en: "Conference", tw: "會議" },
  { ans: false, en: "Deadline", tw: "截止日期" },
  { ans: false, en: "Evaluate", tw: "評估" },
  { ans: false, en: "Forecast", tw: "預測" },
  { ans: false, en: "Inventory", tw: "庫存" },
  { ans: false, en: "Logistics", tw: "物流" },
  { ans: false, en: "Negotiation", tw: "談判" },
  { ans: false, en: "Outcome", tw: "結果" },
  { ans: false, en: "Policy", tw: "政策" },
  { ans: false, en: "Quarter", tw: "季度" },
  { ans: false, en: "Revenue", tw: "收入" },
  { ans: false, en: "Strategy", tw: "策略" },
  { ans: false, en: "Transaction", tw: "交易" },
  { ans: false, en: "budget", tw: "預算" },
  { ans: false, en: "invoice", tw: "發票" },
  { ans: false, en: "strategy", tw: "策略" },
  { ans: false, en: "policy", tw: "政策" },
  { ans: false, en: "contract", tw: "合約" },
  { ans: false, en: "performance", tw: "績效" },
  { ans: false, en: "prototype", tw: "原型" },
  { ans: false, en: "innovation", tw: "創新" },
  { ans: false, en: "logistics", tw: "物流" },
];
// var db = [
//   { ans: false, en: "strategy", tw: "策略" },
//   { ans: false, en: "policy", tw: "政策" },
//   { ans: false, en: "contract", tw: "合約" },
//   { ans: false, en: "performance", tw: "績效" },
//   { ans: false, en: "prototype", tw: "原型" },
//   { ans: false, en: "innovation", tw: "創新" },
//   { ans: false, en: "logistics", tw: "物流" },
// ];

//初始化
let dict = [...db];

function randomBetween(min, max) {
  let result = Math.floor(Math.random() * (max - min + 1) + min);
  return result;
}

function genRand(dict, num = 4) {
  if (dict.length < num) return 0;
  if (dict.length > 0) return randomBetween(0, dict.length - num);
  return 0;
}

function genQuestion(dict, num = 4) {
  if (!dict) return [];
  if (dict.length < 4) return [];

  let index = genRand(dict);
  let result = dict.splice(index, num);

  let ansIndex = randomBetween(0, result.length - 1);
  result[ansIndex].ans = true;
  return result;
}

const rl = readline.createInterface({ input, output });

do {
  let q = genQuestion(dict);

  let item = q.filter((x) => x.ans === true)[0];
  console.log(item.tw);

  let counter = 1;
  for (let item of q) {
    console.log(`${counter} ` + item.en);
    counter++;
  }

  let answer = await rl.question("ans: ");
  if (answer === "exit") {
    process.exit();
  }
  var num = Number(answer.trim());
  if (!num) {
    console.clear();
    continue;
  }

  if (isNaN(num)) {
    console.clear();
    continue;
  }

  if (q[num - 1].ans) {
    console.log("Good Job");
  } else {
    console.log("Oops! " + item.en);
  }
  await setTimeout(800);
  console.clear();
} while (dict.length >= 4);

console.log("game over");
process.exit();
