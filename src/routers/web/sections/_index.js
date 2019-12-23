import Group from '../../../api/group';
import * as section from '../../../api/section';

async function index (req, res, next) { // eslint-disable-line no-unused-vars

   const stmt = CR.db.sections.prepare('select * from sections');
   const komitatanojBySection = await getKomitatanojBySection();
   const pageDataObj = {
        sections: []
    };
    let rows = stmt.all();
	for (let row of rows) {
        const komitatanoj = komitatanojBySection[row.args.toLowerCase()];
		pageDataObj.sections.push({
			id: row.id,
			name: row.name,
            acronym: row.acronym,
            type: row.type,
            args: row.args,
            members: row.members,
            website: row.website,
            mayUserEditASection: await section.mayUserEditASection(komitatanoj, req.user),
            komitatanoj: komitatanoj
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

async function getKomitatanojBySection() {
    const komitatoA = await Group.getGroupById(2);
    const komitatanojA = await komitatoA.getAllUsers();
    const komitatanojBySection = {};
    for (let komitatano of komitatanojA) {
        const key = komitatano.args.toLowerCase();
        if(!komitatanojBySection[key]) {
            komitatanojBySection[key] = [];
        }
        komitatanojBySection[key].push(komitatano.email);
    }
    return komitatanojBySection;
}

export default index;
