---
title: Private methods and variables in Javascript
layout: post
---

Till yesterday, I believed there was no way to encapsulate private 
methods and variables in javascript: 
 
There are no 'private' or 'public' keywords, like in Java or C#. There are no classes as such, just objects inheriting directly from other objects. And all fields on any object are public. 
 
But, it turns out there is a way to make private members in javascript, using closures. 
 
What's a closure? 
 
If an outer function returns an inner function, the inner function still has access to the variables of the outer function, *even after the outer function has returned*. 
 
{% highlight js %}
function outerFunction(id) {
    var outerFunctionVariable = id;
    return function innerFunction() {
        return outerFunctionVariable;
    }
}
 
var a = outerFunction(5);
a() //returns 5
{% endhighlight %}
 
We are calling the inner function after the outer function has returned, but the inner function still has access to the outer function's methods. Magic! 
 
How can you access the local variables of a function after it has returned, the stack frame will be popped right off and the variables will be lost, right? 
 
Not necessarily. When you use a closure, the stack frame is not popped off. It's saved somewhere safe, and inner functions can still get at 
it. 
 
Morris Johns has some [excellent examples](http://blog.morrisjohns.com/javascript_closures_for_dummies.html) illustrating this.
 
Here's an example of a plain vanilla javascript object. 
 
{% highlight js %}
var car = {
    "odometer" : 100000,
    "drive" : function(distance) { 
        if (distance > 0) this.odomoter += distance; 
    }
};
{% endhighlight %}
 
I have a `drive` function that increases the odometer, and guards against winding it back. Except `odometer` is a public member, so anyone can change it. Uh-oh. 
 
Functions in javascript create a new scope, so we can 'hide' `odometer` inside a function. We still need to read the odometer reading, so we can return a function `getOdometer()`. Through closure, the inner function `getOdometer()` has access to the odometer member of the outer function `makeCar()`. 
 
{% highlight js %}
function makeCar(initialOdometer) {
    var privateOdometer = initialOdometer;
    return {
        "getOdometer" : function() { 
            return privateOdometer;
        }
        "drive" : function(distance) {
            if (distance > 0) privateOdometer += distance;
        }
    };
}
{% endhightlight %}
 
(Note: We are not using `this` to access the odometer reading any more. `this` is not needed - we have a direct reference to `privateOdometer` in the closure)
 
We can then instantiate a really old car, setting its private odometer:

{% highlight js %}
var reallyOldCar = makeCar(180000); 
{% endhightlight %}
 
We can't get or set the odometer directly: there's no `privateOdometer` field on the object we returned:

{% highlight js %}
reallyOldCar.privateOdometer; //undefined 
{% endhightlight %}
 
However we can use `getOdometer()`

{% highlight js %}
reallyOldCar.getOdometer(); //180000
{% endhightlight %}
 
We can drive the car halfway around the world, and recheck the odometer.

{% highlight js %}
reallyOldCar.drive(20000); 
reallyOldCar.getOdometer(); //200000
{% endhightlight %}
 
Then we can complete the journey, circling the world.

{% highlight js %}
reallyOldCar.drive(20000); 
reallyOldCar.getOdometer(); //220000
{% endhightlight %}
 
Brilliant! Private variables in javascript. You can apply exactly the same technique for private methods.

props to Douglas Crockford for explaining this pattern.
