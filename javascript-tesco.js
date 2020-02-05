// //basics
// v8 engine 
// javascript engine
// //constructor functions
// //creation of parent and child relationship
// //bind, call, apply- usage
// //immutability
// //higher order functions
// //functional progamming
// //closure - example
// //array - [1,1,2,2,3] - [1,2,3]
// {
//     '1':2,
//     '2',2,
//     '3':1
// }
// .Set()
// //event bubbling()
// //event capturing
// //prevent default()
// //stop propogation
// //subject, obseravable difference
// //idea behind obseravable
// //es6 - ...
// ()=> 
// function => self 
// life cycle methods - angular

function A(tempA){
    this.memA = tempA;
    this.displayA = function(){
        console.log('this.memA:'+this.memA);
    }
}

function B(tempA,tempB){
    A.call(this,tempA);
    this.memB = tempB;

}
B.prototype.displayB = function(){
    console.log('this.memB:'+this.memB);
}
let bObj = new B(10,20);
bObj.displayB();
bObj.displayA();

function Test(a,b){
    return (a+b);
}
var test = new Test(10,20);
console.log(test);

function Test2(a,b){
    console.log('a'+a+'b'+b);
    return{
        a:10,
        b:20
    }
}
var test2 = new Test2(20,40);
console.log(test2);

function asyncFunc(){
    let newPromise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('succcess');
        },50)
    })

    newPromise.then(function(msg){
        console.log("This is called promise:"+msg);
    })
    return newPromise;
}

asyncFunc();
console.log('11');

// function simpleCalls(){
    console.log('A');
    setTimeout(() => {
            console.log('B')
    }, 5000);
    setTimeout(() => {
        console.log('C');
    },1000 );
    Promise.resolve(()=>{
        console.log('resolve callback')
    })
    Promise.resolve().then(()=>{
        console.log('D')
    })
    console.log('E');
//}
// simpleCalls().then(()=>{
//     console.log("promise resolved");
// });
//Implement Promise
//Implement Promise All , your own implementation
//explain event loop in browser
//remove duplicates from array-give both duplicate array and non-duplicate array
//sentence capitalize
//remove 9th eleent from an array which is of length 10 or more
//how to share data between header, footer or components which are unrelated in angular code
//what happens in deactivate function, not destroy - basically life cycles of a component in angular
//high order components examples
//react hooks in react, what is it for?

