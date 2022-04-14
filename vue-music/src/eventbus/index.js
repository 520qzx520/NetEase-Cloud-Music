import mitt from 'mitt';

const eventHub = mitt();

eventHub.$on = eventHub.on;
eventHub.$off = eventHub.off;
eventHub.$emit = eventHub.emit;

export default eventHub;