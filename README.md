# Concept Library - design documents

## Implementation
- CLL developers can access the design documents [here](https://www.figma.com/file/7Hct08x5DxbxC4HMB2LM7T/Phenotype-Library?node-id=1706%3A3391)

## Workflows
1. Single page workflow
    - Each aspect of a Concept's creation is separated into sections
    - Final validation is performed by both client & server when the user attempts to submit a Concept

2. Wizard page workflow
    - Each aspect of a Concept's creation is separated into stages
    - Stages cannot be traversed until the user completes each section (which both the client & server will validate)
    - Submitting a Concept is only allowed once all stages have been traversed, completed and validated

## To run this on a local machine:

1. Git clone this repository
2. Install [nodejs](https://nodejs.org/en/download/)
3. Open a terminal in the cloned repo, and cd to the ```cllproposal``` folder
4. Run the following command to install the project dependencies:
```sh
npm install
```
5. Run the following command to spin up a virtual server:
```sh
npm start
```
6. Open your browser, and navigate to ```http://127.0.0.1:3000/```
