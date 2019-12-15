import * as CRApi from '..';

async function sekcio_list (req, res, next) { // eslint-disable-line no-unused-vars
	/**
	 * POST /list
	 * Lists all sekcios
	 *
	 * Login required
	 * Initial setup required
	 *
	 * Permissions required:
	 * sekcio.view
	 *
	 * Parameters:
	 * See routers/api#performListQueryStatement
	 *
	 * Permitted cols:
	 * id, name, description, url
	 * 
	 * Returns:
	 * rows_total    (number)   The amount of rows in the table in total
	 * rows_filtered (number)   The amount of rows in the table after filtering
	 * data          (Object[]) The rows
	 *   id                   (number)      The sekcio's id
	 *   name                 (string)      The sekcio's display name
	 *   description          (string)      The sekcio's description
	 *   url                  (string)      The sekcio's URL
	 * 
	 * Throws:
	 * See routers/api#performListQueryStatement
	 */
	
	if (!await req.requirePermissions('sekcio.view')) { return; }

	const table = 'sekcioj';
	const dbData = await CRApi.performListQueryStatement({
		req: req,
		res: res,
		db: CR.db.sekcioj,
		table: table,
		colsAllowed: [
            'id',
			'name',
            'acronym',
            'members',
            'website',
            'komitatano',
            'komitatano2',
            'komitatano3',
            'komitatano4'
		],
		alwaysSelect: [
            'id',
			'name',
            'acronym',
            'members',
            'website',
            'komitatano',
            'komitatano2',
            'komitatano3',
            'komitatano4'
		],
		customCols: []
	});

	if (!dbData) { return; }

	res.sendAPIResponse({
		data: dbData.data,
		rows_total: dbData.rowsTotal,
		rows_filtered: dbData.rowsFiltered
	});
}

export default sekcio_list;
