Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReactionsForFilterSort = void 0;
var _getReactions = require("./getReactions");
var _selectReactionsForMessages = require("./queries/selectReactionsForMessages");
var _QuickSqliteClient = require("../QuickSqliteClient");
var getReactionsForFilterSort = function getReactionsForFilterSort(_ref) {
  var currentMessageId = _ref.currentMessageId,
    filters = _ref.filters,
    sort = _ref.sort;
  if (!filters && !sort) {
    console.warn('Please provide the query (filters/sort) to fetch channels from DB');
    return null;
  }
  _QuickSqliteClient.QuickSqliteClient.logger == null ? void 0 : _QuickSqliteClient.QuickSqliteClient.logger('info', 'getReactionsForFilterSort', {
    filters: filters,
    sort: sort
  });
  var reactions = (0, _selectReactionsForMessages.selectReactionsForMessages)([currentMessageId]);
  if (!reactions) return null;
  if (reactions.length === 0) {
    return [];
  }
  return (0, _getReactions.getReactions)({
    reactions: reactions
  });
};
exports.getReactionsForFilterSort = getReactionsForFilterSort;
//# sourceMappingURL=getReactionsforFilterSort.js.map