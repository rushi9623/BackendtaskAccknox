const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock JSON Data
let categories = [
    {
        id: 1,
        name: "CSPM Executive Dashboard",
        widgets: [
            { id: 1, name: "Widget 1", text: "This is widget 1" },
            { id: 2, name: "Widget 2", text: "This is widget 2" },
        ],
    },
    {
        id: 2,
        name: "Security Dashboard",
        widgets: [
            { id: 3, name: "Widget 3", text: "This is widget 3" },
        ],
    },
];

// API to get categories and widgets
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

// API to add a new widget
app.post('/api/widgets', (req, res) => {
    const { categoryId, widgetName, widgetText } = req.body;
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
        const newWidget = {
            id: Date.now(), // unique id
            name: widgetName,
            text: widgetText,
        };
        category.widgets.push(newWidget);
        res.status(201).json(newWidget);
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

// API to remove a widget
app.delete('/api/widgets/:widgetId', (req, res) => {
    const widgetId = parseInt(req.params.widgetId);
    categories.forEach(category => {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
    });
    res.status(200).json({ message: "Widget removed" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
