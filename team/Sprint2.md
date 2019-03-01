# Sprint 2 - t19 - We Them Boys

## Goal

### A map and itinerary!
### Sprint Leader: Dziugas Butkus

## Definition of Done

* Version in pom.xml should be `<version>2.0.0</version>` for your final build for deployment.
* Increment release `v2.0` created on GitHub with appropriate version number and name.
* Increment deployed for testing and demonstration on SPRINT2 assignment.
* Sprint Review and Restrospectives completed (team/sprint2.md).


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

* *#81 User: Show me a map and itinerary for my trip*
* *#82 User: Enter latitudes and longitudes in the calculator using degree-minute-second and other formats*
* *#84 User: The calculator data shouldn't go away when units change*
* *#85 User: Let me change my itinerary*
* *#35 User: I want to know where I am on the map*
* *#97 User: It would be nice to see a map with the calculator*



Key planning decisions for this sprint include:
* changing our meeting times to when we can focus on working on this class only and not get distracted by other tasks
* starting to complete tasks early


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 6 | 1 |
| Tasks |  22   | 10 | 
| Story Points |  32  | 12 | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 02/13/2019 | #107 | #48, #86, #105, #106, #109 | none |
| 02/15/2019 | #48, #109, #116 | #86, #105, #106 | none |
| 02/18/2019 | #106 | #86, #88, #106, #121 | none |
| 02/22/2019 | #131 | #124, #105, #102 | none |
| 02/25/2019 | #105 | #133, #98 | none |
| 02/27/2019 | #133 | #98 | none |


## Review (focus on solution and technology)

In this sprint we were able to create itinerary page, let users upload their own json data, download the same data with calculated distances and display the trip on the map and in the table. 

#### Completed epics in Sprint Backlog 

These Epics were completed.

* *## epic title: comments*
* *#81 User: Show me a map and itinerary for my trip: a challenging epic that required good planning. Once we figured out required tasks and requirements, then it become simple but time-consuming.*
* *#34 User: I want to compute the distance between two locations on the planet: the epic was straightforward. Error checking and calculating was pretty easy to implement. Testing took most of the time assigned for this epic.*

#### Incomplete epics in Sprint Backlog 

All these epics were not complete because of time constraints

* *#35 User: I want to know where I am on the map*
* *#84 User: The calculator data shouldn't go away when units change*
* *#82 User: Enter latitudes and longitudes in the calculator using degree-minute-second and other formats*
* *#97 User: It would be nice to see a map with the calculator*
* *#85 User: Let me change my itinerary*

#### What went well

We were organized, were pretty fast with assigning tasks and starting working on them. Early in the sprint we made a lot of progress.


#### Problems encountered and resolutions

In the middle of the sprint we realized that our team understood but could not describe how the client and server communicated to other students. We asked Dave to explain POST and GET requests.
Also, during one of the daily scrums, we were all working on the same itinerary.js file and eventually got a lot of merge conflicts.


## Retrospective (focus on people, process, tools)

In this sprint our team had to ask Dave for advice on proper time management and how to work as a team when it is difficult to find time that works for everyone.


#### What we changed this sprint

Our changes for this sprint included meeting at different times to increase productivity. Instead of meeting during Dziugas' and Westin's lab hours, we did it after every CS 314 class.


#### What we did well

We improved with our communication between team members. Coordinating meetings and tasks got a lot easier. Also, we noticed that brainstorming and working together as a team is much more efficient than completing tasks alone.

#### What we need to work on

We could improve with commiting frequency. The team completed tasks really fast until we took 1-2 days off and it took longer to get back to the same productivity level. 

#### What we will change next sprint 

Next sprint we will change our work ethic. Our team meets every other day, work productively and are able finish tasks but we need to put a lot more time to achieve more.
