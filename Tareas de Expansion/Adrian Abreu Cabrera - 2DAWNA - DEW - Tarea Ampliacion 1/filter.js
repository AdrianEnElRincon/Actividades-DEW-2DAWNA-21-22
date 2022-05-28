function filter(attraction, age, height) {
    //write your JS code here:
    
    let minAge = attraction.minAge == undefined ? -Infinity : attraction.minAge
    let maxAge = attraction.maxAge == undefined ? Infinity : attraction.maxAge
    let minHeight = attraction.minHeight == undefined ? -Infinity : attraction.minHeight
    let maxHeight = attraction.maxHeight == undefined ? Infinity : attraction.maxHeight


    return (
            (minAge <= age && maxAge >= age) && (minHeight <= height && maxHeight >= height)
        )
}