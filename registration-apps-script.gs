/**
 * Athlora Junior Cup — Registration form backend.
 *
 * This file is NOT loaded by the website. It's the code you paste into
 * Google Apps Script so the "Register Now" form on the site can write
 * rows into a Google Sheet.
 *
 * SETUP
 * 1. Create a new Google Sheet (this will hold your registrations).
 * 2. In the Sheet, go to Extensions > Apps Script.
 * 3. Delete the placeholder code and paste in everything below.
 * 4. Click Deploy > New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, authorize the permissions it asks for.
 * 6. Copy the "Web app URL" it gives you — it looks like:
 *    https://script.google.com/macros/s/AKfycb.../exec
 * 7. Paste that URL into index.html where it says GAS_WEB_APP_URL
 *    (search for that constant near the bottom of the file).
 *
 * Whenever you change this script, you have to Deploy > Manage deployments
 * > edit (pencil icon) > New version, or the live URL keeps running the
 * old code.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Team Name', 'Coach / Manager Name', 'Phone',
        'Email', 'Division', 'Number of Players', 'Notes'
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.teamName || '',
      data.coachName || '',
      data.phone || '',
      data.email || '',
      data.division || '',
      data.players || '',
      data.notes || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
