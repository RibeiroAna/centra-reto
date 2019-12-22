import * as CRApi from '..';

async function section_list (req, res, next) { // eslint-disable-line no-unused-vars
	/**
	 * POST /list
	 * Lists all sections
	 *
	 * Login required
	 * Initial setup required
	 *
	 * Permissions required:
	 * section.view
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
	 *   id                   (number)      The section's id
	 *   name                 (string)      The section's display name
	 *   description          (string)      The section's description
	 *   url                  (string)      The section's URL
	 * 
	 * Throws:
	 * See routers/api#performListQueryStatement
	 */
	
	if (!await req.requirePermissions('section.view')) { return; }

	const table = 'sections';
	const dbData = await CRApi.performListQueryStatement({
		req: req,
		res: res,
		db: CR.db.sections,
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

export default section_list;
