# Sprint 4 - *t19* - *We Them Boys*

## Goal

### Worldwide!
### Sprint Leader: *Kareem Youssef*

## Definition of Done

* Version in pom.xml should be `<version>4.0.0</version>` for your final build for deployment.
* Increment release `v4.0` created on GitHub with appropriate version number and name.
* Increment `server-3.5.jar` deployed for testing and demonstration on CHECK4 assignment.
* Increment `server-4.0.jar` deployed for testing and demonstration on SPRINT4 assignment.
* Sprint Review, Restrospective, and Metrics completed (team/sprint4.md).


## Policies

#### Mobile First Design!
* Design for mobile, tablet, laptop, desktop (in that order).
* Use ReactStrap for a consistent interface (no HTML, CSS, style, etc.).
* Must adhere to the TripCo Interchange Protocol (TIP) for interoperability and testing.
#### Clean Code
* Code Climate maintainability of A or B.
* Code adheres to Google style guides for Java and JavaScript.
#### Test Driven Development
* Write method headers, unit tests, and code in that order.
* Unit tests are fully automated.
* Code Coverage above 50%
#### Configuration Management
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* All commits include a task/issue number.
* All commits include tests for the added or modified code.
* All tests pass.
#### Continuous Integration / Delivery 
* Master is never broken.  If broken, it is fixed immediately.
* Continuous integration successfully builds and tests all pull requests for master branch.
* All Java dependencies in pom.xml.  Do not load external libraries in your repo. 


## Plan

This sprint will complete the following Epics.

* *#157 User: Make my trip shorter.*
* *#231 User: I would like to highlight certain places on the map*
* *#238 User: Let me plan trips world wide.*


Key planning decisions for this sprint include:
* Finish sprint 3 tasks including implementing schemas and optimization.
* Setting more realistic goals and making sure to get done with the more important tasks.
* Starting tasks earlier


![](https://github.com/csucs314s19/t19/blob/master/team/images/diagram.png)
*Diagram describing the requests made to/from the server* 
![](https://github.com/csucs314s19/t19/blob/master/team/images/clientheirarchy.png)
*Diagram describing the requests made to/from the server* 
![](https://github.com/csucs314s19/t19/blob/master/team/images/Sprint%204%20client%20diagram.png)
*Diagram describing the requests made to/from the server* 
   

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *3* | *1* |
| Tasks |  *15*   | *23* | 
| Story Points |  *10*  | *19* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *04/01/2019* | *#247*  | *#230* | *none* |
| *04/08/2019* | *#249,#251,#255*  | *#230,233* | *none* | 
<<<<<<< HEAD
| *04/15/2019* | *#279,#276,#272* | *#233,#283,#284* | *none* |
| *04/17/2019* | *#281*| *#233,#283,#284,#285* | *none* |
=======

| *04/15/2019* | *#279,#276,#272* | *#233,#283,#284* | *none* |

| *04/17/2019* | *#281*| *#233,#283,#284,#285* | *none* |

>>>>>>> 4e5c060b587cd074bf751aaa7f26b4730fc7c667

## Review (focus on solution and technology)

In this sprint, we were able to add a world map and implement JSON schemas for validation.

#### Completed epics in Sprint Backlog 

* #238 User: Let me plan my trip worldwide 

#### Incomplete epics in Sprint Backlog 

* #157 User: Make my trip shorter: we implemented the nearest neighbour algorithm
* #84 User: I would like to highlight certain places on the map: we prioritized other tasks like schema validation and adding the world map.
* #16 User: I want to know where I am on the map

#### What went well

We are working much better as a team and accomplishing more tasks. 

#### Problems encountered and resolutions

Conforming to the provided schemas, our Itinerary server request was different from the one in TIPItineraryRequestSchema.json and we had to figure 
out a way  to validate our requests against the schemas. Our reverse and remove buttons on the itinerary page were not functional but we managed to fix them.

## Retrospective (focus on people, process, tools)

In this sprint, we were able to add a world map and implement JSON schemas for validation, we also added narrow to the options.

#### What we changed this sprint

Setting more realistic goals, we are getting better at predicting how many epics we can get done in a sprint.  

#### What we did well

Prioritizing tasks, understanding the code base better, better understanding of client/server side architecture and improving our debugging skills

#### What we need to work on

Getting even better at assigning the right number of epics and tasks as well as prioritizing tasks. We also learnt that we should get help from other teams/TA's when we spend too much time on a task.
#### What we will change next sprint 
Even better planning at the start of the sprint, ensuring we have a functional back-end before focusing on the front-end aspect. We could also use more rest API testing. 