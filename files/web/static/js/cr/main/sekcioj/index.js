$(function () {
    let sectionTable = $('#section-list > tbody');
    const sections = pageData.sections.sort(initialSort);

    let members = 0;
    let nomumisKomitatanoj = 0;
    let fakaj = 0;

    for (let section of sections) {
        sectionTable.append(createsectionRow(section));
        members += section.members;
        nomumisKomitatanoj += section.komitatano? 1 : 0;
        fakaj += (section.type == 'Faka') ? 1 : 0;
    }

    const sectionsBazajstats = $('#sections-stats');
    sectionsBazajstats[0].innerText = createStats(sections.length, members, nomumisKomitatanoj, fakaj);
});

$('#nomo').click(function() {
    sort('name', this.childNodes[1]);
});

$('#tipo').click(function() {
    sort('type', this.childNodes[1]);
});

$('#membroj').click(function() {
    sort('members', this.childNodes[1]);
});

$('#komitatanoj').click(function() {
    sort('komitatanoj', this.childNodes[1]);
});

// helpers
var createsectionRow = function(section) {
    const tr = document.createElement('tr');
    tr.appendChild(createNameCol(section));
    tr.appendChild(createTypeCol(section));
    tr.appendChild(createMembersCol(section)); 
    tr.appendChild(createKomitatanojCol(section));
    return tr;
}

var createStats = function(lensections, members, nomumisKomitatanoj, fakaj) {
    const sectionsStr = 'En TEJO entute anas ' + lensections + ' sekcioj ';
    const typesStr = '(' + fakaj + ' fakaj sekcioj kaj ' + (lensections - fakaj) + ' landaj sekcioj), ';
    const komitatanojStr = 'el kiuj ' + nomumisKomitatanoj + ' nomumis komitatanojn por la nuna komitato. ';
    const membersStr = 'Estas ĉirkaŭ ' + members + ' asociaj membroj en TEJO.';
    return sectionsStr + typesStr + komitatanojStr + membersStr;
}

var initialSort = function (a, b) { // Sort ascending and by active representant
    if (((a.komitatanoj == null) && (b.komitatanoj == null) ||
        ((a.komitatanoj != null) && (b.komitatanoj != null)))) {
        return a.name < b.name ? -1 : 1;
    } else if (a.komitatanoj == null) {
        return 1;
    } else {
        return -1;
    }
}

var sort = function(param, icon) {
    let asc = true;

    if(icon.innerText == 'arrow_drop_down') {
        icon.innerText = 'arrow_drop_up';
        asc = false;
    } else {
        icon.innerText = 'arrow_drop_down';
    }

    const sections = pageData.sections.sort(function(a, b) {
        if (asc) {
            return ((a[param] > b[param]) || (a[param] && !b[param]))? 1 : 0;
        } else {
            return ((a[param] < b[param]) || (b[param] && !a[param]))? 1 : 0;
        }
    });

    $('#section-list > tbody tr').remove();
    let sectionTable = $('#section-list > tbody');
    for (section of sections) {
        sectionTable.append(createsectionRow(section));
    }
}

var createLink = function(link, text, external) {
    const anchor = document.createElement('a');
    anchor.href = link;
    if (external) {
        anchor.target = '_blank';
    }
    anchor.textContent = text;
    return anchor;
}

var createNameCol = function(section) {
    const nameAcronym = section.name + ' (' + section.acronym + ')';
    const nameCol = document.createElement('td');
    if (section.website) {
        nameCol.appendChild(createLink(section.website, nameAcronym, true));
    } else {
        nameCol.textContent = nameAcronym;
    }

    if (section.mayUserEditASection == true) {
        nameCol.appendChild(document.createElement('br'));
        nameCol.appendChild(createLink('/sekcioj/' + section.args, '(Redakti informojn)', false));
    }
    return nameCol;
}

var createMembersCol = function(section) {
    const membersCol = document.createElement('td');
    membersCol.textContent = section.members;
    return membersCol;
}

var createTypeCol = function(section) {
    const typeCol = document.createElement('td');
    typeCol.textContent = section.type;
    return typeCol;
}

var createKomitatanojCol = function(section) {
    const komitatanoCol = document.createElement('td');
    if (section.komitatanoj) {
        for(let komitatano of section.komitatanoj) {
            const link = '/aktivuloj/' + komitatano;
            komitatanoCol.appendChild(createLink(link, 'Rigardi', false));
            komitatanoCol.appendChild(document.createElement('br'));
        }
    } else {
        komitatanoCol.textContent = '--';
    }
    return komitatanoCol;
}
