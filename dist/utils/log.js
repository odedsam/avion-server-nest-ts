"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogUtil = void 0;
class LogUtil {
    static israeliTimeZoneOptions = {
        timeZone: 'Asia/Jerusalem',
    };
    static timestamp() {
        return `[${new Date().toLocaleString('en-IL', LogUtil.israeliTimeZoneOptions)}]`;
    }
    static applicationRunning(origin) {
        console.log(`${LogUtil.timestamp()} App On: ${origin}`);
    }
    static swaggerAvailable(origin) {
        console.log(`${LogUtil.timestamp()} Docs: ${origin}/api`);
    }
    static listeningOnPort(port) {
        console.log(`${LogUtil.timestamp()} Active Port: ${port}`);
    }
    static report(origin, port) {
        LogUtil.listeningOnPort(port);
    }
}
exports.LogUtil = LogUtil;
//# sourceMappingURL=log.js.map