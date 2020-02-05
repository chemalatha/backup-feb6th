

function buildFunctions(){
    var arr = [];
    for(var i=0;i<3;i++){
        arr.push(
            (function(j){
                return function(){
                    console.log(j);
                }
                
            })(i)
        )
    }
    return arr;

}
buildFunctions()[0](0);
buildFunctions()[1](1);
buildFunctions()[2](2);

function makeGreeting(language){
    return function(fn,ln){
        if(language == 'en'){
            console.log('Hello '+fn+' '+ln);
        }
        if(language == 'es'){
            console.log('Hola '+fn+' '+ln);
        }
    }
}
var greetEngligh = makeGreeting('en');

setTimeout(function(){
console.log('hi')
},1000);

function checkIfItsArray(){

}

var person = {
    firstName:'John',
    lastName:'Doe',
    getFullName:function(){
        return (this.firstName+' '+this.lastName);
    }
}
var newPerson = {
    firstName:'Hemalatha',
    lastName:'Mallavaram',
}
console.log(person.getFullName.call(newPerson));

function mapToEachArray(arr,fn){
    let newArr = [];
    for(let i=0;i<arr.length;i++){
        newArr.push(fn(arr[i]));
    }
    return newArr;
}

function checkSimplified(limiter){
    return function(limiter,item){
        return limiter>item;
    }.bind(this,limiter);
}

let outArr = [1,2,3];
console.log(mapToEachArray(outArr,checkSimplified(2)));

if(!Object.create){
    Object.create = function(o){
        if(arguments.length >1){

        }
        function F(){}
        F.prototype = o;
        return new F();
    }
}
var person = {
    firstName:'default',
    lastName:'default',
    getDetails : function(){
        return 'hi '+this.firstName;
    }
}
var john = Object.create(person);
john.firstName = 'john';
john.lastName = 'doe';
console.log(john);
//------------------------------------
function Person1(name,age){
    this.name = name;
    this.age = age;
    this.getDetails = function(){
        console.log(this.name+' is'+this.age+'old');
    }
}
let person1 = new Person('hema','36');
person1.subject = 'commitment';
console.log(person1);
console.log()
function Teacher(name,age,subject){
    Person.call(this,name,age);
    this.subject = subject;
}

let teacher1 = new Teacher('Sai',6,'Fun');
console.log(teacher1.getDetails());
///-------------------------------------
class Person {
    constructor(firstName,lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
    greet(){
        return 'hi '+this.firstName;
    }
}
class Teacher extends Person{
    constructor(firstName,lastName,subject){
        super(firstName,lastName);
        this.subject = subject;
    }
}
let teacher2 = new Teacher('Sai','Sarva',5);
console.log(teacher2);

function Promise(action){
    this.then = function(){

    }
    
}