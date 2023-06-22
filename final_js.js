// const prompt = require('prompt-sync')();

// class TeamPlayer {
//   constructor(name, score) {
//     this.name = name;
//     this.score = score;
//   }
// }

// class TeamPlayerList {
//   constructor() {
//     this.teamPlayers = [];
//   }

//   addTeamPlayer(teamPlayer) {
//     this.teamPlayers.push(teamPlayer);
//   }

//   getTotalScore() {
//     let totalScore = 0;
//     for (const teamPlayer of this.teamPlayers) {
//       totalScore += teamPlayer.score;
//     }
//     return totalScore;
//   }

//   getAverageScore() {
//     const totalScore = this.getTotalScore();
//     return totalScore / this.teamPlayers.length;
//   }

//   getMinimumScore() {
//     let minScore = Infinity;
//     for (const teamPlayer of this.teamPlayers) {
//       if (teamPlayer.score < minScore) {
//         minScore = teamPlayer.score;
//       }
//     }
//     return minScore;
//   }

//   getMaximumScore() {
//     let maxScore = -Infinity;
//     for (const teamPlayer of this.teamPlayers) {
//       if (teamPlayer.score > maxScore) {
//         maxScore = teamPlayer.score;
//       }
//     }
//     return maxScore;
//   }
// }

// function main() {
//   const teamPlayerList = new TeamPlayerList();

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

//     teamPlayerList.addTeamPlayer(new TeamPlayer(name, playerScore));
//   }

//   // Getting team player statistics
//   const totalScore = teamPlayerList.getTotalScore();
//   const averageScore = teamPlayerList.getAverageScore();
//   const minimumScore = teamPlayerList.getMinimumScore();
//   const maximumScore = teamPlayerList.getMaximumScore();

//   console.log(`Total score of team players: ${totalScore}`);
//   console.log(`Average score of team players: ${averageScore}`);
//   console.log(`Minimum score of team players: ${minimumScore}`);
//   console.log(`Maximum score of team players: ${maximumScore}`);
// }

// main();


const prompt = require('prompt-sync')();

class TeamPlayer {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class TeamPlayerList {
  constructor() {
    this.teamPlayers = [];
  }

  addTeamPlayer(teamPlayer) {
    this.teamPlayers.push(teamPlayer);
  }

  deleteTeamPlayer(index) {
    if (index >= 0 && index < this.teamPlayers.length) {
      this.teamPlayers.splice(index, 1);
      console.log('Team player deleted successfully.');
    } else {
      console.log('Invalid index. Team player not found.');
    }
  }

  updateTeamPlayerScore(index, newScore) {
    if (index >= 0 && index < this.teamPlayers.length) {
      const teamPlayer = this.teamPlayers[index];
      teamPlayer.score = newScore;
      console.log('Team player score updated successfully.');
    } else {
      console.log('Invalid index. Team player not found.');
    }
  }

  getTotalScore() {
    let totalScore = 0;
    for (const teamPlayer of this.teamPlayers) {
      totalScore += teamPlayer.score;
    }
    return totalScore;
  }

  getAverageScore() {
    const totalScore = this.getTotalScore();
    return totalScore / this.teamPlayers.length;
  }

  getMinimumScore() {
    let minScore = Infinity;
    for (const teamPlayer of this.teamPlayers) {
      if (teamPlayer.score < minScore) {
        minScore = teamPlayer.score;
      }
    }
    return minScore;
  }

  getMaximumScore() {
    let maxScore = -Infinity;
    for (const teamPlayer of this.teamPlayers) {
      if (teamPlayer.score > maxScore) {
        maxScore = teamPlayer.score;
      }
    }
    return maxScore;
  }
}

function main() {
  const teamPlayerList = new TeamPlayerList();

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

    teamPlayerList.addTeamPlayer(new TeamPlayer(name, playerScore));
  }

  // Getting team player statistics
  const totalScore = teamPlayerList.getTotalScore();
  const averageScore = teamPlayerList.getAverageScore();
  const minimumScore = teamPlayerList.getMinimumScore();
  const maximumScore = teamPlayerList.getMaximumScore();

  console.log(`Total score of team players: ${totalScore}`);
  console.log(`Average score of team players: ${averageScore}`);
  console.log(`Minimum score of team players: ${minimumScore}`);
  console.log(`Maximum score of team players: ${maximumScore}`);

  const action = prompt('Enter an action to perform (delete/update/exit): ');

  switch (action) {
    case 'delete':
      const deleteIndex = prompt('Enter the index of the team player to delete: ');
      teamPlayerList.deleteTeamPlayer(parseInt(deleteIndex));
      break;
      
    case 'update':
      const updateIndex = prompt('Enter the index of the team player to update: ');
      const newScore = prompt('Enter the updated score: ');
      teamPlayerList.updateTeamPlayerScore(parseInt(updateIndex), parseFloat(newScore));
      break;
      
    case 'exit':
      console.log('Exiting...');
      break;

    default:
      console.log('Invalid action.');
      break;
  }
}

main();

