Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReactions = void 0;
var _mapStorableToReaction = require("../mappers/mapStorableToReaction");
var _QuickSqliteClient = require("../QuickSqliteClient");
var getReactions = function getReactions(_ref) {
  var reactions = _ref.reactions;
  _QuickSqliteClient.QuickSqliteClient.logger == null ? void 0 : _QuickSqliteClient.QuickSqliteClient.logger('info', 'getReactions', {
    reactions: reactions
  });
  return reactions.map(function (reaction) {
    return Object.assign({}, (0, _mapStorableToReaction.mapStorableToReaction)(reaction));
  });
};
exports.getReactions = getReactions;
//# sourceMappingURL=getReactions.js.map