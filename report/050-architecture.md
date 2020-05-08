\newpage
# Design

Some elements of the design process were carried out prior to development beginning. These included:

* High level architecture - identifying the different components required to form a complete web application, and how they will communicate with each other.
* Data modelling - identifying which entity classes were required, which fields they would contain, and their relationships to each other.

Other elements were left until after the development process was already underway. For example, the first sketches of the user interface for the auction were not drawn until after a large part of the server side development had been completed.

## High Level Architecture

The first choice was to decide which of the following two approaches to take:

* The traditional approach, which involves most of the application logic being performed on the server, with appropriate HTML returned to be displayed in the browser.
* The 'single page application' (SPA) approach, which allows for most of the user interface logic to be handled by client-side code which simply consumes data from the server.

An article on Microsoft's website[@spa_traditional] states that the traditional approach is better suited to websites with simple client-side requirements, and that SPAs are better suited to applications which require more complex user interface functionalities than what basic HTML forms can offer. Given the requirements of this application, the SPA approach was selected.

### Frontend (Single Page Application)



