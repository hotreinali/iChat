var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppSettings = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _useIsMountedRef = require("../../../hooks/useIsMountedRef");
var dbApi = _interopRequireWildcard(require("../../../store/apis"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var useAppSettings = function useAppSettings(client, isOnline, enableOfflineSupport, initialisedDatabase) {
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    appSettings = _useState2[0],
    setAppSettings = _useState2[1];
  var isMounted = (0, _useIsMountedRef.useIsMountedRef)();
  (0, _react.useEffect)(function () {
    var enforceAppSettingsWithoutOfflineSupport = function () {
      var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
        var _appSettings;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return client.getAppSettings();
            case 3:
              _appSettings = _context.sent;
              if (isMounted.current) {
                setAppSettings(_appSettings);
              }
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              if (_context.t0 instanceof Error) {
                console.error("An error occurred while getting app settings: ".concat(_context.t0));
              }
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      return function enforceAppSettingsWithoutOfflineSupport() {
        return _ref.apply(this, arguments);
      };
    }();
    var enforceAppSettingsWithOfflineSupport = function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
        var _appSettings2, _appSettings3;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (client.userID) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              if (isOnline) {
                _context2.next = 6;
                break;
              }
              _appSettings2 = dbApi.getAppSettings({
                currentUserId: client.userID
              });
              setAppSettings(_appSettings2);
              return _context2.abrupt("return");
            case 6:
              _context2.prev = 6;
              _context2.next = 9;
              return client.getAppSettings();
            case 9:
              _appSettings3 = _context2.sent;
              if (isMounted.current) {
                setAppSettings(_appSettings3);
                dbApi.upsertAppSettings({
                  appSettings: _appSettings3,
                  currentUserId: client.userID
                });
              }
              _context2.next = 16;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](6);
              if (_context2.t0 instanceof Error) {
                console.error("An error occurred while getting app settings: ".concat(_context2.t0));
              }
            case 16:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[6, 13]]);
      }));
      return function enforceAppSettingsWithOfflineSupport() {
        return _ref2.apply(this, arguments);
      };
    }();
    function enforeAppSettings() {
      return _enforeAppSettings.apply(this, arguments);
    }
    function _enforeAppSettings() {
      _enforeAppSettings = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!enableOfflineSupport) {
                _context3.next = 5;
                break;
              }
              _context3.next = 3;
              return enforceAppSettingsWithOfflineSupport();
            case 3:
              _context3.next = 7;
              break;
            case 5:
              _context3.next = 7;
              return enforceAppSettingsWithoutOfflineSupport();
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return _enforeAppSettings.apply(this, arguments);
    }
    enforeAppSettings();
  }, [client, isOnline, initialisedDatabase]);
  return appSettings;
};
exports.useAppSettings = useAppSettings;
//# sourceMappingURL=useAppSettings.js.map