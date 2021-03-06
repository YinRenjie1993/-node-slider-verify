"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer");
var fs = require("fs");
var canvas_1 = require("canvas");
var path = require("path");
var util_1 = require("./util");
function timeout(delay) {
    if (delay === void 0) { delay = 1000; }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            try {
                resolve(1);
            }
            catch (e) {
                reject(0);
            }
        }, delay);
    });
}
var SliderVerify = /** @class */ (function () {
    function SliderVerify(width, height) {
        this.width = width;
        this.height = height;
    }
    SliderVerify.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page, frame, childFrame, dragButton, url, distance, e, box, idx, axleX, axleY, simulateSliderMove;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, puppeteer.launch({
                            headless: false
                        })];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.pages()];
                    case 2:
                        page = (_a.sent())[0];
                        return [4 /*yield*/, page.goto("http://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number", {
                                waitUntil: "networkidle0"
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, page.click(".clear-inputs")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, page.type(".token-input", "764449660978", { delay: 10 })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, page.click("#queryBill")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, page.waitForSelector("#tcaptcha_popup")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, page.mainFrame()];
                    case 8:
                        frame = _a.sent();
                        return [4 /*yield*/, frame.childFrames()];
                    case 9:
                        childFrame = (_a.sent())[0];
                        dragButton = "#tcaptcha_drag_button";
                        return [4 /*yield*/, childFrame.waitForSelector(dragButton)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, childFrame.waitFor(1000)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, childFrame.evaluate(function () {
                                return document.querySelector("#slideBkg").getAttribute("src");
                            })];
                    case 12:
                        url = _a.sent();
                        url = "https://captcha.guard.qcloud.com" + url;
                        return [4 /*yield*/, util_1.downloadImage(url)];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.getSliderDistance()];
                    case 14:
                        distance = (_a.sent()) - 78;
                        return [4 /*yield*/, childFrame.$(dragButton)];
                    case 15:
                        e = _a.sent();
                        return [4 /*yield*/, e.boundingBox()];
                    case 16:
                        box = _a.sent();
                        return [4 /*yield*/, page.waitFor(1000)];
                    case 17:
                        _a.sent();
                        idx = 0;
                        axleX = Math.floor(box.x + box.width / 2);
                        axleY = Math.floor(box.y + box.height / 2);
                        simulateSliderMove = function (step) { return __awaiter(_this, void 0, void 0, function () {
                            var text, url_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, page.mouse.move(axleX, axleY)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, page.mouse.down()];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, timeout(150)];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, page.mouse.move(step / 2, axleY, { steps: 20 })];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, timeout(200)];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, page.mouse.move(400, axleY, { steps: 20 })];
                                    case 6:
                                        _a.sent();
                                        return [4 /*yield*/, timeout(100)];
                                    case 7:
                                        _a.sent();
                                        return [4 /*yield*/, page.mouse.move(step, axleY, { steps: 20 })];
                                    case 8:
                                        _a.sent();
                                        return [4 /*yield*/, page.waitFor(150)];
                                    case 9:
                                        _a.sent();
                                        return [4 /*yield*/, page.mouse.up()];
                                    case 10:
                                        _a.sent();
                                        return [4 /*yield*/, timeout(500)];
                                    case 11:
                                        _a.sent();
                                        return [4 /*yield*/, childFrame.evaluate(function () {
                                                var tcaptcha = document.querySelector(".tcaptcha-status");
                                                return tcaptcha.innerText;
                                            })];
                                    case 12:
                                        text = _a.sent();
                                        if (!text) return [3 /*break*/, 22];
                                        if (!(idx === 1)) return [3 /*break*/, 19];
                                        idx = 0;
                                        return [4 /*yield*/, childFrame.click(".tcaptcha-action--refresh")];
                                    case 13:
                                        _a.sent();
                                        console.log("-------------- 刷新验证码 -------------");
                                        return [4 /*yield*/, timeout(500)];
                                    case 14:
                                        _a.sent();
                                        return [4 /*yield*/, childFrame.evaluate(function () {
                                                return document.querySelector("#slideBkg").getAttribute("src");
                                            })];
                                    case 15:
                                        url_1 = _a.sent();
                                        url_1 = "https://captcha.guard.qcloud.com" + url_1;
                                        return [4 /*yield*/, util_1.downloadImage(url_1)];
                                    case 16:
                                        _a.sent();
                                        return [4 /*yield*/, this.getSliderDistance()];
                                    case 17:
                                        distance = (_a.sent()) - 78;
                                        return [4 /*yield*/, simulateSliderMove(distance)];
                                    case 18:
                                        _a.sent();
                                        return [3 /*break*/, 22];
                                    case 19:
                                        idx += 1;
                                        return [4 /*yield*/, timeout()];
                                    case 20:
                                        _a.sent();
                                        return [4 /*yield*/, simulateSliderMove(distance - 10)];
                                    case 21:
                                        _a.sent();
                                        _a.label = 22;
                                    case 22: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, simulateSliderMove(distance)];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, page.on("response", function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var url, status, data;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            url = res.url();
                                            status = res.status();
                                            if (!(url.includes("http://www.sf-express.com/sf-service-owf-web/service/bills") &&
                                                status === 200)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, res.json()];
                                        case 1:
                                            data = _a.sent();
                                            console.log(data);
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 19:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SliderVerify.prototype.getSliderDistance = function () {
        var _a = this, width = _a.width, height = _a.height;
        var buf = fs.readFileSync(path.resolve(__dirname, "../test/code.jpeg"));
        var canvas = canvas_1.createCanvas(width, height);
        var ctx = canvas.getContext("2d");
        var img = new canvas_1.Image();
        img.src = buf;
        ctx.drawImage(img, 0, 0, width, height);
        var img_data = ctx.getImageData(0, 0, width, height).data;
        var arr = [];
        var minHeight = Math.floor(height / 4);
        var maxHeight = minHeight * 3;
        var minWidth = Math.floor(width / 2);
        for (var i = minHeight; i < maxHeight; i++) {
            for (var j = width; j > minWidth; j--) {
                var p = width * i + j;
                p = p << 2;
                if (255 - img_data[p] < 10 &&
                    255 - img_data[p - 1] < 10 &&
                    255 - img_data[p + 1] < 10) {
                    arr.push(j);
                    break;
                }
            }
        }
        return Math.max.apply(Math, arr);
    };
    return SliderVerify;
}());
var sliderVerify = new SliderVerify(680, 390);
sliderVerify.init();
// const res = sliderVerify.getSliderDistance();
// console.log(res);
//# sourceMappingURL=index.js.map