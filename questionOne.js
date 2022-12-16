// PROMPT //
// Write a function that goes through numbers 1-100 and returns a data structure containing
// only those numbers that are divisible by either 3 or 5. If number is divisible by 3 and 5 then
// number must not be returned in the data structure.
// ◦ Describe briefly why you chose the used data structure

// ANSWER //
// The general idea behind this solution is to use the modulo operator (%) to check whether a given number's remainder equals to 
// 0 when divided by 3 or 5. If this is the case, then it means that the number is divisible by the 3 or 5, respectively.
// Furthermore, if the number is divisivle by 3 AND 5, then we skip over that number.

// Initialising the function. It does not take an input as the function will always go through numbers 1-100.
function divisibleBy3Or5() {
  // Start by initialising an array as the chosen data structure
  // READ MORE ABOUT THE CHOICE OF AN ARRAY AT THE BOTTOM
  const numbersArray = [];

  // The for loop is initialised to start from i = 1 to not print out 0.
  // It iterates over the numbers from 1 to 100, performing a check and operation for each number it goes through.
  for (let i = 1; i <= 100; i++) {
    // Check if the number is divisible by 3 or 5.
    // The modulo operator (%) returns the remainder of dividing a number with another one (e.g. 10/3 -> remainder 1).
    // Therefore, we can check whether a given number divided by 3 or 5 results in a remainder of 0.
    if (i % 3 === 0 || i % 5 === 0) {
      // If the number is divisible by 3 AND 5, we skip it as per the instructions of the question.
      if (i % 3 === 0 && i % 5 === 0) {
        continue;
      }
      // If the if-condition (i % 3 === 0 or i % 5 === 0) holds true for a given number, we push it to the numbersArray array.
      numbersArray.push(i);
    }
  }
  // Finally, once the entire loop is executed, we return the numbersArray array as the output from the function.
  return numbersArray;
}

// Calling the function within a console.log prints the output to the console.
console.log(divisibleBy3Or5());

// It is also worth noting that the two nested if-statements could be combined in to one as such:
//   if ((i % 3 === 0 || i % 5 === 0) && !(i % 3 === 0 && i % 5 === 0)) {
//     numbersArray.push(i);
//   }
// Here the second if-statement has simply been added to the first one together with the Logical NOT operator "!", 
// resulting in a "if either of these conditions hold true AND the following is NOT true" logic.
// This has not, however, been used in the final implementation for readability's sake. 
// The time complexity of the function will regardless be O(N) and the space complexity O(N).

// CHOICE OF ARRAY AS DATA STRUCTURE
// An array was chosen as the data structure for this task due to the nature of the data and the  
// ease of access/adding elements to the data structure.
// An array has benefits in that it is good for storing data with the same name and data that is sequential (which our list of numbers is).
// The use of an array is generally also straight forward and can easily be iterated over.
// As opposed to an array, another choice of data structure could also have been a set. 
// Sets are unordered, and cannot contain duplicates. Sets do, however, have powerful operations that can be performed on them.
// Sets are also generally more performant than arrays when performing operations on them (e.g. the Set "has" method vs the array "includes" method)
// Although our array also only contains unique values, using a set can be considered somewhat redundant for our use case. Especially here,
// since we do not need to perform any operations on the array.



