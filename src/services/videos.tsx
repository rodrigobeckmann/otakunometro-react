import { storage } from "../../firebase";
import { ref, list, getDownloadURL } from "firebase/storage";

const getReferences = async () => {
    const folderRef = ref(storage, 'playlist');
    const videosList = await list(folderRef, { maxResults: 100 })
    return videosList;
}

export const createArrayOfVideos = async () => {
    const videosArray = [] as string[];
    const refs = await getReferences();
    refs.items.map(async (item) => {
        const videoRef = ref(storage, item.fullPath)
        const url = await getDownloadURL(videoRef);
        videosArray.push(url)
    })
    return videosArray
}

export const colorBars = 'https://firebasestorage.googleapis.com/v0/b/otakunometro.appspot.com/o/bars.mp4?alt=media&token=8e64e958-f077-402a-9e9c-13040f38962a';

export const sortPlaylist = (playList: string[]) => {
    for (let i = playList.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = playList[i];
        playList[i] = playList[j];
        playList[j] = temp;
    }
}
