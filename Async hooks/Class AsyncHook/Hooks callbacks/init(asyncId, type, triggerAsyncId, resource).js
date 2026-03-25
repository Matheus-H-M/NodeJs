/**
 * Import required modules
 */
const async_hooks = require('node:async_hooks');
const fs = require('node:fs');
const net = require('node:net');

/**
 * File descriptor for stdout (used for safe logging inside async hooks)
 */
const fd = process.stdout.fd;

/**
 * Create an async hook to track lifecycle of async resources
 */
const hook = async_hooks.createHook({

    /**
     * Called when a new async resource is created
     * @param {number} asyncId - Unique ID of the resource
     * @param {string} type - Type of async resource (e.g., Timeout, PROMISE, TCPWRAP)
     * @param {number} triggerAsyncId - ID of the resource that triggered this one
     * @param {Object} resource - The actual resource object
     */
    init(asyncId, type, triggerAsyncId, resource){
        fs.writeSync(
            fd,
            `INIT -> id: ${asyncId}, type: ${type}, trigger: ${triggerAsyncId}\n`
        );
    },

    /**
     * Called right before the async callback is executed
     */
    before(asyncId){
        fs.writeSync(fd, `BEFORE -> ${asyncId}\n`);
    },

    /**
     * Called right after the async callback finishes execution
     */
    after(asyncId){
        fs.writeSync(fd, `AFTER -> ${asyncId}\n`);
    },

    /**
     * Called when the async resource is destroyed
     */
    destroy(asyncId){
        fs.writeSync(fd, `DESTROY -> ${asyncId}\n`);
    }
});

/**
 * Enable the hook
 */
hook.enable();

/**
 * Example 1: setTimeout (creates a Timeout async resource)
 */
setTimeout(() => {
    console.log('Timeout executed');

    /**
     * Example 2: Promise (creates a PROMISE async resource)
     */
    Promise.resolve().then(() => {
        console.log('Promise executed');
    });

}, 100);

/**
 * Example 3: TCP server (creates TCPWRAP / TCPSERVERWRAP resources)
 */
net.createServer((socket) => {
    socket.end('Hello\n');
}).listen(3000, () => {
    console.log('Server running on port 3000');
});