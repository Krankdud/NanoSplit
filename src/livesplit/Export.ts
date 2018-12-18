import * as nunjucks from "nunjucks";

function exportLiveSplitToXML(run: ILiveSplitRun) {
  nunjucks.configure({ autoescape: true });
  const xmlString = nunjucks.render("livesplit.njk", run);
  return xmlString;
}

export default exportLiveSplitToXML;
