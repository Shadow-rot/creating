// const student ={
//     name: 'John Doe',
//     age: 21,
//     isEnrolled: true
// }
// student.name = 'Jane Smith';
// student.age = 22;
// student.isEnrolled = false;
// console.log(student.name);
// console.log(student.age);
// console.log(student.isEnrolled);
// //boolian 
// let sha = true;
// console.log(sha);

// console.log('chocoooooooooo');
// console.log('hello world');
// console.log('this is f.js file');
// console.log('testing 1234');
// console.log('final test');



// console.log('added more lines');
// console.log('last line added');
// console.log('end of file f.js');

// function greet(name) {
//     if (name === 'Alice') {
//         return `Hello, ${name}!`;
//     } else {
//         return 'Hello, Guest!';
//     }
// }


// const add = (a, b) => a + b;
// console.log(add(5, 3));

const product = {
    id: 101,
    name: 'Laptop',
    price: 999.99,
    off: 0.1,
    rating: 4.5,
    inStock: true
};
console.log(typeof product['off']);
console.log(typeof product['rating']);
console.log(typeof product['inStock']);
console.log(typeof product['price']);
console.log(typeof product['name']);
console.log(typeof product['id']);
console.log(typeof product)

// let a = 10;
// let b = 20;
// // const sum = a + b;
// console.log('The sum of a and b is: ' + sum);
// console.log("The sum of a and b is: ", a + b);
// console.log(`The sum of a and b is: ${sum}`);
// console.log(`The sum of a and b is: ${a + b}`);
// console.log("a power to b = ", a ** b);
// // a++;
// b--;
// console.log("The value of s is: ", ++a);
// console.log("The value of t is: ", b);
// a -= 5;
// b **= 10;
// console.log("The value of a is: ", a);
// console.log("The value of b is: ", b);
// console.log("fuck", a>b);
// console.log("sex", a<b);
// console.log("damn", a>=b);
// console.log("hell", a<=b);
// console.log("yes", a==b); 
// console.log("no", a!=b);
// console.log("maybe", a===b);
// console.log("sure", a!==b);
// let sex = b>a;
// let hell = a<b;
// // console.log("sex", sex || hell);
// console.log("sex", !(a === 6));

// if (a > b) {
//     console.log("a is greater than b");
// }  
// else {
//     console.log("a is not greater than b");
// }   
// let mode = "dark";
// let color;

// if (mode === "dark") {
//     color = "black";
// }
// else {
//     color = "white";
// }   
// console.log("The color is: ", color);
// if (mode === "dark") {
//     console.log("black");
// } else{
//     console.log("white");
// }
// age = 18 
// if (age === 18){
//     console.log(age, "is eligible for voting");
// } else {console.log(age, "is not eligible for voting");
// } 
// color = "blue"

// if(color === "red"){
//     color = "lal";
// } else if (color === "blue"){
//     color = "nila";
// }   
// else {
//     color = "kalo";
// }   

// console.log(color)

// let age = 25;
// let muth = age >= 18 ? console.log("yeah") : console.log("nope");
// // console.log(muth);

// let muth = prompt("give dick")

// if (muth % 10 === 0) {
//     console.log(muth, "yes")
// } else {
//     console.log(muth, "no")
// }

// let mukesh;
// let rahim;
// const totalMarks = 100;

// mukesh = parseFloat(prompt("Enter Mukesh's marks out of 100: "));
// rahim = parseFloat(prompt("Enter Rahim's marks out of 100: "));   

// if (mukesh === 80 ); {
//     console.log("A+");
// } else (mukesh >= 60) {
//     console.log("A");
// } else if (mukesh >= 50) {
//     console.log("B");
// }
//     else if (mukesh >= 40) {    
//     console.log("C");
// }
// if (rahim === 80); {
//     console.log("A+");
// }             
// else if (rahim >= 60) {
//     console.log("A");
// } else if (rahim >= 50) {
//     console.log("B");
// }   
//     else if (rahim >= 40) {    
//     console.log("C");
// }   
// console.log("Mukesh's marks: ", mukesh);
// console.log("Rahim's marks: ", rahim);           
// let score = 100;
// let grade;  

