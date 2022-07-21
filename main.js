const prompt = require("prompt-sync")({ sigint: true });

console.log(
  "you've gone fishing! Try to maximize your haul and catch the most valuable fish. You will have 6 hours to fish and can only keep one fish per hour and you can only keep 10 lbs."
);

console.log("\n==============================\n");
const myInventory = {
  myFish: [],
  catchPossibility: true,
  totalValue: 0,
  totalWeight: 0,
  startingTime: getStartingTime(),
  endingTime: getEndingTime(),
  nextCatchTime: "00:00:00",
  timeofDay: getTimeOfDay(),
  regularCast: false,
  recastCast: false,
};
console.log("You are starting at " + myInventory.startingTime);
console.log("You are ending at " + myInventory.endingTime);

function descriptionGenerator() {
  let desc1 = Math.floor(Math.random() * 2) + 1;
  let desc2 = Math.floor(Math.random() * 2) + 1;
  let descriptor1 = ["small", "medium", "large"];
  let descriptor2 = ["red", "blue", "green"];
  let description = descriptor1[desc1] + " " + descriptor2[desc2] + " fish";
  return description;
}
function getTimeOfDay() {
  let time =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();
  return time;
}
function getStartingTime() {
  let time =
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();
  return time;
}

function getNextCatchTime() {
  if (myInventory.regularCast == true) {
    let time =
      new Date().getHours() +
      1 +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    myInventory.nextCatchTime = time;
  }
  if (myInventory.recastCast == true) {
    if (new Date().getMinutes() + 15 > 59) {
      let time =
        new Date().getHours() +
        1 +
        ":" +
        (new Date().getMinutes() + 15 - 60) +
        ":" +
        new Date().getSeconds();
      myInventory.nextCatchTime = time;
    } else {
    }
    if (new Date().getMinutes() + 15 < 59) {
      let time =
        new Date().getHours() +
        ":" +
        (new Date().getMinutes() + 15) +
        ":" +
        new Date().getSeconds();
      myInventory.nextCatchTime = time;
    }
  }
}

function getEndingTime() {
  if (new Date().getHours() + 6 > 23) {
    let time =
      new Date().getHours() +
      6 -
      24 +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    return time;
  }
  let time =
    new Date().getHours() +
    6 +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds();
  return time;
}

function catchFish() {
  if (
    getTimeOfDay().valueOf() >= myInventory.nextCatchTime.valueOf() &&
    myInventory.catchPossibility == false
  ) {
    myInventory.catchPossibility = true;
  }
  if (myInventory.catchPossibility == true) {
    let description = descriptionGenerator();
    let value = Math.floor(Math.random() * 100) + 1 / 100;
    let weight = Math.floor(Math.random() * 3) + 1;
    let bigValue = value * weight + 2;
    console.log(
      "You caught a " + description + " worth $ " + bigValue.toFixed(2) + "!"
    );
    let promptAnswer = prompt("Press y to keep the fish or n to release it: ");
    if (promptAnswer == "y") {
      if (myInventory.totalWeight + weight > 10) {
        console.log(
          "You can't catch this fish, or you will be over your weight limit!"
        );
        console.log("\n==============================\n");
        console.log("recasting...");
        myInventory.recastCast = true;
        myInventory.catchPossibility = false;
        getNextCatchTime();
        console.log("next catch time is " + myInventory.nextCatchTime);
        console.log("\n==============================\n");
        return;
      }
      myInventory.myFish.push({
        description: description,
        value: value,
        weight: weight,
        bigValue: "$",
        bigValue,
      });
      myInventory.totalValue += bigValue;
      myInventory.totalWeight += weight;
      console.log("\n==============================\n");
      console.log(
        "You have a total value of $ " + myInventory.totalValue.toFixed(2)
      );
      console.log("your total weight is " + myInventory.totalWeight + " lbs");
      myInventory.regularCast = true;
      myInventory.recastCast = false;
      getNextCatchTime();
      myInventory.catchPossibility = false;
      console.log("You can catch a fish at " + myInventory.nextCatchTime);
      return;
    }
    if (promptAnswer == "n") {
      console.log("\n==============================\n");
      myInventory.catchPossibility = false;
      myInventory.recastCast = true;
      myInventory.regularCast = false;
      getNextCatchTime();
      console.log("\n==============================\n");
      console.log("You released the fish");
      console.log("You can catch a fish at " + myInventory.nextCatchTime);
      return;
    }
  }
  if (myInventory.catchPossibility == false) {
    console.log("\n==============================\n");
    console.log("You can't catch a fish right now");
    console.log("next catch time is " + myInventory.nextCatchTime);
  }
}

function viewFish() {
  console.log("\n==============================\n");
  console.log("You have " + myInventory.myFish.length + " fish");
  console.log("total weight is " + myInventory.totalWeight + "/10 lbs");
  console.log("\n==============================\n");
  myInventory.myFish.forEach((fish) => {
    console.log(
      fish.description +
        " " +
        "/ $" +
        fish.bigValue.toFixed(2) +
        " " +
        "/" +
        " " +
        fish.weight +
        " lbs"
    );
  });
}
4
function mainUI() {
  let choice = 0;
  while (
    choice != 4 &&
    myInventory.totalWeight <= 10 &&
    getTimeOfDay().valueOf() < myInventory.endingTime.valueOf()
  ) {
    console.log("\n==============================\n");
    console.log("1. Catch a fish");
    console.log("2. View your fish");
    console.log("3. See Time");
    console.log("4. Exit");
    choice = prompt("What would you like to do? ");
    if (choice == 1) {
      catchFish();
    }
    if (choice == 2) {
      viewFish();
    }
    if (choice == 3) {
      console.log("\n==============================\n");
      console.log("it is " + getTimeOfDay());
    }
  }
  if (choice == 4) {
    console.log("\n==============================\n");
    console.log("Set Sail for land!");
    console.log("\n==============================\n");
    endingUI();
  }
  if (myInventory.totalWeight > 10) {
    console.log("\n==============================\n");
    console.log("You are over your weight limit!");
    console.log("We are headed back to land!");
    console.log("\n==============================\n")
    endingUI();
  }
  if (getTimeOfDay().valueOf() >= myInventory.endingTime.valueOf()) {
    console.log("\n==============================\n");
    console.log("Times up!");
    console.log("We are headed back to land!");
      console.log("\n==============================\n");
      endingUI();
  }    
}

function endingUI() {
  console.log("\n==============================\n");
  console.log("Welcome back from your fishing voyage!");
  console.log("\n==============================\n");
  console.log(
    "You have a total value of $ " + myInventory.totalValue.toFixed(2)
  );
  console.log("your total weight is " + myInventory.totalWeight + " lbs");
  console.log("\n==============================\n");
  let promptAnswer = prompt("press y to exit the game.");
  if (promptAnswer == "y") {
    process.exit();
  } else {
    process.exit();
  }
}

mainUI();
