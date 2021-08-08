const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const PORT = 4000 || process.env.PORT;

const app = express();