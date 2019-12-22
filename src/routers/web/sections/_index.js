async function index (req, res, next) { // eslint-disable-line no-unused-vars

   let stmt = CR.db.sections.prepare('select * from sections');
   const pageDataObj = {
        sections: []
    };
    let rows = stmt.all();
	for (let row of rows) {
		pageDataObj.sections.push({
			id: row.id,
			name: row.name,
            acronym: row.acronym,
            members: row.members,
            website: row.website,
            canEdit: false,
            komitatano: row.komitatano,
            komitatano2: row.komitatano2,
            komitatano3: row.komitatano3,
            komitatano4: row.komitatano4
		});
	}

    const data = {
		title: 'Sekcioj',
		scripts: [
            '/js/cr/main/sekcioj/index.js'
		],
		pageDataObj: pageDataObj
	};

    await res.sendRegularPage('sekcioj/index', data);
}

export default index;
