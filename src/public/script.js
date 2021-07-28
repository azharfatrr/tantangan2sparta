const loader = document.getElementById('loader')

async function getSurat(noSurat) {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${noSurat}`)
    const data = await response.json()
    return data
}

async function getTerjemah(noSurat) {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${noSurat}/id.indonesian`)
    const data = await response.json()
    return data
}
    
async function getDaftarSurat() {
    const response = await fetch('https://api.alquran.cloud/v1/surah')
    const data = await response.json()
    return data
} 

async function tampilDaftarSurat() {
    let output = ``
    metaSurat = await getDaftarSurat()
    daftarSurat = metaSurat.data
    let i = 1
    daftarSurat.forEach(namaSurat => {
        output += `<li id="surat" noSurat="${i}">${namaSurat.englishName}</li>`
        i++
    });
    document.getElementById("daftar_surat").innerHTML = output

    pilihSurat()
}

async function suratDefault() {
    metaSurat = await getSurat(1)
    metaTerjemah = await getTerjemah(1)

    tampilSurat(metaSurat,metaTerjemah)

}

function pilihSurat() {
    surats = document.querySelectorAll('#surat')
    for (surat of surats) {
        surat.addEventListener('click', async e => {
            
            let output = '<div id="loader">Loading...</div> '
            document.getElementById('output').innerHTML = output;
            document.getElementById("nama_surat").innerText = `Memuat Surat`
            
            noSurat = e.target.getAttribute("nosurat");
            metaSurat = await getSurat(noSurat)
            metaTerjemah = await getTerjemah(noSurat)

            tampilSurat(metaSurat,metaTerjemah)
        })
    } 
}

async function tampilSurat(metaSurat,metaTerjemah) {
    try {

    const ayahs = await metaSurat.data.ayahs;
    const terjemahs = await metaTerjemah.data.ayahs;

    let output = ''
    document.getElementById("nama_surat").innerText = `Surat ${metaSurat.data.englishName}`
    for (let i = 0; i < ayahs.length; i++) {
        output += `
        <div class='box'>
            <div class='arab'>
            <b>(${ayahs[i].numberInSurah})</b>
            ${ayahs[i].text}
            </div>
            <div class='indonesia'>
            ${terjemahs[i].text}
            </div>
        </div>`
    }
    document.getElementById('output').innerHTML = output;
    window.location.hash = metaSurat.data.englishName;
    }
    catch{
        let output = '<div id="loader">Pilih Surat terlebih dahulu</div> '
        document.getElementById('output').innerHTML = output;
        document.getElementById("nama_surat").innerText = `Silahkan pilih Surat`
    }
}

suratDefault()
tampilDaftarSurat()




