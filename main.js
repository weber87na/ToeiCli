import * as readline from 'node:readline/promises';
import fs from 'fs/promises';
import path from 'path';

import {
  constrainedMemory,
  stdin as input,
  stdout as output,
} from 'node:process';
import { setTimeout } from 'timers/promises';

async function listJsonFiles() {
  try {
    const directoryPath = './'; // 要列出的目錄路徑，這裡設置為當前工作目錄
    const files = await fs.readdir(directoryPath);

    // console.log(files);

    // 過濾出所有 JSON 檔案
    const jsonFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === '.json'
    );

    return jsonFiles;
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

async function readJsonFile(jsonFilePath) {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Error reading file:', error);

    return [];
  }
}

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

const jsonFilePath = './business.json';

let dictFiles = await listJsonFiles();

let dfCounter = 1;
for (let dictFile of dictFiles) {
  console.log(dfCounter + ' ' + dictFile);
  dfCounter++;
}

const rl = readline.createInterface({ input, output });

let answer = await rl.question('ans: ');
if (answer === 'exit') {
  process.exit();
}
var num = Number(answer.trim());
if (!num || num >= dfCounter) {
  process.exit();
}
let selectFile = dictFiles[num - 1];

var db = await readJsonFile(selectFile);
var localdb = db;

// 初始化;
let dict = [...localdb];

console.clear();
do {
  let q = genQuestion(dict);

  let item = q.filter((x) => x.ans === true)[0];
  console.log(item.tw);

  let counter = 1;
  for (let item of q) {
    console.log(`${counter} ` + item.en);
    counter++;
  }

  let answer = await rl.question('ans: ');
  if (answer === 'exit') {
    process.exit();
  }
  var num = Number(answer.trim());
  if (!num || num > 4) {
    console.clear();
    continue;
  }

  if (isNaN(num)) {
    console.clear();
    continue;
  }

  if (q[num - 1].ans) {
    console.log('Good Job');
  } else {
    console.log('Oops! ' + item.en);
  }
  await setTimeout(800);
  console.clear();
} while (dict.length >= 4);

console.log('game over');
process.exit();
