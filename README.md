# Programming challenge

## Background
In food animal systems, animals move to different farms as they age. Each farm has a unique ID and must keep a record of the movement of animals from one farm to another. Here, we present some fictitious records of movements among pig farms.

*Description of the data folder* 

*	*movements*: all records of animal movements 
    -  new_originpremid - column with the ID of the origin farm 
    -  new_destinationpremid - column with the ID of the destination farm 
    -  new_numitemsmovedcolumn - column with the number of moved animals

*	*population*: complete list of the farms
    -  premiseid - column with the ID of the farms
    -  total_animal - column with the current number of animals for the farm


## Challenge
The challenge is to create a system to visualize the movement records. This
system have to follow the requirements bellow:

- Has to be composed of 3 components: a REST API, a SPA WEB client, and a
  relational database;
- The relational database can be any database that you like, PostgreSQL, MariaDB
  etc..;
- The data provided in this repo should be imported into the database;
- The REST API has to written in Java, Python or Typescript. It can use any
  framework/library that you desmire;
- The Web Client have to written in Typecript, and you can use any *SPA
  framework/library* that you desire, ex Angular, React, etc...;
- Your submitted project should include instructions on how to run it;

The submitted project will be evaluated considering your experience. For example, a
person with a background in backend development will be evaluated with higher
expectations of the API and database code. A UI person will be evaluated with
higher expectations on the design of the UI.

Bonus points will be awarded for creativity and implementing things outside the
requirements, such as:
- having an authentication in the system
- Using docker
- Having a script to run all components
- Importing the supplied data into a well normalized schema

## Running the application

- Clone the project -

```
git clone https://github.com/bhansaliyash/Food-Animal-System

cd Food-Animal-System
```

- The application is dockerized so we can directly run the appication using - 
```
docker-compose up -d --build
```

- Run migrations
```
docker-compose exec backend python manage.py migrate
```

- Running this will import the csv data into the tables
```
docker-compose exec backend python manage.py runscript load_data

```

- To stop the container use - 
```
docker-compose down
```

# Farm and Movement API

This Django application provides APIs for managing farms and movements of items between farms. The application is built using the Django REST Framework.

## Installation

1. Clone the repository:

   ```
   git clone <repository_url>
   ```

2. Install the dependencies:

   ```
   pip install -r requirements.txt
   ```

3. Apply the database migrations:

   ```
   python manage.py migrate
   ```

4. Run the development server:

   ```
   python manage.py runserver
   ```

The APIs will be accessible at `http://localhost:8000/`.

## API Endpoints

### Farm API

#### Create a Farm

- URL: `/farms/`
- Method: `POST`
- Response:
  - Status Code: 200 (OK) if successful, 400 (Bad Request) if there are validation errors.

#### Get Farms

- URL: `/farms/`
- Method: `GET`
- Query Parameters:
  - `premise_id` (optional, string): Filter farms by premise_id.
- Response:
  - Status Code: 200 (OK) if successful, 400 (Bad Request) if there are errors.

### Movement API

#### Create a Movement

- URL: `/movements/`
- Method: `POST`
- Response:
  - Status Code: 200 (OK) if successful, 400 (Bad Request) if there are validation errors.

#### Get Movements

- URL: `/movements/`
- Method: `GET`
- Query Parameters:
  - `movement_id` (optional, string): Get a movement by movement_id.
  - `premise_id` (optional, string): Filter movements by origin_premise_id. (For search functionality)
- Response:
  - Status Code: 200 (OK) if successful, 400 (Bad Request) if there are errors.
