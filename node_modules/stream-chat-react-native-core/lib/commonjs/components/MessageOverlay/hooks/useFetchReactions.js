var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetchReactions = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _ChatContext = require("../../../contexts/chatContext/ChatContext");
var _getReactionsforFilterSort = require("../../../store/apis/getReactionsforFilterSort");
var useFetchReactions = function useFetchReactions(_ref) {
  var _ref$limit = _ref.limit,
    limit = _ref$limit === void 0 ? 25 : _ref$limit,
    messageId = _ref.messageId,
    reactionType = _ref.reactionType,
    sort = _ref.sort;
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    reactions = _useState2[0],
    setReactions = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(undefined),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    next = _useState6[0],
    setNext = _useState6[1];
  var _useChatContext = (0, _ChatContext.useChatContext)(),
    client = _useChatContext.client,
    enableOfflineSupport = _useChatContext.enableOfflineSupport;
  var sortString = (0, _react.useMemo)(function () {
    return JSON.stringify(sort);
  }, [sort]);
  var fetchReactions = (0, _react.useCallback)((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
    var loadOfflineReactions, loadOnlineReactions;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          loadOfflineReactions = function loadOfflineReactions() {
            if (!messageId) return;
            var reactionsFromDB = (0, _getReactionsforFilterSort.getReactionsForFilterSort)({
              currentMessageId: messageId,
              filters: reactionType ? {
                type: reactionType
              } : {},
              sort: sort
            });
            if (reactionsFromDB) {
              setReactions(reactionsFromDB);
              setLoading(false);
            }
          };
          loadOnlineReactions = function () {
            var _ref3 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
              var response;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (messageId) {
                      _context.next = 2;
                      break;
                    }
                    return _context.abrupt("return");
                  case 2:
                    _context.next = 4;
                    return client.queryReactions(messageId, reactionType ? {
                      type: reactionType
                    } : {}, sort, {
                      limit: limit,
                      next: next
                    });
                  case 4:
                    response = _context.sent;
                    if (response) {
                      setNext(response.next);
                      setReactions(function (prevReactions) {
                        return [].concat((0, _toConsumableArray2["default"])(prevReactions), (0, _toConsumableArray2["default"])(response.reactions));
                      });
                      setLoading(false);
                    }
                  case 6:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function loadOnlineReactions() {
              return _ref3.apply(this, arguments);
            };
          }();
          _context2.prev = 2;
          if (!enableOfflineSupport) {
            _context2.next = 7;
            break;
          }
          loadOfflineReactions();
          _context2.next = 9;
          break;
        case 7:
          _context2.next = 9;
          return loadOnlineReactions();
        case 9:
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](2);
          console.log('Error fetching reactions: ', _context2.t0);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 11]]);
  })), [client, messageId, reactionType, sortString, next, enableOfflineSupport]);
  var loadNextPage = (0, _react.useCallback)((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!next) {
            _context3.next = 3;
            break;
          }
          _context3.next = 3;
          return fetchReactions();
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })), [fetchReactions]);
  (0, _react.useEffect)(function () {
    fetchReactions();
  }, [messageId, reactionType, sortString]);
  return {
    loading: loading,
    loadNextPage: loadNextPage,
    reactions: reactions
  };
};
exports.useFetchReactions = useFetchReactions;
//# sourceMappingURL=useFetchReactions.js.map