Design Patterns - Book by Gang of Four [Elements of Reusable Object Oriented Software]

Reusable & Reliable solutions 

Creational 
Structural
Behavioural

Anti Patterns 

> Modiying Prototype instance
> Callback hell


Singleton
---------

Ensure a class only has single instance and it provides a global point of access

Node.js module system internally catches the object when instance is created while creating object
module.exports = new Logger(); //Module caching with singleton

Prototype Patterns
-------------------

Specify the kind of object to create using prototypical instance, and create new objects by copying this prototype.



Factory Pattern
-------------------
Define an interface for creating an objects, but let subclasses decide which class to instantiate. It let a class defer instantiation to subclasses.


Builder Pattern
--------------------
Seperating the construction of complex objects from its representation so that the same construction process can create different representations.

Adapter Pattern
----------------------
Coverts the interface of a class that other client expects. Adapter lets classes work together that couldnt otherwise because of incompatible interfaces.

Make code to run on many environment. Reusing the code to Browser and Node.js

Proxy 
------
Provide a surrogate or placeholder for another object to control access to it.

Proxying existing modules

Composites
-----------
Tree - File System

Compose objects into a tree structure to represent part-whole hierachies. Composite lets clients treat individual objexts and compositions of objects uniformly.

Decorator Pattern
------------------
Attach Additional responsibilities to an object dynamically. Decorators provice a flexible alternative to subclassing for extending functionality


Chain of Responsibility
Avoid coupling the sender of a request to its receiver by giving more than one object a change to handle the request. Chain the receiving obhects and pass the request along the chain.

Command

Encapsulate a request as an object, thereby letting you parameterize with different requests, queue or log requests, and support undoable operations

Iterator

Provide a way to access the elements of an aggregate objects sequentially without exposing its underlying representation.

Observer

Define a one to many dependency between obhects so that when one object changes state, all its dependents are notified and updated automatically.


Strategy

Define a family of algorithms, encapsulate each one, and make them interchangable. Strategy lets the algorithm vary independently from clients that use it.

Node,js Testing & Debuggability
-------------------------------

Communitacte Intent and goals to Human and Computers


Code Quality
Unit Testing, BDD & TDD
Assertion Libraries


What is code maintainable
> Maintainalbe by you & Other. Easy understand of the design and intent

Coding Convention
> Code Redability
> How to build and architect
> How to plan

Programming Styles
> Comments
> Whitespace
> Naming
> Possible errors


What is Line Ending ? \n \r\n \r

Methods - LowerCase variable

Enforcing Coding Standard
Document Justification

Statically analyze the code without execution

> Unit testing - Smallest testable part of an application
> Integration Testing - Combines different 
> Functional Testing
> System Testing - E2E
> Regression Testing - Rerun Integration & Unit Test

