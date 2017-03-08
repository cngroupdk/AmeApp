import express from 'express';
import axios from 'axios';

let app = express();

const slackUrl = 'https://slack.com/api/';
const channelsHistory = 'channels.history';
const channelsList = 'channels.list';
const usersList = 'users.list';
const token = 'xoxp-149478955409-150168163651-150326302965-c536b1533cdbf4207cf5773e62f7f3b3';
let allChannels = [];

app.get('/', (req, res) => {
  axios.get(
    `${slackUrl}${channelsList}`,
    {
      params: { token: token }
    }
  ).then((response) => {
    const channels = response.data.channels;
    allChannels = channels.map((channel) => {
      const { id, name } = channel;
      return { id, name };
    });
    res.json(allChannels);
  }).catch((error) => {
    console.log(`Error: ${error}`);
    res.status(500).json({ error })
  });
});

app.get('/channels-history', (req, res) => {
  let messages = {};

  Promise.all(allChannels.map((channel) =>
    axios.get(
      `${slackUrl}/${channelsHistory}`,
      {
        params: { token, channel: channel.id }
      }
    )
  )).then((allResponses) => {
    allResponses.map((response, index) => {
      messages[index] = response.data.messages;
    });

    const allMessages = messages[0].concat(messages[1], messages[2]);
    res.json(allMessages);
  }).catch(error => {
    console.log(`Error: ${error}`);
    res.status(500).json({ error })
  });
});

app.get('/users', (req, res) => {
  axios.get(
    `${slackUrl}${usersList}`,
    {
      params: { token: token }
    }
  ).then((response) => {
    const members = response.data.members;

    allMembers = members.map((member) => {
      const { id, profile } = member;
      return { id, profile };
    });
    res.json(allMembers);
  }).catch((error) => {
    console.log(`Error: ${error}`);
    res.status(500).json({ error })
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
