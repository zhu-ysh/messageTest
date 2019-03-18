/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.InstantMessageInfo = (function() {

    /**
     * Properties of an InstantMessageInfo.
     * @exports IInstantMessageInfo
     * @interface IInstantMessageInfo
     * @property {string|null} [MessageId] InstantMessageInfo MessageId
     * @property {string|null} [SenderCode] InstantMessageInfo SenderCode
     * @property {string|null} [SenderName] InstantMessageInfo SenderName
     * @property {string|null} [SenderAvatar] InstantMessageInfo SenderAvatar
     * @property {string|null} [ReceiverCode] InstantMessageInfo ReceiverCode
     * @property {string|null} [ReceiverName] InstantMessageInfo ReceiverName
     * @property {string|null} [ReceiverAvatar] InstantMessageInfo ReceiverAvatar
     * @property {string|null} [ReceiverType] InstantMessageInfo ReceiverType
     * @property {string|null} [ContentType] InstantMessageInfo ContentType
     * @property {string|null} [StringContent] InstantMessageInfo StringContent
     * @property {Uint8Array|null} [BytesContent] InstantMessageInfo BytesContent
     * @property {number|Long|null} [MessageTime] InstantMessageInfo MessageTime
     * @property {string|null} [FileName] InstantMessageInfo FileName
     * @property {string|null} [OldMessageId] InstantMessageInfo OldMessageId
     * @property {string|null} [ChatCode] InstantMessageInfo ChatCode
     * @property {string|null} [ChatName] InstantMessageInfo ChatName
     * @property {string|null} [ChatAvatar] InstantMessageInfo ChatAvatar
     */

    /**
     * Constructs a new InstantMessageInfo.
     * @exports InstantMessageInfo
     * @classdesc Represents an InstantMessageInfo.
     * @implements IInstantMessageInfo
     * @constructor
     * @param {IInstantMessageInfo=} [properties] Properties to set
     */
    function InstantMessageInfo(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * InstantMessageInfo MessageId.
     * @member {string} MessageId
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.MessageId = "";

    /**
     * InstantMessageInfo SenderCode.
     * @member {string} SenderCode
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.SenderCode = "";

    /**
     * InstantMessageInfo SenderName.
     * @member {string} SenderName
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.SenderName = "";

    /**
     * InstantMessageInfo SenderAvatar.
     * @member {string} SenderAvatar
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.SenderAvatar = "";

    /**
     * InstantMessageInfo ReceiverCode.
     * @member {string} ReceiverCode
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.ReceiverCode = "";

    /**
     * InstantMessageInfo ReceiverName.
     * @member {string} ReceiverName
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.ReceiverName = "";

    /**
     * InstantMessageInfo ReceiverAvatar.
     * @member {string} ReceiverAvatar
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.ReceiverAvatar = "";

    /**
     * InstantMessageInfo ReceiverType.
     * @member {string} ReceiverType
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.ReceiverType = "";

    /**
     * InstantMessageInfo ContentType.
     * @member {string} ContentType
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.ContentType = "";

    /**
     * InstantMessageInfo StringContent.
     * @member {string} StringContent
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.StringContent = "";

    /**
     * InstantMessageInfo BytesContent.
     * @member {Uint8Array} BytesContent
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.BytesContent = $util.newBuffer([]);

    /**
     * InstantMessageInfo MessageTime.
     * @member {number|Long} MessageTime
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.MessageTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * InstantMessageInfo FileName.
     * @member {string} FileName
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.FileName = "";

    /**
     * InstantMessageInfo OldMessageId.
     * @member {string} OldMessageId
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.OldMessageId = "";

    /**
     * InstantMessageInfo ChatCode.
     * @member {string} ChatCode
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.ChatCode = "";

    /**
     * InstantMessageInfo ChatName.
     * @member {string} ChatName
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.ChatName = "";

    /**
     * InstantMessageInfo ChatAvatar.
     * @member {string} ChatAvatar
     * @memberof InstantMessageInfo
     * @instance
     */
    InstantMessageInfo.prototype.ChatAvatar = "";

    /**
     * Creates a new InstantMessageInfo instance using the specified properties.
     * @function create
     * @memberof InstantMessageInfo
     * @static
     * @param {IInstantMessageInfo=} [properties] Properties to set
     * @returns {InstantMessageInfo} InstantMessageInfo instance
     */
    InstantMessageInfo.create = function create(properties) {
        return new InstantMessageInfo(properties);
    };

    /**
     * Encodes the specified InstantMessageInfo message. Does not implicitly {@link InstantMessageInfo.verify|verify} messages.
     * @function encode
     * @memberof InstantMessageInfo
     * @static
     * @param {IInstantMessageInfo} message InstantMessageInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InstantMessageInfo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.MessageId != null && message.hasOwnProperty("MessageId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.MessageId);
        if (message.SenderCode != null && message.hasOwnProperty("SenderCode"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.SenderCode);
        if (message.SenderName != null && message.hasOwnProperty("SenderName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.SenderName);
        if (message.SenderAvatar != null && message.hasOwnProperty("SenderAvatar"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.SenderAvatar);
        if (message.ReceiverCode != null && message.hasOwnProperty("ReceiverCode"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.ReceiverCode);
        if (message.ReceiverName != null && message.hasOwnProperty("ReceiverName"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.ReceiverName);
        if (message.ReceiverAvatar != null && message.hasOwnProperty("ReceiverAvatar"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.ReceiverAvatar);
        if (message.ReceiverType != null && message.hasOwnProperty("ReceiverType"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.ReceiverType);
        if (message.ContentType != null && message.hasOwnProperty("ContentType"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.ContentType);
        if (message.StringContent != null && message.hasOwnProperty("StringContent"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.StringContent);
        if (message.BytesContent != null && message.hasOwnProperty("BytesContent"))
            writer.uint32(/* id 11, wireType 2 =*/90).bytes(message.BytesContent);
        if (message.MessageTime != null && message.hasOwnProperty("MessageTime"))
            writer.uint32(/* id 12, wireType 0 =*/96).int64(message.MessageTime);
        if (message.FileName != null && message.hasOwnProperty("FileName"))
            writer.uint32(/* id 13, wireType 2 =*/106).string(message.FileName);
        if (message.OldMessageId != null && message.hasOwnProperty("OldMessageId"))
            writer.uint32(/* id 14, wireType 2 =*/114).string(message.OldMessageId);
        if (message.ChatCode != null && message.hasOwnProperty("ChatCode"))
            writer.uint32(/* id 15, wireType 2 =*/122).string(message.ChatCode);
        if (message.ChatName != null && message.hasOwnProperty("ChatName"))
            writer.uint32(/* id 16, wireType 2 =*/130).string(message.ChatName);
        if (message.ChatAvatar != null && message.hasOwnProperty("ChatAvatar"))
            writer.uint32(/* id 17, wireType 2 =*/138).string(message.ChatAvatar);
        return writer;
    };

    /**
     * Encodes the specified InstantMessageInfo message, length delimited. Does not implicitly {@link InstantMessageInfo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof InstantMessageInfo
     * @static
     * @param {IInstantMessageInfo} message InstantMessageInfo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InstantMessageInfo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an InstantMessageInfo message from the specified reader or buffer.
     * @function decode
     * @memberof InstantMessageInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {InstantMessageInfo} InstantMessageInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InstantMessageInfo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.InstantMessageInfo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.MessageId = reader.string();
                break;
            case 2:
                message.SenderCode = reader.string();
                break;
            case 3:
                message.SenderName = reader.string();
                break;
            case 4:
                message.SenderAvatar = reader.string();
                break;
            case 5:
                message.ReceiverCode = reader.string();
                break;
            case 6:
                message.ReceiverName = reader.string();
                break;
            case 7:
                message.ReceiverAvatar = reader.string();
                break;
            case 8:
                message.ReceiverType = reader.string();
                break;
            case 9:
                message.ContentType = reader.string();
                break;
            case 10:
                message.StringContent = reader.string();
                break;
            case 11:
                message.BytesContent = reader.bytes();
                break;
            case 12:
                message.MessageTime = reader.int64();
                break;
            case 13:
                message.FileName = reader.string();
                break;
            case 14:
                message.OldMessageId = reader.string();
                break;
            case 15:
                message.ChatCode = reader.string();
                break;
            case 16:
                message.ChatName = reader.string();
                break;
            case 17:
                message.ChatAvatar = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an InstantMessageInfo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof InstantMessageInfo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {InstantMessageInfo} InstantMessageInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InstantMessageInfo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an InstantMessageInfo message.
     * @function verify
     * @memberof InstantMessageInfo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    InstantMessageInfo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.MessageId != null && message.hasOwnProperty("MessageId"))
            if (!$util.isString(message.MessageId))
                return "MessageId: string expected";
        if (message.SenderCode != null && message.hasOwnProperty("SenderCode"))
            if (!$util.isString(message.SenderCode))
                return "SenderCode: string expected";
        if (message.SenderName != null && message.hasOwnProperty("SenderName"))
            if (!$util.isString(message.SenderName))
                return "SenderName: string expected";
        if (message.SenderAvatar != null && message.hasOwnProperty("SenderAvatar"))
            if (!$util.isString(message.SenderAvatar))
                return "SenderAvatar: string expected";
        if (message.ReceiverCode != null && message.hasOwnProperty("ReceiverCode"))
            if (!$util.isString(message.ReceiverCode))
                return "ReceiverCode: string expected";
        if (message.ReceiverName != null && message.hasOwnProperty("ReceiverName"))
            if (!$util.isString(message.ReceiverName))
                return "ReceiverName: string expected";
        if (message.ReceiverAvatar != null && message.hasOwnProperty("ReceiverAvatar"))
            if (!$util.isString(message.ReceiverAvatar))
                return "ReceiverAvatar: string expected";
        if (message.ReceiverType != null && message.hasOwnProperty("ReceiverType"))
            if (!$util.isString(message.ReceiverType))
                return "ReceiverType: string expected";
        if (message.ContentType != null && message.hasOwnProperty("ContentType"))
            if (!$util.isString(message.ContentType))
                return "ContentType: string expected";
        if (message.StringContent != null && message.hasOwnProperty("StringContent"))
            if (!$util.isString(message.StringContent))
                return "StringContent: string expected";
        if (message.BytesContent != null && message.hasOwnProperty("BytesContent"))
            if (!(message.BytesContent && typeof message.BytesContent.length === "number" || $util.isString(message.BytesContent)))
                return "BytesContent: buffer expected";
        if (message.MessageTime != null && message.hasOwnProperty("MessageTime"))
            if (!$util.isInteger(message.MessageTime) && !(message.MessageTime && $util.isInteger(message.MessageTime.low) && $util.isInteger(message.MessageTime.high)))
                return "MessageTime: integer|Long expected";
        if (message.FileName != null && message.hasOwnProperty("FileName"))
            if (!$util.isString(message.FileName))
                return "FileName: string expected";
        if (message.OldMessageId != null && message.hasOwnProperty("OldMessageId"))
            if (!$util.isString(message.OldMessageId))
                return "OldMessageId: string expected";
        if (message.ChatCode != null && message.hasOwnProperty("ChatCode"))
            if (!$util.isString(message.ChatCode))
                return "ChatCode: string expected";
        if (message.ChatName != null && message.hasOwnProperty("ChatName"))
            if (!$util.isString(message.ChatName))
                return "ChatName: string expected";
        if (message.ChatAvatar != null && message.hasOwnProperty("ChatAvatar"))
            if (!$util.isString(message.ChatAvatar))
                return "ChatAvatar: string expected";
        return null;
    };

    /**
     * Creates an InstantMessageInfo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof InstantMessageInfo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {InstantMessageInfo} InstantMessageInfo
     */
    InstantMessageInfo.fromObject = function fromObject(object) {
        if (object instanceof $root.InstantMessageInfo)
            return object;
        var message = new $root.InstantMessageInfo();
        if (object.MessageId != null)
            message.MessageId = String(object.MessageId);
        if (object.SenderCode != null)
            message.SenderCode = String(object.SenderCode);
        if (object.SenderName != null)
            message.SenderName = String(object.SenderName);
        if (object.SenderAvatar != null)
            message.SenderAvatar = String(object.SenderAvatar);
        if (object.ReceiverCode != null)
            message.ReceiverCode = String(object.ReceiverCode);
        if (object.ReceiverName != null)
            message.ReceiverName = String(object.ReceiverName);
        if (object.ReceiverAvatar != null)
            message.ReceiverAvatar = String(object.ReceiverAvatar);
        if (object.ReceiverType != null)
            message.ReceiverType = String(object.ReceiverType);
        if (object.ContentType != null)
            message.ContentType = String(object.ContentType);
        if (object.StringContent != null)
            message.StringContent = String(object.StringContent);
        if (object.BytesContent != null)
            if (typeof object.BytesContent === "string")
                $util.base64.decode(object.BytesContent, message.BytesContent = $util.newBuffer($util.base64.length(object.BytesContent)), 0);
            else if (object.BytesContent.length)
                message.BytesContent = object.BytesContent;
        if (object.MessageTime != null)
            if ($util.Long)
                (message.MessageTime = $util.Long.fromValue(object.MessageTime)).unsigned = false;
            else if (typeof object.MessageTime === "string")
                message.MessageTime = parseInt(object.MessageTime, 10);
            else if (typeof object.MessageTime === "number")
                message.MessageTime = object.MessageTime;
            else if (typeof object.MessageTime === "object")
                message.MessageTime = new $util.LongBits(object.MessageTime.low >>> 0, object.MessageTime.high >>> 0).toNumber();
        if (object.FileName != null)
            message.FileName = String(object.FileName);
        if (object.OldMessageId != null)
            message.OldMessageId = String(object.OldMessageId);
        if (object.ChatCode != null)
            message.ChatCode = String(object.ChatCode);
        if (object.ChatName != null)
            message.ChatName = String(object.ChatName);
        if (object.ChatAvatar != null)
            message.ChatAvatar = String(object.ChatAvatar);
        return message;
    };

    /**
     * Creates a plain object from an InstantMessageInfo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof InstantMessageInfo
     * @static
     * @param {InstantMessageInfo} message InstantMessageInfo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    InstantMessageInfo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.MessageId = "";
            object.SenderCode = "";
            object.SenderName = "";
            object.SenderAvatar = "";
            object.ReceiverCode = "";
            object.ReceiverName = "";
            object.ReceiverAvatar = "";
            object.ReceiverType = "";
            object.ContentType = "";
            object.StringContent = "";
            if (options.bytes === String)
                object.BytesContent = "";
            else {
                object.BytesContent = [];
                if (options.bytes !== Array)
                    object.BytesContent = $util.newBuffer(object.BytesContent);
            }
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.MessageTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.MessageTime = options.longs === String ? "0" : 0;
            object.FileName = "";
            object.OldMessageId = "";
            object.ChatCode = "";
            object.ChatName = "";
            object.ChatAvatar = "";
        }
        if (message.MessageId != null && message.hasOwnProperty("MessageId"))
            object.MessageId = message.MessageId;
        if (message.SenderCode != null && message.hasOwnProperty("SenderCode"))
            object.SenderCode = message.SenderCode;
        if (message.SenderName != null && message.hasOwnProperty("SenderName"))
            object.SenderName = message.SenderName;
        if (message.SenderAvatar != null && message.hasOwnProperty("SenderAvatar"))
            object.SenderAvatar = message.SenderAvatar;
        if (message.ReceiverCode != null && message.hasOwnProperty("ReceiverCode"))
            object.ReceiverCode = message.ReceiverCode;
        if (message.ReceiverName != null && message.hasOwnProperty("ReceiverName"))
            object.ReceiverName = message.ReceiverName;
        if (message.ReceiverAvatar != null && message.hasOwnProperty("ReceiverAvatar"))
            object.ReceiverAvatar = message.ReceiverAvatar;
        if (message.ReceiverType != null && message.hasOwnProperty("ReceiverType"))
            object.ReceiverType = message.ReceiverType;
        if (message.ContentType != null && message.hasOwnProperty("ContentType"))
            object.ContentType = message.ContentType;
        if (message.StringContent != null && message.hasOwnProperty("StringContent"))
            object.StringContent = message.StringContent;
        if (message.BytesContent != null && message.hasOwnProperty("BytesContent"))
            object.BytesContent = options.bytes === String ? $util.base64.encode(message.BytesContent, 0, message.BytesContent.length) : options.bytes === Array ? Array.prototype.slice.call(message.BytesContent) : message.BytesContent;
        if (message.MessageTime != null && message.hasOwnProperty("MessageTime"))
            if (typeof message.MessageTime === "number")
                object.MessageTime = options.longs === String ? String(message.MessageTime) : message.MessageTime;
            else
                object.MessageTime = options.longs === String ? $util.Long.prototype.toString.call(message.MessageTime) : options.longs === Number ? new $util.LongBits(message.MessageTime.low >>> 0, message.MessageTime.high >>> 0).toNumber() : message.MessageTime;
        if (message.FileName != null && message.hasOwnProperty("FileName"))
            object.FileName = message.FileName;
        if (message.OldMessageId != null && message.hasOwnProperty("OldMessageId"))
            object.OldMessageId = message.OldMessageId;
        if (message.ChatCode != null && message.hasOwnProperty("ChatCode"))
            object.ChatCode = message.ChatCode;
        if (message.ChatName != null && message.hasOwnProperty("ChatName"))
            object.ChatName = message.ChatName;
        if (message.ChatAvatar != null && message.hasOwnProperty("ChatAvatar"))
            object.ChatAvatar = message.ChatAvatar;
        return object;
    };

    /**
     * Converts this InstantMessageInfo to JSON.
     * @function toJSON
     * @memberof InstantMessageInfo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    InstantMessageInfo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return InstantMessageInfo;
})();

module.exports = $root;
