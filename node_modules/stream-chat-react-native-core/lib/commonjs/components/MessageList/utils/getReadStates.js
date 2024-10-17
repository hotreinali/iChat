Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReadStates = void 0;
var getReadStates = function getReadStates(clientUserId, messages, read) {
  var readData = {};
  if (read) {
    Object.values(read).forEach(function (readState) {
      if (!readState.last_read) return;
      var userLastReadMsgId;
      messages.forEach(function (msg) {
        if (msg.created_at && msg.created_at < readState.last_read) {
          var _msg$user;
          userLastReadMsgId = msg.id;
          if (!readData[userLastReadMsgId]) {
            readData[userLastReadMsgId] = 0;
          }
          if (((_msg$user = msg.user) == null ? void 0 : _msg$user.id) !== clientUserId) {
            readData[userLastReadMsgId] = readData[userLastReadMsgId] + 1;
          }
        }
      });
      if (userLastReadMsgId) {
        if (!readData[userLastReadMsgId]) {
          readData[userLastReadMsgId] = 0;
        }
        readData[userLastReadMsgId] = readData[userLastReadMsgId] + 1;
      }
    });
  }
  return readData;
};
exports.getReadStates = getReadStates;
//# sourceMappingURL=getReadStates.js.map