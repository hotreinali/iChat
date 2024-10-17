var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryMembersDebounced = exports.getMembersAndWatchers = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _debounce = _interopRequireDefault(require("lodash/debounce"));
var _constants = require("./constants");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var getMembers = function getMembers(channel) {
  var members = channel.state.members;
  return members ? Object.values(members).map(function (_ref) {
    var user = _ref.user;
    return user;
  }) : [];
};
var getWatchers = function getWatchers(channel) {
  var watchers = channel.state.watchers;
  return watchers ? Object.values(watchers) : [];
};
var getMembersAndWatchers = function getMembersAndWatchers(channel) {
  var members = getMembers(channel);
  var watchers = getWatchers(channel);
  var users = [].concat((0, _toConsumableArray2["default"])(members), (0, _toConsumableArray2["default"])(watchers));
  var seenUsers = new Set();
  var uniqueUsers = [];
  var _iterator = _createForOfIteratorHelper(users),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var user = _step.value;
      if (user && !seenUsers.has(user.id)) {
        uniqueUsers.push(user);
        seenUsers.add(user.id);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return uniqueUsers;
};
exports.getMembersAndWatchers = getMembersAndWatchers;
var isUserResponse = function isUserResponse(user) {
  return user !== undefined;
};
var queryMembers = function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(client, channel, query, onReady) {
    var options,
      _options$limit,
      limit,
      _ref3,
      members,
      _users,
      _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 4 && _args[4] !== undefined ? _args[4] : {};
          if (query) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return");
        case 3:
          _context.prev = 3;
          _options$limit = options.limit, limit = _options$limit === void 0 ? _constants.defaultAutoCompleteSuggestionsLimit : _options$limit;
          _context.next = 7;
          return channel.queryMembers({
            name: {
              $autocomplete: query
            }
          }, {}, {
            limit: limit
          });
        case 7:
          _ref3 = _context.sent;
          members = _ref3.members;
          _users = [];
          members.filter(function (member) {
            var _member$user;
            return ((_member$user = member.user) == null ? void 0 : _member$user.id) !== client.userID;
          }).forEach(function (member) {
            return isUserResponse(member.user) && _users.push(member.user);
          });
          if (onReady && _users) {
            onReady(_users);
          }
          _context.next = 18;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          console.warn('Error querying members:', _context.t0);
          throw _context.t0;
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 14]]);
  }));
  return function queryMembers(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var queryMembersDebounced = (0, _debounce["default"])(queryMembers, 200, {
  leading: false,
  trailing: true
});
exports.queryMembersDebounced = queryMembersDebounced;
//# sourceMappingURL=queryMembers.js.map