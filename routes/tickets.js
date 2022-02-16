import express from 'express';
import TicketController from '../src/controllers/TicketController.js';

let router = express.Router();

router.post('/api/instructed_scraping', TicketController.instructedScrabing);
router.get('/api/get_all_tickets', TicketController.getAll);
    
export default router;