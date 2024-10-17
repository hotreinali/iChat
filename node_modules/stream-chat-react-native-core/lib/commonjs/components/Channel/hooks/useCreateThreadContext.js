var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateThreadContext = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _hooks = require("../../../hooks");
var selector = function selector(nextValue) {
  return [nextValue.replies, nextValue.pagination.isLoadingPrev, nextValue.pagination.isLoadingNext, nextValue.parentMessage];
};
var useCreateThreadContext = function useCreateThreadContext(_ref) {
  var _useStateStore;
  var allowThreadMessagesInChannel = _ref.allowThreadMessagesInChannel,
    closeThread = _ref.closeThread,
    loadMoreThread = _ref.loadMoreThread,
    openThread = _ref.openThread,
    reloadThread = _ref.reloadThread,
    setThreadLoadingMore = _ref.setThreadLoadingMore,
    thread = _ref.thread,
    threadHasMore = _ref.threadHasMore,
    threadInstance = _ref.threadInstance,
    threadLoadingMore = _ref.threadLoadingMore,
    threadMessages = _ref.threadMessages;
  var _ref2 = (_useStateStore = (0, _hooks.useStateStore)(threadInstance == null ? void 0 : threadInstance.state, selector)) != null ? _useStateStore : [],
    _ref3 = (0, _slicedToArray2["default"])(_ref2, 3),
    latestReplies = _ref3[0],
    isLoadingPrev = _ref3[1],
    isLoadingNext = _ref3[2];
  var contextAdapter = threadInstance ? {
    loadMoreRecentThread: threadInstance.loadNextPage,
    loadMoreThread: threadInstance.loadPrevPage,
    threadInstance: threadInstance,
    threadLoadingMore: isLoadingPrev,
    threadLoadingMoreRecent: isLoadingNext,
    threadMessages: latestReplies != null ? latestReplies : []
  } : {};
  return Object.assign({
    allowThreadMessagesInChannel: allowThreadMessagesInChannel,
    closeThread: closeThread,
    loadMoreThread: loadMoreThread,
    openThread: openThread,
    reloadThread: reloadThread,
    setThreadLoadingMore: setThreadLoadingMore,
    thread: thread,
    threadHasMore: threadHasMore,
    threadLoadingMore: threadLoadingMore,
    threadMessages: threadMessages
  }, contextAdapter);
};
exports.useCreateThreadContext = useCreateThreadContext;
//# sourceMappingURL=useCreateThreadContext.js.map