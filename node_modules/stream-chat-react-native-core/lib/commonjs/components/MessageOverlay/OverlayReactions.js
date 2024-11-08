var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayReactions = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _useFetchReactions2 = require("./hooks/useFetchReactions");
var _OverlayReactionsItem = require("./OverlayReactionsItem");
var _ThemeContext = require("../../contexts/themeContext/ThemeContext");
var _icons = require("../../icons");
var _jsxRuntime = require("react/jsx-runtime");
var _this = this,
  _jsxFileName = "/home/runner/work/stream-chat-react-native/stream-chat-react-native/package/src/components/MessageOverlay/OverlayReactions.tsx";
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var styles = _reactNative.StyleSheet.create({
  avatarContainer: {
    padding: 8
  },
  container: {
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 8,
    width: '100%'
  },
  flatListContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  flatListContentContainer: {
    alignItems: 'center',
    paddingBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 16
  },
  unseenItemContainer: {
    opacity: 0,
    position: 'absolute'
  }
});
var reactionData = [{
  Icon: _icons.LoveReaction,
  type: 'love'
}, {
  Icon: _icons.ThumbsUpReaction,
  type: 'like'
}, {
  Icon: _icons.ThumbsDownReaction,
  type: 'sad'
}, {
  Icon: _icons.LOLReaction,
  type: 'haha'
}, {
  Icon: _icons.WutReaction,
  type: 'wow'
}];
var sort = {
  created_at: -1
};
var OverlayReactions = function OverlayReactions(props) {
  var _React$useState = _react["default"].useState(0),
    _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
    itemHeight = _React$useState2[0],
    setItemHeight = _React$useState2[1];
  var overlayAlignment = props.alignment,
    messageId = props.messageId,
    OverlayReactionsAvatar = props.OverlayReactionsAvatar,
    propReactions = props.reactions,
    showScreen = props.showScreen,
    _props$supportedReact = props.supportedReactions,
    supportedReactions = _props$supportedReact === void 0 ? reactionData : _props$supportedReact,
    title = props.title;
  var layoutHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  var layoutWidth = (0, _reactNativeReanimated.useSharedValue)(0);
  var _useFetchReactions = (0, _useFetchReactions2.useFetchReactions)({
      messageId: messageId,
      sort: sort
    }),
    loading = _useFetchReactions.loading,
    loadNextPage = _useFetchReactions.loadNextPage,
    fetchedReactions = _useFetchReactions.reactions;
  var reactions = (0, _react.useMemo)(function () {
    return propReactions || fetchedReactions.map(function (reaction) {
      var _reaction$user, _reaction$user2, _reaction$user3;
      return {
        alignment: 'left',
        id: (_reaction$user = reaction.user) == null ? void 0 : _reaction$user.id,
        image: (_reaction$user2 = reaction.user) == null ? void 0 : _reaction$user2.image,
        name: (_reaction$user3 = reaction.user) == null ? void 0 : _reaction$user3.name,
        type: reaction.type
      };
    });
  }, [propReactions, fetchedReactions]);
  var _useTheme = (0, _ThemeContext.useTheme)(),
    _useTheme$theme = _useTheme.theme,
    _useTheme$theme$color = _useTheme$theme.colors,
    black = _useTheme$theme$color.black,
    white = _useTheme$theme$color.white,
    _useTheme$theme$overl = _useTheme$theme.overlay,
    overlayPadding = _useTheme$theme$overl.padding,
    _useTheme$theme$overl2 = _useTheme$theme$overl.reactions,
    avatarContainer = _useTheme$theme$overl2.avatarContainer,
    avatarSize = _useTheme$theme$overl2.avatarSize,
    container = _useTheme$theme$overl2.container,
    flatListContainer = _useTheme$theme$overl2.flatListContainer,
    titleStyle = _useTheme$theme$overl2.title;
  var width = (0, _reactNative.useWindowDimensions)().width;
  var supportedReactionTypes = supportedReactions.map(function (supportedReaction) {
    return supportedReaction.type;
  });
  var filteredReactions = reactions.filter(function (reaction) {
    return supportedReactionTypes.includes(reaction.type);
  });
  var numColumns = Math.floor((width - overlayPadding * 2 - ((Number(flatListContainer.paddingHorizontal || 0) || styles.flatListContainer.paddingHorizontal) + (Number(avatarContainer.padding || 0) || styles.avatarContainer.padding)) * 2) / (avatarSize + (Number(avatarContainer.padding || 0) || styles.avatarContainer.padding) * 2));
  var renderItem = function renderItem(_ref) {
    var item = _ref.item;
    return (0, _jsxRuntime.jsx)(_OverlayReactionsItem.OverlayReactionsItem, {
      OverlayReactionsAvatar: OverlayReactionsAvatar,
      reaction: item,
      supportedReactions: supportedReactions
    });
  };
  var showScreenStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function () {
    return {
      transform: [{
        translateY: (0, _reactNativeReanimated.interpolate)(showScreen.value, [0, 1], [-layoutHeight.value / 2, 0])
      }, {
        translateX: (0, _reactNativeReanimated.interpolate)(showScreen.value, [0, 1], [overlayAlignment === 'left' ? -layoutWidth.value / 2 : layoutWidth.value / 2, 0])
      }, {
        scale: showScreen.value
      }]
    };
  }, [overlayAlignment]);
  return (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: (0, _jsxRuntime.jsxs)(_reactNativeReanimated["default"].View, {
      onLayout: function onLayout(_ref2) {
        var layout = _ref2.nativeEvent.layout;
        layoutWidth.value = layout.width;
        layoutHeight.value = layout.height;
      },
      style: [styles.container, {
        backgroundColor: white,
        opacity: itemHeight ? 1 : 0
      }, container, showScreenStyle],
      children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.title, {
          color: black
        }, titleStyle],
        children: title
      }), !loading && (0, _jsxRuntime.jsx)(_reactNativeGestureHandler.FlatList, {
        contentContainerStyle: styles.flatListContentContainer,
        data: filteredReactions,
        keyExtractor: function keyExtractor(_ref3, index) {
          var id = _ref3.id,
            name = _ref3.name;
          return "".concat(name).concat(id, "_").concat(index);
        },
        numColumns: numColumns,
        onEndReached: loadNextPage,
        renderItem: renderItem,
        scrollEnabled: filteredReactions.length / numColumns > 1,
        style: [styles.flatListContainer, flatListContainer, {
          maxHeight: itemHeight + (filteredReactions.length / numColumns > 1 ? itemHeight / 4 : 8)
        }]
      }, numColumns), !loading && (0, _jsxRuntime.jsx)(_reactNative.View, {
        onLayout: function onLayout(_ref4) {
          var layout = _ref4.nativeEvent.layout;
          setItemHeight(layout.height);
        },
        style: [styles.unseenItemContainer, styles.flatListContentContainer],
        children: renderItem({
          item: filteredReactions[0]
        })
      })]
    })
  });
};
exports.OverlayReactions = OverlayReactions;
OverlayReactions.displayName = 'OverlayReactions{overlay{reactions}}';
//# sourceMappingURL=OverlayReactions.js.map