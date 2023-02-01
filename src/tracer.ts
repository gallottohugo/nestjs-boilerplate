import tracer from 'dd-trace';

tracer.init();
tracer.use('express');

export default tracer;
