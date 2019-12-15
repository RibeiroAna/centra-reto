$(function () {
    const sekcioTable = $('#sekcio-list>tbody');
    const sekcioj = pageData.sekcioj.sort(sortSekcioj);

    var members = 0;
    var nomumisKomitatanoj = 0;

    for (sekcio of sekcioj) {
        sekcioTable.append(createSekcioRow(sekcio));
        members += sekcio.komitatano? sekcio.members : 0; // nur konsideri membrojn de sekcioj kiuj havas komitatanojn
        nomumisKomitatanoj += sekcio.komitatano? 1 : 0;
    }

    const sekciojBazajStatistikoj = $('#sekcioj-bazaj-statistikoj');
    sekciojBazajStatistikoj[0].innerText = createStats(sekcioj.length, members, nomumisKomitatanoj);
});


// helpers
var createSekcioRow = function(sekcio) {
    const tr = document.createElement('tr');
    tr.appendChild(createNameCol(sekcio));
    tr.appendChild(createMembersCol(sekcio)); 
    tr.appendChild(createKomitatanojCol(sekcio));
    if (sekcio.rajtasRedakti == true) {
        tr.appendChild(createEditCol(sekcio));
    }
    return tr;
}

var createStats = function(lenSekcioj, members, nomumisKomitatanoj) {
    const sekciojStr = 'En TEJO anas entute ' + lenSekcioj + ' sekcioj, ';
    const komitatanojStr = 'el kiuj ' + nomumisKomitatanoj + ' nomumis komitatanojn por la nuna komitato. ';
    const membersStr = 'Estas ĉirkaŭ ' + members + ' asociaj membroj en TEJO.';
    return sekciojStr + komitatanojStr + membersStr;
}

var sortSekcioj = function (a, b) { // Sort ascending and by active representant
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

var createEditCol = function(sekcio) {
    const redaktiCol = document.createElement('td');
    redaktiCol.appendChild(createLink(sekcio.acronym, 'Redakti informojn'));
    return redaktiCol;
}

var createNameCol = function(sekcio) {
    const nameAcronym = sekcio.name + ' (' + sekcio.acronym + ')';
    const nameCol = document.createElement('td');
    if (sekcio.website) {
        nameCol.appendChild(createLink(sekcio.website, nameAcronym));
    } else {
        nameCol.textContent = nameAcronym;
    }
    return nameCol;
}

var createMembersCol = function(sekcio) {
    const membersCol = document.createElement('td');
    membersCol.textContent = sekcio.members;
    return membersCol;
}

var createKomitatanojCol = function(sekcio) {
    const komitatanoCol = document.createElement('td');
    if (sekcio.komitatano) {
        const link = '/aktivuloj/' + sekcio.komitatano;
        komitatanoCol.appendChild(createLink(link, 'Rigardi'));
        if(sekcio.komitatano2) {
            const link = '/aktivuloj/' + sekcio.komitatano2;
            komitatanoCol.appendChild(document.createElement('br'));
            komitatanoCol.appendChild(createLink(link, 'Rigardi'));
        }
    } else {
        komitatanoCol.textContent = '--';
    }
    return komitatanoCol;
}
