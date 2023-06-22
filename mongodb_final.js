const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the TeamPlayer model
const teamPlayerSchema = new Schema({
  name: String,
  score: Number,
});

// Create the TeamPlayer model
const TeamPlayer = mongoose.model('TeamPlayer', teamPlayerSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://saranshkbsc22:U1aLsg34uBeNTc4k@cluster0.41kkaa1.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Create an Express server
function startServer() {
  const app = express();
  app.use(express.json());

  // Add a new team player
  app.post('/teamplayers', async (req, res) => {
    try {
      const { name, score } = req.body;
      const playerScore = parseFloat(score);
      if (isNaN(playerScore) || playerScore < 0) {
        return res.status(400).json({ error: 'Invalid score. Please enter a non-negative number.' });
      }

      const teamPlayer = new TeamPlayer({ name, score: playerScore });
      await teamPlayer.save();
      res.json({ message: 'Team player added successfully.' });
    } catch (error) {
      console.error('Error adding team player:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  // Delete a team player
  app.post('/teamplayers/delete', async (req, res) => {
    try {
      const { index } = req.body;
      const teamPlayer = await TeamPlayer.findOne().skip(index).exec();
      if (!teamPlayer) {
        return res.status(404).json({ error: 'Team player not found.' });
      }

      await teamPlayer.delete();
      res.json({ message: 'Team player deleted successfully.' });
    } catch (error) {
      console.error('Error deleting team player:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  // Update a team player's score
  app.post('/teamplayers/update', async (req, res) => {
    try {
      const { index, newScore } = req.body;
      const teamPlayer = await TeamPlayer.findOne().skip(index).exec();
      if (!teamPlayer) {
        return res.status(404).json({ error: 'Team player not found.' });
      }

      const playerScore = parseFloat(newScore);
      if (isNaN(playerScore) || playerScore < 0) {
        return res.status(400).json({ error: 'Invalid score. Please enter a non-negative number.' });
      }

      teamPlayer.score = playerScore;
      await teamPlayer.save();
      res.json({ message: 'Team player score updated successfully.' });
    } catch (error) {
      console.error('Error updating team player score:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
