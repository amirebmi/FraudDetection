/* 
* Amir Ebrahimi
* Fall 2020
* CS5220 - Lab2 
*/

// Lab 2 Decription: 
// Write a JavaScript function that takes an array of numbers as argument and returns the largest number in the array. 
// Throw an exception if the array is empty or contains elements that are not numbers.
"use strict";

// a) Implement the function using a loop statement.
function max1(thisArray0){

    // If the array is empty (Exception handling)
    try{
        if (thisArray0.length == 0)
            throw 'This array is empty.';

        // Find the largest number in the array
        let maxValue = thisArray0[0];

        for (let i = 1 ; i < thisArray0.length ; i++){
            if (maxValue < thisArray0[i]){  // Find the largest
            maxValue = thisArray0[i];   // Swap the value
            }  
        }

        // If the array contains a non-number element
        try{    
            for (let i = 0 ; i < thisArray0.length; i++){
                if (typeof(thisArray0[i]) != 'number'){
                throw `This array has an element at index ${i} which is not in type of number!`;
            }
            }
            // Display the largest number
            console.log(`Largest number in this array is: ${maxValue}`);
        }catch(e){
            console.log(`Exception: ${e}`);
        }
    } 
    catch(e){
        console.log(`Exception: ${e}`);
    }
}

// b) Implement the function using the forEach() method in Array.
function max2(thisArray1){

    // If the array is empty (Exception handling)
    try{
        if (thisArray1.length == 0)
            throw 'This array is empty.';

        // Find the largest number in the array
        let maxValue = thisArray1[0];

        thisArray1.forEach((element) => {
            if (maxValue < element){ // Find the largest
                maxValue = element; // Swap the value
            }
        });

        // If the array contains a non-number element
        try{
            thisArray1.forEach((element, index) => {
                if (typeof(element) != 'number'){
                    throw `This array has an element at index ${index} which is not in type of number!`;
                }
            });

            // Display the largest number
            console.log(`Largest number in this array is: ${maxValue}`);
        }catch(e){
            console.log(`Exception: ${e}`);
        }
    } 
    catch(e){
        console.log(`Exception: ${e}`);
    }
}


// c) Implement the function using the reduce() method in Array.
function max3(thisArray2){

// If the array is empty (Exception handling)
try{
    if (thisArray2.length == 0)
        throw 'This array is empty.';

    // Find the largest number in the array
    let maxValue = thisArray2[0];
    // If the array contains a non-number element
    try{
        thisArray2.reduce((accumulator, currentValue, currentIndex) => {

            if (typeof(thisArray2[currentIndex]) != 'number'){

                throw `This array has an element at index ${currentIndex} which is not in type of number!`;
            }
            else{
                if (maxValue < thisArray2[currentIndex]){
                    maxValue = currentValue;
                    accumulator = currentValue;
                    maxValue = accumulator;
                }
            }
        }, {});

        // Display the largest number
        console.log(`Largest number in this array is: ${maxValue}`);
        
    }catch(e){
        console.log(`Exception: ${e}`);
    }

    }catch(e){
    console.log(`Exception: ${e}`);

    }
}


// Arrays for testing purposes
const test1 = [ 3, 5, 51, 89, 60, 72, 50, 0, 88, 8, 49, 54, 22, 70];    // Array of numbers (Correct)

const test2 = [];   // Empty array (Throw an exception)

const test3 = [false, 1, 6, 5 ,true, 'amir', 65, 15, 3, 12, 95, 0, 9];

const test4 = [ 3, 1, 19, 2, 14, 23, 'amir', 0, 6, 8, 'amir', 2]; // Array of numbers and string elements (Throw an exception)

const test5 = [ 'amir', 1, 19, 2, 14, 23, 'amir', 0, 6, 8, 'amir', 'amir']; // Array of numbers and string elements (Throw an exception)

const test6 = [false];

// Testing cases for ####MAX1####
console.log('Result for function (MAX1)');
// Testing part (Please try apply each of the testing arrays)
max1(test1);

// Testing cases for ####MAX2####
console.log('Result for function (MAX2)');
// Testing part (Please try apply each of the testing arrays)
max2(test2);

// Testing cases for ####MAX3####
console.log('Result for function (MAX3)');
// Testing part (Please try apply each of the testing arrays)
max3(test4);