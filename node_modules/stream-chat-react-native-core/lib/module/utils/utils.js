var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultEmojiSearchIndex = exports.ProgressIndicatorTypes = exports.MessageStatusTypes = exports.FileState = void 0;
exports.escapeRegExp = escapeRegExp;
exports.stringifyMessage = exports.reduceMessagesToString = exports.makeImageCompatibleUrl = exports.isLocalUrl = exports.isEditedMessage = exports.isBouncedMessage = exports.isBlockedMessage = exports.hasOnlyEmojis = exports.getUrlWithoutParams = exports.getIndicatorTypeForFileState = exports.getFileNameFromPath = exports.getDurationLabelFromDuration = exports.generateRandomId = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _emojiRegex = _interopRequireDefault(require("emoji-regex"));
var _emojiData = require("../emoji-data");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var FileState = Object.freeze({
  FINISHED: 'finished',
  NOT_SUPPORTED: 'not_supported',
  UPLOAD_FAILED: 'upload_failed',
  UPLOADED: 'uploaded',
  UPLOADING: 'uploading'
});
exports.FileState = FileState;
var ProgressIndicatorTypes = Object.freeze({
  IN_PROGRESS: 'in_progress',
  INACTIVE: 'inactive',
  NOT_SUPPORTED: 'not_supported',
  RETRY: 'retry'
});
exports.ProgressIndicatorTypes = ProgressIndicatorTypes;
var MessageStatusTypes = {
  FAILED: 'failed',
  RECEIVED: 'received',
  SENDING: 'sending'
};
exports.MessageStatusTypes = MessageStatusTypes;
var getIndicatorTypeForFileState = function getIndicatorTypeForFileState(fileState, enableOfflineSupport) {
  var _indicatorMap;
  var indicatorMap = (_indicatorMap = {}, (0, _defineProperty2["default"])(_indicatorMap, FileState.UPLOADING, enableOfflineSupport ? ProgressIndicatorTypes.INACTIVE : ProgressIndicatorTypes.IN_PROGRESS), (0, _defineProperty2["default"])(_indicatorMap, FileState.UPLOAD_FAILED, enableOfflineSupport ? ProgressIndicatorTypes.INACTIVE : ProgressIndicatorTypes.RETRY), (0, _defineProperty2["default"])(_indicatorMap, FileState.NOT_SUPPORTED, ProgressIndicatorTypes.NOT_SUPPORTED), (0, _defineProperty2["default"])(_indicatorMap, FileState.UPLOADED, ProgressIndicatorTypes.INACTIVE), (0, _defineProperty2["default"])(_indicatorMap, FileState.FINISHED, ProgressIndicatorTypes.INACTIVE), _indicatorMap);
  return indicatorMap[fileState];
};
exports.getIndicatorTypeForFileState = getIndicatorTypeForFileState;
var isBlockedMessage = function isBlockedMessage(message) {
  var pattern = /\bMessage was blocked by moderation policies\b/;
  return message.type === 'error' && message.text && pattern.test(message.text);
};
exports.isBlockedMessage = isBlockedMessage;
var isBouncedMessage = function isBouncedMessage(message) {
  return message.type === 'error' && message.moderation_details !== undefined;
};
exports.isBouncedMessage = isBouncedMessage;
var isEditedMessage = function isEditedMessage(message) {
  return !!message.message_text_updated_at;
};
exports.isEditedMessage = isEditedMessage;
var defaultEmojiSearchIndex = {
  search: function search(query) {
    try {
      var results = [];
      var _loop = function _loop(emoji) {
        if (results.length >= 10) return {
          v: results
        };
        if (emoji.names.some(function (name) {
          return name.includes(query);
        })) {
          if (emoji.skins) {
            results.push(Object.assign({}, emoji, {
              name: "".concat(emoji.name, "-tone-1"),
              skins: undefined
            }));
            emoji.skins.forEach(function (tone, index) {
              return results.push(Object.assign({}, emoji, {
                name: "".concat(emoji.name, "-tone-").concat(index + 2),
                skins: undefined,
                unicode: tone
              }));
            });
          } else {
            results.push(emoji);
          }
        }
      };
      var _iterator = _createForOfIteratorHelper(_emojiData.compiledEmojis),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var emoji = _step.value;
          var _ret = _loop(emoji);
          if ((0, _typeof2["default"])(_ret) === "object") return _ret.v;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return results;
    } catch (error) {
      console.warn('Error searching emojis:', error);
      throw error;
    }
  }
};
exports.defaultEmojiSearchIndex = defaultEmojiSearchIndex;
var makeImageCompatibleUrl = function makeImageCompatibleUrl(url) {
  return (url.indexOf('//') === 0 ? "https:".concat(url) : url).trim();
};
exports.makeImageCompatibleUrl = makeImageCompatibleUrl;
var getUrlWithoutParams = function getUrlWithoutParams(url) {
  if (!url) return url;
  var indexOfQuestion = url.indexOf('?');
  if (indexOfQuestion === -1) return url;
  return url.substring(0, url.indexOf('?'));
};
exports.getUrlWithoutParams = getUrlWithoutParams;
var isLocalUrl = function isLocalUrl(url) {
  return url.indexOf('http') !== 0;
};
exports.isLocalUrl = isLocalUrl;
var generateRandomId = function generateRandomId() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return a ? ((Number(a) ^ Math.random() * 16) >> Number(a) / 4).toString(16) : "".concat(1e7, "-", 1e3, "-", 4e3, "-", 8e3, "-", 1e11).replace(/[018]/g, generateRandomId);
};
exports.generateRandomId = generateRandomId;
var hasOnlyEmojis = function hasOnlyEmojis(text) {
  try {
    var emojiOnlyString = (0, _toConsumableArray2["default"])(text.matchAll((0, _emojiRegex["default"])())).join('');
    var originalTextWithNoSpaces = text.replaceAll(/\s/g, '');
    return emojiOnlyString.length !== 0 && emojiOnlyString.length === originalTextWithNoSpaces.length;
  } catch (e) {
    return false;
  }
};
exports.hasOnlyEmojis = hasOnlyEmojis;
var stringifyMessage = function stringifyMessage(_ref) {
  var deleted_at = _ref.deleted_at,
    i18n = _ref.i18n,
    latest_reactions = _ref.latest_reactions,
    reaction_groups = _ref.reaction_groups,
    readBy = _ref.readBy,
    reply_count = _ref.reply_count,
    status = _ref.status,
    text = _ref.text,
    type = _ref.type,
    updated_at = _ref.updated_at;
  return "".concat(latest_reactions ? latest_reactions.map(function (_ref2) {
    var type = _ref2.type,
      user = _ref2.user;
    return "".concat(type).concat(user == null ? void 0 : user.id);
  }).join() : '').concat(reaction_groups ? Object.entries(reaction_groups).flatMap(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
      type = _ref4[0],
      _ref4$ = _ref4[1],
      count = _ref4$.count,
      first_reaction_at = _ref4$.first_reaction_at,
      last_reaction_at = _ref4$.last_reaction_at;
    return "".concat(type).concat(count).concat(first_reaction_at).concat(last_reaction_at);
  }).join() : '').concat(type).concat(deleted_at).concat(text).concat(readBy).concat(reply_count).concat(status).concat(updated_at).concat(JSON.stringify(i18n));
};
exports.stringifyMessage = stringifyMessage;
var reduceMessagesToString = function reduceMessagesToString(messages) {
  return messages.map(stringifyMessage).join();
};
exports.reduceMessagesToString = reduceMessagesToString;
var getFileNameFromPath = function getFileNameFromPath(path) {
  var pattern = /[^/]+\.[^/]+$/;
  var match = path.match(pattern);
  return match ? match[0] : '';
};
exports.getFileNameFromPath = getFileNameFromPath;
var getDurationLabelFromDuration = function getDurationLabelFromDuration(duration) {
  var ONE_HOUR_IN_SECONDS = 3600;
  var ONE_HOUR_IN_MILLISECONDS = ONE_HOUR_IN_SECONDS * 1000;
  var durationLabel = '00:00';
  var isDurationLongerThanHour = duration / ONE_HOUR_IN_MILLISECONDS >= 1;
  var formattedDurationParam = isDurationLongerThanHour ? 'HH:mm:ss' : 'mm:ss';
  var formattedVideoDuration = _dayjs["default"].duration(duration, 'milliseconds').format(formattedDurationParam);
  durationLabel = formattedVideoDuration;
  return durationLabel;
};
exports.getDurationLabelFromDuration = getDurationLabelFromDuration;
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,/\\^$|#]/g, '\\$&');
}
//# sourceMappingURL=utils.js.map