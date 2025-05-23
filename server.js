const express = require('express');
const app = express();
const PORT = 8080;

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Cấu hình file tĩnh
app.use(express.static('public'));

// Route chính
app.get('/', (req, res) => {
    res.render("log");
});
app.get('/capture', (req, res) => {
    res.render("capture");
});
const axios = require('axios');

app.get('/manage', async (req, res) => {
    const host = req.query.host || 'http://localhost:8080';

    try {
        const response = await axios.get(`${host}/persons`);
        const persons = response.data;
        res.render('manage', { persons });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách từ host:', host, error.message);
        res.render('manage', { persons: [] });
    }
});


// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
