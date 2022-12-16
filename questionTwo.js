// PROMPT //
// Write a function that takes two character strings as parameters and checks if they are
// anagrams or not (for example “heart” and “earth”).
// ◦ Think what you could do to improve the function’s performance in situations where
// function is called thousands of times per second with randomized strings of varying
// lengths.

// ANSWER //
// In solving the above problem, there are two initial thoughts that come to mind.
// First, if two words are to be anagrams of each other, then they need to be the same length.
// Second, as an anagram means that the first word should re-form into the second word, then all the characters 
// need to match across the two strings.
// Given these two findings, we can first check whether the lengths of the two words are the same and then 
// sort the characters in each word. If the two sorted words now equal eachother then we have a confirmed anagram! Let's solve it.

function anagramsOne(wordOne, wordTwo) {
  // Compare the lenghts of the two words.
  // Instead of === we use !== to create a guard clause. 
  // Doing this means that we avoid using nested if statements. Instead, we simply return false if the condition evaluates to false.
  if (wordOne.length !== wordTwo.length) {
    return false;
  }

  // To sort the words we can first split the strings up by character and add them to an array.
  // After this we can chain in the Array.prototype.sort() method which sorts an array in place. 
  // Doing this for both words allows us to next compare the two arrays to each other.
  const arr1 = wordOne.split('').sort();
  const arr2 = wordTwo.split('').sort();

  // Next, we loop over the first array.
  // We only need to loop over the first array as we already know they are the same length.
  for (let i = 0; i < arr1.length; i++) {
    // For each index in the first array we make a comparison between the given index in the first 
    // array and the corresponding index in the second array.
    // If the condition ever evaluates to false we immediately return "false". All characters had to match!
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  // Finally, if at this point the function has not returned false yet, we know that the two strings are anagrams of each other!
  return true;
}
console.log("First implementation:", anagramsOne("heart", "earth")) // true
console.log("First implementation:", anagramsOne("test", "best")) // false
console.log("First implementation:", anagramsOne("", "earth")) // true
console.log("First implementation:", anagramsOne("anagram", "nagaram")) // false

// OPTIMISING FOR LARGE AMOUNTS OF CALLS
// The immediately apparent flaw with the above implementation is that the sort() method has a high time complexity.
// Therefore, a performance increase for the above scenario could be achieved by getting rid of the sort() method.
// To do this, we could implement a dictionary that stores the characters of the first word, and then compare characters of the second word to the dictionary.
// At the end, if the function has not already returned false, we know the words are anagrams and can return with a true boolean.
// Below is an implementation of such a function.
// In general, both implementations already handle the "of varying lengths" part of high number of calls issue by utilising the guard clause at the top.
// In other words, we immediately return false if the two strings are not of same length, as they cannot then be anagrams.
// Both algorithms have O(N) time complexity as the number of iterations only grow with the lengths of the strings. 
// As mentioned before, the second function does however leave out the sort() method which can add significant duration to the first function, especially as
// the strings get longer and longer.

function anagramsTwo(wordOne, wordTwo) {
  // We still need the same guard clause at the top.
  if (wordOne.length !== wordTwo.length) {
    return false;
  }

  // First we instantiate a counter object for our dict.
  let count = {}

  // We then loop through each character of the first word.
  // Within the loop, we increment each character's value already in the dict by one OR set the current character's value to one.
  for (let char of wordOne)
    count[char] = (count[char] || 0) + 1

  // For the second word, we check if the char already exists in our dictionary.
  // If it does not exist, we know the words are not anagrams and so we return false immediately.
  // If the char does exist, however, we decrement the existing character's count by one!
  for(let char of wordTwo) { 
    if(!count[char]) return false
    else --count[char]
  }

  // Finally, we return with true as we know that at this point the words have to be anagrams.
  return true;
}
console.log("Second implementation:", anagramsTwo("heart", "earth")) // true
console.log("Second implementation:", anagramsTwo("heart", "eartha")) // false
console.log("Second implementation:", anagramsTwo("test", "best")) // false
console.log("Second implementation:", anagramsTwo("", "earth")) // true
console.log("Second implementation:", anagramsTwo("anagram", "nagaram")) // false