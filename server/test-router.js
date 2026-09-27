require("dotenv").config();
const router = require("./src/services/ai/query-router.service");

console.log(router);
console.log(typeof router.routeQuery);
const test = async () => {
  const questions = [
    "NLP ki class kab hoti hai?",
    "NLP ka faculty kaun hai?",
    "Compiler Design ka syllabus batao",
    "Latest minor exam notice kya hai?",
    "Compiler Design ke previous year questions chahiye",
    "C++ ke study materials hain?",
    "Compiler Design ki recommended book kya hai?",
    "CSE 2 mein recently kya hua?",
    "Cosine similarity kya hoti hai?",
    "NLP ka faculty kaun hai aur Thursday ko lab kab hai?",
    "Compiler Design ke syllabus mein kya hai aur previous year mein kya poocha gaya?",
  ];

  for (const question of questions) {
    console.log("\nQUESTION:");
    console.log(question);
    const result = await router.routeQuery(question);

    console.log("ROUTER:");
    console.log(result);
  }
};

test();
