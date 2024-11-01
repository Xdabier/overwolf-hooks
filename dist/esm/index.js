import { useState, useCallback, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Pauses the execution for the specified number of milliseconds.
 * @param ms The number of milliseconds to sleep.
 * @example await sleep(1000);
 * @returns A promise that resolves after the specified delay.
 */
var sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};

var log = function (message, component, method) {
    console.info("%c[\uD83D\uDC3A overwolf-hooks][\uD83E\uDDF0 ".concat(component, "][\uD83D\uDD27 ").concat(method, "][\uD83D\uDCC3 ").concat(message, " ]"), "background: #0a0a0a; color: #d4d4d8; padding: 2px 0; border-radius: 2px; font-weight: bold; border: 1px solid #27272a;");
};
var error = function (message, component, method) {
    var errorMessage = "[\uD83D\uDC3A overwolf-hooks][\uD83E\uDDF0 ".concat(component, "][\uD83D\uDD27 ").concat(method, "][\uD83D\uDCC3 ").concat(message, " ]");
    return errorMessage;
};

var getInfo = function () {
    return new Promise(function (resolve) {
        overwolf.games.events.getInfo(function (info) { return resolve(info); });
    });
};
function useGameEventProvider(delegate, requiredFeatures, featureRetries, displayLog) {
    var _this = this;
    if (featureRetries === void 0) { featureRetries = 10; }
    if (displayLog === void 0) { displayLog = false; }
    var _a = useState(false), started = _a[0], setStarted = _a[1];
    var onInfoUpdates = useCallback(function (info) {
        delegate.onInfoUpdates(info);
        if (displayLog) {
            log(JSON.stringify(info, null, 2), "useGameEventProvider.ts", "onInfoUpdates() -> delegate");
        }
    }, [delegate, displayLog]);
    var onNewEvents = useCallback(function (events) {
        delegate.onNewEvents(events);
        if (displayLog) {
            log(JSON.stringify(events, null, 2), "useGameEventProvider.ts", "onNewEvents() -> delegate");
        }
    }, [delegate, displayLog]);
    var unRegisterEvents = function () {
        overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates);
        overwolf.games.events.onNewEvents.removeListener(onNewEvents);
    };
    var registerEvents = function () {
        unRegisterEvents();
        overwolf.games.events.onInfoUpdates2.addListener(onInfoUpdates);
        overwolf.games.events.onNewEvents.addListener(onNewEvents);
    };
    var setRequiredFeatures = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var tries, result, isSupported;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!requiredFeatures.length)
                        return [2 /*return*/, setStarted(false)];
                    tries = 1;
                    result = {
                        success: false,
                    };
                    _a.label = 1;
                case 1:
                    if (!(tries <= featureRetries)) return [3 /*break*/, 4];
                    log("try ".concat(tries, " of ").concat(featureRetries), "useGameEventProvider.ts", "setRequiredFeatures() -> callback -> try");
                    return [4 /*yield*/, new Promise(function (resolve) {
                            overwolf.games.events.setRequiredFeatures(requiredFeatures, function (requiredResult) { return resolve(requiredResult); });
                        })];
                case 2:
                    result = _a.sent();
                    if (result.success) {
                        log(JSON.stringify(result, null, 2), "useGameEventProvider.ts", "setRequiredFeatures() -> callback -> success");
                        isSupported = Array.isArray(result.supportedFeatures) &&
                            result.supportedFeatures.length > 0;
                        setStarted(isSupported);
                        return [2 /*return*/, void 0];
                    }
                    return [4 /*yield*/, sleep(3000)];
                case 3:
                    _a.sent();
                    tries++;
                    return [3 /*break*/, 1];
                case 4:
                    log(JSON.stringify(result, null, 2), "useGameEventProvider.ts", "setRequiredFeatures() -> callback -> failure");
                    setStarted(false);
                    return [2 /*return*/, void 0];
            }
        });
    }); }, [requiredFeatures]);
    var start = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, res, success;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (started)
                        return [2 /*return*/];
                    registerEvents();
                    return [4 /*yield*/, setRequiredFeatures()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, getInfo()];
                case 2:
                    _a = _b.sent(), res = _a.res, success = _a.success;
                    if (res && success) {
                        onInfoUpdates({ info: res });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [setRequiredFeatures, onInfoUpdates, started, registerEvents]);
    var stop = useCallback(function () {
        setStarted(false);
        unRegisterEvents();
    }, [unRegisterEvents]);
    // useEffect(() => {
    //   start();
    //   return () => {
    //     stop();
    //   };
    // }, [start, stop]);
    return { started: started, start: start, stop: stop };
}

