import { text } from "stream/consumers";
import { Version, versionHistory } from "../components/MainMenu/VersionHistory/releaseNotes";

function generateReleaseNotes() {
  const currentVersion:Version = versionHistory[0]

  const text_de = currentVersion.de.text
  const text_en = currentVersion.en.text
  const text_fr = currentVersion.fr.text
  const text_it = currentVersion.it.text

  const xml = `
  <de-DE>
  ${text_de}
  </de-DE>
  <en-US>
  ${text_en}
  </en-US>
  <fr-FR>
  ${text_fr}
  </fr-FR>
  <it-IT>
  ${text_it}
  </it-IT>
  `
console.log(xml)

  if(text_de.length > 500){
    console.error(`de-DE: length is ${text_de.length}/500`)
  } else{
    console.info(`de-DE: length is fine (${text_de.length})`)
  }
  if(text_en.length > 500){
    console.error(`en-US: length is ${text_en.length}/500`)
  } else{
    console.info(`en-US: length is fine (${text_en.length})`)
  }
  if(text_fr.length > 500){
    console.error(`fr-FR: length is ${text_fr.length}/500`)
  } else{
    console.info(`fr-FR: length is fine (${text_fr.length})`)
  }
  if(text_it.length > 500){
    console.error(`it-IT: length is ${text_it.length}/500`)
  } else{
    console.info(`it-IT: length is fine (${text_it.length})`)
  }
}

generateReleaseNotes();