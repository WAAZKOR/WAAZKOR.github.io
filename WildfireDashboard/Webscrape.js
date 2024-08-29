const cheerio = require('cheerio');
const axios = require('axios'); // For making HTTP requests

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('Starting scraping...');

async function scrapeWildcadData() {
    try {
        const response = await axios.get('http://www.wildcad.net/WCAZ-ADC.htm'); // Replace with actual URL
        const $ = cheerio.load(response.data);

        // Extract column headers 
        const headers = $('.MuiDataGrid-columnHeader[role="columnheader"]')
            .map((i, header) => $(header).attr('data-field'))
            .get();

        // Extract row data
        const dataRows = [];
        $('.MuiDataGrid-row[role="row"]').each((i, row) => {
            const rowData = {};
            $(row).find('.MuiDataGrid-cell[role="cell"]').each((j, cell) => {
                const field = $(cell).attr('data-field');
                const value = $(cell).text().trim();
                rowData[field] = value;
            });
            dataRows.push(rowData);
        });

        return { headers, dataRows };
    } catch (error) {
        console.error('Error scraping WildCAD data:', error);
        throw error; 
    }
}

async function main() { 
    await delay(10000); // Wait for 10 seconds
    console.log('Scraping after a 4-second delay');
    try {
        const { headers, dataRows } = await scrapeWildcadData();
        console.log('Headers:', headers);
        console.log('Data Rows:', dataRows);

        // Process dataRows for Leaflet (example)
        /* const wildfireMarkers = dataRows.map(row => {
            const [lat, lng] = row.latitude.split(',').map(Number); 
            return L.marker([lat, lng]).bindPopup(row.name); 
        });

        // Add markers to your Leaflet map 
        // Example: L.layerGroup(wildfireMarkers).addTo(map); */
    } catch (error) {
        // Handle scraping errors 
    }
}

main();