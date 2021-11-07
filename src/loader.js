export const ImageLoader = (url) => {
    return new Promise(resolve => {
        const img = new Image();

        img.addEventListener("load" , () => {
            resolve(img);
        });

        img.src = url;
    });
}

export const LevelLoader = (name) => {
    return fetch(`/src/levels/${name}.json`).then(level => level.json());
}