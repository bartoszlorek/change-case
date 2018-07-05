const uniqArray = (a, i, arr) => a !== arr[i - 1]

function breakPoints(matches) {
    let points = matches.map(({ match, index }) => [
        index,
        index + match.length
    ])
    return [].concat(...points).filter(uniqArray)
}

export default breakPoints
