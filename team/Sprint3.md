# Sprint 3 - *t19* - *We Them Boys*

## Goal

### Shorter trips to more places!
### Sprint Leader: Parker Sullivan

## Definition of Done

* Version in pom.xml should be `<version>3.0.0</version>` for your final build for deployment.
* Increment release `v3.0` created on GitHub with appropriate version number and name.
* Increment `server-3.0.jar` deployed for testing and demonstration on SPRINT3 assignment.
* Sprint Review, Restrospective, and Metrics completed (team/sprint3.md).


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
* Code Coverage above 40%
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

* *#82 User: Enter latitudes and longitudes in the calculator using degree-minute-second and other formats.*
* *#155 User: I may need distances in other units of measure*
* *#157 User: Make my trip shorter*
* *#158 User: Data shouldn't go away when I change tabs*


Key planning decisions for this sprint include:
* having less on our plate so we could get the thing we said done and done correctly
* making a more managleable list of tasks to do
* starting to complete tasks early


## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | 4 | 2 |
| Tasks |  13   | 38 | 
| Story Points |  15  | 25 | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| 03/05/19 | #167,#172 | #161,#173 |none | 
| 03/08/19 | #161,#173 | #174,#175,#162,#176 | none | 
| 03/13/19 | #162,#175,#176 | #178,#179,#182,#183,#185 | none | 
| 03/23/19 | #178,#179,#182,#183,#185,#184,#186,#188,#189 | #191,#192,#197,#198,#199,#200  | none | 
| 03/25/19 | #191,#192,#197,#198,#199,#200 | #158,#177,#194,#208,#209,#210,#213 | none |
| 03/28/19 | #158,#177,#194,#208,#209,#210,#213 | none | none |
 


## Review (focus on solution and technology)

In this sprint, we were able to add to our itinerary table from a SQL data base and manipulate the date in said table. We also were able to finish saving state on the calculator page.

#### Completed epics in Sprint Backlog 

These Epics were completed.
* *#158 User: Data shouldn't go away when I change tabs : This epic proved more challenging then we thought because it required lifting state which was new to all the team members* 
* *#User: Let me change my itinerary #177: This task took up a majority of the the time because of the all of the parts that were required to consider it actually finished.
#### Incomplete epics in Sprint Backlog 

These Epics were not completed.

* *#82 User: Enter latitudes and longitudes in the calculator using degree-minute-second and other formats.* 
    
    * We were unable to finish this because the coordinate parser library turned out to be more difficult to interpret then planned and other more important task took priority
     
* *#155 User: I may need distances in other units of measure.*
    * Other more important task took priority
* *#157 User: Make my trip shorter*
    * We ran out of time

#### What went well

Once we were able to re prioritize our epics that we had planned we were able to accomplish the main priorities of this sprint without too much difficulty. 

#### Problems encountered and resolutions

We had trouble understanding lifting state and what it required but we were able to get help from multiple teams as well as TAs to lead us on the right track




## Retrospective (focus on people, process, tools)

In this sprint, our team had to learn how to communicate with other groups and ask important questions when unable to understand harder concepts.

#### What we changed this sprint

Our changes for this sprint included having less epics to work on so we could get more done.

#### What we did well

Our teams ability to get help from other teams and TA's and apply it to our own code is what went well this sprint. We were really good at knowing when to ask for help and formulating questions that gave us specific answers to our problems 

#### What we need to work on

We underestimated the amount of time it would take to do some to implement epic #82 and #155 and wanted to make sure we fixed past code until we could move on to future code. This turned out to be a giant problem and waste of time because they werent the prioties of the class. The way we fixed this problem was re priotizing the tasks and epics so we were doing the most improtant thing first and this also made it easier to fix mistakes we made from the previous sprints do to the increased knowledge of how the program works as a whole.

#### What we will change next sprint 

We will change how we prioritize epics and task making sure that they are in line with what is in Trip Co as opposed to what we think we can accomplish
