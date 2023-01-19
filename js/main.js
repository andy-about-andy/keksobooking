import {generationObjects} from './data.js';
// import {getAnnouncements} from './markup-generation.js';
// import {addInactiveState} from './form.js';
import {initMap} from './map.js';

// addInactiveState(false);
// getAnnouncements(generationObjects());
// const data = generationObjects(10);
initMap(generationObjects(10));