var useRunningGame = function (shouldDisplayLog) {
    if (shouldDisplayLog === void 0) { shouldDisplayLog = false; }
    var _a = useState(null), game = _a[0], setGame = _a[1];
    function onGameInfoUpdated(payload) {
        var _a, _b, _c, _d;
        var gameRunning = {
            gameRunning: (_b = (_a = payload === null || payload === void 0 ? void 0 : payload.gameInfo) === null || _a === void 0 ? void 0 : _a.isRunning) !== null && _b !== void 0 ? _b : false,
            id: Math.round((((_c = payload === null || payload === void 0 ? void 0 : payload.gameInfo) === null || _c === void 0 ? void 0 : _c.id) || 0) / 10),
            title: ((_d = payload === null || payload === void 0 ? void 0 : payload.gameInfo) === null || _d === void 0 ? void 0 : _d.title) || "",
            gameChanged: (payload === null || payload === void 0 ? void 0 : payload.gameChanged) || false,
            isInFocus: (payload === null || payload === void 0 ? void 0 : payload.focusChanged) || false,
        };
        setGame(gameRunning);
        if (shouldDisplayLog) {
            log(JSON.stringify(gameRunning, null, 2), "@overwolf-hooks/hooks/useRunningGame.ts", "onGameInfoUpdated");
        }
    }
    function onGetRunningGameInfo(payload) {
        if (shouldDisplayLog) {
            log(JSON.stringify(payload, null, 2), "@overwolf-hooks/hooks/useRunningGame.ts", "onGetRunningGameInfo");
        }
        setGame(function (currentGame) {
            var _a, _b;
            return ({
                gameChanged: (currentGame === null || currentGame === void 0 ? void 0 : currentGame.gameChanged) || false,
                id: Math.round(((payload === null || payload === void 0 ? void 0 : payload.id) || 0) / 10),
                title: (payload === null || payload === void 0 ? void 0 : payload.title) || "",
                gameRunning: (_a = payload === null || payload === void 0 ? void 0 : payload.isRunning) !== null && _a !== void 0 ? _a : false,
                isInFocus: (_b = payload === null || payload === void 0 ? void 0 : payload.isInFocus) !== null && _b !== void 0 ? _b : false,
            });
        });
    }
    useEffect(function () {
        overwolf.games.getRunningGameInfo(onGetRunningGameInfo);
        overwolf.games.onGameInfoUpdated.removeListener(onGameInfoUpdated);
        overwolf.games.onGameInfoUpdated.addListener(onGameInfoUpdated);
        return function () {
            overwolf.games.onGameInfoUpdated.removeListener(onGameInfoUpdated);
        };
    }, []);
    return game;
};

function obtainWindow(name) {
    return new Promise(function (resolve, reject) {
        overwolf.windows.obtainDeclaredWindow(name, function (response) {
            if (!response.success)
                reject(response);
            resolve(response.window);
        });
    });
}
function standardWindowBehavior(id, behavior) {
    return new Promise(function (resolve, reject) {
        overwolf.windows[behavior](id, function (result) {
            if (result.success)
                resolve(result);
            else
                reject(result);
        });
    });
}

