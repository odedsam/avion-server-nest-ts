"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusResponse = exports.getStatusOperation = void 0;
exports.getStatusOperation = {
    summary: 'Get Application Status',
    description: 'This Endpoint returns the current state of the Application.',
};
exports.getStatusResponse = {
    status: 200,
    description: 'This Application is running and returns a status message.',
    schema: {
        example: { status: 'Running' },
    },
};
//# sourceMappingURL=app.docs.js.map