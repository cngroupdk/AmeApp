const ameUrl = 'http://localhost:3000';
// TODO durring worhskop this should by IP_ADDRESS_OF_PC:3000 where the server will run

export function getChannelsHistory(callback) {
  const channelsHistoryUrl = `${ameUrl}/channels-history`;
  getFromAPI(channelsHistoryUrl, callback);
}

export function getChannelHistory(channelID) {
  const channelHistoryUrl = `${ameUrl}/channel-history/${channelID}`;
  getFromAPI(channelHistoryUrl, callback);
}

export function getAllChannels(callback) {
  const channelsUrl = `${ameUrl}/channels`;
  getFromAPI(channelsUrl, callback);
}

export function getAllUsers(callback) {
  const usersUrl = `${ameUrl}/users`;
  getFromAPI(usersUrl, callback);
}

export function getUserById(userID) {
  const userUrl = `${ameUrl}/user/${userID}`;
  getFromAPI(userUrl, callback);
}

export function getReactionsByUser(userID, callback) {
  const userReactionUrl = `${ameUrl}/user-reaction/${userID}`;
  getFromAPI(userReactionUrl, callback);
}

function getFromAPI(url, callback) {
  fetch(url, { method: 'GET' }).then((response) => {
    response.json().then(callback)
  });
}