// if (score >= 90) {
//     grade = 'A';
// } else if (score >= 80 && score < 90) {
//     grade = 'B';
// } else if (score >= 70 && score < 80) {
//     grade = 'C';
// } else if (score >= 60 && score < 70) {    
//     grade = 'D';
// } else {   
//     grade = 'F';
// }

// console.log("Score: ", score, "grade:",grade) ;

// for (let i = 1; i <= 9; i++) {
//     console.log("sha", i);
// }
// let i = 1 ;

// do {
//     console.log("sha", i);
//     i++;
// } while (i <= 5);

// let be = "shaaaaiftijjugjhhjjgjggjgjhkiukjuhikjoirgjkrskgjeroepsogkgkrlkrgkljrglkjklgrkjlgkjgjkldgkljgtijhjthfithfljfjlftlijtj"; 
// let x = 0;
// for (let i of be) {
//     console.log(i);
//     while (x <= 10000) {
//         x++;
//         break;
//     }
// }
// console.log("done", x);
// let fruits = {
//     'apple': 'apple',
//     'banana': 'banana',
//     'cherry': 'cherry',
//     'date': 'date',
//     'elderberry': 'elderberry',
//     'fig': 'fig',
//     'date': 'date'
// };

// for (let fruit in fruits) {
//     console.log(fruit);
// }


let i = 0;
  while (i < 200) {
     console.log("hello", i);
     i %= 19;
    }
console.log("done", i);

// let correct = 10;
// let guess = parseInt(prompt("Guess a number between 1 and 20: "));
// let attempts = 3;

// while (guess !== correct && attempts > 1) {
//     attempts--;
//     guess = parseInt(prompt("Guess a number between 1 and 20: "));
//     if (guess === correct) {
//     console.log("Congratulations! You've guessed the correct number.", guess);
//     }
// }

// let check = 20;
// let be = prompt("Enter a number to check if it's even or odd: ");
// let attempts = 5;

// if (be != check) {
//     --attempts;
//     be = prompt("Enter a number to check if it's even or odd: ");
// } else if (be == check) {
//     console.log("Correct! The number is ", be);
// }
// let str = "hello world";
// console.log(str.length);
// console.log(str.toUpperCase());
// console.log(str.toLowerCase());
// let be = {
//     sha: 'sha',
//     tijju: 'tijju',
//     ugj: 'ugj',
//     hhh: 'hhh'
// }
// let output = `the ${be.sha} and ${be.tijju} are friends`;
// console.log(output)

// console.log("alhiya\ngulabbbbb");
// // let str = "           akhiya       gulab        ";
// // console.log(str.trim());
// let str = "lol";
// let muth = "sha";
// // let sex = str.concat(muth);
// let sex = str + muth;
// console.log(sex);

// let username = prompt("enter yor name: ");
// let name = "@";
// let be = name + username;

// console.log(be,username.length);

// let price = [100, 200, 300, 400, 500];
// let total = 0

// for (let i of price) {
//     total += i;
//     console.log(`10%${i / 10}`, total);
// }
// for (let value of price) {
//     console.log(value / 10 , total += value);
// }
// console.log("final total is: ", total);

// let price = [150, 250, 350, 450, 550];
// let total = 0;

// // for (let i of price) {
// //     total += i;
// //     console.log(`15% of ${i} is ${i * 0.15}`, total);
// // }   

// for (let value of price) {
//    let offer = value / 10;
//     console.log(offer);
//     price[total] = price[total] - offer;
//     total++;
// }
// console.log("final total is: ", total);


// let price = [300, 700, 800, 900, 1000];

