const ameUrl = 'http://localhost:3000';
// TODO durring worhskop this should by IP_ADDRESS_OF_PC:3000 where the server will run

export function getChannelsHistory() {
  const channelsHistoryUrl = `${ameUrl}/channels-history`;
  const callback = (data) => console.log(data);
  getFromAPI(channelsHistoryUrl, callback);
}

export function getChannelHistory(channelID) {
  const channelHistoryUrl = `${ameUrl}/channel-history/${channelID}`;
  const callback = (data) => console.log(data);
  getFromAPI(channelHistoryUrl, callback);
}

export function getAllChannels() {
  const channelsUrl = `${ameUrl}/channels`;
  const callback = (data) => console.log(data);
  getFromAPI(channelsUrl, callback);
}

export function getAllUsers() {
  const usersUrl = `${ameUrl}/users`;
  const callback = (data) => console.log(data);
  getFromAPI(usersUrl, callback);
}

export function getUserById(userID) {
  const userUrl = `${ameUrl}/user/${userID}`;
  const callback = (data) => console.log(data);
  getFromAPI(userUrl, callback);
}

function getFromAPI(url, callback) {
  fetch(url, { method: 'GET' }).then((response) => {
    response.json().then(callback)
  });
}
