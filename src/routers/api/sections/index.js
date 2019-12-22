import express from 'express';

import * as CRApi from '..';
import { wrap } from '../..';

import apiList from './_list';

/**
 * Sets up the router
 * @return {express.Router} The router
 */
export default function () {
	const router = express.Router();

    const middleware = CRApi.middleware;
    
    router.post('/list',
        middleware.requireLogin,
        middleware.requireInitialSetup,
        wrap(apiList));

    return router;
}