// for (let i = 0; i < price.length; i++) {
//     let be = price[i] / 10;
//     console.log(price[i] - be);
// }

// let game;
// let answer = 10;
// attemt = 3;

// while (game != answer && attemt > 0) {
//     game = prompt(`guess you have only ${attemt}: `);
//     if (game == answer) {
//         console.log("you guessed it right ", game);
//     }
//     attemt--;
//     if (attemt == 0) {
//         console.log("no attempts left");
//     }
//     if (game != answer && attemt > 0) {
//         console.log(`this is not ${game}`);
//     }
// }


// let chos;
// let cho;
// let chose;


// // while (true) {
// //     chos = Number(prompt("enter your first num: "));
//     cho = Number(prompt("enter your second num: "));
//     chose =dc prompt("enter operation (+, -, *, /): ");

//     switch (chose) {
//         case '+':
//             console.log("result is: ", Number(chos) + Number(cho));
//             break;
//         case '-':
//             console.log("result is: ", Number(chos) - Number(cho));
//             break;
//         case '*':
//             console.log("result is: ", Number(chos) * Number(cho));
//             break;
//         case '/':
//             console.log("result is: ", Number(chos) / Number(cho));
//             break;
//         case 'exit':
//             console.log("exiting the calculator. Goodbye!");
//             exit();
//         default:
//             console.log("invalid operation");
//     }}


// const vowel = (str) => {
//     let count = 0;
//     const vowels = 'aeiouAEIOU';
//     for (let char of str) {
//         if (vowels.includes(char)) {
//             count++;
//         }   
//     }
//     return count;
// }   
// console.log(vowel("Hello World")); // Output: 3
// console.log(vowel("JavaScript is fun")); // Output: 5

// let weather;
// weather = prompt("Enter the current weather (sunny, rainy, cloudy, snowy): ");


// switch (weather) {
//     case 'sunny':
//         console.log("It's a bright and sunny day!");
//         break;  
//     case 'rainy':
//         console.log("Don't forget your umbrella. It's raining!");
//         break;
//     case 'cloudy':
//         console.log("It's a bit gloomy with clouds.");
//         break;
//     case 'snowy':
//         console.log("Time for some snow fun!");
//         break;
//     default:
//         console.log("Weather condition unknown.");
// }   
// console.log("Stay prepared for the weather!");


// function calculator(n) {
//     switch (n) {
//         case 'add':
//             return (a, b) => a + b;
//         case 'subtract':
//             return (a, b) => a - b;
//         case 'multiply':
//             return (a, b) => a * b;
//         case 'divide':
//             return (a, b) => a / b;
//         default:
//             return null;
//     }
// }

// const add = calculator('add');
// const subtract = calculator('subtract');
// const multiply = calculator('multiply');
// const divide = calculator('divide');
// console.log("Addition: ", add(10, 5)); // Output: 15
// console.log("Subtraction: ", subtract(10, 5)); // Output: 5
// console.log("Multiplication: ", multiply(10, 5)); // Output: 50
// console.log("Division: ", divide(10, 5)); // Output: 2  
// const say = (multi) => {
//     for (let i = 1; i <= multi; i++) {
//         console.log("hello world", i);
//     }

// }
// say(10);

// const m = (a, b) => {
//     return a * b;
// }
// // let val = m(5, 4);
// // console.log("the multiplication is: ", val);
// console.log("the multiplication is: ", m(5, 4));




// let vow = (lol) => {
//     let count = 0;
//     const vowels = 'aeiouAEIOU';
//     for (let char of lol) {
//         if (vowels.includes(char)) {
//             count++;
//         }
//     }
//     return count;
// }
// console.log(vow("This is a sample string")); // Output: 6
// console.log(vow("Another example here")); // Output: 8

// const arr = [1, 2, 3, 4, 1000];
// arr.forEach((num) => {
//     console.log(num * num);
// }
// );  
