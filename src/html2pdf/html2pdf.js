import html2pdf from 'html2pdf.js/dist/html2pdf';

function downloadAsPDF(id, name){
    var element = document.getElementById(id);
    var opt = {
        margin: 1,
        filename: name + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        enableLinks: true,
    };

    html2pdf().from(element).set(opt).save();
}

export { downloadAsPDF };