
// Get a list of all the folders that are currently opened
export function getOpenedFolderIndices() {
  let openedFolders = [],
  folderElements = Object.values(gui.__folders);

  for(let i=0; i<folderElements.length; i++) {
    if(!folderElements[i].closed) {
      openedFolders.push(i);
    }
  }

  return openedFolders;
}