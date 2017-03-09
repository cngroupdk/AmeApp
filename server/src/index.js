import express from 'express';
import axios from 'axios';

let app = express();
let lastFetch = 0;
let serverData = {};

const DELAY = 10000;
const channelsHistory = 'channels.history';
const channelsList = 'channels.list';
const slackUrl = 'https://slack.com/api/';
const token = 'xoxp-149478955409-150168163651-150326302965-c536b1533cdbf4207cf5773e62f7f3b3';
const userInfo = 'users.info';
const usersList = 'users.list';

function getActualTime() {
  return Date.now();
}

function getChannelHistory(id, callback) {
  axios.get(
    `${slackUrl}/${channelsHistory}`,
    {
      params: {
        token,
        channel: id,
      }
    }
  ).then((response) => {
    callback(null, response.data.messages);
  }).catch((error) => {
    console.log(`Error: ${error}`);
    callback({ error });
  });
}

function getChannelsList() {
  return axios.get(
    `${slackUrl}${channelsList}`,
    {
      params: { token: token }
    }
  ).then((response) => {
    return response.data.channels;
  }).catch((error) => {
    return { error };
  });
}

app.get('/channels', async (req, res) => {
  if (!serverData.channels || ((lastFetch + DELAY) < getActualTime())) {
    const allChannels = await getChannelsList();

    if (allChannels.error) {
      return res.status(500).json({ 'error': allChannels.error });
    }

    const mappedChannels = allChannels.map((channel) => {
      const { id, name } = channel;
      return { id, name };
    });

    lastFetch = getActualTime();
    serverData.channels = mappedChannels;

    return res.json(mappedChannels);
  } else {
    res.json(serverData.channels);
  }
});

app.get('/channel-history/:id', (req, res) => {
  if (!serverData.channelHistory || ((lastFetch + DELAY) < getActualTime())) {
    getChannelHistory(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      lastFetch = getActualTime();
      serverData.channelHistory = data;

      return res.json(data);
    });
  } else {
    res.json(serverData.channelHistory);
  }
});

app.get('/channels-history', async (req, res) => {
  if (!serverData.channelsHistory || ((lastFetch + DELAY) < getActualTime())) {
    let messages = {};
    const allChannels = await getChannelsList();

    if (allChannels.error) {
      return res.status(500).json({ 'error': allChannels.error });
    }

    Promise.all(allChannels.map((channel) =>
      axios.get(
        `${slackUrl}/${channelsHistory}`,
        {
          params: { token, channel: channel.id, name: channel.name }
        }
      )
    )).then((allResponses) => {
      allResponses.map((response, index) => {
        const { config, data } = response;
        let channelName = config.params.name;

        return messages[channelName] = data.messages;

      });

      let allMessages = [];

      Object.keys(messages).map((key, value) => {
        allMessages = allMessages.concat(messages[key]);
      });

      lastFetch = getActualTime();
      serverData.channelsHistory = allMessages;

      res.json(allMessages);
    }).catch(error => {
      console.log(`Error: ${error}`);
      res.status(500).json({ error })
    });
  } else {
    res.json(serverData.channelsHistory);
  }
});

app.get('/users', (req, res) => {
  if (!serverData.users || ((lastFetch + DELAY) < getActualTime())) {
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

      lastFetch = getActualTime();
      serverData.users = allMembers;

      res.json(allMembers);
    }).catch((error) => {
      console.log(`Error: ${error}`);
      res.status(500).json({ error })
    });
  } else {
    res.json(serverData.users);
  }
});

app.get('/user/:id', (req, res) => {
  if (!serverData.user || ((lastFetch + DELAY) < getActualTime())) {
    axios.get(
      `${slackUrl}${userInfo}`,
      {
        params: {
          token: token,
          user: req.params.id,
        }
      }
    ).then((response) => {

      lastFetch = getActualTime();
      serverData.user = response.data.user.profile;

      res.json(response.data.user.profile);
    }).catch((error) => {
      console.log(`Error: ${error}`);
      res.status(500).json({ error })
    });
  } else {
    res.json(serverData.user);
  }
});

app.listen(3000, () => {
  console.log('Am\'e app listening on port 3000!')
});
