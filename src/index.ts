import express from 'express';
import promBundle from 'express-prom-bundle';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!');
});

const metricsMiddleware = promBundle({
    includeMethod: true, 
    includePath: true, 
    includeStatusCode: true, 
    includeUp: true,
    customLabels: {project_name: 'hello_world', project_type: 'test_metrics_labels'},
    promClient: {
        collectDefaultMetrics: {
        }
      }
});

// add the prometheus middleware to all routes
app.use(metricsMiddleware);


app.listen(8080, () => {
    console.log(`Server started!`);
});