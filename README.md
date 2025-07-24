# Project: Notes-app

## Intro

This project consists of a simple web application that allows you to take notes, tag, and filter them. The development is divided into two phases:

Phase 1: Note creation
Phase 2: Tag application and filtering

[Requirements](#requirements)
[User-Stories](#user-stories)
[Architecture](#architecture)
[Entity-Relationship](#entity-relationship-diagram)



## Requirements


## User Stories

### Phase 1

#### User Stories
- As a user, I want to be able to create, edit, and - delete notes.
- As a user, I want to archive/unarchive notes.
- As a user, I want to list my active notes.
- As a user, I want to list my archived notes.

### Phase 2

#### User Stories
- As a user, I want to be able to add/remove categories to notes.
- As a user, I want to be able to filter notes by category.

## Architecture

![Architecture Diagram](/readme-images/image-1.png)

This diagram shows a full-stack notes application where a user interacts with an Angular Single Page Application (SPA) frontend that communicates with a Spring Boot REST API backend, which connects to a PostgreSQL database running in a Docker container. The user performs actions like creating, editing, or deleting notes through the Angular interface, which sends HTTP requests to the REST API endpoints; the Spring Boot backend processes these requests, applies business logic, and performs database operations on the containerized PostgreSQL database to store or retrieve note data, then returns responses back through the API to update the Angular frontend.

## Entity-Relationship Diagram

![Entity-Relationship diagram](/readme-images/Captura%20de%20pantalla%202025-07-24%20142944.png)

This entity-relationship diagram represents a note-taking system where a User can create multiple Note entries, each of which belongs to one Category and has a NoteStatus (either ACTIVE or ARCHIVED). Each Note can have multiple Tags through a many-to-many relationship managed by the associative entity Note_Tag. The Note entity stores details like title, content, creation date, and update date, and is connected to other entities to define ownership (by User), classification (by Category), and labeling (via Tags). The diagram ensures normalized data structure, supporting organized, searchable, and categorized note management.

