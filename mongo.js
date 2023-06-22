// const mongoose = require('mongoose');
// const prompt = require('prompt-sync')();

// // Connection URL and database name
// const url = 'mongodb+srv://saranshkbsc22:U1aLsg34uBeNTc4k@cluster0.41kkaa1.mongodb.net/';
// const dbName = 'team_players';

// // Function to connect to MongoDB
// async function connect() {
//   try {
//     await mongoose.connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB successfully');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//     throw err;
//   }
// }

// // Define the TeamPlayer schema
// const teamPlayerSchema = new mongoose.Schema({
//   name: String,
//   score: Number,
// });

// // Create the TeamPlayer model
// const TeamPlayer = mongoose.model('TeamPlayer', teamPlayerSchema);

// // Function to create a new team player document
// async function createTeamPlayer(name, score) {
//   try {
//     const teamPlayer = new TeamPlayer({ name, score });
//     const savedTeamPlayer = await teamPlayer.save();
//     console.log('Team player created:', savedTeamPlayer._id);
//   } catch (err) {
//     console.error('Error creating team player:', err);
//     throw err;
//   }
// }

// // Main function
// async function main() {
//   await connect();

//   const teamPlayerList = [];

//   const playerCount = prompt('Enter the number of team players: ');
//   const count = parseInt(playerCount);
//   if (isNaN(count) || count <= 0) {
//     console.log('Invalid input. Please enter a positive number.');
//     return;
//   }

//   for (let i = 1; i <= count; i++) {
//     const name = prompt(`Enter the name of team player ${i}: `);
//     const score = prompt(`Enter the score of team player ${i}: `);
//     const playerScore = parseFloat(score);
//     if (isNaN(playerScore) || playerScore < 0) {
//       console.log('Invalid score. Please enter a non-negative number.');
//       return;
//     }

//     teamPlayerList.push({ name, score: playerScore });
//   }

//   try {
//     for (const teamPlayerData of teamPlayerList) {
//       await createTeamPlayer(teamPlayerData.name, teamPlayerData.score);
//     }

//     // Getting team player statistics
//     const totalScore = teamPlayerList.reduce((sum, player) => sum + player.score, 0);
//     const averageScore = totalScore / teamPlayerList.length;
//     const minimumScore = Math.min(...teamPlayerList.map((player) => player.score));
//     const maximumScore = Math.max(...teamPlayerList.map((player) => player.score));

//     console.log(`Total score of team players: ${totalScore}`);
//     console.log(`Average score of team players: ${averageScore}`);
//     console.log(`Minimum score of team players: ${minimumScore}`);
//     console.log(`Maximum score of team players: ${maximumScore}`);
//   } catch (err) {
//     console.error('An error occurred:', err);
//   } finally {
//     // Disconnect from MongoDB
//     mongoose.disconnect();
//   }
// }

// // Call the main function
// main();


const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// Connection URL and database name
const url = 'mongodb+srv://saranshkbsc22:U1aLsg34uBeNTc4k@cluster0.41kkaa1.mongodb.net/';
const dbName = 'team_players';

// Function to connect to MongoDB
async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

// Define the TeamPlayer schema
const teamPlayerSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

// Create the TeamPlayer model
const TeamPlayer = mongoose.model('TeamPlayer', teamPlayerSchema);

// Function to create a new team player document
async function createTeamPlayer(name, score) {
  try {
    const teamPlayer = new TeamPlayer({ name, score });
    const savedTeamPlayer = await teamPlayer.save();
    console.log('Team player created:', savedTeamPlayer._id);
  } catch (err) {
    console.error('Error creating team player:', err);
    throw err;
  }
}

// Function to update the score of a team player document
async function updateTeamPlayer(playerId, updatedData) {
  try {
    const updatedTeamPlayer = await TeamPlayer.findByIdAndUpdate(playerId, updatedData, {
      new: true,
    });
    console.log('Team player updated:', updatedTeamPlayer._id);
  } catch (err) {
    console.error('Error updating team player:', err);
    throw err;
  }
}

// Function to delete a team player document
async function deleteTeamPlayer(playerId) {
  try {
    await TeamPlayer.findByIdAndDelete(playerId);
    console.log('Team player deleted:', playerId);
  } catch (err) {
    console.error('Error deleting team player:', err);
    throw err;
  }
}

// Function to read team player data
async function readTeamPlayers() {
  try {
    const teamPlayers = await TeamPlayer.find();
    console.log('Team players:');
    teamPlayers.forEach((player) => {
      console.log(`Name: ${player.name}, Score: ${player.score}`);
    });
  } catch (err) {
    console.error('Error reading team players:', err);
    throw err;
  }
}

// Main function
async function main() {
  await connect();

  const teamPlayerList = [];

  const playerCount = prompt('Enter the number of team players: ');
  const count = parseInt(playerCount);
  if (isNaN(count) || count <= 0) {
    console.log('Invalid input. Please enter a positive number.');
    return;
  }

  for (let i = 1; i <= count; i++) {
    const name = prompt(`Enter the name of team player ${i}: `);
    const score = prompt(`Enter the score of team player ${i}: `);
    const playerScore = parseFloat(score);
    if (isNaN(playerScore) || playerScore < 0) {
      console.log('Invalid score. Please enter a non-negative number.');
      return;
    }

    teamPlayerList.push({ name, score: playerScore });
  }

  try {
    for (const teamPlayerData of teamPlayerList) {
      await createTeamPlayer(teamPlayerData.name, teamPlayerData.score);
    }

    // Getting team player statistics
    const totalScore = teamPlayerList.reduce((sum, player) => sum + player.score, 0);
    const averageScore = totalScore / teamPlayerList.length;
    const minimumScore = Math.min(...teamPlayerList.map((player) => player.score));
    const maximumScore = Math.max(...teamPlayerList.map((player) => player.score));

    console.log(`Total score of team players: ${totalScore}`);
    console.log(`Average score of team players: ${averageScore}`);
    console.log(`Minimum score of team players: ${minimumScore}`);
    console.log(`Maximum score of team players: ${maximumScore}`);

    const action = prompt('Enter an action to perform (read/delete/update/exit): ');

    switch (action) {
      case 'read':
        await readTeamPlayers();
        break;

      case 'delete':
        const playerIdToDelete = prompt('Enter the player ID to delete: ');
        await deleteTeamPlayer(playerIdToDelete);
        break;

      case 'update':
        const playerIdToUpdate = prompt('Enter the player ID to update: ');
        const updatedScore = prompt('Enter the updated score: ');
        const updatedData = { score: parseFloat(updatedScore) };
        await updateTeamPlayer(playerIdToUpdate, updatedData);
        break;

      case 'exit':
        console.log('Exiting...');
        break;

      default:
        console.log('Invalid action.');
        break;
    }
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Call the main function
main();
