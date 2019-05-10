# Sprint 5 - T19 - We Them Boys

## Goal

### A Beautiful User Experience!
### Sprint Leader: Westin Musser

## Definition of Done

* Version in pom.xml should be `<version>5.0.0</version>` for your final build for deployment.
* Increment release `v5.0` created on GitHub with appropriate version number and name.
* Increment `server-5.0.jar` deployed for testing and demonstration on SPRINT5 assignment.
* Sprint Review, Restrospective, and Metrics completed (team/sprint5.md).


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
* Each team member must complete Interop with another team and file an issue in the class repo with the results.
  * title is your team number and your name, 
  * labels should include Interop and the Team that you tested with, 
  * description should include a list of tests performed, noting any failures that occurred.


## Plan

This sprint will complete the following Epics.

* #296 User: Make the application easier to use
* #157 User: Make my trip shorter 
* #238 User: Let me plan trips world wide 
* #35 User: I want to know where I am on the map 

There are multiple epics from sprint 4,3 that are either incomplete or imperfect
relative to user experience included. In additon to completing all of these, our 
other goal is to delete duplicate code and develop more tests to bring code 
coverage up to par. 

Changes to our interface at this point will mostly be made for the sake of user 
experience. Moreover, changes to code, especially in the server, will be 
primarily made for the sake of cleanliness.

![](https://github.com/csucs314s19/t19/blob/master/team/images/kareemdiagram.png)
*Diagram describing the requests made to/from the server* 
![](https://github.com/csucs314s19/t19/blob/master/team/images/Component%20heirarchy.png)
*Diagram describing the requests made to/from the server* 
![](https://github.com/csucs314s19/t19/blob/master/team/images/Sprint%205%20client%20diagram.png)
*Diagram describing the requests made to/from the server* 


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 4 | *value* |
| Tasks |  12   | *value* | 
| Story Points |  25  | *value* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 4-24-2019 |  | #166, #298, #305 | *none* | 
| 4-26-2019 |  | #166, #298, #305, #236 | *none* |
| 4-29-2019 | #166, #236 | #298, #303, #301, #305 | *none* |
| 5-1-2019 | #305 | #298, #303, #301 | *none* | 
| 5-3-2019 | #301 | #303, #321, #320 | poor team attendance, little follow-up |  
| 5-6-2019 | #321, #320 | #45, #326, #303 | teammates not responding or going to lecture | 


## Review (focus on solution and technology)

In this sprint, we went beyond making the interface work. Instead of making obvious decisions in code, we designed the javascript to display everything in a concise and elegant manner. This involved importing button icons and fitting functionality into them and re-organizing the same information to be more attractive.

#### Completed epics in Sprint Backlog 

These Epics were completed.

* #157 User: Make my trip shorter - Use the nearest neighbor algorithm to shorten the trip.
* #296 User: Make the application easier to use - Make improvements in your user experience so someone not familiar with it can use it with no help from team members.
* #35 User: I want to know where I am on the map - Use my browser's geolocation

#### Incomplete epics in Sprint Backlog 

These Epics were not completed.

* #238 User: Let me plan trips world wide

#### What went well

I don't have much to say about this. We worked hard at the end of the sprint and made something to be happy with.


#### Problems encountered and resolutions

Work was not done, almost at all, in the first while of the sprint. Either nobody had motivation or they were preoccupied with finishing up other classes that they prioritized above this. In the end, most of the team came for a big bang but it was not the best of times.

The team was not organized in the sense that no one was participating in slack and the scrums were difficult to piece together as a result. I addressed everyone in person to get information for them but it was a sloppy process.

## Retrospective (focus on people, process, tools)

Kareem was completely unresponsive this whole sprint. He made zero contributions. Our unfortunate conclusion was to handle what he was supposed to do and evaluate him accordingly.
Parker was not much better but he indeed came through to do an epic at the end. 

Our process was really messy because no one communicated why they were not working or not able to solve what they were doing.

#### What we changed this sprint

Our changes for this sprint included holding team members more accountable for their work and following up more often. In addition, we worked more to detail out our tasks to relieve ambiguity. 

#### What we did well

We knew how to solve the problems that we had, so in that sense we were we organized in the work.

#### What we need to work on

We could improve responding to team messages and holding ourselves accountable for work we are supposed to finish.

