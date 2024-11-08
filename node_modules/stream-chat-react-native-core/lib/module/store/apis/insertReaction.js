Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertReaction = void 0;
var _mapReactionToStorable = require("../mappers/mapReactionToStorable");
var _QuickSqliteClient = require("../QuickSqliteClient");
var _createUpdateQuery = require("../sqlite-utils/createUpdateQuery");
var _createUpsertQuery = require("../sqlite-utils/createUpsertQuery");
var insertReaction = function insertReaction(_ref) {
  var _ref$flush = _ref.flush,
    flush = _ref$flush === void 0 ? true : _ref$flush,
    message = _ref.message,
    reaction = _ref.reaction;
  var queries = [];
  var storableReaction = (0, _mapReactionToStorable.mapReactionToStorable)(reaction);
  queries.push((0, _createUpsertQuery.createUpsertQuery)('reactions', storableReaction));
  var stringifiedNewReactionGroups = JSON.stringify(message.reaction_groups);
  queries.push((0, _createUpdateQuery.createUpdateQuery)('messages', {
    reactionGroups: stringifiedNewReactionGroups
  }, {
    id: reaction.message_id
  }));
  _QuickSqliteClient.QuickSqliteClient.logger == null ? void 0 : _QuickSqliteClient.QuickSqliteClient.logger('info', 'insertReaction', {
    flush: flush,
    reaction: storableReaction
  });
  if (flush) {
    _QuickSqliteClient.QuickSqliteClient.executeSqlBatch(queries);
  }
  return queries;
};
exports.insertReaction = insertReaction;
//# sourceMappingURL=insertReaction.js.map