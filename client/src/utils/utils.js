export const getRandomImage = () => {
    const images = [
        '/assets/images/placeholder/news1.jpeg',
        '/assets/images/placeholder/news2.jpeg',
        '/assets/images/placeholder/news3.jpeg',
        '/assets/images/placeholder/news4.jpeg',
        '/assets/images/placeholder/news5.jpeg',
        '/assets/images/placeholder/news6.jpeg'
    ];
    return images[0]
    return images[Math.floor(Math.random() * images.length)]
}