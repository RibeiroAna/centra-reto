$(function () {
    const sectionTable = $('#section-list>tbody');
    const sections = pageData.sections.sort(sortsections);

    var members = 0;
    var nomumisKomitatanoj = 0;

    for (section of sections) {
        sectionTable.append(createsectionRow(section));
        members += section.komitatano? section.members : 0; // nur konsideri membrojn de sections kiuj havas komitatanojn
        nomumisKomitatanoj += section.komitatano? 1 : 0;
    }

    const sectionsBazajstats = $('#sections-stats');
    sectionsBazajstats[0].innerText = createStats(sections.length, members, nomumisKomitatanoj);
});


// helpers
var createsectionRow = function(section) {
    const tr = document.createElement('tr');
    tr.appendChild(createNameCol(section));
    tr.appendChild(createMembersCol(section)); 
    tr.appendChild(createKomitatanojCol(section));
    if (section.rajtasRedakti == true) {
        tr.appendChild(createEditCol(section));
    }
    return tr;
}

var createStats = function(lensections, members, nomumisKomitatanoj) {
    const sectionsStr = 'En TEJO anas entute ' + lensections + ' sections, ';
    const komitatanojStr = 'el kiuj ' + nomumisKomitatanoj + ' nomumis komitatanojn por la nuna komitato. ';
    const membersStr = 'Estas ĉirkaŭ ' + members + ' asociaj membroj en TEJO.';
    return sectionsStr + komitatanojStr + membersStr;
}

var sortsections = function (a, b) { // Sort ascending and by active representant
    if (((a.komitatano == null) && (b.komitatano == null) ||
        ((a.komitatano != null) && (b.komitatano != null)))) {
        return a.name < b.name ? -1 : 1;
    } else if (a.komitatano == null) {
        return 1;
    } else {
        return -1;
    }
}

var createLink = function(link, text) {
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.target = '_blank';
    anchor.textContent = text;
    return anchor;
}

var createEditCol = function(section) {
    const redaktiCol = document.createElement('td');
    redaktiCol.appendChild(createLink(section.acronym, 'Redakti informojn'));
    return redaktiCol;
}

var createNameCol = function(section) {
    const nameAcronym = section.name + ' (' + section.acronym + ')';
    const nameCol = document.createElement('td');
    if (section.website) {
        nameCol.appendChild(createLink(section.website, nameAcronym));
    } else {
        nameCol.textContent = nameAcronym;
    }
    return nameCol;
}

var createMembersCol = function(section) {
    const membersCol = document.createElement('td');
    membersCol.textContent = section.members;
    return membersCol;
}

var createKomitatanojCol = function(section) {
    const komitatanoCol = document.createElement('td');
    if (section.komitatano) {
        const link = '/aktivuloj/' + section.komitatano;
        komitatanoCol.appendChild(createLink(link, 'Rigardi'));
        if(section.komitatano2) {
            const link = '/aktivuloj/' + section.komitatano2;
            komitatanoCol.appendChild(document.createElement('br'));
            komitatanoCol.appendChild(createLink(link, 'Rigardi'));
        }
    } else {
        komitatanoCol.textContent = '--';
    }
    return komitatanoCol;
}
