# Project: Notes-app

## Intro

This project consists of a simple web application that allows you to take notes, tag, and filter them. The development is divided into two phases:

Phase 1: Note creation
Phase 2: Tag application and filtering

[Requirements](#requirements)
[Architecture](#architecture)
[Entity-Relationship](#entity-relationship-diagram)



## Requirements


## Architecture

![Architecture Diagram](/readme-images/image-1.png)

This diagram shows a full-stack notes application where a user interacts with an Angular Single Page Application (SPA) frontend that communicates with a Spring Boot REST API backend, which connects to a PostgreSQL database running in a Docker container. The user performs actions like creating, editing, or deleting notes through the Angular interface, which sends HTTP requests to the REST API endpoints; the Spring Boot backend processes these requests, applies business logic, and performs database operations on the containerized PostgreSQL database to store or retrieve note data, then returns responses back through the API to update the Angular frontend.

## Entity-Relationship Diagram

![Entity-Relationship diagram](/readme-images/image-2.png)

This entity-relationship diagram models a note-taking system where each user can create multiple notes and categories. Notes belong to a single user and have a status—either ACTIVE or ARCHIVED—defined by an enumeration called `NoteStatus`. Categories are also user-specific and can be reused across different notes. Notes and categories are connected through a many-to-many relationship using the `Note_Category` associative entity, allowing each note to belong to multiple categories and each category to contain multiple notes. Timestamps (`createdAt`, `updatedAt`) are used throughout to track creation and modification times for notes and categories.

