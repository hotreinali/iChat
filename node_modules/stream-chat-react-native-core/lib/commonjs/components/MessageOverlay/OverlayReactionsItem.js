var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayReactionsItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _ChatContext = require("../../contexts/chatContext/ChatContext");
var _ThemeContext = require("../../contexts/themeContext/ThemeContext");
var _icons = require("../../icons");
var _jsxRuntime = require("react/jsx-runtime");
var _this = this,
  _jsxFileName = "/home/runner/work/stream-chat-react-native/stream-chat-react-native/package/src/components/MessageOverlay/OverlayReactionsItem.tsx";
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ReactionIcon = function ReactionIcon(_ref) {
  var _supportedReactions$f;
  var pathFill = _ref.pathFill,
    size = _ref.size,
    supportedReactions = _ref.supportedReactions,
    type = _ref.type;
  var Icon = ((_supportedReactions$f = supportedReactions.find(function (reaction) {
    return reaction.type === type;
  })) == null ? void 0 : _supportedReactions$f.Icon) || _icons.Unknown;
  return (0, _jsxRuntime.jsx)(Icon, {
    height: size,
    pathFill: pathFill,
    width: size
  });
};
var OverlayReactionsItem = function OverlayReactionsItem(_ref2) {
  var OverlayReactionsAvatar = _ref2.OverlayReactionsAvatar,
    reaction = _ref2.reaction,
    supportedReactions = _ref2.supportedReactions;
  var id = reaction.id,
    name = reaction.name,
    type = reaction.type;
  var _useTheme = (0, _ThemeContext.useTheme)(),
    _useTheme$theme = _useTheme.theme,
    _useTheme$theme$color = _useTheme$theme.colors,
    accent_blue = _useTheme$theme$color.accent_blue,
    black = _useTheme$theme$color.black,
    grey_gainsboro = _useTheme$theme$color.grey_gainsboro,
    white = _useTheme$theme$color.white,
    _useTheme$theme$overl = _useTheme$theme.overlay.reactions,
    avatarContainer = _useTheme$theme$overl.avatarContainer,
    avatarName = _useTheme$theme$overl.avatarName,
    avatarSize = _useTheme$theme$overl.avatarSize,
    radius = _useTheme$theme$overl.radius,
    reactionBubble = _useTheme$theme$overl.reactionBubble,
    reactionBubbleBackground = _useTheme$theme$overl.reactionBubbleBackground,
    reactionBubbleBorderRadius = _useTheme$theme$overl.reactionBubbleBorderRadius;
  var _useChatContext = (0, _ChatContext.useChatContext)(),
    client = _useChatContext.client;
  var alignment = client.userID && client.userID === id ? 'right' : 'left';
  var x = avatarSize / 2 - avatarSize / (radius * 4) * (alignment === 'left' ? 1 : -1);
  var y = avatarSize - radius;
  var left = alignment === 'left' ? x - (Number(reactionBubbleBackground.width || 0) || styles.reactionBubbleBackground.width) + radius : x - radius;
  var top = y - radius - (Number(reactionBubbleBackground.height || 0) || styles.reactionBubbleBackground.height);
  return (0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.avatarContainer, avatarContainer],
    children: [(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.avatarInnerContainer,
      children: [(0, _jsxRuntime.jsx)(OverlayReactionsAvatar, {
        reaction: reaction,
        size: avatarSize
      }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: [_reactNative.StyleSheet.absoluteFill],
        children: [(0, _jsxRuntime.jsxs)(_reactNativeSvg["default"], {
          children: [(0, _jsxRuntime.jsx)(_reactNativeSvg.Circle, {
            cx: x - (radius * 2 - radius / 4) * (alignment === 'left' ? 1 : -1),
            cy: y - radius * 2 - radius / 4,
            fill: alignment === 'left' ? grey_gainsboro : white,
            r: radius * 2,
            stroke: alignment === 'left' ? white : grey_gainsboro,
            strokeWidth: radius / 2
          }), (0, _jsxRuntime.jsx)(_reactNativeSvg.Circle, {
            cx: x,
            cy: y,
            fill: alignment === 'left' ? grey_gainsboro : white,
            r: radius,
            stroke: alignment === 'left' ? white : grey_gainsboro,
            strokeWidth: radius / 2
          })]
        }), (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.reactionBubbleBackground, {
            backgroundColor: alignment === 'left' ? grey_gainsboro : white,
            borderColor: alignment === 'left' ? white : grey_gainsboro,
            borderWidth: radius / 2,
            left: left,
            top: top
          }, reactionBubbleBackground]
        }), (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [_reactNative.StyleSheet.absoluteFill],
          children: (0, _jsxRuntime.jsx)(_reactNativeSvg["default"], {
            children: (0, _jsxRuntime.jsx)(_reactNativeSvg.Circle, {
              cx: x - (radius * 2 - radius / 4) * (alignment === 'left' ? 1 : -1),
              cy: y - radius * 2 - radius / 4,
              fill: alignment === 'left' ? grey_gainsboro : white,
              r: radius * 2 - radius / 2
            })
          })
        }), (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.reactionBubble, {
            backgroundColor: alignment === 'left' ? grey_gainsboro : white,
            height: (reactionBubbleBorderRadius || styles.reactionBubble.borderRadius) - radius / 2,
            left: left,
            top: top,
            width: (reactionBubbleBorderRadius || styles.reactionBubble.borderRadius) - radius / 2
          }, reactionBubble],
          children: (0, _jsxRuntime.jsx)(ReactionIcon, {
            pathFill: accent_blue,
            size: (reactionBubbleBorderRadius || styles.reactionBubble.borderRadius) / 2,
            supportedReactions: supportedReactions,
            type: type
          })
        })]
      })]
    }), (0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.avatarNameContainer,
      children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
        numberOfLines: 2,
        style: [styles.avatarName, {
          color: black
        }, avatarName],
        children: name
      })
    })]
  });
};
exports.OverlayReactionsItem = OverlayReactionsItem;
var styles = _reactNative.StyleSheet.create({
  avatarContainer: {
    padding: 8
  },
  avatarInnerContainer: {
    alignSelf: 'center'
  },
  avatarName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    paddingTop: 6,
    textAlign: 'center'
  },
  avatarNameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1
  },
  reactionBubble: {
    alignItems: 'center',
    borderRadius: 24,
    justifyContent: 'center',
    position: 'absolute'
  },
  reactionBubbleBackground: {
    borderRadius: 24,
    height: 24,
    position: 'absolute',
    width: 24
  }
});
//# sourceMappingURL=OverlayReactionsItem.js.map