const attraction = (name, description, minAge, maxAge, minHeight, maxHeight) => {

    return {
        name: name,
        description: description,
        minAge: minAge,
        maxAge: maxAge,
        minHeight: minHeight,
        maxHeight: maxHeight
    }

}

const ATTRACTIONS = [
    attraction(
        'The Noria', 
        'Enjoy the views at this classic attraction that never disappoints',
        8,
        undefined,
        undefined,
        undefined
    ),
    attraction(
        'The roller coaster',
        'Blazing speeds on a winding route through the mysteries of the McChun Mine',
        12,
        undefined,
        130,
        210
    ),
    attraction(
        'The House of Terror',
        'Legend has it that ghosts from other times gather in this house to give visitors a near - death experience',
        12,
        undefined,
        undefined,
        undefined
    ),
    attraction(
        'The elevator up&down',
        'Description: The inspector has not passed for a long time, that is why this elevator has such strange behavior, bumpy climbs and free fall from more than 30 meters high.Does it go up or down ? Yes, both.',
        10,
        undefined,
        130,
        undefined
    ),
    attraction(
        'FastSplash',
        'Do you want water? This roller coaster combines speed, water and lots of fun',
        8,
        undefined,
        undefined,
        undefined
    ),
    attraction(
        'Children\'s Kingdom',
        'The little ones will be able to enjoy a set of activities at their height',
        3,
        12,
        undefined,
        undefined
    )
];

console.log(ATTRACTIONS)