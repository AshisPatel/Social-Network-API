<h1>Social Network API</h1>
  <image src='https://img.shields.io/badge/license-MIT-green.svg' />
  <h2>Description</h2>
  
  The Social Network API is a demonstration of creating documents & subdocuments for a MongoDB database using Mongoose and interacting with the database using express routes. 

  <h3>Functionality - A Deep Dive</h3>

  The Social Network API contains two models, the User model and the Thought Model. Within the User model is a 'friends' field that contains ObjectId's of other User models (self-referencing). Additionally, the User model has a 'thoughts' field that contains ObjectId's from the Thought model. Within the Thought model is a 'reactions' field that contain reaction objects. This references the ReactionSchema, which is not a model in the project, but rather just a subdocument for the Thought model. The database was structured this way because the reactions themselves would never be queried independently. 

  There is an additional effort to make this NoSQL database work as if there were defined associations between various models, much like in an SQL database. In order to mimic this capability, the Thoughts and Reactions that a User created needed to be deleted whenever the User document in the collection was deleted. That way, the User's other data would effectively 'cascade' on delete. This is done by making two separate calls to the Thought model in the deleteUser method in the user-controller's file. Ultimately, this method makes a total of 5 calls. The first is to find the user's information in the database to grab the user's _id and username. These two parameters will help in the calls to come. The second call is to delete the user from the database based on the id passed in as a parameter. The third call will delete any Thought(s) whose username field value is equal to the user's username. The fourth call acts similarly, but it updates any Thought(s) that have the user's username in a reaction of that Thought. This is done by pulling any reaction objects whose username key is equal to the user's username from the reactions array (field). The fifth call is a clean-up call that pulls the user's _id from any other User(s) that had the deleted user in their friends field / array. These residual ids if not removed were stacking up in the individual User(s) friends list and could be viewed after making a POST request to add a new friend to that User. 

  <h2>Table of Contents</h2>
 <ul>
  <li><a href="#installation">Installation</a></li>
    <li><a href="#license">License</a></li>  
  <li><a href="#questions">Questions</a></li>
 </ul>

  <h2 id="installation">Installation</h2>
  <ol>
    <li>Install mongoDB on your machine. MongoDB provides clear documentation for both Window and MacOS on their website. </li> 
    <li>Clone the repo to your local machine, and navigate to the cloned directory in the terminal.</li> 
    <li>Run npm install to add the dependencies for the project. </li> 
    <li>Navigate to the main directory and type 'npm start' in the terminal to start the server on port 3001. </li> 
    
  </ol>
  
  <h2 id="license">License</h2>

  MIT - Find out more about this project's license(s) at: [https://choosealicense.com/licenses/](https://choosealicense.com/licenses/)

  <h2 id="questions">Questions</h2>
  
  <p> 
  Made by: AshisPatel<br />
  Github Profile: https://github.com/AshisPatel<br />
  </p>Email: ashis.n.patel@gmail.com<br />Please feel free to email me with any comments, questions, or concerns!

  <h2>An End Note - Thank You to the Reader</h2>

  Hello reader! I hope that you're having a great day / afternoon / evening / weird late night hours! Thank you for taking the time to visit my repo, and trek on through the ReadMe. As a gift from me to you, I will provide a fun fact and funny gif from a collection of gifs that make me laugh! But first, a rant. There were some interesting interactions with the NoSQL database! It was very quick to get up and running, without having to worry about setting associations and the like. However, this also gave me a weird abstract feeling that I was simply throwing things into the void. It also became a problem when I was trying to imitate the cascade on delete effect for the user. If the way I implemented things was correct, then I feel like that would be horrid for an actual network with many features! So I'll just sum it up to the fact that there's most definitely a more elegant solution to cascade effects in NoSQL databases. It feels kind of odd to implement a 'relational' association in a NOSQL structure though... Any whom, maybe I just like the structure of SQL databases more, only time will tell. 

  **Fun Fact:** It’s impossible to hum while holding your nose. I would recommend you give it a try! I did after all, please don't let me feel silly and alone. 😔

  *I set the friends subdocument's unique property to true and it broke my ability to add any new users. This is kind of how typing those ten characters felt. (Thank goodness this was small scale enough for me to simply drop the database connection to remove that property...)*

  ![Person throws toy puck at someone else](https://github.com/AshisPatel/Social-Network-API/blob/main/assets/gifs/destroy.gif)




  