var actions = [
    "minimize",
    "maximize",
    "restore",
    "close",
    "bringToFront",
];
var useWindow = function (name, shouldDisplayLog, listenToWindowStateChanges) {
    if (shouldDisplayLog === void 0) { shouldDisplayLog = false; }
    if (listenToWindowStateChanges === void 0) { listenToWindowStateChanges = false; }
    var _a = useState(), owWindow = _a[0], setOwWindow = _a[1];
    var _b = useState(), windowState = _b[0], setWindowState = _b[1];
    var bindWindowBehavior = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedWindowInfo_1, windowInfo_1, e_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (process.env.NODE_ENV === "development") {
                        log("[DEV MODE]", "@overwolf-hooks/hooks/useWindow/wrappers.ts", "standardWindowBehavior");
                        return [2 /*return*/];
                    }
                    if (!name || !name.length) {
                        log("name is required, maybe its first render?", "@overwolf-hooks/hooks/useWindow.ts", "bindWindowBehavior");
                        return [2 /*return*/];
                    }
                    updatedWindowInfo_1 = actions.reduce(function (currentAction, action) {
                        currentAction[action] = function () { return __awaiter(void 0, void 0, void 0, function () {
                            var actionResult;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, obtainWindow(name)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, standardWindowBehavior(name, action)];
                                    case 2:
                                        actionResult = _a.sent();
                                        if (shouldDisplayLog) {
                                            log(JSON.stringify(actionResult, null, 2), "@overwolf-hooks/hooks/useWindow.ts", "bindWindowBehavior -> ".concat(action));
                                        }
                                        return [2 /*return*/, actionResult];
                                }
                            });
                        }); };
                        return currentAction;
                    }, {});
                    return [4 /*yield*/, obtainWindow(name)];
                case 1:
                    windowInfo_1 = _a.sent();
                    if (!windowInfo_1) {
                        throw new Error("Failed to obtain window ".concat(name));
                    }
                    setOwWindow(function (prev) { return (__assign(__assign(__assign({}, (prev || {})), windowInfo_1), updatedWindowInfo_1)); });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    errorMessage = error(JSON.stringify(e_1, null, 2), "@overwolf-hooks/hooks/useWindow.ts", "bindWindowBehavior");
                    throw new Error(errorMessage);
                case 3: return [2 /*return*/];
            }
        });
    }); }, [shouldDisplayLog, name]);
    useEffect(function () {
        var bindWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bindWindowBehavior()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        bindWindow();
    }, [bindWindowBehavior]);
    useEffect(function () {
        var updateWindowStates = function (windowInfo) {
            if (windowInfo.window_name === name) {
                setWindowState(windowInfo);
            }
            if (shouldDisplayLog) {
                log(JSON.stringify(windowInfo, null, 2), "@overwolf-hooks/hooks/useWindow.ts", "updateWindowStates");
            }
        };
        if (listenToWindowStateChanges) {
            overwolf.windows.onStateChanged.removeListener(updateWindowStates);
            overwolf.windows.onStateChanged.addListener(updateWindowStates);
        }
        return function () {
            if (listenToWindowStateChanges)
                overwolf.windows.onStateChanged.removeListener(updateWindowStates);
        };
    }, [shouldDisplayLog, listenToWindowStateChanges, name]);
    return [owWindow, windowState, bindWindowBehavior];
};

var SIGNIFICANT_MOUSE_MOVE_THRESHOLD = 1;
var useDrag = function (currentWindowID, shouldDisplayLog) {
    if (shouldDisplayLog === void 0) { shouldDisplayLog = false; }
    var _a = useState(currentWindowID), owWindow = _a[0], setOwWindow = _a[1];
    var _b = useState(null), initialMousePosition = _b[0], setMousePosition = _b[1];
    var _c = useState(false), isMouseDown = _c[0], setMouseDown = _c[1];
    function onDragStart(_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        setMouseDown(true);
        setMousePosition({
            x: clientX,
            y: clientY,
        });
    }
    function isSignificantMouseMove(_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        if (!initialMousePosition)
            return false;
        var diffX = Math.abs(clientX - initialMousePosition.x);
        var diffY = Math.abs(clientY - initialMousePosition.y);
        var isSignificant = diffX > SIGNIFICANT_MOUSE_MOVE_THRESHOLD ||
            diffY > SIGNIFICANT_MOUSE_MOVE_THRESHOLD;
        return isSignificant;
    }
    function onMouseMove(event) {
        if (!isMouseDown || !isSignificantMouseMove(event))
            return;
        setMouseDown(false);
        if (owWindow) {
            overwolf.windows.dragMove(owWindow);
        }
        if (shouldDisplayLog) {
            log(JSON.stringify({ clientX: event.clientX, clientY: event.clientY }, null, 2), "@overwolf-hooks/hooks/useDrag.ts", "onMouseMove");
        }
    }
    var setCurrentWindowID = useCallback(function (id) {
        setOwWindow(id);
    }, []);
    return { setCurrentWindowID: setCurrentWindowID, onDragStart: onDragStart, onMouseMove: onMouseMove };
};

export { useDrag, useGameEventProvider, useRunningGame, useWindow };
