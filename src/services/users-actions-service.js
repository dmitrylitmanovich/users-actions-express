"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// @ts-ignore
var Action_1 = require("../models/Action");
var router = express.Router();
// Create a New Action
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, userId, _c, actionType, result, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                _a = req.body, _b = _a.userId, userId = _b === void 0 ? '' : _b, _c = _a.actionType, actionType = _c === void 0 ? '' : _c;
                return [4 /*yield*/, Action_1.default.create({
                        user_id: userId,
                        actiontype: actionType,
                    })];
            case 1:
                result = _d.sent();
                console.log('Created Action');
                res.status(201).json({
                    message: 'Action created successfully!',
                    user: result,
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _d.sent();
                console.error(err_1);
                res.status(500).send('Error creating the action');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET All Actions
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var actions, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Action_1.default.findAll()];
            case 1:
                actions = _a.sent();
                res.status(200).json({ actions: actions });
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Error fetching user actions');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET an Action for a User
router.get('/:userId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, page, pageSize, limit, offset, whereClause, actions, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                page = req.query.page;
                pageSize = req.query.pageSize;
                limit = pageSize ? parseInt(pageSize.toString(), 10) : 10;
                offset = page ? (parseInt(page.toString(), 10) - 1) * limit : 0;
                whereClause = {
                    user_id: userId,
                };
                return [4 /*yield*/, Action_1.default.findAll({
                        where: whereClause,
                        order: [['timestamp', 'DESC']],
                        limit: limit,
                        offset: offset,
                    })];
            case 1:
                actions = _a.sent();
                res.status(200).json({ actions: actions });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send('Error fetching user actions');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
